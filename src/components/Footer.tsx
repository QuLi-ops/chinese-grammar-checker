'use client';

import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  
  // 页脚链接
  const links = [
    { href: '/', label: t('chineseGrammarChecker') },
    { href: '/japanese-grammar-checker', label: t('japaneseGrammarChecker') },
    { href: '/korean-grammar-checker', label: t('koreanGrammarChecker') },
    { href: '/english-grammar-checker', label: t('englishGrammarChecker') },
    { href: '/blog', label: t('blog') }
  ];
  
  return (
    <footer className="border-t mt-12 py-8 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-500">{t('copyright', { year: new Date().getFullYear() })}</p>
          </div>
          
          <div className="flex space-x-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={`/${locale}${link.href === '/' ? '' : link.href}`}
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
} 