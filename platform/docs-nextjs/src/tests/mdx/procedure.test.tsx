import { render } from '@testing-library/react';
import { mockLocation } from '../utils/mock-location';
import { Procedure } from '@/mdx-components/Procedure';
import { Step } from '@/mdx-components/Procedure/Step';
import { Paragraph } from '@/mdx-components/Paragraph';
import { Heading } from '@/mdx-components/Heading';
// TODO: update this when we have MDX link
import Link from '@/components/link';

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

it('renders correctly', () => {
  const structuredData =
    '{"@context":"https://schema.org","@type":"HowTo","steps":[{"@type":"HowToStep","text":"Connect to a MongoDB deployment hosted on MongoDB Atlas, or a deployment hosted locally on your own machine.To learn more, see Connect to MongoDB","name":"Connect to your deployment"},{"@type":"HowToStep","text":"Import data from CSV or JSON files into your MongoDB database.To learn more, see Import and Export Data","name":"Import your data"}],"name":"Connect to a MongoDB deployment hosted on MongoDB Atlas","image":"https://webimages.mongodb.com/_com_assets/cms/kuyj2focmkbxv7gh3-stacked_default_slate_blue.svg?auto=format%252Ccompress"}';

  const tree = render(
    <Procedure structuredData={structuredData}>
      <Step stepNumber={1}>
        <Paragraph>
          Connect to a MongoDB deployment hosted on MongoDB Atlas, or a deployment hosted locally on your own machine.
        </Paragraph>
        <Paragraph>
          <Link to="/connect/#std-label-connect-run-compass">To learn more, see Connect to MongoDB</Link>
        </Paragraph>
      </Step>
      <Step stepNumber={2}>
        <Paragraph>Import data from CSV or JSON files into your MongoDB database.</Paragraph>
        <Paragraph>
          <Link to="/import-export/#std-label-compass-import-export">To learn more, see Import and Export Data</Link>
        </Paragraph>
      </Step>
    </Procedure>,
  );
  expect(tree.asFragment()).toMatchSnapshot();
});

it('renders with "normal" or YAML steps styling', () => {
  const tree = render(
    <Procedure style="normal">
      <Step stepNumber={1}>
        <Paragraph>
          Connect to a MongoDB deployment hosted on MongoDB Atlas, or a deployment hosted locally on your own machine.
        </Paragraph>
        <Paragraph>
          <Link to="/connect/#std-label-connect-run-compass">To learn more, see Connect to MongoDB</Link>
        </Paragraph>
      </Step>
      <Step stepNumber={2}>
        <Paragraph>Import data from CSV or JSON files into your MongoDB database.</Paragraph>
        <Paragraph>
          <Link to="/import-export/#std-label-compass-import-export">To learn more, see Import and Export Data</Link>
        </Paragraph>
      </Step>
    </Procedure>,
  );
  expect(tree.asFragment()).toMatchSnapshot();
});

it('renders steps nested in include nodes', () => {
  const tree = render(
    <Procedure>
      {[1, 2, 3, 4, 5, 6, 7].map((n) => (
        <Step key={n} stepNumber={n}>
          <section>
            <Heading>Step {n}</Heading>
            <Paragraph>Content for step {n}</Paragraph>
          </section>
        </Step>
      ))}
    </Procedure>,
  );
  expect(tree.asFragment()).toMatchSnapshot();
  expect(tree.getAllByText(/Step/)).toHaveLength(7);
});
