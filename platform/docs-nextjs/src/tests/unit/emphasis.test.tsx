import { render } from '@testing-library/react';
import Emphasis from '@/components/emphasis';
import type { EmphasisNode } from '@/types/ast';

import mockData from '@/tests/data/emphasis.test.json';
const typedMockData = mockData as EmphasisNode;

it('renders correctly', () => {
  const tree = render(<Emphasis value={typedMockData.children[0].value} />);
  expect(tree.asFragment()).toMatchSnapshot();
});
