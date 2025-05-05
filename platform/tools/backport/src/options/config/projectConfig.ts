import path from 'path';
import findUp from 'find-up';
import { ConfigFileOptions } from '../ConfigOptions';
import { readConfigFile } from '../config/readConfigFile';

export async function getProjectConfig(
  projectConfigFile: string | undefined,
  cwd: string | undefined,
): Promise<ConfigFileOptions | undefined> {
  const filepath = projectConfigFile
    ? path.resolve(projectConfigFile)
    : await findUp('.backportrc.json', { cwd });

  if (!filepath) {
    return;
  }

  return readConfigFile(filepath);
}
