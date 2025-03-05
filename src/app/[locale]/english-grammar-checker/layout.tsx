import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  // 在 Next.js 15 中，params 是一个 Promise，必须 await
  const { locale } = await params;
  
  const t = await getTranslations({ locale: locale, namespace: 'englishgrammarchecker' });
  
  return {
    title: t('meta.title'),
    description: t('meta.description'),
    openGraph: {
      title: t('meta.og.title'),
      description: t('meta.og.description'),
      type: 'website',
      images: [
        {
          url: '/og-image-english.png',
          width: 1200,
          height: 630,
          alt: t('meta.og.alt'),
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('meta.twitter.title'),
      description: t('meta.twitter.description'),
    },
    alternates: {
      canonical: `https://chinesegrammarchecker.com/${locale}/english-grammar-checker`,
      languages: {
        'en': `https://chinesegrammarchecker.com/en/english-grammar-checker`,
        'zh': `https://chinesegrammarchecker.com/zh/english-grammar-checker`,
        'ja': `https://chinesegrammarchecker.com/ja/english-grammar-checker`
      }
    }
  };
}

export default function EnglishGrammarCheckerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 