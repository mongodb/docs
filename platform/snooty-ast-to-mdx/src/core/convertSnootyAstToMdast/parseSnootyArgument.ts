import { isValueNode, type SnootyNode } from './types';

export const parseSnootyArgument = (node: SnootyNode) => {
  if (Array.isArray(node.argument)) {
    return node.argument
      .filter(isValueNode)
      .map(({ value }) => value)
      .join('');
  }
  return String(node.argument || '');
};
