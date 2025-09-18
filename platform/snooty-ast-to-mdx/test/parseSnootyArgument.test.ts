import { parseSnootyArgument } from '../src/core/convertSnootyAstToMdast/parseSnootyArgument';
import type { SnootyNode } from '../src/core/convertSnootyAstToMdast/types';

describe('parseSnootyArgument', () => {
  it('concatenates value nodes in argument array', () => {
    const argNodes: SnootyNode[] = [
      { type: 'text', value: 'foo' },
      { type: 'text', value: 'bar' },
      { type: 'emphasis', children: [{ type: 'text', value: 'ignored' }] },
    ];
    const node: SnootyNode = {
      type: 'directive',
      name: 'test',
      argument: argNodes,
    };

    const result = parseSnootyArgument(node);

    expect(result).toBe('foobar');
  });
});
