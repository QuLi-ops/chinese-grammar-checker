import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// 博客内容目录路径
const contentDirectory = path.join(process.cwd(), 'content/blog');

// 博客文章接口
export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt?: string;
  content: string;
  categories: string[];
  tags: string[];
  featured: boolean;
}

// 获取所有博客文章
export async function getAllPosts(): Promise<BlogPost[]> {
  // 确保目录存在
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }
  
  const filenames = fs.readdirSync(contentDirectory);
  
  const posts = filenames
    .filter(filename => filename.endsWith('.md'))
    .map(filename => {
      const filePath = path.join(contentDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);
      
      return {
        slug: data.slug || filename.replace(/\.md$/, ''),
        title: data.title || '',
        date: data.date || '',
        author: data.author || '',
        excerpt: data.excerpt || '',
        content,
        categories: data.categories || [],
        tags: data.tags || [],
        featured: data.featured || false,
      };
    });
  
  // 按日期排序，最新的在前
  return posts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

// 获取单篇博客文章
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  // 确保目录存在
  if (!fs.existsSync(contentDirectory)) {
    return null;
  }
  
  const filenames = fs.readdirSync(contentDirectory);
  
  // 先尝试查找完全匹配的文件名
  let filename = filenames.find(name => name === `${slug}.md`);
  
  // 如果没找到，尝试查找 frontmatter 中 slug 字段匹配的文件
  if (!filename) {
    for (const name of filenames) {
      if (!name.endsWith('.md')) continue;
      
      const filePath = path.join(contentDirectory, name);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);
      
      if (data.slug === slug) {
        filename = name;
        break;
      }
    }
  }
  
  // 如果仍然没找到，返回 null
  if (!filename) {
    return null;
  }
  
  const filePath = path.join(contentDirectory, filename);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  
  return {
    slug: data.slug || filename.replace(/\.md$/, ''),
    title: data.title || '',
    date: data.date || '',
    author: data.author || '',
    excerpt: data.excerpt || '',
    content,
    categories: data.categories || [],
    tags: data.tags || [],
    featured: data.featured || false,
  };
}

// 获取所有分类
export async function getAllCategories(): Promise<string[]> {
  const posts = await getAllPosts();
  const categoriesSet = new Set<string>();
  
  posts.forEach(post => {
    post.categories.forEach(category => {
      categoriesSet.add(category);
    });
  });
  
  return Array.from(categoriesSet);
}

// 获取所有标签
export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const tagsSet = new Set<string>();
  
  posts.forEach(post => {
    post.tags.forEach(tag => {
      tagsSet.add(tag);
    });
  });
  
  return Array.from(tagsSet);
}

// 按分类获取文章
export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  return posts.filter(post => post.categories.includes(category));
}

// 按标签获取文章
export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  return posts.filter(post => post.tags.includes(tag));
} 