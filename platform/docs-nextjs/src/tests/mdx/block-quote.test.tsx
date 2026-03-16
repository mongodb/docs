import { render } from '@testing-library/react';
import { mockLocation } from '../utils/mock-location';
import { Paragraph } from '@/mdx-components/Paragraph';
import { List } from '@/mdx-components/List';
import { ListItem } from '@/mdx-components/ListItem';
import Link from '@/components/link';

beforeAll(() => {
  mockLocation({ hash: '' });
});

it('renders correctly', () => {
  const tree = render(
    <blockquote>
      <Paragraph>There are several ways to connect to your MongoDB instance.</Paragraph>
      <List>
        <ListItem>
          <Paragraph> for access through a downloadable user interface</Paragraph>
        </ListItem>
        <ListItem>
          <Paragraph> interactive shell</Paragraph>
        </ListItem>
        <ListItem>
          <Paragraph>
            <Link to="">programmatic access</Link>
            {' through a number of programming APIs.'}
          </Paragraph>
        </ListItem>
      </List>
    </blockquote>,
  );
  expect(tree.asFragment()).toMatchSnapshot();
});
