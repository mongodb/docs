'use client';

import { ViaProvider } from '@via-ds/components/provider';
import { Toaster } from '@via-ds/components/toast';
import { Size } from '@via-ds/components/types';
import '@via-ds/components/index.css';
import '@via-ds/icons/styles.css';

/**
 * Mounts the Via design system provider alongside `LeafyGreenProviderWrapper`
 * for the duration of the LeafyGreen-to-Via migration. It is kept out of
 * `src/app/emotion.tsx` so that file remains unmodified and can be deleted in
 * one commit once the migration completes.
 *
 * This must be a client component. The layouts that mount it are async server
 * components using `next/headers`, so they cannot participate in React context.
 *
 * No `colorScheme` prop: the scheme resolves from `<html data-via-color-scheme>`,
 * set before paint by `ViaColorSchemeScript` and kept in sync with the site's
 * theme toggle by `DarkModeContextProvider`.
 */
export function ViaProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ViaProvider size={Size.Large}>
      {children}
      <Toaster />
    </ViaProvider>
  );
}
