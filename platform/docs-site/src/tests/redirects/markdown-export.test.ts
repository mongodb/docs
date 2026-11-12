import {
  markdownExportRewritePath,
  markdownForceRedirects,
  markdownRedirectDestination,
  publicDocsPath,
} from '@/redirects/markdown-export';

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

describe('markdownRedirectDestination', () => {
  it.each([
    ['/docs/atlas/atlas-search.md', '/docs/search/', '/docs/search.md'],
    ['/docs/atlas/atlas-search.md/', '/docs/search/', '/docs/search.md'],
    ['/docs/atlas/index.md', '/docs/atlas/', '/docs/atlas.md'],
    ['/docs/foo.md', '/docs/', '/docs.md'],
    ['/docs/foo.md', 'https://www.mongodb.com/docs/', 'https://www.mongodb.com/docs.md'],
    ['/docs/foo.md', '/docs/atlas/cli/', '/docs/atlas/cli.md'],
    ['/docs/foo.md', '/docs/drivers/node/current/', '/docs/drivers/node/current.md'],
    ['/docs/foo.md', '/docs/atlas/architecture/current/foo/bar', '/docs/atlas/architecture/current/foo/bar.md'],
    ['/docs/foo.md', '/docs/atlas/architecture/current', '/docs/atlas/architecture/current.md'],
    [
      '/docs/foo.md',
      '/docs/manual/reference/method/db.collection.find/',
      '/docs/manual/reference/method/db.collection.find.md',
    ],
    ['/docs/foo.md', '/docs/drivers/go/v1.x/', '/docs/drivers/go/v1.x.md'],
    ['/docs/foo.md', '/docs/search/?tabs=a', '/docs/search.md?tabs=a'],
    ['/docs/foo.md', '/docs/search/#section', '/docs/search.md#section'],
    [
      '/docs/foo.md',
      'https://www.mongodb.com/docs/unavailable-version/',
      'https://www.mongodb.com/docs/unavailable-version.md',
    ],
    ['/docs/foo.md', 'https://mongodb.com/docs/realm/migrate/', 'https://mongodb.com/docs/realm/migrate.md'],
    [
      '/docs/foo.md',
      '/docs/api/doc/atlas-app-services-admin-api-v3/',
      '/docs/api/doc/atlas-app-services-admin-api-v3.md',
    ],
    [
      '/docs/foo.md',
      '/docs/api/doc/atlas-admin-api-v2/operation/operation-creategroupdatabaseuser',
      '/docs/api/doc/atlas-admin-api-v2/operation/operation-creategroupdatabaseuser.md',
    ],
  ])('maps .md request %s with destination %s to %s', (requestPath, destination, expected) => {
    expect(markdownRedirectDestination(requestPath, destination)).toBe(expected);
  });

  it.each([
    ['/docs/atlas/getting-started/', '/docs/get-started/'],
    ['/docs/atlas/api/markdown/getting-started/', '/docs/get-started/'],
    ['/docs/foo.md.bar/', '/docs/get-started/'],
    ['/docs/foo.md', 'https://github.com/mongodb/mongo/wiki/Server-Code-Style/'],
    ['/docs/foo.md', 'https://www.mongodb.com/legal/terms/'],
    ['/docs/foo.md', 'https://www.mongodb.com/docs'],
    ['/docs/foo.md', 'https://mongodb.community/docs/foo/'],
  ])('leaves request %s with destination %s unchanged', (requestPath, destination) => {
    expect(markdownRedirectDestination(requestPath, destination)).toBe(destination);
  });
});

describe('markdownForceRedirects', () => {
  it.each([
    ['/docs/atlas/cli/', '/docs/atlas/cli/current/', '/docs/atlas/cli.md{/}?', '/docs/atlas/cli/current.md'],
    ['/docs/agentic-platform/', '/docs/agentengine/', '/docs/agentic-platform.md{/}?', '/docs/agentengine.md'],
    ['/docs/cloud/', '/docs/', '/docs/cloud.md{/}?', '/docs.md'],
    [
      '/docs/drivers/go/:version/compatibility/',
      '/docs/drivers/compatibility/?driver-language=go',
      '/docs/drivers/go/:version/compatibility.md{/}?',
      '/docs/drivers/compatibility.md?driver-language=go',
    ],
    [
      '/docs/bi-connector/:version/meta/404/',
      '/docs/bi-connector/:version/',
      '/docs/bi-connector/:version/meta/404.md{/}?',
      '/docs/bi-connector/:version.md',
    ],
    [
      '/docs/kubernetes-operator/:path*',
      '/docs/kubernetes/current/',
      '/docs/kubernetes-operator/:path*.md{/}?',
      '/docs/kubernetes/current.md',
    ],
    [
      '/docs/agentic-platform/:path*',
      '/docs/agentengine/:path*',
      '/docs/agentic-platform/:path*.md{/}?',
      '/docs/agentengine/:path*.md',
    ],
  ])('maps %s -> %s to %s -> %s', (source, destination, mdSource, mdDestination) => {
    expect(markdownForceRedirects([{ source, destination, statusCode: 301, basePath: false }])).toEqual([
      { source: mdSource, destination: mdDestination, statusCode: 301, basePath: false },
    ]);
  });
});
