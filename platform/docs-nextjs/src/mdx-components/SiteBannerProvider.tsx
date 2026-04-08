'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { SiteBannerContent } from '@/components/banner/site-banner/types';

interface SiteBannerContextValue {
  bannerData: SiteBannerContent | null;
  hasBanner: boolean;
}

const SiteBannerContext = createContext<SiteBannerContextValue>({
  bannerData: null,
  hasBanner: false,
});

interface SiteBannerProviderProps {
  children: ReactNode;
  bannerData: SiteBannerContent;
}

export function SiteBannerProvider({ children, bannerData }: SiteBannerProviderProps) {
  const hasBanner = !!bannerData && !!bannerData.url && !!(bannerData.imgPath || bannerData.text);

  return <SiteBannerContext.Provider value={{ bannerData, hasBanner }}>{children}</SiteBannerContext.Provider>;
}

export function useSiteBanner() {
  const context = useContext(SiteBannerContext);
  if (!context) {
    throw new Error('useSiteBanner must be used within a SiteBannerProvider');
  }
  return context;
}

export { SiteBannerContext };
