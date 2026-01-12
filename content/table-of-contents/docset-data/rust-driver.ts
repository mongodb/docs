import type { TocItem } from '../types';
import docsVersions from '../version-arrays/drivers/rust-versions';

const outdatedVersions = docsVersions.before('v3.2');

export const tocData: TocItem[] = [
  {
    label: 'Rust Driver',
    contentSite: 'rust',
    group: true,
    versionDropdown: true,
    items: [
      {
        label: 'Overview',
        contentSite: 'rust',
        url: '/docs/drivers/rust/:version/',
      },
      {
        label: 'Quick Start',
        contentSite: 'rust',
        url: '/docs/drivers/rust/:version/quick-start',
        collapsible: true,
        items: [
          {
            label: 'Download & Install',
            contentSite: 'rust',
            url: '/docs/drivers/rust/:version/quick-start/download-and-install',
          },
          {
            label: 'Create a Deployment',
            contentSite: 'rust',
            url: '/docs/drivers/rust/:version/quick-start/create-a-deployment',
          },
          {
            label: 'Create a Connection String',
            contentSite: 'rust',
            url: '/docs/drivers/rust/:version/quick-start/create-a-connection-string',
          },
          {
            label: 'Connect',
            contentSite: 'rust',
            url: '/docs/drivers/rust/:version/quick-start/connect-to-mongodb',
          },
          {
            label: 'Next Steps',
            contentSite: 'rust',
            url: '/docs/drivers/rust/:version/quick-start/next-steps',
          },
        ],
      },
      {
        label: 'Quick Reference',
        contentSite: 'rust',
        url: '/docs/drivers/rust/:version/quick-reference',
      },
      {
        label: "What's New",
        contentSite: 'rust',
        url: '/docs/drivers/rust/:version/whats-new',
      },
      {
        label: 'CRUD Examples',
        contentSite: 'rust',
        url: '/docs/drivers/rust/:version/usage-examples',
        collapsible: true,
        items: [
          {
            label: 'Find One',
            contentSite: 'rust',
            url: '/docs/drivers/rust/:version/usage-examples/findOne',
          },
          {
            label: 'Find Multiple',
            contentSite: 'rust',
            url: '/docs/drivers/rust/:version/usage-examples/find',
          },
          {
            label: 'Insert One',
            contentSite: 'rust',
            url: '/docs/drivers/rust/:version/usage-examples/insertOne',
          },
          {
            label: 'Insert Multiple',
            contentSite: 'rust',
            url: '/docs/drivers/rust/:version/usage-examples/insertMany',
          },
          {
            label: 'Update One',
            contentSite: 'rust',
            url: '/docs/drivers/rust/:version/usage-examples/updateOne',
          },
          {
            label: 'Update Multiple',
            contentSite: 'rust',
            url: '/docs/drivers/rust/:version/usage-examples/updateMany',
          },
          {
            label: 'Replace One',
            contentSite: 'rust',
            url: '/docs/drivers/rust/:version/usage-examples/replace',
          },
          {
            label: 'Delete One',
            contentSite: 'rust',
            url: '/docs/drivers/rust/:version/usage-examples/deleteOne',
          },
          {
            label: 'Delete Multiple',
            contentSite: 'rust',
            url: '/docs/drivers/rust/:version/usage-examples/deleteMany',
          },
          {
            label: 'Count',
            contentSite: 'rust',
            url: '/docs/drivers/rust/:version/usage-examples/count',
          },
          {
            label: 'List Distinct Values',
            contentSite: 'rust',
            url: '/docs/drivers/rust/:version/usage-examples/distinct',
          },
        ],
      },
      {
        label: 'Fundamentals',
        contentSite: 'rust',
        collapsible: true,
        items: [
          {
            label: 'Connections',
            contentSite: 'rust',
            collapsible: true,
            items: [
              {
                label: 'Connection Guide',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/fundamentals/connections/connection-guide',
              },
              {
                label: 'Connection Options',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/fundamentals/connections/connection-options',
              },
              {
                label: 'Network Compression',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/fundamentals/connections/network-compression',
              },
              {
                label: 'Enable & Configure TLS',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/fundamentals/connections/tls',
              },
              {
                label: 'AWS Lambda',
                contentSite: 'cloud-docs',
                url: 'https://www.mongodb.com/docs/atlas/manage-connections-aws-lambda',
              },
            ],
          },
          {
            label: 'Stable API',
            contentSite: 'rust',
            url: '/docs/drivers/rust/:version/fundamentals/stable-api',
          },
          {
            label: 'Authentication',
            contentSite: 'rust',
            url: '/docs/drivers/rust/:version/fundamentals/authentication',
          },
          {
            label: 'Enterprise Authentication',
            contentSite: 'rust',
            url: '/docs/drivers/rust/:version/fundamentals/enterprise-auth',
          },
          {
            label: 'CRUD',
            contentSite: 'rust',
            collapsible: true,
            items: [
              {
                label: 'Read',
                contentSite: 'rust',
                collapsible: true,
                items: [
                  {
                    label: 'Retrieve Data',
                    contentSite: 'rust',
                    url: '/docs/drivers/rust/:version/fundamentals/crud/read-operations/retrieve',
                  },
                  {
                    label: 'Specify a Query',
                    contentSite: 'rust',
                    url: '/docs/drivers/rust/:version/fundamentals/crud/read-operations/query',
                  },
                  {
                    label: 'Data Cursors',
                    contentSite: 'rust',
                    url: '/docs/drivers/rust/:version/fundamentals/crud/read-operations/cursor',
                  },
                  {
                    label: 'Open Change Streams',
                    contentSite: 'rust',
                    url: '/docs/drivers/rust/:version/fundamentals/crud/read-operations/change-streams',
                  },
                  {
                    label: 'Query Text',
                    contentSite: 'rust',
                    url: '/docs/drivers/rust/:version/fundamentals/crud/read-operations/text-search',
                  },
                  {
                    label: 'Sort Results',
                    contentSite: 'rust',
                    url: '/docs/drivers/rust/:version/fundamentals/crud/read-operations/sort',
                  },
                  {
                    label: 'Skip Results',
                    contentSite: 'rust',
                    url: '/docs/drivers/rust/:version/fundamentals/crud/read-operations/skip',
                  },
                  {
                    label: 'Limit Results',
                    contentSite: 'rust',
                    url: '/docs/drivers/rust/:version/fundamentals/crud/read-operations/limit',
                  },
                ],
              },
              {
                label: 'Write',
                contentSite: 'rust',
                collapsible: true,
                items: [
                  {
                    label: 'Insert',
                    contentSite: 'rust',
                    url: '/docs/drivers/rust/:version/fundamentals/crud/write-operations/insert',
                  },
                  {
                    label: 'Modify',
                    contentSite: 'rust',
                    url: '/docs/drivers/rust/:version/fundamentals/crud/write-operations/change',
                  },
                  {
                    label: 'Delete',
                    contentSite: 'rust',
                    url: '/docs/drivers/rust/:version/fundamentals/crud/write-operations/delete',
                  },
                  {
                    label: 'Bulk Operations',
                    contentSite: 'rust',
                    url: '/docs/drivers/rust/:version/fundamentals/crud/write-operations/bulk',
                  },
                ],
              },
              {
                label: 'Compound Operations',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/fundamentals/crud/compound-operations',
              },
              {
                label: 'Tutorial: CRUD Web App',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/fundamentals/crud/web-app-tutorial',
                versions: { excludes: outdatedVersions },
              },
            ],
          },
          {
            label: 'Serialization',
            contentSite: 'rust',
            url: '/docs/drivers/rust/:version/fundamentals/serialization',
          },
          {
            label: 'Databases & Collections',
            contentSite: 'rust',
            url: '/docs/drivers/rust/:version/fundamentals/database-collection',
          },
          {
            label: 'Schema Validation',
            contentSite: 'rust',
            url: '/docs/drivers/rust/:version/fundamentals/schema-validation',
          },
          {
            label: 'Aggregation',
            contentSite: 'rust',
            url: '/docs/drivers/rust/:version/fundamentals/aggregation',
          },
          {
            label: 'Indexes',
            contentSite: 'rust',
            url: '/docs/drivers/rust/:version/fundamentals/indexes',
            collapsible: true,
            versions: { excludes: ['v2.7'] },
            items: [
              {
                label: 'MongoDB Search & Vector Search Indexes',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/fundamentals/indexes/atlas-search-indexes',
                versions: { excludes: ['v2.8', 'v3.0'] },
              },
              {
                label: 'MongoDB Search Indexes',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/fundamentals/indexes/atlas-search-indexes',
                versions: { includes: ['v2.8', 'v3.0'] },
              },
            ],
          },
          {
            label: 'Indexes',
            contentSite: 'rust',
            url: '/docs/drivers/rust/:version/fundamentals/indexes',
            versions: { includes: ['v2.7'] },
          },
          {
            label: 'MongoDB Search',
            contentSite: 'rust',
            url: '/docs/drivers/rust/:version/fundamentals/atlas-search',
            versions: {
              excludes: [...outdatedVersions, 'v2.7', 'v2.8', 'v3.0'],
            },
          },
          {
            label: 'MongoDB Vector Search',
            contentSite: 'rust',
            url: '/docs/drivers/rust/:version/fundamentals/vector-search',
            versions: {
              excludes: [...outdatedVersions, 'v2.7', 'v2.8', 'v3.0'],
            },
          },
          {
            label: 'Transactions',
            contentSite: 'rust',
            url: '/docs/drivers/rust/:version/fundamentals/transactions',
          },
          {
            label: 'Time Series Collections',
            contentSite: 'rust',
            url: '/docs/drivers/rust/:version/fundamentals/time-series',
          },
          {
            label: 'Tracing & Logging',
            contentSite: 'rust',
            url: '/docs/drivers/rust/:version/fundamentals/tracing-logging',
          },
          {
            label: 'Database Commands',
            contentSite: 'rust',
            url: '/docs/drivers/rust/:version/fundamentals/run-command',
          },
          {
            label: 'Performance Considerations',
            contentSite: 'rust',
            url: '/docs/drivers/rust/:version/fundamentals/performance',
          },
          {
            label: 'Async & Sync APIs',
            contentSite: 'rust',
            url: '/docs/drivers/rust/:version/fundamentals/runtimes',
          },
          {
            label: 'Monitoring',
            contentSite: 'rust',
            collapsible: true,
            items: [
              {
                label: 'Cluster Monitoring',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/fundamentals/monitoring/cluster-monitoring',
              },
              {
                label: 'Command Monitoring',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/fundamentals/monitoring/command-monitoring',
              },
              {
                label: 'Connection Monitoring',
                contentSite: 'rust',
                url: '/docs/drivers/rust/:version/fundamentals/monitoring/connection-monitoring',
              },
            ],
          },
          {
            label: 'Collations',
            contentSite: 'rust',
            url: '/docs/drivers/rust/:version/fundamentals/collations',
          },
          {
            label: 'Search Geospatially',
            contentSite: 'rust',
            url: '/docs/drivers/rust/:version/fundamentals/geo',
          },
          {
            label: 'GridFS',
            contentSite: 'rust',
            url: '/docs/drivers/rust/:version/fundamentals/gridfs',
          },
        ],
      },
      {
        label: 'Third-Party Integrations',
        contentSite: 'rust',
        url: '/docs/drivers/rust/:version/integrations',
        versions: { excludes: outdatedVersions },
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
            url: 'https://docs.rs/mongodb/3.2.4/mongodb/index.html',
          },
          {
            label: 'BSON Crate',
            isExternal: true,
            url: 'https://docs.rs/bson/2.14.0/bson/index.html',
          },
        ],
      },
      {
        label: 'FAQ',
        contentSite: 'rust',
        url: '/docs/drivers/rust/:version/faq',
      },
      {
        label: 'Connection Troubleshooting',
        contentSite: 'rust',
        url: '/docs/drivers/rust/:version/connection-troubleshooting',
      },
      {
        label: 'Operation Error Handling',
        contentSite: 'rust',
        url: '/docs/drivers/rust/:version/op-error-handling',
      },
      {
        label: 'Issues & Help',
        contentSite: 'rust',
        url: '/docs/drivers/rust/:version/issues-and-help',
      },
      {
        label: 'Compatibility',
        contentSite: 'drivers',
        url: '/docs/drivers/compatibility/?driver-language=rust',
      },
      {
        label: 'View the Source',
        contentSite: 'rust',
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
    ],
  },
];

export default tocData;
