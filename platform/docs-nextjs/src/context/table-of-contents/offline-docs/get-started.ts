import type { L1TocItem } from '../types';

export const toc: L1TocItem[] = [
  {
    label: 'Get Started',
    contentSite: 'landing',
    url: '/docs/quick-start',
    items: [
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
            isExternal: true,
            url: 'https://github.com/mongodb/sample-app-java-mflix/blob/main/README.md',
          },
          {
            label: 'Node.js + Express.js',
            isExternal: true,
            url: 'https://github.com/mongodb/sample-app-nodejs-mflix/blob/main/README.md',
          },
          {
            label: 'Python + FastAPI',
            isExternal: true,
            url: 'https://github.com/mongodb/sample-app-python-mflix/blob/main/README.md',
          },
        ],
      },
    ],
  },
];
