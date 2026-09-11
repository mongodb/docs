import { mdxHasTabs } from '@/mdx-utils/mdx-has-tabs';

describe('mdxHasTabs', () => {
  it.each([
    ['a <Tab> with attributes', '<Tabs tabset="drivers">\n  <Tab name="Node.js" tabid="nodejs">Hi</Tab>\n</Tabs>'],
    ['a <Tab> whose attributes wrap onto the next line', '<Tabs>\n  <Tab\n    name="Node.js"\n  >Hi</Tab>\n</Tabs>'],
    ['an attribute-less <Tab>', '<Tabs>\n  <Tab>Hi</Tab>\n</Tabs>'],
  ])('is true for %s', (_label, mdx) => {
    expect(mdxHasTabs(mdx)).toBe(true);
  });

  it.each([
    ['prose', '# Heading\n\nSome text about tabs and Tab characters.\n'],
    // A <Tabs> with no <Tab> inside emits no tab content, so an all-tabs export
    // of it would match the default one.
    ['an empty <Tabs>', '<Tabs tabset="drivers"></Tabs>'],
    ['a component whose name merely starts with Tab', '<Table>\n  <Row>Hi</Row>\n</Table>'],
  ])('is false for %s', (_label, mdx) => {
    expect(mdxHasTabs(mdx)).toBe(false);
  });
});
