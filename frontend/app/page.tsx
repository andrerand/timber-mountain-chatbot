import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen flex justify-center overflow-y-auto" style={{backgroundColor: '#1F1F1F', padding: '40px'}}>
      {/* Rounded Rectangle Container */}
      <div style={{
        width: '760px',
        border: '0.5px solid #D5BBA2',
        borderRadius: '16px',
        padding: '40px',
        backgroundColor: '#1F1F1F'
      }}>
        {/* Image Container */}
        <div style={{marginBottom: '30px'}}>
          <div style={{width: '100%', height: '315px', overflow: 'hidden'}}>
            <Image
              src="/images/timber-mountain-roller-coaster.png"
              alt="Timber Mountain Roller Coaster"
              width={680}
              height={315}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>

        {/* Title */}
        <h2 className="font-bold" style={{fontFamily: 'PT Serif', color: '#FFFFFF', marginBottom: '25px', fontSize: '19.44px'}}>
          About Timber Mountain
        </h2>

        {/* About Timber Mountain Text Section */}
        <div style={{marginBottom: '25px'}}>
          <p className="text-sm" style={{color: '#FFFFFF', fontFamily: 'PT Serif', lineHeight: '1.8'}}>
            Timber Mountain is a fictional Wild West-themed amusement park located in Northern California. 
            Attracting nearly 4 million visitors annually, it ranks as the state's third-largest ticketed tourist destination, 
            behind Disneyland Resort and Universal Studios Hollywood.
          </p>
          <p className="text-sm" style={{color: '#FFFFFF', fontFamily: 'PT Serif', marginTop: '25px', lineHeight: '1.8'}}>
            Renowned for its immersive design, Timber Mountain recreates a bustling 1800s frontier town nestled 
            within a majestic forest. The park offers a variety of attractions, including adrenaline-pumping roller 
            coasters, majestic dark rides, riveting stage performances, falconry shows, and a petting zoo.
          </p>
        </div>

        {/* Third Text Section - Theme Park Industry */}
        <div>
          <h2 className="font-bold" style={{fontFamily: 'PT Serif', color: '#FFFFFF', marginBottom: '25px', fontSize: '19.44px'}}>
            About the Theme Park Industry
          </h2>
          <p className="text-sm" style={{color: '#FFFFFF', fontFamily: 'PT Serif', lineHeight: '1.8'}}>
            Theme parks aren't just playgrounds — they're powerhouses of imagination, escapism, and revenue. 
            Blending thrill rides, live entertainment, and immersive environments, theme parks have become one of the 
            most lucrative segments in the travel and entertainment industry.
          </p>
          <p className="text-sm" style={{color: '#FFFFFF', fontFamily: 'PT Serif', marginTop: '25px', lineHeight: '1.8'}}>
            In 2023, the global theme park market was valued at approximately $52 billion, with projections indicating 
            growth to $125 billion by 2032, reflecting a compound annual growth rate (CAGR) of 10%.
          </p>
        </div>
      </div>
    </div>
  );
}