import type { L1TocItem } from '../types';

export const toc: L1TocItem[] = [
  {
    label: 'C#/.NET Driver',
    contentSite: 'csharp',
    url: '/docs/drivers/csharp/current/',
    items: [
      {
        label: 'C#/.NET Driver',
        contentSite: 'csharp',
        group: true,
        versionDropdown: true,
        items: [
          {
            label: 'Overview',
            contentSite: 'csharp',
            url: '/docs/drivers/csharp/:version',
          },
          {
            label: 'Get Started',
            contentSite: 'csharp',
            url: '/docs/drivers/csharp/:version/get-started',
            versions: {
              excludes: ['v2.x'],
            },
          },
          {
            label: 'Connect',
            contentSite: 'csharp',
            collapsible: true,
            versions: {
              excludes: ['v2.x'],
            },
            items: [
              {
                label: 'Create a MongoClient',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/connect/mongoclient',
                versions: {
                  excludes: ['v2.x'],
                },
              },
              {
                label: 'Choose a Connection Target',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/connect/connection-targets',
                versions: {
                  excludes: ['v2.x'],
                },
              },
              {
                label: 'Specify Connection Options',
                contentSite: 'csharp',
                collapsible: true,
                url: '/docs/drivers/csharp/:version/connect/connection-options',
                versions: {
                  excludes: ['v2.x'],
                },
                items: [
                  {
                    label: 'Compress Network Traffic',
                    contentSite: 'csharp',
                    url: '/docs/drivers/csharp/:version/connect/connection-options/network-compression',
                    versions: {
                      excludes: ['v2.x'],
                    },
                  },
                  {
                    label: 'Customize Server Selection',
                    contentSite: 'csharp',
                    url: '/docs/drivers/csharp/:version/connect/connection-options/server-selection',
                    versions: {
                      excludes: ['v2.x'],
                    },
                  },
                  {
                    label: 'Stable API',
                    contentSite: 'csharp',
                    url: '/docs/drivers/csharp/:version/connect/connection-options/stable-api',
                    versions: {
                      excludes: ['v2.x'],
                    },
                  },
                  {
                    label: 'Connection Pools',
                    contentSite: 'csharp',
                    url: '/docs/drivers/csharp/:version/connect/connection-options/connection-pools',
                    versions: {
                      excludes: ['v2.x'],
                    },
                  },
                  {
                    label: 'Connect from AWS Lambda',
                    isExternal: true,
                    url: 'https://www.mongodb.com/docs/atlas/manage-connections-aws-lambda/',
                    versions: {
                      excludes: ['v2.x'],
                    },
                  },
                ],
              },
              {
                label: 'Connection Troubleshooting',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/connect/connection-troubleshooting',
                versions: {
                  excludes: ['v2.x'],
                },
              },
            ],
          },
          {
            label: 'Databases & Collections',
            contentSite: 'csharp',
            url: '/docs/drivers/csharp/:version/databases-collections',
            versions: {
              excludes: ['v2.x'],
            },
          },
          {
            label: 'CRUD Operations',
            contentSite: 'csharp',
            collapsible: true,
            versions: {
              excludes: ['v2.x'],
            },
            items: [
              {
                label: 'Insert Documents',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/crud/insert',
                versions: {
                  excludes: ['v2.x'],
                },
              },
              {
                label: 'Query Documents',
                contentSite: 'csharp',
                collapsible: true,
                versions: {
                  excludes: ['v2.x'],
                },
                items: [
                  {
                    label: 'Specify a Query',
                    contentSite: 'csharp',
                    url: '/docs/drivers/csharp/:version/crud/query/query-filter',
                    versions: {
                      excludes: ['v2.x'],
                    },
                  },
                  {
                    label: 'Find Documents',
                    contentSite: 'csharp',
                    url: '/docs/drivers/csharp/:version/crud/query/find',
                    versions: {
                      excludes: ['v2.x'],
                    },
                  },
                  {
                    label: 'Specify Documents to Return',
                    contentSite: 'csharp',
                    url: '/docs/drivers/csharp/:version/crud/query/specify-documents',
                    versions: {
                      excludes: ['v2.x'],
                    },
                  },
                  {
                    label: 'Specify Fields to Return',
                    contentSite: 'csharp',
                    url: '/docs/drivers/csharp/:version/crud/query/project',
                    versions: {
                      excludes: ['v2.x'],
                    },
                  },
                  {
                    label: 'Count Documents',
                    contentSite: 'csharp',
                    url: '/docs/drivers/csharp/:version/crud/query/count',
                    versions: {
                      excludes: ['v2.x'],
                    },
                  },
                  {
                    label: 'Distinct Field Values',
                    contentSite: 'csharp',
                    url: '/docs/drivers/csharp/:version/crud/query/distinct',
                    versions: {
                      excludes: ['v2.x'],
                    },
                  },
                  {
                    label: 'Access Data from a Cursor',
                    contentSite: 'csharp',
                    url: '/docs/drivers/csharp/:version/crud/query/cursors',
                    versions: {
                      excludes: ['v2.x'],
                    },
                  },
                ],
              },
              {
                label: 'Update One Document',
                contentSite: 'csharp',
                collapsible: true,
                url: '/docs/drivers/csharp/:version/crud/update-one',
                versions: {
                  excludes: ['v2.x'],
                },
                items: [
                  {
                    label: 'Fields',
                    contentSite: 'csharp',
                    url: '/docs/drivers/csharp/:version/crud/update-one/fields',
                    versions: {
                      excludes: ['v2.x'],
                    },
                  },
                  {
                    label: 'Arrays',
                    contentSite: 'csharp',
                    url: '/docs/drivers/csharp/:version/crud/update-one/arrays',
                    versions: {
                      excludes: ['v2.x'],
                    },
                  },
                ],
              },
              {
                label: 'Update Many Documents',
                contentSite: 'csharp',
                collapsible: true,
                url: '/docs/drivers/csharp/:version/crud/update-many',
                versions: {
                  excludes: ['v2.x'],
                },
                items: [
                  {
                    label: 'Fields',
                    contentSite: 'csharp',
                    url: '/docs/drivers/csharp/:version/crud/update-many/fields',
                    versions: {
                      excludes: ['v2.x'],
                    },
                  },
                  {
                    label: 'Arrays',
                    contentSite: 'csharp',
                    url: '/docs/drivers/csharp/:version/crud/update-many/arrays',
                    versions: {
                      excludes: ['v2.x'],
                    },
                  },
                ],
              },
              {
                label: 'Replace Documents',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/crud/replace',
                versions: {
                  excludes: ['v2.x'],
                },
              },
              {
                label: 'Delete Documents',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/crud/delete',
                versions: {
                  excludes: ['v2.x'],
                },
              },
              {
                label: 'Bulk Write Operations',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/crud/bulk-write',
                versions: {
                  excludes: ['v2.x'],
                },
              },
              {
                label: 'Transactions',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/crud/transactions',
                versions: {
                  excludes: ['v2.x'],
                },
              },
              {
                label: 'Store Large Files',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/crud/gridfs',
                versions: {
                  excludes: ['v2.x'],
                },
              },
              {
                label: 'Configure CRUD Operations',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/crud/configure',
                versions: {
                  excludes: ['v2.x'],
                },
              },
              {
                label: 'Geospatial Queries',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/crud/geo',
                versions: {
                  excludes: ['v2.x'],
                },
              },
              {
                label: 'Tutorial: Create a RESTful API',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/crud/restful-api-tutorial',
                versions: {
                  excludes: ['v2.x'],
                },
              },
            ],
          },
          {
            label: 'Aggregation',
            contentSite: 'csharp',
            collapsible: true,
            url: '/docs/drivers/csharp/:version/aggregation',
            versions: {
              excludes: ['v2.x'],
            },
            items: [
              {
                label: 'Pipeline Stages',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/aggregation/stages',
                versions: {
                  excludes: ['v2.x'],
                },
              },
              {
                label: 'LINQ',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/aggregation/linq',
                versions: {
                  excludes: ['v2.x'],
                },
              },
            ],
          },
          {
            label: 'Indexes',
            contentSite: 'csharp',
            collapsible: true,
            url: '/docs/drivers/csharp/:version/indexes',
            versions: {
              excludes: ['v2.x'],
            },
            items: [
              {
                label: 'MongoDB Search and Vector Search Indexes',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/indexes/search-indexes',
                versions: {
                  excludes: ['v2.x'],
                },
              },
            ],
          },
          {
            label: 'Run a Database Command',
            contentSite: 'csharp',
            url: '/docs/drivers/csharp/:version/run-command',
            versions: {
              excludes: ['v2.x'],
            },
          },
          {
            label: 'MongoDB Search',
            contentSite: 'csharp',
            url: '/docs/drivers/csharp/:version/atlas-search',
            versions: {
              excludes: ['v2.x'],
            },
          },
          {
            label: 'MongoDB Vector Search',
            contentSite: 'csharp',
            url: '/docs/drivers/csharp/:version/atlas-vector-search',
            versions: {
              excludes: ['v2.x'],
            },
          },
          {
            label: 'Time Series',
            contentSite: 'csharp',
            url: '/docs/drivers/csharp/:version/time-series',
            versions: {
              excludes: ['v2.x'],
            },
          },
          {
            label: 'Logging and Monitoring',
            contentSite: 'csharp',
            collapsible: true,
            versions: {
              excludes: ['v2.x'],
            },
            items: [
              {
                label: 'Logging',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/logging-and-monitoring/logging',
                versions: {
                  excludes: ['v2.x'],
                },
              },
              {
                label: 'Monitoring',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/logging-and-monitoring/monitoring',
                versions: {
                  excludes: ['v2.x'],
                },
              },
              {
                label: 'Change Streams',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/logging-and-monitoring/change-streams',
                versions: {
                  excludes: ['v2.x'],
                },
              },
            ],
          },
          {
            label: 'Security',
            contentSite: 'csharp',
            collapsible: true,
            versions: {
              excludes: ['v2.x'],
            },
            items: [
              {
                label: 'Authentication',
                contentSite: 'csharp',
                collapsible: true,
                url: '/docs/drivers/csharp/:version/security/authentication',
                versions: {
                  excludes: ['v2.x'],
                },
                items: [
                  {
                    label: 'SCRAM',
                    contentSite: 'csharp',
                    url: '/docs/drivers/csharp/:version/security/authentication/scram',
                    versions: {
                      excludes: ['v2.x'],
                    },
                  },
                  {
                    label: 'X.509',
                    contentSite: 'csharp',
                    url: '/docs/drivers/csharp/:version/security/authentication/x509',
                    versions: {
                      excludes: ['v2.x'],
                    },
                  },
                  {
                    label: 'AWS IAM',
                    contentSite: 'csharp',
                    url: '/docs/drivers/csharp/:version/security/authentication/aws-iam',
                    versions: {
                      excludes: ['v2.x'],
                    },
                  },
                  {
                    label: 'OIDC',
                    contentSite: 'csharp',
                    url: '/docs/drivers/csharp/:version/security/authentication/oidc',
                    versions: {
                      excludes: ['v2.x'],
                    },
                  },
                  {
                    label: 'LDAP (PLAIN)',
                    contentSite: 'csharp',
                    url: '/docs/drivers/csharp/:version/security/authentication/ldap',
                    versions: {
                      excludes: ['v2.x'],
                    },
                  },
                  {
                    label: 'Kerberos (GSSAPI)',
                    contentSite: 'csharp',
                    url: '/docs/drivers/csharp/:version/security/authentication/kerberos',
                    versions: {
                      excludes: ['v2.x'],
                    },
                  },
                ],
              },
              {
                label: 'In-Use Encryption',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/security/in-use-encryption',
                versions: {
                  excludes: ['v2.x'],
                },
              },
              {
                label: 'TLS/SSL',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/security/tls-ssl',
                versions: {
                  excludes: ['v2.x'],
                },
              },
              {
                label: 'SOCKS5 Proxy',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/security/socks',
                versions: {
                  includes: ['current', 'upcoming'],
                },
              },
            ],
          },
          {
            label: 'Serialization',
            contentSite: 'csharp',
            collapsible: true,
            url: '/docs/drivers/csharp/:version/serialization',
            versions: {
              excludes: ['v2.x'],
            },
            items: [
              {
                label: 'Class Mapping',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/serialization/class-mapping',
                versions: {
                  excludes: ['v2.x'],
                },
              },
              {
                label: 'POCOs',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/serialization/poco',
                versions: {
                  excludes: ['v2.x'],
                },
              },
              {
                label: 'Polymorphic Objects',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/serialization/polymorphic-objects',
                versions: {
                  excludes: ['v2.x'],
                },
              },
              {
                label: 'GUIDs',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/serialization/guids',
                versions: {
                  excludes: ['v2.x'],
                },
              },
            ],
          },
          {
            label: 'Document Formats',
            contentSite: 'csharp',
            collapsible: true,
            versions: {
              excludes: ['v2.x'],
            },
            items: [
              {
                label: 'BSON',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/document-formats/bson',
                versions: {
                  excludes: ['v2.x'],
                },
              },
              {
                label: 'Extended JSON',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/document-formats/extended-json',
                versions: {
                  excludes: ['v2.x'],
                },
              },
            ],
          },
          {
            label: 'Integrations',
            contentSite: 'csharp',
            collapsible: true,
            url: '/docs/drivers/csharp/:version/integrations',
            versions: {
              excludes: ['v2.x'],
            },
            items: [
              {
                label: 'OData',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/integrations/odata',
                versions: {
                  excludes: ['v2.x'],
                },
              },
              {
                label: 'Entity Framework Provider',
                isExternal: true,
                url: 'https://www.mongodb.com/docs/entity-framework/current/',
                versions: {
                  excludes: ['v2.x'],
                },
              },
              {
                label: 'C# Analyzer',
                isExternal: true,
                url: 'https://www.mongodb.com/docs/mongodb-analyzer/',
                versions: {
                  excludes: ['v2.x'],
                },
              },
            ],
          },
          {
            label: 'Reference',
            contentSite: 'csharp',
            collapsible: true,
            versions: {
              excludes: ['v2.x'],
            },
            items: [
              {
                label: 'Quick Reference',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/reference/quick-reference',
                versions: {
                  excludes: ['v2.x'],
                },
              },
              {
                label: 'Release Notes',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/reference/release-notes',
                versions: {
                  excludes: ['v2.x'],
                },
              },
              {
                label: 'Upgrade',
                contentSite: 'csharp',
                collapsible: true,
                url: '/docs/drivers/csharp/:version/reference/upgrade',
                versions: {
                  excludes: ['v2.x'],
                },
                items: [
                  {
                    label: 'Version 2.x',
                    contentSite: 'csharp',
                    url: '/docs/drivers/csharp/:version/reference/upgrade/v2',
                    versions: {
                      excludes: ['v2.x'],
                    },
                  },
                  {
                    label: 'Version 3.x',
                    contentSite: 'csharp',
                    url: '/docs/drivers/csharp/:version/reference/upgrade/v3',
                    versions: {
                      excludes: ['v2.x'],
                    },
                  },
                ],
              },
              {
                label: 'Versions 2.0 to 2.18',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/reference/previous-versions',
                versions: {
                  excludes: ['v2.x'],
                },
              },
            ],
          },
          {
            label: 'Compatibility',
            contentSite: 'drivers',
            url: '/docs/drivers/compatibility/?driver-language=csharp&csharp-driver-framework=csharp-driver',
            versions: {
              excludes: ['v2.x'],
            },
          },
          {
            label: 'API Documentation',
            isExternal: true,
            url: 'https://mongodb.github.io/mongo-csharp-driver/3.7.0/api',
            versions: {
              excludes: ['v2.x'],
            },
          },
          {
            label: 'Issues & Help',
            contentSite: 'csharp',
            url: '/docs/drivers/csharp/:version/issues-and-help',
            versions: {
              excludes: ['v2.x'],
            },
          },
          {
            label: 'Quick Start',
            contentSite: 'csharp',
            url: '/docs/drivers/csharp/:version/quick-start',
            versions: {
              includes: ['v2.x'],
            },
          },
          {
            label: 'Quick Reference',
            contentSite: 'csharp',
            url: '/docs/drivers/csharp/:version/quick-reference',
            versions: {
              includes: ['v2.x'],
            },
          },
          {
            label: 'What\'s New',
            contentSite: 'csharp',
            url: '/docs/drivers/csharp/:version/whats-new',
            versions: {
              includes: ['v2.x'],
            },
          },
          {
            label: 'Usage Examples',
            contentSite: 'csharp',
            collapsible: true,
            url: '/docs/drivers/csharp/:version/usage-examples',
            versions: {
              includes: ['v2.x'],
            },
            items: [
              {
                label: 'Find a Document',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/usage-examples/findOne',
              },
              {
                label: 'Find Multiple Documents',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/usage-examples/findMany',
              },
              {
                label: 'Insert a Document',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/usage-examples/insertOne',
              },
              {
                label: 'Insert Multiple Documents',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/usage-examples/insertMany',
              },
              {
                label: 'Update a Document',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/usage-examples/updateOne',
              },
              {
                label: 'Update Many Documents',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/usage-examples/updateMany',
              },
              {
                label: 'Replace a Document',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/usage-examples/replaceOne',
              },
              {
                label: 'Delete a Document',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/usage-examples/deleteOne',
              },
              {
                label: 'Delete Many Documents',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/usage-examples/deleteMany',
              },
            ],
          },
          {
            label: 'Fundamentals',
            contentSite: 'csharp',
            collapsible: true,
            url: '/docs/drivers/csharp/:version/fundamentals',
            versions: {
              includes: ['v2.x'],
            },
            items: [
              {
                label: 'Connection',
                contentSite: 'csharp',
                collapsible: true,
                url: '/docs/drivers/csharp/:version/fundamentals/connection',
                items: [
                  {
                    label: 'Connection Guide',
                    contentSite: 'csharp',
                    url: '/docs/drivers/csharp/:version/fundamentals/connection/connect',
                  },
                  {
                    label: 'Connection Options',
                    contentSite: 'csharp',
                    url: '/docs/drivers/csharp/:version/fundamentals/connection/connection-options',
                  },
                  {
                    label: 'Configure TLS',
                    contentSite: 'csharp',
                    url: '/docs/drivers/csharp/:version/fundamentals/connection/tls',
                  },
                  {
                    label: 'Network Compression',
                    contentSite: 'csharp',
                    url: '/docs/drivers/csharp/:version/fundamentals/connection/network-compression',
                  },
                  {
                    label: 'Connect with AWS Lambda',
                    isExternal: true,
                    url: 'https://www.mongodb.com/docs/atlas/manage-connections-aws-lambda/',
                  },
                ],
              },
              {
                label: 'Databases & Collections',
                contentSite: 'csharp',
                collapsible: true,
                url: '/docs/drivers/csharp/:version/fundamentals/database-collection',
                items: [
                  {
                    label: 'Run a Database Command',
                    contentSite: 'csharp',
                    url: '/docs/drivers/csharp/:version/fundamentals/databases-collections/run-command',
                  },
                ],
              },
              {
                label: 'CRUD Operations',
                contentSite: 'csharp',
                collapsible: true,
                items: [
                  {
                    label: 'Write',
                    contentSite: 'csharp',
                    collapsible: true,
                    url: '/docs/drivers/csharp/:version/fundamentals/crud/write-operations',
                    items: [
                      {
                        label: 'Insert',
                        contentSite: 'csharp',
                        url: '/docs/drivers/csharp/:version/fundamentals/crud/write-operations/insert',
                      },
                      {
                        label: 'Update One',
                        contentSite: 'csharp',
                        collapsible: true,
                        url: '/docs/drivers/csharp/:version/fundamentals/crud/write-operations/update-one',
                        items: [
                          {
                            label: 'Fields',
                            contentSite: 'csharp',
                            url: '/docs/drivers/csharp/:version/fundamentals/crud/write-operations/update-one/fields',
                          },
                          {
                            label: 'Arrays',
                            contentSite: 'csharp',
                            url: '/docs/drivers/csharp/:version/fundamentals/crud/write-operations/update-one/arrays',
                          },
                        ],
                      },
                      {
                        label: 'Update Many',
                        contentSite: 'csharp',
                        collapsible: true,
                        url: '/docs/drivers/csharp/:version/fundamentals/crud/write-operations/update-many',
                        items: [
                          {
                            label: 'Fields',
                            contentSite: 'csharp',
                            url: '/docs/drivers/csharp/:version/fundamentals/crud/write-operations/update-many/fields',
                          },
                          {
                            label: 'Arrays',
                            contentSite: 'csharp',
                            url: '/docs/drivers/csharp/:version/fundamentals/crud/write-operations/update-many/arrays',
                          },
                        ],
                      },
                      {
                        label: 'Replace',
                        contentSite: 'csharp',
                        url: '/docs/drivers/csharp/:version/fundamentals/crud/write-operations/replace',
                      },
                      {
                        label: 'Delete',
                        contentSite: 'csharp',
                        url: '/docs/drivers/csharp/:version/fundamentals/crud/write-operations/delete',
                      },
                      {
                        label: 'Bulk Write',
                        contentSite: 'csharp',
                        url: '/docs/drivers/csharp/:version/fundamentals/crud/write-operations/bulk-write',
                      },
                    ],
                  },
                  {
                    label: 'Read',
                    contentSite: 'csharp',
                    collapsible: true,
                    url: '/docs/drivers/csharp/:version/fundamentals/crud/read-operations',
                    items: [
                      {
                        label: 'Retrieve Data',
                        contentSite: 'csharp',
                        url: '/docs/drivers/csharp/:version/fundamentals/crud/read-operations/retrieve',
                      },
                      {
                        label: 'Specify Fields To Return',
                        contentSite: 'csharp',
                        url: '/docs/drivers/csharp/:version/fundamentals/crud/read-operations/project',
                      },
                      {
                        label: 'Count Documents',
                        contentSite: 'csharp',
                        url: '/docs/drivers/csharp/:version/fundamentals/crud/read-operations/count',
                      },
                      {
                        label: 'Retrieve Distinct Field Values',
                        contentSite: 'csharp',
                        url: '/docs/drivers/csharp/:version/fundamentals/crud/read-operations/distinct',
                      },
                      {
                        label: 'Monitor Data Changes',
                        contentSite: 'csharp',
                        url: '/docs/drivers/csharp/:version/fundamentals/crud/read-operations/change-streams',
                      },
                      {
                        label: 'Specify Documents to Return',
                        contentSite: 'csharp',
                        url: '/docs/drivers/csharp/:version/fundamentals/crud/read-operations/specify-documents-to-return',
                      },
                    ],
                  },
                  {
                    label: 'Tutorial: Create a RESTful API',
                    contentSite: 'csharp',
                    url: '/docs/drivers/csharp/:version/fundamentals/crud/restful-api-tutorial',
                  },
                ],
              },
              {
                label: 'Operations with Builders',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/fundamentals/builders',
              },
              {
                label: 'MongoDB Search',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/fundamentals/atlas-search',
              },
              {
                label: 'Stable API',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/fundamentals/stable-api',
              },
              {
                label: 'Authentication',
                contentSite: 'csharp',
                collapsible: true,
                url: '/docs/drivers/csharp/:version/fundamentals/authentication',
                items: [
                  {
                    label: 'SCRAM',
                    contentSite: 'csharp',
                    url: '/docs/drivers/csharp/:version/fundamentals/authentication/scram',
                  },
                  {
                    label: 'X.509',
                    contentSite: 'csharp',
                    url: '/docs/drivers/csharp/:version/fundamentals/authentication/x509',
                  },
                  {
                    label: 'AWS IAM',
                    contentSite: 'csharp',
                    url: '/docs/drivers/csharp/:version/fundamentals/authentication/aws-iam',
                  },
                  {
                    label: 'OIDC',
                    contentSite: 'csharp',
                    url: '/docs/drivers/csharp/:version/fundamentals/authentication/oidc',
                  },
                  {
                    label: 'LDAP (PLAIN)',
                    contentSite: 'csharp',
                    url: '/docs/drivers/csharp/:version/fundamentals/authentication/ldap',
                  },
                  {
                    label: 'Kerberos (GSSAPI)',
                    contentSite: 'csharp',
                    url: '/docs/drivers/csharp/:version/fundamentals/authentication/kerberos',
                  },
                ],
              },
              {
                label: 'Aggregation',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/fundamentals/aggregation',
              },
              {
                label: 'LINQ',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/fundamentals/linq',
              },
              {
                label: 'BSON Operations',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/fundamentals/bson',
              },
              {
                label: 'Query',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/fundamentals/specify-query',
              },
              {
                label: 'Serialization',
                contentSite: 'csharp',
                collapsible: true,
                url: '/docs/drivers/csharp/:version/fundamentals/serialization',
                items: [
                  {
                    label: 'Class Mapping',
                    contentSite: 'csharp',
                    url: '/docs/drivers/csharp/:version/fundamentals/serialization/class-mapping',
                  },
                  {
                    label: 'POCOs',
                    contentSite: 'csharp',
                    url: '/docs/drivers/csharp/:version/fundamentals/serialization/poco',
                  },
                  {
                    label: 'Polymorphic Objects',
                    contentSite: 'csharp',
                    url: '/docs/drivers/csharp/:version/fundamentals/serialization/polymorphic-objects',
                  },
                  {
                    label: 'GUIDs',
                    contentSite: 'csharp',
                    url: '/docs/drivers/csharp/:version/fundamentals/serialization/guid-serialization',
                  },
                ],
              },
              {
                label: 'Transactions',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/fundamentals/transactions',
              },
              {
                label: 'Indexes',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/fundamentals/indexes',
              },
              {
                label: 'Logging',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/fundamentals/logging',
              },
              {
                label: 'Time Series Collections',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/fundamentals/time-series',
              },
              {
                label: 'In-Use Encryption',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/fundamentals/encrypt-fields',
              },
              {
                label: 'Search Geospatially',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/fundamentals/geo',
              },
              {
                label: 'Store Large Files',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/fundamentals/gridfs',
              },
              {
                label: 'Replica Set Operations',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/fundamentals/read-write-configuration',
              },
              {
                label: 'Monitoring',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/fundamentals/monitoring',
              },
            ],
          },
          {
            label: 'API Documentation',
            isExternal: true,
            url: 'https://mongodb.github.io/mongo-csharp-driver/3.5.0/api/index.html',
            versions: {
              includes: ['v2.x'],
            },
          },
          {
            label: 'FAQ',
            contentSite: 'csharp',
            url: '/docs/drivers/csharp/:version/faq',
            versions: {
              includes: ['v2.x'],
            },
          },
          {
            label: 'Connection Troubleshooting',
            contentSite: 'csharp',
            url: '/docs/drivers/csharp/:version/connection-troubleshooting',
            versions: {
              includes: ['v2.x'],
            },
          },
          {
            label: 'Issues & Help',
            contentSite: 'csharp',
            url: '/docs/drivers/csharp/:version/issues-and-help',
            versions: {
              includes: ['v2.x'],
            },
          },
          {
            label: 'Compatibility',
            contentSite: 'drivers',
            url: '/docs/drivers/compatibility/?driver-language=csharp',
            versions: {
              includes: ['v2.x'],
            },
          },
          {
            label: 'Upgrade',
            contentSite: 'csharp',
            url: '/docs/drivers/csharp/:version/upgrade',
            versions: {
              includes: ['v2.x'],
            },
          },
          {
            label: 'Entity Framework Provider',
            isExternal: true,
            url: 'https://www.mongodb.com/docs/entity-framework/current/',
            versions: {
              includes: ['v2.x'],
            },
          },
          {
            label: 'C# Analyzer',
            isExternal: true,
            url: 'https://www.mongodb.com/docs/mongodb-analyzer/',
            versions: {
              includes: ['v2.x'],
            },
          },
        ],
      },
    ],
  },
];
