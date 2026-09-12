import {
  toLowercaseRelativePath,
  assertUniqueLowercasePagePaths,
  lowercaseRelativeHref,
} from '../src/core/lowercase-page-path';

describe('toLowercaseRelativePath', () => {
  it('lowercases each path segment including the filename', () => {
    expect(toLowercaseRelativePath('changeStreams.mdx')).toBe('changestreams.mdx');
    expect(toLowercaseRelativePath('reference/method/WriteResult.mdx')).toBe(
      'reference/method/writeresult.mdx',
    );
  });

  it('is a no-op for an already-lowercase path', () => {
    expect(toLowercaseRelativePath('reference/method.mdx')).toBe('reference/method.mdx');
  });

  it('preserves empty, dot, and parent segments', () => {
    expect(toLowercaseRelativePath('./Foo/Bar.mdx')).toBe('./foo/bar.mdx');
    expect(toLowercaseRelativePath('../Foo.mdx')).toBe('../foo.mdx');
  });
});

describe('assertUniqueLowercasePagePaths', () => {
  it('does not throw when paths are unique after lowercasing', () => {
    expect(() =>
      assertUniqueLowercasePagePaths(['changeStreams.mdx', 'reference/method.mdx']),
    ).not.toThrow();
  });

  it('does not throw when the same path appears twice', () => {
    expect(() =>
      assertUniqueLowercasePagePaths(['changeStreams.mdx', 'changeStreams.mdx']),
    ).not.toThrow();
  });

  it('throws when two distinct paths collide only by case', () => {
    expect(() => assertUniqueLowercasePagePaths(['Foo.mdx', 'foo.mdx'])).toThrow(
      /Case-only page path collision: "Foo.mdx" and "foo.mdx" both emit "foo.mdx"/,
    );
  });
});

describe('lowercaseRelativeHref', () => {
  it('lowercases a relative page path and keeps the hash', () => {
    expect(lowercaseRelativeHref('changeStreams#resume-a-change-stream')).toBe(
      'changestreams#resume-a-change-stream',
    );
    expect(lowercaseRelativeHref('/changeStreams')).toBe('/changestreams');
  });

  it('keeps query strings and does not rewrite scheme URLs', () => {
    expect(lowercaseRelativeHref('Tutorial/?tabs=nodejs')).toBe('tutorial/?tabs=nodejs');
    expect(lowercaseRelativeHref('https://www.mongodb.com/docs/manual/changeStreams/')).toBe(
      'https://www.mongodb.com/docs/manual/changeStreams/',
    );
    expect(lowercaseRelativeHref('mailto:docs@example.com')).toBe('mailto:docs@example.com');
  });
});
