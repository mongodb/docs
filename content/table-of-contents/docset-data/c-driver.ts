import type { TocItem } from '../types';

const outdatedVersions = ['v1.x'];
const tocData: TocItem[] = [
  {
    label: 'C Driver',
    contentSite: 'c',
    group: true,
    versionDropdown: true,
    items: [
      {
        label: 'Overview',
        contentSite: 'c',
        url: '/docs/languages/c/c-driver/:version/',
      },
      {
        label: 'Asynchronous C Driver: Public Preview',
        contentSite: 'c',
        url: '/docs/languages/c/c-driver/:version/async-c-driver',
      },
      {
        label: 'Get Started',
        contentSite: 'c',
        url: '/docs/languages/c/c-driver/:version/get-started',
      },
      {
        label: 'Custom Installation',
        contentSite: 'c',
        url: '/docs/languages/c/c-driver/:version/install-from-source',
      },
      {
        label: 'Connect to MongoDB',
        contentSite: 'c',
        url: '/docs/languages/c/c-driver/:version/connect',
        collapsible: true,
        items: [
          {
            label: 'Create a MongoClient',
            contentSite: 'c',
            url: '/docs/languages/c/c-driver/:version/connect/mongoclient',
          },
          {
            label: 'Specify Connection Options',
            contentSite: 'c',
            url: '/docs/languages/c/c-driver/:version/connect/connection-options',
            collapsible: true,
            items: [
              {
                label: 'Stable API',
                contentSite: 'c',
                url: '/docs/languages/c/c-driver/:version/connect/connection-options/stable-api',
              },
              {
                label: 'Connection Pools',
                contentSite: 'c',
                url: '/docs/languages/c/c-driver/:version/connect/connection-options/connection-pools',
              },
              {
                label: 'AWS Lambda',
                isExternal: true,
                url: 'https://www.mongodb.com/docs/atlas/manage-connections-aws-lambda',
              },
            ],
          },
          {
            label: 'Choose a Connection Target',
            contentSite: 'c',
            url: '/docs/languages/c/c-driver/:version/connect/connection-targets',
          },
        ],
      },
      {
        label: 'Databases & Collections',
        contentSite: 'c',
        url: '/docs/languages/c/c-driver/:version/databases-collections',
      },
      {
        label: 'CRUD Operations',
        contentSite: 'c',
        collapsible: true,
        items: [
          {
            label: 'Insert',
            contentSite: 'c',
            url: '/docs/languages/c/c-driver/:version/crud/insert',
          },
          {
            label: 'Query Operations',
            contentSite: 'c',
            url: '/docs/languages/c/c-driver/:version/crud/query-operations',
            collapsible: true,
            items: [
              {
                label: 'Specify a Query',
                contentSite: 'c',
                url: '/docs/languages/c/c-driver/:version/crud/query-operations/specify-a-query',
              },
              {
                label: 'Find Documents',
                contentSite: 'c',
                url: '/docs/languages/c/c-driver/:version/crud/query-operations/find',
              },
              {
                label: 'Specify Fields to Return',
                contentSite: 'c',
                url: '/docs/languages/c/c-driver/:version/crud/query-operations/project',
              },
              {
                label: 'Specify Documents to Return',
                contentSite: 'c',
                url: '/docs/languages/c/c-driver/:version/crud/query-operations/specify-documents-to-return',
              },
              {
                label: 'Count Documents',
                contentSite: 'c',
                url: '/docs/languages/c/c-driver/:version/crud/query-operations/count',
              },
              {
                label: 'Distinct Field Values',
                contentSite: 'c',
                url: '/docs/languages/c/c-driver/:version/crud/query-operations/distinct',
              },
              {
                label: 'Access Data from a Cursor',
                contentSite: 'c',
                url: '/docs/languages/c/c-driver/:version/crud/query-operations/cursors',
              },
            ],
          },
          {
            label: 'Replace',
            contentSite: 'c',
            url: '/docs/languages/c/c-driver/:version/crud/replace',
          },
          {
            label: 'Update',
            contentSite: 'c',
            url: '/docs/languages/c/c-driver/:version/crud/update',
          },
          {
            label: 'Delete',
            contentSite: 'c',
            url: '/docs/languages/c/c-driver/:version/crud/delete',
          },
          {
            label: 'Bulk Write Operations',
            contentSite: 'c',
            url: '/docs/languages/c/c-driver/:version/crud/bulk-write',
          },
          {
            label: 'Transactions',
            contentSite: 'c',
            url: '/docs/languages/c/c-driver/:version/crud/transactions',
          },
          {
            label: 'Configure CRUD Operations',
            contentSite: 'c',
            url: '/docs/languages/c/c-driver/:version/crud/read-write-configuration',
          },
          {
            label: 'Store Large Files',
            contentSite: 'c',
            url: '/docs/languages/c/c-driver/:version/crud/gridfs',
          },
        ],
      },
      {
        label: 'Aggregation',
        contentSite: 'c',
        url: '/docs/languages/c/c-driver/:version/aggregation',
      },
      {
        label: 'Data Formats',
        contentSite: 'c',
        collapsible: true,
        items: [
          {
            label: 'BSON',
            contentSite: 'c',
            url: '/docs/languages/c/c-driver/:version/data-formats/bson',
          },
          {
            label: 'Extended JSON',
            contentSite: 'c',
            url: '/docs/languages/c/c-driver/:version/data-formats/extended-json',
          },
          {
            label: 'Time Series',
            contentSite: 'c',
            url: '/docs/languages/c/c-driver/:version/data-formats/time-series',
          },
        ],
      },
      {
        label: 'Indexes',
        contentSite: 'c',
        url: '/docs/languages/c/c-driver/:version/indexes',
        collapsible: true,
        items: [
          {
            label: 'Single Field Indexes',
            contentSite: 'c',
            url: '/docs/languages/c/c-driver/:version/indexes/single-field-index',
          },
          {
            label: 'Compound Indexes',
            contentSite: 'c',
            url: '/docs/languages/c/c-driver/:version/indexes/compound-index',
          },
          {
            label: 'Multikey Indexes',
            contentSite: 'c',
            url: '/docs/languages/c/c-driver/:version/indexes/multikey-index',
          },
          {
            label: 'MongoDB Search',
            contentSite: 'c',
            url: '/docs/languages/c/c-driver/:version/indexes/atlas-search-index',
          },
        ],
      },
      {
        label: 'Run a Database Command',
        contentSite: 'c',
        url: '/docs/languages/c/c-driver/:version/run-command',
      },
      {
        label: 'MongoDB Search',
        contentSite: 'c',
        url: '/docs/languages/c/c-driver/:version/mongodb-search',
      },
      {
        label: 'MongoDB Vector Search',
        contentSite: 'c',
        url: '/docs/languages/c/c-driver/:version/mongodb-vector-search',
      },
      {
        label: 'Logging and Monitoring',
        contentSite: 'c',
        collapsible: true,
        items: [
          {
            label: 'Logging',
            contentSite: 'c',
            url: '/docs/languages/c/c-driver/:version/logging-monitoring/logging',
            versions: {
              excludes: [...outdatedVersions],
            },
          },
          {
            label: 'Monitoring',
            contentSite: 'c',
            url: '/docs/languages/c/c-driver/:version/logging-monitoring/cluster-monitoring',
          },
          {
            label: 'Change Streams',
            contentSite: 'c',
            url: '/docs/languages/c/c-driver/:version/logging-monitoring/change-streams',
          },
        ],
      },
      {
        label: 'Security',
        contentSite: 'c',
        url: '/docs/languages/c/c-driver/:version/security',
        collapsible: true,
        items: [
          {
            label: 'TLS Configuration',
            contentSite: 'c',
            url: '/docs/languages/c/c-driver/:version/security/tls',
          },
          {
            label: 'Authentication',
            contentSite: 'c',
            url: '/docs/languages/c/c-driver/:version/security/authentication',
          },
          {
            label: 'In-Use Encryption',
            contentSite: 'c',
            url: '/docs/languages/c/c-driver/:version/security/in-use-encryption',
          },
          {
            label: 'Enterprise Authentication',
            contentSite: 'c',
            url: '/docs/languages/c/c-driver/:version/security/enterprise-authentication',
          },
        ],
      },
      {
        label: 'Reference',
        contentSite: 'c',
        collapsible: true,
        items: [
          {
            label: 'Release Notes',
            contentSite: 'c',
            url: '/docs/languages/c/c-driver/:version/reference/release-notes',
          },
          {
            label: 'Compatibility',
            isExternal: true,
            url: 'https://www.mongodb.com/docs/drivers/compatibility/?interface=driver&language=c',
          },
          {
            label: 'Upgrade',
            contentSite: 'c',
            url: '/docs/languages/c/c-driver/:version/reference/upgrade',
          },
        ],
      },
      {
        label: 'libbson API Documentation',
        isExternal: true,
        url: 'https://mongoc.org/libbson/current',
      },
      {
        label: 'libmongoc API Documentation',
        isExternal: true,
        url: 'https://mongoc.org/libmongoc/current',
      },
      {
        label: 'Issues & Help',
        contentSite: 'c',
        url: '/docs/languages/c/c-driver/:version/issues-help',
      },
    ],
  },
];

export default tocData;
