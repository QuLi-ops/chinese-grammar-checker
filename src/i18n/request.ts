import {getRequestConfig} from 'next-intl/server';

// 定义支持的语言和默认语言
const defaultLocale = 'en';
const locales = ['zh', 'en'] as const;
type Locale = typeof locales[number];

export default getRequestConfig(async ({requestLocale}) => {
  // 获取请求的 locale，需要 await
  const locale = await requestLocale;
  
  // 确保 locale 是支持的语言之一
  const resolvedLocale = locales.includes(locale as Locale) ? locale as Locale : defaultLocale;

  // 加载通用翻译文件
  const commonMessages = (await import(`../messages/${resolvedLocale}/common.json`)).default;
  
  // 加载日语语法检查器翻译文件
  const japaneseGrammarCheckerMessages = (await import(`../messages/${resolvedLocale}/japanesegrammarchecker.json`)).default;

  // 加载韩语语法检查器翻译文件
  const koreanGrammarCheckerMessages = (await import(`../messages/${resolvedLocale}/koreangrammarchecker.json`)).default;

  // 加载英语语法检查器翻译文件
  const englishGrammarCheckerMessages = (await import(`../messages/${resolvedLocale}/englishgrammarchecker.json`)).default;

  return {
    messages: {
      ...commonMessages,
      japanesegrammarchecker: japaneseGrammarCheckerMessages,
      koreangrammarchecker: koreanGrammarCheckerMessages,
      englishgrammarchecker: englishGrammarCheckerMessages
    },
    locale: resolvedLocale,
    timeZone: 'Asia/Shanghai'
  };
}); 