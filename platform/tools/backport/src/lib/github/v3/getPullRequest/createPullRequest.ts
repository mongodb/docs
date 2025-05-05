import { Octokit } from '@octokit/rest';
import apm from 'elastic-apm-node';
import { ValidConfigOptions } from '../../../../options/options';
import { BackportError } from '../../../BackportError';
import { logger } from '../../../logger';
import { ora } from '../../../ora';
import { fetchExistingPullRequest } from '../../v4/fetchExistingPullRequest';
import { getGithubV3ErrorMessage } from '../getGithubV3ErrorMessage';

export interface PullRequestPayload {
  owner: string;
  repo: string;
  title: string;
  body: string;
  head: string;
  base: string;
  draft: boolean;
  [key: string]: unknown;
}

export async function createPullRequest({
  options,
  prPayload,
}: {
  options: ValidConfigOptions;
  prPayload: PullRequestPayload;
}): Promise<{
  url: string;
  number: number;
  didUpdate: boolean;
}> {
  const msg = `Creating ${options.draft ? 'draft ' : ''}pull request`;
  logger.info(
    `${msg} with title: "${prPayload.title}". ${prPayload.head} -> ${prPayload.base}`,
  );

  const { accessToken, githubApiBaseUrlV3 } = options;
  const spinner = ora(options.interactive, msg).start();

  if (options.dryRun) {
    spinner.succeed();
    return { didUpdate: false, number: 1337, url: 'this-is-a-dry-run' };
  }

  const span = apm.startSpan('REST: Create pull request');

  try {
    const octokit = new Octokit({
      auth: accessToken,
      baseUrl: githubApiBaseUrlV3,
      log: logger,
    });

    const res = await octokit.pulls.create(prPayload);

    spinner.succeed();

    return {
      url: res.data.html_url,
      number: res.data.number,
      didUpdate: false,
    };
  } catch (e) {
    // retrieve url for existing
    try {
      const existingPR = await fetchExistingPullRequest({
        options,
        prPayload,
      });

      if (existingPR) {
        spinner.succeed('Updating existing pull request');
        return {
          url: existingPR.url,
          number: existingPR.number,
          didUpdate: true,
        };
      }
    } catch (e) {
      logger.error('Could not retrieve existing pull request', e);
      // swallow error
    } finally {
      span?.end();
    }

    spinner.fail();
    throw new BackportError(
      //@ts-expect-error
      `Could not create pull request: ${getGithubV3ErrorMessage(e)}`,
    );
  }
}
