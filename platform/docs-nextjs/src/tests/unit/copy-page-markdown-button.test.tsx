import { render, fireEvent, waitFor, act } from '@testing-library/react';
import type { RenderResult } from '@testing-library/react';
import CopyPageMarkdownButton from '@/components/widgets/markdown-widget';
import { removeTrailingSlash } from '@/utils/remove-trailing-slash';
import { usePathname } from 'next/navigation';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

const TEST_URL = 'http://localhost:8000/tutorial/foo/';

const renderCopyMarkdownButton = (props = {}) => render(<CopyPageMarkdownButton slug="/tutorial/foo/" {...props} />);

// Create a wrapper that mimics the old useLocation API but uses usePathname internally
// Note: We're returning the full href to keep test assertions unchanged, even though
// real usePathname only returns the pathname. This is acceptable for test mocking.
const mockedUseLocation = {
  mockReturnValue: ({ href }: { href: string }) => {
    (usePathname as jest.Mock).mockReturnValue(href);
  },
};

const mockedConsoleError = jest.spyOn(console, 'error');

// Helper to get the mocked fetch (initialized in test-setup.ts beforeAll)
const getMockedFetch = () => global.fetch as jest.Mock;

// Mock version context
jest.mock('@/context/version-context', () => ({
  useVersionContext: () => ({
    siteBasePrefix: '/docs/atlas',
    siteBasePrefixWithVersion: '/docs/atlas',
    activeVersions: {},
    setActiveVersions: jest.fn(),
    availableVersions: {},
    availableGroups: {},
    onVersionSelect: jest.fn(),
  }),
}));

// Create mock functions that we can access in tests
const mockSetChatbotClicked = jest.fn();
const mockSetText = jest.fn();

// Mock chatbot context
jest.mock('@/context/chatbot-context', () => ({
  useChatbotModal: () => ({
    chatbotClicked: false,
    setChatbotClicked: mockSetChatbotClicked,
    text: '',
    setText: mockSetText,
  }),
  ChatbotProvider: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock clipboard
Object.defineProperty(global.navigator, 'clipboard', {
  value: {
    writeText: jest.fn(),
  },
  writable: true,
});

// Mock the window open API
Object.defineProperty(global.window, 'open', {
  configurable: true,
  writable: true,
  value: jest.fn(() => null),
});

describe('Prefetching', () => {
  beforeEach(() => {
    // Clearing the call history before each new test
    getMockedFetch().mockClear();
  });

  it('prefetches if the URL has a query param', async () => {
    const urlWithQueryParam = `${TEST_URL}?value=something`;

    mockedUseLocation.mockReturnValue({
      href: urlWithQueryParam,
    });

    getMockedFetch().mockResolvedValue({
      ok: true,
      text: () => Promise.resolve('# Markdown content'),
    });

    await act(async () => {
      renderCopyMarkdownButton();
    });

    expect(getMockedFetch()).toHaveBeenCalledWith(
      'http://localhost:8000/tutorial/foo.md',
      expect.objectContaining({
        signal: expect.any(AbortSignal),
      }),
    );
  });

  it('prefetches if the URL has a fragment identifier', async () => {
    const urlWithFragmentIdentifier = `${TEST_URL}#target-some-anchor-text`;

    mockedUseLocation.mockReturnValue({
      href: urlWithFragmentIdentifier,
    });

    getMockedFetch().mockResolvedValue({
      ok: true,
      text: () => Promise.resolve('# Markdown content'),
    });

    await act(async () => {
      renderCopyMarkdownButton();
    });

    expect(getMockedFetch()).toHaveBeenCalledWith(
      'http://localhost:8000/tutorial/foo.md',
      expect.objectContaining({
        signal: expect.any(AbortSignal),
      }),
    );
  });

  it('it calls console error on failed prefetches', async () => {
    mockedUseLocation.mockReturnValue({
      href: `${TEST_URL}bar/`,
    });

    getMockedFetch().mockResolvedValue({
      ok: false,
      status: 404,
    });

    await act(async () => {
      renderCopyMarkdownButton();
    });

    expect(getMockedFetch()).toHaveBeenCalledWith(
      `${TEST_URL}bar.md`,
      expect.objectContaining({
        signal: expect.any(AbortSignal),
      }),
    );

    expect(mockedConsoleError).toHaveBeenCalledWith('Error while fetching markdown: Error: Response status: 404');
  });
});

describe('Copy markdown button', () => {
  beforeEach(() => {
    // Mock location
    mockedUseLocation.mockReturnValue({
      href: TEST_URL,
    });
    getMockedFetch().mockReset();
    mockSetChatbotClicked.mockReset();
    mockSetText.mockReset();
    jest.clearAllMocks();
  });

  it('copies markdown to the clipboard when button is clicked', async () => {
    // Mock fetch response
    getMockedFetch().mockResolvedValue({
      ok: true,
      text: () => Promise.resolve('# Markdown content'),
    });

    // Render component
    let getByText: RenderResult['getByText'];
    await act(async () => {
      const result = renderCopyMarkdownButton();
      getByText = result.getByText;
    });

    // Wait for the initial fetch to complete
    await waitFor(() => {
      // Verify fetch was called with correct URL
      expect(getMockedFetch()).toHaveBeenCalledWith(
        'http://localhost:8000/tutorial/foo.md',
        expect.objectContaining({
          signal: expect.any(AbortSignal),
        }),
      );
    });

    // await new Promise(resolve => setTimeout(resolve, 100));

    // Click the button
    act(() => fireEvent.click(getByText('Copy page')));

    // Wait for the async operations to complete
    await waitFor(() => {
      // Verify clipboard was called with fetched markdown
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('# Markdown content');
    });
  });

  it('the URL is opened into the targeted browsing context', async () => {
    getMockedFetch().mockResolvedValue({
      ok: true,
      text: () => Promise.resolve('# Markdown content'),
    });

    const viewInMarkdown = /view in markdown/i;
    let getByText: RenderResult['getByText'];
    let getByLabelText: RenderResult['getByLabelText'];

    await act(async () => {
      const result = renderCopyMarkdownButton();
      getByLabelText = result.getByLabelText;
      getByText = result.getByText;
    });

    // Click the menu action
    act(() => fireEvent.click(getByLabelText('More options')));

    // Wait for the menu to appear and click "View in markdown"
    await waitFor(() => {
      expect(getByText(viewInMarkdown)).toBeInTheDocument();
    });

    // Click the action
    act(() => fireEvent.click(getByText(viewInMarkdown)));

    expect(window.open).toHaveBeenCalledTimes(1);
    expect(window.open).toHaveBeenCalledWith(`${removeTrailingSlash(TEST_URL)}.md`);
  });

  it('triggers error when hitting a 404 page', async () => {
    // Mock fetch response
    getMockedFetch().mockResolvedValue({
      ok: false,
      status: 404,
    });

    // Render component
    let getByText: RenderResult['getByText'];
    await act(async () => {
      const result = renderCopyMarkdownButton();
      getByText = result.getByText;
    });

    // Wait for the initial fetch to complete
    await waitFor(() => {
      // Verify fetch was called with correct URL
      expect(getMockedFetch()).toHaveBeenCalledWith(
        'http://localhost:8000/tutorial/foo.md',
        expect.objectContaining({
          signal: expect.any(AbortSignal),
        }),
      );
    });

    // Click the button
    act(() => fireEvent.click(getByText('Copy page')));

    // Wait for the async operations to complete
    await waitFor(() => {
      // Verify clipboard was called with fetched markdown
      expect(navigator.clipboard.writeText).not.toHaveBeenCalled();
      expect(mockedConsoleError).toHaveBeenCalled();
    });
  });

  it('opens chatbot with pre-filled message question about the current page', async () => {
    getMockedFetch().mockResolvedValue({
      ok: true,
      text: () => Promise.resolve('# Markdown content'),
    });

    // Render component with a slug prop
    let getByLabelText: RenderResult['getByLabelText'];
    let getByText: RenderResult['getByText'];

    await act(async () => {
      const result = renderCopyMarkdownButton({ slug: 'tutorial/foo' });
      getByLabelText = result.getByLabelText;
      getByText = result.getByText;
    });

    // Click the dropdown trigger (arrow button) to open the menu
    await act(() => fireEvent.click(getByLabelText('More options')));

    // Wait for menu to appear and click "Ask a Question"
    await waitFor(() => {
      expect(getByText('Ask a Question')).toBeInTheDocument();
    });

    await act(() => fireEvent.click(getByText('Ask a Question')));

    // Verify that setText was called with the correct message (our new implementation)
    expect(mockSetText).toHaveBeenCalledWith(
      "I have a question about the page I'm on: www.mongodb.com/docs/atlas/tutorial/foo",
    );

    // Verify that setChatbotClicked was called
    expect(mockSetChatbotClicked).toHaveBeenCalledWith(true);
  });
});
