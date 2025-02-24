'use client';

import GrammarInput from './components/GrammarInput';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Professional Chinese Grammar Checker
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Advanced AI-powered tool for checking Chinese grammar, style, and tone. Perfect for students, professionals, and Chinese learners.
          </p>
        </div>

        <GrammarInput />

        <section className="mt-16 prose prose-lg mx-auto">
          <h2>Why Use Our Chinese Grammar Checker?</h2>
          <p>
            Our Chinese Grammar Checker is an advanced tool designed to help you write better Chinese. 
            Whether you're a student learning Chinese, a professional writing business documents, or 
            someone looking to improve their Chinese writing skills, our tool provides comprehensive 
            grammar checking and suggestions.
          </p>

          <h3>Key Features</h3>
          <ul>
            <li>
              <strong>Real-time Grammar Checking:</strong> Instantly identify grammar mistakes as you type
            </li>
            <li>
              <strong>Contextual Corrections:</strong> Get suggestions that consider the context of your writing
            </li>
            <li>
              <strong>Style Recommendations:</strong> Choose between formal and informal writing styles
            </li>
            <li>
              <strong>Detailed Explanations:</strong> Learn from your mistakes with clear, educational explanations
            </li>
            <li>
              <strong>Voice Output:</strong> Listen to the correct pronunciation of your text
            </li>
          </ul>

          <h3>Common Chinese Grammar Challenges</h3>
          <p>
            Writing in Chinese presents unique challenges that our grammar checker helps you overcome:
          </p>
          <ul>
            <li>Proper word order in Chinese sentences</li>
            <li>Correct usage of measure words (量词)</li>
            <li>Appropriate particle usage (了, 过, 着)</li>
            <li>Complex character combinations</li>
            <li>Formal vs. informal expression</li>
          </ul>

          <h3>How It Works</h3>
          <ol>
            <li>Enter your Chinese text in the input box</li>
            <li>Select your preferred response language (Chinese or English)</li>
            <li>Choose your writing style (formal or informal)</li>
            <li>Click "Check Grammar" to receive instant feedback</li>
            <li>Review the detailed corrections and explanations</li>
          </ol>

          <h2>Tips for Better Chinese Writing</h2>
          <p>
            To improve your Chinese writing skills, consider these best practices:
          </p>
          <ul>
            <li>Start with simple sentence structures and gradually increase complexity</li>
            <li>Pay attention to word order, as it's crucial in Chinese grammar</li>
            <li>Learn common measure words and their appropriate usage</li>
            <li>Practice using different particles to express time and state</li>
            <li>Study the differences between formal and informal Chinese</li>
          </ul>

          <h2>Who Can Benefit?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h4 className="font-bold mb-2">Students</h4>
              <p>Perfect for homework, essays, and academic writing in Chinese</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h4 className="font-bold mb-2">Professionals</h4>
              <p>Ideal for business communications and formal documents</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h4 className="font-bold mb-2">Language Learners</h4>
              <p>Essential tool for improving Chinese writing skills</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h4 className="font-bold mb-2">Content Creators</h4>
              <p>Valuable for creating accurate Chinese content</p>
            </div>
          </div>

          <h2>Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h4 className="font-bold">Is this grammar checker free to use?</h4>
              <p>Yes, our basic grammar checking features are completely free to use.</p>
            </div>
            <div>
              <h4 className="font-bold">How accurate is the grammar checker?</h4>
              <p>Our AI-powered system is highly accurate and continuously improving through machine learning.</p>
            </div>
            <div>
              <h4 className="font-bold">Can it check Traditional Chinese characters?</h4>
              <p>Yes, our system supports both Simplified and Traditional Chinese characters.</p>
            </div>
            <div>
              <h4 className="font-bold">What types of errors can it detect?</h4>
              <p>Our system detects grammar errors, word usage mistakes, punctuation errors, and style inconsistencies.</p>
            </div>
          </div>

          <h2>Start Writing Better Chinese Today</h2>
          <p>
            Whether you're writing an essay, preparing a business document, or learning Chinese, 
            our grammar checker is here to help. Try it now and experience the difference in 
            your Chinese writing quality.
          </p>
        </section>

        <footer className="mt-16 text-center text-gray-600">
          <p>© 2024 Chinese Grammar Checker. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
