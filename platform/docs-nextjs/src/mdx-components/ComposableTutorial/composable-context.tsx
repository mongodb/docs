'use client';

import { createContext, useState } from 'react';

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
