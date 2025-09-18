import { render } from '@testing-library/react';
import Literal from '@/components/literal';
import type { LiteralNode } from '@/types/ast';

// data for this component
import mockData from '../data/literal.test.json';
const typedMockData = mockData as LiteralNode;

it('renders correctly', () => {
  const tree = render(<Literal nodeChildren={typedMockData.children} />);
  expect(tree.asFragment()).toMatchSnapshot();
});
