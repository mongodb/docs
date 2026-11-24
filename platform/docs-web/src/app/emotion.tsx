'use client';

import type { PropsWithChildren } from 'react';
import { useContext, useState } from 'react';

import { CacheProvider } from '@emotion/react';
import { useServerInsertedHTML } from 'next/navigation';

import { cache } from '@leafygreen-ui/emotion';
import type { LeafyGreenProviderProps } from '@leafygreen-ui/leafygreen-provider';
import LGProvider from '@leafygreen-ui/leafygreen-provider';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import { DarkModeContext } from '@/context/dark-mode-context';

// Compat mode tells Emotion to store CSS strings in cache.inserted (rather
// than boolean markers) and to NOT auto-inject styles into the DOM via its
// own sheet. This is critical for SSR hydration: without it, Emotion's
// client-side runtime re-injects all styles on hydration, causing a FOUC.
//
// This must be set at module level -- before any component module's top-level
// css`` calls execute -- so that ALL styles are stored as extractable strings.
cache.compat = true;

/**
 * Sets up everything we need to use MongoDB's design system LeafyGreen.
 *
 * This includes setting up emotion, the css-in-js solution required by LeafyGreen.
 *
 * This also injects critical styles into the HTML document on page load to prevent
 * a flash of unstyled content (FOUC).
 *
 * Uses a diff-based flush to avoid re-emitting the entire stylesheet at every
 * streaming boundary during SSR. Each invocation of useServerInsertedHTML only
 * emits styles that haven't been emitted yet in this render, by diffing
 * cache.inserted against an "already emitted" set.
 *
 * Unlike the cache.insert interception pattern (from tss-react), this approach
 * also captures styles that were inserted at module-load time -- before the
 * component mounts -- which is critical because LeafyGreen and many components
 * define styles via top-level `const style = css`...`` calls.
 *
 * @see https://github.com/mongodb/leafygreen-ui/blob/main/packages/leafygreen-provider/README.md
 * @see https://github.com/emotion-js/emotion/issues/2928#issuecomment-1293012737
 * @see https://github.com/garronej/tss-react/blob/main/src/next/appDir.tsx
 */

export function LeafyGreenProviderWrapper({ children, baseFontSize }: PropsWithChildren<LeafyGreenProviderProps>) {
  const { isDarkMode } = useContext(DarkModeContext);

  const [emitted] = useState(() => new Set<string>());

  useServerInsertedHTML(() => {
    const names: string[] = [];
    let styles = '';

    for (const name of Object.keys(cache.inserted)) {
      if (emitted.has(name)) continue;
      emitted.add(name);

      const style = cache.inserted[name];
      if (typeof style === 'string') {
        names.push(name);
        styles += style;
      }
    }

    if (!styles) return null;

    return (
      <style
        data-emotion={`${cache.key} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{
          __html: styles,
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
