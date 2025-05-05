import assert from 'node:assert';
import { ValidConfigOptions } from '../options/options';
import { BackportError } from './BackportError';
import { promptForDirectories } from './prompts';

export async function getSourceDirectory({
  options,
}: {
  options: ValidConfigOptions;
  sourceBranch: string;
}) {
  // target directories already specified (in contrast to letting the user choose from a list)
  if (options.sourceDirectory !== undefined) {
    return options.sourceDirectory;
  }

  // require target branches to be specified when when in non-interactive mode
  if (!options.interactive) {
    throw new BackportError({ code: 'no-directories-exception' });
  }

  const choices = [
    {
      name: 'content/cluster-to-cluster-sync/current', // TODO
      checked: false,
    },
  ];

  const result = await promptForDirectories({
    choices,
    isMultipleChoice: false,
  });
  assert(result.length === 1);
  return result[0];
}
