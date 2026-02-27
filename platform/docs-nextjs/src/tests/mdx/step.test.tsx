import { render } from '@testing-library/react';
import Step from '@/mdx-components/procedure/step';
import { Paragraph } from '@/mdx-components/Paragraph';
import Link from '@/components/link';

it('renders with "connected" styling by default', () => {
  const tree = render(
    <Step stepNumber={1}>
      <Paragraph>Import data from CSV or JSON files into your MongoDB database.</Paragraph>
      <Paragraph>
        <Link to="/import-export/#std-label-compass-import-export">To learn more, see Import and Export Data</Link>
      </Paragraph>
    </Step>,
  );
  expect(tree.asFragment()).toMatchSnapshot();
});

it('renders with "connected" styling', () => {
  const tree = render(
    <Step stepNumber={1} stepStyle="connected">
      <Paragraph>Import data from CSV or JSON files into your MongoDB database.</Paragraph>
      <Paragraph>
        <Link to="/import-export/#std-label-compass-import-export">To learn more, see Import and Export Data</Link>
      </Paragraph>
    </Step>,
  );
  expect(tree.asFragment()).toMatchSnapshot();
});

it('renders with "normal" or YAML steps styling', () => {
  const tree = render(
    <Step stepNumber={1} stepStyle="normal">
      <Paragraph>Import data from CSV or JSON files into your MongoDB database.</Paragraph>
      <Paragraph>
        <Link to="/import-export/#std-label-compass-import-export">To learn more, see Import and Export Data</Link>
      </Paragraph>
    </Step>,
  );
  expect(tree.asFragment()).toMatchSnapshot();
});
