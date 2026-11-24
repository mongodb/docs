import { render } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import Card from '@/mdx-components/Card';
import { CardGroupContextProvider } from '@/mdx-components/Card/card-group-context';
import { mockLocation } from '@/tests/utils/mock-location';
import { theme } from '@/styles/theme';
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

const cardProps = {
  headline: 'Test card headline',
  cta: 'Test card CTA',
  url: 'https://university.mongodb.com/courses/M001/about',
  icon: '/images/icons/university.svg',
  'icon-alt': 'MongoDB University icon',
  checksum: '5a77a5f2c1d7ceec1423bad1f60110583c6c4a9a9c6e683c8f98d95b7b250c02',
};

it('renders correctly', () => {
  const tree = render(
    <ThemeProvider theme={theme}>
      <Card {...cardProps}>Test card paragraph</Card>
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
    cardProps.url = url;
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <CardGroupContextProvider
          isCompact={true}
          isExtraCompact={false}
          isCenterContentStyle={false}
          isLargeIconStyle={false}
        >
          <Card {...cardProps}>Test card paragraph</Card>
        </CardGroupContextProvider>
      </ThemeProvider>,
    );

    getByText('Test card headline').click();

    // Verify that router.push was called with the expected URL
    expect(mockPush).toHaveBeenCalledTimes(expectedCalls);
    expect(mockPush).toHaveBeenCalledWith(url);
  });
});
