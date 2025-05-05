import { ValidConfigOptions } from '../../options/options';
import { mergePullRequest } from '../github/v3/mergePullRequest';
import { GithubV4Exception } from '../github/v4/apiRequestV4';
import {
  enablePullRequestAutoMerge,
  parseGithubError,
} from '../github/v4/enablePullRequestAutoMerge';
import { logger } from '../logger';
import { ora } from '../ora';

export async function autoMergeNowOrLater(
  options: ValidConfigOptions,
  pullNumber: number,
) {
  const text = `Auto-merge: Enabling via "${options.autoMergeMethod}"`;
  logger.info(text);

  const spinner = ora(options.interactive, text).start();

  if (options.dryRun) {
    spinner.succeed();
    return;
  }

  try {
    try {
      await enablePullRequestAutoMerge(options, pullNumber);
    } catch (e) {
      if (!(e instanceof GithubV4Exception)) {
        throw e;
      }

      logger.info(
        `Auto merge: Failed to enable auto merge for PR "#${pullNumber}" due to ${e.message}`,
      );

      const { isMissingStatusChecks } = parseGithubError(e);
      if (!isMissingStatusChecks) {
        throw e;
      }

      // if auto merge cannot be enabled due to missing status checks, the PR should be merged immediately
      logger.info('Auto merge: Attempting to merge immediately');
      await mergePullRequest(options, pullNumber);
      spinner.text = 'Auto-merge: Pull request was merged immediately';
    }

    spinner.succeed();
  } catch (e) {
    logger.warn(`Auto merge: An error occurred ${e}`);
    spinner.fail();
  }
}
