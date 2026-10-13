import { isJsxElement } from './types.js';

/**
 * The key label for a node. JSX elements use their lowercased component name
 * so `<Banner>` becomes `banner`; `listItem` is shortened to `item`;
 * everything else uses its MDAST `type`.
 */
export function labelOf(node: unknown): string {
  if (isJsxElement(node)) {
    return (node.name ?? 'component').toLowerCase();
  }
  const n = node as { type?: string };
  if (n.type === 'listItem') return 'item';
  return n.type ?? 'unknown';
}

/**
 * All key segments for a sibling list, computed in one pass (O(n)). Each
 * index is scoped to this sibling list: `${label}[${k}]` where `k` counts
 * preceding siblings sharing the same label. Never a document-global counter.
 */
export function segmentsFor(siblings: readonly unknown[]): string[] {
  const counts = new Map<string, number>();
  return siblings.map((node) => {
    const label = labelOf(node);
    const k = counts.get(label) ?? 0;
    counts.set(label, k + 1);
    return `${label}[${k}]`;
  });
}

/** Join key segments into a full path, e.g. ["banner[0]", "paragraph[1]"] -> "banner[0].paragraph[1]". */
export function joinKey(segments: readonly string[]): string {
  return segments.join('.');
}
