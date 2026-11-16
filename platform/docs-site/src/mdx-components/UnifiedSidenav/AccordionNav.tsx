'use client';

import { useCallback, useMemo, useState } from 'react';
import { BackLink } from '@leafygreen-ui/typography';
import { AppLayoutProvider } from '@via-ds/components/app-layout';
import { clsx } from 'clsx';
import useScreenSize from '@/hooks/use-screen-size';
import { getTranslator } from '@/internationalization/get-translator';
import { DownloadButton } from '@/mdx-components/offline-download-modal/download-button';
import { ProductTabs } from '@/mdx-components/ActionBar/ProductTabs';
import { TocNavTree } from './TocNavTree';
import type { TocItem } from './types';
import styles from './accordion-nav.module.scss';

const NO_ITEMS: TocItem[] = [];

const containsTocItem = (items: TocItem[] = [], target: TocItem): boolean =>
  items.some((item) => item === target || containsTocItem(item.items, target));

interface AccordionNavPanelProps {
  showDriverBackBtn: boolean;
  setShowDriverBackBtn: (show: boolean) => void;
  slug: string;
  currentL1?: TocItem;
  currentL2s?: TocItem | null;
  setCurrentL1: (item: TocItem) => void;
  setCurrentL2s: (item: TocItem) => void;
  tree: TocItem[];
  hideMobile: boolean;
  isAccordionOnly?: boolean;
}

export const AccordionNavPanel = ({
  showDriverBackBtn,
  setShowDriverBackBtn,
  slug,
  currentL1,
  currentL2s,
  setCurrentL1,
  setCurrentL2s,
  tree,
  hideMobile,
  isAccordionOnly = false,
}: AccordionNavPanelProps) => {
  const { t } = getTranslator();
  const { isTabletOrMobile } = useScreenSize();
  const items = showDriverBackBtn ? currentL2s?.items ?? NO_ITEMS : tree;
  const [isCollapsed, setIsCollapsed] = useState(false);
  // The collapsed rail is desktop-only; the mobile menu always shows the full nav.
  const isRail = isCollapsed && !isTabletOrMobile;

  // Drivers can be opened without navigating (dev-mode rows have no href), so set their L1 here too.
  const onDriverPress = useCallback(
    (driver: TocItem) => {
      const { items, newUrl, label, contentSite } = driver;
      const owner = tree.find((l1) => containsTocItem(l1.items, driver));
      if (owner) setCurrentL1(owner);
      setShowDriverBackBtn(true);
      setCurrentL2s({ items, newUrl, label, contentSite });
    },
    [tree, setCurrentL1, setShowDriverBackBtn, setCurrentL2s],
  );
  const onL1Press = useCallback(
    (l1: TocItem) => {
      setCurrentL1(l1);
      setCurrentL2s(l1);
      setShowDriverBackBtn(false);
    },
    [setCurrentL1, setCurrentL2s, setShowDriverBackBtn],
  );
  // Memoized so the memoized tree doesn't re-render on every scroll.
  const footerAction = useMemo(
    () => (
      <div className={styles.download}>
        <DownloadButton />
      </div>
    ),
    [],
  );
  // Rendered in Via's nav header so hovering anywhere on the collapsed rail opens the whole nav.
  const header = useMemo(
    () => (
      <>
        <div className={styles.tabs}>
          <ProductTabs slug={slug} />
        </div>
        {showDriverBackBtn && (
          <BackLink className={styles.backLink} onClick={() => setShowDriverBackBtn(false)} href={currentL1?.newUrl}>
            {t('nav.back_to', { label: currentL1?.label ?? '' })}
          </BackLink>
        )}
      </>
    ),
    [t, slug, showDriverBackBtn, setShowDriverBackBtn, currentL1],
  );

  return (
    <AppLayoutProvider isSideNavPinned={!isRail} onSideNavPinnedChange={(isPinned) => setIsCollapsed(!isPinned)}>
      <div
        className={clsx(
          styles.accordionNav,
          hideMobile && styles.hideMobile,
          isAccordionOnly && styles.accordionOnly,
          isRail && styles.rail,
        )}
      >
        <div className={styles.panel}>
          {/* Keys are relative to the rendered items, so remount when the panel switches. */}
          <TocNavTree
            key={showDriverBackBtn ? currentL2s?.newUrl : tree[0]?.navSection ?? 'docs'}
            items={items}
            slug={slug}
            isL1={!showDriverBackBtn}
            openL1Url={currentL1?.newUrl}
            onL1Press={onL1Press}
            onDriverPress={onDriverPress}
            footerAction={footerAction}
            header={header}
          />
        </div>
      </div>
    </AppLayoutProvider>
  );
};
