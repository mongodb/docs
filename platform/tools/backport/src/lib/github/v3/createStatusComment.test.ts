import nock from 'nock';
import {
  BackportResponse,
  BackportSuccessResponse,
} from '../../../backportRun';
import { ValidConfigOptions } from '../../../options/options';
import { BackportError } from '../../BackportError';
import { setAccessToken } from '../../logger';
import { createStatusComment, getCommentBody } from './createStatusComment';

jest.unmock('../../logger');

describe('createStatusComment', () => {
  it('redacts accessToken if it is included in the error message', async () => {
    const accessToken = 'ghp_abcdefg';
    setAccessToken(accessToken);

    const scope = nock('https://api.github.com')
      .post('/repos/elastic/kibana/issues/100/comments')
      .reply(200, 'some response');

    let postedCommentBody = '';
    scope.on('request', (req, interceptor, body) => {
      postedCommentBody = JSON.parse(body).body;
    });

    await createStatusComment({
      options: {
        repoName: 'kibana',
        repoOwner: 'elastic',
        accessToken,
        backportBinary: 'node scripts/backport',
        publishStatusCommentOnSuccess: true,
        publishStatusCommentOnFailure: true,
        githubApiBaseUrlV3: 'https://api.github.com',
        interactive: false,
      } as ValidConfigOptions,
      backportResponse: {
        commits: [{ sourcePullRequest: { number: 100 } }],
        status: 'failure',
        error: new Error(
          `Error message containing very secret access token: ${accessToken}.`,
        ),
      } as BackportResponse,
    });

    expect(postedCommentBody).toContain(
      'Error message containing very secret access token: <REDACTED>',
    );

    scope.done();
    nock.cleanAll();
  });
});

describe('getCommentBody', () => {
  describe('when an unknown error occurs', () => {
    const getParams = (opts: Partial<ValidConfigOptions>) => ({
      options: {
        backportBinary: 'node scripts/backport',
        ...opts,
      } as ValidConfigOptions,
      pullNumber: 55,
      backportResponse: {
        status: 'failure',
        error: new Error('A terrible error occured'),
      } as BackportResponse,
    });

    it('posts a comment when `publishStatusCommentOnFailure = true`', () => {
      const params = getParams({ publishStatusCommentOnFailure: true });
      expect(getCommentBody(params)).toMatchInlineSnapshot(`
        "## 💔 Backport failed
        The pull request could not be backported due to the following error:
        \`A terrible error occured\`

        ### Manual backport
        To create the backport manually run:
        \`\`\`
        node scripts/backport --pr 55
        \`\`\`

        ### Questions ?
        Please refer to the [Backport tool documentation](https://github.com/sorenlouv/backport)

        <!--- Backport version: 1.2.3-mocked -->"
      `);
    });

    it('does not post a comment when `publishStatusCommentOnFailure = false`', () => {
      const params = getParams({ publishStatusCommentOnFailure: false });
      expect(getCommentBody(params)).toBe(undefined);
    });
  });

  describe('when all backports succeed', () => {
    const getParams = (opts: Partial<ValidConfigOptions>) => ({
      options: {
        repoName: 'kibana',
        repoOwner: 'elastic',
        autoMerge: true,
        ...opts,
      } as ValidConfigOptions,
      pullNumber: 55,
      backportResponse: {
        status: 'success',
        results: [
          {
            status: 'success',
            targetBranch: '7.x',
            pullRequestNumber: 55,
            pullRequestUrl: 'url-to-pr',
          },
          {
            status: 'success',
            targetBranch: '7.1',
            pullRequestNumber: 66,
            pullRequestUrl: 'url-to-pr',
          },
        ],
      } as BackportResponse,
    });

    it('posts a comment when `publishStatusCommentOnSuccess = true`', () => {
      const params = getParams({ publishStatusCommentOnSuccess: true });
      expect(getCommentBody(params)).toMatchInlineSnapshot(`
        "## 💚 All backports created successfully

        | Status | Branch | Result |
        |:------:|:------:|:------|
        |✅|7.x|[<img src="https://img.shields.io/github/pulls/detail/state/elastic/kibana/55">](url-to-pr)|
        |✅|7.1|[<img src="https://img.shields.io/github/pulls/detail/state/elastic/kibana/66">](url-to-pr)|

        Note: Successful backport PRs will be merged automatically after passing CI.

        ### Questions ?
        Please refer to the [Backport tool documentation](https://github.com/sorenlouv/backport)

        <!--- Backport version: 1.2.3-mocked -->"
      `);
    });

    it('does not post a comment when `publishStatusCommentOnSuccess = false`', () => {
      const params = getParams({ interactive: true });
      expect(getCommentBody(params)).toMatchInlineSnapshot(`undefined`);
    });
  });

  describe('when all backports fail', () => {
    const getParams = (opts: Partial<ValidConfigOptions>) => ({
      options: {
        repoName: 'kibana',
        repoOwner: 'elastic',
        autoMerge: true,
        backportBinary: 'node scripts/backport',
        ...opts,
      } as ValidConfigOptions,
      pullNumber: 55,
      backportResponse: {
        status: 'success',
        results: [
          {
            status: 'unhandled-error',
            targetBranch: '7.x',
            error: new Error('My boom error!'),
          },
          {
            status: 'unhandled-error',
            targetBranch: '7.1',
            error: new Error('My boom error!'),
          },
        ],
      } as BackportSuccessResponse,
    });

    it('posts a comment when `publishStatusCommentOnFailure = true`', () => {
      const params = getParams({ publishStatusCommentOnFailure: true });
      expect(getCommentBody(params)).toMatchInlineSnapshot(`
        "## 💔 All backports failed

        | Status | Branch | Result |
        |:------:|:------:|:------|
        |❌|7.x|An unhandled error occurred. Please see the logs for details|
        |❌|7.1|An unhandled error occurred. Please see the logs for details|

        ### Manual backport
        To create the backport manually run:
        \`\`\`
        node scripts/backport --pr 55
        \`\`\`

        ### Questions ?
        Please refer to the [Backport tool documentation](https://github.com/sorenlouv/backport)

        <!--- Backport version: 1.2.3-mocked -->"
      `);
    });

    it('does not post a comment when `publishStatusCommentOnFailure = false`', () => {
      const params = getParams({ publishStatusCommentOnFailure: false });
      expect(getCommentBody(params)).toBe(undefined);
    });
  });

  describe('when some backports fail', () => {
    const getParams = (opts: Partial<ValidConfigOptions>) => ({
      options: {
        repoName: 'kibana',
        repoOwner: 'elastic',
        autoMerge: true,
        backportBinary: 'node scripts/backport',
        ...opts,
      } as ValidConfigOptions,
      pullNumber: 55,
      backportResponse: {
        status: 'success',
        results: [
          {
            status: 'success',
            targetBranch: '7.x',
            pullRequestNumber: 55,
            pullRequestUrl: 'url-to-pr-55',
          },

          {
            status: 'failure',
            targetBranch: '7.1',
            error: new Error('My boom error!'),
          },
        ],
      } as BackportResponse,
    });

    it('posts a comment when `publishStatusCommentOnFailure = true`', () => {
      const params = getParams({ publishStatusCommentOnFailure: true });
      expect(getCommentBody(params)).toMatchInlineSnapshot(`
        "## 💔 Some backports could not be created

        | Status | Branch | Result |
        |:------:|:------:|:------|
        |✅|7.x|[<img src="https://img.shields.io/github/pulls/detail/state/elastic/kibana/55">](url-to-pr-55)|
        |❌|7.1|An unhandled error occurred. Please see the logs for details|

        Note: Successful backport PRs will be merged automatically after passing CI.

        ### Manual backport
        To create the backport manually run:
        \`\`\`
        node scripts/backport --pr 55
        \`\`\`

        ### Questions ?
        Please refer to the [Backport tool documentation](https://github.com/sorenlouv/backport)

        <!--- Backport version: 1.2.3-mocked -->"
      `);
    });

    it('does not post a comment when running `publishStatusCommentOnFailure = false`', () => {
      const params = getParams({ publishStatusCommentOnFailure: false });
      expect(getCommentBody(params)).toMatchInlineSnapshot(`undefined`);
    });
  });

  describe('when some backports fail due to conflicts', () => {
    const getParams = (opts: Partial<ValidConfigOptions>) => ({
      options: {
        repoName: 'kibana',
        repoOwner: 'elastic',
        autoMerge: true,
        backportBinary: 'node scripts/backport',
        ...opts,
      } as ValidConfigOptions,
      pullNumber: 55,
      backportResponse: {
        status: 'success',
        results: [
          {
            status: 'success',
            targetBranch: '7.x',
            pullRequestNumber: 55,
            pullRequestUrl: 'url-to-pr-55',
          },

          {
            status: 'failure',
            targetBranch: '7.1',
            error: new BackportError({
              code: 'merge-conflict-exception',
              conflictingFiles: ['readme.md'],
              commitsWithoutBackports: [
                {
                  formatted: 'some-formatted-text',
                  commit: {
                    author: {
                      email: 'soren.louv@elastic.co',
                      name: 'Søren Louv-Jansen',
                    },
                    sourceBranch: 'master',
                    sourcePullRequest: {
                      labels: [],
                      number: 5,
                      url: 'url-to-pr-5',
                      title: 'New Zealand commit message',
                      mergeCommit: {
                        sha: '',
                        message: 'New Zealand commit message',
                      },
                    },
                    suggestedTargetBranches: [],
                    sourceCommit: {
                      branchLabelMapping: {},
                      committedDate: '',
                      sha: '',
                      message: 'New Zealand commit message',
                    },
                    targetPullRequestStates: [],
                  },
                },
                {
                  formatted: 'some-formatted-text',
                  commit: {
                    author: {
                      email: 'soren.louv@elastic.co',
                      name: 'Søren Louv-Jansen',
                    },
                    sourceBranch: 'master',
                    sourcePullRequest: {
                      labels: [],
                      number: 44,
                      title: 'Australia commit',
                      url: 'url-to-pr-44',
                      mergeCommit: {
                        sha: '',
                        message: 'Australia commit',
                      },
                    },
                    suggestedTargetBranches: [],
                    sourceCommit: {
                      branchLabelMapping: {},
                      committedDate: '',
                      sha: '',
                      message: 'Australia commit',
                    },
                    targetPullRequestStates: [],
                  },
                },
                {
                  formatted: 'some-formatted-text',
                  commit: {
                    author: {
                      email: 'matthias.wilhelm@elastic.co',
                      name: 'Matthias Polman-Wilhelm',
                    },
                    sourceBranch: 'master',
                    sourcePullRequest: {
                      labels: [],
                      number: 44,
                      title: 'Antarctica commit | with pipeline char',
                      url: 'url-to-pr-45',
                      mergeCommit: {
                        sha: '',
                        message: 'Antarctica commit | with pipeline char',
                      },
                    },
                    suggestedTargetBranches: [],
                    sourceCommit: {
                      branchLabelMapping: {},
                      committedDate: '',
                      sha: '',
                      message: 'Antarctica commit | with pipeline char',
                    },
                    targetPullRequestStates: [],
                  },
                },
              ],
            }),
          },

          {
            status: 'failure',
            targetBranch: '7.2',
            error: new BackportError({
              code: 'merge-conflict-exception',
              conflictingFiles: ['my-file.txt'],
              commitsWithoutBackports: [],
            }),
          },
        ],
      } as BackportResponse,
    });

    it('posts a comment when `publishStatusCommentOnFailure = true`', () => {
      const params = getParams({ publishStatusCommentOnFailure: true });
      expect(getCommentBody(params)).toMatchInlineSnapshot(`
"## 💔 Some backports could not be created

| Status | Branch | Result |
|:------:|:------:|:------|
|✅|7.x|[<img src="https://img.shields.io/github/pulls/detail/state/elastic/kibana/55">](url-to-pr-55)|
|❌|7.1|**Backport failed because of merge conflicts**<br><br>You might need to backport the following PRs to 7.1:<br> - [New Zealand commit message](url-to-pr-5)<br> - [Australia commit](url-to-pr-44)<br> - [Antarctica commit \\| with pipeline char](url-to-pr-45)|
|❌|7.2|Backport failed because of merge conflicts|

Note: Successful backport PRs will be merged automatically after passing CI.

### Manual backport
To create the backport manually run:
\`\`\`
node scripts/backport --pr 55
\`\`\`

### Questions ?
Please refer to the [Backport tool documentation](https://github.com/sorenlouv/backport)

<!--- Backport version: 1.2.3-mocked -->"
`);
    });

    it('does not post a comment when `publishStatusCommentOnFailure = false`', () => {
      const params = getParams({ publishStatusCommentOnFailure: false });
      expect(getCommentBody(params)).toBe(undefined);
    });
  });

  describe('when backport was aborted due to missing branches', () => {
    const getParams = (opts: Partial<ValidConfigOptions>) => ({
      options: {
        repoName: 'kibana',
        repoOwner: 'elastic',
        autoMerge: true,
        backportBinary: 'node scripts/backport',
        ...opts,
      } as ValidConfigOptions,
      pullNumber: 55,
      backportResponse: {
        status: 'aborted',
        commits: [],
        error: new BackportError({ code: 'no-branches-exception' }),
        errorMessage: 'my message',
      } as BackportResponse,
    });

    it('posts a comment when `publishStatusCommentOnAbort = true`', () => {
      const params = getParams({
        publishStatusCommentOnAbort: true,
      });
      expect(getCommentBody(params)).toMatchInlineSnapshot(`
        "## ⚪ Backport skipped
        The pull request was not backported as there were no branches to backport to. If this is a mistake, please apply the desired version labels or run the backport tool manually.

        ### Manual backport
        To create the backport manually run:
        \`\`\`
        node scripts/backport --pr 55
        \`\`\`

        ### Questions ?
        Please refer to the [Backport tool documentation](https://github.com/sorenlouv/backport)

        <!--- Backport version: 1.2.3-mocked -->"
      `);
    });

    it('does not post a comment when `publishStatusCommentOnAbort = false`', () => {
      const params = getParams({ publishStatusCommentOnAbort: false });
      expect(getCommentBody(params)).toBe(undefined);
    });
  });

  describe('when backport was aborted during conflict resolution', () => {
    const getParams = (opts: Partial<ValidConfigOptions>) => ({
      options: {
        interactive: true,
        repoName: 'kibana',
        repoOwner: 'elastic',
        autoMerge: true,
        backportBinary: 'node scripts/backport',
        ...opts,
      } as ValidConfigOptions,
      pullNumber: 55,
      backportResponse: {
        status: 'success',
        commits: [],
        results: [
          {
            targetBranch: 'staging',
            status: 'handled-error',
            error: new BackportError({
              code: 'abort-conflict-resolution-exception',
            }),
          },
        ],
      } as BackportResponse,
    });

    it('posts a comment when `publishStatusCommentOnAbort = true`', () => {
      const params = getParams({
        publishStatusCommentOnAbort: true,
      });
      expect(getCommentBody(params)).toMatchInlineSnapshot(`undefined`);
    });

    it('does not post a comment when `publishStatusCommentOnAbort = false`', () => {
      const params = getParams({ publishStatusCommentOnAbort: false });
      expect(getCommentBody(params)).toBe(undefined);
    });

    it('posts a comment when `publishStatusCommentOnFailure = true`', () => {
      const params = getParams({
        publishStatusCommentOnFailure: true,
      });
      expect(getCommentBody(params)).toMatchInlineSnapshot(`
        "## 💔 All backports failed

        | Status | Branch | Result |
        |:------:|:------:|:------|
        |❌|staging|Conflict resolution was aborted by the user|

        ### Manual backport
        To create the backport manually run:
        \`\`\`
        node scripts/backport --pr 55
        \`\`\`

        ### Questions ?
        Please refer to the [Backport tool documentation](https://github.com/sorenlouv/backport)

        <!--- Backport version: 1.2.3-mocked -->"
      `);
    });

    it('does not post a comment when `publishStatusCommentOnFailure = false`', () => {
      const params = getParams({ publishStatusCommentOnFailure: false });
      expect(getCommentBody(params)).toBe(undefined);
    });
  });

  describe("when target branch doesn't exist", () => {
    const getParams = (opts: Partial<ValidConfigOptions>) => ({
      options: {
        interactive: true,
        repoName: 'kibana',
        repoOwner: 'elastic',
        autoMerge: true,
        backportBinary: 'node scripts/backport',
        ...opts,
      } as ValidConfigOptions,
      pullNumber: 55,
      backportResponse: {
        status: 'success',
        commits: [],
        results: [
          {
            targetBranch: 'main',
            status: 'handled-error',
            error: new BackportError(
              'The branch "main" is invalid or doesn\'t exist',
            ),
          },
        ],
      } as BackportResponse,
    });

    it('posts a comment when `publishStatusCommentOnFailure = true`', () => {
      const params = getParams({
        publishStatusCommentOnFailure: true,
      });
      expect(getCommentBody(params)).toMatchInlineSnapshot(`
        "## 💔 All backports failed

        | Status | Branch | Result |
        |:------:|:------:|:------|
        |❌|main|The branch "main" is invalid or doesn't exist|

        ### Manual backport
        To create the backport manually run:
        \`\`\`
        node scripts/backport --pr 55
        \`\`\`

        ### Questions ?
        Please refer to the [Backport tool documentation](https://github.com/sorenlouv/backport)

        <!--- Backport version: 1.2.3-mocked -->"
      `);
    });

    it('does not post a comment when `publishStatusCommentOnFailure = false`', () => {
      const params = getParams({ publishStatusCommentOnFailure: false });
      expect(getCommentBody(params)).toBe(undefined);
    });
  });

  describe('when target branch is invalid', () => {
    const getParams = (opts: Partial<ValidConfigOptions>) => ({
      options: {
        interactive: true,
        repoName: 'kibana',
        repoOwner: 'elastic',
        autoMerge: true,
        backportBinary: 'node scripts/backport',
        ...opts,
      } as ValidConfigOptions,
      pullNumber: 55,
      backportResponse: {
        status: 'success',
        commits: [],
        results: [
          {
            targetBranch: '--foo',
            status: 'unhandled-error',
            error: new BackportError('The branch "--foo" does not exist'),
          },
        ],
      } as BackportResponse,
    });

    it('posts a comment when `publishStatusCommentOnFailure = true`', () => {
      const params = getParams({
        publishStatusCommentOnFailure: true,
      });
      expect(getCommentBody(params)).toMatchInlineSnapshot(`
        "## 💔 All backports failed

        | Status | Branch | Result |
        |:------:|:------:|:------|
        |❌|--foo|An unhandled error occurred. Please see the logs for details|

        ### Manual backport
        To create the backport manually run:
        \`\`\`
        node scripts/backport --pr 55
        \`\`\`

        ### Questions ?
        Please refer to the [Backport tool documentation](https://github.com/sorenlouv/backport)

        <!--- Backport version: 1.2.3-mocked -->"
      `);
    });

    it('does not post a comment when `publishStatusCommentOnFailure = false`', () => {
      const params = getParams({ publishStatusCommentOnFailure: false });
      expect(getCommentBody(params)).toBe(undefined);
    });
  });

  describe('shield.io badges', () => {
    const getParams = (opts: Partial<ValidConfigOptions>) => ({
      options: {
        interactive: true,
        repoName: 'kibana',
        repoOwner: 'elastic',
        autoMerge: true,
        backportBinary: 'node scripts/backport',
        publishStatusCommentOnSuccess: true,
        ...opts,
      } as ValidConfigOptions,
      pullNumber: 55,
      backportResponse: {
        status: 'success',
        results: [
          {
            status: 'success',
            targetBranch: '7.x',
            pullRequestNumber: 55,
            pullRequestUrl: 'url-to-pr',
          },
        ],
      } as BackportResponse,
    });

    it('posts a comment without shields.io badge when repo is private`', () => {
      const params = getParams({ isRepoPrivate: true });
      expect(getCommentBody(params)).not.toContain('img.shields.io');
      expect(getCommentBody(params)).toMatchInlineSnapshot(`
        "## 💚 All backports created successfully

        | Status | Branch | Result |
        |:------:|:------:|:------|
        |✅|7.x|url-to-pr|

        Note: Successful backport PRs will be merged automatically after passing CI.

        ### Questions ?
        Please refer to the [Backport tool documentation](https://github.com/sorenlouv/backport)

        <!--- Backport version: 1.2.3-mocked -->"
      `);
    });

    it('posts a comment with shields.io badge when repo is public`', () => {
      const params = getParams({ isRepoPrivate: false });
      expect(getCommentBody(params)).toContain('img.shields.io');
      expect(getCommentBody(params)).toMatchInlineSnapshot(`
        "## 💚 All backports created successfully

        | Status | Branch | Result |
        |:------:|:------:|:------|
        |✅|7.x|[<img src="https://img.shields.io/github/pulls/detail/state/elastic/kibana/55">](url-to-pr)|

        Note: Successful backport PRs will be merged automatically after passing CI.

        ### Questions ?
        Please refer to the [Backport tool documentation](https://github.com/sorenlouv/backport)

        <!--- Backport version: 1.2.3-mocked -->"
      `);
    });
  });
});
