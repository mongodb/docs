import { isTextNode, isLiteralNode } from './types';
import type { SnootyNode } from './types';

/** Extract display text from inline children as a single string. */
export const extractInlineDisplayText = (children: SnootyNode[]): string => {
  const parts: string[] = [];
  const walk = (n?: SnootyNode) => {
    if (!n) return;
    if (isTextNode(n) || isLiteralNode(n)) {
      parts.push(n.value);
      return;
    }
    if (Array.isArray(n.children)) n.children.forEach(walk);
  };
  children.forEach(walk);
  const raw = parts.join('');
  // Unescape common Markdown/MDX backslash escapes (e.g., \_id -> _id)
  const unescaped = raw.replace(/\\([\\`*_{}[\]()#+\-.!])/g, '$1');
  // Collapse excessive whitespace
  return unescaped.replace(/\s+/g, ' ').trim();
};
