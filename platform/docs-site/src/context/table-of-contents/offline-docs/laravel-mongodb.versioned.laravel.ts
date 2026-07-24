import type { L1TocItem } from '../types';

export const toc: L1TocItem[] = [
  {
    label: 'Laravel MongoDB',
    contentSite: 'laravel',
    url: '/docs/drivers/php/laravel-mongodb/:version/',
    items: [
      {
        label: 'Laravel MongoDB',
        contentSite: 'laravel',
        group: true,
        versionDropdown: true,
        versions: {
          includes: ['current', 'upcoming'],
        },
        items: [
          {
            label: 'Overview',
            contentSite: 'laravel',
            url: '/docs/drivers/php/laravel-mongodb/:version/',
          },
          {
            label: 'Get Started',
            contentSite: 'laravel',
            url: '/docs/drivers/php/laravel-mongodb/:version/get-started',
          },
          {
            label: 'Connect',
            contentSite: 'laravel',
            collapsible: true,
            items: [
              {
                label: 'Connection Guide',
                contentSite: 'laravel',
                url: '/docs/drivers/php/laravel-mongodb/:version/connect/connect-to-mongodb',
              },
              {
                label: 'Connection Options',
                contentSite: 'laravel',
                url: '/docs/drivers/php/laravel-mongodb/:version/connect/connection-options',
              },
              {
                label: 'TLS Configuration',
                contentSite: 'laravel',
                url: '/docs/drivers/php/laravel-mongodb/:version/connect/tls',
              },
            ],
          },
          {
            label: 'Databases & Collections',
            contentSite: 'laravel',
            collapsible: true,
            url: '/docs/drivers/php/laravel-mongodb/:version/database-collection',
            items: [
              {
                label: 'Time Series',
                contentSite: 'laravel',
                url: '/docs/drivers/php/laravel-mongodb/:version/database-collection/time-series',
              },
            ],
          },
          {
            label: 'Model Data',
            contentSite: 'laravel',
            collapsible: true,
            items: [
              {
                label: 'Eloquent Model Class',
                contentSite: 'laravel',
                url: '/docs/drivers/php/laravel-mongodb/:version/model-data/model-class',
              },
              {
                label: 'Relationships',
                contentSite: 'laravel',
                url: '/docs/drivers/php/laravel-mongodb/:version/model-data/relationships',
              },
              {
                label: 'Schema Builder',
                contentSite: 'laravel',
                url: '/docs/drivers/php/laravel-mongodb/:version/model-data/schema-builder',
              },
            ],
          },
          {
            label: 'Interact with Data',
            contentSite: 'laravel',
            collapsible: true,
            items: [
              {
                label: 'Insert Documents',
                contentSite: 'laravel',
                url: '/docs/drivers/php/laravel-mongodb/:version/interact-data/insert',
              },
              {
                label: 'Query Documents',
                contentSite: 'laravel',
                collapsible: true,
                url: '/docs/drivers/php/laravel-mongodb/:version/interact-data/query',
                items: [
                  {
                    label: 'Retrieve MongoDB Data',
                    contentSite: 'laravel',
                    url: '/docs/drivers/php/laravel-mongodb/:version/interact-data/query/retrieve',
                  },
                  {
                    label: 'Search Text',
                    contentSite: 'laravel',
                    url: '/docs/drivers/php/laravel-mongodb/:version/interact-data/query/search-text',
                  },
                  {
                    label: 'Modify Query Results',
                    contentSite: 'laravel',
                    url: '/docs/drivers/php/laravel-mongodb/:version/interact-data/query/modify-results',
                  },
                  {
                    label: 'Read Preference',
                    contentSite: 'laravel',
                    url: '/docs/drivers/php/laravel-mongodb/:version/interact-data/query/read-pref',
                  },
                  {
                    label: 'Query Logging',
                    contentSite: 'laravel',
                    url: '/docs/drivers/php/laravel-mongodb/:version/interact-data/query/query-logging',
                  },
                ],
              },
              {
                label: 'Update Documents',
                contentSite: 'laravel',
                url: '/docs/drivers/php/laravel-mongodb/:version/interact-data/modify',
              },
              {
                label: 'Delete Documents',
                contentSite: 'laravel',
                url: '/docs/drivers/php/laravel-mongodb/:version/interact-data/delete',
              },
              {
                label: 'Aggregation',
                contentSite: 'laravel',
                url: '/docs/drivers/php/laravel-mongodb/:version/interact-data/aggregation-builder',
              },
              {
                label: 'MongoDB Search',
                contentSite: 'laravel',
                url: '/docs/drivers/php/laravel-mongodb/:version/interact-data/atlas-search',
              },
              {
                label: 'MongoDB Vector Search',
                contentSite: 'laravel',
                url: '/docs/drivers/php/laravel-mongodb/:version/interact-data/vector-search',
              },
              {
                label: 'Query Builder',
                contentSite: 'laravel',
                url: '/docs/drivers/php/laravel-mongodb/:version/interact-data/query-builder',
              },
              {
                label: 'Transactions',
                contentSite: 'laravel',
                url: '/docs/drivers/php/laravel-mongodb/:version/interact-data/transactions',
              },
              {
                label: 'Store Large Files',
                contentSite: 'laravel',
                url: '/docs/drivers/php/laravel-mongodb/:version/interact-data/filesystems',
              },
              {
                label: 'Tutorial: Build a Back End',
                contentSite: 'laravel',
                url: '/docs/drivers/php/laravel-mongodb/:version/interact-data/backend-service-tutorial',
              },
              {
                label: 'Tutorial: Build a Full-Stack Application',
                contentSite: 'laravel',
                url: '/docs/drivers/php/laravel-mongodb/:version/interact-data/application-tutorial',
              },
            ],
          },
          {
            label: 'Integrations',
            contentSite: 'laravel',
            collapsible: true,
            items: [
              {
                label: 'Cache & Locks',
                contentSite: 'laravel',
                url: '/docs/drivers/php/laravel-mongodb/:version/integrations/cache',
              },
              {
                label: 'Full-Text Search with Scout',
                contentSite: 'laravel',
                url: '/docs/drivers/php/laravel-mongodb/:version/integrations/scout',
              },
              {
                label: 'HTTP Sessions',
                contentSite: 'laravel',
                url: '/docs/drivers/php/laravel-mongodb/:version/integrations/sessions',
              },
              {
                label: 'Queues',
                contentSite: 'laravel',
                url: '/docs/drivers/php/laravel-mongodb/:version/integrations/queues',
              },
              {
                label: 'User Authentication',
                contentSite: 'laravel',
                url: '/docs/drivers/php/laravel-mongodb/:version/integrations/user-authentication',
              },
            ],
          },
          {
            label: 'Reference',
            contentSite: 'laravel',
            collapsible: true,
            items: [
              {
                label: 'Upgrade',
                contentSite: 'laravel',
                url: '/docs/drivers/php/laravel-mongodb/:version/upgrade',
              },
              {
                label: 'Release Notes',
                isExternal: true,
                url: 'https://github.com/mongodb/laravel-mongodb/releases/',
              },
            ],
          },
          {
            label: 'Feature Compatibility',
            contentSite: 'laravel',
            url: '/docs/drivers/php/laravel-mongodb/:version/feature-compatibility',
          },
          {
            label: 'Version Compatibility',
            isExternal: true,
            url: 'https://www.mongodb.com/docs/drivers/compatibility/?driver-language=php&php-driver-framework=laravel',
          },
          {
            label: 'Issues & Help',
            contentSite: 'laravel',
            url: '/docs/drivers/php/laravel-mongodb/:version/issues-and-help',
          },
        ],
      },
      {
        label: 'Laravel MongoDB',
        contentSite: 'laravel',
        group: true,
        versionDropdown: true,
        versions: {
          includes: ['v4.x'],
        },
        items: [
          {
            label: 'Overview',
            contentSite: 'laravel',
            url: '/docs/drivers/php/laravel-mongodb/:version/',
          },
          {
            label: 'Quick Start',
            contentSite: 'laravel',
            collapsible: true,
            url: '/docs/drivers/php/laravel-mongodb/:version/quick-start',
            items: [
              {
                label: 'Download & Install',
                contentSite: 'laravel',
                url: '/docs/drivers/php/laravel-mongodb/:version/quick-start/download-and-install',
              },
              {
                label: 'Create a Deployment',
                contentSite: 'laravel',
                url: '/docs/drivers/php/laravel-mongodb/:version/quick-start/create-a-deployment',
              },
              {
                label: 'Create a Connection String',
                contentSite: 'laravel',
                url: '/docs/drivers/php/laravel-mongodb/:version/quick-start/create-a-connection-string',
              },
              {
                label: 'Configure Your Connection',
                contentSite: 'laravel',
                url: '/docs/drivers/php/laravel-mongodb/:version/quick-start/configure-mongodb',
              },
              {
                label: 'View Data',
                contentSite: 'laravel',
                url: '/docs/drivers/php/laravel-mongodb/:version/quick-start/view-data',
              },
              {
                label: 'Write Data',
                contentSite: 'laravel',
                url: '/docs/drivers/php/laravel-mongodb/:version/quick-start/write-data',
              },
              {
                label: 'Next Steps',
                contentSite: 'laravel',
                url: '/docs/drivers/php/laravel-mongodb/:version/quick-start/next-steps',
              },
            ],
          },
          {
            label: 'Usage Examples',
            contentSite: 'laravel',
            collapsible: true,
            url: '/docs/drivers/php/laravel-mongodb/:version/usage-examples',
            items: [
              {
                label: 'Find a Document',
                contentSite: 'laravel',
                url: '/docs/drivers/php/laravel-mongodb/:version/usage-examples/findOne',
              },
              {
                label: 'Find Multiple Documents',
                contentSite: 'laravel',
                url: '/docs/drivers/php/laravel-mongodb/:version/usage-examples/find',
              },
              {
                label: 'Insert a Document',
                contentSite: 'laravel',
                url: '/docs/drivers/php/laravel-mongodb/:version/usage-examples/insertOne',
              },
              {
                label: 'Insert Multiple Documents',
                contentSite: 'laravel',
                url: '/docs/drivers/php/laravel-mongodb/:version/usage-examples/insertMany',
              },
              {
                label: 'Update a Document',
                contentSite: 'laravel',
                url: '/docs/drivers/php/laravel-mongodb/:version/usage-examples/updateOne',
              },
              {
                label: 'Update Multiple Documents',
                contentSite: 'laravel',
                url: '/docs/drivers/php/laravel-mongodb/:version/usage-examples/updateMany',
              },
              {
                label: 'Delete a Document',
                contentSite: 'laravel',
                url: '/docs/drivers/php/laravel-mongodb/:version/usage-examples/deleteOne',
              },
              {
                label: 'Delete Multiple Documents',
                contentSite: 'laravel',
                url: '/docs/drivers/php/laravel-mongodb/:version/usage-examples/deleteMany',
              },
              {
                label: 'Count Documents',
                contentSite: 'laravel',
                url: '/docs/drivers/php/laravel-mongodb/:version/usage-examples/count',
              },
              {
                label: 'Distinct Field Values',
                contentSite: 'laravel',
                url: '/docs/drivers/php/laravel-mongodb/:version/usage-examples/distinct',
              },
              {
                label: 'Run a Command',
                contentSite: 'laravel',
                url: '/docs/drivers/php/laravel-mongodb/:version/usage-examples/runCommand',
              },
              {
                label: 'Tutorial: Build a Full-Stack Application',
                contentSite: 'laravel',
                url: '/docs/drivers/php/laravel-mongodb/:version/usage-examples/application-tutorial',
              },
            ],
          },
          {
            label: 'Release Notes',
            isExternal: true,
            url: 'https://github.com/mongodb/laravel-mongodb/releases/',
          },
          {
            label: 'Fundamentals',
            contentSite: 'laravel',
            collapsible: true,
            items: [
              {
                label: 'Connections',
                contentSite: 'laravel',
                collapsible: true,
                items: [
                  {
                    label: 'Connection Guide',
                    contentSite: 'laravel',
                    url: '/docs/drivers/php/laravel-mongodb/:version/fundamentals/connection/connect-to-mongodb',
                  },
                  {
                    label: 'Connection Options',
                    contentSite: 'laravel',
                    url: '/docs/drivers/php/laravel-mongodb/:version/fundamentals/connection/connection-options',
                  },
                  {
                    label: 'Configure TLS',
                    contentSite: 'laravel',
                    url: '/docs/drivers/php/laravel-mongodb/:version/fundamentals/connection/tls',
                  },
                ],
              },
              {
                label: 'Read Operations',
                contentSite: 'laravel',
                collapsible: true,
                url: '/docs/drivers/php/laravel-mongodb/:version/fundamentals/read-operations',
                items: [
                  {
                    label: 'Retrieve Data',
                    contentSite: 'laravel',
                    url: '/docs/drivers/php/laravel-mongodb/:version/fundamentals/read-operations/retrieve',
                  },
                  {
                    label: 'Query Text',
                    contentSite: 'laravel',
                    url: '/docs/drivers/php/laravel-mongodb/:version/fundamentals/read-operations/search-text',
                  },
                  {
                    label: 'Modify Query Results',
                    contentSite: 'laravel',
                    url: '/docs/drivers/php/laravel-mongodb/:version/fundamentals/read-operations/modify-results',
                  },
                  {
                    label: 'Read Preference',
                    contentSite: 'laravel',
                    url: '/docs/drivers/php/laravel-mongodb/:version/fundamentals/read-operations/read-pref',
                  },
                ],
              },
              {
                label: 'Write Operations',
                contentSite: 'laravel',
                collapsible: true,
                url: '/docs/drivers/php/laravel-mongodb/:version/fundamentals/write-operations',
                items: [
                  {
                    label: 'Insert',
                    contentSite: 'laravel',
                    url: '/docs/drivers/php/laravel-mongodb/:version/fundamentals/write-operations/insert',
                  },
                  {
                    label: 'Modify',
                    contentSite: 'laravel',
                    url: '/docs/drivers/php/laravel-mongodb/:version/fundamentals/write-operations/modify',
                  },
                  {
                    label: 'Delete',
                    contentSite: 'laravel',
                    url: '/docs/drivers/php/laravel-mongodb/:version/fundamentals/write-operations/delete',
                  },
                ],
              },
              {
                label: 'Aggregation Builder',
                contentSite: 'laravel',
                url: '/docs/drivers/php/laravel-mongodb/:version/fundamentals/aggregation-builder',
              },
            ],
          },
          {
            label: 'Eloquent Models',
            contentSite: 'laravel',
            collapsible: true,
            url: '/docs/drivers/php/laravel-mongodb/:version/eloquent-models',
            items: [
              {
                label: 'Eloquent Model Class',
                contentSite: 'laravel',
                url: '/docs/drivers/php/laravel-mongodb/:version/eloquent-models/model-class',
              },
              {
                label: 'Relationships',
                contentSite: 'laravel',
                url: '/docs/drivers/php/laravel-mongodb/:version/eloquent-models/relationships',
              },
              {
                label: 'Schema Builder',
                contentSite: 'laravel',
                url: '/docs/drivers/php/laravel-mongodb/:version/eloquent-models/schema-builder',
              },
            ],
          },
          {
            label: 'Query Builder',
            contentSite: 'laravel',
            url: '/docs/drivers/php/laravel-mongodb/:version/query-builder',
          },
          {
            label: 'Databases & Collections',
            contentSite: 'laravel',
            collapsible: true,
            url: '/docs/drivers/php/laravel-mongodb/:version/database-collection',
            items: [
              {
                label: 'Time Series',
                contentSite: 'laravel',
                url: '/docs/drivers/php/laravel-mongodb/:version/database-collection/time-series',
              },
            ],
          },
          {
            label: 'User Authentication',
            contentSite: 'laravel',
            url: '/docs/drivers/php/laravel-mongodb/:version/user-authentication',
          },
          {
            label: 'Cache & Locks',
            contentSite: 'laravel',
            url: '/docs/drivers/php/laravel-mongodb/:version/cache',
          },
          {
            label: 'Queues',
            contentSite: 'laravel',
            url: '/docs/drivers/php/laravel-mongodb/:version/queues',
          },
          {
            label: 'Transactions',
            contentSite: 'laravel',
            url: '/docs/drivers/php/laravel-mongodb/:version/transactions',
          },
          {
            label: 'GridFS Filesystems',
            contentSite: 'laravel',
            url: '/docs/drivers/php/laravel-mongodb/:version/filesystems',
          },
          {
            label: 'Issues & Help',
            contentSite: 'laravel',
            url: '/docs/drivers/php/laravel-mongodb/:version/issues-and-help',
          },
          {
            label: 'Feature Compatibility',
            contentSite: 'laravel',
            url: '/docs/drivers/php/laravel-mongodb/:version/feature-compatibility',
          },
          {
            label: 'Compatibility',
            isExternal: true,
            url: 'https://www.mongodb.com/docs/drivers/compatibility/?driver-language=php&php-driver-framework=laravel',
          },
          {
            label: 'Upgrade',
            contentSite: 'laravel',
            url: '/docs/drivers/php/laravel-mongodb/:version/upgrade',
          },
        ],
      },
    ],
  },
];
