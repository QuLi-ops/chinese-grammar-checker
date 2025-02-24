'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface VoiceOutputProps {
  text: string;
  language: string;
  isEnabled: boolean;
}

const VoiceOutput: React.FC<VoiceOutputProps> = ({
  text,
  language,
  isEnabled = false,
}) => {
  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language;
      window.speechSynthesis.speak(utterance);
    }
  };

  if (!isEnabled) return null;

  return (
    <div className="mt-4 flex justify-end">
      <Button
        variant="outline"
        size="sm"
        className={cn(
          "flex items-center space-x-2",
          "hover:bg-secondary"
        )}
        onClick={handleSpeak}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M12 18.012l-7-4.2V10.2l7-4.2v12.012z"
          />
        </svg>
        <span>Listen</span>
      </Button>
    </div>
  );
};

export default VoiceOutput; 