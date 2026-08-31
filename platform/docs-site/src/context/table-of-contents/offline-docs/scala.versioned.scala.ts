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
          },
          {
            label: 'Connect',
            contentSite: 'scala',
            collapsible: true,
            items: [
              {
                label: 'Create a MongoClient',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/connect/mongoclient',
              },
              {
                label: 'Specify Connection Options',
                contentSite: 'scala',
                collapsible: true,
                url: '/docs/languages/scala/scala-driver/:version/connect/connection-options',
                items: [
                  {
                    label: 'Stable API',
                    contentSite: 'scala',
                    url: '/docs/languages/scala/scala-driver/:version/connect/connection-options/stable-api',
                  },
                  {
                    label: 'Limit Execution Time',
                    contentSite: 'scala',
                    url: '/docs/languages/scala/scala-driver/:version/connect/connection-options/csot',
                  },
                  {
                    label: 'Connection Pools',
                    contentSite: 'scala',
                    url: '/docs/languages/scala/scala-driver/:version/connect/connection-options/connection-pools',
                  },
                  {
                    label: 'Compress Network Traffic',
                    contentSite: 'scala',
                    url: '/docs/languages/scala/scala-driver/:version/connect/connection-options/network-compression',
                  },
                ],
              },
              {
                label: 'Choose a Connection Target',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/connect/connection-targets',
              },
              {
                label: 'AWS Lambda',
                isExternal: true,
                url: 'https://www.mongodb.com/docs/atlas/manage-connections-aws-lambda',
              },
            ],
          },
          {
            label: 'Databases & Collections',
            contentSite: 'scala',
            url: '/docs/languages/scala/scala-driver/:version/databases-collections',
          },
          {
            label: 'CRUD Operations',
            contentSite: 'scala',
            collapsible: true,
            url: '/docs/languages/scala/scala-driver/:version/crud',
            items: [
              {
                label: 'Insert Documents',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/crud/insert',
              },
              {
                label: 'Query Documents',
                contentSite: 'scala',
                collapsible: true,
                url: '/docs/languages/scala/scala-driver/:version/crud/query',
                items: [
                  {
                    label: 'Specify a Query',
                    contentSite: 'scala',
                    url: '/docs/languages/scala/scala-driver/:version/crud/query/specify-a-query',
                  },
                  {
                    label: 'Find Documents',
                    contentSite: 'scala',
                    url: '/docs/languages/scala/scala-driver/:version/crud/query/retrieve',
                  },
                  {
                    label: 'Specify Documents to Return',
                    contentSite: 'scala',
                    url: '/docs/languages/scala/scala-driver/:version/crud/query/specify-documents-to-return',
                  },
                  {
                    label: 'Specify Fields to Return',
                    contentSite: 'scala',
                    url: '/docs/languages/scala/scala-driver/:version/crud/query/project',
                  },
                  {
                    label: 'Count Documents',
                    contentSite: 'scala',
                    url: '/docs/languages/scala/scala-driver/:version/crud/query/count',
                  },
                  {
                    label: 'Distinct Field Values',
                    contentSite: 'scala',
                    url: '/docs/languages/scala/scala-driver/:version/crud/query/distinct',
                  },
                  {
                    label: 'Query Text',
                    contentSite: 'scala',
                    url: '/docs/languages/scala/scala-driver/:version/crud/query/query-text',
                  },
                  {
                    label: 'Access Data from an Observable',
                    contentSite: 'scala',
                    url: '/docs/languages/scala/scala-driver/:version/crud/query/observables',
                  },
                  {
                    label: 'Geospatial Queries',
                    contentSite: 'scala',
                    url: '/docs/languages/scala/scala-driver/:version/crud/query/geo',
                  },
                ],
              },
              {
                label: 'Update Documents',
                contentSite: 'scala',
                collapsible: true,
                url: '/docs/languages/scala/scala-driver/:version/crud/update',
                items: [
                  {
                    label: 'Replace Documents',
                    contentSite: 'scala',
                    url: '/docs/languages/scala/scala-driver/:version/crud/update/replace',
                  },
                ],
              },
              {
                label: 'Delete Documents',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/crud/delete',
              },
              {
                label: 'Bulk Write Operations',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/crud/bulk-write',
              },
              {
                label: 'Transactions',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/crud/transactions',
              },
              {
                label: 'Compound Operations',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/crud/compound-operations',
              },
              {
                label: 'Configure CRUD Operations',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/crud/configure',
              },
              {
                label: 'Store Large Files with GridFS',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/crud/gridfs',
              },
            ],
          },
          {
            label: 'Aggregation',
            contentSite: 'scala',
            url: '/docs/languages/scala/scala-driver/:version/aggregation',
          },
          {
            label: 'Data Formats',
            contentSite: 'scala',
            collapsible: true,
            items: [
              {
                label: 'BSON',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/data-formats/bson',
              },
              {
                label: 'Codecs',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/data-formats/codecs',
              },
              {
                label: 'Extended JSON',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/data-formats/extended-json',
              },
              {
                label: 'Time Series',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/data-formats/time-series',
              },
            ],
          },
          {
            label: 'Indexes',
            contentSite: 'scala',
            url: '/docs/languages/scala/scala-driver/:version/indexes',
          },
          {
            label: 'Run a Database Command',
            contentSite: 'scala',
            url: '/docs/languages/scala/scala-driver/:version/run-command',
          },
          {
            label: 'MongoDB Search',
            contentSite: 'scala',
            url: '/docs/languages/scala/scala-driver/:version/mongodb-search',
          },
          {
            label: 'MongoDB Vector Search',
            contentSite: 'scala',
            url: '/docs/languages/scala/scala-driver/:version/vector-search',
          },
          {
            label: 'Logging and Monitoring',
            contentSite: 'scala',
            collapsible: true,
            items: [
              {
                label: 'Monitoring',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/logging-monitoring/monitoring',
              },
              {
                label: 'Logging',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/logging-monitoring/logging',
              },
              {
                label: 'Change Streams',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/logging-monitoring/change-streams',
              },
            ],
          },
          {
            label: 'Security',
            contentSite: 'scala',
            collapsible: true,
            items: [
              {
                label: 'Authentication',
                contentSite: 'scala',
                collapsible: true,
                url: '/docs/languages/scala/scala-driver/:version/security/authentication',
                items: [
                  {
                    label: 'SCRAM',
                    contentSite: 'scala',
                    url: '/docs/languages/scala/scala-driver/:version/security/authentication/scram',
                  },
                  {
                    label: 'X.509',
                    contentSite: 'scala',
                    url: '/docs/languages/scala/scala-driver/:version/security/authentication/x509',
                  },
                  {
                    label: 'LDAP',
                    contentSite: 'scala',
                    url: '/docs/languages/scala/scala-driver/:version/security/authentication/ldap',
                  },
                  {
                    label: 'Kerberos (GSSAPI)',
                    contentSite: 'scala',
                    url: '/docs/languages/scala/scala-driver/:version/security/authentication/kerberos',
                  },
                ],
              },
              {
                label: 'In-Use Encryption',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/security/encrypt',
              },
              {
                label: 'TLS/SSL',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/security/tls',
              },
            ],
          },
          {
            label: 'Reference',
            contentSite: 'scala',
            collapsible: true,
            items: [
              {
                label: 'Release Notes',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/reference/whats-new',
              },
              {
                label: 'Compatibility',
                isExternal: true,
                url: 'https://www.mongodb.com/docs/drivers/compatibility/?driver-language=scala',
              },
              {
                label: 'Upgrade',
                contentSite: 'scala',
                url: '/docs/languages/scala/scala-driver/:version/reference/upgrade',
              },
            ],
          },
          {
            label: 'Issues & Help',
            contentSite: 'scala',
            url: '/docs/languages/scala/scala-driver/:version/issues-and-help',
          },
          {
            label: 'View the Source',
            isExternal: true,
            url: 'https://github.com/mongodb/mongo-java-driver',
          },
          {
            label: 'API Documentation',
            isExternal: true,
            url: 'https://mongodb.github.io/mongo-java-driver/5.10/apidocs/driver-scala/index.html',
          },
        ],
      },
    ],
  },
];
