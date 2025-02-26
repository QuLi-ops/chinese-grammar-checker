'use client';

import GrammarInput from '@/app/components/GrammarInput';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('home');
  
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <GrammarInput />

        <section className="mt-16 prose prose-lg mx-auto space-y-12">
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="text-3xl font-bold mb-6">{t('whyUse.title')}</h2>
            <p className="text-gray-700 leading-relaxed">
              {t('whyUse.description')}
            </p>

            <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">{t('features.title')}</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <span className="text-blue-500 mt-1">✓</span>
                  <div>
                    <strong className="text-blue-900">{t('features.realTime.title')}</strong>
                    <span className="text-gray-700"> {t('features.realTime.description')}</span>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-blue-500 mt-1">✓</span>
                  <div>
                    <strong className="text-blue-900">{t('features.contextual.title')}</strong>
                    <span className="text-gray-700"> {t('features.contextual.description')}</span>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-blue-500 mt-1">✓</span>
                  <div>
                    <strong className="text-blue-900">{t('features.style.title')}</strong>
                    <span className="text-gray-700"> {t('features.style.description')}</span>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-blue-500 mt-1">✓</span>
                  <div>
                    <strong className="text-blue-900">{t('features.explanations.title')}</strong>
                    <span className="text-gray-700"> {t('features.explanations.description')}</span>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-blue-500 mt-1">✓</span>
                  <div>
                    <strong className="text-blue-900">{t('features.voice.title')}</strong>
                    <span className="text-gray-700"> {t('features.voice.description')}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="text-3xl font-bold mb-6">{t('challenges.title')}</h2>
            <p className="text-gray-700 mb-6">
              {t('challenges.description')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ul className="space-y-3 text-gray-700">
                {t.raw('challenges.list1').map((item: string, index: number) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="text-blue-500">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <ul className="space-y-3 text-gray-700">
                {t.raw('challenges.list2').map((item: string, index: number) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="text-blue-500">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="text-3xl font-bold mb-6">{t('mistakes.title')}</h2>
            <p className="text-gray-700 mb-6">
              {t('mistakes.description')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ul className="space-y-3 text-gray-700">
                {t.raw('mistakes.list').map((item: string, index: number) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="text-blue-500">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="text-3xl font-bold mb-6">{t('styleGuidelines.title')}</h2>
            <p className="text-gray-700 mb-6">
              {t('styleGuidelines.description')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ul className="space-y-3 text-gray-700">
                {t.raw('styleGuidelines.list').map((item: string, index: number) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="text-blue-500">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="text-3xl font-bold mb-6">{t('advancedTechniques.title')}</h2>
            <p className="text-gray-700 mb-6">
              {t('advancedTechniques.description')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ul className="space-y-3 text-gray-700">
                {t.raw('advancedTechniques.list1').map((item: string, index: number) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="text-blue-500">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <ul className="space-y-3 text-gray-700">
                {t.raw('advancedTechniques.list2').map((item: string, index: number) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="text-blue-500">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="text-3xl font-bold mb-6">{t('grammarPoints.title')}</h2>
            <p className="text-gray-700 mb-6">
              {t('grammarPoints.description')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ul className="space-y-3 text-gray-700">
                {t.raw('grammarPoints.list1').map((item: string, index: number) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="text-blue-500">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <ul className="space-y-3 text-gray-700">
                {t.raw('grammarPoints.list2').map((item: string, index: number) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="text-blue-500">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="text-3xl font-bold mb-6">{t('faq.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {t.raw('faq.questions').map((faq: { question: string; answer: string }, index: number) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-bold text-lg mb-3">{faq.question}</h4>
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-8 rounded-xl shadow-sm">
            <h2 className="text-3xl font-bold mb-6">{t('cta.title')}</h2>
            <p className="text-lg leading-relaxed mb-8">
              {t('cta.description')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {t.raw('cta.benefits').map((benefit: { title: string; description: string }, index: number) => (
                <div key={index} className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                  <h4 className="font-bold text-xl mb-3">{benefit.title}</h4>
                  <p>{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="text-3xl font-bold mb-6">{t('resources.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="border border-gray-200 p-6 rounded-lg hover:shadow-md transition-shadow">
                <h4 className="font-bold text-xl mb-4">{t('resources.writing.title')}</h4>
                <ul className="space-y-3 text-gray-700">
                  {t.raw('resources.writing.items').map((item: string, index: number) => (
                    <li key={index} className="flex items-center space-x-2">
                      <span className="text-blue-500">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-gray-200 p-6 rounded-lg hover:shadow-md transition-shadow">
                <h4 className="font-bold text-xl mb-4">{t('resources.tools.title')}</h4>
                <ul className="space-y-3 text-gray-700">
                  {t.raw('resources.tools.items').map((item: string, index: number) => (
                    <li key={index} className="flex items-center space-x-2">
                      <span className="text-blue-500">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-gray-200 p-6 rounded-lg hover:shadow-md transition-shadow">
                <h4 className="font-bold text-xl mb-4">{t('resources.methods.title')}</h4>
                <ul className="space-y-3 text-gray-700">
                  {t.raw('resources.methods.items').map((item: string, index: number) => (
                    <li key={index} className="flex items-center space-x-2">
                      <span className="text-blue-500">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <footer className="mt-16 text-center text-gray-600 border-t border-gray-200 pt-8">
          <p>{t('footer')}</p>
        </footer>
      </div>
    </main>
  );
}
