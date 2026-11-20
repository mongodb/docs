'use client';

import { memo, useMemo, useRef, useState } from 'react';
import type { CSSProperties, KeyboardEvent, MouseEvent, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import {
  PrimarySideNav,
  SideNavFooter,
  SideNavHeader,
  SideNavItem,
  SideNavItemVariant,
  SideNavSection,
  SideNavSectionHeader,
  SideNavToggle,
} from '@via-ds/components/side-nav';
import { ViaTextContext } from '@via-ds/components/typography';
import OpenNewTab from '@via-ds/icons/OpenNewTab';
import { clsx } from 'clsx';
import { type ActiveVersions, useVersionContext } from '@/context/version-context';
import { getTranslator } from '@/internationalization/get-translator';
import { getStaticVersion } from '@/utils/extract-mdx-routes-from-toc';
import { isSelectedTocNode } from '@/utils/is-selected-toc-node';
import { isUnifiedTOCInDevMode } from '@/utils/is-unified-toc-dev';
import { isOfflineBuild } from '@/utils/isOfflineBuild';
import { isRelativeUrl } from '@/utils/is-relative-url';
import { resolveDocsHref } from '@/utils/resolve-docs-href';
import { getExpandedTocKeys, tocTreeKey } from '@/utils/toc-tree-keys';
import type { TocItem } from './types';
import { VersionDropdown } from './VersionDropdown';
import { ActiveScrollAnchor, isActiveTocNode, sidenavAnalytics } from './UnifiedTocNavItems';
import styles from './toc-nav-tree.module.scss';

const isVersionAllowed = (versions: TocItem['versions'], currentVersion?: string | null) => {
  if (!versions || !currentVersion) return true;
  if (versions.includes?.includes(currentVersion)) return true;
  return versions.excludes ? !versions.excludes.includes(currentVersion) : false;
};

const isTocItemVersionAllowed = ({ versions, contentSite }: TocItem, activeVersions: ActiveVersions) =>
  isVersionAllowed(versions, isOfflineBuild ? getStaticVersion() : contentSite ? activeVersions[contentSite] : null);

// Via's Select opens its list inline, so a group's version list sits inside a tree row. The row captures
// the arrow keys to move between rows, and closing the list leaves focus on the page body. Move between
// options here, and return focus to the trigger when the list closes.
const handleListboxKeysCapture = (event: KeyboardEvent<HTMLDivElement>) => {
  const target = event.target as HTMLElement;
  const listbox = target.closest('[role="listbox"]');
  if (!listbox) return;

  if (event.key === 'Enter' || event.key === ' ' || event.key === 'Escape') {
    const trigger = target.closest('[role="row"]')?.querySelector<HTMLElement>('button[aria-haspopup="listbox"]');
    const start = performance.now();
    const restoreFocus = () => {
      const active = document.activeElement;
      if (!active || active === document.body) trigger?.focus();
      else if (listbox.contains(active) && performance.now() - start < 1000) requestAnimationFrame(restoreFocus);
    };
    requestAnimationFrame(restoreFocus);
    return;
  }

  if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
  event.preventDefault();
  event.stopPropagation();
  const options = [...listbox.querySelectorAll<HTMLElement>('[role="option"]:not([aria-disabled="true"])')];
  const index = options.indexOf(target.closest<HTMLElement>('[role="option"]') ?? options[0]);
  const next = { ArrowDown: index + 1, ArrowUp: index - 1, Home: 0, End: options.length - 1 }[event.key] ?? index;
  options[Math.min(Math.max(next, 0), options.length - 1)]?.focus();
};

interface TocNavNodeProps {
  item: TocItem;
  id: string;
  slug: string;
  isL1: boolean;
  onDriverPress: (item: TocItem) => void;
  depth?: number;
  isPanel?: boolean;
  isOpenL1?: boolean;
  isRailL1?: boolean;
  onL1Press?: (item: TocItem) => void;
}

const TocNavNode = ({
  item,
  id,
  slug,
  isL1,
  onDriverPress,
  depth = 0,
  isPanel = false,
  isOpenL1 = false,
  isRailL1 = false,
  onL1Press,
}: TocNavNodeProps) => {
  const { activeVersions } = useVersionContext();
  const { href } = resolveDocsHref(item.newUrl ?? '', usePathname());
  const sectionRef = useRef<HTMLDivElement>(null);
  const { label, newUrl, items = [], group, collapsible, versionDropdown, contentSite } = item;
  const isDriver = !!item.showSubNav && !isL1;

  if (!isL1 && !isDriver && !isTocItemVersionAllowed(item, activeVersions)) return null;

  // Only the open L1 shows its children; the others are plain links.
  const isSection = (isL1 ? isOpenL1 : group || collapsible) && !isDriver && items.length > 0;
  const isAlwaysOpen = (!!group && !collapsible) || isOpenL1;
  const isLinked = !!newUrl && !group && !((isL1 || isDriver) && isUnifiedTOCInDevMode);
  // A section sharing its URL with a descendant (e.g. an L1 and its "Introduction") defers to the descendant.
  // A rail L1 is current while the page is anywhere under it.
  const isCurrent = isRailL1
    ? isActiveTocNode(slug, newUrl, items)
    : isLinked &&
      isSelectedTocNode(newUrl.replace(/#.*/, ''), slug) &&
      !(isSection && items.some((child) => isActiveTocNode(slug, child.newUrl, child.items)));
  const scrollAnchor = isCurrent && !isOfflineBuild && <ActiveScrollAnchor />;
  const url = isLinked && !isRelativeUrl(href) ? new URL(href, 'https://www.mongodb.com') : undefined;
  const isMongoDB = !!url && (url.hostname === 'mongodb.com' || url.hostname.endsWith('.mongodb.com'));
  // Other sites open in a new tab. They and links to another docs property get the icon.
  const isExternal = !!url && !isMongoDB;
  const externalIcon = (isExternal || (isMongoDB && url?.pathname.startsWith('/docs/'))) && (
    <OpenNewTab role="presentation" size={12} className={styles.externalIcon} />
  );
  const hasVersionDropdown = !!group && !!versionDropdown && !isOfflineBuild;
  const style = { '--toc-depth': depth } as CSSProperties;

  if (isSection) {
    return (
      <SideNavSection
        ref={sectionRef}
        id={id}
        isCollapsible={!isAlwaysOpen}
        href={isLinked ? href : undefined}
        // Enter on a linked row navigates through the router without a click event.
        onAction={isLinked ? () => sidenavAnalytics(label, sectionRef.current) : undefined}
        isCurrent={isCurrent}
        style={style}
        // The dropdown is reached with the arrow keys from this row, so name it in the row's label.
        textValue={hasVersionDropdown ? `${label}, ${getTranslator().t('nav.view_different_version')}` : label}
        className={clsx(isL1 && styles.l1, isOpenL1 && styles.openL1, group && styles.group)}
        data-toc-label={group ? undefined : label}
        data-always-open={isAlwaysOpen ? '' : undefined}
      >
        <SideNavSectionHeader className={styles.sectionHeader}>
          {label}
          {externalIcon}
          {scrollAnchor}
          {hasVersionDropdown && (
            // Header labels get Via's heading text slots, which would leak into the dropdown's own text.
            <ViaTextContext.Provider value={null}>
              <div className={styles.groupVersion}>
                <VersionDropdown contentSite={contentSite} />
              </div>
            </ViaTextContext.Provider>
          )}
        </SideNavSectionHeader>
        {items.map((child, index) => (
          <TocNavNode
            key={index}
            item={child}
            id={tocTreeKey(index, id)}
            slug={slug}
            isL1={false}
            onDriverPress={onDriverPress}
            isPanel={isPanel}
            // In the two-panel nav's panel, group items share the group's indent.
            depth={isL1 || (group && isPanel) ? depth : depth + 1}
          />
        ))}
      </SideNavSection>
    );
  }

  return (
    <SideNavItem
      href={isLinked ? href : undefined}
      isCurrent={isCurrent}
      style={style}
      textValue={label}
      variant={SideNavItemVariant.Secondary}
      onPress={isDriver ? () => onDriverPress(item) : isL1 ? () => onL1Press?.(item) : undefined}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={clsx(isL1 && styles.l1)}
      data-toc-label={label}
    >
      {label}
      {externalIcon}
      {scrollAnchor}
    </SideNavItem>
  );
};

interface TocNavTreeProps {
  items: TocItem[];
  slug: string;
  /** Top-level items are L1s: uppercase, and only the open one shows its children. */
  isL1?: boolean;
  /** URL of the L1 to open. Defaults to the one holding the current page. */
  openL1Url?: string;
  /** Called when a closed L1 is pressed, so it can open without navigating (dev-mode L1s have no href). */
  onL1Press?: (item: TocItem) => void;
  onDriverPress: (item: TocItem) => void;
  /** Renders L1s as flat rows, for the two-panel nav's rail. */
  isRail?: boolean;
  /** The two-panel nav's section panel, with flush group items and tighter group headings. */
  isPanel?: boolean;
  /** Rendered in the nav header, above the tree. */
  header?: ReactNode;
  /** Rendered in the footer row beside the collapse toggle. */
  footerAction?: ReactNode;
  hasToggle?: boolean;
  'aria-label'?: string;
}

// Memoized: UnifiedSidenav re-renders on every scroll for its sticky offsets.
export const TocNavTree = memo(function TocNavTree({
  items,
  slug,
  isL1 = false,
  openL1Url,
  onL1Press,
  onDriverPress,
  isRail = false,
  isPanel = false,
  footerAction,
  header,
  hasToggle = true,
  'aria-label': ariaLabel = getTranslator().t('nav.accordion_side_navigation'),
}: TocNavTreeProps) {
  const routeKeys = useMemo(() => getExpandedTocKeys(items, slug), [items, slug]);
  const [prevRouteKeys, setPrevRouteKeys] = useState(routeKeys);
  const [expandedKeys, setExpandedKeys] = useState(routeKeys);

  // On navigation, close what the previous route opened and open what the new one needs.
  // Sections the user toggled stay as they are.
  if ([...routeKeys].join(' ') !== [...prevRouteKeys].join(' ')) {
    setPrevRouteKeys(routeKeys);
    setExpandedKeys((keys) => {
      const next = new Set(keys);
      prevRouteKeys.forEach((key) => !routeKeys.has(key) && next.delete(key));
      routeKeys.forEach((key) => !prevRouteKeys.has(key) && next.add(key));
      return next;
    });
  }

  // Fall back to the slug when the stored L1 no longer matches, e.g. after a version change rewrites its URL.
  const openL1 =
    isL1 && !isRail
      ? items.find((item) => openL1Url !== undefined && item.newUrl === openL1Url) ??
        items.find((item) => isActiveTocNode(slug, item.newUrl, item.items))
      : undefined;

  // RAC drops onClick and SideNavSection keeps onPress off its label link, so read link clicks here.
  // Clicks elsewhere on a row go through onAction.
  const handleClickCapture = (event: MouseEvent<HTMLDivElement>) => {
    const link = (event.target as HTMLElement).closest('a[href]');
    const labelled = link?.closest<HTMLElement>('[data-toc-label]');
    if (labelled) sidenavAnalytics(labelled.dataset.tocLabel ?? '', labelled);
  };

  return (
    <div className={styles.treeWrapper} onClickCapture={handleClickCapture} onKeyDownCapture={handleListboxKeysCapture}>
      <PrimarySideNav
        aria-label={ariaLabel}
        className={clsx(
          styles.tree,
          isRail && styles.railTree,
          isPanel && styles.panelTree,
          isOfflineBuild && 'offline-collapsible-nav-tree',
        )}
        expandedKeys={expandedKeys}
        onExpandedChange={(keys) => setExpandedKeys(new Set([...keys].map(String)))}
      >
        <SideNavHeader className={styles.header}>{header}</SideNavHeader>
        {items.map((item, index) => (
          <TocNavNode
            key={index}
            item={item}
            id={tocTreeKey(index)}
            slug={slug}
            isL1={isL1}
            isOpenL1={item === openL1}
            isRailL1={isL1 && isRail}
            isPanel={isPanel}
            onL1Press={onL1Press}
            onDriverPress={onDriverPress}
          />
        ))}
        {(hasToggle || footerAction) && (
          <SideNavFooter className={styles.footer}>
            {hasToggle && !isOfflineBuild && <SideNavToggle />}
            {footerAction}
          </SideNavFooter>
        )}
      </PrimarySideNav>
    </div>
  );
});
