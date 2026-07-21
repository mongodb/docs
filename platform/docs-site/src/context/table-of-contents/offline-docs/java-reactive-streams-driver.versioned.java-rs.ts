import type { L1TocItem } from '../types';

export const toc: L1TocItem[] = [
  {
    label: 'Java Reactive Streams Driver',
    contentSite: 'java-rs',
    url: '/docs/languages/java/reactive-streams-driver/:version/',
    items: [
      {
        label: 'Java Reactive Streams Driver',
        contentSite: 'java-rs',
        group: true,
        versionDropdown: true,
        items: [
          {
            label: 'Overview',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/',
          },
          {
            label: 'Get Started',
            contentSite: 'java-rs',
            collapsible: true,
            url: '/docs/languages/java/reactive-streams-driver/:version/getting-started',
            items: [
              {
                label: 'Download & Install',
                contentSite: 'java-rs',
                url: '/docs/languages/java/reactive-streams-driver/:version/get-started/download-and-install',
              },
              {
                label: 'Create a Deployment',
                contentSite: 'java-rs',
                url: '/docs/languages/java/reactive-streams-driver/:version/get-started/create-a-deployment',
              },
              {
                label: 'Create a Connection String',
                contentSite: 'java-rs',
                url: '/docs/languages/java/reactive-streams-driver/:version/get-started/create-a-connection-string',
              },
              {
                label: 'Run a Sample Query',
                contentSite: 'java-rs',
                url: '/docs/languages/java/reactive-streams-driver/:version/get-started/run-sample-query',
              },
              {
                label: 'Next Steps',
                contentSite: 'java-rs',
                url: '/docs/languages/java/reactive-streams-driver/:version/get-started/next-steps',
              },
            ],
          },
          {
            label: 'Connect',
            contentSite: 'java-rs',
            collapsible: true,
            url: '/docs/languages/java/reactive-streams-driver/:version/connect',
            items: [
              {
                label: 'Create a MongoClient',
                contentSite: 'java-rs',
                url: '/docs/languages/java/reactive-streams-driver/:version/connect/create-a-mongo-client',
              },
              {
                label: 'Specify Connection Options',
                contentSite: 'java-rs',
                collapsible: true,
                items: [
                  {
                    label: 'Stable API',
                    contentSite: 'java-rs',
                    url: '/docs/languages/java/reactive-streams-driver/:version/connect/specify-connection-options/stable-api',
                  },
                  {
                    label: 'Limit Execution Time',
                    contentSite: 'java-rs',
                    url: '/docs/languages/java/reactive-streams-driver/:version/connect/specify-connection-options/csot',
                  },
                  {
                    label: 'Connection Pools',
                    contentSite: 'java-rs',
                    url: '/docs/languages/java/reactive-streams-driver/:version/connect/specify-connection-options/connection-pools',
                  },
                  {
                    label: 'Compress Network Traffic',
                    contentSite: 'java-rs',
                    url: '/docs/languages/java/reactive-streams-driver/:version/connect/specify-connection-options/network-compression',
                  },
                ],
              },
              {
                label: 'Choose a Connection Target',
                contentSite: 'java-rs',
                url: '/docs/languages/java/reactive-streams-driver/:version/connect/choose-connection-target',
              },
              {
                label: 'Connection URI Options',
                contentSite: 'java-rs',
                url: '/docs/languages/java/reactive-streams-driver/:version/connect/connection-options',
              },
            ],
          },
          {
            label: 'Databases & Collections',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/db-coll',
          },
          {
            label: 'CRUD Operations',
            contentSite: 'java-rs',
            collapsible: true,
            items: [
              {
                label: 'Insert Documents',
                contentSite: 'java-rs',
                url: '/docs/languages/java/reactive-streams-driver/:version/crud/insert-documents',
              },
              {
                label: 'Query Documents',
                contentSite: 'java-rs',
                collapsible: true,
                url: '/docs/languages/java/reactive-streams-driver/:version/crud/query-documents',
                items: [
                  {
                    label: 'Specify a Query',
                    contentSite: 'java-rs',
                    url: '/docs/languages/java/reactive-streams-driver/:version/crud/query-documents/specify-a-query',
                  },
                  {
                    label: 'Find Documents',
                    contentSite: 'java-rs',
                    url: '/docs/languages/java/reactive-streams-driver/:version/crud/query-documents/find',
                  },
                  {
                    label: 'Specify Documents to Return',
                    contentSite: 'java-rs',
                    url: '/docs/languages/java/reactive-streams-driver/:version/crud/query-documents/specify-documents-to-return',
                  },
                  {
                    label: 'Specify Fields to Return',
                    contentSite: 'java-rs',
                    url: '/docs/languages/java/reactive-streams-driver/:version/crud/query-documents/specify-fields-return',
                  },
                  {
                    label: 'Count Documents',
                    contentSite: 'java-rs',
                    url: '/docs/languages/java/reactive-streams-driver/:version/crud/query-documents/count-documents',
                  },
                  {
                    label: 'Retrieve Distinct Field Values',
                    contentSite: 'java-rs',
                    url: '/docs/languages/java/reactive-streams-driver/:version/crud/query-documents/distinct',
                  },
                  {
                    label: 'Data Cursors',
                    contentSite: 'java-rs',
                    url: '/docs/languages/java/reactive-streams-driver/:version/crud/query-documents/cursors',
                  },
                  {
                    label: 'Text Query',
                    contentSite: 'java-rs',
                    url: '/docs/languages/java/reactive-streams-driver/:version/crud/query-documents/text-search',
                  },
                  {
                    label: 'Geospatial Search',
                    contentSite: 'java-rs',
                    url: '/docs/languages/java/reactive-streams-driver/:version/crud/query-documents/geo',
                  },
                ],
              },
              {
                label: 'Update Documents',
                contentSite: 'java-rs',
                url: '/docs/languages/java/reactive-streams-driver/:version/crud/update-documents',
              },
              {
                label: 'Replace Documents',
                contentSite: 'java-rs',
                url: '/docs/languages/java/reactive-streams-driver/:version/crud/replace-documents',
              },
              {
                label: 'Delete Documents',
                contentSite: 'java-rs',
                url: '/docs/languages/java/reactive-streams-driver/:version/crud/delete-documents',
              },
              {
                label: 'Bulk Write Operations',
                contentSite: 'java-rs',
                url: '/docs/languages/java/reactive-streams-driver/:version/crud/bulk-writes',
              },
              {
                label: 'Transactions',
                contentSite: 'java-rs',
                url: '/docs/languages/java/reactive-streams-driver/:version/crud/transactions',
              },
              {
                label: 'Collations',
                contentSite: 'java-rs',
                url: '/docs/languages/java/reactive-streams-driver/:version/crud/collations',
              },
              {
                label: 'Configure CRUD Operations',
                contentSite: 'java-rs',
                url: '/docs/languages/java/reactive-streams-driver/:version/crud/configure-crud-operations',
              },
              {
                label: 'Store Large Files',
                contentSite: 'java-rs',
                url: '/docs/languages/java/reactive-streams-driver/:version/crud/store-large-docs',
              },
            ],
          },
          {
            label: 'Custom Subscribers',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/custom-implementations',
          },
          {
            label: 'Aggregation',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/aggregation',
          },
          {
            label: 'Builders',
            contentSite: 'java-rs',
            collapsible: true,
            url: '/docs/languages/java/reactive-streams-driver/:version/builders',
            items: [
              {
                label: 'Aggregation',
                contentSite: 'java-rs',
                url: '/docs/languages/java/reactive-streams-driver/:version/builders/aggregates',
              },
              {
                label: 'Filters',
                contentSite: 'java-rs',
                url: '/docs/languages/java/reactive-streams-driver/:version/builders/filters',
              },
              {
                label: 'Indexes',
                contentSite: 'java-rs',
                url: '/docs/languages/java/reactive-streams-driver/:version/builders/indexes',
              },
              {
                label: 'Projection',
                contentSite: 'java-rs',
                url: '/docs/languages/java/reactive-streams-driver/:version/builders/projections',
              },
              {
                label: 'Sort',
                contentSite: 'java-rs',
                url: '/docs/languages/java/reactive-streams-driver/:version/builders/sort',
              },
              {
                label: 'Update',
                contentSite: 'java-rs',
                url: '/docs/languages/java/reactive-streams-driver/:version/builders/updates',
              },
            ],
          },
          {
            label: 'Data Formats',
            contentSite: 'java-rs',
            collapsible: true,
            items: [
              {
                label: 'Time Series',
                contentSite: 'java-rs',
                url: '/docs/languages/java/reactive-streams-driver/:version/data-formats/time-series',
              },
              {
                label: 'POJOs',
                contentSite: 'java-rs',
                url: '/docs/languages/java/reactive-streams-driver/:version/data-formats/pojos',
              },
              {
                label: 'Codecs',
                contentSite: 'java-rs',
                url: '/docs/languages/java/reactive-streams-driver/:version/data-formats/codecs',
              },
              {
                label: 'Extended JSON',
                contentSite: 'java-rs',
                url: '/docs/languages/java/reactive-streams-driver/:version/data-formats/extended-json',
              },
              {
                label: 'BSON',
                isExternal: true,
                url: 'https://www.mongodb.com/docs/drivers/java/sync/current/data-formats/document-data-format-bson/',
              },
            ],
          },
          {
            label: 'Indexes',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/indexes',
          },
          {
            label: 'Run a Database Command',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/run-command',
          },
          {
            label: 'MongoDB Search',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/mongodb-search',
          },
          {
            label: 'MongoDB Vector Search',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/mongodb-vector-search',
          },
          {
            label: 'Logging and Monitoring',
            contentSite: 'java-rs',
            collapsible: true,
            items: [
              {
                label: 'Logging',
                contentSite: 'java-rs',
                url: '/docs/languages/java/reactive-streams-driver/:version/logging-monitoring/logging',
              },
              {
                label: 'Monitoring',
                contentSite: 'java-rs',
                url: '/docs/languages/java/reactive-streams-driver/:version/logging-monitoring/monitoring',
              },
              {
                label: 'Change Streams',
                contentSite: 'java-rs',
                url: '/docs/languages/java/reactive-streams-driver/:version/logging-monitoring/change-streams',
              },
            ],
          },
          {
            label: 'Security',
            contentSite: 'java-rs',
            collapsible: true,
            items: [
              {
                label: 'Authentication',
                contentSite: 'java-rs',
                collapsible: true,
                url: '/docs/languages/java/reactive-streams-driver/:version/security/auth',
                items: [
                  {
                    label: 'SCRAM',
                    contentSite: 'java-rs',
                    url: '/docs/languages/java/reactive-streams-driver/:version/security/auth/scram',
                  },
                  {
                    label: 'X.509',
                    contentSite: 'java-rs',
                    url: '/docs/languages/java/reactive-streams-driver/:version/security/auth/x509',
                  },
                  {
                    label: 'AWS IAM',
                    contentSite: 'java-rs',
                    url: '/docs/languages/java/reactive-streams-driver/:version/security/auth/aws-iam',
                  },
                  {
                    label: 'OIDC',
                    contentSite: 'java-rs',
                    url: '/docs/languages/java/reactive-streams-driver/:version/security/auth/oidc',
                  },
                  {
                    label: 'LDAP (PLAIN)',
                    contentSite: 'java-rs',
                    url: '/docs/languages/java/reactive-streams-driver/:version/security/auth/ldap',
                  },
                  {
                    label: 'Kerberos (GSSAPI)',
                    contentSite: 'java-rs',
                    url: '/docs/languages/java/reactive-streams-driver/:version/security/auth/kerberos',
                  },
                ],
              },
              {
                label: 'Enterprise Authentication',
                contentSite: 'java-rs',
                url: '/docs/languages/java/reactive-streams-driver/:version/security/enterprise-authentication',
              },
              {
                label: 'In-Use Encryption',
                contentSite: 'java-rs',
                url: '/docs/languages/java/reactive-streams-driver/:version/security/encrypt',
              },
              {
                label: 'TLS/SSL',
                contentSite: 'java-rs',
                url: '/docs/languages/java/reactive-streams-driver/:version/security/tls',
              },
              {
                label: 'Validate Driver Signatures',
                contentSite: 'java-rs',
                url: '/docs/languages/java/reactive-streams-driver/:version/security/validate-signatures',
              },
            ],
          },
          {
            label: 'Third-Party Integrations',
            contentSite: 'java-rs',
            collapsible: true,
            items: [
              {
                label: 'Integrate with Spring Boot',
                contentSite: 'java-rs',
                url: '/docs/languages/java/reactive-streams-driver/:version/integrations/spring-boot',
              },
            ],
          },
          {
            label: 'Reference',
            contentSite: 'java-rs',
            collapsible: true,
            items: [
              {
                label: 'Release Notes',
                contentSite: 'java-rs',
                url: '/docs/languages/java/reactive-streams-driver/:version/reference/release-notes',
              },
              {
                label: 'Compatibility',
                isExternal: true,
                url: 'https://www.mongodb.com/docs/drivers/compatibility/?driver-language=java&java-driver-framework=java-async',
              },
              {
                label: 'Upgrade',
                contentSite: 'java-rs',
                url: '/docs/languages/java/reactive-streams-driver/:version/reference/upgrade',
              },
            ],
          },
          {
            label: 'API Documentation',
            isExternal: true,
            url: 'https://mongodb.github.io/mongo-java-driver/5.8/apidocs/driver-reactive-streams/',
          },
          {
            label: 'Issues & Help',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/issues-and-help',
          },
          {
            label: 'View the Source',
            isExternal: true,
            url: 'https://github.com/mongodb/mongo-java-driver',
          },
        ],
      },
    ],
  },
];
