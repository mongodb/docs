import { render } from '@testing-library/react';
import { mockLocation } from '../utils/mock-location';
import Procedure from '@/components/procedure';
// data for this component
import mockData from '../data/procedure.test.json';
import type { ProcedureNode } from '@/types/ast';

// Blocked by chatbot context
// jest.mock("../../src/context/chatbot-context", () => ({
// 	useChatbotModal: () => ({
// 		chatbotClicked: false,
// 		setChatbotClicked: jest.fn(),
// 		text: "",
// 		setText: jest.fn(),
// 	}),
// 	ChatbotProvider: ({ children }: { children: React.ReactNode }) => children,
// }));

beforeAll(() => {
  mockLocation({ hash: '' });
});

it.skip('renders correctly', () => {
  const tree = render(
    <Procedure nodeChildren={(mockData.testSteps as ProcedureNode).children} options={mockData.testSteps.options} />,
  );
  expect(tree.asFragment()).toMatchSnapshot();
});

it.skip('renders with "normal" or YAML steps styling', () => {
  // Add styling to mock data
  (mockData.testSteps as ProcedureNode).options = {
    style: 'normal',
  };

  const tree = render(
    <Procedure nodeChildren={(mockData.testSteps as ProcedureNode).children} options={mockData.testSteps.options} />,
  );
  expect(tree.asFragment()).toMatchSnapshot();
});

it.skip('renders steps nested in include nodes', () => {
  const tree = render(
    <Procedure
      nodeChildren={(mockData.nestedSteps as ProcedureNode).children}
      options={mockData.nestedSteps.options as ProcedureNode['options']}
    />,
  );
  expect(tree.asFragment()).toMatchSnapshot();
  expect(tree.getAllByText(/Step/)).toHaveLength(7);
});
