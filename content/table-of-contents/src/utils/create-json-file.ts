import * as fs from 'node:fs';
import * as path from 'node:path';
import type { L1TocItem } from '../../types';

/** Lowercase the path portion of an href, leaving any `?query` / `#hash` alone. */
function lowercaseHrefPath(href: string): string {
  const suffix = href.search(/[?#]/);
  return suffix === -1
    ? href.toLowerCase()
    : href.slice(0, suffix).toLowerCase() + href.slice(suffix);
}

function isMongoDbDocsUrl(url: URL): boolean {
  const host = url.hostname.toLowerCase();
  return (
    (host === 'mongodb.com' || host.endsWith('.mongodb.com')) && url.pathname.startsWith('/docs/')
  );
}

/**
 * Lowercase a ToC href. Keep in sync with
 * `platform/docs-site/src/redirects/case-canonical.ts` `lowercaseDocsHref`
 * (this package cannot import docs-site). Internal `/docs/...` paths and
 * mongodb.com docs URLs become lowercase so sidenav clicks match public page
 * URLs. Query and hash are kept; GitHub and other non-docs hosts stay as
 * authored.
 */
export function lowercaseTocHref(href: string): string {
  if (!href) return href;
  if (!/^[a-z][a-z0-9+.-]*:/i.test(href)) return lowercaseHrefPath(href);
  try {
    const url = new URL(href);
    if (!isMongoDbDocsUrl(url)) return href;
    url.pathname = url.pathname.toLowerCase();
    return url.toString();
  } catch {
    return href;
  }
}

/** `JSON.stringify` replacer that lowercases every `url` field as it is written. */
export function lowercaseUrlReplacer(key: string, value: unknown): unknown {
  return key === 'url' && typeof value === 'string' ? lowercaseTocHref(value) : value;
}

export const generateJSON = (toc: L1TocItem[]) => {
  const filePath = path.join('output');

  console.log(`File will be written to ./${filePath}`);

  fs.mkdirSync(filePath, { recursive: true });
  fs.writeFileSync(
    path.join(filePath, 'toc.json'),
    JSON.stringify(toc, lowercaseUrlReplacer, 2),
  );

  console.log(`The toc.json was written to ./${filePath}`);
};
