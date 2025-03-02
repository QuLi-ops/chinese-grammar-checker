import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'koreangrammarchecker' });
  
  return {
    title: t('meta.title'),
    description: t('meta.description'),
    openGraph: {
      title: t('meta.og.title'),
      description: t('meta.og.description'),
      type: 'website',
      images: [
        {
          url: '/og-image-korean.png',
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
      canonical: `https://chinesegrammarchecker.com/${params.locale}/korean-grammar-checker`
    }
  };
}

export default function KoreanGrammarCheckerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 