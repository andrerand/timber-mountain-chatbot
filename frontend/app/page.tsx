'use client';

import ChatInterface from '@/components/ChatInterface';
import { ChatProvider } from '@/context/ChatContext';

export default function Home() {
  return (
    <ChatProvider>
      <ChatInterface />
    </ChatProvider>
  );
}