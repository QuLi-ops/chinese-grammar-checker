import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  const t = await getTranslations({ locale: locale, namespace: 'japanesegrammarchecker' });
  
  return {
    title: t('meta.title'),
    description: t('meta.description'),
    openGraph: {
      title: t('meta.og.title'),
      description: t('meta.og.description'),
      type: 'website',
      images: [
        {
          url: '/og-image-japanese.png',
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
      canonical: `https://chinesegrammarchecker.com/${locale}/japanese-grammar-checker`,
      languages: {
        'en': `https://chinesegrammarchecker.com/en/japanese-grammar-checker`,
        'zh': `https://chinesegrammarchecker.com/zh/japanese-grammar-checker`,
        'ja': `https://chinesegrammarchecker.com/ja/japanese-grammar-checker`
      }
    }
  };
}

export default function JapaneseGrammarCheckerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 