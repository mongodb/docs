import { render } from '@testing-library/react';
import Include from '@/components/include';
import type { ParentNode } from '@/types/ast';

import mockData from '../data/include.test.json';
const typedMockData = mockData as ParentNode;

// Skip until structured data has been migrated
it('renders correctly', () => {
  const tree = render(<Include nodeChildren={typedMockData.children} />);
  expect(tree.asFragment()).toMatchSnapshot();
});
