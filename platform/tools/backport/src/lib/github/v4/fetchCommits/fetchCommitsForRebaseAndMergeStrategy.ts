import gql from 'graphql-tag';
import { Commit } from '../../../../entrypoint.api';
import { apiRequestV4 } from '../apiRequestV4';
import { fetchCommitBySha } from './fetchCommitBySha';

export async function fetchCommitsForRebaseAndMergeStrategy(
  options: {
    accessToken: string;
    githubApiBaseUrlV4?: string;
    pullNumber: number;
    repoName: string;
    repoOwner: string;
    sourceBranch: string;
  },
  commitsTotalCount: number,
): Promise<Commit[] | undefined> {
  const {
    accessToken,
    githubApiBaseUrlV4 = 'https://api.github.com/graphql',
    pullNumber,
    repoName,
    repoOwner,
  } = options;

  const query = gql`
    query CommitsForRebaseAndMergeStrategy(
      $repoOwner: String!
      $repoName: String!
      $pullNumber: Int!
      $commitsTotalCount: Int!
    ) {
      repository(owner: $repoOwner, name: $repoName) {
        pullRequest(number: $pullNumber) {
          number
          commits(first: $commitsTotalCount) {
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
            committedDate
            history(first: $commitsTotalCount) {
              edges {
                node {
                  oid
                  message
                  committedDate
                  associatedPullRequests(first: 1) {
                    edges {
                      node {
                        number
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const res = await apiRequestV4<Response>({
    githubApiBaseUrlV4,
    accessToken,
    query,
    variables: {
      repoOwner,
      repoName,
      pullNumber,
      commitsTotalCount,
    },
  });

  const pullRequestNode = res.data.data.repository.pullRequest;

  if (!pullRequestNode?.mergeCommit) {
    throw new Error('Pull request is not merged');
  }

  if (pullRequestNode.commits.totalCount !== commitsTotalCount) {
    throw new Error(
      `Specified number of commits is ${commitsTotalCount} whereas the actual number is ${pullRequestNode.commits.totalCount}`,
    );
  }

  const commitsInPullRequest = pullRequestNode.commits.edges;
  const commitsInBaseBranch =
    pullRequestNode.mergeCommit.history.edges.reverse();

  const didUseRebaseAndMergeStrategy = commitsInBaseBranch.every((c, i) => {
    const hasSameCommittedDate =
      c.node.committedDate === pullRequestNode.mergeCommit?.committedDate;

    const hasSameCommitMessages =
      c.node.message === commitsInPullRequest[i].node.commit.message;

    const hasSamePullNumber =
      c.node.associatedPullRequests.edges[0].node.number ===
      pullRequestNode.number;

    return hasSameCommittedDate && hasSameCommitMessages && hasSamePullNumber;
  });

  if (didUseRebaseAndMergeStrategy) {
    const commits = await Promise.all(
      commitsInBaseBranch.map((c) =>
        fetchCommitBySha({ ...options, sha: c.node.oid }),
      ),
    );

    return commits;
  }
}

interface Response {
  repository: {
    pullRequest: {
      number: number;
      commits: {
        totalCount: number;
        edges: {
          node: {
            commit: {
              message: string;
            };
          };
        }[];
      };

      mergeCommit: {
        committedDate: string;
        history: {
          edges: {
            node: {
              oid: string;
              message: string;
              committedDate: string;
              associatedPullRequests: {
                edges: {
                  node: {
                    number: number;
                  };
                }[];
              };
            };
          }[];
        };
      } | null;
    } | null;
  };
}
