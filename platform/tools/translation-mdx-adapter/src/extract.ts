import type { RootContent } from 'mdast';
import type { ContentObject, ManifestEntry, BlockNode } from './types.js';
import { isJsxElement } from './types.js';
import { parseMdx } from './mdast.js';
import { segmentsFor, joinKey, labelOf } from './keys.js';
import { ruleFor, isTranslatableProp } from './component-registry.js';
import { serializeInline } from './inline.js';
import { extractFrontmatter } from './frontmatter.js';

/** Block-level node types whose phrasing children are serialized to one translatable string. */
const TEXT_BLOCK_TYPES = new Set(['paragraph', 'heading', 'tableCell']);

/** Structural containers with no translatable content of their own; recurse into children. */
const STRUCTURAL_TYPES = new Set([
  'list',
  'listItem',
  'blockquote',
  'table',
  'tableRow',
  'footnoteDefinition',
]);

function isTextBlock(node: RootContent): node is BlockNode {
  return TEXT_BLOCK_TYPES.has(node.type);
}

function hasStructuralChildren(
  node: RootContent,
): node is RootContent & { children: RootContent[] } {
  return STRUCTURAL_TYPES.has(node.type);
}

/**
 * Walk a parsed MDX tree and produce the `ContentObject`: a flat translation
 * `payload`, the union of inline placeholder tokens as
 * `non_translatable_terms`, and the in-memory `manifest` needed to rebuild
 * the document from a translated payload.
 */
export function extract(source: string): ContentObject {
  const tree = parseMdx(source);
  const payload: Record<string, string> = {};
  const terms = new Set<string>();
  const entries = new Map<string, ManifestEntry>();

  for (const { key, field, value } of extractFrontmatter(tree)) {
    payload[key] = value;
    entries.set(key, { kind: 'frontmatter', key, field });
  }

  const walk = (siblings: RootContent[], parentPath: string[]): void => {
    const segs = segmentsFor(siblings);
    siblings.forEach((node, i) => {
      const path = [...parentPath, segs[i]];
      const key = joinKey(path);

      if (isJsxElement(node)) {
        const name = node.name ?? '';
        const rule = ruleFor(name);
        for (const attr of node.attributes) {
          if (
            attr.type === 'mdxJsxAttribute' &&
            isTranslatableProp(name, attr.name) &&
            attr.name !== rule.primaryTextProp &&
            typeof attr.value === 'string' &&
            attr.value.length > 0
          ) {
            const propKey = `${key}.@${attr.name}`;
            payload[propKey] = attr.value;
            entries.set(propKey, { kind: 'prop', key: propKey, node, attr: attr.name });
          }
        }
        if (rule.kind === 'container') {
          walk(node.children, path);
        }
        return;
      }

      if (isTextBlock(node)) {
        const { text, placeholders, tokens } = serializeInline(node.children);

        // Extract translatable props from inline JSX elements (e.g.
        // <Reference title="..." />, <Abbr tooltip="...">). These are
        // trapped inside opaque/wrap placeholders and never reach the
        // flow-level prop loop above. Skip `primaryTextProp` (it is
        // inlined into the block string as an attr-wrap, not a separate
        // entry). Insert BEFORE the block entry so reconstruct processes
        // prop updates before restoreInline deep-clones the nodes.
        const jsxCounts = new Map<string, number>();
        for (const p of placeholders) {
          if (!isJsxElement(p.node)) continue;
          const jsxNode = p.node;
          const name = jsxNode.name ?? '';
          const rule = ruleFor(name);
          const label = labelOf(jsxNode);
          const idx = jsxCounts.get(label) ?? 0;
          jsxCounts.set(label, idx + 1);
          for (const attr of jsxNode.attributes) {
            if (
              attr.type === 'mdxJsxAttribute' &&
              isTranslatableProp(name, attr.name) &&
              attr.name !== rule.primaryTextProp &&
              typeof attr.value === 'string' &&
              attr.value.length > 0
            ) {
              const propKey = `${key}.${label}[${idx}].@${attr.name}`;
              payload[propKey] = attr.value;
              entries.set(propKey, { kind: 'prop', key: propKey, node: jsxNode, attr: attr.name });
            }
          }
        }

        if (text.trim().length > 0) {
          payload[key] = text;
          for (const t of tokens) terms.add(t);
          entries.set(key, { kind: 'block', key, node, placeholders });
        }
        return;
      }

      if (hasStructuralChildren(node)) {
        walk(node.children, path);
        return;
      }

      // Anything else (code, yaml, thematicBreak, html, mdxFlowExpression, …)
      // has no translatable content and is not recursed into.
    });
  };

  walk(tree.children, []);

  return { payload, non_translatable_terms: [...terms], manifest: { tree, entries } };
}
