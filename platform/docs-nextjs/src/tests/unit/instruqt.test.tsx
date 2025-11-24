import type { RenderResult } from '@testing-library/react';
import { render, screen, waitFor } from '@testing-library/react';
import type { HeadingNode, InstruqtNode } from '@/types/ast';
import userEvent from '@testing-library/user-event';
import Instruqt, { type InstruqtProps } from '@/components/instruqt';
import { InstruqtProvider } from '@/context/instruqt-context';
import Heading from '@/components/heading';
import mockData from '@/tests/data/instruqt.test.json';

// Mock chatbot context
jest.mock('@/context/chatbot-context', () => ({
  useChatbotModal: () => ({
    chatbotClicked: false,
    setChatbotClicked: jest.fn(),
    text: '',
    setText: jest.fn(),
  }),
  ChatbotProvider: ({ children }: { children: React.ReactNode }) => children,
}));

const mockTitleHeading = {
  children: [
    {
      type: 'text',
      value: 'Title Heading',
    },
  ],
  id: 'title-heading',
};

const renderComponent = ({ argument, options }: InstruqtProps, hasLabDrawer = false) => {
  const { children } = mockTitleHeading as HeadingNode;
  return render(
    <InstruqtProvider hasLabDrawer={hasLabDrawer}>
      <Heading sectionDepth={1} nodeChildren={children} />
      <Instruqt argument={argument} options={options} />
    </InstruqtProvider>,
  );
};

describe('Instruqt', () => {
  it('renders null when directive argument does not exist', () => {
    const { argument } = mockData.noArgument as { argument: InstruqtNode['argument'] };
    const wrapper = renderComponent({ argument });
    expect(wrapper.queryByTitle('Instruqt', { exact: false })).toBeFalsy();
  });

  it('renders as embedded content', () => {
    const { argument } = mockData.example as { argument: InstruqtNode['argument'] };
    const wrapper = renderComponent({ argument });
    expect(wrapper.queryByTitle('Instruqt', { exact: false })).toBeTruthy();
  });

  describe('lab drawer', () => {
    const hasLabDrawer = true;
    jest.useFakeTimers();
    const defaultWindowHeight = global.window.innerHeight;

    const openLabDrawer = (wrapper: RenderResult) => {
      const expectedButtonText = 'Open Interactive Tutorial';
      const drawerButton = wrapper.getByText(expectedButtonText);
      expect(drawerButton).toBeTruthy();
      // LG buttons require us to check for closest button
      const closestBtn = drawerButton.closest('button');
      if (closestBtn) {
        userEvent.click(closestBtn);
      }
    };

    it('renders in a drawer', async () => {
      const nodeData = mockData.exampleDrawer;
      const argument = nodeData.argument as InstruqtNode['argument'];
      const options = nodeData.options;
      const wrapper = renderComponent({ argument, options }, hasLabDrawer);

      openLabDrawer(wrapper);

      // Ensure everything exists
      const drawerContainer = await screen.findByTestId('resizable-wrapper');
      expect(drawerContainer).toBeTruthy();
      expect(drawerContainer).toHaveStyle(`height: ${(defaultWindowHeight * 2) / 3}px`);
      expect(wrapper.queryByTitle('Instruqt', { exact: false })).toBeTruthy();
    });

    it('can be minimized and brought back to starting height', async () => {
      const nodeData = mockData.exampleDrawer;
      const argument = nodeData.argument as InstruqtNode['argument'];
      const options = nodeData.options;
      const wrapper = renderComponent({ argument, options }, hasLabDrawer);
      openLabDrawer(wrapper);
      const drawerContainer = await screen.findByTestId('resizable-wrapper');
      // Label text based on aria labels for LG Icons
      const minimizeButton = await screen.findByLabelText('Minus Icon');

      const startingDrawerHeight = (defaultWindowHeight * 2) / 3;
      expect(drawerContainer).toHaveStyle(`height: ${startingDrawerHeight}px`);

      // Ensure height goes down
      userEvent.click(minimizeButton);

      await waitFor(() => expect(drawerContainer).toHaveStyle(`height: 60px`));

      // Ensure height goes back up to starting height
      const arrowUpButton = wrapper.getByLabelText('Arrow Up Icon');
      userEvent.click(arrowUpButton);
      await waitFor(() => expect(drawerContainer).toHaveStyle(`height: ${startingDrawerHeight}px`));
    });

    it('can set height to maximum', async () => {
      const nodeData = mockData.exampleDrawer;
      const argument = nodeData.argument as InstruqtNode['argument'];
      const options = nodeData.options;
      const wrapper = renderComponent({ argument, options }, hasLabDrawer);
      openLabDrawer(wrapper);
      const drawerContainer = await screen.findByTestId('resizable-wrapper');
      const fullscreenEnterButton = wrapper.getByLabelText('Full Screen Enter Icon');
      const startingDrawerHeight = (defaultWindowHeight * 2) / 3;
      expect(drawerContainer).toHaveStyle(`height: ${startingDrawerHeight}px`);

      // Ensure drawer height goes up to max height
      userEvent.click(fullscreenEnterButton);
      await waitFor(() => expect(drawerContainer).toHaveStyle(`height: ${defaultWindowHeight}px`));

      // Ensure drawer height goes back down to starting height
      const fullscreenExitButton = wrapper.getByLabelText('Full Screen Exit Icon');
      userEvent.click(fullscreenExitButton);
      await waitFor(() => expect(drawerContainer).toHaveStyle(`height: ${startingDrawerHeight}px`));
    });

    it('can be closed', async () => {
      const nodeData = mockData.exampleDrawer;
      const argument = nodeData.argument as InstruqtNode['argument'];
      const options = nodeData.options;
      const wrapper = renderComponent({ argument, options }, hasLabDrawer);
      openLabDrawer(wrapper);
      const drawerContainer = await screen.findByTestId('resizable-wrapper');
      expect(drawerContainer).toBeTruthy();

      const xButton = wrapper.getByLabelText('X Icon');
      userEvent.click(xButton);

      // Wait for the drawer to be removed from the DOM
      await waitFor(() => {
        expect(wrapper.queryByTestId('resizable-wrapper')).toBeFalsy();
      });
    });

    // This would most likely be a content edge case, but testing here to ensure graceful handling
    it('renders both a drawer and embedded content', async () => {
      const { exampleDrawer, example } = mockData;
      const drawerArguments = exampleDrawer.argument as InstruqtNode['argument'];
      const drawerOptions = exampleDrawer.options;

      const argument = example.argument as InstruqtNode['argument'];
      const { children } = mockTitleHeading as HeadingNode;
      const wrapper = render(
        <InstruqtProvider hasLabDrawer={hasLabDrawer}>
          <Heading sectionDepth={1} nodeChildren={children} />
          <Instruqt argument={drawerArguments} options={drawerOptions} />
          <Instruqt argument={argument} />
        </InstruqtProvider>,
      );
      openLabDrawer(wrapper);
      const drawerContainers = await screen.findAllByTestId('resizable-wrapper');
      // Ensure there's only 1 drawer, but 2 Instruqt frames
      expect(drawerContainers).toHaveLength(1);
      expect(wrapper.queryAllByTitle('Instruqt', { exact: false })).toHaveLength(2);
    });
  });
});
