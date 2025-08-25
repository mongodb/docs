import { render } from '@testing-library/react';
import Section from '@/components/section';
import type { ParentNode } from '@/types/ast';

import mockData from '../data/section.test.json';
const typedMockData = mockData as ParentNode;

// TODO: Remove .skip once includes are supported
it.skip('renders correctly', () => {
  const tree = render(<Section nodeChildren={typedMockData.children} />);
  expect(tree.asFragment()).toMatchSnapshot();
});
