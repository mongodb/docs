import type { Root, Yaml } from 'mdast';
import { parseDocument } from 'yaml';

/** The user-approved translatable frontmatter fields (from Task 7). */
export const TRANSLATABLE_FRONTMATTER_KEYS: string[] = ['description'];

export interface FrontmatterField {
  /** Payload key, e.g. "frontmatter.description". */
  key: string;
  /** The YAML field name. */
  field: string;
  /** Current (source) string value. */
  value: string;
}

function findYaml(tree: Root): Yaml | undefined {
  return tree.children.find((c): c is Yaml => c.type === 'yaml');
}

/** Pull allowlisted, non-empty string fields out of the frontmatter node. */
export function extractFrontmatter(
  tree: Root,
  keys: string[] = TRANSLATABLE_FRONTMATTER_KEYS,
): FrontmatterField[] {
  const node = findYaml(tree);
  if (!node) return [];
  const doc = parseDocument(node.value);
  const fields: FrontmatterField[] = [];
  for (const field of keys) {
    const value = doc.get(field);
    if (typeof value === 'string' && value.length > 0) {
      fields.push({ key: `frontmatter.${field}`, field, value });
    }
  }
  return fields;
}

/** Write translated values back into the frontmatter node, in place. */
export function applyFrontmatter(
  tree: Root,
  translated: Record<string, string | null>,
  keys: string[] = TRANSLATABLE_FRONTMATTER_KEYS,
): void {
  const node = findYaml(tree);
  if (!node) return;
  const doc = parseDocument(node.value);
  let changed = false;
  for (const field of keys) {
    const value = translated[`frontmatter.${field}`];
    if (value != null && doc.has(field) && doc.get(field) !== value) {
      doc.set(field, value);
      changed = true;
    }
  }
  if (changed) {
    // remark-frontmatter stores the yaml body without the `---` fences and
    // without a trailing newline.
    node.value = String(doc).replace(/\n$/, '');
  }
}
