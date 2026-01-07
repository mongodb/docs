import type { TocItem } from '../types';

const tocData: TocItem[] = [
  {
    label: 'Kotlin Coroutine',
    contentSite: 'kotlin',
    group: true,
    versionDropdown: true,
    items: [
      {
        label: 'Overview',
        contentSite: 'kotlin',
        url: '/docs/drivers/kotlin/coroutine/:version/',
      },
      {
        label: 'Getting Started',
        contentSite: 'kotlin',
        url: '/docs/drivers/kotlin/coroutine/:version/getting-started',
      },
      {
        label: 'Connect',
        contentSite: 'kotlin',
        url: '/docs/drivers/kotlin/coroutine/:version/connect',
        collapsible: true,
        items: [
          {
            label: 'Create a MongoClient',
            contentSite: 'kotlin',
            url: '/docs/drivers/kotlin/coroutine/:version/connect/mongoclient',
          },
          {
            label: 'Choose a Connection Target',
            contentSite: 'kotlin',
            url: '/docs/drivers/kotlin/coroutine/:version/connect/connection-targets',
          },
          {
            label: 'Connection Options',
            contentSite: 'kotlin',
            url: '/docs/drivers/kotlin/coroutine/:version/connect/connection-options',
            collapsible: true,
            items: [
              {
                label: 'Network Compression',
                contentSite: 'kotlin',
                url: '/docs/drivers/kotlin/coroutine/:version/connect/connection-options/network-compression',
              },
              {
                label: 'Server Selection',
                contentSite: 'kotlin',
                url: '/docs/drivers/kotlin/coroutine/:version/connect/connection-options/server-selection',
              },
              {
                label: 'Stable API',
                contentSite: 'kotlin',
                url: '/docs/drivers/kotlin/coroutine/:version/connect/connection-options/stable-api',
              },
              {
                label: 'Limit Server Execution Time',
                contentSite: 'kotlin',
                url: '/docs/drivers/kotlin/coroutine/:version/connect/connection-options/csot',
              },
            ],
          },
          {
            label: 'Connection Pools',
            contentSite: 'kotlin',
            url: '/docs/drivers/kotlin/coroutine/:version/connect/connection-options/connection-pools',
          },
          {
            label: 'MongoClient Settings',
            contentSite: 'kotlin',
            url: '/docs/drivers/kotlin/coroutine/:version/connect/mongoclientsettings',
          },
          {
            label: 'AWS Lambda',
            contentSite: 'cloud-docs',
            url: 'https://www.mongodb.com/docs/atlas/manage-connections-aws-lambda',
          },
          {
            label: 'Connection Troubleshooting',
            contentSite: 'kotlin',
            url: '/docs/drivers/kotlin/coroutine/:version/connect/connection-troubleshooting',
          },
        ],
      },
      {
        label: 'Databases & Collections',
        contentSite: 'kotlin',
        url: '/docs/drivers/kotlin/coroutine/:version/databases-collections',
      },
      {
        label: 'CRUD Operations',
        contentSite: 'kotlin',
        collapsible: true,
        items: [
          {
            label: 'Insert Documents',
            contentSite: 'kotlin',
            url: '/docs/drivers/kotlin/coroutine/:version/crud/insert',
          },
          {
            label: 'Query Documents',
            contentSite: 'kotlin',
            collapsible: true,
            items: [
              {
                label: 'Find Documents',
                contentSite: 'kotlin',
                url: '/docs/drivers/kotlin/coroutine/:version/crud/read-operations/retrieve',
              },
              {
                label: 'Specify Documents to Return',
                contentSite: 'kotlin',
                url: '/docs/drivers/kotlin/coroutine/:version/crud/read-operations/query-document',
              },
              {
                label: 'Specify Which Fields to Return',
                contentSite: 'kotlin',
                url: '/docs/drivers/kotlin/coroutine/:version/crud/read-operations/project',
              },
              {
                label: 'Count Documents',
                contentSite: 'kotlin',
                url: '/docs/drivers/kotlin/coroutine/:version/crud/read-operations/count',
              },
              {
                label: 'Count Distinct Field Values',
                contentSite: 'kotlin',
                url: '/docs/drivers/kotlin/coroutine/:version/crud/read-operations/distinct',
              },
              {
                label: 'Access Data From a Flow',
                contentSite: 'kotlin',
                url: '/docs/drivers/kotlin/coroutine/:version/crud/read-operations/flow',
              },
              {
                label: 'Sort Results',
                contentSite: 'kotlin',
                url: '/docs/drivers/kotlin/coroutine/:version/crud/read-operations/sort',
              },
              {
                label: 'Skip Returned Results',
                contentSite: 'kotlin',
                url: '/docs/drivers/kotlin/coroutine/:version/crud/read-operations/skip',
              },
              {
                label: 'Limit the Number of Returned Results',
                contentSite: 'kotlin',
                url: '/docs/drivers/kotlin/coroutine/:version/crud/read-operations/limit',
              },
              {
                label: 'Search Geospatially',
                contentSite: 'kotlin',
                url: '/docs/drivers/kotlin/coroutine/:version/crud/read-operations/geo',
              },
              {
                label: 'Query Text',
                contentSite: 'kotlin',
                url: '/docs/drivers/kotlin/coroutine/:version/crud/read-operations/text',
              },
            ],
          },
          {
            label: 'Update Documents',
            contentSite: 'kotlin',
            url: '/docs/drivers/kotlin/coroutine/:version/crud/update',
          },
          {
            label: 'Replace Documents',
            contentSite: 'kotlin',
            url: '/docs/drivers/kotlin/coroutine/:version/crud/replace',
          },
          {
            label: 'Delete Documents',
            contentSite: 'kotlin',
            url: '/docs/drivers/kotlin/coroutine/:version/crud/delete',
          },
          {
            label: 'Bulk Operations',
            contentSite: 'kotlin',
            url: '/docs/drivers/kotlin/coroutine/:version/crud/bulk',
          },
          {
            label: 'Compound Operations',
            contentSite: 'kotlin',
            url: '/docs/drivers/kotlin/coroutine/:version/crud/compound-operations',
          },
          {
            label: 'Transactions',
            contentSite: 'kotlin',
            url: '/docs/drivers/kotlin/coroutine/:version/crud/transactions',
          },
          {
            label: 'Configure CRUD Operations',
            contentSite: 'kotlin',
            url: '/docs/drivers/kotlin/coroutine/:version/crud/configure',
          },
        ],
      },
      {
        label: 'Aggregation',
        contentSite: 'kotlin',
        url: '/docs/drivers/kotlin/coroutine/:version/aggregation',
        collapsible: true,
        items: [
          {
            label: 'Aggregation Expressions',
            contentSite: 'kotlin',
            url: '/docs/drivers/kotlin/coroutine/:version/aggregation/aggregation-expression-operations',
          },
        ],
      },
      {
        label: 'Builders',
        contentSite: 'kotlin',
        url: '/docs/drivers/kotlin/coroutine/:version/builders',
        collapsible: true,
        items: [
          {
            label: 'Aggregation',
            contentSite: 'kotlin',
            url: '/docs/drivers/kotlin/coroutine/:version/builders/aggregates',
          },
          {
            label: 'Filters',
            contentSite: 'kotlin',
            url: '/docs/drivers/kotlin/coroutine/:version/builders/filters',
          },
          {
            label: 'Indexes',
            contentSite: 'kotlin',
            url: '/docs/drivers/kotlin/coroutine/:version/builders/indexes',
          },
          {
            label: 'Projection',
            contentSite: 'kotlin',
            url: '/docs/drivers/kotlin/coroutine/:version/builders/projections',
          },
          {
            label: 'Sort',
            contentSite: 'kotlin',
            url: '/docs/drivers/kotlin/coroutine/:version/builders/sort',
          },
          {
            label: 'Update',
            contentSite: 'kotlin',
            url: '/docs/drivers/kotlin/coroutine/:version/builders/updates',
          },
          {
            label: 'Builders & Data Classes',
            contentSite: 'kotlin',
            url: '/docs/drivers/kotlin/coroutine/:version/builders/builders-data-classes',
            versions: { excludes: ['v5.0', 'v5.1', 'v5.2'] },
          },
        ],
      },
      {
        label: 'Data Formats',
        contentSite: 'kotlin',
        collapsible: true,
        items: [
          {
            label: 'Data Classes',
            contentSite: 'kotlin',
            url: '/docs/drivers/kotlin/coroutine/:version/data-formats/document-data-format-data-class',
          },
          {
            label: 'BSON',
            contentSite: 'kotlin',
            url: '/docs/drivers/kotlin/coroutine/:version/data-formats/document-data-format-bson',
          },
          {
            label: 'Extended JSON',
            contentSite: 'kotlin',
            url: '/docs/drivers/kotlin/coroutine/:version/data-formats/document-data-format-extended-json',
          },
          {
            label: 'Documents',
            contentSite: 'kotlin',
            url: '/docs/drivers/kotlin/coroutine/:version/data-formats/documents',
          },
          {
            label: 'Kotlin Serialization',
            contentSite: 'kotlin',
            url: '/docs/drivers/kotlin/coroutine/:version/data-formats/serialization',
          },
          {
            label: 'Codecs',
            contentSite: 'kotlin',
            url: '/docs/drivers/kotlin/coroutine/:version/data-formats/codecs',
          },
          {
            label: 'Time Series Collections',
            contentSite: 'kotlin',
            url: '/docs/drivers/kotlin/coroutine/:version/data-formats/time-series',
          },
          {
            label: 'Collations',
            contentSite: 'kotlin',
            url: '/docs/drivers/kotlin/coroutine/:version/data-formats/collations',
          },
        ],
      },
      {
        label: 'Indexes',
        contentSite: 'kotlin',
        url: '/docs/drivers/kotlin/coroutine/:version/indexes',
      },
      {
        label: 'Run a Database Command',
        contentSite: 'kotlin',
        url: '/docs/drivers/kotlin/coroutine/:version/command',
      },
      {
        label: 'MongoDB Search',
        contentSite: 'kotlin',
        url: '/docs/drivers/kotlin/coroutine/:version/atlas-search',
      },
      {
        label: 'MongoDB Vector Search',
        contentSite: 'kotlin',
        url: '/docs/drivers/kotlin/coroutine/:version/vector-search',
      },
      {
        label: 'Logging and Monitoring',
        contentSite: 'kotlin',
        collapsible: true,
        items: [
          {
            label: 'Logging',
            contentSite: 'kotlin',
            url: '/docs/drivers/kotlin/coroutine/:version/logging-monitoring/logging',
          },
          {
            label: 'Monitoring',
            contentSite: 'kotlin',
            url: '/docs/drivers/kotlin/coroutine/:version/logging-monitoring/monitoring',
          },
          {
            label: 'Change Streams',
            contentSite: 'kotlin',
            url: '/docs/drivers/kotlin/coroutine/:version/logging-monitoring/change-streams',
          },
        ],
      },
      {
        label: 'Security',
        contentSite: 'kotlin',
        collapsible: true,
        items: [
          {
            label: 'TLS/SSL',
            contentSite: 'kotlin',
            url: '/docs/drivers/kotlin/coroutine/:version/security/tls',
          },
          {
            label: 'SOCKS5 Proxy Connection',
            contentSite: 'kotlin',
            url: '/docs/drivers/kotlin/coroutine/:version/security/socks5',
          },
          {
            label: 'Authentication',
            contentSite: 'kotlin',
            url: '/docs/drivers/kotlin/coroutine/:version/security/auth',
            collapsible: true,
            items: [
              {
                label: 'SCRAM',
                contentSite: 'kotlin',
                url: '/docs/drivers/kotlin/coroutine/:version/security/auth/scram',
              },
              {
                label: 'X.509',
                contentSite: 'kotlin',
                url: '/docs/drivers/kotlin/coroutine/:version/security/auth/x509',
              },
              {
                label: 'AWS IAM',
                contentSite: 'kotlin',
                url: '/docs/drivers/kotlin/coroutine/:version/security/auth/mongodb-aws',
              },
              {
                label: 'OIDC',
                contentSite: 'kotlin',
                url: '/docs/drivers/kotlin/coroutine/:version/security/auth/oidc',
              },
              {
                label: 'LDAP (PLAIN)',
                contentSite: 'kotlin',
                url: '/docs/drivers/kotlin/coroutine/:version/security/auth/ldap',
              },
              {
                label: 'Kerberos (GSSAPI)',
                contentSite: 'kotlin',
                url: '/docs/drivers/kotlin/coroutine/:version/security/auth/kerberos',
              },
            ],
          },
          {
            label: 'In-Use Encryption',
            contentSite: 'kotlin',
            url: '/docs/drivers/kotlin/coroutine/:version/security/encrypt-fields',
          },
          {
            label: 'Validate Driver Signatures',
            contentSite: 'kotlin',
            url: '/docs/drivers/kotlin/coroutine/:version/security/validate-signatures',
          },
        ],
      },
      {
        label: 'Third Party Integrations',
        contentSite: 'kotlin',
        collapsible: true,
        items: [
          {
            label: 'Tutorial: Ktor API with MongoDB',
            contentSite: 'kotlin',
            url: '/docs/drivers/kotlin/coroutine/:version/integrations/ktor',
          },
        ],
      },
      {
        label: 'Reference',
        contentSite: 'kotlin',
        collapsible: true,
        items: [
          {
            label: 'Release Notes',
            contentSite: 'kotlin',
            url: '/docs/drivers/kotlin/coroutine/:version/reference/release-notes',
          },
          {
            label: 'Compatibility',
            contentSite: 'kotlin',
            url: 'https://www.mongodb.com/docs/drivers/compatibility/?driver-language=kotlin&kotlin-driver-framework=kotlin-async',
          },
          {
            label: 'Migrate from KMongo',
            contentSite: 'kotlin',
            url: '/docs/drivers/kotlin/coroutine/:version/reference/migrate-kmongo',
          },
          {
            label: 'Upgrade',
            contentSite: 'kotlin',
            url: '/docs/drivers/kotlin/coroutine/:version/reference/upgrade',
          },
        ],
      },
      {
        label: 'API Documentation',
        contentSite: 'kotlin',
        collapsible: true,
        items: [
          {
            label: ' Kotlin Coroutine Driver',
            isExternal: true,
            url: 'https://mongodb.github.io/mongo-java-driver/5.6/apidocs/driver-kotlin-coroutine/index.html',
          },
          {
            label: ' BSON kotlinx.serialization',
            isExternal: true,
            url: 'https://mongodb.github.io/mongo-java-driver/5.6/apidocs/bson-kotlinx/index.html',
          },
          {
            label: ' Kotlin Driver Extensions',
            isExternal: true,
            url: 'https://mongodb.github.io/mongo-java-driver/5.6/apidocs/driver-kotlin-extensions/index.html',
          },
          {
            label: ' Driver Core',
            isExternal: true,
            url: 'https://mongodb.github.io/mongo-java-driver/5.6/apidocs/driver-core/index.html',
          },
        ],
      },
      {
        label: 'Issues & Help',
        contentSite: 'kotlin',
        url: '/docs/drivers/kotlin/coroutine/:version/issues-and-help',
      },
      {
        label: 'View the Source',
        isExternal: true,
        url: 'https://github.com/mongodb/mongo-java-driver',
      },
    ],
  },
];

export default tocData;
