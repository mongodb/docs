import { getStore } from '@netlify/blobs';
import type { AtlasProjectDocuments } from '../contentMetadata/fetchAndStoreAtlasData.js';
import { stripDocsPrefix } from './utils.js';

export const HEALTH_CHECK_BLOB_STORE = 'health-check-urls';
export const HEALTH_CHECK_BLOB_KEY = 'index-pages';
const DOCS_BASE_URL = 'https://www.mongodb.com/docs/';
const SITEMAP_INDEX_URL = `${DOCS_BASE_URL}sitemap-index-full.xml`;

/**
 * Prefixes that should never appear in the health-check URL list.
 * Matched against the stripped prefix using exact equality or startsWith so
 * that both root entries (e.g. "docs-platform") and versioned children, if present,
 * are excluded.
 */
const HEALTH_CHECK_PREFIX_DENYLIST = new Set([
  '404',
  'agentic-platform',
  'csfle-merge',
  'docs-platform',
  'magenta',
  'meta',
  'standby-clusters',
]);

/**
 * Builds the list of docs index-page URLs from all projects in atlasProjectDocuments
 * and writes them to the `health-check-urls` blob store under the key `index-pages`.
 *
 * For multi-version projects, one URL is produced per active branch (using urlSlug).
 * For single-version projects, one URL is produced for the root prefix.
 *
 * Projects are excluded when:
 *   - marked internalOnly or prodDeployable=false in repos_branches
 *   - their stripped prefix matches the denylist
 *
 * Only runs on main branch builds. Non-fatal: a blob write failure
 * is logged but does not propagate so the overall build is unaffected.
 */
export const writeHealthCheckUrlsToBlob = async (
  atlasProjectDocuments: AtlasProjectDocuments,
): Promise<void> => {
  const siteID = process.env.NETLIFY_SITE_ID;
  const token = process.env.NETLIFY_ACCESS_TOKEN;

  if (!siteID || !token) {
    console.warn('[blob upload] NETLIFY_SITE_ID or NETLIFY_ACCESS_TOKEN not set — skipping health-check-urls blob write');
    return;
  }

  const urls = buildHealthCheckUrls(atlasProjectDocuments);

  try {
    const store = getStore({ name: HEALTH_CHECK_BLOB_STORE, siteID, token });
    await store.setJSON(HEALTH_CHECK_BLOB_KEY, [...urls]);
    console.log(`[blob upload] wrote ${urls.size} health-check URLs to blob store "${HEALTH_CHECK_BLOB_STORE}"`);
  } catch (err) {
    console.error('[blob upload] Failed to write health-check-urls blob — health check will fall back to hardcoded INDEX_PAGES:', err);
  }
};

/**
 * Pure helper (no I/O) that converts atlasProjectDocuments into the set of
 * health-check URLs. Extracted so it can be called from tests or dry-run scripts.
 */
const buildHealthCheckUrls = (
  atlasProjectDocuments: AtlasProjectDocuments,
): Set<string> => {
  const urls = new Set<string>();

  for (const { docsetsEntry, reposBranchesEntry } of Object.values(atlasProjectDocuments)) {
    if (!docsetsEntry?.prefix) continue;
    if (reposBranchesEntry?.internalOnly) continue;
    if (reposBranchesEntry?.prodDeployable === false) continue;

    const stripped = stripDocsPrefix(docsetsEntry.prefix);

    // stripped === '' means the prefix is literally "docs" — the project lives at
    // the root of /docs/ and its version slugs form the URL path on their own
    // (e.g. docs project: manual, v8.2, v7.0). Skip only if stripped is non-empty
    // and matches the denylist.
    if (stripped) {
      const isDenied = [...HEALTH_CHECK_PREFIX_DENYLIST].some(
        (denied) => stripped === denied || stripped.startsWith(`${denied}/`),
      );
      if (isDenied) continue;
    }

    const branches = reposBranchesEntry?.branches ?? [];
    const activeBranches = branches.filter((b) => b.active !== false);

    if (activeBranches.length > 1) {
      for (const branch of activeBranches) {
        const slug = branch.urlSlug?.trim();
        if (!slug) continue;
        // For projects with an empty stripped prefix (e.g. "docs"), the slug is
        // the entire path segment: /docs/manual/, /docs/v8.2/, etc.
        const url = stripped
          ? `${DOCS_BASE_URL}${stripped}/${slug}/`
          : `${DOCS_BASE_URL}${slug}/`;
        urls.add(url);
      }
    } else if (stripped) {
      // Single-version projects with an empty stripped prefix would map to the
      // bare /docs/ root — skip those since they are the landing page, not a
      // project index.
      urls.add(`${DOCS_BASE_URL}${stripped}/`);
    }
  }

  // Sitemap index
  urls.add(SITEMAP_INDEX_URL);

  // Per-project sitemap: every index-page URL gets a corresponding sitemap-0.xml,
  // except URLs whose last path segment is "upcoming" (no sitemap exists for those).
  for (const url of [...urls]) {
    const lastSegment = url.replace(/\/+$/, '').split('/').at(-1);
    if (url !== SITEMAP_INDEX_URL && lastSegment !== 'upcoming') {
      urls.add(`${url}sitemap-0.xml`);
    }
  }

  return urls;
};
