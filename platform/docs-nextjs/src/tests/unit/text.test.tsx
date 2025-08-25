import Text from '@/components/text';
import { render } from '@testing-library/react';
import { TextNode } from '@/types/ast';

import mockData from '../data/text.test.json';
const typedMockData = mockData as TextNode;

it('renders correctly', () => {
  const tree = render(<Text value={typedMockData.value} />);
  expect(tree.asFragment()).toMatchSnapshot();
});
