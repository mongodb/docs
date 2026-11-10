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
import { getTranslator } from '@/internationalization/get-translator';
import { useCallback, useId } from 'react';
import styles from './product-tabs.module.scss';

const NAV_TABS = [
  { labelKey: 'products.database', path: '/docs' },
  { labelKey: 'products.atlas_agent_engine', path: '/docs/agentengine' },
  { labelKey: 'products.voyage_ai_models', path: '/docs/voyageai' },
] as const;

export const ProductTabs = ({ slug }: { slug: string }) => {
  const { t } = getTranslator();
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
        {t('actions.documentation')}
      </Text>
    );

  if (isTabletOrMobile) {
    return (
      <div className={styles.mobileList}>
        <Text size={Size.Large} className={clsx(styles.mobileTitle, styles.noWrap)}>
          {t('actions.documentation')}
        </Text>
        <hr className={styles.mobileDivider} />
        {NAV_TABS.map(({ labelKey, path }, index) => {
          const isActive = index === activeIndex;
          return (
            <div key={path}>
              <div className={styles.mobileItem} onClick={() => navigateToDocsPath(router, path)}>
                {isActive ? <Checkmark /> : <div style={{ width: 16 }} />}
                <Text>{t(labelKey)}</Text>
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
        {t('actions.documentation')}
      </Text>
      <div ref={tabsRef} className={styles.tabsWrapper}>
        {/* Tabs stand in for navigation links until design has a horizontal nav pattern */}
        <Tabs
          selectedKey={NAV_TABS[activeIndex].path}
          onSelectionChange={(key) => navigateToDocsPath(router, String(key))}
          keyboardActivation="manual"
        >
          <TabList aria-label={t('actions.product_navigation')}>
            {NAV_TABS.map(({ labelKey, path }) => (
              <Tab key={path}>{t(labelKey)}</Tab>
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
