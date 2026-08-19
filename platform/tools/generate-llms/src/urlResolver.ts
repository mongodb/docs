/**
 * Maps a content directory name (e.g. "atlas-cli", "voyageai") to its
 * production URL slug, and builds full production/markdown URLs from a
 * project slug + version + page path.
 *
 * The directory-name -> URL-prefix mapping is not hardcoded here. It's read
 * from `platform/docs-nextjs/src/generated/dir-name-to-prefix.json`, the same
 * DB-backed map (built from Atlas docsets/repos_branches, see
 * platform/nextjs-extension/src/blobUploads/{buildPrefixList,mapFilesToUrlPaths}.ts)
 * that the Next.js build/offline pipeline already generates and relies on.
 * That keeps this generator from drifting out of sync with the site's real
 * routing as projects are added, renamed, or removed.
 */
import path from 'node:path';
import fs from 'node:fs/promises';

/** Relative path (from the monorepo root) to the generated dir-name -> prefix map. */
const DIR_NAME_TO_PREFIX_PATH = path.join('platform', 'docs-nextjs', 'src', 'generated', 'dir-name-to-prefix.json');

/**
 * Strips a leading "docs" (or "docs/") segment from a docset prefix.
 * Ported from platform/nextjs-extension/src/blobUploads/utils.ts so this
 * package doesn't need a workspace dependency on nextjs-extension.
 */
export function stripDocsPrefix(prefix: string): string {
  return prefix.replace(/^\/?docs(\/|$)/, '');
}

export type DirNameToPrefix = Record<string, string>;

/**
 * Loads the generated content-directory -> docset-prefix map.
 *
 * This file is a build artifact (gitignored) written by
 * `pnpm --filter docs-nextjs build:prefix-map`, which itself runs as part of
 * `pnpm dev`/`pnpm build` in docs-nextjs. If it hasn't been generated yet,
 * throws with instructions rather than silently falling back to a hardcoded,
 * potentially stale mapping.
 */
export async function loadDirNameToPrefixMap(monorepoPath: string): Promise<DirNameToPrefix> {
  const mapPath = path.join(monorepoPath, DIR_NAME_TO_PREFIX_PATH);
  let raw: string;
  try {
    raw = await fs.readFile(mapPath, 'utf-8');
  } catch {
    throw new Error(
      `Could not read ${mapPath}. This file is generated from the docsets database and isn't checked into ` +
        'git. Generate it first by running `pnpm build:prefix-map` in platform/docs-nextjs (or `pnpm dev`/`pnpm build`, ' +
        'which depend on it), then re-run generate-llms.',
    );
  }
  return JSON.parse(raw) as DirNameToPrefix;
}

/**
 * Returns the base URL slug for a given content directory name, or
 * undefined if that directory has no known docset prefix.
 */
export function getUrlSlugForDir(dirNameToPrefix: DirNameToPrefix, dirName: string): string | undefined {
  const prefix = dirNameToPrefix[dirName];
  if (prefix === undefined) {
    return undefined;
  }
  return stripDocsPrefix(prefix);
}

/**
 * Constructs the production URL from components. Always returns a
 * trailing-slash URL.
 *
 * @param baseUrl - Base URL (e.g., https://www.mongodb.com/docs)
 * @param urlSlug - Project URL slug (e.g., "atlas", "drivers/go"), or "" for projects served at the docs root
 * @param version - Version slug (e.g., "current", "v8.0", "manual"), or "" for non-versioned projects
 * @param pagePath - Page path (e.g., "tutorial/install"), or "" for the project root page
 */
export function buildUrl(baseUrl: string, urlSlug: string, version: string, pagePath: string): string {
  const trimmedBase = baseUrl.replace(/\/+$/, '');
  const pathParts: string[] = [];
  if (urlSlug !== '') {
    pathParts.push(urlSlug);
  }
  if (version !== '') {
    pathParts.push(version);
  }
  if (pagePath !== '') {
    pathParts.push(pagePath);
  }
  return `${trimmedBase}/${pathParts.join('/')}/`;
}

/**
 * Converts a trailing-slash production URL into its markdown-page
 * equivalent. A project's root landing page resolves to `<root>/index.md`
 * because `<root>.md` 404s in production; every other page (including
 * nested section indexes) resolves to `<page>.md`.
 */
export function toMarkdownUrl(url: string, isRootIndex: boolean): string {
  const trimmed = url.replace(/\/$/, '');
  return isRootIndex ? `${trimmed}/index.md` : `${trimmed}.md`;
}

/**
 * Computes a page's URL path (relative to its project/version root) from
 * its absolute source file path.
 *
 * - Strips the sourceDir prefix and the .txt extension.
 * - Normalizes to forward slashes.
 * - Collapses the project root's own `index.txt` to "" (the project root page).
 */
export function computePagePath(sourceDir: string, filePath: string): string {
  const relative = path.relative(sourceDir, filePath).split(path.sep).join('/');
  const withoutExt = relative.replace(/\.txt$/, '');
  return withoutExt === 'index' ? '' : withoutExt;
}
