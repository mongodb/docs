import path from 'node:path';
import fs from 'node:fs/promises';

/**
 * Repo root used to resolve paths like `content/foo/snooty.toml`.
 * Prefer `DOCS_MONOREPO_ROOT` when set; otherwise use `fallbackRoot` (for example
 * `path.resolve(process.cwd(), "..", "..")` from the extension package).
 */
export const getDocsMonorepoRoot = (fallbackRoot: string): string =>
  process.env.DOCS_MONOREPO_ROOT
    ? path.resolve(process.env.DOCS_MONOREPO_ROOT)
    : path.resolve(fallbackRoot);

async function readProjectNameFromToml(
  contentPath: string,
  monorepoRoot: string,
): Promise<string> {
  const root = path.resolve(monorepoRoot);
  const tomlPath = path.join(root, contentPath, 'snooty.toml');

  try {
    const tomlContents = await fs.readFile(tomlPath, 'utf-8');
    // find first instance of name=... in snooty.toml
    const match = tomlContents.match(/name\s*=\s*["']([^"']+)["']/m);
    const name = match?.[1] ?? null;
    if (!name) {
      throw `No name found in ${tomlPath}`;
    }
    return name;
  } catch (error) {
    console.warn(`Unable to read ${tomlPath}: ${error}`);
    return '';
  }
}

/** key by content path ex: /atlas-cli/main , value is project name in snooty.toml */
export type ProjectNames = Record<string, string>;

export const getAllProjectNames = async (
  contentPaths: string[],
  monorepoRoot: string,
): Promise<ProjectNames> => {
  const projectNames: Record<string, string> = {};
  await Promise.all(
    contentPaths.map(async (contentPath) => {
      projectNames[contentPath] = await readProjectNameFromToml(
        contentPath,
        monorepoRoot,
      );
    }),
  );
  return projectNames;
};
