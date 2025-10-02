'use client';

// import { useContext } from 'react';
import { glyphs } from '@leafygreen-ui/icon';
import { css, cx } from '@leafygreen-ui/emotion';
import { theme } from '@/styles/theme';
import { getPageTitle } from '@/utils/get-page-title';
import { reportAnalytics } from '@/utils/report-analytics';
// TODO: add back imports when ready for unified TOC
// import { useUnifiedToc } from '@/hooks/use-unified-toc';
// import { useSiteMetadata } from '@/hooks/use-site-metadata';
// import { removeTrailingSlash } from '@/utils/remove-trailing-slash';
// import { VersionContext } from '@/context/version-context';
// import type { ActiveVersions, AvailableVersions } from '@/context/version-context';
// import { assertTrailingSlash } from '@/utils/assert-trailing-slash';
import type { SlugToBreadcrumbLabel, SlugToTitle } from '@/types/data';
import type { BranchData } from '@/types/data';
// TODO: add back imports when ready for multi-page tutorials
// import { useActiveMpTutorial } from '../MultiPageTutorials';
// import { ActiveTutorial } from '../MultiPageTutorials/hooks/use-active-mp-tutorial';
import type { TocItem } from '../unified-sidenav/types';
import NextPrevLink from './NextPrevLink';

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

const getActiveTutorialPage = (
  // TODO: change this back to ActiveTutorial when implementing multi-page tutorials
  // activeTutorial: ActiveTutorial,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  activeTutorial: any,
  key: 'next' | 'prev',
  linkTitle: string,
): {
  targetSlug: string | null;
  pageTitle: string | null;
  contentSite: string | null;
  linkTitle: string;
} => {
  return {
    targetSlug: activeTutorial[key]?.targetSlug ?? null,
    pageTitle: activeTutorial[key]?.pageTitle ?? null,
    contentSite: null,
    linkTitle,
  };
};

const getTocPage = (
  targetSlug: string | null,
  slugTitleMapping: SlugToTitle | SlugToBreadcrumbLabel,
  linkTitle: string,
): {
  targetSlug: string | null;
  pageTitle: string | null;
  contentSite: string | null;
  linkTitle: string;
} => {
  return {
    targetSlug,
    pageTitle: targetSlug ? String(getPageTitle(targetSlug, slugTitleMapping) ?? '') : '',
    linkTitle,
    contentSite: null,
  };
};

const getPrev = (
  // TODO: change this back to ActiveTutorial when implementing multi-page tutorials
  // activeTutorial: ActiveTutorial | undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  activeTutorial: any,
  toctreeOrder: string[],
  slugTitleMapping: SlugToTitle | SlugToBreadcrumbLabel,
  slugIndex: number,
) => {
  const key = 'prev';
  if (activeTutorial?.[key]) {
    return getActiveTutorialPage(activeTutorial, key, 'Previous Step');
  }
  const prevSlug = slugIndex > 0 ? toctreeOrder[slugIndex - 1] : null;
  return getTocPage(prevSlug, slugTitleMapping, 'Previous Section');
};

const getNext = (
  // TODO: change this back to ActiveTutorial when implementing multi-page tutorials
  // activeTutorial: ActiveTutorial | undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  activeTutorial: any,
  toctreeOrder: string[],
  slugTitleMapping: SlugToTitle | SlugToBreadcrumbLabel,
  slugIndex: number,
) => {
  const key = 'next';
  if (activeTutorial?.[key]) {
    return getActiveTutorialPage(activeTutorial, key, 'Next Step');
  }
  const nextSlug = slugIndex < toctreeOrder.length - 1 ? toctreeOrder[slugIndex + 1] : null;
  return getTocPage(nextSlug, slugTitleMapping, 'Next Section');
};

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
    // TODO: add back when ready for unified TOC
    // if (item.url && removeTrailingSlash(item.url) === removeTrailingSlash(currentUrl)) return true;
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
// TODO: add back when ready
// function getTargetSlug(
//   fullUrl: string,
//   contentSite: string | undefined,
//   activeVersions: ActiveVersions,
//   availableVersions: AvailableVersions
// ): string {
//   if (!fullUrl.includes(':version') || !contentSite) {
//     return fullUrl;
//   } else {
//     const version = (availableVersions[contentSite] || []).find(
//       (version) =>
//         version.gitBranchName === activeVersions[contentSite] ||
//         version.urlSlug === activeVersions[contentSite] ||
//         version?.urlAliases?.includes(activeVersions[contentSite])
//     );

//     // If no version found in local storage use 'current'
//     const currentVersion = version?.urlSlug ?? 'current';
//     return fullUrl.replace(/:version/g, currentVersion);
//   }
// }

// TODO: add back when ready
// function getPrevUnified(
//   toc: TocItem[],
//   currentUrl: string,
//   activeVersions: ActiveVersions,
//   availableVersions: AvailableVersions
// ): {
//   targetSlug: string | null;
//   pageTitle: string | null;
//   contentSite: string | undefined | null;
//   linkTitle: string;
// } | null {
//   const group = findGroupForUrl(toc, currentUrl);
//   if (!group) return null;

//   const flat = flattenGroupItems(group.items || []);
//   const index = flat.findIndex((item) => removeTrailingSlash(item.url) === removeTrailingSlash(currentUrl));

//   const node = index > 0 ? flat[index - 1] : null;

//   return {
//     targetSlug: node ? getTargetSlug(node.url, node.contentSite, activeVersions, availableVersions) : null,
//     pageTitle: node ? node.label : null,
//     contentSite: node ? node.contentSite : null,
//     linkTitle: 'Previous Section',
//   };
// }

// TODO: add back when ready
// function getNextUnified(
//   toc: TocItem[],
//   currentUrl: string,
//   activeVersions: ActiveVersions,
//   availableVersions: AvailableVersions
// ): {
//   targetSlug: string | null;
//   pageTitle: string | null;
//   contentSite: string | undefined | null;
//   linkTitle: string;
// } | null {
//   const group = findGroupForUrl(toc, currentUrl);
//   if (!group) return null;

//   const flat = flattenGroupItems(group.items || []);
//   const index = flat.findIndex((item) => removeTrailingSlash(item.url) === removeTrailingSlash(currentUrl));

//   const node = index >= 0 && index < flat.length - 1 ? flat[index + 1] : null;

//   return {
//     targetSlug: node ? getTargetSlug(node.url, node.contentSite, activeVersions, availableVersions) : null,
//     pageTitle: node ? node.label : null,
//     contentSite: node ? node.contentSite : null,
//     linkTitle: 'Next Section',
//   };
// }

export type InternalPageNavProps = {
  slug: string;
  slugTitleMapping: SlugToTitle | SlugToBreadcrumbLabel;
  toctreeOrder: string[];
};

const InternalPageNav = ({ slug, slugTitleMapping, toctreeOrder }: InternalPageNavProps) => {
  // TODO: add back when ready
  // const { isUnifiedToc } = getFeatureFlags();
  // const tocTree = useUnifiedToc();
  // const { pathPrefix, project } = useSiteMetadata();
  // const { availableVersions, activeVersions } = useContext(VersionContext);
  // const noVersionPathPrefix = replaceVersionInPath(pathPrefix, availableVersions[project]);
  // const fullSlug = slug === '/' ? noVersionPathPrefix : assertTrailingSlash(noVersionPathPrefix) + slug;
  // const activeTutorial = useActiveMpTutorial();
  const slugIndex = toctreeOrder.indexOf(slug);

  // TODO: add back when ready
  // const prevPage = isUnifiedToc
  //   ? getPrevUnified(tocTree, fullSlug, activeVersions, availableVersions)
  //   : getPrev(activeTutorial, toctreeOrder, slugTitleMapping, slugIndex);
  // const nextPage = isUnifiedToc
  //   ? getNextUnified(tocTree, fullSlug, activeVersions, availableVersions)
  //   : getNext(activeTutorial, toctreeOrder, slugTitleMapping, slugIndex);
  const prevPage = getPrev(null, toctreeOrder, slugTitleMapping, slugIndex);
  const nextPage = getNext(null, toctreeOrder, slugTitleMapping, slugIndex);

  const handleClick = (direction: string, targetSlug: string) => {
    reportAnalytics('InternalPageNavClicked', {
      direction,
      targetSlug,
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
          contentSite={prevPage?.contentSite}
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
          contentSite={nextPage?.contentSite}
          onClick={handleClick}
        />
      )}
    </div>
  );
};

export default InternalPageNav;
