'use client';

import ChatInterface from '../../components/ChatInterface';
import { ChatProvider } from '../../context/ChatContext';
import { useSearchParams } from 'next/navigation';

export default function ChatPage() {
  const searchParams = useSearchParams();
  const chatKey = searchParams.get('new') || 'default';
  
  return (
    <ChatProvider>
      <ChatInterface key={chatKey} />
    </ChatProvider>
  );
}