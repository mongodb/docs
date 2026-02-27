import { render } from '@testing-library/react';
import { mockLocation } from '../utils/mock-location';
import Procedure from '@/mdx-components/procedure';
import Step from '@/mdx-components/procedure/step';
import { Paragraph } from '@/mdx-components/Paragraph';
import Link from '@/components/link';
import Section from '@/components/section';
import Heading from '@/components/heading';
import { HeadingContextProvider } from '@/context/heading-context';

jest.mock('@/context/chatbot-context', () => ({
  useChatbotModal: () => ({
    chatbotClicked: false,
    setChatbotClicked: jest.fn(),
    text: '',
    setText: jest.fn(),
  }),
  ChatbotProvider: ({ children }: { children: React.ReactNode }) => children,
}));

const structuredData =
  '{"@context":"https://schema.org","@type":"HowTo","steps":[{"@type":"HowToStep","text":"Connect to a MongoDB deployment hosted on MongoDB Atlas, or a deployment hosted locally on your own machine.To learn more, see Connect to MongoDB","name":"Connect to your deployment"},{"@type":"HowToStep","text":"Import data from CSV or JSON files into your MongoDB database.To learn more, see Import and Export Data","name":"Import your data"}],"name":"Connect to a MongoDB deployment hosted on MongoDB Atlas","image":"https://webimages.mongodb.com/_com_assets/cms/kuyj2focmkbxv7gh3-stacked_default_slate_blue.svg?auto=format%252Ccompress"}';

beforeAll(() => {
  mockLocation({ hash: '' });
});

it('renders correctly', () => {
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
      <Step stepNumber={1} stepStyle="normal">
        <Paragraph>
          Connect to a MongoDB deployment hosted on MongoDB Atlas, or a deployment hosted locally on your own machine.
        </Paragraph>
        <Paragraph>
          <Link to="/connect/#std-label-connect-run-compass">To learn more, see Connect to MongoDB</Link>
        </Paragraph>
      </Step>
      <Step stepNumber={2} stepStyle="normal">
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
    <HeadingContextProvider sectionDepth={0}>
      <Procedure>
        {[1, 2, 3, 4, 5, 6, 7].map((n) => (
          <Step key={n} stepNumber={n}>
            <Section>
              <Heading id={`step-${n}`}>Step {n}</Heading>
              <Paragraph>Content for step {n}</Paragraph>
            </Section>
          </Step>
        ))}
      </Procedure>
    </HeadingContextProvider>,
  );
  expect(tree.asFragment()).toMatchSnapshot();
  expect(tree.getAllByText(/Step/)).toHaveLength(7);
});
