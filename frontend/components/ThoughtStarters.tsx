'use client';

interface ThoughtStartersProps {
  onSelect: (question: string) => void;
}

const starterQuestions = [
  "What were the results of the AI Trip Planner test?",
  "Which A/B test had the highest revenue impact?",
  "Tell me about the homepage personalization test.",
  "What was the outcome of the special offers countdown timer?",
  "How did the booking flow consolidation test perform?",
];

export default function ThoughtStarters({ onSelect }: ThoughtStartersProps) {
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-center text-xl font-medium mb-6 text-secondary">
        Ask me about Timber Mountain&apos;s A/B test results
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {starterQuestions.map((question, index) => (
          <button
            key={index}
            onClick={() => onSelect(question)}
            className="p-4 text-left bg-message rounded-lg border border-[#3d3d3d] transition-hover hover:border-[#d4a574] hover:bg-[#4d4d4d] animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <p className="text-sm">{question}</p>
          </button>
        ))}
      </div>
    </div>
  );
}