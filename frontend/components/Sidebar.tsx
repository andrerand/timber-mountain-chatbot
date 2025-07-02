'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ChatSession } from '../lib/types';

export default function Sidebar() {
  const pathname = usePathname();
  const [recentChats, setRecentChats] = useState<ChatSession[]>([]);

  useEffect(() => {
    // Load recent chats from localStorage
    const loadRecentChats = () => {
      const stored = localStorage.getItem('recentChats');
      if (stored) {
        setRecentChats(JSON.parse(stored));
      }
    };

    loadRecentChats();
    
    // Listen for storage events to update recent chats
    window.addEventListener('storage', loadRecentChats);
    
    return () => {
      window.removeEventListener('storage', loadRecentChats);
    };
  }, []);

  const isActive = (path: string) => pathname === path;

  return (
    <aside className="fixed left-0 top-0 h-full w-[250px] bg-sidebar border-r border-[#3d3d3d]">
      {/* Logo */}
      <div className="p-6 border-b border-[#3d3d3d]">
        <Link href="/" className="block">
          <Image
            src="/images/timber-mountain-logo.png"
            alt="Timber Mountain"
            width={180}
            height={60}
            className="w-auto h-12"
            priority
          />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <Link
          href="/"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-hover hover-gold ${
            isActive('/') ? 'bg-[#3d3d3d] text-gold' : ''
          }`}
        >
          <Image
            src="/images/new-chat-icon.png"
            alt="New Chat"
            width={20}
            height={20}
            className="opacity-80"
          />
          <span className="font-medium">New Chat</span>
        </Link>

        <Link
          href="/about"
          className={`flex items-center gap-3 px-4 py-3 mt-2 rounded-lg transition-hover hover-gold ${
            isActive('/about') ? 'bg-[#3d3d3d] text-gold' : ''
          }`}
        >
          <Image
            src="/images/tree-icon-brown.png"
            alt="About"
            width={20}
            height={20}
            className="opacity-80"
          />
          <span className="font-medium">About Timber Mountain</span>
        </Link>
      </nav>

      {/* Recent Chats */}
      <div className="px-4 mt-8">
        <div className="flex items-center gap-2 px-4 mb-3 text-secondary">
          <Image
            src="/images/recent-chats-icon.png"
            alt="Recent Chats"
            width={16}
            height={16}
            className="opacity-60"
          />
          <span className="text-sm font-medium">Recent Chats</span>
        </div>
        
        <div className="space-y-1">
          {recentChats.length === 0 ? (
            <p className="px-4 py-2 text-sm text-secondary">No recent chats</p>
          ) : (
            recentChats.slice(0, 10).map((chat) => (
              <Link
                key={chat.id}
                href={`/chat/${chat.id}`}
                className="block px-4 py-2 text-sm rounded-lg truncate transition-hover hover-gold hover:bg-[#3d3d3d]"
              >
                {chat.title}
              </Link>
            ))
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#3d3d3d]">
        <div className="flex items-center justify-center gap-2 text-xs text-secondary">
          <Image
            src="/images/roller-coaster-emoji.png"
            alt="Roller Coaster"
            width={16}
            height={16}
          />
          <span>Powered by AI</span>
        </div>
      </div>
    </aside>
  );
}