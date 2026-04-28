import { visit } from "unist-util-visit";
import type { Root } from "mdast";

/**
 * Convert JSX table components into HTML <table> elements so that AI consumers
 * and markdown renderers that don't understand the custom JSX can still read
 * the tabular data.
 *
 * The snooty-ast-to-mdx converter emits tables as nested JSX:
 *   <Table> → <TableHead>/<TableBody> → <TableRow> → <TableCell>/<TableHeaderCell>
 *
 * This plugin walks that structure and serialises each cell's mdast content
 * to an HTML string, then emits a single `html` mdast node containing the
 * complete <table>. Supported cell content:
 *   - plain text, inline code, strong, emphasis, links
 *   - paragraphs (joined with <br>)
 *   - fenced code blocks → <pre><code>
 *   - bullet/ordered lists → <ul>/<ol> with <li>
 *
 * This plugin runs before stripCustomMdx so the nested JSX structure is intact.
 */

/** Escape HTML special characters in text content */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Recursively serialise an mdast node (or array of nodes) to an HTML string */
function nodesToHtml(nodes: any[]): string {
  return nodes.map(nodeToHtml).join("");
}

function nodeToHtml(node: any): string {
  if (!node) return "";

  switch (node.type) {
    case "text":
      return escapeHtml(String(node.value ?? ""));

    case "inlineCode":
      return `<code>${escapeHtml(String(node.value ?? ""))}</code>`;

    case "strong":
      return `<strong>${nodesToHtml(node.children ?? [])}</strong>`;

    case "emphasis":
      return `<em>${nodesToHtml(node.children ?? [])}</em>`;

    case "link": {
      const href = escapeHtml(String(node.url ?? ""));
      return `<a href="${href}">${nodesToHtml(node.children ?? [])}</a>`;
    }

    case "paragraph":
      return nodesToHtml(node.children ?? []);

    case "code": {
      const lang = node.lang
        ? ` class="language-${escapeHtml(node.lang)}"`
        : "";
      return `<pre><code${lang}>${escapeHtml(
        String(node.value ?? "")
      )}</code></pre>`;
    }

    case "list": {
      const tag = node.ordered ? "ol" : "ul";
      const items = (node.children ?? []).map(
        (item: any) => `<li>${nodesToHtml(item.children ?? [])}</li>`
      );
      return `<${tag}>${items.join("")}</${tag}>`;
    }

    case "listItem":
      return nodesToHtml(node.children ?? []);

    case "break":
      return "<br>";

    // mdxJsxTextElement / mdxJsxFlowElement — unwrap children
    case "mdxJsxFlowElement":
    case "mdxJsxTextElement":
      return nodesToHtml(node.children ?? []);

    default:
      // Fallback: recurse into children
      if (Array.isArray(node.children) && node.children.length > 0) {
        return nodesToHtml(node.children);
      }
      return "";
  }
}

/**
 * Given the children of a <TableRow>, serialise each cell to an HTML string.
 * Returns an array of { html, isHeader } objects.
 */
function rowCells(rowNode: any): Array<{ html: string; isHeader: boolean }> {
  return (rowNode.children ?? []).flatMap((child: any) => {
    if (
      child.type !== "mdxJsxFlowElement" &&
      child.type !== "mdxJsxTextElement"
    )
      return [];
    const isHeader =
      child.name === "TableHeaderCell" || child.name === "ThCell";
    const paragraphs: string[] = (child.children ?? [])
      .map((c: any) => {
        if (c.type === "paragraph") return nodesToHtml(c.children ?? []);
        return nodeToHtml(c);
      })
      .filter(Boolean);
    return [{ html: paragraphs.join("<br>"), isHeader }];
  });
}

export function transformTable() {
  return (tree: Root) => {
    const replacements: Array<{
      parent: { children: any[] };
      index: number;
      nodes: any[];
    }> = [];

    visit(tree, (node: any, index: number | undefined, parent: any) => {
      if (!parent || index === undefined) return;
      if (
        (node.type !== "mdxJsxFlowElement" &&
          node.type !== "mdxJsxTextElement") ||
        node.name !== "Table"
      )
        return;

      const lines: string[] = ["<table>"];

      for (const section of node.children ?? []) {
        const sectionName: string = section.name ?? "";
        const isHead = sectionName === "TableHead";
        const isBody = sectionName === "TableBody";
        if (!isHead && !isBody) continue;

        lines.push(isHead ? "<thead>" : "<tbody>");

        for (const rowNode of section.children ?? []) {
          if (
            (rowNode.type !== "mdxJsxFlowElement" &&
              rowNode.type !== "mdxJsxTextElement") ||
            rowNode.name !== "TableRow"
          )
            continue;

          lines.push("<tr>");
          for (const cell of rowCells(rowNode)) {
            const tag = cell.isHeader || isHead ? "th" : "td";
            lines.push(`<${tag}>${cell.html}</${tag}>`);
          }
          lines.push("</tr>");
        }

        lines.push(isHead ? "</thead>" : "</tbody>");
      }

      lines.push("</table>");

      const htmlNode: any = { type: "html", value: lines.join("\n") };
      replacements.push({ parent, index, nodes: [htmlNode] });
    });

    for (let i = replacements.length - 1; i >= 0; i--) {
      const { parent, index, nodes } = replacements[i];
      parent.children.splice(index, 1, ...nodes);
    }
  };
}
