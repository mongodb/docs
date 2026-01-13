'use client';

import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { Tabs as LeafyTabs, Tab as LeafyTab } from '@leafygreen-ui/tabs';
import { palette } from '@leafygreen-ui/palette';
import { CodeProvider } from '@/components/code/code-context';
import ComponentFactory from '@/components/component-factory';
import { HeadingContextProvider, useHeadingContext } from '../../context/heading-context';
import { theme } from '@/styles/theme';
import { reportAnalytics } from '@/utils/report-analytics';
import { getNestedValue } from '@/utils/get-nested-value';
import { isBrowser } from '@/utils/is-browser';
import { getLocalValue } from '@/utils/browser-storage';
import { getPlaintext } from '@/utils/get-plaintext';
import type { Node, TabNode, TabsOptions } from '@/types/ast';
import { TabContext } from '@/context/tabs-context';
import { TabHashContext, TabHashProvider } from '@/context/tabs-hash-context';
import { useHash } from '@/hooks/use-hash';
import { PageContext } from '@/context/page-context';
import { currentScrollPosition } from '@/utils/current-scroll-position';

const TAB_BUTTON_SELECTOR = 'button[role="tab"]';

const getTabId = (node: Node) => getNestedValue(['options', 'tabid'], node) as string;

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
      display: block;
      flex-grow: 1;
    }
  }
`;

const getTabsStyling = ({ isHidden, isProductLanding }: { isHidden: boolean; isProductLanding: boolean }) => css`
  ${defaultTabsStyling};
  ${isHidden && hiddenTabsStyling};
  ${isProductLanding && landingTabsStyling};

  [aria-label*='Tabs to describe usage of'] {
    /* Using a background allows the "border" to appear underneath the individual tab color */
    background: linear-gradient(0deg, ${palette.gray.light2} 1px, rgb(255 255 255 / 0%) 1px);

    .dark-theme & {
      /* Using a background allows the "border" to appear underneath the individual tab color */
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
  }

  @media ${theme.screenSize.upToLarge} {
    display: block;
  }
`;

export type TabsProps = {
  nodeChildren: TabNode[];
  options?: TabsOptions;
};

const Tabs = ({ nodeChildren, options, ...rest }: TabsProps) => {
  const hash = useHash();
  const { activeTabs, selectors, setActiveTab } = useContext(TabContext);
  const { setActiveTabToHashTab } = useContext(TabHashContext);
  const { options: pageOptions } = useContext(PageContext);
  const { sectionDepth } = useHeadingContext();

  const tabIds = nodeChildren.map((child) => getTabId(child));
  const tabsetName = options?.tabset || generateAnonymousTabsetName(tabIds);
  const [activeTab, setActiveTabIndex] = useState(() => {
    // activeTabIdx at build time should be -1 if tabsetName !== drivers
    // since no local storage to read, and no default tabs
    const activeTabIdx = tabIds.indexOf(activeTabs?.[tabsetName]);
    return activeTabIdx > -1 ? activeTabIdx : 0;
  });

  const scrollAnchorRef = useRef<HTMLDivElement>(null);
  // Hide tabset if it includes the :hidden: option, or if it is controlled by a dropdown selector
  const isHidden = !!options?.hidden || Object.keys(selectors).includes(tabsetName);
  const isProductLanding = pageOptions?.template === 'product-landing';
  const { lastHeading } = useHeadingContext();

  const initLoad = useRef(false);

  // get non-TabSelector tabs in localstorage
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
    let activeTabIdx = tabIds.indexOf(localTabs?.[tabsetName]);
    activeTabIdx = activeTabIdx > -1 ? activeTabIdx : 0;
    setActiveTabIndex(activeTabIdx);
    setActiveTab({ [tabsetName]: tabIds[activeTabIdx] });
  }, [setActiveTab, tabIds, tabsetName, hash]);

  useEffect(() => {
    const index = tabIds.indexOf(activeTabs[tabsetName]);
    if (index !== -1) {
      setActiveTabIndex(index);
    }
  }, [activeTabs, tabIds, tabsetName]);

  const handleClick = useCallback(
    (index: number) => {
      if (activeTab === index) {
        return;
      }
      const tabId = tabIds[index];
      const priorAnchorOffset = scrollAnchorRef.current ? getPosition(scrollAnchorRef.current).y : undefined;
      setActiveTab({ [tabsetName]: tabId });

      // Delay preserving scroll behavior by 40ms to allow other tabset content bodies to render
      window.setTimeout(() => {
        if (scrollAnchorRef.current && priorAnchorOffset) {
          window.scrollTo(0, getPosition(scrollAnchorRef.current).y + window.scrollY - priorAnchorOffset);
        }
      }, 40);
    },
    [activeTab, setActiveTab, tabIds, tabsetName],
  );

  const switchToParentTab = () => {
    if (setActiveTabToHashTab) {
      setActiveTabToHashTab();
    }
  };

  return (
    <>
      <div ref={scrollAnchorRef} aria-hidden="true"></div>
      <CodeProvider>
        <LeafyTabs
          className={cx(getTabsStyling({ isHidden, isProductLanding }), tabsetName)}
          aria-label={`Tabs to describe usage of ${tabsetName}`}
          selected={activeTab}
          setSelected={handleClick}
          forceRenderAllTabPanels={true}
        >
          {nodeChildren.map((tab) => {
            if (tab.name !== 'tab') {
              return null;
            }

            const tabId = getTabId(tab);
            const tabTitle =
              tab.argument.length > 0
                ? tab.argument.map((arg, i) => <ComponentFactory {...rest} key={`${tabId}-arg-${i}`} nodeData={arg} />)
                : tabId;

            return (
              <LeafyTab
                data-tabid={tabId}
                key={tabId}
                name={tabTitle}
                onClick={(event) => {
                  const translatedLabel = event.currentTarget.textContent?.trim() || getPlaintext(tab.argument);
                  reportAnalytics('Click', {
                    position: 'body',
                    position_context: 'Tab',
                    label: getPlaintext(tab.argument),
                    label_text_displayed: translatedLabel,
                    scroll_position: currentScrollPosition(),
                    tagbook: 'true',
                  });
                }}
              >
                <HeadingContextProvider
                  heading={lastHeading ? `${lastHeading} - ${getPlaintext(tab.argument)}` : getPlaintext(tab.argument)}
                  sectionDepth={sectionDepth}
                >
                  <TabHashProvider tabName={tabsetName} tabId={tabId} switchToParentTab={switchToParentTab}>
                    <div className={cx(tabContentStyling, isProductLanding ? productLandingTabContentStyling : '')}>
                      {tab.children.map((child, i) => (
                        <ComponentFactory {...rest} key={`${tabId}-${i}`} nodeData={child} />
                      ))}
                    </div>
                  </TabHashProvider>
                </HeadingContextProvider>
              </LeafyTab>
            );
          })}
        </LeafyTabs>
      </CodeProvider>
    </>
  );
};

export default Tabs;
