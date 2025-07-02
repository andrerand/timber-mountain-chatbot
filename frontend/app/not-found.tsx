import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="h-full flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <Image
          src="/images/roller-coaster-emoji.png"
          alt="404"
          width={80}
          height={80}
          className="mx-auto mb-6 opacity-50"
        />
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-lg text-secondary mb-8">
          Looks like this ride is temporarily closed. Let&apos;s get you back on track!
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-gold text-black font-medium rounded-lg hover:bg-opacity-90 transition-colors"
        >
          Return to Chat
        </Link>
      </div>
    </div>
  );
}