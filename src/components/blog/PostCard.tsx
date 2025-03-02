"use client";

import Link from 'next/link';
import { BlogPost } from '@/lib/blog/utils';

interface PostCardProps {
  post: BlogPost;
  locale: string;
}

export default function PostCard({ post, locale }: PostCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // 处理分类或标签点击，阻止事件冒泡
  const handleTagClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // 处理卡片点击，导航到文章详情页
  const navigateToPost = () => {
    window.location.href = `/${locale}/blog/${post.slug}`;
  };

  return (
    <div 
      onClick={navigateToPost}
      className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 transform active:scale-95 active:translate-y-0.5 cursor-pointer"
    >
      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <span>{formattedDate}</span>
          <span>•</span>
          <span>{post.author}</span>
        </div>
        
        <h2 className="text-xl font-bold mb-2 text-gray-900">{post.title}</h2>
        
        {post.excerpt && (
          <p className="text-gray-600 mb-4">{post.excerpt}</p>
        )}
        
        <div className="flex flex-wrap gap-2 mt-4">
          {post.categories.map((category) => (
            <Link 
              key={category} 
              href={`/blog/category/${encodeURIComponent(category)}`} 
              locale={locale}
              className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full hover:bg-blue-200 transition-colors"
              onClick={handleTagClick}
            >
              {category}
            </Link>
          ))}
          
          {post.tags.map((tag) => (
            <Link 
              key={tag} 
              href={`/blog/tag/${encodeURIComponent(tag)}`} 
              locale={locale}
              className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full hover:bg-gray-200 transition-colors"
              onClick={handleTagClick}
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 