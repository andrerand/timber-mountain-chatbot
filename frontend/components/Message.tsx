'use client';

import { Message as MessageType } from '@/lib/types';

interface MessageProps {
  message: MessageType;
}

export default function Message({ message }: MessageProps) {
  const isUser = message.role === 'user';

  if (isUser) {
    // User message - right-aligned with background
    return (
      <div className="flex justify-end" style={{paddingTop: '12px', paddingBottom: '50px'}}>
        <div 
          className="w-[580px] rounded-2xl"
          style={{
            backgroundColor: '#333537',
            paddingLeft: '40px',
            paddingRight: '40px',
            paddingTop: '20px',
            paddingBottom: '20px',
            borderRadius: '20px'
          }}
        >
          <p className="text-sm text-white text-right" style={{fontFamily: 'PT Serif', lineHeight: '1.6'}}>
            {message.content}
          </p>
        </div>
      </div>
    );
  }

  // AI message - left-aligned with headline
  return (
    <div className="py-6">
      <div>
        <p className="text-sm" style={{
          color: '#FFFFFF',
          fontFamily: 'PT Serif',
          fontSize: '15px',
          fontWeight: 'bold',
          marginBottom: '40px'
        }}>
          🎢&nbsp;&nbsp;&nbsp;AI Response:
        </p>
        <div className="text-sm" style={{fontFamily: 'PT Serif', lineHeight: '1.6'}}>
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>
      </div>
    </div>
  );
}