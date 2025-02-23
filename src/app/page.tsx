'use client';

import { useState } from 'react';
import GrammarInput from './components/GrammarInput';
import GrammarOutput from './components/GrammarOutput';

export default function Home() {
  const [checkResult, setCheckResult] = useState<{
    text: string;
    isCorrect: boolean;
    errors?: { start: number; end: number; severity: 'low' | 'medium' | 'high'; message: string; }[];
    correctedText?: string;
  } | null>(null);

  const handleGrammarCheck = async (
    text: string,
    responseLanguage: string,
    inputType: string,
    style: string
  ) => {
    // TODO: Will integrate with backend API for actual grammar checking
    // Using mock data for example
    const mockResult = {
      text,
      isCorrect: false,
      errors: [
        {
          start: 0,
          end: 3,
          severity: 'low' as const,
          message: `Suggested word change (${style} style)`,
        },
        {
          start: 5,
          end: 8,
          severity: 'high' as const,
          message: `Grammar error (${style} context)`,
        },
      ],
      correctedText: `This is an example of the corrected text in ${style} style`,
    };
    
    setCheckResult(mockResult);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Chinese Grammar Checker
        </h1>
        <div className="max-w-4xl mx-auto">
          <GrammarInput onSubmit={handleGrammarCheck} />
          {checkResult && (
            <GrammarOutput
              text={checkResult.text}
              isCorrect={checkResult.isCorrect}
              errors={checkResult.errors}
              correctedText={checkResult.correctedText}
            />
          )}
        </div>
      </div>
    </main>
  );
}
