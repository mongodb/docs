import apm from 'elastic-apm-node';
import { ValidConfigOptions } from '../options/options';
import { BackportError } from './BackportError';
import { cherrypickAndCreateTargetPullRequest } from './cherrypickAndCreateTargetPullRequest/cherrypickAndCreateTargetPullRequest';
import { getLogfilePath } from './env';
import { logger, consoleLog } from './logger';
import { sequentially } from './sequentially';
import { Commit } from './sourceCommit/parseSourceCommit';

// Target is either a branch (for branch mode) or a branch + directories list
// for directory mode.
export type Target = {
  branch: string;
  directories?: string[];
  sourceDirectory?: string;
};

export type ResultType = {
  status: 'success' | 'handled-error' | 'unhandled-error';
  target: Target;
};

export type SuccessResult = ResultType & {
  status: 'success';
  didUpdate: boolean;
  pullRequestUrl: string;
  pullRequestNumber: number;
};

export type HandledErrorResult = ResultType & {
  status: 'handled-error';
  error: BackportError;
};

export type UnhandledErrorResult = ResultType & {
  status: 'unhandled-error';
  error: Error;
};

export type Result = SuccessResult | HandledErrorResult | UnhandledErrorResult;

export async function runSequentially({
  options,
  commits,
  targets,
}: {
  options: ValidConfigOptions;
  commits: Commit[];
  targets: Target[];
}): Promise<Result[]> {
  logger.verbose('Backport options', options);

  return await sequentially(targets, async (target) => {
    return await doBackport({
      options,
      commits,
      target,
    });
  });
}

async function doBackport({
  options,
  target,
  commits,
}: {
  options: ValidConfigOptions;
  target: Target;
  commits: Commit[];
}): Promise<Result> {
  logger.info(
    `Backporting ${JSON.stringify(commits)} to ${JSON.stringify(target)}`,
  );
  const span = apm.startSpan('Cherrypick commits to target');

  try {
    const { number, url, didUpdate } =
      await cherrypickAndCreateTargetPullRequest({
        options,
        commits,
        target,
      });

    span?.setOutcome('success');
    span?.end();
    return {
      target,
      status: 'success',
      didUpdate,
      pullRequestUrl: url,
      pullRequestNumber: number,
    };
  } catch (e) {
    span?.setOutcome('failure');
    span?.setLabel('error_message', (e as Error).message);
    span?.end();
    apm.captureError(e as Error);

    const isHandledError = e instanceof BackportError;

    logger.error('runSequentially failed', e);

    if (!isHandledError) {
      consoleLog(
        `An unhandled error occurred while backporting commit. Please see the logs for details: ${getLogfilePath(
          { logFilePath: options.logFilePath, logLevel: 'info' },
        )}`,
      );
    }

    if (isHandledError) {
      // don't output anything for `code: invalid-branch-exception`.
      // Outputting is already handled
      if (e.errorContext.code !== 'invalid-branch-exception') {
        consoleLog(e.message);
      }

      return {
        target,
        status: 'handled-error',
        error: e,
      };
    }

    if (e instanceof Error) {
      return {
        target,
        status: 'unhandled-error',
        error: e,
      };
    }
    throw e;
  }
}
