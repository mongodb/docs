'use client';

import { UnifiedFooter } from '@mdb/consistent-nav';
import { useLocale, type NavLocale } from '@/context/locale';

export const Footer = () => {
  const { locale, enabledLocales, onSelectLocale } = useLocale();

  return (
    <div className="footer-container" style={{ gridArea: 'footer' }}>
      <UnifiedFooter locale={locale as NavLocale} enabledLocales={enabledLocales} onSelectLocale={onSelectLocale} />
    </div>
  );
};
