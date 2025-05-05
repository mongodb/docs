import gql from 'graphql-tag';
import { ValidConfigOptions } from '../../../options/options';
import { PullRequestPayload } from '../v3/getPullRequest/createPullRequest';
import { apiRequestV4 } from './apiRequestV4';

export async function fetchExistingPullRequest({
  options,
  prPayload,
}: {
  options: ValidConfigOptions;
  prPayload: PullRequestPayload;
}) {
  const { githubApiBaseUrlV4, accessToken } = options;
  const query = gql`
    query ExistingPullRequest(
      $repoOwner: String!
      $repoName: String!
      $base: String!
      $head: String!
    ) {
      repository(owner: $repoOwner, name: $repoName) {
        name
        ref(qualifiedName: $head) {
          name
          associatedPullRequests(
            first: 1
            states: OPEN
            baseRefName: $base
            headRefName: $head
          ) {
            edges {
              node {
                number
                url
              }
            }
          }
        }
      }
    }
  `;

  const { repoForkOwner, head } = splitHead(prPayload);

  const res = await apiRequestV4<ExistingPullRequestResponse>({
    githubApiBaseUrlV4,
    accessToken,
    query,
    variables: {
      repoOwner: repoForkOwner,
      repoName: prPayload.repo,
      base: prPayload.base,
      head: head,
    },
  });

  const existingPullRequest =
    res.data.data.repository.ref?.associatedPullRequests.edges[0];

  if (!existingPullRequest) {
    return;
  }

  return {
    url: existingPullRequest.node.url,
    number: existingPullRequest.node.number,
  };
}

interface ExistingPullRequestResponse {
  repository: {
    name: string;
    ref: {
      name: string;
      associatedPullRequests: {
        edges: {
          node: {
            number: number;
            url: string;
          };
        }[];
      };
    } | null;
  };
}

function splitHead(prPayload: PullRequestPayload) {
  const [repoForkOwner, head] = prPayload.head.split(':');
  return { repoForkOwner, head };
}
