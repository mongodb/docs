'use client';

import { LocalizedLinkProvider, UnifiedFooter } from '@mdb/consistent-nav';
import { usePathname } from 'next/navigation';
import { DOTCOM_BASE_URL } from '@/constants';
import { useLocale, type NavLocale } from '@/context/locale';
import { getBasePath } from '@/utils/base-path';
import { stripLocale } from '@/utils/locale';

export const Footer = () => {
  const { locale, enabledLocales, onSelectLocale } = useLocale();
  const pathname = usePathname() ?? '';
  const absolutePath = pathname === '/docs' || pathname.startsWith('/docs/') ? pathname : `${getBasePath()}${pathname}`;
  const pageUrl = stripLocale(absolutePath);

  return (
    <div className="footer-container" style={{ gridArea: 'footer' }}>
      <LocalizedLinkProvider pageUrl={pageUrl} origin={DOTCOM_BASE_URL}>
        <UnifiedFooter locale={locale as NavLocale} enabledLocales={enabledLocales} onSelectLocale={onSelectLocale} />
      </LocalizedLinkProvider>
    </div>
  );
};
