import { render } from '@testing-library/react';
import { List } from '@/mdx-components/List';
import { ListItem } from '@/mdx-components/ListItem';
import { Paragraph } from '@/mdx-components/Paragraph';
import { components } from '@/mdx-components';

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

describe('mdx components map', () => {
  it('registers capitalized List and ListItem', () => {
    const map = components();
    expect(map.List).toBeDefined();
    expect(map.ListItem).toBeDefined();
  });

  it('keeps the intrinsic ol/ul/li mappings for markdown-generated lists', () => {
    const map = components();
    expect(map.ol).toBeDefined();
    expect(map.ul).toBeDefined();
    expect(map.li).toBeDefined();
  });
});
