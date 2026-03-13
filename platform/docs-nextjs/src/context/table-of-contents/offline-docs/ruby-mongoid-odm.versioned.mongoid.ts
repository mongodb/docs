import type { L1TocItem } from '../types';

export const toc: L1TocItem[] = [
  {
    label: 'Ruby Mongoid ODM',
    contentSite: 'mongoid',
    url: '/docs/mongoid/current/',
    items: [
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
            label: 'Get Started - Ruby on Rails',
            contentSite: 'mongoid',
            url: '/docs/mongoid/:version/quick-start-rails',
          },
          {
            label: 'Get Started - Sinatra',
            contentSite: 'mongoid',
            url: '/docs/mongoid/:version/quick-start-sinatra',
          },
          {
            label: 'Configuration',
            contentSite: 'mongoid',
            collapsible: true,
            url: '/docs/mongoid/:version/configuration',
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
            collapsible: true,
            url: '/docs/mongoid/:version/interact-data',
            items: [
              {
                label: 'Perform Data Operations',
                contentSite: 'mongoid',
                url: '/docs/mongoid/:version/interact-data/crud',
              },
              {
                label: 'Specify a Query',
                contentSite: 'mongoid',
                collapsible: true,
                url: '/docs/mongoid/:version/interact-data/specify-query',
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
            collapsible: true,
            url: '/docs/mongoid/:version/data-modeling',
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
            collapsible: true,
            url: '/docs/mongoid/:version/security',
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
            collapsible: true,
            url: '/docs/mongoid/:version/integrations-tools',
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
            collapsible: true,
            url: '/docs/mongoid/:version/reference',
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
            label: 'Compatibility',
            contentSite: 'drivers',
            url: '/docs/drivers/compatibility/?driver-language=ruby&ruby-driver-framework=mongoid',
          },
          {
            label: 'API Documentation',
            contentSite: 'mongoid',
            collapsible: true,
            url: '/docs/mongoid/:version/api-docs',
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
            collapsible: true,
            url: '/docs/mongoid/:version/issues-and-help',
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
    ],
  },
];
