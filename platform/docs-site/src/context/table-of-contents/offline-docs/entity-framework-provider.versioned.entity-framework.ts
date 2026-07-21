import type { L1TocItem } from '../types';

export const toc: L1TocItem[] = [
  {
    label: 'Entity Framework Provider',
    contentSite: 'entity-framework',
    url: '/docs/entity-framework/:version/',
    items: [
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
            label: 'Get Started',
            contentSite: 'entity-framework',
            url: '/docs/entity-framework/:version/get-started',
          },
          {
            label: 'Connect',
            contentSite: 'entity-framework',
            collapsible: true,
            items: [
              {
                label: 'Configuration',
                contentSite: 'entity-framework',
                url: '/docs/entity-framework/:version/connect/configure',
              },
              {
                label: 'Connection Troubleshooting',
                isExternal: true,
                url: 'https://www.mongodb.com/docs/drivers/csharp/current/connect/connection-troubleshooting/',
              },
            ],
          },
          {
            label: 'Model Data',
            contentSite: 'entity-framework',
            collapsible: true,
            items: [
              {
                label: 'Entity Relationships',
                contentSite: 'entity-framework',
                url: '/docs/entity-framework/:version/model-data/relationships',
              },
              {
                label: 'Indexes',
                contentSite: 'entity-framework',
                url: '/docs/entity-framework/:version/model-data/indexes',
              },
              {
                label: 'Optimistic Concurrency',
                contentSite: 'entity-framework',
                url: '/docs/entity-framework/:version/model-data/optimistic-concurrency',
              },
            ],
          },
          {
            label: 'Interact with Data',
            contentSite: 'entity-framework',
            collapsible: true,
            items: [
              {
                label: 'MongoDB Vector Search',
                contentSite: 'entity-framework',
                url: '/docs/entity-framework/:version/interact-data/atlas-vector-search',
                versions: {
                  excludes: ['v8.0', 'v8.1', 'v8.2', 'v8.3', 'v8.4'],
                },
              },
              {
                label: 'Quick Reference',
                contentSite: 'entity-framework',
                url: '/docs/entity-framework/:version/interact-data/quick-reference',
              },
              {
                label: 'Query Data',
                contentSite: 'entity-framework',
                url: '/docs/entity-framework/:version/interact-data/query-data',
              },
              {
                label: 'Transactions',
                contentSite: 'entity-framework',
                url: '/docs/entity-framework/:version/interact-data/transactions',
                versions: {
                  excludes: ['v8.0', 'v8.1', 'v8.2'],
                },
              },
              {
                label: 'Write Data',
                contentSite: 'entity-framework',
                url: '/docs/entity-framework/:version/interact-data/write-data',
              },
              {
                label: 'Queryable Encryption',
                contentSite: 'entity-framework',
                url: '/docs/entity-framework/:version/interact-data/queryable-encryption',
                versions: {
                  excludes: ['v8.0', 'v8.1', 'v8.2'],
                },
              },
            ],
          },
          {
            label: 'Reference',
            contentSite: 'entity-framework',
            collapsible: true,
            items: [
              {
                label: 'FAQ',
                contentSite: 'entity-framework',
                url: '/docs/entity-framework/:version/reference/faq',
              },
              {
                label: 'Release Notes',
                contentSite: 'entity-framework',
                url: '/docs/entity-framework/:version/reference/release-notes',
                versions: {
                  excludes: ['v8.0'],
                },
              },
              {
                label: 'Upgrade',
                contentSite: 'entity-framework',
                url: '/docs/entity-framework/:version/reference/upgrade',
                versions: {
                  excludes: ['v8.0'],
                },
              },
            ],
          },
          {
            label: 'Feature Limitations',
            contentSite: 'entity-framework',
            url: '/docs/entity-framework/:version/limitations',
          },
          {
            label: 'Version Compatibility',
            contentSite: 'drivers',
            url: '/docs/drivers/compatibility/?driver-language=csharp&csharp-driver-framework=entity-framework',
          },
          {
            label: 'API Documentation',
            isExternal: true,
            url: 'https://mongodb.github.io/mongo-efcore-provider/8.0.3/api',
            versions: {
              includes: ['v8.0'],
            },
          },
          {
            label: 'API Documentation',
            isExternal: true,
            url: 'https://mongodb.github.io/mongo-efcore-provider/8.1.1/api',
            versions: {
              includes: ['v8.1'],
            },
          },
          {
            label: 'API Documentation',
            isExternal: true,
            url: 'https://mongodb.github.io/mongo-efcore-provider/8.2.3/api',
            versions: {
              includes: ['v8.2'],
            },
          },
          {
            label: 'API Documentation',
            isExternal: true,
            url: 'https://mongodb.github.io/mongo-efcore-provider/8.3.4/api',
            versions: {
              includes: ['v8.3'],
            },
          },
          {
            label: 'API Documentation',
            isExternal: true,
            url: 'https://mongodb.github.io/mongo-efcore-provider/8.4.0/api',
            versions: {
              includes: ['v8.4'],
            },
          },
          {
            label: 'API Documentation',
            isExternal: true,
            url: 'https://mongodb.github.io/mongo-efcore-provider/9.0.4/api',
            versions: {
              includes: ['v9.0'],
            },
          },
          {
            label: 'API Documentation',
            isExternal: true,
            url: 'https://mongodb.github.io/mongo-efcore-provider/9.1.1/api',
            versions: {
              includes: ['v9.1'],
            },
          },
          {
            label: 'API Documentation',
            isExternal: true,
            url: 'https://mongodb.github.io/mongo-efcore-provider/10.0.0/api',
            versions: {
              includes: ['current', 'upcoming'],
            },
          },
          {
            label: 'Issues & Help',
            contentSite: 'entity-framework',
            url: '/docs/entity-framework/:version/issues-and-help',
          },
        ],
      },
    ],
  },
];
