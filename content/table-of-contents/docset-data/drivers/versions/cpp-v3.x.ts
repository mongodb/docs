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
    label: 'Connect to MongoDB',
    url: '/docs/languages/cpp/cpp-driver/:version/connect',
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
      },
      {
        label: 'Configure TLS',
        url: '/docs/languages/cpp/cpp-driver/:version/connect/tls',
      },
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
    url: '/docs/languages/cpp/cpp-driver/:version/read',
    collapsible: true,
    items: [
      {
        label: 'Retrieve Data',
        url: '/docs/languages/cpp/cpp-driver/:version/read/retrieve',
      },
      {
        label: 'Specify a Query',
        url: '/docs/languages/cpp/cpp-driver/:version/read/specify-a-query',
      },
      {
        label: 'Specify Documents to Return',
        url: '/docs/languages/cpp/cpp-driver/:version/read/specify-documents-to-return',
      },
      {
        label: 'Specify Fields to Return',
        url: '/docs/languages/cpp/cpp-driver/:version/read/project',
      },
      {
        label: 'Distinct Field Values',
        url: '/docs/languages/cpp/cpp-driver/:version/read/distinct',
      },
      {
        label: 'Count Documents',
        url: '/docs/languages/cpp/cpp-driver/:version/read/count',
      },
      {
        label: 'Cursors',
        url: '/docs/languages/cpp/cpp-driver/:version/read/cursor',
      },
      {
        label: 'Monitor Changes',
        url: '/docs/languages/cpp/cpp-driver/:version/read/change-streams',
      },
    ],
  },
  {
    label: 'Write Data',
    url: '/docs/languages/cpp/cpp-driver/:version/write',
    collapsible: true,
    items: [
      {
        label: 'Insert',
        url: '/docs/languages/cpp/cpp-driver/:version/write/insert',
      },
      {
        label: 'Update',
        url: '/docs/languages/cpp/cpp-driver/:version/write/update',
      },
      {
        label: 'Replace',
        url: '/docs/languages/cpp/cpp-driver/:version/write/replace',
      },
      {
        label: 'Delete',
        url: '/docs/languages/cpp/cpp-driver/:version/write/delete',
      },
      {
        label: 'Bulk Write',
        url: '/docs/languages/cpp/cpp-driver/:version/write/bulk-write',
      },
      {
        label: 'GridFS',
        url: '/docs/languages/cpp/cpp-driver/:version/write/gridfs',
      },
      {
        label: 'Transactions',
        url: '/docs/languages/cpp/cpp-driver/:version/write/transactions',
      },
    ],
  },
  {
    label: 'Databases & Collections',
    url: '/docs/languages/cpp/cpp-driver/:version/databases-collections',
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
    ],
  },
  {
    label: 'Aggregation',
    url: '/docs/languages/cpp/cpp-driver/:version/aggregation',
  },
  {
    label: 'Run a Command',
    url: '/docs/languages/cpp/cpp-driver/:version/run-command',
  },
  {
    label: 'Security',
    url: '/docs/languages/cpp/cpp-driver/:version/security',
    collapsible: true,
    items: [
      {
        label: 'Authentication',
        url: '/docs/languages/cpp/cpp-driver/:version/security/authentication',
      },
      {
        label: 'Enterprise Authentication',
        url: '/docs/languages/cpp/cpp-driver/:version/security/enterprise-authentication',
      },
      {
        label: 'In-Use Encryption',
        url: '/docs/languages/cpp/cpp-driver/:version/security/in-use-encryption',
      },
    ],
  },
  {
    label: 'Specialized Data Formats',
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
    ],
  },
  {
    label: 'Advanced Configuration & Installation',
    url: '/docs/languages/cpp/cpp-driver/:version/advanced-installation',
  },
  {
    label: 'Include & Link the Driver',
    url: '/docs/languages/cpp/cpp-driver/:version/include-link',
    versions: { excludes: ['v4.0', 'v3.11'] },
  },
  {
    label: 'Thread & Fork Safety',
    url: '/docs/languages/cpp/cpp-driver/:version/thread-safety',
  },
  {
    label: 'API & ABI Versioning',
    url: '/docs/languages/cpp/cpp-driver/:version/api-abi-versioning',
    collapsible: true,
    items: [
      {
        label: 'API Versioning',
        url: '/docs/languages/cpp/cpp-driver/:version/api-abi-versioning/api-versioning',
      },
      {
        label: 'ABI Versioning',
        url: '/docs/languages/cpp/cpp-driver/:version/api-abi-versioning/abi-versioning',
      },
    ],
  },
  {
    label: "What's New",
    url: '/docs/languages/cpp/cpp-driver/:version/whats-new',
  },
  {
    label: 'Upgrade',
    url: '/docs/languages/cpp/cpp-driver/:version/upgrade',
  },
  {
    label: 'Testing',
    url: '/docs/languages/cpp/cpp-driver/:version/testing',
  },
  {
    label: 'Compatibility',
    contentSite: 'drivers',
    url: '/docs/drivers/compatibility/?driver-language=cpp',
  },
  {
    label: 'Issues & Help',
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
]);

export default tocData;
