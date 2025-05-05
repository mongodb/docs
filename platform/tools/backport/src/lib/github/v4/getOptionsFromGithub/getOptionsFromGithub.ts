import { AxiosResponse } from 'axios';
import { ConfigFileOptions } from '../../../../options/ConfigOptions';
import { BackportError } from '../../../BackportError';
import {
  getLocalConfigFileCommitDate,
  isLocalConfigFileUntracked,
  isLocalConfigFileModified,
} from '../../../git';
import { logger } from '../../../logger';
import {
  parseRemoteConfigFile,
  swallowMissingConfigFileException,
} from '../../../remoteConfig';
import {
  apiRequestV4,
  GithubV4Exception,
  GithubV4Response,
} from '../apiRequestV4';
import { throwOnInvalidAccessToken } from '../throwOnInvalidAccessToken';
import { GithubConfigOptionsResponse, query } from './query';

// fetches the default source branch for the repo (normally "master")
// startup checks:
// - verify the access token
// - ensure no branch named "backport" exists

export type OptionsFromGithub = Awaited<
  ReturnType<typeof getOptionsFromGithub>
>;
export async function getOptionsFromGithub(options: {
  accessToken: string;
  cwd?: string;
  githubApiBaseUrlV4?: string;
  repoName: string;
  repoOwner: string;
  skipRemoteConfig?: boolean;
  globalConfigFile?: string;
  sourceBranch?: string;
}) {
  const {
    accessToken,
    githubApiBaseUrlV4,
    repoName,
    repoOwner,
    globalConfigFile,
  } = options;

  let data: GithubConfigOptionsResponse;

  try {
    const res = await apiRequestV4<GithubConfigOptionsResponse>({
      githubApiBaseUrlV4,
      accessToken,
      query,
      variables: { repoOwner, repoName },
    });

    throwIfInsufficientPermissions(res);

    data = res.data.data;
  } catch (e) {
    if (!(e instanceof GithubV4Exception)) {
      throw e;
    }

    throwOnInvalidAccessToken({
      error: e,
      repoName,
      repoOwner,
      globalConfigFile,
    });
    data = swallowMissingConfigFileException<GithubConfigOptionsResponse>(e);
  }

  // it is not possible to have a branch named "backport"
  if (data.repository.illegalBackportBranch) {
    throw new BackportError(
      'You must delete the branch "backport" to continue. See https://github.com/sorenlouv/backport/issues/155 for details',
    );
  }

  const remoteConfig = await getRemoteConfigFileOptions(
    data,
    options.cwd,
    options.skipRemoteConfig,
  );

  return {
    authenticatedUsername: data.viewer.login,
    sourceBranch: options.sourceBranch ?? data.repository.defaultBranchRef.name,
    isRepoPrivate: data.repository.isPrivate,
    ...remoteConfig,
  };
}

async function getRemoteConfigFileOptions(
  res: GithubConfigOptionsResponse,
  cwd?: string,
  skipRemoteConfig?: boolean,
): Promise<ConfigFileOptions | undefined> {
  if (skipRemoteConfig) {
    logger.info(
      'Remote config: Skipping. `--skip-remote-config` specified via config file or cli',
    );
    return;
  }

  const remoteConfig =
    res.repository.defaultBranchRef.target.remoteConfigHistory.edges?.[0]
      ?.remoteConfig;

  if (!remoteConfig) {
    logger.info("Remote config: Skipping. Remote config doesn't exist");
    return;
  }

  if (cwd) {
    const [isLocalConfigModified, isLocalConfigUntracked, localCommitDate] =
      await Promise.all([
        isLocalConfigFileModified({ cwd }),
        isLocalConfigFileUntracked({ cwd }),
        getLocalConfigFileCommitDate({ cwd }),
      ]);

    if (isLocalConfigUntracked) {
      logger.info('Remote config: Skipping. Local config is new');
      return;
    }

    if (isLocalConfigModified) {
      logger.info('Remote config: Skipping. Local config is modified');
      return;
    }

    if (
      localCommitDate &&
      localCommitDate > Date.parse(remoteConfig.committedDate)
    ) {
      logger.info(
        `Remote config: Skipping. Local config is newer: ${new Date(
          localCommitDate,
        ).toISOString()} > ${remoteConfig.committedDate}`,
      );
      return;
    }
  }

  logger.info('Remote config: Parsing.');
  return parseRemoteConfigFile(remoteConfig);
}

function throwIfInsufficientPermissions(
  res: AxiosResponse<GithubV4Response<GithubConfigOptionsResponse>, any>,
) {
  const accessScopesHeader = res.headers['x-oauth-scopes'] as
    | string
    | undefined;

  if (accessScopesHeader === undefined) {
    return;
  }

  const accessTokenScopes = accessScopesHeader
    .split(',')
    .map((scope) => scope.trim());

  const isRepoPrivate = res.data.data.repository.isPrivate;

  if (isRepoPrivate && !accessTokenScopes.includes('repo')) {
    throw new BackportError(
      `You must grant the "repo" scope to your personal access token`,
    );
  }

  if (
    !accessTokenScopes.includes('repo') &&
    !accessTokenScopes.includes('public_repo')
  ) {
    throw new BackportError(
      `You must grant the "repo" or "public_repo" scope to your personal access token`,
    );
  }
}
