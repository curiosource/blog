import { useTranslation } from 'next-i18next';
import Link from 'next/link';

import BlogLogo from '@icons/blog-logo.svg';
import { LanguageSelector } from '@src/components/features/language-selector';
import GoogleAdsense from '@src/components/shared/adsence';
import { Container } from '@src/components/shared/container';
import GoogleAnalytics from '@src/components/shared/GoogleAnalytics';

export const Header = () => {
  const { t } = useTranslation();

  return (
    <header className="py-5">
      <GoogleAnalytics />
      <GoogleAdsense />
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
