import { strict as assert } from "assert";
import encodeUrl from "encodeurl";
import { findAll } from "docdoctor";
import { SnootyNode } from "./SnootyDataSource";
import { RenderLinks, snootyAstToMd } from "./snootyAstToMd";

/**
  Return a string of MD from a Snooty AST node.
 */
export const renderSnootyTable = (node: SnootyNode, links?: RenderLinks) => {
  // Table information in snooty AST is expressed in terms of lists and
  // listItems under a list-table directive. We don't want to render the
  // list bullets in the table, so we handle tables differently.
  const table = parseSnootyTable(node);
  return [
    "\n\n<table>",
    renderRows(
      table.headerRows,
      {
        isHeader: true,
      },
      links
    ),
    renderRows(
      table.dataRows,
      {
        isHeader: false,
      },
      links
    ),
    "</table>\n\n",
  ]
    .join("\n")
    .replaceAll(/\n{3,}/g, "\n\n") // remove extra newlines with just 2
    .trim();
};

type RenderTableElementOptions = {
  isHeader: boolean;
};

export const renderRows = (
  rows: Row[],
  options: RenderTableElementOptions,
  links?: RenderLinks
) => {
  return rows
    .map((row) => {
      return ["<tr>", renderCells(row.cells, options, links), "</tr>"];
    })
    .flat(1)
    .join("\n");
};

export const renderCells = (
  cells: Cell[],
  options: RenderTableElementOptions,
  links?: RenderLinks
) => {
  return cells
    .map((cell) => {
      const tag = options.isHeader ? "th" : "td";
      return [
        `<${tag}${
          cell.columnName !== undefined
            ? ` ${tag === "td" ? "headers" : "id"}="${encodeUrl(
                cell.columnName
              )}"`
            : ""
        }>`,
        snootyAstToMd(cell.content, links),
        `</${tag}>`,
      ];
    })
    .flat(1)
    .join("\n");
};

export type Cell = {
  columnName?: string;
  content: SnootyNode;
};

export type Row = {
  cells: Cell[];
};

export type Table = {
  headerRows: Row[];
  dataRows: Row[];
};

/**
  Turns a Snooty AST table into a Table data structure.

  Tables in Snooty are represented as lists of lists under a list-table
  directive. There is no concept for "rows" or "cells" in the AST, which adds
  friction when working with the Snooty AST directly -- especially considering
  that list already have rendering logic that differs from tables. Having an
  intermediate data structure `Table` with `Row`s and `Cell`s makes it easier to
  work with and render.
 */
export const parseSnootyTable = (node: SnootyNode): Table => {
  assert(node.name === "list-table");
  if (node.children === undefined) {
    throw new Error(
      "Failed to parse Snooty table: list-table has no child nodes!"
    );
  }

  const tableList = node.children.find((child) => child.type === "list");
  if (tableList?.children === undefined) {
    throw new Error("Failed to parse Snooty table: invalid table list");
  }
  const directiveOptions = (node as { options?: Record<string, unknown> })
    .options;
  const headerRowCount =
    directiveOptions && typeof directiveOptions["header-rows"] === "number"
      ? directiveOptions["header-rows"]
      : 0;

  let rowIndex = 0;
  const columnNames: string[] = [];
  const rows = tableList.children
    .map((child): Row | undefined => {
      if (child.type !== "listItem") {
        // Ignore all other child nodes
        return undefined;
      }
      const rowList = child.children?.find((child) => child.type === "list");
      if (rowList?.children === undefined) {
        throw new Error("Failed to parse Snooty table: invalid row list");
      }

      const thisRowIndex = rowIndex++;
      let columnIndex = 0;
      return {
        cells: rowList.children
          .map((content) => {
            if (content.type !== "listItem") {
              // Ignore all other child nodes
              return undefined;
            }
            const thisColumnIndex = columnIndex++;
            const columnName =
              thisRowIndex < headerRowCount
                ? findAll(content, (node) => node.value !== undefined)
                    .map(({ value }) => value)
                    .join("")
                : columnNames[thisColumnIndex];
            if (headerRowCount > 0 && thisRowIndex === 0) {
              columnNames.push(columnName);
            }
            const cell: Cell = {
              columnName,
              content: {
                ...content,
                type: "section", // Override "listItem" type so it is not rendered as a list
              },
            };
            return cell;
          })
          .filter((cell) => cell !== undefined) as Cell[],
      };
    })
    .filter((row) => row !== undefined) as Row[];

  return {
    headerRows: rows.slice(0, headerRowCount),
    dataRows: rows.slice(headerRowCount),
  };
};
