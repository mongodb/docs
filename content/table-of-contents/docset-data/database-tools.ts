import type { TocItem } from '../types';

const tocData: TocItem[] = [
  {
    label: 'Database tools',
    group: true,
    contentSite: 'database-tools',
    items: [
      {
        label: 'Overview',
        contentSite: 'database-tools',
        url: '/docs/database-tools',
      },
      {
        label: 'Installation',
        contentSite: 'database-tools',
        url: '/docs/database-tools/installation',
      },
      {
        label: 'mongodump',
        contentSite: 'database-tools',
        url: '/docs/database-tools/mongodump',
        collapsible: true,
        items: [
          {
            label: 'Compatibility & Installation',
            contentSite: 'database-tools',
            url: '/docs/database-tools/mongodump/mongodump-compatibility-and-installation',
          },
          {
            label: 'Behavior',
            contentSite: 'database-tools',
            url: '/docs/database-tools/mongodump/mongodump-behavior',
          },
          {
            label: 'Examples',
            contentSite: 'database-tools',
            url: '/docs/database-tools/mongodump/mongodump-examples',
          },
        ],
      },
      {
        label: 'mongorestore',
        contentSite: 'database-tools',
        url: '/docs/database-tools/mongorestore',
        collapsible: true,
        items: [
          {
            label: 'Compatibility & Installation',
            contentSite: 'database-tools',
            url: '/docs/database-tools/mongorestore/mongorestore-compatibility-and-installation',
          },
          {
            label: 'Behavior',
            contentSite: 'database-tools',
            url: '/docs/database-tools/mongorestore/mongorestore-behavior-access-usage',
          },
          {
            label: 'Examples',
            contentSite: 'database-tools',
            url: '/docs/database-tools/mongorestore/mongorestore-examples',
          },
        ],
      },
      {
        label: 'bsondump',
        contentSite: 'database-tools',
        url: '/docs/database-tools/bsondump',
        collapsible: true,
        items: [
          {
            label: 'Compatibility & Installation',
            contentSite: 'database-tools',
            url: '/docs/database-tools/bsondump/bsondump-compatibility-and-installation',
          },
          {
            label: 'Examples',
            contentSite: 'database-tools',
            url: '/docs/database-tools/bsondump/bsondump-examples',
          },
        ],
      },
      {
        label: 'mongoimport',
        contentSite: 'database-tools',
        url: '/docs/database-tools/mongoimport',
        collapsible: true,
        items: [
          {
            label: 'Compatibility & Installation',
            contentSite: 'database-tools',
            url: '/docs/database-tools/mongoimport/mongoimport-compatibility-and-installation',
          },
          {
            label: 'Behavior',
            contentSite: 'database-tools',
            url: '/docs/database-tools/mongoimport/mongoimport-behavior',
          },
          {
            label: 'Examples',
            contentSite: 'database-tools',
            url: '/docs/database-tools/mongoimport/mongoimport-examples',
          },
          {
            label: 'Data Input Guide',
            contentSite: 'database-tools',
            url: '/docs/database-tools/mongoimport/mongoimport-guide',
          },
        ],
      },
      {
        label: 'mongoexport',
        contentSite: 'database-tools',
        url: '/docs/database-tools/mongoexport',
        collapsible: true,
        items: [
          {
            label: 'Compatibility & Installation',
            contentSite: 'database-tools',
            url: '/docs/database-tools/mongoexport/mongoexport-compatibility-and-installation',
          },
          {
            label: 'Behavior',
            contentSite: 'database-tools',
            url: '/docs/database-tools/mongoexport/mongoexport-behavior',
          },
          {
            label: 'Examples',
            contentSite: 'database-tools',
            url: '/docs/database-tools/mongoexport/mongoexport-examples',
          },
        ],
      },
      {
        label: 'mongostat',
        contentSite: 'database-tools',
        url: '/docs/database-tools/mongostat',
        collapsible: true,
        items: [
          {
            label: 'Compatibility & Installation',
            contentSite: 'database-tools',
            url: '/docs/database-tools/mongostat/mongostat-compatibility-and-installation',
          },
          {
            label: 'Behavior',
            contentSite: 'database-tools',
            url: '/docs/database-tools/mongostat/mongostat-behavior',
          },
          {
            label: 'Examples',
            contentSite: 'database-tools',
            url: '/docs/database-tools/mongostat/mongostat-examples',
          },
        ],
      },
      {
        label: 'mongotop',
        contentSite: 'database-tools',
        url: '/docs/database-tools/mongotop',
        collapsible: true,
        items: [
          {
            label: 'Compatibility & Installation',
            contentSite: 'database-tools',
            url: '/docs/database-tools/mongotop/mongotop-compatibility-and-installation',
          },
          {
            label: 'Behavior',
            contentSite: 'database-tools',
            url: '/docs/database-tools/mongotop/mongotop-behavior',
          },
          {
            label: 'Examples',
            contentSite: 'database-tools',
            url: '/docs/database-tools/mongotop/mongotop-examples',
          },
        ],
      },
      {
        label: 'mongofiles',
        contentSite: 'database-tools',
        url: '/docs/database-tools/mongofiles',
      },
      {
        label: 'Verify Packages',
        contentSite: 'database-tools',
        url: '/docs/database-tools/verify',
        collapsible: true,
        items: [
          {
            label: 'macOS',
            contentSite: 'database-tools',
            url: '/docs/database-tools/verify/macos',
          },
          {
            label: 'Linux',
            contentSite: 'database-tools',
            url: '/docs/database-tools/verify/gpg',
          },
          {
            label: 'RHEL',
            contentSite: 'database-tools',
            url: '/docs/database-tools/verify/rpm',
          },
          {
            label: 'Windows',
            contentSite: 'database-tools',
            url: '/docs/database-tools/verify/windows',
          },
        ],
      },
      {
        label: 'Logs',
        contentSite: 'database-tools',
        url: '/docs/database-tools/logs',
      },
      {
        label: 'Authentication',
        contentSite: 'database-tools',
        url: '/docs/database-tools/authentication',
      },
      {
        label: '100.14.0 Changelogs',
        contentSite: 'database-tools',
        url: '/docs/database-tools/release-notes/database-tools-changelog',
        collapsible: true,
        items: [
          {
            label: '100.13.0',
            contentSite: 'database-tools',
            url: '/docs/database-tools/release-notes/dbtools-100.13.0-changelog',
          },
          {
            label: '100.12.2',
            contentSite: 'database-tools',
            url: '/docs/database-tools/release-notes/dbtools-100.12.2-changelog',
          },
          {
            label: '100.12.0',
            contentSite: 'database-tools',
            url: '/docs/database-tools/release-notes/dbtools-100.12.0-changelog',
          },
          {
            label: '100.11.0',
            contentSite: 'database-tools',
            url: '/docs/database-tools/release-notes/dbtools-100.11.0-changelog',
          },
          {
            label: '100.10.0',
            contentSite: 'database-tools',
            url: '/docs/database-tools/release-notes/dbtools-100.10.0-changelog',
          },
          {
            label: '100.9.0',
            contentSite: 'database-tools',
            url: '/docs/database-tools/release-notes/dbtools-100.9.0-changelog',
          },
          {
            label: '100.8.0',
            contentSite: 'database-tools',
            url: '/docs/database-tools/release-notes/dbtools-100.8.0-changelog',
          },
          {
            label: '100.7.0',
            contentSite: 'database-tools',
            url: '/docs/database-tools/release-notes/dbtools-100.7.0-changelog',
          },
          {
            label: '100.6.0',
            contentSite: 'database-tools',
            url: '/docs/database-tools/release-notes/dbtools-100.6.0-changelog',
          },
          {
            label: '100.5.0',
            contentSite: 'database-tools',
            url: '/docs/database-tools/release-notes/dbtools-100.5.0-changelog',
          },
          {
            label: '100.4.0',
            contentSite: 'database-tools',
            url: '/docs/database-tools/release-notes/dbtools-100.4.0-changelog',
          },
          {
            label: '100.3.0',
            contentSite: 'database-tools',
            url: '/docs/database-tools/release-notes/dbtools-100.3.0-changelog',
          },
          {
            label: '100.2.0',
            contentSite: 'database-tools',
            url: '/docs/database-tools/release-notes/dbtools-100.2.0-changelog',
          },
          {
            label: '100.1.0',
            contentSite: 'database-tools',
            url: '/docs/database-tools/release-notes/dbtools-100.1.0-changelog',
          },
          {
            label: '100.0.0',
            contentSite: 'database-tools',
            url: '/docs/database-tools/release-notes/dbtools-100.0.0-changelog',
          },
        ],
      },
    ],
  },
];

export default tocData;
