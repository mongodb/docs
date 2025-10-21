import Field from '@/components/field-list/field';
import { render } from '@testing-library/react';
import type { FieldListNode } from '@/types/ast';

import mockData from '../data/field-list.test.json';
const typedMockData = mockData as FieldListNode;

it('renders correctly', () => {
  const fieldNode = typedMockData.children[0];
  const tree = render(<Field nodeChildren={fieldNode.children} label={fieldNode.label} name={fieldNode.name} />);
  expect(tree.asFragment()).toMatchSnapshot();
});
