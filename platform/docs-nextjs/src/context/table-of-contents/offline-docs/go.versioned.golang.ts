import type { L1TocItem } from '../types';

export const toc: L1TocItem[] = [
  {
    label: 'Go',
    contentSite: 'landing',
    url: '/docs/languages/go/',
    items: [
      {
        label: 'Go Driver',
        contentSite: 'golang',
        group: true,
        versionDropdown: true,
        items: [
          {
            label: 'Overview',
            contentSite: 'golang',
            url: '/docs/drivers/go/:version/',
          },
          {
            label: 'Get Started',
            contentSite: 'golang',
            url: '/docs/drivers/go/:version/get-started',
            versions: {
              excludes: ['v1.x'],
            },
          },
          {
            label: 'Connect',
            contentSite: 'golang',
            collapsible: true,
            versions: {
              excludes: ['v1.x'],
            },
            items: [
              {
                label: 'Create a MongoClient',
                contentSite: 'golang',
                url: '/docs/drivers/go/:version/connect/mongoclient',
                versions: {
                  excludes: ['v1.x'],
                },
              },
              {
                label: 'Choose a Connection Target',
                contentSite: 'golang',
                url: '/docs/drivers/go/:version/connect/connection-targets',
                versions: {
                  excludes: ['v1.x'],
                },
              },
              {
                label: 'Connection Options',
                contentSite: 'golang',
                collapsible: true,
                url: '/docs/drivers/go/:version/connect/specify-connection-options',
                versions: {
                  excludes: ['v1.x'],
                },
                items: [
                  {
                    label: 'Compress Network Traffic',
                    contentSite: 'golang',
                    url: '/docs/drivers/go/:version/connect/connection-options/network-compression',
                    versions: {
                      excludes: ['v1.x'],
                    },
                  },
                  {
                    label: 'Customize Cluster Settings',
                    contentSite: 'golang',
                    url: '/docs/drivers/go/:version/connect/connection-options/cluster-settings',
                    versions: {
                      excludes: ['v1.x'],
                    },
                  },
                  {
                    label: 'Stable API',
                    contentSite: 'golang',
                    url: '/docs/drivers/go/:version/connect/connection-options/stable-api',
                    versions: {
                      excludes: ['v1.x'],
                    },
                  },
                  {
                    label: 'Limit Server Execution Time',
                    contentSite: 'golang',
                    url: '/docs/drivers/go/:version/connect/connection-options/csot',
                    versions: {
                      excludes: ['v1.x'],
                    },
                  },
                  {
                    label: 'Connection Pools',
                    contentSite: 'golang',
                    url: '/docs/drivers/go/:version/connect/connection-options/connection-pools',
                    versions: {
                      excludes: ['v1.x'],
                    },
                  },
                ],
              },
              {
                label: 'Connection Troubleshooting',
                contentSite: 'golang',
                url: '/docs/drivers/go/:version/connect/connection-troubleshooting',
                versions: {
                  excludes: ['v1.x'],
                },
              },
              {
                label: 'Connect with AWS Lambda',
                contentSite: 'golang',
                url: 'https://www.mongodb.com/docs/atlas/manage-connections-aws-lambda/',
                versions: {
                  excludes: ['v1.x'],
                },
              },
              {
                label: 'Tutorial: Go with AWS Lambda',
                contentSite: 'golang',
                url: '/docs/drivers/go/:version/connect/go-lambda',
                versions: {
                  excludes: ['v1.x'],
                },
              },
            ],
          },
          {
            label: 'Context Package',
            contentSite: 'golang',
            url: '/docs/drivers/go/:version/context',
            versions: {
              excludes: ['v1.x'],
            },
          },
          {
            label: 'Databases & Collections',
            contentSite: 'golang',
            url: '/docs/drivers/go/:version/databases-collections',
            versions: {
              excludes: ['v1.x'],
            },
          },
          {
            label: 'CRUD Operations',
            contentSite: 'golang',
            collapsible: true,
            versions: {
              excludes: ['v1.x'],
            },
            items: [
              {
                label: 'Insert Documents',
                contentSite: 'golang',
                url: '/docs/drivers/go/:version/crud/insert',
                versions: {
                  excludes: ['v1.x'],
                },
              },
              {
                label: 'Query Documents',
                contentSite: 'golang',
                collapsible: true,
                versions: {
                  excludes: ['v1.x'],
                },
                items: [
                  {
                    label: 'Specify a Query',
                    contentSite: 'golang',
                    url: '/docs/drivers/go/:version/crud/query/query-document',
                    versions: {
                      excludes: ['v1.x'],
                    },
                  },
                  {
                    label: 'Find Documents',
                    contentSite: 'golang',
                    url: '/docs/drivers/go/:version/crud/query/retrieve',
                    versions: {
                      excludes: ['v1.x'],
                    },
                  },
                  {
                    label: 'Access Data from a Cursor',
                    contentSite: 'golang',
                    url: '/docs/drivers/go/:version/crud/query/cursor',
                    versions: {
                      excludes: ['v1.x'],
                    },
                  },
                  {
                    label: 'Specify Documents to Return',
                    contentSite: 'golang',
                    url: '/docs/drivers/go/:version/crud/query/specify-return-documents',
                    versions: {
                      excludes: ['v1.x'],
                    },
                  },
                  {
                    label: 'Specify Fields to Return',
                    contentSite: 'golang',
                    url: '/docs/drivers/go/:version/crud/query/project',
                    versions: {
                      excludes: ['v1.x'],
                    },
                  },
                  {
                    label: 'Count Documents',
                    contentSite: 'golang',
                    url: '/docs/drivers/go/:version/crud/query/count',
                    versions: {
                      excludes: ['v1.x'],
                    },
                  },
                  {
                    label: 'Distinct Field Values',
                    contentSite: 'golang',
                    url: '/docs/drivers/go/:version/crud/query/distinct',
                    versions: {
                      excludes: ['v1.x'],
                    },
                  },
                  {
                    label: 'Query Text',
                    contentSite: 'golang',
                    url: '/docs/drivers/go/:version/crud/query/text',
                    versions: {
                      excludes: ['v1.x'],
                    },
                  },
                ],
              },
              {
                label: 'Update Documents',
                contentSite: 'golang',
                collapsible: true,
                url: '/docs/drivers/go/:version/crud/update',
                versions: {
                  excludes: ['v1.x'],
                },
                items: [
                  {
                    label: 'Replace Documents',
                    contentSite: 'golang',
                    url: '/docs/drivers/go/:version/crud/update/replace',
                    versions: {
                      excludes: ['v1.x'],
                    },
                  },
                  {
                    label: 'Update Arrays',
                    contentSite: 'golang',
                    url: '/docs/drivers/go/:version/crud/update/embedded-arrays',
                    versions: {
                      excludes: ['v1.x'],
                    },
                  },
                  {
                    label: 'Upsert',
                    contentSite: 'golang',
                    url: '/docs/drivers/go/:version/crud/update/upsert',
                    versions: {
                      excludes: ['v1.x'],
                    },
                  },
                ],
              },
              {
                label: 'Delete Documents',
                contentSite: 'golang',
                url: '/docs/drivers/go/:version/crud/delete',
                versions: {
                  excludes: ['v1.x'],
                },
              },
              {
                label: 'Bulk Write Operations',
                contentSite: 'golang',
                url: '/docs/drivers/go/:version/crud/bulk',
                versions: {
                  excludes: ['v1.x'],
                },
              },
              {
                label: 'Transactions',
                contentSite: 'golang',
                url: '/docs/drivers/go/:version/crud/transactions',
                versions: {
                  excludes: ['v1.x'],
                },
              },
              {
                label: 'Compound Operations',
                contentSite: 'golang',
                url: '/docs/drivers/go/:version/crud/compound-operations',
                versions: {
                  excludes: ['v1.x'],
                },
              },
              {
                label: 'Configure CRUD Operations',
                contentSite: 'golang',
                url: '/docs/drivers/go/:version/crud/configure',
                versions: {
                  excludes: ['v1.x'],
                },
              },
              {
                label: 'Store Large Files',
                contentSite: 'golang',
                url: '/docs/drivers/go/:version/crud/gridfs',
                versions: {
                  excludes: ['v1.x'],
                },
              },
              {
                label: 'Tutorial: Build a Web Application',
                contentSite: 'golang',
                url: '/docs/drivers/go/:version/crud/tutorial-web-application',
                versions: {
                  excludes: ['v1.x'],
                },
              },
            ],
          },
          {
            label: 'Aggregation',
            contentSite: 'golang',
            url: '/docs/drivers/go/:version/aggregation',
            versions: {
              excludes: ['v1.x'],
            },
          },
          {
            label: 'Data Formats',
            contentSite: 'golang',
            collapsible: true,
            versions: {
              excludes: ['v1.x'],
            },
            items: [
              {
                label: 'Use Struct Tags',
                contentSite: 'golang',
                url: '/docs/drivers/go/:version/data-formats/struct-tagging',
                versions: {
                  excludes: ['v1.x'],
                },
              },
              {
                label: 'BSON',
                contentSite: 'golang',
                url: '/docs/drivers/go/:version/data-formats/bson',
                versions: {
                  excludes: ['v1.x'],
                },
              },
              {
                label: 'Extended JSON',
                contentSite: 'golang',
                url: '/docs/drivers/go/:version/data-formats/extended-json',
                versions: {
                  excludes: ['v1.x'],
                },
              },
              {
                label: 'Geospatial Data',
                contentSite: 'golang',
                url: '/docs/drivers/go/:version/data-formats/geo',
                versions: {
                  excludes: ['v1.x'],
                },
              },
            ],
          },
          {
            label: 'Indexes',
            contentSite: 'golang',
            url: '/docs/drivers/go/:version/indexes',
            versions: {
              excludes: ['v1.x'],
            },
          },
          {
            label: 'Run a Database Command',
            contentSite: 'golang',
            url: '/docs/drivers/go/:version/run-command',
            versions: {
              excludes: ['v1.x'],
            },
          },
          {
            label: 'Time Series',
            contentSite: 'golang',
            url: '/docs/drivers/go/:version/time-series',
            versions: {
              excludes: ['v1.x'],
            },
          },
          {
            label: 'MongoDB Search',
            contentSite: 'golang',
            url: '/docs/drivers/go/:version/atlas-search',
            versions: {
              excludes: ['v1.x'],
            },
          },
          {
            label: 'MongoDB Vector Search',
            contentSite: 'golang',
            url: '/docs/drivers/go/:version/atlas-vector-search',
            versions: {
              excludes: ['v1.x'],
            },
          },
          {
            label: 'Monitoring & Logging',
            contentSite: 'golang',
            collapsible: true,
            versions: {
              excludes: ['v1.x'],
            },
            items: [
              {
                label: 'Monitoring',
                contentSite: 'golang',
                url: '/docs/drivers/go/:version/monitoring-and-logging/monitoring',
                versions: {
                  excludes: ['v1.x'],
                },
              },
              {
                label: 'Logging',
                contentSite: 'golang',
                url: '/docs/drivers/go/:version/monitoring-and-logging/logging',
                versions: {
                  excludes: ['v1.x'],
                },
              },
              {
                label: 'Change Streams',
                contentSite: 'golang',
                url: '/docs/drivers/go/:version/monitoring-and-logging/change-streams',
                versions: {
                  excludes: ['v1.x'],
                },
              },
            ],
          },
          {
            label: 'Security',
            contentSite: 'golang',
            collapsible: true,
            versions: {
              excludes: ['v1.x'],
            },
            items: [
              {
                label: 'Authentication',
                contentSite: 'golang',
                collapsible: true,
                url: '/docs/drivers/go/:version/security/authentication',
                versions: {
                  excludes: ['v1.x'],
                },
                items: [
                  {
                    label: 'SCRAM',
                    contentSite: 'golang',
                    url: '/docs/drivers/go/:version/security/authentication/scram',
                    versions: {
                      excludes: ['v1.x'],
                    },
                  },
                  {
                    label: 'X.509',
                    contentSite: 'golang',
                    url: '/docs/drivers/go/:version/security/authentication/x509',
                    versions: {
                      excludes: ['v1.x'],
                    },
                  },
                  {
                    label: 'AWS IAM',
                    contentSite: 'golang',
                    url: '/docs/drivers/go/:version/security/authentication/aws-iam',
                    versions: {
                      excludes: ['v1.x'],
                    },
                  },
                  {
                    label: 'OIDC',
                    contentSite: 'golang',
                    url: '/docs/drivers/go/:version/security/authentication/oidc',
                    versions: {
                      excludes: ['v1.x'],
                    },
                  },
                  {
                    label: 'LDAP (PLAIN)',
                    contentSite: 'golang',
                    url: '/docs/drivers/go/:version/security/authentication/ldap',
                    versions: {
                      excludes: ['v1.x'],
                    },
                  },
                  {
                    label: 'Kerberos (GSSAPI)',
                    contentSite: 'golang',
                    url: '/docs/drivers/go/:version/security/authentication/kerberos',
                    versions: {
                      excludes: ['v1.x'],
                    },
                  },
                ],
              },
              {
                label: 'In-Use Encryption',
                contentSite: 'golang',
                url: '/docs/drivers/go/:version/security/encrypt-fields',
                versions: {
                  excludes: ['v1.x'],
                },
              },
              {
                label: 'TLS Security Protocol',
                contentSite: 'golang',
                url: '/docs/drivers/go/:version/security/tls',
                versions: {
                  excludes: ['v1.x'],
                },
              },
            ],
          },
          {
            label: 'Third-Party Integrations',
            contentSite: 'golang',
            collapsible: true,
            versions: {
              excludes: ['v1.x'],
            },
            items: [
              {
                label: 'Vector Search and AWS Bedrock',
                contentSite: 'golang',
                url: '/docs/drivers/go/:version/integrations/vector-search-bedrock',
              },
            ],
          },
          {
            label: 'Reference',
            contentSite: 'golang',
            collapsible: true,
            versions: {
              excludes: ['v1.x'],
            },
            items: [
              {
                label: 'Release Notes',
                contentSite: 'golang',
                url: '/docs/drivers/go/:version/reference/release-notes',
                versions: {
                  excludes: ['v1.x'],
                },
              },
              {
                label: 'Upgrade Guides',
                contentSite: 'golang',
                url: '/docs/drivers/go/:version/reference/upgrade',
                versions: {
                  excludes: ['v1.x'],
                },
              },
              {
                label: 'Quick Reference',
                contentSite: 'golang',
                url: '/docs/drivers/go/:version/reference/quick-reference',
                versions: {
                  excludes: ['v1.x'],
                },
              },
            ],
          },
          {
            label: 'Compatibility',
            contentSite: 'drivers',
            url: '/docs/drivers/compatibility/?driver-language=go',
            versions: {
              excludes: ['v1.x'],
            },
          },
          {
            label: 'API Documentation',
            contentSite: 'golang',
            url: 'https://pkg.go.dev/go.mongodb.org/mongo-driver/v2/mongo',
            versions: {
              excludes: ['v1.x'],
            },
          },
          {
            label: 'Issues & Help',
            contentSite: 'golang',
            url: '/docs/drivers/go/:version/issues-and-help',
            versions: {
              excludes: ['v1.x'],
            },
          },
          {
            label: 'View the Source',
            contentSite: 'golang',
            url: 'https://github.com/mongodb/mongo-go-driver',
            versions: {
              excludes: ['v1.x'],
            },
          },
          {
            label: 'Quick Start',
            contentSite: 'golang',
            url: '/docs/drivers/go/:version/quick-start',
            versions: {
              includes: ['v1.x'],
            },
          },
          {
            label: 'Quick Reference',
            contentSite: 'golang',
            url: '/docs/drivers/go/:version/quick-reference',
            versions: {
              includes: ['v1.x'],
            },
          },
          {
            label: 'What\'s New',
            contentSite: 'golang',
            url: '/docs/drivers/go/:version/whats-new',
            versions: {
              includes: ['v1.x'],
            },
          },
          {
            label: 'Usage Examples',
            contentSite: 'golang',
            collapsible: true,
            url: '/docs/drivers/go/:version/usage-examples',
            versions: {
              includes: ['v1.x'],
            },
            items: [
              {
                label: 'Find Operations',
                contentSite: 'golang',
                collapsible: true,
                url: '/docs/drivers/go/:version/usage-examples/find-operations',
                items: [
                  {
                    label: 'Find One',
                    contentSite: 'golang',
                    url: '/docs/drivers/go/:version/usage-examples/findOne',
                  },
                  {
                    label: 'Find Many',
                    contentSite: 'golang',
                    url: '/docs/drivers/go/:version/usage-examples/find',
                  },
                ],
              },
              {
                label: 'Write Operations',
                contentSite: 'golang',
                collapsible: true,
                url: '/docs/drivers/go/:version/usage-examples/write-operations',
                items: [
                  {
                    label: 'Insert One',
                    contentSite: 'golang',
                    url: '/docs/drivers/go/:version/usage-examples/insertOne',
                  },
                  {
                    label: 'Insert Many',
                    contentSite: 'golang',
                    url: '/docs/drivers/go/:version/usage-examples/insertMany',
                  },
                  {
                    label: 'Update One',
                    contentSite: 'golang',
                    url: '/docs/drivers/go/:version/usage-examples/updateOne',
                  },
                  {
                    label: 'Update Many',
                    contentSite: 'golang',
                    url: '/docs/drivers/go/:version/usage-examples/updateMany',
                  },
                  {
                    label: 'Replace One',
                    contentSite: 'golang',
                    url: '/docs/drivers/go/:version/usage-examples/replaceOne',
                  },
                  {
                    label: 'Delete One',
                    contentSite: 'golang',
                    url: '/docs/drivers/go/:version/usage-examples/deleteOne',
                  },
                  {
                    label: 'Delete Many',
                    contentSite: 'golang',
                    url: '/docs/drivers/go/:version/usage-examples/deleteMany',
                  },
                ],
              },
              {
                label: 'Bulk Operations',
                contentSite: 'golang',
                url: '/docs/drivers/go/:version/usage-examples/bulk',
              },
              {
                label: 'Open a Change Stream',
                contentSite: 'golang',
                url: '/docs/drivers/go/:version/usage-examples/changestream',
              },
              {
                label: 'Count Documents Method',
                contentSite: 'golang',
                url: '/docs/drivers/go/:version/usage-examples/count',
              },
              {
                label: 'Distinct Field Values',
                contentSite: 'golang',
                url: '/docs/drivers/go/:version/usage-examples/distinct',
              },
              {
                label: 'Run a Command',
                contentSite: 'golang',
                url: '/docs/drivers/go/:version/usage-examples/command',
              },
              {
                label: 'Use Struct Tags',
                contentSite: 'golang',
                url: '/docs/drivers/go/:version/usage-examples/struct-tagging',
              },
            ],
          },
          {
            label: 'Fundamentals',
            contentSite: 'golang',
            collapsible: true,
            url: '/docs/drivers/go/:version/fundamentals',
            versions: {
              includes: ['v1.x'],
            },
            items: [
              {
                label: 'Connections',
                contentSite: 'golang',
                collapsible: true,
                url: '/docs/drivers/go/:version/fundamentals/connections',
                items: [
                  {
                    label: 'Connection Guide',
                    contentSite: 'golang',
                    url: '/docs/drivers/go/:version/fundamentals/connections/connection-guide',
                  },
                  {
                    label: 'Network Compression',
                    contentSite: 'golang',
                    url: '/docs/drivers/go/:version/fundamentals/connections/network-compression',
                  },
                  {
                    label: 'Configure TLS',
                    contentSite: 'golang',
                    url: '/docs/drivers/go/:version/fundamentals/connections/tls',
                  },
                  {
                    label: 'Connect with AWS Lambda',
                    contentSite: 'golang',
                    url: 'https://www.mongodb.com/docs/atlas/manage-connections-aws-lambda/',
                  },
                ],
              },
              {
                label: 'Stable API',
                contentSite: 'golang',
                url: '/docs/drivers/go/:version/fundamentals/stable-api',
              },
              {
                label: 'Context',
                contentSite: 'golang',
                url: '/docs/drivers/go/:version/fundamentals/context',
              },
              {
                label: 'Authentication',
                contentSite: 'golang',
                url: '/docs/drivers/go/:version/fundamentals/auth',
              },
              {
                label: 'Enterprise Authentication',
                contentSite: 'golang',
                url: '/docs/drivers/go/:version/fundamentals/enterprise-auth',
              },
              {
                label: 'BSON',
                contentSite: 'golang',
                url: '/docs/drivers/go/:version/fundamentals/bson',
              },
              {
                label: 'CRUD Operations',
                contentSite: 'golang',
                collapsible: true,
                url: '/docs/drivers/go/:version/fundamentals/crud',
                items: [
                  {
                    label: 'Read',
                    contentSite: 'golang',
                    collapsible: true,
                    url: '/docs/drivers/go/:version/fundamentals/crud/read-operations',
                    items: [
                      {
                        label: 'Query',
                        contentSite: 'golang',
                        url: '/docs/drivers/go/:version/fundamentals/crud/read-operations/query-document',
                      },
                      {
                        label: 'Retrieve Data',
                        contentSite: 'golang',
                        url: '/docs/drivers/go/:version/fundamentals/crud/read-operations/retrieve',
                      },
                      {
                        label: 'Count Documents',
                        contentSite: 'golang',
                        url: '/docs/drivers/go/:version/fundamentals/crud/read-operations/count',
                      },
                      {
                        label: 'Data Cursors',
                        contentSite: 'golang',
                        url: '/docs/drivers/go/:version/fundamentals/crud/read-operations/cursor',
                      },
                      {
                        label: 'Distinct Field Values',
                        contentSite: 'golang',
                        url: '/docs/drivers/go/:version/fundamentals/crud/read-operations/distinct',
                      },
                      {
                        label: 'Sort Results',
                        contentSite: 'golang',
                        url: '/docs/drivers/go/:version/fundamentals/crud/read-operations/sort',
                      },
                      {
                        label: 'Skip Results',
                        contentSite: 'golang',
                        url: '/docs/drivers/go/:version/fundamentals/crud/read-operations/skip',
                      },
                      {
                        label: 'Limit Results',
                        contentSite: 'golang',
                        url: '/docs/drivers/go/:version/fundamentals/crud/read-operations/limit',
                      },
                      {
                        label: 'Specify Fields to Return',
                        contentSite: 'golang',
                        url: '/docs/drivers/go/:version/fundamentals/crud/read-operations/project',
                      },
                      {
                        label: 'Query Text',
                        contentSite: 'golang',
                        url: '/docs/drivers/go/:version/fundamentals/crud/read-operations/text',
                      },
                      {
                        label: 'Monitor Data Changes',
                        contentSite: 'golang',
                        url: '/docs/drivers/go/:version/fundamentals/crud/read-operations/changestream',
                      },
                    ],
                  },
                  {
                    label: 'Write',
                    contentSite: 'golang',
                    collapsible: true,
                    url: '/docs/drivers/go/:version/fundamentals/crud/write-operations',
                    items: [
                      {
                        label: 'Insert',
                        contentSite: 'golang',
                        url: '/docs/drivers/go/:version/fundamentals/crud/write-operations/insert',
                      },
                      {
                        label: 'Delete',
                        contentSite: 'golang',
                        url: '/docs/drivers/go/:version/fundamentals/crud/write-operations/delete',
                      },
                      {
                        label: 'Modify',
                        contentSite: 'golang',
                        url: '/docs/drivers/go/:version/fundamentals/crud/write-operations/modify',
                      },
                      {
                        label: 'Update',
                        contentSite: 'golang',
                        url: '/docs/drivers/go/:version/fundamentals/crud/write-operations/embedded-arrays',
                      },
                      {
                        label: 'Upsert',
                        contentSite: 'golang',
                        url: '/docs/drivers/go/:version/fundamentals/crud/write-operations/upsert',
                      },
                      {
                        label: 'Bulk Operations',
                        contentSite: 'golang',
                        url: '/docs/drivers/go/:version/fundamentals/crud/write-operations/bulk',
                      },
                    ],
                  },
                  {
                    label: 'Compound Operations',
                    contentSite: 'golang',
                    url: '/docs/drivers/go/:version/fundamentals/crud/compound-operations',
                  },
                  {
                    label: 'Modify CRUD Execution',
                    contentSite: 'golang',
                    url: '/docs/drivers/go/:version/fundamentals/crud/write-read-pref',
                  },
                ],
              },
              {
                label: 'Aggregation',
                contentSite: 'golang',
                url: '/docs/drivers/go/:version/fundamentals/aggregation',
              },
              {
                label: 'Indexes',
                contentSite: 'golang',
                url: '/docs/drivers/go/:version/fundamentals/indexes',
              },
              {
                label: 'Transactions',
                contentSite: 'golang',
                url: '/docs/drivers/go/:version/fundamentals/transactions',
              },
              {
                label: 'Logging',
                contentSite: 'golang',
                url: '/docs/drivers/go/:version/fundamentals/logging',
              },
              {
                label: 'Run a Command',
                contentSite: 'golang',
                url: '/docs/drivers/go/:version/fundamentals/run-command',
              },
              {
                label: 'Collations',
                contentSite: 'golang',
                url: '/docs/drivers/go/:version/fundamentals/collations',
              },
              {
                label: 'Monitoring',
                contentSite: 'golang',
                collapsible: true,
                url: '/docs/drivers/go/:version/fundamentals/monitoring',
                items: [
                  {
                    label: 'Cluster Monitoring',
                    contentSite: 'golang',
                    url: '/docs/drivers/go/:version/fundamentals/monitoring/cluster-monitoring',
                  },
                  {
                    label: 'Command Monitoring',
                    contentSite: 'golang',
                    url: '/docs/drivers/go/:version/fundamentals/monitoring/command-monitoring',
                  },
                  {
                    label: 'Connection Monitoring',
                    contentSite: 'golang',
                    url: '/docs/drivers/go/:version/fundamentals/monitoring/connection-monitoring',
                  },
                ],
              },
              {
                label: 'GridFS',
                contentSite: 'golang',
                url: '/docs/drivers/go/:version/fundamentals/gridfs',
              },
              {
                label: 'Time Series Collections',
                contentSite: 'golang',
                url: '/docs/drivers/go/:version/fundamentals/time-series',
              },
              {
                label: 'In-Use Encryption',
                contentSite: 'golang',
                url: '/docs/drivers/go/:version/fundamentals/encrypt-fields',
              },
              {
                label: 'Geospatial Data',
                contentSite: 'golang',
                url: '/docs/drivers/go/:version/fundamentals/geo',
              },
            ],
          },
          {
            label: 'API Documentation',
            contentSite: 'golang',
            url: 'https://pkg.go.dev/go.mongodb.org/mongo-driver@v1.17.2/mongo',
            versions: {
              includes: ['v1.x'],
            },
          },
          {
            label: 'FAQ',
            contentSite: 'golang',
            url: '/docs/drivers/go/:version/faq',
            versions: {
              includes: ['v1.x'],
            },
          },
          {
            label: 'Connection Troubleshooting',
            contentSite: 'golang',
            url: '/docs/drivers/go/:version/connection-troubleshooting',
            versions: {
              includes: ['v1.x'],
            },
          },
          {
            label: 'Issues & Help',
            contentSite: 'golang',
            url: '/docs/drivers/go/:version/issues-and-help',
            versions: {
              includes: ['v1.x'],
            },
          },
          {
            label: 'Compatibility',
            contentSite: 'drivers',
            url: '/docs/drivers/compatibility/?driver-language=go',
            versions: {
              includes: ['v1.x'],
            },
          },
          {
            label: 'View the Source',
            contentSite: 'golang',
            url: 'https://github.com/mongodb/mongo-go-driver',
            versions: {
              includes: ['v1.x'],
            },
          },
        ],
      },
    ],
  },
];
