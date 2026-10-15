import type { Docset } from '@/types/data';

export const mockDocsets: Docset[] = [
  {
    displayName: 'MongoDB Manual',
    project: 'docs',
    internalOnly: false,
    prefix: 'docs',
    versions: [
      {
        versionName: 'upcoming',
        active: true,
        versionSelectorLabel: 'master (upcoming)',
        stable: false,
        noIndexing: false,
        offlineUrl: '/offline/master',
      },
    ],
  },
  {
    displayName: 'MongoDB Node.js Driver',
    project: 'docs-node',
    internalOnly: false,
    prefix: 'docs/languages/node',
    versions: [
      {
        versionName: 'upcoming',
        active: true,
        versionSelectorLabel: 'v4.12 (upcoming)',
        stable: false,
        noIndexing: false,
        offlineUrl: '/offline/v4.12',
      },
      {
        versionName: 'current',
        active: true,
        versionSelectorLabel: 'v4.11 (current)',
        stable: true,
        noIndexing: false,
        offlineUrl: '/offline/v4.11',
      },
      {
        versionName: 'v4.9',
        active: true,
        versionSelectorLabel: 'v4.9',
        stable: false,
        noIndexing: false,
        offlineUrl: '/offline/v4.9',
      },
    ],
  },
];
