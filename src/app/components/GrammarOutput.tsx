'use client';

import React from 'react';
import VoiceOutput from './VoiceOutput';

interface Error {
  start: number;
  end: number;
  severity: 'low' | 'medium' | 'high';
  message: string;
}

interface GrammarOutputProps {
  text: string;
  isCorrect: boolean;
  errors?: Error[];
  correctedText?: string;
  explanations?: string[];
}

const GrammarOutput: React.FC<GrammarOutputProps> = ({
  text,
  isCorrect,
  errors = [],
  correctedText,
  explanations = [],
}) => {
  const renderText = () => {
    if (isCorrect) {
      return (
        <div className="flex items-center text-green-600">
          <svg
            className="w-6 h-6 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span>Grammatically Correct</span>
        </div>
      );
    }

    let result = [];
    let lastIndex = 0;

    errors.forEach((error, index) => {
      // Add text before error
      if (error.start > lastIndex) {
        result.push(
          <span key={`text-${index}`}>
            {text.slice(lastIndex, error.start)}
          </span>
        );
      }

      // Add error text
      const severityColors = {
        low: 'bg-yellow-100 border-yellow-400',
        medium: 'bg-orange-100 border-orange-400',
        high: 'bg-red-100 border-red-400',
      };

      result.push(
        <span
          key={`error-${index}`}
          className={`relative group cursor-help ${severityColors[error.severity]} border-b-2`}
        >
          {text.slice(error.start, error.end)}
          <span className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-sm rounded whitespace-nowrap">
            {error.message}
          </span>
        </span>
      );

      lastIndex = error.end;
    });

    // Add remaining text
    if (lastIndex < text.length) {
      result.push(
        <span key="text-final">{text.slice(lastIndex)}</span>
      );
    }

    return result;
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Check Results
          </h3>
          <div className="p-4 bg-gray-50 rounded-md">
            {renderText()}
          </div>
          <VoiceOutput
            text={text}
            language="zh-CN"
            isEnabled={false}
          />
        </div>

        {!isCorrect && explanations.length > 0 && (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Detailed Explanations
            </h3>
            <div className="p-4 bg-blue-50 rounded-md text-blue-700">
              <ul className="list-decimal list-inside space-y-2">
                {explanations.map((explanation, index) => (
                  <li key={index}>{explanation}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {!isCorrect && correctedText && (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Suggested Corrections
            </h3>
            <div className="p-4 bg-green-50 rounded-md text-green-700">
              {correctedText}
            </div>
            <VoiceOutput
              text={correctedText}
              language="zh-CN"
              isEnabled={false}
            />
          </div>
        )}

        {/* Temporarily commented out severity indicators
        {!isCorrect && errors.length > 0 && (
          <div className="mt-4">
            <div className="flex space-x-4">
              <div className="flex items-center">
                <span className="w-3 h-3 bg-yellow-100 border border-yellow-400 rounded-full mr-2"></span>
                <span className="text-sm text-gray-600">Minor Error</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-orange-100 border border-orange-400 rounded-full mr-2"></span>
                <span className="text-sm text-gray-600">Moderate Error</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-red-100 border border-red-400 rounded-full mr-2"></span>
                <span className="text-sm text-gray-600">Severe Error</span>
              </div>
            </div>
          </div>
        )}
        */}
      </div>
    </div>
  );
};

export default GrammarOutput; 