import { render } from '@testing-library/react';
import { TestWrapper } from '@/tests/utils/test-wrapper';
import AssistantSideNav from '../../components/SideNav';
import { ConversationProvider } from '../../contexts/ConversationContext';

describe('AssistantSideNav component', () => {
  it('renders correctly', () => {
    const wrapper = render(
      <TestWrapper>
        <ConversationProvider>
          <AssistantSideNav />
        </ConversationProvider>
      </TestWrapper>,
    );

    expect(wrapper.queryByText('MongoDB Assistant')).toBeInTheDocument();
    expect(wrapper.queryByText('New Chat')).toBeInTheDocument();
    expect(wrapper.queryByText('Recent Chats')).toBeInTheDocument();
    expect(wrapper.queryByText('Conversation 1')).toBeInTheDocument();
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});
