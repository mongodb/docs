import Strong from '@/components/strong';
import { render } from '@testing-library/react';
import type { StrongNode } from '@/types/ast';

import mockData from '../data/strong.test.json';
const typedMockData = mockData as StrongNode;

it('renders correctly', () => {
  const tree = render(<Strong value={typedMockData.children[0].value} />);
  expect(tree.asFragment()).toMatchSnapshot();
});
