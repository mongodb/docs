import type { L1TocItem } from '../types';

export const toc: L1TocItem[] = [
  {
    label: 'SQL Interface',
    contentSite: 'sql-interface',
    url: '/docs/sql-interface/',
    items: [
      {
        label: 'SQL Interface',
        contentSite: 'sql-interface',
        group: true,
        items: [
          {
            label: 'Overview',
            contentSite: 'sql-interface',
            url: '/docs/sql-interface',
          },
          {
            label: 'Migration Guide',
            contentSite: 'sql-interface',
            url: '/docs/sql-interface/transition-bic-to-atlas-sql/',
          },
          {
            label: 'Install',
            contentSite: 'sql-interface',
            collapsible: true,
            url: '/docs/sql-interface/sql-interface-install',
            items: [
              {
                label: 'Server Setup',
                contentSite: 'sql-interface',
                url: '/docs/sql-interface/connect-with-sql-composable',
              },
              {
                label: 'Driver Setup',
                contentSite: 'sql-interface',
                url: '/docs/sql-interface/install-driver',
              },
              {
                label: 'Connect BI Tool',
                contentSite: 'sql-interface',
                url: '/docs/sql-interface/connect',
              },
            ],
          },
          {
            label: 'Query',
            contentSite: 'sql-interface',
            url: '/docs/sql-interface/query-with-asql-statements',
          },
          {
            label: 'SQL Tutorials',
            contentSite: 'sql-interface',
            collapsible: true,
            url: '/docs/sql-interface/tutorials',
            items: [
              {
                label: 'Connect and Query',
                contentSite: 'sql-interface',
                url: '/docs/sql-interface/tutorials/connect-tutorial',
              },
            ],
          },
          {
            label: 'Errors',
            contentSite: 'sql-interface',
            url: '/docs/sql-interface/errors',
          },
          {
            label: 'Language Reference',
            contentSite: 'sql-interface',
            url: '/docs/sql-interface/language-reference',
          },
          {
            label: 'Private Endpoint',
            contentSite: 'sql-interface',
            url: '/docs/sql-interface/connect/private-endpoint',
          },
          {
            label: 'MongoDB Shell',
            contentSite: 'sql-interface',
            url: '/docs/sql-interface/connect/shell',
          },
          {
            label: 'Changelog',
            contentSite: 'sql-interface',
            url: '/docs/sql-interface/changelog',
          },
        ],
      },
    ],
  },
];
