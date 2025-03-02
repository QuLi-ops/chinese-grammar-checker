import { getPostsByTag, getAllTags } from '@/lib/blog/utils';
import PostCard from '@/components/blog/PostCard';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

interface TagPageProps {
  params: {
    locale: string;
    slug: string;
  };
}

// 生成静态路径
export async function generateStaticParams() {
  const locales = ['zh', 'en'];
  const paths = [];

  for (const locale of locales) {
    const tags = await getAllTags(locale);
    
    for (const tag of tags) {
      paths.push({
        locale,
        slug: tag,
      });
    }
  }

  return paths;
}

export default async function TagPage({ params }: TagPageProps) {
  const locale = params.locale;
  const slug = params.slug;
  const t = await getTranslations('blog');
  const tag = decodeURIComponent(slug);
  const posts = await getPostsByTag(tag, locale);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link 
          href="/blog" 
          locale={locale}
          className="text-blue-600 hover:text-blue-800 transition-colors"
        >
          ← {t('backToBlog')}
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold mb-8">
        {t('tagTitle', { tag })}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostCard key={post.slug} post={post} locale={locale} />
          ))
        ) : (
          <p className="text-gray-500">{t('noPostsWithTag')}</p>
        )}
      </div>
    </div>
  );
} 