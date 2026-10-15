import fs from 'node:fs';
import path from 'node:path';
import type { Config } from '../config.js';
import type { RunManifest, PageRef } from '../types.js';
import { enumeratePages } from './enumerate.js';
import { buildPageRefs } from './urls.js';
import { buildIncludeGraph, computeClosure } from './closure.js';
import { newRunId, writeManifest } from '../run/manifest.js';

const REFKEY_RE = /refKey="([^"]+)"/g;

function walkMdx(dir: string, base: string, out: string[] = []): string[] {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walkMdx(full, base, out);
    else if (e.name.endsWith('.mdx')) out.push(path.relative(base, full));
  }
  return out;
}

/**
 * `buildPageRefs` derives `mdxPath` from URL segments, so index pages come out as
 * `atlas.mdx` / `atlas/foo.mdx` rather than the files that actually exist
 * (`atlas/index.mdx` / `atlas/foo/index.mdx`). Resolve to the real file so the
 * closure seed matches the include-graph keys and later source reads find the file.
 */
function resolveMdxPath(contentMdxDir: string, mdxPath: string): string {
  if (fs.existsSync(path.join(contentMdxDir, mdxPath))) return mdxPath;
  const indexMdxPath = mdxPath.replace(/\.mdx$/, '/index.mdx');
  if (fs.existsSync(path.join(contentMdxDir, indexMdxPath))) return indexMdxPath;
  throw new Error(
    `no MDX file found for page "${mdxPath}" under content-mdx/ ` +
      `(looked for "${mdxPath}" and "${indexMdxPath}")`,
  );
}

function readDirNameToPrefix(): Record<string, string> {
  const p = path.resolve(import.meta.dirname, '../../../../docs-site/src/generated/dir-name-to-prefix.json');
  if (!fs.existsSync(p)) {
    throw new Error('dir-name-to-prefix.json not found — run: pnpm --filter docs-site build:prefix-map');
  }
  return JSON.parse(fs.readFileSync(p, 'utf8')) as Record<string, string>;
}

export interface ResolveOptions {
  /** Injected prefix map; read from docs-site/generated when omitted. */
  dirNameToPrefix?: Record<string, string>;
  /**
   * Eval set: `urlPath`s or `mdxPath`s of the pages to include. When omitted,
   * every enumerated page is part of the eval set.
   */
  pages?: string[];
  /** Overrides `cfg.locales` in the manifest. */
  locales?: string[];
}

export async function resolveProject(
  cfg: Config,
  project: string,
  runId: string = newRunId(),
  options: ResolveOptions = {},
): Promise<{ runId: string; manifest: RunManifest }> {
  const contentRoot = path.resolve(cfg.contentMdxDir);
  const siteDir = path.resolve(cfg.contentMdxDir, project);
  if (siteDir !== contentRoot && !siteDir.startsWith(contentRoot + path.sep)) {
    throw new Error(`--project "${project}" escapes content-mdx/`);
  }
  if (!fs.existsSync(siteDir)) throw new Error(`content-mdx/${project} not found — run convert:rst-to-mdx first`);
  const siteJsonPath = path.join(siteDir, '_site.json');
  if (!fs.existsSync(siteJsonPath)) {
    const versions = fs
      .readdirSync(siteDir, { withFileTypes: true })
      .filter((e) => e.isDirectory() && fs.existsSync(path.join(siteDir, e.name, '_site.json')))
      .map((e) => e.name)
      .sort();
    throw new Error(
      versions.length
        ? `content-mdx/${project} is a versioned project; pass --project ${project}/<version>. Versions: ${versions.join(', ')}`
        : `content-mdx/${project}/_site.json not found`,
    );
  }

  const dirNameToPrefix = options.dirNameToPrefix ?? readDirNameToPrefix();
  const siteJson = JSON.parse(fs.readFileSync(siteJsonPath, 'utf8'));

  const diskPaths = await enumeratePages(siteDir, cfg.contentMdxDir);
  let pages: PageRef[] = buildPageRefs(project, diskPaths, dirNameToPrefix, siteJson);
  // `buildPageRefs` emits URL-derived paths; replace them with the real content-mdx
  // file paths so index pages resolve to `index.mdx` (see `resolveMdxPath`).
  pages = pages.map((p) => ({ ...p, mdxPath: resolveMdxPath(cfg.contentMdxDir, p.mdxPath) }));

  if (options.pages) {
    const wanted = new Set(options.pages);
    const matched = new Set<string>();
    for (const p of pages) {
      if (wanted.has(p.urlPath)) matched.add(p.urlPath);
      if (wanted.has(p.mdxPath)) matched.add(p.mdxPath);
    }
    for (const entry of wanted) {
      if (!matched.has(entry)) {
        throw new Error(`--pages entry "${entry}" matches no enumerated page in content-mdx/${project}`);
      }
    }
    pages = pages.filter((p) => wanted.has(p.urlPath) || wanted.has(p.mdxPath));
  }

  // Paths are PROJECT-RELATIVE (relative to content-mdx/<project>, e.g. "alerts.mdx",
  // "_includes/a.mdx"). This is the canonical convention for the closure and the
  // TranslatableSet: include srcs like "/_includes/a" resolve to "_includes/a.mdx",
  // so graph keys and edges must be project-relative to match.
  const allFiles = walkMdx(siteDir, siteDir);
  const read = (f: string) => fs.readFileSync(path.join(siteDir, f), 'utf8');
  const graph = buildIncludeGraph(siteDir, allFiles, read);

  const refKeys: Record<string, string[]> = {};
  for (const f of allFiles) refKeys[f] = [...read(f).matchAll(REFKEY_RE)].map((m) => m[1]!);

  const refsPath = path.join(siteDir, '_references.json');
  const substitutionKeys = new Set<string>(
    fs.existsSync(refsPath)
      ? Object.keys(JSON.parse(fs.readFileSync(refsPath, 'utf8')).substitutions ?? {})
      : [],
  );

  // PageRef.mdxPath is now the real content-mdx-relative file (e.g. "atlas/alerts.mdx",
  // "atlas/index.mdx"); strip the project prefix so the closure seed matches the
  // project-relative include-graph keys.
  const projectPrefix = `${project}/`;
  const toSeed = (mdxPath: string): string => {
    if (!mdxPath.startsWith(projectPrefix)) {
      throw new Error(`mdxPath "${mdxPath}" is not under content-mdx/${project}/`);
    }
    return mdxPath.slice(projectPrefix.length);
  };
  const seedPages = [...new Set(pages.map((p) => toSeed(p.mdxPath)))].sort();
  const translatable = computeClosure(seedPages, graph, refKeys, substitutionKeys);

  const manifest: RunManifest = {
    project,
    runId,
    locales: options.locales ?? cfg.locales,
    pages,
    translatable,
    stages: { resolve: { status: 'done', at: new Date().toISOString() } },
  };
  writeManifest(cfg, project, runId, manifest);
  return { runId, manifest };
}
