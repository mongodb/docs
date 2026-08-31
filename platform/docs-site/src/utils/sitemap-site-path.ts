import { remapDiskRelativeToBlobRelative, stripDocsPrefix } from '../mdx-utils/blob-path-remap';

/**
 * Landing and manual both strip to an empty URL prefix (`/docs/...`).
 * Remap keeps a bare empty-prefix dir as the dir name ("landing") so other
 * consumers can tell landing's index apart from `/docs/`. Sitemap locs must
 * not include that name.
 */
export function sitemapUrlPrefix(
  diskDir: string,
  prefixMap: Record<string, string>,
): string {
  const remapped = remapDiskRelativeToBlobRelative(diskDir, prefixMap);
  const projectName = diskDir.split('/')[0];
  const stripped = stripDocsPrefix(prefixMap[projectName] ?? '');
  // Only the unversioned empty-prefix project (landing, disk dir "landing")
  // should collapse to /docs/. The Manual current version lives at
  // content-mdx/manual/manual — remapped "manual" equals the project name,
  // but it is a version slug and must stay /docs/manual/.
  if (!stripped && diskDir === projectName) {
    return '';
  }
  return remapped;
}

/** True when this `_site.json` dir belongs to the current DOCS_PROJECT deploy. */
export function diskDirBelongsToDocsProject(
  diskDir: string,
  docsProject: string | undefined,
): boolean {
  if (!docsProject) return true;
  const project = docsProject.split('/')[0];
  if (diskDir.split('/')[0] !== project) return false;
  if (!docsProject.includes('/')) return true;
  return diskDir === docsProject;
}

/**
 * Path under public/ (relative to basePath) where this site's sitemap is staged.
 * Empty string means the public/ root — landing at `/docs/sitemap-0.xml`, or an
 * unversioned docset whose prefix is already the app basePath.
 */
export function sitemapPublicRest(urlPrefix: string, docsetBase: string): string | null {
  if (urlPrefix === docsetBase) return '';
  if (docsetBase === '') return urlPrefix;
  if (urlPrefix.startsWith(`${docsetBase}/`)) {
    return urlPrefix.slice(docsetBase.length + 1);
  }
  return null;
}

export function sitemapBaseDocUrl(siteUrl: string, urlPrefix: string): string {
  const origin = siteUrl.replace(/\/+$/, '');
  return urlPrefix ? `${origin}/docs/${urlPrefix}` : `${origin}/docs`;
}
