import { visit } from "unist-util-visit";
import type { Plugin } from "unified";
import type { Heading, Root, RootContent } from "mdast";
import {
  isTabsElement,
  isTabElement,
  getJsxAttr,
  type MdxJsxElement,
} from "../utils/mdx-jsx.js";
import { TAB_END_MARKER, tabStartMarker } from "../utils/tab-markers.js";

/**
 * Convert <Tab name="..."> components into labeled markdown sections.
 *
 * Tabs are UI constructs that present alternative content. For AI consumers
 * and plain-markdown renderers, each tab becomes an H3 heading followed by
 * its content. This preserves the semantic distinction between tab options
 * (e.g. CLI vs UI) using standard markdown structure that any parser or AI
 * agent can navigate by heading.
 *
 * The outer <Tabs> wrapper is left in place and removed later by
 * stripCustomMdx, which simply unwraps its children.
 *
 * This plugin must run after resolveIncludes (so included content inside
 * tabs is already inlined) and before stripCustomMdx.
 *
 * Input:
 *   <Tabs>
 *     <Tab name="Atlas CLI">…</Tab>
 *     <Tab name="Atlas UI">…</Tab>
 *   </Tabs>
 *
 * Output (after stripCustomMdx also runs):
 *   ### Atlas CLI
 *   …
 *   ### Atlas UI
 *   …
 *
 * Optional filtering: when `tabFilter` is provided, only tabs whose `tabid`
 * matches an entry in the filter are emitted; all other tabs are dropped.
 * Matching is case-insensitive and operates on the stable `tabid` attribute
 * only (never the display `name`). When `tabFilter` is omitted or empty,
 * every tab is emitted, preserving the prior behavior exactly.
 */
interface TransformTabsOptions {
  /** Stable `tabid` values to keep. Omit or leave empty to keep all tabs. */
  tabFilters?: string[];
  /** When true, keep only one tab per <Tabs> (the default, else the first). */
  defaultTabsOnly?: boolean;
  /** Map of `tabset` name -> default `tabid`, used only in defaults mode. */
  tabsetDefaults?: Record<string, string>;
  /** When true, wrap each emitted tab in HTML-comment markers so a downstream
   *  consumer can filter tabs out of the finished markdown. */
  tabMarkers?: boolean;
}

export function transformTabs(
  options: TransformTabsOptions = {}
): Plugin<[], Root> {
  const filters = (options.tabFilters ?? [])
    .map((id) => id.trim().toLowerCase())
    .filter((id) => id.length > 0);
  const hasFilter = filters.length > 0;
  const allowed = new Set(filters);
  const defaultTabsOnly = options.defaultTabsOnly === true;
  const tabsetDefaults = options.tabsetDefaults ?? {};
  const tabMarkers = options.tabMarkers === true;

  return () => (tree: Root) => {
    // Pass 1 (defaults mode): keep exactly one <Tab> per <Tabs>. This mirrors
    // what the rendered page shows on load: the mapped default for a
    // selector-driven tabset, otherwise the first tab.
    if (defaultTabsOnly) {
      visit(tree, (node) => {
        if (!isTabsElement(node)) return;
        const tabChildren = (node.children ?? []).filter(isTabElement);
        if (tabChildren.length <= 1) return;

        // `tabsetDefaults` is keyed by selector name (e.g. "drivers"); this
        // lookup relies on the <Tabs tabset="..."> attribute matching that
        // selector key, which is how the content is authored.
        const tabsetName = getJsxAttr(node, "tabset");
        // Case-insensitive match here mirrors the tabFilters convention in
        // Pass 2. (Note: the shared getDefaultTabs that produces this map is
        // case-sensitive, matching the client render; ids are lowercase in
        // practice so the two agree.)
        const defaultId = tabsetName
          ? tabsetDefaults[tabsetName]?.trim().toLowerCase()
          : undefined;

        let keeper: MdxJsxElement | undefined;
        if (defaultId) {
          keeper = tabChildren.find(
            (t) => getJsxAttr(t, "tabid")?.trim().toLowerCase() === defaultId
          );
        }
        if (!keeper) keeper = tabChildren[0];

        // Drop every other <Tab>, keeping non-Tab children (whitespace, etc.).
        // Cast needed: MdxJsxElement is flow|text, whose children types differ,
        // so a filtered RootContent[] isn't directly assignable.
        node.children = node.children.filter(
          (child) => !isTabElement(child) || child === keeper
        ) as typeof node.children;
      });
    }

    // Pass 2: convert the remaining <Tab>s into H3 sections (unchanged).
    const replacements: Array<{
      parent: { children: RootContent[] };
      index: number;
      nodes: RootContent[];
    }> = [];

    visit(tree, (node, index, parent) => {
      if (!parent || index === undefined) return;
      if (!isTabElement(node)) return;

      const tabName = getJsxAttr(node, "name") ?? "Tab";
      const tabid = getJsxAttr(node, "tabid")?.trim().toLowerCase() ?? "";

      // When a filter is active, keep only tabs whose tabid matches.
      // Tabs without a tabid (or with an empty tabid) are not addressable
      // and are dropped while filtering.
      if (hasFilter && (!tabid || !allowed.has(tabid))) {
        replacements.push({
          parent: parent as { children: RootContent[] },
          index,
          nodes: [],
        });
        return;
      }

      const heading: Heading = {
        type: "heading",
        depth: 3,
        children: [{ type: "text", value: tabName }],
      };

      const body = [heading, ...(node.children ?? [])] as RootContent[];

      // The tabset name lives on the enclosing <Tabs>, which is this node's
      // parent until stripCustomMdx unwraps it later in the pipeline.
      const tabsetName = isTabsElement(parent)
        ? getJsxAttr(parent, "tabset")
        : undefined;

      replacements.push({
        parent: parent as { children: RootContent[] },
        index,
        nodes: tabMarkers
          ? [
              { type: "html", value: tabStartMarker(tabid, tabsetName) },
              ...body,
              { type: "html", value: TAB_END_MARKER },
            ]
          : body,
      });
    });

    // Apply in reverse order so earlier indices stay valid
    for (let i = replacements.length - 1; i >= 0; i--) {
      const { parent, index, nodes } = replacements[i];
      parent.children.splice(index, 1, ...nodes);
    }
  };
}
