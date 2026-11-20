'use client';

import { useEffect, useRef } from 'react';
import { reportAnalytics } from '@/utils/report-analytics';
import { currentScrollPosition } from '@/utils/current-scroll-position';
import { isCurrentPage } from '@/utils/is-current-page';
import type { TocItem } from './types';

/**
 * Rendered as a hidden child inside the active SideNavItem. On mount, scrolls
 * the parent element (the rendered <a>) into the sidenav panel's visible area
 * while preserving the page-level window scroll position.
 */
export const ActiveScrollAnchor = () => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const navItem = ref.current?.parentElement;
    if (!navItem) return;
    const savedScrollY = window.scrollY;
    navItem.scrollIntoView({ block: 'center', behavior: 'instant' });
    window.scrollTo(0, savedScrollY);
  }, []);

  return <span ref={ref} aria-hidden="true" style={{ display: 'none' }} />;
};

export const sidenavAnalytics = (label: string, element?: HTMLElement | null) => {
  const translatedLabel = element?.textContent?.trim() || label;

  reportAnalytics('Click', {
    position: 'sidenav item',
    label: label,
    label_text_displayed: translatedLabel,
    scroll_position: currentScrollPosition(),
    tagbook: 'true',
  });
};

// Anchors are sometimes included in toc.ts files, but we dont want to compare the current slug to the url with an anchor
export const removeAnchor = (str: string): string => {
  return str.replace(/#.*/, '');
};

// This checks what sidenav should load based on the active Tab
export const isActiveTocNode = (currentUrl: string, slug?: string, children?: TocItem[]): boolean => {
  if (currentUrl === undefined) return false;
  if (slug && isCurrentPage(currentUrl, removeAnchor(slug))) return true;
  if (children) {
    return children.reduce((a, b) => a || isActiveTocNode(currentUrl, b.newUrl, b.items), false);
  }
  return false;
};
