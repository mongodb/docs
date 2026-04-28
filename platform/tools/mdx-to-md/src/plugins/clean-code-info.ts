import { visit } from "unist-util-visit";
import type { Root, Code } from "mdast";

/**
 * Strip props from code block info strings.
 *
 * MDX code blocks may carry JSX-style props in the info string,
 * e.g. ```sh copyable={true} linenos={false}```.
 * Markdown renderers and AI consumers only need the language identifier,
 * so this plugin clears the remark `meta` field and trims any props
 * that leaked into the `lang` field.
 */
export function cleanCodeInfo() {
  return (tree: Root) => {
    visit(tree, "code", (node: Code) => {
      // `meta` holds everything after the first word on the info string
      if (node.meta) {
        node.meta = null;
      }
      // Guard against lang accidentally containing props (e.g. "sh copyable=…")
      if (node.lang && node.lang.includes(" ")) {
        node.lang = node.lang.split(" ")[0] || null;
      }
    });
  };
}
