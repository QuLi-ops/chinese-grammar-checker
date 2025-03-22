import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://chinesegrammarchecker.com';
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: '*',
        disallow: ['/*/blog/category/*', '/*/blog/tag/*', '/*/blog$'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
} 