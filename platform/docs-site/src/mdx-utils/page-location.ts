import { tocData } from '@/context/toc-data/data.copied';
import type { TocItem } from '@/mdx-components/UnifiedSidenav/types';
import { applyVersionToToc } from '@/utils/apply-version-to-toc';
import { removeTrailingSlash } from '@/utils/remove-trailing-slash';

const DOCS_HOME = '/docs';

const trailsByVersion = new Map<string, Map<string, string[]>>();

const normalize = (path: string): string => removeTrailingSlash(path).toLowerCase();

// Maps every TOC page path to its ancestor chain, itself last. The first entry
// for a path wins, as with the HTML breadcrumbs, because a page can be listed
// under more than one parent.
function indexTrails(items: TocItem[], parents: string[], trails: Map<string, string[]>): void {
  for (const item of items) {
    const path = item.url ? normalize(item.url) : undefined;
    const trail = path && path !== parents[parents.length - 1] ? [...parents, path] : parents;
    if (path && !trails.has(path)) trails.set(path, trail);
    if (item.items) indexTrails(item.items, trail, trails);
  }
}

function getTrails(version: string): Map<string, string[]> {
  let trails = trailsByVersion.get(version);
  if (!trails) {
    trails = new Map();
    indexTrails(applyVersionToToc(tocData as unknown as TocItem[], version), [], trails);
    trailsByVersion.set(version, trails);
  }
  return trails;
}

/**
 * The "This page location" line for a page's markdown export: the `.md` path of
 * each page above this one, from the docs home down to its parent. Returns null
 * for the docs home itself, and for a page that is not in the unified TOC, so
 * nothing is claimed about where it sits.
 *
 * `version` stands in for the `:version` placeholder in TOC urls.
 */
export function buildPageLocation(pagePath: string, version: string): string | null {
  const page = normalize(pagePath);
  const trail = getTrails(version).get(page);
  if (!trail || page === DOCS_HOME) return null;

  const paths = [DOCS_HOME, ...trail.slice(0, -1).filter((path) => path !== DOCS_HOME)];
  return `> This page location: ${paths.map((path) => `${path}.md`).join(' > ')}`;
}
