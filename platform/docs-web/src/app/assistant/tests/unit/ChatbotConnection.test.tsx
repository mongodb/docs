import { render } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { TestWrapper } from '@/tests/utils/test-wrapper';
import { ConversationProvider } from '../../contexts/ConversationContext';
import ConversationCacheInfo from '../../components/Chatbot/conversation-cache';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock mongodb-chatbot-ui
jest.mock('mongodb-chatbot-ui', () => ({
  useChatbotContext: () => ({
    conversation: {
      conversationId: 'test-conversation-id',
      createConversation: jest.fn(),
      switchConversation: jest.fn(),
    },
    awaitingReply: false,
  }),
}));

describe('ConversationCacheInfo component', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });
  });

  it('renders correctly', () => {
    const wrapper = render(
      <TestWrapper>
        <ConversationProvider>
          <ConversationCacheInfo />
        </ConversationProvider>
      </TestWrapper>,
    );

    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});
