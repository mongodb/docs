import gql from 'graphql-tag';
import { ValidConfigOptions } from '../../../options/options';
import { apiRequestV4 } from './apiRequestV4';

interface PullRequestResponse {
  repository: {
    pullRequest: { id: string };
  };
}

export async function fetchPullRequestId(
  options: ValidConfigOptions,
  pullNumber: number,
) {
  const { accessToken, githubApiBaseUrlV4, repoName, repoOwner } = options;

  const prQuery = gql`
    query PullRequestId(
      $repoOwner: String!
      $repoName: String!
      $pullNumber: Int!
    ) {
      repository(owner: $repoOwner, name: $repoName) {
        pullRequest(number: $pullNumber) {
          id
        }
      }
    }
  `;

  const prResponse = await apiRequestV4<PullRequestResponse>({
    githubApiBaseUrlV4,
    accessToken,
    query: prQuery,
    variables: {
      repoOwner,
      repoName,
      pullNumber,
    },
  });

  return prResponse.data.data.repository.pullRequest.id;
}
