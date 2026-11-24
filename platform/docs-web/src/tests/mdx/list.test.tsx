import { render } from '@testing-library/react';
import { List } from '@/mdx-components/List';
import { ListItem } from '@/mdx-components/ListItem';
import { Paragraph } from '@/mdx-components/Paragraph';

it('List renders correctly', () => {
  const tree = render(
    <List enumtype="loweralpha" startat={2}>
      <ListItem>
        <Paragraph>
          In , click <span>Charts</span> in the navigation bar.
        </Paragraph>
      </ListItem>
      <ListItem>
        <Paragraph>
          If this is the first time you are launching , click <span>Activate MongoDB Charts</span>. This provisions a
          new instance in the project.
        </Paragraph>
      </ListItem>
    </List>,
  );
  expect(tree.asFragment()).toMatchSnapshot();
});
