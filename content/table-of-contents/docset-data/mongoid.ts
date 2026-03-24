import type { TocItem } from '../types';

const tocData: TocItem[] = [
  {
    label: 'Mongoid',
    contentSite: 'mongoid',
    group: true,
    versionDropdown: true,
    items: [
      {
        label: 'Overview',
        contentSite: 'mongoid',
        url: '/docs/mongoid/:version',
      },
      {
        label: 'Get Started: Ruby on Rails',
        contentSite: 'mongoid',
        url: '/docs/mongoid/:version/quick-start-rails',
      },
      {
        label: 'Get Started: Sinatra',
        contentSite: 'mongoid',
        url: '/docs/mongoid/:version/quick-start-sinatra',
      },
      {
        label: 'Connect',
        contentSite: 'mongoid',
        url: '/docs/mongoid/:version/connect',
        collapsible: true,
        items: [
          {
            label: 'Forking Servers',
            contentSite: 'mongoid',
            url: '/docs/mongoid/:version/connect/forking-server-config',
          },
        ],
      },
      {
        label: 'Databases & Collections',
        contentSite: 'mongoid',
        collapsible: true,
        items: [
          {
            label: 'Collection Configuration',
            contentSite: 'mongoid',
            url: '/docs/mongoid/:version/databases-collections/collection-config',
          },
          {
            label: 'Persistence Configuration',
            contentSite: 'mongoid',
            url: '/docs/mongoid/:version/databases-collections/persistence-config',
          },
          {
            label: 'Sharding',
            contentSite: 'mongoid',
            url: '/docs/mongoid/:version/databases-collections/sharding',
          },
        ],
      },
      {
        label: 'Model Data',
        contentSite: 'mongoid',
        collapsible: true,
        items: [
          {
            label: 'Callbacks',
            contentSite: 'mongoid',
            url: '/docs/mongoid/:version/data-modeling/callbacks',
          },
          {
            label: 'Data Associations',
            contentSite: 'mongoid',
            url: '/docs/mongoid/:version/data-modeling/associations',
          },
          {
            label: 'Documents',
            contentSite: 'mongoid',
            url: '/docs/mongoid/:version/data-modeling/documents',
          },
          {
            label: 'Document Validation',
            contentSite: 'mongoid',
            url: '/docs/mongoid/:version/data-modeling/validation',
          },
          {
            label: 'Field Behaviors',
            contentSite: 'mongoid',
            url: '/docs/mongoid/:version/data-modeling/field-behaviors',
          },
          {
            label: 'Field Types',
            contentSite: 'mongoid',
            url: '/docs/mongoid/:version/data-modeling/field-types',
          },
          {
            label: 'Indexes',
            contentSite: 'mongoid',
            url: '/docs/mongoid/:version/data-modeling/indexes',
          },
          {
            label: 'Inheritance',
            contentSite: 'mongoid',
            url: '/docs/mongoid/:version/data-modeling/inheritance',
          },
          {
            label: 'Nested Attributes',
            contentSite: 'mongoid',
            url: '/docs/mongoid/:version/data-modeling/nested-attributes',
          },
        ],
      },
      {
        label: 'Interact with Data',
        contentSite: 'mongoid',
        collapsible: true,
        items: [
          {
            label: 'Aggregation',
            contentSite: 'mongoid',
            url: '/docs/mongoid/:version/interact-data/aggregation',
          },
          {
            label: 'CRUD Operations',
            contentSite: 'mongoid',
            url: '/docs/mongoid/:version/interact-data/crud',
          },
          {
            label: 'Modify Query Results',
            contentSite: 'mongoid',
            url: '/docs/mongoid/:version/interact-data/modify-results',
          },
          {
            label: 'Query Text',
            contentSite: 'mongoid',
            url: '/docs/mongoid/:version/interact-data/text-search',
          },
          {
            label: 'Specify a Query',
            contentSite: 'mongoid',
            url: '/docs/mongoid/:version/interact-data/specify-query',
            collapsible: true,
            items: [
              {
                label: 'Scoping',
                contentSite: 'mongoid',
                url: '/docs/mongoid/:version/interact-data/scoping',
              },
              {
                label: 'Persist Data from Queries',
                contentSite: 'mongoid',
                url: '/docs/mongoid/:version/interact-data/query-persistence',
              },
              {
                label: 'Query Cache',
                contentSite: 'mongoid',
                url: '/docs/mongoid/:version/interact-data/query-cache',
              },
              {
                label: 'Asynchronous Queries',
                contentSite: 'mongoid',
                url: '/docs/mongoid/:version/interact-data/query-async',
              },
            ],
          },
          {
            label: 'Transactions and Sessions',
            contentSite: 'mongoid',
            url: '/docs/mongoid/:version/interact-data/transaction',
          },
          {
            label: 'Tutorial: MongoDB Search',
            contentSite: 'mongoid',
            url: '/docs/mongoid/:version/interact-data/atlas-search-tutorial',
          },
        ],
      },
      {
        label: 'Logging',
        contentSite: 'mongoid',
        url: '/docs/mongoid/:version/logging-config',
      },
      {
        label: 'In-Use Encryption',
        contentSite: 'mongoid',
        url: '/docs/mongoid/:version/encryption',
      },
      {
        label: 'Third-Party Integrations',
        contentSite: 'mongoid',
        collapsible: true,
        items: [
          {
            label: 'External Tools',
            contentSite: 'mongoid',
            url: '/docs/mongoid/:version/integrations-tools/external-resources',
          },
          {
            label: 'Mongoid for Existing Apps',
            contentSite: 'mongoid',
            url: '/docs/mongoid/:version/integrations-tools/add-existing',
          },
          {
            label: 'Rails Configuration Options',
            contentSite: 'mongoid',
            url: '/docs/mongoid/:version/integrations-tools/rails-integration',
          },
        ],
      },
      {
        label: 'Reference',
        contentSite: 'mongoid',
        collapsible: true,
        items: [
          {
            label: 'Release Notes',
            contentSite: 'mongoid',
            url: '/docs/mongoid/:version/reference/release-notes',
          },
          {
            label: 'Version 7.x Docs',
            isExternal: true,
            url: 'https://github.com/mongodb/mongoid/tree/7.5-stable/docs',
          },
          {
            label: 'View the Source',
            isExternal: true,
            url: 'https://github.com/mongodb/mongoid',
          },
        ],
      },
      {
        label: 'Version Compatibility',
        contentSite: 'drivers',
        url: '/docs/drivers/compatibility/?driver-language=ruby&ruby-driver-framework=mongoid',
      },
      {
        label: 'API Documentation',
        contentSite: 'mongoid',
        collapsible: true,
        items: [
          {
            label: 'Mongoid',
            isExternal: true,
            url: 'https://www.mongodb.com/docs/mongoid/current/api',
          },
          {
            label: 'Ruby Driver',
            isExternal: true,
            url: 'https://www.mongodb.com/docs/ruby-driver/current/api',
          },
        ],
      },
      {
        label: 'Issues & Help',
        contentSite: 'mongoid',
        url: '/docs/mongoid/:version/issues-and-help',
        collapsible: true,
        items: [
          {
            label: 'Code Documentation',
            contentSite: 'mongoid',
            url: '/docs/mongoid/:version/code-documentation',
          },
        ],
      },
    ],
  },
];

export default tocData;
