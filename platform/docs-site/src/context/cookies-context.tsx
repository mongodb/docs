'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const CookiesContext = createContext<
  | {
      cookies: Record<string, string>;
      getCookie: (name: string) => string | undefined;
      setCookie: (name: string, value: string) => void;
    }
  | undefined
>(undefined);

type CookiesProviderProps = {
  children: React.ReactNode;
  cookies: Record<string, string>;
};

function parseBrowserCookies(): Record<string, string> {
  const result: Record<string, string> = {};
  for (const part of document.cookie.split(';')) {
    const [name, ...rest] = part.trim().split('=');
    if (name) result[name] = decodeURIComponent(rest.join('='));
  }
  return result;
}

const CookiesProvider = ({ children, cookies }: CookiesProviderProps) => {
  const [cookiesState, setCookiesState] = useState<Record<string, string>>(cookies);

  useEffect(() => {
    setCookiesState((prev) => ({ ...prev, ...parseBrowserCookies() }));
  }, []);

  const getCookie = useCallback(
    (name: string) => cookiesState[name],
    [cookiesState],
  );

  const setCookie = useCallback((name: string, value: string) => {
    document.cookie = `${name}=${value}; path=/; max-age=31536000;`;
    setCookiesState((prev) => ({ ...prev, [name]: value }));
  }, []);

  return (
    <CookiesContext.Provider value={{ cookies: cookiesState, getCookie, setCookie }}>
      {children}
    </CookiesContext.Provider>
  );
};

const useCookiesContext = () => {
  const context = useContext(CookiesContext);
  if (!context) throw new Error('useCookiesContext must be used within a CookiesProvider');
  return context;
};

export { CookiesProvider, useCookiesContext };
