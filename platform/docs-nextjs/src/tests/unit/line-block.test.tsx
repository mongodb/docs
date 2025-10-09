import { render } from '@testing-library/react';
import LineBlock from '@/components/line-block';
import type { ParentNode } from '@/types/ast';

import mockLineBlockData from '../data/line.test.json';
const typedMockLineBlockData = mockLineBlockData as ParentNode;

it('renders correctly', () => {
  const tree = render(<LineBlock nodeChildren={typedMockLineBlockData.children} />);
  expect(tree.asFragment()).toMatchSnapshot();
});
