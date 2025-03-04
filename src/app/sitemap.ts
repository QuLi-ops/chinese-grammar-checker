import { MetadataRoute } from 'next';
import { getAllPosts, getAllCategories, getAllTags } from '@/lib/blog/utils';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://chinesegrammarchecker.com';
  const locales = ['en', 'zh', 'ja'];
  const now = new Date();
  
  // 创建站点地图条目数组
  const entries: MetadataRoute.Sitemap = [];
  
  // 添加主域名
  entries.push({
    url: baseUrl,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 1.0,
  });
  
  // 添加语言主页和功能页面
  for (const locale of locales) {
    // 语言主页
    entries.push({
      url: `${baseUrl}/${locale}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    });
    
    // 语法检查器页面
    entries.push({
      url: `${baseUrl}/${locale}/japanese-grammar-checker`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
    
    entries.push({
      url: `${baseUrl}/${locale}/korean-grammar-checker`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
    
    entries.push({
      url: `${baseUrl}/${locale}/english-grammar-checker`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
    
    // 博客主页
    entries.push({
      url: `${baseUrl}/${locale}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    });
    
    // 博客文章
    const posts = await getAllPosts(locale);
    for (const post of posts) {
      entries.push({
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
        lastModified: post.date ? new Date(post.date) : now,
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
    
    // 分类页面
    const categories = await getAllCategories(locale);
    for (const category of categories) {
      entries.push({
        url: `${baseUrl}/${locale}/blog/category/${encodeURIComponent(category)}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.6,
      });
    }
    
    // 标签页面
    const tags = await getAllTags(locale);
    for (const tag of tags) {
      entries.push({
        url: `${baseUrl}/${locale}/blog/tag/${encodeURIComponent(tag)}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.5,
      });
    }
  }
  
  return entries;
} 