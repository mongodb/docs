'use client';

import { useMemo } from 'react';
import { Breadcrumb, Breadcrumbs } from '@via-ds/components/breadcrumbs';
import { reportAnalytics } from '@/utils/report-analytics';
import { currentScrollPosition } from '@/utils/current-scroll-position';
import { assertTrailingSlash } from '@/utils/assert-trailing-slash';
import { lowercaseDocsHref } from '@/redirects/case-canonical';
import { isOfflineBuild } from '@/utils/isOfflineBuild';

export type BreadcrumbType = {
  title: string;
  path: string;
};

// Offline, the home crumb lacks /index.html, and a directory href won't open over file://.
const canonicalCrumbPath = (path: string): string => {
  const lowercased = lowercaseDocsHref(path);
  if (!isOfflineBuild) return assertTrailingSlash(lowercased);
  return lowercased.endsWith('/index.html') ? lowercased : lowercased.replace(/\/?$/, '/index.html');
};

// Via treats the last crumb as the current page; docs crumbs are all ancestors (UXE-1345).
const CURRENT_PAGE_ID = 'current-page';

const BreadcrumbContainer = ({ breadcrumbs: rawBreadcrumbs }: { breadcrumbs: Array<BreadcrumbType> }) => {
  const breadcrumbs = useMemo(
    () => rawBreadcrumbs.map((crumb) => ({ ...crumb, path: canonicalCrumbPath(crumb.path) })),
    [rawBreadcrumbs],
  );

  const onAction = (key: React.Key) => {
    const crumb = breadcrumbs[Number(key)];
    if (!crumb) return;
    reportAnalytics('Click', {
      position: 'body',
      position_context: 'breadcrumb',
      label: assertTrailingSlash(crumb.path),
      scroll_position: currentScrollPosition(),
      tagbook: 'true',
    });
  };

  return (
    <Breadcrumbs onAction={onAction} overflowAriaLabel="Show all breadcrumbs">
      {breadcrumbs.map((crumb, index) => (
        // TOC ancestors can share a URL.
        <Breadcrumb key={index} id={String(index)} href={crumb.path}>
          {crumb.title}
        </Breadcrumb>
      ))}
      <Breadcrumb id={CURRENT_PAGE_ID} textValue="">
        {null}
      </Breadcrumb>
    </Breadcrumbs>
  );
};

export default BreadcrumbContainer;
