import type { SnootyNode, MdastNode } from './types';
import { parseSnootyArgument } from './parseSnootyArgument';

interface ConvertDirectiveLiteralIncludeArgs {
  node: SnootyNode;
}

export const convertDirectiveLiteralInclude = ({ node }: ConvertDirectiveLiteralIncludeArgs): MdastNode => {
  const pathText = parseSnootyArgument(node);

  const codeValue = `// Source: ${pathText.trim()}\n// TODO: Content from external file not available during conversion`;
  const lang = node.options?.language ?? null;

  return { type: 'code', lang, value: codeValue };
};
