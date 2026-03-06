import { render } from '@testing-library/react';
import { ListItem } from '@/mdx-components/ListItem';
import { Paragraph } from '@/mdx-components/Paragraph';
import Literal from '@/components/literal';
import { List } from '@/mdx-components/List';

it('ListItem renders correctly', () => {
  const tree = render(
    <ListItem>
      <Paragraph>
        To log in with your Atlas account, Relational Migrator must be running on localhost on one of the following
        ports:
      </Paragraph>
      <List enumtype="unordered">
        <ListItem>
          <Paragraph>
            <Literal>8278</Literal>
          </Paragraph>
        </ListItem>
        <ListItem>
          <Paragraph>
            <Literal>8080</Literal>
          </Paragraph>
        </ListItem>
        <ListItem>
          <Paragraph>
            <Literal>443</Literal>
          </Paragraph>
        </ListItem>
      </List>
    </ListItem>,
  );
  expect(tree.asFragment()).toMatchSnapshot();
});
