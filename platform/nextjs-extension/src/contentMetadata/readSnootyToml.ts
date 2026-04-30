import path from 'node:path';
import fs from 'node:fs/promises';
import { getRepoPaths } from '../paths';

async function readProjectNameFromToml(contentPath: string): Promise<string> {
  const { contentDir } = getRepoPaths();
  const tomlPath = path.join(contentDir, contentPath, 'snooty.toml');

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

/** key by content path relative to contentDir, e.g. `atlas` or `c-driver/current`; value is project name in snooty.toml */
export type ProjectNames = Record<string, string>;

export const getAllProjectNames = async (
  contentPaths: string[],
): Promise<ProjectNames> => {
  const projectNames: Record<string, string> = {};
  await Promise.all(
    contentPaths.map(async (contentPath) => {
      projectNames[contentPath] = await readProjectNameFromToml(contentPath);
    }),
  );
  return projectNames;
};
