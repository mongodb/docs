import { inheritContentSite, type TocItem } from '../../../types';

const tocData: TocItem[] = inheritContentSite('cpp-driver', [
  {
    label: 'Overview',
    url: '/docs/languages/cpp/cpp-driver/:version/',
  },
  {
    label: 'Get Started',
    url: '/docs/languages/cpp/cpp-driver/:version/get-started',
  },
  {
    label: 'Connect',
    collapsible: true,
    items: [
      {
        label: 'Create a Driver Instance',
        url: '/docs/languages/cpp/cpp-driver/:version/connect/instance',
      },
      {
        label: 'Create a MongoDB Client',
        url: '/docs/languages/cpp/cpp-driver/:version/connect/client',
      },
      {
        label: 'Choose a Connection Target',
        url: '/docs/languages/cpp/cpp-driver/:version/connect/connection-targets',
      },
      {
        label: 'Specify Connection Options',
        url: '/docs/languages/cpp/cpp-driver/:version/connect/connection-options',
        collapsible: true,
        items: [
          {
            label: 'Compress Network Traffic',
            url: '/docs/languages/cpp/cpp-driver/:version/connect/network-compression',
          },
          {
            label: 'Stable API',
            url: '/docs/languages/cpp/cpp-driver/:version/connect/stable-api',
          },
          {
            label: 'Connection Pools',
            url: '/docs/languages/cpp/cpp-driver/:version/connect/connection-pools',
          },
        ],
      },
      {
        label: 'Advanced Configuration & Installation',
        url: '/docs/languages/cpp/cpp-driver/:version/connect/advanced-installation',
      },
      {
        label: 'Include & Link the Driver',
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
    url: '/docs/languages/cpp/cpp-driver/:version/databases-collections',
  },
  {
    label: 'CRUD Operations',
    collapsible: true,
    items: [
      {
        label: 'Insert',
        url: '/docs/languages/cpp/cpp-driver/:version/crud/insert',
      },
      {
        label: 'Query',
        collapsible: true,
        items: [
          {
            label: 'Specify a Query',
            url: '/docs/languages/cpp/cpp-driver/:version/crud/query/specify-a-query',
          },
          {
            label: 'Find Documents',
            url: '/docs/languages/cpp/cpp-driver/:version/crud/query/find',
          },
          {
            label: 'Specify Documents to Return',
            url: '/docs/languages/cpp/cpp-driver/:version/crud/query/specify-documents-to-return',
          },
          {
            label: 'Specify Fields to Return',
            url: '/docs/languages/cpp/cpp-driver/:version/crud/query/project',
          },
          {
            label: 'Distinct Field Values',
            url: '/docs/languages/cpp/cpp-driver/:version/crud/query/distinct',
          },
          {
            label: 'Count Documents',
            url: '/docs/languages/cpp/cpp-driver/:version/crud/query/count',
          },
          {
            label: 'Cursors',
            url: '/docs/languages/cpp/cpp-driver/:version/crud/query/cursor',
          },
        ],
      },
      {
        label: 'Update',
        url: '/docs/languages/cpp/cpp-driver/:version/crud/update',
        collapsible: true,
        items: [
          {
            label: 'Replace',
            url: '/docs/languages/cpp/cpp-driver/:version/crud/update/replace',
          },
        ],
      },
      {
        label: 'Delete',
        url: '/docs/languages/cpp/cpp-driver/:version/crud/delete',
      },
      {
        label: 'Bulk Write',
        url: '/docs/languages/cpp/cpp-driver/:version/crud/bulk-write',
      },
      {
        label: 'Transactions',
        url: '/docs/languages/cpp/cpp-driver/:version/crud/transactions',
      },
      {
        label: 'Store Large Files',
        url: '/docs/languages/cpp/cpp-driver/:version/crud/gridfs',
      },
      {
        label: 'Thread & Fork Safety',
        url: '/docs/languages/cpp/cpp-driver/:version/crud/thread-safety',
      },
      {
        label: 'Configure CRUD Operations',
        url: '/docs/languages/cpp/cpp-driver/:version/crud/configure',
      },
    ],
  },
  {
    label: 'Aggregation',
    url: '/docs/languages/cpp/cpp-driver/:version/aggregation',
  },
  {
    label: 'Data Formats',
    collapsible: true,
    items: [
      {
        label: 'Time Series Data',
        url: '/docs/languages/cpp/cpp-driver/:version/data-formats/time-series',
      },
      {
        label: 'BSON',
        url: '/docs/languages/cpp/cpp-driver/:version/data-formats/working-with-bson',
      },
      {
        label: 'Extended JSON',
        url: '/docs/languages/cpp/cpp-driver/:version/data-formats/extended-json',
      },
    ],
  },
  {
    label: 'Indexes',
    url: '/docs/languages/cpp/cpp-driver/:version/indexes',
    collapsible: true,
    items: [
      {
        label: 'Single Field Indexes',
        url: '/docs/languages/cpp/cpp-driver/:version/indexes/single-field-index',
      },
      {
        label: 'Compound Indexes',
        url: '/docs/languages/cpp/cpp-driver/:version/indexes/compound-index',
      },
      {
        label: 'MongoDB Search Indexes',
        url: '/docs/languages/cpp/cpp-driver/:version/indexes/atlas-search-index',
      },
      {
        label: 'MongoDB Vector Search Indexes',
        url: '/docs/languages/cpp/cpp-driver/:version/indexes/vector-search-index',
      },
    ],
  },
  {
    label: 'Run a Database Command',
    url: '/docs/languages/cpp/cpp-driver/:version/run-command',
  },
  {
    label: 'MongoDB Search',
    url: '/docs/languages/cpp/cpp-driver/:version/mongodb-search',
  },
  {
    label: 'MongoDB Vector Search',
    url: '/docs/languages/cpp/cpp-driver/:version/mongodb-vector-search',
  },
  {
    label: 'Logging and Monitoring',
    collapsible: true,
    items: [
      {
        label: 'Logging',
        url: '/docs/languages/cpp/cpp-driver/:version/logging-monitoring/logging',
      },
      {
        label: 'Monitoring',
        url: '/docs/languages/cpp/cpp-driver/:version/logging-monitoring/monitoring',
      },
      {
        label: 'Change Streams',
        url: '/docs/languages/cpp/cpp-driver/:version/logging-monitoring/change-streams',
      },
    ],
  },
  {
    label: 'Security',
    collapsible: true,
    items: [
      {
        label: 'Authentication',
        url: '/docs/languages/cpp/cpp-driver/:version/security/authentication',
        collapsible: true,
        items: [
          {
            label: 'SCRAM',
            url: '/docs/languages/cpp/cpp-driver/:version/security/authentication/scram',
          },
          {
            label: 'X.509',
            url: '/docs/languages/cpp/cpp-driver/:version/security/authentication/x509',
          },
          {
            label: 'AWS IAM',
            url: '/docs/languages/cpp/cpp-driver/:version/security/authentication/aws-iam',
          },
          {
            label: 'Kerberos (GSSAPI)',
            url: '/docs/languages/cpp/cpp-driver/:version/security/authentication/kerberos',
          },
          {
            label: 'SASL (PLAIN)',
            url: '/docs/languages/cpp/cpp-driver/:version/security/authentication/plain-sasl',
          },
        ],
      },
      {
        label: 'TLS',
        url: '/docs/languages/cpp/cpp-driver/:version/security/tls',
      },
      {
        label: 'In-Use Encryption',
        url: '/docs/languages/cpp/cpp-driver/:version/security/in-use-encryption',
      },
    ],
  },
  {
    label: 'Reference',
    collapsible: true,
    items: [
      {
        label: 'Release Notes',
        url: '/docs/languages/cpp/cpp-driver/:version/reference/whats-new',
      },
      {
        label: 'Upgrade',
        url: '/docs/languages/cpp/cpp-driver/:version/reference/upgrade',
      },
      {
        label: 'Testing',
        url: '/docs/languages/cpp/cpp-driver/:version/reference/testing',
      },
      {
        label: 'API & ABI Versioning',
        url: '/docs/languages/cpp/cpp-driver/:version/reference/api-abi-versioning',
        collapsible: true,
        items: [
          {
            label: 'API Versioning',
            url: '/docs/languages/cpp/cpp-driver/:version/reference/api-abi-versioning/api-versioning',
          },
          {
            label: 'ABI Versioning',
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
    url: '/docs/languages/cpp/cpp-driver/:version/issues-and-help',
  },
]);

export default tocData;
