import { visit } from "unist-util-visit";
import { readFile } from "fs/promises";
import { join } from "path";
import type { Plugin } from "unified";
import type { Root } from "mdast";
import { fileExists } from "../utils/file-exists.js";

interface ReferencesJson {
  refs?: Record<string, { title?: string; url?: string }>;
}

export interface ResolveReferencesOptions {
  onWarning?: (message: string, err?: unknown) => void;
}

/**
 * Resolve <Reference name="key" /> by converting the node in place to a text
 * node with the title from _references.json at the version base. Mutating in
 * place preserves tree structure and position data so newlines and spaces are
 * preserved. Only runs when contentMdxDir and sourceFilePath are provided.
 */
export function resolveReferences(
  contentMdxDir: string,
  sourceFilePath?: string,
  options: ResolveReferencesOptions = {}
): Plugin<[], Root> {
  const warn =
    options.onWarning ??
    ((msg: string, err?: unknown) => console.warn(msg, err));

  return function transformer() {
    return async (tree: Root) => {
      if (!sourceFilePath) return;

      let contextPath: string | null = null;
      const projectMatch = sourceFilePath.match(/^([^/]+)/);
      if (!projectMatch) return;

      const project = projectMatch[1];
      const projectRootIndexPath = join(contentMdxDir, project, "index.mdx");
      const isNonVersioned = await fileExists(projectRootIndexPath);

      if (isNonVersioned) {
        contextPath = project;
      } else {
        const versionedMatch = sourceFilePath.match(/^([^/]+\/[^/]+)/);
        contextPath = versionedMatch ? versionedMatch[1] : project;
      }

      const refsPath = join(contentMdxDir, contextPath, "_references.json");
      if (!(await fileExists(refsPath))) return;

      let refsData: ReferencesJson;
      try {
        const raw = await readFile(refsPath, "utf-8");
        refsData = JSON.parse(raw) as ReferencesJson;
      } catch (err) {
        warn(`Failed to read _references.json: ${refsPath}`, err);
        return;
      }

      const refs = refsData.refs ?? {};

      function replaceReferenceNode(node: any) {
        if (node.name === "Reference") {
          const nameAttr = node.attributes?.find((a: any) => a.name === "name");
          const name = nameAttr?.value;
          if (!name) return;

          const entry = refs[name];
          const title = entry?.title ?? name;

          // Mutate in place (like transformImage) so tree structure and positions are preserved
          node.type = "text";
          (node as { value?: string }).value = title;
          delete node.name;
          delete node.attributes;
          delete node.children;
        }
      }

      visit(tree, "mdxJsxFlowElement", replaceReferenceNode);
      visit(tree, "mdxJsxTextElement", replaceReferenceNode);
    };
  };
}
