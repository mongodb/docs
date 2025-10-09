import { render } from '@testing-library/react';
import Line from '@/components/line';
import type { ParentNode } from '@/types/ast';

import mockLineData from '../data/line.test.json';
const typedMockLineData = mockLineData as ParentNode;
import mockLineEmptyData from '../data/line-empty.test.json';
const typedMockLineEmptyData = mockLineEmptyData as ParentNode;

it('renders correctly', () => {
  const tree = render(<Line nodeChildren={typedMockLineData.children} />);
  expect(tree.asFragment()).toMatchSnapshot();
});

it('renders an empty Line node correctly', () => {
  const tree = render(<Line nodeChildren={typedMockLineEmptyData.children} />);
  expect(tree.asFragment()).toMatchSnapshot();
});
