import { render } from '@testing-library/react';
import CommunityPillLink from '@/components/community-pill-link';
import type { CommunityDriverPill } from '@/types/ast';
import { useSnootyMetadata } from '@/utils/use-snooty-metadata';

// data for this component
import mockData from '../data/community-pill-link.test.json';

jest.mock('@/utils/use-snooty-metadata', () => ({
  useSnootyMetadata: jest.fn(),
}));

beforeAll(() => {
  (useSnootyMetadata as jest.Mock).mockImplementation(() => ({ project: 'docs-node', branch: 'v4.9' }));
});

it('community drivers directives render correctly', () => {
  const { argument, options } = mockData as CommunityDriverPill;
  const tree = render(<CommunityPillLink argument={argument} options={options} />);
  expect(tree.asFragment()).toMatchSnapshot();
});
