import type { L1TocItem } from '../types';

export const toc: L1TocItem[] = [
  {
    label: 'Rust Driver',
    contentSite: 'rust',
    url: '/docs/drivers/rust/current/',
    items: [
      {
        label: 'Rust Driver',
        contentSite: 'rust',
        group: true,
        versionDropdown: true,
        versions: {
          includes: ['upcoming'],
        },
        items: [
          {
            label: 'Overview',
            contentSite: 'rust',
            url: '/docs/drivers/rust/:version/',
          },
          {
            label: 'Get Started',
            contentSite: 'rust',
            url: '/docs/drivers/rust/:version/get-started/',
          },
          {
            label: 'Connect',
            contentSite: 'rust',
            collapsible: true,
            items: [
              {
                label: 'Create a MongoDB Client',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/connect/mongodb-client/',
              },
              {
                label: 'Choose a Connection Target',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/connect/connection-target/',
              },
              {
                label: 'Connection Options',
                contentSite: 'rust',
                collapsible: true,
                url: '/docs/drivers/rust/:version/connect/connection-options/',
                items: [
                  {
                    label: 'Compress Network Traffic',
                    contentSite: 'rust',
                    url: '/docs/drivers/rust/:version/connect/connection-options/network-compression/',
                  },
                  {
                    label: 'Customize Server Selection',
                    contentSite: 'rust',
                    url: '/docs/drivers/rust/:version/connect/connection-options/server-selection/',
                  },
                  {
                    label: 'Stable API',
                    contentSite: 'rust',
                    url: '/docs/drivers/rust/:version/connect/connection-options/stable-api/',
                  },
                  {
                    label: 'Connection Pools',
                    contentSite: 'rust',
                    url: '/docs/drivers/rust/:version/connect/connection-options/connection-pools/',
                  },
                ],
              },
              {
                label: 'Peformance Considerations',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/connect/performance/',
              },
              {
                label: 'Connection Troubleshooting',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/connect/connection-troubleshooting/',
              },
              {
                label: 'AWS Lambda',
                contentSite: 'rust',
                url: 'https://www.mongodb.com/docs/atlas/manage-connections-aws-lambda/',
              },
            ],
          },
          {
            label: 'Databases & Collections',
            contentSite: 'rust',
            url: '/docs/drivers/rust/:version/database-collection/',
          },
          {
            label: 'CRUD Operations',
            contentSite: 'rust',
            collapsible: true,
            url: '/docs/drivers/rust/:version/crud/',
            items: [
              {
                label: 'Insert Documents',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/crud/insert/',
              },
              {
                label: 'Query Documents',
                contentSite: 'rust',
                collapsible: true,
                items: [
                  {
                    label: 'Specify a Query',
                    contentSite: 'rust',
                    url: '/docs/drivers/rust/:version/crud/query/specify-query/',
                  },
                  {
                    label: 'Find Documents',
                    contentSite: 'rust',
                    url: '/docs/drivers/rust/:version/crud/query/retrieve/',
                  },
                  {
                    label: 'Specify Documents to Return',
                    contentSite: 'rust',
                    url: '/docs/drivers/rust/:version/crud/query/specify-documents/',
                  },
                  {
                    label: 'Specify Fields to Return',
                    contentSite: 'rust',
                    url: '/docs/drivers/rust/:version/crud/query/specify-fields/',
                  },
                  {
                    label: 'Count Documents',
                    contentSite: 'rust',
                    url: '/docs/drivers/rust/:version/crud/query/count/',
                  },
                  {
                    label: 'Distinct Field Values',
                    contentSite: 'rust',
                    url: '/docs/drivers/rust/:version/crud/query/distinct/',
                  },
                  {
                    label: 'Query Text',
                    contentSite: 'rust',
                    url: '/docs/drivers/rust/:version/crud/query/text-search/',
                  },
                  {
                    label: 'Access Data from a Cursor',
                    contentSite: 'rust',
                    url: '/docs/drivers/rust/:version/crud/query/cursor/',
                  },
                  {
                    label: 'Geospatial Queries',
                    contentSite: 'rust',
                    url: '/docs/drivers/rust/:version/crud/query/geo/',
                  },
                ],
              },
              {
                label: 'Update Documents',
                contentSite: 'rust',
                collapsible: true,
                url: '/docs/drivers/rust/:version/crud/update/',
                items: [
                  {
                    label: 'Replace Documents',
                    contentSite: 'rust',
                    url: '/docs/drivers/rust/:version/crud/update/replace/',
                  },
                  {
                    label: 'Update Arrays',
                    contentSite: 'rust',
                    url: '/docs/drivers/rust/:version/crud/update/embedded-arrays/',
                  },
                ],
              },
              {
                label: 'Delete Documents',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/crud/delete/',
              },
              {
                label: 'Bulk Write Operations',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/crud/bulk/',
              },
              {
                label: 'Transactions',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/crud/transactions/',
              },
              {
                label: 'Compound Operations',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/crud/compound-operations/',
              },
              {
                label: 'Configure CRUD Operations',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/crud/configure/',
              },
              {
                label: 'Store Large Files',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/crud/gridfs/',
              },
              {
                label: 'Tutorial: CRUD Web Application',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/crud/web-app-tutorial/',
              },
            ],
          },
          {
            label: 'Schema Validation',
            contentSite: 'rust',
            url: '/docs/drivers/rust/:version/schema-validation/',
          },
          {
            label: 'Aggregation',
            contentSite: 'rust',
            collapsible: true,
            url: '/docs/drivers/rust/:version/aggregation/',
            items: [
              {
                label: 'Collations',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/aggregation/collations/',
              },
            ],
          },
          {
            label: 'Data Formats',
            contentSite: 'rust',
            collapsible: true,
            items: [
              {
                label: 'BSON',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/data-formats/bson/',
              },
              {
                label: 'Serialization',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/data-formats/serialization/',
              },
              {
                label: 'Time Series',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/data-formats/time-series/',
              },
              {
                label: 'Bounds and Bounds Errors',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/data-formats/bounds/',
              },
              {
                label: 'Result and Option Enums',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/data-formats/result-option/',
              },
            ],
          },
          {
            label: 'Indexes',
            contentSite: 'rust',
            collapsible: true,
            url: '/docs/drivers/rust/:version/indexes/',
            items: [
              {
                label: 'MongoDB Search & Vector Search Indexes',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/indexes/atlas-search-indexes/',
              },
            ],
          },
          {
            label: 'Run a Database Command',
            contentSite: 'rust',
            url: '/docs/drivers/rust/:version/run-command/',
          },
          {
            label: 'Async and Sync APIs',
            contentSite: 'rust',
            url: '/docs/drivers/rust/:version/runtimes/',
          },
          {
            label: 'MongoDB Search',
            contentSite: 'rust',
            url: '/docs/drivers/rust/:version/atlas-search/',
          },
          {
            label: 'MongoDB Vector Search',
            contentSite: 'rust',
            url: '/docs/drivers/rust/:version/vector-search/',
          },
          {
            label: 'Logging and Monitoring',
            contentSite: 'rust',
            collapsible: true,
            items: [
              {
                label: 'Monitoring',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/monitoring-logging/monitoring/',
              },
              {
                label: 'Tracing and Logging',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/monitoring-logging/tracing-logging/',
              },
              {
                label: 'Change Streams',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/monitoring-logging/change-streams/',
              },
            ],
          },
          {
            label: 'Security',
            contentSite: 'rust',
            collapsible: true,
            items: [
              {
                label: 'Authentication',
                contentSite: 'rust',
                collapsible: true,
                url: '/docs/drivers/rust/:version/security/authentication/',
                items: [
                  {
                    label: 'SCRAM',
                    contentSite: 'rust',
                    url: '/docs/drivers/rust/:version/security/authentication/scram/',
                  },
                  {
                    label: 'X.509',
                    contentSite: 'rust',
                    url: '/docs/drivers/rust/:version/security/authentication/x509/',
                  },
                  {
                    label: 'AWS IAM',
                    contentSite: 'rust',
                    url: '/docs/drivers/rust/:version/security/authentication/aws-iam/',
                  },
                  {
                    label: 'OIDC',
                    contentSite: 'rust',
                    url: '/docs/drivers/rust/:version/security/authentication/oidc/',
                  },
                  {
                    label: 'LDAP (PLAIN)',
                    contentSite: 'rust',
                    url: '/docs/drivers/rust/:version/security/authentication/ldap/',
                  },
                  {
                    label: 'Kerberos (GSSAPI)',
                    contentSite: 'rust',
                    url: '/docs/drivers/rust/:version/security/authentication/kerberos/',
                  },
                ],
              },
              {
                label: 'In-Use Encryption',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/security/in-use-encryption/',
              },
              {
                label: 'TLS/SSL Configuration',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/security/tls/',
              },
            ],
          },
          {
            label: 'Third-Party Integrations',
            contentSite: 'rust',
            url: '/docs/drivers/rust/:version/integrations/',
          },
          {
            label: 'Reference',
            contentSite: 'rust',
            collapsible: true,
            items: [
              {
                label: 'Release Notes',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/reference/release-notes/',
              },
              {
                label: 'Compatibility',
                contentSite: 'drivers',
                url: '/docs/drivers/compatibility/?driver-language=rust',
              },
              {
                label: 'Upgrade Versions',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/reference/upgrade/',
              },
              {
                label: 'Quick Reference',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/reference/quick-reference/',
              },
              {
                label: 'View the Source',
                contentSite: 'rust',
                collapsible: true,
                items: [
                  {
                    label: 'MongoDB Rust Driver',
                    isExternal: true,
                    url: 'https://github.com/mongodb/mongo-rust-driver',
                  },
                  {
                    label: 'BSON Crate',
                    isExternal: true,
                    url: 'https://github.com/mongodb/bson-rust',
                  },
                ],
              },
            ],
          },
          {
            label: 'Operation Error Handling',
            contentSite: 'rust',
            url: '/docs/drivers/rust/:version/op-error-handling/',
          },
          {
            label: 'API Documentation',
            contentSite: 'rust',
            collapsible: true,
            items: [
              {
                label: 'MongoDB Rust Driver',
                isExternal: true,
                url: 'https://docs.rs/mongodb/3.5.0/mongodb/index.html',
              },
              {
                label: 'BSON Crate',
                isExternal: true,
                url: 'https://docs.rs/bson/3.1.0/bson/index.html',
              },
            ],
          },
          {
            label: 'Issues & Help',
            contentSite: 'rust',
            url: '/docs/drivers/rust/:version/issues-and-help/',
          },
        ],
      },
      {
        label: 'Rust Driver',
        contentSite: 'rust',
        group: true,
        versionDropdown: true,
        versions: {
          includes: ['current'],
        },
        items: [
          {
            label: 'Overview',
            contentSite: 'rust',
            url: '/docs/drivers/rust/:version/',
          },
          {
            label: 'Get Started',
            contentSite: 'rust',
            url: '/docs/drivers/rust/:version/get-started/',
          },
          {
            label: 'Connect',
            contentSite: 'rust',
            collapsible: true,
            items: [
              {
                label: 'Create a MongoDB Client',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/connect/mongodb-client/',
              },
              {
                label: 'Choose a Connection Target',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/connect/connection-target/',
              },
              {
                label: 'Connection Options',
                contentSite: 'rust',
                collapsible: true,
                url: '/docs/drivers/rust/:version/connect/connection-options/',
                items: [
                  {
                    label: 'Compress Network Traffic',
                    contentSite: 'rust',
                    url: '/docs/drivers/rust/:version/connect/connection-options/network-compression/',
                  },
                  {
                    label: 'Customize Server Selection',
                    contentSite: 'rust',
                    url: '/docs/drivers/rust/:version/connect/connection-options/server-selection/',
                  },
                  {
                    label: 'Stable API',
                    contentSite: 'rust',
                    url: '/docs/drivers/rust/:version/connect/connection-options/stable-api/',
                  },
                  {
                    label: 'Connection Pools',
                    contentSite: 'rust',
                    url: '/docs/drivers/rust/:version/connect/connection-options/connection-pools/',
                  },
                ],
              },
              {
                label: 'Peformance Considerations',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/connect/performance/',
              },
              {
                label: 'Connection Troubleshooting',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/connect/connection-troubleshooting/',
              },
              {
                label: 'AWS Lambda',
                contentSite: 'rust',
                url: 'https://www.mongodb.com/docs/atlas/manage-connections-aws-lambda/',
              },
            ],
          },
          {
            label: 'Databases & Collections',
            contentSite: 'rust',
            url: '/docs/drivers/rust/:version/database-collection/',
          },
          {
            label: 'CRUD Operations',
            contentSite: 'rust',
            collapsible: true,
            url: '/docs/drivers/rust/:version/crud/',
            items: [
              {
                label: 'Insert Documents',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/crud/insert/',
              },
              {
                label: 'Query Documents',
                contentSite: 'rust',
                collapsible: true,
                items: [
                  {
                    label: 'Specify a Query',
                    contentSite: 'rust',
                    url: '/docs/drivers/rust/:version/crud/query/specify-query/',
                  },
                  {
                    label: 'Find Documents',
                    contentSite: 'rust',
                    url: '/docs/drivers/rust/:version/crud/query/retrieve/',
                  },
                  {
                    label: 'Specify Documents to Return',
                    contentSite: 'rust',
                    url: '/docs/drivers/rust/:version/crud/query/specify-documents/',
                  },
                  {
                    label: 'Specify Fields to Return',
                    contentSite: 'rust',
                    url: '/docs/drivers/rust/:version/crud/query/specify-fields/',
                  },
                  {
                    label: 'Count Documents',
                    contentSite: 'rust',
                    url: '/docs/drivers/rust/:version/crud/query/count/',
                  },
                  {
                    label: 'Distinct Field Values',
                    contentSite: 'rust',
                    url: '/docs/drivers/rust/:version/crud/query/distinct/',
                  },
                  {
                    label: 'Query Text',
                    contentSite: 'rust',
                    url: '/docs/drivers/rust/:version/crud/query/text-search/',
                  },
                  {
                    label: 'Access Data from a Cursor',
                    contentSite: 'rust',
                    url: '/docs/drivers/rust/:version/crud/query/cursor/',
                  },
                  {
                    label: 'Geospatial Queries',
                    contentSite: 'rust',
                    url: '/docs/drivers/rust/:version/crud/query/geo/',
                  },
                ],
              },
              {
                label: 'Update Documents',
                contentSite: 'rust',
                collapsible: true,
                url: '/docs/drivers/rust/:version/crud/update/',
                items: [
                  {
                    label: 'Replace Documents',
                    contentSite: 'rust',
                    url: '/docs/drivers/rust/:version/crud/update/replace/',
                  },
                  {
                    label: 'Update Arrays',
                    contentSite: 'rust',
                    url: '/docs/drivers/rust/:version/crud/update/embedded-arrays/',
                  },
                ],
              },
              {
                label: 'Delete Documents',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/crud/delete/',
              },
              {
                label: 'Bulk Write Operations',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/crud/bulk/',
              },
              {
                label: 'Transactions',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/crud/transactions/',
              },
              {
                label: 'Compound Operations',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/crud/compound-operations/',
              },
              {
                label: 'Configure CRUD Operations',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/crud/configure/',
              },
              {
                label: 'Store Large Files',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/crud/gridfs/',
              },
              {
                label: 'Tutorial: CRUD Web Application',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/crud/web-app-tutorial/',
              },
            ],
          },
          {
            label: 'Schema Validation',
            contentSite: 'rust',
            url: '/docs/drivers/rust/:version/schema-validation/',
          },
          {
            label: 'Aggregation',
            contentSite: 'rust',
            collapsible: true,
            url: '/docs/drivers/rust/:version/aggregation/',
            items: [
              {
                label: 'Collations',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/aggregation/collations/',
              },
            ],
          },
          {
            label: 'Data Formats',
            contentSite: 'rust',
            collapsible: true,
            items: [
              {
                label: 'BSON',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/data-formats/bson/',
              },
              {
                label: 'Serialization',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/data-formats/serialization/',
              },
              {
                label: 'Time Series',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/data-formats/time-series/',
              },
              {
                label: 'Bounds and Bounds Errors',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/data-formats/bounds/',
              },
              {
                label: 'Result and Option Enums',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/data-formats/result-option/',
              },
            ],
          },
          {
            label: 'Indexes',
            contentSite: 'rust',
            collapsible: true,
            url: '/docs/drivers/rust/:version/indexes/',
            items: [
              {
                label: 'MongoDB Search & Vector Search Indexes',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/indexes/atlas-search-indexes/',
              },
            ],
          },
          {
            label: 'Run a Database Command',
            contentSite: 'rust',
            url: '/docs/drivers/rust/:version/run-command/',
          },
          {
            label: 'Async and Sync APIs',
            contentSite: 'rust',
            url: '/docs/drivers/rust/:version/runtimes/',
          },
          {
            label: 'MongoDB Search',
            contentSite: 'rust',
            url: '/docs/drivers/rust/:version/atlas-search/',
          },
          {
            label: 'MongoDB Vector Search',
            contentSite: 'rust',
            url: '/docs/drivers/rust/:version/vector-search/',
          },
          {
            label: 'Logging and Monitoring',
            contentSite: 'rust',
            collapsible: true,
            items: [
              {
                label: 'Monitoring',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/monitoring-logging/monitoring/',
              },
              {
                label: 'Tracing and Logging',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/monitoring-logging/tracing-logging/',
              },
              {
                label: 'Change Streams',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/monitoring-logging/change-streams/',
              },
            ],
          },
          {
            label: 'Security',
            contentSite: 'rust',
            collapsible: true,
            items: [
              {
                label: 'Authentication',
                contentSite: 'rust',
                collapsible: true,
                url: '/docs/drivers/rust/:version/security/authentication/',
                items: [
                  {
                    label: 'SCRAM',
                    contentSite: 'rust',
                    url: '/docs/drivers/rust/:version/security/authentication/scram/',
                  },
                  {
                    label: 'X.509',
                    contentSite: 'rust',
                    url: '/docs/drivers/rust/:version/security/authentication/x509/',
                  },
                  {
                    label: 'AWS IAM',
                    contentSite: 'rust',
                    url: '/docs/drivers/rust/:version/security/authentication/aws-iam/',
                  },
                  {
                    label: 'OIDC',
                    contentSite: 'rust',
                    url: '/docs/drivers/rust/:version/security/authentication/oidc/',
                  },
                  {
                    label: 'LDAP (PLAIN)',
                    contentSite: 'rust',
                    url: '/docs/drivers/rust/:version/security/authentication/ldap/',
                  },
                  {
                    label: 'Kerberos (GSSAPI)',
                    contentSite: 'rust',
                    url: '/docs/drivers/rust/:version/security/authentication/kerberos/',
                  },
                ],
              },
              {
                label: 'In-Use Encryption',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/security/in-use-encryption/',
              },
              {
                label: 'TLS/SSL Configuration',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/security/tls/',
              },
            ],
          },
          {
            label: 'Third-Party Integrations',
            contentSite: 'rust',
            url: '/docs/drivers/rust/:version/integrations/',
          },
          {
            label: 'Reference',
            contentSite: 'rust',
            collapsible: true,
            items: [
              {
                label: 'Release Notes',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/reference/release-notes/',
              },
              {
                label: 'Compatibility',
                contentSite: 'drivers',
                url: '/docs/drivers/compatibility/?driver-language=rust',
              },
              {
                label: 'Upgrade Versions',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/reference/upgrade/',
              },
              {
                label: 'Quick Reference',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/reference/quick-reference/',
              },
              {
                label: 'View the Source',
                contentSite: 'rust',
                collapsible: true,
                items: [
                  {
                    label: 'MongoDB Rust Driver',
                    isExternal: true,
                    url: 'https://github.com/mongodb/mongo-rust-driver',
                  },
                  {
                    label: 'BSON Crate',
                    isExternal: true,
                    url: 'https://github.com/mongodb/bson-rust',
                  },
                ],
              },
            ],
          },
          {
            label: 'Operation Error Handling',
            contentSite: 'rust',
            url: '/docs/drivers/rust/:version/op-error-handling/',
          },
          {
            label: 'API Documentation',
            contentSite: 'rust',
            collapsible: true,
            items: [
              {
                label: 'MongoDB Rust Driver',
                isExternal: true,
                url: 'https://docs.rs/mongodb/3.6.0/mongodb/index.html',
              },
              {
                label: 'BSON Crate',
                isExternal: true,
                url: 'https://docs.rs/bson/3.1.0/bson/index.html',
              },
            ],
          },
          {
            label: 'Issues & Help',
            contentSite: 'rust',
            url: '/docs/drivers/rust/:version/issues-and-help/',
          },
        ],
      },
      {
        label: 'Rust Driver',
        contentSite: 'rust',
        group: true,
        versionDropdown: true,
        versions: {
          includes: ['v2.x'],
        },
        items: [
          {
            label: 'Overview',
            contentSite: 'rust',
            url: '/docs/drivers/rust/:version/',
          },
          {
            label: 'Quick Start',
            contentSite: 'rust',
            collapsible: true,
            url: '/docs/drivers/rust/:version/quick-start',
            items: [
              {
                label: 'Download & Install',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/quick-start/download-and-install',
              },
              {
                label: 'Create a Deployment',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/quick-start/create-a-deployment',
              },
              {
                label: 'Create a Connection String',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/quick-start/create-a-connection-string',
              },
              {
                label: 'Connect',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/quick-start/connect-to-mongodb',
              },
              {
                label: 'Next Steps',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/quick-start/next-steps',
              },
            ],
          },
          {
            label: 'Quick Reference',
            contentSite: 'rust',
            url: '/docs/drivers/rust/:version/quick-reference',
          },
          {
            label: 'What\'s New',
            contentSite: 'rust',
            url: '/docs/drivers/rust/:version/whats-new',
          },
          {
            label: 'CRUD Examples',
            contentSite: 'rust',
            collapsible: true,
            url: '/docs/drivers/rust/:version/usage-examples',
            items: [
              {
                label: 'Find One',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/usage-examples/findOne',
              },
              {
                label: 'Find Multiple',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/usage-examples/find',
              },
              {
                label: 'Insert One',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/usage-examples/insertOne',
              },
              {
                label: 'Insert Multiple',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/usage-examples/insertMany',
              },
              {
                label: 'Update One',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/usage-examples/updateOne',
              },
              {
                label: 'Update Multiple',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/usage-examples/updateMany',
              },
              {
                label: 'Replace One',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/usage-examples/replace',
              },
              {
                label: 'Delete One',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/usage-examples/deleteOne',
              },
              {
                label: 'Delete Multiple',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/usage-examples/deleteMany',
              },
              {
                label: 'Count',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/usage-examples/count',
              },
              {
                label: 'List Distinct Values',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/usage-examples/distinct',
              },
            ],
          },
          {
            label: 'Fundamentals',
            contentSite: 'rust',
            collapsible: true,
            items: [
              {
                label: 'Connections',
                contentSite: 'rust',
                collapsible: true,
                items: [
                  {
                    label: 'Connection Guide',
                    contentSite: 'rust',
                    url: '/docs/drivers/rust/:version/fundamentals/connections/connection-guide',
                  },
                  {
                    label: 'Connection Options',
                    contentSite: 'rust',
                    url: '/docs/drivers/rust/:version/fundamentals/connections/connection-options',
                  },
                  {
                    label: 'Network Compression',
                    contentSite: 'rust',
                    url: '/docs/drivers/rust/:version/fundamentals/connections/network-compression',
                  },
                  {
                    label: 'Enable & Configure TLS',
                    contentSite: 'rust',
                    url: '/docs/drivers/rust/:version/fundamentals/connections/tls',
                  },
                  {
                    label: 'AWS Lambda',
                    isExternal: true,
                    url: 'https://www.mongodb.com/docs/atlas/manage-connections-aws-lambda',
                  },
                ],
              },
              {
                label: 'Stable API',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/fundamentals/stable-api',
              },
              {
                label: 'Authentication',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/fundamentals/authentication',
              },
              {
                label: 'Enterprise Authentication',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/fundamentals/enterprise-auth',
              },
              {
                label: 'CRUD',
                contentSite: 'rust',
                collapsible: true,
                items: [
                  {
                    label: 'Read',
                    contentSite: 'rust',
                    collapsible: true,
                    items: [
                      {
                        label: 'Retrieve Data',
                        contentSite: 'rust',
                        url: '/docs/drivers/rust/:version/fundamentals/crud/read-operations/retrieve',
                      },
                      {
                        label: 'Specify a Query',
                        contentSite: 'rust',
                        url: '/docs/drivers/rust/:version/fundamentals/crud/read-operations/query',
                      },
                      {
                        label: 'Data Cursors',
                        contentSite: 'rust',
                        url: '/docs/drivers/rust/:version/fundamentals/crud/read-operations/cursor',
                      },
                      {
                        label: 'Open Change Streams',
                        contentSite: 'rust',
                        url: '/docs/drivers/rust/:version/fundamentals/crud/read-operations/change-streams',
                      },
                      {
                        label: 'Query Text',
                        contentSite: 'rust',
                        url: '/docs/drivers/rust/:version/fundamentals/crud/read-operations/text-search',
                      },
                      {
                        label: 'Sort Results',
                        contentSite: 'rust',
                        url: '/docs/drivers/rust/:version/fundamentals/crud/read-operations/sort',
                      },
                      {
                        label: 'Skip Results',
                        contentSite: 'rust',
                        url: '/docs/drivers/rust/:version/fundamentals/crud/read-operations/skip',
                      },
                      {
                        label: 'Limit Results',
                        contentSite: 'rust',
                        url: '/docs/drivers/rust/:version/fundamentals/crud/read-operations/limit',
                      },
                    ],
                  },
                  {
                    label: 'Write',
                    contentSite: 'rust',
                    collapsible: true,
                    items: [
                      {
                        label: 'Insert',
                        contentSite: 'rust',
                        url: '/docs/drivers/rust/:version/fundamentals/crud/write-operations/insert',
                      },
                      {
                        label: 'Modify',
                        contentSite: 'rust',
                        url: '/docs/drivers/rust/:version/fundamentals/crud/write-operations/change',
                      },
                      {
                        label: 'Delete',
                        contentSite: 'rust',
                        url: '/docs/drivers/rust/:version/fundamentals/crud/write-operations/delete',
                      },
                      {
                        label: 'Bulk Operations',
                        contentSite: 'rust',
                        url: '/docs/drivers/rust/:version/fundamentals/crud/write-operations/bulk',
                      },
                    ],
                  },
                  {
                    label: 'Compound Operations',
                    contentSite: 'rust',
                    url: '/docs/drivers/rust/:version/fundamentals/crud/compound-operations',
                  },
                ],
              },
              {
                label: 'Serialization',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/fundamentals/serialization',
              },
              {
                label: 'Databases & Collections',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/fundamentals/database-collection',
              },
              {
                label: 'Schema Validation',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/fundamentals/schema-validation',
              },
              {
                label: 'Aggregation',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/fundamentals/aggregation',
              },
              {
                label: 'Indexes',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/fundamentals/indexes',
              },
              {
                label: 'Transactions',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/fundamentals/transactions',
              },
              {
                label: 'Time Series Collections',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/fundamentals/time-series',
              },
              {
                label: 'Tracing & Logging',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/fundamentals/tracing-logging',
              },
              {
                label: 'Database Commands',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/fundamentals/run-command',
              },
              {
                label: 'Performance Considerations',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/fundamentals/performance',
              },
              {
                label: 'Async & Sync APIs',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/fundamentals/runtimes',
              },
              {
                label: 'Monitoring',
                contentSite: 'rust',
                collapsible: true,
                items: [
                  {
                    label: 'Cluster Monitoring',
                    contentSite: 'rust',
                    url: '/docs/drivers/rust/:version/fundamentals/monitoring/cluster-monitoring',
                  },
                  {
                    label: 'Command Monitoring',
                    contentSite: 'rust',
                    url: '/docs/drivers/rust/:version/fundamentals/monitoring/command-monitoring',
                  },
                  {
                    label: 'Connection Monitoring',
                    contentSite: 'rust',
                    url: '/docs/drivers/rust/:version/fundamentals/monitoring/connection-monitoring',
                  },
                ],
              },
              {
                label: 'Collations',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/fundamentals/collations',
              },
              {
                label: 'Search Geospatially',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/fundamentals/geo',
              },
              {
                label: 'GridFS',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/fundamentals/gridfs',
              },
            ],
          },
          {
            label: 'Third-Party Integrations',
            contentSite: 'rust',
            url: '/docs/drivers/rust/:version/integrations',
          },
          {
            label: 'API Documentation',
            contentSite: 'rust',
            collapsible: true,
            url: '/docs/drivers/rust/:version/api',
            items: [
              {
                label: 'MongoDB Rust Driver',
                isExternal: true,
                url: 'https://docs.rs/mongodb/latest/mongodb/index.html',
              },
              {
                label: 'BSON Crate',
                isExternal: true,
                url: 'https://docs.rs/bson/latest/bson/index.html',
              },
            ],
          },
          {
            label: 'FAQ',
            contentSite: 'rust',
            url: '/docs/drivers/rust/:version/faq',
          },
          {
            label: 'Connection Troubleshooting',
            contentSite: 'rust',
            url: '/docs/drivers/rust/:version/connection-troubleshooting',
          },
          {
            label: 'Operation Error Handling',
            contentSite: 'rust',
            url: '/docs/drivers/rust/:version/op-error-handling',
          },
          {
            label: 'Issues & Help',
            contentSite: 'rust',
            url: '/docs/drivers/rust/:version/issues-and-help',
          },
          {
            label: 'Compatibility',
            contentSite: 'drivers',
            url: '/docs/drivers/compatibility/?driver-language=rust',
          },
          {
            label: 'View the Source',
            contentSite: 'rust',
            collapsible: true,
            url: '/docs/drivers/rust/:version/view-source',
            items: [
              {
                label: 'MongoDB Rust Driver',
                isExternal: true,
                url: 'https://github.com/mongodb/mongo-rust-driver',
              },
              {
                label: 'BSON Crate',
                isExternal: true,
                url: 'https://github.com/mongodb/bson-rust',
              },
            ],
          },
        ],
      },
    ],
  },
];
