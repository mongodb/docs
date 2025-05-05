import crypto from 'crypto';
import { Octokit } from '@octokit/rest';
import { ValidConfigOptions } from '../../../options/options';
import { getDevAccessToken } from '../../../test/private/getDevAccessToken';
import {
  createPullRequest,
  PullRequestPayload,
} from '../v3/getPullRequest/createPullRequest';
import { GithubV4Exception } from './apiRequestV4';
import { disablePullRequestAutoMerge } from './disablePullRequestAutoMerge';
import {
  enablePullRequestAutoMerge,
  parseGithubError,
} from './enablePullRequestAutoMerge';
import { fetchPullRequestAutoMergeMethod } from './fetchPullRequestAutoMergeMethod';

// The test repo requires auto-merge being enabled in options, as well as all merge types enabled (merge, squash, rebase)
// The test pull requests should be open, and not currently able to be merged (e.g. because it requires an approval),
// otherwise it will be merged when auto-merge is turned on
const TEST_REPO_OWNER = 'backport-org';
const TEST_REPO_NAME = 'repo-with-auto-merge-enabled';
const INITIAL_SHA = '70aa879411e95b6662f8ddcb80a944fc4444579f';
const accessToken = getDevAccessToken();

jest.setTimeout(20_000);

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function resetReference(octokit: Octokit) {
  return octokit.rest.git.updateRef({
    owner: TEST_REPO_OWNER,
    repo: TEST_REPO_NAME,
    ref: 'heads/main',
    sha: INITIAL_SHA,
    force: true,
  });
}

async function closePr({
  octokit,
  pullNumber,
}: {
  octokit: Octokit;
  pullNumber: number;
}) {
  await octokit.pulls.update({
    owner: TEST_REPO_OWNER,
    repo: TEST_REPO_NAME,
    pull_number: pullNumber,
    state: 'closed',
  });
}

async function createPr({
  options,
  headBranch,
  baseBranch,
}: {
  options: ValidConfigOptions;
  headBranch: string;
  baseBranch: string;
}) {
  const prPayload: PullRequestPayload = {
    base: baseBranch,
    head: headBranch,
    body: 'testing...',
    owner: TEST_REPO_OWNER,
    repo: TEST_REPO_NAME,
    title: 'my pr title',
    draft: false,
  };

  const { number } = await createPullRequest({ options, prPayload });
  return number;
}

async function deleteBranch({
  octokit,
  branchName,
}: {
  octokit: Octokit;
  branchName: string;
}) {
  await octokit.git.deleteRef({
    owner: TEST_REPO_OWNER,
    repo: TEST_REPO_NAME,
    ref: `heads/${branchName}`,
  });
}

async function createBranch({
  octokit,
  branchName,
  sha,
}: {
  octokit: Octokit;
  branchName: string;
  sha: string;
}) {
  await octokit.git.createRef({
    owner: TEST_REPO_OWNER,
    repo: TEST_REPO_NAME,
    ref: `refs/heads/${branchName}`,
    sha,
  });
}

async function addCommit(octokit: Octokit) {
  const randomString = Math.random().toString(36).slice(2);
  const res = await octokit.rest.repos.createOrUpdateFileContents({
    owner: TEST_REPO_OWNER,
    repo: TEST_REPO_NAME,
    path: `file-to-change-${randomString}`,
    message: 'Automatically changed',
    content: Buffer.from(`My new hash ${randomString}`).toString('base64'),
    branch: 'main',
  });

  const sha = res.data.commit.sha;

  if (!sha) {
    throw new Error('Missing sha');
  }

  return sha;
}

describe('enablePullRequestAutoMerge', () => {
  describe('create a PR and enable auto-merge against "approvals-required-branch"', () => {
    let pullNumber: number;
    let branchName: string;
    let octokit: Octokit;
    let options: ValidConfigOptions;

    beforeAll(async () => {
      const randomString = crypto.randomBytes(4).toString('hex');
      branchName = `test-${randomString}`;

      options = {
        accessToken,
        repoOwner: TEST_REPO_OWNER,
        repoName: TEST_REPO_NAME,
      } as ValidConfigOptions;

      octokit = new Octokit({ auth: accessToken });
      await resetReference(octokit);

      const sha = await addCommit(octokit);
      await createBranch({ octokit, branchName, sha });
      pullNumber = await createPr({
        options,
        headBranch: branchName,
        baseBranch: 'approvals-required-branch',
      });
    });

    // cleanup
    afterAll(async () => {
      await closePr({ octokit, pullNumber });
      await deleteBranch({ octokit, branchName });
      await resetReference(octokit);
    });

    // reset auto-merge state between runs
    afterEach(async () => {
      await disablePullRequestAutoMerge(options, pullNumber);
    });

    it('should initially have auto-merge disabled', async () => {
      const autoMergeMethod = await fetchPullRequestAutoMergeMethod(
        options,
        pullNumber,
      );
      expect(autoMergeMethod).toBe(undefined);
    });

    it('should enable auto-merge via merge', async () => {
      await enablePullRequestAutoMerge(
        { ...options, autoMergeMethod: 'merge' },
        pullNumber,
      );

      // ensure Github API reflects the change before querying
      await sleep(100);

      const autoMergeMethod = await fetchPullRequestAutoMergeMethod(
        options,
        pullNumber,
      );
      expect(autoMergeMethod).toBe('MERGE');
    });

    it('should fail when enabling auto-merge via rebase because it is disallowed', async () => {
      let errorMessage;
      let isMissingStatusChecks;

      try {
        await enablePullRequestAutoMerge(
          { ...options, autoMergeMethod: 'rebase' },
          pullNumber,
        );
      } catch (e) {
        const err = e as GithubV4Exception<any>;
        const res = parseGithubError(err);
        errorMessage = err.message;
        isMissingStatusChecks = res.isMissingStatusChecks;
      }

      expect(isMissingStatusChecks).toBe(false);
      expect(errorMessage).toMatchInlineSnapshot(
        `"Merge method rebase merging is not allowed on this repository (Github API v4)"`,
      );

      // ensure Github API reflects the change before querying
      await sleep(100);

      const autoMergeMethod = await fetchPullRequestAutoMergeMethod(
        options,
        pullNumber,
      );
      expect(autoMergeMethod).toBe(undefined);
    });

    it('should enable auto-merge via squash', async () => {
      await enablePullRequestAutoMerge(
        { ...options, autoMergeMethod: 'squash' },
        pullNumber,
      );

      // ensure Github API reflects the change before querying
      await sleep(100);

      const autoMergeMethod = await fetchPullRequestAutoMergeMethod(
        options,
        pullNumber,
      );
      expect(autoMergeMethod).toBe('SQUASH');
    });
  });

  describe('when creating a PR against "no-checks-required-branch"', () => {
    let pullNumber: number;
    let branchName: string;
    let octokit: Octokit;
    let options: ValidConfigOptions;

    beforeAll(async () => {
      const randomString = crypto.randomBytes(4).toString('hex');
      branchName = `test-${randomString}`;

      options = {
        accessToken,
        repoOwner: TEST_REPO_OWNER,
        repoName: TEST_REPO_NAME,
      } as ValidConfigOptions;

      octokit = new Octokit({ auth: accessToken });
      await resetReference(octokit);

      const sha = await addCommit(octokit);
      await createBranch({ octokit, branchName, sha });
      pullNumber = await createPr({
        options,
        headBranch: branchName,
        baseBranch: 'no-checks-required-branch',
      });
    });

    // cleanup
    afterAll(async () => {
      await closePr({ octokit, pullNumber });
      await deleteBranch({ octokit, branchName });
      await resetReference(octokit);
    });

    it('should not be possible to enable auto-merge', async () => {
      let isMissingStatusChecks;
      let errorMessage;
      try {
        await enablePullRequestAutoMerge(
          { ...options, autoMergeMethod: 'merge' },
          pullNumber,
        );
      } catch (e) {
        const err = e as GithubV4Exception<any>;
        const res = parseGithubError(err);
        errorMessage = err.message;
        isMissingStatusChecks = res.isMissingStatusChecks;
      }

      expect(errorMessage).toMatchInlineSnapshot(
        `"Pull request Pull request is in clean status (Github API v4)"`,
      );
      expect(isMissingStatusChecks).toBe(true);
    });
  });

  describe('when createing a PR against "status-checks-required-branch"', () => {
    let pullNumber: number;
    let branchName: string;
    let octokit: Octokit;
    let options: ValidConfigOptions;

    beforeAll(async () => {
      const randomString = crypto.randomBytes(4).toString('hex');
      branchName = `test-${randomString}`;

      options = {
        accessToken,
        repoOwner: TEST_REPO_OWNER,
        repoName: TEST_REPO_NAME,
      } as ValidConfigOptions;

      octokit = new Octokit({ auth: accessToken });
      await resetReference(octokit);

      const sha = await addCommit(octokit);
      await createBranch({ octokit, branchName, sha });
      pullNumber = await createPr({
        options,
        headBranch: branchName,
        baseBranch: 'status-checks-required-branch',
      });
    });

    // cleanup
    afterAll(async () => {
      await closePr({ octokit, pullNumber });
      await deleteBranch({ octokit, branchName });
      await resetReference(octokit);
    });

    // eslint-disable-next-line jest/no-disabled-tests
    it.skip('should not be possible to enable auto-merge', async () => {
      let isMissingStatusChecks;
      let errorMessage;

      try {
        await enablePullRequestAutoMerge(
          { ...options, autoMergeMethod: 'merge' },
          pullNumber,
        );
      } catch (e) {
        const err = e as GithubV4Exception<any>;
        const res = parseGithubError(err);
        errorMessage = err.message;
        isMissingStatusChecks = res.isMissingStatusChecks;
      }

      const autoMergeMethod = await fetchPullRequestAutoMergeMethod(
        options,
        pullNumber,
      );

      expect(autoMergeMethod).toBe(undefined);

      expect(errorMessage).toMatchInlineSnapshot(
        `"Pull request Pull request is in clean status (Github API v4)"`,
      );
      expect(isMissingStatusChecks).toBe(true);
    });
  });
});
