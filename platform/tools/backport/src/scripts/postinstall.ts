import { getGlobalConfigPath } from '../lib/env';
import { consoleLog } from '../lib/logger';
import { createGlobalConfigAndFolderIfNotExist } from '../options/config/globalConfig';

export async function postinstall() {
  try {
    const globalConfigPath = getGlobalConfigPath(undefined);
    const didCreate =
      await createGlobalConfigAndFolderIfNotExist(globalConfigPath);
    if (didCreate) {
      consoleLog(`Global config successfully created in ${globalConfigPath}`);
    }
  } catch (e) {
    // @ts-expect-error
    consoleLog(`Global config could not be created:\n${e.stack}`);
  }
}
