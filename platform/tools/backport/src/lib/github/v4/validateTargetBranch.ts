import gql from 'graphql-tag';
import { BackportError } from '../../BackportError';
import { ora } from '../../ora';
import { apiRequestV4 } from './apiRequestV4';

export interface TargetBranchResponse {
  repository: { ref: { id: string } | null };
}

export async function validateTargetBranch({
  accessToken,
  repoName,
  repoOwner,
  branchName,
  githubApiBaseUrlV4 = 'https://api.github.com/graphql',
  interactive,
}: {
  accessToken: string;
  repoOwner: string;
  repoName: string;
  branchName: string;
  githubApiBaseUrlV4?: string;
  interactive: boolean;
}) {
  const query = gql`
    query GetBranchId(
      $repoOwner: String!
      $repoName: String!
      $branchName: String!
    ) {
      repository(owner: $repoOwner, name: $repoName) {
        ref(qualifiedName: $branchName) {
          id
        }
      }
    }
  `;

  const spinner = ora(interactive, '').start();

  const res = await apiRequestV4<TargetBranchResponse>({
    githubApiBaseUrlV4,
    accessToken,
    query,
    variables: { repoOwner, repoName, branchName },
  });

  if (!res.data.data.repository.ref) {
    spinner.fail(`The branch "${branchName}" does not exist`);
    throw new BackportError({
      code: 'invalid-branch-exception',
      branchName: branchName,
    });
  }

  spinner.stop();

  return;
}
