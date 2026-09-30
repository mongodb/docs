import type { L1TocItem } from '../types';

export const toc: L1TocItem[] = [
  {
    label: 'Legacy Docs',
    contentSite: 'bi-connector',
    url: '/docs/bi-connector/current/',
    items: [
      {
        label: 'BI Connector',
        contentSite: 'bi-connector',
        group: true,
        items: [
          {
            label: 'Overview',
            contentSite: 'bi-connector',
            url: '/docs/bi-connector/current/',
          },
          {
            label: 'What is the MongoDB Connector for BI?',
            contentSite: 'bi-connector',
            url: '/docs/bi-connector/current/what-is-the-bi-connector',
          },
          {
            label: 'Quick Start Guide',
            contentSite: 'bi-connector',
            url: '/docs/bi-connector/current/local-quickstart',
          },
          {
            label: 'Enable BI Connector in Atlas',
            contentSite: 'bi-connector',
            url: '/docs/bi-connector/current/atlas-bi-connector',
          },
          {
            label: 'Install or Update BI Connector',
            contentSite: 'bi-connector',
            collapsible: true,
            url: '/docs/bi-connector/current/installation',
            items: [
              {
                label: 'Install BI Connector on Windows',
                contentSite: 'bi-connector',
                url: '/docs/bi-connector/current/tutorial/install-bi-connector-windows',
              },
              {
                label: 'Install BI Connector on macOS',
                contentSite: 'bi-connector',
                url: '/docs/bi-connector/current/tutorial/install-bi-connector-macos',
              },
              {
                label: 'Install BI Connector on Red Hat Enterprise-based Linux',
                contentSite: 'bi-connector',
                url: '/docs/bi-connector/current/tutorial/install-bi-connector-rhel',
              },
              {
                label: 'Install BI Connector on Debian-based Linux',
                contentSite: 'bi-connector',
                url: '/docs/bi-connector/current/tutorial/install-bi-connector-debian',
              },
            ],
          },
          {
            label: 'Launch BI Connector',
            contentSite: 'bi-connector',
            url: '/docs/bi-connector/current/launch',
          },
          {
            label: 'Connect BI Tools',
            contentSite: 'bi-connector',
            collapsible: true,
            url: '/docs/bi-connector/current/client-applications',
            items: [
              {
                label: 'Connect from Tableau Desktop',
                contentSite: 'bi-connector',
                collapsible: true,
                url: '/docs/bi-connector/current/connect/tableau',
                items: [
                  {
                    label: 'Connect from Tableau Desktop without Authentication or TLS/SSL',
                    contentSite: 'bi-connector',
                    url: '/docs/bi-connector/current/connect/tableau-no-auth',
                  },
                  {
                    label: 'Connect from Tableau Desktop with Authentication',
                    contentSite: 'bi-connector',
                    url: '/docs/bi-connector/current/connect/tableau-auth',
                  },
                  {
                    label: 'Connect from Tableau Desktop with Authentication and TLS/SSL',
                    contentSite: 'bi-connector',
                    url: '/docs/bi-connector/current/connect/tableau-auth-ssl',
                  },
                ],
              },
              {
                label: 'Connect from Microsoft Power BI Desktop',
                contentSite: 'bi-connector',
                url: '/docs/bi-connector/current/connect/powerbi',
              },
              {
                label: 'Connect from Microsoft Excel',
                contentSite: 'bi-connector',
                url: '/docs/bi-connector/current/connect/excel',
              },
              {
                label: 'Connect from the MySQL Client',
                contentSite: 'bi-connector',
                collapsible: true,
                url: '/docs/bi-connector/current/connect/mysql',
                items: [
                  {
                    label: 'MySQL Shell Options',
                    contentSite: 'bi-connector',
                    url: '/docs/bi-connector/current/reference/auth-plugin-c-mysql-options',
                  },
                ],
              },
              {
                label: 'Connect from Looker',
                contentSite: 'bi-connector',
                url: '/docs/bi-connector/current/connect/looker',
              },
              {
                label: 'Connect from MicroStrategy Desktop',
                contentSite: 'bi-connector',
                url: '/docs/bi-connector/current/connect/microstrategy',
              },
              {
                label: 'Connect from Qlik Sense',
                contentSite: 'bi-connector',
                url: '/docs/bi-connector/current/connect/qlik',
              },
              {
                label: 'Connect from Spotfire Cloud',
                contentSite: 'bi-connector',
                url: '/docs/bi-connector/current/connect/spotfire-cloud',
              },
            ],
          },
          {
            label: 'Authentication',
            contentSite: 'bi-connector',
            collapsible: true,
            url: '/docs/bi-connector/current/authentication',
            items: [
              {
                label: 'C Authentication Plugin',
                contentSite: 'bi-connector',
                url: '/docs/bi-connector/current/reference/auth-plugin-c',
              },
              {
                label: 'JDBC Authentication Plugin',
                contentSite: 'bi-connector',
                url: '/docs/bi-connector/current/reference/auth-plugin-jdbc',
              },
              {
                label: 'Configure Kerberos for BI Connector',
                contentSite: 'bi-connector',
                url: '/docs/bi-connector/current/tutorial/kerberos',
              },
            ],
          },
          {
            label: 'Map Relational Schemas to MongoDB',
            contentSite: 'bi-connector',
            collapsible: true,
            url: '/docs/bi-connector/current/schema-configuration',
            items: [
              {
                label: 'Standalone Schema Mode (Cached Sampling)',
                contentSite: 'bi-connector',
                url: '/docs/bi-connector/current/schema/cached-sampling',
              },
              {
                label: 'Auto Schema Mode (Persist a Schema in MongoDB)',
                contentSite: 'bi-connector',
                url: '/docs/bi-connector/current/schema/persist-schema',
              },
              {
                label: 'Use MongoDB Views',
                contentSite: 'bi-connector',
                url: '/docs/bi-connector/current/schema/use-views',
              },
              {
                label: 'Load a Schema from a DRDL File',
                contentSite: 'bi-connector',
                url: '/docs/bi-connector/current/schema/load-schema-from-drdl',
              },
              {
                label: 'Resample Schema Data with "FLUSH SAMPLE"',
                contentSite: 'bi-connector',
                url: '/docs/bi-connector/current/schema/resample-schema',
              },
              {
                label: 'Geospatial Data',
                contentSite: 'bi-connector',
                url: '/docs/bi-connector/current/schema/geospatial-data',
              },
              {
                label: 'Sampling Type Conflicts',
                contentSite: 'bi-connector',
                url: '/docs/bi-connector/current/schema/type-conflicts',
              },
              {
                label: 'Schema Management Changes in 2.11',
                contentSite: 'bi-connector',
                url: '/docs/bi-connector/current/schema/schema-management-changes',
              },
            ],
          },
          {
            label: 'Connector Components',
            contentSite: 'bi-connector',
            collapsible: true,
            url: '/docs/bi-connector/current/components',
            items: [
              {
                label: 'mongosqld',
                contentSite: 'bi-connector',
                url: '/docs/bi-connector/current/reference/mongosqld',
              },
              {
                label: 'mongodrdl',
                contentSite: 'bi-connector',
                url: '/docs/bi-connector/current/reference/mongodrdl',
              },
              {
                label: 'mongotranslate',
                contentSite: 'bi-connector',
                url: '/docs/bi-connector/current/reference/mongotranslate',
              },
              {
                label: 'MongoDB BI Connector ODBC Driver',
                contentSite: 'bi-connector',
                collapsible: true,
                url: '/docs/bi-connector/current/reference/odbc-driver',
                items: [
                  {
                    label: 'Create a System DSN',
                    contentSite: 'bi-connector',
                    url: '/docs/bi-connector/current/tutorial/create-system-dsn',
                  },
                ],
              },
              {
                label: 'MySQL JDBC Driver',
                contentSite: 'bi-connector',
                url: '/docs/bi-connector/current/reference/jdbc-driver',
              },
            ],
          },
          {
            label: 'Reference',
            contentSite: 'bi-connector',
            collapsible: true,
            items: [
              {
                label: 'Configure TLS for BI Connector',
                contentSite: 'bi-connector',
                url: '/docs/bi-connector/current/tutorial/ssl-setup',
              },
              {
                label: 'Document Relational Definition Language',
                contentSite: 'bi-connector',
                url: '/docs/bi-connector/current/reference/drdl',
              },
              {
                label: 'Log Messages',
                contentSite: 'bi-connector',
                url: '/docs/bi-connector/current/reference/log-messages',
              },
              {
                label: 'Type Conversion Modes',
                contentSite: 'bi-connector',
                url: '/docs/bi-connector/current/reference/type-conversion',
              },
              {
                label: 'User Authorization Model',
                contentSite: 'bi-connector',
                url: '/docs/bi-connector/current/reference/user-authorization',
              },
              {
                label: 'System Variables',
                contentSite: 'bi-connector',
                url: '/docs/bi-connector/current/reference/system-variables',
              },
              {
                label: 'Known Issues for BI Connector',
                contentSite: 'bi-connector',
                url: '/docs/bi-connector/current/reference/known-issues',
              },
              {
                label: 'Supported SQL Functions and Operators',
                contentSite: 'bi-connector',
                url: '/docs/bi-connector/current/supported-operations',
              },
            ],
          },
          {
            label: 'FAQ',
            contentSite: 'bi-connector',
            url: '/docs/bi-connector/current/faq',
          },
          {
            label: 'Release Notes',
            contentSite: 'bi-connector',
            url: '/docs/bi-connector/current/release-notes',
          },
        ],
      },
    ],
  },
];
