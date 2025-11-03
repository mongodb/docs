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

// Mock the ConversationContext
const mockUseConversationContext = jest.fn();
jest.mock('../../contexts/ConversationContext', () => {
  const actual = jest.requireActual('../../contexts/ConversationContext');
  return {
    ...actual,
    useConversationContext: () => mockUseConversationContext(),
  };
});

describe('MongoDBAssistantPage firstSubmitted state', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });
  });

  it('displays opening UI before first submission', () => {
    mockUseConversationContext.mockReturnValue({
      conversations: [{ id: '1', title: 'Conversation 1' }],
      activeConversation: { id: '1', title: 'Conversation 1' },
      createNewChat: false,
      changedConversation: null,
      firstSubmitted: false,
      setConversations: jest.fn(),
      setActiveConversation: jest.fn(),
      setCreateNewChat: jest.fn(),
      setChangedConversation: jest.fn(),
      setFirstSubmitted: jest.fn(),
    });

    const wrapper = render(
      <TestWrapper>
        <MongoDBAssistantPage />
      </TestWrapper>,
    );

    expect(wrapper.queryByText('Hello! How can I help you?')).toBeInTheDocument();
    expect(wrapper.queryByText(/This is a generative AI chatbot/i)).toBeInTheDocument();
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('displays chat UI after first submission', () => {
    mockUseConversationContext.mockReturnValue({
      conversations: [{ id: '1', title: 'Conversation 1' }],
      activeConversation: { id: '1', title: 'Conversation 1' },
      createNewChat: false,
      changedConversation: null,
      firstSubmitted: true,
      setConversations: jest.fn(),
      setActiveConversation: jest.fn(),
      setCreateNewChat: jest.fn(),
      setChangedConversation: jest.fn(),
      setFirstSubmitted: jest.fn(),
    });

    const wrapper = render(
      <TestWrapper>
        <MongoDBAssistantPage />
      </TestWrapper>,
    );

    expect(wrapper.queryByText('Hello! How can I help you?')).not.toBeInTheDocument();
    expect(wrapper.queryByText(/This is a generative AI chatbot/i)).not.toBeInTheDocument();
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});
