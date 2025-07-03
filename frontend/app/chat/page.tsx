'use client';

import ChatInterface from '../../components/ChatInterface';
import { ChatProvider } from '../../context/ChatContext';

export default function ChatPage() {
  return (
    <ChatProvider>
      <ChatInterface />
    </ChatProvider>
  );
}