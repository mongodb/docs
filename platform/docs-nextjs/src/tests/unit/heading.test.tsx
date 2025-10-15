import { render } from '@testing-library/react';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import Heading from '@/components/heading';
import type { HeadingNode } from '@/types/ast';

import mockData from '../data/heading.test.json';
const typedMockData = mockData as HeadingNode;

it.skip('renders correctly', () => {
  const tree = render(<Heading nodeChildren={typedMockData.children} sectionDepth={3} id={typedMockData.id} />);
  expect(tree.asFragment()).toMatchSnapshot();
});

it.skip('renders correctly in dark mode', () => {
  const tree = render(
    <LeafyGreenProvider darkMode={true}>
      <Heading nodeChildren={typedMockData.children} sectionDepth={3} id={typedMockData.id} />
    </LeafyGreenProvider>,
  );
  expect(tree.asFragment()).toMatchSnapshot();
});
