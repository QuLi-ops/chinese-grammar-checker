'use client';

import React, { useState } from 'react';

interface GrammarInputProps {
  onSubmit: (text: string, responseLanguage: string, inputType: string, style: string) => void;
}

const GrammarInput: React.FC<GrammarInputProps> = ({ onSubmit }) => {
  const [text, setText] = useState('');
  const [responseLanguage, setResponseLanguage] = useState('Chinese');
  const [inputType, setInputType] = useState('sentence');
  const [style, setStyle] = useState('formal');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(text, responseLanguage, inputType, style);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex space-x-4 items-start">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Response Language
            </label>
            <select
              value={responseLanguage}
              onChange={(e) => setResponseLanguage(e.target.value)}
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
                  onChange={(e) => setStyle(e.target.value)}
                  className="form-radio text-blue-600"
                />
                <span className="ml-2">Formal</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="informal"
                  checked={style === 'informal'}
                  onChange={(e) => setStyle(e.target.value)}
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
                onChange={(e) => setInputType(e.target.value)}
                className="form-radio text-blue-600"
              />
              <span className="ml-2">Sentence</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="paragraph"
                checked={inputType === 'paragraph'}
                onChange={(e) => setInputType(e.target.value)}
                className="form-radio text-blue-600"
              />
              <span className="ml-2">Paragraph</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="article"
                checked={inputType === 'article'}
                onChange={(e) => setInputType(e.target.value)}
                className="form-radio text-blue-600"
              />
              <span className="ml-2">Article</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Input Text
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to check..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[150px]"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Check Grammar
          </button>
        </div>
      </form>
    </div>
  );
};

export default GrammarInput; 