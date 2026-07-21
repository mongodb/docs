'use client';

import { createContext, useState } from 'react';

// Provides the `selections` prop of the nearest enclosing ComposableContent.
// Used by Heading to look up its pre-computed stable ID instead of relying on
// the shared headingSlugger, whose counter diverges when only a subset of
// composable variants are mounted.
export const ComposableSelectionsContext = createContext<Record<string, string> | null>(null);

const ComposableContext = createContext<{
  currentSelections: Record<string, string>;
  setCurrentSelections: (selections: Record<string, string>) => void;
}>({
  currentSelections: {},
  setCurrentSelections: () => {},
});

export const ComposableContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentSelections, setCurrentSelections] = useState<Record<string, string>>({});

  return (
    <ComposableContext.Provider value={{ currentSelections, setCurrentSelections }}>
      {children}
    </ComposableContext.Provider>
  );
};

export default ComposableContext;
