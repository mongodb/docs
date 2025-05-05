import { Octokit } from '@octokit/rest';
import apm from 'elastic-apm-node';
import { ora } from '../../../lib/ora';
import { logger } from '../../logger';

export async function addLabelsToPullRequest({
  githubApiBaseUrlV3,
  repoName,
  repoOwner,
  accessToken,
  interactive,
  dryRun,

  pullNumber,
  labels,
}: {
  // options
  githubApiBaseUrlV3?: string;
  repoName: string;
  repoOwner: string;
  accessToken: string;
  interactive: boolean;
  dryRun?: boolean;

  // additional args
  pullNumber: number;
  labels: string[];
}): Promise<void> {
  const text = `Adding labels: ${labels.join(', ')}`;
  logger.info(text);
  const spinner = ora(interactive, text).start();

  if (dryRun) {
    spinner.succeed();
    return;
  }

  const span = apm.startSpan('REST: Add labels');

  try {
    const octokit = new Octokit({
      auth: accessToken,
      baseUrl: githubApiBaseUrlV3,
      log: logger,
    });

    await octokit.issues.addLabels({
      owner: repoOwner,
      repo: repoName,
      issue_number: pullNumber,
      labels,
    });

    spinner.succeed();
  } catch (e) {
    spinner.fail();
    logger.error(`Could not add labels to PR ${pullNumber}`, e);
  } finally {
    span?.end();
  }
}
