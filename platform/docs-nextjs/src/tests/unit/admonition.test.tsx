import { render } from '@testing-library/react';
import Admonition from '@/components/admonition';
import type { AdmonitionName, AdmonitionNode } from '@/types/ast';

import mockData from '../data/admonition.test.json';
const typedMockData = mockData as AdmonitionNode;

it('admonitions render correctly', () => {
  const tree = render(
    <Admonition
      nodeChildren={typedMockData.children}
      argument={typedMockData.argument}
      name={typedMockData.name as Exclude<AdmonitionName, 'see' | 'seealso'>}
    />,
  );
  expect(tree.asFragment()).toMatchSnapshot();
});
