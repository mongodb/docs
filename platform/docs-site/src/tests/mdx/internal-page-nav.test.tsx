import { render, screen, fireEvent } from '@testing-library/react';
import InternalPageNav from '@/mdx-components/InternalPageNav/internal-page-nav';
import { mockLocation } from '@/tests/utils/mock-location';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => '/changestreams/',
}));

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
  });

  it('finds the current page in a mixed-case TOC and links to lowercase URLs', () => {
    render(<InternalPageNav />);

    expect(screen.getByTitle('Previous Section')).toHaveAttribute('href', '/docs/manual/aggregation/');
    expect(screen.getByTitle('Next Section')).toHaveAttribute('href', '/docs/manual/timeseries/');
  });

  // The click handler routes past the normalization Link applies to the href.
  it('pushes the canonical URL on click', () => {
    render(<InternalPageNav />);

    fireEvent.click(screen.getByTitle('Next Section'));

    expect(mockPush).toHaveBeenCalledWith('/docs/manual/timeseries/');
  });
});
