/**
 * Parses a netlify.toml from a content directory and writes the redirect
 * entries to a *-redirects.json file in src/redirects/.
 *
 * Usage:
 *   tsx scripts/parse-netlify-redirects.ts <content-dir-name> [<content-dir-name> ...]
 *   tsx scripts/parse-netlify-redirects.ts --migrate <content-dir-name> [...]
 *
 * Examples:
 *   pnpm parse:redirects node
 *   pnpm import:redirects node          # parse + apply Next.js migration
 *
 * The script resolves content/<name>/netlify.toml and writes the result to
 * src/redirects/<name>-redirects.json.
 *
 * Filters:
 *   - status=200 entries (Netlify proxy rewrites) are excluded
 *   - status=404 entries (error handlers) are excluded
 *
 * Wildcard conversions:
 *   - /* at end of `from`  →  /:path*  in source
 *   - :splat in `to`       →  :path*   in destination
 */
import fs from 'node:fs';
import path from 'node:path';
import { migrateEntries } from './migrate-redirects';
import type { RedirectEntry } from '../src/redirects/redirect-utils';

const CONTENT_DIR = path.resolve(__dirname, '../../../content');
const REDIRECTS_DIR = path.resolve(__dirname, '../src/redirects');

const FILTERED_STATUSES = new Set([200, 404]);

interface RawTomlRedirect {
  from: string;
  to: string;
  status?: number;
  force?: boolean;
}

/**
 * Converts a single parsed Netlify redirect entry into a RedirectEntry
 * suitable for the Next.js redirect system.
 *
 * Returns null for entries that should be excluded (status 200 or 404).
 */
export function convertEntry(raw: RawTomlRedirect): RedirectEntry | null {
  const statusCode = raw.status ?? 301;

  // 200 = Netlify proxy rewrite (not a redirect); 404 = error handler — neither maps to the Next.js redirect system
  if (FILTERED_STATUSES.has(statusCode)) {
    return null;
  }

  // Next.js only supports relative paths as redirect sources; skip absolute URLs and corrupt entries
  if (raw.from.includes('://')) {
    return null;
  }

  const source = raw.from.replace(/\/\*$/, '/:path*');
  const destination = raw.to.replace(/:splat/g, ':path*');

  const entry: RedirectEntry = { source, destination, statusCode };
  if (raw.force === true) {
    entry.force = true;
  }
  return entry;
}

/**
 * Parses the [[redirects]] section of a netlify.toml file and returns
 * converted RedirectEntry objects, excluding filtered entries.
 */
export async function parseNetlifyToml(tomlPath: string): Promise<RedirectEntry[]> {
  // Reads the netlify.toml and returns all [[redirects]] entries as a normalized array.
  // Dynamic import avoids loading the ESM-only package at module evaluation time (Jest compat).
  const { parseAllRedirects } = await import('@netlify/redirect-parser');
  const { redirects, errors } = await parseAllRedirects({
    netlifyConfigPath: tomlPath,
    redirectsFiles: [],
    configRedirects: [],
    minimal: false,
  });

  for (const err of errors) {
    console.warn(`  Warning: ${(err as Error).message ?? err}`);
  }

  const entries: RedirectEntry[] = [];
  for (const r of redirects as RawTomlRedirect[]) {
    const entry = convertEntry(r);
    if (entry !== null) {
      entries.push(entry);
    }
  }
  return entries;
}

async function processName(name: string, migrate: boolean): Promise<void> {
  const tomlPath = path.join(CONTENT_DIR, name, 'netlify.toml');
  const jsonPath = path.join(REDIRECTS_DIR, `${name}-redirects.json`);

  if (!fs.existsSync(tomlPath)) {
    console.error(`  ERROR: ${tomlPath} not found. Check that "${name}" is a valid content directory.`);
    return;
  }

  if (fs.existsSync(jsonPath)) {
    console.warn(`  WARNING: ${path.basename(jsonPath)} already exists and will be overwritten`);
  }

  const parsed = await parseNetlifyToml(tomlPath);

  let output = parsed;
  let removedCount = 0;

  if (migrate) {
    const { migrated, removed } = migrateEntries(parsed);
    output = migrated;
    removedCount = removed.length;
    for (const entry of removed) {
      console.log(`  REMOVED (catch-all): ${entry.source}`);
    }
  }

  fs.writeFileSync(jsonPath, `${JSON.stringify(output, null, 2)}\n`, 'utf-8');

  const suffix = migrate ? `, ${removedCount} catch-all removed` : '';
  console.log(`  ${path.basename(jsonPath)}: ${output.length} entries written${suffix}`);
}

if (require.main === module) {
  const args = process.argv.slice(2);
  const migrate = args.includes('--migrate');
  const names = args.filter((a) => a !== '--migrate');

  if (names.length === 0) {
    console.error(
      'Usage: tsx scripts/parse-netlify-redirects.ts [--migrate] <content-dir-name> [<content-dir-name> ...]',
    );
    console.error('Example: tsx scripts/parse-netlify-redirects.ts node');
    process.exit(1);
  }

  (async () => {
    console.log(`Parsing ${names.length} netlify.toml file(s)${migrate ? ' (+ migrating)' : ''}...\n`);
    for (const name of names) {
      await processName(name, migrate);
    }
    console.log('\nDone. Review changes and commit.');
  })().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
