import fs from 'fs/promises';
import { ConfigFileOptions } from '../options/ConfigOptions';

export function mockConfigFiles({
  projectConfig,
  globalConfig,
}: {
  projectConfig: ConfigFileOptions;
  globalConfig: ConfigFileOptions;
}) {
  jest
    .spyOn(fs, 'readFile')
    //@ts-expect-error
    .mockImplementation(async (filepath: string) => {
      if (filepath === '/path/to/project/config') {
        return JSON.stringify(projectConfig);
      }

      if (filepath.endsWith('.backport/config.json')) {
        return JSON.stringify(globalConfig);
      }
    });
}
