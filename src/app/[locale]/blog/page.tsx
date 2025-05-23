import { getAllPosts, getAllCategories, getAllTags } from '@/lib/blog/utils';
import PostCard from '@/components/blog/PostCard';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

interface BlogPageProps {
  params: Promise<{
    locale: string;
  }>;
}

// 生成SEO元数据
export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  // 在 Next.js 15 中，params 是一个 Promise
  const { locale } = await params;
  const t = await getTranslations('blog');
  
  // 构建完整的URL
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://chinesegrammarchecker.com';
  const canonicalUrl = `${baseUrl}/${locale}/blog`;
  
  return {
    title: `${t('blog')} - Grammar Checker`,
    description: `${t('blog')} - Grammar Checker - 语法检查器博客文章、教程和资源`,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${baseUrl}/en/blog`,
        'zh': `${baseUrl}/zh/blog`,
        'ja': `${baseUrl}/ja/blog`,
      }
    },
    openGraph: {
      title: `${t('blog')} - Grammar Checker`,
      description: `${t('blog')} - Grammar Checker - 语法检查器博客文章、教程和资源`,
      url: canonicalUrl,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: `${t('blog')} - Grammar Checker`,
      description: `${t('blog')} - Grammar Checker - 语法检查器博客文章、教程和资源`,
    }
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  const t = await getTranslations('blog');
  
  // 直接从 blog 目录获取文章列表和分类标签
  const posts = await getAllPosts();
  const categories = await getAllCategories();
  const tags = await getAllTags();

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
                  href={`/${locale}/blog/category/${encodeURIComponent(category)}`}
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
                  href={`/${locale}/blog/tag/${encodeURIComponent(tag)}`}
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