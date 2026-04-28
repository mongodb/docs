import { visit } from "unist-util-visit";
import type { Root } from "mdast";

/**
 * Convert admonition components into bold-labeled markdown blocks so that
 * AI consumers understand the semantic weight of the content (warning vs note,
 * etc.) without needing to render custom JSX.
 *
 * Handled components:
 *   <Note>, <Tip>, <Important>, <Warning>, <Example>, <See>, <Seealso>
 *   <Admonition name="tip|note|...">
 *
 * An optional `title` attribute appends a custom label after the type:
 *   <Warning title="About Backups"> → **Warning: About Backups**
 *
 * Input:
 *   <Warning>
 *     Don't do this.
 *   </Warning>
 *
 * Output:
 *   **Warning:**
 *
 *   Don't do this.
 */

const ADMONITION_NAMES = new Set([
  "Note",
  "Tip",
  "Important",
  "Warning",
  "Example",
  "See",
  "Seealso",
  "Admonition",
]);

const DISPLAY_LABELS: Record<string, string> = {
  Note: "Note",
  Tip: "Tip",
  Important: "Important",
  Warning: "Warning",
  Example: "Example",
  See: "See also",
  Seealso: "See also",
  Admonition: "Note",
};

export function transformAdmonitions() {
  return (tree: Root) => {
    const replacements: Array<{
      parent: { children: any[] };
      index: number;
      nodes: any[];
    }> = [];

    visit(tree, (node: any, index: number | undefined, parent: any) => {
      if (!parent || index === undefined) return;
      if (
        node.type !== "mdxJsxFlowElement" &&
        node.type !== "mdxJsxTextElement"
      )
        return;
      if (!ADMONITION_NAMES.has(node.name)) return;

      // For <Admonition name="..."> use the name attr to pick the label
      let baseLabel = DISPLAY_LABELS[node.name] ?? node.name;
      if (node.name === "Admonition") {
        const nameAttr = node.attributes?.find((a: any) => a.name === "name");
        if (nameAttr?.value) {
          const n: string = nameAttr.value;
          baseLabel = n.charAt(0).toUpperCase() + n.slice(1).toLowerCase();
        }
      }

      const titleAttr = node.attributes?.find((a: any) => a.name === "title");
      const label = titleAttr?.value
        ? `${baseLabel}: ${titleAttr.value}`
        : `${baseLabel}:`;

      const labelParagraph: any = {
        type: "paragraph",
        children: [
          { type: "strong", children: [{ type: "text", value: label }] },
        ],
      };

      replacements.push({
        parent,
        index,
        nodes: [labelParagraph, ...(node.children ?? [])],
      });
    });

    for (let i = replacements.length - 1; i >= 0; i--) {
      const { parent, index, nodes } = replacements[i];
      parent.children.splice(index, 1, ...nodes);
    }
  };
}
