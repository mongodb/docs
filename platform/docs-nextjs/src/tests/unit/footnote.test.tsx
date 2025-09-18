import { render } from '@testing-library/react';
import type { ASTNode } from '@/types/ast';
import Footnote from '../../../src/components/footnote';
import FootnoteContext, { type FootnoteType } from '../../../src/components/footnote/footnote-context';

import mockData from '../data/footnote.test.json';

const mountFootnotes = (footnotes: Record<string, FootnoteType>) =>
  render(
    <FootnoteContext.Provider value={{ footnotes: footnotes }}>
      <Footnote id={mockData.id} name={mockData.name} nodeChildren={mockData.children as ASTNode[]} />
    </FootnoteContext.Provider>,
  );

const mockFootnotes = { 1: { label: 1, references: ['id1'] } };

it('renders correctly', () => {
  const footnotes = mountFootnotes(mockFootnotes);
  expect(footnotes.asFragment()).toMatchSnapshot();
});
