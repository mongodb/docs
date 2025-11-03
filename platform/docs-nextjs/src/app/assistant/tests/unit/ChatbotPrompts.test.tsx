import { render } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { TestWrapper } from '@/tests/utils/test-wrapper';
import { ConversationProvider } from '../../contexts/ConversationContext';
import ChatViews from '../../components/Chatbot/chat-views';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock next/dynamic - return the component directly instead of null
// eslint-disable-next-line @typescript-eslint/no-explicit-any
jest.mock('next/dynamic', () => (fn: () => Promise<any>) => {
  const MockInputBarTrigger = ({ suggestedPrompts }: { suggestedPrompts: string[] }) => (
    <div data-testid="input-bar-trigger">
      {suggestedPrompts.map((prompt, i) => (
        <button key={i} data-testid={`prompt-${i}`}>
          {prompt}
        </button>
      ))}
    </div>
  );

  const MockChatWindow = () => <div data-testid="chat-window">Chat Window</div>;

  if (fn.toString().includes('InputBarTrigger')) {
    return MockInputBarTrigger;
  }
  return MockChatWindow;
});

// Mock mongodb-chatbot-ui
jest.mock('mongodb-chatbot-ui', () => ({
  useChatbotContext: () => ({
    conversation: {
      conversationId: 'test-id',
      createConversation: jest.fn(),
      switchConversation: jest.fn(),
    },
    awaitingReply: false,
  }),
  InputBarTrigger: ({ suggestedPrompts }: { suggestedPrompts: string[] }) => (
    <div data-testid="input-bar-trigger">
      {suggestedPrompts.map((prompt, i) => (
        <button key={i} data-testid={`prompt-${i}`}>
          {prompt}
        </button>
      ))}
    </div>
  ),
  ChatWindow: () => <div data-testid="chat-window">Chat Window</div>,
  PoweredByAtlasVectorSearch: () => <div data-testid="powered-by">Powered by Atlas</div>,
  MongoDbLegalDisclosure: () => <div data-testid="legal-disclosure">Legal Disclosure</div>,
}));

describe('ChatViews component', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });
  });

  it('renders correctly', () => {
    const wrapper = render(
      <TestWrapper>
        <ConversationProvider>
          <ChatViews />
        </ConversationProvider>
      </TestWrapper>,
    );

    expect(wrapper.queryByTestId('input-bar-trigger')).toBeInTheDocument();
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});
