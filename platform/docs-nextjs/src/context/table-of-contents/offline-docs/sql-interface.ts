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
            label: 'Enable SQL Access',
            contentSite: 'sql-interface',
            url: '/docs/sql-interface/connect-with-sql-composable',
          },
          {
            label: 'Migration Guide',
            contentSite: 'sql-interface',
            url: '/docs/sql-interface/transition-bic-to-atlas-sql/',
          },
          {
            label: 'Connect',
            contentSite: 'sql-interface',
            collapsible: true,
            url: '/docs/sql-interface/connect',
            items: [
              {
                label: 'MongoDB Shell',
                contentSite: 'sql-interface',
                url: '/docs/sql-interface/connect/shell',
              },
              {
                label: 'JDBC Driver',
                contentSite: 'sql-interface',
                url: '/docs/sql-interface/connect/jdbc',
              },
              {
                label: 'ODBC',
                contentSite: 'sql-interface',
                url: '/docs/sql-interface/connect/odbc',
              },
              {
                label: 'Tableau',
                contentSite: 'sql-interface',
                url: '/docs/sql-interface/connect/tableau',
              },
              {
                label: 'Power BI',
                contentSite: 'sql-interface',
                url: '/docs/sql-interface/connect/power-bi',
              },
              {
                label: 'Private Endpoint',
                contentSite: 'sql-interface',
                url: '/docs/sql-interface/connect/private-endpoint',
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
            label: 'Changelog',
            contentSite: 'sql-interface',
            url: '/docs/sql-interface/changelog',
          },
        ],
      },
    ],
  },
];
