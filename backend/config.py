"""
Configuration module for Timber Mountain AI Chatbot
"""
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# API Keys
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
NEO4J_URI = os.getenv("NEO4J_URI")
NEO4J_USERNAME = os.getenv("NEO4J_USERNAME")
NEO4J_PASSWORD = os.getenv("NEO4J_PASSWORD")
LANGCHAIN_TRACING_V2 = os.getenv("LANGCHAIN_TRACING_V2", "true")
LANGCHAIN_ENDPOINT = os.getenv("LANGCHAIN_ENDPOINT", "https://api.smith.langchain.com")
LANGCHAIN_API_KEY = os.getenv("LANGCHAIN_API_KEY")
LANGCHAIN_PROJECT = os.getenv("LANGCHAIN_PROJECT", "timber-mountain-chat")

# Model configurations
LLM_MODEL = "gpt-4o-mini"
EMBEDDING_MODEL = "text-embedding-ada-002"
TEMPERATURE = 0.1

# Retriever configurations
RETRIEVER_SCORE_THRESHOLD = 0.7
RETRIEVER_K = 5
RETRIEVER_FETCH_K = 20

# Neo4j configurations
NEO4J_INDEX_NAME = "timber_mountain_vector_enhanced"
NEO4J_NODE_LABEL = "Document"
NEO4J_TEXT_NODE_PROPERTIES = ["text", "title", "type"]
NEO4J_EMBEDDING_NODE_PROPERTY = "embedding"

# System prompt
SYSTEM_PROMPT = """You are a knowledgeable Data Scientist specializing in A/B testing and e-commerce optimization at Timber Mountain, a popular theme park renowned for its thrilling roller coasters and family-friendly attractions. You have deep expertise in experimentation and testing methodologies and can provide detailed insights about all the A/B tests conducted at the park.

You have access to comprehensive test results, including:
- Test methodologies and hypotheses
- Statistical outcomes and KPIs
- Customer segment performance
- Implementation recommendations
- Long-term impact assessments

Always provide specific, data-driven insights based on the test results. When asked about a test, include relevant metrics, confidence levels, and actionable recommendations. Be helpful, professional, and precise in your responses.

If someone asks about topics unrelated to Timber Mountain's A/B tests, politely redirect them to ask about the park's testing initiatives."""

# Validation
def validate_config():
    """Validate that all required environment variables are set"""
    required_vars = [
        "OPENAI_API_KEY",
        "NEO4J_URI",
        "NEO4J_USERNAME",
        "NEO4J_PASSWORD"
    ]
    
    missing_vars = []
    for var in required_vars:
        if not os.getenv(var):
            missing_vars.append(var)
    
    if missing_vars:
        raise ValueError(f"Missing required environment variables: {', '.join(missing_vars)}")
    
    return True