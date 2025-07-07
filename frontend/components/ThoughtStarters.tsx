'use client';

interface ThoughtStartersProps {
  onSelect: (question: string) => void;
}

const starterQuestions = [
  "List all of the A/B tests we have run.",
  "Which A/B test drove the largest conversion lift?",
  "What was the impact of customizing Timber Mountain homepage for international visitors?",
  "Why didn't changing the CTAs from \"Learn More\" to \"Explore More\" lift engagement rates?",
  "Describe the variants in the Homepage Special Offers Carousel Test.",
];

export default function ThoughtStarters({ onSelect }: ThoughtStartersProps) {
  return (
    <div className="w-[680px] mx-auto">
      <h3 style={{fontSize: '14px', color: '#B7B7B7', marginBottom: '10px'}}>
        Thought Starters:
      </h3>
      
      <div>
        {starterQuestions.map((question, index) => (
          <div key={index}>
            <button
              onClick={() => onSelect(question)}
              className="w-full text-left hover:opacity-80 transition-opacity"
              style={{backgroundColor: 'transparent', border: 'none', paddingTop: '20px', paddingBottom: '20px'}}
            >
              <div className="flex justify-between items-center">
                <span style={{color: '#B7B7B7', fontFamily: 'PT Serif', fontSize: '14px'}}>
                  {question}
                </span>
                <span style={{color: '#B7B7B7', marginLeft: '20px'}}>
                  →
                </span>
              </div>
            </button>
            {index < starterQuestions.length - 1 && (
              <div style={{borderBottom: '0.5px solid #5D5D5D'}}></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}