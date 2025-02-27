import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({requestLocale}) => {
  // 获取请求的 locale，需要 await
  let locale = await requestLocale;
  
  // 确保 locale 有效，如果无效则使用默认值
  if (!locale || !['en', 'zh', 'ja'].includes(locale)) {
    locale = 'en';
  }
  
  // 加载通用翻译文件
  const commonMessages = (await import(`../messages/${locale}/common.json`)).default;
  
  // 加载日语语法检查器翻译文件
  const japaneseGrammarCheckerMessages = (await import(`../messages/${locale}/japanesegrammarchecker.json`)).default;

  // 加载韩语语法检查器翻译文件
  const koreanGrammarCheckerMessages = (await import(`../messages/${locale}/koreangrammarchecker.json`)).default;

  // 加载英语语法检查器翻译文件
  const englishGrammarCheckerMessages = (await import(`../messages/${locale}/englishgrammarchecker.json`)).default;

  return {
    locale,
    messages: {
      ...commonMessages,
      japanesegrammarchecker: japaneseGrammarCheckerMessages,
      koreangrammarchecker: koreanGrammarCheckerMessages,
      englishgrammarchecker: englishGrammarCheckerMessages
    }
  };
}); 