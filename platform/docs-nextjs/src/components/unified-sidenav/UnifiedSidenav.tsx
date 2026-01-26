'use client';

import { useState, useEffect, useContext } from 'react';
import { usePathname } from 'next/navigation';
import styled from '@emotion/styled';
import { css as LeafyCSS, cx } from '@leafygreen-ui/emotion';
import { isActiveTocNode, removeAnchor } from './UnifiedTocNavItems';
import { usePageContext } from '@/context/page-context';
import { theme } from '@/styles/theme';
import { assertLeadingSlash } from '@/utils/assert-leading-slash';
import { removeTrailingSlash } from '@/utils/remove-trailing-slash';
import useStickyTopValues from '@/hooks/use-sticky-top-values';
import { isBrowser } from '@/utils/is-browser';
import { SidenavContext } from '@/context/sidenav-context';
import { useProcessedUnifiedToc } from '@/hooks/use-processed-unified-toc';
import { loadHashIntoView } from '@/utils/load-hash-into-view';
import { SIDE_NAV_CONTAINER_ID } from '@/constants';
import { useViewport } from '@/hooks/use-viewport';
import { useVersionContext } from '@/context/version-context';
import { getFullSlug } from '@/utils/get-full-slug';

import { DoublePannedNav } from './DoublePannedNav';
import { AccordionNavPanel } from './AccordionNav';
import type { TocItem } from './types';
import { useSiteBanner } from '../banner/site-banner/banner-context';

export const ArtificialPadding = styled('div')`
  height: 15px;
`;

export const downloadButtonStlying = LeafyCSS`
  bottom: 20px;
  position: absolute;
  width: 100%;
  text-align: right;
  padding-right: 30px;
`;

export const NavTopContainer = (isTabletOrMobile: boolean) => LeafyCSS`
  ${!isTabletOrMobile && 'background-color: var(--background-color-primary)'};
  position: absolute;
  top: -0px;
  height: 60px;
  width: 100%;
  border-bottom: 1px solid var(--sidenav-border-bottom-color);
  z-index: 1;
`;

const getTopAndHeight = (topValue: string) => {
  return LeafyCSS`
    top: max(min(calc(${topValue} - var(--scroll-y))), ${theme.header.actionBarMobileHeight});
    height: calc(100vh - max(min(calc(${topValue} - var(--scroll-y))), ${theme.header.actionBarMobileHeight}));
  `;
};

interface SidenavContainerProps {
  topLarge: string;
  topMedium: string;
  topSmall: string;
}

const SidenavContainer = ({ topLarge, topMedium, topSmall }: SidenavContainerProps) => LeafyCSS`
  grid-area: sidenav;
  position: sticky;
  z-index: ${theme.zIndexes.sidenav};
  top: 0px;
  height: calc(
    100vh + ${theme.header.actionBarMobileHeight} - ${topLarge} +
      min(calc(${topLarge} - ${theme.header.actionBarMobileHeight}), var(--scroll-y))
  );

  @media ${theme.screenSize.upToLarge} {
    ${getTopAndHeight(topMedium)};
  }

  @media ${theme.screenSize.upToSmall} {
    ${getTopAndHeight(topSmall)};
  }

  nav {
    background-color: var(--sidenav-bg-color);
  }

   a[class*='lg-ui-side-nav-item'] {
      color: var(--sidenav-item-color);
      :not([aria-current='page']):hover {
        background-color: var(--sidenav-hover-bg-color);
      }
    }
`;

const findPageParent = (tree: TocItem[], targetUrl: string): [boolean, TocItem | null] => {
  const path: TocItem[] = [];

  // If the page is a part of a driver toc, return driver as parent, if not return the L1
  const dfs = (item: TocItem): [boolean, TocItem] | null => {
    path.push(item);

    if (
      assertLeadingSlash(removeTrailingSlash(removeAnchor(item.newUrl ?? ''))) ===
      assertLeadingSlash(removeTrailingSlash(targetUrl))
    ) {
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

export const UnifiedSidenav = () => {
  const { hideMobile, setHideMobile } = useContext(SidenavContext);
  const { slug: pageSlug } = usePageContext();
  const { siteBasePrefixWithVersion } = useVersionContext();
  const slug = getFullSlug(pageSlug, siteBasePrefixWithVersion);

  const { hasBanner } = useSiteBanner();
  const topValues = useStickyTopValues({ eol: false, isAbsolute: true, hasBanner });
  const pathname = usePathname();
  const hash = typeof window !== 'undefined' ? window.location.hash : '';

  const tree = useProcessedUnifiedToc();

  const [isDriver, currentL2List] = findPageParent(tree, slug);
  const [showDriverBackBtn, setShowDriverBackBtn] = useState<boolean>(isDriver);

  const [currentL1, setCurrentL1] = useState<TocItem | undefined>(() => {
    return tree.find((staticTocItem) => {
      return isActiveTocNode(slug, staticTocItem.newUrl, staticTocItem.items);
    });
  });

  const [currentL2s, setCurrentL2s] = useState<TocItem | null>(currentL2List);

  useEffect(() => {
    const [isDriver, updatedL2s] = findPageParent(tree, slug);
    const updatedL1s = tree.find((staticTocItem) => {
      return isActiveTocNode(slug, staticTocItem.newUrl, staticTocItem.items);
    });

    setShowDriverBackBtn(isDriver);
    setCurrentL1(updatedL1s);
    setCurrentL2s(updatedL2s);
  }, [slug]); // eslint-disable-line react-hooks/exhaustive-deps

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

  // Hide the Sidenav with css while keeping state as open/not collapsed.
  // This prevents LG's SideNav component from being seen in its collapsed state on mobile
  return (
    <div
      className={cx(SidenavContainer({ ...topValues }))}
      style={{ '--scroll-y': `${viewport.scrollY}px` } as React.CSSProperties}
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
      />
    </div>
  );
};
