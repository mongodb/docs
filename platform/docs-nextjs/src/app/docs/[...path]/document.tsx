'use client';

import ComponentFactory from '@/components/component-factory';
import FootnoteContext from '@/components/footnote/footnote-context';
import { getFootnotes } from '@/components/footnote/utils';
import { getNestedValue } from '@/utils/get-nested-value';
import type { ASTNode } from '@/types/ast';
import type { ASTDocument } from '@/services/db/types';

export const Document = ({ pageDoc }: { pageDoc: ASTDocument }) => {
  const pageNodes = getNestedValue(['children'], pageDoc?.ast) || [];
  const footnotes = getFootnotes(pageNodes as ASTNode[]);

  return (
    <FootnoteContext.Provider value={{ footnotes }}>
      <ComponentFactory nodeData={pageDoc.ast} slug={pageDoc.page_path} key={pageDoc.page_id} />
    </FootnoteContext.Provider>
  );
};
