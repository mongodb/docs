/**
 * HTML-comment markers that delimit each tab in the markdown output.
 *
 * Emitted only when `tabMarkers` is set (the all-tabs export). They let a
 * consumer select tabs from the finished markdown without re-running this
 * pipeline — the docs-site middleware filters `?tabs=<id,...>` at the edge,
 * where remark is not available.
 *
 * The reader is a copy, not an import: pulling this package into the edge
 * bundle would drag in all of remark. `docs-site/src/utils/tab-markers.ts`
 * parses this format and must be kept in sync; both sides assert the literal
 * shape in their own tests.
 */

export const TAB_END_MARKER = "<!--/tab-->";

/**
 * `--` terminates an HTML comment, and `"` would break attribute parsing, so
 * neither can survive verbatim in a marker. Tab ids and tabset names are
 * slugs in practice, making this a guard rather than a routine escape.
 */
function escapeMarkerValue(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/-{2,}/g, (match) => "&#45;".repeat(match.length));
}

/**
 * Opening marker for one tab. `tabid` comes first so readers can match it with
 * a single anchored pattern. A tab with no `tabid` is not addressable via
 * `?tabs=`; its marker carries only the tabset, and filtering drops it.
 */
export function tabStartMarker(
  tabid: string | undefined,
  tabset: string | undefined
): string {
  const attrs: string[] = [];
  if (tabid) attrs.push(`tabid="${escapeMarkerValue(tabid)}"`);
  if (tabset) attrs.push(`tabset="${escapeMarkerValue(tabset)}"`);
  return attrs.length > 0 ? `<!--tab ${attrs.join(" ")}-->` : "<!--tab-->";
}
