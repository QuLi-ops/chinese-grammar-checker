'use client';

import React from 'react';

interface VoiceOutputProps {
  text: string;
  language: 'zh-CN' | 'en-US';
  isEnabled?: boolean;
}

const VoiceOutput: React.FC<VoiceOutputProps> = ({ text, language, isEnabled = false }) => {
  const handleSpeak = () => {
    if (!isEnabled || !window.speechSynthesis) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    
    window.speechSynthesis.speak(utterance);
  };

  if (!isEnabled) return null;

  return (
    <div className="mt-4">
      <button
        onClick={handleSpeak}
        className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        disabled={!window.speechSynthesis}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.536 8.464a5 5 0 010 7.072M17.95 6.05a8 8 0 010 11.9M6.5 8.5l4-4v15l-4-4H3a1 1 0 01-1-1v-5a1 1 0 011-1h3.5z"
          />
        </svg>
        <span>Play Text</span>
      </button>
    </div>
  );
};

export default VoiceOutput; 