"""
Main application module that coordinates all components
"""
import logging
from typing import Optional

from config import validate_config
from database import Neo4jConnection, create_vector_store, get_database_stats
from agent import chat_with_timber_mountain

logger = logging.getLogger(__name__)


class TimberMountainChatbot:
    """Main application class for Timber Mountain Chatbot"""
    
    def __init__(self):
        self.neo4j_connection = None
        self.vector_store = None
        self._initialized = False
        
    def initialize(self):
        """Initialize all components"""
        if self._initialized:
            logger.info("Application already initialized")
            return
            
        try:
            # Validate configuration
            logger.info("Validating configuration...")
            validate_config()
            
            # Connect to Neo4j
            logger.info("Connecting to Neo4j database...")
            self.neo4j_connection = Neo4jConnection()
            self.neo4j_connection.connect()
            
            # Get database stats
            stats = get_database_stats(self.neo4j_connection)
            logger.info(f"Database stats: {stats}")
            
            # Create vector store
            logger.info("Creating vector store connection...")
            self.vector_store = create_vector_store(existing_graph=True)
            
            self._initialized = True
            logger.info("Application initialized successfully")
            
        except Exception as e:
            logger.error(f"Failed to initialize application: {str(e)}")
            self.cleanup()
            raise
            
    def chat(self, question: str, verbose: bool = False) -> str:
        """
        Process a chat question
        
        Args:
            question: User's question
            verbose: Whether to enable verbose logging
            
        Returns:
            Agent's response
        """
        if not self._initialized:
            raise RuntimeError("Application not initialized. Call initialize() first.")
            
        return chat_with_timber_mountain(question, self.vector_store, verbose)
        
    def cleanup(self):
        """Cleanup resources"""
        if self.neo4j_connection:
            self.neo4j_connection.close()
            self.neo4j_connection = None
        self.vector_store = None
        self._initialized = False
        logger.info("Application cleanup completed")
        

# Singleton instance
_app_instance: Optional[TimberMountainChatbot] = None


def get_app() -> TimberMountainChatbot:
    """Get or create the application instance"""
    global _app_instance
    if _app_instance is None:
        _app_instance = TimberMountainChatbot()
        _app_instance.initialize()
    return _app_instance


def chat_endpoint(query: str) -> dict:
    """
    Main endpoint for chat functionality
    
    Args:
        query: User's question
        
    Returns:
        Response dictionary
    """
    try:
        app = get_app()
        response = app.chat(query)
        return {
            "status": "success",
            "response": response
        }
    except Exception as e:
        logger.error(f"Chat endpoint error: {str(e)}")
        return {
            "status": "error",
            "response": "I encountered an error processing your request. Please try again.",
            "error": str(e)
        }


if __name__ == "__main__":
    # Test the application locally
    logging.basicConfig(level=logging.INFO)
    
    print("Initializing Timber Mountain Chatbot...")
    app = get_app()
    
    print("\nTesting with a sample question...")
    test_question = "What were the results of the AI Trip Planner test?"
    response = app.chat(test_question, verbose=True)
    
    print(f"\nQuestion: {test_question}")
    print(f"Response: {response}")
    
    # Cleanup
    app.cleanup()