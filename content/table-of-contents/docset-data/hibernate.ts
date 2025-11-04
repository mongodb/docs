import type { TocItem } from '../types';

const tocData: TocItem[] = [
  {
    label: 'MongoDB Extension for Hibernate',
    contentSite: 'hibernate',
    group: true,
    versionDropdown: true,
    items: [
      {
        label: 'Overview',
        contentSite: 'hibernate',
        url: '/docs/languages/java/mongodb-hibernate/:version',
      },
      {
        label: 'Get Started',
        contentSite: 'hibernate',
        url: '/docs/languages/java/mongodb-hibernate/:version/get-started',
      },
      {
        label: 'Model Your Data',
        contentSite: 'hibernate',
        collapsible: true,
        items: [
          {
            label: 'Create Entities',
            contentSite: 'hibernate',
            url: '/docs/languages/java/mongodb-hibernate/:version/model-data/entities',
          },
        ],
      },
      {
        label: 'Interact with Data',
        contentSite: 'hibernate',
        collapsible: true,
        items: [
          {
            label: 'CRUD Operations',
            contentSite: 'hibernate',
            url: '/docs/languages/java/mongodb-hibernate/:version/interact-data/crud',
          },
          {
            label: 'Specify a Query',
            contentSite: 'hibernate',
            url: '/docs/languages/java/mongodb-hibernate/:version/interact-data/specify-a-query',
          },
          {
            label: 'Perform Native Queries',
            contentSite: 'hibernate',
            url: '/docs/languages/java/mongodb-hibernate/:version/interact-data/native-queries',
          },
          {
            label: 'Transactions',
            contentSite: 'hibernate',
            url: '/docs/languages/java/mongodb-hibernate/:version/interact-data/transactions',
          }
        ],
      },
      {
        label: 'Feature Compatibility',
        contentSite: 'hibernate',
        url: '/docs/languages/java/mongodb-hibernate/:version/feature-compatibility',
      },
      {
        label: 'Issues & Help',
        contentSite: 'hibernate',
        url: '/docs/languages/java/mongodb-hibernate/:version/issues-and-help',
      },
      {
        label: 'Version Compatibility',
        contentSite: 'drivers',
        url: '/docs/drivers/compatibility/?language=java&java-driver-framework=hibernate',
      },
      {
        label: 'Hibernate ORM Documentation',
        isExternal: true,
        url: 'https://hibernate.org/orm/documentation/6.6/',
      },
    ],
  },
];

export default tocData;
