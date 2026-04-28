import { remark } from 'remark';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkMdx from 'remark-mdx';
import remarkStringify from 'remark-stringify';
import { remarkResolveImports } from './remark-resolve-imports';

/**
 * Runs the same blob-backed resolution as the normal /docs MDX compile path
 * (`remarkResolveImports`: includes with Replacement slots, `_references.json`
 * substitutions, Reference / RefRole → links), then stringifies back to MDX.
 *
 * The markdown API fetches MDX from the blob store (URL-shaped paths) while
 * `mdx-to-md` resolves includes via `content-mdx` on disk. In production those
 * layouts diverge, so we pre-resolve using blob keys (`getBlobKey` inside
 * `remark-resolve-imports`) and only then run `mdxToMarkdown` without a
 * `contentMdxDir` so `mdx-to-md` does not attempt filesystem includes.
 */
export async function preResolveImportsForMarkdownExport(mdxSource: string, projectPath: string): Promise<string> {
  const file = await remark()
    .use(remarkFrontmatter, ['yaml'])
    .use(remarkGfm)
    .use(remarkMdx)
    .use(remarkResolveImports, { projectPath })
    .use(remarkStringify)
    .process(mdxSource);
  return String(file);
}
