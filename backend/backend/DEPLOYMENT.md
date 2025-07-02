# Timber Mountain Chat Backend - Deployment Information

## Modal Deployment Status ✅

The backend has been successfully deployed to Modal. Here are the production endpoints:

### API Endpoints

#### 1. Chat Endpoint (Main API)
- **URL**: `https://andrerand--timber-mountain-chat-chat-endpoint.modal.run`
- **Method**: POST
- **Content-Type**: application/json
- **Request Body**:
  ```json
  {
    "query": "Your question about Timber Mountain A/B tests"
  }
  ```
- **Response**:
  ```json
  {
    "status": "success",
    "response": "AI-generated response",
    "timestamp": "2025-07-02T13:37:12.834364",
    "conversation_id": "unique-uuid"
  }
  ```

#### 2. Health Check Endpoint
- **URL**: `https://andrerand--timber-mountain-chat-health-check.modal.run`
- **Method**: GET
- **Response**:
  ```json
  {
    "status": "healthy",
    "service": "timber-mountain-chat",
    "timestamp": "2025-07-02T13:36:23.784148"
  }
  ```

### Deployment Details

- **App Name**: timber-mountain-chat
- **Deployment URL**: https://modal.com/apps/andrerand/main/deployed/timber-mountain-chat
- **Region**: Automatically managed by Modal
- **Cold Start**: ~2-3 seconds
- **Warm Start**: <500ms (container stays warm for 5 minutes)

### Environment Variables

The following secrets are configured in Modal:
- `openai-secret`: Contains OPENAI_API_KEY
- `neo4j-secret`: Contains NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD
- `langsmith-secret`: Contains LANGCHAIN_API_KEY and related config

### Testing

To test the deployment:

1. **Quick curl test**:
   ```bash
   curl -X POST https://andrerand--timber-mountain-chat-chat-endpoint.modal.run \
     -H "Content-Type: application/json" \
     -d '{"query": "What were the results of the AI Trip Planner test?"}'
   ```

2. **Run the test suite**:
   ```bash
   python backend/test_api.py
   ```

### Frontend Integration

When building the frontend, use this endpoint URL in your environment variables:
```
NEXT_PUBLIC_MODAL_ENDPOINT=https://andrerand--timber-mountain-chat-chat-endpoint.modal.run
```

### Monitoring

- View logs: `modal logs timber-mountain-chat`
- View deployment: https://modal.com/apps/andrerand/main/deployed/timber-mountain-chat
- LangSmith traces: Check your LangSmith dashboard for agent execution traces

### Re-deployment

To update the deployment after changes:
```bash
cd backend
modal deploy modal_app.py
```