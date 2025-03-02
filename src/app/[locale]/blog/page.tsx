import { getAllPosts, getAllCategories, getAllTags } from '@/lib/blog/utils';
import PostCard from '@/components/blog/PostCard';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

interface BlogPageProps {
  params: {
    locale: string;
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  // 确保 locale 是有效的
  const locale = params.locale;
  const t = await getTranslations('blog');
  const posts = await getAllPosts(locale);
  const categories = await getAllCategories(locale);
  const tags = await getAllTags(locale);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t('blog')}</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.length > 0 ? (
              posts.map((post) => (
                <PostCard key={post.slug} post={post} locale={locale} />
              ))
            ) : (
              <p className="text-gray-500">{t('noPosts')}</p>
            )}
          </div>
        </div>
        
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-bold mb-4">{t('categories')}</h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/blog/category/${encodeURIComponent(category)}`}
                  locale={locale}
                  className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-bold mb-4">{t('tags')}</h2>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog/tag/${encodeURIComponent(tag)}`}
                  locale={locale}
                  className="text-sm bg-gray-100 text-gray-800 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 