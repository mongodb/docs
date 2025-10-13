import { render } from '@testing-library/react';
import Reference from '@/components/reference';
import { mockLocation } from '@/tests/utils/mock-location';
import type { ReferenceNode } from '@/types/ast';

import mockData from '../data/reference.test.json';
const typedMockData = mockData as ReferenceNode;

beforeAll(() => {
  mockLocation({ hash: '' });
});

it('renders correctly', () => {
  const tree = render(<Reference nodeChildren={typedMockData.children} refuri={typedMockData.refuri} />);
  expect(tree.asFragment()).toMatchSnapshot();
});
