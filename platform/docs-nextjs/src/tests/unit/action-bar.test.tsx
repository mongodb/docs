import type { RenderResult } from '@testing-library/react';
import { render } from '@testing-library/react';
import ActionBar from '@/components/action-bar';
import { PLACEHOLDER_TEXT } from '@/components/action-bar/search-input';
// import  { useSearchParams } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useSearchParams: () => ({
    get: () => 'test',
  }),
  useRouter: () => ({
    push: () => {},
  }),
}));

jest.mock('@/context/chatbot-context', () => ({
  useChatbotModal: () => ({
    chatbotClicked: false,
    setChatbotClicked: jest.fn(),
    text: '',
    setText: jest.fn(),
  }),
  ChatbotProvider: ({ children }: { children: React.ReactNode }) => children,
}));

const conversationSpy = jest.fn();

jest.mock('mongodb-chatbot-ui', () => {
  const chatbot = jest.requireActual('mongodb-chatbot-ui');

  return {
    __esModule: true,
    ...chatbot,
    useChatbotContext: () => ({
      setInputText: () => {},
      handleSubmit: () => {},
      conversation: {
        createConversation: conversationSpy,
        conversationId: null,
      },
    }),
  };
});

describe('ActionBar', () => {
  let consoleSpy: jest.SpyInstance;

  beforeAll(() => {
    // https://github.com/jsdom/jsdom/issues/2177
    // suppressing Error: Could not parse CSS stylesheet
    consoleSpy = jest.spyOn(console, 'error').mockImplementation((message) => {
      if (!message?.message?.includes('Could not parse CSS stylesheet')) {
        console.warn(message);
      }
    });
  });

  afterAll(() => consoleSpy.mockRestore());

  describe('Universal Search input ', () => {
    it('loads the input search bar, dark mode menu', async () => {
      const wrapper: RenderResult = render(<ActionBar template="document" sidenav={true} />);

      expect(wrapper.getByRole('search')).toBeTruthy();
      expect(wrapper.getByPlaceholderText(PLACEHOLDER_TEXT)).toBeTruthy();
      expect(wrapper.getByLabelText('Dark Mode Menu')).toBeTruthy();
    });
  });
});
