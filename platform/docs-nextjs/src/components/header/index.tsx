'use client';

import { UnifiedNav } from '@mdb/consistent-nav';
import headingStyles from './header.module.scss';
import SiteBanner from '@/components/banner/site-banner';
import { cx } from '@leafygreen-ui/emotion';
import { useSiteBanner } from '@/components/banner/site-banner/banner-context';

const Header = ({ eol = false }: { eol?: boolean }) => {
  const unifiedNavProperty = 'DOCS';
  const { hasBanner } = useSiteBanner();

  // TODO: language selection
  return (
    <>
      {hasBanner && <SiteBanner />}
      <header className={cx(headingStyles.header, hasBanner && headingStyles.headerHasBanner)}>
        {/* Two navs used intentionally: one for light mode, one for dark mode */}
        {!eol && (
          <>
            <UnifiedNav
              fullWidth={true}
              hideSearch={true}
              position="relative"
              property={{ name: unifiedNavProperty, searchParams: [] }}
              showLanguageSelector={true}
              // onSelectLocale={onSelectLocale}
              // locale={locale}
              locale={'en-us'}
              // enabledLocales={enabledLocales}
              enabledLocales={['en-us']}
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
              // onSelectLocale={onSelectLocale}
              // locale={locale} // TODO: Locale
              locale={'en-us'}
              // enabledLocales={enabledLocales} // TODO: Locale
              enabledLocales={['en-us']}
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

export default Header;
