import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // 使用环境变量中的基础URL
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://grammar-checker.com';
  
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
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
} 