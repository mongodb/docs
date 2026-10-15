/**
 * Reads the docset catalog emitted by platform/versioning.
 *
 * The catalog itself is TypeScript with extensionless relative imports, which
 * this package cannot import directly: it compiles with NodeNext module
 * resolution, where relative imports need explicit file extensions. It reads
 * the emitted JSON instead, the same way urlResolver.ts reads the generated
 * dir-name-to-prefix.json.
 */
import path from 'node:path';
import fs from 'node:fs/promises';

/** Relative path (from the monorepo root) to the emitted catalog. */
const CATALOG_PATH = path.join('platform', 'versioning', 'generated', 'docsets.json');

interface CatalogDocset {
  project: string;
  internalOnly?: boolean;
}

/**
 * Snooty project names marked `internalOnly`: built and deployed, but
 * deliberately not discoverable, so they get no llms.txt.
 *
 * Keyed by Snooty project name (the `name` in snooty.toml), NOT by content
 * directory: the two differ for 17 projects — project `docs` lives in
 * `content/manual`.
 */
export async function loadInternalOnlyProjects(monorepoPath: string): Promise<Set<string>> {
  const catalogPath = path.join(monorepoPath, CATALOG_PATH);
  let raw: string;
  try {
    raw = await fs.readFile(catalogPath, 'utf-8');
  } catch {
    throw new Error(
      `Could not read ${catalogPath}. This file is emitted from the TypeScript docset catalog and ` +
        "isn't checked into git. Generate it first by running `pnpm run emit` in platform/versioning, " +
        'then re-run generate-llms.',
    );
  }

  const docsets = JSON.parse(raw) as CatalogDocset[];
  return new Set(docsets.filter((docset) => docset.internalOnly).map((docset) => docset.project));
}
