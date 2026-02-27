import type { SnootyNode } from './types';

/** Deep-search for a directive with the given name within a list of nodes. */
export const findDirectiveByName = (nodes: SnootyNode[], name: string): SnootyNode | undefined => {
  for (const node of nodes) {
    if (node.type === 'directive' && node.name === name) return node;
    if (node.children) {
      const found = findDirectiveByName(node.children, name);
      if (found) return found;
    }
  }
  return undefined;
};
