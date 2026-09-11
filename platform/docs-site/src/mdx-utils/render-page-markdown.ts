import { mdxToMarkdown } from 'mdx-to-md';
import { fetchMdxString } from '@/mdx-utils/fetch-mdx-string';
import { findProjectPathAndSiteJson } from '@/mdx-utils/load-metadata';
import { preResolveImportsForMarkdownExport } from '@/mdx-utils/remark-pre-resolve-imports-for-markdown';
import { mdxHasTabs } from '@/mdx-utils/mdx-has-tabs';
import { resolveTabDefaults } from '@/mdx-utils/resolve-tab-defaults';
import { isVersionPlaceholder } from '@/mdx-utils/load-mdx';
import { loadDirNameToPrefixMap, blobRelativeToDiskCandidates } from '@/mdx-utils/blob-path-remap';
import { getStaticVersion } from '@/utils/extract-mdx-routes-from-toc';
import { toFullUrlPath } from '@/utils/base-path';

/**
 * Which tabs a markdown export emits.
 *
 * `default` — one tab per tabset, mirroring the tab the rendered page shows on
 *   initial load. Prerendered for every page, and served for a bare `.md`
 *   request.
 * `all` — every tab, each wrapped in the markers `filterTabs` reads. Prerendered
 *   only for pages that have tabs (see below); read by /api/markdown-tabs to
 *   answer `?allTabs=true` and `?tabs=<id,...>`.
 */
export type MarkdownTabMode = 'default' | 'all';

const TAB_INFO_PREAMBLE_LINES = [
  'Tab options on this page. Append to the .md URL to filter:',
  '  ?tabs=<id,...>   select specific tabs (e.g. ?tabs=nodejs,shell)',
  '  ?allTabs=true    include every tab',
  '  (no param)       default: one tab per tabset',
];

const TAB_MARKER_NOTE = 'Each tab below is delimited by <!--tab tabid="..."--> ... <!--/tab--> comments.';

// Directive prepended to every markdown export so coding agents that discover a
// `.md` page via webfetch also learn about the docs-wide llms.txt index.
const LLMS_TXT_DIRECTIVE = '> For the complete MongoDB documentation index, see www.mongodb.com/docs/llms.txt';

/**
 * Resolve a basePath-relative route path to an on-disk MDX file and convert it
 * to markdown. Mirrors loadMDX's resolution (version placeholder → static
 * version, then prefix-map disk candidates) but returns markdown rather than a
 * React tree. Returns null when no MDX file matches.
 *
 * Also returns null when `mode` is `all` for a page with no tabs, whose every-
 * tab export would be a byte-for-byte copy of its default one. Most pages have
 * no tabs, so building both regardless would close to double the size of the
 * markdown output to say nothing new. Callers read that miss as "no tabs here"
 * and serve the default export instead.
 *
 * Runs at build time only: both markdown routes are `force-static`, and the
 * `content-mdx` directory this reads is not present in the deployed output.
 */
export async function renderPageMarkdown(relativePath: string[], mode: MarkdownTabMode): Promise<string | null> {
  // Route params are basePath-relative; re-prepend the docset-prefix segments
  // to reconstruct the full urlPath before disk resolution.
  const path = toFullUrlPath(relativePath);
  if (path.length === 0) return null;

  const version = getStaticVersion();
  const resolvedPath = path.map((seg) => (isVersionPlaceholder(seg) ? version : seg));

  const prefixMap = await loadDirNameToPrefixMap();
  const candidates = blobRelativeToDiskCandidates(resolvedPath.join('/'), prefixMap);

  let mdxString: string | null = null;
  let diskPath: string | null = null;
  for (const candidate of candidates) {
    const found = await fetchMdxString(candidate);
    if (found !== null) {
      mdxString = found;
      diskPath = candidate;
      break;
    }
  }

  if (!mdxString) return null;

  const fullPath = (diskPath ?? resolvedPath.join('/')).split('/');
  let projectPath: string;
  try {
    ({ projectPath } = await findProjectPathAndSiteJson(fullPath));
  } catch {
    // Fallback for include paths or pages where _site.json is not found
    projectPath = fullPath.length >= 2 ? fullPath.slice(0, 2).join('/') : fullPath[0] ?? '';
  }

  const resolvedMdx = await preResolveImportsForMarkdownExport(mdxString, projectPath);

  if (mode === 'all' && !mdxHasTabs(resolvedMdx)) return null;

  const tabInfoComment = [...TAB_INFO_PREAMBLE_LINES, ...(mode === 'all' ? ['', TAB_MARKER_NOTE] : [])].join('\n');

  // Omit contentMdxDir: includes/refs are already resolved above.
  const markdown = await mdxToMarkdown(resolvedMdx, undefined, undefined, {
    ...(mode === 'all'
      ? { tabMarkers: true }
      : { defaultTabsOnly: true, tabsetDefaults: resolveTabDefaults(mdxString) }),
    tabInfoComment,
  });

  return `${LLMS_TXT_DIRECTIVE}\n\n${markdown}`;
}
