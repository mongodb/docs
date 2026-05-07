import type { SnootyNode } from './types';

// Inline nodes (e.g. `literal`) sometimes store their text in `value` and sometimes in
// child `text` nodes. Recurse so that both forms are captured.
const extractNodeText = (n: SnootyNode): string => {
  if (typeof n.value === 'string') return n.value;
  return (n.children ?? []).map(extractNodeText).join('');
};

export const parseSnootyArgument = (node: SnootyNode) => {
  if (Array.isArray(node.argument)) {
    return node.argument.map(extractNodeText).join('');
  }
  return String(node.argument || '');
};
