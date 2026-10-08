import { render } from '@testing-library/react';
import { Step } from '@/mdx-components/Procedure/Step';
import { Paragraph } from '@/mdx-components/Paragraph';
import { Link } from '@/mdx-components/Link';

it('renders correctly', () => {
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
