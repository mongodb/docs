/**
 * Shared helpers for inspecting MDX JSX nodes (e.g. <Tabs>, <Tab>) in the
 * mdast tree. Used by the tab plugins (collect-tab-info, transform-tabs) so the
 * node/attribute predicates live in one place.
 */

import type { RootContent } from "mdast";

/**
 * MDX JSX element nodes from the mdast tree (flow or text).
 * `name` is `string | null` on the underlying type (null = fragment); our
 * predicates only match concrete tag names, so a null name never passes.
 */
export type MdxJsxElement = Extract<
  RootContent,
  { type: "mdxJsxFlowElement" | "mdxJsxTextElement" }
>;

const isMdxJsxElement = (node: unknown, name: string): node is MdxJsxElement => {
  if (typeof node !== "object" || node === null) return false;
  const n = node as Record<string, unknown>;
  return (
    (n.type === "mdxJsxFlowElement" || n.type === "mdxJsxTextElement") &&
    n.name === name
  );
};

export const isTabsElement = (node: unknown): node is MdxJsxElement =>
  isMdxJsxElement(node, "Tabs");

export const isTabElement = (node: unknown): node is MdxJsxElement =>
  isMdxJsxElement(node, "Tab");

/**
 * Read a string JSX attribute value; undefined if absent or non-string.
 * Matches only `mdxJsxAttribute` nodes (skips expression/spread attributes).
 * Tab attrs are authored as string literals (e.g. tabid="cli"), not expressions.
 */
export const getJsxAttr = (
  node: MdxJsxElement,
  attrName: string
): string | undefined => {
  const attr = node.attributes.find(
    (a) => a.type === "mdxJsxAttribute" && a.name === attrName
  );
  return typeof attr?.value === "string" ? attr.value : undefined;
};
