import type { TocItem } from '../types';

const tocData: TocItem[] = [
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
        url: '/docs/languages/java/reactive-streams-driver/:version/getting-started',
        collapsible: true,
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
        url: '/docs/languages/java/reactive-streams-driver/:version/connect',
        collapsible: true,
        items: [
          {
            label: 'Create a MongoClient',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/connect-to-mongo/create-a-mongo-client',
          },
          {
            label: 'Choose a Connection Target',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/connect-to-mongo/choose-connection-target',
          },
          {
            label: 'Connection URI Options',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/connect-to-mongo/connection-options',
          },
          {
            label: 'Limit Execution Time',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/connect-to-mongo/csot',
          },
          {
            label: 'TLS/SSL',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/connect-to-mongo/tls',
          },
          {
            label: 'Compress Network Traffic',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/connect-to-mongo/network-compression',
          },
          {
            label: 'Stable API',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/connect-to-mongo/stable-api',
          },
        ],
      },
      {
        label: 'Databases & Collections',
        contentSite: 'java-rs',
        url: '/docs/languages/java/reactive-streams-driver/:version/db-coll',
      },
      {
        label: 'Write Data',
        contentSite: 'java-rs',
        url: '/docs/languages/java/reactive-streams-driver/:version/write-data-to-mongo',
        collapsible: true,
        items: [
          {
            label: 'Insert',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/write/insert-documents',
          },
          {
            label: 'Update',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/write/write-update-documents',
          },
          {
            label: 'Replace',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/write/replace-documents',
          },
          {
            label: 'Delete',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/write/write-delete-documents',
          },
          {
            label: 'Bulk Write',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/write/bulk-writes',
          },
          {
            label: 'Transactions',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/write/transactions',
          },
          {
            label: 'GridFS',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/write/store-large-docs',
          },
          {
            label: 'Write Concern',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/write/write-concern',
          },
          {
            label: 'Run a Database Command',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/write/run-command',
          },
        ],
      },
      {
        label: 'Read Data',
        contentSite: 'java-rs',
        url: '/docs/languages/java/reactive-streams-driver/:version/read-data-from-mongo',
        collapsible: true,
        items: [
          {
            label: 'Query',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/read/specify-a-query',
          },
          {
            label: 'Retrieve Data',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/read/retrieve-data',
          },
          {
            label: 'Specify Fields to Return',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/read/specify-fields-return',
          },
          {
            label: 'Specify Documents to Return',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/read/specify-documents-to-return',
          },
          {
            label: 'Count Documents',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/read/count-documents',
          },
          {
            label: 'Distinct Field Values',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/read/distinct',
          },
          {
            label: 'Data Cursors',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/read/cursors',
          },
          {
            label: 'Read Preference',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/read/read-preference',
          },
          {
            label: 'Text Query',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/read/text-search',
          },
          {
            label: 'Geospatial Search',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/read/geo',
          },
          {
            label: 'Monitor Data Changes',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/read/change-streams',
          },
        ],
      },
      {
        label: 'Indexes',
        contentSite: 'java-rs',
        url: '/docs/languages/java/reactive-streams-driver/:version/indexes',
      },
      {
        label: 'Aggregation',
        contentSite: 'java-rs',
        url: '/docs/languages/java/reactive-streams-driver/:version/aggregation',
      },
      {
        label: 'Security',
        contentSite: 'java-rs',
        collapsible: true,
        items: [
          {
            label: 'Authentication',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/security/auth',
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
        ],
      },
      {
        label: 'Replica Set Operations',
        contentSite: 'java-rs',
        url: '/docs/languages/java/reactive-streams-driver/:version/read-write-configuration',
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
        ],
      },
      {
        label: 'Logging',
        contentSite: 'java-rs',
        url: '/docs/languages/java/reactive-streams-driver/:version/logging',
      },
      {
        label: 'Monitor Your Deployment',
        contentSite: 'java-rs',
        url: '/docs/languages/java/reactive-streams-driver/:version/monitoring',
      },
      {
        label: 'Validate Driver Signatures',
        contentSite: 'java-rs',
        url: '/docs/languages/java/reactive-streams-driver/:version/validate-signatures',
      },
      {
        label: 'POJO CRUD Examples',
        contentSite: 'java-rs',
        url: '/docs/languages/java/reactive-streams-driver/:version/pojo-examples',
      },
      {
        label: 'Custom Subscribers',
        contentSite: 'java-rs',
        url: '/docs/languages/java/reactive-streams-driver/:version/custom-implementations',
      },
      {
        label: "What's New",
        contentSite: 'java-rs',
        url: '/docs/languages/java/reactive-streams-driver/:version/whats-new',
      },
      {
        label: 'Issues & Help',
        contentSite: 'java-rs',
        url: '/docs/languages/java/reactive-streams-driver/:version/issues-and-help',
      },
      {
        label: 'Compatibility',
        contentSite: 'drivers',
        url: '/docs/drivers/compatibility/?driver-language=java&java-driver-framework=java-async',
      },
      {
        label: 'Upgrade',
        contentSite: 'java-rs',
        url: '/docs/languages/java/reactive-streams-driver/:version/upgrade',
      },
      {
        label: 'API Documentation',
        isExternal: true,
        url: 'https://mongodb.github.io/mongo-java-driver/5.6/apidocs/driver-reactive-streams/',
      },
    ],
  },
];

export default tocData;
