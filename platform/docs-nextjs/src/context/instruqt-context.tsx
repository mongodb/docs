'use client';

import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext, useState } from 'react';

interface InstruqtContextType {
  hasDrawer: boolean;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const defaultContextValue: InstruqtContextType = {
  hasDrawer: false,
  isOpen: false,
  setIsOpen: () => {},
};

const InstruqtContext = createContext<InstruqtContextType>(defaultContextValue);

export type InstruqtProviderProps = {
  children: ReactNode;
  hasLabDrawer: boolean;
};

const InstruqtProvider = ({ children, hasLabDrawer }: InstruqtProviderProps) => {
  const hasDrawer = hasLabDrawer;
  const [isOpen, setIsOpen] = useState(false);

  return <InstruqtContext.Provider value={{ hasDrawer, isOpen, setIsOpen }}>{children}</InstruqtContext.Provider>;
};

export { InstruqtContext, InstruqtProvider };
