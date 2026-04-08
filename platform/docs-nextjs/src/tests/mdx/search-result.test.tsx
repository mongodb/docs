import { render } from '@testing-library/react';
import { SearchResult } from '@/mdx-components/SearchResult';
import SearchContext from '@/components/search-results/search-context';

// Mock Next.js router (required by SearchContextProvider dependencies)
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));

const defaultContextValue = {
  filters: {},
  page: 1,
  searchFilter: null,
  searchPropertyMapping: {},
  searchTerm: null,
  selectedVersion: null,
  selectedCategory: null,
  showMobileFilters: false,
  setSearchFilter: () => {},
  setSelectedVersion: () => {},
  setSelectedCategory: () => {},
  setShowMobileFilters: () => {},
  handleFacetChange: () => {},
  clearFacets: () => {},
  showFacets: false,
  searchParams: new URLSearchParams(),
  facets: [],
  facetNamesByKeyId: {},
  getFacetName: () => '',
  setPage: () => {},
  setSearchTerm: () => {},
};

const renderWithContext = (ui: React.ReactElement, contextOverrides = {}) =>
  render(<SearchContext.Provider value={{ ...defaultContextValue, ...contextOverrides }}>{ui}</SearchContext.Provider>);

describe('SearchResult', () => {
  it('renders a basic result correctly', () => {
    const tree = renderWithContext(
      <SearchResult
        title="Getting Started"
        preview="Learn how to get started with MongoDB."
        url="/docs/manual/"
        facets={null}
      />,
    );
    expect(tree.asFragment()).toMatchSnapshot();
  });

  it('renders with a learn more link', () => {
    const tree = renderWithContext(
      <SearchResult
        title="Atlas Documentation"
        preview="MongoDB Atlas is a cloud database service."
        url="/docs/atlas/"
        facets={null}
        learnMoreLink
      />,
    );
    expect(tree.asFragment()).toMatchSnapshot();
  });

  it('renders an API tag for API URLs', () => {
    const { getByText } = renderWithContext(
      <SearchResult title="Driver API" preview="API reference." url="/docs/drivers/api/node/" facets={null} />,
    );
    expect(getByText('API')).toBeTruthy();
  });

  it('renders facet tags when showFacets is true', () => {
    const facets = [{ id: 'atlas', key: 'target_product' }];
    const { getAllByText } = renderWithContext(
      <SearchResult title="Atlas" preview="Cloud database." url="/docs/atlas/" facets={facets} />,
      {
        showFacets: true,
        getFacetName: (facet: { key: string; id: string }) => (facet.id === 'atlas' ? 'Atlas' : ''),
      },
    );
    expect(getAllByText('Atlas').length).toBeGreaterThan(0);
  });
});
