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
            Our chinese grammar checker is an advanced tool designed to help you write better Chinese. 
            Whether you're a student learning Chinese, a professional writing business documents, or 
            someone looking to improve their Chinese writing skills, our tool provides comprehensive 
            grammar checking and suggestions. As the most reliable chinese grammar checker available online,
            we focus on providing accurate, context-aware corrections for all your Chinese writing needs.
          </p>

          <h3>Key Features of Our Chinese Grammar Checker</h3>
          <ul>
            <li>
              <strong>Real-time Grammar Checking:</strong> Our chinese grammar checker instantly identifies grammar mistakes as you type
            </li>
            <li>
              <strong>Contextual Corrections:</strong> Unlike basic grammar checkers, our chinese grammar checker provides suggestions that consider the full context of your writing
            </li>
            <li>
              <strong>Style Recommendations:</strong> The chinese grammar checker adapts to your chosen style, whether formal or informal
            </li>
            <li>
              <strong>Detailed Explanations:</strong> Each correction comes with clear, educational explanations to help you understand the rules
            </li>
            <li>
              <strong>Voice Output:</strong> Hear the correct pronunciation of your text with our integrated audio feature
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

          <h2>How Our Chinese Grammar Checker Works</h2>
          <p>
            The Chinese Grammar Checker uses advanced AI technology to analyze your text:
          </p>
          <ol>
            <li>Enter your Chinese text into our professional Chinese Grammar Checker</li>
            <li>Select your preferred response language (Chinese or English) for explanations</li>
            <li>Choose your writing style (formal or informal) for context-appropriate suggestions</li>
            <li>Let our Chinese Grammar Checker analyze your text and provide instant feedback</li>
            <li>Review the detailed corrections and educational explanations</li>
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

          <h2>Who Can Benefit from our Chinese Grammar Checker?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h4 className="font-bold mb-2">Students</h4>
              <p>Use our chinese grammar checker for homework, essays, and academic writing in Chinese</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h4 className="font-bold mb-2">Professionals</h4>
              <p>Our chinese grammar checker is ideal for business communications and formal documents</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h4 className="font-bold mb-2">Language Learners</h4>
              <p>Make our chinese grammar checker your essential tool for improving Chinese writing skills</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h4 className="font-bold mb-2">Content Creators</h4>
              <p>Rely on our chinese grammar checker for creating accurate Chinese content</p>
            </div>
          </div>

          <h2>Frequently Asked Questions About our Chinese Grammar Checker</h2>
          <div className="space-y-6">
            <div>
              <h4 className="font-bold">Is this chinese grammar checker free to use?</h4>
              <p>Yes, our basic chinese grammar checker features are completely free to use.</p>
            </div>
            <div>
              <h4 className="font-bold">How accurate is the chinese grammar checker?</h4>
              <p>Our AI-powered chinese grammar checker is highly accurate and continuously improving through machine learning.</p>
            </div>
            <div>
              <h4 className="font-bold">Can your chinese grammar checker handle Traditional Chinese characters?</h4>
              <p>Yes, our chinese grammar checker fully supports both Simplified and Traditional Chinese characters.</p>
            </div>
            <div>
              <h4 className="font-bold">What types of errors can your chinese grammar checker detect?</h4>
              <p>Our chinese grammar checker system detects grammar errors, word usage mistakes, punctuation errors, and style inconsistencies.</p>
            </div>
          </div>

          <h2>Start Writing Better Chinese Today</h2>
          <p>
            Whether you're writing an essay, preparing a business document, or learning Chinese, 
            our chinese grammar checker is here to help. Try our chinese grammar checker now 
            and experience the difference in your Chinese writing quality. With continuous updates and 
            improvements, our chinese grammar checker remains the most reliable tool for ensuring 
            error-free Chinese writing.
          </p>

          <div className="bg-blue-50 p-6 rounded-lg my-8">
            <h3 className="font-bold text-xl mb-4">Why Choose our Chinese Grammar Checker?</h3>
            <ul className="space-y-2">
              <li>✓ Most comprehensive chinese grammar checker available online</li>
              <li>✓ Supports both Traditional and Simplified Chinese characters</li>
              <li>✓ AI-powered analysis for maximum accuracy</li>
              <li>✓ Regular updates to improve checking accuracy</li>
              <li>✓ Free access to basic chinese grammar checker features</li>
            </ul>
          </div>

          <h2>Learning Resources and Tips for Using our Chinese Grammar Checker</h2>
          <div className="space-y-4">
            <div>
              <h4 className="font-bold">Effective Learning with our chinese grammar checker</h4>
              <p>
                Improve your Chinese writing by combining our chinese grammar checker with these methods:
                - Regular practice with feedback from our tool
                - Reading authentic materials and checking them
                - Using our checker for example sentences
                - Context-based learning with real-time corrections
                - Practicing with native speakers and verifying with our tool
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
