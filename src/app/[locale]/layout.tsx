import {NextIntlClientProvider} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Metadata } from 'next';

const locales = ['en', 'zh', 'ja'];

// 添加生成元数据的函数
export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const { locale } = await params;
  
  // 获取基础URL
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://chinesegrammarchecker.com';
  
  return {
    // 添加规范链接，使用当前页面的语言
    alternates: {
      canonical: `${baseUrl}/${locale}`,
    }
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  // 在 Next.js 15 中，params 是一个 Promise，必须 await
  const { locale } = await params;
  
  // 设置请求的 locale
  setRequestLocale(locale);
  
  // 验证传入的 locale 参数是否有效
  if (!locales.includes(locale)) notFound();

  // 获取消息资源
  const messages = await getMessages();
 
  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <header className="fixed top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-14 items-center">
          <div className="flex flex-1 items-center justify-between">
            <Navigation />
            <LanguageSwitcher />
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16 relative z-0">
        {children}
      </main>
      <Footer />
    </NextIntlClientProvider>
  );
} 