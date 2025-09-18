'use client';

import { createContext } from 'react';

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

export default FootnoteContext;
