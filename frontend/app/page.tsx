import Image from 'next/image';

export default function Home() {
  return (
    <div className="h-full overflow-y-auto">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <Image
          src="/images/timber-mountain-roller-coaster.png"
          alt="Timber Mountain Roller Coaster"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <h1 className="text-5xl font-bold mb-4 animate-fade-in">
            About Timber Mountain
          </h1>
          <p className="text-xl text-secondary max-w-2xl animate-fade-in" style={{ animationDelay: '200ms' }}>
            Where thrills meet data-driven decisions
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto p-8 space-y-8">
        {/* Park Overview */}
        <section className="animate-fade-in" style={{ animationDelay: '400ms' }}>
          <h2 className="text-2xl font-semibold mb-4 text-gold">Our Story</h2>
          <p className="text-lg leading-relaxed text-secondary">
            Timber Mountain is a premier theme park destination known for its world-class roller coasters 
            and family-friendly attractions. Since opening our gates in 1985, we&apos;ve welcomed over 50 million 
            visitors who&apos;ve experienced the magic of our carefully crafted adventures.
          </p>
        </section>

        {/* Innovation Section */}
        <section className="animate-fade-in" style={{ animationDelay: '600ms' }}>
          <h2 className="text-2xl font-semibold mb-4 text-gold">Innovation Through Data</h2>
          <p className="text-lg leading-relaxed text-secondary mb-4">
            At Timber Mountain, we believe in the power of data to enhance guest experiences. Our dedicated 
            team of data scientists continuously runs A/B tests to optimize every aspect of the park experience, 
            from ride queuing systems to food ordering processes.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-message p-6 rounded-lg border border-[#3d3d3d]">
              <h3 className="text-4xl font-bold text-gold mb-2">500+</h3>
              <p className="text-secondary">A/B Tests Conducted</p>
            </div>
            <div className="bg-message p-6 rounded-lg border border-[#3d3d3d]">
              <h3 className="text-4xl font-bold text-gold mb-2">23%</h3>
              <p className="text-secondary">Average Conversion Lift</p>
            </div>
            <div className="bg-message p-6 rounded-lg border border-[#3d3d3d]">
              <h3 className="text-4xl font-bold text-gold mb-2">$2.5M</h3>
              <p className="text-secondary">Annual Revenue Impact</p>
            </div>
          </div>
        </section>

        {/* AI Assistant Section */}
        <section className="animate-fade-in" style={{ animationDelay: '800ms' }}>
          <h2 className="text-2xl font-semibold mb-4 text-gold">Meet Your AI Assistant</h2>
          <p className="text-lg leading-relaxed text-secondary">
            This AI-powered chatbot provides instant access to insights from our comprehensive A/B testing 
            program. Ask about test results, methodologies, or recommendations to discover how we&apos;re using 
            data to create magical experiences for our guests.
          </p>
        </section>

        {/* Industry Recognition */}
        <section className="animate-fade-in" style={{ animationDelay: '1000ms' }}>
          <h2 className="text-2xl font-semibold mb-4 text-gold">Industry Recognition</h2>
          <div className="bg-message p-6 rounded-lg border border-[#3d3d3d]">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-gold">•</span>
                <span className="text-secondary">2023 Theme Park Innovation Award - Best Use of Data Analytics</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gold">•</span>
                <span className="text-secondary">Top 10 Most Visited Theme Parks in North America</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gold">•</span>
                <span className="text-secondary">Golden Ticket Award - Best Guest Experience</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-8 border-t border-[#3d3d3d] animate-fade-in" style={{ animationDelay: '1200ms' }}>
          <p className="text-secondary">
            © 2024 Timber Mountain Theme Park. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}