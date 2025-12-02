import { render } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import { mockLocation } from '@/tests/utils/mock-location';
import Card from '@/components/card';
import { theme } from '@/styles/theme';

// data for this component
import mockData from '@/tests/data/card.test.json';
import type { CardNode } from '@/types/ast';
import { useSnootyMetadata } from '@/utils/use-snooty-metadata';

// Mock the useRouter hook from next/navigation
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  usePathname: () => ({}),
}));

// Mock the PageContext
jest.mock('@/context/page-context', () => ({
  usePageContext: () => ({
    template: 'default',
  }),
}));

// Mock snootyMetadata
jest.mock('@/utils/use-snooty-metadata', () => ({
  useSnootyMetadata: jest.fn(),
}));

// Mock the VersionContext
jest.mock('@/context/version-context', () => ({
  useVersionContext: () => ({
    siteBasePrefix: 'university',
  }),
}));

beforeAll(() => {
  mockLocation({ search: '', pathname: `/` });
  (useSnootyMetadata as jest.Mock).mockImplementation(() => ({ project: 'docs-node', branch: 'v4.9' }));
});

it('renders correctly', () => {
  const cardNode = mockData as CardNode;
  const tree = render(
    <ThemeProvider theme={theme}>
      <Card nodeChildren={cardNode.children} {...cardNode.options} />
    </ThemeProvider>,
  );
  expect(tree.asFragment()).toMatchSnapshot();
});

describe('relative urls passed to Card', () => {
  test.each([
    ['/foo', 1],
    ['/foo/', 2],
    ['foo', 3],
  ])('should use router.push function to navigate to %s', (url, expectedCalls) => {
    const cardNode = mockData as CardNode;
    cardNode.options.url = url;
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Card nodeChildren={cardNode.children} {...cardNode.options} isCompact={true} />
      </ThemeProvider>,
    );

    getByText('Test card headline').click();

    // Verify that router.push was called with the expected URL
    expect(mockPush).toHaveBeenCalledTimes(expectedCalls);
    expect(mockPush).toHaveBeenCalledWith(url);
  });
});
