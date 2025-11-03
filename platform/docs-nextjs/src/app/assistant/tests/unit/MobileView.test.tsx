import { render } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { TestWrapper } from '@/tests/utils/test-wrapper';
import MongoDBAssistantPage from '../../page';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock next/dynamic
jest.mock('next/dynamic', () => () => {
  return function MockDynamicComponent() {
    return null;
  };
});

// Mock mongodb-chatbot-ui
jest.mock('mongodb-chatbot-ui', () => ({
  Chatbot: ({ children }: { children: React.ReactNode }) => <div data-testid="chatbot">{children}</div>,
  useChatbotContext: () => ({
    conversation: {
      conversationId: 'test-conversation-id',
      createConversation: jest.fn(),
      switchConversation: jest.fn(),
    },
    awaitingReply: false,
  }),
  getSegmentIdHeaders: () => ({}),
  InMemoryConversationCache: class MockCache {},
  PoweredByAtlasVectorSearch: () => <div data-testid="powered-by">Powered by Atlas</div>,
  MongoDbLegalDisclosure: () => <div data-testid="legal-disclosure">Legal Disclosure</div>,
}));

// Mock DarkModeDropdown
jest.mock('@/components/action-bar/dark-mode-dropdown', () => {
  return function DarkModeDropdown() {
    return <div data-testid="dark-mode-dropdown">Dark Mode Dropdown</div>;
  };
});

describe('MongoDBAssistantPage mobile view', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });

    // Mock window.matchMedia to simulate mobile viewport
    // upToSmall = max-width: 480px (mobile breakpoint)
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query: string) => {
        const isMobileQuery = query.includes('max-width: 480px') || query.includes('max-width: 767px');
        return {
          matches: isMobileQuery,
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        } as MediaQueryList;
      }),
    });
  });

  it('renders correctly in mobile view', () => {
    const wrapper = render(
      <TestWrapper>
        <MongoDBAssistantPage />
      </TestWrapper>,
    );

    expect(wrapper.queryByText('MongoDB Assistant')).toBeInTheDocument();
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});
