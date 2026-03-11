import type { L1TocItem } from '../types';

export const toc: L1TocItem[] = [
  {
    label: 'Django MongoDB Backend',
    contentSite: 'django',
    url: '/docs/languages/python/django-mongodb/current/',
    items: [
      {
        label: 'Django MongoDB Backend',
        contentSite: 'django',
        group: true,
        versionDropdown: true,
        items: [
          {
            label: 'Overview',
            contentSite: 'django',
            url: '/docs/languages/python/django-mongodb/:version',
          },
          {
            label: 'Get Started',
            contentSite: 'django',
            collapsible: true,
            url: '/docs/languages/python/django-mongodb/:version/get-started',
            items: [
              {
                label: 'Download & Install',
                contentSite: 'django',
                url: '/docs/languages/python/django-mongodb/:version/get-started/install',
              },
              {
                label: 'Create a Deployment',
                contentSite: 'django',
                url: '/docs/languages/python/django-mongodb/:version/get-started/create-deployment',
              },
              {
                label: 'Create a Connection String',
                contentSite: 'django',
                url: '/docs/languages/python/django-mongodb/:version/get-started/connection-string',
              },
              {
                label: 'Configure a MongoDB Connection',
                contentSite: 'django',
                url: '/docs/languages/python/django-mongodb/:version/get-started/connect-mongodb',
              },
              {
                label: 'Create an Application',
                contentSite: 'django',
                url: '/docs/languages/python/django-mongodb/:version/get-started/create-app',
              },
              {
                label: 'Write Data to MongoDB',
                contentSite: 'django',
                url: '/docs/languages/python/django-mongodb/:version/get-started/write-data',
              },
              {
                label: 'Query MongoDB Data',
                contentSite: 'django',
                url: '/docs/languages/python/django-mongodb/:version/get-started/query-data',
              },
              {
                label: 'Create an Admin Site',
                contentSite: 'django',
                url: '/docs/languages/python/django-mongodb/:version/get-started/create-admin',
              },
              {
                label: 'Next Steps',
                contentSite: 'django',
                url: '/docs/languages/python/django-mongodb/:version/get-started/next-steps',
              },
            ],
          },
          {
            label: 'Connection Configuration',
            contentSite: 'django',
            url: '/docs/languages/python/django-mongodb/:version/connect',
          },
          {
            label: 'Model Your Data',
            contentSite: 'django',
            collapsible: true,
            url: '/docs/languages/python/django-mongodb/:version/model-data',
            items: [
              {
                label: 'Create Indexes',
                contentSite: 'django',
                url: '/docs/languages/python/django-mongodb/:version/model-data/indexes',
              },
              {
                label: 'Create Models',
                contentSite: 'django',
                url: '/docs/languages/python/django-mongodb/:version/model-data/models',
              },
              {
                label: 'Model Geospatial Data',
                contentSite: 'django',
                url: '/docs/languages/python/django-mongodb/:version/model-data/geodjango',
              },
            ],
          },
          {
            label: 'Interact with Data',
            contentSite: 'django',
            collapsible: true,
            url: '/docs/languages/python/django-mongodb/:version/interact-data',
            items: [
              {
                label: 'CRUD Operations',
                contentSite: 'django',
                url: '/docs/languages/python/django-mongodb/:version/interact-data/crud',
              },
              {
                label: 'Specify a Query',
                contentSite: 'django',
                url: '/docs/languages/python/django-mongodb/:version/interact-data/specify-a-query',
              },
              {
                label: 'Perform Raw Queries',
                contentSite: 'django',
                url: '/docs/languages/python/django-mongodb/:version/interact-data/raw-queries',
              },
              {
                label: 'MongoDB Search',
                contentSite: 'django',
                url: '/docs/languages/python/django-mongodb/:version/interact-data/mongodb-search',
              },
              {
                label: 'MongoDB Vector Search',
                contentSite: 'django',
                url: '/docs/languages/python/django-mongodb/:version/interact-data/mongodb-vector-search',
              },
              {
                label: 'Transactions',
                contentSite: 'django',
                url: '/docs/languages/python/django-mongodb/:version/interact-data/transactions',
              },
            ],
          },
          {
            label: 'Queryable Encryption',
            contentSite: 'django',
            url: '/docs/languages/python/django-mongodb/:version/queryable-encryption',
            versions: {
              excludes: ['v5.2'],
            },
          },
          {
            label: 'Third-Party Integrations',
            contentSite: 'django',
            collapsible: true,
            items: [
              {
                label: 'Migrate Djongo Applications',
                contentSite: 'django',
                url: '/docs/languages/python/django-mongodb/:version/integrations/djongo-migration',
              },
            ],
          },
          {
            label: 'Feature Compatibility',
            contentSite: 'django',
            url: '/docs/languages/python/django-mongodb/:version/limitations-upcoming',
          },
          {
            label: 'Issues & Help',
            contentSite: 'django',
            url: '/docs/languages/python/django-mongodb/:version/issues-and-help',
          },
          {
            label: 'Version Compatibility',
            contentSite: 'drivers',
            url: '/docs/drivers/compatibility/?driver-language=python&python-driver-framework=django',
          },
          {
            label: 'API Documentation',
            isExternal: true,
            url: 'https://django-mongodb-backend.readthedocs.io/en/latest/',
          },
        ],
      },
    ],
  },
];
