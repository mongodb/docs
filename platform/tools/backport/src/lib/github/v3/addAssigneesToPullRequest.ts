import { Octokit } from '@octokit/rest';
import apm from 'elastic-apm-node';
import { ora } from '../../../lib/ora';
import { logger } from '../../logger';

export async function addAssigneesToPullRequest({
  // options
  githubApiBaseUrlV3,
  repoName,
  repoOwner,
  accessToken,
  autoAssign,
  interactive,
  dryRun,

  // additional args
  pullNumber,
  assignees,
}: {
  githubApiBaseUrlV3?: string;
  repoName: string;
  repoOwner: string;
  accessToken: string;
  autoAssign: boolean;
  interactive: boolean;
  dryRun?: boolean;

  pullNumber: number;
  assignees: string[];
}) {
  const text = autoAssign
    ? `Self-assigning to #${pullNumber}`
    : `Adding assignees to #${pullNumber}: ${assignees.join(', ')}`;
  logger.info(text);
  const spinner = ora(interactive, text).start();

  if (dryRun) {
    spinner.succeed();
    return;
  }

  const span = apm.startSpan('REST: Add assignees');

  try {
    const octokit = new Octokit({
      auth: accessToken,
      baseUrl: githubApiBaseUrlV3,
      log: logger,
    });

    await octokit.issues.addAssignees({
      owner: repoOwner,
      repo: repoName,
      issue_number: pullNumber,
      assignees: assignees,
    });

    spinner.succeed();
  } catch (e) {
    spinner.fail();

    logger.info(`Could not add assignees to PR ${pullNumber}`, e);
  } finally {
    span?.end();
  }
}
