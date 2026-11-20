'use client';

import { useCallback, useMemo, useState } from 'react';
import { AppLayoutProvider } from '@via-ds/components/app-layout';
import { Link, LinkStyle } from '@via-ds/components/typography';
import { clsx } from 'clsx';
import { DownloadButton } from '@/mdx-components/offline-download-modal/download-button';
import { ProductTabs } from '@/mdx-components/ActionBar/ProductTabs';
import { getTranslator } from '@/internationalization/get-translator';
import { useDriverPress } from './AccordionNav';
import { TocNavTree } from './TocNavTree';
import type { TocItem } from './types';
import accordionStyles from './accordion-nav.module.scss';
import styles from './double-panned-nav.module.scss';

interface DoublePannedNavProps {
  showDriverBackBtn: boolean;
  setShowDriverBackBtn: (show: boolean) => void;
  tree: TocItem[];
  slug: string;
  currentL2s?: TocItem | null;
  setCurrentL1: (item: TocItem) => void;
  setCurrentL2s: (item: TocItem) => void;
  currentL1?: TocItem;
  isAccordionOnly?: boolean;
}

export const DoublePannedNav = ({
  showDriverBackBtn,
  setShowDriverBackBtn,
  tree,
  slug,
  currentL2s,
  setCurrentL1,
  setCurrentL2s,
  currentL1,
  isAccordionOnly = false,
}: DoublePannedNavProps) => {
  const { t } = getTranslator();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const l2Items = currentL2s?.items;
  const hasL2 = !!l2Items?.length;

  const onDriverPress = useDriverPress(tree, setCurrentL1, setShowDriverBackBtn, setCurrentL2s);
  const onL1Press = useCallback(
    (l1: TocItem) => {
      setCurrentL1(l1);
      setCurrentL2s(l1);
      setShowDriverBackBtn(false);
    },
    [setCurrentL1, setCurrentL2s, setShowDriverBackBtn],
  );

  // Stable so the memoized trees skip scroll re-renders.
  const footerAction = useMemo(
    () => (
      <div className={accordionStyles.download}>
        <DownloadButton />
      </div>
    ),
    [],
  );
  const header = useMemo(
    () =>
      showDriverBackBtn && (
        <Link
          className={styles.backLink}
          linkStyle={LinkStyle.Back}
          onPress={() => setShowDriverBackBtn(false)}
          href={currentL1?.newUrl}
        >
          {t('nav.back_to', { label: currentL1?.label ?? '' })}
        </Link>
      ),
    [showDriverBackBtn, setShowDriverBackBtn, currentL1, t],
  );

  return (
    <div
      className={clsx(
        styles.doublePannedNav,
        hasL2 && styles.withL2,
        isCollapsed && styles.rail,
        isAccordionOnly && styles.accordionOnly,
      )}
    >
      <div className={styles.tabs}>
        <ProductTabs slug={slug} />
      </div>
      <div className={styles.panes}>
        <AppLayoutProvider
          isSideNavPinned={!isCollapsed}
          onSideNavPinnedChange={(isPinned) => setIsCollapsed(!isPinned)}
        >
          <div className={styles.left}>
            <TocNavTree
              aria-label={t('nav.double_panned_side_navigation')}
              items={tree}
              slug={slug}
              isL1
              isRail
              onL1Press={onL1Press}
              onDriverPress={onDriverPress}
              footerAction={footerAction}
            />
          </div>
        </AppLayoutProvider>
        {hasL2 && (
          <div className={styles.right}>
            {/* Remount when the panel switches; tree keys are panel-relative. */}
            <TocNavTree
              key={`${currentL2s?.newUrl}|${currentL2s?.label}`}
              items={l2Items ?? []}
              slug={slug}
              onDriverPress={onDriverPress}
              header={header}
              isPanel
              hasToggle={false}
              aria-label={t('nav.section_navigation')}
            />
          </div>
        )}
      </div>
    </div>
  );
};
