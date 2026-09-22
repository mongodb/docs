import { render, screen, fireEvent } from '@testing-library/react';
import InternalPageNav from '@/mdx-components/InternalPageNav/internal-page-nav';
import { mockLocation } from '@/tests/utils/mock-location';
import { navigateToDocsPath } from '@/utils/navigate-to-docs-path';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => '/changestreams/',
}));

jest.mock('@/utils/navigate-to-docs-path', () => ({
  navigateToDocsPath: jest.fn(),
}));

const mockNavigate = navigateToDocsPath as jest.Mock;

jest.mock('@/utils/use-snooty-metadata', () => ({
  useSnootyMetadata: () => ({ project: 'docs' }),
}));

jest.mock('@/context/version-context', () => ({
  useVersionContext: () => ({
    activeVersions: {},
    availableVersions: {},
    siteBasePrefixWithVersion: 'docs/manual',
  }),
}));

jest.mock('@/context/page-context', () => ({
  usePageContext: () => ({ slug: 'changestreams' }),
}));

// Legacy and EOL TOC trees are still authored with mixed-case slugs.
const mockTocTree = [
  {
    label: 'MongoDB Manual',
    items: [
      {
        label: 'Manual',
        group: true,
        items: [
          { label: 'Aggregation', url: '/docs/manual/Aggregation', contentSite: 'docs' },
          { label: 'Change Streams', url: '/docs/manual/changeStreams', contentSite: 'docs' },
          { label: 'Time Series', url: '/docs/manual/timeSeries', contentSite: 'docs' },
        ],
      },
    ],
  },
];

jest.mock('@/context/unified-toc-context', () => ({
  useUnifiedToc: () => ({ tocTree: mockTocTree }),
}));

describe('InternalPageNav', () => {
  beforeEach(() => {
    // The current page's own TOC entry is mixed-case; its route is lowercase.
    mockLocation({ pathname: '/docs/manual/changestreams' });
    mockPush.mockClear();
    mockNavigate.mockClear();
  });

  it('finds the current page in a mixed-case TOC and links to lowercase URLs', () => {
    render(<InternalPageNav />);

    expect(screen.getByTitle('Previous Section')).toHaveAttribute('href', '/docs/manual/aggregation/');
    expect(screen.getByTitle('Next Section')).toHaveAttribute('href', '/docs/manual/timeseries/');
  });

  it('renders hrefs with a single /docs prefix', () => {
    render(<InternalPageNav />);

    const prevHref = screen.getByTitle('Previous Section').getAttribute('href');
    const nextHref = screen.getByTitle('Next Section').getAttribute('href');

    expect(prevHref).toBe('/docs/manual/aggregation/');
    expect(nextHref).toBe('/docs/manual/timeseries/');
    expect(prevHref).not.toMatch(/\/docs\/docs\//);
    expect(nextHref).not.toMatch(/\/docs\/docs\//);
  });

  it('does not programmatically navigate on a primary click', () => {
    render(<InternalPageNav />);

    fireEvent.click(screen.getByTitle('Next Section'));

    expect(mockPush).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('does not navigate the current tab on Command-click', () => {
    render(<InternalPageNav />);

    const notCancelled = fireEvent.click(screen.getByTitle('Next Section'), { metaKey: true });

    expect(notCancelled).toBe(true);
    expect(mockPush).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
