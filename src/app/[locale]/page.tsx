import {useTranslations} from 'next-intl';

export default function Home() {
  const t = useTranslations('app');

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
      <h1 className="text-4xl font-bold tracking-tight">{t('title')}</h1>
      <p className="mt-4 text-lg text-muted-foreground">{t('description')}</p>
      
      <div className="mt-8 grid gap-4">
        <textarea 
          className="w-full min-w-[300px] h-32 p-4 rounded-lg border bg-background"
          placeholder={t('input.placeholder')}
        />
        <button className="w-full px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90">
          {t('input.check')}
        </button>
      </div>
    </div>
  );
} 