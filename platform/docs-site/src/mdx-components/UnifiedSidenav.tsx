'use client';

import { useState, useEffect, useRef, useContext, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { isActiveTocNode, removeAnchor } from './UnifiedSidenav/UnifiedTocNavItems';
import { usePageContext } from '@/context/page-context';
import { isCurrentPage } from '@/utils/is-current-page';
import useStickyTopValues from '@/hooks/use-sticky-top-values';
import { isBrowser } from '@/utils/is-browser';
import { SidenavContext } from '@/context/sidenav-context';
import { useProcessedUnifiedToc } from '@/hooks/use-processed-unified-toc';
import { loadHashIntoView } from '@/utils/load-hash-into-view';
import { SIDE_NAV_CONTAINER_ID } from '@/constants';
import { useViewport } from '@/hooks/use-viewport';
import { useVersionContext } from '@/context/version-context';
import { getFullSlug } from '@/utils/get-full-slug';
import { isOfflineBuild } from '@/utils/isOfflineBuild';

import { DoublePannedNav } from './UnifiedSidenav/DoublePannedNav';
import { AccordionNavPanel } from './UnifiedSidenav/AccordionNav';
import type { TocItem } from './UnifiedSidenav/types';
import { useSiteBanner } from '@/mdx-components/SiteBannerProvider';
import { OfflineDownloadProvider } from '@/mdx-components/offline-download-modal/download-context';
import styles from './unified-sidenav.module.scss';

const findPageParent = (tree: TocItem[], targetUrl: string): [boolean, TocItem | null] => {
  const path: TocItem[] = [];

  // If the page is a part of a driver toc, return driver as parent, if not return the L1
  const dfs = (item: TocItem): [boolean, TocItem] | null => {
    path.push(item);

    // isCurrentPage handles the offline case, where the export has no basePath: the
    // slug lacks the /docs prefix that TOC urls carry, and TOC urls end in /index.html.
    if (isCurrentPage(removeAnchor(item.newUrl ?? ''), removeAnchor(targetUrl))) {
      for (let i = path.length - 1; i >= 0; i--) {
        if (path[i].showSubNav === true) {
          return [true, path[i]];
        }
      }
      // Page is not a part of a driver, returns the associated L1
      return [false, path[0]];
    }

    if (item.items) {
      for (const child of item.items) {
        const result = dfs(child);
        if (result) return result;
      }
    }

    path.pop();
    return null;
  };

  for (const item of tree) {
    const result = dfs(item);
    if (result) return result;
  }

  // No L1 selected (docs home page)
  return [false, null];
};

const getActiveNavSection = (pathname: string | null): 'docs' | 'voyageai' | 'agentengine' => {
  if (pathname?.startsWith('docs/voyageai') || pathname?.startsWith('/docs/voyageai')) return 'voyageai';
  if (pathname?.startsWith('docs/agentengine') || pathname?.startsWith('/docs/agentengine')) return 'agentengine';
  return 'docs';
};

export const UnifiedSidenav = () => {
  const { hideMobile, setHideMobile } = useContext(SidenavContext);
  const { slug: pageSlug } = usePageContext();
  const { siteBasePrefixWithVersion } = useVersionContext();
  const pathname = usePathname();
  // Strip trailing /index so project base paths match TOC urls
  const rawSlug = isOfflineBuild ? pathname ?? '' : getFullSlug(pageSlug, siteBasePrefixWithVersion);
  const slug = rawSlug.replace(/(^|\/)index\/?$/, '');

  const { hasBanner } = useSiteBanner();
  const topValues = useStickyTopValues({ eol: false, isAbsolute: true, hasBanner });
  const hash = typeof window !== 'undefined' ? window.location.hash : '';

  const fullTree = useProcessedUnifiedToc();
  const activeNavSection = getActiveNavSection(slug);
  const isAccordionOnly = activeNavSection === 'voyageai' || activeNavSection === 'agentengine';
  const tree = useMemo(
    () => fullTree.filter((item) => (item.navSection ?? 'docs') === activeNavSection),
    [fullTree, activeNavSection],
  );

  const [isDriver, currentL2List] = findPageParent(tree, slug);
  const [showDriverBackBtn, setShowDriverBackBtn] = useState<boolean>(isDriver);

  const [currentL1, setCurrentL1] = useState<TocItem | undefined>(() => {
    return tree.find((staticTocItem) => {
      return isActiveTocNode(slug, staticTocItem.newUrl, staticTocItem.items);
    });
  });

  const [currentL2s, setCurrentL2s] = useState<TocItem | null>(currentL2List);

  const prevSlugRef = useRef(slug);

  useEffect(() => {
    const [isDriver, updatedL2s] = findPageParent(tree, slug);
    const updatedL1s = tree.find((staticTocItem) => {
      return isActiveTocNode(slug, staticTocItem.newUrl, staticTocItem.items);
    });

    const slugChanged = prevSlugRef.current !== slug;
    prevSlugRef.current = slug;

    // If nothing matched and the slug itself didn't change, tree just updated ahead
    // of navigation (version transition). Hold the current state to prevent a flash.
    if (updatedL2s === null && !slugChanged) {
      return;
    }

    setShowDriverBackBtn(isDriver);
    setCurrentL1(updatedL1s);
    setCurrentL2s(updatedL2s);
  }, [slug, tree]);

  // close navigation panel on mobile screen, but leaves open if they click on a twisty
  useEffect(() => {
    setHideMobile(true);
  }, [pathname, setHideMobile]);

  useEffect(() => {
    if (!isBrowser) return;
    if (hash) {
      loadHashIntoView(hash);
    }
  }, [hash]);

  // listen for scrolls for mobile and tablet menu
  const viewport = useViewport(false);

  return (
    <OfflineDownloadProvider>
      <div
        className={styles.container}
        style={
          {
            '--scroll-y': `${viewport.scrollY}px`,
            '--top-large': topValues.topLarge,
            '--top-medium': topValues.topMedium,
            '--top-small': topValues.topSmall,
          } as React.CSSProperties
        }
        id={SIDE_NAV_CONTAINER_ID}
      >
        <AccordionNavPanel
          showDriverBackBtn={showDriverBackBtn}
          setShowDriverBackBtn={setShowDriverBackBtn}
          slug={slug}
          currentL2s={currentL2s}
          setCurrentL1={setCurrentL1}
          setCurrentL2s={setCurrentL2s}
          hideMobile={hideMobile}
          currentL1={currentL1}
          tree={tree}
          isAccordionOnly={isAccordionOnly}
        />
        <DoublePannedNav
          showDriverBackBtn={showDriverBackBtn}
          setShowDriverBackBtn={setShowDriverBackBtn}
          tree={tree}
          slug={slug}
          currentL2s={currentL2s}
          setCurrentL1={setCurrentL1}
          setCurrentL2s={setCurrentL2s}
          currentL1={currentL1}
          isAccordionOnly={isAccordionOnly}
        />
      </div>
    </OfflineDownloadProvider>
  );
};
