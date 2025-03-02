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

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <span>{formattedDate}</span>
          <span>•</span>
          <span>{post.author}</span>
        </div>
        
        <Link href={`/blog/${post.slug}`} locale={locale} className="block">
          <h2 className="text-xl font-bold mb-2 hover:text-blue-600 transition-colors">{post.title}</h2>
        </Link>
        
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
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 