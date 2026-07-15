import { getStore } from '@netlify/blobs';
import type { AllContentData } from '../contentMetadata/processContentMetadata.js';
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
 * Builds the list of docs index-page URLs from allContentData and writes them
 * to the `health-check-urls` blob store under the key `index-pages`.
 *
 * URLs are derived from allContentData.docsPaths — the same source used by
 * buildPrefixList — so the health-check URLs always match the prefix-map.
 *
 * Projects are excluded when:
 *   - marked internalOnly or prodDeployable=false in repos_branches
 *   - their stripped prefix matches the denylist
 *   - the content path is inactive or corresponds to the landing project
 *   - the version slug is "upcoming"
 *
 * Only runs on main branch builds. Non-fatal: a blob write failure
 * is logged but does not propagate so the overall build is unaffected.
 */
export const writeHealthCheckUrlsToBlob = async (
  allContentData: AllContentData,
): Promise<void> => {
  const siteID = process.env.NETLIFY_SITE_ID;
  const token = process.env.NETLIFY_ACCESS_TOKEN;

  if (!siteID || !token) {
    console.warn('[blob upload] NETLIFY_SITE_ID or NETLIFY_ACCESS_TOKEN not set — skipping health-check-urls blob write');
    return;
  }

  const urls = buildHealthCheckUrls(allContentData);

  try {
    const store = getStore({ name: HEALTH_CHECK_BLOB_STORE, siteID, token });
    await store.setJSON(HEALTH_CHECK_BLOB_KEY, [...urls]);
    console.log(`[blob upload] wrote ${urls.size} health-check URLs to blob store "${HEALTH_CHECK_BLOB_STORE}"`);
  } catch (err) {
    console.error('[blob upload] Failed to write health-check-urls blob — health check will fall back to hardcoded INDEX_PAGES:', err);
  }
};

/**
 * Pure helper (no I/O) that converts allContentData into the set of
 * health-check URLs. Extracted so it can be called from tests or dry-run scripts.
 *
 * Mirrors getProjectVersionPaths (buildPrefixList.ts) so the URL structure
 * is identical to what the prefix-map contains.
 */
export const buildHealthCheckUrls = (
  allContentData: AllContentData,
): Set<string> => {
  const urls = new Set<string>();

  for (const entry of Object.values(allContentData.docsPaths)) {
    // Landing has no URL prefix of its own
    if (entry.projectDirName === 'landing') continue;
    // Skip inactive versions (inactive branches are not served)
    if (!entry.active) continue;
    // Skip upcoming — no sitemap is generated for those branches
    if (entry.versionName === 'upcoming') continue;

    const projectDocs = allContentData.atlasProjectDocuments[entry.projectName];
    if (!projectDocs) continue;

    const { docsetsEntry, reposBranchesEntry } = projectDocs;
    if (!docsetsEntry?.prefix) continue;
    if (reposBranchesEntry?.internalOnly) continue;
    if (reposBranchesEntry?.prodDeployable === false) continue;

    const stripped = stripDocsPrefix(docsetsEntry.prefix);

    if (stripped) {
      const isDenied = [...HEALTH_CHECK_PREFIX_DENYLIST].some(
        (denied) => stripped === denied || stripped.startsWith(`${denied}/`),
      );
      if (isDenied) continue;
    }

    // Build the project path the same way getProjectVersionPaths does:
    // [stripped, versionName].filter(Boolean).join('/')
    const projectPath = [stripped, entry.versionName].filter(Boolean).join('/');
    if (!projectPath) continue;

    const url = `${DOCS_BASE_URL}${projectPath}/`;
    urls.add(url);

    // Only Snooty-built projects generate sitemap-0.xml via the Next.js route.
    // Non-Snooty projects (buildsWithSnooty: false) used a legacy sitemap.xml.gz
    // served as a static CDN file — not routed through Next.js and not health-checkable here.
    const branches = reposBranchesEntry?.branches ?? [];
    const branch = branches.length > 1
      ? branches.find((b) =>
          b.urlSlug === entry.versionName ||
          b.name === entry.versionName ||
          b.gitBranchName === entry.versionName,
        )
      : branches[0];
    if (branch?.buildsWithSnooty !== false) {
      urls.add(`${url}sitemap-0.xml`);
    }
  }

  // Landing sitemap (https://www.mongodb.com/docs/sitemap-0.xml) — served by the
  // sitemap route using the root _site.json blob, no project prefix needed.
  urls.add(`${DOCS_BASE_URL}sitemap-0.xml`);

  // Sitemap index
  urls.add(SITEMAP_INDEX_URL);

  return urls;
};
