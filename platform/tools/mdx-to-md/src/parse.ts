import { remark } from "remark";
import remarkMdx from "remark-mdx";
import remarkFrontmatter from "remark-frontmatter";
import remarkStringify from "remark-stringify";

import { stripEsm } from "./plugins/strip-esm.js";
import { resolveIncludes } from "./plugins/resolve-includes.js";
import { resolveReferences } from "./plugins/resolve-references.js";
import { transformImage } from "./plugins/transform-image.js";
import { transformHeading } from "./plugins/transform-heading.js";
import { transformTabs } from "./plugins/transform-tabs.js";
import { transformProcedure } from "./plugins/transform-procedure.js";
import { transformAbbr } from "./plugins/transform-abbr.js";
import { transformAdmonitions } from "./plugins/transform-admonitions.js";
import { transformVersionDirectives } from "./plugins/transform-version-directives.js";
import { transformDescribe } from "./plugins/transform-describe.js";
import { transformCollapsible } from "./plugins/transform-collapsible.js";
import { transformIoCodeBlock } from "./plugins/transform-io-code-block.js";
import { transformTable } from "./plugins/transform-table.js";
import { cleanCodeInfo } from "./plugins/clean-code-info.js";
import { normalizeTableCells } from "./plugins/normalize-table-cells.js";
import { stripCustomMdx } from "./plugins/strip-custom-mdx.js";
import { stripFrontmatter } from "./plugins/strip-frontmatter.js";
import { ensureBlockChildren } from "./plugins/ensure-block-children.js";
import { preprocessTableRows } from "./plugins/preprocess-table-rows.js";
import type { ResolveReferencesOptions } from "./plugins/resolve-references.js";

interface MdxToMarkdownOptions extends ResolveReferencesOptions {
  /**
   * Stable `tabid` values to keep when converting tabs. When provided, only
   * matching tabs are emitted; all others are dropped. Omit or leave empty
   * to emit every tab (the default behavior).
   */
  tabFilters?: string[];
}

export async function mdxToMarkdown(
  source: string,
  contentMdxDir?: string,
  sourceFilePath?: string,
  options: MdxToMarkdownOptions = {}
) {
  const { tabFilters, ...referenceOptions } = options;
  // Pre-process table rows before parsing
  source = preprocessTableRows()(source);

  const processor = remark()
    .use(remarkFrontmatter, ["yaml"])
    .use(remarkMdx)
    .use(stripEsm);

  // Only use resolveIncludes and resolveReferences if contentMdxDir is provided
  if (contentMdxDir) {
    processor.use(
      resolveIncludes(contentMdxDir, sourceFilePath, undefined)
    );
    processor.use(
      resolveReferences(contentMdxDir, sourceFilePath, referenceOptions)
    );
  }

  processor
    .use(transformImage)
    .use(transformHeading)
    .use(transformTabs({ tabFilters }))
    .use(transformProcedure)
    .use(transformAbbr)
    .use(transformAdmonitions)
    .use(transformVersionDirectives)
    .use(transformDescribe)
    .use(transformCollapsible)
    .use(transformIoCodeBlock)
    .use(transformTable)
    .use(cleanCodeInfo)
    .use(normalizeTableCells)
    .use(stripCustomMdx)
    .use(stripFrontmatter)
    .use(ensureBlockChildren)
    .use(remarkStringify, {
      // Ensure proper spacing and formatting
      bullet: "-",
      emphasis: "*",
      strong: "*",
      fences: true,
      listItemIndent: "one",
    });

  const file = await processor.process(source);
  let result = String(file);

  // Post-process: Collapse whitespace inside link text
  // Source MDX often has link text that spans a line break; remark-stringify
  // preserves those newlines verbatim, producing invalid-looking markdown links.
  result = result.replace(/\[([^\]]*?)\]\(([^)]+)\)/gs, (_, text: string, url: string) => {
    return `[${text.replace(/\s+/g, " ").trim()}](${url})`;
  });

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
