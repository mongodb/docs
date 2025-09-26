import { render } from '@testing-library/react';
import type { ASTNode } from '@/types/ast';
import Footnote from '../../../src/components/footnote';
import { FootnoteProvider } from '../../../src/components/footnote/footnote-context';

import mockData from '../data/footnote.test.json';

const mountFootnotes = () =>
  render(
    <FootnoteProvider pageNodes={mockData.children as ASTNode[]}>
      <Footnote id={mockData.id} name={mockData.name} nodeChildren={mockData.children as ASTNode[]} />
    </FootnoteProvider>,
  );

it('renders correctly', () => {
  const footnotes = mountFootnotes();
  expect(footnotes.asFragment()).toMatchSnapshot();
});
