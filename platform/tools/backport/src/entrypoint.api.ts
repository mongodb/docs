import './lib/apm';
import apm from 'elastic-apm-node';
import { backportRun as run } from './backportRun';
import { BackportResponse } from './backportRun';
import { fetchCommitsByPullNumber } from './lib/github/v4/fetchCommits/fetchCommitByPullNumber';
import { fetchCommitBySha } from './lib/github/v4/fetchCommits/fetchCommitBySha';
import { fetchCommitsByAuthor } from './lib/github/v4/fetchCommits/fetchCommitsByAuthor';
import { fetchPullRequestsBySearchQuery } from './lib/github/v4/fetchCommits/fetchPullRequestsBySearchQuery';
import { getOptionsFromGithub as _getOptionsFromGithub } from './lib/github/v4/getOptionsFromGithub/getOptionsFromGithub';
import { initLogger } from './lib/logger';
import type { Commit } from './lib/sourceCommit/parseSourceCommit';
import { ConfigFileOptions } from './options/ConfigOptions';
import { ValidConfigOptions } from './options/options';
import { excludeUndefined } from './utils/excludeUndefined';

// public API
export type {
  HandledErrorResult,
  SuccessResult,
  UnhandledErrorResult,
} from './lib/runSequentially';
export type {
  BackportAbortResponse,
  BackportFailureResponse,
  BackportResponse,
  BackportSuccessResponse,
} from './backportRun';
export type { Commit } from './lib/sourceCommit/parseSourceCommit';
export type { ConfigFileOptions } from './options/ConfigOptions';
export { getTargetBranchFromLabel } from './lib/sourceCommit/getPullRequestStates';
export { BackportError } from './lib/BackportError';
export { getGlobalConfig } from './options/config/globalConfig';
export { getProjectConfig } from './options/config/projectConfig';

// wrap `getOptionsFromGithub` with logger
export function getOptionsFromGithub(
  options: Parameters<typeof _getOptionsFromGithub>[0],
) {
  initLogger({ interactive: false, accessToken: options.accessToken });
  return _getOptionsFromGithub(options);
}

export async function backportRun({
  options = {},
  processArgs = [],
  exitCodeOnFailure = true,
}: {
  options?: ConfigFileOptions;

  // cli args will not automatically be forwarded when backport is consumed as a module
  // It is simple to forward args manually via `process.argv`:
  //
  // import { backportRun } from 'backport'
  // backportRun({ options, processArgs: process.argv.slice(2) })
  //
  processArgs?: string[];
  exitCodeOnFailure?: boolean;
}): Promise<BackportResponse> {
  const apmTransaction = apm.startTransaction('API: backportRun');
  const res = await run({
    optionsFromModule: excludeUndefined(options),
    processArgs,
    exitCodeOnFailure,
    apmTransaction,
  });

  apm.endTransaction(res.status);
  return res;
}

export async function getCommits(options: {
  // required
  accessToken: string;
  repoName: string;
  repoOwner: string;

  // optional
  author?: string;
  branchLabelMapping?: ValidConfigOptions['branchLabelMapping'];
  dateSince?: string;
  dateUntil?: string;
  githubApiBaseUrlV4?: string;
  maxNumber?: number;
  onlyMissing?: boolean;
  prFilter?: string;
  pullNumber?: number | number[];
  sha?: string | string[];
  skipRemoteConfig?: boolean;
  sourceBranch?: string;
}): Promise<Commit[]> {
  return apmStartTransaction('API: getCommits', async () => {
    initLogger({ interactive: false, accessToken: options.accessToken });

    const optionsFromGithub = await _getOptionsFromGithub(options);

    if (options.pullNumber) {
      const pullNumbers = Array.isArray(options.pullNumber)
        ? options.pullNumber
        : [options.pullNumber];

      const nestedCommits = await Promise.all(
        pullNumbers.map((pullNumber) =>
          fetchCommitsByPullNumber({
            ...optionsFromGithub,
            ...options,
            pullNumber,
          }),
        ),
      );

      return nestedCommits.flat();
    }

    if (options.sha) {
      const shas = Array.isArray(options.sha) ? options.sha : [options.sha];

      return Promise.all(
        shas.map((sha) =>
          fetchCommitBySha({ ...optionsFromGithub, ...options, sha }),
        ),
      );
    }

    if (options.prFilter) {
      return fetchPullRequestsBySearchQuery({
        ...optionsFromGithub,
        ...options,
        prFilter: options.prFilter,
        author: options.author ?? null,
        dateSince: options.dateSince ?? null,
        dateUntil: options.dateUntil ?? null,
      });
    }

    if (options.author) {
      return fetchCommitsByAuthor({
        ...optionsFromGithub,
        ...options,
        author: options.author,
        dateSince: options.dateSince ?? null,
        dateUntil: options.dateUntil ?? null,
      });
    }

    throw new Error(
      'Must supply one of: `pullNumber`, `sha`, `prFilter` or `author`',
    );
  });
}

async function apmStartTransaction<T>(
  transactionName: string,
  cb: () => Promise<T>,
): Promise<T> {
  apm.startTransaction(transactionName);
  try {
    const res = await cb();
    apm.endTransaction('success');
    return res;
  } catch (e) {
    apm.captureError(e as Error);
    apm.endTransaction('failure');
    throw e;
  }
}
