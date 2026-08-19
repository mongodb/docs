'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Body } from '@leafygreen-ui/typography';
import { TrackJS } from 'trackjs';
import { Link } from '@/mdx-components/Link';
import { DOTCOM_BASE_URL } from '@/constants';
import { getBasePath } from '@/utils/base-path';
import { ErrorPage } from '@/templates/error-template';

/**
 * Build the absolute URL shown on the 404 body.
 * usePathname() is usually basePath-relative (prepend this deploy's basePath).
 * When the pathname already includes a `/docs` path — e.g. a cross-docset URL
 * or a CDN rewrite — skip basePath so we don't double-prefix.
 */
function buildFromUrl(pathname: string): string {
  const isAbsoluteDocsPath = pathname === '/docs' || pathname.includes('/docs/');

  return isAbsoluteDocsPath
    ? `${DOTCOM_BASE_URL}${pathname}`
    : `${DOTCOM_BASE_URL}${getBasePath()}${pathname}`;
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
    <Body>
      The page with the URL &ldquo;<Link to={fromURL}>{fromURL}</Link>
      &rdquo; does not exist. It might have been moved or deleted.
    </Body>
  ) : (
    <Body>The page might have been moved or deleted.</Body>
  );
};

export default function NotFound() {
  return (
    <ErrorPage imageSrc={`${getBasePath()}/404.png`} imageAlt="Page not found" title="Sorry, we can't find that page.">
      <NotFoundBody />
    </ErrorPage>
  );
}
