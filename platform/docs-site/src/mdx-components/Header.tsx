'use client';

import { UnifiedNav } from '@mdb/consistent-nav';
import headingStyles from '@/styles/header-theme.module.scss';
import { SiteBanner } from '@/mdx-components/Banner/SiteBanner';
import { cx } from '@leafygreen-ui/emotion';
import { useSiteBanner } from './SiteBannerProvider';
import { useLocale, type NavLocale } from '@/context/locale';
import { NOTRANSLATE_CLASS } from '@/utils/locale';

export const Header = ({ eol = false }: { eol?: boolean }) => {
  const unifiedNavProperty = 'DOCS';
  const { hasBanner } = useSiteBanner();
  const { locale, enabledLocales, onSelectLocale } = useLocale();

  return (
    <>
      {hasBanner && <SiteBanner />}
      <header className={cx(headingStyles.header, hasBanner && headingStyles.headerHasBanner, NOTRANSLATE_CLASS)}>
        {/* Two navs used intentionally: one for light mode, one for dark mode */}
        {!eol && (
          <>
            <UnifiedNav
              fullWidth={true}
              hideSearch={true}
              position="relative"
              property={{ name: unifiedNavProperty, searchParams: [] }}
              showLanguageSelector={true}
              onSelectLocale={onSelectLocale}
              locale={locale as NavLocale}
              enabledLocales={enabledLocales}
              darkMode={false}
              // @ts-expect-error - pass className
              className="nav-light"
            />
            <UnifiedNav
              fullWidth={true}
              hideSearch={true}
              position="relative"
              property={{ name: unifiedNavProperty, searchParams: [] }}
              showLanguageSelector={true}
              onSelectLocale={onSelectLocale}
              locale={locale as NavLocale}
              enabledLocales={enabledLocales}
              darkMode={true}
              // @ts-expect-error - pass className
              className="nav-dark"
            />
          </>
        )}
      </header>
    </>
  );
};
