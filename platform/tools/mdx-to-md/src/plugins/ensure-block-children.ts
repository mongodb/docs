import type { Root } from "mdast";

/**
 * Block-level types that are valid at the document root. Anything else (e.g. bare
 * text left after unwrapping components) gets wrapped in a paragraph so we keep
 * newlines in the output.
 */
const FLOW_TYPES = new Set([
  "blockquote",
  "code",
  "heading",
  "html",
  "list",
  "paragraph",
  "table",
  "thematicBreak",
]);

export function ensureBlockChildren() {
  return (tree: Root) => {
    if (!Array.isArray(tree.children)) return;
    const children = tree.children;
    for (let i = 0; i < children.length; i++) {
      const node = children[i];
      if (
        node &&
        typeof node === "object" &&
        "type" in node &&
        !FLOW_TYPES.has((node as { type: string }).type)
      ) {
        children[i] = {
          type: "paragraph",
          children: [node],
        } as Root["children"][number];
      }
    }
  };
}
