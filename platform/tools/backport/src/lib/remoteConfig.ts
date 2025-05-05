import gql from 'graphql-tag';
import { parseConfigFile } from '../options/config/readConfigFile';
import { GithubV4Exception } from './github/v4/apiRequestV4';
import { logger } from './logger';

export const RemoteConfigHistoryFragment = gql`
  fragment RemoteConfigHistoryFragment on Commit {
    remoteConfigHistory: history(first: 1, path: ".backportrc.json") {
      edges {
        remoteConfig: node {
          committedDate
          file(path: ".backportrc.json") {
            ... on TreeEntry {
              object {
                ... on Blob {
                  text
                }
              }
            }
          }
        }
      }
    }
  }
`;

export interface RemoteConfig {
  committedDate: string;
  file: {
    object: { text: string };
  };
}

export interface RemoteConfigHistory {
  remoteConfigHistory: {
    edges: Array<{
      remoteConfig: RemoteConfig;
    }> | null;
  };
}

export function parseRemoteConfigFile(remoteConfig: RemoteConfig) {
  try {
    return parseConfigFile(remoteConfig.file.object.text);
  } catch (e) {
    logger.info('Parsing remote config failed', e);
    return;
  }
}

export function swallowMissingConfigFileException<T>(
  error: GithubV4Exception<T> | unknown,
) {
  if (!(error instanceof GithubV4Exception)) {
    throw error;
  }

  const { data, errors } = error.githubResponse.data;

  const missingConfigError = errors?.some((error) => {
    return error.path?.includes('remoteConfig') && error.type === 'NOT_FOUND';
  });

  // swallow error if it's just the config file that's missing
  if (missingConfigError && data != null) {
    return data as T;
  }

  // Throw unexpected error
  throw error;
}
