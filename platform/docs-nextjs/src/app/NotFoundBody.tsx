'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Body } from '@leafygreen-ui/typography';
import { TrackJS } from 'trackjs';
import { Link } from '@/mdx-components/Link';
import { DOTCOM_BASE_URL } from '@/constants';
import { getRelatedLinks, type RelatedLink } from '@/services/eai/related-links';
import { ThinkingBox } from './ThinkingBox';
import { RelatedLinksList } from './RelatedLinksList';

export const NotFoundBody = () => {
  const pathname = usePathname();
  const fromURL = pathname ? `${DOTCOM_BASE_URL}${pathname}` : '';
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
        <Body>
          The page with the URL &ldquo;
          <Link to={fromURL}>{fromURL}</Link>
          &rdquo; does not exist. It might have been moved or deleted.
        </Body>
      ) : (
        <Body>The page might have been moved or deleted.</Body>
      )}
      {status === 'loading' && <ThinkingBox />}
      {status === 'done' && results.length > 0 && <RelatedLinksList results={results} />}
    </>
  );
};
