import { MetadataRoute } from 'next';
import { getAllPosts, getAllCategories, getAllTags } from '@/lib/blog/utils';

// 辅助函数：安全创建日期对象
function safeDate(dateString: string | undefined | null): Date {
  if (!dateString) {
    return new Date(); // 如果没有日期，返回当前日期
  }
  
  try {
    const date = new Date(dateString);
    // 检查日期是否有效
    if (isNaN(date.getTime())) {
      return new Date(); // 如果日期无效，返回当前日期
    }
    return date;
  } catch {
    return new Date(); // 如果解析出错，返回当前日期
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 基础URL
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://grammar-checker.com';
  
  // 支持的语言
  const locales = ['en', 'zh', 'ja'];
  
  // 基础页面
  const basePages = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/japanese-grammar-checker`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/korean-grammar-checker`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/english-grammar-checker`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    // 添加其他可能存在的页面
    {
      url: `${baseUrl}/sitemap`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];
  
  // 为每种语言创建页面URL
  const localizedPages = locales.flatMap(locale => {
    return [
      {
        url: `${baseUrl}/${locale}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.9,
      },
      {
        url: `${baseUrl}/${locale}/blog`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
      {
        url: `${baseUrl}/${locale}/japanese-grammar-checker`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      },
      {
        url: `${baseUrl}/${locale}/korean-grammar-checker`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      },
      {
        url: `${baseUrl}/${locale}/english-grammar-checker`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      },
      // 添加其他本地化页面
      {
        url: `${baseUrl}/${locale}/sitemap`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.4,
      },
      {
        url: `${baseUrl}/${locale}/privacy-policy`,
        lastModified: new Date(),
        changeFrequency: 'yearly' as const,
        priority: 0.3,
      },
      {
        url: `${baseUrl}/${locale}/terms-of-service`,
        lastModified: new Date(),
        changeFrequency: 'yearly' as const,
        priority: 0.3,
      },
      {
        url: `${baseUrl}/${locale}/about`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      },
      {
        url: `${baseUrl}/${locale}/contact`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      },
    ];
  });
  
  // 获取所有博客文章
  const blogPostsUrls = await Promise.all(
    locales.map(async (locale) => {
      const posts = await getAllPosts(locale);
      return posts.map(post => ({
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
        lastModified: safeDate(post.date),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }));
    })
  ).then(results => results.flat());
  
  // 获取所有分类页面
  const categoryUrls = await Promise.all(
    locales.map(async (locale) => {
      const categories = await getAllCategories(locale);
      return categories.map(category => ({
        url: `${baseUrl}/${locale}/blog/category/${encodeURIComponent(category)}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }));
    })
  ).then(results => results.flat());
  
  // 获取所有标签页面
  const tagUrls = await Promise.all(
    locales.map(async (locale) => {
      const tags = await getAllTags(locale);
      return tags.map(tag => ({
        url: `${baseUrl}/${locale}/blog/tag/${encodeURIComponent(tag)}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.5,
      }));
    })
  ).then(results => results.flat());
  
  // 合并所有URL
  return [...basePages, ...localizedPages, ...blogPostsUrls, ...categoryUrls, ...tagUrls];
} 