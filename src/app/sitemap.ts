import { MetadataRoute } from 'next';

// 支持的语言
const locales = ['en', 'zh', 'ja'];

// 页面路径（不包括语言前缀）
const pages = [
  '',
  '/japanese-grammar-checker',
  '/korean-grammar-checker',
  '/english-grammar-checker',
  '/sitemap',
];

// 网站域名
const domain = 'https://chinesegrammarchecker.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();
  
  // 为每个页面和语言生成URL条目
  const sitemapEntries: MetadataRoute.Sitemap = [];
  
  for (const locale of locales) {
    for (const page of pages) {
      sitemapEntries.push({
        url: `${domain}/${locale}${page}`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: page === '' ? 1.0 : 0.8,
      });
    }
  }
  
  return sitemapEntries;
} 