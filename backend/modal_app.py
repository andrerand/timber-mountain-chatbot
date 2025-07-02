"""
Modal deployment for Timber Mountain AI Chatbot
"""
import modal
from datetime import datetime
import uuid
import json
import logging

# Create Modal app
app = modal.App("timber-mountain-chat")

# Define the container image with local files
image = (
    modal.Image.debian_slim(python_version="3.11")
    .pip_install_from_requirements("requirements.txt")
    .add_local_dir(".", remote_path="/root")
)

# Define secrets
secrets = [
    modal.Secret.from_name("openai-secret"),
    modal.Secret.from_name("neo4j-secret"),
    modal.Secret.from_name("langsmith-secret"),
]


@app.function(
    image=image,
    secrets=secrets,
    timeout=300,
    memory=1024,  # 1GB memory
    scaledown_window=300,  # Keep warm for 5 minutes
)
@modal.fastapi_endpoint(method="POST")
def chat_endpoint(request: dict):
    """
    Main chat endpoint for Modal deployment
    
    Expected request format:
    {
        "query": "User's question about Timber Mountain A/B tests"
    }
    """
    import os
    
    # Set up logging
    logging.basicConfig(level=logging.INFO)
    logger = logging.getLogger(__name__)
    
    try:
        # Extract query from request
        user_question = request.get("query", "").strip()
        
        if not user_question:
            return {
                "status": "error",
                "response": "Please provide a question.",
                "timestamp": datetime.now().isoformat(),
                "conversation_id": str(uuid.uuid4())
            }
        
        logger.info(f"Processing query: {user_question[:100]}...")
        
        # Import and initialize the app (done inside function for Modal)
        from app import get_app
        
        # Get the chatbot instance
        chatbot = get_app()
        
        # Generate response
        response = chatbot.chat(user_question)
        
        # Return successful response
        return {
            "status": "success",
            "response": response,
            "timestamp": datetime.now().isoformat(),
            "conversation_id": str(uuid.uuid4())
        }
        
    except Exception as e:
        logger.error(f"Error processing request: {str(e)}")
        return {
            "status": "error",
            "response": "I encountered an error processing your request. Please try again.",
            "error": str(e),
            "timestamp": datetime.now().isoformat(),
            "conversation_id": str(uuid.uuid4())
        }


@app.function(image=image, secrets=secrets)
@modal.fastapi_endpoint(method="GET")
def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "timber-mountain-chat",
        "timestamp": datetime.now().isoformat()
    }


@app.function(image=image, secrets=secrets)
def test_chat():
    """Test function to verify the chat works"""
    from app import get_app
    
    print("Testing Timber Mountain Chatbot on Modal...")
    
    # Initialize app
    chatbot = get_app()
    
    # Test questions
    test_questions = [
        "What were the results of the AI Trip Planner test?",
        "Which A/B test had the highest revenue impact?",
        "Tell me about the homepage personalization test results."
    ]
    
    for question in test_questions:
        print(f"\nQuestion: {question}")
        response = chatbot.chat(question)
        print(f"Response: {response[:200]}...")
        
    print("\nTest completed successfully!")


@app.local_entrypoint()
def main():
    """Local testing entrypoint"""
    print("Timber Mountain Chatbot - Modal Deployment")
    print("=" * 50)
    
    # Test the chat function
    test_response = test_chat.remote()
    
    # Test the health check
    health = health_check.remote()
    print(f"\nHealth check: {json.dumps(health, indent=2)}")
    
    # Test the chat endpoint
    test_request = {
        "query": "What were the key findings from the special offers countdown timer test?"
    }
    
    print(f"\nTesting chat endpoint with: {test_request['query']}")
    response = chat_endpoint.remote(test_request)
    print(f"Response: {json.dumps(response, indent=2)}")


if __name__ == "__main__":
    # For local testing
    main()