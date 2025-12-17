import type { TocItem } from '../types';

const tocData: TocItem[] = [
  {
    label: 'PyMongoArrow',
    contentSite: 'pymongo-arrow',
    group: true,
    versionDropdown: true,
    items: [
      {
        label: 'Overview',
        contentSite: 'pymongo-arrow',
        url: '/docs/languages/python/pymongo-arrow-driver/:version/',
      },
      {
        label: 'Get Started',
        contentSite: 'pymongo-arrow',
        url: '/docs/languages/python/pymongo-arrow-driver/:version/get-started',
      },
      {
        label: 'Data Types',
        contentSite: 'pymongo-arrow',
        url: '/docs/languages/python/pymongo-arrow-driver/:version/data-types',
      },
      {
        label: 'Schema Examples',
        contentSite: 'pymongo-arrow',
        url: '/docs/languages/python/pymongo-arrow-driver/:version/schemas',
      },
      {
        label: 'Reference',
        contentSite: 'pymongo-arrow',
        collapsible: true,
        items: [
          {
            label: 'Release Notes',
            contentSite: 'pymongo-arrow',
            url: '/docs/languages/python/pymongo-arrow-driver/:version/reference/release-notes',
          },
          {
            label: 'Compare to PyMongo',
            contentSite: 'pymongo-arrow',
            url: '/docs/languages/python/pymongo-arrow-driver/:version/reference/comparison',
          },
          {
            label: 'Versions 0.4 to 1.2',
            contentSite: 'pymongo-arrow',
            url: '/docs/languages/python/pymongo-arrow-driver/:version/reference/previous-versions',
          },
        ],
      },
      {
        label: 'Compatibility',
        contentSite: 'drivers',
        url: '/docs/drivers/compatibility/?driver-language=python&python-driver-framework=arrow',
      },
      {
        label: 'API Documentation',
        isExternal: true,
        url: 'https://mongo-arrow.readthedocs.io/en/stable/api/index.html',
      },
      {
        label: 'Issues & Help',
        contentSite: 'pymongo-arrow',
        url: '/docs/languages/python/pymongo-arrow-driver/:version/issues-and-help',
      },
    ],
  },
];

export default tocData;
