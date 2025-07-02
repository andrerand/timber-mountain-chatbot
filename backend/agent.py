"""
LangGraph agent implementation for Timber Mountain AI Chatbot
"""
from typing import TypedDict, List
from langchain_core.messages import BaseMessage, HumanMessage, SystemMessage
from langchain_openai import ChatOpenAI
from langchain.retrievers import ContextualCompressionRetriever
from langchain.retrievers.document_compressors import LLMChainExtractor
from langgraph.graph import StateGraph, END
import logging

from config import (
    OPENAI_API_KEY,
    LLM_MODEL,
    TEMPERATURE,
    SYSTEM_PROMPT,
    RETRIEVER_K,
    RETRIEVER_FETCH_K,
    RETRIEVER_SCORE_THRESHOLD
)

logger = logging.getLogger(__name__)


class AgentState(TypedDict):
    """State definition for the agent"""
    messages: List[BaseMessage]
    context: str
    query: str


class TimberMountainAgent:
    """LangGraph agent for Timber Mountain chatbot"""
    
    def __init__(self, vector_store):
        self.vector_store = vector_store
        self.llm = ChatOpenAI(
            model=LLM_MODEL,
            temperature=TEMPERATURE,
            openai_api_key=OPENAI_API_KEY
        )
        self.retriever = self._create_enhanced_retriever()
        self.workflow = self._build_workflow()
        self.app = self.workflow.compile()
        
    def _create_enhanced_retriever(self):
        """Create enhanced retriever with contextual compression"""
        # Base retriever with score threshold
        base_retriever = self.vector_store.as_retriever(
            search_type="similarity_score_threshold",
            search_kwargs={
                "k": RETRIEVER_K,
                "fetch_k": RETRIEVER_FETCH_K,
                "score_threshold": RETRIEVER_SCORE_THRESHOLD
            }
        )
        
        # Add contextual compression
        compressor = LLMChainExtractor.from_llm(self.llm)
        compression_retriever = ContextualCompressionRetriever(
            base_compressor=compressor,
            base_retriever=base_retriever
        )
        
        return compression_retriever
        
    def _build_workflow(self):
        """Build the LangGraph workflow"""
        workflow = StateGraph(AgentState)
        
        # Add nodes
        workflow.add_node("retrieve_context", self._retrieve_context)
        workflow.add_node("generate_answer", self._generate_answer)
        
        # Add edges
        workflow.set_entry_point("retrieve_context")
        workflow.add_edge("retrieve_context", "generate_answer")
        workflow.add_edge("generate_answer", END)
        
        return workflow
        
    def _retrieve_context(self, state: AgentState) -> AgentState:
        """Retrieve relevant context from vector store"""
        query = state["query"]
        
        try:
            # Retrieve relevant documents
            docs = self.retriever.get_relevant_documents(query)
            
            if not docs:
                logger.warning(f"No relevant documents found for query: {query}")
                state["context"] = "No specific information was found about this topic in the Timber Mountain A/B test results."
            else:
                # Combine document content
                context = "\n\n".join([doc.page_content for doc in docs])
                state["context"] = context
                logger.info(f"Retrieved {len(docs)} relevant documents")
                
        except Exception as e:
            logger.error(f"Error retrieving context: {str(e)}")
            state["context"] = "I encountered an error while searching for information. Please try rephrasing your question."
            
        return state
        
    def _generate_answer(self, state: AgentState) -> AgentState:
        """Generate answer using LLM with retrieved context"""
        query = state["query"]
        context = state["context"]
        
        # Prepare messages
        messages = [
            SystemMessage(content=SYSTEM_PROMPT),
            HumanMessage(content=f"""Based on the following context about Timber Mountain A/B tests, please answer the user's question.

Context:
{context}

User Question: {query}

Please provide a detailed, data-driven response based on the test results. If the context doesn't contain relevant information, politely explain that and suggest what A/B testing topics you can help with.""")
        ]
        
        try:
            # Generate response
            response = self.llm.invoke(messages)
            state["messages"] = [response]
            logger.info("Successfully generated response")
            
        except Exception as e:
            logger.error(f"Error generating answer: {str(e)}")
            error_message = HumanMessage(content="I apologize, but I encountered an error while generating a response. Please try again.")
            state["messages"] = [error_message]
            
        return state
        
    def chat(self, question: str) -> str:
        """
        Main chat interface
        
        Args:
            question: User's question
            
        Returns:
            Agent's response
        """
        # Initialize state
        initial_state = {
            "messages": [],
            "context": "",
            "query": question
        }
        
        # Run the workflow
        try:
            final_state = self.app.invoke(initial_state)
            
            # Extract response
            if final_state["messages"]:
                return final_state["messages"][0].content
            else:
                return "I couldn't generate a response. Please try again."
                
        except Exception as e:
            logger.error(f"Error in chat workflow: {str(e)}")
            return "I encountered an error processing your request. Please try again."


def chat_with_timber_mountain(user_question: str, vector_store, verbose: bool = False) -> str:
    """
    Convenience function to chat with Timber Mountain agent
    
    Args:
        user_question: User's question
        vector_store: Neo4j vector store instance
        verbose: Whether to log detailed information
        
    Returns:
        Agent's response
    """
    if verbose:
        logging.basicConfig(level=logging.INFO)
    else:
        logging.basicConfig(level=logging.WARNING)
        
    agent = TimberMountainAgent(vector_store)
    return agent.chat(user_question)