import { visit } from "unist-util-visit";
import type { Root, TableCell, Text } from "mdast";

/**
 * Normalize table cells by replacing newlines with spaces.
 * Markdown tables require cells to be on a single line, so we convert
 * any newlines to spaces. HTML entities are already handled in pre-processing.
 */
export function normalizeTableCells() {
  return (tree: Root) => {
    // Process table cells (mdast uses tableCell for both headers and regular cells)
    visit(tree, "tableCell", (node: TableCell) => {
      // Recursively process all text nodes in the cell
      const processNode = (n: unknown): void => {
        if (typeof n === "object" && n !== null && "type" in n) {
          if (
            n.type === "text" &&
            "value" in n &&
            typeof n.value === "string"
          ) {
            const textNode = n as Text;
            // Normalize whitespace: replace newlines/carriage returns with spaces,
            // collapse multiple spaces, and trim
            textNode.value = textNode.value
              .replace(/[\n\r]/g, " ") // Replace newlines and carriage returns
              .replace(/\s+/g, " ") // Collapse multiple spaces to one
              .trim(); // Remove leading/trailing whitespace
          }

          // Recursively process all child nodes
          if ("children" in n && Array.isArray(n.children)) {
            n.children.forEach(processNode);
          }
        }
      };

      if (node.children && Array.isArray(node.children)) {
        node.children.forEach(processNode);
      }
    });
  };
}
