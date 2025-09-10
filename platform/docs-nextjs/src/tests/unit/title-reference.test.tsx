import { render } from '@testing-library/react';
import TitleReference from '@/components/title-reference';
import type { TitleReferenceNode } from '@/types/ast';

// data for this component
import mockData from '../data/title-reference.test.json';
const typedMockData = mockData as TitleReferenceNode;

it('renders correctly', () => {
  const tree = render(<TitleReference value={typedMockData.children[0].value} />);
  expect(tree.asFragment()).toMatchSnapshot();
});
