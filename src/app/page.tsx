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

          <h2>Common Chinese Grammar Challenges</h2>
          <p>
            Writing in Chinese presents unique challenges that our grammar checker helps you overcome:
          </p>
          <ul>
            <li>Proper word order in Chinese sentences</li>
            <li>Correct usage of measure words (量词)</li>
            <li>Appropriate particle usage (了, 过, 着)</li>
            <li>Complex character combinations</li>
            <li>Formal vs. informal expression</li>
            <li>Time expressions and word order</li>
            <li>Proper use of 的, 地, and 得</li>
            <li>Complement usage (结果补语, 趋向补语, etc.)</li>
            <li>Topic-comment structure</li>
            <li>Serial verb constructions</li>
          </ul>

          <h3>Detailed Grammar Points</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-bold">Word Order (语序)</h4>
              <p>
                Chinese follows the SVO (Subject-Verb-Object) structure, but with important variations:
                - Time expressions typically come before the subject
                - Location phrases usually precede the verb
                - Modifiers must come before the word they modify
                - Multiple adjectives follow a specific order
              </p>
            </div>
            
            <div>
              <h4 className="font-bold">Measure Words (量词)</h4>
              <p>
                Measure words are essential in Chinese and must match their nouns correctly:
                - 个 (gè) for general objects
                - 本 (běn) for books
                - 张 (zhāng) for flat objects
                - 条 (tiáo) for long, thin objects
                - 位 (wèi) for respected persons
                Our checker helps you choose the right measure word for each context.
              </p>
            </div>

            <div>
              <h4 className="font-bold">Aspect Particles (动态助词)</h4>
              <p>
                Chinese uses particles to indicate the state or progress of actions:
                - 了 (le) for completed actions or change of state
                - 过 (guo) for past experience
                - 着 (zhe) for continuous actions
                Understanding when and how to use these particles is crucial for natural expression.
              </p>
            </div>
          </div>

          <h3>Advanced Writing Techniques</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-bold">Formal Writing (书面语)</h4>
              <p>
                Formal Chinese writing requires specific considerations:
                - Use of literary expressions (成语)
                - Appropriate honorific terms
                - Complex sentence structures
                - Professional vocabulary
                - Proper paragraph organization
              </p>
            </div>

            <div>
              <h4 className="font-bold">Business Chinese (商务中文)</h4>
              <p>
                Business communication in Chinese has its own conventions:
                - Standard greeting and closing formulas
                - Proper titles and forms of address
                - Formal vocabulary choices
                - Appropriate level of politeness
                - Clear paragraph structure
              </p>
            </div>

            <div>
              <h4 className="font-bold">Academic Writing (学术写作)</h4>
              <p>
                Academic Chinese requires:
                - Objective tone
                - Proper citation formats
                - Technical vocabulary
                - Logical argument structure
                - Clear thesis statements
              </p>
            </div>
          </div>

          <h3>Common Mistakes and Solutions</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-bold">Word Choice Errors</h4>
              <p>
                Common word choice mistakes include:
                - Confusing similar characters (近义词)
                - Inappropriate register selection
                - Incorrect synonym usage
                - Misused idioms
                Our system helps identify and correct these issues.
              </p>
            </div>

            <div>
              <h4 className="font-bold">Structural Errors</h4>
              <p>
                Watch out for these structural mistakes:
                - Incorrect topic-comment structure
                - Misplaced modifiers
                - Wrong complement usage
                - Improper clause ordering
                Our checker provides clear explanations for structural corrections.
              </p>
            </div>
          </div>

          <h3>Writing Style Guidelines</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-bold">Coherence and Cohesion</h4>
              <p>
                Maintain text flow with:
                - Appropriate conjunctions
                - Logical transitions
                - Consistent terminology
                - Clear paragraph structure
                - Proper topic progression
              </p>
            </div>

            <div>
              <h4 className="font-bold">Tone and Register</h4>
              <p>
                Adapt your writing style to:
                - Audience expectations
                - Document purpose
                - Social context
                - Professional requirements
                - Cultural considerations
              </p>
            </div>
          </div>

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

          <h2>Learning Resources and Tips</h2>
          <div className="space-y-4">
            <div>
              <h4 className="font-bold">Effective Learning Strategies</h4>
              <p>
                Improve your Chinese writing with these methods:
                - Regular practice with feedback
                - Reading authentic materials
                - Studying example sentences
                - Using context-based learning
                - Practicing with native speakers
              </p>
            </div>

            <div>
              <h4 className="font-bold">Online Learning Tools</h4>
              <p>
                Enhance your learning with:
                - Grammar checking tools
                - Online dictionaries
                - Language exchange platforms
                - Chinese learning apps
                - Video learning resources
              </p>
            </div>

            <div>
              <h4 className="font-bold">Writing Practice Tips</h4>
              <p>
                Develop your writing skills through:
                - Daily journal writing
                - Email correspondence
                - Social media posts
                - Blog writing
                - Creative writing exercises
              </p>
            </div>
          </div>

          <h3>Special Writing Scenarios</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-bold">Social Media Writing</h4>
              <p>
                Tips for social media content:
                - Appropriate hashtag usage
                - Trendy expressions
                - Internet slang awareness
                - Platform-specific style
                - Engagement techniques
              </p>
            </div>

            <div>
              <h4 className="font-bold">Creative Writing</h4>
              <p>
                Enhance your creative writing with:
                - Descriptive language
                - Character development
                - Story structure
                - Dialogue writing
                - Scene setting
              </p>
            </div>

            <div>
              <h4 className="font-bold">Technical Writing</h4>
              <p>
                Guidelines for technical documents:
                - Clear terminology
                - Structured format
                - Precise instructions
                - Visual aids
                - Reference standards
              </p>
            </div>
          </div>

          <h3>Cultural Considerations</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-bold">Regional Differences</h4>
              <p>
                Understanding variations in:
                - Mainland China usage
                - Taiwan usage
                - Hong Kong usage
                - Singapore usage
                - Overseas Chinese communities
              </p>
            </div>

            <div>
              <h4 className="font-bold">Cultural Context</h4>
              <p>
                Important cultural aspects:
                - Face and politeness
                - Hierarchical relationships
                - Business etiquette
                - Social customs
                - Traditional values
              </p>
            </div>
          </div>
        </section>

        <footer className="mt-16 text-center text-gray-600">
          <p>© 2024 Chinese Grammar Checker. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
