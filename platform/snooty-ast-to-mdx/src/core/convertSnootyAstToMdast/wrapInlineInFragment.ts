import type { MdastNode } from './types';

const BLOCK_TYPES = new Set([
  'paragraph',
  'heading',
  'blockquote',
  'list',
  'listItem',
  'code',
  'table',
  'thematicBreak',
  'mdxJsxFlowElement',
  'mdxFlowExpression',
]);

/**
 * When content is entirely inline nodes (text, mdxJsxTextElement, etc.) with no block-level
 * wrappers, the MDX serializer emits each node on its own line with blank lines between them.
 * Those blank lines cause remark to re-parse them as block-level (mdxJsxFlowElement) elements at
 * render time, which cannot replace an inline <Reference>. Wrapping in a React fragment (<>...</>)
 * keeps all inline nodes on a single line so they re-parse as inline content that the renderer can
 * correctly unwrap. Content that already has block nodes is returned unchanged.
 */
export const wrapInlineInFragment = (nodes: MdastNode[]): MdastNode[] =>
  nodes.some((n) => BLOCK_TYPES.has((n as { type: string }).type))
    ? nodes
    : [{ type: 'mdxJsxTextElement', name: null, attributes: [], children: nodes } as MdastNode];
