/**
 * Migration script to convert netlify.toml redirects into the Next.js JSON format.
 *
 * Automatically discovers all *-redirects.json files in the src/redirects/ directory.
 *
 * Rules:
 * - Catch-all entries that insert a default version slug are REMOVED
 *   (these are soft redirects that page.tsx handles on 404 without looping).
 * - Entries with explicit `force: true` from the netlify.toml are preserved as-is.
 * - All other entries are kept without a `force` field (soft by default).
 */
import fs from 'node:fs';
import path from 'node:path';
import type { RedirectEntry } from '../src/redirects/redirect-utils';

const VERSION_SLUGS = ['current', 'upcoming'];
const VERSION_SLUG_RE = /^v\d/;

function isVersionSlug(segment: string): boolean {
  return VERSION_SLUGS.includes(segment) || VERSION_SLUG_RE.test(segment);
}

export function isRecursiveRedirect(entry: RedirectEntry): boolean {
  if (entry.source === entry.destination) {
    return true;
  }

  // Wildcard redirect that inserts a version slug (e.g. /foo/:path* → /foo/current/:path*)
  if (/:\w+\*$/.test(entry.source)) {
    const srcParts = entry.source.split('/').filter(Boolean);
    const destParts = entry.destination.split('/').filter(Boolean);
    if (destParts.length === srcParts.length + 1) {
      const versionIdx = destParts.findIndex((part, i) => isVersionSlug(part) && srcParts[i] !== part);
      if (versionIdx !== -1) {
        const destWithoutVersion = [...destParts.slice(0, versionIdx), ...destParts.slice(versionIdx + 1)];
        if (destWithoutVersion.every((part, i) => part === srcParts[i])) {
          return true;
        }
      }
    }
  }

  return false;
}

export function isVersionCatchAll(entry: RedirectEntry): boolean {
  // Matches :path* catch-all that inserts a version slug for all paths
  if (/:\w+\*$/.test(entry.source)) {
    const srcBase = entry.source.replace(/:\w+\*$/, '');
    const destBase = entry.destination.replace(/:\w+\*$/, '');
    const insertedSlug = destBase.replace(srcBase, '').replace(/\/$/, '');
    if (insertedSlug && isVersionSlug(insertedSlug) && destBase === `${srcBase}${insertedSlug}/`) {
      return true;
    }
  }
  return false;
}

export function migrateEntries(entries: RedirectEntry[]): {
  migrated: RedirectEntry[];
  removed: RedirectEntry[];
  numDeduped: number;
} {
  const migrated: RedirectEntry[] = [];
  const removed: RedirectEntry[] = [];

  for (const entry of entries) {
    /**  Removes circular redirects that were present in netlify for versioned sites
    Adds nextjs-friendly redirect to replicate functionality instead
    example functionality: /docs/drivers/node/ → /docs/drivers/node/current/ 
    */
    if (isVersionCatchAll(entry)) {
      removed.push(entry);
      const baseDest = entry.destination.replace(/:\w+\*$/, '').replace(/\/$/, '/');
      const destParts = baseDest.split('/').filter(Boolean);
      const versionSlug = destParts.find((p) => isVersionSlug(p));
      const basePath = versionSlug ? baseDest.replace(new RegExp(`${versionSlug}/`), '') : baseDest;
      migrated.push(
        {
          source: `${basePath}`,
          destination: `${basePath}current/`,
          statusCode: 301,
        },
        {
          source: `${basePath}:first((?!current|upcoming|v\\d)[^/]+)/:rest*`,
          destination: `${basePath}current/:first/:rest*`,
          statusCode: 301,
        },
      );
      continue;
    }
    if (isRecursiveRedirect(entry)) {
      removed.push(entry);
      continue;
    }

    migrated.push(entry);
  }

  const deduped = [...new Set(migrated.map((e) => JSON.stringify(e)))].map((s) => JSON.parse(s));
  const numDeduped = migrated.length - deduped.length;

  return { migrated: deduped, removed, numDeduped };
}

function migrateFile(filePath: string): void {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const entries: RedirectEntry[] = JSON.parse(raw);
  const { migrated, removed, numDeduped } = migrateEntries(entries);

  for (const entry of removed) {
    console.log(`  REMOVED (catch-all): ${entry.source}`);
  }

  fs.writeFileSync(filePath, JSON.stringify(migrated, null, 2) + '\n', 'utf-8');
  const totalRemoved = removed.length + numDeduped;
  console.log(
    `  ${path.basename(filePath)}: ${migrated.length} entries kept, ${totalRemoved} removed (${
      removed.length
    } catch-all, ${numDeduped} duplicates)`,
  );
}

function discoverRedirectFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('-redirects.json'))
    .map((f) => path.join(dir, f))
    .sort();
}

if (require.main === module) {
  const redirectsDir = path.resolve(__dirname, '../src/redirects');
  const args = process.argv.slice(2);
  const files = args.length > 0 ? args.map((f) => path.resolve(f)) : discoverRedirectFiles(redirectsDir);

  if (files.length === 0) {
    console.error('No redirect files found. Pass file paths as arguments or add *-redirects.json to src/redirects/.');
    process.exit(1);
  }

  console.log(`Migrating ${files.length} redirect file(s)...\n`);
  for (const file of files) {
    migrateFile(file);
  }
  console.log('\nDone. Review changes and commit.');
}
