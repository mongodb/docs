import { remark } from 'remark';
import remarkMdx from 'remark-mdx';
import remarkFrontmatter from 'remark-frontmatter';
import remarkStringify from 'remark-stringify';
import type { Root } from 'mdast';

/**
 * A processor that understands MDX (JSX flow/text elements) and YAML
 * frontmatter, and stringifies with stable formatting so round-tripping
 * an already-normalized document is a no-op.
 */
function createProcessor() {
  return remark()
    .use(remarkFrontmatter, ['yaml'])
    .use(remarkMdx)
    .use(remarkStringify, {
      bullet: '-',
      emphasis: '*',
      strong: '*',
      fences: true,
      listItemIndent: 'one',
    });
}

/** Parse MDX source into an MDAST tree, preserving JSX and frontmatter nodes. */
export function parseMdx(source: string): Root {
  return createProcessor().parse(source) as Root;
}

/** Serialize an MDAST tree back into MDX. Output is normalized, not byte-identical. */
export function stringifyMdx(tree: Root): string {
  return createProcessor().stringify(tree);
}
