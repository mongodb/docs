import { render } from '@testing-library/react';
import Reference from '@/components/reference';
import { mockLocation } from '@/tests/utils/mock-location';
import type { ReferenceNode } from '@/types/ast';
import { useSnootyMetadata } from '@/utils/use-snooty-metadata';

import mockData from '../data/reference.test.json';
const typedMockData = mockData as ReferenceNode;

jest.mock('@/utils/use-snooty-metadata', () => ({
  useSnootyMetadata: jest.fn(),
}));

beforeAll(() => {
  mockLocation({ hash: '' });
  (useSnootyMetadata as jest.Mock).mockImplementation(() => ({ project: 'docs-node', branch: 'v4.9' }));
});

it('renders correctly', () => {
  const tree = render(<Reference nodeChildren={typedMockData.children} refuri={typedMockData.refuri} />);
  expect(tree.asFragment()).toMatchSnapshot();
});
