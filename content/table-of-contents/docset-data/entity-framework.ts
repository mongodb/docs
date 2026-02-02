import type { TocItem } from '../types';

const tocData: TocItem[] = [
  {
    label: 'EF Core Provider',
    contentSite: 'entity-framework',
    group: true,
    versionDropdown: true,
    items: [
      {
        label: 'Overview',
        contentSite: 'entity-framework',
        url: '/docs/entity-framework/:version',
      },
      {
        label: 'Quick Start',
        contentSite: 'entity-framework',
        url: '/docs/entity-framework/:version/quick-start',
      },
      {
        label: 'Quick Reference',
        contentSite: 'entity-framework',
        url: '/docs/entity-framework/:version/quick-reference',
      },
      {
        label: 'Fundamentals',
        contentSite: 'entity-framework',
        url: '/docs/entity-framework/:version/fundamentals',
        collapsible: true,
        items: [
          {
            label: 'Configuration',
            contentSite: 'entity-framework',
            url: '/docs/entity-framework/:version/fundamentals/configure',
          },
          {
            label: 'Query Data',
            contentSite: 'entity-framework',
            url: '/docs/entity-framework/:version/fundamentals/query-data',
          },
          {
            label: 'Write Data',
            contentSite: 'entity-framework',
            url: '/docs/entity-framework/:version/fundamentals/write-data',
          },
          {
            label: 'Optimistic Concurrency',
            contentSite: 'entity-framework',
            url: '/docs/entity-framework/:version/fundamentals/optimistic-concurrency',
          },
          {
            label: 'Indexes',
            contentSite: 'entity-framework',
            url: '/docs/entity-framework/:version/fundamentals/indexes',
          },
        ],
      },
      {
        label: 'Limitations',
        contentSite: 'entity-framework',
        url: '/docs/entity-framework/:version/limitations',
      },
      {
        label: 'Issues & Help',
        contentSite: 'entity-framework',
        url: '/docs/entity-framework/:version/issues-and-help',
      },
      {
        label: 'FAQ',
        contentSite: 'entity-framework',
        url: '/docs/entity-framework/:version/faq',
      },
      {
        label: "What's New",
        contentSite: 'entity-framework',
        url: '/docs/entity-framework/:version/whats-new',
        versions: { excludes: ['v8.0'] },
      },
      {
        label: 'Upgrade',
        contentSite: 'entity-framework',
        url: '/docs/entity-framework/:version/upgrade',
        versions: { excludes: ['v8.0'] },
      },
      {
        label: 'Compatibility',
        contentSite: 'drivers',
        url: '/docs/drivers/compatibility/?driver-language=csharp&csharp-driver-framework=entity-framework',
      },
      {
        label: 'API Documentation',
        isExternal: true,
        url: 'https://mongodb.github.io/mongo-efcore-provider/9.0.4/api',
      },
    ],
  },
];

export default tocData;
