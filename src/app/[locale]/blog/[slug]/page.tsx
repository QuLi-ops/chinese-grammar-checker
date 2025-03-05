import { getPostBySlug, getAllPosts } from '@/lib/blog/utils';
import PostContent from '@/components/blog/PostContent';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

interface BlogPostPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

// 生成静态路径
export async function generateStaticParams() {
  const locales = ['zh', 'en', 'ja'];
  const paths = [];

  // 只获取英文文章列表，为所有语言生成路由
  const posts = await getAllPosts('en');
  
  for (const locale of locales) {
    for (const post of posts) {
      paths.push({
        locale,
        slug: post.slug,
      });
    }
  }

  return paths;
}

// 生成SEO元数据
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  // 在 Next.js 15 中，params 是一个 Promise
  const { locale, slug } = await params;
  // 始终从英文内容获取文章
  const post = await getPostBySlug(slug, 'en');
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.'
    };
  }
  
  // 构建完整的URL（需要根据你的实际部署域名调整）
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://chinesegrammarchecker.com';
  const canonicalUrl = `${baseUrl}/${locale}/blog/${slug}`;
  
  return {
    title: post.title,
    description: post.excerpt || `${post.title} - Grammar Checker Blog`,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${baseUrl}/en/blog/${slug}`,
        'zh': `${baseUrl}/zh/blog/${slug}`,
        'ja': `${baseUrl}/ja/blog/${slug}`,
      }
    },
    openGraph: {
      title: post.title,
      description: post.excerpt || `${post.title} - Grammar Checker Blog`,
      url: canonicalUrl,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || `${post.title} - Grammar Checker Blog`,
    }
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;
  const t = await getTranslations('blog');
  // 始终从英文内容获取文章
  const post = await getPostBySlug(slug, 'en');
  
  if (!post) {
    notFound();
  }

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
      
      <PostContent post={post} locale={locale} />
    </div>
  );
} 