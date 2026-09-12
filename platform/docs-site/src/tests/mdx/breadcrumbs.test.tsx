import { render, screen } from '@testing-library/react';
import Breadcrumbs from '@/mdx-components/Breadcrumbs';
import { mockLocation } from '@/tests/utils/mock-location';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => '/aggregation/pipeline/',
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
  usePageContext: () => ({ slug: 'aggregation/pipeline' }),
}));

// Legacy and EOL TOC trees are still authored with mixed-case slugs.
const mockTocTree = [
  {
    label: 'Aggregation',
    url: '/docs/manual/Aggregation',
    contentSite: 'docs',
    items: [{ label: 'Pipeline', url: '/docs/manual/Aggregation/Pipeline', contentSite: 'docs' }],
  },
];

jest.mock('@/context/unified-toc-context', () => ({
  useUnifiedToc: () => ({ tocTree: mockTocTree }),
}));

describe('Breadcrumbs', () => {
  beforeEach(() => {
    mockLocation({ pathname: '/docs/manual/aggregation/pipeline' });
  });

  it('links to the lowercase URL for a mixed-case ancestor', () => {
    render(<Breadcrumbs />);

    // One set per screen-size layout; all three render in jsdom.
    const hrefs = [...new Set(screen.getAllByRole('link').map((a) => a.getAttribute('href')))];
    expect(hrefs).toEqual(['/docs/', '/docs/manual/aggregation/']);
  });
});
