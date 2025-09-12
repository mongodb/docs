'use client';

import type { PropsWithChildren } from 'react';

import { CacheProvider } from '@emotion/react';
import { useServerInsertedHTML } from 'next/navigation';

import { cache } from '@leafygreen-ui/emotion';
import type { LeafyGreenProviderProps } from '@leafygreen-ui/leafygreen-provider';
import LGProvider from '@leafygreen-ui/leafygreen-provider';
import { BaseFontSize } from '@leafygreen-ui/tokens';

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

export function LeafyGreenProvider({ children, baseFontSize }: PropsWithChildren<LeafyGreenProviderProps>) {
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
      <LGProvider
        // darkMode={theme === 'dark'} // TODO: use cookie props to set dark mode
        baseFontSize={baseFontSize ?? BaseFontSize.Body2}
      >
        {children}
      </LGProvider>
    </CacheProvider>
  );
}
