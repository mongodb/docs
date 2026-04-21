import type { TocItem } from '../types';

const tocData: TocItem[] = [
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
        url: '/docs/languages/python/django-mongodb/:version/get-started',
      },
      {
        label: 'Connect',
        contentSite: 'django',
        url: '/docs/languages/python/django-mongodb/:version/connect',
      },
      {
        label: 'Model Data',
        contentSite: 'django',
        url: '/docs/languages/python/django-mongodb/:version/model-data',
        collapsible: true,
        items: [
          {
            label: 'Models',
            contentSite: 'django',
            url: '/docs/languages/python/django-mongodb/:version/model-data/models',
          },
          {
            label: 'Indexes',
            contentSite: 'django',
            url: '/docs/languages/python/django-mongodb/:version/model-data/indexes',
          },
          {
            label: 'Geospatial Models',
            contentSite: 'django',
            url: '/docs/languages/python/django-mongodb/:version/model-data/geodjango',
          },
        ],
      },
      {
        label: 'Interact with Data',
        contentSite: 'django',
        url: '/docs/languages/python/django-mongodb/:version/interact-data',
        collapsible: true,
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
            label: 'Transactions & Sessions',
            contentSite: 'django',
            url: '/docs/languages/python/django-mongodb/:version/interact-data/transactions',
          },
        ],
      },
      {
        label: 'Queryable Encryption',
        contentSite: 'django',
        url: '/docs/languages/python/django-mongodb/:version/queryable-encryption',
        versions: { excludes: ['v5.2'] },
      },
      {
        label: 'Integrations',
        contentSite: 'django',
        collapsible: true,
        items: [
          {
            label: 'Django MongoDB Extensions',
            contentSite: 'django',
            url: '/docs/languages/python/django-mongodb/:version/integrations/django-mongodb-extensions',
            versions: { excludes: ['v5.2'] },
          },
          {
            label: 'Migrate Djongo ODM Applications',
            contentSite: 'django',
            url: '/docs/languages/python/django-mongodb/:version/integrations/djongo-migration',
          },
        ],
      },
      {
        label: 'Reference',
        contentSite: 'django',
        collapsible: true,
        items: [
          {
            label: 'Release Notes',
            contentSite: 'django',
            url: '/docs/languages/python/django-mongodb/:version/reference/release-notes',
          },
          {
            label: 'View the Source',
            isExternal: true,
            url: 'https://github.com/mongodb/django-mongodb-backend',
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
];

export default tocData;
