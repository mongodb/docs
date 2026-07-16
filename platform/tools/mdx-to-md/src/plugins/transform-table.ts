import { visit } from "unist-util-visit";
import type {
  Root,
  RootContent,
  Html,
  ListItem,
  Parent,
} from "mdast";
import type { MdxJsxFlowElement, MdxJsxTextElement } from "mdast-util-mdx-jsx";

type MdxJsxElement = MdxJsxFlowElement | MdxJsxTextElement;

/**
 * Convert <Table> JSX components into GFM markdown tables.
 *
 * The snooty-ast-to-mdx converter emits tables as nested JSX:
 *   <Table> → <TableHead>/<TableBody> → <TableRow> → <TableCell>/<TableHeaderCell>
 *
 * Each cell's mdast content is flattened to a single-line markdown string so
 * the result is a valid GFM pipe table. Complex cell content is handled:
 *   - plain text, inline code, strong, emphasis, links → serialised to inline markdown
 *   - paragraphs → children inlined
 *   - bullet/ordered lists → items joined with "; "
 *   - code blocks → rendered as inline backtick code
 *   - <br> → collapsed to a space
 *   - mdxJsxFlowElement/mdxJsxTextElement → children unwrapped
 *
 * Emits an `html` mdast node containing the GFM table string so remark-stringify
 * passes it through verbatim.
 *
 * Runs before stripCustomMdx so the nested JSX structure is still intact.
 */

/** Escape characters that would break a GFM table cell on a single line. */
function escapeCellText(text: string): string {
  return text.replace(/\|/g, "\\|").replace(/\n/g, " ");
}

/** Serialise an array of mdast nodes to a single-line markdown string. */
function phrasingsToInlineMd(nodes: RootContent[]): string {
  return nodes.map(phrasingToInlineMd).join("");
}

function phrasingToInlineMd(node: RootContent): string {
  if (!node) return "";

  switch (node.type) {
    case "text":
      return escapeCellText(String(node.value ?? ""));

    case "inlineCode":
      return `\`${String(node.value ?? "")}\``;

    case "link": {
      const text = phrasingsToInlineMd(node.children);
      const url = String(node.url ?? "");
      return `[${text}](${url})`;
    }

    case "strong":
      return `**${phrasingsToInlineMd(node.children)}**`;

    case "emphasis":
      return `*${phrasingsToInlineMd(node.children)}*`;

    case "break":
      return " ";

    case "paragraph":
      return phrasingsToInlineMd(node.children);

    case "list": {
      return node.children
        .map((item: ListItem) => {
          const content = item.children.flatMap((c) =>
            c.type === "paragraph"
              ? c.children
              : ([c] as RootContent[])
          );
          return phrasingsToInlineMd(content);
        })
        .join("; ");
    }

    case "code":
      return `\`${String(node.value ?? "")}\``;

    case "mdxJsxFlowElement":
    case "mdxJsxTextElement":
      return phrasingsToInlineMd(node.children);

    default: {
      const parent = node as unknown as Parent;
      if (Array.isArray(parent.children) && parent.children.length > 0) {
        return phrasingsToInlineMd(parent.children);
      }
      return "";
    }
  }
}

/** Convert a <TableCell> or <TableHeaderCell> JSX node to a cell string. */
function cellToString(cellNode: MdxJsxElement): string {
  const parts: string[] = [];

  for (const child of cellNode.children) {
    if (child.type === "paragraph") {
      parts.push(phrasingsToInlineMd(child.children));
    } else {
      parts.push(phrasingToInlineMd(child));
    }
  }

  // Join multiple paragraphs/blocks with a space; list items already use "; "
  return parts
    .map((p) => p.trim())
    .filter(Boolean)
    .join(" ");
}

const CELL_NAMES = new Set(["TableHeaderCell", "ThCell", "TableCell", "TdCell"]);

/**
 * Recursively collect all cell JSX nodes within a row node.
 * MDX may wrap sibling JSX elements in a paragraph when they appear on
 * consecutive lines, so we can't rely on cells being direct children.
 */
function findCellsInRow(node: RootContent | MdxJsxElement): MdxJsxElement[] {
  if (
    (node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement") &&
    CELL_NAMES.has(node.name ?? "")
  ) {
    return [node];
  }
  const parent = node as unknown as Parent;
  if (Array.isArray(parent.children)) {
    return parent.children.flatMap(findCellsInRow);
  }
  return [];
}

/** Build a GFM table row string: `| cell | cell |` */
function buildRow(cells: string[]): string {
  return "| " + cells.join(" | ") + " |";
}

/** Build the `| --- | --- |` separator row. */
function buildSeparator(count: number): string {
  return "| " + Array(count).fill("---").join(" | ") + " |";
}

export function transformTable() {
  return (tree: Root) => {
    const replacements: Array<{
      parent: Parent;
      index: number;
      nodes: Html[];
    }> = [];

    visit(tree, (node, index, parent) => {
      if (!parent || index === undefined) return;
      if (node.type !== "mdxJsxFlowElement" && node.type !== "mdxJsxTextElement") return;
      const tableNode = node;
      if (tableNode.name !== "Table") return;

      const lines: string[] = [];
      let separatorInserted = false;

      for (const section of tableNode.children) {
        const sectionEl = section;
        if (sectionEl.type !== "mdxJsxFlowElement" && sectionEl.type !== "mdxJsxTextElement") continue;
        const sectionName: string = sectionEl.name ?? "";
        if (sectionName !== "TableHead" && sectionName !== "TableBody") continue;

        for (const rowNode of sectionEl.children) {
          const rowEl = rowNode;
          if (rowEl.type !== "mdxJsxFlowElement" && rowEl.type !== "mdxJsxTextElement") continue;
          if (rowEl.name !== "TableRow") continue;

          const cellStrings: string[] = findCellsInRow(rowEl).map(cellToString);

          if (cellStrings.length === 0) continue;

          lines.push(buildRow(cellStrings));

          // Insert separator after the first (header) row
          if (!separatorInserted) {
            lines.push(buildSeparator(cellStrings.length));
            separatorInserted = true;
          }
        }
      }

      if (lines.length === 0) return;

      const htmlNode: Html = { type: "html", value: lines.join("\n") };
      replacements.push({ parent, index, nodes: [htmlNode] });
    });

    for (let i = replacements.length - 1; i >= 0; i--) {
      const { parent, index, nodes } = replacements[i];
      parent.children.splice(index, 1, ...nodes);
    }
  };
}
