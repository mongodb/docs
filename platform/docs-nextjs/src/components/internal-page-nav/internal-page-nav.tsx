'use client';

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
  url: string;
  contentSite?: string;
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

function flattenGroupItems(items: TocItem[], flat: FlatItem[] = []): FlatItem[] {
  for (const item of items) {
    if (item.isExternal) {
      // Skips external links
      continue;
    }

    if (item.url) {
      flat.push({
        label: item.label,
        url: item.url,
        contentSite: item.contentSite,
      });
    }
    if (item.items) {
      flattenGroupItems(item.items, flat);
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

function getPrevUnified(
  toc: TocItem[],
  currentUrl: string,
  activeVersions: ActiveVersions,
  availableVersions: AvailableVersions,
): {
  targetSlug: string | null;
  pageTitle: string | null;
  contentSite: string | undefined | null;
  linkTitle: string;
} | null {
  const group = findGroupForUrl(toc, currentUrl);

  if (!group) return null;

  const flat = flattenGroupItems(group.items || []);
  const index = flat.findIndex((item) => removeTrailingSlash(item.url) === removeTrailingSlash(currentUrl));

  const node = index > 0 ? flat[index - 1] : null;

  return {
    targetSlug: node ? getTargetSlug(node.url, node.contentSite, activeVersions, availableVersions) : null,
    pageTitle: node ? node.label : null,
    contentSite: node ? node.contentSite : null,
    linkTitle: 'Previous Section',
  };
}

function getNextUnified(
  toc: TocItem[],
  currentUrl: string,
  activeVersions: ActiveVersions,
  availableVersions: AvailableVersions,
): {
  targetSlug: string | null;
  pageTitle: string | null;
  linkTitle: string;
} | null {
  const group = findGroupForUrl(toc, currentUrl);
  if (!group) return null;

  const flat = flattenGroupItems(group.items || []);
  const index = flat.findIndex((item) => removeTrailingSlash(item.url) === removeTrailingSlash(currentUrl));

  const node = index >= 0 && index < flat.length - 1 ? flat[index + 1] : null;

  return {
    targetSlug: node ? getTargetSlug(node.url, node.contentSite, activeVersions, availableVersions) : null,
    pageTitle: node ? node.label : null,
    linkTitle: 'Next Section',
  };
}

const InternalPageNav = () => {
  const { tocTree } = useUnifiedToc();
  const { project } = useSnootyMetadata();
  const { availableVersions, activeVersions, siteBasePrefix } = useVersionContext();
  const { slug } = usePageContext();
  const noVersionPathPrefix = assertLeadingSlash(replaceVersionInPath(siteBasePrefix, availableVersions[project]));
  const fullSlug = slug === '/' ? noVersionPathPrefix : assertTrailingSlash(noVersionPathPrefix) + slug;

  const prevPage = getPrevUnified(tocTree, fullSlug, activeVersions, availableVersions);
  const nextPage = getNextUnified(tocTree, fullSlug, activeVersions, availableVersions);

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
