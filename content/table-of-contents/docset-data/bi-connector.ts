import type { TocItem } from '../types';

const tocData: TocItem[] = [
  {
    label: 'BI Connector',
    contentSite: 'bi-connector',
    versionDropdown: true,
    group: true,
    items: [
      {
        label: 'Overview',
        contentSite: 'bi-connector',
        url: '/docs/bi-connector/:version/',
      },
      {
        label: 'What is the MongoDB Connector for BI?',
        contentSite: 'bi-connector',
        url: '/docs/bi-connector/:version/what-is-the-bi-connector',
      },
      {
        label: 'Quick Start Guide',
        contentSite: 'bi-connector',
        url: '/docs/bi-connector/:version/local-quickstart',
      },
      {
        label: 'Enable BI Connector in Atlas',
        contentSite: 'bi-connector',
        url: '/docs/bi-connector/:version/atlas-bi-connector',
      },
      {
        label: 'Install or Update BI Connector',
        contentSite: 'bi-connector',
        url: '/docs/bi-connector/:version/installation',
        collapsible: true,
        items: [
          {
            label: 'Install BI Connector on Windows',
            contentSite: 'bi-connector',
            url: '/docs/bi-connector/:version/tutorial/install-bi-connector-windows',
          },
          {
            label: 'Install BI Connector on macOS',
            contentSite: 'bi-connector',
            url: '/docs/bi-connector/:version/tutorial/install-bi-connector-macos',
          },
          {
            label: 'Install BI Connector on Red Hat Enterprise-based Linux',
            contentSite: 'bi-connector',
            url: '/docs/bi-connector/:version/tutorial/install-bi-connector-rhel',
          },
          {
            label: 'Install BI Connector on Debian-based Linux',
            contentSite: 'bi-connector',
            url: '/docs/bi-connector/:version/tutorial/install-bi-connector-debian',
          },
        ],
      },
      {
        label: 'Launch BI Connector',
        contentSite: 'bi-connector',
        url: '/docs/bi-connector/:version/launch',
      },
      {
        label: 'Connect BI Tools',
        contentSite: 'bi-connector',
        url: '/docs/bi-connector/:version/client-applications',
        collapsible: true,
        items: [
          {
            label: 'Connect from Tableau Desktop',
            contentSite: 'bi-connector',
            url: '/docs/bi-connector/:version/connect/tableau',
            collapsible: true,
            items: [
              {
                label:
                  'Connect from Tableau Desktop without Authentication or TLS/SSL',
                contentSite: 'bi-connector',
                url: '/docs/bi-connector/:version/connect/tableau-no-auth',
              },
              {
                label: 'Connect from Tableau Desktop with Authentication',
                contentSite: 'bi-connector',
                url: '/docs/bi-connector/:version/connect/tableau-auth',
              },
              {
                label:
                  'Connect from Tableau Desktop with Authentication and TLS/SSL',
                contentSite: 'bi-connector',
                url: '/docs/bi-connector/:version/connect/tableau-auth-ssl',
              },
            ],
          },
          {
            label: 'Connect from Microsoft Power BI Desktop',
            contentSite: 'bi-connector',
            url: '/docs/bi-connector/:version/connect/powerbi',
          },
          {
            label: 'Connect from Microsoft Excel',
            contentSite: 'bi-connector',
            url: '/docs/bi-connector/:version/connect/excel',
          },
          {
            label: 'Connect from the MySQL Client',
            contentSite: 'bi-connector',
            url: '/docs/bi-connector/:version/connect/mysql',
            collapsible: true,
            items: [
              {
                label: 'MySQL Shell Options',
                contentSite: 'bi-connector',
                url: '/docs/bi-connector/:version/reference/auth-plugin-c-mysql-options',
              },
            ],
          },
        ],
      },
      {
        label: 'Authentication',
        contentSite: 'bi-connector',
        url: '/docs/bi-connector/:version/authentication',
        collapsible: true,
        items: [
          {
            label: 'C Authentication Plugin',
            contentSite: 'bi-connector',
            url: '/docs/bi-connector/:version/reference/auth-plugin-c',
          },
          {
            label: 'JDBC Authentication Plugin',
            contentSite: 'bi-connector',
            url: '/docs/bi-connector/:version/reference/auth-plugin-jdbc',
          },
          {
            label: 'Configure Kerberos for ',
            contentSite: 'bi-connector',
            url: '/docs/bi-connector/:version/tutorial/kerberos',
          },
        ],
      },
      {
        label: 'Map Relational Schemas to MongoDB',
        contentSite: 'bi-connector',
        url: '/docs/bi-connector/:version/schema-configuration',
        collapsible: true,
        items: [
          {
            label: 'Standalone Schema Mode (Cached Sampling)',
            contentSite: 'bi-connector',
            url: '/docs/bi-connector/:version/schema/cached-sampling',
          },
          {
            label: 'Auto Schema Mode (Persist a Schema in MongoDB)',
            contentSite: 'bi-connector',
            url: '/docs/bi-connector/:version/schema/persist-schema',
          },
          {
            label: 'Use MongoDB Views',
            contentSite: 'bi-connector',
            url: '/docs/bi-connector/:version/schema/use-views',
          },
          {
            label: 'Load a Schema from a DRDL File',
            contentSite: 'bi-connector',
            url: '/docs/bi-connector/:version/schema/load-schema-from-drdl',
          },
          {
            label: 'Resample Schema Data with "FLUSH SAMPLE"',
            contentSite: 'bi-connector',
            url: '/docs/bi-connector/:version/schema/resample-schema',
          },
          {
            label: 'Geospatial Data',
            contentSite: 'bi-connector',
            url: '/docs/bi-connector/:version/schema/geospatial-data',
          },
          {
            label: 'Sampling Type Conflicts',
            contentSite: 'bi-connector',
            url: '/docs/bi-connector/:version/schema/type-conflicts',
          },
          {
            label: 'Schema Management Changes in 2.11',
            contentSite: 'bi-connector',
            url: '/docs/bi-connector/:version/schema/schema-management-changes',
          },
        ],
      },
      {
        label: 'Connector Components',
        contentSite: 'bi-connector',
        url: '/docs/bi-connector/:version/components',
        collapsible: true,
        items: [
          {
            label: 'mongosqld',
            contentSite: 'bi-connector',
            url: '/docs/bi-connector/:version/reference/mongosqld',
          },
          {
            label: 'mongodrdl',
            contentSite: 'bi-connector',
            url: '/docs/bi-connector/:version/reference/mongodrdl',
          },
          {
            label: 'mongotranslate',
            contentSite: 'bi-connector',
            url: '/docs/bi-connector/:version/reference/mongotranslate',
          },
          {
            label: 'MongoDB BI Connector ODBC Driver',
            contentSite: 'bi-connector',
            url: '/docs/bi-connector/:version/reference/odbc-driver',
            collapsible: true,
            items: [
              {
                label: 'Create a System DSN',
                contentSite: 'bi-connector',
                url: '/docs/bi-connector/:version/tutorial/create-system-dsn',
              },
            ],
          },
          {
            label: 'MySQL JDBC Driver',
            contentSite: 'bi-connector',
            url: '/docs/bi-connector/:version/reference/jdbc-driver',
          },
        ],
      },
      {
        label: 'Reference',
        contentSite: 'bi-connector',
        url: '/docs/bi-connector/:version/reference',
        collapsible: true,
        items: [
          {
            label: 'Configure TLS for BI Connector',
            contentSite: 'bi-connector',
            url: '/docs/bi-connector/:version/tutorial/ssl-setup',
          },
          {
            label: 'Document Relational Definition Language',
            contentSite: 'bi-connector',
            url: '/docs/bi-connector/:version/reference/drdl',
          },
          {
            label: 'Log Messages',
            contentSite: 'bi-connector',
            url: '/docs/bi-connector/:version/reference/log-messages',
          },
          {
            label: 'Type Conversion Modes',
            contentSite: 'bi-connector',
            url: '/docs/bi-connector/:version/reference/type-conversion',
          },
          {
            label: 'User Authorization Model',
            contentSite: 'bi-connector',
            url: '/docs/bi-connector/:version/reference/user-authorization',
          },
          {
            label: 'System Variables',
            contentSite: 'bi-connector',
            url: '/docs/bi-connector/:version/reference/system-variables',
          },
          {
            label: 'Known Issues for BI Connector',
            contentSite: 'bi-connector',
            url: '/docs/bi-connector/:version/reference/known-issues',
          },
          {
            label: 'Supported SQL Functions and Operators',
            contentSite: 'bi-connector',
            url: '/docs/bi-connector/:version/supported-operations',
          },
        ],
      },
      {
        label: 'FAQ',
        contentSite: 'bi-connector',
        url: '/docs/bi-connector/:version/faq',
      },
      {
        label: 'Release Notes',
        contentSite: 'bi-connector',
        url: '/docs/bi-connector/:version/release-notes',
        collapsible: true,
        items: [
          {
            label: 'Known Issues for BI Connector',
            contentSite: 'bi-connector',
            url: '/docs/bi-connector/:version/reference/known-issues',
          },
        ],
      },
    ],
  },
];

export default tocData;
