"use client"

import { createContext, ReactNode, useContext } from 'react';

interface HeadingContextType {
  lastHeading: string;
  ignoreNextHeading: boolean;
}

const defaultVal = {
  lastHeading: '',
  ignoreNextHeading: false,
};

const HeadingContext = createContext<HeadingContextType>(defaultVal);

type HeadingContextProviderProps = {
  children: ReactNode;
  heading?: string;
  ignoreNextHeading?: boolean;
};

/**
 * Context provider to help track of page headings until the consuming component.
 * Headings are pushed into a list, with the last being the nearest heading, upwards in the AST tree.
 * Designed to be called in the init, so each child node of sections
 * as consumers can access the section header.
 */
const HeadingContextProvider = ({
  children,
  heading,
  ignoreNextHeading = false,
}: HeadingContextProviderProps) => {
  const { lastHeading: prevHeading, ignoreNextHeading: skipHeading } =
    useHeadingContext();

  const newHeading = skipHeading || !heading ? prevHeading : heading;

  return (
    <HeadingContext.Provider
      value={{
        lastHeading: newHeading,
        ignoreNextHeading: ignoreNextHeading ?? false,
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
