import { render } from '@testing-library/react';
import Breadcrumbs from '@/components/breadcrumbs/index';

// Mock BreadcrumbContainer
jest.mock('@/components/breadcrumbs/breadcrumb-container', () => {
  return function MockBreadcrumbContainer({ breadcrumbs }: { breadcrumbs: Array<{ title: string; path: string }> }) {
    return (
      <div data-testid="breadcrumb-container">
        {breadcrumbs.map((crumb, index) => (
          <span key={index} data-testid={`breadcrumb-${index}`}>
            {crumb.title}
          </span>
        ))}
      </div>
    );
  };
});

// Mock usePageContext
const mockSlug = 'test/slug';
jest.mock('@/context/page-context', () => ({
  usePageContext: () => ({
    slug: mockSlug,
  }),
}));

// Mock useVersionContext
const mockSiteBasePrefix = '/docs';
jest.mock('@/context/version-context', () => ({
  useVersionContext: () => ({
    siteBasePrefixWithVersion: mockSiteBasePrefix,
  }),
}));

// Mock useProcessedUnifiedToc
const mockTocTree = [
  {
    label: 'Test Section',
    newUrl: '/test',
    items: [],
  },
];
jest.mock('@/hooks/use-processed-unified-toc', () => ({
  useProcessedUnifiedToc: () => mockTocTree,
}));

// Mock usePageBreadcrumbs
const mockBreadcrumbs = [
  { title: 'Docs Home', path: '/docs' },
  { title: 'Test Section', path: '/test' },
];
jest.mock('@/hooks/use-create-breadcrumbs', () => ({
  usePageBreadcrumbs: jest.fn(() => mockBreadcrumbs),
}));

describe('Breadcrumbs', () => {
  it('renders BreadcrumbContainer with breadcrumbs from usePageBreadcrumbs', () => {
    const { getByTestId, getByText } = render(<Breadcrumbs />);

    const container = getByTestId('breadcrumb-container');
    expect(container).toBeInTheDocument();

    // Verify breadcrumbs are rendered
    expect(getByText('Docs Home')).toBeInTheDocument();
    expect(getByText('Test Section')).toBeInTheDocument();
  });

  it('passes the correct breadcrumbs to BreadcrumbContainer', () => {
    const { getByTestId } = render(<Breadcrumbs />);

    const container = getByTestId('breadcrumb-container');
    const breadcrumbElements = container.querySelectorAll('[data-testid^="breadcrumb-"]');

    expect(breadcrumbElements).toHaveLength(2);
    expect(breadcrumbElements[0]).toHaveTextContent('Docs Home');
    expect(breadcrumbElements[1]).toHaveTextContent('Test Section');
  });

  it('renders with correct styling wrapper', () => {
    const { container } = render(<Breadcrumbs />);
    const breadcrumbWrapper = container.firstChild;

    expect(breadcrumbWrapper).toBeInTheDocument();
    expect(breadcrumbWrapper).toHaveAttribute('class');
  });
});
