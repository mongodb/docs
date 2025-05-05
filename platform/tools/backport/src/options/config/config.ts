import { ConfigFileOptions } from '../ConfigOptions';
import { OptionsFromCliArgs } from '../cliArgs';
import { getGlobalConfig } from './globalConfig';
import { getProjectConfig } from './projectConfig';

export type OptionsFromConfigFiles = Awaited<
  ReturnType<typeof getOptionsFromConfigFiles>
>;
export async function getOptionsFromConfigFiles({
  optionsFromCliArgs,
  optionsFromModule,
}: {
  optionsFromCliArgs: OptionsFromCliArgs;
  optionsFromModule: ConfigFileOptions;
}) {
  const projectConfigFile =
    optionsFromCliArgs.projectConfigFile ?? optionsFromModule.projectConfigFile;

  const globalConfigFile = optionsFromCliArgs.globalConfigFile;

  const cwd = optionsFromCliArgs.cwd ?? process.cwd();
  const [projectConfig, globalConfig] = await Promise.all([
    getProjectConfig(projectConfigFile, cwd),
    getGlobalConfig(globalConfigFile),
  ]);

  return {
    ...globalConfig,
    ...projectConfig,
    ...optionsFromModule,
  };
}
