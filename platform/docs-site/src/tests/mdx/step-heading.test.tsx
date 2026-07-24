import { render, screen } from '@testing-library/react';
import { mockLocation } from '../utils/mock-location';
import { StepHeading } from '@/mdx-components/Procedure/StepHeading';

jest.mock('@/context/chatbot-context', () => ({
  useChatbotModal: () => ({
    chatbotClicked: false,
    setChatbotClicked: jest.fn(),
    text: '',
    setText: jest.fn(),
  }),
  ChatbotProvider: ({ children }: { children: React.ReactNode }) => children,
}));

beforeAll(() => {
  mockLocation({ hash: '' });
});

it('renders as a heading with permalink for anchor links and theme color', () => {
  render(
    <StepHeading>
      <span>Configure the connector</span>
    </StepHeading>,
  );

  const heading = screen.getByRole('heading', { level: 4 });
  expect(heading).toHaveClass('contains-headerlink');
  expect(heading.querySelector('a.headerlink')).toBeTruthy();
  expect(heading).toHaveTextContent('Configure the connector');
});
