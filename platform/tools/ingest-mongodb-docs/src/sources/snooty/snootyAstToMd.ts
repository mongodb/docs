import {
  SnootyFacetNode,
  SnootyMetaNode,
  SnootyNode,
  SnootyTextNode,
} from "./SnootyDataSource";
import { strict as assert } from "assert";
import { renderSnootyTable } from "./renderSnootyTable";

/**
  Renders a snooty AST node as markdown.
 */
export const snootyAstToMd = (
  node: SnootyNode,
  links?: RenderLinks
): string => {
  return renderAst(node, { parentHeadingLevel: 0 }, links)
    .replaceAll(/ +\n/g, "\n")
    .replaceAll(/\n{3,}/g, "\n\n") // remove extra newlines with just 2
    .trimStart();
};

type RenderState = {
  parentHeadingLevel: number;
  listBullet?: string;
};

export type RenderLinks = {
  includeLinks?: boolean;
  baseUrl?: string;
  includeRefAnchors?: boolean;
};

// Private implementation. Use snootyAstToMd.
const renderAst = (
  node: SnootyNode,
  state: RenderState,
  links?: RenderLinks
): string => {
  const { parentHeadingLevel, listBullet } = state;

  // Base cases (terminal nodes)
  if (node.children === undefined) {
    // value nodes
    switch (node.type) {
      case "text":
        return typeof node.value === "string"
          ? node.value.replaceAll(/(\S)\n/g, "$1 ").replaceAll(/\n(\S)/g, " $1")
          : (node.value as string);
      case "code":
        return `\`\`\`${node.lang || ""}\n${node.value}\n\`\`\`\n\n`;

      default:
        return "";
    }
  }

  // parent nodes
  switch (node.type) {
    case "comment":
      // Do not render comments
      return "";

    case "target_identifier":
      // Just render line break for target_identifier
      return "\n";

    case "section": {
      const isHeading = node.children[0]?.type === "heading";
      return `${node.children
        .map((subnode) =>
          renderAst(
            subnode,
            {
              ...state,
              parentHeadingLevel: parentHeadingLevel + (isHeading ? 1 : 0),
            },
            links
          )
        )
        .join("")}\n\n`;
    }

    case "heading":
      return `${"#".repeat(parentHeadingLevel)} ${node.children
        .map((child) => renderAst(child, { ...state }, links))
        .join("")}\n\n`;

    case "paragraph":
      return `${node.children
        .map((child) => renderAst(child, { ...state }, links))
        .join("")}\n\n`;

    case "list": {
      const isOrderedList = node.enumtype === "arabic";
      return node.children
        .map((listItem, index) =>
          renderAst(
            listItem,
            {
              ...state,
              listBullet: isOrderedList ? `${index + 1}. ` : "- ",
            },
            links
          )
        )
        .join("\n");
    }

    case "listItem":
      return `${node.children
        .map((child) => renderAst(child, { ...state }, links))
        .join("")
        .split("\n")
        .map((line, i) =>
          i === 0
            ? `${listBullet}${line}`
            : `${" ".repeat(listBullet?.length ?? 0)}${line}`
        )
        .join("\n")}\n`;

    // recursive inline cases
    case "literal":
      return `\`${node.children
        .map((child) => renderAst(child, { ...state }, links))
        .join("")}\``;

    case "directive":
      return renderDirective(node, { ...state }, links);

    case "emphasis":
      return `*${node.children
        .map((child) => renderAst(child, { ...state }, links))
        .join("")}*`;

    case "strong":
      return `**${node.children
        .map((child) => renderAst(child, { ...state }, links))
        .join("")}**`;

    case "ref_role":
      if (links?.includeLinks) {
        // For internal refs
        if (
          Array.isArray(node.fileid) &&
          typeof node.fileid?.at(0) === "string"
        ) {
          // type validated in above if statement
          const slug = (node.fileid?.at(0) as string)
            // Add trailing slash if not present
            .replace(/\/?$/, "/")
            // Remove leading slash if present
            .replace(/^\//, "");
          // Fragment is optional. For example, not included for :doc: roles
          const fragment = node.fileid?.at(1) ? "#" + node.fileid?.at(1) : "";
          const baseUrl = links?.baseUrl?.replace(/\/?$/, "/") ?? "";
          const url = `${baseUrl}${slug}${fragment}`;

          return `[${node.children
            .map((subnode) => renderAst(subnode, { ...state }, links))
            .join("")
            .trim()}](${url})`;
        }
        // For external refs (intersphinx)
        else if (typeof node.url === "string") {
          return `[${node.children
            .map((subnode) => renderAst(subnode, { ...state }, links))
            .join("")
            .trim()}](${node.url})`;
        } // Something unexpected occured. Do not process ref link.
        return node.children
          .map((subnode) => renderAst(subnode, { ...state }, links))
          .join("");
      }

      return node.children
        .map((subnode) => renderAst(subnode, { ...state }, links))
        .join("");

    // non-ref links
    case "reference":
      if (links?.includeLinks && typeof node.refuri === "string") {
        return `[${node.children
          .map((subnode) => renderAst(subnode, { ...state }, links))
          .join("")
          .trim()}](${node.refuri})`;
      }
      return node.children
        .map((subnode) => renderAst(subnode, { ...state }, links))
        .join("");
    case "target":
      if (links?.includeRefAnchors && typeof node.html_id === "string") {
        return (
          `<div id="${node.html_id}"></div>\n\n` +
          node.children
            .map((subnode) => renderAst(subnode, { ...state }, links))
            .join("")
        );
      }
      return node.children
        .map((subnode) => renderAst(subnode, { ...state }, links))
        .join("");

    default:
      return node.children
        .map((subnode) => renderAst(subnode, { ...state }, links))
        .join("");
  }
};

/**
  Helper function to handle directives. Directives are special nodes that
  contain a variety of different content types.
 */
const renderDirective = (
  node: SnootyNode,
  state: RenderState,
  links?: RenderLinks
): string => {
  assert(
    node.children,
    "This function should only be called if node has children"
  );
  switch (node.name) {
    case "list-table":
      return renderSnootyTable(node, links);
    case "tab": {
      const tabName = (
        node.argument && Array.isArray(node.argument) && node.argument.length
          ? node.argument.find((arg) => arg.type === "text")?.value ?? ""
          : ""
      ).trim();
      return `\n\n<Tab ${`name="${tabName ?? ""}"`}>\n\n${node.children
        .map((child) => renderAst(child, { ...state }, links))
        .join("")}\n\n</Tab>\n\n`;
    }
    case "tabs":
    case "tabs-drivers":
      return `\n\n<Tabs>\n\n${node.children
        .map((child) => renderAst(child, { ...state }, links))
        .join("")}\n\n</Tabs>\n\n`;
    default:
      return node.children
        .map((subnode) => renderAst(subnode, { ...state }, links))
        .join("");
  }
};

const findNode = (
  node: SnootyNode,
  predicate: (node: SnootyNode) => boolean
): SnootyNode | undefined => {
  if (predicate(node)) {
    return node;
  }
  for (const child of node.children ?? []) {
    const result = findNode(child, predicate);
    if (result) {
      return result;
    }
  }
  return undefined;
};

/**
  Return all nodes in the given tree that match the given predicate.
 */
const findAll = (
  node: SnootyNode,
  predicate: (node: SnootyNode) => boolean
): SnootyNode[] => {
  const matches: SnootyNode[] = [];
  for (const child of node.children ?? []) {
    if (predicate(child)) {
      matches.push(child);
    }
    matches.push(...findAll(child, predicate));
  }
  return matches;
};

export const getTitleFromSnootyAst = (node: SnootyNode): string | undefined => {
  const firstHeading = findNode(node, ({ type }) => type === "heading");
  if (!firstHeading) {
    return undefined;
  }
  const textNodes = findAll(
    firstHeading,
    ({ type }) => type === "text"
  ) as SnootyTextNode[];
  return textNodes.map(({ value }) => value).join("");
};

export const getMetadataFromSnootyAst = (node: SnootyNode) => {
  const facetAndMetaNodes = findAll(
    node,
    ({ name }) => name === "facet" || name === "meta"
  ) as (SnootyFacetNode | SnootyMetaNode)[];

  const facetNodes = facetAndMetaNodes.filter(
    (n) => n.name === "facet"
  ) as SnootyFacetNode[];
  const metaNodes = facetAndMetaNodes.filter(
    (n) => n.name === "meta"
  ) as SnootyMetaNode[];

  const facets = facetNodes.reduce((acc, facetNode) => {
    if (!facetNode.options) {
      return acc;
    }
    const { name, values } = facetNode.options;
    if (!name || !values) {
      return acc;
    }
    acc[name] = values;
    return acc;
  }, {} as Record<string, string>);

  let noIndex = false;
  const meta = metaNodes.reduce((acc, metaNode) => {
    if (!metaNode.options) {
      return acc;
    }
    const metaEntries = Object.entries(metaNode.options);
    for (const [key, value] of metaEntries) {
      if (key === "keywords" && value) {
        acc[key] = value.split(",").map((s) => s.trim());
      } else if (key === "description" && value) {
        acc[key] = value;
      } else if (key === "robots" && value) {
        noIndex = value.includes("noindex");
      }
    }

    return acc;
  }, {} as Record<string, string | string[]>);
  return {
    metadata: {
      ...facets,
      ...meta,
    },
    noIndex,
  };
};
