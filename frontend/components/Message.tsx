'use client';

import { Message as MessageType } from '@/lib/types';
import Image from 'next/image';

interface MessageProps {
  message: MessageType;
}

export default function Message({ message }: MessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex gap-4 p-6 ${isUser ? 'bg-transparent' : 'bg-[#262626]'} animate-fade-in`}>
      <div className="flex-shrink-0 w-8 h-8 rounded-full overflow-hidden bg-message flex items-center justify-center">
        {isUser ? (
          <span className="text-sm font-medium">You</span>
        ) : (
          <Image
            src="/images/roller-coaster-emoji.png"
            alt="AI"
            width={20}
            height={20}
          />
        )}
      </div>
      
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm">
            {isUser ? 'You' : 'Timber Mountain AI'}
          </span>
          <span className="text-xs text-secondary">
            {new Date(message.timestamp).toLocaleTimeString()}
          </span>
        </div>
        
        <div className="prose prose-invert max-w-none">
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>
      </div>
    </div>
  );
}