import createMiddleware from 'next-intl/middleware';

// 创建中间件，处理国际化路由
export default createMiddleware({
  // 支持的语言列表
  locales: ['en', 'zh', 'ja'],
  // 默认语言
  defaultLocale: 'en',
  // 禁用自动语言检测
  localeDetection: false,
});

export const config = {
  // 匹配所有需要国际化的路径
  matcher: ['/((?!api|_next|.*\\..*).*)']
}; 