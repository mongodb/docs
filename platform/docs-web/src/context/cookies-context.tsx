'use client';

import { createContext, useContext, useState } from 'react';

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

const CookiesProvider = ({ children, cookies }: CookiesProviderProps) => {
  const [cookiesState, setCookiesState] = useState<Record<string, string>>(cookies);

  const getCookie = (name: string) => {
    return cookiesState[name];
  };

  const setCookie = (name: string, value: string) => {
    // set actual cookie using document.cookie
    document.cookie = `${name}=${value}; path=/; max-age=31536000;`;
    setCookiesState({ ...cookiesState, [name]: value });
  };

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
