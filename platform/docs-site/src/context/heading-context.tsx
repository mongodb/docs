'use client';

import type { ReactNode } from 'react';
import { createContext, useContext } from 'react';

interface HeadingContextType {
  lastHeading: string;
  ignoreNextHeading: boolean;
  sectionDepth: number;
}

const defaultVal: HeadingContextType = {
  lastHeading: '',
  ignoreNextHeading: false,
  sectionDepth: 1, // Default to depth 1 (basically H2 level)
};

const HeadingContext = createContext<HeadingContextType>(defaultVal);

type HeadingContextProviderProps = {
  children: ReactNode;
  heading?: string;
  ignoreNextHeading?: boolean;
  sectionDepth?: number; // Optional override, otherwise increments from parent
};

/**
 * Context provider to help track of page headings and section depth for headings.
 * Headings are pushed into a list, with the last being the nearest heading, upwards in the AST tree.
 * Section depth automatically increments as components nest, eliminating the need for prop drilling.
 * Designed to be called in the init, so each child node of sections
 * as consumers can access the section header and depth.
 */
const HeadingContextProvider = ({
  children,
  heading,
  ignoreNextHeading = false,
  sectionDepth,
}: HeadingContextProviderProps) => {
  const { lastHeading: prevHeading, ignoreNextHeading: skipHeading, sectionDepth: parentDepth } = useHeadingContext();

  const newHeading = skipHeading || !heading ? prevHeading : heading;
  // If sectionDepth is explicitly provided, use it; otherwise increment from parent
  const newDepth = sectionDepth !== undefined ? sectionDepth : parentDepth + 1;

  return (
    <HeadingContext.Provider
      value={{
        lastHeading: newHeading,
        ignoreNextHeading: ignoreNextHeading ?? false,
        sectionDepth: newDepth,
      }}
    >
      {children}
    </HeadingContext.Provider>
  );
};

const useHeadingContext = () => {
  return useContext(HeadingContext);
};

export { HeadingContextProvider, useHeadingContext };
