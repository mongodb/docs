'use client';

import type { Dispatch, SetStateAction } from 'react';
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import useScreenSize from '@/hooks/use-screen-size';

interface SidenavContextType {
  hideMobile: boolean;
  isCollapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
  setHideMobile: Dispatch<SetStateAction<boolean>>;
  productTabsEls: HTMLElement[];
  registerProductTabs: (id: string, el: HTMLElement | null) => void;
}

export const SidenavContext = createContext<SidenavContextType>({
  hideMobile: true,
  isCollapsed: true,
  setCollapsed: () => {},
  setHideMobile: () => {},
  productTabsEls: [],
  registerProductTabs: () => {},
});

interface SidenavContextProviderProps {
  children: ReactNode;
}

export const SidenavContextProvider = ({ children }: SidenavContextProviderProps) => {
  const { isTablet } = useScreenSize();
  const [isCollapsed, setCollapsed] = useState(isTablet);
  // Hide the Sidenav with css while keeping state as open/not collapsed.
  // This prevents LG's SideNav component from being seen in its collapsed state on mobile
  const [hideMobile, setHideMobile] = useState(true);

  // Keyed by instance because both sidenav variants render ProductTabs at once
  const [productTabsById, setProductTabsById] = useState<Record<string, HTMLElement>>({});
  const registerProductTabs = useCallback((id: string, el: HTMLElement | null) => {
    setProductTabsById((prev) => {
      if (el ? prev[id] === el : !(id in prev)) return prev;
      const next = { ...prev };
      if (el) next[id] = el;
      else delete next[id];
      return next;
    });
  }, []);
  const productTabsEls = useMemo(() => Object.values(productTabsById), [productTabsById]);

  return (
    <SidenavContext.Provider
      value={{
        hideMobile,
        isCollapsed,
        setCollapsed,
        setHideMobile,
        productTabsEls,
        registerProductTabs,
      }}
    >
      {children}
    </SidenavContext.Provider>
  );
};

export const useSidenavContext = () => {
  return useContext(SidenavContext);
};
