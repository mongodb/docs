'use client';

/**
 * Context that contains language selector tab data
 * Stores which tab is currently active by reading local storage
 * or by setting default values, and allows
 * child components to read and update
 */

import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import { isEmpty } from 'lodash';
import { getLocalValue, setLocalValue } from '@/utils/browser-storage';
import type { DriverMap, IconComponent } from '@/components/icons/DriverIconMap';
import { DRIVER_ICON_MAP } from '@/components/icons/DriverIconMap';
import { ContentsContext } from '@/context/contents-context';
import type { ASTNode } from '@/types/ast';
import { getPlaintext } from '@/utils/get-plaintext';
import { useHash } from '@/hooks/use-hash';

export const makeChoices = ({
  name,
  iconMapping,
  options,
}: {
  name: string;
  options: string | Record<string, ASTNode[]>;
  iconMapping?: DriverMap;
}) =>
  Object.entries(options).map(([tabId, title]) => ({
    text: getPlaintext(title),
    value: tabId,
    ...(name === 'drivers' && iconMapping && { tabSelectorIcon: iconMapping[tabId] }),
  }));

export type Selectors = Record<string, Record<string, ASTNode[]>>;
export type ActiveTabs = Record<string, string>;
interface Choice {
  tabSelectorIcon?: IconComponent;
  text: string;
  value: string;
}
type ChoicesPerSelector = Record<string, Choice[]>;
interface TabContextState {
  activeTabs: ActiveTabs;
  selectors: Selectors;
  setActiveTab: (activeTab: ActiveTabs) => void;
  setInitialTabs: () => void;
  setLanguageSelectorTab: () => void;
}

const defaultContextValue: TabContextState = {
  activeTabs: {},
  selectors: {},
  setActiveTab: () => {},
  setInitialTabs: () => {},
  setLanguageSelectorTab: () => {},
};

const TabContext = createContext(defaultContextValue);

const reducer = (prevState: ActiveTabs, newState: Partial<ActiveTabs>): ActiveTabs => {
  return Object.fromEntries(
    Object.entries({ ...prevState, ...newState }).filter(([_, value]) => value !== undefined),
  ) as ActiveTabs;
};

// Helper fn to get default tabs for fallback (when no local storage found).
// For drivers tabs,
// 1. return default tab if available
// 2. return 'nodejs' if found
// Otherwise, return first choice.
const getDefaultTabs = (choicesPerSelector: ChoicesPerSelector, defaultTabs: ActiveTabs) =>
  Object.keys(choicesPerSelector || {}).reduce<ActiveTabs>((res, selectorKey) => {
    const defaultTabId = defaultTabs[selectorKey] ?? 'nodejs';
    const defaultOptionIdx = choicesPerSelector[selectorKey].findIndex((tab) => tab.value === defaultTabId);
    // NOTE: default tabs should be specified here
    if (selectorKey === 'drivers' && defaultOptionIdx > -1) {
      res[selectorKey] = defaultTabId;
    } else {
      res[selectorKey] = choicesPerSelector[selectorKey][0].value;
    }
    return res;
  }, {});

// Helper fn to extract tab values from local storage values
// If drivers, verify this is part of selectors.
// Otherwise, return tab choice
const getLocalTabs = (localTabs: ActiveTabs, selectors: Selectors) =>
  Object.keys(localTabs).reduce<ActiveTabs>((res, activeTabKey) => {
    if (selectors?.[activeTabKey]?.[localTabs[activeTabKey]]) {
      res[activeTabKey] = localTabs[activeTabKey];
    }
    return res;
  }, {});

const getInitialTabs = (selectors: Selectors, defaultTabs: ActiveTabs): Partial<ActiveTabs> => {
  // convert selectors to tab options first here, then set init values
  // selectors are determined at build time
  const choicesPerSelector = Object.keys(selectors).reduce<ChoicesPerSelector>((res, selector) => {
    res[selector] = makeChoices({
      name: selector,
      options: selectors[selector],
      ...(selector === 'drivers' && { iconMapping: DRIVER_ICON_MAP }),
    });
    return res;
  }, {});
  const defaultRes = getDefaultTabs(choicesPerSelector, defaultTabs);
  // get local active tabs and set as active tabs
  // if they exist on page.
  // otherwise, defaults will take precedence
  const localActiveTabs = getLocalTabs(getLocalValue('activeTabs') || {}, selectors);
  return { ...defaultRes, ...localActiveTabs };
};

const TabProvider = ({
  children,
  selectors = {},
  defaultTabs = {},
}: {
  children: ReactNode;
  selectors?: Selectors;
  defaultTabs?: ActiveTabs;
}) => {
  // init value to {} to match server and client side
  const hash = useHash();
  const [activeTabs, setActiveTab] = useReducer(reducer, {});
  const { setActiveSelectorIds } = useContext(ContentsContext);

  const initLoaded = useRef(false);

  const setInitialTabs = () => {
    const initialTabs = getInitialTabs(selectors, defaultTabs);
    setActiveTab(initialTabs);
  };

  const setLanguageSelectorTab = () => {
    const initialTabs = getInitialTabs(selectors, defaultTabs);
    if ('drivers' in initialTabs) {
      setActiveTab({ drivers: initialTabs.drivers });
    }
  };

  useEffect(() => {
    // dont update local value on initial load
    if (!initLoaded.current) return;
    setLocalValue('activeTabs', activeTabs);

    if (isEmpty(activeTabs)) {
      return;
    }

    // on Tab update, update the active selector ids
    // so headings can be shown/hidden
    setActiveSelectorIds((activeSelectorIds) => ({ ...activeSelectorIds, tab: Object.values(activeTabs) }));
  }, [activeTabs, setActiveSelectorIds]);

  // initial effect to read from local storage
  // used in an effect to keep SSG HTML consistent
  useEffect(() => {
    // If hash, do not set tabs (tab state will be set in use-hash-anchor.tsx)
    if (hash?.length > 1) {
      const isOnPage = document.getElementById(hash.slice(1));
      if (isOnPage) {
        initLoaded.current = true;
        return;
      }
    }
    setInitialTabs();
    initLoaded.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TabContext.Provider
      value={{
        activeTabs,
        selectors,
        setActiveTab,
        setInitialTabs,
        setLanguageSelectorTab,
      }}
    >
      {children}
    </TabContext.Provider>
  );
};

export { TabContext, TabProvider };
