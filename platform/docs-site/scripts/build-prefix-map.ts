/**
 * Writes src/generated/prefix-map.json and dir-name-to-prefix.json from the
 * docset data in platform/versioning.
 *
 * prefix-map.json is the URL-side map: every published path prefix, with the
 * leading `docs` segment stripped, sorted so the most specific match comes
 * first (load-metadata does longest-prefix matching). A site with multiple
 * versions publishes one entry per active version; a single-version site
 * publishes its prefix alone.
 *
 * dir-name-to-prefix.json is the content-side map: the directory under
 * /content -> that docset's full prefix. The directory can differ from the
 * project name (project `docs` lives in content/manual), so it is resolved by
 * reading each content/<dir>/snooty.toml.
 */
import path from 'node:path';
import fs from 'node:fs/promises';
import { docsets } from 'versioning';
import { stripDocsPrefix } from '../../nextjs-ssg-extension/src/prefix-map/utils';

/** Most `/`-separated segments first, then alphabetical. */
function sortPrefixesLongestFirst(paths: string[]): string[] {
  return [...paths].sort((a, b) => {
    const depth = b.split('/').length - a.split('/').length;
    return depth !== 0 ? depth : a.localeCompare(b);
  });
}

/** Published URL prefixes, minus the leading `docs` segment. */
function buildPrefixList(): string[] {
  const prefixes = new Set<string>();

  for (const docset of docsets) {
    const stripped = stripDocsPrefix(docset.prefix);
    const multiVersion = docset.versions.length > 1;

    if (multiVersion) {
      for (const version of docset.versions) {
        if (!version.active) continue;
        prefixes.add(stripped ? `${stripped}/${version.versionName}` : version.versionName);
      }
      continue;
    }

    // An unversioned site publishes at its prefix with no version segment.
    // `landing` strips to an empty string; it is the docs root, not a prefix.
    if (stripped) prefixes.add(stripped);
  }

  return sortPrefixesLongestFirst(Array.from(prefixes));
}

/** /content/<dir> -> docset prefix, sourced from each directory's snooty.toml. */
async function buildDirNameToPrefixMap(cwd: string): Promise<Record<string, string>> {
  const contentRoot = path.join(path.resolve(cwd, '../..'), 'content');
  const prefixByProject = new Map(docsets.map((docset) => [docset.project, docset.prefix]));
  const dirNameToPrefix: Record<string, string> = {};

  let dirs: string[];
  try {
    dirs = await fs.readdir(contentRoot);
  } catch (err) {
    console.warn('[build-prefix-map] could not read /content directories:', err);
    return {};
  }

  for (const dir of dirs) {
    const base = path.join(contentRoot, dir);
    // Skip non-directories
    if (!(await fs.stat(base).then((child) => child.isDirectory(), () => false))) continue;

    // A versioned site keeps its snooty.toml one level down, per version.
    const candidates = [path.join(base, 'snooty.toml')];
    for (const sub of await fs.readdir(base)) {
      candidates.push(path.join(base, sub, 'snooty.toml'));
    }

    for (const toml of candidates) {
      const contents = await fs.readFile(toml, 'utf-8').catch(() => null);
      if (contents === null) continue;
      // Extract the project name from the snooty.toml
      const project = /^name\s*=\s*"([^"]+)"/m.exec(contents)?.[1];
      // Map the project name to the docset prefix
      const prefix = project ? prefixByProject.get(project) : undefined;
      if (prefix) dirNameToPrefix[dir] = prefix;
      break;
    }
  }

  return dirNameToPrefix;
}

async function main(): Promise<void> {
  const cwd = process.cwd();
  const generatedDir = path.join(cwd, 'src', 'generated');
  await fs.mkdir(generatedDir, { recursive: true });

  const prefixList = buildPrefixList();
  const outFile = path.join(generatedDir, 'prefix-map.json');
  await fs.writeFile(outFile, JSON.stringify(prefixList, null, 2), 'utf-8');
  console.log('[build-prefix-map] wrote', outFile, `(${prefixList.length} prefixes)`);

  const dirNameToPrefix = await buildDirNameToPrefixMap(cwd);
  const dirMapFile = path.join(generatedDir, 'dir-name-to-prefix.json');
  await fs.writeFile(dirMapFile, JSON.stringify(dirNameToPrefix, null, 2), 'utf-8');
  console.log(
    '[build-prefix-map] wrote',
    dirMapFile,
    `(${Object.keys(dirNameToPrefix).length} project dirs)`,
  );
}

main().catch((err) => {
  console.error('[build-prefix-map]', err);
  process.exit(1);
});
