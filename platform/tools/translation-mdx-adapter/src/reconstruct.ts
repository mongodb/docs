import type { ContentObject } from './types.js';
import { isBlockEntry, isPropEntry } from './types.js';
import { stringifyMdx } from './mdast.js';
import { restoreInline } from './inline.js';
import { applyFrontmatter } from './frontmatter.js';
import { validateTranslation, ReconstructionError } from './validate.js';

export { ReconstructionError, validateTranslation };

/**
 * Apply a translated payload to the retained AST and serialize to MDX.
 * Throws (emitting nothing) if validation fails.
 */
export function reconstruct(
  translated: Record<string, string | null>,
  content: ContentObject,
): string {
  validateTranslation(content, translated);
  const { tree, entries } = content.manifest;

  for (const entry of entries.values()) {
    if (isBlockEntry(entry)) {
      entry.node.children = restoreInline(translated[entry.key] as string, entry.placeholders);
    } else if (isPropEntry(entry)) {
      const attr = (entry.node.attributes ?? []).find(
        (a) => a.type === 'mdxJsxAttribute' && a.name === entry.attr,
      );
      if (attr && attr.type === 'mdxJsxAttribute') {
        attr.value = translated[entry.key] as string;
      }
    }
    // frontmatter entries are applied in one pass below
  }

  applyFrontmatter(tree, translated);
  return stringifyMdx(tree);
}
