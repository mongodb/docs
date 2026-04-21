/**
 * Writes src/generated/prefix-map.json from pool `docsets` + `repos_branches`:
 * Cluster0 → pool → each docset's `prefix.dotcomprd` (stripped docs/ prefix),
 * joined with `repos_branches.branches[].urlSlug` when that project has multiple
 * versions (same path rules as buildPrefixList.ts).
 *
 * Output array is sorted with the most path segments first (longest prefix first)
 * so load-metadata longest-prefix matching behaves correctly.
 *
 * Also writes dir-name-to-prefix.json: projectDirName (first segment under
 * content-mdx) → Atlas docset prefix (dotcomprd), matching nextjs-extension
 * blob upload remapFilePath + getDirNameToPrefix.
 */
import 'dotenv/config';
import path from 'node:path';
import fs from 'node:fs/promises';
import { findAllContentPaths } from '../../nextjs-extension/src/contentMetadata/findContentPaths';
import { getAllProjectNames } from '../../nextjs-extension/src/contentMetadata/readSnootyToml';
import { splitContentPath } from '../../nextjs-extension/src/contentMetadata/processContentMetadata';
import { getDocsetsCollection } from '../../nextjs-extension/src/util/databaseConnection/fetchDocsetsData';
import { getReposBranchesCollection } from '../../nextjs-extension/src/util/databaseConnection/fetchReposBranchesData';
import { closeClusterZeroDb } from '../../nextjs-extension/src/util/databaseConnection/clusterZeroConnector';
import { stripDocsPrefix } from '../../nextjs-extension/src/blobUploads/utils';
import type { DocsetsDocument, ReposBranchesDocument } from '../../nextjs-extension/src/util/databaseConnection/types';

const PREFIX_ENV_KEY = 'dotcomprd' as const;

function clusterZeroUriFromEnv(): string {
  const url = process.env.MONGODB_URI?.trim();
  if (!url) throw new Error('Missing MONGODB_URI');
  return url.includes('?') ? url : `${url}/?retryWrites=true&w=majority`;
}

function pickPrefixField(prefixField: unknown): string | undefined {
  if (typeof prefixField === 'string' && prefixField) return prefixField;
  if (prefixField && typeof prefixField === 'object' && PREFIX_ENV_KEY in prefixField) {
    const v = (prefixField as Record<string, string>)[PREFIX_ENV_KEY];
    if (typeof v === 'string' && v) return v;
  }
  return undefined;
}

/** Most `/`-separated segments first, then alphabetical (matches buildPrefixList). */
function sortPrefixesLongestFirst(paths: string[]): string[] {
  return [...paths].sort((a, b) => {
    const depth = b.split('/').length - a.split('/').length;
    return depth !== 0 ? depth : a.localeCompare(b);
  });
}

/** Mirrors buildPrefixList projectPath rules for one docset + repos_branches row. */
function addPrefixesForDocset(
  out: Set<string>,
  stripped: string,
  repos: Pick<ReposBranchesDocument, 'branches'> | undefined,
): void {
  const branches = repos?.branches ?? [];
  const multiVersion = branches.length > 1;

  if (multiVersion) {
    for (const branch of branches) {
      if (branch.active === false) continue;
      const slug = branch.urlSlug?.trim() || branch.name?.trim() || '' || '';
      if (!slug) continue;
      const pathSeg = stripped ? `${stripped}/${slug}` : slug;
      if (pathSeg) out.add(pathSeg);
    }
    return;
  }

  if (stripped) out.add(stripped);
}

async function buildDirNameToPrefixMap(
  cwd: string,
  docsetRows: DocsetsDocument[],
  reposByProject: Map<string, Pick<ReposBranchesDocument, 'branches'>>,
): Promise<Record<string, string>> {
  const monorepoRoot = path.resolve(cwd, '../..');
  const contentDir = path.join(monorepoRoot, 'content');

  let paths: string[] = [];
  try {
    paths = await findAllContentPaths(contentDir, 5, monorepoRoot);
  } catch (err) {
    console.warn('[build-prefix-map] findAllContentPaths failed:', err);
    return {};
  }

  if (paths.length === 0) {
    console.warn('[build-prefix-map] no snooty.toml under content/; wrote empty dir-name-to-prefix.json');
    return {};
  }

  const projectNames = await getAllProjectNames(paths, monorepoRoot);
  const docsetByProject = new Map<string, DocsetsDocument>();
  for (const d of docsetRows) {
    if (d.project) docsetByProject.set(d.project, d);
  }

  const dirNameToPrefix: Record<string, string> = {};
  for (const [contentPath, projectName] of Object.entries(projectNames)) {
    if (!projectName) continue;
    const doc = docsetByProject.get(projectName);
    if (!doc) continue;
    const raw = pickPrefixField(doc.prefix);
    if (!raw) continue;
    const repos = reposByProject.get(projectName);
    const { projectDirName } = splitContentPath({
      contentPath,
      reposBranchesEntry: (repos ?? { branches: [] }) as ReposBranchesDocument,
    });
    if (!projectDirName) continue;
    dirNameToPrefix[projectDirName] = raw;
  }

  return dirNameToPrefix;
}

async function main(): Promise<void> {
  const cwd = process.cwd();
  const poolDb = process.env.POOL_DB_NAME ?? 'pool';
  const docsetsCollection = (process.env.DOCSETS_COLLECTION as string | undefined) ?? 'docsets';
  const reposBranchesCollection = (process.env.REPOS_BRANCHES_COLLECTION as string | undefined) ?? 'repos_branches';

  const uri = clusterZeroUriFromEnv();

  const reposColl = await getReposBranchesCollection({
    clusterZeroURI: uri,
    databaseName: poolDb,
    collectionName: reposBranchesCollection,
    extensionName: 'build-prefix-map',
  });
  const reposByProject = new Map<string, Pick<ReposBranchesDocument, 'branches'>>();
  const reposCursor = reposColl.find({}, { projection: { project: 1, branches: 1, _id: 0 } });
  for await (const row of reposCursor) {
    if (row.project) reposByProject.set(row.project, row);
  }

  const coll = await getDocsetsCollection({
    clusterZeroURI: uri,
    databaseName: poolDb,
    collectionName: docsetsCollection,
    extensionName: 'build-prefix-map',
  });

  const projectPrefixes = new Set<string>();
  const docsetRows: DocsetsDocument[] = [];
  const cursor = coll.find({}, { projection: { project: 1, prefix: 1, _id: 0 } });

  for await (const doc of cursor) {
    docsetRows.push(doc as DocsetsDocument);
    // Snooty preview / tooling docset — not a public docs URL prefix on dotcom.
    if (doc.project === 'snooty') continue;

    const raw = pickPrefixField(doc.prefix);
    if (!raw) continue;
    const stripped = stripDocsPrefix(raw);
    const repos = doc.project ? reposByProject.get(doc.project) : undefined;

    if (!stripped && !(repos?.branches && repos.branches.length > 1)) {
      continue;
    }

    addPrefixesForDocset(projectPrefixes, stripped, repos);
  }

  const sorted = sortPrefixesLongestFirst(Array.from(projectPrefixes));
  const generatedDir = path.join(cwd, 'src', 'generated');
  await fs.mkdir(generatedDir, { recursive: true });
  const outFile = path.join(generatedDir, 'prefix-map.json');
  await fs.writeFile(outFile, JSON.stringify(sorted, null, 2), 'utf-8');
  console.log('[build-prefix-map] wrote', outFile, `(${sorted.length} prefixes)`);

  const dirNameToPrefix = await buildDirNameToPrefixMap(cwd, docsetRows, reposByProject);
  const dirMapFile = path.join(generatedDir, 'dir-name-to-prefix.json');
  await fs.writeFile(dirMapFile, JSON.stringify(dirNameToPrefix, null, 2), 'utf-8');
  console.log('[build-prefix-map] wrote', dirMapFile, `(${Object.keys(dirNameToPrefix).length} project dirs)`);
}

main()
  .catch((err) => {
    console.error('[build-prefix-map]', err);
    process.exit(1);
  })
  .finally(async () => {
    await closeClusterZeroDb();
  });
