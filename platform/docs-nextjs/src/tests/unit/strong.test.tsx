import Strong from '@/components/strong';
import { render } from '@testing-library/react';
import { StrongNode } from '@/types/ast';

// data for this component
import mockData from '../data/strong.test.json';
const typedMockData = mockData as StrongNode;

it('renders correctly', () => {
  const tree = render(<Strong value={typedMockData.children[0].value} />);
  expect(tree.asFragment()).toMatchSnapshot();
});
