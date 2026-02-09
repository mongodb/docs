import { remark } from "remark";
import remarkMdx from "remark-mdx";
import remarkFrontmatter from "remark-frontmatter";
import remarkStringify from "remark-stringify";

import { stripEsm } from "./plugins/strip-esm.js";
import { resolveIncludes } from "./plugins/resolve-includes.js";
import { transformImage } from "./plugins/transform-image.js";
import { normalizeTableCells } from "./plugins/normalize-table-cells.js";
import { preprocessTableRows } from "./plugins/preprocess-table-rows.js";
import type { ResolveIncludesOptions } from "./plugins/resolve-includes.js";

export interface RunParseOptions extends ResolveIncludesOptions {}

export async function mdxToMarkdown(
  source: string,
  contentMdxDir?: string,
  sourceFilePath?: string,
  options: RunParseOptions = {}
) {
  // Pre-process table rows before parsing
  source = preprocessTableRows()(source);

  const processor = remark()
    .use(remarkFrontmatter, ["yaml"])
    .use(remarkMdx)
    .use(stripEsm);

  // Only use resolveIncludes if contentMdxDir is provided
  if (contentMdxDir) {
    processor.use(
      resolveIncludes(contentMdxDir, sourceFilePath, undefined, options) as any
    );
  }

  processor.use(transformImage).use(normalizeTableCells).use(remarkStringify, {
    // Ensure proper spacing and formatting
    bullet: "-",
    emphasis: "*",
    strong: "*",
    fences: true,
    listItemIndent: "one",
  });

  const file = await processor.process(source);
  let result = String(file);

  // Post-process: Trim trailing whitespace from table rows
  // This removes excessive spaces that can accumulate in table cells
  result = result.replace(
    /^(\|[^\n]*)\s+(\|)$/gm,
    (match, rowContent, finalPipe) => {
      // Trim all trailing whitespace from the row content, then add back the pipe with one space
      const trimmed = rowContent.replace(/\s+$/, "");
      return trimmed + " " + finalPipe;
    }
  );

  // Post-process: Normalize table separator rows (the row with dashes)
  // Use a standard 3 dashes per column for cleaner output
  result = result.replace(/^\|(\s*-+\s*\|)+$/gm, (match) => {
    // Count how many columns there are (number of pipes minus 1)
    const columnCount = (match.match(/\|/g) || []).length - 1;
    // Create normalized separators (3 dashes per column, standard Markdown format)
    const normalized = Array(columnCount).fill(" --- ");
    return "|" + normalized.join("|") + "|";
  });

  return result;
}
