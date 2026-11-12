import { buildPageLocation } from '@/mdx-utils/page-location';

jest.mock('@/context/toc-data/data.copied', () => ({
  tocData: [
    { label: 'Docs Home', url: '/docs' },
    { label: 'Get Started', url: '/docs/get-started' },
    {
      label: 'Development',
      url: '/docs/development',
      items: [
        {
          label: 'Sharding',
          url: '/docs/:version/sharding',
          items: [
            {
              label: 'Sharded Cluster Components',
              url: '/docs/:version/core/sharded-cluster-components',
              items: [{ label: 'Shards', url: '/docs/:version/core/sharded-cluster-shards' }],
            },
          ],
        },
        {
          label: 'Server Tools',
          group: true,
          items: [
            { label: 'Legacy', url: '/docs/:version/legacy', versions: { excludes: ['v8.0'] } },
            { label: 'Shards again', url: '/docs/:version/core/sharded-cluster-shards' },
          ],
        },
      ],
    },
    {
      label: 'IntelliJ Plugin',
      url: '/docs/mongodb-intellij/',
      items: [
        {
          label: 'MongoDB for IntelliJ Plugin',
          group: true,
          items: [{ label: 'Overview', url: '/docs/mongodb-intellij/' }],
        },
        { label: 'Connect', url: '/docs/mongodb-intellij/connect/' },
      ],
    },
    {
      label: 'AI Model APIs',
      url: '/docs/voyageai/',
      items: [
        { label: 'Introduction', url: '/docs/voyageai/' },
        { label: 'Quick Start', url: '/docs/voyageai/quickstart' },
      ],
    },
    {
      label: 'Parent',
      url: '/docs/same',
      items: [{ label: 'Overview', url: '/docs/same', items: [{ label: 'Child', url: '/docs/same/child' }] }],
    },
  ],
}));

describe('buildPageLocation', () => {
  // The page is also listed under the group below, which has no url of its own
  // to show, so only the first listing yields the full chain.
  it('lists the .md path of each page above the page, from the docs home down to its parent', () => {
    expect(buildPageLocation('/docs/manual/core/sharded-cluster-shards', 'manual')).toBe(
      '> This page location: /docs.md > /docs/development.md > /docs/manual/sharding.md > /docs/manual/core/sharded-cluster-components.md',
    );
  });

  it('does not list the page itself', () => {
    expect(buildPageLocation('/docs/manual/core/sharded-cluster-shards', 'manual')).not.toContain(
      'sharded-cluster-shards.md',
    );
  });

  it('gives a top-level page the docs home alone', () => {
    expect(buildPageLocation('/docs/development', 'current')).toBe('> This page location: /docs.md');
  });

  it('substitutes the page version for the :version placeholder', () => {
    expect(buildPageLocation('/docs/v8.0/core/sharded-cluster-components', 'v8.0')).toBe(
      '> This page location: /docs.md > /docs/development.md > /docs/v8.0/sharding.md',
    );
    expect(buildPageLocation('/docs/v8.0/sharding', 'manual')).toBeNull();
  });

  it('leaves out pages the TOC gates away from the version', () => {
    expect(buildPageLocation('/docs/v8.0/legacy', 'v8.0')).toBeNull();
    expect(buildPageLocation('/docs/v7.0/legacy', 'v7.0')).toBe('> This page location: /docs.md > /docs/development.md');
  });

  it('matches regardless of trailing slash and case', () => {
    expect(buildPageLocation('/docs/Mongodb-IntelliJ/Connect/', 'current')).toBe(
      '> This page location: /docs.md > /docs/mongodb-intellij.md',
    );
  });

  it('lists a docset root once when its TOC entry repeats the parent url', () => {
    expect(buildPageLocation('/docs/mongodb-intellij', 'current')).toBe('> This page location: /docs.md');
    expect(buildPageLocation('/docs/same/child', 'current')).toBe('> This page location: /docs.md > /docs/same.md');
  });

  it('puts the Voyage AI docset root right after the docs home', () => {
    expect(buildPageLocation('/docs/voyageai/quickstart', 'current')).toBe(
      '> This page location: /docs.md > /docs/voyageai.md',
    );
  });

  it('returns null for a page that is not in the TOC', () => {
    expect(buildPageLocation('/docs/not-in-the-toc', 'current')).toBeNull();
  });

  it('returns null for the docs home, which has no location above it', () => {
    expect(buildPageLocation('/docs', 'current')).toBeNull();
  });
});
