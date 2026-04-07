import { inheritContentSite, type TocItem } from '../../../types';

const tocData: TocItem[] = inheritContentSite('rust', [
  {
    label: 'Overview',
    url: '/docs/drivers/rust/:version/',
  },
  {
    label: 'Quick Start',
    url: '/docs/drivers/rust/:version/quick-start',
    collapsible: true,
    items: [
      {
        label: 'Download & Install',
        url: '/docs/drivers/rust/:version/quick-start/download-and-install',
      },
      {
        label: 'Create a Deployment',
        url: '/docs/drivers/rust/:version/quick-start/create-a-deployment',
      },
      {
        label: 'Create a Connection String',
        url: '/docs/drivers/rust/:version/quick-start/create-a-connection-string',
      },
      {
        label: 'Connect',
        url: '/docs/drivers/rust/:version/quick-start/connect-to-mongodb',
      },
      {
        label: 'Next Steps',
        url: '/docs/drivers/rust/:version/quick-start/next-steps',
      },
    ],
  },
  {
    label: 'Quick Reference',
    url: '/docs/drivers/rust/:version/quick-reference',
  },
  {
    label: "What's New",
    url: '/docs/drivers/rust/:version/whats-new',
  },
  {
    label: 'CRUD Examples',
    url: '/docs/drivers/rust/:version/usage-examples',
    collapsible: true,
    items: [
      {
        label: 'Find One',
        url: '/docs/drivers/rust/:version/usage-examples/findOne',
      },
      {
        label: 'Find Multiple',
        url: '/docs/drivers/rust/:version/usage-examples/find',
      },
      {
        label: 'Insert One',
        url: '/docs/drivers/rust/:version/usage-examples/insertOne',
      },
      {
        label: 'Insert Multiple',
        url: '/docs/drivers/rust/:version/usage-examples/insertMany',
      },
      {
        label: 'Update One',
        url: '/docs/drivers/rust/:version/usage-examples/updateOne',
      },
      {
        label: 'Update Multiple',
        url: '/docs/drivers/rust/:version/usage-examples/updateMany',
      },
      {
        label: 'Replace One',
        url: '/docs/drivers/rust/:version/usage-examples/replace',
      },
      {
        label: 'Delete One',
        url: '/docs/drivers/rust/:version/usage-examples/deleteOne',
      },
      {
        label: 'Delete Multiple',
        url: '/docs/drivers/rust/:version/usage-examples/deleteMany',
      },
      {
        label: 'Count',
        url: '/docs/drivers/rust/:version/usage-examples/count',
      },
      {
        label: 'List Distinct Values',
        url: '/docs/drivers/rust/:version/usage-examples/distinct',
      },
    ],
  },
  {
    label: 'Fundamentals',
    collapsible: true,
    items: [
      {
        label: 'Connections',
        collapsible: true,
        items: [
          {
            label: 'Connection Guide',
            url: '/docs/drivers/rust/:version/fundamentals/connections/connection-guide',
          },
          {
            label: 'Connection Options',
            url: '/docs/drivers/rust/:version/fundamentals/connections/connection-options',
          },
          {
            label: 'Network Compression',
            url: '/docs/drivers/rust/:version/fundamentals/connections/network-compression',
          },
          {
            label: 'Enable & Configure TLS',
            url: '/docs/drivers/rust/:version/fundamentals/connections/tls',
          },
          {
            label: 'AWS Lambda',
            isExternal: true,
            url: 'https://www.mongodb.com/docs/atlas/manage-connections-aws-lambda',
          },
        ],
      },
      {
        label: 'Stable API',
        url: '/docs/drivers/rust/:version/fundamentals/stable-api',
      },
      {
        label: 'Authentication',
        url: '/docs/drivers/rust/:version/fundamentals/authentication',
      },
      {
        label: 'Enterprise Authentication',
        url: '/docs/drivers/rust/:version/fundamentals/enterprise-auth',
      },
      {
        label: 'CRUD',
        collapsible: true,
        items: [
          {
            label: 'Read',
            collapsible: true,
            items: [
              {
                label: 'Retrieve Data',
                url: '/docs/drivers/rust/:version/fundamentals/crud/read-operations/retrieve',
              },
              {
                label: 'Specify a Query',
                url: '/docs/drivers/rust/:version/fundamentals/crud/read-operations/query',
              },
              {
                label: 'Data Cursors',
                url: '/docs/drivers/rust/:version/fundamentals/crud/read-operations/cursor',
              },
              {
                label: 'Open Change Streams',
                url: '/docs/drivers/rust/:version/fundamentals/crud/read-operations/change-streams',
              },
              {
                label: 'Query Text',
                url: '/docs/drivers/rust/:version/fundamentals/crud/read-operations/text-search',
              },
              {
                label: 'Sort Results',
                url: '/docs/drivers/rust/:version/fundamentals/crud/read-operations/sort',
              },
              {
                label: 'Skip Results',
                url: '/docs/drivers/rust/:version/fundamentals/crud/read-operations/skip',
              },
              {
                label: 'Limit Results',
                url: '/docs/drivers/rust/:version/fundamentals/crud/read-operations/limit',
              },
            ],
          },
          {
            label: 'Write',
            collapsible: true,
            items: [
              {
                label: 'Insert',
                url: '/docs/drivers/rust/:version/fundamentals/crud/write-operations/insert',
              },
              {
                label: 'Modify',
                url: '/docs/drivers/rust/:version/fundamentals/crud/write-operations/change',
              },
              {
                label: 'Delete',
                url: '/docs/drivers/rust/:version/fundamentals/crud/write-operations/delete',
              },
              {
                label: 'Bulk Operations',
                url: '/docs/drivers/rust/:version/fundamentals/crud/write-operations/bulk',
              },
            ],
          },
          {
            label: 'Compound Operations',
            url: '/docs/drivers/rust/:version/fundamentals/crud/compound-operations',
          },
        ],
      },
      {
        label: 'Serialization',
        url: '/docs/drivers/rust/:version/fundamentals/serialization',
      },
      {
        label: 'Databases & Collections',
        url: '/docs/drivers/rust/:version/fundamentals/database-collection',
      },
      {
        label: 'Schema Validation',
        url: '/docs/drivers/rust/:version/fundamentals/schema-validation',
      },
      {
        label: 'Aggregation',
        url: '/docs/drivers/rust/:version/fundamentals/aggregation',
      },
      {
        label: 'Indexes',
        url: '/docs/drivers/rust/:version/fundamentals/indexes',
      },
      {
        label: 'Transactions',
        url: '/docs/drivers/rust/:version/fundamentals/transactions',
      },
      {
        label: 'Time Series Collections',
        url: '/docs/drivers/rust/:version/fundamentals/time-series',
      },
      {
        label: 'Tracing & Logging',
        url: '/docs/drivers/rust/:version/fundamentals/tracing-logging',
      },
      {
        label: 'Database Commands',
        url: '/docs/drivers/rust/:version/fundamentals/run-command',
      },
      {
        label: 'Performance Considerations',
        url: '/docs/drivers/rust/:version/fundamentals/performance',
      },
      {
        label: 'Async & Sync APIs',
        url: '/docs/drivers/rust/:version/fundamentals/runtimes',
      },
      {
        label: 'Monitoring',
        collapsible: true,
        items: [
          {
            label: 'Cluster Monitoring',
            url: '/docs/drivers/rust/:version/fundamentals/monitoring/cluster-monitoring',
          },
          {
            label: 'Command Monitoring',
            url: '/docs/drivers/rust/:version/fundamentals/monitoring/command-monitoring',
          },
          {
            label: 'Connection Monitoring',
            url: '/docs/drivers/rust/:version/fundamentals/monitoring/connection-monitoring',
          },
        ],
      },
      {
        label: 'Collations',
        url: '/docs/drivers/rust/:version/fundamentals/collations',
      },
      {
        label: 'Search Geospatially',
        url: '/docs/drivers/rust/:version/fundamentals/geo',
      },
      {
        label: 'GridFS',
        url: '/docs/drivers/rust/:version/fundamentals/gridfs',
      },
    ],
  },
  {
    label: 'Third-Party Integrations',
    url: '/docs/drivers/rust/:version/integrations',
  },
  {
    label: 'API Documentation',
    contentSite: 'rust',
    url: '/docs/drivers/rust/:version/api',
    collapsible: true,
    items: [
      {
        label: 'MongoDB Rust Driver',
        isExternal: true,
        url: 'https://docs.rs/mongodb/latest/mongodb/index.html',
      },
      {
        label: 'BSON Crate',
        isExternal: true,
        url: 'https://docs.rs/bson/latest/bson/index.html',
      },
    ],
  },
  {
    label: 'FAQ',
    url: '/docs/drivers/rust/:version/faq',
  },
  {
    label: 'Connection Troubleshooting',
    url: '/docs/drivers/rust/:version/connection-troubleshooting',
  },
  {
    label: 'Operation Error Handling',
    url: '/docs/drivers/rust/:version/op-error-handling',
  },
  {
    label: 'Issues & Help',
    url: '/docs/drivers/rust/:version/issues-and-help',
  },
  {
    label: 'Compatibility',
    contentSite: 'drivers',
    url: '/docs/drivers/compatibility/?driver-language=rust',
  },
  {
    label: 'View the Source',
    url: '/docs/drivers/rust/:version/view-source',
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
]);

export default tocData;
