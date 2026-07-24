/**
 * Context that contains awareness and control within nested tabs for hash anchors
 * Stores function to open designated tab and all parent tabs for hash anchor links
 *
 * Example of nested tab functionality:
 *
 * | Tab Component 1
 * |-- Tab Hash Context 1
 * |-- Permalink 1
 * |-- Permalink 2
 * |---- Tab Component 2
 * |---- Tab Hash Context 2
 * |------ Permalink 3
 *
 * Using a hash in Permalink 3 calls Tab Hash Context 2 to update Tab Component 2.
 * Tab Component 2 also calls Tab Hash Context 1 to update Tab Component 1
 */

'use client';

import type { ReactNode } from 'react';
import { createContext, useContext } from 'react';
import { TabContext } from '@/context/tabs-context';

interface TabHashContextType {
  setActiveTabToHashTab: null | (() => void);
}

const defaultContextValue: TabHashContextType = {
  setActiveTabToHashTab: null,
};

const TabHashContext = createContext<TabHashContextType>(defaultContextValue);

const TabHashProvider = ({
  children,
  tabName,
  tabId,
  switchToParentTab,
}: {
  children: ReactNode;
  tabName: string;
  tabId: string;
  switchToParentTab: () => void;
}) => {
  const { setActiveTab } = useContext(TabContext);

  const setActiveTabToHashTab = () => {
    // Sets off possible chain of invocations to open all parent tabs
    switchToParentTab();
    const tabValue = { [tabName]: tabId };
    // Open tab directly containing hash
    setActiveTab(tabValue);
  };

  return (
    <TabHashContext.Provider
      value={{
        setActiveTabToHashTab,
      }}
    >
      {children}
    </TabHashContext.Provider>
  );
};

export { TabHashContext, TabHashProvider };
