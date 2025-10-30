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
        label: 'Quick Start - Ruby on Rails',
        contentSite: 'mongoid',
        url: '/docs/mongoid/:version/quick-start-rails',
        collapsible: true,
        items: [
          {
            label: 'Download & Install',
            contentSite: 'mongoid',
            url: '/docs/mongoid/:version/quick-start-rails/download-and-install',
          },
          {
            label: 'Create a Deployment',
            contentSite: 'mongoid',
            url: '/docs/mongoid/:version/quick-start-rails/create-a-deployment',
          },
          {
            label: 'Create a Connection String',
            contentSite: 'mongoid',
            url: '/docs/mongoid/:version/quick-start-rails/create-a-connection-string',
          },
          {
            label: 'Configure Your Connection',
            contentSite: 'mongoid',
            url: '/docs/mongoid/:version/quick-start-rails/configure-mongodb',
          },
          {
            label: 'View Data',
            contentSite: 'mongoid',
            url: '/docs/mongoid/:version/quick-start-rails/view-data',
          },
          {
            label: 'Write Data',
            contentSite: 'mongoid',
            url: '/docs/mongoid/:version/quick-start-rails/write-data',
          },
          {
            label: 'Next Steps',
            contentSite: 'mongoid',
            url: '/docs/mongoid/:version/quick-start-rails/next-steps',
          },
        ],
      },
      {
        label: 'Quick Start - Sinatra',
        contentSite: 'mongoid',
        url: '/docs/mongoid/:version/quick-start-sinatra',
        collapsible: true,
        items: [
          {
            label: 'Download & Install',
            contentSite: 'mongoid',
            url: '/docs/mongoid/:version/quick-start-sinatra/download-and-install',
          },
          {
            label: 'Create a Deployment',
            contentSite: 'mongoid',
            url: '/docs/mongoid/:version/quick-start-sinatra/create-a-deployment',
          },
          {
            label: 'Create a Connection String',
            contentSite: 'mongoid',
            url: '/docs/mongoid/:version/quick-start-sinatra/create-a-connection-string',
          },
          {
            label: 'Configure Your Connection',
            contentSite: 'mongoid',
            url: '/docs/mongoid/:version/quick-start-sinatra/configure-mongodb',
          },
          {
            label: 'View Data',
            contentSite: 'mongoid',
            url: '/docs/mongoid/:version/quick-start-sinatra/view-data',
          },
          {
            label: 'Write Data',
            contentSite: 'mongoid',
            url: '/docs/mongoid/:version/quick-start-sinatra/write-data',
          },
          {
            label: 'Next Steps',
            contentSite: 'mongoid',
            url: '/docs/mongoid/:version/quick-start-sinatra/next-steps',
          },
        ],
      },
      {
        label: 'Configuration',
        contentSite: 'mongoid',
        url: '/docs/mongoid/:version/configuration',
        collapsible: true,
        items: [
          {
            label: 'Application Configuration',
            contentSite: 'mongoid',
            url: '/docs/mongoid/:version/configuration/app-config',
          },
          {
            label: 'Persistence Targets',
            contentSite: 'mongoid',
            url: '/docs/mongoid/:version/configuration/persistence-config',
          },
          {
            label: 'Sharding',
            contentSite: 'mongoid',
            url: '/docs/mongoid/:version/configuration/sharding',
          },
          {
            label: 'Logging',
            contentSite: 'mongoid',
            url: '/docs/mongoid/:version/configuration/logging-config',
          },
          {
            label: 'Query Cache Middleware',
            contentSite: 'mongoid',
            url: '/docs/mongoid/:version/configuration/query-cache-config',
          },
          {
            label: 'Forking Servers',
            contentSite: 'mongoid',
            url: '/docs/mongoid/:version/configuration/forking-server-config',
          },
          {
            label: 'Collection Configuration',
            contentSite: 'mongoid',
            url: '/docs/mongoid/:version/configuration/collection-config',
          },
        ],
      },
      {
        label: 'Interact with Data',
        contentSite: 'mongoid',
        url: '/docs/mongoid/:version/interact-data',
        collapsible: true,
        items: [
          {
            label: 'Perform Data Operations',
            contentSite: 'mongoid',
            url: '/docs/mongoid/:version/interact-data/crud',
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
            label: 'Modify Query Results',
            contentSite: 'mongoid',
            url: '/docs/mongoid/:version/interact-data/modify-results',
          },
          {
            label: 'Aggregation',
            contentSite: 'mongoid',
            url: '/docs/mongoid/:version/interact-data/aggregation',
          },
          {
            label: 'Query Text',
            contentSite: 'mongoid',
            url: '/docs/mongoid/:version/interact-data/text-search',
          },
          {
            label: 'Transactions and Sessions',
            contentSite: 'mongoid',
            url: '/docs/mongoid/:version/interact-data/transaction',
          },
          {
            label: 'Nested Attributes',
            contentSite: 'mongoid',
            url: '/docs/mongoid/:version/interact-data/nested-attributes',
          },
          {
            label: 'Tutorial: MongoDB Search',
            contentSite: 'mongoid',
            url: '/docs/mongoid/:version/interact-data/atlas-search-tutorial',
          },
        ],
      },
      {
        label: 'Model Your Data',
        contentSite: 'mongoid',
        url: '/docs/mongoid/:version/data-modeling',
        collapsible: true,
        items: [
          {
            label: 'Documents',
            contentSite: 'mongoid',
            url: '/docs/mongoid/:version/data-modeling/documents',
          },
          {
            label: 'Field Types',
            contentSite: 'mongoid',
            url: '/docs/mongoid/:version/data-modeling/field-types',
          },
          {
            label: 'Field Behaviors',
            contentSite: 'mongoid',
            url: '/docs/mongoid/:version/data-modeling/field-behaviors',
          },
          {
            label: 'Inheritance',
            contentSite: 'mongoid',
            url: '/docs/mongoid/:version/data-modeling/inheritance',
          },
          {
            label: 'Document Validation',
            contentSite: 'mongoid',
            url: '/docs/mongoid/:version/data-modeling/validation',
          },
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
            label: 'Indexes',
            contentSite: 'mongoid',
            url: '/docs/mongoid/:version/data-modeling/indexes',
          },
        ],
      },
      {
        label: 'Secure Your Data',
        contentSite: 'mongoid',
        url: '/docs/mongoid/:version/security',
        collapsible: true,
        items: [
          {
            label: 'In-Use Encryption',
            contentSite: 'mongoid',
            url: '/docs/mongoid/:version/security/encryption',
          },
        ],
      },
      {
        label: 'Integrations & Tools',
        contentSite: 'mongoid',
        url: '/docs/mongoid/:version/integrations-tools',
        collapsible: true,
        items: [
          {
            label: 'Add Mongoid to an Existing Application',
            contentSite: 'mongoid',
            url: '/docs/mongoid/:version/integrations-tools/add-existing',
          },
          {
            label: 'Rails Integration',
            contentSite: 'mongoid',
            url: '/docs/mongoid/:version/integrations-tools/rails-integration',
          },
          {
            label: 'External Resources',
            contentSite: 'mongoid',
            url: '/docs/mongoid/:version/integrations-tools/external-resources',
          },
        ],
      },
      {
        label: 'Reference',
        contentSite: 'mongoid',
        url: '/docs/mongoid/:version/reference',
        collapsible: true,
        items: [
          {
            label: 'Release Notes',
            contentSite: 'mongoid',
            url: '/docs/mongoid/:version/reference/release-notes',
          },
          {
            label: 'View the Source',
            isExternal: true,
            url: 'https://github.com/mongodb/mongoid',
          },
        ],
      },
      {
        label: 'Compatibility',
        contentSite: 'drivers',
        url: '/docs/drivers/compatibility/?driver-language=ruby&ruby-driver-framework=mongoid',
      },
      {
        label: 'API Documentation',
        contentSite: 'mongoid',
        url: '/docs/mongoid/:version/api-docs',
        collapsible: true,
        items: [
          {
            label: ' Mongoid',
            isExternal: true,
            url: 'https://www.mongodb.com/docs/mongoid/current/api',
          },
          {
            label: ' Ruby Driver',
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
