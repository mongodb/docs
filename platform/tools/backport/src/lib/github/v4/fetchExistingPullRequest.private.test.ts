import { ValidConfigOptions } from '../../../options/options';
import { getDevAccessToken } from '../../../test/private/getDevAccessToken';
import { fetchExistingPullRequest } from './fetchExistingPullRequest';

const accessToken = getDevAccessToken();

describe('fetchExistingPullRequest', () => {
  describe('when PR does not exist', () => {
    it('returns undefined', async () => {
      const options = {
        accessToken,
      } as ValidConfigOptions;

      const prPayload = {
        owner: 'backport-org',
        repo: 'backport-e2e',
        title: 'My PR title',
        body: 'My PR body',
        head: 'sorenlouv:backport/7.8/pr-foo',
        base: '7.8',
        draft: false,
      };

      const res = await fetchExistingPullRequest({ options, prPayload });

      expect(res).toBe(undefined);
    });
  });

  describe('when PR exists', () => {
    it('returns the PR number and url', async () => {
      const options = {
        accessToken,
      } as ValidConfigOptions;

      const prPayload = {
        owner: 'backport-org',
        repo: 'backport-e2e',
        title: 'My PR title',
        body: 'My PR body',
        head: 'sorenlouv:backport/7.8/pr-9',
        base: '7.8',
        draft: false,
      };
      const res = await fetchExistingPullRequest({ options, prPayload });

      expect(res).toEqual({
        url: 'https://github.com/backport-org/backport-e2e/pull/10',
        number: 10,
      });
    });
  });
});
