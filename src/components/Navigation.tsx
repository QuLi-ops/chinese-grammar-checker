'use client';

import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();

  // 导航链接
  const links = [
    { href: '/', label: t('chineseGrammarChecker') },
    { href: '/japanese-grammar-checker', label: t('japaneseGrammarChecker') },
    { href: '/korean-grammar-checker', label: t('koreanGrammarChecker') },
    { href: '/english-grammar-checker', label: t('englishGrammarChecker') },
    { href: '/blog', label: t('blog') }
  ];

  return (
    <nav className="flex items-center justify-end w-full space-x-6">
      {links.map((link) => {
        // 构建完整路径
        const fullPath = `/${locale}${link.href === '/' ? '' : link.href}`;
        const isActive = pathname === fullPath;

        return (
          <Link
            key={link.href}
            href={fullPath}
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
} 