import { render } from '@testing-library/react';
import { CommunityPillLink } from '@/mdx-components/CommunityPillLink';
import { useSnootyMetadata } from '@/utils/use-snooty-metadata';

jest.mock('@/utils/use-snooty-metadata', () => ({
  useSnootyMetadata: jest.fn(),
}));

beforeAll(() => {
  (useSnootyMetadata as jest.Mock).mockImplementation(() => ({ project: 'docs-node', branch: 'v4.9' }));
});

it('community drivers directives render correctly', () => {
  const tree = render(<CommunityPillLink url="https://example.com">MongoEngine for Flask</CommunityPillLink>);
  expect(tree.asFragment()).toMatchSnapshot();
});
