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
  // Strip the locale on both sides of the base-path step: depending on the host, usePathname() can
  // arrive as /pt-br/docs/... or the base path itself can be rewritten to /pt-br/docs.
  const unlocalizedPath = stripLocale(pathname);
  const absolutePath =
    unlocalizedPath === '/docs' || unlocalizedPath.startsWith('/docs/')
      ? unlocalizedPath
      : `${getBasePath()}${unlocalizedPath}`;
  const pageUrl = stripLocale(absolutePath);

  return (
    <div className="footer-container" style={{ gridArea: 'footer' }}>
      <LocalizedLinkProvider pageUrl={pageUrl} origin={DOTCOM_BASE_URL}>
        <UnifiedFooter locale={locale as NavLocale} enabledLocales={enabledLocales} onSelectLocale={onSelectLocale} />
      </LocalizedLinkProvider>
    </div>
  );
};
