import gql from 'graphql-tag';
import { ValidConfigOptions } from '../../../options/options';
import { fetchPullRequestId } from './FetchPullRequestId';
import { apiRequestV4, GithubV4Exception } from './apiRequestV4';

interface Response {
  enablePullRequestAutoMerge: { pullRequest?: { number: number } };
}

export async function enablePullRequestAutoMerge(
  options: ValidConfigOptions,
  targetPullRequestNumber: number,
) {
  const {
    accessToken,
    githubApiBaseUrlV4,
    autoMergeMethod = 'merge',
  } = options;

  const pullRequestId = await fetchPullRequestId(
    options,
    targetPullRequestNumber,
  );

  const query = gql`
    mutation EnablePullRequestAutoMerge(
      $pullRequestId: ID!
      $mergeMethod: PullRequestMergeMethod!
    ) {
      enablePullRequestAutoMerge(
        input: { pullRequestId: $pullRequestId, mergeMethod: $mergeMethod }
      ) {
        pullRequest {
          number
        }
      }
    }
  `;

  const res = await apiRequestV4<Response>({
    githubApiBaseUrlV4,
    accessToken,
    query,
    variables: {
      pullRequestId,
      mergeMethod: autoMergeMethod.toUpperCase(),
    },
  });

  return res.data.data.enablePullRequestAutoMerge.pullRequest?.number;
}

export function parseGithubError(e: GithubV4Exception<any>) {
  const isMissingStatusChecks = e.githubResponse.data.errors?.some(
    (e) =>
      e.type === 'UNPROCESSABLE' &&
      (e.message.includes(
        'Branch does not have required protected branch rules',
      ) ||
        e.message.includes('Pull request is in clean status')),
  );

  return { isMissingStatusChecks };
}
