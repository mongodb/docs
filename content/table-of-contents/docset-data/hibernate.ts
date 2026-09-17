import type { TocItem } from '../types';

const tocData: TocItem[] = [
  {
    label: 'MongoDB Extension for Hibernate ORM',
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
        label: 'Spring Boot',
        contentSite: 'hibernate',
        collapsible: true,
        versions: { includes: ['upcoming'] },
        url: '/docs/languages/java/mongodb-hibernate/:version/spring-boot',
        items: [
          {
            label: 'Get Started with the Spring Boot Starter',
            contentSite: 'hibernate',
            url: '/docs/languages/java/mongodb-hibernate/:version/spring-boot/get-started',
          },
          {
            label: 'Configure the Spring Boot Starter',
            contentSite: 'hibernate',
            url: '/docs/languages/java/mongodb-hibernate/:version/spring-boot/configure',
          },
        ],
      },
      {
        label: 'Model Data',
        contentSite: 'hibernate',
        collapsible: true,
        items: [
          {
            label: 'Entities',
            contentSite: 'hibernate',
            url: '/docs/languages/java/mongodb-hibernate/:version/model-data/entities',
          },
          {
            label: 'Inheritance Hierarchies',
            contentSite: 'hibernate',
            url: '/docs/languages/java/mongodb-hibernate/:version/model-data/inheritance',
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
            label: 'Find Documents',
            contentSite: 'hibernate',
            url: '/docs/languages/java/mongodb-hibernate/:version/interact-data/find-documents',
            versions: { includes: ['upcoming'] },
          },
          {
            label: 'Specify a Query',
            contentSite: 'hibernate',
            url: '/docs/languages/java/mongodb-hibernate/:version/interact-data/specify-a-query',
          },
          {
            label: 'Datetime Functions in Queries',
            contentSite: 'hibernate',
            url: '/docs/languages/java/mongodb-hibernate/:version/interact-data/datetime-functions',
            versions: { includes: ['upcoming'] },
          },
          {
            label: 'Join Entities Across Collections',
            contentSite: 'hibernate',
            url: '/docs/languages/java/mongodb-hibernate/:version/interact-data/join-entities',
            versions: { includes: ['upcoming'] },
          },
          {
            label: 'Modify Query Results',
            contentSite: 'hibernate',
            url: '/docs/languages/java/mongodb-hibernate/:version/interact-data/modify-query-results',
            versions: { includes: ['upcoming'] },
          },
          {
            label: 'Perform Native Queries',
            contentSite: 'hibernate',
            url: '/docs/languages/java/mongodb-hibernate/:version/interact-data/native-queries',
          },
          {
            label: 'Transactions & Sessions',
            contentSite: 'hibernate',
            url: '/docs/languages/java/mongodb-hibernate/:version/interact-data/transactions',
          },
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
        isExternal: true,
        url: 'https://www.mongodb.com/docs/drivers/compatibility/?language=java&java-driver-framework=hibernate',
      },
      {
        label: 'API Documentation',
        contentSite: 'hibernate',
        collapsible: true,
        items: [
          {
            label: 'MongoDB Extension for Hibernate ORM',
            isExternal: true,
            url: 'https://javadoc.io/doc/org.mongodb/mongodb-hibernate/latest/index.html',
          },
          {
            label: 'Hibernate ORM',
            isExternal: true,
            url: 'https://docs.hibernate.org/orm/6.6/javadocs/',
          },
          {
            label: 'Jakarta Persistence',
            isExternal: true,
            url: 'https://jakarta.ee/specifications/persistence/3.1/apidocs/jakarta.persistence/module-summary.html',
          },
        ],
      },
    ],
  },
];

export default tocData;
