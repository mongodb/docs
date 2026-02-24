import { render } from '@testing-library/react';
import { Paragraph } from '@/mdx-components/Paragraph';
import Link from '@/components/link';

describe('Paragraph unit tests', () => {
  it('renders correctly', () => {
    const tree = render(
      <Paragraph>
        Verify that MongoDB has started successfully by checking the process output for the following line:
      </Paragraph>,
    );
    expect(tree.asFragment()).toMatchSnapshot();
  });

  it('handles formatting dangling punctuation after Links and no extra multiplying on rerenders', () => {
    const tree = render(
      <Paragraph>
        <Link to="https://cloud.mongodb.com?tck=docs_realm">Deploy a Free Tier Cluster.</Link>
      </Paragraph>,
    );
    expect(tree.asFragment()).toMatchSnapshot();
    const treeRerender = render(
      <Paragraph>
        <Link to="https://cloud.mongodb.com?tck=docs_realm">Deploy a Free Tier Cluster.</Link>
      </Paragraph>,
    );
    expect(treeRerender.asFragment()).toMatchSnapshot();
  });
});
