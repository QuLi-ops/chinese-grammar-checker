'use client';

import GrammarInput from './components/GrammarInput';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Chinese Grammar Checker
        </h1>
        <div className="max-w-4xl mx-auto">
          <GrammarInput />
        </div>
      </div>
    </main>
  );
}
