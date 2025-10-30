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
        label: 'Quick Start',
        contentSite: 'kotlin',
        url: '/docs/drivers/kotlin/coroutine/:version/quick-start',
      },
      {
        label: 'Quick Reference',
        contentSite: 'kotlin',
        url: '/docs/drivers/kotlin/coroutine/:version/quick-reference',
      },
      {
        label: "What's New",
        contentSite: 'kotlin',
        url: '/docs/drivers/kotlin/coroutine/:version/whats-new',
      },
      {
        label: 'Usage Examples',
        contentSite: 'kotlin',
        url: '/docs/drivers/kotlin/coroutine/:version/usage-examples',
        collapsible: true,
        items: [
          {
            label: 'Find',
            contentSite: 'kotlin',
            collapsible: true,
            items: [
              {
                label: 'Find One',
                contentSite: 'kotlin',
                url: '/docs/drivers/kotlin/coroutine/:version/usage-examples/findOne',
              },
              {
                label: 'Find Many',
                contentSite: 'kotlin',
                url: '/docs/drivers/kotlin/coroutine/:version/usage-examples/find',
              },
            ],
          },
          {
            label: 'Insert',
            contentSite: 'kotlin',
            collapsible: true,
            items: [
              {
                label: 'Insert One',
                contentSite: 'kotlin',
                url: '/docs/drivers/kotlin/coroutine/:version/usage-examples/insertOne',
              },
              {
                label: 'Insert Many',
                contentSite: 'kotlin',
                url: '/docs/drivers/kotlin/coroutine/:version/usage-examples/insertMany',
              },
            ],
          },
          {
            label: 'Update & Replace',
            contentSite: 'kotlin',
            collapsible: true,
            items: [
              {
                label: 'Update One',
                contentSite: 'kotlin',
                url: '/docs/drivers/kotlin/coroutine/:version/usage-examples/updateOne',
              },
              {
                label: 'Update Many',
                contentSite: 'kotlin',
                url: '/docs/drivers/kotlin/coroutine/:version/usage-examples/updateMany',
              },
              {
                label: 'Replace One',
                contentSite: 'kotlin',
                url: '/docs/drivers/kotlin/coroutine/:version/usage-examples/replaceOne',
              },
            ],
          },
          {
            label: 'Delete',
            contentSite: 'kotlin',
            collapsible: true,
            items: [
              {
                label: 'Delete One',
                contentSite: 'kotlin',
                url: '/docs/drivers/kotlin/coroutine/:version/usage-examples/deleteOne',
              },
              {
                label: 'Delete Many',
                contentSite: 'kotlin',
                url: '/docs/drivers/kotlin/coroutine/:version/usage-examples/deleteMany',
              },
            ],
          },
          {
            label: 'Bulk Operations',
            contentSite: 'kotlin',
            url: '/docs/drivers/kotlin/coroutine/:version/usage-examples/bulkWrite',
          },
          {
            label: 'Watch for Changes',
            contentSite: 'kotlin',
            url: '/docs/drivers/kotlin/coroutine/:version/usage-examples/watch',
          },
          {
            label: 'Count Documents',
            contentSite: 'kotlin',
            url: '/docs/drivers/kotlin/coroutine/:version/usage-examples/count',
          },
          {
            label: 'Distinct Field Values',
            contentSite: 'kotlin',
            url: '/docs/drivers/kotlin/coroutine/:version/usage-examples/distinct',
          },
          {
            label: 'Run a Command',
            contentSite: 'kotlin',
            url: '/docs/drivers/kotlin/coroutine/:version/usage-examples/command',
          },
        ],
      },
      {
        label: 'Fundamentals',
        contentSite: 'kotlin',
        url: '/docs/drivers/kotlin/coroutine/:version/fundamentals',
        collapsible: true,
        items: [
          {
            label: 'Connection Guide',
            contentSite: 'kotlin',
            url: '/docs/drivers/kotlin/coroutine/:version/fundamentals/connection',
            collapsible: true,
            items: [
              {
                label: 'Connect to MongoDB',
                contentSite: 'kotlin',
                url: '/docs/drivers/kotlin/coroutine/:version/fundamentals/connection/connect',
              },
              {
                label: 'Connection Options',
                contentSite: 'kotlin',
                url: '/docs/drivers/kotlin/coroutine/:version/fundamentals/connection/connection-options',
              },
              {
                label: 'MongoClient Settings',
                contentSite: 'kotlin',
                url: '/docs/drivers/kotlin/coroutine/:version/fundamentals/connection/mongoclientsettings',
              },
              {
                label: 'Limit Execution Time',
                contentSite: 'kotlin',
                url: '/docs/drivers/kotlin/coroutine/:version/fundamentals/connection/csot',
              },
              {
                label: 'Network Compression',
                contentSite: 'kotlin',
                url: '/docs/drivers/kotlin/coroutine/:version/fundamentals/connection/network-compression',
              },
              {
                label: 'TLS/SSL',
                contentSite: 'kotlin',
                url: '/docs/drivers/kotlin/coroutine/:version/fundamentals/connection/tls',
              },
              {
                label: 'SOCKS5 Proxy Connection',
                contentSite: 'kotlin',
                url: '/docs/drivers/kotlin/coroutine/:version/fundamentals/connection/socks5',
              },
              {
                label: 'AWS Lambda',
                contentSite: 'cloud-docs',
                url: 'https://www.mongodb.com/docs/atlas/manage-connections-aws-lambda',
              },
            ],
          },
          {
            label: 'Authentication',
            contentSite: 'kotlin',
            url: '/docs/drivers/kotlin/coroutine/:version/fundamentals/auth',
          },
          {
            label: 'Enterprise Authentication',
            contentSite: 'kotlin',
            url: '/docs/drivers/kotlin/coroutine/:version/fundamentals/enterprise-auth',
          },
          {
            label: 'Stable API',
            contentSite: 'kotlin',
            url: '/docs/drivers/kotlin/coroutine/:version/fundamentals/stable-api',
          },
          {
            label: 'Databases & Collections',
            contentSite: 'kotlin',
            url: '/docs/drivers/kotlin/coroutine/:version/fundamentals/databases-collections',
          },
          {
            label: 'Data Formats',
            contentSite: 'kotlin',
            collapsible: true,
            items: [
              {
                label: 'Data Classes',
                contentSite: 'kotlin',
                url: '/docs/drivers/kotlin/coroutine/:version/fundamentals/data-formats/document-data-format-data-class',
              },
              {
                label: 'BSON',
                contentSite: 'kotlin',
                url: '/docs/drivers/kotlin/coroutine/:version/fundamentals/data-formats/document-data-format-bson',
              },
              {
                label: 'Extended JSON',
                contentSite: 'kotlin',
                url: '/docs/drivers/kotlin/coroutine/:version/fundamentals/data-formats/document-data-format-extended-json',
              },
              {
                label: 'Documents',
                contentSite: 'kotlin',
                url: '/docs/drivers/kotlin/coroutine/:version/fundamentals/data-formats/documents',
              },
              {
                label: 'Kotlin Serialization',
                contentSite: 'kotlin',
                url: '/docs/drivers/kotlin/coroutine/:version/fundamentals/data-formats/serialization',
              },
              {
                label: 'Codecs',
                contentSite: 'kotlin',
                url: '/docs/drivers/kotlin/coroutine/:version/fundamentals/data-formats/codecs',
              },
            ],
          },
          {
            label: 'CRUD Operations',
            contentSite: 'kotlin',
            collapsible: true,
            items: [
              {
                label: 'Read',
                contentSite: 'kotlin',
                collapsible: true,
                items: [
                  {
                    label: 'Retrieve Data',
                    contentSite: 'kotlin',
                    url: '/docs/drivers/kotlin/coroutine/:version/fundamentals/crud/read-operations/retrieve',
                  },
                  {
                    label: 'Access Data From a Flow',
                    contentSite: 'kotlin',
                    url: '/docs/drivers/kotlin/coroutine/:version/fundamentals/crud/read-operations/flow',
                  },
                  {
                    label: 'Open Change Streams',
                    contentSite: 'kotlin',
                    url: '/docs/drivers/kotlin/coroutine/:version/fundamentals/crud/read-operations/change-streams',
                  },
                  {
                    label: 'Sort Results',
                    contentSite: 'kotlin',
                    url: '/docs/drivers/kotlin/coroutine/:version/fundamentals/crud/read-operations/sort',
                  },
                  {
                    label: 'Skip Returned Results',
                    contentSite: 'kotlin',
                    url: '/docs/drivers/kotlin/coroutine/:version/fundamentals/crud/read-operations/skip',
                  },
                  {
                    label: 'Limit the Number of Returned Results',
                    contentSite: 'kotlin',
                    url: '/docs/drivers/kotlin/coroutine/:version/fundamentals/crud/read-operations/limit',
                  },
                  {
                    label: 'Specify Which Fields to Return',
                    contentSite: 'kotlin',
                    url: '/docs/drivers/kotlin/coroutine/:version/fundamentals/crud/read-operations/project',
                  },
                  {
                    label: 'Search Geospatially',
                    contentSite: 'kotlin',
                    url: '/docs/drivers/kotlin/coroutine/:version/fundamentals/crud/read-operations/geo',
                  },
                  {
                    label: 'Search Text',
                    contentSite: 'kotlin',
                    url: '/docs/drivers/kotlin/coroutine/:version/fundamentals/crud/read-operations/text',
                  },
                ],
              },
              {
                label: 'Write',
                contentSite: 'kotlin',
                collapsible: true,
                items: [
                  {
                    label: 'Insert Operations',
                    contentSite: 'kotlin',
                    url: '/docs/drivers/kotlin/coroutine/:version/fundamentals/crud/write-operations/insert',
                  },
                  {
                    label: 'Delete Documents',
                    contentSite: 'kotlin',
                    url: '/docs/drivers/kotlin/coroutine/:version/fundamentals/crud/write-operations/delete',
                  },
                  {
                    label: 'Modify Documents',
                    contentSite: 'kotlin',
                    url: '/docs/drivers/kotlin/coroutine/:version/fundamentals/crud/write-operations/modify',
                  },
                  {
                    label: 'Update Arrays in a Document',
                    contentSite: 'kotlin',
                    url: '/docs/drivers/kotlin/coroutine/:version/fundamentals/crud/write-operations/embedded-arrays',
                  },
                  {
                    label: 'Insert or Update in a Single Operation',
                    contentSite: 'kotlin',
                    url: '/docs/drivers/kotlin/coroutine/:version/fundamentals/crud/write-operations/upsert',
                  },
                  {
                    label: 'Bulk Operations',
                    contentSite: 'kotlin',
                    url: '/docs/drivers/kotlin/coroutine/:version/fundamentals/crud/write-operations/bulk',
                  },
                ],
              },
              {
                label: 'Query',
                contentSite: 'kotlin',
                url: '/docs/drivers/kotlin/coroutine/:version/fundamentals/crud/query-document',
              },
              {
                label: 'Compound Operations',
                contentSite: 'kotlin',
                url: '/docs/drivers/kotlin/coroutine/:version/fundamentals/crud/compound-operations',
              },
            ],
          },
          {
            label: 'Builders',
            contentSite: 'kotlin',
            url: '/docs/drivers/kotlin/coroutine/:version/fundamentals/builders',
            collapsible: true,
            items: [
              {
                label: 'Aggregation',
                contentSite: 'kotlin',
                url: '/docs/drivers/kotlin/coroutine/:version/fundamentals/builders/aggregates',
                collapsible: true,
                items: [
                  {
                    label: 'Atlas Vector Search',
                    contentSite: 'kotlin',
                    url: '/docs/drivers/kotlin/coroutine/:version/fundamentals/builders/vector-search',
                    versions: { excludes: ['5.1'] },
                  },
                ],
              },
              {
                label: 'Filters',
                contentSite: 'kotlin',
                url: '/docs/drivers/kotlin/coroutine/:version/fundamentals/builders/filters',
              },
              {
                label: 'Indexes',
                contentSite: 'kotlin',
                url: '/docs/drivers/kotlin/coroutine/:version/fundamentals/builders/indexes',
              },
              {
                label: 'Projection',
                contentSite: 'kotlin',
                url: '/docs/drivers/kotlin/coroutine/:version/fundamentals/builders/projections',
              },
              {
                label: 'Sort',
                contentSite: 'kotlin',
                url: '/docs/drivers/kotlin/coroutine/:version/fundamentals/builders/sort',
              },
              {
                label: 'Update',
                contentSite: 'kotlin',
                url: '/docs/drivers/kotlin/coroutine/:version/fundamentals/builders/updates',
              },
              {
                label: 'Builders & Data Classes',
                contentSite: 'kotlin',
                url: '/docs/drivers/kotlin/coroutine/:version/fundamentals/builders/builders-data-classes',
                versions: { excludes: ['5.1', '5.2'] },
              },
            ],
          },
          {
            label: 'Aggregation',
            contentSite: 'kotlin',
            url: '/docs/drivers/kotlin/coroutine/:version/fundamentals/aggregation',
          },
          {
            label: 'Aggregation Expressions',
            contentSite: 'kotlin',
            url: '/docs/drivers/kotlin/coroutine/:version/fundamentals/aggregation-expression-operations',
          },
          {
            label: 'Indexes',
            contentSite: 'kotlin',
            url: '/docs/drivers/kotlin/coroutine/:version/fundamentals/indexes',
          },
          {
            label: 'Transactions',
            contentSite: 'kotlin',
            url: '/docs/drivers/kotlin/coroutine/:version/fundamentals/transactions',
          },
          {
            label: 'Collations',
            contentSite: 'kotlin',
            url: '/docs/drivers/kotlin/coroutine/:version/fundamentals/collations',
          },
          {
            label: 'Logging',
            contentSite: 'kotlin',
            url: '/docs/drivers/kotlin/coroutine/:version/fundamentals/logging',
          },
          {
            label: 'Monitoring',
            contentSite: 'kotlin',
            url: '/docs/drivers/kotlin/coroutine/:version/fundamentals/monitoring',
          },
          {
            label: 'Time Series Collections',
            contentSite: 'kotlin',
            url: '/docs/drivers/kotlin/coroutine/:version/fundamentals/time-series',
          },
          {
            label: 'In-Use Encryption',
            contentSite: 'kotlin',
            url: '/docs/drivers/kotlin/coroutine/:version/fundamentals/encrypt-fields',
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
        label: 'FAQ',
        contentSite: 'kotlin',
        url: '/docs/drivers/kotlin/coroutine/:version/faq',
      },
      {
        label: 'Connection Troubleshooting',
        contentSite: 'kotlin',
        url: '/docs/drivers/kotlin/coroutine/:version/connection-troubleshooting',
      },
      {
        label: 'Issues & Help',
        contentSite: 'kotlin',
        url: '/docs/drivers/kotlin/coroutine/:version/issues-and-help',
      },
      {
        label: 'Compatibility',
        contentSite: 'drivers',
        url: '/docs/drivers/compatibility/?driver-language=kotlin&kotlin-driver-framework=kotlin-async',
      },
      {
        label: 'Migrate from KMongo',
        contentSite: 'kotlin',
        url: '/docs/drivers/kotlin/coroutine/:version/migrate-kmongo',
      },
      {
        label: 'Validate Driver Signatures',
        contentSite: 'kotlin',
        url: '/docs/drivers/kotlin/coroutine/:version/validate-signatures',
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
