import type { L1TocItem } from '../types';

export const toc: L1TocItem[] = [
  {
    label: 'Client Libraries',
    contentSite: 'drivers',
    url: '/docs/drivers/',
    items: [
      {
        label: 'Client Libraries',
        contentSite: 'drivers',
        group: true,
        items: [
          {
            label: 'C#',
            contentSite: 'landing',
            collapsible: true,
            url: '/docs/languages/csharp/',
            items: [
              {
                label: 'Entity Framework, ASP.NET, and OData Integration',
                contentSite: 'drivers',
                url: '/docs/drivers/csharp-frameworks/ef-odata/',
              },
            ],
          },
          {
            label: 'Java',
            contentSite: 'landing',
            collapsible: true,
            url: '/docs/languages/java/',
            items: [
              {
                label: 'Spring Data MongoDB Integration',
                contentSite: 'java',
                url: '/docs/drivers/java/sync/current/integrations/spring-data-integration',
              },
              {
                label: 'Quarkus Integration',
                contentSite: 'drivers',
                url: '/docs/drivers/java-frameworks/quarkus/',
              },
            ],
          },
          {
            label: 'PHP',
            contentSite: 'landing',
            collapsible: true,
            url: '/docs/languages/php/',
            items: [
              {
                label: 'PHP Extension',
                isExternal: true,
                url: 'https://www.php.net/mongodb',
              },
              {
                label: 'Symfony Integration',
                contentSite: 'drivers',
                url: '/docs/drivers/php-frameworks/symfony/',
              },
              {
                label: 'Drupal Integration',
                contentSite: 'drivers',
                url: '/docs/drivers/php-frameworks/drupal/',
              },
              {
                label: 'LLPhant Integration',
                contentSite: 'drivers',
                url: '/docs/drivers/php-frameworks/llphant/',
              },
              {
                label: 'Libraries, Frameworks, & Tools',
                contentSite: 'drivers',
                url: '/docs/drivers/php-libraries/',
              },
            ],
          },
          {
            label: 'Node.js',
            contentSite: 'landing',
            collapsible: true,
            url: '/docs/languages/javascript/',
            items: [
              {
                label: 'Angular Integration',
                contentSite: 'drivers',
                url: '/docs/drivers/node-frameworks/angular/',
              },
              {
                label: 'React Integration',
                contentSite: 'drivers',
                url: '/docs/drivers/node-frameworks/react/',
              },
              {
                label: 'Meteor and Vue Integration',
                contentSite: 'drivers',
                url: '/docs/drivers/node-frameworks/meteor-vue/',
              },
              {
                label: 'Nuxt and Vue Integration',
                contentSite: 'drivers',
                url: '/docs/drivers/node-frameworks/nuxt-vue/',
              },
              {
                label: 'TanStack Integration',
                contentSite: 'drivers',
                url: '/docs/drivers/node-frameworks/tanstack/',
              },
              {
                label: 'Next.js Integration',
                contentSite: 'drivers',
                url: '/docs/drivers/node-frameworks/next-integration/',
              },
            ],
          },
          {
            label: 'Python',
            contentSite: 'landing',
            collapsible: true,
            url: '/docs/languages/python/',
            items: [
              {
                label: 'Motor (Async Driver)',
                contentSite: 'drivers',
                url: '/docs/drivers/motor/',
              },
            ],
          },
          {
            label: 'Ruby',
            contentSite: 'landing',
            collapsible: true,
            url: '/docs/languages/ruby/',
            items: [
              {
                label: 'Ruby on Rails Integration',
                contentSite: 'mongoid',
                url: '/docs/mongoid/current/quick-start-rails',
              },
              {
                label: 'Sinatra Integration',
                contentSite: 'mongoid',
                url: '/docs/mongoid/current/quick-start-sinatra',
              },
            ],
          },
          {
            label: 'Rust',
            contentSite: 'landing',
            collapsible: true,
            url: '/docs/languages/rust/',
            items: [
              {
                label: 'Rocket Integration',
                contentSite: 'drivers',
                url: '/docs/drivers/rust-frameworks/rocket/',
              },
              {
                label: 'Actix Integration',
                contentSite: 'drivers',
                url: '/docs/drivers/rust-frameworks/actix/',
              },
            ],
          },
        ],
      },
      {
        label: 'Compatibility',
        contentSite: 'drivers',
        group: true,
        items: [
          {
            label: 'Client Library Compatibility Tables',
            contentSite: 'drivers',
            url: '/docs/drivers/compatibility',
          },
          {
            label: 'Other Document Database Compatibility',
            contentSite: 'drivers',
            collapsible: true,
            url: '/docs/drivers/other-document-dbs',
            items: [
              {
                label: 'Amazon DocumentDB Compatibility',
                contentSite: 'drivers',
                url: '/docs/drivers/documentdb-support',
              },
              {
                label: 'Azure Cosmos DB Compatibility',
                contentSite: 'drivers',
                url: '/docs/drivers/cosmosdb-support',
              },
              {
                label: 'ORMs, ODMs, and Libraries',
                contentSite: 'drivers',
                url: '/docs/drivers/odm',
              },
            ],
          },
        ],
      },
    ],
  },
];
