import { inheritContentSite, type TocItem } from '../../../types';

const tocData: TocItem[] = inheritContentSite('rust', [
  {
    label: 'Overview',
    url: '/docs/drivers/rust/:version/',
  },
  {
    label: 'Get Started',
    url: '/docs/drivers/rust/:version/get-started/',
  },
  {
    label: 'Connect',
    collapsible: true,
    items: [
      {
        label: 'Create a MongoDB Client',
        url: '/docs/drivers/rust/:version/connect/mongodb-client/',
      },
      {
        label: 'Choose a Connection Target',
        url: '/docs/drivers/rust/:version/connect/connection-target/',
      },
      {
        label: 'Connection Options',
        url: '/docs/drivers/rust/:version/connect/connection-options/',
        collapsible: true,
        items: [
          {
            label: 'Compress Network Traffic',
            url: '/docs/drivers/rust/:version/connect/connection-options/network-compression/',
          },
          {
            label: 'Customize Server Selection',
            url: '/docs/drivers/rust/:version/connect/connection-options/server-selection/',
          },
          {
            label: 'Stable API',
            url: '/docs/drivers/rust/:version/connect/connection-options/stable-api/',
          },
          {
            label: 'Connection Pools',
            url: '/docs/drivers/rust/:version/connect/connection-options/connection-pools/',
          },
        ],
      },
      {
        label: 'Peformance Considerations',
        url: '/docs/drivers/rust/:version/connect/performance/',
      },
      {
        label: 'Connection Troubleshooting',
        url: '/docs/drivers/rust/:version/connect/connection-troubleshooting/',
      },
      {
        label: 'AWS Lambda',
        url: 'https://www.mongodb.com/docs/atlas/manage-connections-aws-lambda/',
      },
    ],
  },
  {
    label: 'Databases & Collections',
    url: '/docs/drivers/rust/:version/database-collection/',
  },
  {
    label: 'CRUD Operations',
    url: '/docs/drivers/rust/:version/crud/',
    collapsible: true,
    items: [
      {
        label: 'Insert Documents',
        url: '/docs/drivers/rust/:version/crud/insert/',
      },
      {
        label: 'Query Documents',
        collapsible: true,
        items: [
          {
            label: 'Specify a Query',
            url: '/docs/drivers/rust/:version/crud/query/specify-query/',
          },
          {
            label: 'Find Documents',
            url: '/docs/drivers/rust/:version/crud/query/retrieve/',
          },
          {
            label: 'Specify Documents to Return',
            url: '/docs/drivers/rust/:version/crud/query/specify-documents/',
          },
          {
            label: 'Specify Fields to Return',
            url: '/docs/drivers/rust/:version/crud/query/specify-fields/',
          },
          {
            label: 'Count Documents',
            url: '/docs/drivers/rust/:version/crud/query/count/',
          },
          {
            label: 'Distinct Field Values',
            url: '/docs/drivers/rust/:version/crud/query/distinct/',
          },
          {
            label: 'Query Text',
            url: '/docs/drivers/rust/:version/crud/query/text-search/',
          },
          {
            label: 'Access Data from a Cursor',
            url: '/docs/drivers/rust/:version/crud/query/cursor/',
          },
          {
            label: 'Geospatial Queries',
            url: '/docs/drivers/rust/:version/crud/query/geo/',
          },
        ],
      },
      {
        label: 'Update Documents',
        url: '/docs/drivers/rust/:version/crud/update/',
        collapsible: true,
        items: [
          {
            label: 'Replace Documents',
            url: '/docs/drivers/rust/:version/crud/update/replace/',
          },
          {
            label: 'Update Arrays',
            url: '/docs/drivers/rust/:version/crud/update/embedded-arrays/',
          },
        ],
      },
      {
        label: 'Delete Documents',
        url: '/docs/drivers/rust/:version/crud/delete/',
      },
      {
        label: 'Bulk Write Operations',
        url: '/docs/drivers/rust/:version/crud/bulk/',
      },
      {
        label: 'Transactions',
        url: '/docs/drivers/rust/:version/crud/transactions/',
      },
      {
        label: 'Compound Operations',
        url: '/docs/drivers/rust/:version/crud/compound-operations/',
      },
      {
        label: 'Configure CRUD Operations',
        url: '/docs/drivers/rust/:version/crud/configure/',
      },
      {
        label: 'Store Large Files',
        url: '/docs/drivers/rust/:version/crud/gridfs/',
      },
      {
        label: 'Tutorial: CRUD Web Application',
        url: '/docs/drivers/rust/:version/crud/web-app-tutorial/',
      },
    ],
  },
  {
    label: 'Schema Validation',
    url: '/docs/drivers/rust/:version/schema-validation/',
  },
  {
    label: 'Aggregation',
    url: '/docs/drivers/rust/:version/aggregation/',
    collapsible: true,
    items: [
      {
        label: 'Collations',
        url: '/docs/drivers/rust/:version/aggregation/collations/',
      },
    ],
  },
  {
    label: 'Data Formats',
    collapsible: true,
    items: [
      {
        label: 'BSON',
        url: '/docs/drivers/rust/:version/data-formats/bson/',
      },
      {
        label: 'Serialization',
        url: '/docs/drivers/rust/:version/data-formats/serialization/',
      },
      {
        label: 'Time Series',
        url: '/docs/drivers/rust/:version/data-formats/time-series/',
      },
      {
        label: 'Bounds and Bounds Errors',
        url: '/docs/drivers/rust/:version/data-formats/bounds/',
      },
      {
        label: 'Result and Option Enums',
        url: '/docs/drivers/rust/:version/data-formats/result-option/',
      },
    ],
  },
  {
    label: 'Indexes',
    url: '/docs/drivers/rust/:version/indexes/',
    collapsible: true,
    items: [
      {
        label: 'MongoDB Search & Vector Search Indexes',
        url: '/docs/drivers/rust/:version/indexes/atlas-search-indexes/',
      },
    ],
  },
  {
    label: 'Run a Database Command',
    url: '/docs/drivers/rust/:version/run-command/',
  },
  {
    label: 'Async and Sync APIs',
    url: '/docs/drivers/rust/:version/runtimes/',
  },
  {
    label: 'MongoDB Search',
    url: '/docs/drivers/rust/:version/atlas-search/',
  },
  {
    label: 'MongoDB Vector Search',
    url: '/docs/drivers/rust/:version/vector-search/',
  },
  {
    label: 'Logging and Monitoring',
    collapsible: true,
    items: [
      {
        label: 'Monitoring',
        url: '/docs/drivers/rust/:version/monitoring-logging/monitoring/',
      },
      {
        label: 'Tracing and Logging',
        url: '/docs/drivers/rust/:version/monitoring-logging/tracing-logging/',
      },
      {
        label: 'Change Streams',
        url: '/docs/drivers/rust/:version/monitoring-logging/change-streams/',
      },
    ],
  },
  {
    label: 'Security',
    collapsible: true,
    items: [
      {
        label: 'Authentication',
        url: '/docs/drivers/rust/:version/security/authentication/',
        collapsible: true,
        items: [
          {
            label: 'SCRAM',
            url: '/docs/drivers/rust/:version/security/authentication/scram/',
          },
          {
            label: `X.509`,
            url: '/docs/drivers/rust/:version/security/authentication/x509/',
          },
          {
            label: 'AWS IAM',
            url: '/docs/drivers/rust/:version/security/authentication/aws-iam/',
          },
          {
            label: 'OIDC',
            url: '/docs/drivers/rust/:version/security/authentication/oidc/',
          },
          {
            label: 'LDAP (PLAIN)',
            url: '/docs/drivers/rust/:version/security/authentication/ldap/',
          },
          {
            label: 'Kerberos (GSSAPI)',
            url: '/docs/drivers/rust/:version/security/authentication/kerberos/',
          },
        ],
      },
      {
        label: 'In-Use Encryption',
        url: '/docs/drivers/rust/:version/security/in-use-encryption/',
      },
      {
        label: 'TLS/SSL Configuration',
        url: '/docs/drivers/rust/:version/security/tls/',
      },
    ],
  },
  {
    label: 'Third-Party Integrations',
    url: '/docs/drivers/rust/:version/integrations/',
  },
  {
    label: 'Reference',
    collapsible: true,
    items: [
      {
        label: 'Release Notes',
        url: '/docs/drivers/rust/:version/reference/release-notes/',
      },
      {
        label: 'Compatibility',
        contentSite: 'drivers',
        url: '/docs/drivers/compatibility/?driver-language=rust',
      },
      {
        label: 'Upgrade Versions',
        url: '/docs/drivers/rust/:version/reference/upgrade/',
      },
      {
        label: 'Quick Reference',
        url: '/docs/drivers/rust/:version/reference/quick-reference/',
      },
      {
        label: 'View the Source',
        collapsible: true,
        items: [
          {
            label: 'MongoDB Rust Driver',
            isExternal: true,
            url: 'https://github.com/mongodb/mongo-rust-driver',
          },
          {
            label: 'BSON Crate',
            isExternal: true,
            url: 'https://github.com/mongodb/bson-rust',
          },
        ],
      },
    ],
  },
  {
    label: 'Operation Error Handling',
    url: '/docs/drivers/rust/:version/op-error-handling/',
  },
  {
    label: 'API Documentation',
    contentSite: 'rust',
    collapsible: true,
    items: [
      {
        label: 'MongoDB Rust Driver',
        isExternal: true,
        url: 'https://docs.rs/mongodb/3.6.0/mongodb/index.html',
      },
      {
        label: 'BSON Crate',
        isExternal: true,
        url: 'https://docs.rs/bson/3.1.0/bson/index.html',
      },
    ],
  },
  {
    label: 'Issues & Help',
    url: '/docs/drivers/rust/:version/issues-and-help/',
  },
]);

export default tocData;
