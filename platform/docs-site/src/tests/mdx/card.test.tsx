import { render } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import Card from '@/mdx-components/Card';
import { CardGroupContextProvider } from '@/mdx-components/Card/card-group-context';
import { mockLocation } from '@/tests/utils/mock-location';
import { theme } from '@/styles/theme';
import { useSnootyMetadata } from '@/utils/use-snooty-metadata';
import { navigateToDocsPath } from '@/utils/navigate-to-docs-path';

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
    siteBasePrefixWithVersion: 'docs/languages/node/v4.9',
  }),
}));

jest.mock('@/utils/navigate-to-docs-path', () => ({
  navigateToDocsPath: jest.fn(),
}));

const mockNavigate = navigateToDocsPath as jest.Mock;

beforeAll(() => {
  mockLocation({ search: '', pathname: `/` });
  (useSnootyMetadata as jest.Mock).mockImplementation(() => ({ project: 'docs-node', branch: 'v4.9' }));
});

beforeEach(() => {
  jest.clearAllMocks();
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

const clickCard = (url: string) => {
  const { getByText } = render(
    <ThemeProvider theme={theme}>
      <CardGroupContextProvider
        isCompact={true}
        isExtraCompact={false}
        isCenterContentStyle={false}
        isLargeIconStyle={false}
      >
        <Card {...cardProps} url={url}>
          Test card paragraph
        </Card>
      </CardGroupContextProvider>
    </ThemeProvider>,
  );

  getByText('Test card headline').click();
};

describe('urls passed to Card', () => {
  // The card must hand the navigator the full `/docs/...` path and let it decide
  // between the router and a full page load. Calling router.push directly here
  // made Next prepend the basePath a second time (`/docs/docs/development`).
  test.each([
    ['/foo', '/docs/languages/node/v4.9/foo'],
    ['/foo/', '/docs/languages/node/v4.9/foo/'],
  ])('prefixes the relative url %s with the site base prefix', (url, expected) => {
    clickCard(url);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(expect.anything(), expected);
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('leaves absolute urls untouched', () => {
    const url = 'https://university.mongodb.com/courses/M001/about';

    clickCard(url);

    expect(mockNavigate).toHaveBeenCalledWith(expect.anything(), url);
  });
});
