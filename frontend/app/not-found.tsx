import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="h-full flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <Image
          src="/images/roller-coaster-emoji.png"
          alt="404"
          width={40}
          height={40}
          className="mx-auto opacity-50"
          style={{marginBottom: '15px'}}
        />
        <h1 className="text-4xl font-bold" style={{marginBottom: '15px'}}>404 - Page Not Found</h1>
        <p className="text-secondary" style={{marginBottom: '15px', fontSize: '21px'}}>
          Looks like this ride is temporarily closed. Let&apos;s get you back on track!
        </p>
        <Link
          href="/chat"
          className="transition-opacity hover:opacity-80"
          style={{
            color: '#D5BBA2',
            textDecoration: 'none',
            fontSize: '21px',
            fontWeight: '500'
          }}
        >
          Return to Chat →
        </Link>
      </div>
    </div>
  );
}