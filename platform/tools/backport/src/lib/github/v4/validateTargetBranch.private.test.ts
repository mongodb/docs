import { ValidConfigOptions } from '../../../options/options';
import { getDevAccessToken } from '../../../test/private/getDevAccessToken';
import { validateTargetBranch } from './validateTargetBranch';

const accessToken = getDevAccessToken();

describe('validateTargetBranch', () => {
  it('throws when branch is invalid', async () => {
    const options = {
      repoOwner: 'backport-org',
      repoName: 'repo-with-target-branches',
      accessToken,
    } as ValidConfigOptions;

    await expect(() =>
      validateTargetBranch({ ...options, branchName: 'foo' }),
    ).rejects.toThrow('The branch "foo" does not exist');
  });

  it('resolves when branch is valid', async () => {
    const options = {
      repoOwner: 'backport-org',
      repoName: 'repo-with-target-branches',
      accessToken,
    } as ValidConfigOptions;

    expect(
      await validateTargetBranch({ ...options, branchName: 'production' }),
    ).toEqual(undefined);
  });
});
