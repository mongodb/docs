import type { L1TocItem } from '../types';

export const toc: L1TocItem[] = [
  {
    label: 'C++',
    contentSite: 'landing',
    url: '/docs/languages/cpp/',
    items: [
      {
        label: 'C++ Driver',
        contentSite: 'cpp-driver',
        group: true,
        versionDropdown: true,
        versions: {
          includes: ['v4.0', 'current', 'upcoming'],
        },
        items: [
          {
            label: 'Overview',
            contentSite: 'cpp-driver',
            url: '/docs/languages/cpp/cpp-driver/:version/',
          },
          {
            label: 'Get Started',
            contentSite: 'cpp-driver',
            url: '/docs/languages/cpp/cpp-driver/:version/get-started',
          },
          {
            label: 'Connect',
            contentSite: 'cpp-driver',
            collapsible: true,
            items: [
              {
                label: 'Create a Driver Instance',
                contentSite: 'cpp-driver',
                url: '/docs/languages/cpp/cpp-driver/:version/connect/instance',
              },
              {
                label: 'Create a MongoDB Client',
                contentSite: 'cpp-driver',
                url: '/docs/languages/cpp/cpp-driver/:version/connect/client',
              },
              {
                label: 'Choose a Connection Target',
                contentSite: 'cpp-driver',
                url: '/docs/languages/cpp/cpp-driver/:version/connect/connection-targets',
              },
              {
                label: 'Specify Connection Options',
                contentSite: 'cpp-driver',
                collapsible: true,
                url: '/docs/languages/cpp/cpp-driver/:version/connect/connection-options',
                items: [
                  {
                    label: 'Compress Network Traffic',
                    contentSite: 'cpp-driver',
                    url: '/docs/languages/cpp/cpp-driver/:version/connect/network-compression',
                  },
                  {
                    label: 'Stable API',
                    contentSite: 'cpp-driver',
                    url: '/docs/languages/cpp/cpp-driver/:version/connect/stable-api',
                  },
                  {
                    label: 'Connection Pools',
                    contentSite: 'cpp-driver',
                    url: '/docs/languages/cpp/cpp-driver/:version/connect/connection-pools',
                  },
                ],
              },
              {
                label: 'Advanced Configuration & Installation',
                contentSite: 'cpp-driver',
                url: '/docs/languages/cpp/cpp-driver/:version/connect/advanced-installation',
              },
              {
                label: 'Include & Link the Driver',
                contentSite: 'cpp-driver',
                url: '/docs/languages/cpp/cpp-driver/:version/connect/include-link',
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
            contentSite: 'cpp-driver',
            url: '/docs/languages/cpp/cpp-driver/:version/databases-collections',
          },
          {
            label: 'CRUD Operations',
            contentSite: 'cpp-driver',
            collapsible: true,
            items: [
              {
                label: 'Insert',
                contentSite: 'cpp-driver',
                url: '/docs/languages/cpp/cpp-driver/:version/crud/insert',
              },
              {
                label: 'Query',
                contentSite: 'cpp-driver',
                collapsible: true,
                items: [
                  {
                    label: 'Specify a Query',
                    contentSite: 'cpp-driver',
                    url: '/docs/languages/cpp/cpp-driver/:version/crud/query/specify-a-query',
                  },
                  {
                    label: 'Find Documents',
                    contentSite: 'cpp-driver',
                    url: '/docs/languages/cpp/cpp-driver/:version/crud/query/find',
                  },
                  {
                    label: 'Specify Documents to Return',
                    contentSite: 'cpp-driver',
                    url: '/docs/languages/cpp/cpp-driver/:version/crud/query/specify-documents-to-return',
                  },
                  {
                    label: 'Specify Fields to Return',
                    contentSite: 'cpp-driver',
                    url: '/docs/languages/cpp/cpp-driver/:version/crud/query/project',
                  },
                  {
                    label: 'Distinct Field Values',
                    contentSite: 'cpp-driver',
                    url: '/docs/languages/cpp/cpp-driver/:version/crud/query/distinct',
                  },
                  {
                    label: 'Count Documents',
                    contentSite: 'cpp-driver',
                    url: '/docs/languages/cpp/cpp-driver/:version/crud/query/count',
                  },
                  {
                    label: 'Cursors',
                    contentSite: 'cpp-driver',
                    url: '/docs/languages/cpp/cpp-driver/:version/crud/query/cursor',
                  },
                ],
              },
              {
                label: 'Update',
                contentSite: 'cpp-driver',
                collapsible: true,
                url: '/docs/languages/cpp/cpp-driver/:version/crud/update',
                items: [
                  {
                    label: 'Replace',
                    contentSite: 'cpp-driver',
                    url: '/docs/languages/cpp/cpp-driver/:version/crud/update/replace',
                  },
                ],
              },
              {
                label: 'Delete',
                contentSite: 'cpp-driver',
                url: '/docs/languages/cpp/cpp-driver/:version/crud/delete',
              },
              {
                label: 'Bulk Write',
                contentSite: 'cpp-driver',
                url: '/docs/languages/cpp/cpp-driver/:version/crud/bulk-write',
              },
              {
                label: 'Transactions',
                contentSite: 'cpp-driver',
                url: '/docs/languages/cpp/cpp-driver/:version/crud/transactions',
              },
              {
                label: 'Store Large Files',
                contentSite: 'cpp-driver',
                url: '/docs/languages/cpp/cpp-driver/:version/crud/gridfs',
              },
              {
                label: 'Thread & Fork Safety',
                contentSite: 'cpp-driver',
                url: '/docs/languages/cpp/cpp-driver/:version/crud/thread-safety',
              },
              {
                label: 'Configure CRUD Operations',
                contentSite: 'cpp-driver',
                url: '/docs/languages/cpp/cpp-driver/:version/crud/configure',
              },
            ],
          },
          {
            label: 'Aggregation',
            contentSite: 'cpp-driver',
            url: '/docs/languages/cpp/cpp-driver/:version/aggregation',
          },
          {
            label: 'Data Formats',
            contentSite: 'cpp-driver',
            collapsible: true,
            items: [
              {
                label: 'Time Series Data',
                contentSite: 'cpp-driver',
                url: '/docs/languages/cpp/cpp-driver/:version/data-formats/time-series',
              },
              {
                label: 'BSON',
                contentSite: 'cpp-driver',
                url: '/docs/languages/cpp/cpp-driver/:version/data-formats/working-with-bson',
              },
              {
                label: 'Extended JSON',
                contentSite: 'cpp-driver',
                url: '/docs/languages/cpp/cpp-driver/:version/data-formats/extended-json',
              },
            ],
          },
          {
            label: 'Indexes',
            contentSite: 'cpp-driver',
            collapsible: true,
            url: '/docs/languages/cpp/cpp-driver/:version/indexes',
            items: [
              {
                label: 'Single Field Indexes',
                contentSite: 'cpp-driver',
                url: '/docs/languages/cpp/cpp-driver/:version/indexes/single-field-index',
              },
              {
                label: 'Compound Indexes',
                contentSite: 'cpp-driver',
                url: '/docs/languages/cpp/cpp-driver/:version/indexes/compound-index',
              },
              {
                label: 'MongoDB Search Indexes',
                contentSite: 'cpp-driver',
                url: '/docs/languages/cpp/cpp-driver/:version/indexes/atlas-search-index',
              },
              {
                label: 'MongoDB Vector Search Indexes',
                contentSite: 'cpp-driver',
                url: '/docs/languages/cpp/cpp-driver/:version/indexes/vector-search-index',
              },
            ],
          },
          {
            label: 'Run a Database Command',
            contentSite: 'cpp-driver',
            url: '/docs/languages/cpp/cpp-driver/:version/run-command',
          },
          {
            label: 'MongoDB Search',
            contentSite: 'cpp-driver',
            url: '/docs/languages/cpp/cpp-driver/:version/mongodb-search',
          },
          {
            label: 'MongoDB Vector Search',
            contentSite: 'cpp-driver',
            url: '/docs/languages/cpp/cpp-driver/:version/mongodb-vector-search',
          },
          {
            label: 'Logging and Monitoring',
            contentSite: 'cpp-driver',
            collapsible: true,
            items: [
              {
                label: 'Logging',
                contentSite: 'cpp-driver',
                url: '/docs/languages/cpp/cpp-driver/:version/logging-monitoring/logging',
              },
              {
                label: 'Monitoring',
                contentSite: 'cpp-driver',
                url: '/docs/languages/cpp/cpp-driver/:version/logging-monitoring/monitoring',
              },
              {
                label: 'Change Streams',
                contentSite: 'cpp-driver',
                url: '/docs/languages/cpp/cpp-driver/:version/logging-monitoring/change-streams',
              },
            ],
          },
          {
            label: 'Security',
            contentSite: 'cpp-driver',
            collapsible: true,
            items: [
              {
                label: 'Authentication',
                contentSite: 'cpp-driver',
                collapsible: true,
                url: '/docs/languages/cpp/cpp-driver/:version/security/authentication',
                items: [
                  {
                    label: 'SCRAM',
                    contentSite: 'cpp-driver',
                    url: '/docs/languages/cpp/cpp-driver/:version/security/authentication/scram',
                  },
                  {
                    label: 'X.509',
                    contentSite: 'cpp-driver',
                    url: '/docs/languages/cpp/cpp-driver/:version/security/authentication/x509',
                  },
                  {
                    label: 'AWS IAM',
                    contentSite: 'cpp-driver',
                    url: '/docs/languages/cpp/cpp-driver/:version/security/authentication/aws-iam',
                  },
                  {
                    label: 'Kerberos (GSSAPI)',
                    contentSite: 'cpp-driver',
                    url: '/docs/languages/cpp/cpp-driver/:version/security/authentication/kerberos',
                  },
                  {
                    label: 'SASL (PLAIN)',
                    contentSite: 'cpp-driver',
                    url: '/docs/languages/cpp/cpp-driver/:version/security/authentication/plain-sasl',
                  },
                ],
              },
              {
                label: 'TLS',
                contentSite: 'cpp-driver',
                url: '/docs/languages/cpp/cpp-driver/:version/security/tls',
              },
              {
                label: 'In-Use Encryption',
                contentSite: 'cpp-driver',
                url: '/docs/languages/cpp/cpp-driver/:version/security/in-use-encryption',
              },
            ],
          },
          {
            label: 'Reference',
            contentSite: 'cpp-driver',
            collapsible: true,
            items: [
              {
                label: 'Release Notes',
                contentSite: 'cpp-driver',
                url: '/docs/languages/cpp/cpp-driver/:version/reference/whats-new',
              },
              {
                label: 'Upgrade',
                contentSite: 'cpp-driver',
                url: '/docs/languages/cpp/cpp-driver/:version/reference/upgrade',
              },
              {
                label: 'Testing',
                contentSite: 'cpp-driver',
                url: '/docs/languages/cpp/cpp-driver/:version/reference/testing',
              },
              {
                label: 'API & ABI Versioning',
                contentSite: 'cpp-driver',
                collapsible: true,
                url: '/docs/languages/cpp/cpp-driver/:version/reference/api-abi-versioning',
                items: [
                  {
                    label: 'API Versioning',
                    contentSite: 'cpp-driver',
                    url: '/docs/languages/cpp/cpp-driver/:version/reference/api-abi-versioning/api-versioning',
                  },
                  {
                    label: 'ABI Versioning',
                    contentSite: 'cpp-driver',
                    url: '/docs/languages/cpp/cpp-driver/:version/reference/api-abi-versioning/abi-versioning',
                  },
                ],
              },
              {
                label: 'Driver Source',
                isExternal: true,
                url: 'https://github.com/mongodb/mongo-cxx-driver',
              },
            ],
          },
          {
            label: 'Compatibility',
            contentSite: 'drivers',
            url: '/docs/drivers/compatibility/?driver-language=cpp',
          },
          {
            label: 'API Documentation',
            isExternal: true,
            url: 'https://mongocxx.org/api/mongocxx-4.1.1',
          },
          {
            label: 'Issues & Help',
            contentSite: 'cpp-driver',
            url: '/docs/languages/cpp/cpp-driver/:version/issues-and-help',
          },
        ],
      },
      {
        label: 'C++ Driver',
        contentSite: 'cpp-driver',
        group: true,
        versionDropdown: true,
        versions: {
          includes: ['v3.11'],
        },
        items: [
          {
            label: 'Overview',
            contentSite: 'cpp-driver',
            url: '/docs/languages/cpp/cpp-driver/:version/',
          },
          {
            label: 'Get Started',
            contentSite: 'cpp-driver',
            url: '/docs/languages/cpp/cpp-driver/:version/get-started',
          },
          {
            label: 'Connect to MongoDB',
            contentSite: 'cpp-driver',
            collapsible: true,
            url: '/docs/languages/cpp/cpp-driver/:version/connect',
            items: [
              {
                label: 'Create a Driver Instance',
                contentSite: 'cpp-driver',
                url: '/docs/languages/cpp/cpp-driver/:version/connect/instance',
              },
              {
                label: 'Create a MongoDB Client',
                contentSite: 'cpp-driver',
                url: '/docs/languages/cpp/cpp-driver/:version/connect/client',
              },
              {
                label: 'Choose a Connection Target',
                contentSite: 'cpp-driver',
                url: '/docs/languages/cpp/cpp-driver/:version/connect/connection-targets',
              },
              {
                label: 'Specify Connection Options',
                contentSite: 'cpp-driver',
                url: '/docs/languages/cpp/cpp-driver/:version/connect/connection-options',
              },
              {
                label: 'Configure TLS',
                contentSite: 'cpp-driver',
                url: '/docs/languages/cpp/cpp-driver/:version/connect/tls',
              },
              {
                label: 'Compress Network Traffic',
                contentSite: 'cpp-driver',
                url: '/docs/languages/cpp/cpp-driver/:version/connect/network-compression',
              },
              {
                label: 'Stable API',
                contentSite: 'cpp-driver',
                url: '/docs/languages/cpp/cpp-driver/:version/connect/stable-api',
              },
              {
                label: 'Connection Pools',
                contentSite: 'cpp-driver',
                url: '/docs/languages/cpp/cpp-driver/:version/connect/connection-pools',
              },
              {
                label: 'AWS Lambda',
                contentSite: 'cloud-docs',
                url: 'https://www.mongodb.com/docs/atlas/manage-connections-aws-lambda',
              },
            ],
          },
          {
            label: 'Read Data',
            contentSite: 'cpp-driver',
            collapsible: true,
            url: '/docs/languages/cpp/cpp-driver/:version/read',
            items: [
              {
                label: 'Retrieve Data',
                contentSite: 'cpp-driver',
                url: '/docs/languages/cpp/cpp-driver/:version/read/retrieve',
              },
              {
                label: 'Specify a Query',
                contentSite: 'cpp-driver',
                url: '/docs/languages/cpp/cpp-driver/:version/read/specify-a-query',
              },
              {
                label: 'Specify Documents to Return',
                contentSite: 'cpp-driver',
                url: '/docs/languages/cpp/cpp-driver/:version/read/specify-documents-to-return',
              },
              {
                label: 'Specify Fields to Return',
                contentSite: 'cpp-driver',
                url: '/docs/languages/cpp/cpp-driver/:version/read/project',
              },
              {
                label: 'Distinct Field Values',
                contentSite: 'cpp-driver',
                url: '/docs/languages/cpp/cpp-driver/:version/read/distinct',
              },
              {
                label: 'Count Documents',
                contentSite: 'cpp-driver',
                url: '/docs/languages/cpp/cpp-driver/:version/read/count',
              },
              {
                label: 'Cursors',
                contentSite: 'cpp-driver',
                url: '/docs/languages/cpp/cpp-driver/:version/read/cursor',
              },
              {
                label: 'Monitor Changes',
                contentSite: 'cpp-driver',
                url: '/docs/languages/cpp/cpp-driver/:version/read/change-streams',
              },
            ],
          },
          {
            label: 'Write Data',
            contentSite: 'cpp-driver',
            collapsible: true,
            url: '/docs/languages/cpp/cpp-driver/:version/write',
            items: [
              {
                label: 'Insert',
                contentSite: 'cpp-driver',
                url: '/docs/languages/cpp/cpp-driver/:version/write/insert',
              },
              {
                label: 'Update',
                contentSite: 'cpp-driver',
                url: '/docs/languages/cpp/cpp-driver/:version/write/update',
              },
              {
                label: 'Replace',
                contentSite: 'cpp-driver',
                url: '/docs/languages/cpp/cpp-driver/:version/write/replace',
              },
              {
                label: 'Delete',
                contentSite: 'cpp-driver',
                url: '/docs/languages/cpp/cpp-driver/:version/write/delete',
              },
              {
                label: 'Bulk Write',
                contentSite: 'cpp-driver',
                url: '/docs/languages/cpp/cpp-driver/:version/write/bulk-write',
              },
              {
                label: 'GridFS',
                contentSite: 'cpp-driver',
                url: '/docs/languages/cpp/cpp-driver/:version/write/gridfs',
              },
              {
                label: 'Transactions',
                contentSite: 'cpp-driver',
                url: '/docs/languages/cpp/cpp-driver/:version/write/transactions',
              },
            ],
          },
          {
            label: 'Databases & Collections',
            contentSite: 'cpp-driver',
            url: '/docs/languages/cpp/cpp-driver/:version/databases-collections',
          },
          {
            label: 'Indexes',
            contentSite: 'cpp-driver',
            collapsible: true,
            url: '/docs/languages/cpp/cpp-driver/:version/indexes',
            items: [
              {
                label: 'Single Field Indexes',
                contentSite: 'cpp-driver',
                url: '/docs/languages/cpp/cpp-driver/:version/indexes/single-field-index',
              },
              {
                label: 'Compound Indexes',
                contentSite: 'cpp-driver',
                url: '/docs/languages/cpp/cpp-driver/:version/indexes/compound-index',
              },
              {
                label: 'MongoDB Search Indexes',
                contentSite: 'cpp-driver',
                url: '/docs/languages/cpp/cpp-driver/:version/indexes/atlas-search-index',
              },
            ],
          },
          {
            label: 'Aggregation',
            contentSite: 'cpp-driver',
            url: '/docs/languages/cpp/cpp-driver/:version/aggregation',
          },
          {
            label: 'Run a Command',
            contentSite: 'cpp-driver',
            url: '/docs/languages/cpp/cpp-driver/:version/run-command',
          },
          {
            label: 'Security',
            contentSite: 'cpp-driver',
            collapsible: true,
            url: '/docs/languages/cpp/cpp-driver/:version/security',
            items: [
              {
                label: 'Authentication',
                contentSite: 'cpp-driver',
                url: '/docs/languages/cpp/cpp-driver/:version/security/authentication',
              },
              {
                label: 'Enterprise Authentication',
                contentSite: 'cpp-driver',
                url: '/docs/languages/cpp/cpp-driver/:version/security/enterprise-authentication',
              },
              {
                label: 'In-Use Encryption',
                contentSite: 'cpp-driver',
                url: '/docs/languages/cpp/cpp-driver/:version/security/in-use-encryption',
              },
            ],
          },
          {
            label: 'Specialized Data Formats',
            contentSite: 'cpp-driver',
            collapsible: true,
            items: [
              {
                label: 'Time Series Data',
                contentSite: 'cpp-driver',
                url: '/docs/languages/cpp/cpp-driver/:version/data-formats/time-series',
              },
              {
                label: 'BSON',
                contentSite: 'cpp-driver',
                url: '/docs/languages/cpp/cpp-driver/:version/data-formats/working-with-bson',
              },
            ],
          },
          {
            label: 'Advanced Configuration & Installation',
            contentSite: 'cpp-driver',
            url: '/docs/languages/cpp/cpp-driver/:version/advanced-installation',
          },
          {
            label: 'Include & Link the Driver',
            contentSite: 'cpp-driver',
            url: '/docs/languages/cpp/cpp-driver/:version/include-link',
            versions: {
              excludes: ['v4.0', 'v3.11'],
            },
          },
          {
            label: 'Thread & Fork Safety',
            contentSite: 'cpp-driver',
            url: '/docs/languages/cpp/cpp-driver/:version/thread-safety',
          },
          {
            label: 'API & ABI Versioning',
            contentSite: 'cpp-driver',
            collapsible: true,
            url: '/docs/languages/cpp/cpp-driver/:version/api-abi-versioning',
            items: [
              {
                label: 'API Versioning',
                contentSite: 'cpp-driver',
                url: '/docs/languages/cpp/cpp-driver/:version/api-abi-versioning/api-versioning',
              },
              {
                label: 'ABI Versioning',
                contentSite: 'cpp-driver',
                url: '/docs/languages/cpp/cpp-driver/:version/api-abi-versioning/abi-versioning',
              },
            ],
          },
          {
            label: 'What\'s New',
            contentSite: 'cpp-driver',
            url: '/docs/languages/cpp/cpp-driver/:version/whats-new',
          },
          {
            label: 'Upgrade',
            contentSite: 'cpp-driver',
            url: '/docs/languages/cpp/cpp-driver/:version/upgrade',
          },
          {
            label: 'Testing',
            contentSite: 'cpp-driver',
            url: '/docs/languages/cpp/cpp-driver/:version/testing',
          },
          {
            label: 'Compatibility',
            contentSite: 'drivers',
            url: '/docs/drivers/compatibility/?driver-language=cpp',
          },
          {
            label: 'Issues & Help',
            contentSite: 'cpp-driver',
            url: '/docs/languages/cpp/cpp-driver/:version/issues-and-help',
          },
          {
            label: 'API Documentation',
            isExternal: true,
            url: 'https://mongocxx.org/api/mongocxx-4.1.1',
          },
          {
            label: 'Driver Source',
            isExternal: true,
            url: 'https://github.com/mongodb/mongo-cxx-driver',
          },
        ],
      },
      {
        label: 'C++ Driver',
        contentSite: 'cpp-driver',
        group: true,
        versionDropdown: true,
        versions: {
          includes: ['v3.10'],
        },
        items: [
          {
            label: 'Overview',
            contentSite: 'cpp-driver',
            url: '/docs/languages/cpp/cpp-driver/:version/',
          },
          {
            label: 'C++17 Polyfill',
            contentSite: 'cpp-driver',
            url: '/docs/languages/cpp/cpp-driver/:version/polyfill-selection',
          },
          {
            label: 'Installation',
            contentSite: 'cpp-driver',
            collapsible: true,
            url: '/docs/languages/cpp/cpp-driver/:version/installation',
            items: [
              {
                label: 'Windows',
                contentSite: 'cpp-driver',
                url: '/docs/languages/cpp/cpp-driver/:version/installation/windows',
              },
              {
                label: 'MacOS',
                contentSite: 'cpp-driver',
                url: '/docs/languages/cpp/cpp-driver/:version/installation/macos',
              },
              {
                label: 'Linux',
                contentSite: 'cpp-driver',
                url: '/docs/languages/cpp/cpp-driver/:version/installation/linux',
              },
              {
                label: 'Advanced',
                contentSite: 'cpp-driver',
                url: '/docs/languages/cpp/cpp-driver/:version/installation/advanced',
              },
            ],
          },
          {
            label: 'Configuration',
            contentSite: 'cpp-driver',
            url: '/docs/languages/cpp/cpp-driver/:version/configuration',
          },
          {
            label: 'Client-Side Encryption',
            contentSite: 'cpp-driver',
            url: '/docs/languages/cpp/cpp-driver/:version/client-side-encryption',
          },
          {
            label: 'Tutorial',
            contentSite: 'cpp-driver',
            url: '/docs/languages/cpp/cpp-driver/:version/tutorial',
          },
          {
            label: 'Thread Safety',
            contentSite: 'cpp-driver',
            url: '/docs/languages/cpp/cpp-driver/:version/thread-safety',
          },
          {
            label: 'Connection Pools',
            contentSite: 'cpp-driver',
            url: '/docs/languages/cpp/cpp-driver/:version/connection-pools',
          },
          {
            label: 'BSON',
            contentSite: 'cpp-driver',
            url: '/docs/languages/cpp/cpp-driver/:version/working-with-bson',
          },
          {
            label: 'API & ABI Versioning',
            contentSite: 'cpp-driver',
            collapsible: true,
            url: '/docs/languages/cpp/cpp-driver/:version/api-abi-versioning',
            items: [
              {
                label: 'API Versioning',
                contentSite: 'cpp-driver',
                url: '/docs/languages/cpp/cpp-driver/:version/api-abi-versioning/api-versioning',
              },
              {
                label: 'ABI Versioning',
                contentSite: 'cpp-driver',
                url: '/docs/languages/cpp/cpp-driver/:version/api-abi-versioning/abi-versioning',
              },
            ],
          },
          {
            label: 'Reporting Bugs',
            contentSite: 'cpp-driver',
            url: '/docs/languages/cpp/cpp-driver/:version/reporting-bugs',
          },
          {
            label: 'Testing',
            contentSite: 'cpp-driver',
            url: '/docs/languages/cpp/cpp-driver/:version/testing',
          },
          {
            label: 'Contributing',
            contentSite: 'cpp-driver',
            url: '/docs/languages/cpp/cpp-driver/:version/contributing',
          },
          {
            label: 'Getting Help',
            contentSite: 'cpp-driver',
            url: '/docs/languages/cpp/cpp-driver/:version/getting-help',
          },
          {
            label: 'API Documentation',
            contentSite: 'cpp-driver',
            url: 'https://mongocxx.org/api/current/',
          },
          {
            label: 'Driver Source',
            contentSite: 'cpp-driver',
            url: 'https://github.com/mongodb/mongo-cxx-driver',
          },
        ],
      },
    ],
  },
];
