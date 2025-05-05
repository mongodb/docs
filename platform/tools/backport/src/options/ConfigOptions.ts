import winston from 'winston';

export interface TargetBranchChoice {
  name: string;
  checked?: boolean;
}
export type TargetBranchChoiceOrString = string | TargetBranchChoice;

export interface DirectoryChoice {
  name: string; // path
  checked?: boolean;
}
export type DirectoryChoiceOrString = string | DirectoryChoice;

type AutoFixConflictsHandler = ({
  files,
  directory,
  logger,
  targetBranch,
}: {
  files: string[];
  directory: string;
  logger: winston.Logger;
  targetBranch: string;
}) => boolean | Promise<boolean>;

type Options = Partial<{
  accessToken: string;
  assignees: string[];
  author: string | null;
  autoAssign: boolean;
  autoFixConflicts: AutoFixConflictsHandler;
  autoMerge: boolean;
  autoMergeMethod: string;
  backportBinary: string;
  backportBranchName: string;
  backportTargetMode: 'branch' | 'directory';
  cherrypickRef: boolean;
  commitConflicts: boolean;
  commitPaths: string[];
  copySourcePRLabels: boolean;
  copySourcePRReviewers: boolean;
  details: boolean;
  dir: string;
  draft: boolean;
  dryRun: boolean;
  editor: string;
  fork: boolean;
  gitAuthorEmail: string;
  gitAuthorName: string;
  gitHostname: string;
  githubActionRunId: number;
  githubApiBaseUrlV3: string;
  githubApiBaseUrlV4: string;
  interactive: boolean; // only available via cli and module options (not project or global config)
  logFilePath: string;
  ls: boolean; // only available via cli
  maxNumber: number;
  multiple: boolean;
  multipleBranches: boolean;
  multipleCommits: boolean;
  noVerify: boolean;
  prDescription: string;
  prFilter: string;
  projectConfigFile: string; // only available via cli and module options (not project or global config)
  prTitle: string;
  publishStatusCommentOnAbort: boolean;
  publishStatusCommentOnFailure: boolean;
  publishStatusCommentOnSuccess: boolean;
  pullNumber: number | number[];
  repoForkOwner: string;
  repoName: string;
  repoOwner: string;
  resetAuthor: boolean;
  reviewers: string[];
  sha: string | string[];
  signoff: boolean;
  skipRemoteConfig: boolean;
  noUnmergedBackportsHelp: boolean;
  sourceBranch: string;
  sourcePRLabels: string[];
  targetBranchChoices: TargetBranchChoiceOrString[];
  targetBranches: string[];
  targetDirectoryChoices: DirectoryChoiceOrString[];
  targetDirectory: string;
  targetPRLabels: string[];
}>;

export type ConfigFileOptions = Options &
  Partial<{
    // yargs options
    help: boolean;
    version: boolean;
    v: boolean;

    // only allowed in project config. Not allowed in CI mode
    branchLabelMapping: Record<string, string>;

    // only allowed in project config. Not allowed in CI mode
    directoryLabelMapping: Record<string, string>;

    /**
     * @deprecated Replaced by `repoOwner` and `repoName`
     */
    upstream: string;

    /**
     * @deprecated Replaced by `targetBranchChoices`
     */
    branches: TargetBranchChoiceOrString[];

    /**
     * @deprecated Replaced by `targetPRLabels`
     */
    labels: string[];

    /**
     * @deprecated Replaced by `copySourcePRReviewers`
     */
    addOriginalReviewers: boolean;
  }>;
