import { visit } from "unist-util-visit";
import { readFile, access } from "fs/promises";
import { join } from "path";
import { constants } from "fs";
import { remark } from "remark";
import remarkMdx from "remark-mdx";
import remarkFrontmatter from "remark-frontmatter";
import type { Plugin } from "unified";
import type { Root } from "mdast";
import type { VFile } from "vfile";

/**
 * Check if a file exists at the given path
 */
async function fileExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

export interface ResolveIncludesOptions {
  /**
   * Called when an include fails (missing file) or is skipped (circular).
   * If not provided, defaults to console.warn.
   */
  onWarning?: (message: string, err?: unknown) => void;
}

/**
 * Resolve Includes in the MDX file
 * @param contentMdxDir - The directory containing the MDX files
 * @param sourceFilePath - The path to the source file
 * @param includeStack - The stack of includes that have been processed
 * @param options - Options (e.g. onWarning for tests)
 * @returns
 */
export function resolveIncludes(
  contentMdxDir: string,
  sourceFilePath?: string,
  includeStack = new Set<string>(),
  options: ResolveIncludesOptions = {}
): Plugin<[], Root> {
  const warn =
    options.onWarning ??
    ((msg: string, err?: unknown) => console.warn(msg, err));
  // Return a function (the transformer) — this matches the Plugin signature
  return function transformer(): (tree: Root, file: VFile) => Promise<void> {
    return async (tree: Root, _file: VFile) => {
      const nodesToReplace: Array<{
        node: any;
        index: number;
        parent: any;
        src: string;
      }> = [];

      // Collect all <Include src="..."/> nodes
      visit(tree, (node: any, index: number | undefined, parent: any) => {
        if (!node || index === undefined || !parent) return;

        if (
          (node.type === "mdxJsxFlowElement" ||
            node.type === "mdxJsxTextElement") &&
          node.name === "Include"
        ) {
          const srcAttr = node.attributes?.find(
            (attr: any) => attr.name === "src"
          );
          if (srcAttr?.value) {
            nodesToReplace.push({ node, index, parent, src: srcAttr.value });
          }
        }
      });

      // Helper: read and process included file
      const processInclude = async (src: string): Promise<Root | null> => {
        let normalizedPath =
          src.replace(/^\/+/, "").replace(/\.mdx$/, "") + ".mdx";

        if (sourceFilePath) {
          // Extract context from source file path
          // For versioned projects: {project}/{version}/... (e.g., "manual/upcoming", "manual/v7.0")
          // For non-versioned projects: {project}/... (e.g., "atlas")
          let contextPath: string | null = null;

          // Extract project name (first segment)
          const projectMatch = sourceFilePath.match(/^([^/]+)/);
          if (projectMatch) {
            const project = projectMatch[1];

            // Check if project root has index.mdx - if so, it's non-versioned
            const projectRootIndexPath = join(
              contentMdxDir,
              project,
              "index.mdx"
            );
            const isNonVersioned = await fileExists(projectRootIndexPath);

            if (isNonVersioned) {
              // Non-versioned project: use just the project name
              contextPath = project;
            } else {
              // Versioned project: extract {project}/{version}
              const versionedMatch = sourceFilePath.match(/^([^/]+\/[^/]+)/);
              if (versionedMatch) {
                contextPath = versionedMatch[1]; // e.g., "manual/upcoming"
              } else {
                // Fallback: just use project (shouldn't happen for versioned, but safe fallback)
                contextPath = project;
              }
            }
          }

          // Apply context if we have one and the include path is relative
          if (contextPath) {
            // Apply context if the include path is relative (doesn't already start with project/version)
            // Relative includes typically start with "_includes" or don't have a project prefix
            if (!normalizedPath.startsWith(contextPath)) {
              const firstSegment = normalizedPath.split("/")[0];
              // If the path starts with "_" (like "_includes") or is a single segment,
              // it's likely a relative path that needs the context prepended
              if (
                firstSegment.startsWith("_") ||
                normalizedPath.split("/").length === 1
              ) {
                normalizedPath = join(contextPath, normalizedPath);
              }
              // If it starts with a different project/version, leave it as is (absolute path)
            }
          }
        }

        const filePath = join(contentMdxDir, normalizedPath);

        // Circular detection
        if (includeStack.has(filePath)) {
          warn(
            `Circular include detected: ${[...includeStack, filePath].join(
              " → "
            )}`
          );
          return null;
        }

        // Create a new stack for this branch
        const nextStack = new Set(includeStack);
        nextStack.add(filePath);

        try {
          const content = await readFile(filePath, "utf-8");

          const parsed = remark()
            .use(remarkFrontmatter, ["yaml"])
            .use(remarkMdx)
            .use(
              resolveIncludes(contentMdxDir, normalizedPath, nextStack, options)
            )
            .parse(content);

          const processed = await remark()
            .use(remarkFrontmatter, ["yaml"])
            .use(remarkMdx)
            .use(
              resolveIncludes(contentMdxDir, normalizedPath, nextStack, options)
            )
            .run(parsed);

          return processed as Root;
        } catch (err) {
          warn(`Failed to include file: ${src}`, err);
          return null;
        }
      };

      // Phase 1: resolve all <Include> nodes (NO mutation here)
      const resolved = await Promise.all(
        nodesToReplace.map(async (item) => {
          const replacement = await processInclude(item.src);
          return { ...item, replacement };
        })
      );

      // Phase 2: apply replacements synchronously, in reverse order
      for (let i = resolved.length - 1; i >= 0; i--) {
        const { parent, index, replacement } = resolved[i];

        if (!parent || typeof index !== "number") continue;

        if (replacement?.children?.length) {
          parent.children.splice(
            index,
            1,
            ...replacement.children.filter(Boolean)
          );
        } else {
          parent.children.splice(index, 1);
        }
      }
    };
  };
}
