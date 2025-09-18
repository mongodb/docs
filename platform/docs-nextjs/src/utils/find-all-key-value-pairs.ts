import type { ASTNode } from '@/types/ast';

/** Searches child nodes to find all instances of the specified key/value pair in the `nodes` object. */
export const findAllKeyValuePairs = (nodes: ASTNode[], key: string, value: string) => {
  const results: ASTNode[] = [];
  const searchNode = (node: ASTNode) => {
    if (node[key as keyof ASTNode] === value) {
      results.push(node);
    }
    if ('children' in node && node.children) {
      return node.children.forEach(searchNode);
    }
    return null;
  };
  nodes.forEach(searchNode);
  return results;
};
