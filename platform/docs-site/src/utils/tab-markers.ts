/**
 * Reader for the tab markers `mdx-to-md` emits in the all-tabs markdown export
 * (`<!--tab tabid="nodejs" tabset="drivers"--> ... <!--/tab-->`).
 *
 * Selecting tabs is string work over the finished document: the route that
 * answers `?tabs=` runs at request time, when the MDX pipeline cannot be re-run
 * because the content it reads is absent from the deployed output.
 *
 * Deliberately a copy of the writer's format rather than an import: `mdx-to-md`
 * has a single entry point that pulls in the whole remark pipeline, which would
 * then be bundled into that request-time route. The same arrangement is used
 * for redirect matching (see redirects/README.md). Keep in sync with
 * `tools/mdx-to-md/src/utils/tab-markers.ts`; both sides assert the literal
 * marker shape in their tests.
 */

// The body group is non-greedy so each block ends at its own close marker
// rather than the last one in the document. The attribute group tolerates a
// bare `<!--tab-->` (a tab with neither tabid nor tabset). Trailing blank lines
// are part of the match so that dropping a block takes its separator with it,
// leaving the rest of the document byte-for-byte untouched.
const TAB_BLOCK_RE = /<!--tab(| [^>]*)-->[\s\S]*?<!--\/tab-->\n*/g;

const TAB_ID_RE = /\btabid="([^"]*)"/;

/**
 * Keep only the tabs whose `tabid` is in `tabIds`, dropping every other tab
 * block. Content outside tab markers (prose, the tab-info preamble) is
 * untouched.
 *
 * Matching is case-insensitive and ignores surrounding whitespace, mirroring
 * the `tabFilters` convention in mdx-to-md. Tabs with no `tabid` are not
 * addressable and are always dropped, as are all tabs when no id matches.
 */
export function filterTabs(markdown: string, tabIds: string[]): string {
  const allowed = new Set(tabIds.map((id) => id.trim().toLowerCase()).filter((id) => id.length > 0));
  if (allowed.size === 0) return markdown;

  return markdown.replace(TAB_BLOCK_RE, (block: string, attrs: string) => {
    const tabid = TAB_ID_RE.exec(attrs)?.[1]?.trim().toLowerCase();
    // A kept block keeps its markers: they tell an agent which tabid produced
    // the content, and they match what ?allTabs=true serves.
    return tabid && allowed.has(tabid) ? block : '';
  });
}

/**
 * Parse a `?tabs=` value into a list of tab ids. Returns an empty array when
 * the param is absent or contributes no usable ids, in which case the caller
 * should not filter.
 */
export function parseTabsParam(value: string | null): string[] {
  if (!value) return [];
  return value
    .split(',')
    .map((id) => id.trim())
    .filter((id) => id.length > 0);
}
