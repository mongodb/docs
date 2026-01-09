import type { ReactNode } from 'react';
import { render } from '@testing-library/react';
import Section from '@/components/section';
import type { ParentNode } from '@/types/ast';

import mockData from '../data/section.test.json';
const typedMockData = mockData as ParentNode;

jest.mock('@/context/chatbot-context', () => ({
  useChatbotModal: () => ({
    chatbotClicked: false,
    setChatbotClicked: jest.fn(),
    text: '',
    setText: jest.fn(),
  }),
  ChatbotProvider: ({ children }: { children: ReactNode }) => children,
}));

it('renders correctly', () => {
  const tree = render(<Section nodeChildren={typedMockData.children} />);
  expect(tree.asFragment()).toMatchSnapshot();
});
