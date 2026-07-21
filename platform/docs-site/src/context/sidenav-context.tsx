'use client';

import type { Dispatch, SetStateAction } from 'react';
import { createContext, useContext, useState, type ReactNode } from 'react';
import useScreenSize from '@/hooks/use-screen-size';

interface SidenavContextType {
  hideMobile: boolean;
  isCollapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
  setHideMobile: Dispatch<SetStateAction<boolean>>;
}

export const SidenavContext = createContext<SidenavContextType>({
  hideMobile: true,
  isCollapsed: true,
  setCollapsed: () => {},
  setHideMobile: () => {},
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

  return (
    <SidenavContext.Provider
      value={{
        hideMobile,
        isCollapsed,
        setCollapsed,
        setHideMobile,
      }}
    >
      {children}
    </SidenavContext.Provider>
  );
};

export const useSidenavContext = () => {
  return useContext(SidenavContext);
};
