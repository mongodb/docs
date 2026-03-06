import type { TocItem } from '@/components/unified-sidenav/types';

export const toc: TocItem[] = [
  {
    label: 'Legacy Docs',
    contentSite: 'ruby-driver',
    url: '/docs/ruby-driver/v2.20/',
    items: [
      {
        label: 'Ruby Driver',
        contentSite: 'ruby-driver',
        group: true,
        items: [
          {
            label: 'Overview',
            contentSite: 'ruby-driver',
            url: '/docs/ruby-driver/v2.20/',
          },
          {
            label: 'Get Started',
            contentSite: 'ruby-driver',
            url: '/docs/ruby-driver/v2.20/get-started',
          },
          {
            label: 'Connect',
            contentSite: 'ruby-driver',
            collapsible: true,
            items: [
              {
                label: 'Create a Client',
                contentSite: 'ruby-driver',
                url: '/docs/ruby-driver/v2.20/connect/mongoclient',
              },
              {
                label: 'Choose a Connection Target',
                contentSite: 'ruby-driver',
                url: '/docs/ruby-driver/v2.20/connect/connection-targets',
              },
              {
                label: 'Connection Options',
                contentSite: 'ruby-driver',
                collapsible: true,
                url: '/docs/ruby-driver/v2.20/connect/connection-options',
                items: [
                  {
                    label: 'Compress Network Traffic',
                    contentSite: 'ruby-driver',
                    url: '/docs/ruby-driver/v2.20/connect/network-compression',
                  },
                  {
                    label: 'Stable API',
                    contentSite: 'ruby-driver',
                    url: '/docs/ruby-driver/v2.20/connect/stable-api',
                  },
                  {
                    label: 'Limit Server Execution Time',
                    contentSite: 'ruby-driver',
                    url: '/docs/ruby-driver/v2.20/connect/csot',
                  },
                  {
                    label: 'Connection Pools',
                    contentSite: 'ruby-driver',
                    url: '/docs/ruby-driver/v2.20/connect/connection-pools',
                  },
                  {
                    label: 'Server Selection',
                    contentSite: 'ruby-driver',
                    url: '/docs/ruby-driver/v2.20/connect/server-selection',
                  },
                ],
              },
              {
                label: 'AWS Lambda',
                contentSite: 'cloud-docs',
                url: 'https://www.mongodb.com/docs/atlas/manage-connections-aws-lambda',
              },
            ],
          },
          {
            label: 'Databases & Collections',
            contentSite: 'ruby-driver',
            collapsible: true,
            url: '/docs/ruby-driver/v2.20/databases-collection',
            items: [
              {
                label: 'Run a Database Command',
                contentSite: 'ruby-driver',
                url: '/docs/ruby-driver/v2.20/databases-collections/run-command',
              },
            ],
          },
          {
            label: 'CRUD Operations',
            contentSite: 'ruby-driver',
            collapsible: true,
            items: [
              {
                label: 'Insert Documents',
                contentSite: 'ruby-driver',
                url: '/docs/ruby-driver/v2.20/crud/insert',
              },
              {
                label: 'Query Documents',
                contentSite: 'ruby-driver',
                collapsible: true,
                url: '/docs/ruby-driver/v2.20/crud/query',
                items: [
                  {
                    label: 'Specify a Query',
                    contentSite: 'ruby-driver',
                    url: '/docs/ruby-driver/v2.20/crud/query/specify-a-query',
                  },
                  {
                    label: 'Find Documents',
                    contentSite: 'ruby-driver',
                    url: '/docs/ruby-driver/v2.20/crud/query/find',
                  },
                  {
                    label: 'Specify Documents to Return',
                    contentSite: 'ruby-driver',
                    url: '/docs/ruby-driver/v2.20/crud/query/specify-documents-to-return',
                  },
                  {
                    label: 'Specify Fields to Return',
                    contentSite: 'ruby-driver',
                    url: '/docs/ruby-driver/v2.20/crud/query/project',
                  },
                  {
                    label: 'Distinct Field Values',
                    contentSite: 'ruby-driver',
                    url: '/docs/ruby-driver/v2.20/crud/query/distinct',
                  },
                  {
                    label: 'Count Documents',
                    contentSite: 'ruby-driver',
                    url: '/docs/ruby-driver/v2.20/crud/query/count',
                  },
                  {
                    label: 'Access Data From a Cursor',
                    contentSite: 'ruby-driver',
                    url: '/docs/ruby-driver/v2.20/crud/query/cursors',
                  },
                ],
              },
              {
                label: 'Update Documents',
                contentSite: 'ruby-driver',
                collapsible: true,
                url: '/docs/ruby-driver/v2.20/crud/update',
                items: [
                  {
                    label: 'Replace Documents',
                    contentSite: 'ruby-driver',
                    url: '/docs/ruby-driver/v2.20/crud/replace',
                  },
                ],
              },
              {
                label: 'Delete Documents',
                contentSite: 'ruby-driver',
                url: '/docs/ruby-driver/v2.20/crud/delete',
              },
              {
                label: 'Bulk Write Operations',
                contentSite: 'ruby-driver',
                url: '/docs/ruby-driver/v2.20/crud/bulk-write',
              },
              {
                label: 'Transactions',
                contentSite: 'ruby-driver',
                url: '/docs/ruby-driver/v2.20/crud/transactions',
              },
              {
                label: 'Configure CRUD Operations',
                contentSite: 'ruby-driver',
                url: '/docs/ruby-driver/v2.20/crud/configure-crud',
              },
              {
                label: 'Store Large Files',
                contentSite: 'ruby-driver',
                url: '/docs/ruby-driver/v2.20/crud/gridfs',
              },
              {
                label: 'Collations',
                contentSite: 'ruby-driver',
                url: '/docs/ruby-driver/v2.20/crud/collations',
              },
            ],
          },
          {
            label: 'Aggregation',
            contentSite: 'ruby-driver',
            url: '/docs/ruby-driver/v2.20/aggregation',
          },
          {
            label: 'Data Formats',
            contentSite: 'ruby-driver',
            collapsible: true,
            items: [
              {
                label: 'BSON',
                contentSite: 'ruby-driver',
                url: '/docs/ruby-driver/v2.20/data-formats/bson',
              },
              {
                label: 'Extended JSON',
                contentSite: 'ruby-driver',
                url: '/docs/ruby-driver/v2.20/data-formats/extended-json',
              },
              {
                label: 'Time Series Data',
                contentSite: 'ruby-driver',
                url: '/docs/ruby-driver/v2.20/data-formats/time-series',
              },
            ],
          },
          {
            label: 'Indexes',
            contentSite: 'ruby-driver',
            collapsible: true,
            url: '/docs/ruby-driver/v2.20/indexes',
            items: [
              {
                label: 'Single Field',
                contentSite: 'ruby-driver',
                url: '/docs/ruby-driver/v2.20/indexes/single-field-index',
              },
              {
                label: 'Compound',
                contentSite: 'ruby-driver',
                url: '/docs/ruby-driver/v2.20/indexes/compound-index',
              },
              {
                label: 'Multikey',
                contentSite: 'ruby-driver',
                url: '/docs/ruby-driver/v2.20/indexes/multikey-index',
              },
              {
                label: 'MongoDB Search',
                contentSite: 'ruby-driver',
                url: '/docs/ruby-driver/v2.20/indexes/atlas-search-index',
              },
              {
                label: 'Text',
                contentSite: 'ruby-driver',
                url: '/docs/ruby-driver/v2.20/indexes/text-index',
              },
              {
                label: 'Geospatial',
                contentSite: 'ruby-driver',
                url: '/docs/ruby-driver/v2.20/indexes/geospatial-index',
              },
            ],
          },
          {
            label: 'MongoDB Search',
            contentSite: 'ruby-driver',
            url: '/docs/ruby-driver/v2.20/atlas-search',
          },
          {
            label: 'MongoDB Vector Search',
            contentSite: 'ruby-driver',
            url: '/docs/ruby-driver/v2.20/vector-search',
          },
          {
            label: 'Monitoring and Logging',
            contentSite: 'ruby-driver',
            collapsible: true,
            items: [
              {
                label: 'Monitoring',
                contentSite: 'ruby-driver',
                url: '/docs/ruby-driver/v2.20/logging-and-monitoring/monitoring',
              },
              {
                label: 'Logging',
                contentSite: 'ruby-driver',
                url: '/docs/ruby-driver/v2.20/logging-and-monitoring/logging',
              },
              {
                label: 'Change Streams',
                contentSite: 'ruby-driver',
                url: '/docs/ruby-driver/v2.20/logging-and-monitoring/change-streams',
              },
            ],
          },
          {
            label: 'Security',
            contentSite: 'ruby-driver',
            collapsible: true,
            items: [
              {
                label: 'Authentication',
                contentSite: 'ruby-driver',
                collapsible: true,
                url: '/docs/ruby-driver/v2.20/security/authentication',
                items: [
                  {
                    label: 'SCRAM',
                    contentSite: 'ruby-driver',
                    url: '/docs/ruby-driver/v2.20/security/auth-mechanisms/scram',
                  },
                  {
                    label: 'X.509',
                    contentSite: 'ruby-driver',
                    url: '/docs/ruby-driver/v2.20/security/auth-mechanisms/x509',
                  },
                  {
                    label: 'AWS IAM',
                    contentSite: 'ruby-driver',
                    url: '/docs/ruby-driver/v2.20/security/auth-mechanisms/aws-iam',
                  },
                  {
                    label: 'LDAP (PLAIN)',
                    contentSite: 'ruby-driver',
                    url: '/docs/ruby-driver/v2.20/security/auth-mechanisms/ldap',
                  },
                  {
                    label: 'Kerberos (GSSAPI)',
                    contentSite: 'ruby-driver',
                    url: '/docs/ruby-driver/v2.20/security/auth-mechanisms/kerberos',
                  },
                ],
              },
              {
                label: 'TLS',
                contentSite: 'ruby-driver',
                url: '/docs/ruby-driver/v2.20/security/tls',
              },
              {
                label: 'In-Use Encryption',
                contentSite: 'ruby-driver',
                url: '/docs/ruby-driver/v2.20/security/in-use-encryption',
              },
            ],
          },
          {
            label: 'Reference',
            contentSite: 'ruby-driver',
            collapsible: true,
            items: [
              {
                label: 'Release Notes',
                contentSite: 'ruby-driver',
                url: '/docs/ruby-driver/v2.20/reference/release-notes',
              },
              {
                label: 'Upgrade Versions',
                contentSite: 'ruby-driver',
                url: '/docs/ruby-driver/v2.20/reference/upgrade',
              },
              {
                label: 'View the Source',
                isExternal: true,
                url: 'https://github.com/mongodb/mongo-ruby-driver',
              },
            ],
          },
          {
            label: 'Compatibility',
            contentSite: 'drivers',
            url: '/docs/drivers/compatibility/?driver-language=ruby&ruby-driver-framework=ruby-driver',
          },
          {
            label: 'API Documentation',
            isExternal: true,
            url: 'https://www.mongodb.com/docs/ruby-driver/current/api/',
          },
          {
            label: 'Issues & Help',
            contentSite: 'ruby-driver',
            url: '/docs/ruby-driver/v2.20/issues-and-help',
          },
        ],
      },
    ],
  },
];
