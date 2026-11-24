import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext, useState, useContext } from 'react';

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
  hasLabDrawer?: boolean;
};

export const InstruqtProvider = ({ children, hasLabDrawer = false }: InstruqtProviderProps) => {
  const hasDrawer = hasLabDrawer;
  const [isOpen, setIsOpen] = useState(false);

  return <InstruqtContext.Provider value={{ hasDrawer, isOpen, setIsOpen }}>{children}</InstruqtContext.Provider>;
};

export const useInstruqt = () => {
  const context = useContext(InstruqtContext);

  if (!context) {
    throw new Error('useInstruqt must be used within a InstruqtProvider');
  }

  return context;
};
