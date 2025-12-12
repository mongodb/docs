// Tests for the search results page
import { render, within, waitFor, type RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
// Importing all specifically to use jest spyOn, mockImplementation for mocking
import { mockLocation } from '@/tests/utils/mock-location';
import { tick, setMobile } from '@/tests/utils';
import SearchResults from '@/components/search-results/search-results';
import { SearchContextProvider } from '@/components/search-results/search-context';
import * as searchPropertyMappingApi from '@/utils/search-property-mapping';
import mockInputData from '@/tests/data/marian-manifests.json';
import { FILTERED_RESULT, mockMarianFetch, UNFILTERED_RESULT } from '@/tests/utils/mock-marian-fetch';

const MOBILE_SEARCH_BACK_BUTTON_TEXT = 'Back to search results';

// Mock Next.js router
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useSearchParams: () => {
    const params = new URLSearchParams(window.location.search);
    return params;
  },
}));

// Mock LG Checkbox component to avoid potential React incompatibilities with testing:
// "Error: Uncaught [TypeError: e.addEventListener is not a function]"
jest.mock('@leafygreen-ui/checkbox', () => {
  const MockCheckbox = ({
    label,
    checked,
    indeterminate,
  }: {
    label: string;
    checked: boolean;
    indeterminate: boolean;
  }) => (
    <div data-checked={checked} data-indeterminate={indeterminate}>
      {label}
    </div>
  );
  MockCheckbox.displayName = 'Checkbox';
  return MockCheckbox;
});

// Check the search results include the property-filtered results
const expectFilteredResults = (wrapper: RenderResult) => {
  expect(wrapper.queryAllByText('Realm').length).toBe(3);
  expect(wrapper.queryAllByText('Latest').length).toBe(3);

  // Check the search result card displays content according to the response
  expect(wrapper.queryAllByText(FILTERED_RESULT.title)).toBeTruthy();
  expect(wrapper.queryAllByText(FILTERED_RESULT.preview)).toBeTruthy();
  expect(wrapper.queryAllByText(UNFILTERED_RESULT.title).length).toBe(0);

  // Check the result does link to the provided doc
  expect(wrapper.queryAllByText(/stitch/)[1].closest('a')).toHaveProperty(
    'href',
    `http://localhost/${FILTERED_RESULT.url}/`,
  );

  // Check the dropdowns are filled in
  expectValuesForFilters(wrapper, 'Realm', 'Latest');
};

// filters are not shown until dropdown is opened
// open filters by clicking select buttons first
const expectValuesForFilters = (wrapper: RenderResult, category: string, version: string) => {
  const selectElements = wrapper.queryAllByTestId('lg-select');

  expect(selectElements[0].textContent).toBe(category);
  expect(selectElements[1].textContent).toBe(version);
};

// Unfiltered search results should still display tags for category and version on card
const expectUnfilteredSearchResultTags = (wrapper: RenderResult) => {
  expect(wrapper.queryAllByText('Realm').length).toBe(1);
  expect(wrapper.queryAllByText('Latest').length).toBe(1);
};

// Check the search results match the expected unfiltered results
const expectUnfilteredResults = (wrapper: RenderResult) => {
  expect(wrapper.queryAllByText(/no filters/).length).toBe(2);

  // Check the search result card displays content according to the response
  expect(wrapper.queryAllByText(UNFILTERED_RESULT.title)).toBeTruthy();
  expect(wrapper.queryAllByText(UNFILTERED_RESULT.preview)).toBeTruthy();
  expect(wrapper.queryAllByText(FILTERED_RESULT.title).length).toBe(0);

  // Check the result does link to the provided doc
  expect(wrapper.queryAllByText(/stitch/)[1].closest('a')).toHaveProperty(
    'href',
    `http://localhost/${UNFILTERED_RESULT.url}/`,
  );

  // Check the dropdowns are not filled in
  expect(wrapper.getByTestId('category-select').textContent).toContain('Filter by Category');
  expect(wrapper.getByTestId('version-select').textContent).toContain('Filter by Version');
};

const filterByRealm = async (wrapper: RenderResult) => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  const button = wrapper.getByTestId('category-select');
  expect(button).toHaveAttribute('aria-expanded', 'false');

  await act(async () => {
    await user.click(button);
    jest.runOnlyPendingTimers();
    await tick();
  });

  await act(async () => {
    jest.runOnlyPendingTimers();
    await tick();
  });
  expect(button).toHaveAttribute('aria-expanded', 'true');

  const listbox = wrapper.getByRole('listbox');
  const realmOption = within(listbox).getByText('Realm');
  await act(async () => {
    await user.click(realmOption);
    jest.runOnlyPendingTimers();
    await tick();
  });

  await act(async () => {
    jest.runOnlyPendingTimers();
    await tick();
  });
  expect(button).toHaveTextContent('Realm');
};

const openMobileSearch = async (wrapper: RenderResult) => {
  const refineSearchButton = wrapper.queryAllByText('Refine your search')[0].closest('button');
  expect(refineSearchButton).toBeDefined();
  if (!refineSearchButton) {
    throw new Error('Refine search button not found');
  }

  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  await act(async () => {
    await user.click(refineSearchButton);
    jest.runOnlyPendingTimers();
    await tick();
  });
};

const clearAllFilters = async (wrapper: RenderResult, screenSize?: string) => {
  let queryIndex = 1;
  if (screenSize === 'mobile') {
    queryIndex = 0;
  }

  const clearAllFiltersButton = wrapper.queryAllByText('Clear all filters')[queryIndex].closest('button');
  expect(clearAllFiltersButton).toBeDefined();
  if (!clearAllFiltersButton) {
    throw new Error('Clear all filters button not found');
  }

  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  await act(async () => {
    await user.click(clearAllFiltersButton);
    jest.runOnlyPendingTimers();
    await tick();
  });
};

function renderSearchResults() {
  return render(
    <SearchContextProvider>
      <SearchResults />
    </SearchContextProvider>,
  );
}

describe('Search Results Page', () => {
  jest.useFakeTimers();

  beforeEach(() => {
    jest
      .spyOn(searchPropertyMappingApi, 'fetchSearchPropertyMapping')
      .mockImplementation(() => Promise.resolve(mockInputData.searchPropertyMapping));
    mockPush.mockClear();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  beforeAll(() => {
    window.fetch = mockMarianFetch as any; // eslint-disable-line @typescript-eslint/no-explicit-any
  });

  afterAll(() => {
    window.fetch = null as any; // eslint-disable-line @typescript-eslint/no-explicit-any
  });

  it('renders correctly without browser', async () => {
    mockLocation({});
    let tree: RenderResult;
    await act(async () => {
      tree = renderSearchResults();
    });
    await waitFor(() => {
      expect(tree.asFragment()).toMatchSnapshot();
    });
  });

  it('renders loading images before returning nonempty results', async () => {
    mockLocation({ search: '?q=stitch' });
    const renderLoadingSkeletonImgs = renderSearchResults();
    expect(renderLoadingSkeletonImgs.asFragment()).toMatchSnapshot();
  });

  it('renders loading images before returning no results', async () => {
    mockLocation({ search: '?q=noresultsreturned' });
    const renderLoadingSkeletonImgs = renderSearchResults();
    expect(renderLoadingSkeletonImgs.asFragment()).toMatchSnapshot();
  });

  it('renders no results found correctly if query returns nothing', async () => {
    let renderEmptyResults: RenderResult;
    mockLocation({ search: '?q=noresultsreturned' });
    await act(async () => {
      renderEmptyResults = renderSearchResults();
    });
    await waitFor(() => {
      expect(renderEmptyResults.queryAllByText('No results found')).toBeTruthy();
    });
  });

  it('renders search landing page if no query made', async () => {
    let renderSearchLanding: RenderResult;
    mockLocation({});
    await act(async () => {
      renderSearchLanding = renderSearchResults();
    });
    await waitFor(() => {
      expect(expect(renderSearchLanding.queryAllByText('Search MongoDB Documentation')).toBeTruthy());
    });
  });

  it('renders results from a given search term query param and displays category and version tags', async () => {
    let renderStitchResults: RenderResult;
    mockLocation({ search: '?q=stitch&page=1' });
    await act(async () => {
      renderStitchResults = renderSearchResults();
    });
    await waitFor(() => {
      expect(renderStitchResults.asFragment()).toMatchSnapshot();
      expectUnfilteredSearchResultTags(renderStitchResults);
      expectUnfilteredResults(renderStitchResults);
    });
  });

  it('considers a given search filter query param and displays category and version tags', async () => {
    let renderStitchResults: RenderResult;
    mockLocation({ search: '?q=stitch&page=1&searchProperty=realm-master' });
    await act(async () => {
      renderStitchResults = renderSearchResults();
    });
    await waitFor(() => {
      expect(renderStitchResults!.asFragment()).toMatchSnapshot();
    });
    expectFilteredResults(renderStitchResults!);
  });

  it('does not return results for a given search term with an ill-formed searchProperty', async () => {
    let renderStitchResults: RenderResult;
    mockLocation({ search: '?q=testestestestestest' });
    await act(async () => {
      renderStitchResults = renderSearchResults();
    });
    await waitFor(() => {
      expect(renderStitchResults!.asFragment()).toMatchSnapshot();
      expect(renderStitchResults!.queryAllByText(/No results found/).length).toBe(1);
    });
  });

  it('navigates to a new page with updated query parameters when a property is changed', async () => {
    let renderStitchResults: RenderResult;
    mockLocation({ search: '?q=stitch&page=1' });
    await act(async () => {
      renderStitchResults = renderSearchResults();
    });

    expectUnfilteredResults(renderStitchResults!);

    // Change the filters, which should change the shown results
    await filterByRealm(renderStitchResults!);
    const expectedPath = '/docs/search/?q=stitch&page=1&searchProperty=realm-master';
    expect(mockPush).toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith(expectedPath, { scroll: false });
  });

  it('navigates with new search query parameters when hitting the "clear all filters" button', async () => {
    let renderStitchResults: RenderResult;
    mockLocation({ search: '?q=stitch&page=1&searchProperty=realm-master' });
    await act(async () => {
      renderStitchResults = renderSearchResults();
    });
    expectFilteredResults(renderStitchResults!);

    await clearAllFilters(renderStitchResults!);
    await act(async () => {
      jest.runOnlyPendingTimers();
      await tick();
    });

    const expectedPath = '/docs/search/?q=stitch&page=1';
    expect(mockPush).toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith(expectedPath, { scroll: false });
  });

  it('specifies search filters through mobile', async () => {
    let renderStitchResults: RenderResult;
    setMobile();
    mockLocation({ search: '?q=stitch&page=1' });
    await act(async () => {
      renderStitchResults = renderSearchResults();
    });
    expectUnfilteredResults(renderStitchResults!);

    // Open mobile search options
    await openMobileSearch(renderStitchResults!);

    // Wait for the mobile filters to render (use waitFor since we're in fake timers context)
    await act(async () => {
      jest.runOnlyPendingTimers();
      await tick();
    });
    expect(renderStitchResults!.queryByText(MOBILE_SEARCH_BACK_BUTTON_TEXT)).toBeTruthy();

    // Apply filters
    await filterByRealm(renderStitchResults!);

    // Click Apply filters button
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const applyFiltersButton = renderStitchResults!.getByText('Apply filters').closest('button');
    expect(applyFiltersButton).toBeDefined();
    if (!applyFiltersButton) {
      throw new Error('Apply filters button not found');
    }

    await act(async () => {
      await user.click(applyFiltersButton);
      jest.runOnlyPendingTimers();
      await tick();
    });

    // Wait for navigation to be called
    await act(async () => {
      jest.runOnlyPendingTimers();
      await tick();
    });

    const expectedPath = '/docs/search/?q=stitch&page=1&searchProperty=realm-master';
    expect(mockPush).toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith(expectedPath, { scroll: false });
  });

  it('cancels search filter application on mobile', async () => {
    let renderStitchResults: RenderResult;
    setMobile();
    mockLocation({ search: '?q=stitch&page=1' });
    await act(async () => {
      renderStitchResults = renderSearchResults();
    });
    expectUnfilteredResults(renderStitchResults!);

    await openMobileSearch(renderStitchResults!);

    await act(async () => {
      jest.runOnlyPendingTimers();
      await tick();
    });
    expect(renderStitchResults!.queryByText(MOBILE_SEARCH_BACK_BUTTON_TEXT)).toBeTruthy();

    await filterByRealm(renderStitchResults!);
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const backButton = renderStitchResults!.getByText(MOBILE_SEARCH_BACK_BUTTON_TEXT);
    expect(backButton).toBeDefined();

    await act(async () => {
      await user.click(backButton);
      jest.runOnlyPendingTimers();
      await tick();
    });

    await act(async () => {
      jest.runOnlyPendingTimers();
      await tick();
    });

    expectUnfilteredResults(renderStitchResults!);
    expect(renderStitchResults!.queryByText(MOBILE_SEARCH_BACK_BUTTON_TEXT)).toBeFalsy();
    expect(mockPush).toHaveBeenCalledTimes(0);
  });
});
