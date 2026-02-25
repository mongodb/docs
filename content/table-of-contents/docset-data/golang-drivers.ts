import type { TocItem } from '../types';

const outdatedVersions = ['v1.x'];

const tocData: TocItem[] = [
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
        versions: { excludes: outdatedVersions },
      },
      {
        label: 'Connect',
        contentSite: 'golang',
        collapsible: true,
        versions: { excludes: outdatedVersions },
        items: [
          {
            label: 'Create a MongoClient',
            contentSite: 'golang',
            url: '/docs/drivers/go/:version/connect/mongoclient',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'Choose a Connection Target',
            contentSite: 'golang',
            url: '/docs/drivers/go/:version/connect/connection-targets',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'Connection Options',
            contentSite: 'golang',
            url: '/docs/drivers/go/:version/connect/specify-connection-options',
            collapsible: true,
            versions: { excludes: outdatedVersions },
            items: [
              {
                label: 'Compress Network Traffic',
                contentSite: 'golang',
                url: '/docs/drivers/go/:version/connect/connection-options/network-compression',
                versions: { excludes: outdatedVersions },
              },
              {
                label: 'Customize Cluster Settings',
                contentSite: 'golang',
                url: '/docs/drivers/go/:version/connect/connection-options/cluster-settings',
                versions: { excludes: outdatedVersions },
              },
              {
                label: 'Stable API',
                contentSite: 'golang',
                url: '/docs/drivers/go/:version/connect/connection-options/stable-api',
                versions: { excludes: outdatedVersions },
              },
              {
                label: 'Limit Server Execution Time',
                contentSite: 'golang',
                url: '/docs/drivers/go/:version/connect/connection-options/csot',
                versions: { excludes: outdatedVersions },
              },
              {
                label: 'Connection Pools',
                contentSite: 'golang',
                url: '/docs/drivers/go/:version/connect/connection-options/connection-pools',
                versions: { excludes: outdatedVersions },
              },
            ],
          },
          {
            label: 'Connection Troubleshooting',
            contentSite: 'golang',
            url: '/docs/drivers/go/:version/connect/connection-troubleshooting',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'Connect with AWS Lambda',
            contentSite: 'golang',
            url: 'https://www.mongodb.com/docs/atlas/manage-connections-aws-lambda/',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'Tutorial: Go with AWS Lambda',
            contentSite: 'golang',
            url: '/docs/drivers/go/:version/connect/go-lambda',
            versions: { excludes: outdatedVersions },
          },
        ],
      },
      {
        label: 'Context Package',
        contentSite: 'golang',
        url: '/docs/drivers/go/:version/context',
        versions: { excludes: outdatedVersions },
      },
      {
        label: 'Databases & Collections',
        contentSite: 'golang',
        url: '/docs/drivers/go/:version/databases-collections',
        versions: { excludes: outdatedVersions },
      },
      {
        label: 'CRUD Operations',
        contentSite: 'golang',
        collapsible: true,
        versions: { excludes: outdatedVersions },
        items: [
          {
            label: 'Insert Documents',
            contentSite: 'golang',
            url: '/docs/drivers/go/:version/crud/insert',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'Query Documents',
            contentSite: 'golang',
            collapsible: true,
            versions: { excludes: outdatedVersions },
            items: [
              {
                label: 'Specify a Query',
                contentSite: 'golang',
                url: '/docs/drivers/go/:version/crud/query/query-document',
                versions: { excludes: outdatedVersions },
              },
              {
                label: 'Find Documents',
                contentSite: 'golang',
                url: '/docs/drivers/go/:version/crud/query/retrieve',
                versions: { excludes: outdatedVersions },
              },
              {
                label: 'Access Data from a Cursor',
                contentSite: 'golang',
                url: '/docs/drivers/go/:version/crud/query/cursor',
                versions: { excludes: outdatedVersions },
              },
              {
                label: 'Specify Documents to Return',
                contentSite: 'golang',
                url: '/docs/drivers/go/:version/crud/query/specify-return-documents',
                versions: { excludes: outdatedVersions },
              },
              {
                label: 'Specify Fields to Return',
                contentSite: 'golang',
                url: '/docs/drivers/go/:version/crud/query/project',
                versions: { excludes: outdatedVersions },
              },
              {
                label: 'Count Documents',
                contentSite: 'golang',
                url: '/docs/drivers/go/:version/crud/query/count',
                versions: { excludes: outdatedVersions },
              },
              {
                label: 'Distinct Field Values',
                contentSite: 'golang',
                url: '/docs/drivers/go/:version/crud/query/distinct',
                versions: { excludes: outdatedVersions },
              },
              {
                label: 'Query Text',
                contentSite: 'golang',
                url: '/docs/drivers/go/:version/crud/query/text',
                versions: { excludes: outdatedVersions },
              },
            ],
          },
          {
            label: 'Update Documents',
            contentSite: 'golang',
            url: '/docs/drivers/go/:version/crud/update',
            collapsible: true,
            versions: { excludes: outdatedVersions },
            items: [
              {
                label: 'Replace Documents',
                contentSite: 'golang',
                url: '/docs/drivers/go/:version/crud/update/replace',
                versions: { excludes: outdatedVersions },
              },
              {
                label: 'Update Arrays',
                contentSite: 'golang',
                url: '/docs/drivers/go/:version/crud/update/embedded-arrays',
                versions: { excludes: outdatedVersions },
              },
              {
                label: 'Upsert',
                contentSite: 'golang',
                url: '/docs/drivers/go/:version/crud/update/upsert',
                versions: { excludes: outdatedVersions },
              },
            ],
          },
          {
            label: 'Delete Documents',
            contentSite: 'golang',
            url: '/docs/drivers/go/:version/crud/delete',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'Bulk Write Operations',
            contentSite: 'golang',
            url: '/docs/drivers/go/:version/crud/bulk',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'Transactions',
            contentSite: 'golang',
            url: '/docs/drivers/go/:version/crud/transactions',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'Compound Operations',
            contentSite: 'golang',
            url: '/docs/drivers/go/:version/crud/compound-operations',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'Configure CRUD Operations',
            contentSite: 'golang',
            url: '/docs/drivers/go/:version/crud/configure',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'Store Large Files',
            contentSite: 'golang',
            url: '/docs/drivers/go/:version/crud/gridfs',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'Tutorial: Build a Web Application',
            contentSite: 'golang',
            url: '/docs/drivers/go/:version/crud/tutorial-web-application',
            versions: { excludes: outdatedVersions },
          },
        ],
      },
      {
        label: 'Aggregation',
        contentSite: 'golang',
        url: '/docs/drivers/go/:version/aggregation',
        versions: { excludes: outdatedVersions },
      },
      {
        label: 'Data Formats',
        contentSite: 'golang',
        collapsible: true,
        versions: { excludes: outdatedVersions },
        items: [
          {
            label: 'Use Struct Tags',
            contentSite: 'golang',
            url: '/docs/drivers/go/:version/data-formats/struct-tagging',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'BSON',
            contentSite: 'golang',
            url: '/docs/drivers/go/:version/data-formats/bson',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'Extended JSON',
            contentSite: 'golang',
            url: '/docs/drivers/go/:version/data-formats/extended-json',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'Geospatial Data',
            contentSite: 'golang',
            url: '/docs/drivers/go/:version/data-formats/geo',
            versions: { excludes: outdatedVersions },
          },
        ],
      },
      {
        label: 'Indexes',
        contentSite: 'golang',
        url: '/docs/drivers/go/:version/indexes',
        versions: { excludes: outdatedVersions },
      },
      {
        label: 'Run a Database Command',
        contentSite: 'golang',
        url: '/docs/drivers/go/:version/run-command',
        versions: { excludes: outdatedVersions },
      },
      {
        label: 'Time Series',
        contentSite: 'golang',
        url: '/docs/drivers/go/:version/time-series',
        versions: { excludes: outdatedVersions },
      },
      {
        label: 'MongoDB Search',
        contentSite: 'golang',
        url: '/docs/drivers/go/:version/atlas-search',
        versions: { excludes: outdatedVersions },
      },
      {
        label: 'MongoDB Vector Search',
        contentSite: 'golang',
        url: '/docs/drivers/go/:version/atlas-vector-search',
        versions: { excludes: outdatedVersions },
      },
      {
        label: 'Monitoring & Logging',
        contentSite: 'golang',
        collapsible: true,
        versions: { excludes: outdatedVersions },
        items: [
          {
            label: 'Monitoring',
            contentSite: 'golang',
            url: '/docs/drivers/go/:version/monitoring-and-logging/monitoring',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'Logging',
            contentSite: 'golang',
            url: '/docs/drivers/go/:version/monitoring-and-logging/logging',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'Change Streams',
            contentSite: 'golang',
            url: '/docs/drivers/go/:version/monitoring-and-logging/change-streams',
            versions: { excludes: outdatedVersions },
          },
        ],
      },
      {
        label: 'Security',
        contentSite: 'golang',
        collapsible: true,
        versions: { excludes: outdatedVersions },
        items: [
          {
            label: 'Authentication',
            contentSite: 'golang',
            url: '/docs/drivers/go/:version/security/authentication',
            collapsible: true,
            versions: { excludes: outdatedVersions },
            items: [
              {
                label: 'SCRAM',
                contentSite: 'golang',
                url: '/docs/drivers/go/:version/security/authentication/scram',
                versions: { excludes: outdatedVersions },
              },
              {
                label: 'X.509',
                contentSite: 'golang',
                url: '/docs/drivers/go/:version/security/authentication/x509',
                versions: { excludes: outdatedVersions },
              },
              {
                label: 'AWS IAM',
                contentSite: 'golang',
                url: '/docs/drivers/go/:version/security/authentication/aws-iam',
                versions: { excludes: outdatedVersions },
              },
              {
                label: 'OIDC',
                contentSite: 'golang',
                url: '/docs/drivers/go/:version/security/authentication/oidc',
                versions: { excludes: outdatedVersions },
              },
              {
                label: 'LDAP (PLAIN)',
                contentSite: 'golang',
                url: '/docs/drivers/go/:version/security/authentication/ldap',
                versions: { excludes: outdatedVersions },
              },
              {
                label: 'Kerberos (GSSAPI)',
                contentSite: 'golang',
                url: '/docs/drivers/go/:version/security/authentication/kerberos',
                versions: { excludes: outdatedVersions },
              },
            ],
          },
          {
            label: 'In-Use Encryption',
            contentSite: 'golang',
            url: '/docs/drivers/go/:version/security/encrypt-fields',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'TLS Security Protocol',
            contentSite: 'golang',
            url: '/docs/drivers/go/:version/security/tls',
            versions: { excludes: outdatedVersions },
          },
        ],
      },
      {
        label: 'Third-Party Integrations',
        contentSite: 'golang',
        collapsible: true,
        versions: { excludes: outdatedVersions },
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
        versions: { excludes: outdatedVersions },
        items: [
          {
            label: 'Release Notes',
            contentSite: 'golang',
            url: '/docs/drivers/go/:version/reference/release-notes',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'Upgrade Guides',
            contentSite: 'golang',
            url: '/docs/drivers/go/:version/reference/upgrade',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'Quick Reference',
            contentSite: 'golang',
            url: '/docs/drivers/go/:version/reference/quick-reference',
            versions: { excludes: outdatedVersions },
          },
        ],
      },
      {
        label: 'Compatibility',
        contentSite: 'drivers',
        url: '/docs/drivers/compatibility/?driver-language=go',
        versions: { excludes: outdatedVersions },
      },
      {
        label: 'API Documentation',
        contentSite: 'golang',
        url: 'https://pkg.go.dev/go.mongodb.org/mongo-driver/v2/mongo',
        versions: { excludes: outdatedVersions },
      },
      {
        label: 'Issues & Help',
        contentSite: 'golang',
        url: '/docs/drivers/go/:version/issues-and-help',
        versions: { excludes: outdatedVersions },
      },
      {
        label: 'View the Source',
        contentSite: 'golang',
        url: 'https://github.com/mongodb/mongo-go-driver',
        versions: { excludes: outdatedVersions },
      },
      // Outdated ToC below
      {
        label: 'Quick Start',
        contentSite: 'golang',
        url: '/docs/drivers/go/:version/quick-start',
        versions: { includes: outdatedVersions },
      },
      {
        label: 'Quick Reference',
        contentSite: 'golang',
        url: '/docs/drivers/go/:version/quick-reference',
        versions: { includes: outdatedVersions },
      },
      {
        label: "What's New",
        contentSite: 'golang',
        url: '/docs/drivers/go/:version/whats-new',
        versions: { includes: outdatedVersions },
      },
      {
        label: 'Usage Examples',
        contentSite: 'golang',
        url: '/docs/drivers/go/:version/usage-examples',
        collapsible: true,
        versions: { includes: outdatedVersions },
        items: [
          {
            label: 'Find Operations',
            contentSite: 'golang',
            url: '/docs/drivers/go/:version/usage-examples/find-operations',
            collapsible: true,
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
            url: '/docs/drivers/go/:version/usage-examples/write-operations',
            collapsible: true,
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
        url: '/docs/drivers/go/:version/fundamentals',
        collapsible: true,
        versions: { includes: outdatedVersions },
        items: [
          {
            label: 'Connections',
            contentSite: 'golang',
            url: '/docs/drivers/go/:version/fundamentals/connections',
            collapsible: true,
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
            url: '/docs/drivers/go/:version/fundamentals/crud',
            collapsible: true,
            items: [
              {
                label: 'Read',
                contentSite: 'golang',
                url: '/docs/drivers/go/:version/fundamentals/crud/read-operations',
                collapsible: true,
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
                url: '/docs/drivers/go/:version/fundamentals/crud/write-operations',
                collapsible: true,
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
            url: '/docs/drivers/go/:version/fundamentals/monitoring',
            collapsible: true,
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
        versions: { includes: outdatedVersions },
      },
      {
        label: 'FAQ',
        contentSite: 'golang',
        url: '/docs/drivers/go/:version/faq',
        versions: { includes: outdatedVersions },
      },
      {
        label: 'Connection Troubleshooting',
        contentSite: 'golang',
        url: '/docs/drivers/go/:version/connection-troubleshooting',
        versions: { includes: outdatedVersions },
      },
      {
        label: 'Issues & Help',
        contentSite: 'golang',
        url: '/docs/drivers/go/:version/issues-and-help',
        versions: { includes: outdatedVersions },
      },
      {
        label: 'Compatibility',
        contentSite: 'drivers',
        url: '/docs/drivers/compatibility/?driver-language=go',
        versions: { includes: outdatedVersions },
      },
      {
        label: 'View the Source',
        contentSite: 'golang',
        url: 'https://github.com/mongodb/mongo-go-driver',
        versions: { includes: outdatedVersions },
      },
    ],
  },
];

export default tocData;
