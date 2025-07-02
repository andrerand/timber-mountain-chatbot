import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Timber Mountain AI Chat',
  description: 'Ask me about Timber Mountain\'s A/B test results',
  icons: {
    icon: '/images/roller-coaster-emoji.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen">
          <Sidebar />
          <main className="flex-1 ml-[250px] overflow-hidden">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}