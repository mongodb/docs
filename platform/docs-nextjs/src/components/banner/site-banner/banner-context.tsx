'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { SiteBannerContent } from './types';

interface SiteBannerContextValue {
  bannerData: SiteBannerContent | null;
}

const SiteBannerContext = createContext<SiteBannerContextValue>({
  bannerData: null,
});

interface SiteBannerProviderProps {
  children: ReactNode;
  bannerData: SiteBannerContent;
}

function SiteBannerProvider({ children, bannerData }: SiteBannerProviderProps) {
  return <SiteBannerContext.Provider value={{ bannerData }}>{children}</SiteBannerContext.Provider>;
}

function useSiteBanner() {
  const context = useContext(SiteBannerContext);
  if (!context) {
    throw new Error('useSiteBanner must be used within a SiteBannerProvider');
  }
  return context;
}

export { SiteBannerContext, SiteBannerProvider, useSiteBanner };
