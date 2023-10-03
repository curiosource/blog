import { useTranslation } from 'next-i18next';
import Link from 'next/link';

import BlogLogo from '@icons/blog-logo.svg';
import { LanguageSelector } from '@src/components/features/language-selector';
import Adsense from '@src/components/shared/Adsense';
import { Container } from '@src/components/shared/container';
import GoogleAnalytics from '@src/components/shared/GoogleAnalytics';

export const Header = () => {
  const { t } = useTranslation();

  return (
    <header className="py-5">
      <GoogleAnalytics />
      <meta name="google-adsense-account" content={`${process.env.NEXT_PUBLIC_AD_ID}`} />
      <meta name="google-site-verification" content={`${process.env.NEXT_PUBLIC_SC_ID}`}  />
      
      <nav>
        <Container className="flex items-center justify-between">
          <Link href="/" title={t('common.homepage')}>
            <BlogLogo />
          </Link>
          <LanguageSelector />
        </Container>
      </nav>
    </header>
  );
};
