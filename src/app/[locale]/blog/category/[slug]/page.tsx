import { getPostsByCategory, getAllCategories } from '@/lib/blog/utils';
import PostCard from '@/components/blog/PostCard';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

interface CategoryPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

// 生成静态路径
export async function generateStaticParams() {
  const locales = ['zh', 'en', 'ja'];
  const paths = [];

  // 直接从 blog 目录获取分类
  const categories = await getAllCategories();
  
  for (const locale of locales) {
    for (const category of categories) {
      paths.push({
        locale,
        slug: category,
      });
    }
  }

  return paths;
}

// 生成SEO元数据
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  // 在 Next.js 15 中，params 是一个 Promise
  const { locale, slug } = await params;
  const t = await getTranslations('blog');
  const category = decodeURIComponent(slug);
  
  // 构建完整的URL
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://chinesegrammarchecker.com';
  const canonicalUrl = `${baseUrl}/${locale}/blog/category/${slug}`;
  
  return {
    title: `${t('categoryTitle', { category })} - Grammar Checker`,
    description: `${t('categoryTitle', { category })} - Grammar Checker - 浏览${category}分类下的所有文章`,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${baseUrl}/en/blog/category/${slug}`,
        'zh': `${baseUrl}/zh/blog/category/${slug}`,
        'ja': `${baseUrl}/ja/blog/category/${slug}`,
      }
    },
    openGraph: {
      title: `${t('categoryTitle', { category })} - Grammar Checker`,
      description: `${t('categoryTitle', { category })} - Grammar Checker - 浏览${category}分类下的所有文章`,
      url: canonicalUrl,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: `${t('categoryTitle', { category })} - Grammar Checker`,
      description: `${t('categoryTitle', { category })} - Grammar Checker - 浏览${category}分类下的所有文章`,
    }
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { locale, slug } = await params;
  const t = await getTranslations('blog');
  const category = decodeURIComponent(slug);
  
  // 直接从 blog 目录获取文章
  const posts = await getPostsByCategory(slug);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link 
          href={`/${locale}/blog`}
          className="text-blue-600 hover:text-blue-800 transition-colors"
        >
          ← {t('backToBlog')}
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold mb-8">
        {t('categoryTitle', { category })}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostCard key={post.slug} post={post} locale={locale} />
          ))
        ) : (
          <p className="text-gray-500">{t('noPostsInCategory')}</p>
        )}
      </div>
    </div>
  );
} 