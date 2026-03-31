'use client';

import React, { useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { Tabs as LeafyTabs, Tab as LeafyTab } from '@leafygreen-ui/tabs';
import { palette } from '@leafygreen-ui/palette';
import { CodeProvider } from '@/components/code/code-context';
import { theme } from '@/styles/theme';
import { reportAnalytics } from '@/utils/report-analytics';
import { isBrowser } from '@/utils/is-browser';
import { getLocalValue } from '@/utils/browser-storage';
import { TabContext } from '@/context/tabs-context';
import { TabHashContext, TabHashProvider } from '@/context/tabs-hash-context';
import { useHash } from '@/hooks/use-hash';
import { PageContext } from '@/context/page-context';
import { currentScrollPosition } from '@/utils/current-scroll-position';

const TAB_BUTTON_SELECTOR = 'button[role="tab"]';

// Name anonymous tabsets by alphabetizing their tabids and concatenating with a forward slash
const generateAnonymousTabsetName = (tabIds: string[]) => [...tabIds].sort().join('/');

const getPosition = (element: HTMLElement) => {
  if (!isBrowser || !element) return { x: 0, y: 0 };
  const { x, y } = element.getBoundingClientRect();
  return { x, y };
};

const defaultTabsStyling = css`
  margin-bottom: ${theme.size.medium};
  ${TAB_BUTTON_SELECTOR} {
    color: var(--tab-color-primary);
    font-size: ${theme.size.default};
    align-items: center;

    &[aria-selected='true'] {
      color: var(--tab-color-secondary);
    }
  }

  @media ${theme.screenSize.upTo2XLarge} {
    ${TAB_BUTTON_SELECTOR} {
      overflow: initial;
      max-width: initial;
      text-overflow: initial;
    }
  }
`;

const hiddenTabsStyling = css`
  & > div:first-of-type {
    display: none;
  }
`;

const landingTabsStyling = css`
  & > div:first-of-type {
    margin-top: ${theme.size.medium};
    margin-bottom: ${theme.size.large};

    ${TAB_BUTTON_SELECTOR} {
      flex-grow: 1;
    }
  }
`;

const getTabsStyling = ({ isHidden, isProductLanding }: { isHidden: boolean; isProductLanding: boolean }) => css`
  ${defaultTabsStyling};
  ${isHidden && hiddenTabsStyling};
  ${isProductLanding && landingTabsStyling};

  [aria-label*='Tabs to describe usage of'] {
    overflow-y: hidden;
    background: linear-gradient(0deg, ${palette.gray.light2} 1px, rgb(255 255 255 / 0%) 1px);

    .dark-theme & {
      background: linear-gradient(0deg, ${palette.gray.dark2} 1px, rgb(255 255 255 / 0%) 1px);
    }
  }
`;

const tabContentStyling = css`
  margin-top: ${theme.size.medium};
`;

const productLandingTabContentStyling = css`
  display: grid;
  column-gap: ${theme.size.medium};
  grid-template-columns: repeat(2, 1fr);

  img {
    border-radius: ${theme.size.small};
    grid-column: 2;
    margin-top: 0px;
    display: block;
    max-width: 100%;
  }

  @media ${theme.screenSize.upToLarge} {
    display: block;
  }
`;

export type TabProps = {
  children: React.ReactNode;
  tabid: string;
  /** Optional explicit tab title. If omitted, the first child is used as the title. */
  name?: string;
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
  const tabIdArray = useMemo(
    () =>
      React.Children.toArray(children)
        .filter(React.isValidElement)
        .map((child) => (child.props as TabProps).tabid)
        .filter(Boolean),
    [children],
  );
  const tabsetName = useMemo(() => tabset || generateAnonymousTabsetName(tabIdArray), [tabset, tabIdArray]);

  const activeTab = Math.max(0, tabIdArray.indexOf(activeTabs[tabsetName] ?? ''));

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

  const handleClick = useCallback(
    (index: number) => {
      if (activeTab === index) return;
      const tabId = tabIdArray[index];
      const priorAnchorOffset = scrollAnchorRef.current ? getPosition(scrollAnchorRef.current).y : undefined;
      setActiveTab({ [tabsetName]: tabId });

      window.setTimeout(() => {
        if (scrollAnchorRef.current && priorAnchorOffset) {
          window.scrollTo(0, getPosition(scrollAnchorRef.current).y + window.scrollY - priorAnchorOffset);
        }
      }, 40);
    },
    [activeTab, setActiveTab, tabIdArray, tabsetName],
  );

  const switchToParentTab = () => {
    if (setActiveTabToHashTab) {
      setActiveTabToHashTab();
    }
  };

  return (
    <>
      <div ref={scrollAnchorRef} aria-hidden="true" />
      <CodeProvider>
        <LeafyTabs
          className={cx(getTabsStyling({ isHidden, isProductLanding }), tabsetName)}
          aria-label={`Tabs to describe usage of ${tabsetName}`}
          selected={activeTab}
          setSelected={handleClick}
          forceRenderAllTabPanels={true}
        >
          {React.Children.map(children, (child) => {
            if (!React.isValidElement(child)) return null;
            const { tabid, name, children: tabChildren } = child.props as TabProps;

            const tabName = name ?? tabid;
            const tabContent = tabChildren;

            return (
              <LeafyTab
                key={tabid}
                data-tabid={tabid}
                name={tabName}
                onClick={(event) => {
                  const translatedLabel = event.currentTarget.textContent?.trim() || tabName;
                  reportAnalytics('Click', {
                    position: 'body',
                    position_context: 'Tab',
                    label: tabName,
                    label_text_displayed: translatedLabel,
                    scroll_position: currentScrollPosition(),
                    tagbook: 'true',
                  });
                }}
              >
                <TabHashProvider tabName={tabsetName} tabId={tabid} switchToParentTab={switchToParentTab}>
                  <div className={cx(tabContentStyling, isProductLanding ? productLandingTabContentStyling : '')}>
                    {tabContent}
                  </div>
                </TabHashProvider>
              </LeafyTab>
            );
          })}
        </LeafyTabs>
      </CodeProvider>
    </>
  );
};
