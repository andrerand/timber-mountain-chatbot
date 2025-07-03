'use client';

import { useState, useEffect } from 'react';

interface TypingIndicatorProps {
  startTime?: Date | null;
}

export default function TypingIndicator({ startTime }: TypingIndicatorProps) {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (!startTime) return;

    const interval = setInterval(() => {
      const now = new Date();
      const elapsed = (now.getTime() - startTime.getTime()) / 1000;
      setElapsedTime(elapsed);
    }, 100); // Update every 100ms for smooth counter

    return () => clearInterval(interval);
  }, [startTime]);
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
          {startTime && (
            <p className="text-sm" style={{
              color: '#333537',
              fontFamily: 'PT Serif',
              fontSize: '15px',
              fontWeight: 'bold'
            }}>
              Time Elapsed: {elapsedTime.toFixed(2)}
            </p>
          )}
        </div>
        <p className="text-sm" style={{ 
          color: '#B7B7B7', 
          fontFamily: 'PT Serif',
          fontSize: '14px'
        }}>
          AI thinking...
        </p>
      </div>
    </div>
  );
}