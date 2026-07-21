'use client';

import { createContext } from 'react';

const CardGroupContext = createContext<Omit<CardGroupContextProps, 'children'>>({
  isCompact: false,
  isExtraCompact: false,
  isCenterContentStyle: false,
  isLargeIconStyle: false,
});

type CardGroupContextProps = {
  children: React.ReactNode;
  isCompact: boolean;
  isExtraCompact: boolean;
  isCenterContentStyle: boolean;
  isLargeIconStyle: boolean;
};

export const CardGroupContextProvider = ({
  children,
  isCompact,
  isExtraCompact,
  isCenterContentStyle,
  isLargeIconStyle,
}: CardGroupContextProps) => {
  return (
    <CardGroupContext.Provider value={{ isCompact, isExtraCompact, isCenterContentStyle, isLargeIconStyle }}>
      {children}
    </CardGroupContext.Provider>
  );
};

export default CardGroupContext;
