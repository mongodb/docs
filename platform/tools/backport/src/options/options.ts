import chalk from 'chalk';
import { isEmpty } from 'lodash';
import { BackportError } from '../lib/BackportError';
import { getGlobalConfigPath } from '../lib/env';
import {
  getOptionsFromGithub,
  OptionsFromGithub,
} from '../lib/github/v4/getOptionsFromGithub/getOptionsFromGithub';
import { getRepoOwnerAndNameFromGitRemotes } from '../lib/github/v4/getRepoOwnerAndNameFromGitRemotes';
import { setAccessToken } from '../lib/logger';
import {
  ConfigFileOptions,
  TargetBranchChoiceOrString,
  DirectoryChoiceOrString,
} from './ConfigOptions';
import { OptionsFromCliArgs } from './cliArgs';
import {
  getOptionsFromConfigFiles,
  OptionsFromConfigFiles,
} from './config/config';

const PROJECT_CONFIG_DOCS_LINK =
  'https://github.com/sorenlouv/backport/blob/main/docs/config-file-options.md#project-config-backportrcjson';

const GLOBAL_CONFIG_DOCS_LINK =
  'https://github.com/sorenlouv/backport/blob/main/docs/config-file-options.md#global-config-backportconfigjson';

export type ValidConfigOptions = Readonly<
  Awaited<ReturnType<typeof getOptions>>
>;

export const defaultConfigOptions = {
  assignees: [] as Array<string>,
  autoAssign: false,
  autoMerge: false,
  autoMergeMethod: 'merge',
  backportBinary: 'backport',
  cherrypickRef: true,
  commitConflicts: false,
  commitPaths: [] as Array<string>,
  copySourcePRLabels: false,
  copySourcePRReviewers: false,
  cwd: process.cwd(),
  dateSince: null,
  dateUntil: null,
  details: false,
  draft: false,
  fork: true,
  gitHostname: 'github.com',
  interactive: true,
  maxNumber: 10,
  multipleBranches: true,
  multipleCommits: false,
  multipleDirectories: true,
  noVerify: true,
  publishStatusCommentOnAbort: false,
  publishStatusCommentOnFailure: false,
  publishStatusCommentOnSuccess: true,
  resetAuthor: false,
  reviewers: [] as Array<string>,
  signoff: false,
  sourceDirectory: undefined as string | undefined,
  sourcePRLabels: [] as string[],
  noUnmergedBackportsHelp: false,
  targetBranchChoices: [] as TargetBranchChoiceOrString[],
  targetBranches: [] as string[],
  targetDirectoryChoices: [] as DirectoryChoiceOrString[],
  targetDirectories: [] as string[],
  targetPRLabels: [] as string[],
  telemetry: true,

  backportTargetMode: 'branch' as 'branch' | 'directory',
};

export async function getOptions({
  optionsFromCliArgs,
  optionsFromModule,
}: {
  optionsFromCliArgs: OptionsFromCliArgs;
  optionsFromModule: ConfigFileOptions;
}) {
  const optionsFromConfigFiles = await getOptionsFromConfigFiles({
    optionsFromCliArgs,
    optionsFromModule,
  });

  // combined options from cli and config files
  const combined = getMergedOptionsFromConfigAndCli({
    optionsFromConfigFiles,
    optionsFromCliArgs,
  });

  const { accessToken, repoName, repoOwner } =
    await getRequiredOptions(combined);

  // update logger
  setAccessToken(accessToken);

  const optionsFromGithub = await getOptionsFromGithub({
    ...combined,

    // required options
    accessToken,
    repoName,
    repoOwner,
  });

  const options = {
    // default author to filter commits by
    author: optionsFromGithub.authenticatedUsername,

    // default fork owner
    repoForkOwner: optionsFromGithub.authenticatedUsername,

    // default values have lowest precedence
    ...defaultConfigOptions,

    // local config options override default options
    ...optionsFromConfigFiles,

    // remote config options override local config options
    ...optionsFromGithub,

    // cli args override the above
    ...optionsFromCliArgs,

    editor: optionsFromCliArgs.editor === 'false' ? undefined : combined.editor,

    // required properties
    accessToken,
    repoName,
    repoOwner,
  };

  throwForRequiredOptions(options);

  return options;
}

async function getRequiredOptions(combined: OptionsFromConfigAndCli) {
  const { accessToken, repoName, repoOwner, globalConfigFile } = combined;

  if (accessToken && repoName && repoOwner) {
    return { accessToken, repoName, repoOwner };
  }

  // require access token
  if (!accessToken) {
    const globalConfigPath = getGlobalConfigPath(globalConfigFile);
    throw new BackportError(
      `Please update your config file: "${globalConfigPath}".\nIt must contain a valid "accessToken".\n\nRead more: ${GLOBAL_CONFIG_DOCS_LINK}`,
    );
  }

  // attempt to retrieve repo-owner and repo-name from git remote
  const gitRemote = await getRepoOwnerAndNameFromGitRemotes({
    cwd: combined.cwd,
    githubApiBaseUrlV4: combined.githubApiBaseUrlV4,
    accessToken,
  });

  if (!gitRemote.repoName || !gitRemote.repoOwner) {
    throw new BackportError(
      `Please specify a repository: "--repo elastic/kibana".\n\nRead more: ${PROJECT_CONFIG_DOCS_LINK}`,
    );
  }

  return {
    accessToken,
    repoName: gitRemote.repoName,
    repoOwner: gitRemote.repoOwner,
  };
}

function throwForRequiredOptions(
  options: (OptionsFromConfigAndCli | OptionsFromGithub) &
    Awaited<ReturnType<typeof getRequiredOptions>>,
) {
  // ensure `targetBranches` or `targetBranchChoices` are given
  if (
    isEmpty(options.targetBranches) &&
    isEmpty(options.targetBranchChoices) &&
    // this is primarily necessary on CI where `targetBranches` and `targetBranchChoices` and not given
    isEmpty(options.branchLabelMapping) &&
    // Directory mode
    isEmpty(options.targetDirectoryChoices) &&
    isEmpty(options.targetDirectory)
  ) {
    throw new BackportError(
      `Please specify a target branch: "--branch 6.1".\n\nRead more: ${PROJECT_CONFIG_DOCS_LINK}`,
    );
  }

  const optionKeys: Array<keyof typeof options> = [
    'accessToken',
    'author',
    'autoMergeMethod',
    'backportBinary',
    'backportBranchName',
    'dir',
    'editor',
    'gitHostname',
    'githubApiBaseUrlV3',
    'githubApiBaseUrlV4',
    'logFilePath',
    'prDescription',
    'projectConfigFile',
    'prTitle',
    'repoForkOwner',
    'repoName',
    'repoOwner',
    'sha',
    'sourceBranch',
  ];

  // Disallow empty strings
  // this is primarily an issue in Github actions where inputs default to empty strings instead of undefined
  // in those cases failing early provides a better UX
  optionKeys.forEach((optionName) => {
    const option = options[optionName] as string;
    if (option === '') {
      throw new BackportError(`"${optionName}" cannot be empty!`);
    }
  });
}

type OptionsFromConfigAndCli = ReturnType<
  typeof getMergedOptionsFromConfigAndCli
>;

function getMergedOptionsFromConfigAndCli({
  optionsFromConfigFiles,
  optionsFromCliArgs,
}: {
  optionsFromConfigFiles: OptionsFromConfigFiles;
  optionsFromCliArgs: OptionsFromCliArgs;
}) {
  return {
    ...defaultConfigOptions,
    ...optionsFromConfigFiles,
    ...optionsFromCliArgs,
  };
}

export function getActiveOptionsFormatted(options: ValidConfigOptions) {
  const customOptions = [
    ['repo', `${options.repoOwner}/${options.repoName}`],
    ['sourceBranch', `${options.sourceBranch}`],
  ];

  if (options.pullNumber) {
    customOptions.push(['pullNumber', `${options.pullNumber}`]);
  }

  if (options.sha) {
    customOptions.push(['sha', `${options.sha}`]);
  }

  if (options.author) {
    customOptions.push(['author', `${options.author}`]);
  }

  if (options.autoMerge === true) {
    customOptions.push(['autoMerge', `${options.autoMerge}`]);
  }

  if (options.maxNumber !== defaultConfigOptions.maxNumber) {
    customOptions.push(['maxNumber', `${options.maxNumber}`]);
  }

  if (options.dateSince) {
    customOptions.push(['since', `${options.dateSince}`]);
  }

  if (options.dateUntil) {
    customOptions.push(['until', `${options.dateUntil}`]);
  }

  return (
    customOptions
      .map(([key, value]) => `${key}: ${chalk.bold(value)}`)
      .join(' 🔹 ') + `\n`
  );
}
