import { remark } from 'remark';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkMdx from 'remark-mdx';
import remarkStringify from 'remark-stringify';
import { remarkResolveImports } from './remark-resolve-imports';
import { loadDirNameToPrefixMap } from './blob-path-remap';

/**
 * Runs the same resolution as the normal /docs MDX compile path
 * (`remarkResolveImports`: includes with Replacement slots, `_references.json`
 * substitutions, Reference / RefRole → links), then stringifies back to MDX.
 *
 * `remarkResolveImports` resolves includes from `content-mdx` on disk, so we
 * pre-resolve here and only then run `mdxToMarkdown` without a `contentMdxDir`
 * so `mdx-to-md` does not attempt its own filesystem includes.
 */
export async function preResolveImportsForMarkdownExport(mdxSource: string, projectPath: string): Promise<string> {
  const dirNameToPrefix = await loadDirNameToPrefixMap();
  const file = await remark()
    .use(remarkFrontmatter, ['yaml'])
    .use(remarkGfm)
    .use(remarkMdx)
    .use(remarkResolveImports, { projectPath, dirNameToPrefix })
    .use(remarkStringify)
    .process(mdxSource);
  return String(file);
}
