import { isEmpty, isString } from 'lodash';
import { ValidConfigOptions } from '../options/options';
import { BackportError } from './BackportError';
import { promptForDirectories } from './prompts';

export async function getTargetDirectories({
  options,
  sourceDirectory,
  targetBranch,
  sourceBranch,
}: {
  options: ValidConfigOptions;
  sourceDirectory: string;
  sourceBranch: string;
  targetBranch: string;
}) {
  // target directories already specified (in contrast to letting the user choose from a list)
  if (!isEmpty(options.targetDirectories)) {
    return options.targetDirectories;
  }

  const suggestedTargetDirectories: string[] = []; // TODO: Feature idea

  // require target branches to be specified when when in non-interactive mode
  if (!options.interactive) {
    if (isEmpty(suggestedTargetDirectories)) {
      throw new BackportError({ code: 'no-directories-exception' });
    }

    return suggestedTargetDirectories;
  }

  const targetDirectoryChoices = getDirectoryChoices({
    options,
    suggestedTargetDirectories,
    sourceBranch,
    sourceDirectory,
    targetBranch,
  });

  // render prompt for selecting target directory
  return promptForDirectories({
    choices: targetDirectoryChoices,
    isMultipleChoice: options.multipleDirectories,
  });
}

export function getDirectoryChoices({
  options,
  suggestedTargetDirectories,
}: {
  options: ValidConfigOptions;
  suggestedTargetDirectories: string[];
  sourceBranch: string;
  sourceDirectory: string;
  targetBranch: string;
}) {
  // Convert any string shorthands to real objects
  const targetDirectoryChoices = options.targetDirectoryChoices.map((value) =>
    stringOrObjectToObject(value, (name) => ({
      name,
      checked: false,
    })),
  );

  if (isEmpty(targetDirectoryChoices)) {
    throw new BackportError('Missing target directory choices');
  }

  if (!options.directoryLabelMapping) {
    return targetDirectoryChoices;
  }

  // select missing target branches (based on pull request labels)
  return targetDirectoryChoices.map((choice) => {
    const isChecked = suggestedTargetDirectories.includes(choice.name);
    return { ...choice, checked: isChecked };
  });
}

export function stringOrObjectToObject<T>(
  value: T,
  objectify: (value: string) => Exclude<T, string>,
): Exclude<T, string> {
  return isString(value) ? objectify(value) : (value as Exclude<T, string>);
}
