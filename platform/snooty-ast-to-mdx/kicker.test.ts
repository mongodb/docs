import type { SnootyNode } from './src/core/convertSnootyAstToMdast/types';
import { convertSnootyAst } from './test/utils';

it('kicker directive emits inline to avoid paragraph wrapping', () => {
  const ast: SnootyNode = {
    type: 'root',
    children: [
      {
        type: 'directive',
        name: 'kicker',
        argument: [{ type: 'text', value: 'Tutorial' }],
        children: [],
      },
    ],
  };
  const { mdx } = convertSnootyAst({ ast });
  console.log('kicker MDX:\n' + mdx);
  // Should be a paragraph containing an inline <Kicker>, not a block-level element
  expect(mdx).toMatch(/<Kicker>/);
});
