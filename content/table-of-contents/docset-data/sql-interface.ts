import type { TocItem } from '../types';

const tocData: TocItem[] = [
  {
    label: 'SQL Interface',
    contentSite: 'cloud-docs',
    group: true,
    items: [
      {
        label: 'Overview',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/data-federation/query/connect-with-sql-overview',
      },
      {
        label: 'Enable SQL Access',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/data-federation/query/connect-with-sql-composable',
      },
      {
        label: 'Migration Guide',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/tutorial/transition-bic-to-atlas-sql/', //JW note: the migration-guide file was empty and 404ing as I think it was in the wrong directory, so Alexi advised to point here instead in short term
      },
      {
        label: 'Connect',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/data-federation/query/sql/connect',
        collapsible: true,
        items: [
          {
            label: 'MongoDB Shell',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/data-federation/query/sql/shell/connect',
          },
          {
            label: 'JDBC Driver',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/data-federation/query/sql/drivers/jdbc/connect',
          },
          {
            label: 'ODBC',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/data-federation/query/sql/drivers/odbc/connect',
          },
          {
            label: 'Tableau',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/data-federation/query/sql/tableau/connect',
          },
          {
            label: 'Power BI',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/data-federation/query/sql/powerbi/connect',
          },
          {
            label: 'Private Endpoint',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/data-federation/query/sql/private-endpoint/connect',
          },
        ],
      },
      {
        label: 'Query',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/data-federation/query/sql/query-with-asql-statements',
      },
      {
        label: 'SQL Tutorials',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/data-federation/query/sql/tutorials',
        collapsible: true,
        items: [
          {
            label: 'Connect and Query',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/data-federation/query/sql/tutorials/connect-tutorial',
          },
        ],
      },
      {
        label: 'Errors',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/data-federation/query/sql/errors',
      },
      {
        label: 'Language Reference',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/data-federation/query/sql/language-reference',
      },
      {
        label: 'Changelog',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/release-notes/sql',
      },
    ],
  },
];

export default tocData;
