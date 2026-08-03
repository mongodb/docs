'use client';

import { useContext, createContext } from 'react';
import type { ClientSiteMetadata } from '@/types/data';

const MetadataContext = createContext<ClientSiteMetadata | undefined>(undefined);

export const useSnootyMetadata = () => {
  const context = useContext(MetadataContext);

  if (!context) throw new Error('useSnootyMetadata must be used within a MetadataProvider');

  return context;
};

export const MetadataProvider = MetadataContext.Provider;
