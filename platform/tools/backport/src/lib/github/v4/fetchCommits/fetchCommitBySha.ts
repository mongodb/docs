import gql from 'graphql-tag';
import { ValidConfigOptions } from '../../../../options/options';
import { BackportError } from '../../../BackportError';
import { swallowMissingConfigFileException } from '../../../remoteConfig';
import {
  Commit,
  SourceCommitWithTargetPullRequest,
  SourceCommitWithTargetPullRequestFragment,
  parseSourceCommit,
} from '../../../sourceCommit/parseSourceCommit';
import { apiRequestV4 } from '../apiRequestV4';

export async function fetchCommitBySha(options: {
  accessToken: string;
  branchLabelMapping?: ValidConfigOptions['branchLabelMapping'];
  githubApiBaseUrlV4?: string;
  repoName: string;
  repoOwner: string;
  sha: string;
  sourceBranch: string;
}): Promise<Commit> {
  const {
    accessToken,
    githubApiBaseUrlV4 = 'https://api.github.com/graphql',
    repoName,
    repoOwner,
    sha,
    sourceBranch,
  } = options;

  const query = gql`
    query CommitsBySha($repoOwner: String!, $repoName: String!, $sha: String!) {
      repository(owner: $repoOwner, name: $repoName) {
        object(expression: $sha) {
          ...SourceCommitWithTargetPullRequestFragment
        }
      }
    }

    ${SourceCommitWithTargetPullRequestFragment}
  `;

  let data: CommitsByShaResponse;
  try {
    const res = await apiRequestV4<CommitsByShaResponse>({
      githubApiBaseUrlV4,
      accessToken,
      query,
      variables: {
        repoOwner,
        repoName,
        sha,
      },
    });
    data = res.data.data;
  } catch (e) {
    data = swallowMissingConfigFileException<CommitsByShaResponse>(e);
  }

  const sourceCommit = data.repository.object;

  if (!sourceCommit) {
    throw new BackportError(
      `No commit found on branch "${sourceBranch}" with sha "${sha}"`,
    );
  }

  return parseSourceCommit({ options, sourceCommit });
}

interface CommitsByShaResponse {
  repository: {
    object: SourceCommitWithTargetPullRequest | null;
  };
}
