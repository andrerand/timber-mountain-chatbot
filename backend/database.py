"""
Database module for Neo4j connection and vector store setup
"""
from neo4j import GraphDatabase
from langchain_neo4j import Neo4jVector
from langchain_openai import OpenAIEmbeddings
from langchain.docstore.document import Document
from typing import List, Optional
import logging

from config import (
    NEO4J_URI,
    NEO4J_USERNAME,
    NEO4J_PASSWORD,
    NEO4J_INDEX_NAME,
    NEO4J_NODE_LABEL,
    NEO4J_TEXT_NODE_PROPERTIES,
    NEO4J_EMBEDDING_NODE_PROPERTY,
    EMBEDDING_MODEL,
    OPENAI_API_KEY
)

logger = logging.getLogger(__name__)


class Neo4jConnection:
    """Manages Neo4j database connection"""
    
    def __init__(self):
        self.driver = None
        self.vector_store = None
        
    def connect(self):
        """Establish connection to Neo4j database"""
        try:
            self.driver = GraphDatabase.driver(
                NEO4J_URI,
                auth=(NEO4J_USERNAME, NEO4J_PASSWORD)
            )
            # Test connection
            with self.driver.session() as session:
                result = session.run("RETURN 1 as test")
                result.single()
            logger.info("Successfully connected to Neo4j database")
            return True
        except Exception as e:
            logger.error(f"Failed to connect to Neo4j: {str(e)}")
            raise
            
    def close(self):
        """Close Neo4j connection"""
        if self.driver:
            self.driver.close()
            logger.info("Neo4j connection closed")
            
    def get_node_count(self) -> int:
        """Get total number of nodes in the database"""
        with self.driver.session() as session:
            result = session.run("MATCH (n) RETURN count(n) as count")
            return result.single()["count"]
            
    def get_relationship_count(self) -> int:
        """Get total number of relationships in the database"""
        with self.driver.session() as session:
            result = session.run("MATCH ()-->() RETURN count(*) as count")
            return result.single()["count"]


def create_vector_store(existing_graph: bool = True) -> Neo4jVector:
    """
    Create or connect to Neo4j vector store
    
    Args:
        existing_graph: If True, connect to existing graph. If False, create new.
        
    Returns:
        Neo4jVector store instance
    """
    # Initialize embeddings
    embeddings = OpenAIEmbeddings(
        model=EMBEDDING_MODEL,
        openai_api_key=OPENAI_API_KEY
    )
    
    if existing_graph:
        # Connect to existing vector index
        logger.info(f"Connecting to existing vector index: {NEO4J_INDEX_NAME}")
        vector_store = Neo4jVector.from_existing_graph(
            embedding=embeddings,
            url=NEO4J_URI,
            username=NEO4J_USERNAME,
            password=NEO4J_PASSWORD,
            index_name=NEO4J_INDEX_NAME,
            node_label=NEO4J_NODE_LABEL,
            text_node_properties=NEO4J_TEXT_NODE_PROPERTIES,
            embedding_node_property=NEO4J_EMBEDDING_NODE_PROPERTY,
        )
    else:
        # Create new vector index (would need documents)
        logger.info(f"Creating new vector index: {NEO4J_INDEX_NAME}")
        raise NotImplementedError("Creating new vector store requires documents. Use existing_graph=True")
        
    return vector_store


def test_vector_search(vector_store: Neo4jVector, query: str = "What were the results of the AI Trip Planner test?") -> List[Document]:
    """
    Test vector search functionality
    
    Args:
        vector_store: Neo4jVector instance
        query: Test query string
        
    Returns:
        List of retrieved documents
    """
    try:
        results = vector_store.similarity_search(query, k=3)
        logger.info(f"Vector search returned {len(results)} results")
        return results
    except Exception as e:
        logger.error(f"Vector search failed: {str(e)}")
        raise


def get_database_stats(connection: Neo4jConnection) -> dict:
    """Get database statistics"""
    return {
        "node_count": connection.get_node_count(),
        "relationship_count": connection.get_relationship_count(),
        "index_name": NEO4J_INDEX_NAME,
        "node_label": NEO4J_NODE_LABEL
    }