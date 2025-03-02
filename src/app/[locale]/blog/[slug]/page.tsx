import { getPostBySlug, getAllPosts } from '@/lib/blog/utils';
import PostContent from '@/components/blog/PostContent';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

interface BlogPostPageProps {
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
    const posts = await getAllPosts(locale);
    
    for (const post of posts) {
      paths.push({
        locale,
        slug: post.slug,
      });
    }
  }

  return paths;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const locale = params.locale;
  const slug = params.slug;
  const t = await getTranslations('blog');
  const post = await getPostBySlug(slug, locale);
  
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