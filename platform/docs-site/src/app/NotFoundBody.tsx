'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Text, TextStyle } from '@via-ds/components/typography';
import { TrackJS } from 'trackjs';
import { Link } from '@/mdx-components/Link';
import { DOTCOM_BASE_URL } from '@/constants';
import { getBasePath } from '@/utils/base-path';
import { getRelatedLinks, type RelatedLink } from '@/services/eai/related-links';
import { ThinkingBox } from './ThinkingBox';
import { RelatedLinksList } from './RelatedLinksList';
import styles from './not-found-body.module.scss';

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

export const NotFoundBody = () => {
  const pathname = usePathname();
  const fromURL = pathname ? buildFromUrl(pathname) : '';
  const [status, setStatus] = useState<'loading' | 'done'>('loading');
  const [results, setResults] = useState<RelatedLink[]>([]);

  useEffect(() => {
    if (fromURL) {
      TrackJS.track(`page_not_found - fromURL: ${fromURL}`);
    }
  }, [fromURL]);

  useEffect(() => {
    if (!fromURL) {
      setStatus('done');
      return;
    }

    let cancelled = false;

    getRelatedLinks(fromURL).then((links) => {
      if (!cancelled) {
        setResults(links);
        setStatus('done');
      }
    });

    return () => {
      cancelled = true;
    };
  }, [fromURL]);

  return (
    <>
      {pathname ? (
        <Text textStyle={TextStyle.body} className={styles.notFoundText}>
          The page with the URL &ldquo;
          <Link to={fromURL} isStandalone={false} className={styles.urlLink}>
            {fromURL}
          </Link>
          &rdquo; does not exist. It might have been moved or deleted.
        </Text>
      ) : (
        <Text textStyle={TextStyle.body} className={styles.notFoundText}>
          The page might have been moved or deleted.
        </Text>
      )}
      {status === 'loading' && <ThinkingBox />}
      {status === 'done' && results.length > 0 && <RelatedLinksList results={results} />}
    </>
  );
};
