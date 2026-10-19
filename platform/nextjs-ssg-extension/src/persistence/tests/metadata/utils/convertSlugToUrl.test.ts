import { convertSlugToUrl } from '../../../src/services/metadata/ToC/utils/convertSlugToUrl';

describe('convertSlugToUrl', () => {
  it("accepts a project's prefix, slug, alias and base url, and returns an absolute url for href usage", () => {
    expect(
      convertSlugToUrl(
        'get-started',
        'docs/atlas/cli',
        'www.mongodb.com',
        'current',
      ),
    ).toEqual('www.mongodb.com/docs/atlas/cli/current/get-started');
  });

  it('still returns a valid absolute url for href usage when alias is falsey', () => {
    expect(
      convertSlugToUrl('get-started', 'docs/charts', 'www.mongodb.com', ''),
    ).toEqual('www.mongodb.com/docs/charts/get-started');
  });
});
