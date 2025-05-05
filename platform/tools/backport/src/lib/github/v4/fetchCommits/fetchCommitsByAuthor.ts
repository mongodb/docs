import gql from 'graphql-tag';
import { isEmpty, uniqBy, orderBy } from 'lodash';
import { ValidConfigOptions } from '../../../../options/options';
import { filterNil } from '../../../../utils/filterEmpty';
import { filterUnmergedCommits } from '../../../../utils/filterUnmergedCommits';
import { BackportError } from '../../../BackportError';
import { swallowMissingConfigFileException } from '../../../remoteConfig';
import {
  Commit,
  SourceCommitWithTargetPullRequest,
  SourceCommitWithTargetPullRequestFragment,
  parseSourceCommit,
} from '../../../sourceCommit/parseSourceCommit';
import { GithubV4Exception, apiRequestV4 } from '../apiRequestV4';
import { fetchAuthorId } from '../fetchAuthorId';

async function fetchByCommitPath({
  options,
  authorId,
  commitPath,
}: {
  options: {
    accessToken: string;
    dateSince: string | null;
    dateUntil: string | null;
    githubApiBaseUrlV4?: string;
    maxNumber?: number;
    repoName: string;
    repoOwner: string;
    sourceBranch: string;
  };
  authorId: string | null;
  commitPath: string | null;
}) {
  const {
    accessToken,
    dateSince,
    dateUntil,
    githubApiBaseUrlV4 = 'https://api.github.com/graphql',
    maxNumber = 10,
    repoName,
    repoOwner,
    sourceBranch,
  } = options;

  const query = gql`
    query CommitsByAuthor(
      $authorId: ID
      $commitPath: String
      $dateSince: GitTimestamp
      $dateUntil: GitTimestamp
      $maxNumber: Int!
      $repoName: String!
      $repoOwner: String!
      $sourceBranch: String!
    ) {
      repository(owner: $repoOwner, name: $repoName) {
        ref(qualifiedName: $sourceBranch) {
          target {
            ... on Commit {
              history(
                first: $maxNumber
                author: { id: $authorId }
                path: $commitPath
                since: $dateSince
                until: $dateUntil
              ) {
                edges {
                  node {
                    ...SourceCommitWithTargetPullRequestFragment
                  }
                }
              }
            }
          }
        }
      }
    }

    ${SourceCommitWithTargetPullRequestFragment}
  `;

  const variables = {
    repoOwner,
    repoName,
    sourceBranch,
    maxNumber,
    authorId,
    commitPath,
    dateSince,
    dateUntil,
  };

  try {
    const res = await apiRequestV4<CommitByAuthorResponse>({
      githubApiBaseUrlV4,
      accessToken,
      query,
      variables,
    });
    return res.data.data;
  } catch (e) {
    if (e instanceof GithubV4Exception) {
      if (e.githubResponse.status === 502 && maxNumber > 50) {
        throw new BackportError(
          `The GitHub API returned a 502 error. Try reducing the number of commits to display: "--max-number 20"`,
        );
      }
    }
    return swallowMissingConfigFileException<CommitByAuthorResponse>(e);
  }
}

export async function fetchCommitsByAuthor(options: {
  accessToken: string;
  author: string | null;
  branchLabelMapping?: ValidConfigOptions['branchLabelMapping'];
  commitPaths?: string[];
  dateSince: string | null;
  dateUntil: string | null;
  githubApiBaseUrlV4?: string;
  maxNumber?: number;
  onlyMissing?: boolean;
  repoName: string;
  repoOwner: string;
  sourceBranch: string;
}): Promise<Commit[]> {
  const { sourceBranch, commitPaths = [] } = options;

  const authorId = await fetchAuthorId(options);
  const responses = await Promise.all(
    isEmpty(commitPaths)
      ? [fetchByCommitPath({ options, authorId, commitPath: null })]
      : commitPaths.map((commitPath) =>
          fetchByCommitPath({ options, authorId, commitPath }),
        ),
  );

  // we only need to check if the first item is `null` (if the first is `null` they all are)
  if (responses[0].repository.ref === null) {
    throw new BackportError(
      `The upstream branch "${sourceBranch}" does not exist. Try specifying a different branch with "--source-branch <your-branch>"`,
    );
  }

  const commits = responses
    .flatMap((res) => {
      return res.repository.ref?.target.history.edges.map((edge) => {
        const sourceCommit = edge.node;
        return parseSourceCommit({ options, sourceCommit });
      });
    })
    .filter(filterNil);

  // terminate if not commits were found
  if (isEmpty(commits)) {
    const pathText =
      commitPaths.length > 0 ? ` touching files in path: "${commitPaths}"` : '';

    const errorText = options.author
      ? `There are no commits by "${options.author}" in this repository${pathText}. Try with \`--all\` for commits by all users or \`--author=<username>\` for commits from a specific user`
      : `There are no commits in this repository${pathText}`;

    throw new BackportError(errorText);
  }

  const commitsUnique = uniqBy(commits, (c) => c.sourceCommit.sha);
  const commitsSorted = orderBy(
    commitsUnique,
    (c) => c.sourceCommit.committedDate,
    'desc',
  );

  if (options.onlyMissing) {
    return commitsSorted.filter(filterUnmergedCommits);
  }

  return commitsSorted;
}

export interface CommitByAuthorResponse {
  repository: {
    ref: {
      target: {
        history: {
          edges: Array<{ node: SourceCommitWithTargetPullRequest }>;
        };
      };
    } | null;
  };
}
