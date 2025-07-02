'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Message, ChatSession } from '@/lib/types';

interface ChatContextType {
  currentChat: ChatSession | null;
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  addMessage: (message: Message) => void;
  startNewChat: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  saveToRecentChats: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [currentChat, setCurrentChat] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addMessage = useCallback((message: Message) => {
    setMessages((prev) => [...prev, message]);
    setError(null);
  }, []);

  const startNewChat = useCallback(() => {
    const newChat: ChatSession = {
      id: crypto.randomUUID(),
      title: 'New Chat',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setCurrentChat(newChat);
    setMessages([]);
    setError(null);
  }, []);

  const saveToRecentChats = useCallback(() => {
    if (!currentChat || messages.length === 0) return;

    // Get title from first message or use default
    const title = messages[0]?.content.slice(0, 50) + '...' || 'New Chat';
    
    const updatedChat: ChatSession = {
      ...currentChat,
      title,
      messages,
      updatedAt: new Date(),
    };

    // Get existing chats from localStorage
    const stored = localStorage.getItem('recentChats');
    const recentChats = stored ? JSON.parse(stored) : [];
    
    // Remove current chat if it exists and add to front
    const filtered = recentChats.filter((chat: ChatSession) => chat.id !== currentChat.id);
    const updated = [updatedChat, ...filtered].slice(0, 10); // Keep only 10 most recent
    
    localStorage.setItem('recentChats', JSON.stringify(updated));
    setCurrentChat(updatedChat);
  }, [currentChat, messages]);

  const setLoading = useCallback((loading: boolean) => {
    setIsLoading(loading);
  }, []);

  const value = {
    currentChat,
    messages,
    isLoading,
    error,
    addMessage,
    startNewChat,
    setLoading,
    setError,
    saveToRecentChats,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}