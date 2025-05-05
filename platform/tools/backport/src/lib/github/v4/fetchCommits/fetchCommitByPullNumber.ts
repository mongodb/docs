import gql from 'graphql-tag';
import { ValidConfigOptions } from '../../../../options/options';
import { BackportError } from '../../../BackportError';
import { swallowMissingConfigFileException } from '../../../remoteConfig';
import { Commit } from '../../../sourceCommit/parseSourceCommit';
import { apiRequestV4 } from '../apiRequestV4';
import { fetchCommitBySha } from './fetchCommitBySha';
import { fetchCommitsForRebaseAndMergeStrategy } from './fetchCommitsForRebaseAndMergeStrategy';

export async function fetchCommitsByPullNumber(options: {
  accessToken: string;
  branchLabelMapping?: ValidConfigOptions['branchLabelMapping'];
  githubApiBaseUrlV4?: string;
  pullNumber: number;
  repoName: string;
  repoOwner: string;
  sourceBranch: string;
}): Promise<Commit[]> {
  const {
    accessToken,
    githubApiBaseUrlV4 = 'https://api.github.com/graphql',
    pullNumber,
    repoName,
    repoOwner,
  } = options;

  const query = gql`
    query CommitByPullNumber(
      $repoOwner: String!
      $repoName: String!
      $pullNumber: Int!
    ) {
      repository(owner: $repoOwner, name: $repoName) {
        pullRequest(number: $pullNumber) {
          # used to determine if "Rebase and Merge" strategy was used
          commits(last: 1) {
            totalCount
            edges {
              node {
                commit {
                  message
                }
              }
            }
          }

          mergeCommit {
            oid

            # used to determine if "Rebase and Merge" strategy was used
            committedDate
            history(first: 2) {
              edges {
                node {
                  message
                  committedDate
                }
              }
            }
          }
        }
      }
    }
  `;

  let data: CommitByPullNumberResponse;
  try {
    const res = await apiRequestV4<CommitByPullNumberResponse>({
      githubApiBaseUrlV4,
      accessToken,
      query,
      variables: {
        repoOwner,
        repoName,
        pullNumber,
      },
    });
    data = res.data.data;
  } catch (e) {
    data = swallowMissingConfigFileException<CommitByPullNumberResponse>(e);
  }

  const pullRequestNode = data.repository.pullRequest;
  if (!pullRequestNode) {
    throw new BackportError(`The PR #${pullNumber} does not exist`);
  }

  const { mergeCommit } = pullRequestNode;
  if (mergeCommit === null) {
    throw new BackportError(`The PR #${pullNumber} is not merged`);
  }

  const lastCommitInPullRequest = pullRequestNode.commits.edges[0].node.commit;
  const firstCommitInBaseBranch = mergeCommit.history.edges[0].node;
  const isRebaseAndMergeStrategy =
    pullRequestNode.commits.totalCount > 0 &&
    mergeCommit.history.edges.every(
      (c) => c.node.committedDate === mergeCommit.committedDate,
    ) &&
    lastCommitInPullRequest.message === firstCommitInBaseBranch.message;

  if (isRebaseAndMergeStrategy) {
    const commits = await fetchCommitsForRebaseAndMergeStrategy(
      options,
      pullRequestNode.commits.totalCount,
    );
    if (commits) {
      return commits;
    }
  }

  const commit = await fetchCommitBySha({ ...options, sha: mergeCommit.oid });
  return [commit];
}

interface CommitByPullNumberResponse {
  repository: {
    pullRequest: {
      commits: {
        totalCount: number;
        edges: { node: { commit: { message: string } } }[];
      };

      mergeCommit: {
        oid: string;
        committedDate: string;
        history: {
          edges: {
            node: {
              message: string;
              committedDate: string;
            };
          }[];
        };
      } | null;
    } | null;
  };
}
