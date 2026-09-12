import { lowercaseTocHref, lowercaseUrlReplacer } from '../src/utils/create-json-file';

describe('lowercaseTocHref', () => {
  it('lowercases internal docs paths and keeps :version', () => {
    expect(lowercaseTocHref('/docs/:version/changeStreams')).toBe(
      '/docs/:version/changestreams',
    );
  });

  it('lowercases mongodb.com docs URLs and leaves other hosts alone', () => {
    expect(
      lowercaseTocHref('https://www.mongodb.com/docs/manual/changeStreams/'),
    ).toBe('https://www.mongodb.com/docs/manual/changestreams/');
    expect(
      lowercaseTocHref(
        'https://github.com/mongodb/sample-app-java-mflix/blob/main/README.md',
      ),
    ).toBe(
      'https://github.com/mongodb/sample-app-java-mflix/blob/main/README.md',
    );
  });
});

describe('lowercaseUrlReplacer', () => {
  it('lowercases url fields at every depth without touching other fields', () => {
    const items = [
      {
        label: 'Change Streams',
        url: '/docs/:version/changeStreams',
        items: [
          {
            label: 'findOneAndUpdate',
            url: '/docs/:version/reference/method/db.collection.findOneAndUpdate',
          },
        ],
      },
    ];
    const result = JSON.parse(JSON.stringify(items, lowercaseUrlReplacer));
    expect(result[0].url).toBe('/docs/:version/changestreams');
    expect(result[0].items[0].url).toBe(
      '/docs/:version/reference/method/db.collection.findoneandupdate',
    );
    expect(result[0].label).toBe('Change Streams');
    expect(items[0].url).toBe('/docs/:version/changeStreams');
  });
});
