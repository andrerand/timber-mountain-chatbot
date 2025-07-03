import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-full flex items-center justify-center" style={{backgroundColor: '#1F1F1F', padding: '40px'}}>
      {/* Rounded Rectangle Container */}
      <div style={{
        width: '760px',
        border: '0.5px solid #D5BBA2',
        borderRadius: '16px',
        padding: '40px',
        backgroundColor: '#1F1F1F'
      }}>
        {/* Title */}
        <h1 className="text-4xl font-bold mb-12 text-center" style={{fontFamily: 'PT Serif', color: '#D5BBA2'}}>
          About Timber Mountain
        </h1>

        {/* Image Container */}
        <div className="mb-12 flex justify-center">
          <div style={{width: '600px', height: '400px', borderRadius: '16px', overflow: 'hidden'}}>
            <Image
              src="/images/timber-mountain-roller-coaster.png"
              alt="Timber Mountain Roller Coaster"
              width={600}
              height={400}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>

        {/* First Text Section */}
        <div className="mb-10">
          <p className="text-base leading-relaxed" style={{color: '#FFFFFF', fontFamily: 'PT Serif'}}>
            Timber Mountain is a fictional Wild West-themed amusement park located in Northern California. 
            Attracting nearly 4 million visitors annually, it ranks as the state's third-largest ticketed tourist destination, 
            behind Disneyland Resort and Universal Studios Hollywood.
          </p>
        </div>

        {/* Second Text Section */}
        <div className="mb-10">
          <p className="text-base leading-relaxed" style={{color: '#FFFFFF', fontFamily: 'PT Serif'}}>
            Renowned for its immersive design, Timber Mountain recreates a bustling 1800s frontier town nestled 
            within a majestic forest. The park offers a variety of attractions, including adrenaline-pumping roller 
            coasters, majestic dark rides, riveting stage performances, falconry shows, and a petting zoo.
          </p>
        </div>

        {/* Third Text Section - Theme Park Industry */}
        <div>
          <h2 className="text-2xl font-bold mb-6" style={{fontFamily: 'PT Serif', color: '#D5BBA2'}}>
            About the Theme Park Industry
          </h2>
          <p className="text-base leading-relaxed" style={{color: '#FFFFFF', fontFamily: 'PT Serif'}}>
            Theme parks aren't just playgrounds — they're powerhouses of imagination, escapism, and revenue. 
            Blending thrill rides, live entertainment, and immersive environments, theme parks have become one of the 
            most lucrative segments in the travel and entertainment industry.
          </p>
          <br />
          <p className="text-base leading-relaxed" style={{color: '#FFFFFF', fontFamily: 'PT Serif'}}>
            In 2023, the global theme park market was valued at approximately $52 billion, with projections indicating 
            growth to $125 billion by 2032, reflecting a compound annual growth rate (CAGR) of 10%.
          </p>
        </div>
      </div>
    </div>
  );
}