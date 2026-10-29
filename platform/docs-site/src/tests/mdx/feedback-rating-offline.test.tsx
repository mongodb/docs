import { render } from '@testing-library/react';
import { FeedbackRating } from '@/mdx-components/FeedbackWidget';

let mockIsOfflineBuild = false;
jest.mock('@/utils/isOfflineBuild', () => ({
  get isOfflineBuild() {
    return mockIsOfflineBuild;
  },
}));

jest.mock('next/navigation', () => ({
  usePathname: () => '/test-page',
}));

jest.mock('@/mdx-components/FeedbackWidget/submit-feedback', () => ({
  useBrowserUser: () => ({ user: { id: 'test-user' }, reassignCurrentUser: jest.fn() }),
  submitFeedback: jest.fn(),
}));

jest.mock('@/context/page-context', () => ({
  usePageContext: () => ({ options: {}, slug: 'test-page' }),
}));

jest.mock('@/utils/use-snooty-metadata', () => ({
  useSnootyMetadata: () => ({}),
}));

describe('FeedbackRating', () => {
  afterEach(() => {
    mockIsOfflineBuild = false;
  });

  it('renders online', () => {
    const { container } = render(<FeedbackRating className="form" />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it('renders nothing in offline builds', () => {
    mockIsOfflineBuild = true;
    const { container } = render(<FeedbackRating className="form" />);
    expect(container).toBeEmptyDOMElement();
  });
});
