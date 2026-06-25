import { inheritContentSite, type TocItem } from '../../../types';

const tocData: TocItem[] = inheritContentSite('laravel', [
  {
    label: 'Overview',
    url: '/docs/drivers/php/laravel-mongodb/:version/',
  },
  {
    label: 'Quick Start',
    url: '/docs/drivers/php/laravel-mongodb/:version/quick-start',
    collapsible: true,
    items: [
      {
        label: 'Download & Install',
        url: '/docs/drivers/php/laravel-mongodb/:version/quick-start/download-and-install',
      },
      {
        label: 'Create a Deployment',
        url: '/docs/drivers/php/laravel-mongodb/:version/quick-start/create-a-deployment',
      },
      {
        label: 'Create a Connection String',
        url: '/docs/drivers/php/laravel-mongodb/:version/quick-start/create-a-connection-string',
      },
      {
        label: 'Configure Your Connection',
        url: '/docs/drivers/php/laravel-mongodb/:version/quick-start/configure-mongodb',
      },
      {
        label: 'View Data',
        url: '/docs/drivers/php/laravel-mongodb/:version/quick-start/view-data',
      },
      {
        label: 'Write Data',
        url: '/docs/drivers/php/laravel-mongodb/:version/quick-start/write-data',
      },
      {
        label: 'Next Steps',
        url: '/docs/drivers/php/laravel-mongodb/:version/quick-start/next-steps',
      },
    ],
  },
  {
    label: 'Usage Examples',
    url: '/docs/drivers/php/laravel-mongodb/:version/usage-examples',
    collapsible: true,
    items: [
      {
        label: 'Find a Document',
        url: '/docs/drivers/php/laravel-mongodb/:version/usage-examples/findOne',
      },
      {
        label: 'Find Multiple Documents',
        url: '/docs/drivers/php/laravel-mongodb/:version/usage-examples/find',
      },
      {
        label: 'Insert a Document',
        url: '/docs/drivers/php/laravel-mongodb/:version/usage-examples/insertOne',
      },
      {
        label: 'Insert Multiple Documents',
        url: '/docs/drivers/php/laravel-mongodb/:version/usage-examples/insertMany',
      },
      {
        label: 'Update a Document',
        url: '/docs/drivers/php/laravel-mongodb/:version/usage-examples/updateOne',
      },
      {
        label: 'Update Multiple Documents',
        url: '/docs/drivers/php/laravel-mongodb/:version/usage-examples/updateMany',
      },
      {
        label: 'Delete a Document',
        url: '/docs/drivers/php/laravel-mongodb/:version/usage-examples/deleteOne',
      },
      {
        label: 'Delete Multiple Documents',
        url: '/docs/drivers/php/laravel-mongodb/:version/usage-examples/deleteMany',
      },
      {
        label: 'Count Documents',
        url: '/docs/drivers/php/laravel-mongodb/:version/usage-examples/count',
      },
      {
        label: 'Distinct Field Values',
        url: '/docs/drivers/php/laravel-mongodb/:version/usage-examples/distinct',
      },
      {
        label: 'Run a Command',
        url: '/docs/drivers/php/laravel-mongodb/:version/usage-examples/runCommand',
      },
      {
        label: 'Tutorial: Build a Full-Stack Application',
        url: '/docs/drivers/php/laravel-mongodb/:version/usage-examples/application-tutorial',
      },
    ],
  },
  {
    label: 'Release Notes',
    isExternal: true,
    url: 'https://github.com/mongodb/laravel-mongodb/releases/',
  },
  {
    label: 'Fundamentals',
    collapsible: true,
    items: [
      {
        label: 'Connections',
        collapsible: true,
        items: [
          {
            label: 'Connection Guide',
            url: '/docs/drivers/php/laravel-mongodb/:version/fundamentals/connection/connect-to-mongodb',
          },
          {
            label: 'Connection Options',
            url: '/docs/drivers/php/laravel-mongodb/:version/fundamentals/connection/connection-options',
          },
          {
            label: 'Configure TLS',
            url: '/docs/drivers/php/laravel-mongodb/:version/fundamentals/connection/tls',
          },
        ],
      },
      {
        label: 'Read Operations',
        url: '/docs/drivers/php/laravel-mongodb/:version/fundamentals/read-operations',
        collapsible: true,
        items: [
          {
            label: 'Retrieve Data',
            url: '/docs/drivers/php/laravel-mongodb/:version/fundamentals/read-operations/retrieve',
          },
          {
            label: 'Query Text',
            url: '/docs/drivers/php/laravel-mongodb/:version/fundamentals/read-operations/search-text',
          },
          {
            label: 'Modify Query Results',
            url: '/docs/drivers/php/laravel-mongodb/:version/fundamentals/read-operations/modify-results',
          },
          {
            label: 'Read Preference',
            url: '/docs/drivers/php/laravel-mongodb/:version/fundamentals/read-operations/read-pref',
          },
        ],
      },
      {
        label: 'Write Operations',
        url: '/docs/drivers/php/laravel-mongodb/:version/fundamentals/write-operations',
        collapsible: true,
        items: [
          {
            label: 'Insert',
            url: '/docs/drivers/php/laravel-mongodb/:version/fundamentals/write-operations/insert',
          },
          {
            label: 'Modify',
            url: '/docs/drivers/php/laravel-mongodb/:version/fundamentals/write-operations/modify',
          },
          {
            label: 'Delete',
            url: '/docs/drivers/php/laravel-mongodb/:version/fundamentals/write-operations/delete',
          },
        ],
      },
      {
        label: 'Aggregation Builder',
        url: '/docs/drivers/php/laravel-mongodb/:version/fundamentals/aggregation-builder',
      },
    ],
  },
  {
    label: 'Eloquent Models',
    url: '/docs/drivers/php/laravel-mongodb/:version/eloquent-models',
    collapsible: true,
    items: [
      {
        label: 'Eloquent Model Class',
        url: '/docs/drivers/php/laravel-mongodb/:version/eloquent-models/model-class',
      },
      {
        label: 'Relationships',
        url: '/docs/drivers/php/laravel-mongodb/:version/eloquent-models/relationships',
      },
      {
        label: 'Schema Builder',
        url: '/docs/drivers/php/laravel-mongodb/:version/eloquent-models/schema-builder',
      },
    ],
  },
  {
    label: 'Query Builder',
    url: '/docs/drivers/php/laravel-mongodb/:version/query-builder',
  },
  {
    label: 'Databases & Collections',
    url: '/docs/drivers/php/laravel-mongodb/:version/database-collection',
    collapsible: true,
    items: [
      {
        label: 'Time Series',
        url: '/docs/drivers/php/laravel-mongodb/:version/database-collection/time-series',
      },
    ],
  },
  {
    label: 'User Authentication',
    url: '/docs/drivers/php/laravel-mongodb/:version/user-authentication',
  },
  {
    label: 'Cache & Locks',
    url: '/docs/drivers/php/laravel-mongodb/:version/cache',
  },
  {
    label: 'Queues',
    url: '/docs/drivers/php/laravel-mongodb/:version/queues',
  },
  {
    label: 'Transactions',
    url: '/docs/drivers/php/laravel-mongodb/:version/transactions',
  },
  {
    label: 'GridFS Filesystems',
    url: '/docs/drivers/php/laravel-mongodb/:version/filesystems',
  },
  {
    label: 'Issues & Help',
    url: '/docs/drivers/php/laravel-mongodb/:version/issues-and-help',
  },
  {
    label: 'Feature Compatibility',
    url: '/docs/drivers/php/laravel-mongodb/:version/feature-compatibility',
  },
  {
    label: 'Compatibility',
    isExternal: true,
    url: 'https://www.mongodb.com/docs/drivers/compatibility/?driver-language=php&php-driver-framework=laravel',
  },
  {
    label: 'Upgrade',
    url: '/docs/drivers/php/laravel-mongodb/:version/upgrade',
  },
]);

export default tocData;
