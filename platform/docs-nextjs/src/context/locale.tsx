'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { LocalizedLinkProvider } from '@mdb/consistent-nav';
import {
  type AvailableLocaleType,
  getCurrLocale,
  getAvailableLanguages,
  getHtmlLangFormat,
  localizePath,
  onSelectLocale as selectLocale,
} from '@/utils/locale';

// Mirrors @mdb/consistent-nav's internal Locale type, which is not exported from the package.
export type NavLocale = 'en-us' | 'pt-br' | 'es' | 'ko-kr' | 'ja-jp' | 'de-de' | 'zh-cn';

interface LocaleContextValue {
  locale: AvailableLocaleType;
  enabledLocales: AvailableLocaleType[];
  onSelectLocale: (locale: string) => void;
}

const defaultLocaleContext: LocaleContextValue = {
  locale: 'en-us',
  enabledLocales: ['en-us'],
  onSelectLocale: selectLocale,
};

const LocaleContext = createContext<LocaleContextValue>(defaultLocaleContext);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<AvailableLocaleType>('en-us');
  const [pageUrl, setPageUrl] = useState('/');
  const [origin, setOrigin] = useState('https://mongodb.com');
  const enabledLocales = getAvailableLanguages().map(({ localeCode }) => localeCode);

  useEffect(() => {
    const currLocale = getCurrLocale();
    setLocale(currLocale);
    document.documentElement.lang = getHtmlLangFormat(currLocale);
    setPageUrl(localizePath(window.location.pathname, 'en-us'));
    setOrigin(window.location.origin);
  }, []);

  return (
    <LocalizedLinkProvider pageUrl={pageUrl} origin={origin}>
      <LocaleContext.Provider value={{ locale, enabledLocales, onSelectLocale: selectLocale }}>
        {children}
      </LocaleContext.Provider>
    </LocalizedLinkProvider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
