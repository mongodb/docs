import type { ASTNode } from '@/types/ast';

export const findAllNestedAttribute = (nodes: ASTNode[], attribute: string) => {
  const results: string[] = [];
  const searchNode = (node: ASTNode) => {
    if (Object.hasOwn(node, attribute)) {
      results.push(node[attribute as keyof ASTNode] as string);
    }
    if ('children' in node && node.children) {
      node.children.forEach(searchNode);
    }
  };
  nodes.forEach(searchNode);
  return results;
};
