'use client';

import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

export default function Navigation() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 关闭下拉菜单的点击外部事件处理
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 语法检查器工具链接
  const checkerLinks = [
    { href: '/', label: t('chineseGrammarChecker') },
    { href: '/japanese-grammar-checker', label: t('japaneseGrammarChecker') },
    { href: '/korean-grammar-checker', label: t('koreanGrammarChecker') },
    { href: '/english-grammar-checker', label: t('englishGrammarChecker') },
  ];

  // 检查当前路径是否是某个语法检查器
  const isCheckerActive = checkerLinks.some(link => {
    const fullPath = `/${locale}${link.href === '/' ? '' : link.href}`;
    return pathname === fullPath;
  });

  return (
    <nav className="flex items-center justify-between w-full">
      {/* 左侧导航 */}
      <div className="flex items-center space-x-6">
        {/* 首页链接 */}
        <Link
          href={`/${locale}`}
          className={`text-sm font-medium transition-colors hover:text-primary ${
            pathname === `/${locale}` ? 'text-primary' : 'text-muted-foreground'
          }`}
        >
          {t('home')}
        </Link>
        
        {/* 博客链接 */}
        <Link
          href={`/${locale}/blog`}
          className={`text-sm font-medium transition-colors hover:text-primary ${
            pathname.startsWith(`/${locale}/blog`) ? 'text-primary' : 'text-muted-foreground'
          }`}
        >
          {t('blog')}
        </Link>
      </div>
      
      {/* 右侧导航 - 语法检查器下拉菜单 */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className={`flex items-center text-sm font-medium transition-colors hover:text-primary ${
            isCheckerActive ? 'text-primary' : 'text-muted-foreground'
          }`}
        >
          {t('grammarCheckers')}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={`ml-1 h-4 w-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
            <div className="py-1" role="menu" aria-orientation="vertical">
              {checkerLinks.map((link) => {
                const fullPath = `/${locale}${link.href === '/' ? '' : link.href}`;
                const isActive = pathname === fullPath;
                
                return (
                  <Link
                    key={link.href}
                    href={fullPath}
                    className={`block px-4 py-2 text-sm hover:bg-gray-100 ${
                      isActive ? 'text-primary font-medium' : 'text-gray-700'
                    }`}
                    onClick={() => setDropdownOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 