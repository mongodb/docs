// Inlined (not imported from mdx-utils/blob-path-remap) to keep this module free
// of Node `fs` imports, so it's safe in client components.
function stripDocsPrefix(prefix: string): string {
  if (prefix === 'docs') return '';
  if (prefix.startsWith('docs/')) return prefix.slice(5);
  return prefix;
}

/**
 * This deploy's Next.js `basePath` — the single runtime source of truth.
 * Per-project: `/docs/<docset-prefix>` (or `/docs` for landing/manual), computed
 * in next.config.mjs and passed through `NEXT_PUBLIC_DOCS_BASE_PATH`. Returns ''
 * for the offline static export (no basePath), making every prefix a no-op there.
 */
export function getBasePath(): string {
  if (process.env.NEXT_PUBLIC_BUILD_STATIC_PAGES === 'true') return '';
  return process.env.NEXT_PUBLIC_DOCS_BASE_PATH || '/docs';
}

/**
 * Suffix appended after basePath for this deploy's `_next` asset bucket.
 * Empty except for manual, which needs a distinguishing bucket so its assets
 * don't collide with landing's identical basePath in b2k. Inactive/EOL manual
 * uses `/docs_static_manual_inactive`. Must match the assetBucketSuffix
 * next.config.mjs bakes into assetPrefix (exposed as
 * NEXT_PUBLIC_DOCS_ASSET_BUCKET_SUFFIX).
 */
export function getAssetBucketSuffix(): string {
  if (process.env.NEXT_PUBLIC_BUILD_STATIC_PAGES === 'true') return '';
  return process.env.NEXT_PUBLIC_DOCS_ASSET_BUCKET_SUFFIX || '';
}

/**
 * This deploy's leading locale segment, or '' for the English build. Locale
 * builds serve under `/<locale>/docs/...` (e.g. `/es/docs/voyageai`), prefixing
 * basePath and every NEXT_PUBLIC_DOCS_PREFIXES entry. `docs` is never a locale,
 * so a leading `docs` segment means no locale. Same rule as next.config.mjs
 * getLocalePrefix(): unset, empty and `en-us` are all the English build.
 */
function getLocaleSegment(): string {
  const [first] = getBasePath().replace(/^\//, '').split('/');
  return first && first !== 'docs' ? first : '';
}

/** Remove this deploy's locale segment from a leading-slash path, if present. */
function stripLocaleSegment(path: string): string {
  const locale = getLocaleSegment();
  if (!locale) return path;
  const prefix = `/${locale}`;
  if (path === prefix) return '/';
  return path.startsWith(`${prefix}/`) ? path.slice(prefix.length) : path;
}

/**
 * getBasePath() with the locale segment stripped, so it matches the unprefixed
 * `/docs/...` paths used in content links, the unified TOC and the URL bar.
 * Identical to getBasePath() on the English build, where there is no locale.
 */
export function getUnlocalizedBasePath(): string {
  return stripLocaleSegment(getBasePath());
}

/**
 * The docset-prefix segments in the basePath (everything after `/docs`), e.g.
 * `['languages','python','django-mongodb']`, or `[]` for `/docs`.
 * generateStaticParams strips these off; content loaders re-prepend them.
 */
function getDocsetPrefixSegments(): string[] {
  const stripped = stripDocsPrefix(stripLocaleSegment(getBasePath()).replace(/^\//, ''));
  return stripped ? stripped.split('/') : [];
}

/** Re-prepend the docset-prefix segments to a basePath-relative route param
 * array to get the full urlPath (for loadMDX / loadSiteMetadata / markdown). */
export function toFullUrlPath(relativePath: string[]): string[] {
  return [...getDocsetPrefixSegments(), ...relativePath];
}

// All docset prefixes (e.g. `/docs`, `/docs/atlas`, `/docs/atlas/architecture`),
// longest-first, from next.config.mjs. Empty in dev/offline. Parsed once.
const SORTED_DOCS_PREFIXES: string[] = (() => {
  const raw = process.env.NEXT_PUBLIC_DOCS_PREFIXES;
  if (!raw) return [];
  try {
    return (JSON.parse(raw) as string[]).slice().sort((a, b) => b.length - a.length);
  } catch {
    return [];
  }
})();

/**
 * If a full `/docs/...` link targets THIS deploy, return the basePath-relative
 * href for client-side next/link navigation; else null (cross-deploy link, must
 * be a full navigation routed by b2k).
 *
 * Uses longest-prefix match, not startsWith(basePath): docsets nest (`/docs/atlas`
 * vs `/docs/atlas/architecture` are separate deploys) and `/docs` would match
 * everything. The link is same-deploy only if its longest matching prefix equals
 * this basePath.
 *
 * manual and landing both resolve to the empty prefix (`/docs`) and are
 * indistinguishable here — always treat them as cross-deploy.
 */
export function sameProjectHref(to: string): string | null {
  const basePath = getBasePath();
  if (!basePath || SORTED_DOCS_PREFIXES.length === 0) return null;
  if (getDocsetPrefixSegments().length === 0) return null;

  const path = to.split(/[?#]/)[0];
  const suffix = to.slice(path.length);
  // Locale builds prefix basePath and every SORTED_DOCS_PREFIXES entry with the
  // locale, but in-content links stay unprefixed, so strip it from both sides
  // before matching. The match is on the stripped link, so slice by its length
  // (not basePath.length) and let next/link re-add the locale-prefixed basePath.
  const strippedPath = stripLocaleSegment(path);
  const strippedBasePath = stripLocaleSegment(basePath);
  const match = SORTED_DOCS_PREFIXES.map(stripLocaleSegment).find(
    (p) => strippedPath === p || strippedPath === `${p}/` || strippedPath.startsWith(`${p}/`),
  );
  if (match !== strippedBasePath) return null;

  // Strip the matched prefix, preserving query/hash; next/link re-adds basePath.
  const rel = `${strippedPath.slice(match.length)}${suffix}`;
  return rel.startsWith('/') ? rel : `/${rel}`;
}
