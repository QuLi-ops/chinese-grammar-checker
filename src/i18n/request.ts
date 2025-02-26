import {getRequestConfig} from 'next-intl/server';

// 定义支持的语言和默认语言
const defaultLocale = 'en';
const locales = ['zh', 'en'] as const;
type Locale = typeof locales[number];

export default getRequestConfig(async ({requestLocale}) => {
  // 获取请求的 locale，需要 await
  let locale = await requestLocale;
  
  // 确保 locale 是支持的语言之一
  const resolvedLocale = locales.includes(locale as Locale) ? locale as Locale : defaultLocale;

  return {
    messages: (await import(`../messages/${resolvedLocale}/common.json`)).default,
    locale: resolvedLocale,
    timeZone: 'Asia/Shanghai'
  };
}); 