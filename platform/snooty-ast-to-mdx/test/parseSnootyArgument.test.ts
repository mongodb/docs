import { parseSnootyArgument } from '../src/core/convertSnootyAstToMdast/parseSnootyArgument';
import type { SnootyNode } from '../src/core/convertSnootyAstToMdast/types';

describe('parseSnootyArgument', () => {
  it('concatenates value nodes in argument array', () => {
    const argNodes: SnootyNode[] = [
      { type: 'text', value: 'foo' },
      { type: 'text', value: 'bar' },
    ];
    const node: SnootyNode = { type: 'directive', name: 'test', argument: argNodes };
    expect(parseSnootyArgument(node)).toBe('foobar');
  });

  it('recurses into children of nodes that have no value (e.g. emphasis)', () => {
    const argNodes: SnootyNode[] = [
      { type: 'text', value: 'foo' },
      { type: 'emphasis', children: [{ type: 'text', value: 'bar' }] },
    ];
    const node: SnootyNode = { type: 'directive', name: 'test', argument: argNodes };
    expect(parseSnootyArgument(node)).toBe('foobar');
  });

  it('extracts text from literal nodes whose content is in children rather than value', () => {
    // Snooty sometimes emits literal (inline code) nodes with no top-level value,
    // storing the text in a child text node instead. This case appears in admonition
    // title arguments, e.g. `.. note:: Free (``M0``) Tier Cluster Limitation`.
    const argNodes: SnootyNode[] = [
      { type: 'text', value: 'Free (' },
      { type: 'literal', children: [{ type: 'text', value: 'M0' }] },
      { type: 'text', value: ') Tier Cluster Limitation' },
    ];
    const node: SnootyNode = { type: 'directive', name: 'note', argument: argNodes };
    expect(parseSnootyArgument(node)).toBe('Free (M0) Tier Cluster Limitation');
  });

  it('still extracts value directly when literal has a top-level value', () => {
    const argNodes: SnootyNode[] = [
      { type: 'text', value: 'Free (' },
      { type: 'literal', value: 'M0' },
      { type: 'text', value: ')' },
    ];
    const node: SnootyNode = { type: 'directive', name: 'note', argument: argNodes };
    expect(parseSnootyArgument(node)).toBe('Free (M0)');
  });
});
