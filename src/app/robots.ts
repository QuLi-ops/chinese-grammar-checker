import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',  // 禁止爬取API路径
          '/_next/', // 禁止爬取Next.js内部路径
          '/static/images/icons/', // 禁止爬取图标目录
        ],
      },
    ],
    sitemap: 'https://chinesegrammarchecker.com/sitemap.xml',
    host: 'https://chinesegrammarchecker.com',
  };
} 