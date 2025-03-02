import { MetadataRoute } from 'next';

// 支持的语言
const locales = ['en', 'zh', 'ja'];

// 页面路径（不包括语言前缀）
const pages = [
  '',  // 首页
  '/japanese-grammar-checker',
  '/korean-grammar-checker',
  '/english-grammar-checker',
  '/sitemap',
  '/privacy-policy',  // 添加隐私政策页面（如果存在）
  '/terms-of-service', // 添加服务条款页面（如果存在）
  '/about', // 添加关于我们页面（如果存在）
  '/contact', // 添加联系我们页面（如果存在）
];

// 网站域名
const domain = 'https://chinesegrammarchecker.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();
  
  // 为每个页面和语言生成URL条目
  const sitemapEntries: MetadataRoute.Sitemap = [];
  
  // 添加主要页面
  for (const locale of locales) {
    for (const page of pages) {
      // 设置优先级：首页最高，其他页面根据重要性递减
      let priority = 0.7;
      let changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' = 'weekly';
      
      if (page === '') {
        priority = 1.0;  // 首页优先级最高
        changeFrequency = 'daily';
      } else if (page.includes('grammar-checker')) {
        priority = 0.9;  // 语法检查器页面优先级次高
        changeFrequency = 'weekly';
      } else if (page === '/sitemap') {
        priority = 0.4;  // 站点地图页面优先级较低
        changeFrequency = 'monthly';
      } else if (page === '/privacy-policy' || page === '/terms-of-service') {
        priority = 0.3;  // 法律页面优先级最低
        changeFrequency = 'monthly';
      }
      
      // 添加到站点地图
      sitemapEntries.push({
        url: `${domain}/${locale}${page}`,
        lastModified: currentDate,
        changeFrequency: changeFrequency,
        priority: priority,
      });
    }
  }
  
  // 添加根域名（无语言前缀）重定向到默认语言
  sitemapEntries.push({
    url: domain,
    lastModified: currentDate,
    changeFrequency: 'daily',
    priority: 1.0,
  });
  
  return sitemapEntries;
} 