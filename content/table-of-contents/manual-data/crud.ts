import type { TocItem } from '../types';

const tocData: TocItem[] = [
  {
    label: 'Insert',
    contentSite: 'docs',
    url: '/docs/:version/tutorial/insert-documents',
    collapsible: true,
    items: [
      {
        label: 'Methods',
        contentSite: 'docs',
        url: '/docs/:version/reference/insert-methods',
      },
    ],
  },
  {
    label: 'Query',
    contentSite: 'docs',
    url: '/docs/:version/tutorial/query-documents',
    collapsible: true,
    items: [
      {
        label: 'Embedded Documents',
        contentSite: 'docs',
        url: '/docs/:version/tutorial/query-embedded-documents',
      },
      {
        label: 'Arrays',
        contentSite: 'docs',
        url: '/docs/:version/tutorial/query-arrays',
      },
      {
        label: 'Arrays of Embedded Documents',
        contentSite: 'docs',
        url: '/docs/:version/tutorial/query-array-of-documents',
      },
      {
        label: 'Project Results',
        contentSite: 'docs',
        url: '/docs/:version/tutorial/project-fields-from-query-results',
      },
      {
        label: 'Null or Missing Fields',
        contentSite: 'docs',
        url: '/docs/:version/tutorial/query-for-null-fields',
      },
      {
        label: 'Timeouts',
        contentSite: 'docs',
        url: '/docs/:version/tutorial/query-documents/specify-query-timeout',
      },
      {
        label: 'Perform Long-Running Snapshot Queries',
        contentSite: 'docs',
        url: '/docs/:version/tutorial/long-running-queries',
      },
    ],
  },
  {
    label: 'Update',
    contentSite: 'docs',
    url: '/docs/:version/tutorial/update-documents',
    collapsible: true,
    items: [
      {
        label: 'Aggregation Pipeline',
        contentSite: 'docs',
        url: '/docs/:version/tutorial/update-documents-with-aggregation-pipeline',
      },
      {
        label: 'Methods',
        contentSite: 'docs',
        url: '/docs/:version/reference/update-methods',
      },
      {
        label: 'Use MQL to Update an Array',
        contentSite: 'docs',
        url: '/docs/:version/tutorial/use-mql-to-update-an-array',
      },
    ],
  },
  {
    label: 'Remove',
    contentSite: 'docs',
    url: '/docs/:version/tutorial/remove-documents',
    collapsible: true,
    items: [
      {
        label: 'Methods',
        contentSite: 'docs',
        url: '/docs/:version/reference/delete-methods',
      },
    ],
  },
  {
    label: 'Bulk Write',
    contentSite: 'docs',
    url: '/docs/:version/core/bulk-write-operations',
  },
  {
    label: 'Retryable Writes',
    contentSite: 'docs',
    url: '/docs/:version/core/retryable-writes',
  },
  {
    label: 'Retryable Reads',
    contentSite: 'docs',
    url: '/docs/:version/core/retryable-reads',
  },
  {
    label: 'SQL to MongoDB',
    contentSite: 'docs',
    url: '/docs/:version/reference/sql-comparison',
  },
  {
    label: 'Natural Language to MongoDB',
    contentSite: 'docs',
    url: '/docs/:version/natural-language-to-mongodb',
  },
  {
    label: 'Text Search',
    contentSite: 'docs',
    url: '/docs/:version/text-search',
    collapsible: true,
    items: [
      {
        label: 'Atlas Search',
        contentSite: 'cloud-docs',
        url: 'https://www.mongodb.com/docs/atlas/atlas-search/',
      },
      {
        label: 'Atlas Vector Search',
        contentSite: 'cloud-docs',
        url: 'https://www.mongodb.com/docs/atlas/atlas-vector-search/vector-search-overview/',
      },
      {
        label: 'Text Search on Self-Managed Deployments',
        contentSite: 'docs',
        collapsible: true,
        items: [
          {
            label: 'Perform a Text Search (Self-Managed Deployments)',
            contentSite: 'docs',
            url: '/docs/:version/core/text-search/on-prem',
          },
          {
            label: 'Text Search Operators (Self-Managed Deployments)',
            contentSite: 'docs',
            url: '/docs/:version/core/text-search-operators',
            collapsible: true,
            items: [
              {
                label: '$text',
                contentSite: 'docs',
                url: '/docs/:version/reference/operator/query/text',
              },
            ],
          },
          {
            label: 'Text Search in the Aggregation Pipeline',
            contentSite: 'docs',
            url: '/docs/:version/tutorial/text-search-in-aggregation',
          },
          {
            label: 'Text Search Languages',
            contentSite: 'docs',
            url: '/docs/:version/reference/text-search-languages',
          },
          {
            label: 'Text Indexes',
            contentSite: 'docs',
            url: '/docs/:version/core/indexes/index-types/index-text',
            collapsible: true,
            items: [
              {
                label: 'Create a Text Index',
                contentSite: 'docs',
                url: '/docs/:version/core/indexes/index-types/index-text/create-text-index',
              },
              {
                label: 'Create a Wildcard Text Index',
                contentSite: 'docs',
                url: '/docs/:version/core/indexes/index-types/index-text/create-wildcard-text-index',
              },
              {
                label: 'Specify the Default Language for a Text Index',
                contentSite: 'docs',
                url: '/docs/:version/core/indexes/index-types/index-text/specify-text-index-language',
                collapsible: true,
                items: [
                  {
                    label:
                      'Create a Text Index for a Collection Containing Multiple Languages',
                    contentSite: 'docs',
                    url: '/docs/:version/core/indexes/index-types/index-text/specify-language-text-index/create-text-index-multiple-languages',
                  },
                  {
                    label: 'Use Any Field to Specify Text Index Language',
                    contentSite: 'docs',
                    url: '/docs/:version/core/indexes/index-types/index-text/specify-language-text-index/use-any-field-to-specify-language',
                  },
                ],
              },
              {
                label: 'Assign Weights to Text Search Results',
                contentSite: 'docs',
                url: '/docs/:version/core/indexes/index-types/index-text/control-text-search-results',
              },
              {
                label: 'Limit Number of Text Index Entries Scanned',
                contentSite: 'docs',
                url: '/docs/:version/core/indexes/index-types/index-text/limit-number-of-items-scanned-for-text-search',
              },
              {
                label: 'Text Index Properties',
                contentSite: 'docs',
                url: '/docs/:version/core/indexes/index-types/index-text/text-index-properties',
              },
              {
                label: 'Text Index Restrictions',
                contentSite: 'docs',
                url: '/docs/:version/core/indexes/index-types/index-text/text-index-restrictions',
              },
              {
                label: 'Text Index Versions',
                contentSite: 'docs',
                url: '/docs/:version/core/indexes/index-types/index-text/text-index-versions',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    label: 'Geospatial Queries',
    contentSite: 'docs',
    url: '/docs/:version/geospatial-queries',
    collapsible: true,
    items: [
      {
        label: 'Find Restaurants',
        contentSite: 'docs',
        url: '/docs/:version/tutorial/geospatial-tutorial',
      },
      {
        label: 'GeoJSON Objects',
        contentSite: 'docs',
        url: '/docs/:version/reference/geojson',
      },
    ],
  },
  {
    label: 'Read Concern',
    contentSite: 'docs',
    url: '/docs/:version/reference/read-concern',
    collapsible: true,
    items: [
      {
        label: '"local"',
        contentSite: 'docs',
        url: '/docs/:version/reference/read-concern-local',
      },
      {
        label: '"available"',
        contentSite: 'docs',
        url: '/docs/:version/reference/read-concern-available',
      },
      {
        label: '"majority"',
        contentSite: 'docs',
        url: '/docs/:version/reference/read-concern-majority',
      },
      {
        label: '"linearizable"',
        contentSite: 'docs',
        url: '/docs/:version/reference/read-concern-linearizable',
      },
      {
        label: '"snapshot"',
        contentSite: 'docs',
        url: '/docs/:version/reference/read-concern-snapshot',
      },
    ],
  },
  {
    label: 'Write Concern',
    contentSite: 'docs',
    url: '/docs/:version/reference/write-concern',
    collapsible: true,
    items: [
      {
        label: 'Lifecycle Diagrams',
        contentSite: 'docs',
        url: '/docs/:version/reference/write-concern/write-lifecycle',
      },
    ],
  },
  {
    label: 'MongoDB CRUD Concepts',
    contentSite: 'docs',
    url: '/docs/:version/core/crud',
    collapsible: true,
    items: [
      {
        label: 'Atomicity & Transactions',
        contentSite: 'docs',
        url: '/docs/:version/core/write-operations-atomicity',
      },
      {
        label: 'Distributed Queries',
        contentSite: 'docs',
        url: '/docs/:version/core/distributed-queries',
      },
      {
        label: 'Periods & Dollar Signs',
        contentSite: 'docs',
        url: '/docs/:version/core/dot-dollar-considerations',
        collapsible: true,
        items: [
          {
            label: 'Dollar-Prefixed Field Names',
            contentSite: 'docs',
            url: '/docs/:version/core/dot-dollar-considerations/dollar-prefix',
          },
          {
            label: 'Field Names with Periods',
            contentSite: 'docs',
            url: '/docs/:version/core/dot-dollar-considerations/periods',
          },
        ],
      },
      {
        label: 'Read Isolation, Consistency, and Recency',
        contentSite: 'docs',
        url: '/docs/:version/core/read-isolation-consistency-recency',
        collapsible: true,
        items: [
          {
            label: 'Causal Consistency and Read and Write Concerns',
            contentSite: 'docs',
            url: '/docs/:version/core/causal-consistency-read-write-concerns',
          },
        ],
      },
      {
        label: 'Query Optimization',
        contentSite: 'docs',
        url: '/docs/:version/core/query-optimization',
        collapsible: true,
        items: [
          {
            label: 'Analyze Query Performance',
            contentSite: 'docs',
            url: '/docs/:version/tutorial/evaluate-operation-performance',
            collapsible: true,
            items: [
              {
                label: 'Explain Results',
                contentSite: 'docs',
                url: '/docs/:version/reference/explain-results',
                collapsible: true,
                items: [
                  {
                    label: 'Interpret Results',
                    contentSite: 'docs',
                    url: '/docs/:version/tutorial/analyze-query-plan',
                  },
                  {
                    label: 'Explain Slow Queries',
                    contentSite: 'docs',
                    url: '/docs/:version/tutorial/explain-slow-queries',
                  },
                ],
              },
              {
                label: 'Database Profiler',
                contentSite: 'docs',
                url: '/docs/:version/tutorial/manage-the-database-profiler',
                collapsible: true,
                items: [
                  {
                    label: 'Output',
                    contentSite: 'docs',
                    url: '/docs/:version/reference/database-profiler',
                  },
                  {
                    label: 'Find Slow Queries',
                    contentSite: 'docs',
                    url: '/docs/:version/tutorial/find-slow-queries-with-database-profiler',
                  },
                ],
              },
              {
                label: 'Monitor Slow Queries',
                contentSite: 'docs',
                url: '/docs/:version/tutorial/monitor-slow-queries',
              },
              {
                label: 'Block Slow Queries',
                contentSite: 'docs',
                url: '/docs/:version/tutorial/operation-rejection-filters',
              },
            ],
          },
          {
            label: 'Write Operation Performance',
            contentSite: 'docs',
            url: '/docs/:version/core/write-performance',
          },
        ],
      },
      {
        label: 'Query Plans',
        contentSite: 'docs',
        url: '/docs/:version/core/query-plans',
      },
      {
        label: 'Query Shapes',
        contentSite: 'docs',
        url: '/docs/:version/core/query-shapes',
      },
      {
        label: 'Cursors',
        contentSite: 'docs',
        url: '/docs/:version/core/cursors',
        collapsible: true,
        items: [
          {
            label: 'Iterate a Cursor',
            contentSite: 'docs',
            url: '/docs/:version/tutorial/iterate-a-cursor',
          },
          {
            label: 'Tailable Cursors',
            contentSite: 'docs',
            url: '/docs/:version/core/tailable-cursors',
          },
        ],
      },
    ],
  },
];

export default tocData;
