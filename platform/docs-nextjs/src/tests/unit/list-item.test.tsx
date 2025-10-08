import { render } from '@testing-library/react';
import ListItem from '@/components/list/listItem';
import type { ListItemNode } from '@/types/ast';

import mockData from '../data/list-item.test.json';

it('ListItem renders correctly', () => {
  const tree = render(<ListItem nodeChildren={mockData.children as ListItemNode['children']} />);
  expect(tree.asFragment()).toMatchSnapshot();
});
