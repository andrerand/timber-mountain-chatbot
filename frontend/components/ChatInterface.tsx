'use client';

import { useState, useRef, useEffect, FormEvent, KeyboardEvent } from 'react';
import { Message as MessageType } from '@/lib/types';
import { sendMessage } from '@/lib/api';
import Message from './Message';
import ThoughtStarters from './ThoughtStarters';
import TypingIndicator from './TypingIndicator';

export default function ChatInterface() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [requestStartTime, setRequestStartTime] = useState<Date | null>(null);
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
    setRequestStartTime(new Date());

    try {
      // Send to API
      const response = await sendMessage(query);
      
      // Add AI response
      const endTime = new Date();
      const elapsedTime = requestStartTime ? (endTime.getTime() - requestStartTime.getTime()) / 1000 : 0;
      
      const aiMessage: MessageType = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: response,
        timestamp: endTime,
        elapsedTime: elapsedTime,
      };
      
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      // Error handling is done in the API client
      console.error('Chat error:', error);
    } finally {
      setIsLoading(false);
      setRequestStartTime(null);
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
            <div>
              <div className="w-[680px] mx-auto" style={{marginBottom: '60px'}}>
                <h1 className="font-bold mb-2 text-left" style={{fontWeight: 'bold', fontSize: '27px', lineHeight: '2.5rem'}}>
                  Hello, Adventurer.
                </h1>
                <p className="font-bold text-left" style={{color: '#B7B7B7', fontSize: '27px', lineHeight: '2.5rem', fontWeight: 'bold'}}>
                  Ask me about Timber Mountain&apos;s A/B test results.
                </p>
              </div>
              
              {/* Input Field */}
              <div className="w-[750px] mx-auto" style={{marginBottom: '60px'}}>
                <form onSubmit={handleSubmit}>
                  <div className="relative">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      placeholder="Ask AI..."
                      disabled={isLoading}
                      className="w-full h-[60px] rounded-full text-white placeholder-gray-500"
                      style={{
                        backgroundColor: 'transparent',
                        border: isFocused ? '0.5px solid #D5BBA2' : '0.5px solid #333537',
                        paddingLeft: '35px',
                        paddingRight: '70px',
                        fontSize: '14px',
                        fontFamily: 'PT Serif',
                        color: '#FFFFFF',
                        outline: 'none'
                      }}
                    />
                    <button
                      type="submit"
                      disabled={!input.trim() || isLoading}
                      className="absolute top-1/2 -translate-y-1/2 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      style={{
                        right: '15px',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: input.trim() && !isLoading ? '#FFFFFF' : '#6B6B6B',
                        color: input.trim() && !isLoading ? '#6B6B6B' : '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        border: 'none'
                      }}
                    >
                      ↑
                    </button>
                  </div>
                </form>
              </div>
              
              <ThoughtStarters onSelect={handleThoughtStarter} />
            </div>
          </div>
        ) : (
          <>
            <div className="w-[680px] mx-auto" style={{paddingTop: '30px', paddingBottom: '32px'}}>
              {messages.map((message) => (
                <Message key={message.id} message={message} />
              ))}
              {isLoading && <TypingIndicator startTime={requestStartTime} />}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input Field - Same style as New Chat page */}
            <div className="w-[750px] mx-auto" style={{marginTop: '60px', marginBottom: '60px'}}>
              <form onSubmit={handleSubmit}>
                <div className="relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Ask AI..."
                    disabled={isLoading}
                    className="w-full h-[60px] rounded-full text-white placeholder-gray-500"
                    style={{
                      backgroundColor: 'transparent',
                      border: isFocused ? '0.5px solid #D5BBA2' : '0.5px solid #333537',
                      paddingLeft: '35px',
                      paddingRight: '70px',
                      fontSize: '14px',
                      fontFamily: 'PT Serif',
                      color: '#FFFFFF',
                      outline: 'none'
                    }}
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="absolute top-1/2 -translate-y-1/2 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    style={{
                      right: '15px',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: input.trim() && !isLoading ? '#FFFFFF' : '#6B6B6B',
                      color: input.trim() && !isLoading ? '#6B6B6B' : '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '18px',
                      fontWeight: 'bold',
                      border: 'none'
                    }}
                  >
                    ↑
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </div>

    </div>
  );
}