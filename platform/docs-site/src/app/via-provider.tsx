'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ViaProvider } from '@via-ds/components/provider';
import { Toaster } from '@via-ds/components/toast';
import { Size } from '@via-ds/components/types';
import '@via-ds/components/index.css';
import '@via-ds/icons/styles.css';
import { useLocale } from '@/context/locale';
import { sameProjectHref } from '@/utils/base-path';
import { getHtmlLangFormat } from '@/utils/locale';

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
  const router = useRouter();
  const { locale } = useLocale();

  // Cross-deploy hrefs need a full load; router.push would prepend this basePath.
  const navigate = useCallback(
    (href: string) => {
      const clientHref = sameProjectHref(href);
      if (clientHref) router.push(clientHref);
      else window.location.assign(href);
    },
    [router],
  );

  return (
    <ViaProvider size={Size.Large} navigate={navigate} locale={getHtmlLangFormat(locale)}>
      {children}
      <Toaster />
    </ViaProvider>
  );
}
