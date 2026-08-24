'use client';

import { useContext } from 'react';
import { ViaProvider } from '@via-ds/components';
import { ColorScheme, Size } from '@via-ds/components/types';
import '@via-ds/components/index.css';

import { DarkModeContext } from '@/context/dark-mode-context';

/**
 * Mounts the Via design system provider alongside `LeafyGreenProviderWrapper`
 * for the duration of the LeafyGreen-to-Via migration. It is kept out of
 * `src/app/emotion.tsx` so that file remains unmodified and can be deleted in
 * one commit once the migration completes.
 *
 * This must be a client component. The layouts that mount it are async server
 * components using `next/headers`, so they cannot participate in React context.
 *
 * `colorScheme` is driven from `DarkModeContext` so that Via components follow
 * the site's dark-mode toggle rather than the reader's OS setting.
 */
export function ViaProviderWrapper({ children }: { children: React.ReactNode }) {
  const { isDarkMode } = useContext(DarkModeContext);

  return (
    <ViaProvider colorScheme={isDarkMode ? ColorScheme.Dark : ColorScheme.Light} size={Size.Large}>
      {children}
    </ViaProvider>
  );
}
