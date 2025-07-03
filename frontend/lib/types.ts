export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  elapsedTime?: number; // Time in seconds it took to generate the response
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface APIResponse {
  status: 'success' | 'error';
  response: string;
  timestamp: string;
  conversation_id: string;
  error?: string;
}