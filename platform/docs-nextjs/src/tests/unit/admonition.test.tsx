import React from 'react';
import { render } from '@testing-library/react';
import Admonition from '@/components/admonition';
import { AdmonitionNode } from '@/types/ast';

import mockData from '../data/admonition.test.json';
const typedMockData = mockData as AdmonitionNode;

it('admonitions render correctly', () => {
  const tree = render(<Admonition nodeData={typedMockData} />);
  expect(tree.asFragment()).toMatchSnapshot();
});
