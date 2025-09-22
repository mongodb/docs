'use client';

import type { PropsWithChildren } from 'react';
import { useContext } from 'react';

import { CacheProvider } from '@emotion/react';
import { useServerInsertedHTML } from 'next/navigation';

import { cache } from '@leafygreen-ui/emotion';
import type { LeafyGreenProviderProps } from '@leafygreen-ui/leafygreen-provider';
import LGProvider from '@leafygreen-ui/leafygreen-provider';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import { DarkModeContext } from '@/context/dark-mode-context';

/**
 * Sets up everything we need to use MongoDB's design system LeafyGreen.
 *
 * This includes setting up emotion, the css-in-js solution required by LeafyGreen.
 *
 * This also injects critical styles into the HTML document on page load to prevent
 * a flash of unstyled content (FOUC).
 *
 * @see https://github.com/mongodb/leafygreen-ui/blob/main/packages/leafygreen-provider/README.md
 * @see https://github.com/emotion-js/emotion/issues/2928#issuecomment-1293012737
 */

export function LeafyGreenProviderWrapper({ children, baseFontSize }: PropsWithChildren<LeafyGreenProviderProps>) {
  const { isDarkMode } = useContext(DarkModeContext);

  useServerInsertedHTML(() => {
    const keys = Object.keys(cache.inserted);
    if (keys.length === 0) return null;

    return (
      <style
        data-emotion={`${cache.key} ${keys.join(' ')}`}
        dangerouslySetInnerHTML={{
          __html: Object.values(cache.inserted).join(' '),
        }}
      />
    );
  });

  return (
    <CacheProvider value={cache}>
      <LGProvider darkMode={isDarkMode} baseFontSize={baseFontSize ?? BaseFontSize.Body2}>
        {children}
      </LGProvider>
    </CacheProvider>
  );
}
