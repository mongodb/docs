import type { L1TocItem } from '../types';

export const toc: L1TocItem[] = [
  {
    label: 'Scala',
    contentSite: 'landing',
    url: '/docs/languages/scala/',
    items: [
      {
        label: 'Scala Driver',
        contentSite: 'scala',
        group: true,
        versionDropdown: true,
        items: [
          {
            label: 'Overview',
            contentSite: 'scala',
            url: '/docs/languages/scala/scala-driver/:version/',
          },
          {
            label: 'Get Started',
            contentSite: 'scala',
            url: '/docs/languages/scala/scala-driver/:version/get-started',
            versions: {
              excludes: ['v5.2'],
            },
          },
          {
            label: 'Connect',
            contentSite: 'scala',
            collapsible: true,
            url: '/docs/languages/scala/scala-driver/:version/connect',
            versions: {
              excludes: ['v5.2'],
            },
            items: [
              {
                label: 'Create a Client',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/connect/mongoclient',
                versions: {
                  excludes: ['v5.2'],
                },
              },
              {
                label: 'Stable API',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/connect/stable-api',
                versions: {
                  excludes: ['v5.2'],
                },
              },
              {
                label: 'Choose a Connection Target',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/connect/connection-targets',
                versions: {
                  excludes: ['v5.2'],
                },
              },
              {
                label: 'Limit Execution Time',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/connect/csot',
                versions: {
                  excludes: ['v5.2'],
                },
              },
              {
                label: 'Configure TLS',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/connect/tls',
                versions: {
                  excludes: ['v5.2'],
                },
              },
              {
                label: 'AWS Lambda',
                contentSite: 'cloud-docs',
                url: 'https://www.mongodb.com/docs/atlas/manage-connections-aws-lambda',
                versions: {
                  excludes: ['v5.2'],
                },
              },
            ],
          },
          {
            label: 'Databases & Collections',
            contentSite: 'scala',
            collapsible: true,
            url: '/docs/languages/scala/scala-driver/:version/databases-collections',
            versions: {
              excludes: ['v5.2'],
            },
            items: [
              {
                label: 'Run a Command',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/databases-collections/run-command',
                versions: {
                  excludes: ['v5.2'],
                },
              },
              {
                label: 'Time Series',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/databases-collections/time-series',
                versions: {
                  excludes: ['v5.2'],
                },
              },
            ],
          },
          {
            label: 'Read Data',
            contentSite: 'scala',
            collapsible: true,
            url: '/docs/languages/scala/scala-driver/:version/read',
            versions: {
              excludes: ['v5.2'],
            },
            items: [
              {
                label: 'Retrieve Data',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/read/retrieve',
                versions: {
                  excludes: ['v5.2'],
                },
              },
              {
                label: 'Specify a Query',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/read/specify-a-query',
                versions: {
                  excludes: ['v5.2'],
                },
              },
              {
                label: 'Specify Documents to Return',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/read/specify-documents-to-return',
                versions: {
                  excludes: ['v5.2'],
                },
              },
              {
                label: 'Specify Fields to Return',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/read/project',
                versions: {
                  excludes: ['v5.2'],
                },
              },
              {
                label: 'Distinct Field Values',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/read/distinct',
                versions: {
                  excludes: ['v5.2'],
                },
              },
              {
                label: 'Count Documents',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/read/count',
                versions: {
                  excludes: ['v5.2'],
                },
              },
              {
                label: 'Monitor Changes',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/read/change-streams',
                versions: {
                  excludes: ['v5.2'],
                },
              },
            ],
          },
          {
            label: 'Write Data',
            contentSite: 'scala',
            collapsible: true,
            url: '/docs/languages/scala/scala-driver/:version/write',
            versions: {
              excludes: ['v5.2'],
            },
            items: [
              {
                label: 'Insert',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/write/insert',
                versions: {
                  excludes: ['v5.2'],
                },
              },
              {
                label: 'Replace',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/write/replace',
                versions: {
                  excludes: ['v5.2'],
                },
              },
              {
                label: 'Update',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/write/update',
                versions: {
                  excludes: ['v5.2'],
                },
              },
              {
                label: 'Delete',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/write/delete',
                versions: {
                  excludes: ['v5.2'],
                },
              },
              {
                label: 'Bulk Write Operations',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/write/bulk-write',
                versions: {
                  excludes: ['v5.2'],
                },
              },
              {
                label: 'Transactions',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/write/transactions',
                versions: {
                  excludes: ['v5.2'],
                },
              },
              {
                label: 'Store Large Files',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/write/gridfs',
                versions: {
                  excludes: ['v5.2'],
                },
              },
            ],
          },
          {
            label: 'Operations on Replica Sets',
            contentSite: 'scala',
            url: '/docs/languages/scala/scala-driver/:version/read-write-pref',
            versions: {
              excludes: ['v5.2'],
            },
          },
          {
            label: 'Indexes',
            contentSite: 'scala',
            collapsible: true,
            url: '/docs/languages/scala/scala-driver/:version/indexes',
            versions: {
              excludes: ['v5.2'],
            },
            items: [
              {
                label: 'Single Field',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/indexes/single-field-index',
                versions: {
                  excludes: ['v5.2'],
                },
              },
              {
                label: 'Compound',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/indexes/compound-index',
                versions: {
                  excludes: ['v5.2'],
                },
              },
              {
                label: 'Multikey',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/indexes/multikey-index',
                versions: {
                  excludes: ['v5.2'],
                },
              },
              {
                label: 'MongoDB Search',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/indexes/atlas-search-index',
                versions: {
                  excludes: ['v5.2'],
                },
              },
            ],
          },
          {
            label: 'Monitor Your Application',
            contentSite: 'scala',
            collapsible: true,
            versions: {
              excludes: ['v5.2'],
            },
            items: [
              {
                label: 'Cluster Monitoring',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/monitoring/cluster-monitoring',
                versions: {
                  excludes: ['v5.2'],
                },
              },
            ],
          },
          {
            label: 'Data Aggregation',
            contentSite: 'scala',
            url: '/docs/languages/scala/scala-driver/:version/aggregation',
            versions: {
              excludes: ['v5.2'],
            },
          },
          {
            label: 'Observables',
            contentSite: 'scala',
            url: '/docs/languages/scala/scala-driver/:version/observables',
            versions: {
              excludes: ['v5.2'],
            },
          },
          {
            label: 'Security',
            contentSite: 'scala',
            collapsible: true,
            url: '/docs/languages/scala/scala-driver/:version/security',
            versions: {
              excludes: ['v5.2'],
            },
            items: [
              {
                label: 'Authentication',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/security/auth',
                versions: {
                  excludes: ['v5.2'],
                },
              },
              {
                label: 'In-Use Encryption',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/security/encrypt',
                versions: {
                  excludes: ['v5.2'],
                },
              },
            ],
          },
          {
            label: 'Issues & Help',
            contentSite: 'scala',
            url: '/docs/languages/scala/scala-driver/:version/issues-and-help',
            versions: {
              excludes: ['v5.2'],
            },
          },
          {
            label: 'What\'s New',
            contentSite: 'scala',
            url: '/docs/languages/scala/scala-driver/:version/whats-new',
            versions: {
              excludes: ['v5.2'],
            },
          },
          {
            label: 'Upgrade',
            contentSite: 'scala',
            url: '/docs/languages/scala/scala-driver/:version/upgrade',
            versions: {
              excludes: ['v5.2'],
            },
          },
          {
            label: 'Compatibility',
            contentSite: 'drivers',
            url: '/docs/drivers/compatibility/?driver-language=scala',
            versions: {
              excludes: ['v5.2'],
            },
          },
          {
            label: 'View the Source',
            isExternal: true,
            url: 'https://github.com/mongodb/mongo-java-driver',
            versions: {
              excludes: ['v5.2'],
            },
          },
          {
            label: 'API Documentation',
            isExternal: true,
            url: 'https://mongodb.github.io/mongo-java-driver/5.6/apidocs/driver-scala/index.html',
            versions: {
              excludes: ['v5.2'],
            },
          },
          {
            label: 'Installation',
            contentSite: 'scala',
            url: '/docs/languages/scala/scala-driver/:version/installation',
            versions: {
              includes: ['v5.2'],
            },
          },
          {
            label: 'Get Started',
            contentSite: 'scala',
            collapsible: true,
            url: '/docs/languages/scala/scala-driver/:version/get-started',
            versions: {
              includes: ['v5.2'],
            },
            items: [
              {
                label: 'Primer',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/get-started/primer',
              },
              {
                label: 'Quick Start',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/get-started/quickstart',
              },
              {
                label: 'Example Quick Start',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/get-started/qs-case-class',
              },
            ],
          },
          {
            label: 'What\'s New',
            contentSite: 'scala',
            url: '/docs/languages/scala/scala-driver/:version/whats-new',
            versions: {
              includes: ['v5.2'],
            },
          },
          {
            label: 'Tutorials',
            contentSite: 'scala',
            collapsible: true,
            url: '/docs/languages/scala/scala-driver/:version/tutorials',
            versions: {
              includes: ['v5.2'],
            },
            items: [
              {
                label: 'Connect to MongoDB',
                contentSite: 'scala',
                collapsible: true,
                url: '/docs/languages/scala/scala-driver/:version/tutorials/connect',
                items: [
                  {
                    label: 'TLS/SSL',
                    contentSite: 'scala',
                    url: '/docs/languages/scala/scala-driver/:version/tutorials/connect/tls',
                  },
                  {
                    label: 'Authentication',
                    contentSite: 'scala',
                    url: '/docs/languages/scala/scala-driver/:version/tutorials/connect/authentication',
                  },
                  {
                    label: 'Compression',
                    contentSite: 'scala',
                    url: '/docs/languages/scala/scala-driver/:version/tutorials/connect/compression',
                  },
                ],
              },
              {
                label: 'Databases & Collections',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/tutorials/db-coll',
              },
              {
                label: 'Indexes',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/tutorials/indexes',
              },
              {
                label: 'Read Operations',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/tutorials/read-ops',
              },
              {
                label: 'In-Use Encryption',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/tutorials/encrypt',
              },
              {
                label: 'Write Operations',
                contentSite: 'scala',
                collapsible: true,
                url: '/docs/languages/scala/scala-driver/:version/tutorials/write-ops',
                items: [
                  {
                    label: 'Bulk Write',
                    contentSite: 'scala',
                    url: '/docs/languages/scala/scala-driver/:version/tutorials/bulk-writes',
                  },
                ],
              },
              {
                label: 'Aggregation Framework',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/tutorials/aggregation',
              },
              {
                label: 'Change Streams',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/tutorials/change-stream',
              },
              {
                label: 'Query Text',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/tutorials/text-search',
              },
              {
                label: 'Geospatial Search',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/tutorials/geospatial',
              },
              {
                label: 'GridFS',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/tutorials/gridfs',
              },
              {
                label: 'Run Database Commands',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/tutorials/command',
              },
            ],
          },
          {
            label: 'Reference',
            contentSite: 'scala',
            collapsible: true,
            url: '/docs/languages/scala/scala-driver/:version/reference',
            versions: {
              includes: ['v5.2'],
            },
            items: [
              {
                label: 'Logging',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/reference/logging',
              },
              {
                label: 'Monitoring',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/reference/monitoring',
              },
              {
                label: 'Observables',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/reference/observables',
              },
            ],
          },
          {
            label: 'BSON Implementation',
            contentSite: 'scala',
            collapsible: true,
            url: '/docs/languages/scala/scala-driver/:version/bson',
            versions: {
              includes: ['v5.2'],
            },
            items: [
              {
                label: 'Documents',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/bson/documents',
              },
              {
                label: 'Case Class Codecs',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/bson/macros',
              },
              {
                label: 'Extended JSON',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/bson/extended-json',
              },
            ],
          },
          {
            label: 'Builders',
            contentSite: 'scala',
            collapsible: true,
            url: '/docs/languages/scala/scala-driver/:version/builders',
            versions: {
              includes: ['v5.2'],
            },
            items: [
              {
                label: 'Filters',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/builders/filters',
              },
              {
                label: 'Projection',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/builders/projections',
              },
              {
                label: 'Sort',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/builders/sorts',
              },
              {
                label: 'Aggregation',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/builders/aggregates',
              },
              {
                label: 'Update',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/builders/updates',
              },
              {
                label: 'Indexes',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/builders/indexes',
              },
            ],
          },
          {
            label: 'Validate Driver Signatures',
            contentSite: 'scala',
            url: '/docs/languages/scala/scala-driver/:version/validate-signatures',
            versions: {
              includes: ['v5.2'],
            },
          },
          {
            label: 'Compatibility',
            contentSite: 'drivers',
            url: '/docs/drivers/compatibility/?driver-language=scala',
            versions: {
              includes: ['v5.2'],
            },
          },
          {
            label: 'Issues & Help',
            contentSite: 'scala',
            url: '/docs/languages/scala/scala-driver/:version/issues-and-help',
            versions: {
              includes: ['v5.2'],
            },
          },
          {
            label: 'View the Source',
            contentSite: 'scala',
            url: 'https://github.com/mongodb/mongo-java-driver',
            versions: {
              includes: ['v5.2'],
            },
          },
          {
            label: 'API Documentation',
            contentSite: 'scala',
            url: 'https://mongodb.github.io/mongo-java-driver/5.2/apidocs/mongo-scala-driver/index.html',
            versions: {
              includes: ['v5.2'],
            },
          },
        ],
      },
    ],
  },
];
