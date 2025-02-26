import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({requestLocale}) => {
  // 获取请求的 locale，需要 await
  let locale = await requestLocale;
  
  // 确保 locale 有效，如果无效则使用默认值
  if (!locale || !['en', 'zh'].includes(locale)) {
    locale = 'en';
  }
  
  return {
    locale,
    messages: (await import(`../messages/${locale}/common.json`)).default
  };
}); 