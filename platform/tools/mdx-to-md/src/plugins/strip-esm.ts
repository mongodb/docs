import { visit } from "unist-util-visit";
import type { Root } from "mdast";

/**
 * Strip ESM imports and exports from MDX file
 */
export function stripEsm() {
  return (tree: Root) => {
    visit(tree, "mdxjsEsm", (_node, index, parent) => {
      if (parent && typeof index === "number") {
        parent.children.splice(index, 1);
      }
    });
  };
}
