/**
 * Top-level content/ directories that are not documentation projects (or are
 * deprecated projects) and should never get an llms.txt, ported from
 * audit-cli's `generate llms` command (grove-platform/audit-cli#7).
 *
 * Most non-project directories (e.g. content/tools, content/shared,
 * content/table-of-contents) are already skipped automatically because they
 * have no `source/` (or `<version>/source/`) directory for
 * `currentSourceDir` to find. This list only needs entries that DO have a
 * `source/` directory but still shouldn't be treated as a project.
 */
export const EXCLUDED_PROJECTS = new Set([
  '404',
  'docs-platform',
  'meta',
  'table-of-contents',
  'code-examples',
  // Deprecated but still present in the monorepo.
  'app-services',
  'realm',
]);

/**
 * Directory names to skip while walking a project's source tree: these
 * contain include-only RST snippets or code files, not standalone pages.
 *
 * "meta" is a project-specific convention (seen in manual and bi-connector)
 * for generic error/utility pages (401, 403, 404, 410, pdfs) that aren't
 * meaningful documentation and shouldn't appear in any project's llms.txt.
 */
export const EXCLUDED_SOURCE_SUBDIRS = new Set(['includes', 'code-examples', 'meta']);

/**
 * Projects that exist in content/ (and in the generated dir-name-to-prefix.json)
 * but are marked `internalOnly` in repos_branches, i.e. not live on production.
 * There's no public URL to link to, so they shouldn't get an llms.txt either.
 *
 * Ideally this would be resolved dynamically from repos_branches the same way
 * `internalOnly`/`prodDeployable` is checked in
 * platform/docs-nextjs/src/app/api/sitemap/[...path]/route.ts and
 * platform/nextjs-extension/src/blobUploads/buildHealthCheckUrls.ts.
 * Doing that here would mean either querying the DB directly from this
 * standalone script, or teaching buildPrefixList.ts to also emit an
 * internalOnly flag per project into dir-name-to-prefix.json. Until one of
 * those exists, this list is hardcoded.
 *
 * This is not the same as HEALTH_CHECK_PREFIX_DENYLIST in
 * buildHealthCheckUrls.ts — that denylist is broader (non-docs prefixes,
 * inactive projects, etc.). Only add a project here when it is internalOnly
 * and would otherwise get an llms.txt. When adding an internalOnly project
 * to HEALTH_CHECK_PREFIX_DENYLIST, update this set too if it needs an
 * llms.txt exclusion.
 */
export const INTERNAL_ONLY_PROJECTS = new Set(['standby-clusters']);
