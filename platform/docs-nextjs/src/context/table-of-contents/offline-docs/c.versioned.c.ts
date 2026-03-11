import type { L1TocItem } from '../types';

export const toc: L1TocItem[] = [
  {
    label: 'C',
    contentSite: 'landing',
    url: '/docs/languages/c/',
    items: [
      {
        label: 'C Driver',
        contentSite: 'c',
        group: true,
        versionDropdown: true,
        items: [
          {
            label: 'Overview',
            contentSite: 'c',
            url: '/docs/languages/c/c-driver/:version/',
          },
          {
            label: 'Asynchronous C Driver: Public Preview',
            contentSite: 'c',
            url: '/docs/languages/c/c-driver/:version/async-c-driver',
            versions: {
              excludes: ['v1.26', 'v1.27', 'v1.28', 'v1.29'],
            },
          },
          {
            label: 'Get Started',
            contentSite: 'c',
            url: '/docs/languages/c/c-driver/:version/get-started',
            versions: {
              excludes: ['v1.26', 'v1.27', 'v1.28'],
            },
          },
          {
            label: 'Custom Installation',
            contentSite: 'c',
            url: '/docs/languages/c/c-driver/:version/install-from-source',
            versions: {
              excludes: ['v1.26', 'v1.27', 'v1.28'],
            },
          },
          {
            label: 'Connect to MongoDB',
            contentSite: 'c',
            collapsible: true,
            url: '/docs/languages/c/c-driver/:version/connect',
            versions: {
              excludes: ['v1.26', 'v1.27', 'v1.28'],
            },
            items: [
              {
                label: 'Create a MongoClient',
                contentSite: 'c',
                url: '/docs/languages/c/c-driver/:version/connect/mongoclient',
              },
              {
                label: 'Specify Connection Options',
                contentSite: 'c',
                collapsible: true,
                url: '/docs/languages/c/c-driver/:version/connect/connection-options',
                items: [
                  {
                    label: 'Stable API',
                    contentSite: 'c',
                    url: '/docs/languages/c/c-driver/:version/connect/connection-options/stable-api',
                  },
                  {
                    label: 'Connection Pools',
                    contentSite: 'c',
                    url: '/docs/languages/c/c-driver/:version/connect/connection-options/connection-pools',
                  },
                  {
                    label: 'AWS Lambda',
                    contentSite: 'cloud-docs',
                    url: 'https://www.mongodb.com/docs/atlas/manage-connections-aws-lambda',
                  },
                ],
              },
              {
                label: 'Choose a Connection Target',
                contentSite: 'c',
                url: '/docs/languages/c/c-driver/:version/connect/connection-targets',
              },
            ],
          },
          {
            label: 'Databases & Collections',
            contentSite: 'c',
            url: '/docs/languages/c/c-driver/:version/databases-collections',
            versions: {
              excludes: ['v1.26', 'v1.27', 'v1.28'],
            },
          },
          {
            label: 'CRUD Operations',
            contentSite: 'c',
            collapsible: true,
            versions: {
              excludes: ['v1.26', 'v1.27', 'v1.28'],
            },
            items: [
              {
                label: 'Insert',
                contentSite: 'c',
                url: '/docs/languages/c/c-driver/:version/crud/insert',
                versions: {
                  excludes: ['v1.26', 'v1.27', 'v1.28'],
                },
              },
              {
                label: 'Query Operations',
                contentSite: 'c',
                collapsible: true,
                url: '/docs/languages/c/c-driver/:version/crud/query-operations',
                versions: {
                  excludes: ['v1.26', 'v1.27', 'v1.28'],
                },
                items: [
                  {
                    label: 'Specify a Query',
                    contentSite: 'c',
                    url: '/docs/languages/c/c-driver/:version/crud/query-operations/specify-a-query',
                    versions: {
                      excludes: ['v1.26', 'v1.27', 'v1.28'],
                    },
                  },
                  {
                    label: 'Find Documents',
                    contentSite: 'c',
                    url: '/docs/languages/c/c-driver/:version/crud/query-operations/find',
                    versions: {
                      excludes: ['v1.26', 'v1.27', 'v1.28'],
                    },
                  },
                  {
                    label: 'Specify Fields to Return',
                    contentSite: 'c',
                    url: '/docs/languages/c/c-driver/:version/crud/query-operations/project',
                    versions: {
                      excludes: ['v1.26', 'v1.27', 'v1.28'],
                    },
                  },
                  {
                    label: 'Specify Documents to Return',
                    contentSite: 'c',
                    url: '/docs/languages/c/c-driver/:version/crud/query-operations/specify-documents-to-return',
                    versions: {
                      excludes: ['v1.26', 'v1.27', 'v1.28'],
                    },
                  },
                  {
                    label: 'Count Documents',
                    contentSite: 'c',
                    url: '/docs/languages/c/c-driver/:version/crud/query-operations/count',
                    versions: {
                      excludes: ['v1.26', 'v1.27', 'v1.28'],
                    },
                  },
                  {
                    label: 'Distinct Field Values',
                    contentSite: 'c',
                    url: '/docs/languages/c/c-driver/:version/crud/query-operations/distinct',
                    versions: {
                      excludes: ['v1.26', 'v1.27', 'v1.28'],
                    },
                  },
                  {
                    label: 'Access Data from a Cursor',
                    contentSite: 'c',
                    url: '/docs/languages/c/c-driver/:version/crud/query-operations/cursors',
                    versions: {
                      excludes: ['v1.26', 'v1.27', 'v1.28'],
                    },
                  },
                ],
              },
              {
                label: 'Replace',
                contentSite: 'c',
                url: '/docs/languages/c/c-driver/:version/crud/replace',
                versions: {
                  excludes: ['v1.26', 'v1.27', 'v1.28'],
                },
              },
              {
                label: 'Update',
                contentSite: 'c',
                url: '/docs/languages/c/c-driver/:version/crud/update',
                versions: {
                  excludes: ['v1.26', 'v1.27', 'v1.28'],
                },
              },
              {
                label: 'Delete',
                contentSite: 'c',
                url: '/docs/languages/c/c-driver/:version/crud/delete',
                versions: {
                  excludes: ['v1.26', 'v1.27', 'v1.28'],
                },
              },
              {
                label: 'Bulk Write Operations',
                contentSite: 'c',
                url: '/docs/languages/c/c-driver/:version/crud/bulk-write',
                versions: {
                  excludes: ['v1.26', 'v1.27', 'v1.28'],
                },
              },
              {
                label: 'Transactions',
                contentSite: 'c',
                url: '/docs/languages/c/c-driver/:version/crud/transactions',
                versions: {
                  excludes: ['v1.26', 'v1.27', 'v1.28'],
                },
              },
              {
                label: 'Configure CRUD Operations',
                contentSite: 'c',
                url: '/docs/languages/c/c-driver/:version/crud/read-write-configuration',
                versions: {
                  excludes: ['v1.26', 'v1.27', 'v1.28'],
                },
              },
              {
                label: 'Store Large Files',
                contentSite: 'c',
                url: '/docs/languages/c/c-driver/:version/crud/gridfs',
                versions: {
                  excludes: ['v1.26', 'v1.27', 'v1.28'],
                },
              },
            ],
          },
          {
            label: 'Aggregation',
            contentSite: 'c',
            url: '/docs/languages/c/c-driver/:version/aggregation',
            versions: {
              excludes: ['v1.26', 'v1.27', 'v1.28'],
            },
          },
          {
            label: 'Data Formats',
            contentSite: 'c',
            collapsible: true,
            versions: {
              excludes: ['v1.26', 'v1.27', 'v1.28'],
            },
            items: [
              {
                label: 'BSON',
                contentSite: 'c',
                url: '/docs/languages/c/c-driver/:version/data-formats/bson',
                versions: {
                  excludes: ['v1.26', 'v1.27', 'v1.28'],
                },
              },
              {
                label: 'Extended JSON',
                contentSite: 'c',
                url: '/docs/languages/c/c-driver/:version/data-formats/extended-json',
                versions: {
                  excludes: ['v1.26', 'v1.27', 'v1.28'],
                },
              },
              {
                label: 'Time Series',
                contentSite: 'c',
                url: '/docs/languages/c/c-driver/:version/data-formats/time-series',
                versions: {
                  excludes: ['v1.26', 'v1.27', 'v1.28'],
                },
              },
            ],
          },
          {
            label: 'Indexes',
            contentSite: 'c',
            collapsible: true,
            url: '/docs/languages/c/c-driver/:version/indexes',
            versions: {
              excludes: ['v1.26', 'v1.27', 'v1.28'],
            },
            items: [
              {
                label: 'Single Field Indexes',
                contentSite: 'c',
                url: '/docs/languages/c/c-driver/:version/indexes/single-field-index',
                versions: {
                  excludes: ['v1.26', 'v1.27', 'v1.28'],
                },
              },
              {
                label: 'Compound Indexes',
                contentSite: 'c',
                url: '/docs/languages/c/c-driver/:version/indexes/compound-index',
                versions: {
                  excludes: ['v1.26', 'v1.27', 'v1.28'],
                },
              },
              {
                label: 'Multikey Indexes',
                contentSite: 'c',
                url: '/docs/languages/c/c-driver/:version/indexes/multikey-index',
                versions: {
                  excludes: ['v1.26', 'v1.27', 'v1.28'],
                },
              },
              {
                label: 'MongoDB Search',
                contentSite: 'c',
                url: '/docs/languages/c/c-driver/:version/indexes/atlas-search-index',
                versions: {
                  excludes: ['v1.26', 'v1.27', 'v1.28'],
                },
              },
            ],
          },
          {
            label: 'Run a Database Command',
            contentSite: 'c',
            url: '/docs/languages/c/c-driver/:version/run-command',
            versions: {
              excludes: ['v1.26', 'v1.27', 'v1.28'],
            },
          },
          {
            label: 'MongoDB Search',
            contentSite: 'c',
            url: '/docs/languages/c/c-driver/:version/mongodb-search',
            versions: {
              excludes: ['v1.26', 'v1.27', 'v1.28'],
            },
          },
          {
            label: 'MongoDB Vector Search',
            contentSite: 'c',
            url: '/docs/languages/c/c-driver/:version/mongodb-vector-search',
            versions: {
              excludes: ['v1.26', 'v1.27', 'v1.28'],
            },
          },
          {
            label: 'Logging and Monitoring',
            contentSite: 'c',
            collapsible: true,
            versions: {
              excludes: ['v1.26', 'v1.27', 'v1.28'],
            },
            items: [
              {
                label: 'Logging',
                contentSite: 'c',
                url: '/docs/languages/c/c-driver/:version/logging-monitoring/logging',
                versions: {
                  excludes: ['v2.0', 'v1.30', 'v1.29', 'v1.26', 'v1.27', 'v1.28'],
                },
              },
              {
                label: 'Monitoring',
                contentSite: 'c',
                url: '/docs/languages/c/c-driver/:version/logging-monitoring/cluster-monitoring',
                versions: {
                  excludes: ['v1.26', 'v1.27', 'v1.28'],
                },
              },
              {
                label: 'Change Streams',
                contentSite: 'c',
                url: '/docs/languages/c/c-driver/:version/logging-monitoring/change-streams',
                versions: {
                  excludes: ['v1.26', 'v1.27', 'v1.28'],
                },
              },
            ],
          },
          {
            label: 'Security',
            contentSite: 'c',
            collapsible: true,
            url: '/docs/languages/c/c-driver/:version/security',
            versions: {
              excludes: ['v1.26', 'v1.27', 'v1.28'],
            },
            items: [
              {
                label: 'TLS Configuration',
                contentSite: 'c',
                url: '/docs/languages/c/c-driver/:version/security/tls',
              },
              {
                label: 'Authentication',
                contentSite: 'c',
                url: '/docs/languages/c/c-driver/:version/security/authentication',
                versions: {
                  excludes: ['v1.26', 'v1.27', 'v1.28'],
                },
              },
              {
                label: 'In-Use Encryption',
                contentSite: 'c',
                url: '/docs/languages/c/c-driver/:version/security/in-use-encryption',
                versions: {
                  excludes: ['v1.26', 'v1.27', 'v1.28'],
                },
              },
              {
                label: 'Enterprise Authentication',
                contentSite: 'c',
                url: '/docs/languages/c/c-driver/:version/security/enterprise-authentication',
                versions: {
                  excludes: ['v1.26', 'v1.27', 'v1.28'],
                },
              },
            ],
          },
          {
            label: 'Reference',
            contentSite: 'c',
            collapsible: true,
            versions: {
              excludes: ['v1.26', 'v1.27', 'v1.28'],
            },
            items: [
              {
                label: 'Release Notes',
                contentSite: 'c',
                url: '/docs/languages/c/c-driver/:version/reference/release-notes',
                versions: {
                  excludes: ['v1.26', 'v1.27', 'v1.28'],
                },
              },
              {
                label: 'Compatibility',
                contentSite: 'drivers',
                url: 'https://www.mongodb.com/docs/drivers/compatibility/?interface=driver&language=c',
                versions: {
                  excludes: ['v1.26', 'v1.27', 'v1.28'],
                },
              },
              {
                label: 'Upgrade',
                contentSite: 'c',
                url: '/docs/languages/c/c-driver/:version/reference/upgrade',
                versions: {
                  excludes: ['v1.26', 'v1.27', 'v1.28'],
                },
              },
            ],
          },
          {
            label: 'libbson API Documentation',
            isExternal: true,
            url: 'https://mongoc.org/libbson/current',
            versions: {
              excludes: ['v1.26', 'v1.27', 'v1.28'],
            },
          },
          {
            label: 'libmongoc API Documentation',
            isExternal: true,
            url: 'https://mongoc.org/libmongoc/current',
            versions: {
              excludes: ['v1.26', 'v1.27', 'v1.28'],
            },
          },
          {
            label: 'Issues & Help',
            contentSite: 'c',
            url: '/docs/languages/c/c-driver/:version/issues-help',
            versions: {
              excludes: ['v1.26', 'v1.27', 'v1.28'],
            },
          },
          {
            label: 'libbson',
            contentSite: 'c',
            collapsible: true,
            url: '/docs/languages/c/c-driver/:version/libbson',
            versions: {
              includes: ['v1.26', 'v1.27', 'v1.28'],
            },
            items: [
              {
                label: 'Tutorials',
                contentSite: 'c',
                collapsible: true,
                url: '/docs/languages/c/c-driver/:version/libbson/tutorials',
                items: [
                  {
                    label: 'Use libbson with C',
                    contentSite: 'c',
                    url: '/docs/languages/c/c-driver/:version/libbson/tutorials/include-and-link',
                  },
                  {
                    label: 'BSON Documents',
                    contentSite: 'c',
                    url: '/docs/languages/c/c-driver/:version/libbson/tutorials/creating',
                  },
                  {
                    label: 'Handling Errors',
                    contentSite: 'c',
                    url: '/docs/languages/c/c-driver/:version/libbson/tutorials/errors',
                  },
                  {
                    label: 'ObjectIDs',
                    contentSite: 'c',
                    url: '/docs/languages/c/c-driver/:version/libbson/tutorials/oid',
                  },
                  {
                    label: 'Parsing BSON',
                    contentSite: 'c',
                    url: '/docs/languages/c/c-driver/:version/libbson/tutorials/parsing',
                  },
                  {
                    label: 'UTF-8',
                    contentSite: 'c',
                    url: '/docs/languages/c/c-driver/:version/libbson/tutorials/utf8',
                  },
                ],
              },
              {
                label: 'Guides',
                contentSite: 'c',
                collapsible: true,
                url: '/docs/languages/c/c-driver/:version/libbson/guides',
                items: [
                  {
                    label: 'Streaming BSON',
                    contentSite: 'c',
                    url: '/docs/languages/c/c-driver/:version/libbson/guides/streaming-bson',
                  },
                  {
                    label: 'JSON',
                    contentSite: 'c',
                    url: '/docs/languages/c/c-driver/:version/libbson/guides/json',
                  },
                  {
                    label: 'bson_t Lifetimes',
                    contentSite: 'c',
                    url: '/docs/languages/c/c-driver/:version/libbson/guides/lifetimes',
                  },
                ],
              },
              {
                label: 'Cross Platform Notes',
                contentSite: 'c',
                collapsible: true,
                url: '/docs/languages/c/c-driver/:version/libbson/cross-platform-notes',
                items: [
                  {
                    label: 'Endianness',
                    contentSite: 'c',
                    url: '/docs/languages/c/c-driver/:version/libbson/cross-platform-notes/endianness',
                  },
                  {
                    label: 'Threading',
                    contentSite: 'c',
                    url: '/docs/languages/c/c-driver/:version/libbson/cross-platform-notes/threading',
                  },
                ],
              },
              {
                label: 'API Documentation',
                contentSite: 'c',
                url: 'https://mongoc.org/libbson/current/api.html',
              },
            ],
          },
          {
            label: 'libmongoc',
            contentSite: 'c',
            collapsible: true,
            url: '/docs/languages/c/c-driver/:version/libmongoc',
            versions: {
              includes: ['v1.26', 'v1.27', 'v1.28'],
            },
            items: [
              {
                label: 'Tutorials',
                contentSite: 'c',
                collapsible: true,
                url: '/docs/languages/c/c-driver/:version/libmongoc/tutorials',
                items: [
                  {
                    label: 'C Driver Libraries',
                    contentSite: 'c',
                    collapsible: true,
                    url: '/docs/languages/c/c-driver/:version/libmongoc/tutorials/obtaining-libraries',
                    items: [
                      {
                        label: 'Build from Source',
                        contentSite: 'c',
                        url: '/docs/languages/c/c-driver/:version/libmongoc/tutorials/obtaining-libraries/from-source',
                      },
                      {
                        label: 'Prebuilt Libraries',
                        contentSite: 'c',
                        url: '/docs/languages/c/c-driver/:version/libmongoc/tutorials/obtaining-libraries/installing',
                      },
                      {
                        label: 'Build the Documentation',
                        contentSite: 'c',
                        url: '/docs/languages/c/c-driver/:version/libmongoc/tutorials/obtaining-libraries/docs',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'How-To Guides',
                contentSite: 'c',
                collapsible: true,
                url: '/docs/languages/c/c-driver/:version/libmongoc/howto',
                items: [
                  {
                    label: 'Install from Source',
                    contentSite: 'c',
                    url: '/docs/languages/c/c-driver/:version/libmongoc/howto/source-install',
                  },
                ],
              },
              {
                label: 'Reference',
                contentSite: 'c',
                collapsible: true,
                url: '/docs/languages/c/c-driver/:version/libmongoc/ref',
                items: [
                  {
                    label: 'Package Installation',
                    contentSite: 'c',
                    url: '/docs/languages/c/c-driver/:version/libmongoc/ref/packages',
                  },
                  {
                    label: 'Platform Support',
                    contentSite: 'c',
                    url: '/docs/languages/c/c-driver/:version/libmongoc/ref/platforms',
                  },
                ],
              },
              {
                label: 'Tutorial',
                contentSite: 'c',
                url: '/docs/languages/c/c-driver/:version/libmongoc/tutorial',
              },
              {
                label: 'Authentication',
                contentSite: 'c',
                url: '/docs/languages/c/c-driver/:version/libmongoc/authentication',
              },
              {
                label: 'Basic Troubleshooting',
                contentSite: 'c',
                url: '/docs/languages/c/c-driver/:version/libmongoc/basic-troubleshooting',
              },
              {
                label: 'Guides',
                contentSite: 'c',
                collapsible: true,
                url: '/docs/languages/c/c-driver/:version/libmongoc/guides',
                items: [
                  {
                    label: 'Configure TLS',
                    contentSite: 'c',
                    url: '/docs/languages/c/c-driver/:version/libmongoc/guides/configuring_tls',
                  },
                  {
                    label: 'Common Tasks',
                    contentSite: 'c',
                    url: '/docs/languages/c/c-driver/:version/libmongoc/guides/mongoc-common-task-examples',
                  },
                  {
                    label: 'Advanced Connections',
                    contentSite: 'c',
                    url: '/docs/languages/c/c-driver/:version/libmongoc/guides/advanced-connections',
                  },
                  {
                    label: 'Connection Pooling',
                    contentSite: 'c',
                    url: '/docs/languages/c/c-driver/:version/libmongoc/guides/connection-pooling',
                  },
                  {
                    label: 'Data Compression',
                    contentSite: 'c',
                    url: '/docs/languages/c/c-driver/:version/libmongoc/guides/data-compression',
                  },
                  {
                    label: 'Cursors',
                    contentSite: 'c',
                    url: '/docs/languages/c/c-driver/:version/libmongoc/guides/cursors',
                  },
                  {
                    label: 'Bulk Write',
                    contentSite: 'c',
                    url: '/docs/languages/c/c-driver/:version/libmongoc/guides/bulk',
                  },
                  {
                    label: 'Aggregation Frameworks',
                    contentSite: 'c',
                    url: '/docs/languages/c/c-driver/:version/libmongoc/guides/aggregate',
                  },
                  {
                    label: 'distinct & mapReduce',
                    contentSite: 'c',
                    url: '/docs/languages/c/c-driver/:version/libmongoc/guides/distinct-mapreduce',
                  },
                  {
                    label: 'Visual Studio Project',
                    contentSite: 'c',
                    url: '/docs/languages/c/c-driver/:version/libmongoc/guides/visual-studio-guide',
                  },
                  {
                    label: 'Manage Indexes',
                    contentSite: 'c',
                    url: '/docs/languages/c/c-driver/:version/libmongoc/guides/manage-collection-indexes',
                  },
                  {
                    label: 'Aids for Debugging',
                    contentSite: 'c',
                    url: '/docs/languages/c/c-driver/:version/libmongoc/guides/debugging',
                  },
                  {
                    label: 'In-Use Encryption',
                    contentSite: 'c',
                    collapsible: true,
                    url: '/docs/languages/c/c-driver/:version/libmongoc/guides/in-use-encryption',
                    items: [
                      {
                        label: 'Client-Side Encryption',
                        contentSite: 'c',
                        url: '/docs/languages/c/c-driver/:version/libmongoc/guides/client-side-field-level-encryption',
                      },
                      {
                        label: 'Queryable Encryption',
                        contentSite: 'c',
                        url: '/docs/languages/c/c-driver/:version/libmongoc/guides/queryable-encryption',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'API Documentation',
                contentSite: 'c',
                url: 'https://mongoc.org/libmongoc/current/api.html',
              },
              {
                label: 'Application Performance Monitoring',
                contentSite: 'c',
                url: 'https://mongoc.org/libmongoc/current/application-performance-monitoring.html',
              },
            ],
          },
        ],
      },
    ],
  },
];
