'use client';

import React, { useState } from 'react';
import { useGrammarCheck } from '../hooks/useGrammarCheck';
import GrammarOutput from './GrammarOutput';
import { ResponseLanguage, InputType, LanguageStyle, APIResponse } from '../types/grammar';

const GrammarInput: React.FC = () => {
  const [text, setText] = useState('');
  const [responseLanguage, setResponseLanguage] = useState<ResponseLanguage>('Chinese');
  const [inputType, setInputType] = useState<InputType>('sentence');
  const [style, setStyle] = useState<LanguageStyle>('formal');

  const { checkGrammar, isLoading, error, result } = useGrammarCheck();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await checkGrammar(text, responseLanguage, inputType, style);
  };

  return (
    <div>
      <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex space-x-4 items-start">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Response Language
              </label>
              <select
                value={responseLanguage}
                onChange={(e) => setResponseLanguage(e.target.value as ResponseLanguage)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Chinese">Chinese</option>
                <option value="English">English</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Language Style
              </label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="formal"
                    checked={style === 'formal'}
                    onChange={(e) => setStyle(e.target.value as LanguageStyle)}
                    className="form-radio text-blue-600"
                  />
                  <span className="ml-2">Formal</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="informal"
                    checked={style === 'informal'}
                    onChange={(e) => setStyle(e.target.value as LanguageStyle)}
                    className="form-radio text-blue-600"
                  />
                  <span className="ml-2">Informal</span>
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Input Type
            </label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="sentence"
                  checked={inputType === 'sentence'}
                  onChange={(e) => setInputType(e.target.value as InputType)}
                  className="form-radio text-blue-600"
                />
                <span className="ml-2">Sentence</span>
              </label>
              {/* Temporarily commented out paragraph and article options
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="paragraph"
                  checked={inputType === 'paragraph'}
                  onChange={(e) => setInputType(e.target.value as InputType)}
                  className="form-radio text-blue-600"
                />
                <span className="ml-2">Paragraph</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="article"
                  checked={inputType === 'article'}
                  onChange={(e) => setInputType(e.target.value as InputType)}
                  className="form-radio text-blue-600"
                />
                <span className="ml-2">Article</span>
              </label>
              */}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Input Text
            </label>
            <div className="relative">
              <textarea
                value={text}
                onChange={(e) => {
                  const newText = e.target.value;
                  if (newText.length <= 400) {
                    setText(newText);
                  }
                }}
                placeholder="Enter text to check... (Maximum 400 characters)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[150px]"
                maxLength={400}
              />
              <div className="absolute bottom-2 right-2 text-sm text-gray-500">
                {text.length}/400
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              disabled={isLoading}
            >
              {isLoading ? 'Checking...' : 'Check Grammar'}
            </button>
          </div>
        </form>
      </div>

      {isLoading && (
        <div className="mt-8 text-center text-gray-600">
          Checking grammar...
        </div>
      )}
      
      {error && (
        <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
          {error}
        </div>
      )}
      
      {!isLoading && !error && result && (
        <GrammarOutput
          text={result.text}
          isCorrect={result.isCorrect}
          errors={result.errors}
          correctedText={result.correctedText}
        />
      )}
    </div>
  );
};

export default GrammarInput; 