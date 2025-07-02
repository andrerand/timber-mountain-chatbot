'use client';

export default function TypingIndicator() {
  return (
    <div className="flex gap-4 p-6 bg-[#262626]">
      <div className="flex-shrink-0 w-8 h-8 rounded-full overflow-hidden bg-message flex items-center justify-center">
        <span className="text-xs">AI</span>
      </div>
      
      <div className="flex items-center gap-1 pt-2">
        <span className="inline-block w-2 h-2 bg-gray-500 rounded-full animate-pulse-slow"></span>
        <span className="inline-block w-2 h-2 bg-gray-500 rounded-full animate-pulse-slow" style={{ animationDelay: '0.2s' }}></span>
        <span className="inline-block w-2 h-2 bg-gray-500 rounded-full animate-pulse-slow" style={{ animationDelay: '0.4s' }}></span>
      </div>
    </div>
  );
}