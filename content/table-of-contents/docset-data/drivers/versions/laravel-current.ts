import { inheritContentSite, type TocItem } from '../../../types';

const tocData: TocItem[] = inheritContentSite('laravel', [
  {
    label: 'Overview',
    url: '/docs/drivers/php/laravel-mongodb/:version/',
  },
  {
    label: 'Get Started',
    url: '/docs/drivers/php/laravel-mongodb/:version/get-started',
  },
  {
    label: 'Connect',
    collapsible: true,
    items: [
      {
        label: 'Connection Guide',
        url: '/docs/drivers/php/laravel-mongodb/:version/connect/connect-to-mongodb',
      },
      {
        label: 'Connection Options',
        url: '/docs/drivers/php/laravel-mongodb/:version/connect/connection-options',
      },
      {
        label: 'TLS Configuration',
        url: '/docs/drivers/php/laravel-mongodb/:version/connect/tls',
      },
    ],
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
    label: 'Model Data',
    collapsible: true,
    items: [
      {
        label: 'Eloquent Model Class',
        url: '/docs/drivers/php/laravel-mongodb/:version/model-data/model-class',
      },
      {
        label: 'Relationships',
        url: '/docs/drivers/php/laravel-mongodb/:version/model-data/relationships',
      },
      {
        label: 'Schema Builder',
        url: '/docs/drivers/php/laravel-mongodb/:version/model-data/schema-builder',
      },
    ],
  },
  {
    label: 'Interact with Data',
    collapsible: true,
    items: [
      {
        label: 'Insert Documents',
        url: '/docs/drivers/php/laravel-mongodb/:version/interact-data/insert',
      },
      {
        label: 'Query Documents',
        url: '/docs/drivers/php/laravel-mongodb/:version/interact-data/query',
        collapsible: true,
        items: [
          {
            label: 'Retrieve MongoDB Data',
            url: '/docs/drivers/php/laravel-mongodb/:version/interact-data/query/retrieve',
          },
          {
            label: 'Search Text',
            url: '/docs/drivers/php/laravel-mongodb/:version/interact-data/query/search-text',
          },
          {
            label: 'Modify Query Results',
            url: '/docs/drivers/php/laravel-mongodb/:version/interact-data/query/modify-results',
          },
          {
            label: 'Read Preference',
            url: '/docs/drivers/php/laravel-mongodb/:version/interact-data/query/read-pref',
          },
          {
            label: 'Query Logging',
            url: '/docs/drivers/php/laravel-mongodb/:version/interact-data/query/query-logging',
          },
        ],
      },
      {
        label: 'Update Documents',
        url: '/docs/drivers/php/laravel-mongodb/:version/interact-data/modify',
      },
      {
        label: 'Delete Documents',
        url: '/docs/drivers/php/laravel-mongodb/:version/interact-data/delete',
      },
      {
        label: 'Aggregation',
        url: '/docs/drivers/php/laravel-mongodb/:version/interact-data/aggregation-builder',
      },
      {
        label: 'MongoDB Search',
        url: '/docs/drivers/php/laravel-mongodb/:version/interact-data/atlas-search',
      },
      {
        label: 'MongoDB Vector Search',
        url: '/docs/drivers/php/laravel-mongodb/:version/interact-data/vector-search',
      },
      {
        label: 'Query Builder',
        url: '/docs/drivers/php/laravel-mongodb/:version/interact-data/query-builder',
      },
      {
        label: 'Transactions',
        url: '/docs/drivers/php/laravel-mongodb/:version/interact-data/transactions',
      },
      {
        label: 'Store Large Files',
        url: '/docs/drivers/php/laravel-mongodb/:version/interact-data/filesystems',
      },
      {
        label: 'Tutorial: Build a Back End',
        url: '/docs/drivers/php/laravel-mongodb/:version/interact-data/backend-service-tutorial',
      },
      {
        label: 'Tutorial: Build a Full-Stack Application',
        url: '/docs/drivers/php/laravel-mongodb/:version/interact-data/application-tutorial',
      },
    ],
  },
  {
    label: 'Integrations',
    collapsible: true,
    items: [
      {
        label: 'Cache & Locks',
        url: '/docs/drivers/php/laravel-mongodb/:version/integrations/cache',
      },
      {
        label: 'Full-Text Search with Scout',
        url: '/docs/drivers/php/laravel-mongodb/:version/integrations/scout',
      },
      {
        label: 'HTTP Sessions',
        url: '/docs/drivers/php/laravel-mongodb/:version/integrations/sessions',
      },
      {
        label: 'Queues',
        url: '/docs/drivers/php/laravel-mongodb/:version/integrations/queues',
      },
      {
        label: 'User Authentication',
        url: '/docs/drivers/php/laravel-mongodb/:version/integrations/user-authentication',
      },
    ],
  },
  {
    label: 'Reference',
    collapsible: true,
    items: [
      {
        label: 'Upgrade',
        url: '/docs/drivers/php/laravel-mongodb/:version/upgrade',
      },
      {
        label: 'Release Notes',
        isExternal: true,
        url: 'https://github.com/mongodb/laravel-mongodb/releases/',
      },
    ],
  },
  {
    label: 'Feature Compatibility',
    url: '/docs/drivers/php/laravel-mongodb/:version/feature-compatibility',
  },
  {
    label: 'Version Compatibility',
    isExternal: true,
    url: 'https://www.mongodb.com/docs/drivers/compatibility/?driver-language=php&php-driver-framework=laravel',
  },
  {
    label: 'Issues & Help',
    url: '/docs/drivers/php/laravel-mongodb/:version/issues-and-help',
  },
]);

export default tocData;
