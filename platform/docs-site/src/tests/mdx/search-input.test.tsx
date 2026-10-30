import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchInput } from '@/mdx-components/ActionBar/SearchInput';

let mockSearch = '';
jest.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams(mockSearch),
}));

jest.mock('@/utils/report-analytics', () => ({
  reportAnalytics: jest.fn(),
}));

// jsdom only implements fragment navigation, so resolve the site-search URL into the hash.
jest.mock('@/utils/url-utils', () => ({
  getCompleteUrl: (path: string) => `#${path}`,
}));

afterEach(() => {
  mockSearch = '';
  jest.restoreAllMocks();
});

describe('SearchInput', () => {
  it('prefills the q param over the statically rendered empty field', () => {
    const { container: staticRender, unmount } = render(<SearchInput />);
    const container = document.body.appendChild(document.createElement('div'));
    container.innerHTML = staticRender.innerHTML;
    unmount();
    mockSearch = 'q=aggregation';

    render(<SearchInput />, { container, hydrate: true });

    expect(container.querySelector('input')).toHaveValue('aggregation');
    expect(container.querySelector('.sl-search-input')).not.toHaveAttribute('data-empty');
  });

  it('navigates to site search with the encoded query on Enter', async () => {
    const user = userEvent.setup();
    const { getByRole } = render(<SearchInput />);

    await user.type(getByRole('searchbox'), 'find & replace{Enter}');

    expect(window.location.hash).toBe('#/docs/site-search/?q=find%20%26%20replace');
  });

  it.each([
    ['Cmd+K', 'Macintosh', { metaKey: true }],
    ['Ctrl+K', 'Linux', { ctrlKey: true }],
  ])('focuses the search input on %s', (_, userAgent, modifier) => {
    jest.spyOn(navigator, 'userAgent', 'get').mockReturnValue(userAgent);
    const { getByRole } = render(<SearchInput />);

    act(() => {
      document.body.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', bubbles: true, ...modifier }));
    });

    expect(getByRole('searchbox')).toHaveFocus();
  });

  it('ignores Cmd+K off Mac', () => {
    jest.spyOn(navigator, 'userAgent', 'get').mockReturnValue('Linux');
    const { getByRole } = render(<SearchInput />);

    act(() => {
      document.body.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', bubbles: true, metaKey: true }));
    });

    expect(getByRole('searchbox')).not.toHaveFocus();
  });
});
