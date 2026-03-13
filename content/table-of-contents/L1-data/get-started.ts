import type { TocItem } from '../types';

const tocData: TocItem[] = [
  {
    label: 'Quick Start',
    contentSite: 'landing',
    url: '/docs/quick-start',
  },
  {
    label: 'Build with AI',
    contentSite: 'landing',
    url: '/docs/build-with-ai/',
  },
  {
    label: 'Sample Applications',
    group: true,
    items: [
      {
        label: 'Java + Spring Data',
        url: 'https://github.com/mongodb/sample-app-java-mflix/blob/main/README.md',
        isExternal: true,
      },
      {
        label: 'Node.js + Express.js',
        url: 'https://github.com/mongodb/sample-app-nodejs-mflix/blob/main/README.md',
        isExternal: true,
      },
      {
        label: 'Python + FastAPI',
        url: 'https://github.com/mongodb/sample-app-python-mflix/blob/main/README.md',
        isExternal: true,
      },
    ],
  },
];

export default tocData;
