import React from 'react';
import { render } from '@testing-library/react';
import Target from '@/components/target';
import { mockLocation } from '@/tests/utils/mock-location';

// data for this component
import mockData from '@/tests/data/target.test.json';
import { ASTNode } from '@/types/ast';

beforeAll(() => {
  mockLocation({hash: ''});
});

it('renders correctly with a directive_argument node', () => {
  const tree = render(<Target nodeChildren={mockData.a.children as ASTNode[]} html_id={mockData.a.html_id} name={mockData.a.name}/>);
  expect(tree.asFragment()).toMatchSnapshot();
});

it('renders correctly with no directive_argument nodes', () => {
  const tree = render(<Target nodeChildren={mockData.b.children as ASTNode[]} html_id={mockData.b.html_id} name={mockData.b.name}/>);
  expect(tree.asFragment()).toMatchSnapshot();
});
