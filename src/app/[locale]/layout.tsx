import {NextIntlClientProvider, useMessages} from 'next-intl';
import {notFound} from 'next/navigation';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const locales = ['en', 'zh'];

export default function LocaleLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  const messages = useMessages();
 
  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <header className="fixed top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-14 items-center">
          <div className="flex flex-1 items-center justify-between">
            <nav className="flex items-center space-x-6">
              {/* Add your navigation items here */}
            </nav>
            <LanguageSwitcher />
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        {children}
      </main>
    </NextIntlClientProvider>
  );
} 