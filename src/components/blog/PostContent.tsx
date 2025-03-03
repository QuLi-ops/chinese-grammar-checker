import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeAttr from 'rehype-attr';
import rehypeRaw from 'rehype-raw';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/lib/blog/utils';
import React from 'react';

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
    <article className="relative">
      {/* 全宽标题区域 */}
      <div className="absolute w-screen left-1/2 -translate-x-1/2 bg-[#5B5CFF] py-16 -mt-16">
        <div className="max-w-4xl mx-auto px-4">
          <header className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">{post.title}</h1>
            <div className="text-sm text-white/80 mb-4">
              Last updated {formattedDate}
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-white/90">
              <span>Written by {post.author}</span>
              {post.categories.length > 0 && (
                <>
                  <span>•</span>
                  <span>In collaboration with {post.categories[0]}</span>
                </>
              )}
            </div>
          </header>
        </div>
      </div>

      {/* 正文内容区域 */}
      <div className="max-w-3xl mx-auto px-4 pt-48 md:pt-52">
        <div className="prose prose-lg max-w-none pl-0 md:pl-8">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeAttr, rehypeRaw]}
            components={{
              h1: () => null,
              p: ({ children }) => {
                const hasImage = React.Children.toArray(children).some(
                  child => React.isValidElement(child) && child.type === 'img'
                );
                
                if (hasImage) {
                  return <div className="my-8">{children}</div>;
                }
                
                return <p className="pl-0 md:pl-0">{children}</p>;
              },
              img: ({ src, alt, className }) => {
                if (!src) return null;
                const imgClassName = `object-cover rounded-lg transition-transform duration-300 ${className || ''}`;
                return (
                  <div className="relative w-full overflow-hidden rounded-lg">
                    <div className="aspect-[16/9] relative">
                      <Image
                        src={src}
                        alt={alt || ''}
                        fill
                        className={imgClassName}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={false}
                        quality={75}
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMjU1LS0yMi4qLjgyPjA+OjU/RUVHUDRMTlhOUE5YXldaWlr/2wBDARUXFx4aHR4eGlpaLiUuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                      />
                    </div>
                    {alt && (
                      <p className="text-sm text-gray-500 mt-2 italic">
                        {alt}
                      </p>
                    )}
                  </div>
                );
              }
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </div>
    </article>
  );
} 