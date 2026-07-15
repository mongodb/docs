'use client';

import { usePathname } from 'next/navigation';
import { Body } from '@leafygreen-ui/typography';
import { Link } from '@/mdx-components/Link';

import { DOTCOM_BASE_URL } from '@/constants';
import { ErrorPage } from '@/templates/error-template';
import { TrackJS } from 'trackjs';
import { useEffect } from 'react';

const NotFoundBody = () => {
  const pathname = usePathname();
  const fromURL = `${DOTCOM_BASE_URL}${pathname}`;

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
    <ErrorPage imageSrc="/404.png" imageAlt="Page not found" title="Sorry, we can't find that page.">
      <NotFoundBody />
    </ErrorPage>
  );
}
