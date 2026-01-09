import { render } from '@testing-library/react';

import mockData from '../data/paragraph.test.json';
import mockDataFormat from '../data/paragraph-format.test.json';
import Paragraph from '@/components/paragraph';
import type { ParagraphNode } from '@/types/ast';

const typedMockData = mockData as ParagraphNode;
const typedMockDataFormat = mockDataFormat as ParagraphNode;

describe('Paragraph unit tests', () => {
  it('renders correctly', () => {
    const tree = render(<Paragraph nodeChildren={typedMockData.children} />);
    expect(tree.asFragment()).toMatchSnapshot();
  });

  it('handles formatting dangling punctuation after Links and no extra multiplying on rerenders', () => {
    const tree = render(<Paragraph nodeChildren={typedMockDataFormat.children} />);
    expect(tree.asFragment()).toMatchSnapshot();
    const treeRerender = render(<Paragraph nodeChildren={typedMockDataFormat.children} />);
    expect(treeRerender.asFragment()).toMatchSnapshot();
  });
});
