import { markdownExportRewritePath } from '@/redirects/markdown-export';

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
