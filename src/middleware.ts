import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 创建next-intl中间件
const intlMiddleware = createMiddleware({
  // 支持的语言列表
  locales: ['en', 'zh', 'ja'],
  // 默认语言
  defaultLocale: 'en',
  // 禁用自动语言检测
  localeDetection: false,
});

// 自定义中间件函数，处理重定向
export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const locales = ['en', 'zh', 'ja'];
  
  // 如果是根路径，使用301永久重定向到/en
  if (pathname === '/') {
    const url = new URL('/en', request.url);
    return NextResponse.redirect(url, { status: 301 });
  }
  
  // 检查路径是否以有效的语言前缀开头
  const pathnameHasValidLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  
  // 如果路径没有有效的语言前缀，使用301永久重定向到带有默认语言前缀的路径
  if (!pathnameHasValidLocale) {
    const url = new URL(`/en${pathname}`, request.url);
    return NextResponse.redirect(url, { status: 301 });
  }
  
  // 其他路径使用next-intl中间件处理
  return intlMiddleware(request);
}

export const config = {
  // 匹配所有需要国际化的路径
  matcher: ['/((?!api|_next|.*\\..*).*)']
}; 