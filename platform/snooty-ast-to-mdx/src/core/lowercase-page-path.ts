/**
 * Page MDX filenames are the Next.js route. Public docs URLs are always
 * lowercase, so conversion emits page files at the lowercased path.
 *
 * Include and asset paths are not routes — do not run these helpers on
 * `_includes/` or image output.
 */

/** Lowercase every path segment of a relative page path (`Foo/Bar.mdx` → `foo/bar.mdx`). */
export function toLowercaseRelativePath(relativePath: string): string {
  return relativePath
    .split('/')
    .map((seg) => (seg === '.' || seg === '..' || seg === '' ? seg : seg.toLowerCase()))
    .join('/');
}

/**
 * Throw if two distinct relative page paths differ only by case. The first-seen
 * path is reported alongside the colliding one. Same path twice is not a collision.
 */
export function assertUniqueLowercasePagePaths(relativePaths: string[]): void {
  const seen = new Map<string, string>();
  for (const p of relativePaths) {
    const key = toLowercaseRelativePath(p);
    const prev = seen.get(key);
    if (prev !== undefined && prev !== p) {
      throw new Error(
        `Case-only page path collision: "${prev}" and "${p}" both emit "${key}"`,
      );
    }
    if (prev === undefined) seen.set(key, p);
  }
}

/**
 * Lowercase the path of a relative docs href; keep query string, hash, and
 * scheme-based URLs (http, mailto, …) unchanged so heading anchors and
 * external links are not rewritten. Absolute mongodb.com URLs are left
 * as-is here; the docs site lowercases those at request/ToC time.
 */
export function lowercaseRelativeHref(href: string): string {
  if (!href || /^[a-z][a-z0-9+.-]*:/i.test(href)) return href;
  const hashIdx = href.indexOf('#');
  const beforeHash = hashIdx === -1 ? href : href.slice(0, hashIdx);
  const hash = hashIdx === -1 ? '' : href.slice(hashIdx);
  const qIdx = beforeHash.indexOf('?');
  const pathPart = qIdx === -1 ? beforeHash : beforeHash.slice(0, qIdx);
  const query = qIdx === -1 ? '' : beforeHash.slice(qIdx);
  return pathPart.toLowerCase() + query + hash;
}
