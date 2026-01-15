'use client';

import { UnifiedNav } from '@mdb/consistent-nav';
import headingStyles from './header.module.scss';
import SiteBanner from '@/components/banner/site-banner';
import { cx } from '@leafygreen-ui/emotion';
import { useSiteBanner } from '@/components/banner/site-banner/banner-context';

const Header = () => {
  const unifiedNavProperty = 'DOCS';
  const { hasBanner } = useSiteBanner();

  // TODO: language selection
  return (
    <>
      {hasBanner && <SiteBanner />}
      <header className={cx(headingStyles.header, hasBanner && headingStyles.headerHasBanner)}>
        <UnifiedNav
          fullWidth={true}
          hideSearch={true}
          position="relative"
          property={{ name: unifiedNavProperty, searchParams: [] }}
          showLanguageSelector={true}
          // onSelectLocale={onSelectLocale}
          locale={'en-us'}
          enabledLocales={['en-us']}
          darkMode={false}
        />
      </header>
    </>
  );
};

export default Header;
