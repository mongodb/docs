'use client';

import { createContext, useContext } from 'react';
import { getFootnotes } from '@/components/footnote/utils';
import type { ASTNode } from '@/types/ast';

export interface FootnoteType {
  references: string[];
  label: number;
}

interface FootnoteContextType {
  footnotes: Record<string, FootnoteType>;
}

const FootnoteContext = createContext<FootnoteContextType>({
  footnotes: {},
});

export const useFootnotes = () => {
  const context = useContext(FootnoteContext);

  if (!context) throw new Error('useFootnotes must be used within a FootnoteProvider');

  return context;
};

interface FootnoteProviderProps {
  children: React.ReactNode;
  pageNodes: ASTNode[];
}

export const FootnoteProvider = ({ children, pageNodes }: FootnoteProviderProps) => {
  const footnotes = getFootnotes(pageNodes);

  return <FootnoteContext.Provider value={{ footnotes }}>{children}</FootnoteContext.Provider>;
};
