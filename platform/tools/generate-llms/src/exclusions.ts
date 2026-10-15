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
  'bi-connector',
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
