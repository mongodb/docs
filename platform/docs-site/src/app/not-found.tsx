'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Text, TextStyle } from '@via-ds/components/typography';
import { Size } from '@via-ds/components/types';
import { TrackJS } from 'trackjs';
import { Link } from '@/mdx-components/Link';
import { DOTCOM_BASE_URL } from '@/constants';
import { getBasePath } from '@/utils/base-path';
import { ErrorPage } from '@/templates/error-template';
import { darkModeScript } from '@/app/lib/dark-mode-script';
import { DarkModeContextProvider } from '@/context/dark-mode-context';
import { LeafyGreenProviderWrapper } from '@/app/emotion';
import { ViaProviderWrapper } from '@/app/via-provider';

/**
 * Build the absolute URL shown on the 404 body.
 * usePathname() is usually basePath-relative (prepend this deploy's basePath).
 * When the pathname already includes a `/docs` path — e.g. a cross-docset URL
 * or a CDN rewrite — skip basePath so we don't double-prefix.
 */
function buildFromUrl(pathname: string): string {
  const isAbsoluteDocsPath = pathname === '/docs' || pathname.includes('/docs/');

  return isAbsoluteDocsPath ? `${DOTCOM_BASE_URL}${pathname}` : `${DOTCOM_BASE_URL}${getBasePath()}${pathname}`;
}

const NotFoundBody = () => {
  const pathname = usePathname();
  const fromURL = pathname ? buildFromUrl(pathname) : '';

  useEffect(() => {
    if (fromURL) {
      TrackJS.track(`page_not_found - fromURL: ${fromURL}`);
    }
  }, [fromURL]);

  return pathname ? (
    <Text textStyle={TextStyle.body} size={Size.Large}>
      The page with the URL &ldquo;<Link to={fromURL}>{fromURL}</Link>
      &rdquo; does not exist. It might have been moved or deleted.
    </Text>
  ) : (
    <Text textStyle={TextStyle.body} size={Size.Large}>
      The page might have been moved or deleted.
    </Text>
  );
};

/**
 * A root not-found page renders under app/layout.tsx alone — [[...path]]/layout.tsx
 * is skipped — so mount its providers here. Without LeafyGreenProviderWrapper, the
 * ActionBar's styles never render: emotion's compat mode only emits CSS into the
 * server-rendered HTML and does not inject on the client.
 */
export default function NotFound() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: darkModeScript }} />
      <DarkModeContextProvider>
        <LeafyGreenProviderWrapper>
          <ViaProviderWrapper>
            <ErrorPage
              imageSrc={`${getBasePath()}/404.png`}
              imageAlt="Page not found"
              title="Sorry, we can't find that page."
            >
              <NotFoundBody />
            </ErrorPage>
          </ViaProviderWrapper>
        </LeafyGreenProviderWrapper>
      </DarkModeContextProvider>
    </>
  );
}
