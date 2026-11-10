'use client';

import { useMemo } from 'react';
import { createParentFromToc, findParentBreadCrumb } from '@/mdx-components/Breadcrumbs/unified-toc-breadcrumbs';
import type { TocItem, BreadCrumb } from '@/mdx-components/UnifiedSidenav/types';
import { useVersionContext } from '@/context/version-context';
import { getTranslator } from '@/internationalization/get-translator';
import { getFullSlug } from '@/utils/get-full-slug';
import { isTocItemAllowedForVersion } from '@/utils/toc-version-gate';

const isVoyageAiPath = (path: string): boolean => {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return normalized === '/docs/voyageai' || normalized.startsWith('/docs/voyageai/');
};

const getHomeCrumb = (path: string, t: ReturnType<typeof getTranslator>['t']): BreadCrumb =>
  isVoyageAiPath(path)
    ? { title: t('nav.voyage_ai_models_home'), path: '/docs/voyageai' }
    : { title: t('nav.docs_home'), path: '/docs' };

const normalizePath = (path: string): string => {
  const withLeadingSlash = path.startsWith('/') ? path : `/${path}`;
  return withLeadingSlash.replace(/\/$/, '') || '/';
};

export function usePageBreadcrumbs(tocTree: TocItem[], slug: string, siteBasePrefixWithVersion: string): BreadCrumb[] {
  const { t } = getTranslator();
  const { activeVersions, availableVersions } = useVersionContext();

  const breadcrumbs = useMemo(() => {
    const fullSlug = getFullSlug(slug ?? '', siteBasePrefixWithVersion);
    const homeCrumb = getHomeCrumb(fullSlug, t);

    if (!slug || !tocTree || tocTree.length === 0) {
      return [homeCrumb];
    }

    const tree = createParentFromToc(tocTree, []);
    if (!tree) return [homeCrumb];

    const isAllowed = (item: TocItem) => isTocItemAllowedForVersion(item, activeVersions, availableVersions);
    const parents = findParentBreadCrumb(fullSlug, tree, isAllowed) ?? findParentBreadCrumb(fullSlug, tree) ?? [];
    // Avoid duplicating the home crumb when the TOC root shares the same path
    // (e.g. Voyage AI Models Home and the "AI Models" TOC entry both use /docs/voyageai).
    const homePath = normalizePath(homeCrumb.path);
    const filteredParents = parents.filter((parent) => normalizePath(parent.path) !== homePath);

    return [homeCrumb, ...filteredParents];
  }, [slug, tocTree, siteBasePrefixWithVersion, activeVersions, availableVersions, t]);

  return breadcrumbs;
}
