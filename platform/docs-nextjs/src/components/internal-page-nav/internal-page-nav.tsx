'use client';

import { useMemo } from 'react';
import { glyphs } from '@leafygreen-ui/icon';
import { css, cx } from '@leafygreen-ui/emotion';
import { theme } from '@/styles/theme';
import { reportAnalytics } from '@/utils/report-analytics';
import type { ActiveVersions, AvailableVersions } from '@/context/version-context';
import { assertTrailingSlash } from '@/utils/assert-trailing-slash';
import type { BranchData } from '@/types/data';
import { useUnifiedToc } from '@/context/unified-toc-context';
import { useSnootyMetadata } from '@/utils/use-snooty-metadata';
import { useVersionContext } from '@/context/version-context';
import { removeTrailingSlash } from '@/utils/remove-trailing-slash';
import { currentScrollPosition } from '@/utils/current-scroll-position';

import type { TocItem } from '../unified-sidenav/types';
import NextPrevLink from './next-prev-link';
import { usePageContext } from '@/context/page-context';
import { assertLeadingSlash } from '@/utils/assert-leading-slash';

interface FlatItem {
  label: string;
  url?: string;
  contentSite?: string;
  group?: boolean;
  versions?: {
    includes?: string[];
    excludes?: string[];
  };
}

const containerStyling = css`
  padding-bottom: 2.5em;
  width: 100%;
  display: flex;
  justify-content: space-between;
  column-gap: ${theme.size.default};
  margin-top: 88px;

  @media ${theme.screenSize.upToSmall} {
    flex-direction: column-reverse;
    row-gap: 64px;
    margin-top: 66px;
  }

  @media print {
    display: none;
  }

  a {
    text-decoration: none;
  }
`;

const prevStyle = css`
  margin-right: auto;
`;

const nextStyle = css`
  margin-left: auto;
`;

// Replacing the version in the pathPrefix with `:version` to match toc.json urls
function replaceVersionInPath(pathPrefix: string, versions?: BranchData[]): string {
  if (!versions) return pathPrefix;

  const segments = pathPrefix.split('/');
  const lastSegment = segments[segments.length - 1] || segments[segments.length - 2];
  const matchesVersion = versions.find(
    (version) => version.urlSlug === lastSegment || (version.urlAliases && version.urlAliases.includes(lastSegment)),
  );

  if (matchesVersion) {
    segments[segments.length - 1] = ':version/';
    if (segments[segments.length - 1] === '') {
      segments[segments.length - 2] = ':version/'; // If the last was empty due to trailing slash
      segments.pop();
    }
    return segments.join('/');
  }

  return pathPrefix;
}

function groupContainsUrl(items: TocItem[], currentUrl: string): boolean {
  for (const item of items) {
    if (item.url && removeTrailingSlash(item.url) === removeTrailingSlash(currentUrl)) return true;
    if (item.items && groupContainsUrl(item.items, currentUrl)) return true;
  }
  return false;
}

function findGroupForUrl(toc: TocItem[], currentUrl: string): TocItem | null {
  for (const L1Item of toc) {
    if (!L1Item.items) continue;
    for (const item of L1Item.items) {
      if (item.group) {
        if (groupContainsUrl(item.items || [], currentUrl)) {
          return item;
        }
      }
    }
  }
  return null;
}

function flattenGroupItems(
  items: TocItem[],
  flat: FlatItem[] = [],
  parentVersions?: { includes?: string[]; excludes?: string[] },
): FlatItem[] {
  for (const item of items) {
    if (item.isExternal) {
      // Skips external links
      continue;
    }

    // Inherit parent's version constraints if child doesn't have its own
    const effectiveVersions = item.versions || parentVersions;

    flat.push({
      label: item.label,
      url: item.url,
      contentSite: item.contentSite,
      group: item.group,
      versions: effectiveVersions,
    });

    if (item.items) {
      flattenGroupItems(item.items, flat, effectiveVersions);
    }
  }
  return flat;
}

// Allows InternalNavLinks to be between different contentSites if needed
function getTargetSlug(
  fullUrl: string,
  contentSite: string | undefined,
  activeVersions: ActiveVersions,
  availableVersions: AvailableVersions,
): string {
  if (!fullUrl.includes(':version') || !contentSite) {
    return fullUrl;
  } else {
    const version = (availableVersions[contentSite] || []).find(
      (version) =>
        version.gitBranchName === activeVersions[contentSite] ||
        version.urlSlug === activeVersions[contentSite] ||
        version?.urlAliases?.includes(activeVersions[contentSite]),
    );

    // If no version found in local storage use 'current'
    const currentVersion = version?.urlSlug ?? 'current';
    return fullUrl.replace(/:version/g, currentVersion);
  }
}

// Function to check if tocItem is displayed in the current version
function isTocItemValidForVersion(
  tocItem: FlatItem,
  activeVersions: ActiveVersions,
  availableVersions: AvailableVersions,
): boolean {
  if (!tocItem.url) return false; // If no URL, not valid
  if (!tocItem.versions) return true; // If no versions constraint, always valid
  if (!tocItem.contentSite) return false; // This is case shouldn't exist, but just in case
  if (tocItem.url.startsWith('http')) return false; // If external link, not valid for internal page navigation

  const contentSite = tocItem.contentSite;
  const activeVersion = (availableVersions[contentSite] || []).find(
    (version) =>
      version.gitBranchName === activeVersions[contentSite] ||
      version.urlSlug === activeVersions[contentSite] ||
      version?.urlAliases?.includes(activeVersions[contentSite]),
  );

  // Check excludes first - if active version is excluded, tocItem is invalid
  if (tocItem.versions.excludes && activeVersion) {
    if (tocItem.versions.excludes.includes(activeVersion.urlSlug)) {
      return false;
    }
  }

  // Check includes - if includes array exists, active version must be in it
  if (tocItem.versions.includes && activeVersion) {
    return tocItem.versions.includes.includes(activeVersion.urlSlug);
  }

  // If only excludes exist and we passed that check, or no constraints
  return true;
}

function getPrevUnified(
  flattenedData: { flat: FlatItem[]; index: number } | null,
  activeVersions: ActiveVersions,
  availableVersions: AvailableVersions,
): {
  targetSlug: string | null;
  pageTitle: string | null;
  contentSite: string | undefined | null;
  linkTitle: string;
} | null {
  if (!flattenedData) return null;
  const { flat, index } = flattenedData;

  let tocItem: FlatItem | null = null;
  for (let i = index - 1; i >= 0; i--) {
    const candidate = flat[i];

    if (candidate.group) {
      break;
    }

    if (isTocItemValidForVersion(candidate, activeVersions, availableVersions)) {
      tocItem = candidate;
      break;
    }
  }

  if (!tocItem || !tocItem.url) return null;

  return {
    targetSlug: getTargetSlug(tocItem.url, tocItem.contentSite, activeVersions, availableVersions),
    pageTitle: tocItem.label,
    contentSite: tocItem.contentSite,
    linkTitle: 'Previous Section',
  };
}

function getNextUnified(
  flattenedData: { flat: FlatItem[]; index: number } | null,
  activeVersions: ActiveVersions,
  availableVersions: AvailableVersions,
): {
  targetSlug: string | null;
  pageTitle: string | null;
  contentSite: string | undefined | null;
  linkTitle: string;
} | null {
  if (!flattenedData) return null;
  const { flat, index } = flattenedData;

  let tocItem: FlatItem | null = null;
  for (let i = index + 1; i < flat.length; i++) {
    const candidate = flat[i];

    if (candidate.group) {
      break;
    }

    if (isTocItemValidForVersion(candidate, activeVersions, availableVersions)) {
      tocItem = candidate;
      break;
    }
  }
  if (!tocItem || !tocItem.url) return null;

  return {
    targetSlug: getTargetSlug(tocItem.url, tocItem.contentSite, activeVersions, availableVersions),
    pageTitle: tocItem.label,
    contentSite: tocItem.contentSite,
    linkTitle: 'Next Section',
  };
}

/**
 * Flattens the TOC group containing the current URL and finds the index of the current page.
 *
 * Ensures that the returned URL is displayed in the current version.
 *
 * @param {TocItem[]} toc - The full table of contents tree
 * @param {string} currentUrl - The URL of the current page
 * @param {ActiveVersions} activeVersions - Map of active versions per content site
 * @param {AvailableVersions} availableVersions - Map of available version data per content site
 *
 * @returns {{ flat: FlatItem[]; index: number } | null} Object containing:
 *   - flat: Flattened array of TOC items in the same group as current page
 *   - index: Position of current page in the flat array (-1 if not found)
 *   Returns null if the current URL is not found in any group
 */
const getFlattenedTocData = (
  toc: TocItem[],
  currentUrl: string,
  activeVersions: ActiveVersions,
  availableVersions: AvailableVersions,
): { flat: FlatItem[]; index: number } | null => {
  const group = findGroupForUrl(toc, currentUrl);
  if (!group) return null;

  const flat = flattenGroupItems(group.items || []);

  // Find the index that matches URL and is valid for current version
  let index = -1;
  for (let i = 0; i < flat.length; i++) {
    const item = flat[i];
    if (item.url && removeTrailingSlash(item.url) === removeTrailingSlash(currentUrl)) {
      // If no versions constraint, this is the correct one
      if (!item.versions) {
        index = i;
        break;
      }
      // If has versions constraint, check if it's valid for current version
      if (isTocItemValidForVersion(item, activeVersions, availableVersions)) {
        index = i;
        break;
      }
    }
  }

  return { flat, index };
};

const InternalPageNav = () => {
  const { tocTree } = useUnifiedToc();
  const { project } = useSnootyMetadata();
  const { availableVersions, activeVersions, siteBasePrefixWithVersion } = useVersionContext();
  const { slug } = usePageContext();
  const noVersionPathPrefix = assertLeadingSlash(
    replaceVersionInPath(siteBasePrefixWithVersion, availableVersions[project]),
  );
  const fullSlug = slug === '/' ? noVersionPathPrefix : assertTrailingSlash(noVersionPathPrefix) + slug;

  const flattenedData = useMemo(() => {
    return getFlattenedTocData(tocTree, fullSlug, activeVersions, availableVersions);
  }, [tocTree, fullSlug, activeVersions, availableVersions]);

  const prevPage = getPrevUnified(flattenedData, activeVersions, availableVersions);
  const nextPage = getNextUnified(flattenedData, activeVersions, availableVersions);

  const handleClick = (direction: string) => {
    reportAnalytics('CTA Click', {
      position: 'body',
      position_context: 'internal page nav',
      label: direction,
      scroll_position: currentScrollPosition(),
      tagbook: 'true',
    });
  };

  return (
    <div className={cx(containerStyling)}>
      {prevPage?.targetSlug && (
        <NextPrevLink
          className={prevStyle}
          icon={glyphs.ArrowLeft.displayName ?? 'ArrowLeft'}
          direction="Back"
          targetSlug={prevPage.targetSlug}
          pageTitle={prevPage.pageTitle}
          title={prevPage.linkTitle}
          onClick={handleClick}
        />
      )}
      {nextPage?.targetSlug && (
        <NextPrevLink
          className={nextStyle}
          icon={glyphs.ArrowRight.displayName ?? 'ArrowRight'}
          direction="Next"
          targetSlug={nextPage.targetSlug}
          pageTitle={nextPage.pageTitle}
          title={nextPage.linkTitle}
          onClick={handleClick}
        />
      )}
    </div>
  );
};

export default InternalPageNav;
