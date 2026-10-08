import { render } from '@testing-library/react';
import * as sass from 'sass';
import path from 'path';
import { ListItem } from '@/mdx-components/ListItem';
import { Paragraph } from '@/mdx-components/Paragraph';
import { Literal } from '@/mdx-components/Literal';
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

describe('ListItem paragraph spacing styles', () => {
  const css = sass.compile(path.resolve(__dirname, '../../mdx-components/list-item.module.scss')).css;

  it('does not zero the bottom margin on every paragraph, so multi-paragraph list items keep space between paragraphs', () => {
    expect(css).not.toMatch(/\.listItemContent\s*>\s*p\s*\{/);
  });

  it('zeroes the bottom margin only on the final paragraph, so the item keeps its container-controlled trailing gap', () => {
    expect(css).toMatch(/\.listItemContent\s*>\s*p:last-child\s*\{\s*margin-bottom:\s*0;?\s*\}/);
  });
});
