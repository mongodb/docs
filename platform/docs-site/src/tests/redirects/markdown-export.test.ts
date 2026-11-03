import { markdownExportRewritePath, publicDocsPath } from '@/redirects/markdown-export';

describe('markdownExportRewritePath', () => {
  it.each([
    ['/docs/voyageai/models.md', '/docs/voyageai/models/'],
    [
      '/docs/kafka-connector/current/sink-connector/fundamentals/post-processors.md',
      '/docs/kafka-connector/current/sink-connector/fundamentals/post-processors/',
    ],
    ['/docs/voyageai/api/markdown/models.md/', '/docs/voyageai/api/markdown/models/'],
    [
      '/docs/kafka-connector/api/markdown/current/sink-connector/fundamentals/post-processors.md/',
      '/docs/kafka-connector/api/markdown/current/sink-connector/fundamentals/post-processors/',
    ],
    ['/docs/voyageai/index.md', '/docs/voyageai/'],
    ['/docs/voyageai/api/markdown/index.md/', '/docs/voyageai/api/markdown/'],
  ])('rewrites markdown-preferred URL %s', (pathname, expected) => {
    expect(markdownExportRewritePath(pathname, true)).toBe(expected);
  });

  it.each([
    ['/docs/voyageai/models.md', false],
    ['/docs/voyageai/models/', true],
  ])('leaves %s unchanged when wantsMarkdown is %s', (pathname, wantsMarkdown) => {
    expect(markdownExportRewritePath(pathname, wantsMarkdown)).toBeNull();
  });
});

describe('publicDocsPath', () => {
  it.each([
    ['/docs/atlas/api/markdown/getting-started/', '/docs/atlas/getting-started/'],
    ['/docs/atlas/api/markdown-tabs/getting-started/', '/docs/atlas/getting-started/'],
    ['/docs/atlas/api/markdown/', '/docs/atlas/'],
    ['/docs/kafka-connector/api/markdown/current/sink-connector/', '/docs/kafka-connector/current/sink-connector/'],
    ['/docs/atlas/getting-started.md', '/docs/atlas/getting-started/'],
    ['/docs/atlas/getting-started.md/', '/docs/atlas/getting-started/'],
    ['/docs/voyageai/api/markdown/models.md/', '/docs/voyageai/models/'],
    ['/docs/voyageai/index.md', '/docs/voyageai/'],
    ['/docs/voyageai/api/markdown/index.md/', '/docs/voyageai/'],
  ])('maps %s to %s', (pathname, expected) => {
    expect(publicDocsPath(pathname)).toBe(expected);
  });

  it.each(['/docs/atlas/getting-started/', '/docs/atlas/getting-started', '/docs/atlas/'])(
    'leaves public page path %s unchanged',
    (pathname) => {
      expect(publicDocsPath(pathname)).toBe(pathname);
    },
  );
});
