import type { Docset, Version } from 'versioning';

const DOCS_BASE_URL = 'https://www.mongodb.com/docs/';

const PREFIX_DENYLIST = ['404', 'csfle-merge', 'docs-platform', 'meta', 'standby-clusters'];

const stripDocsPrefix = (prefix: string): string => prefix.replace(/^\/?docs(\/|$)/, '');

const isDenied = (strippedPrefix: string): boolean =>
  PREFIX_DENYLIST.some((denied) => strippedPrefix === denied || strippedPrefix.startsWith(`${denied}/`));

/** An inactive version is still served when its `eol` is `link`; `download` versions are not checked. */
const isPublished = (version: Version): boolean => version.active || version.eolType === 'link';

/**
 * A single-version site publishes at its prefix alone, so its version
 * contributes no URL segment. A multi-version site publishes one path per
 * published version, minus `upcoming`, which has no sitemap.
 */
const publishedVersionSegments = (docset: Docset): string[] => {
  if (docset.versions.length <= 1) {
    return docset.versions.filter(isPublished).map(() => '');
  }
  return docset.versions
    .filter((version) => isPublished(version) && version.versionName !== 'upcoming')
    .map((version) => version.versionName);
};

/** Index page and `sitemap-0.xml` for every published version, plus the root sitemaps. */
export const buildHealthCheckUrls = (docsets: Docset[]): string[] => {
  const urls = new Set<string>();

  for (const docset of docsets) {
    if (docset.project === 'landing' || docset.internalOnly) continue;

    const strippedPrefix = stripDocsPrefix(docset.prefix);
    if (isDenied(strippedPrefix)) continue;

    for (const segment of publishedVersionSegments(docset)) {
      const projectPath = [strippedPrefix, segment].filter(Boolean).join('/');
      if (!projectPath) continue;

      const url = `${DOCS_BASE_URL}${projectPath}/`;
      urls.add(url);
      urls.add(`${url}sitemap-0.xml`);
    }
  }

  urls.add(`${DOCS_BASE_URL}sitemap-0.xml`);
  urls.add(`${DOCS_BASE_URL}sitemap-index-full.xml`);

  return [...urls];
};
