'use client';

import clsx from 'clsx';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@via-ds/components/tabs';
import { Text } from '@via-ds/components/typography';
import { Size } from '@via-ds/components/types';
import Checkmark from '@via-ds/icons/Checkmark';
import { useRouter } from 'next/navigation';
import { isOfflineBuild } from '@/utils/isOfflineBuild';
import useScreenSize from '@/hooks/use-screen-size';
import { navigateToDocsPath } from '@/utils/navigate-to-docs-path';
import { useSidenavContext } from '@/context/sidenav-context';
import { useCallback, useId } from 'react';
import styles from './product-tabs.module.scss';

const NAV_TABS = [
  { label: 'Database', path: '/docs' },
  { label: 'Atlas Agent Engine', path: '/docs/agentengine' },
  { label: 'Voyage AI Models', path: '/docs/voyageai' },
] as const;

export const ProductTabs = ({ slug }: { slug: string }) => {
  const router = useRouter();
  const { isTabletOrMobile } = useScreenSize();
  const { registerProductTabs } = useSidenavContext();
  const id = useId();
  const tabsRef = useCallback((el: HTMLDivElement | null) => registerProductTabs(id, el), [id, registerProductTabs]);

  const activeIndex =
    slug?.startsWith('docs/agentengine') || slug?.startsWith('/docs/agentengine')
      ? 1
      : slug?.startsWith('docs/voyageai') || slug?.startsWith('/docs/voyageai')
      ? 2
      : 0;

  if (isOfflineBuild)
    return (
      <Text size={Size.Large} className={clsx(styles.mobileTitle, styles.noWrap)}>
        Documentation
      </Text>
    );

  if (isTabletOrMobile) {
    return (
      <div className={styles.mobileList}>
        <Text size={Size.Large} className={clsx(styles.mobileTitle, styles.noWrap)}>
          Documentation
        </Text>
        <hr className={styles.mobileDivider} />
        {NAV_TABS.map(({ label, path }, index) => {
          const isActive = index === activeIndex;
          return (
            <div key={label}>
              <div className={styles.mobileItem} onClick={() => navigateToDocsPath(router, path)}>
                {isActive ? <Checkmark /> : <div style={{ width: 16 }} />}
                <Text>{label}</Text>
              </div>
              {index < NAV_TABS.length - 1 && <hr className={styles.mobileDivider} />}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Text size={Size.Large} className={clsx(styles.label, styles.noWrap)}>
        Documentation
      </Text>
      <div ref={tabsRef} className={styles.tabsWrapper}>
        {/* Tabs stand in for navigation links until design has a horizontal nav pattern */}
        <Tabs
          selectedKey={NAV_TABS[activeIndex].path}
          onSelectionChange={(key) => navigateToDocsPath(router, String(key))}
          keyboardActivation="manual"
        >
          <TabList aria-label="Product navigation">
            {NAV_TABS.map(({ label, path }) => (
              <Tab key={path}>{label}</Tab>
            ))}
          </TabList>
          <TabPanels className={styles.panels}>
            {NAV_TABS.map(({ path }) => (
              <TabPanel key={path} />
            ))}
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
};
