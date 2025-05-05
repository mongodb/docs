import { isEmpty, isString } from 'lodash';
import {
  TargetBranchChoice,
  TargetBranchChoiceOrString,
} from '../options/ConfigOptions';
import { ValidConfigOptions } from '../options/options';
import { BackportError } from './BackportError';
import { getSourceBranchFromCommits } from './getSourceBranchFromCommits';
import { promptForTargetBranches } from './prompts';
import { Commit } from './sourceCommit/parseSourceCommit';

export async function getTargetBranches(
  options: ValidConfigOptions,
  commits: Commit[],
) {
  // target branches already specified (in contrast to letting the user choose from a list)
  if (!isEmpty(options.targetBranches)) {
    return options.targetBranches;
  }

  // target branches from the first commit
  const suggestedTargetBranches =
    commits.length > 0 ? commits[0].suggestedTargetBranches : [];

  // require target branches to be specified when when in non-interactive mode
  if (!options.interactive) {
    if (isEmpty(suggestedTargetBranches)) {
      throw new BackportError({ code: 'no-branches-exception' });
    }

    return suggestedTargetBranches;
  }

  const sourceBranch = getSourceBranchFromCommits(commits);
  const targetBranchChoices = getTargetBranchChoices({
    options,
    suggestedTargetBranches,
    sourceBranch,
  });

  // render prmompt for selecting target branches
  return promptForTargetBranches({
    targetBranchChoices,
    isMultipleChoice: options.multipleBranches,
  });
}

export function getTargetBranchChoices({
  options,
  suggestedTargetBranches,
}: {
  options: ValidConfigOptions;
  suggestedTargetBranches: string[];
  sourceBranch: string;
}) {
  const targetBranchesChoices = getTargetBranchChoicesAsObject(
    options.targetBranchChoices,
  );
  // exclude sourceBranch from targetBranchChoices
  //.filter((choice) => choice.name !== sourceBranch);

  if (isEmpty(targetBranchesChoices)) {
    throw new BackportError('Missing target branch choices');
  }

  if (!options.branchLabelMapping) {
    return targetBranchesChoices;
  }

  // select missing target branches (based on pull request labels)
  return targetBranchesChoices.map((choice) => {
    const isChecked = suggestedTargetBranches.includes(choice.name);
    return { ...choice, checked: isChecked };
  });
}

// `targetBranchChoices` can either be a string or an object.
// It must be transformed so it is always treated as an object troughout the application
function getTargetBranchChoicesAsObject(
  targetBranchChoices?: TargetBranchChoiceOrString[],
): TargetBranchChoice[] {
  if (!targetBranchChoices) {
    return [];
  }

  return targetBranchChoices.map((choice) => {
    if (isString(choice)) {
      return {
        name: choice,
        checked: false,
      };
    }

    return choice;
  });
}
