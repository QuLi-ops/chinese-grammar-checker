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

        <section className="mt-16 prose prose-lg mx-auto space-y-12">
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="text-3xl font-bold mb-6">Why Use Our Chinese Grammar Checker?</h2>
            <p className="text-gray-700 leading-relaxed">
              Our chinese grammar checker is an advanced tool designed to help you write better Chinese. 
              Whether you're a student learning Chinese, a professional writing business documents, or 
              someone looking to improve their Chinese writing skills, our tool provides comprehensive 
              grammar checking and suggestions. As the most reliable chinese grammar checker available online,
              we focus on providing accurate, context-aware corrections for all your Chinese writing needs.
            </p>

            <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">Key Features of Our Chinese Grammar Checker</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <span className="text-blue-500 mt-1">✓</span>
                  <div>
                    <strong className="text-blue-900">Real-time Grammar Checking:</strong>
                    <span className="text-gray-700"> Our chinese grammar checker instantly identifies grammar mistakes as you type</span>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-blue-500 mt-1">✓</span>
                  <div>
                    <strong className="text-blue-900">Contextual Corrections:</strong>
                    <span className="text-gray-700"> Unlike basic grammar checkers, our chinese grammar checker provides suggestions that consider the full context of your writing</span>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-blue-500 mt-1">✓</span>
                  <div>
                    <strong className="text-blue-900">Style Recommendations:</strong>
                    <span className="text-gray-700"> The chinese grammar checker adapts to your chosen style, whether formal or informal</span>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-blue-500 mt-1">✓</span>
                  <div>
                    <strong className="text-blue-900">Detailed Explanations:</strong>
                    <span className="text-gray-700"> Each correction comes with clear, educational explanations</span>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-blue-500 mt-1">✓</span>
                  <div>
                    <strong className="text-blue-900">Voice Output:</strong>
                    <span className="text-gray-700"> Hear the correct pronunciation of your text</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="text-3xl font-bold mb-6">Common Chinese Grammar Challenges</h2>
            <p className="text-gray-700 mb-6">
              Writing in Chinese presents unique challenges that our grammar checker helps you overcome:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center space-x-2">
                  <span className="text-blue-500">•</span>
                  <span>Proper word order in Chinese sentences</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-blue-500">•</span>
                  <span>Correct usage of measure words (量词)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-blue-500">•</span>
                  <span>Appropriate particle usage (了, 过, 着)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-blue-500">•</span>
                  <span>Complex character combinations</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-blue-500">•</span>
                  <span>Formal vs. informal expression</span>
                </li>
              </ul>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center space-x-2">
                  <span className="text-blue-500">•</span>
                  <span>Time expressions and word order</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-blue-500">•</span>
                  <span>Proper use of 的, 地, and 得</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-blue-500">•</span>
                  <span>Complement usage (结果补语, 趋向补语, etc.)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-blue-500">•</span>
                  <span>Topic-comment structure</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-blue-500">•</span>
                  <span>Serial verb constructions</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="text-3xl font-bold mb-6">Common Mistakes and Solutions</h2>
            <p className="text-gray-700 mb-6">
              Watch out for these common mistakes and learn how to correct them:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center space-x-2">
                  <span className="text-blue-500">•</span>
                  <span>Word Choice Errors</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-blue-500">•</span>
                  <span>Structural Errors</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="text-3xl font-bold mb-6">Writing Style Guidelines</h2>
            <p className="text-gray-700 mb-6">
              Maintain text flow and coherence with these guidelines:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center space-x-2">
                  <span className="text-blue-500">•</span>
                  <span>Coherence and Cohesion</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-blue-500">•</span>
                  <span>Tone and Register</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="text-3xl font-bold mb-6">Advanced Writing Techniques</h2>
            <p className="text-gray-700 mb-6">
              Explore these techniques to enhance your Chinese writing:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center space-x-2">
                  <span className="text-blue-500">•</span>
                  <span>Formal Writing (书面语)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-blue-500">•</span>
                  <span>Business Chinese (商务中文)</span>
                </li>
              </ul>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center space-x-2">
                  <span className="text-blue-500">•</span>
                  <span>Academic Writing (学术写作)</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="text-3xl font-bold mb-6">Detailed Grammar Points</h2>
            <p className="text-gray-700 mb-6">
              Learn about the specific rules and structures in Chinese:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center space-x-2">
                  <span className="text-blue-500">•</span>
                  <span>Word Order (语序)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-blue-500">•</span>
                  <span>Measure Words (量词)</span>
                </li>
              </ul>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center space-x-2">
                  <span className="text-blue-500">•</span>
                  <span>Aspect Particles (动态助词)</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-bold text-lg mb-3">Is this chinese grammar checker free to use?</h4>
                <p className="text-gray-700">Yes, our basic chinese grammar checker features are completely free to use.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-bold text-lg mb-3">How accurate is the chinese grammar checker?</h4>
                <p className="text-gray-700">Our AI-powered chinese grammar checker is highly accurate and continuously improving through machine learning.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-bold text-lg mb-3">Can your chinese grammar checker handle Traditional Chinese characters?</h4>
                <p className="text-gray-700">Yes, our chinese grammar checker fully supports both Simplified and Traditional Chinese characters.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-bold text-lg mb-3">What types of errors can your chinese grammar checker detect?</h4>
                <p className="text-gray-700">Our chinese grammar checker system detects grammar errors, word usage mistakes, punctuation errors, and style inconsistencies.</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-8 rounded-xl shadow-sm">
            <h2 className="text-3xl font-bold mb-6">Start Writing Better Chinese Today</h2>
            <p className="text-lg leading-relaxed mb-8">
              Whether you're writing an essay, preparing a business document, or learning Chinese, 
              our chinese grammar checker is here to help. Try our chinese grammar checker now 
              and experience the difference in your Chinese writing quality.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                <h4 className="font-bold text-xl mb-3">Accuracy</h4>
                <p>Advanced AI technology ensures precise grammar corrections</p>
              </div>
              <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                <h4 className="font-bold text-xl mb-3">Speed</h4>
                <p>Get instant feedback on your Chinese writing</p>
              </div>
              <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                <h4 className="font-bold text-xl mb-3">Learning</h4>
                <p>Improve your Chinese skills with detailed explanations</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="text-3xl font-bold mb-6">Learning Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="border border-gray-200 p-6 rounded-lg hover:shadow-md transition-shadow">
                <h4 className="font-bold text-xl mb-4">Writing Practice</h4>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center space-x-2">
                    <span className="text-blue-500">•</span>
                    <span>Daily journal writing</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-blue-500">•</span>
                    <span>Email correspondence</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-blue-500">•</span>
                    <span>Blog writing</span>
                  </li>
                </ul>
              </div>
              <div className="border border-gray-200 p-6 rounded-lg hover:shadow-md transition-shadow">
                <h4 className="font-bold text-xl mb-4">Online Tools</h4>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center space-x-2">
                    <span className="text-blue-500">•</span>
                    <span>Grammar checking</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-blue-500">•</span>
                    <span>Online dictionaries</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-blue-500">•</span>
                    <span>Learning apps</span>
                  </li>
                </ul>
              </div>
              <div className="border border-gray-200 p-6 rounded-lg hover:shadow-md transition-shadow">
                <h4 className="font-bold text-xl mb-4">Study Methods</h4>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center space-x-2">
                    <span className="text-blue-500">•</span>
                    <span>Regular practice</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-blue-500">•</span>
                    <span>Native feedback</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-blue-500">•</span>
                    <span>Context learning</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <footer className="mt-16 text-center text-gray-600 border-t border-gray-200 pt-8">
          <p>© 2024 Chinese Grammar Checker. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
