import { ValidConfigOptions } from '../../../options/options';
import { getDevAccessToken } from '../../../test/private/getDevAccessToken';
import { fetchAuthorId } from './fetchAuthorId';

const accessToken = getDevAccessToken();

describe('fetchAuthorId', () => {
  describe('author = null', () => {
    it('returns null', async () => {
      const options = {
        accessToken,
        author: null,
      } as ValidConfigOptions;

      expect(await fetchAuthorId(options)).toEqual(null);
    });
  });

  describe('author is "sorenlouv"', () => {
    it('returns author id', async () => {
      const options = {
        accessToken,
        author: 'sorenlouv',
      } as ValidConfigOptions;

      expect(await fetchAuthorId(options)).toEqual('MDQ6VXNlcjIwOTk2Ng==');
    });
  });
});
