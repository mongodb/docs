import fs from 'fs/promises';
import os from 'os';
import nock from 'nock';
import * as git from '../lib/git';
import { GithubConfigOptionsResponse } from '../lib/github/v4/getOptionsFromGithub/query';
import { RepoOwnerAndNameResponse } from '../lib/github/v4/getRepoOwnerAndNameFromGitRemotes';
import * as logger from '../lib/logger';
import { mockConfigFiles } from '../test/mockConfigFiles';
import { mockGqlRequest } from '../test/nockHelpers';
import { ConfigFileOptions } from './ConfigOptions';
import { getOptions } from './options';

const defaultConfigs = {
  projectConfig: {
    // use localhost to avoid CORS issues with nock
    githubApiBaseUrlV4: 'http://localhost/graphql',
    repoOwner: 'elastic',
    repoName: 'kibana',
    targetBranchChoices: ['7.9', '8.0'],
  },
  globalConfig: { accessToken: 'abc', editor: 'code' },
};

describe('getOptions', () => {
  afterEach(() => {
    jest.clearAllMocks();
    nock.cleanAll();
  });

  beforeEach(() => {
    mockConfigFiles(defaultConfigs);
    jest.spyOn(os, 'homedir').mockReturnValue('/myHomeDir');
    jest.spyOn(fs, 'writeFile').mockResolvedValue();
    jest.spyOn(fs, 'chmod').mockResolvedValue();
  });

  describe('should throw', () => {
    beforeEach(() => {
      mockGithubConfigOptions({});
    });

    it('when accessToken is missing', async () => {
      mockConfigFiles({
        projectConfig: defaultConfigs.projectConfig,
        globalConfig: { accessToken: undefined },
      });

      await expect(() =>
        getOptions({
          optionsFromCliArgs: {},
          optionsFromModule: {},
        }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`
        "Please update your config file: "/myHomeDir/.backport/config.json".
        It must contain a valid "accessToken".

        Read more: https://github.com/sorenlouv/backport/blob/main/docs/config-file-options.md#global-config-backportconfigjson"
      `);
    });

    it('when `targetBranches`, `targetBranchChoices` and `branchLabelMapping` are all empty', async () => {
      mockProjectConfig({
        targetBranches: undefined,
        targetBranchChoices: undefined,
        branchLabelMapping: undefined,
      });

      await expect(() =>
        getOptions({ optionsFromCliArgs: {}, optionsFromModule: {} }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`
        "Please specify a target branch: "--branch 6.1".

        Read more: https://github.com/sorenlouv/backport/blob/main/docs/config-file-options.md#project-config-backportrcjson"
      `);
    });

    describe('whe option is an empty string', () => {
      it('throws for "username"', async () => {
        await expect(() =>
          getOptions({
            optionsFromCliArgs: {},
            optionsFromModule: { repoForkOwner: '', author: 'sorenlouv' },
          }),
        ).rejects.toThrowErrorMatchingInlineSnapshot(
          `""repoForkOwner" cannot be empty!"`,
        );
      });

      it('throws for "author"', async () => {
        await expect(() =>
          getOptions({
            optionsFromCliArgs: {},
            optionsFromModule: { author: '' },
          }),
        ).rejects.toThrowErrorMatchingInlineSnapshot(
          `""author" cannot be empty!"`,
        );
      });

      it('throws for "accessToken"', async () => {
        await expect(() =>
          getOptions({
            optionsFromCliArgs: {},
            optionsFromModule: { accessToken: '' },
          }),
        ).rejects.toThrowErrorMatchingInlineSnapshot(`
          "Please update your config file: "/myHomeDir/.backport/config.json".
          It must contain a valid "accessToken".

          Read more: https://github.com/sorenlouv/backport/blob/main/docs/config-file-options.md#global-config-backportconfigjson"
        `);
      });
    });

    describe('when repoName and repoOwner are missing', () => {
      beforeEach(() => {
        mockProjectConfig({ repoName: undefined, repoOwner: undefined });
      });

      it('should throw if there are no remotes', async () => {
        jest.spyOn(git, 'getRepoInfoFromGitRemotes').mockResolvedValue([]);

        await expect(() =>
          getOptions({ optionsFromCliArgs: {}, optionsFromModule: {} }),
        ).rejects.toThrowErrorMatchingInlineSnapshot(`
          "Please specify a repository: "--repo elastic/kibana".

          Read more: https://github.com/sorenlouv/backport/blob/main/docs/config-file-options.md#project-config-backportrcjson"
        `);
      });

      it('should get repoName from the remote', async () => {
        mockRepoOwnerAndName({
          childRepoOwner: 'sorenlouv',
          parentRepoOwner: 'elastic',
          repoName: 'kibana',
        });

        jest
          .spyOn(git, 'getRepoInfoFromGitRemotes')
          .mockResolvedValue([{ repoName: 'kibana', repoOwner: 'sorenlouv' }]);

        const options = await getOptions({
          optionsFromCliArgs: {},
          optionsFromModule: {},
        });

        expect(options.repoName).toBe('kibana');
        expect(options.repoOwner).toBe('elastic');
      });
    });
  });

  it('reads options from remote config', async () => {
    mockGithubConfigOptions({ hasRemoteConfig: true });
    const options = await getOptions({
      optionsFromCliArgs: {},
      optionsFromModule: {},
    });
    expect(options.branchLabelMapping).toEqual({
      '^v8.2.0$': 'option-from-remote',
    });

    expect(options.autoMergeMethod).toEqual('rebase');
  });

  it('should ensure that "backport" branch does not exist', async () => {
    mockGithubConfigOptions({ hasBackportBranch: true });
    await expect(
      getOptions({ optionsFromCliArgs: {}, optionsFromModule: {} }),
    ).rejects.toThrow(
      'You must delete the branch "backport" to continue. See https://github.com/sorenlouv/backport/issues/155 for details',
    );
  });

  it('should merge config options and module options', async () => {
    mockGithubConfigOptions({});
    const myFn = async () => true;

    const options = await getOptions({
      optionsFromCliArgs: {},
      optionsFromModule: { autoFixConflicts: myFn },
    });
    expect(options.autoFixConflicts).toBe(myFn);
  });

  it('should call setAccessToken', async () => {
    mockGithubConfigOptions({});
    await getOptions({ optionsFromCliArgs: {}, optionsFromModule: {} });

    expect(logger.setAccessToken).toHaveBeenCalledTimes(1);
  });

  it('should return options', async () => {
    mockGithubConfigOptions({
      viewerLogin: 'john.diller',
      defaultBranchRef: 'default-branch-from-github',
    });
    const options = await getOptions({
      optionsFromCliArgs: {},
      optionsFromModule: {},
    });

    expect(options).toEqual({
      accessToken: 'abc',
      assignees: [],
      authenticatedUsername: 'john.diller',
      author: 'john.diller',
      autoAssign: false,
      autoMerge: false,
      autoMergeMethod: 'merge',
      backportBinary: 'backport',
      cherrypickRef: true,
      commitConflicts: false,
      commitPaths: [],
      cwd: expect.any(String),
      dateSince: null,
      dateUntil: null,
      details: false,
      draft: false,
      editor: 'code',
      fork: true,
      gitHostname: 'github.com',
      githubApiBaseUrlV4: 'http://localhost/graphql',
      interactive: true,
      isRepoPrivate: false,
      maxNumber: 10,
      multipleBranches: true,
      multipleCommits: false,
      noUnmergedBackportsHelp: false,
      noVerify: true,
      publishStatusCommentOnAbort: false,
      publishStatusCommentOnFailure: false,
      publishStatusCommentOnSuccess: true,
      repoForkOwner: 'john.diller',
      repoName: 'kibana',
      repoOwner: 'elastic',
      resetAuthor: false,
      reviewers: [],
      signoff: false,
      sourceBranch: 'default-branch-from-github',
      sourcePRLabels: [],
      copySourcePRLabels: false,
      copySourcePRReviewers: false,
      targetBranchChoices: ['7.9', '8.0'],
      targetBranches: [],
      targetPRLabels: [],
      telemetry: true,
    });
  });

  describe('sourceBranch', () => {
    beforeEach(() => {
      mockGithubConfigOptions({ defaultBranchRef: 'some-default-branch' });
    });

    it('uses the `defaultBranchRef` as default', async () => {
      const options = await getOptions({
        optionsFromCliArgs: {},
        optionsFromModule: {},
      });
      expect(options.sourceBranch).toBe('some-default-branch');
    });

    it('uses the sourceBranch given via cli instead of `defaultBranchRef`', async () => {
      const options = await getOptions({
        optionsFromCliArgs: { sourceBranch: 'cli-source-branch' },
        optionsFromModule: {},
      });
      expect(options.sourceBranch).toBe('cli-source-branch');
    });
  });

  describe('fork', () => {
    beforeEach(() => {
      mockGithubConfigOptions({});
    });

    it('is enabled by default', async () => {
      const { fork } = await getOptions({
        optionsFromCliArgs: {},
        optionsFromModule: {},
      });
      expect(fork).toBe(true);
    });

    it('can be disabled via cli', async () => {
      const { fork } = await getOptions({
        optionsFromCliArgs: { fork: false },
        optionsFromModule: {},
      });
      expect(fork).toBe(false);
    });

    it('can be disabled via config file', async () => {
      mockProjectConfig({ fork: false });
      const { fork } = await getOptions({
        optionsFromCliArgs: {},
        optionsFromModule: {},
      });
      expect(fork).toBe(false);
    });
  });

  describe('reviewers', () => {
    beforeEach(() => {
      mockGithubConfigOptions({});
    });

    it('can be set via cli', async () => {
      const { reviewers } = await getOptions({
        optionsFromCliArgs: { reviewers: ['peter'] },
        optionsFromModule: {},
      });
      expect(reviewers).toEqual(['peter']);
    });

    it('can be set via config file', async () => {
      mockProjectConfig({ reviewers: ['john'] });
      const { reviewers } = await getOptions({
        optionsFromCliArgs: {},
        optionsFromModule: {},
      });
      expect(reviewers).toEqual(['john']);
    });
  });

  describe('mainline', () => {
    beforeEach(() => {
      mockGithubConfigOptions({});
    });

    it('is not enabled by default', async () => {
      const { mainline } = await getOptions({
        optionsFromCliArgs: {},
        optionsFromModule: {},
      });
      expect(mainline).toBe(undefined);
    });

    it('can be set via `--mainline` flag', async () => {
      const { mainline } = await getOptions({
        optionsFromCliArgs: { mainline: 1 },
        optionsFromModule: {},
      });
      expect(mainline).toBe(1);
    });

    it('accepts numeric values', async () => {
      const { mainline } = await getOptions({
        optionsFromCliArgs: { mainline: 2 },
        optionsFromModule: {},
      });
      expect(mainline).toBe(2);
    });
  });

  describe('author', () => {
    beforeEach(() => {
      mockGithubConfigOptions({ viewerLogin: 'billy.bob' });
    });

    it('defaults to authenticated user', async () => {
      const { author } = await getOptions({
        optionsFromCliArgs: {},
        optionsFromModule: {},
      });
      expect(author).toBe('billy.bob');
    });

    it('can be overridden via `--author` flag', async () => {
      const { author } = await getOptions({
        optionsFromCliArgs: { author: 'john.doe' },
        optionsFromModule: {},
      });
      expect(author).toBe('john.doe');
    });

    it('can be reset via config file (similar to `--all` flag)', async () => {
      mockProjectConfig({ author: null });
      const { author } = await getOptions({
        optionsFromCliArgs: {},
        optionsFromModule: {},
      });
      expect(author).toBe(null);
    });

    it('can be overridden via config file', async () => {
      mockProjectConfig({ author: 'jane.doe' });
      const { author } = await getOptions({
        optionsFromCliArgs: {},
        optionsFromModule: {},
      });
      expect(author).toBe('jane.doe');
    });
  });

  describe('access token scopes', () => {
    it('throw if no scopes are granted', async () => {
      mockGithubConfigOptions({ headers: { 'x-oauth-scopes': '' } });

      await expect(
        getOptions({
          optionsFromCliArgs: {},
          optionsFromModule: {},
        }),
      ).rejects.toThrow(
        'You must grant the "repo" or "public_repo" scope to your personal access token',
      );
    });

    it('should throw if only `public_repo` scope is granted but the repo is private', async () => {
      mockGithubConfigOptions({
        isRepoPrivate: true,
        headers: { 'x-oauth-scopes': 'public_repo' },
      });

      await expect(
        getOptions({
          optionsFromCliArgs: {},
          optionsFromModule: {},
        }),
      ).rejects.toThrow(
        'You must grant the "repo" scope to your personal access token',
      );
    });

    it('should not throw if `public_repo` scope is granted and the repo is public', async () => {
      mockGithubConfigOptions({
        isRepoPrivate: false,
        headers: { 'x-oauth-scopes': 'public_repo' },
      });

      const options = await getOptions({
        optionsFromCliArgs: {},
        optionsFromModule: {},
      });

      expect(options).toBeDefined();
    });
  });

  describe('cherrypickRef', () => {
    beforeEach(() => {
      mockGithubConfigOptions({});
    });

    it('should default to true', async () => {
      const { cherrypickRef } = await getOptions({
        optionsFromCliArgs: {},
        optionsFromModule: {},
      });
      expect(cherrypickRef).toBe(true);
    });

    it('should be settable via config file', async () => {
      mockProjectConfig({ cherrypickRef: false });
      const { cherrypickRef } = await getOptions({
        optionsFromCliArgs: {},
        optionsFromModule: {},
      });
      expect(cherrypickRef).toBe(false);
    });

    it('cli args overwrites config', async () => {
      mockProjectConfig({ cherrypickRef: false });
      const { cherrypickRef } = await getOptions({
        optionsFromCliArgs: { cherrypickRef: true },
        optionsFromModule: {},
      });
      expect(cherrypickRef).toBe(true);
    });
  });
});

function mockProjectConfig(projectConfig: ConfigFileOptions) {
  return mockConfigFiles({
    globalConfig: { accessToken: 'abc' },
    projectConfig: {
      // use localhost to avoid CORS issues with nock
      githubApiBaseUrlV4: 'http://localhost/graphql',
      repoOwner: 'elastic',
      repoName: 'kibana',
      targetBranchChoices: ['7.9', '8.0'],
      ...projectConfig,
    },
  });
}

function mockGithubConfigOptions({
  viewerLogin = 'DO_NOT_USE-sorenlouv',
  defaultBranchRef = 'DO_NOT_USE-default-branch-name',
  hasBackportBranch,
  hasRemoteConfig,
  isRepoPrivate = false,
  headers = { 'x-oauth-scopes': 'repo' },
}: {
  viewerLogin?: string;
  defaultBranchRef?: string;
  hasBackportBranch?: boolean;
  hasRemoteConfig?: boolean;
  isRepoPrivate?: boolean;
  headers?: Record<string, string>;
}) {
  return mockGqlRequest<GithubConfigOptionsResponse>({
    name: 'GithubConfigOptions',
    statusCode: 200,
    body: {
      data: {
        viewer: {
          login: viewerLogin,
        },
        repository: {
          isPrivate: isRepoPrivate,
          illegalBackportBranch: hasBackportBranch ? { id: 'foo' } : null,
          defaultBranchRef: {
            name: defaultBranchRef,
            target: {
              remoteConfigHistory: {
                edges: hasRemoteConfig
                  ? [
                      {
                        remoteConfig: {
                          committedDate: '2020-08-15T00:00:00.000Z',
                          file: {
                            object: {
                              text: JSON.stringify({
                                autoMergeMethod: 'rebase',
                                branchLabelMapping: {
                                  '^v8.2.0$': 'option-from-remote',
                                },
                              } as ConfigFileOptions),
                            },
                          },
                        },
                      },
                    ]
                  : [],
              },
            },
          },
        },
      },
    },
    headers,
  });
}

function mockRepoOwnerAndName({
  repoName,
  parentRepoOwner,
  childRepoOwner,
}: {
  repoName: string;
  parentRepoOwner: string;
  childRepoOwner: string;
}) {
  return mockGqlRequest<RepoOwnerAndNameResponse>({
    name: 'RepoOwnerAndName',
    statusCode: 200,
    body: {
      data: {
        repository: {
          isFork: true,
          name: repoName,
          owner: {
            login: childRepoOwner,
          },
          parent: {
            owner: {
              login: parentRepoOwner,
            },
          },
        },
      },
    },
  });
}
