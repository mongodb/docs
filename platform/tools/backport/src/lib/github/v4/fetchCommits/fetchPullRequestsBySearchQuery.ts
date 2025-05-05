import gql from 'graphql-tag';
import { isEmpty } from 'lodash';
import { filterUnmergedCommits } from '../../../../utils/filterUnmergedCommits';
import { BackportError } from '../../../BackportError';
import { swallowMissingConfigFileException } from '../../../remoteConfig';
import {
  Commit,
  SourceCommitWithTargetPullRequest,
  SourceCommitWithTargetPullRequestFragment,
  parseSourceCommit,
} from '../../../sourceCommit/parseSourceCommit';
import { apiRequestV4 } from '../apiRequestV4';

export async function fetchPullRequestsBySearchQuery(options: {
  accessToken: string;
  author: string | null;
  dateSince: string | null;
  dateUntil: string | null;
  githubApiBaseUrlV4?: string;
  maxNumber?: number;
  onlyMissing?: boolean;
  prFilter: string;
  repoName: string;
  repoOwner: string;
  sourceBranch: string;
}): Promise<Commit[]> {
  const {
    accessToken,
    author,
    dateSince,
    dateUntil,
    githubApiBaseUrlV4 = 'https://api.github.com/graphql',
    maxNumber = 10,
    prFilter,
    repoName,
    repoOwner,
    sourceBranch,
  } = options;

  const query = gql`
    query PullRequestBySearchQuery($query: String!, $maxNumber: Int!) {
      search(query: $query, type: ISSUE, first: $maxNumber) {
        nodes {
          ... on PullRequest {
            mergeCommit {
              ...SourceCommitWithTargetPullRequestFragment
            }
          }
        }
      }
    }

    ${SourceCommitWithTargetPullRequestFragment}
  `;

  function dateFilter() {
    if (dateUntil && dateSince) {
      return [`merged:${dateSince}..${dateUntil}`];
    }

    if (dateUntil) {
      return [`merged:<${dateUntil}`];
    }

    if (dateSince) {
      return [`merged:>${dateSince}`];
    }

    return [];
  }

  const searchQuery = [
    'type:pr',
    'is:merged',
    'sort:created-desc',
    `repo:${repoOwner}/${repoName}`,
    ...(options.author ? [`author:${options.author}`] : []),
    ...(prFilter.includes('base:') ? [] : [`base:${sourceBranch}`]),
    ...dateFilter(),
    prFilter,
  ].join(' ');

  const variables = {
    query: searchQuery,
    maxNumber,
  };

  let data: ResponseData;
  try {
    const res = await apiRequestV4<ResponseData>({
      githubApiBaseUrlV4,
      accessToken,
      query,
      variables,
    });
    data = res.data.data;
  } catch (e) {
    data = swallowMissingConfigFileException<ResponseData>(e);
  }

  const commits = data.search.nodes.map((pullRequestNode) => {
    const sourceCommit = pullRequestNode.mergeCommit;
    return parseSourceCommit({ options, sourceCommit });
  });

  // terminate if not commits were found
  if (isEmpty(commits)) {
    const errorText = author
      ? `No commits found for query:\n    ${searchQuery}\n\nUse \`--all\` to see commits by all users or \`--author=<username>\` for commits from a specific user`
      : `No commits found for query:\n    ${searchQuery}`;

    throw new BackportError(errorText);
  }

  if (options.onlyMissing) {
    return commits.filter(filterUnmergedCommits);
  }

  return commits;
}

interface ResponseData {
  search: {
    nodes: Array<{
      mergeCommit: SourceCommitWithTargetPullRequest;
    }>;
  };
}
