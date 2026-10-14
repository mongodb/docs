'use client';

import React, { useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import clsx from 'clsx';
import { Tabs as ViaTabs, TabList, Tab as ViaTab, TabPanels, TabPanel } from '@via-ds/components/tabs';
import { Size } from '@via-ds/components/types';
import { CodeProvider } from '@/context/code-context';
import { reportAnalytics } from '@/utils/report-analytics';
import { isBrowser } from '@/utils/is-browser';
import { getLocalValue } from '@/utils/browser-storage';
import { TabContext } from '@/context/tabs-context';
import { TabHashContext, TabHashProvider } from '@/context/tabs-hash-context';
import { useHash } from '@/hooks/use-hash';
import { PageContext } from '@/context/page-context';
import { currentScrollPosition } from '@/utils/current-scroll-position';
import styles from './tabs.module.scss';

const TAB_BUTTON_SELECTOR = 'button[role="tab"]';

// Name anonymous tabsets by alphabetizing their tabids and concatenating with a forward slash
const generateAnonymousTabsetName = (tabIds: string[]) => [...tabIds].sort().join('/');

const getPosition = (element: HTMLElement) => {
  if (!isBrowser || !element) return { x: 0, y: 0 };
  const { x, y } = element.getBoundingClientRect();
  return { x, y };
};

export type TabProps = {
  children: React.ReactNode;
  tabid: string;
  /** Optional explicit tab title. If omitted, the first child is used as the title. */
  name?: React.ReactNode;
};

/**
 * Prop carrier for individual tabs inside a <Tabs> component.
 * Rendering is handled by the parent <Tabs> via React.Children.
 */
export const Tab = ({ children }: TabProps) => <>{children}</>;

export type TabsProps = {
  children: React.ReactNode;
  /** Named tabset for syncing across multiple tabsets on the page */
  tabset?: string;
  /** Hide tab headers (tabset is controlled by a dropdown selector) */
  hidden?: boolean;
};

export const Tabs = ({ children, tabset, hidden }: TabsProps) => {
  const hash = useHash();
  const { activeTabs, selectors, setActiveTab } = useContext(TabContext);
  const { setActiveTabToHashTab } = useContext(TabHashContext);
  const { template } = useContext(PageContext);
  const tabs = useMemo(
    () =>
      React.Children.toArray(children)
        .filter(React.isValidElement)
        .map((child) => child.props as TabProps)
        .filter(({ tabid }) => Boolean(tabid)),
    [children],
  );
  const tabIdArray = useMemo(() => tabs.map(({ tabid }) => tabid), [tabs]);
  const tabsetName = useMemo(() => tabset || generateAnonymousTabsetName(tabIdArray), [tabset, tabIdArray]);

  const activeTabId = tabIdArray.includes(activeTabs[tabsetName]) ? activeTabs[tabsetName] : tabIdArray[0];

  const scrollAnchorRef = useRef<HTMLDivElement>(null);
  const isHidden = !!hidden || Object.keys(selectors).includes(tabsetName);
  const isProductLanding = template === 'product-landing';

  const initLoad = useRef(false);

  useEffect(() => {
    if (initLoad.current) return;
    if (hash?.length > 1) {
      const isOnPage = document.getElementById(hash.slice(1));
      if (isOnPage) {
        initLoad.current = true;
        return;
      }
    }
    initLoad.current = true;

    const localTabs = getLocalValue('activeTabs');
    const localTabIdx = tabIdArray.indexOf(localTabs?.[tabsetName]);
    const tabId = tabIdArray[localTabIdx > -1 ? localTabIdx : 0];
    if (tabId) setActiveTab({ [tabsetName]: tabId });
  }, [setActiveTab, tabIdArray, tabsetName, hash]);

  const handleSelectionChange = useCallback(
    (key: React.Key) => {
      const tabId = String(key);
      if (tabId === activeTabId) return;
      const priorAnchorOffset = scrollAnchorRef.current ? getPosition(scrollAnchorRef.current).y : undefined;
      setActiveTab({ [tabsetName]: tabId });

      window.setTimeout(() => {
        if (scrollAnchorRef.current && priorAnchorOffset) {
          window.scrollTo(0, getPosition(scrollAnchorRef.current).y + window.scrollY - priorAnchorOffset);
        }
      }, 40);
    },
    [activeTabId, setActiveTab, tabsetName],
  );

  // Via's Tab doesn't forward onClick and react-aria stops click propagation, so clicks are captured here; skip ones from nested tabsets.
  const handleTabClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const tabButton = (event.target as HTMLElement).closest<HTMLElement>(TAB_BUTTON_SELECTOR);
    if (!tabButton || tabButton.closest('[data-tabset]') !== event.currentTarget) return;
    const tab = tabs.find(({ tabid }) => tabid === tabButton.dataset.key);
    if (!tab) return;
    const tabName = tab.name ?? tab.tabid;
    reportAnalytics('Click', {
      position: 'body',
      position_context: 'Tab',
      label: tabName,
      label_text_displayed: tabButton.textContent?.trim() || tabName,
      scroll_position: currentScrollPosition(),
      tagbook: 'true',
    });
  };

  const switchToParentTab = () => {
    if (setActiveTabToHashTab) {
      setActiveTabToHashTab();
    }
  };

  return (
    <>
      <div ref={scrollAnchorRef} aria-hidden="true" />
      <CodeProvider>
        <div className={styles.tabs} data-tabset={tabsetName} onClickCapture={handleTabClick}>
          <ViaTabs size={Size.Large} selectedKey={activeTabId} onSelectionChange={handleSelectionChange}>
            <div hidden={isHidden}>
              <TabList
                aria-label={`Tabs to describe usage of ${tabsetName}`}
                className={clsx(isProductLanding && styles.landingTabList)}
              >
                {tabs.map(({ tabid, name }) => (
                  <ViaTab key={tabid} className={clsx(isProductLanding && styles.landingTab)}>
                    {name ?? tabid}
                  </ViaTab>
                ))}
              </TabList>
            </div>
            <TabPanels>
              {tabs.map(({ tabid, children: tabContent }) => (
                <TabPanel key={tabid} shouldForceMount>
                  <TabHashProvider tabName={tabsetName} tabId={tabid} switchToParentTab={switchToParentTab}>
                    <div className={clsx(styles.panel, isProductLanding && styles.landingPanel)}>{tabContent}</div>
                  </TabHashProvider>
                </TabPanel>
              ))}
            </TabPanels>
          </ViaTabs>
        </div>
      </CodeProvider>
    </>
  );
};
