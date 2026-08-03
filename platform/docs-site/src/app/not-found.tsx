'use client';

import { usePathname } from 'next/navigation';
import { Body } from '@leafygreen-ui/typography';
import { Link } from '@/mdx-components/Link';

import { DOTCOM_BASE_URL } from '@/constants';
import { getBasePath } from '@/utils/base-path';
import { ErrorPage } from '@/templates/error-template';
import { TrackJS } from 'trackjs';
import { useEffect } from 'react';

const NotFoundBody = () => {
  const pathname = usePathname();
  // usePathname() is basePath-relative; prepend basePath to show the full URL.
  const fromURL = `${DOTCOM_BASE_URL}${getBasePath()}${pathname}`;

  useEffect(() => {
    TrackJS.track(`page_not_found - fromURL: ${fromURL}`);
  }, []);

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
