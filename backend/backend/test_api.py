#!/usr/bin/env python3
"""
Test script for Timber Mountain Chat API
"""
import requests
import json
import time

# API Endpoints
BASE_URL = "https://andrerand--timber-mountain-chat"
CHAT_ENDPOINT = f"{BASE_URL}-chat-endpoint.modal.run"
HEALTH_ENDPOINT = f"{BASE_URL}-health-check.modal.run"

# Test questions
TEST_QUESTIONS = [
    "What were the results of the AI Trip Planner test?",
    "Which A/B test had the highest revenue impact?",
    "Tell me about the homepage personalization test.",
    "What was the outcome of the special offers countdown timer test?",
    "How did the booking flow consolidation test perform?",
    "What were the key findings from the CTA copy test?",
]


def test_health_check():
    """Test the health check endpoint"""
    print("Testing health check endpoint...")
    try:
        response = requests.get(HEALTH_ENDPOINT)
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Health check passed: {data}")
        else:
            print(f"❌ Health check failed: {response.status_code}")
    except Exception as e:
        print(f"❌ Health check error: {str(e)}")
    print()


def test_chat_endpoint(question):
    """Test the chat endpoint with a question"""
    print(f"Q: {question}")
    
    try:
        start_time = time.time()
        response = requests.post(
            CHAT_ENDPOINT,
            json={"query": question},
            headers={"Content-Type": "application/json"}
        )
        elapsed_time = time.time() - start_time
        
        if response.status_code == 200:
            data = response.json()
            if data["status"] == "success":
                print(f"A: {data['response'][:200]}...")
                print(f"✅ Response time: {elapsed_time:.2f}s")
                print(f"   Conversation ID: {data['conversation_id']}")
            else:
                print(f"❌ Error: {data.get('error', 'Unknown error')}")
        else:
            print(f"❌ HTTP Error: {response.status_code}")
            
    except Exception as e:
        print(f"❌ Request error: {str(e)}")
    
    print("-" * 80)
    print()


def test_error_handling():
    """Test error handling with invalid requests"""
    print("Testing error handling...")
    
    # Test empty query
    print("Test 1: Empty query")
    response = requests.post(CHAT_ENDPOINT, json={"query": ""})
    data = response.json()
    print(f"Response: {data}")
    print()
    
    # Test missing query
    print("Test 2: Missing query field")
    response = requests.post(CHAT_ENDPOINT, json={})
    data = response.json()
    print(f"Response: {data}")
    print()


def main():
    """Run all tests"""
    print("=" * 80)
    print("Timber Mountain Chat API Test Suite")
    print("=" * 80)
    print()
    
    # Test health check
    test_health_check()
    
    # Test chat endpoints
    print("Testing chat endpoint with various questions...")
    print("=" * 80)
    
    for question in TEST_QUESTIONS:
        test_chat_endpoint(question)
        time.sleep(1)  # Rate limiting
    
    # Test error handling
    test_error_handling()
    
    print("Test suite completed!")


if __name__ == "__main__":
    main()