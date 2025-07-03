'use client';

import { Message as MessageType } from '@/lib/types';
import ReactMarkdown from 'react-markdown';

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
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '40px'
        }}>
          <p className="text-sm" style={{
            color: '#FFFFFF',
            fontFamily: 'PT Serif',
            fontSize: '15px',
            fontWeight: 'bold'
          }}>
            🎢&nbsp;&nbsp;&nbsp;AI Response:
          </p>
          {message.elapsedTime !== undefined && (
            <p className="text-sm" style={{
              color: '#333537',
              fontFamily: 'PT Serif',
              fontSize: '15px',
              fontWeight: 'bold'
            }}>
              Time Elapsed: {message.elapsedTime.toFixed(2)}
            </p>
          )}
        </div>
        <div className="text-sm markdown-content" style={{fontFamily: 'PT Serif', lineHeight: '1.6', paddingBottom: '50px'}}>
          <ReactMarkdown
            components={{
              h1: ({children}) => <h1 style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', marginTop: '24px'}}>{children}</h1>,
              h2: ({children}) => <h2 style={{fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', marginTop: '20px'}}>{children}</h2>,
              h3: ({children}) => <h3 style={{fontSize: '18px', fontWeight: 'bold', marginBottom: '10px', marginTop: '16px'}}>{children}</h3>,
              p: ({children}) => <p style={{marginBottom: '12px'}}>{children}</p>,
              ul: ({children}) => <ul style={{marginBottom: '12px', paddingLeft: '20px'}}>{children}</ul>,
              li: ({children}) => <li style={{marginBottom: '4px', listStyle: 'disc'}}>{children}</li>,
              strong: ({children}) => <strong style={{fontWeight: 'bold'}}>{children}</strong>,
              a: ({children, href}) => <a href={href} style={{color: '#D5BBA2', textDecoration: 'underline'}} target="_blank" rel="noopener noreferrer">{children}</a>,
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}