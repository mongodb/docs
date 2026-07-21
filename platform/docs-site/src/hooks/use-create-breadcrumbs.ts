'use client';

import { useMemo } from 'react';
import { createParentFromToc, findParentBreadCrumb } from '@/mdx-components/Breadcrumbs/unified-toc-breadcrumbs';
import type { TocItem, BreadCrumb } from '@/mdx-components/UnifiedSidenav/types';
import { getFullSlug } from '@/utils/get-full-slug';

const homeCrumb = {
  title: 'Docs Home',
  path: '/docs',
};

export function usePageBreadcrumbs(tocTree: TocItem[], slug: string, siteBasePrefixWithVersion: string): BreadCrumb[] {
  const breadcrumbs = useMemo(() => {
    if (!slug || !tocTree || tocTree.length === 0) {
      return [homeCrumb];
    }

    const tree = createParentFromToc(tocTree, []);
    if (!tree) return [homeCrumb];

    const fullSlug = getFullSlug(slug, siteBasePrefixWithVersion);
    const parents = findParentBreadCrumb(fullSlug, tree);

    return [homeCrumb, ...(parents ?? [])];
  }, [slug, tocTree, siteBasePrefixWithVersion]);

  return breadcrumbs;
}
