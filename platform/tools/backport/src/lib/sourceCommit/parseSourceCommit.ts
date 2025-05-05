import gql from 'graphql-tag';
import { differenceBy } from 'lodash';
import { ValidConfigOptions } from '../../options/options';
import {
  RemoteConfigHistory,
  RemoteConfigHistoryFragment,
  parseRemoteConfigFile,
} from '../remoteConfig';
import {
  TargetPullRequest,
  getPullRequestStates,
  getSourcePullRequest,
} from './getPullRequestStates';

export interface Commit {
  author: SourceCommitWithTargetPullRequest['author'];
  sourceCommit: {
    committedDate: string;
    message: string;
    sha: string;
    branchLabelMapping: ValidConfigOptions['branchLabelMapping'];
  };
  sourcePullRequest?: {
    title: string;
    labels: string[];
    number: number;
    url: string;
    mergeCommit?: {
      message: string;
      sha: string;
    };
  };
  sourceBranch: string;
  suggestedTargetBranches: string[];
  // suggestedTargetDirectories: string[]; // TODO: Feature
  targetPullRequestStates: TargetPullRequest[];
}

export interface SourcePullRequestNode {
  title: string;
  baseRefName: string;
  url: string;
  number: number;
  labels: {
    nodes: {
      name: string;
    }[];
  };
  mergeCommit?: {
    remoteConfigHistory: RemoteConfigHistory['remoteConfigHistory'];
    sha: string;
    message: string;
  };
  timelineItems: {
    edges: TimelineEdge[];
  };
}

export type TimelineEdge = TimelinePullRequestEdge | TimelineIssueEdge;

export interface TimelinePullRequestEdge {
  node: {
    targetPullRequest: {
      __typename: 'PullRequest';
      url: string;
      title: string;
      state: 'OPEN' | 'CLOSED' | 'MERGED';
      baseRefName: string;
      number: number;

      targetMergeCommit: {
        sha: string;
        message: string;
      } | null;

      repository: {
        name: string;
        owner: {
          login: string;
        };
      };

      commits: {
        edges: Array<{
          node: { targetCommit: { message: string; sha: string } };
        }>;
      };
    };
  };
}

interface TimelineIssueEdge {
  node: { targetPullRequest: { __typename: 'Issue' } };
}

export type SourceCommitWithTargetPullRequest = {
  repository: {
    name: string;
    owner: { login: string };
  };
  sha: string;
  message: string;
  committedDate: string;
  author: {
    name: string;
    email: string;
  };

  associatedPullRequests: {
    edges: { node: SourcePullRequestNode }[] | null;
  };
};

function getSuggestedTargetBranches(
  sourceCommit: SourceCommitWithTargetPullRequest,
  targetPullRequestStates: TargetPullRequest[],
  branchLabelMapping?: ValidConfigOptions['branchLabelMapping'],
) {
  const missingPrs = getPullRequestStates({
    sourceCommit,
    branchLabelMapping,
  }).filter((pr) => pr.state === 'NOT_CREATED' || pr.state === 'CLOSED');

  const mergedPrs = targetPullRequestStates.filter(
    (pr) => pr.state === 'MERGED',
  );

  return differenceBy(missingPrs, mergedPrs, (pr) => pr.label).map(
    (pr) => pr.branch,
  );
}

export function parseSourceCommit({
  sourceCommit,
  options,
}: {
  sourceCommit: SourceCommitWithTargetPullRequest;
  options: {
    branchLabelMapping?: ValidConfigOptions['branchLabelMapping'];
    sourceBranch: string;
  };
}): Commit {
  const sourcePullRequest = getSourcePullRequest(sourceCommit);
  const sourceCommitBranchLabelMapping =
    getSourceCommitBranchLabelMapping(sourceCommit);

  const currentBranchLabelMapping = options.branchLabelMapping;

  const targetPullRequestStates = getPullRequestStates({
    sourceCommit,
    branchLabelMapping:
      sourceCommitBranchLabelMapping ?? currentBranchLabelMapping,
  });

  const suggestedTargetBranches = getSuggestedTargetBranches(
    sourceCommit,
    targetPullRequestStates,
    currentBranchLabelMapping,
  );

  return {
    author: sourceCommit.author,
    sourceCommit: {
      committedDate: sourceCommit.committedDate,
      message: sourceCommit.message,
      sha: sourceCommit.sha,
      branchLabelMapping: sourceCommitBranchLabelMapping,
    },
    sourcePullRequest: sourcePullRequest
      ? {
          labels: sourcePullRequest.labels.nodes.map((label) => label.name),
          title: sourcePullRequest.title,
          number: sourcePullRequest.number,
          url: sourcePullRequest.url,
          mergeCommit: sourcePullRequest.mergeCommit
            ? {
                message: sourcePullRequest.mergeCommit.message,
                sha: sourcePullRequest.mergeCommit.sha,
              }
            : undefined,
        }
      : undefined,
    sourceBranch: sourcePullRequest?.baseRefName ?? options.sourceBranch,
    suggestedTargetBranches,
    targetPullRequestStates: targetPullRequestStates,
  };
}

export const SourceCommitWithTargetPullRequestFragment = gql`
  fragment SourceCommitWithTargetPullRequestFragment on Commit {
    # Source Commit
    repository {
      name
      owner {
        login
      }
    }
    sha: oid
    message
    committedDate

    author {
      name
      email
    }

    # Source pull request: PR where source commit was merged in
    associatedPullRequests(first: 1) {
      edges {
        node {
          title
          url
          number
          labels(first: 50) {
            nodes {
              name
            }
          }
          baseRefName

          # source merge commit (the commit that actually went into the source branch)
          mergeCommit {
            ...RemoteConfigHistoryFragment
            sha: oid
            message
          }

          # (possible) backport pull requests referenced in the source pull request
          timelineItems(last: 20, itemTypes: CROSS_REFERENCED_EVENT) {
            edges {
              node {
                ... on CrossReferencedEvent {
                  targetPullRequest: source {
                    __typename

                    # Target PRs (backport PRs)
                    ... on PullRequest {
                      # target merge commit: the backport commit that was merged into the target branch
                      targetMergeCommit: mergeCommit {
                        sha: oid
                        message
                      }
                      repository {
                        name
                        owner {
                          login
                        }
                      }
                      url
                      title
                      state
                      baseRefName
                      number
                      commits(first: 20) {
                        edges {
                          node {
                            targetCommit: commit {
                              message
                              sha: oid
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
        }
      }
    }
  }

  ${RemoteConfigHistoryFragment}
`;

function getSourceCommitBranchLabelMapping(
  sourceCommit: SourceCommitWithTargetPullRequest,
): ValidConfigOptions['branchLabelMapping'] {
  const sourcePullRequest = getSourcePullRequest(sourceCommit);

  const remoteConfig =
    sourcePullRequest?.mergeCommit?.remoteConfigHistory.edges?.[0]
      ?.remoteConfig;

  if (remoteConfig) {
    return parseRemoteConfigFile(remoteConfig)?.branchLabelMapping;
  }
}
