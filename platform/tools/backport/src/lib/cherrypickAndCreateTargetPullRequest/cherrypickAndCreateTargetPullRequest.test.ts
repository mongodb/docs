import os from 'os';
import nock from 'nock';
import { ValidConfigOptions } from '../../options/options';
import {
  listenForCallsToNockScope,
  mockGqlRequest,
} from '../../test/nockHelpers';
import { SpyHelper } from '../../types/SpyHelper';
import * as childProcess from '../child-process-promisified';
import { TargetBranchResponse } from '../github/v4/validateTargetBranch';
import * as logger from '../logger';
import * as oraModule from '../ora';
import { Commit } from '../sourceCommit/parseSourceCommit';
import * as autoMergeNowOrLater from './autoMergeNowOrLater';
import { cherrypickAndCreateTargetPullRequest } from './cherrypickAndCreateTargetPullRequest';

describe('cherrypickAndCreateTargetPullRequest', () => {
  let execSpy: SpyHelper<typeof childProcess.spawnPromise>;
  let addLabelsScope: ReturnType<typeof nock>;
  let consoleLogSpy: SpyHelper<(typeof logger)['consoleLog']>;
  let autoMergeSpy: SpyHelper<typeof autoMergeNowOrLater.autoMergeNowOrLater>;

  beforeEach(() => {
    jest.spyOn(os, 'homedir').mockReturnValue('/myHomeDir');

    autoMergeSpy = jest.spyOn(autoMergeNowOrLater, 'autoMergeNowOrLater');

    execSpy = jest
      .spyOn(childProcess, 'spawnPromise')

      // mock all spawn commands to respond without errors
      .mockResolvedValue({ stdout: '', stderr: '', code: 0, cmdArgs: [] });

    consoleLogSpy = jest.spyOn(logger, 'consoleLog');

    // ensure labels are added
    addLabelsScope = nock('https://api.github.com')
      .post('/repos/elastic/kibana/issues/1337/labels', {
        labels: ['backport'],
      })
      .reply(200);
  });

  afterEach(() => {
    jest.clearAllMocks();
    addLabelsScope.done();
    nock.cleanAll();
  });

  describe('when commit has a pull request reference', () => {
    let res: Awaited<ReturnType<typeof cherrypickAndCreateTargetPullRequest>>;
    let createPullRequestCalls: unknown[];
    let oraSpy: jest.SpyInstance;

    beforeEach(async () => {
      const options = {
        assignees: [] as string[],
        authenticatedUsername: 'sqren_authenticated',
        author: 'sorenlouv',
        autoMerge: true,
        autoMergeMethod: 'squash',
        fork: true,
        gitAuthorEmail: 'soren@louv.dk',
        gitAuthorName: 'Soren L',
        githubApiBaseUrlV4: 'http://localhost/graphql',
        interactive: false,
        prTitle: '[{{targetBranch}}] {{commitMessages}}',
        repoForkOwner: 'sorenlouv',
        repoName: 'kibana',
        repoOwner: 'elastic',
        reviewers: [] as string[],
        sourceBranch: 'myDefaultSourceBranch',
        sourcePRLabels: [] as string[],
        targetPRLabels: ['backport'],
      } as ValidConfigOptions;

      const commits: Commit[] = [
        {
          author: {
            email: 'soren.louv@elastic.co',
            name: 'Søren Louv-Jansen',
          },
          sourceBranch: '7.x',
          suggestedTargetBranches: [],
          sourceCommit: {
            branchLabelMapping: {},
            committedDate: 'fff',
            sha: 'mySha',
            message: 'My original commit message (#1000)',
          },
          sourcePullRequest: {
            labels: [],
            url: 'foo',
            number: 1000,
            title: 'My original commit message',
            mergeCommit: {
              sha: 'mySha',
              message: 'My original commit message (#1000)',
            },
          },
          targetPullRequestStates: [],
        },
        {
          author: {
            email: 'soren.louv@elastic.co',
            name: 'Søren Louv-Jansen',
          },
          sourceBranch: '7.x',
          suggestedTargetBranches: [],
          sourceCommit: {
            branchLabelMapping: {},
            committedDate: 'ggg',
            sha: 'mySha2',
            message: 'My other commit message (#2000)',
          },
          sourcePullRequest: {
            labels: [],
            url: 'foo',
            number: 2000,
            title: 'My other commit message',
            mergeCommit: {
              sha: 'mySha2',
              message: 'My other commit message (#2000)',
            },
          },
          targetPullRequestStates: [],
        },
      ];

      mockGqlRequest<TargetBranchResponse>({
        name: 'GetBranchId',
        statusCode: 200,
        body: { data: { repository: { ref: { id: 'foo' } } } },
      });

      const scope = nock('https://api.github.com')
        .post('/repos/elastic/kibana/pulls')
        .reply(200, { number: 1337, html_url: 'myHtmlUrl' });
      createPullRequestCalls = listenForCallsToNockScope(scope);

      oraSpy = jest.spyOn(oraModule, 'ora');

      res = await cherrypickAndCreateTargetPullRequest({
        options,
        commits,
        targetBranch: '6.x',
      });

      scope.done();
      nock.cleanAll();
    });

    it('creates the pull request with multiple PR references', () => {
      expect(createPullRequestCalls).toMatchInlineSnapshot(`
        [
          {
            "base": "6.x",
            "body": "# Backport

        This will backport the following commits from \`7.x\` to \`6.x\`:
         - [My original commit message (#1000)](foo)
         - [My other commit message (#2000)](foo)

        <!--- Backport version: 1.2.3-mocked -->

        ### Questions ?
        Please refer to the [Backport tool documentation](https://github.com/sorenlouv/backport)",
            "head": "sorenlouv:backport/6.x/pr-1000_pr-2000",
            "title": "[6.x] My original commit message (#1000) | My other commit message (#2000)",
          },
        ]
      `);
    });

    it('calls autoMergeNowOrLater', () => {
      expect(autoMergeSpy).toHaveBeenCalledWith(expect.any(Object), 1337);
    });

    it('returns the expected response', () => {
      expect(res).toEqual({ didUpdate: false, url: 'myHtmlUrl', number: 1337 });
    });

    it('should make correct git commands', () => {
      expect(execSpy.mock.calls).toMatchSnapshot();
    });

    it('logs correctly', () => {
      expect(consoleLogSpy.mock.calls.length).toBe(2);
      expect(consoleLogSpy.mock.calls[0][0]).toMatchInlineSnapshot(`
        "
        Backporting to 6.x:"
      `);
      expect(consoleLogSpy.mock.calls[1][0]).toMatchInlineSnapshot(
        `"View pull request: myHtmlUrl"`,
      );
    });

    it('should start the spinner with the correct text', () => {
      expect(oraSpy.mock.calls.map(([, text]) => text)).toMatchInlineSnapshot(`
[
  "",
  "Pulling latest changes",
  "Cherry-picking: My original commit message (#1000)",
  "Cherry-picking: My other commit message (#2000)",
  "Pushing branch "sorenlouv:backport/6.x/pr-1000_pr-2000"",
  undefined,
  "Creating pull request",
  "Adding labels: backport",
  "Auto-merge: Enabling via "squash"",
]
`);
    });
  });

  describe('when commit does not have a pull request reference', () => {
    let res: Awaited<ReturnType<typeof cherrypickAndCreateTargetPullRequest>>;
    let createPullRequestCalls: unknown[];

    beforeEach(async () => {
      const options = {
        assignees: [] as string[],
        authenticatedUsername: 'sqren_authenticated',
        author: 'sorenlouv',
        fork: true,
        prTitle: '[{{targetBranch}}] {{commitMessages}}',
        repoForkOwner: 'the_fork_owner',
        repoName: 'kibana',
        repoOwner: 'elastic',
        reviewers: [] as string[],
        sourcePRLabels: [] as string[],
        targetPRLabels: ['backport'],
        githubApiBaseUrlV4: 'http://localhost/graphql',
      } as ValidConfigOptions;

      const commits: Commit[] = [
        {
          author: {
            email: 'soren.louv@elastic.co',
            name: 'Søren Louv-Jansen',
          },
          suggestedTargetBranches: [],
          sourceCommit: {
            branchLabelMapping: {},
            committedDate: 'hhh',
            sha: 'mySha',
            message: 'My original commit message',
          },
          sourceBranch: '7.x',
          targetPullRequestStates: [],
        },
      ];

      mockGqlRequest<TargetBranchResponse>({
        name: 'GetBranchId',
        statusCode: 200,
        body: { data: { repository: { ref: { id: 'foo' } } } },
      });

      const scope = nock('https://api.github.com')
        .post('/repos/elastic/kibana/pulls')
        .reply(200, { number: 1337, html_url: 'myHtmlUrl' });

      createPullRequestCalls = listenForCallsToNockScope(scope);

      res = await cherrypickAndCreateTargetPullRequest({
        options,
        commits,
        targetBranch: '6.x',
      });
      scope.done();
      nock.cleanAll();
    });

    it('creates the pull request with commit reference', () => {
      expect(createPullRequestCalls).toMatchInlineSnapshot(`
        [
          {
            "base": "6.x",
            "body": "# Backport

        This will backport the following commits from \`7.x\` to \`6.x\`:
         - My original commit message (mySha)

        <!--- Backport version: 1.2.3-mocked -->

        ### Questions ?
        Please refer to the [Backport tool documentation](https://github.com/sorenlouv/backport)",
            "head": "the_fork_owner:backport/6.x/commit-mySha",
            "title": "[6.x] My original commit message",
          },
        ]
      `);
    });

    it('returns the expected response', () => {
      expect(res).toEqual({ didUpdate: false, url: 'myHtmlUrl', number: 1337 });
    });
  });

  describe('when cherry-picking fails', () => {
    let res: Awaited<ReturnType<typeof cherrypickAndCreateTargetPullRequest>>;
    let createPullRequestCalls: unknown[];

    beforeEach(async () => {
      const options = {
        assignees: [] as string[],
        authenticatedUsername: 'sqren_authenticated',
        author: 'sorenlouv',
        fork: true,
        githubApiBaseUrlV4: 'http://localhost/graphql',
        prTitle: '[{{targetBranch}}] {{commitMessages}}',
        repoForkOwner: 'sorenlouv',
        repoName: 'kibana',
        repoOwner: 'elastic',
        reviewers: [] as string[],
        sourceBranch: 'myDefaultSourceBranch',
        sourcePRLabels: [] as string[],
        targetPRLabels: ['backport'],
      } as ValidConfigOptions;

      mockGqlRequest<TargetBranchResponse>({
        name: 'GetBranchId',
        statusCode: 200,
        body: { data: { repository: { ref: { id: 'foo' } } } },
      });

      const scope = nock('https://api.github.com')
        .post('/repos/elastic/kibana/pulls')
        .reply(200, { number: 1337, html_url: 'myHtmlUrl' });

      createPullRequestCalls = listenForCallsToNockScope(scope);

      res = await cherrypickAndCreateTargetPullRequest({
        options,
        commits: [
          {
            author: {
              email: 'soren.louv@elastic.co',
              name: 'Søren Louv-Jansen',
            },
            suggestedTargetBranches: [],
            sourceCommit: {
              branchLabelMapping: {},
              committedDate: '2021-08-18T16:11:38Z',
              sha: 'mySha',
              message: 'My original commit message',
            },
            sourceBranch: '7.x',
            targetPullRequestStates: [],
          },
        ],
        targetBranch: '6.x',
      });

      scope.done();
      nock.cleanAll();
    });

    it('creates the pull request with commit reference', () => {
      expect(createPullRequestCalls).toMatchInlineSnapshot(`
        [
          {
            "base": "6.x",
            "body": "# Backport

        This will backport the following commits from \`7.x\` to \`6.x\`:
         - My original commit message (mySha)

        <!--- Backport version: 1.2.3-mocked -->

        ### Questions ?
        Please refer to the [Backport tool documentation](https://github.com/sorenlouv/backport)",
            "head": "sorenlouv:backport/6.x/commit-mySha",
            "title": "[6.x] My original commit message",
          },
        ]
      `);
    });

    it('returns the expected response', () => {
      expect(res).toEqual({ didUpdate: false, url: 'myHtmlUrl', number: 1337 });
    });
  });
});
