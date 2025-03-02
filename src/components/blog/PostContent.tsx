import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import { BlogPost } from '@/lib/blog/utils';

interface PostContentProps {
  post: BlogPost;
  locale: string;
}

export default function PostContent({ post, locale }: PostContentProps) {
  const formattedDate = new Date(post.date).toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="max-w-3xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center gap-2 text-gray-500">
          <span>{formattedDate}</span>
          <span>•</span>
          <span>{post.author}</span>
        </div>
        
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
      </header>
      
      <div className="prose prose-lg max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  );
} 