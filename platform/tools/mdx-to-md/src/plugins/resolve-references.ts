import { visit } from "unist-util-visit";
import { readFile } from "fs/promises";
import { join } from "path";
import type { Plugin } from "unified";
import type { Root } from "mdast";
import { fileExists } from "../utils/file-exists.js";

interface ReferencesJson {
  refs?: Record<string, string>;
}

export interface ResolveReferencesOptions {
  /**
   * Base URL for the project (e.g. "https://www.mongodb.com/docs/atlas/").
   * Relative paths in _references.json refs are resolved against this URL.
   * When omitted, relative paths are left as-is.
   */
  baseUrl?: string;
}

/**
 * Parse the `substitutions` export from a `_references.ts` file.
 *
 * The file has the shape:
 *   export const substitutions = { "key": "value", ... };
 *
 * We extract all "key": "value" pairs with a regex so we don't need to
 * execute or transpile the TypeScript.
 */
function parseSubstitutionsTs(raw: string): Record<string, string> {
  const result: Record<string, string> = {};
  const re = /"([^"]+)"\s*:\s*"((?:[^"\\]|\\.)*)"/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(raw)) !== null) {
    const key = match[1];
    // Unescape any \" sequences that appeared inside the string value
    const value = match[2].replace(/\\"/g, '"');
    if (key) result[key] = value;
  }
  return result;
}

/**
 * Resolve <Reference> nodes by looking up values from project-level data files.
 *
 * Handles two kinds of references:
 *
 * 1. URL/link refs — <Reference name="key" /> → title text from _references.json
 * 2. Text substitutions — <Reference type="substitution" refKey="key" /> →
 *    inline text from the project's _references.ts `substitutions` map.
 *    Caller-provided <Replacement> values (applied earlier by resolveIncludes)
 *    take precedence; this handles the global fallback for any that remain.
 *
 * Mutations are done in place so tree structure and position data are preserved.
 * Only runs when contentMdxDir and sourceFilePath are provided.
 */
export function resolveReferences(
  contentMdxDir: string,
  sourceFilePath?: string,
  options: ResolveReferencesOptions = {}
): Plugin<[], Root> {
  const warn = (msg: string, err?: unknown) => console.warn(msg, err);

  const baseUrl = options.baseUrl?.replace(/\/$/, "") ?? "";

  function resolveUrl(path: string): string {
    if (!path) return path;
    if (/^https?:\/\//.test(path)) return path;
    if (!baseUrl) return path;
    return `${baseUrl}/${path}`;
  }

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

      // --- URL/link references from _references.json ---
      let refs: Record<string, string> = {};
      const refsJsonPath = join(contentMdxDir, contextPath, "_references.json");
      if (await fileExists(refsJsonPath)) {
        try {
          const raw = await readFile(refsJsonPath, "utf-8");
          const refsData = JSON.parse(raw) as ReferencesJson;
          refs = refsData.refs ?? {};
        } catch (err) {
          warn(`Failed to read _references.json: ${refsJsonPath}`, err);
        }
      }

      // --- Text substitutions from _references.ts ---
      let substitutions: Record<string, string> = {};
      const refsTsPath = join(contentMdxDir, contextPath, "_references.ts");
      if (await fileExists(refsTsPath)) {
        try {
          const raw = await readFile(refsTsPath, "utf-8");
          substitutions = parseSubstitutionsTs(raw);
        } catch (err) {
          warn(`Failed to read _references.ts: ${refsTsPath}`, err);
        }
      }

      function replaceReferenceNode(node: any) {
        if (node.name !== "Reference") return;

        const typeAttr = node.attributes?.find((a: any) => a.name === "type");
        const refKeyAttr = node.attributes?.find(
          (a: any) => a.name === "refKey"
        );

        // Text substitution: <Reference type="substitution" refKey="..." />
        if (typeAttr?.value === "substitution" && refKeyAttr?.value) {
          const value = substitutions[refKeyAttr.value];
          if (value !== undefined) {
            node.type = "text";
            (node as { value?: string }).value = value;
            delete node.name;
            delete node.attributes;
            delete node.children;
          }
          // If no substitution found, leave the node; stripCustomMdx will remove it
          return;
        }

        // URL/link ref: <Reference name="key" title="Display Text" />
        const nameAttr = node.attributes?.find((a: any) => a.name === "name");
        const titleAttr = node.attributes?.find((a: any) => a.name === "title");
        const name = nameAttr?.value;
        if (!name) return;

        // Prefer the human-readable title attribute over the raw key name
        const linkText: string = titleAttr?.value ?? name;

        const refPath = refs[name];
        if (refPath) {
          node.type = "link";
          node.url = resolveUrl(refPath);
          node.title = null;
          node.children = [{ type: "text", value: linkText }];
          delete node.name;
          delete node.attributes;
        } else {
          node.type = "text";
          (node as { value?: string }).value = linkText;
          delete node.name;
          delete node.attributes;
          delete node.children;
        }
      }

      /**
       * Convert <RefRole type="..." name="key">children</RefRole> into a
       * markdown link when the name resolves to a URL in refs, otherwise
       * unwrap to its children (stripCustomMdx handles remaining elements).
       */
      function replaceRefRoleNode(node: any) {
        if (node.name !== "RefRole") return;

        const nameAttr = node.attributes?.find((a: any) => a.name === "name");
        const name = nameAttr?.value;
        if (!name) return;

        const refPath = refs[name];
        const children: any[] = node.children ?? [];

        if (refPath && children.length > 0) {
          node.type = "link";
          node.url = resolveUrl(refPath);
          node.title = null;
          node.children = children;
          delete node.name;
          delete node.attributes;
        }
        // If no ref found or no children, leave the node; stripCustomMdx will unwrap it
      }

      // MDX parses block JSX as mdxJsxFlowElement and inline JSX as mdxJsxTextElement; visit both so
      // <Reference> and <RefRole> are handled wherever they appear in the tree.
      visit(tree, "mdxJsxFlowElement", replaceReferenceNode);
      visit(tree, "mdxJsxTextElement", replaceReferenceNode);
      visit(tree, "mdxJsxFlowElement", replaceRefRoleNode);
      visit(tree, "mdxJsxTextElement", replaceRefRoleNode);
    };
  };
}
