'use client';

import ChatInterface from '../../components/ChatInterface';
import { ChatProvider } from '../../context/ChatContext';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function ChatContent() {
  const searchParams = useSearchParams();
  const newChat = searchParams.get('new');
  const sessionId = searchParams.get('session');
  const chatKey = newChat || sessionId || 'default';
  
  return (
    <ChatProvider>
      <ChatInterface key={chatKey} sessionId={sessionId || undefined} />
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