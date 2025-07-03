'use client';


export default function TypingIndicator() {
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