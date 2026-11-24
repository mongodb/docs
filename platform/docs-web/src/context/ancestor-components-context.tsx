import { createContext, useContext, type ReactNode } from 'react';

interface AncestorComponentContextType {
  table: boolean;
  procedure: boolean;
}

const defaultVal = {
  table: false,
  procedure: false,
};

const AncestorComponentContext = createContext<AncestorComponentContextType>(defaultVal);

type AncestorComponentName = 'table' | 'procedure';

export type AncestorComponentContextProviderProps = {
  children: ReactNode;
  component: AncestorComponentName;
};

/**
 * Context provider to help track ancestors of components without ambiguous prop drilling.
 * If nested within another component that uses this provder, previous ancestors are persisted.
 */
const AncestorComponentContextProvider = ({ children, component }: AncestorComponentContextProviderProps) => {
  const prevAncestors = useAncestorComponentContext();
  const newAncestors = { ...prevAncestors };

  if (component) {
    newAncestors[component] = true;
  }

  return <AncestorComponentContext.Provider value={newAncestors}>{children}</AncestorComponentContext.Provider>;
};

/**
 * By default, all ancestors will be false.
 */
const useAncestorComponentContext = () => {
  return useContext(AncestorComponentContext);
};

export { AncestorComponentContextProvider, useAncestorComponentContext };
