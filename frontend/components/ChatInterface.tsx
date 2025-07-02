'use client';

import { useState, useRef, useEffect, FormEvent, KeyboardEvent } from 'react';
import { Message as MessageType } from '../lib/types';
import { sendMessage } from '../lib/api';
import Message from './Message';
import ThoughtStarters from './ThoughtStarters';
import TypingIndicator from './TypingIndicator';

export default function ChatInterface() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    // Save messages to localStorage when they change
    if (messages.length > 0) {
      const chatSession = {
        id: crypto.randomUUID(),
        title: messages[0].content.slice(0, 50) + '...',
        messages,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      const stored = localStorage.getItem('recentChats');
      const recentChats = stored ? JSON.parse(stored) : [];
      const updated = [chatSession, ...recentChats.slice(0, 9)];
      localStorage.setItem('recentChats', JSON.stringify(updated));
      
      // Trigger sidebar update
      window.dispatchEvent(new Event('storage'));
    }
  }, [messages]);

  const handleSubmit = async (e?: FormEvent) => {
    e?.preventDefault();
    
    const query = input.trim();
    if (!query || isLoading) return;

    // Add user message
    const userMessage: MessageType = {
      id: crypto.randomUUID(),
      role: 'user',
      content: query,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Send to API
      const response = await sendMessage(query);
      
      // Add AI response
      const aiMessage: MessageType = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      // Error handling is done in the API client
      console.error('Chat error:', error);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleThoughtStarter = (question: string) => {
    setInput(question);
    inputRef.current?.focus();
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center p-8">
            <div className="text-center">
              <h1 className="text-3xl font-medium mb-2">
                Hello, Adventurer
              </h1>
              <p className="text-xl text-secondary mb-8">
                Ask me about Timber Mountain&apos;s A/B test results.
              </p>
              <ThoughtStarters onSelect={handleThoughtStarter} />
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
            {isLoading && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-[#3d3d3d] p-4">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about A/B test results..."
              disabled={isLoading}
              className="w-full px-4 py-3 pr-12 bg-input rounded-lg border border-[#3d3d3d] focus:outline-none focus:border-[#d4a574] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-secondary hover:text-gold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.925 10.625L7.5 8.75L10 10L11.25 7.5L9.375 2.925C9.125 2.3 9.875 1.8 10.425 2.175L17.075 7.5C17.575 7.875 17.575 8.625 17.05 8.975L3.05 17.975C2.475 18.35 1.775 17.825 1.975 17.175L4.5 10L2.925 10.625Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
          <p className="text-xs text-secondary text-center mt-2">
            Press Enter to send • Shift+Enter for new line
          </p>
        </form>
      </div>
    </div>
  );
}