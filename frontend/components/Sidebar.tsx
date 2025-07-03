'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ChatSession } from '@/lib/types';

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
    <aside className="fixed left-0 top-0 h-full w-[250px]" style={{backgroundColor: '#282A2C'}}>
      {/* Logo */}
      <div style={{paddingLeft: '20px', paddingRight: '20px', paddingTop: '30px', paddingBottom: '35px'}}>
        <Link href="/" className="block">
          <Image
            src="/images/timber-mountain-logo.png"
            alt="Timber Mountain"
            width={169}
            height={60}
            className="w-[169px] h-auto"
            priority
          />
        </Link>
      </div>

      {/* Navigation */}
      <nav>
        <div style={{paddingLeft: '20px', paddingRight: '20px', marginBottom: '28px'}}>
          <Link
            href="/about"
            className="flex items-center text-gold hover:opacity-80 transition-opacity py-2"
            style={{gap: '15px'}}
          >
            <Image
              src="/images/tree-icon-brown.png"
              alt="About"
              width={17}
              height={20}
              className="opacity-80"
            />
            <span className="text-[13px]">About Timber Mountain</span>
          </Link>
        </div>

        {/* Divider line */}
        <div style={{paddingLeft: '20px', paddingRight: '20px', marginBottom: '28px'}}>
          <div style={{borderBottom: '1px solid #4d4d4d'}}></div>
        </div>

        <div style={{paddingLeft: '20px', paddingRight: '20px', marginBottom: '28px'}}>
          <Link
            href="/"
            className="flex items-center text-gold hover:opacity-80 transition-opacity py-2"
            style={{gap: '15px'}}
          >
            <Image
              src="/images/new-chat-icon.png"
              alt="New Chat"
              width={15}
              height={15}
              className="opacity-80"
            />
            <span className="text-[13px]">New Chat</span>
          </Link>
        </div>

        {/* Divider line */}
        <div style={{paddingLeft: '20px', paddingRight: '20px', marginBottom: '28px'}}>
          <div style={{borderBottom: '1px solid #4d4d4d'}}></div>
        </div>
      </nav>

      {/* Recent Chats */}
      <div style={{paddingLeft: '20px', paddingRight: '20px'}}>
        <div className="flex items-center text-gold" style={{gap: '15px', marginBottom: '28px'}}>
          <Image
            src="/images/recent-chats-icon.png"
            alt="Recent Chats"
            width={12}
            height={12}
            className="opacity-60"
          />
          <span className="text-[13px]">Recent Chats</span>
        </div>
        
        <div className="space-y-4">
          {recentChats.length === 0 ? (
            <p className="text-[13px] text-light-gray">No recent chats</p>
          ) : (
            recentChats.slice(0, 10).map((chat) => (
              <Link
                key={chat.id}
                href={`/chat/${chat.id}`}
                className="block text-[13px] text-light-gray truncate hover:opacity-80 transition-opacity"
              >
                {chat.title}
              </Link>
            ))
          )}
        </div>
      </div>

    </aside>
  );
}