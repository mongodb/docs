/**
 * Writes microfrontends.json from the docset catalog in platform/versioning.
 *
 * Each app is a directory under /content. Its name is also its Vercel project
 * name (platform/infra/vercel creates one project per app) and its
 * DOCS_PROJECT. An app routes to its docset's prefix, or to each active
 * version for a multi-version site, minus the prefixes of any other app nested
 * beneath it, since Vercel rejects overlapping paths.
 *
 * The output is committed because Vercel and Terraform read it as-is. Run it
 * with --check to fail when the committed file is stale.
 *
 *   pnpm --filter docs-site generate:microfrontends
 *   pnpm --filter docs-site check:microfrontends
 */
import fs from 'node:fs';
import path from 'node:path';
import { docsetsByProject, isMultiVersion, type Docset } from 'versioning';

/** Content directories deployed as microfrontends. Add a directory here to deploy it. */
const APPS = ['landing', 'manual', 'atlas', 'atlas-government'];

const DEFAULT_APP = 'landing';
/** platform/infra/vercel assigns this domain to the default app's project. */
const DEFAULT_APP_FALLBACK = 'mongodb-docs.vercel.app';

/**
 * Paths an app serves outside its prefix. manual shares the `docs` prefix with
 * landing, so next.config.mjs moves manual's assets under this bucket suffix.
 */
const EXTRA_PATHS: Record<string, string[]> = {
  manual: ['/docs/docs_static_manual/:path*'],
};

const docsSiteDir = path.resolve(import.meta.dirname, '..');
const contentRoot = path.resolve(docsSiteDir, '../../content');
const outputPath = path.join(docsSiteDir, 'microfrontends.json');

/** A versioned site keeps its snooty.toml one level down, per version. */
function docsetForContentDir(dir: string): Docset {
  const base = path.join(contentRoot, dir);
  const candidates = [path.join(base, 'snooty.toml')];
  if (fs.existsSync(base)) {
    for (const sub of fs.readdirSync(base)) candidates.push(path.join(base, sub, 'snooty.toml'));
  }
  for (const toml of candidates) {
    if (!fs.existsSync(toml)) continue;
    const project = /^name\s*=\s*"([^"]+)"/m.exec(fs.readFileSync(toml, 'utf8'))?.[1];
    const docset = project ? docsetsByProject.get(project) : undefined;
    if (!docset) throw new Error(`content/${dir} declares project "${project}", which is not in platform/versioning`);
    return docset;
  }
  throw new Error(`content/${dir} has no snooty.toml`);
}

/** URL bases without slashes: the prefix, or prefix/versionName per active version. */
function basesFor(docset: Docset): string[] {
  if (!isMultiVersion(docset)) return [docset.prefix];
  return docset.versions
    .filter((version) => version.active)
    .map((version) => `${docset.prefix}/${version.versionName}`);
}

function generate(): string {
  for (const app of APPS) {
    if (!/^[a-z0-9-]+$/.test(app)) throw new Error(`app "${app}" must be a plain content directory name`);
  }
  if (!APPS.includes(DEFAULT_APP)) throw new Error(`default app "${DEFAULT_APP}" is not in APPS`);

  const docsets = new Map(APPS.map((app) => [app, docsetForContentDir(app)]));
  const routedApps = APPS.filter((app) => app !== DEFAULT_APP);
  const owners = new Map<string, string>();

  const applications: Record<string, unknown> = {
    [DEFAULT_APP]: { development: { fallback: DEFAULT_APP_FALLBACK } },
  };

  for (const app of routedApps) {
    const paths: string[] = [];
    for (const base of basesFor(docsets.get(app)!)) {
      const owner = owners.get(base);
      if (owner) throw new Error(`/${base} would route to both ${owner} and ${app}`);
      owners.set(base, app);

      const nested = routedApps
        .filter((other) => other !== app)
        .map((other) => docsets.get(other)!.prefix)
        .filter((prefix) => prefix.startsWith(`${base}/`))
        .map((prefix) => prefix.slice(base.length + 1))
        .sort();
      for (const segment of nested) {
        if (!/^[a-z0-9/-]+$/.test(segment))
          throw new Error(`cannot exclude "${segment}" from /${base}: unsupported characters`);
      }

      paths.push(`/${base}`, nested.length ? `/${base}/:path((?!${nested.join('|')}).*)` : `/${base}/:path*`);
    }
    paths.push(...(EXTRA_PATHS[app] ?? []));
    applications[app] = { routing: [{ paths }] };
  }

  const config = { $schema: 'https://openapi.vercel.sh/microfrontends.json', applications };
  return `${JSON.stringify(config, null, 2)}\n`;
}

const expected = generate();

if (process.argv.includes('--check')) {
  const actual = fs.existsSync(outputPath) ? fs.readFileSync(outputPath, 'utf8') : '';
  if (actual !== expected) {
    console.error(
      '[microfrontends] microfrontends.json is out of date. Run `pnpm --filter docs-site generate:microfrontends` and commit the result.',
    );
    process.exit(1);
  }
  console.log('[microfrontends] microfrontends.json is up to date');
} else {
  fs.writeFileSync(outputPath, expected, 'utf8');
  console.log(`[microfrontends] wrote ${outputPath} (${APPS.length} apps)`);
}
