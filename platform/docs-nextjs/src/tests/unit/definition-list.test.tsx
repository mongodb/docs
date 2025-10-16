import DefinitionList from '@/components/definition-list';
import { render } from '@testing-library/react';
import type { DefinitionListNode } from '@/types/ast';

import mockData from '@/tests/data/definition-list.test.json';
const typedMockData = mockData as DefinitionListNode;

it('DefinitionList renders correctly', () => {
  const tree = render(<DefinitionList nodeChildren={typedMockData.children} />);
  expect(tree.asFragment()).toMatchSnapshot();
});
