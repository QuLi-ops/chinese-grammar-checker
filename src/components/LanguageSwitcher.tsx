'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const t = useTranslations('settings');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    // 直接使用完整的URL重定向，避免路径处理问题
    const origin = window.location.origin;
    
    // 从当前路径中移除语言前缀
    let path = pathname;
    if (path.startsWith(`/${locale}`)) {
      // 移除当前语言前缀
      path = path.substring(locale.length + 1) || '/';
    }
    
    // 构建新的URL
    const newUrl = `${origin}/${newLocale}${path === '/' ? '' : path}`;
    
    // 使用window.location直接导航，确保完全刷新页面
    window.location.href = newUrl;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="w-9 px-0">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">{t('language')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => switchLocale('zh')}
          className={locale === 'zh' ? 'bg-accent' : ''}
        >
          中文
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => switchLocale('en')}
          className={locale === 'en' ? 'bg-accent' : ''}
        >
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 