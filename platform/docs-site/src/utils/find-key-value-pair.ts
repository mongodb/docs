import type { ASTNode } from '@/types/ast';
import { isParentNode } from '@/types/ast-utils';

/**
 * Recursively searches child nodes to find the specified string key/value pair.
 * Prevents us from having to rely on a fixed depth for properties in the AST.
 */
export const findKeyValuePair = (nodes: (ASTNode | Partial<ASTNode>)[], key: string, value: string) => {
  let result;
  const iter = (node: Partial<ASTNode>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (key in node && (node as any)[key] === value) {
      result = node;
      return true;
    }
    return isParentNode(node) && node.children.some(iter);
  };

  nodes.some(iter);
  return result;
};
