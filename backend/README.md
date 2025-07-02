# Timber Mountain AI Chatbot - Backend

This is the backend service for the Timber Mountain AI Chatbot, built with LangChain, LangGraph, and Neo4j.

## Architecture

- **Neo4j GraphRAG**: Knowledge graph database with vector search capabilities
- **LangGraph Agent**: Conversational AI agent with retrieval-augmented generation
- **Modal Deployment**: Serverless deployment platform for the API

## Project Structure

```
backend/
├── modal_app.py      # Modal deployment entry point
├── app.py            # Main application logic
├── agent.py          # LangGraph agent implementation
├── database.py       # Neo4j connection and vector store
├── config.py         # Configuration management
├── requirements.txt  # Python dependencies
└── .env.example      # Environment variables template
```

## Local Development

### Prerequisites

1. Python 3.11+
2. Neo4j database with populated Timber Mountain data
3. OpenAI API key
4. (Optional) LangSmith API key for tracing

### Setup

1. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Copy `.env.example` to `.env` and fill in your credentials:
   ```bash
   cp .env.example .env
   ```

4. Test the application locally:
   ```bash
   python app.py
   ```

## Modal Deployment

### Prerequisites

1. Modal account (https://modal.com)
2. Modal CLI installed: `pip install modal`
3. Authenticated: `modal token new`

### Create Modal Secrets

Create the following secrets in your Modal dashboard:

1. **openai-secret**:
   - `OPENAI_API_KEY`: Your OpenAI API key

2. **neo4j-secret**:
   - `NEO4J_URI`: Your Neo4j connection URI
   - `NEO4J_USERNAME`: Neo4j username
   - `NEO4J_PASSWORD`: Neo4j password

3. **langsmith-secret** (optional):
   - `LANGCHAIN_TRACING_V2`: "true"
   - `LANGCHAIN_API_KEY`: Your LangSmith API key
   - `LANGCHAIN_PROJECT`: "timber-mountain-chat"

### Deploy

1. Deploy to Modal:
   ```bash
   modal deploy modal_app.py
   ```

2. The deployment will output your endpoint URL:
   ```
   https://[your-username]--timber-mountain-chat-chat-endpoint.modal.run
   ```

3. Test the deployment:
   ```bash
   modal run modal_app.py
   ```

## API Usage

### Chat Endpoint

**POST** `/`

Request:
```json
{
  "query": "What were the results of the AI Trip Planner test?"
}
```

Response:
```json
{
  "status": "success",
  "response": "The AI Trip Planner test showed...",
  "timestamp": "2024-01-10T12:00:00",
  "conversation_id": "uuid-here"
}
```

### Health Check

**GET** `/health`

Response:
```json
{
  "status": "healthy",
  "service": "timber-mountain-chat",
  "timestamp": "2024-01-10T12:00:00"
}
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | OpenAI API key for embeddings and LLM | Yes |
| `NEO4J_URI` | Neo4j database URI | Yes |
| `NEO4J_USERNAME` | Neo4j username | Yes |
| `NEO4J_PASSWORD` | Neo4j password | Yes |
| `LANGCHAIN_TRACING_V2` | Enable LangSmith tracing | No |
| `LANGCHAIN_API_KEY` | LangSmith API key | No |
| `LANGCHAIN_PROJECT` | LangSmith project name | No |

## Troubleshooting

### Neo4j Connection Issues
- Ensure your Neo4j instance is running and accessible
- Check that the URI includes the protocol (e.g., `neo4j://` or `bolt://`)
- Verify credentials are correct

### Modal Deployment Issues
- Ensure all secrets are properly configured in Modal dashboard
- Check Modal logs: `modal logs timber-mountain-chat`
- Verify image builds successfully

### Performance Issues
- The first request may be slower due to cold start
- Container stays warm for 5 minutes after last request
- Consider increasing memory allocation if needed