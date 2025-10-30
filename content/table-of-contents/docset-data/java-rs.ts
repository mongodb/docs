import type { TocItem } from '../types';
import docsVersions from '../version-arrays/drivers/java-rs-versions';

const outdatedVersions = docsVersions.before('v5.1', { inclusive: true });

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
        versions: { excludes: outdatedVersions },
        items: [
          {
            label: 'Download & Install',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/get-started/download-and-install',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'Create a Deployment',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/get-started/create-a-deployment',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'Create a Connection String',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/get-started/create-a-connection-string',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'Run a Sample Query',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/get-started/run-sample-query',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'Next Steps',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/get-started/next-steps',
            versions: { excludes: outdatedVersions },
          },
        ],
      },
      {
        label: 'Connect',
        contentSite: 'java-rs',
        url: '/docs/languages/java/reactive-streams-driver/:version/connect',
        collapsible: true,
        versions: { excludes: outdatedVersions },
        items: [
          {
            label: 'Create a MongoClient',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/connect-to-mongo/create-a-mongo-client',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'Choose a Connection Target',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/connect-to-mongo/choose-connection-target',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'Connection URI Options',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/connect-to-mongo/connection-options',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'Limit Execution Time',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/connect-to-mongo/csot',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'TLS/SSL',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/connect-to-mongo/tls',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'Compress Network Traffic',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/connect-to-mongo/network-compression',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'Stable API',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/connect-to-mongo/stable-api',
            versions: { excludes: outdatedVersions },
          },
        ],
      },
      {
        label: 'Databases & Collections',
        contentSite: 'java-rs',
        url: '/docs/languages/java/reactive-streams-driver/:version/db-coll',
        versions: { excludes: outdatedVersions },
      },
      {
        label: 'Write Data',
        contentSite: 'java-rs',
        url: '/docs/languages/java/reactive-streams-driver/:version/write-data-to-mongo',
        collapsible: true,
        versions: { excludes: outdatedVersions },
        items: [
          {
            label: 'Insert',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/write/insert-documents',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'Update',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/write/write-update-documents',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'Replace',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/write/replace-documents',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'Delete',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/write/write-delete-documents',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'Bulk Write',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/write/bulk-writes',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'Transactions',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/write/transactions',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'GridFS',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/write/store-large-docs',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'Write Concern',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/write/write-concern',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'Run a Database Command',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/write/run-command',
            versions: { excludes: outdatedVersions },
          },
        ],
      },
      {
        label: 'Read Data',
        contentSite: 'java-rs',
        url: '/docs/languages/java/reactive-streams-driver/:version/read-data-from-mongo',
        collapsible: true,
        versions: { excludes: outdatedVersions },
        items: [
          {
            label: 'Query',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/read/specify-a-query',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'Retrieve Data',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/read/retrieve-data',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'Specify Fields to Return',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/read/specify-fields-return',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'Specify Documents to Return',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/read/specify-documents-to-return',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'Count Documents',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/read/count-documents',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'Distinct Field Values',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/read/distinct',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'Data Cursors',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/read/cursors',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'Read Preference',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/read/read-preference',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'Text Query',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/read/text-search',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'Geospatial Search',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/read/geo',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'Monitor Data Changes',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/read/change-streams',
            versions: { excludes: outdatedVersions },
          },
        ],
      },
      {
        label: 'Indexes',
        contentSite: 'java-rs',
        url: '/docs/languages/java/reactive-streams-driver/:version/indexes',
        versions: { excludes: outdatedVersions },
      },
      {
        label: 'Aggregation',
        contentSite: 'java-rs',
        url: '/docs/languages/java/reactive-streams-driver/:version/aggregation',
        versions: { excludes: outdatedVersions },
      },
      {
        label: 'Security',
        contentSite: 'java-rs',
        collapsible: true,
        versions: { excludes: outdatedVersions },
        items: [
          {
            label: 'Authentication',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/security/auth',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'Enterprise Authentication',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/security/enterprise-authentication',
            versions: { excludes: outdatedVersions },
          },
          {
            label: 'In-Use Encryption',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/security/encrypt',
            versions: { excludes: outdatedVersions },
          },
        ],
      },
      {
        label: 'Replica Set Operations',
        contentSite: 'java-rs',
        url: '/docs/languages/java/reactive-streams-driver/:version/read-write-configuration',
        versions: { excludes: outdatedVersions },
      },
      {
        label: 'Data Formats',
        contentSite: 'java-rs',
        collapsible: true,
        versions: { excludes: outdatedVersions },
        items: [
          {
            label: 'Time Series',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/data-formats/time-series',
            versions: { excludes: outdatedVersions },
          },
        ],
      },
      {
        label: 'Logging',
        contentSite: 'java-rs',
        url: '/docs/languages/java/reactive-streams-driver/:version/logging',
        versions: { excludes: outdatedVersions },
      },
      {
        label: 'Monitor Your Deployment',
        contentSite: 'java-rs',
        url: '/docs/languages/java/reactive-streams-driver/:version/monitoring',
        versions: { excludes: outdatedVersions },
      },
      {
        label: 'Validate Driver Signatures',
        contentSite: 'java-rs',
        url: '/docs/languages/java/reactive-streams-driver/:version/validate-signatures',
        versions: { excludes: outdatedVersions },
      },
      {
        label: 'POJO CRUD Examples',
        contentSite: 'java-rs',
        url: '/docs/languages/java/reactive-streams-driver/:version/pojo-examples',
        versions: { excludes: outdatedVersions },
      },
      {
        label: 'Custom Subscribers',
        contentSite: 'java-rs',
        url: '/docs/languages/java/reactive-streams-driver/:version/custom-implementations',
        versions: { excludes: outdatedVersions },
      },
      {
        label: "What's New",
        contentSite: 'java-rs',
        url: '/docs/languages/java/reactive-streams-driver/:version/whats-new',
        versions: { excludes: outdatedVersions },
      },
      {
        label: 'Issues & Help',
        contentSite: 'java-rs',
        url: '/docs/languages/java/reactive-streams-driver/:version/issues-and-help',
        versions: { excludes: outdatedVersions },
      },
      {
        label: 'Compatibility',
        contentSite: 'drivers',
        url: '/docs/drivers/compatibility/?driver-language=java&java-driver-framework=java-async',
        versions: { excludes: outdatedVersions },
      },
      {
        label: 'Upgrade',
        contentSite: 'java-rs',
        url: '/docs/languages/java/reactive-streams-driver/:version/upgrade',
        versions: { excludes: outdatedVersions },
      },
      {
        label: 'API Documentation',
        isExternal: true,
        url: 'https://mongodb.github.io/mongo-java-driver/5.6/apidocs/driver-reactive-streams/',
        versions: { excludes: outdatedVersions },
      },
      // Outdated ToC below
      {
        label: 'Installation',
        contentSite: 'java-rs',
        url: '/docs/languages/java/reactive-streams-driver/:version/installation',
        versions: { includes: outdatedVersions },
      },
      {
        label: 'Get Started',
        contentSite: 'java-rs',
        url: '/docs/languages/java/reactive-streams-driver/:version/get-started',
        collapsible: true,
        versions: { includes: outdatedVersions },
        items: [
          {
            label: 'Primer',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/get-started/primer',
          },
          {
            label: 'Quick Start',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/get-started/quickstart',
          },
          {
            label: 'Quick Start (POJO Examples)',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/get-started/pojo-qs',
          },
        ],
      },
      {
        label: "What's New",
        contentSite: 'java-rs',
        url: '/docs/languages/java/reactive-streams-driver/:version/whats-new',
        versions: { includes: outdatedVersions },
      },
      {
        label: 'Tutorials',
        contentSite: 'java-rs',
        url: '/docs/languages/java/reactive-streams-driver/:version/tutorials',
        collapsible: true,
        versions: { includes: outdatedVersions },
        items: [
          {
            label: 'Connect',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/tutorials/connect',
            collapsible: true,
            items: [
              {
                label: 'TLS/SSL',
                contentSite: 'java-rs',
                url: '/docs/languages/java/reactive-streams-driver/:version/tutorials/connect/tls',
              },
              {
                label: 'Authentication',
                contentSite: 'java-rs',
                url: '/docs/languages/java/reactive-streams-driver/:version/tutorials/connect/auth',
              },
              {
                label: 'Compression',
                contentSite: 'java-rs',
                url: '/docs/languages/java/reactive-streams-driver/:version/tutorials/connect/compression',
              },
            ],
          },
          {
            label: 'Databases & Collections',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/tutorials/db-coll',
          },
          {
            label: 'Create Indexes',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/tutorials/indexes',
          },
          {
            label: 'Read Operations',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/tutorials/read-ops',
          },
          {
            label: 'Client-Side Encryption',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/tutorials/encrypt',
          },
          {
            label: 'Write Operations',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/tutorials/write-ops',
            collapsible: true,
            items: [
              {
                label: 'Bulk Write',
                contentSite: 'java-rs',
                url: '/docs/languages/java/reactive-streams-driver/:version/tutorials/bulk-writes',
              },
            ],
          },
          {
            label: 'Aggregation Framework',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/tutorials/aggregation',
          },
          {
            label: 'Change Streams',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/tutorials/change-stream',
          },
          {
            label: 'Text Query',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/tutorials/text-search',
          },
          {
            label: 'Geospatial Search',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/tutorials/geo',
          },
          {
            label: 'GridFS',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/tutorials/gridfs',
          },
          {
            label: 'Run Commands',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/tutorials/command',
          },
        ],
      },
      {
        label: 'Reference',
        contentSite: 'java-rs',
        url: '/docs/languages/java/reactive-streams-driver/:version/reference',
        collapsible: true,
        versions: { includes: outdatedVersions },
        items: [
          {
            label: 'Logging',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/reference/logging',
          },
          {
            label: 'JMX Monitoring',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/:version/reference/monitoring',
          },
        ],
      },
      {
        label: 'Validate Driver Signatures',
        contentSite: 'java-rs',
        url: '/docs/languages/java/reactive-streams-driver/:version/validate-signatures',
        versions: { includes: outdatedVersions },
      },
      {
        label: 'View the Source',
        contentSite: 'java-rs',
        url: 'https://github.com/mongodb/mongo-java-driver',
        versions: { includes: outdatedVersions },
      },
      {
        label: 'API Documentation',
        contentSite: 'java-rs',
        url: 'https://mongodb.github.io/mongo-java-driver/5.1/apidocs/mongodb-driver-reactivestreams/',
        versions: { includes: outdatedVersions },
      },
      {
        label: 'Previous Versions',
        contentSite: 'java-rs',
        url: 'https://mongodb.github.io/mongo-java-driver/',
        versions: { includes: outdatedVersions },
      },
    ],
  },
];

export default tocData;
