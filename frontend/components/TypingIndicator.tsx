'use client';

import { useState, useEffect } from 'react';

interface TypingIndicatorProps {
  startTime?: Date | null;
  isLoading?: boolean;
  visible?: boolean;
  finalTime?: number | null;
}

export default function TypingIndicator({ startTime, isLoading, visible, finalTime }: TypingIndicatorProps) {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (!startTime) return;

    // Calculate initial elapsed time immediately
    const now = new Date();
    const initialElapsed = (now.getTime() - startTime.getTime()) / 1000;
    setElapsedTime(initialElapsed);

    const interval = setInterval(() => {
      const now = new Date();
      const elapsed = (now.getTime() - startTime.getTime()) / 1000;
      setElapsedTime(elapsed);
    }, 100); // Update every 100ms for smooth counter

    return () => clearInterval(interval);
  }, [startTime]);
  
  if (!visible) {
    return null;
  }
  
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
              Time Elapsed: {(finalTime ?? elapsedTime).toFixed(2)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}