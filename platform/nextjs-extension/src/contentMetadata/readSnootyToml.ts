import path from 'node:path';
import fs from 'node:fs/promises';

export const getProjectName = async (contentPath: string): Promise<string> => {
  const tomlPath = path.join('/opt/build/repo', contentPath, 'snooty.toml');

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
};

/** key by content path ex: /atlas-cli/main , value is project name in snooty.toml */
export type ProjectNames = Record<string, string>;

export const getAllProjectNames = async (
  contentPaths: string[],
): Promise<ProjectNames> => {
  const projectNames: Record<string, string> = {};
  await Promise.all(
    contentPaths.map(async (contentPath) => {
      projectNames[contentPath] = await getProjectName(contentPath);
    }),
  );
  return projectNames;
};
