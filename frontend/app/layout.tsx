import type { Metadata } from 'next';
import { PT_Serif } from 'next/font/google';
import './globals.css';
import Sidebar from '../components/Sidebar';

const ptSerif = PT_Serif({ weight: ['400', '700'], subsets: ['latin'] });

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
      <body className={ptSerif.className}>
        <div className="flex h-screen">
          <Sidebar />
          <main className="flex-1 ml-[250px] overflow-y-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}