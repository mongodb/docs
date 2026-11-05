/**
 * Sitemap Redirects Audit
 *
 * Finds files in the `content` directory that would appear in an active sitemap
 * AND match a force redirect. Sitemaps should not list redirected URLs.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { match } from 'path-to-regexp';

const HELP_TEXT = `Sitemap Redirects Audit - finds published content pages that match a force redirect`;

const args = process.argv.slice(2);
if (args.includes('-h') || args.includes('--help')) {
  console.log(HELP_TEXT);
  process.exit(0);
}

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const CONTENT = path.join(REPO, 'content');
const REDIRECTS_DIR = path.join(REPO, 'platform/docs-site/src/redirects');

interface RedirectEntry {
  source: string;
  destination: string;
  statusCode: number;
  force?: boolean;
}
interface Docset {
  project: string;
  prefix: string;
  versions: { versionName: string; active: boolean }[];
}

const importFromRepo = (rel: string): Promise<unknown> =>
  import(pathToFileURL(path.join(REPO, rel)).href);

const { toLowercasePublicPath } = (await importFromRepo(
  'platform/docs-site/src/redirects/case-canonical.ts',
)) as { toLowercasePublicPath: (p: string) => string };
const { docsets } = (await importFromRepo('platform/versioning/index.ts')) as {
  docsets: Docset[];
};

const stripDocs = (p: string): string =>
  p === 'docs' ? '' : p.startsWith('docs/') ? p.slice(5) : p;
const withSlash = (p: string): string => (p.endsWith('/') ? p : `${p}/`);
const SKIP_DIRS = new Set(['includes', '_includes', 'sharedinclude']);

const isDirectory = (p: string): boolean => {
  try {
    return fs.statSync(p).isDirectory();
  } catch {
    return false;
  }
};

const readFileOrNull = (p: string): string | null => {
  try {
    return fs.readFileSync(p, 'utf-8');
  } catch {
    return null;
  }
}

// Published prefixes (mirrors buildPrefixList in build-prefix-map.ts)
const publishedPrefixes = new Set<string>();
for (const docset of docsets) {
  const stripped = stripDocs(docset.prefix);
  if (docset.versions.length > 1) {
    for (const v of docset.versions) {
      if (!v.active) continue;
      publishedPrefixes.add(stripped ? `${stripped}/${v.versionName}` : v.versionName);
    }
  } else if (stripped) {
    publishedPrefixes.add(stripped);
  }
}

// Build a map of project names to prefixes
const prefixByProject = new Map(docsets.map((d) => [d.project, d.prefix]));
const dirToPrefix: Record<string, string> = {};

for (const dir of fs.readdirSync(CONTENT).sort()) {
  const base = path.join(CONTENT, dir);
  if (!isDirectory(base)) continue;
  const candidates = [path.join(base, 'snooty.toml')];
  for (const sub of fs.readdirSync(base)) candidates.push(path.join(base, sub, 'snooty.toml'));
  for (const toml of candidates) {
    const contents = readFileOrNull(toml);
    if (contents === null) continue;
    const project = /^name\s*=\s*"([^"]+)"/m.exec(contents)?.[1];
    const prefix = project ? prefixByProject.get(project) : undefined;
    if (prefix) dirToPrefix[dir] = prefix;
    break;
  }
}

// Read force redirects
const forceRedirects: RedirectEntry[] = fs
  .readdirSync(REDIRECTS_DIR)
  .filter((f) => f.endsWith('-redirects.json') && f !== 'all-redirects.json')
  .sort()
  .flatMap((f) => JSON.parse(fs.readFileSync(path.join(REDIRECTS_DIR, f), 'utf-8')) as RedirectEntry[])
  .filter((r) => r.force === true);

// A redirect source is either a literal path (/docs/foo/) or a pattern that
// uses path-to-regexp syntax (/docs/:version/foo/, /docs/foo/:path*).
// Literal sources are checked with a set lookup. Pattern sources are compiled
// into matcher functions, using the same options as redirect-utils.ts
const PATH_PATTERN_SYNTAX = /[:*()?+{}]/;
type UrlMatcher = (urlPath: string) => unknown;
const literalRedirectSources = new Set<string>();
const patternRedirectMatchers: UrlMatcher[] = [];

for (const redirect of forceRedirects) {
  if (!PATH_PATTERN_SYNTAX.test(redirect.source)) {
    literalRedirectSources.add(withSlash(redirect.source).toLowerCase());
  } else {
    try {
      patternRedirectMatchers.push(match(redirect.source, { decode: decodeURIComponent }));
    } catch {
      // Skip, just like production
    }
  }
}

const matchesForceRedirect = (urlPath: string): boolean =>
  literalRedirectSources.has(urlPath.toLowerCase()) ||
  patternRedirectMatchers.some((matchesPattern) => matchesPattern(urlPath));

const walkTxt = (dir: string, out: string[]): void => {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.isDirectory()) {
      if (SKIP_DIRS.has(ent.name)) continue;
      walkTxt(path.join(dir, ent.name), out);
    } else if (ent.name.endsWith('.txt')) {
      out.push(path.join(dir, ent.name));
    }
  }
}

// Find offenders
const offenders: string[] = [];

for (const dir of fs.readdirSync(CONTENT).sort()) {
  const base = path.join(CONTENT, dir);
  if (!isDirectory(base)) continue;
  const rawPrefix = dirToPrefix[dir];
  if (rawPrefix === undefined) continue;
  const stripped = stripDocs(rawPrefix);

  const sources: { version: string; sourceDir: string }[] = [];
  if (isDirectory(path.join(base, 'source'))) {
    sources.push({ version: '', sourceDir: path.join(base, 'source') });
  } else {
    for (const sub of fs.readdirSync(base).sort()) {
      if (isDirectory(path.join(base, sub, 'source'))) {
        sources.push({ version: sub, sourceDir: path.join(base, sub, 'source') });
      }
    }
  }

  for (const { version, sourceDir } of sources) {
    const sitePrefix = [stripped, version].filter(Boolean).join('/');
    // Unversioned docsets publish at their own prefix; empty prefix = docs root.
    const published =
      version === '' ? stripped === '' || publishedPrefixes.has(stripped) : publishedPrefixes.has(sitePrefix);
    if (!published) continue;

    const files: string[] = [];
    walkTxt(sourceDir, files);
    for (const f of files) {
      const rel = path.relative(sourceDir, f).split(path.sep).join('/').slice(0, -4);
      const segs = rel.split('/');
      if (segs[segs.length - 1] === 'index') segs.pop();
      const rawPath = `/docs/${[sitePrefix, segs.join('/')].filter(Boolean).join('/')}`;
      if (matchesForceRedirect(withSlash(toLowercasePublicPath(rawPath)))) {
        offenders.push(path.relative(REPO, f));
      }
    }
  }
}

if (offenders.length === 0) {
  console.log(`\n✅ No published page matches a force redirect.`);
} else {
  console.log(
    `\n❌ ${offenders.length} published page(s) match a force redirect ` +
      `(served as a redirect although the page exists):\n`,
  );
  for (const file of offenders) console.log(`❌ ${file}`);
}
process.exitCode = offenders.length > 0 ? 1 : 0;
