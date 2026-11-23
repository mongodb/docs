'use client';

import type { PropsWithChildren } from 'react';
import { useState } from 'react';

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { useServerInsertedHTML } from 'next/navigation';

/**
 * Collects the Emotion styles of `@mdb/consistent-nav` (Header and Footer,
 * built on Flora and theme-ui) and emits them into the server-rendered HTML.
 * Docs-site code itself does not use Emotion.
 *
 * Uses a diff-based flush to avoid re-emitting the entire stylesheet at every
 * streaming boundary during SSR. Each invocation of useServerInsertedHTML only
 * emits styles that haven't been emitted yet in this render, by diffing
 * cache.inserted against an "already emitted" set.
 *
 * @see https://github.com/emotion-js/emotion/issues/2928#issuecomment-1293012737
 * @see https://github.com/garronej/tss-react/blob/main/src/next/appDir.tsx
 */
export function EmotionCacheProvider({ children }: PropsWithChildren) {
  // Per render so server requests don't share cache.inserted.
  const [cache] = useState(() => {
    const c = createCache({ key: 'docs' });
    // Compat mode tells Emotion to store CSS strings in cache.inserted (rather
    // than boolean markers) and to NOT auto-inject styles into the DOM via its
    // own sheet. This is critical for SSR hydration: without it, Emotion's
    // client-side runtime re-injects all styles on hydration, causing a FOUC.
    c.compat = true;
    return c;
  });
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

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
