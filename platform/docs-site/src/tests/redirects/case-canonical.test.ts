import {
  hasUppercase,
  isPageLikePath,
  toLowercasePublicPath,
  lowercaseRedirectPath,
  lowercaseDocsHref,
  toLowercaseCanonicalUrl,
} from '@/redirects/case-canonical';

describe('toLowercasePublicPath', () => {
  it('lowercases an HTML page and adds a trailing slash', () => {
    expect(toLowercasePublicPath('/docs/manual/changeStreams')).toBe(
      '/docs/manual/changestreams/',
    );
  });

  it('lowercases a .md export and keeps the suffix', () => {
    expect(toLowercasePublicPath('/docs/manual/changeStreams.md')).toBe(
      '/docs/manual/changestreams.md',
    );
  });

  it('is a no-op for an already-lowercase HTML path with a trailing slash', () => {
    expect(toLowercasePublicPath('/docs/manual/changestreams/')).toBe(
      '/docs/manual/changestreams/',
    );
  });

  it('lowercases a dotted slug and keeps a trailing slash', () => {
    expect(
      toLowercasePublicPath('/docs/manual/reference/method/db.collection.findOneAndUpdate/'),
    ).toBe('/docs/manual/reference/method/db.collection.findoneandupdate/');
    expect(
      toLowercasePublicPath('/docs/manual/reference/method/db.collection.findOneAndUpdate'),
    ).toBe('/docs/manual/reference/method/db.collection.findoneandupdate/');
  });
});

describe('isPageLikePath', () => {
  it('treats extensionless docs paths and .md exports as pages', () => {
    expect(isPageLikePath('/docs/manual/changeStreams/')).toBe(true);
    expect(isPageLikePath('/docs/manual/changeStreams.md')).toBe(true);
  });

  it('treats slugs with dots as pages', () => {
    expect(
      isPageLikePath('/docs/manual/reference/method/db.collection.findOneAndUpdate/'),
    ).toBe(true);
    expect(
      isPageLikePath('/docs/manual/reference/method/db.collection.findOneAndUpdate'),
    ).toBe(true);
  });

  it('skips static assets', () => {
    expect(isPageLikePath('/docs/manual/images/foo.png')).toBe(false);
    expect(isPageLikePath('/docs/manual/sitemap-0.xml')).toBe(false);
  });
});

describe('lowercaseRedirectPath', () => {
  it('returns the lowercase path for a mixed-case page', () => {
    expect(lowercaseRedirectPath('/docs/manual/changeStreams/')).toBe(
      '/docs/manual/changestreams/',
    );
  });

  it('returns the lowercase dotted slug with a trailing slash', () => {
    expect(
      lowercaseRedirectPath('/docs/manual/reference/method/db.collection.findOneAndUpdate/'),
    ).toBe('/docs/manual/reference/method/db.collection.findoneandupdate/');
    expect(
      lowercaseRedirectPath('/docs/manual/reference/method/db.collection.findOneAndUpdate'),
    ).toBe('/docs/manual/reference/method/db.collection.findoneandupdate/');
  });

  it('adds a trailing slash to an already-lowercase dotted slug', () => {
    expect(
      lowercaseRedirectPath('/docs/manual/reference/method/db.collection.findoneandupdate'),
    ).toBe('/docs/manual/reference/method/db.collection.findoneandupdate/');
  });

  it('returns null when the path is already the public form', () => {
    expect(lowercaseRedirectPath('/docs/manual/changestreams/')).toBeNull();
    expect(
      lowercaseRedirectPath('/docs/manual/reference/method/db.collection.findoneandupdate/'),
    ).toBeNull();
  });

  it('returns null for static assets', () => {
    expect(lowercaseRedirectPath('/docs/manual/images/Foo.png')).toBeNull();
  });
});

describe('hasUppercase', () => {
  // The edge function only consults the soft redirect table ahead of origin for
  // mixed-case paths; a slashless lowercase path must normalize its slash first.
  it('separates mixed-case paths from merely slashless ones', () => {
    expect(hasUppercase('/docs/manual/changeStreams')).toBe(true);
    expect(hasUppercase('/docs/manual/release-notes')).toBe(false);
    expect(hasUppercase('/docs/manual/release-notes/')).toBe(false);
  });
});

describe('toLowercaseCanonicalUrl', () => {
  it('lowercases the pathname and keeps a trailing slash on HTML pages', () => {
    expect(toLowercaseCanonicalUrl('https://www.mongodb.com/docs/manual/changeStreams')).toBe(
      'https://www.mongodb.com/docs/manual/changestreams/',
    );
  });

  it('keeps a trailing slash on dotted slug canonicals', () => {
    expect(
      toLowercaseCanonicalUrl(
        'https://www.mongodb.com/docs/manual/reference/method/db.collection.findOneAndUpdate',
      ),
    ).toBe(
      'https://www.mongodb.com/docs/manual/reference/method/db.collection.findoneandupdate/',
    );
  });
});

describe('lowercaseDocsHref', () => {
  it('lowercases an internal ToC path and keeps :version, query, and hash', () => {
    expect(lowercaseDocsHref('/docs/:version/changeStreams')).toBe(
      '/docs/:version/changestreams',
    );
    expect(lowercaseDocsHref('/docs/manual/changeStreams#Resume')).toBe(
      '/docs/manual/changestreams#Resume',
    );
  });

  it('lowercases mongodb.com docs URLs and leaves other hosts alone', () => {
    expect(
      lowercaseDocsHref('https://www.mongodb.com/docs/manual/changeStreams/'),
    ).toBe('https://www.mongodb.com/docs/manual/changestreams/');
    expect(
      lowercaseDocsHref('https://github.com/mongodb/mongo/blob/master/README.md'),
    ).toBe('https://github.com/mongodb/mongo/blob/master/README.md');
  });
});
