import { visit } from "unist-util-visit";
import type { Root } from "mdast";

/**
 * Strip YAML frontmatter from the tree so it does not appear in the markdown output.
 * Frontmatter is still parsed by remark-frontmatter (so other plugins can use it
 * if needed), but the yaml nodes are removed before stringify.
 */
export function stripFrontmatter() {
  return (tree: Root) => {
    const toRemove: Array<{ parent: Root; index: number }> = [];
    visit(tree, "yaml", (_node, index, parent) => {
      if (parent && typeof index === "number") toRemove.push({ parent, index });
    });
    for (const { parent, index } of toRemove.sort(
      (a, b) => b.index - a.index
    )) {
      parent.children.splice(index, 1);
    }
  };
}
