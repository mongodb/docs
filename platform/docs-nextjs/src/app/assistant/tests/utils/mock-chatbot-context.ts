export const mockChatbotContext = {
  conversation: {
    conversationId: 'test-conversation-id',
    createConversation: jest.fn(),
    switchConversation: jest.fn(),
  },
  awaitingReply: false,
  messages: [],
};

export const createMockChatbotContext = (overrides = {}) => ({
  ...mockChatbotContext,
  ...overrides,
});
