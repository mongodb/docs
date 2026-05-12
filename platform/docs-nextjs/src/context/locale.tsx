'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import {
  type AvailableLocaleType,
  COOKIE_KEY_PREF_LOCALE,
  getCurrLocale,
  getAvailableLanguages,
  getHtmlLangFormat,
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

export function LocaleProvider({
  children,
  initialLocale = 'en-us',
}: {
  children: ReactNode;
  initialLocale?: AvailableLocaleType;
}) {
  const [locale, setLocale] = useState<AvailableLocaleType>(initialLocale);
  const enabledLocales = getAvailableLanguages().map(({ localeCode }) => localeCode);

  useEffect(() => {
    const urlLocale = getCurrLocale();

    const cookieMatch = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_KEY_PREF_LOCALE}=([^;]+)`));
    const cookieLocale = cookieMatch ? decodeURIComponent(cookieMatch[1]) : null;
    const isExplicitEnglish = cookieLocale === 'en-us';

    const resolvedLocale = urlLocale !== 'en-us' && !isExplicitEnglish ? urlLocale : initialLocale;
    setLocale(resolvedLocale);
    document.documentElement.lang = getHtmlLangFormat(resolvedLocale);
  }, [initialLocale]);

  return (
    <LocaleContext.Provider value={{ locale, enabledLocales, onSelectLocale: selectLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
