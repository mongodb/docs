import { Octokit } from '@octokit/rest';
import { SuccessResult } from '../../../entrypoint.api';
import { getDevAccessToken } from '../../private/getDevAccessToken';
import { runBackportViaCli } from './runBackportViaCli';

const accessToken = getDevAccessToken();
const octokit = new Octokit({ auth: accessToken });

jest.setTimeout(25_000);

describe('backport-org/repo-with-reviewed-pull-requests', () => {
  let pullRequest: Awaited<ReturnType<typeof getPullRequest>>;
  beforeAll(async () => {
    await closeOpenPullRequests(octokit);

    const { output } = await runBackportViaCli([
      '--repo=backport-org/repo-with-reviewed-pull-requests',
      '--copy-source-pr-reviewers',
      '--copy-source-pr-labels',
      '--pr=2',
      '--branch=production',
      '--no-fork',
      `--accessToken=${accessToken}`,
      '--json',
    ]);

    const backportResults = JSON.parse(output).results as SuccessResult[];
    const pullRequestNumber = backportResults[0].pullRequestNumber;
    pullRequest = await getPullRequest(pullRequestNumber);
  });

  it('copies labels over', async () => {
    const labels = pullRequest.data.labels.map((l) => l.name);
    expect(labels).toEqual([
      'documentation',
      'enhancement',
      'good first issue',
    ]);
  });

  it('copies reviewers over', async () => {
    const reviewers = pullRequest.data.requested_reviewers?.map((r) => r.login);
    expect(reviewers).toEqual(['backport-demo-user']);
  });
});

function getPullRequest(pullNumber: number) {
  return octokit.pulls.get({
    owner: 'backport-org',
    repo: 'repo-with-reviewed-pull-requests',
    pull_number: pullNumber,
  });
}

async function closeOpenPullRequests(octokit: Octokit) {
  const openPulls = await octokit.pulls.list({
    owner: 'backport-org',
    repo: 'repo-with-reviewed-pull-requests',
    state: 'open',
  });

  await Promise.all(
    openPulls.data.map(async (pull) => {
      // close pull request
      await octokit.pulls.update({
        owner: 'backport-org',
        repo: 'repo-with-reviewed-pull-requests',
        pull_number: pull.number,
        state: 'closed',
      });
    }),
  );
}
