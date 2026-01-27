import type { TocItem } from '../types';
import docsVersions from '../version-arrays/drivers/csharp-versions';

const outdatedVersions = docsVersions.before('v2.30', { inclusive: true });

const tocData: TocItem[] = [
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
        versions: { excludes: outdatedVersions },
      },
      {
        label: 'Connect',
        contentSite: 'csharp',
        collapsible: true,
        versions: { excludes: outdatedVersions },
        items: [
          {
            label: 'Create a MongoClient',
            contentSite: 'csharp',
            url: '/docs/drivers/csharp/:version/connect/mongoclient',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'Choose a Connection Target',
            contentSite: 'csharp',
            url: '/docs/drivers/csharp/:version/connect/connection-targets',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'Specify Connection Options',
            contentSite: 'csharp',
            url: '/docs/drivers/csharp/:version/connect/connection-options',
            collapsible: true,
            versions: { excludes: outdatedVersions },
            items: [
              {
                label: 'Compress Network Traffic',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/connect/connection-options/network-compression',
                versions: { excludes: outdatedVersions },
              },
              {
                label: 'Customize Server Selection',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/connect/connection-options/server-selection',
                versions: { excludes: outdatedVersions },
              },
              {
                label: 'Stable API',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/connect/connection-options/stable-api',
                versions: { excludes: outdatedVersions },
              },
              {
                label: 'Connection Pools',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/connect/connection-options/connection-pools',
                versions: { excludes: outdatedVersions },
              },
              {
                label: 'Connect from AWS Lambda',
                contentSite: 'csharp',
                url: 'https://www.mongodb.com/docs/atlas/manage-connections-aws-lambda/',
                versions: { excludes: outdatedVersions },
              },
            ],
          },
          {
            label: 'Connection Troubleshooting',
            contentSite: 'csharp',
            url: '/docs/drivers/csharp/:version/connect/connection-troubleshooting',
            versions: { excludes: outdatedVersions },
          },
        ],
      },
      {
        label: 'Databases & Collections',
        contentSite: 'csharp',
        url: '/docs/drivers/csharp/:version/databases-collections',
        versions: { excludes: outdatedVersions },
      },
      {
        label: 'CRUD Operations',
        contentSite: 'csharp',
        collapsible: true,
        versions: { excludes: outdatedVersions },
        items: [
          {
            label: 'Insert Documents',
            contentSite: 'csharp',
            url: '/docs/drivers/csharp/:version/crud/insert',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'Query Documents',
            contentSite: 'csharp',
            collapsible: true,
            versions: { excludes: outdatedVersions },
            items: [
              {
                label: 'Specify a Query',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/crud/query/query-filter',
                versions: { excludes: outdatedVersions },
              },
              {
                label: 'Find Documents',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/crud/query/find',
                versions: { excludes: outdatedVersions },
              },
              {
                label: 'Specify Documents to Return',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/crud/query/specify-documents',
                versions: { excludes: outdatedVersions },
              },
              {
                label: 'Specify Fields to Return',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/crud/query/project',
                versions: { excludes: outdatedVersions },
              },
              {
                label: 'Count Documents',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/crud/query/count',
                versions: { excludes: outdatedVersions },
              },
              {
                label: 'Distinct Field Values',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/crud/query/distinct',
                versions: { excludes: outdatedVersions },
              },
              {
                label: 'Access Data from a Cursor',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/crud/query/cursors',
                versions: { excludes: outdatedVersions },
              },
            ],
          },
          {
            label: 'Update One Document',
            contentSite: 'csharp',
            url: '/docs/drivers/csharp/:version/crud/update-one',
            collapsible: true,
            versions: { excludes: outdatedVersions },
            items: [
              {
                label: 'Fields',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/crud/update-one/fields',
                versions: { excludes: outdatedVersions },
              },
              {
                label: 'Arrays',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/crud/update-one/arrays',
                versions: { excludes: outdatedVersions },
              },
            ],
          },
          {
            label: 'Update Many Documents',
            contentSite: 'csharp',
            url: '/docs/drivers/csharp/:version/crud/update-many',
            collapsible: true,
            versions: { excludes: outdatedVersions },
            items: [
              {
                label: 'Fields',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/crud/update-many/fields',
                versions: { excludes: outdatedVersions },
              },
              {
                label: 'Arrays',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/crud/update-many/arrays',
                versions: { excludes: outdatedVersions },
              },
            ],
          },
          {
            label: 'Replace Documents',
            contentSite: 'csharp',
            url: '/docs/drivers/csharp/:version/crud/replace',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'Delete Documents',
            contentSite: 'csharp',
            url: '/docs/drivers/csharp/:version/crud/delete',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'Bulk Write Operations',
            contentSite: 'csharp',
            url: '/docs/drivers/csharp/:version/crud/bulk-write',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'Transactions',
            contentSite: 'csharp',
            url: '/docs/drivers/csharp/:version/crud/transactions',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'Store Large Files',
            contentSite: 'csharp',
            url: '/docs/drivers/csharp/:version/crud/gridfs',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'Configure CRUD Operations',
            contentSite: 'csharp',
            url: '/docs/drivers/csharp/:version/crud/configure',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'Geospatial Queries',
            contentSite: 'csharp',
            url: '/docs/drivers/csharp/:version/crud/geo',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'Tutorial: Create a RESTful API',
            contentSite: 'csharp',
            url: '/docs/drivers/csharp/:version/crud/restful-api-tutorial',
            versions: { excludes: outdatedVersions },
          },
        ],
      },
      {
        label: 'Aggregation',
        contentSite: 'csharp',
        url: '/docs/drivers/csharp/:version/aggregation',
        collapsible: true,
        versions: { excludes: outdatedVersions },
        items: [
          {
            label: 'Pipeline Stages',
            contentSite: 'csharp',
            url: '/docs/drivers/csharp/:version/aggregation/stages',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'LINQ',
            contentSite: 'csharp',
            url: '/docs/drivers/csharp/:version/aggregation/linq',
            versions: { excludes: outdatedVersions },
          },
        ],
      },
      {
        label: 'Indexes',
        contentSite: 'csharp',
        url: '/docs/drivers/csharp/:version/indexes',
        collapsible: true,
        versions: { excludes: outdatedVersions },
        items: [
          {
            label: 'MongoDB Search and Vector Search Indexes',
            contentSite: 'csharp',
            url: '/docs/drivers/csharp/:version/indexes/search-indexes',
            versions: {
              excludes: docsVersions.before('v3.0', { inclusive: true }),
            },
          },
        ],
      },
      {
        label: 'Run a Database Command',
        contentSite: 'csharp',
        url: '/docs/drivers/csharp/:version/run-command',
        versions: { excludes: outdatedVersions },
      },
      {
        label: 'MongoDB Search',
        contentSite: 'csharp',
        url: '/docs/drivers/csharp/:version/atlas-search',
        versions: { excludes: outdatedVersions },
      },
      {
        label: 'MongoDB Vector Search',
        contentSite: 'csharp',
        url: '/docs/drivers/csharp/:version/atlas-vector-search',
        versions: {
          excludes: docsVersions.before('v3.1', { inclusive: true }),
        },
      },
      {
        label: 'Time Series',
        contentSite: 'csharp',
        url: '/docs/drivers/csharp/:version/time-series',
        versions: { excludes: outdatedVersions },
      },
      {
        label: 'Logging and Monitoring',
        contentSite: 'csharp',
        collapsible: true,
        versions: { excludes: outdatedVersions },
        items: [
          {
            label: 'Logging',
            contentSite: 'csharp',
            url: '/docs/drivers/csharp/:version/logging-and-monitoring/logging',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'Monitoring',
            contentSite: 'csharp',
            url: '/docs/drivers/csharp/:version/logging-and-monitoring/monitoring',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'Change Streams',
            contentSite: 'csharp',
            url: '/docs/drivers/csharp/:version/logging-and-monitoring/change-streams',
            versions: { excludes: outdatedVersions },
          },
        ],
      },
      {
        label: 'Security',
        contentSite: 'csharp',
        collapsible: true,
        versions: { excludes: outdatedVersions },
        items: [
          {
            label: 'Authentication',
            contentSite: 'csharp',
            url: '/docs/drivers/csharp/:version/security/authentication',
            collapsible: true,
            versions: { excludes: outdatedVersions },
            items: [
              {
                label: 'SCRAM',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/security/authentication/scram',
                versions: { excludes: outdatedVersions },
              },
              {
                label: 'X.509',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/security/authentication/x509',
                versions: { excludes: outdatedVersions },
              },
              {
                label: 'AWS IAM',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/security/authentication/aws-iam',
                versions: { excludes: outdatedVersions },
              },
              {
                label: 'OIDC',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/security/authentication/oidc',
                versions: { excludes: outdatedVersions },
              },
              {
                label: 'LDAP (PLAIN)',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/security/authentication/ldap',
                versions: { excludes: outdatedVersions },
              },
              {
                label: 'Kerberos (GSSAPI)',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/security/authentication/kerberos',
                versions: { excludes: outdatedVersions },
              },
            ],
          },
          {
            label: 'In-Use Encryption',
            contentSite: 'csharp',
            url: '/docs/drivers/csharp/:version/security/in-use-encryption',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'TLS/SSL',
            contentSite: 'csharp',
            url: '/docs/drivers/csharp/:version/security/tls-ssl',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'SOCKS5 Proxy',
            contentSite: 'csharp',
            url: '/docs/drivers/csharp/:version/security/socks',
            versions: {
              includes: docsVersions.after('v3.5', { inclusive: true }),
            },
          },
        ],
      },
      {
        label: 'Serialization',
        contentSite: 'csharp',
        url: '/docs/drivers/csharp/:version/serialization',
        collapsible: true,
        versions: { excludes: outdatedVersions },
        items: [
          {
            label: 'Class Mapping',
            contentSite: 'csharp',
            url: '/docs/drivers/csharp/:version/serialization/class-mapping',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'POCOs',
            contentSite: 'csharp',
            url: '/docs/drivers/csharp/:version/serialization/poco',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'Polymorphic Objects',
            contentSite: 'csharp',
            url: '/docs/drivers/csharp/:version/serialization/polymorphic-objects',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'GUIDs',
            contentSite: 'csharp',
            url: '/docs/drivers/csharp/:version/serialization/guids',
            versions: { excludes: outdatedVersions },
          },
        ],
      },
      {
        label: 'Document Formats',
        contentSite: 'csharp',
        collapsible: true,
        versions: { excludes: outdatedVersions },
        items: [
          {
            label: 'BSON',
            contentSite: 'csharp',
            url: '/docs/drivers/csharp/:version/document-formats/bson',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'Extended JSON',
            contentSite: 'csharp',
            url: '/docs/drivers/csharp/:version/document-formats/extended-json',
            versions: { excludes: outdatedVersions },
          },
        ],
      },
      {
        label: 'Integrations',
        contentSite: 'csharp',
        url: '/docs/drivers/csharp/:version/integrations',
        collapsible: true,
        versions: { excludes: outdatedVersions },
        items: [
          {
            label: 'OData',
            contentSite: 'csharp',
            url: '/docs/drivers/csharp/:version/integrations/odata',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'Entity Framework Provider',
            contentSite: 'entity-framework',
            url: 'https://www.mongodb.com/docs/entity-framework/current/',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'C# Analyzer',
            contentSite: 'visual-studio-extension',
            url: 'https://www.mongodb.com/docs/mongodb-analyzer/',
            versions: { excludes: outdatedVersions },
          },
        ],
      },
      {
        label: 'Reference',
        contentSite: 'csharp',
        collapsible: true,
        versions: { excludes: outdatedVersions },
        items: [
          {
            label: 'Quick Reference',
            contentSite: 'csharp',
            url: '/docs/drivers/csharp/:version/reference/quick-reference',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'Release Notes',
            contentSite: 'csharp',
            url: '/docs/drivers/csharp/:version/reference/release-notes',
            versions: { excludes: outdatedVersions },
          },

          {
            label: 'Upgrade',
            contentSite: 'csharp',
            url: '/docs/drivers/csharp/:version/reference/upgrade',
            collapsible: true,
            versions: { excludes: outdatedVersions },
            items: [
              {
                label: 'Version 2.x',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/reference/upgrade/v2',
                versions: { excludes: outdatedVersions },
              },
              {
                label: 'Version 3.x',
                contentSite: 'csharp',
                url: '/docs/drivers/csharp/:version/reference/upgrade/v3',
                versions: { excludes: outdatedVersions },
              },
            ],
          },
          {
            label: 'Versions 2.0 to 2.18',
            contentSite: 'csharp',
            url: '/docs/drivers/csharp/:version/reference/previous-versions',
            versions: { excludes: outdatedVersions },
          },
        ],
      },
      {
        label: 'Compatibility',
        contentSite: 'drivers',
        url: '/docs/drivers/compatibility/?driver-language=csharp&csharp-driver-framework=csharp-driver',
        versions: { excludes: outdatedVersions },
      },
      {
        label: 'API Documentation',
        contentSite: 'csharp',
        url: 'https://mongodb.github.io/mongo-csharp-driver/3.6.0/api',
        versions: { excludes: outdatedVersions },
      },
      {
        label: 'Issues & Help',
        contentSite: 'csharp',
        url: '/docs/drivers/csharp/:version/issues-and-help',
        versions: { excludes: outdatedVersions },
      },
      // Outdated ToC below:
      {
        label: 'Quick Start',
        contentSite: 'csharp',
        url: '/docs/drivers/csharp/:version/quick-start',
        versions: { includes: outdatedVersions },
      },
      {
        label: 'Quick Reference',
        contentSite: 'csharp',
        url: '/docs/drivers/csharp/:version/quick-reference',
        versions: { includes: outdatedVersions },
      },
      {
        label: "What's New",
        contentSite: 'csharp',
        url: '/docs/drivers/csharp/:version/whats-new',
        versions: { includes: outdatedVersions },
      },
      {
        label: 'Usage Examples',
        contentSite: 'csharp',
        url: '/docs/drivers/csharp/:version/usage-examples',
        collapsible: true,
        versions: { includes: outdatedVersions },
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
        url: '/docs/drivers/csharp/:version/fundamentals',
        collapsible: true,
        versions: { includes: outdatedVersions },
        items: [
          {
            label: 'Connection',
            contentSite: 'csharp',
            url: '/docs/drivers/csharp/:version/fundamentals/connection',
            collapsible: true,
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
                contentSite: 'csharp',
                url: 'https://www.mongodb.com/docs/atlas/manage-connections-aws-lambda/',
              },
            ],
          },
          {
            label: 'Databases & Collections',
            contentSite: 'csharp',
            url: '/docs/drivers/csharp/:version/fundamentals/database-collection',
            collapsible: true,
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
                url: '/docs/drivers/csharp/:version/fundamentals/crud/write-operations',
                collapsible: true,
                items: [
                  {
                    label: 'Insert',
                    contentSite: 'csharp',
                    url: '/docs/drivers/csharp/:version/fundamentals/crud/write-operations/insert',
                  },
                  {
                    label: 'Update One',
                    contentSite: 'csharp',
                    url: '/docs/drivers/csharp/:version/fundamentals/crud/write-operations/update-one',
                    collapsible: true,
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
                    url: '/docs/drivers/csharp/:version/fundamentals/crud/write-operations/update-many',
                    collapsible: true,
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
                url: '/docs/drivers/csharp/:version/fundamentals/crud/read-operations',
                collapsible: true,
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
            url: '/docs/drivers/csharp/:version/fundamentals/authentication',
            collapsible: true,
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
            url: '/docs/drivers/csharp/:version/fundamentals/serialization',
            collapsible: true,
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
        contentSite: 'csharp',
        url: 'https://mongodb.github.io/mongo-csharp-driver/3.5.0/api/index.html',
        versions: { includes: outdatedVersions },
      },
      {
        label: 'FAQ',
        contentSite: 'csharp',
        url: '/docs/drivers/csharp/:version/faq',
        versions: { includes: outdatedVersions },
      },
      {
        label: 'Connection Troubleshooting',
        contentSite: 'csharp',
        url: '/docs/drivers/csharp/:version/connection-troubleshooting',
        versions: { includes: outdatedVersions },
      },
      {
        label: 'Issues & Help',
        contentSite: 'csharp',
        url: '/docs/drivers/csharp/:version/issues-and-help',
        versions: { includes: outdatedVersions },
      },
      {
        label: 'Compatibility',
        contentSite: 'drivers',
        url: '/docs/drivers/compatibility/?driver-language=csharp',
        versions: { includes: outdatedVersions },
      },
      {
        label: 'Upgrade',
        contentSite: 'csharp',
        url: '/docs/drivers/csharp/:version/upgrade',
        versions: { includes: outdatedVersions },
      },
      {
        label: 'Entity Framework Provider',
        contentSite: 'csharp',
        url: 'https://www.mongodb.com/docs/entity-framework/current/',
        versions: { includes: outdatedVersions },
      },
      {
        label: 'C# Analyzer',
        contentSite: 'csharp',
        url: 'https://www.mongodb.com/docs/mongodb-analyzer/',
        versions: { includes: outdatedVersions },
      },
    ],
  },
];

export default tocData;
