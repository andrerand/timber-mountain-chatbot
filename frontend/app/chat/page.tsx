'use client';

import ChatInterface from '../../components/ChatInterface';
import { ChatProvider } from '../../context/ChatContext';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function ChatContent() {
  const searchParams = useSearchParams();
  const chatKey = searchParams.get('new') || 'default';
  
  return (
    <ChatProvider>
      <ChatInterface key={chatKey} />
    </ChatProvider>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={null}>
      <ChatContent />
    </Suspense>
  );
}