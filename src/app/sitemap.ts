import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog/utils';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://chinesegrammarchecker.com';
  const locales = ['en', 'zh', 'ja'];
  const now = new Date();
  
  // 创建站点地图条目数组
  const entries: MetadataRoute.Sitemap = [];
  
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
  }
  
  // 获取所有博客文章（只需获取一次，因为内容是共享的）
  const posts = await getAllPosts();

  // 为每种语言生成博客文章的 URL
  for (const locale of locales) {
    // 博客文章
    for (const post of posts) {
      entries.push({
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
        lastModified: post.date ? new Date(post.date) : now,
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  }
  
  return entries;
} 