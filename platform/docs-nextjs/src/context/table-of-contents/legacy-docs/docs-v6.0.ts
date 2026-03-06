import type { TocItem } from '@/components/unified-sidenav/types';

export const toc: TocItem[] = [
  {
    label: 'Legacy Docs',
    contentSite: 'docs',
    url: '/docs/docs/v6.0/',
    items: [
      {
        label: 'Database Manual',
        contentSite: 'docs',
        group: true,
        items: [
          {
            label: 'Overview',
            contentSite: 'docs',
            url: '/docs/v6.0/',
          },
          {
            label: 'Documents',
            contentSite: 'docs',
            url: '/docs/v6.0/core/document',
          },
          {
            label: 'Databases & Collections',
            contentSite: 'docs',
            collapsible: true,
            url: '/docs/v6.0/core/databases-and-collections',
            items: [
              {
                label: 'Views',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/core/views',
                items: [
                  {
                    label: 'Create & Query',
                    contentSite: 'docs',
                    url: '/docs/v6.0/core/views/create-view',
                  },
                  {
                    label: 'Join Collections',
                    contentSite: 'docs',
                    url: '/docs/v6.0/core/views/join-collections-with-view',
                  },
                  {
                    label: 'Use Default Collation',
                    contentSite: 'docs',
                    url: '/docs/v6.0/core/views/specify-collation',
                  },
                  {
                    label: 'Modify or Remove',
                    contentSite: 'docs',
                    url: '/docs/v6.0/core/views/update-view',
                  },
                  {
                    label: 'Supported Operations',
                    contentSite: 'docs',
                    url: '/docs/v6.0/core/views/supported-operations',
                  },
                ],
              },
              {
                label: 'On-Demand Materialized Views',
                contentSite: 'docs',
                url: '/docs/v6.0/core/materialized-views',
              },
              {
                label: 'Capped Collections',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/core/capped-collections',
                items: [
                  {
                    label: 'Create',
                    contentSite: 'docs',
                    url: '/docs/v6.0/core/capped-collections/create-capped-collection',
                  },
                  {
                    label: 'Query',
                    contentSite: 'docs',
                    url: '/docs/v6.0/core/capped-collections/query-capped-collection',
                  },
                  {
                    label: 'Verify',
                    contentSite: 'docs',
                    url: '/docs/v6.0/core/capped-collections/check-if-collection-is-capped',
                  },
                  {
                    label: 'Convert',
                    contentSite: 'docs',
                    url: '/docs/v6.0/core/capped-collections/convert-collection-to-capped',
                  },
                  {
                    label: 'Change Size',
                    contentSite: 'docs',
                    url: '/docs/v6.0/core/capped-collections/change-size-capped-collection',
                  },
                  {
                    label: 'Change Limits',
                    contentSite: 'docs',
                    url: '/docs/v6.0/core/capped-collections/change-max-docs-capped-collection',
                  },
                ],
              },
              {
                label: 'Clustered Collections',
                contentSite: 'docs',
                url: '/docs/v6.0/core/clustered-collections',
              },
            ],
          },
          {
            label: 'Connect to Clusters',
            contentSite: 'docs',
            collapsible: true,
            items: [
              {
                label: 'Connection Strings',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/reference/connection-string',
                items: [
                  {
                    label: 'Options',
                    contentSite: 'docs',
                    url: '/docs/v6.0/reference/connection-string-options',
                  },
                  {
                    label: 'Formats',
                    contentSite: 'docs',
                    url: '/docs/v6.0/reference/connection-string-formats',
                  },
                ],
              },
            ],
          },
          {
            label: 'Database Users',
            contentSite: 'docs',
            collapsible: true,
            url: '/docs/v6.0/reference/database-users',
            items: [
              {
                label: 'Authorization',
                contentSite: 'docs',
                collapsible: true,
                items: [
                  {
                    label: 'Built-In Roles',
                    contentSite: 'docs',
                    url: '/docs/v6.0/reference/built-in-roles',
                  },
                  {
                    label: 'Privilege Actions',
                    contentSite: 'docs',
                    url: '/docs/v6.0/reference/privilege-actions',
                  },
                  {
                    label: 'Non-Root User Permissions',
                    contentSite: 'docs',
                    url: '/docs/v6.0/reference/non-root-user-permissions',
                  },
                ],
              },
            ],
          },
          {
            label: 'CRUD Operations',
            contentSite: 'docs',
            collapsible: true,
            url: '/docs/v6.0/crud',
            items: [
              {
                label: 'Insert',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/tutorial/insert-documents',
                items: [
                  {
                    label: 'Methods',
                    contentSite: 'docs',
                    url: '/docs/v6.0/reference/insert-methods',
                  },
                ],
              },
              {
                label: 'Query',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/tutorial/query-documents',
                items: [
                  {
                    label: 'Embedded Documents',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/query-embedded-documents',
                  },
                  {
                    label: 'Arrays',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/query-arrays',
                  },
                  {
                    label: 'Arrays of Embedded Documents',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/query-array-of-documents',
                  },
                  {
                    label: 'Project Results',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/project-fields-from-query-results',
                  },
                  {
                    label: 'Null or Missing Fields',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/query-for-null-fields',
                  },
                  {
                    label: 'Timeouts',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/query-documents/specify-query-timeout',
                  },
                  {
                    label: 'Perform Long-Running Snapshot Queries',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/long-running-queries',
                  },
                ],
              },
              {
                label: 'Update',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/tutorial/update-documents',
                items: [
                  {
                    label: 'Aggregation Pipeline',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/update-documents-with-aggregation-pipeline',
                  },
                  {
                    label: 'Methods',
                    contentSite: 'docs',
                    url: '/docs/v6.0/reference/update-methods',
                  },
                  {
                    label: 'Use MQL to Update an Array',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/use-mql-to-update-an-array',
                  },
                ],
              },
              {
                label: 'Remove',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/tutorial/remove-documents',
                items: [
                  {
                    label: 'Methods',
                    contentSite: 'docs',
                    url: '/docs/v6.0/reference/delete-methods',
                  },
                ],
              },
              {
                label: 'Bulk Write',
                contentSite: 'docs',
                url: '/docs/v6.0/core/bulk-write-operations',
              },
              {
                label: 'Retryable Writes',
                contentSite: 'docs',
                url: '/docs/v6.0/core/retryable-writes',
              },
              {
                label: 'Retryable Reads',
                contentSite: 'docs',
                url: '/docs/v6.0/core/retryable-reads',
              },
              {
                label: 'SQL to MongoDB',
                contentSite: 'docs',
                url: '/docs/v6.0/reference/sql-comparison',
              },
              {
                label: 'Natural Language to MongoDB',
                contentSite: 'docs',
                url: '/docs/v6.0/natural-language-to-mongodb',
              },
              {
                label: 'Text Search',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/text-search',
                items: [
                  {
                    label: 'Text Search on Self-Managed Deployments',
                    contentSite: 'docs',
                    collapsible: true,
                    items: [
                      {
                        label: 'Perform a Text Search (Self-Managed Deployments)',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/text-search/on-prem',
                      },
                      {
                        label: 'Text Search Operators (Self-Managed Deployments)',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/v6.0/core/text-search-operators',
                        items: [
                          {
                            label: '$text',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/operator/query/text',
                          },
                        ],
                      },
                      {
                        label: 'Text Search in the Aggregation Pipeline',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/text-search-in-aggregation',
                      },
                      {
                        label: 'Text Search Languages',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/text-search-languages',
                      },
                      {
                        label: 'Text Indexes',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/v6.0/core/indexes/index-types/index-text',
                        items: [
                          {
                            label: 'Create a Text Index',
                            contentSite: 'docs',
                            url: '/docs/v6.0/core/indexes/index-types/index-text/create-text-index',
                          },
                          {
                            label: 'Create a Wildcard Text Index',
                            contentSite: 'docs',
                            url: '/docs/v6.0/core/indexes/index-types/index-text/create-wildcard-text-index',
                          },
                          {
                            label: 'Specify the Default Language for a Text Index',
                            contentSite: 'docs',
                            collapsible: true,
                            url: '/docs/v6.0/core/indexes/index-types/index-text/specify-text-index-language',
                            items: [
                              {
                                label: 'Create a Text Index for a Collection Containing Multiple Languages',
                                contentSite: 'docs',
                                url: '/docs/v6.0/core/indexes/index-types/index-text/specify-language-text-index/create-text-index-multiple-languages',
                              },
                              {
                                label: 'Use Any Field to Specify Text Index Language',
                                contentSite: 'docs',
                                url: '/docs/v6.0/core/indexes/index-types/index-text/specify-language-text-index/use-any-field-to-specify-language',
                              },
                            ],
                          },
                          {
                            label: 'Assign Weights to Text Search Results',
                            contentSite: 'docs',
                            url: '/docs/v6.0/core/indexes/index-types/index-text/control-text-search-results',
                          },
                          {
                            label: 'Limit Number of Text Index Entries Scanned',
                            contentSite: 'docs',
                            url: '/docs/v6.0/core/indexes/index-types/index-text/limit-number-of-items-scanned-for-text-search',
                          },
                          {
                            label: 'Text Index Properties',
                            contentSite: 'docs',
                            url: '/docs/v6.0/core/indexes/index-types/index-text/text-index-properties',
                          },
                          {
                            label: 'Text Index Restrictions',
                            contentSite: 'docs',
                            url: '/docs/v6.0/core/indexes/index-types/index-text/text-index-restrictions',
                          },
                          {
                            label: 'Text Index Versions',
                            contentSite: 'docs',
                            url: '/docs/v6.0/core/indexes/index-types/index-text/text-index-versions',
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
                collapsible: true,
                url: '/docs/v6.0/geospatial-queries',
                items: [
                  {
                    label: 'Find Restaurants',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/geospatial-tutorial',
                  },
                  {
                    label: 'GeoJSON Objects',
                    contentSite: 'docs',
                    url: '/docs/v6.0/reference/geojson',
                  },
                ],
              },
              {
                label: 'Read Concern',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/reference/read-concern',
                items: [
                  {
                    label: '"local"',
                    contentSite: 'docs',
                    url: '/docs/v6.0/reference/read-concern-local',
                  },
                  {
                    label: '"available"',
                    contentSite: 'docs',
                    url: '/docs/v6.0/reference/read-concern-available',
                  },
                  {
                    label: '"majority"',
                    contentSite: 'docs',
                    url: '/docs/v6.0/reference/read-concern-majority',
                  },
                  {
                    label: '"linearizable"',
                    contentSite: 'docs',
                    url: '/docs/v6.0/reference/read-concern-linearizable',
                  },
                  {
                    label: '"snapshot"',
                    contentSite: 'docs',
                    url: '/docs/v6.0/reference/read-concern-snapshot',
                  },
                ],
              },
              {
                label: 'Write Concern',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/reference/write-concern',
                items: [
                  {
                    label: 'Lifecycle Diagrams',
                    contentSite: 'docs',
                    url: '/docs/v6.0/reference/write-concern/write-lifecycle',
                  },
                ],
              },
              {
                label: 'MongoDB CRUD Concepts',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/core/crud',
                items: [
                  {
                    label: 'Atomicity & Transactions',
                    contentSite: 'docs',
                    url: '/docs/v6.0/core/write-operations-atomicity',
                  },
                  {
                    label: 'Distributed Queries',
                    contentSite: 'docs',
                    url: '/docs/v6.0/core/distributed-queries',
                  },
                  {
                    label: 'Periods & Dollar Signs',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/core/dot-dollar-considerations',
                    items: [
                      {
                        label: 'Dollar-Prefixed Field Names',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/dot-dollar-considerations/dollar-prefix',
                      },
                      {
                        label: 'Field Names with Periods',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/dot-dollar-considerations/periods',
                      },
                    ],
                  },
                  {
                    label: 'Read Isolation, Consistency, and Recency',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/core/read-isolation-consistency-recency',
                    items: [
                      {
                        label: 'Causal Consistency and Read and Write Concerns',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/causal-consistency-read-write-concerns',
                      },
                    ],
                  },
                  {
                    label: 'Query Optimization',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/core/query-optimization',
                    items: [
                      {
                        label: 'Analyze Query Performance',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/v6.0/tutorial/evaluate-operation-performance',
                        items: [
                          {
                            label: 'Explain Results',
                            contentSite: 'docs',
                            collapsible: true,
                            url: '/docs/v6.0/reference/explain-results',
                            items: [
                              {
                                label: 'Interpret Results',
                                contentSite: 'docs',
                                url: '/docs/v6.0/tutorial/analyze-query-plan',
                              },
                              {
                                label: 'Explain Slow Queries',
                                contentSite: 'docs',
                                url: '/docs/v6.0/tutorial/explain-slow-queries',
                              },
                            ],
                          },
                          {
                            label: 'Database Profiler',
                            contentSite: 'docs',
                            collapsible: true,
                            url: '/docs/v6.0/tutorial/manage-the-database-profiler',
                            items: [
                              {
                                label: 'Output',
                                contentSite: 'docs',
                                url: '/docs/v6.0/reference/database-profiler',
                              },
                              {
                                label: 'Find Slow Queries',
                                contentSite: 'docs',
                                url: '/docs/v6.0/tutorial/find-slow-queries-with-database-profiler',
                              },
                            ],
                          },
                          {
                            label: 'Monitor Slow Queries',
                            contentSite: 'docs',
                            url: '/docs/v6.0/tutorial/monitor-slow-queries',
                          },
                          {
                            label: 'Block Slow Queries',
                            contentSite: 'docs',
                            url: '/docs/v6.0/tutorial/operation-rejection-filters',
                          },
                        ],
                      },
                      {
                        label: 'Write Operation Performance',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/write-performance',
                      },
                    ],
                  },
                  {
                    label: 'Query Plans',
                    contentSite: 'docs',
                    url: '/docs/v6.0/core/query-plans',
                  },
                  {
                    label: 'Query Shapes',
                    contentSite: 'docs',
                    url: '/docs/v6.0/core/query-shapes',
                  },
                  {
                    label: 'Cursors',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/core/cursors',
                    items: [
                      {
                        label: 'Iterate a Cursor',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/iterate-a-cursor',
                      },
                      {
                        label: 'Tailable Cursors',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/tailable-cursors',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            label: 'Indexes',
            contentSite: 'docs',
            collapsible: true,
            url: '/docs/v6.0/indexes',
            items: [
              {
                label: 'Create',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/core/indexes/create-index',
                items: [
                  {
                    label: 'Specify a Name',
                    contentSite: 'docs',
                    url: '/docs/v6.0/core/indexes/create-index/specify-index-name',
                  },
                ],
              },
              {
                label: 'Drop',
                contentSite: 'docs',
                url: '/docs/v6.0/core/indexes/drop-index',
              },
              {
                label: 'Types',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/core/indexes/index-types',
                items: [
                  {
                    label: 'Single Field',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/core/indexes/index-types/index-single',
                    items: [
                      {
                        label: 'Create',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/indexes/index-types/index-single/create-single-field-index',
                      },
                      {
                        label: 'Embedded Documents',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/indexes/index-types/index-single/create-embedded-object-index',
                      },
                    ],
                  },
                  {
                    label: 'Compound',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/core/indexes/index-types/index-compound',
                    items: [
                      {
                        label: 'Create',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/indexes/index-types/index-compound/create-compound-index',
                      },
                      {
                        label: 'Sort Order',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/indexes/index-types/index-compound/sort-order',
                      },
                    ],
                  },
                  {
                    label: 'Multikey',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/core/indexes/index-types/index-multikey',
                    items: [
                      {
                        label: 'Create on Array Field',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/indexes/index-types/index-multikey/create-multikey-index-basic',
                      },
                      {
                        label: 'Embedded Array Field',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/indexes/index-types/index-multikey/create-multikey-index-embedded',
                      },
                      {
                        label: 'Bounds',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/indexes/index-types/index-multikey/multikey-index-bounds',
                      },
                    ],
                  },
                  {
                    label: 'Wildcard',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/core/indexes/index-types/index-wildcard',
                    items: [
                      {
                        label: 'Create',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/indexes/index-types/index-wildcard/create-wildcard-index-single-field',
                      },
                      {
                        label: 'Include or Exclude Fields',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/indexes/index-types/index-wildcard/create-wildcard-index-multiple-fields',
                      },
                      {
                        label: 'Use All Fields',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/indexes/index-types/index-wildcard/create-wildcard-index-all-fields',
                      },
                      {
                        label: 'Compound',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/indexes/index-types/index-wildcard/index-wildcard-compound',
                      },
                      {
                        label: 'Reference',
                        contentSite: 'docs',
                        collapsible: true,
                        items: [
                          {
                            label: 'Embedded Objects & Arrays',
                            contentSite: 'docs',
                            url: '/docs/v6.0/core/indexes/index-types/index-wildcard/reference/embedded-object-behavior',
                          },
                          {
                            label: 'Signature',
                            contentSite: 'docs',
                            url: '/docs/v6.0/core/indexes/index-types/index-wildcard/reference/wildcard-projection-signature',
                          },
                          {
                            label: 'Restrictions',
                            contentSite: 'docs',
                            url: '/docs/v6.0/core/indexes/index-types/index-wildcard/reference/restrictions',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    label: 'Geospatial',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/core/indexes/index-types/index-geospatial',
                    items: [
                      {
                        label: '2dsphere',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/v6.0/core/indexes/index-types/geospatial/2dsphere',
                        items: [
                          {
                            label: 'Create',
                            contentSite: 'docs',
                            url: '/docs/v6.0/core/indexes/index-types/geospatial/2dsphere/create',
                          },
                          {
                            label: 'Query',
                            contentSite: 'docs',
                            collapsible: true,
                            url: '/docs/v6.0/core/indexes/index-types/geospatial/2dsphere/query',
                            items: [
                              {
                                label: 'Polygons',
                                contentSite: 'docs',
                                url: '/docs/v6.0/core/indexes/index-types/geospatial/2dsphere/query/geojson-bound-by-polygon',
                              },
                              {
                                label: 'Spheres',
                                contentSite: 'docs',
                                url: '/docs/v6.0/core/indexes/index-types/geospatial/2dsphere/query/proximity-to-geojson',
                              },
                              {
                                label: 'Intersections',
                                contentSite: 'docs',
                                url: '/docs/v6.0/core/indexes/index-types/geospatial/2dsphere/query/intersections-of-geojson-objects',
                              },
                              {
                                label: 'Circle in a Sphere',
                                contentSite: 'docs',
                                url: '/docs/v6.0/core/indexes/index-types/geospatial/2dsphere/query/points-within-circle-on-sphere',
                              },
                            ],
                          },
                          {
                            label: 'Versions',
                            contentSite: 'docs',
                            url: '/docs/v6.0/core/indexes/index-types/geospatial/2dsphere/2dsphere-index-versions',
                          },
                        ],
                      },
                      {
                        label: '2d',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/v6.0/core/indexes/index-types/geospatial/2d',
                        items: [
                          {
                            label: 'Create',
                            contentSite: 'docs',
                            collapsible: true,
                            url: '/docs/v6.0/core/indexes/index-types/geospatial/2d/create',
                            items: [
                              {
                                label: 'Location Precision',
                                contentSite: 'docs',
                                url: '/docs/v6.0/core/indexes/index-types/geospatial/2d/create/define-location-precision',
                              },
                              {
                                label: 'Location Range',
                                contentSite: 'docs',
                                url: '/docs/v6.0/core/indexes/index-types/geospatial/2d/create/define-location-range',
                              },
                            ],
                          },
                          {
                            label: 'Query',
                            contentSite: 'docs',
                            collapsible: true,
                            url: '/docs/v6.0/core/indexes/index-types/geospatial/2d/query',
                            items: [
                              {
                                label: 'Point on a Surface',
                                contentSite: 'docs',
                                url: '/docs/v6.0/core/indexes/index-types/geospatial/2d/query/proximity-flat-surface',
                              },
                              {
                                label: 'Shape on a Surface',
                                contentSite: 'docs',
                                url: '/docs/v6.0/core/indexes/index-types/geospatial/2d/query/points-within-a-shape',
                              },
                            ],
                          },
                          {
                            label: 'Internals',
                            contentSite: 'docs',
                            url: '/docs/v6.0/core/indexes/index-types/geospatial/2d/internals',
                          },
                          {
                            label: 'Calculate to Radians',
                            contentSite: 'docs',
                            url: '/docs/v6.0/core/indexes/index-types/geospatial/2d/calculate-distances',
                          },
                        ],
                      },
                      {
                        label: 'Restrictions',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/indexes/index-types/geospatial/restrictions',
                      },
                    ],
                  },
                  {
                    label: 'Hashed',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/core/indexes/index-types/index-hashed',
                    items: [
                      {
                        label: 'Create',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/indexes/index-types/index-hashed/create',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Properties',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/core/indexes/index-properties',
                items: [
                  {
                    label: 'Case-Insensitive',
                    contentSite: 'docs',
                    url: '/docs/v6.0/core/index-case-insensitive',
                  },
                  {
                    label: 'Hidden',
                    contentSite: 'docs',
                    url: '/docs/v6.0/core/index-hidden',
                  },
                  {
                    label: 'Partial',
                    contentSite: 'docs',
                    url: '/docs/v6.0/core/index-partial',
                  },
                  {
                    label: 'Sparse',
                    contentSite: 'docs',
                    url: '/docs/v6.0/core/index-sparse',
                  },
                  {
                    label: 'TTL',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/core/index-ttl',
                    items: [
                      {
                        label: 'Expire Data',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/expire-data',
                      },
                    ],
                  },
                  {
                    label: 'Unique',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/core/index-unique',
                    items: [
                      {
                        label: 'Single-Field Unique',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/index-unique/create',
                      },
                      {
                        label: 'Compound Unique',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/index-unique/create-compound',
                      },
                      {
                        label: 'Convert to Unique',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/index-unique/convert-to-unique',
                      },
                      {
                        label: 'Sharded Collections',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/shard-collection-with-unique-index',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Builds',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/core/index-creation',
                items: [
                  {
                    label: 'Rolling Index Builds',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/core/rolling-index-builds',
                    items: [
                      {
                        label: 'Create on Replica Sets',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/build-indexes-on-replica-sets',
                      },
                      {
                        label: 'Create on Sharded Clusters',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/build-indexes-on-sharded-clusters',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Manage',
                contentSite: 'docs',
                url: '/docs/v6.0/tutorial/manage-indexes',
              },
              {
                label: 'Measure Use',
                contentSite: 'docs',
                url: '/docs/v6.0/tutorial/measure-index-use',
              },
              {
                label: 'Strategies',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/applications/indexes',
                items: [
                  {
                    label: 'Equality, Sort, Range Guideline',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/equality-sort-range-guideline',
                  },
                  {
                    label: 'Sort Query Results',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/sort-results-with-indexes',
                  },
                  {
                    label: 'Ensure Query Selectivity',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/create-queries-that-ensure-selectivity',
                  },
                  {
                    label: 'Unique Indexes and Schema Validation',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/unique-indexes-schema-validation',
                  },
                ],
              },
              {
                label: 'Reference',
                contentSite: 'docs',
                url: '/docs/v6.0/reference/indexes',
              },
            ],
          },
          {
            label: 'Data Modeling',
            contentSite: 'docs',
            collapsible: true,
            url: '/docs/v6.0/data-modeling',
            items: [
              {
                label: 'Best Practices',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/data-modeling/best-practices',
                items: [
                  {
                    label: 'Embedded Data',
                    contentSite: 'docs',
                    url: '/docs/v6.0/data-modeling/embedding',
                  },
                  {
                    label: 'Reference Data',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/data-modeling/referencing',
                    items: [
                      {
                        label: 'Database References',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/database-references',
                      },
                    ],
                  },
                  {
                    label: 'Duplicate Data',
                    contentSite: 'docs',
                    url: '/docs/v6.0/data-modeling/handle-duplicate-data',
                  },
                  {
                    label: 'Data Consistency',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/data-modeling/data-consistency',
                    items: [
                      {
                        label: 'Use Transactions',
                        contentSite: 'docs',
                        url: '/docs/v6.0/data-modeling/enforce-consistency/transactions',
                      },
                      {
                        label: 'Use Embedding',
                        contentSite: 'docs',
                        url: '/docs/v6.0/data-modeling/enforce-consistency/embed-data',
                      },
                    ],
                  },
                  {
                    label: 'Schema Validation',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/core/schema-validation',
                    items: [
                      {
                        label: 'Specify JSON Validation',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/v6.0/core/schema-validation/specify-json-schema',
                        items: [
                          {
                            label: 'Specify Field Values',
                            contentSite: 'docs',
                            url: '/docs/v6.0/core/schema-validation/specify-json-schema/specify-allowed-field-values',
                          },
                          {
                            label: 'Best Practices',
                            contentSite: 'docs',
                            url: '/docs/v6.0/core/schema-validation/specify-json-schema/json-schema-tips',
                          },
                        ],
                      },
                      {
                        label: 'Specify Query Operators',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/schema-validation/specify-query-expression-rules',
                      },
                      {
                        label: 'Specify Validation Level',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/schema-validation/specify-validation-level',
                      },
                      {
                        label: 'Handle Invalid Documents',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/schema-validation/handle-invalid-documents',
                      },
                      {
                        label: 'Bypass',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/schema-validation/bypass-document-validation',
                      },
                      {
                        label: 'View Existing Rules',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/schema-validation/view-existing-validation-rules',
                      },
                      {
                        label: 'Modify Rules',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/schema-validation/update-schema-validation',
                      },
                      {
                        label: 'Query and Modify',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/schema-validation/use-json-schema-query-conditions',
                      },
                      {
                        label: 'Specify Validation for Polymorphic Collections',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/schema-validation/specify-validation-polymorphic-collections',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Designing Your Schema',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/data-modeling/schema-design-process',
                items: [
                  {
                    label: 'Identify Workload',
                    contentSite: 'docs',
                    url: '/docs/v6.0/data-modeling/schema-design-process/identify-workload',
                  },
                  {
                    label: 'Map Relationships',
                    contentSite: 'docs',
                    url: '/docs/v6.0/data-modeling/schema-design-process/map-relationships',
                  },
                  {
                    label: 'Apply Patterns',
                    contentSite: 'docs',
                    url: '/docs/v6.0/data-modeling/schema-design-process/apply-patterns',
                  },
                  {
                    label: 'Create Indexes',
                    contentSite: 'docs',
                    url: '/docs/v6.0/data-modeling/schema-design-process/create-indexes',
                  },
                ],
              },
              {
                label: 'Schema Design Patterns',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/data-modeling/design-patterns',
                items: [
                  {
                    label: 'Computed Values',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/data-modeling/design-patterns/handle-computed-values',
                    items: [
                      {
                        label: 'Computed Data',
                        contentSite: 'docs',
                        url: '/docs/v6.0/data-modeling/design-patterns/computed-values/computed-schema-pattern',
                      },
                      {
                        label: 'Approximation Pattern',
                        contentSite: 'docs',
                        url: '/docs/v6.0/data-modeling/design-patterns/computed-values/approximation-schema-pattern',
                      },
                    ],
                  },
                  {
                    label: 'Group Data',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/data-modeling/design-patterns/group-data',
                    items: [
                      {
                        label: 'Bucket Pattern',
                        contentSite: 'docs',
                        url: '/docs/v6.0/data-modeling/design-patterns/group-data/bucket-pattern',
                      },
                      {
                        label: 'Outlier Pattern',
                        contentSite: 'docs',
                        url: '/docs/v6.0/data-modeling/design-patterns/group-data/outlier-pattern',
                      },
                      {
                        label: 'Attribute Pattern',
                        contentSite: 'docs',
                        url: '/docs/v6.0/data-modeling/design-patterns/group-data/attribute-pattern',
                      },
                      {
                        label: 'Subset Pattern',
                        contentSite: 'docs',
                        url: '/docs/v6.0/data-modeling/design-patterns/group-data/subset-pattern',
                      },
                    ],
                  },
                  {
                    label: 'Polymorphic Data',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/data-modeling/design-patterns/polymorphic-data',
                    items: [
                      {
                        label: 'Polymorphic Pattern',
                        contentSite: 'docs',
                        url: '/docs/v6.0/data-modeling/design-patterns/polymorphic-data/polymorphic-schema-pattern',
                      },
                      {
                        label: 'Inheritance Pattern',
                        contentSite: 'docs',
                        url: '/docs/v6.0/data-modeling/design-patterns/polymorphic-data/inheritance-schema-pattern',
                      },
                    ],
                  },
                  {
                    label: 'Versioning',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/data-modeling/design-patterns/data-versioning',
                    items: [
                      {
                        label: 'Keep Document History',
                        contentSite: 'docs',
                        url: '/docs/v6.0/data-modeling/design-patterns/data-versioning/document-versioning',
                      },
                      {
                        label: 'Maintain Versions',
                        contentSite: 'docs',
                        url: '/docs/v6.0/data-modeling/design-patterns/data-versioning/schema-versioning',
                      },
                      {
                        label: 'Slowly Changing Dimensions',
                        contentSite: 'docs',
                        url: '/docs/v6.0/data-modeling/design-patterns/data-versioning/slowly-changing-dimensions',
                      },
                    ],
                  },
                  {
                    label: 'Archive Data',
                    contentSite: 'docs',
                    url: '/docs/v6.0/data-modeling/design-patterns/archive',
                  },
                  {
                    label: 'Single Collection',
                    contentSite: 'docs',
                    url: '/docs/v6.0/data-modeling/design-patterns/single-collection',
                  },
                ],
              },
              {
                label: 'Schema Design Anti-Patterns',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/data-modeling/design-antipatterns',
                items: [
                  {
                    label: 'Avoid Unbounded Arrays',
                    contentSite: 'docs',
                    url: '/docs/v6.0/data-modeling/design-antipatterns/unbounded-arrays',
                  },
                  {
                    label: 'Reduce the Number of Collections',
                    contentSite: 'docs',
                    url: '/docs/v6.0/data-modeling/design-antipatterns/reduce-collections',
                  },
                  {
                    label: 'Remove Unnecessary Indexes',
                    contentSite: 'docs',
                    url: '/docs/v6.0/data-modeling/design-antipatterns/unnecessary-indexes',
                  },
                  {
                    label: 'Bloated Documents',
                    contentSite: 'docs',
                    url: '/docs/v6.0/data-modeling/design-antipatterns/bloated-documents',
                  },
                  {
                    label: 'Reduce $lookup Operations',
                    contentSite: 'docs',
                    url: '/docs/v6.0/data-modeling/design-antipatterns/reduce-lookup-operations',
                  },
                ],
              },
              {
                label: 'Model Relationships',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/applications/data-models-relationships',
                items: [
                  {
                    label: 'One-to-One Embedded Documents',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/model-embedded-one-to-one-relationships-between-documents',
                  },
                  {
                    label: 'One-to-Many Embedded Documents',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/model-embedded-one-to-many-relationships-between-documents',
                  },
                  {
                    label: 'One-to-Many References',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/model-referenced-one-to-many-relationships-between-documents',
                  },
                  {
                    label: 'Many-to-Many Embedded Documents',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/model-embedded-many-to-many-relationships-between-documents',
                  },
                ],
              },
              {
                label: 'Model Tree Structures',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/applications/data-models-tree-structures',
                items: [
                  {
                    label: 'Parent References',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/model-tree-structures-with-parent-references',
                  },
                  {
                    label: 'Child References',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/model-tree-structures-with-child-references',
                  },
                  {
                    label: 'Array of Ancestors',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/model-tree-structures-with-ancestors-array',
                  },
                  {
                    label: 'Materialized Paths',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/model-tree-structures-with-materialized-paths',
                  },
                  {
                    label: 'Nested Sets',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/model-tree-structures-with-nested-sets',
                  },
                ],
              },
              {
                label: 'Example Application Models',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/applications/data-models-applications',
                items: [
                  {
                    label: 'Atomic Operations',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/model-data-for-atomic-operations',
                  },
                  {
                    label: 'IOT Data',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/model-iot-data',
                  },
                  {
                    label: 'Keyword Search',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/model-data-for-keyword-search',
                  },
                  {
                    label: 'Monetary Data',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/model-monetary-data',
                  },
                ],
              },
            ],
          },
          {
            label: 'Aggregation Operations',
            contentSite: 'docs',
            collapsible: true,
            url: '/docs/v6.0/aggregation',
            items: [
              {
                label: 'Aggregation Pipeline',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/core/aggregation-pipeline',
                items: [
                  {
                    label: 'Field Paths',
                    contentSite: 'docs',
                    url: '/docs/v6.0/core/field-paths',
                  },
                  {
                    label: 'Optimization',
                    contentSite: 'docs',
                    url: '/docs/v6.0/core/aggregation-pipeline-optimization',
                  },
                  {
                    label: 'Limits',
                    contentSite: 'docs',
                    url: '/docs/v6.0/core/aggregation-pipeline-limits',
                  },
                  {
                    label: 'Sharded Collections',
                    contentSite: 'docs',
                    url: '/docs/v6.0/core/aggregation-pipeline-sharded-collections',
                  },
                  {
                    label: 'Pipeline Tutorials',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/tutorial/aggregation-complete-examples',
                    items: [
                      {
                        label: 'Filter and Subset',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/aggregation-examples/filtered-subset',
                      },
                      {
                        label: 'Group and Total',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/aggregation-examples/group-and-total',
                      },
                      {
                        label: 'Unwind Arrays',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/aggregation-examples/unpack-arrays',
                      },
                      {
                        label: 'One-to-One Join',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/aggregation-examples/one-to-one-join',
                      },
                      {
                        label: 'Multi-Field Join',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/aggregation-examples/multi-field-join',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Reference',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/reference/aggregation',
                items: [
                  {
                    label: 'Commands',
                    contentSite: 'docs',
                    url: '/docs/v6.0/reference/operator/aggregation/interface',
                  },
                  {
                    label: 'Commands Comparison',
                    contentSite: 'docs',
                    url: '/docs/v6.0/reference/aggregation-commands-comparison',
                  },
                  {
                    label: 'Variables',
                    contentSite: 'docs',
                    url: '/docs/v6.0/reference/aggregation-variables',
                  },
                  {
                    label: 'SQL to Aggregation',
                    contentSite: 'docs',
                    url: '/docs/v6.0/reference/sql-aggregation-comparison',
                  },
                  {
                    label: 'Practical MongoDB Aggregations (e-book)',
                    isExternal: true,
                    url: 'https://www.practical-mongodb-aggregations.com',
                  },
                ],
              },
              {
                label: 'Map-Reduce',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/core/map-reduce',
                items: [
                  {
                    label: 'Sharded Collections',
                    contentSite: 'docs',
                    url: '/docs/v6.0/core/map-reduce-sharded-collections',
                  },
                  {
                    label: 'Concurrency',
                    contentSite: 'docs',
                    url: '/docs/v6.0/core/map-reduce-concurrency',
                  },
                  {
                    label: 'Examples',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/map-reduce-examples',
                  },
                  {
                    label: 'Perform with Increments',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/perform-incremental-map-reduce',
                  },
                  {
                    label: 'Troubleshoot Map',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/troubleshoot-map-function',
                  },
                  {
                    label: 'Troubleshoot Reduce',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/troubleshoot-reduce-function',
                  },
                  {
                    label: 'Aggregation Pipeline',
                    contentSite: 'docs',
                    url: '/docs/v6.0/reference/map-reduce-to-aggregation-pipeline',
                  },
                ],
              },
            ],
          },
          {
            label: 'Time Series',
            contentSite: 'docs',
            collapsible: true,
            url: '/docs/v6.0/core/timeseries-collections',
            items: [
              {
                label: 'Quick Start',
                contentSite: 'docs',
                url: '/docs/v6.0/core/timeseries/timeseries-quick-start',
              },
              {
                label: 'Time Series Data',
                contentSite: 'docs',
                url: '/docs/v6.0/core/timeseries/timeseries-bucketing',
              },
              {
                label: 'Considerations',
                contentSite: 'docs',
                url: '/docs/v6.0/core/timeseries/timeseries-considerations',
              },
              {
                label: 'Create & Configure',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/core/timeseries/timeseries-create-configure',
                items: [
                  {
                    label: 'Create & Query',
                    contentSite: 'docs',
                    url: '/docs/v6.0/core/timeseries/timeseries-procedures',
                  },
                  {
                    label: 'Set Granularity',
                    contentSite: 'docs',
                    url: '/docs/v6.0/core/timeseries/timeseries-granularity',
                  },
                  {
                    label: 'Migrate Data',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/core/timeseries/timeseries-migrate-data-into-timeseries-collection',
                    items: [
                      {
                        label: 'Use Aggregation',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/timeseries/timeseries-migrate-with-aggregation',
                      },
                      {
                        label: 'Use Tools',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/timeseries/timeseries-migrate-with-tools',
                      },
                    ],
                  },
                  {
                    label: 'Use Automatic Removal',
                    contentSite: 'docs',
                    url: '/docs/v6.0/core/timeseries/timeseries-automatic-removal',
                  },
                  {
                    label: 'Compression',
                    contentSite: 'docs',
                    url: '/docs/v6.0/core/timeseries/timeseries-compression',
                  },
                  {
                    label: 'Shard Collection',
                    contentSite: 'docs',
                    url: '/docs/v6.0/core/timeseries/timeseries-shard-collection',
                  },
                ],
              },
              {
                label: 'Query',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/core/timeseries/timeseries-querying',
                items: [
                  {
                    label: 'Aggregations & Operators',
                    contentSite: 'docs',
                    url: '/docs/v6.0/core/timeseries/timeseries-aggregations-operators',
                  },
                  {
                    label: 'List Time Series Collections',
                    contentSite: 'docs',
                    url: '/docs/v6.0/core/timeseries/timeseries-check-type',
                  },
                  {
                    label: 'Build Materialized Views',
                    contentSite: 'docs',
                    url: '/docs/v6.0/core/timeseries/timeseries-build-materialized-views',
                  },
                ],
              },
              {
                label: 'Indexes',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/core/timeseries/timeseries-index',
                items: [
                  {
                    label: 'Add Secondary Indexes',
                    contentSite: 'docs',
                    url: '/docs/v6.0/core/timeseries/timeseries-secondary-index',
                  },
                ],
              },
              {
                label: 'Best Practices',
                contentSite: 'docs',
                url: '/docs/v6.0/core/timeseries/timeseries-best-practices',
              },
              {
                label: 'Limitations',
                contentSite: 'docs',
                url: '/docs/v6.0/core/timeseries/timeseries-limitations',
              },
            ],
          },
          {
            label: 'Change Streams',
            contentSite: 'docs',
            collapsible: true,
            url: '/docs/v6.0/changeStreams',
            items: [
              {
                label: 'Production Recommendations',
                contentSite: 'docs',
                url: '/docs/v6.0/administration/change-streams-production-recommendations',
              },
              {
                label: 'Change Events',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/reference/change-events',
                items: [
                  {
                    label: 'create',
                    contentSite: 'docs',
                    url: '/docs/v6.0/reference/change-events/create',
                  },
                  {
                    label: 'createIndexes',
                    contentSite: 'docs',
                    url: '/docs/v6.0/reference/change-events/createIndexes',
                  },
                  {
                    label: 'delete',
                    contentSite: 'docs',
                    url: '/docs/v6.0/reference/change-events/delete',
                  },
                  {
                    label: 'drop',
                    contentSite: 'docs',
                    url: '/docs/v6.0/reference/change-events/drop',
                  },
                  {
                    label: 'dropDatabase',
                    contentSite: 'docs',
                    url: '/docs/v6.0/reference/change-events/dropDatabase',
                  },
                  {
                    label: 'dropIndexes',
                    contentSite: 'docs',
                    url: '/docs/v6.0/reference/change-events/dropIndexes',
                  },
                  {
                    label: 'insert',
                    contentSite: 'docs',
                    url: '/docs/v6.0/reference/change-events/insert',
                  },
                  {
                    label: 'invalidate',
                    contentSite: 'docs',
                    url: '/docs/v6.0/reference/change-events/invalidate',
                  },
                  {
                    label: 'modify',
                    contentSite: 'docs',
                    url: '/docs/v6.0/reference/change-events/modify',
                  },
                  {
                    label: 'refineCollectionShardKey',
                    contentSite: 'docs',
                    url: '/docs/v6.0/reference/change-events/refineCollectionShardKey',
                  },
                  {
                    label: 'rename',
                    contentSite: 'docs',
                    url: '/docs/v6.0/reference/change-events/rename',
                  },
                  {
                    label: 'replace',
                    contentSite: 'docs',
                    url: '/docs/v6.0/reference/change-events/replace',
                  },
                  {
                    label: 'reshardCollection',
                    contentSite: 'docs',
                    url: '/docs/v6.0/reference/change-events/reshardCollection',
                  },
                  {
                    label: 'shardCollection',
                    contentSite: 'docs',
                    url: '/docs/v6.0/reference/change-events/shardCollection',
                  },
                  {
                    label: 'update',
                    contentSite: 'docs',
                    url: '/docs/v6.0/reference/change-events/update',
                  },
                ],
              },
            ],
          },
          {
            label: 'Transactions',
            contentSite: 'docs',
            collapsible: true,
            url: '/docs/v6.0/core/transactions',
            items: [
              {
                label: 'Drivers API',
                contentSite: 'docs',
                url: '/docs/v6.0/core/transactions-in-applications',
              },
              {
                label: 'Operations',
                contentSite: 'docs',
                url: '/docs/v6.0/core/transactions-operations',
              },
              {
                label: 'Production Considerations',
                contentSite: 'docs',
                url: '/docs/v6.0/core/transactions-production-consideration',
              },
              {
                label: 'Sharded Clusters',
                contentSite: 'docs',
                url: '/docs/v6.0/core/transactions-sharded-clusters',
              },
            ],
          },
          {
            label: 'In-Use Encryption',
            contentSite: 'docs',
            collapsible: true,
            url: '/docs/v6.0/core/security-in-use-encryption',
            items: [
              {
                label: 'Comparing Approaches',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/core/queryable-encryption/about-qe-csfle',
                items: [
                  {
                    label: 'Compatibility',
                    contentSite: 'docs',
                    url: '/docs/v6.0/core/queryable-encryption/reference/compatibility',
                  },
                  {
                    label: 'Queryable Encryption Limitations',
                    contentSite: 'docs',
                    url: '/docs/v6.0/core/queryable-encryption/reference/limitations',
                  },
                  {
                    label: 'CSFLE Limitations',
                    contentSite: 'docs',
                    url: '/docs/v6.0/core/csfle/reference/limitations',
                  },
                ],
              },
              {
                label: 'Cryptographic Primitives',
                contentSite: 'docs',
                url: '/docs/v6.0/core/csfle/reference/cryptographic-primitives',
              },
              {
                label: 'Keys and Key Vaults',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/core/queryable-encryption/fundamentals/keys-key-vaults',
                items: [
                  {
                    label: 'KMS Providers',
                    contentSite: 'docs',
                    url: '/docs/v6.0/core/queryable-encryption/fundamentals/kms-providers',
                  },
                ],
              },
              {
                label: 'Queryable Encryption',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/core/queryable-encryption',
                items: [
                  {
                    label: 'Features',
                    contentSite: 'docs',
                    url: '/docs/v6.0/core/queryable-encryption/features',
                  },
                  {
                    label: 'Quick Start',
                    contentSite: 'docs',
                    url: '/docs/v6.0/core/queryable-encryption/quick-start',
                  },
                  {
                    label: 'Fundamentals',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/core/queryable-encryption/fundamentals',
                    items: [
                      {
                        label: 'Fields & Queries',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/queryable-encryption/fundamentals/encrypt-and-query',
                      },
                      {
                        label: 'Create a Schema',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/queryable-encryption/qe-create-encryption-schema',
                      },
                      {
                        label: 'Encrypt Collections at Creation',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/queryable-encryption/fundamentals/enable-qe',
                      },
                      {
                        label: 'Collections',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/queryable-encryption/fundamentals/manage-collections',
                      },
                      {
                        label: 'Explicit Encryption',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/queryable-encryption/fundamentals/manual-encryption',
                      },
                      {
                        label: 'Manage Keys',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/queryable-encryption/fundamentals/manage-keys',
                      },
                    ],
                  },
                  {
                    label: 'Tutorials',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/core/queryable-encryption/tutorials',
                    items: [
                      {
                        label: 'Enable',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/v6.0/core/queryable-encryption/overview-enable-qe',
                        items: [
                          {
                            label: 'Install a Driver',
                            contentSite: 'docs',
                            url: '/docs/v6.0/core/queryable-encryption/install',
                          },
                          {
                            label: 'Install and Configure a Query Analysis Component',
                            contentSite: 'docs',
                            url: '/docs/v6.0/core/queryable-encryption/install-library',
                          },
                          {
                            label: 'Create a Customer Master Key',
                            contentSite: 'docs',
                            url: '/docs/v6.0/core/queryable-encryption/qe-create-cmk',
                          },
                          {
                            label: 'Create an Application',
                            contentSite: 'docs',
                            url: '/docs/v6.0/core/queryable-encryption/qe-create-application',
                          },
                        ],
                      },
                      {
                        label: 'Create & Query',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/v6.0/core/queryable-encryption/overview-use-qe',
                        items: [
                          {
                            label: 'Create a Collection',
                            contentSite: 'docs',
                            url: '/docs/v6.0/core/queryable-encryption/qe-create-encrypted-collection',
                          },
                          {
                            label: 'Query',
                            contentSite: 'docs',
                            url: '/docs/v6.0/core/queryable-encryption/qe-retrieve-encrypted-document',
                          },
                        ],
                      },
                      {
                        label: 'Use Explicit Encryption',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/queryable-encryption/tutorials/explicit-encryption',
                      },
                    ],
                  },
                  {
                    label: 'Reference',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/core/queryable-encryption/reference',
                    items: [
                      {
                        label: 'Supported Operations',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/queryable-encryption/reference/supported-operations',
                      },
                      {
                        label: 'MongoClient Options',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/queryable-encryption/reference/qe-options-clients',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Client-Side Field Level Encryption',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/core/csfle',
                items: [
                  {
                    label: 'Features',
                    contentSite: 'docs',
                    url: '/docs/v6.0/core/csfle/features',
                  },
                  {
                    label: 'Installation Requirements',
                    contentSite: 'docs',
                    url: '/docs/v6.0/core/csfle/install',
                  },
                  {
                    label: 'Quick Start',
                    contentSite: 'docs',
                    url: '/docs/v6.0/core/csfle/quick-start',
                  },
                  {
                    label: 'Fundamentals',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/core/csfle/fundamentals',
                    items: [
                      {
                        label: 'Automatic Encryption',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/csfle/fundamentals/automatic-encryption',
                      },
                      {
                        label: 'Explicit Encryption',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/csfle/fundamentals/manual-encryption',
                      },
                      {
                        label: 'Encryption Schemas',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/csfle/fundamentals/create-schema',
                      },
                      {
                        label: 'Keys and Key Vaults',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/queryable-encryption/fundamentals/keys-key-vaults/',
                      },
                      {
                        label: 'Encryption Key Management',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/csfle/fundamentals/manage-keys',
                      },
                      {
                        label: 'Fields and Encryption Types',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/csfle/fundamentals/encryption-algorithms',
                      },
                    ],
                  },
                  {
                    label: 'Tutorials',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/core/csfle/tutorials',
                    items: [
                      {
                        label: 'Use Automatic Client-Side Field Level Encryption with AWS',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/csfle/tutorials/aws/aws-automatic',
                      },
                      {
                        label: 'Use Automatic Client-Side Field Level Encryption with Azure',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/csfle/tutorials/azure/azure-automatic',
                      },
                      {
                        label: 'Use Automatic Client-Side Field Level Encryption with GCP',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/csfle/tutorials/gcp/gcp-automatic',
                      },
                      {
                        label: 'Use Automatic Client-Side Field Level Encryption with KMIP',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/csfle/tutorials/kmip/kmip-automatic',
                      },
                      {
                        label: 'Implement Right to Erasure',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/csfle/tutorials/right-to-erasure',
                      },
                    ],
                  },
                  {
                    label: 'Reference',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/core/csfle/reference',
                    items: [
                      {
                        label: 'CSFLE Limitations',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/csfle/reference/limitations',
                      },
                      {
                        label: 'CSFLE Encryption Schemas',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/csfle/reference/encryption-schemas',
                      },
                      {
                        label: 'CSFLE Server-Side Schema Enforcement',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/csfle/reference/server-side-schema',
                      },
                      {
                        label: 'Supported Operations for Automatic Encryption',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/csfle/reference/supported-operations',
                      },
                      {
                        label: 'CSFLE-Specific MongoClient Options',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/csfle/reference/csfle-options-clients',
                      },
                      {
                        label: 'CSFLE Encryption Components',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/csfle/reference/encryption-components',
                      },
                      {
                        label: 'How CSFLE Decrypts Documents',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/csfle/reference/decryption',
                      },
                      {
                        label: 'Install and Configure a CSFLE Query Analysis Component',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/csfle/reference/install-library/',
                      },
                      {
                        label: 'Install libmongocrypt',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/csfle/reference/libmongocrypt',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            label: 'Development Checklist',
            contentSite: 'docs',
            url: '/docs/v6.0/administration/production-checklist-development',
          },
          {
            label: 'Replication',
            contentSite: 'docs',
            collapsible: true,
            url: '/docs/v6.0/replication',
            items: [
              {
                label: 'Oplog',
                contentSite: 'docs',
                url: '/docs/v6.0/core/replica-set-oplog',
              },
              {
                label: 'Data Synchronization',
                contentSite: 'docs',
                url: '/docs/v6.0/core/replica-set-sync',
              },
              {
                label: 'Replica Set Members',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/core/replica-set-members',
                items: [
                  {
                    label: 'Primary',
                    contentSite: 'docs',
                    url: '/docs/v6.0/core/replica-set-primary',
                  },
                  {
                    label: 'Secondary',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/core/replica-set-secondary',
                    items: [
                      {
                        label: 'Priority 0 Members',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/replica-set-priority-0-member',
                      },
                      {
                        label: 'Hidden Members',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/replica-set-hidden-member',
                      },
                      {
                        label: 'Delayed Members',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/replica-set-delayed-member',
                      },
                    ],
                  },
                  {
                    label: 'Arbiter',
                    contentSite: 'docs',
                    url: '/docs/v6.0/core/replica-set-arbiter',
                  },
                ],
              },
              {
                label: 'High Availability',
                contentSite: 'docs',
                collapsible: true,
                items: [
                  {
                    label: 'Elections',
                    contentSite: 'docs',
                    url: '/docs/v6.0/core/replica-set-elections',
                  },
                  {
                    label: 'Failover Rollbacks',
                    contentSite: 'docs',
                    url: '/docs/v6.0/core/replica-set-rollbacks',
                  },
                ],
              },
              {
                label: 'Read & Write Semantics',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/applications/replication',
                items: [
                  {
                    label: 'Write Concern',
                    contentSite: 'docs',
                    url: '/docs/v6.0/core/replica-set-write-concern',
                  },
                  {
                    label: 'Read Preference',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/core/read-preference',
                    items: [
                      {
                        label: 'Use Cases',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/read-preference-use-cases',
                      },
                      {
                        label: 'Tag Sets',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/read-preference-tags',
                      },
                      {
                        label: 'maxStalenessSeconds',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/read-preference-staleness',
                      },
                      {
                        label: 'Hedged Reads',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/read-preference-hedge-option/',
                      },
                    ],
                  },
                  {
                    label: 'Server Selection Algorithm',
                    contentSite: 'docs',
                    url: '/docs/v6.0/core/read-preference-mechanics',
                  },
                ],
              },
              {
                label: 'Replication Reference',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/reference/replication',
                items: [
                  {
                    label: 'Member States',
                    contentSite: 'docs',
                    url: '/docs/v6.0/reference/replica-states',
                  },
                  {
                    label: 'local Database',
                    contentSite: 'docs',
                    url: '/docs/v6.0/reference/local-database',
                  },
                ],
              },
            ],
          },
          {
            label: 'Sharding',
            contentSite: 'docs',
            collapsible: true,
            url: '/docs/v6.0/sharding',
            items: [
              {
                label: 'Sharded Cluster Components',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/core/sharded-cluster-components',
                items: [
                  {
                    label: 'Shards',
                    contentSite: 'docs',
                    url: '/docs/v6.0/core/sharded-cluster-shards',
                  },
                  {
                    label: 'Config Servers (metadata)',
                    contentSite: 'docs',
                    url: '/docs/v6.0/core/sharded-cluster-config-servers',
                  },
                  {
                    label: 'Router (mongos)',
                    contentSite: 'docs',
                    url: '/docs/v6.0/core/sharded-cluster-query-router',
                  },
                ],
              },
              {
                label: 'Shard Keys',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/core/sharding-shard-key',
                items: [
                  {
                    label: 'Shard Key Indexes',
                    contentSite: 'docs',
                    url: '/docs/v6.0/core/sharding-shard-key-indexes',
                  },
                  {
                    label: 'Shard a Collection',
                    contentSite: 'docs',
                    url: '/docs/v6.0/core/sharding-shard-a-collection',
                  },
                  {
                    label: 'Choose Shard Key',
                    contentSite: 'docs',
                    url: '/docs/v6.0/core/sharding-choose-a-shard-key',
                  },
                  {
                    label: 'Change Shard Key',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/core/sharding-change-a-shard-key',
                    items: [
                      {
                        label: 'Refine a Shard Key',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/sharding-refine-a-shard-key',
                      },
                      {
                        label: 'Reshard a Collection',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/sharding-reshard-a-collection',
                      },
                    ],
                  },
                  {
                    label: 'Change Shard Key Value',
                    contentSite: 'docs',
                    url: '/docs/v6.0/core/sharding-change-shard-key-value',
                  },
                  {
                    label: 'Set Missing Key Fields',
                    contentSite: 'docs',
                    url: '/docs/v6.0/core/sharding-set-missing-shard-key-fields',
                  },
                  {
                    label: 'Display a Shard Key',
                    contentSite: 'docs',
                    url: '/docs/v6.0/core/sharding-find-shard-key',
                  },
                  {
                    label: 'Troubleshoot',
                    contentSite: 'docs',
                    url: '/docs/v6.0/core/sharding-troubleshooting-shard-keys',
                  },
                ],
              },
              {
                label: 'Hashed Sharding',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/core/hashed-sharding',
                items: [
                  {
                    label: 'Drop Hashed Shard Key Index',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/drop-a-hashed-shard-key-index',
                  },
                ],
              },
              {
                label: 'Ranged Sharding',
                contentSite: 'docs',
                url: '/docs/v6.0/core/ranged-sharding',
              },
              {
                label: 'Data Partitioning',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/core/sharding-data-partitioning',
                items: [
                  {
                    label: 'Create Ranges',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/create-chunks-in-sharded-cluster',
                  },
                  {
                    label: 'Split Chunks',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/split-chunks-in-sharded-cluster',
                  },
                  {
                    label: 'Merge Chunks',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/merge-chunks-in-sharded-cluster',
                  },
                  {
                    label: 'Modify Range Size',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/modify-chunk-size-in-sharded-cluster',
                  },
                  {
                    label: 'Moveable Collections',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/core/moveable-collections',
                    items: [
                      {
                        label: 'Move a Collection',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/move-a-collection',
                      },
                      {
                        label: 'Multi-Tenant Architecture',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/moveable-collections/multi-tenant',
                      },
                      {
                        label: 'Stop Moving a Collection',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/stop-moving-a-collection',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Unsharded Collections',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/core/unsharded-collections',
                items: [
                  {
                    label: 'Unshard a Collection',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/unshard-collection',
                  },
                  {
                    label: 'Stop Unsharding a Collection',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/stop-unsharding-collection',
                  },
                ],
              },
              {
                label: 'Balancer',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/core/sharding-balancer-administration',
                items: [
                  {
                    label: 'Manage',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/manage-sharded-cluster-balancer',
                  },
                  {
                    label: 'Migrate Ranges',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/migrate-chunks-in-sharded-cluster',
                  },
                  {
                    label: 'The AutoMerger',
                    contentSite: 'docs',
                    url: '/docs/v6.0/core/automerger-concept',
                  },
                ],
              },
              {
                label: 'Long-Running Secondary Reads',
                contentSite: 'docs',
                url: '/docs/v6.0/core/long-running-secondary-reads/',
              },
            ],
          },
          {
            label: 'Performance',
            contentSite: 'docs',
            collapsible: true,
            url: '/docs/v6.0/administration/analyzing-mongodb-performance',
            items: [
              {
                label: 'Connection Pool',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/administration/connection-pool-overview',
                items: [
                  {
                    label: 'Tuning',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/connection-pool-performance-tuning',
                  },
                ],
              },
              {
                label: 'Performance Tuning',
                contentSite: 'docs',
                url: '/docs/v6.0/administration/performance-tuning',
              },
            ],
          },
          {
            label: 'Reference',
            contentSite: 'docs',
            collapsible: true,
            url: '/docs/v6.0/reference',
            items: [
              {
                label: 'Collation',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/reference/collation',
                items: [
                  {
                    label: 'Locales & Default Parameters',
                    contentSite: 'docs',
                    url: '/docs/v6.0/reference/collation-locales-defaults',
                  },
                ],
              },
              {
                label: 'Connection Strings',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/reference/connection-string',
                items: [
                  {
                    label: 'Options',
                    contentSite: 'docs',
                    url: '/docs/v6.0/reference/connection-string-options',
                  },
                  {
                    label: 'Examples',
                    contentSite: 'docs',
                    url: '/docs/v6.0/reference/connection-string-examples',
                  },
                ],
              },
              {
                label: 'Database Commands',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/reference/command',
                items: [
                  {
                    label: 'Query Plan Cache',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/reference/command/nav-plan-cache',
                    items: [
                      {
                        label: 'planCacheClear',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/planCacheClear',
                      },
                      {
                        label: 'planCacheClearFilters',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/planCacheClearFilters',
                      },
                      {
                        label: 'planCacheListFilters',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/planCacheListFilters',
                      },
                      {
                        label: 'planCacheSetFilter',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/planCacheSetFilter',
                      },
                    ],
                  },
                  {
                    label: 'Authentication',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/reference/command/nav-authentication',
                    items: [
                      {
                        label: 'authenticate',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/authenticate',
                      },
                      {
                        label: 'logout',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/logout',
                      },
                    ],
                  },
                  {
                    label: 'User Management',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/reference/command/nav-user-management',
                    items: [
                      {
                        label: 'createUser',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/createUser',
                      },
                      {
                        label: 'dropAllUsersFromDatabase',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/dropAllUsersFromDatabase',
                      },
                      {
                        label: 'dropUser',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/dropUser',
                      },
                      {
                        label: 'grantRolesToUser',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/grantRolesToUser',
                      },
                      {
                        label: 'revokeRolesFromUser',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/revokeRolesFromUser',
                      },
                      {
                        label: 'updateUser',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/updateUser',
                      },
                      {
                        label: 'usersInfo',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/usersInfo',
                      },
                    ],
                  },
                  {
                    label: 'Role Management',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/reference/command/nav-role-management',
                    items: [
                      {
                        label: 'createRole',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/createRole',
                      },
                      {
                        label: 'dropRole',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/dropRole',
                      },
                      {
                        label: 'dropAllRolesFromDatabase',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/dropAllRolesFromDatabase',
                      },
                      {
                        label: 'grantPrivilegesToRole',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/grantPrivilegesToRole',
                      },
                      {
                        label: 'grantRolesToRole',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/grantRolesToRole',
                      },
                      {
                        label: 'invalidateUserCache',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/invalidateUserCache',
                      },
                      {
                        label: 'revokePrivilegesFromRole',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/revokePrivilegesFromRole',
                      },
                      {
                        label: 'revokeRolesFromRole',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/revokeRolesFromRole',
                      },
                      {
                        label: 'rolesInfo',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/rolesInfo',
                      },
                      {
                        label: 'updateRole',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/updateRole',
                      },
                    ],
                  },
                  {
                    label: 'Replication',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/reference/command/nav-replication',
                    items: [
                      {
                        label: 'appendOplogNote',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/appendOplogNote',
                      },
                      {
                        label: 'applyOps',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/applyOps',
                      },
                      {
                        label: 'hello',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/hello',
                      },
                      {
                        label: 'replSetAbortPrimaryCatchUp',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/replSetAbortPrimaryCatchUp',
                      },
                      {
                        label: 'replSetFreeze',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/replSetFreeze',
                      },
                      {
                        label: 'replSetGetConfig',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/replSetGetConfig',
                      },
                      {
                        label: 'replSetGetStatus',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/replSetGetStatus',
                      },
                      {
                        label: 'replSetInitiate',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/replSetInitiate',
                      },
                      {
                        label: 'replSetMaintenance',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/replSetMaintenance',
                      },
                      {
                        label: 'replSetReconfig',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/replSetReconfig',
                      },
                      {
                        label: 'replSetResizeOplog',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/replSetResizeOplog',
                      },
                      {
                        label: 'replSetStepDown',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/replSetStepDown',
                      },
                      {
                        label: 'replSetSyncFrom',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/replSetSyncFrom',
                      },
                    ],
                  },
                  {
                    label: 'Sharding',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/reference/command/nav-sharding',
                    items: [
                      {
                        label: 'abortMoveCollection',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/abortMoveCollection',
                      },
                      {
                        label: 'abortReshardCollection',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/abortReshardCollection',
                      },
                      {
                        label: 'abortRewriteCollection',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/abortRewriteCollection',
                      },
                      {
                        label: 'abortUnshardCollection',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/abortUnshardCollection',
                      },
                      {
                        label: 'addShard',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/addShard',
                      },
                      {
                        label: 'addShardToZone',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/addShardToZone',
                      },
                      {
                        label: 'analyzeShardKey',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/analyzeShardKey',
                      },
                      {
                        label: 'balancerCollectionStatus',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/balancerCollectionStatus',
                      },
                      {
                        label: 'balancerStart',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/balancerStart',
                      },
                      {
                        label: 'balancerStatus',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/balancerStatus',
                      },
                      {
                        label: 'balancerStop',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/balancerStop',
                      },
                      {
                        label: 'checkMetadataConsistency',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/checkMetadataConsistency',
                      },
                      {
                        label: 'clearJumboFlag',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/clearJumboFlag',
                      },
                      {
                        label: 'cleanupOrphaned',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/cleanupOrphaned',
                      },
                      {
                        label: 'cleanupReshardCollection',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/cleanupReshardCollection',
                      },
                      {
                        label: 'commitReshardCollection',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/commitReshardCollection',
                      },
                      {
                        label: 'configureCollectionBalancing',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/configureCollectionBalancing',
                      },
                      {
                        label: 'configureQueryAnalyzer',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/configureQueryAnalyzer',
                      },
                      {
                        label: 'enableSharding',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/enableSharding',
                      },
                      {
                        label: 'flushRouterConfig',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/flushRouterConfig',
                      },
                      {
                        label: 'getShard Map',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/getShardMap',
                      },
                      {
                        label: 'isdbgrid',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/isdbgrid',
                      },
                      {
                        label: 'listShards',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/listShards',
                      },
                      {
                        label: 'mergeAllChunksOnShard',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/mergeAllChunksOnShard',
                      },
                      {
                        label: 'moveChunk',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/moveChunk',
                      },
                      {
                        label: 'moveCollection',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/moveCollection',
                      },
                      {
                        label: 'movePrimary',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/movePrimary',
                      },
                      {
                        label: 'moveRange',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/moveRange',
                      },
                      {
                        label: 'mergeChunks',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/mergeChunks',
                      },
                      {
                        label: 'refineCollectionShardKey',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/refineCollectionShardKey',
                      },
                      {
                        label: 'removeShard',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/removeShard',
                      },
                      {
                        label: 'removeShardFromZone',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/removeShardFromZone',
                      },
                      {
                        label: 'reshardCollection',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/reshardCollection',
                      },
                      {
                        label: 'rewriteCollection',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/rewriteCollection',
                      },
                      {
                        label: 'setAllowMigrations',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/setAllowMigrations',
                      },
                      {
                        label: 'shardCollection',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/shardCollection',
                      },
                      {
                        label: 'shardDrainingStatus',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/shardDrainingStatus',
                      },
                      {
                        label: 'shardingState',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/shardingState',
                      },
                      {
                        label: 'split',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/split',
                      },
                      {
                        label: 'startShardDraining',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/startShardDraining',
                      },
                      {
                        label: 'transitionFromDedicatedConfigServer',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/transitionFromDedicatedConfigServer',
                      },
                      {
                        label: 'transitionToDedicatedConfigServer',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/transitionToDedicatedConfigServer',
                      },
                      {
                        label: 'unsetSharding',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/unsetSharding',
                      },
                      {
                        label: 'unshardCollection',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/unshardCollection',
                      },
                      {
                        label: 'updateZoneKeyRange',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/updateZoneKeyRange',
                      },
                    ],
                  },
                  {
                    label: 'Sessions',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/reference/command/nav-sessions',
                    items: [
                      {
                        label: 'abortTransaction',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/abortTransaction',
                      },
                      {
                        label: 'commitTransaction',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/commitTransaction',
                      },
                      {
                        label: 'endSessions',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/endSessions',
                      },
                      {
                        label: 'killAllSessions',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/killAllSessions',
                      },
                      {
                        label: 'killAllSessionsByPattern',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/killAllSessionsByPattern',
                      },
                      {
                        label: 'killSessions',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/killSessions',
                      },
                      {
                        label: 'refreshSessions',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/refreshSessions',
                      },
                      {
                        label: 'startSession',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/startSession',
                      },
                    ],
                  },
                  {
                    label: 'Administration',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/reference/command/nav-administration',
                    items: [
                      {
                        label: 'autoCompact',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/autoCompact',
                      },
                      {
                        label: 'bulkWrite',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/bulkWrite',
                      },
                      {
                        label: 'cloneCollectionAsCapped',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/cloneCollectionAsCapped',
                      },
                      {
                        label: 'collMod',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/collMod',
                      },
                      {
                        label: 'compact',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/compact',
                      },
                      {
                        label: 'compactStructuredEncryptionData',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/compactStructuredEncryptionData',
                      },
                      {
                        label: 'convertToCapped',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/convertToCapped',
                      },
                      {
                        label: 'create',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/create',
                      },
                      {
                        label: 'createIndexes',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/createIndexes',
                      },
                      {
                        label: 'currentOp',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/currentOp',
                      },
                      {
                        label: 'drop',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/drop',
                      },
                      {
                        label: 'dropDatabase',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/dropDatabase',
                      },
                      {
                        label: 'dropConnections',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/dropConnections',
                      },
                      {
                        label: 'dropIndexes',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/dropIndexes',
                      },
                      {
                        label: 'filemd5',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/filemd5',
                      },
                      {
                        label: 'fsync',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/fsync',
                      },
                      {
                        label: 'fsyncUnlock',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/fsyncUnlock',
                      },
                      {
                        label: 'getAuditConfig',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/getAuditConfig',
                      },
                      {
                        label: 'getClusterParameter',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/getClusterParameter',
                      },
                      {
                        label: 'getDefaultRWConcern',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/getDefaultRWConcern',
                      },
                      {
                        label: 'getParameter',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/getParameter',
                      },
                      {
                        label: 'killCursors',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/killCursors',
                      },
                      {
                        label: 'killOp',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/killOp',
                      },
                      {
                        label: 'listCollections',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/listCollections',
                      },
                      {
                        label: 'listDatabases',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/listDatabases',
                      },
                      {
                        label: 'listIndexes',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/listIndexes',
                      },
                      {
                        label: 'logRotate',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/logRotate',
                      },
                      {
                        label: 'reIndex',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/reIndex',
                      },
                      {
                        label: 'removeQuerySettings',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/removeQuerySettings',
                      },
                      {
                        label: 'renameCollection',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/renameCollection',
                      },
                      {
                        label: 'rotateCertificates',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/rotateCertificates',
                      },
                      {
                        label: 'setAuditConfig',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/setAuditConfig',
                      },
                      {
                        label: 'setClusterParameter',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/setClusterParameter',
                      },
                      {
                        label: 'setFeatureCompatibilityVersion',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/setFeatureCompatibilityVersion',
                      },
                      {
                        label: 'setIndexCommitQuorum',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/setIndexCommitQuorum',
                      },
                      {
                        label: 'setParameter',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/setParameter',
                      },
                      {
                        label: 'setDefaultRWConcern',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/setDefaultRWConcern',
                      },
                      {
                        label: 'setQuerySettings',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/setQuerySettings',
                      },
                      {
                        label: 'setUserWriteBlockMode',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/setUserWriteBlockMode',
                      },
                      {
                        label: 'shutdown',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/shutdown',
                      },
                    ],
                  },
                  {
                    label: 'Diagnostics',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/reference/command/nav-diagnostic',
                    items: [
                      {
                        label: 'buildInfo',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/buildInfo',
                      },
                      {
                        label: 'collStats',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/collStats',
                      },
                      {
                        label: 'connPoolStats',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/connPoolStats',
                      },
                      {
                        label: 'connectionStatus',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/connectionStatus',
                      },
                      {
                        label: 'dataSize',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/dataSize',
                      },
                      {
                        label: 'dbHash',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/dbHash',
                      },
                      {
                        label: 'dbStats',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/dbStats',
                      },
                      {
                        label: 'explain',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/explain',
                      },
                      {
                        label: 'getCmdLineOpts',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/getCmdLineOpts',
                      },
                      {
                        label: 'getLog',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/getLog',
                      },
                      {
                        label: 'hostInfo',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/hostInfo',
                      },
                      {
                        label: 'listCommands',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/listCommands',
                      },
                      {
                        label: 'lockInfo',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/lockInfo',
                      },
                      {
                        label: 'ping',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/ping',
                      },
                      {
                        label: 'profile',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/profile',
                      },
                      {
                        label: 'serverStatus',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/serverStatus',
                      },
                      {
                        label: 'shardConnPoolStats',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/shardConnPoolStats',
                      },
                      {
                        label: 'top',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/top',
                      },
                      {
                        label: 'validate',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/validate',
                      },
                      {
                        label: 'validateDBMetadata',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/validateDBMetadata',
                      },
                      {
                        label: 'whatsmyuri',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/whatsmyuri',
                      },
                    ],
                  },
                  {
                    label: 'Auditing',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/reference/command/nav-auditing',
                    items: [
                      {
                        label: 'logApplicationMessage',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/logApplicationMessage',
                      },
                    ],
                  },
                  {
                    label: 'Atlas Search',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/reference/command/nav-atlas-search',
                    items: [
                      {
                        label: 'createSearchIndexes',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/createSearchIndexes',
                      },
                      {
                        label: 'dropSearchIndex',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/dropSearchIndex',
                      },
                      {
                        label: 'updateSearchIndex',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/updateSearchIndex',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'DDL Operations',
                contentSite: 'docs',
                url: '/docs/v6.0/reference/ddl-operations',
              },
              {
                label: 'Default Port',
                contentSite: 'docs',
                url: '/docs/v6.0/reference/default-mongodb-port',
              },
              {
                label: 'Read & Write Concerns',
                contentSite: 'docs',
                url: '/docs/v6.0/reference/mongodb-defaults',
              },
              {
                label: 'Error Codes',
                contentSite: 'docs',
                url: '/docs/v6.0/reference/error-codes',
              },
              {
                label: 'Glossary',
                contentSite: 'docs',
                url: '/docs/v6.0/reference/glossary',
              },
              {
                label: 'Log Messages',
                contentSite: 'docs',
                url: '/docs/v6.0/reference/log-messages',
              },
              {
                label: 'Limits & Thresholds',
                contentSite: 'docs',
                url: '/docs/v6.0/reference/limits',
              },
              {
                label: 'Wire Protocol',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/reference/mongodb-wire-protocol',
                items: [
                  {
                    label: 'Legacy Opcodes',
                    contentSite: 'docs',
                    url: '/docs/v6.0/legacy-opcodes',
                  },
                ],
              },
              {
                label: 'mongosh Methods',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/reference/method',
                items: [
                  {
                    label: 'Atlas Search Index',
                    contentSite: 'docs',
                    collapsible: true,
                    items: [
                      {
                        label: 'db.collection.createSearchIndex',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.collection.createSearchIndex',
                      },
                      {
                        label: 'db.collection.dropSearchIndex',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.collection.dropSearchIndex',
                      },
                      {
                        label: 'db.collection.getSearchIndexes',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.collection.getSearchIndexes',
                      },
                      {
                        label: 'db.collection.updateSearchIndex',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.collection.updateSearchIndex',
                      },
                    ],
                  },
                  {
                    label: 'Atlas Stream Processing',
                    contentSite: 'docs',
                    collapsible: true,
                    items: [
                      {
                        label: 'sp.createStreamProcessor',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/sp.createStreamProcessor',
                      },
                      {
                        label: 'sp.listConnections',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/sp.listConnections',
                      },
                      {
                        label: 'sp.listStreamProcessors',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/sp.listStreamProcessors',
                      },
                      {
                        label: 'sp.process',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/sp.process',
                      },
                      {
                        label: 'sp.processor.drop',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/sp.processor.drop',
                      },
                      {
                        label: 'sp.processor.sample',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/sp.processor.sample',
                      },
                      {
                        label: 'sp.processor.start',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/sp.processor.start',
                      },
                      {
                        label: 'sp.processor.stats',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/sp.processor.stats',
                      },
                      {
                        label: 'sp.processor.stop',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/sp.processor.stop',
                      },
                    ],
                  },
                  {
                    label: 'Collections',
                    contentSite: 'docs',
                    collapsible: true,
                    items: [
                      {
                        label: 'db.collection.aggregate',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.collection.aggregate',
                      },
                      {
                        label: 'db.collection.analyzeShardKey',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.collection.analyzeShardKey',
                      },
                      {
                        label: 'db.collection.bulkWrite',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.collection.bulkWrite',
                      },
                      {
                        label: 'db.collection.compactStructuredEncryptionData',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.collection.compactStructuredEncryptionData',
                      },
                      {
                        label: 'db.collection.configureQueryAnalyzer',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.collection.configureQueryAnalyzer',
                      },
                      {
                        label: 'db.collection.count',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.collection.count',
                      },
                      {
                        label: 'db.collection.countDocuments',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.collection.countDocuments',
                      },
                      {
                        label: 'db.collection.createIndex',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.collection.createIndex',
                      },
                      {
                        label: 'db.collection.createIndexes',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.collection.createIndexes',
                      },
                      {
                        label: 'db.collection.dataSize',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.collection.dataSize',
                      },
                      {
                        label: 'db.collection.deleteMany',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.collection.deleteMany',
                      },
                      {
                        label: 'db.collection.deleteOne',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.collection.deleteOne',
                      },
                      {
                        label: 'db.collection.distinct',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.collection.distinct',
                      },
                      {
                        label: 'db.collection.drop',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.collection.drop',
                      },
                      {
                        label: 'db.collection.dropIndex',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.collection.dropIndex',
                      },
                      {
                        label: 'db.collection.dropIndexes',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.collection.dropIndexes',
                      },
                      {
                        label: 'db.collection.estimatedDocumentCount',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.collection.estimatedDocumentCount',
                      },
                      {
                        label: 'db.collection.explain',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.collection.explain',
                      },
                      {
                        label: 'db.collection.find',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.collection.find',
                      },
                      {
                        label: 'db.collection.findAndModify',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.collection.findAndModify',
                      },
                      {
                        label: 'db.collection.findOne',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.collection.findOne',
                      },
                      {
                        label: 'db.collection.findOneAndDelete',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.collection.findOneAndDelete',
                      },
                      {
                        label: 'db.collection.findOneAndReplace',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.collection.findOneAndReplace',
                      },
                      {
                        label: 'db.collection.findOneAndUpdate',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.collection.findOneAndUpdate',
                      },
                      {
                        label: 'db.collection.getIndexes',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.collection.getIndexes',
                      },
                      {
                        label: 'db.collection.getShardDistribution',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.collection.getShardDistribution',
                      },
                      {
                        label: 'db.collection.getShardVersion',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.collection.getShardVersion',
                      },
                      {
                        label: 'db.collection.hideIndex',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.collection.hideIndex',
                      },
                      {
                        label: 'db.collection.insert',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.collection.insert',
                      },
                      {
                        label: 'db.collection.insertMany',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.collection.insertMany',
                      },
                      {
                        label: 'db.collection.insertOne',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.collection.insertOne',
                      },
                      {
                        label: 'db.collection.isCapped',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.collection.isCapped',
                      },
                      {
                        label: 'db.collection.latencyStats',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.collection.latencyStats',
                      },
                      {
                        label: 'db.collection.mapReduce',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.collection.mapReduce',
                      },
                      {
                        label: 'db.collection.reIndex',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.collection.reIndex',
                      },
                      {
                        label: 'db.collection.remove',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.collection.remove',
                      },
                      {
                        label: 'db.collection.renameCollection',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.collection.renameCollection',
                      },
                      {
                        label: 'db.collection.replaceOne',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.collection.replaceOne',
                      },
                      {
                        label: 'db.collection.stats',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.collection.stats',
                      },
                      {
                        label: 'db.collection.storageSize',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.collection.storageSize',
                      },
                      {
                        label: 'db.collection.totalIndexSize',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.collection.totalIndexSize',
                      },
                      {
                        label: 'db.collection.totalSize',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.collection.totalSize',
                      },
                      {
                        label: 'db.collection.unhideIndex',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.collection.unhideIndex',
                      },
                      {
                        label: 'db.collection.update',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.collection.update',
                      },
                      {
                        label: 'db.collection.updateMany',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.collection.updateMany',
                      },
                      {
                        label: 'db.collection.updateOne',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.collection.updateOne',
                      },
                      {
                        label: 'db.collection.validate',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.collection.validate',
                      },
                      {
                        label: 'db.collection.watch',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.collection.watch',
                      },
                    ],
                  },
                  {
                    label: 'Cursors',
                    contentSite: 'docs',
                    collapsible: true,
                    items: [
                      {
                        label: 'cursor.addOption',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/cursor.addOption',
                      },
                      {
                        label: 'cursor.allowDiskUse',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/cursor.allowDiskUse',
                      },
                      {
                        label: 'cursor.batchSize',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/cursor.batchSize',
                      },
                      {
                        label: 'cursor.close',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/cursor.close',
                      },
                      {
                        label: 'cursor.isClosed',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/cursor.isClosed',
                      },
                      {
                        label: 'cursor.collation',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/cursor.collation',
                      },
                      {
                        label: 'cursor.comment',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/cursor.comment',
                      },
                      {
                        label: 'cursor.count',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/cursor.count',
                      },
                      {
                        label: 'cursor.explain',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/cursor.explain',
                      },
                      {
                        label: 'cursor.forEach',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/cursor.forEach',
                      },
                      {
                        label: 'cursor.hasNext',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/cursor.hasNext',
                      },
                      {
                        label: 'cursor.hint',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/cursor.hint',
                      },
                      {
                        label: 'cursor.isExhausted',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/cursor.isExhausted',
                      },
                      {
                        label: 'cursor.itcount',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/cursor.itcount',
                      },
                      {
                        label: 'cursor.limit',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/cursor.limit',
                      },
                      {
                        label: 'cursor.map',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/cursor.map',
                      },
                      {
                        label: 'cursor.max',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/cursor.max',
                      },
                      {
                        label: 'cursor.maxAwaitTimeMS',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/cursor.maxAwaitTimeMS',
                      },
                      {
                        label: 'cursor.maxTimeMS',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/cursor.maxTimeMS',
                      },
                      {
                        label: 'cursor.min',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/cursor.min',
                      },
                      {
                        label: 'cursor.next',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/cursor.next',
                      },
                      {
                        label: 'cursor.noCursorTimeout',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/cursor.noCursorTimeout',
                      },
                      {
                        label: 'cursor.objsLeftInBatch',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/cursor.objsLeftInBatch',
                      },
                      {
                        label: 'cursor.pretty',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/cursor.pretty',
                      },
                      {
                        label: 'cursor.readConcern',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/cursor.readConcern',
                      },
                      {
                        label: 'cursor.readPref',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/cursor.readPref',
                      },
                      {
                        label: 'cursor.returnKey',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/cursor.returnKey',
                      },
                      {
                        label: 'cursor.showRecordId',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/cursor.showRecordId',
                      },
                      {
                        label: 'cursor.size',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/cursor.size',
                      },
                      {
                        label: 'cursor.skip',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/cursor.skip',
                      },
                      {
                        label: 'cursor.sort',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/cursor.sort',
                      },
                      {
                        label: 'cursor.tailable',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/cursor.tailable',
                      },
                      {
                        label: 'cursor.toArray',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/cursor.toArray',
                      },
                      {
                        label: 'cursor.tryNext',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/cursor.tryNext',
                      },
                    ],
                  },
                  {
                    label: 'Databases',
                    contentSite: 'docs',
                    collapsible: true,
                    items: [
                      {
                        label: 'db.adminCommand',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.adminCommand',
                      },
                      {
                        label: 'db.aggregate',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.aggregate',
                      },
                      {
                        label: 'db.commandHelp',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.commandHelp',
                      },
                      {
                        label: 'db.createCollection',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.createCollection',
                      },
                      {
                        label: 'db.createView',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.createView',
                      },
                      {
                        label: 'db.currentOp',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.currentOp',
                      },
                      {
                        label: 'db.dropDatabase',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.dropDatabase',
                      },
                      {
                        label: 'db.fsyncLock',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.fsyncLock',
                      },
                      {
                        label: 'db.fsyncUnlock',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.fsyncUnlock',
                      },
                      {
                        label: 'db.getCollection',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.getCollection',
                      },
                      {
                        label: 'db.getCollectionInfos',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.getCollectionInfos',
                      },
                      {
                        label: 'db.getCollectionNames',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.getCollectionNames',
                      },
                      {
                        label: 'db.getLogComponents',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.getLogComponents',
                      },
                      {
                        label: 'db.getMongo',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.getMongo',
                      },
                      {
                        label: 'db.getName',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.getName',
                      },
                      {
                        label: 'db.getProfilingStatus',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.getProfilingStatus',
                      },
                      {
                        label: 'db.getReplicationInfo',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.getReplicationInfo',
                      },
                      {
                        label: 'db.getSiblingDB',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.getSiblingDB',
                      },
                      {
                        label: 'db.hello',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.hello',
                      },
                      {
                        label: 'db.help',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.help',
                      },
                      {
                        label: 'db.hostInfo',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.hostInfo',
                      },
                      {
                        label: 'db.killOp',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.killOp',
                      },
                      {
                        label: 'db.listCommands',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.listCommands',
                      },
                      {
                        label: 'db.logout',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.logout',
                      },
                      {
                        label: 'db.printCollectionStats',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.printCollectionStats',
                      },
                      {
                        label: 'db.printReplicationInfo',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.printReplicationInfo',
                      },
                      {
                        label: 'db.printSecondaryReplicationInfo',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.printSecondaryReplicationInfo',
                      },
                      {
                        label: 'db.printShardingStatus',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.printShardingStatus',
                      },
                      {
                        label: 'db.rotateCertificates',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.rotateCertificates',
                      },
                      {
                        label: 'db.runCommand',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.runCommand',
                      },
                      {
                        label: 'db.serverBuildInfo',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.serverBuildInfo',
                      },
                      {
                        label: 'db.serverCmdLineOpts',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.serverCmdLineOpts',
                      },
                      {
                        label: 'db.serverStatus',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.serverStatus',
                      },
                      {
                        label: 'db.setLogLevel',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.setLogLevel',
                      },
                      {
                        label: 'db.setProfilingLevel',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.setProfilingLevel',
                      },
                      {
                        label: 'db.shutdownServer',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.shutdownServer',
                      },
                      {
                        label: 'db.stats',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.stats',
                      },
                      {
                        label: 'db.version',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.version',
                      },
                      {
                        label: 'db.watch',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.watch',
                      },
                    ],
                  },
                  {
                    label: 'Query Plan Caches',
                    contentSite: 'docs',
                    collapsible: true,
                    items: [
                      {
                        label: 'db.collection.getPlanCache',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.collection.getPlanCache',
                      },
                      {
                        label: 'PlanCache.clear',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/PlanCache.clear',
                      },
                      {
                        label: 'PlanCache.clearPlansByQuery',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/PlanCache.clearPlansByQuery',
                      },
                      {
                        label: 'PlanCache.help',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/PlanCache.help',
                      },
                      {
                        label: 'PlanCache.list',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/PlanCache.list',
                      },
                    ],
                  },
                  {
                    label: 'Bulk Operations',
                    contentSite: 'docs',
                    collapsible: true,
                    items: [
                      {
                        label: 'db.collection.initializeOrderedBulkOp',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.collection.initializeOrderedBulkOp',
                      },
                      {
                        label: 'db.collection.initializeUnorderedBulkOp',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.collection.initializeUnorderedBulkOp',
                      },
                      {
                        label: 'Mongo.bulkWrite',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/Mongo.bulkWrite',
                      },
                      {
                        label: 'Bulk',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/Bulk',
                      },
                      {
                        label: 'Bulk.execute',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/Bulk.execute',
                      },
                      {
                        label: 'Bulk.find',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/Bulk.find',
                      },
                      {
                        label: 'Bulk.find.arrayFilters',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/Bulk.find.arrayFilters',
                      },
                      {
                        label: 'Bulk.find.collation',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/Bulk.find.collation',
                      },
                      {
                        label: 'Bulk.find.delete',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/Bulk.find.delete',
                      },
                      {
                        label: 'Bulk.find.deleteOne',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/Bulk.find.deleteOne',
                      },
                      {
                        label: 'Bulk.find.hint',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/Bulk.find.hint',
                      },
                      {
                        label: 'Bulk.find.remove',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/Bulk.find.remove',
                      },
                      {
                        label: 'Bulk.find.removeOne',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/Bulk.find.removeOne',
                      },
                      {
                        label: 'Bulk.find.replaceOne',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/Bulk.find.replaceOne',
                      },
                      {
                        label: 'Bulk.find.updateOne',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/Bulk.find.updateOne',
                      },
                      {
                        label: 'Bulk.find.update',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/Bulk.find.update',
                      },
                      {
                        label: 'Bulk.find.upsert',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/Bulk.find.upsert',
                      },
                      {
                        label: 'Bulk.getOperations',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/Bulk.getOperations',
                      },
                      {
                        label: 'Bulk.insert',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/Bulk.insert',
                      },
                      {
                        label: 'Bulk.tojson',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/Bulk.tojson',
                      },
                      {
                        label: 'Bulk.toString',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/Bulk.toString',
                      },
                    ],
                  },
                  {
                    label: 'User Management',
                    contentSite: 'docs',
                    collapsible: true,
                    items: [
                      {
                        label: 'db.auth',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.auth',
                      },
                      {
                        label: 'db.changeUserPassword',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.changeUserPassword',
                      },
                      {
                        label: 'db.createUser',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.createUser',
                      },
                      {
                        label: 'db.dropUser',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.dropUser',
                      },
                      {
                        label: 'db.dropAllUsers',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.dropAllUsers',
                      },
                      {
                        label: 'db.getUser',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.getUser',
                      },
                      {
                        label: 'db.getUsers',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.getUsers',
                      },
                      {
                        label: 'db.grantRolesToUser',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.grantRolesToUser',
                      },
                      {
                        label: 'db.removeUser',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.removeUser',
                      },
                      {
                        label: 'db.revokeRolesFromUser',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.revokeRolesFromUser',
                      },
                      {
                        label: 'db.updateUser',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.updateUser',
                      },
                      {
                        label: 'passwordPrompt',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/passwordPrompt',
                      },
                    ],
                  },
                  {
                    label: 'Role Management',
                    contentSite: 'docs',
                    collapsible: true,
                    items: [
                      {
                        label: 'db.createRole',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.createRole',
                      },
                      {
                        label: 'db.dropRole',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.dropRole',
                      },
                      {
                        label: 'db.dropAllRoles',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.dropAllRoles',
                      },
                      {
                        label: 'db.getRole',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.getRole',
                      },
                      {
                        label: 'db.getRoles',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.getRoles',
                      },
                      {
                        label: 'db.grantPrivilegesToRole',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.grantPrivilegesToRole',
                      },
                      {
                        label: 'db.revokePrivilegesFromRole',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.revokePrivilegesFromRole',
                      },
                      {
                        label: 'db.grantRolesToRole',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.grantRolesToRole',
                      },
                      {
                        label: 'db.revokeRolesFromRole',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.revokeRolesFromRole',
                      },
                      {
                        label: 'db.updateRole',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.updateRole',
                      },
                    ],
                  },
                  {
                    label: 'Replication',
                    contentSite: 'docs',
                    collapsible: true,
                    items: [
                      {
                        label: 'rs.add',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/rs.add',
                      },
                      {
                        label: 'rs.addArb',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/rs.addArb',
                      },
                      {
                        label: 'rs.conf',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/rs.conf',
                      },
                      {
                        label: 'rs.freeze',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/rs.freeze',
                      },
                      {
                        label: 'rs.help',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/rs.help',
                      },
                      {
                        label: 'rs.initiate',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/rs.initiate',
                      },
                      {
                        label: 'rs.printReplicationInfo',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/rs.printReplicationInfo',
                      },
                      {
                        label: 'rs.printSecondaryReplicationInfo',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/rs.printSecondaryReplicationInfo',
                      },
                      {
                        label: 'rs.reconfig',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/rs.reconfig',
                      },
                      {
                        label: 'rs.reconfigForPSASet',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/rs.reconfigForPSASet',
                      },
                      {
                        label: 'rs.remove',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/rs.remove',
                      },
                      {
                        label: 'rs.status',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/rs.status',
                      },
                      {
                        label: 'rs.stepDown',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/rs.stepDown',
                      },
                      {
                        label: 'rs.syncFrom',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/rs.syncFrom',
                      },
                    ],
                  },
                  {
                    label: 'Sharding',
                    contentSite: 'docs',
                    collapsible: true,
                    items: [
                      {
                        label: 'convertShardKeyToHashed',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/convertShardKeyToHashed',
                      },
                      {
                        label: 'db.checkMetadataConsistency',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.checkMetadataConsistency',
                      },
                      {
                        label: 'db.collection.checkMetadataConsistency',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.collection.checkMetadataConsistency',
                      },
                      {
                        label: 'db.collection.getShardLocation',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/db.collection.getShardLocation',
                      },
                      {
                        label: 'sh.abortMoveCollection',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/sh.abortMoveCollection',
                      },
                      {
                        label: 'sh.abortReshardCollection',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/sh.abortReshardCollection',
                      },
                      {
                        label: 'sh.abortUnshardCollection',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/sh.abortUnshardCollection',
                      },
                      {
                        label: 'sh.addShard',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/sh.addShard',
                      },
                      {
                        label: 'sh.addShardTag',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/sh.addShardTag',
                      },
                      {
                        label: 'sh.addShardToZone',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/sh.addShardToZone',
                      },
                      {
                        label: 'sh.addTagRange',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/sh.addTagRange',
                      },
                      {
                        label: 'sh.balancerCollectionStatus',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/sh.balancerCollectionStatus',
                      },
                      {
                        label: 'sh.checkMetadataConsistency',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/sh.checkMetadataConsistency',
                      },
                      {
                        label: 'sh.commitReshardCollection',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/sh.commitReshardCollection',
                      },
                      {
                        label: 'sh.disableAutoMerger',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/sh.disableAutoMerger',
                      },
                      {
                        label: 'sh.disableAutoSplit',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/sh.disableAutoSplit',
                      },
                      {
                        label: 'sh.disableBalancing',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/sh.disableBalancing',
                      },
                      {
                        label: 'sh.disableMigrations',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/sh.disableMigrations',
                      },
                      {
                        label: 'sh.enableAutoMerger',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/sh.enableAutoMerger',
                      },
                      {
                        label: 'sh.enableBalancing',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/sh.enableBalancing',
                      },
                      {
                        label: 'sh.enableAutoSplit',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/sh.enableAutoSplit',
                      },
                      {
                        label: 'sh.enableMigrations',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/sh.enableMigrations',
                      },
                      {
                        label: 'sh.enableSharding',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/sh.enableSharding',
                      },
                      {
                        label: 'sh.getBalancerState',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/sh.getBalancerState',
                      },
                      {
                        label: 'sh.getShardedDataDistribution',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/sh.getShardedDataDistribution',
                      },
                      {
                        label: 'sh.help',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/sh.help',
                      },
                      {
                        label: 'sh.isBalancerRunning',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/sh.isBalancerRunning',
                      },
                      {
                        label: 'sh.isConfigShardEnabled',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/sh.isConfigShardEnabled',
                      },
                      {
                        label: 'sh.listShards',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/sh.listShards',
                      },
                      {
                        label: 'sh.moveChunk',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/sh.moveChunk',
                      },
                      {
                        label: 'sh.moveCollection',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/sh.moveCollection',
                      },
                      {
                        label: 'sh.moveRange',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/sh.moveRange',
                      },
                      {
                        label: 'sh.removeRangeFromZone',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/sh.removeRangeFromZone',
                      },
                      {
                        label: 'sh.removeShardTag',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/sh.removeShardTag',
                      },
                      {
                        label: 'sh.removeShardFromZone',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/sh.removeShardFromZone',
                      },
                      {
                        label: 'sh.removeTagRange',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/sh.removeTagRange',
                      },
                      {
                        label: 'sh.reshardCollection',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/sh.reshardCollection',
                      },
                      {
                        label: 'sh.setBalancerState',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/sh.setBalancerState',
                      },
                      {
                        label: 'sh.shardAndDistributeCollection',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/sh.shardAndDistributeCollection',
                      },
                      {
                        label: 'sh.shardCollection',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/sh.shardCollection',
                      },
                      {
                        label: 'sh.splitAt',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/sh.splitAt',
                      },
                      {
                        label: 'sh.splitFind',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/sh.splitFind',
                      },
                      {
                        label: 'sh.startAutoMerger',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/sh.startAutoMerger',
                      },
                      {
                        label: 'sh.startBalancer',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/sh.startBalancer',
                      },
                      {
                        label: 'sh.status',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/sh.status',
                      },
                      {
                        label: 'sh.stopAutoMerger',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/sh.stopAutoMerger',
                      },
                      {
                        label: 'sh.stopBalancer',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/sh.stopBalancer',
                      },
                      {
                        label: 'sh.unshardCollection',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/sh.unshardCollection',
                      },
                      {
                        label: 'sh.updateZoneKeyRange',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/sh.updateZoneKeyRange',
                      },
                      {
                        label: 'sh.waitForBalancer',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/sh.waitForBalancer',
                      },
                      {
                        label: 'sh.waitForBalancerOff',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/sh.waitForBalancerOff',
                      },
                      {
                        label: 'sh.waitForPingChange',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/sh.waitForPingChange',
                      },
                    ],
                  },
                  {
                    label: 'Object Constructors',
                    contentSite: 'docs',
                    collapsible: true,
                    items: [
                      {
                        label: 'Binary.createFromBase64',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/Binary.createFromBase64',
                      },
                      {
                        label: 'Binary.createFromHexString',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/Binary.createFromHexString',
                      },
                      {
                        label: 'BinData',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/BinData',
                      },
                      {
                        label: 'BSONRegExp',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/BSONRegExp',
                      },
                      {
                        label: 'BulkWriteResult',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/BulkWriteResult',
                      },
                      {
                        label: 'Date',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/Date',
                      },
                      {
                        label: 'HexData',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/HexData',
                      },
                      {
                        label: 'ObjectId',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/ObjectId',
                      },
                      {
                        label: 'ObjectId.createFromBase64',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/ObjectId.createFromBase64',
                      },
                      {
                        label: 'ObjectId.createFromHexString',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/ObjectId.createFromHexString',
                      },
                      {
                        label: 'ObjectId.getTimestamp',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/ObjectId.getTimestamp',
                      },
                      {
                        label: 'ObjectId.toString',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/ObjectId.toString',
                      },
                      {
                        label: 'UUID',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/UUID',
                      },
                      {
                        label: 'WriteResult',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/WriteResult',
                      },
                    ],
                  },
                  {
                    label: 'Connections',
                    contentSite: 'docs',
                    collapsible: true,
                    items: [
                      {
                        label: 'connect',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/connect',
                      },
                      {
                        label: 'Mongo',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/Mongo',
                      },
                      {
                        label: 'Mongo.getDB',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/Mongo.getDB',
                      },
                      {
                        label: 'Mongo.getDBNames',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/Mongo.getDBNames',
                      },
                      {
                        label: 'Mongo.getDBs',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/Mongo.getDBs',
                      },
                      {
                        label: 'Mongo.getReadPrefMode',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/Mongo.getReadPrefMode',
                      },
                      {
                        label: 'Mongo.getReadPrefTagSet',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/Mongo.getReadPrefTagSet',
                      },
                      {
                        label: 'Mongo.getURI',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/Mongo.getURI',
                      },
                      {
                        label: 'Mongo.getWriteConcern',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/Mongo.getWriteConcern',
                      },
                      {
                        label: 'Mongo.setCausalConsistency',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/Mongo.setCausalConsistency',
                      },
                      {
                        label: 'Mongo.setReadPref',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/Mongo.setReadPref',
                      },
                      {
                        label: 'Mongo.startSession',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/Mongo.startSession',
                      },
                      {
                        label: 'Mongo.setWriteConcern',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/Mongo.setWriteConcern',
                      },
                      {
                        label: 'Mongo.watch',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/Mongo.watch',
                      },
                      {
                        label: 'Session',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/v6.0/reference/method/Session',
                        items: [
                          {
                            label: 'Session.abortTransaction()',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/method/Session.abortTransaction',
                          },
                          {
                            label: 'Session.commitTransaction()',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/method/Session.commitTransaction',
                          },
                          {
                            label: 'Session.startTransaction()',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/method/Session.startTransaction',
                          },
                          {
                            label: 'Session.withTransaction()',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/method/Session.withTransaction',
                          },
                        ],
                      },
                      {
                        label: 'SessionOptions',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/SessionOptions',
                      },
                    ],
                  },
                  {
                    label: 'In-Use Encryption',
                    contentSite: 'docs',
                    collapsible: true,
                    items: [
                      {
                        label: 'ClientEncryption.createEncryptedCollection',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/ClientEncryption.createEncryptedCollection',
                      },
                      {
                        label: 'ClientEncryption.encrypt',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/ClientEncryption.encrypt',
                      },
                      {
                        label: 'ClientEncryption.encryptExpression',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/ClientEncryption.encryptExpression',
                      },
                      {
                        label: 'ClientEncryption.decrypt',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/ClientEncryption.decrypt',
                      },
                      {
                        label: 'getClientEncryption',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/getClientEncryption',
                      },
                      {
                        label: 'getKeyVault',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/getKeyVault',
                      },
                      {
                        label: 'KeyVault.addKeyName',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/KeyVault.addKeyName',
                      },
                      {
                        label: 'KeyVault.addKeyAlternateName',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/KeyVault.addKeyAlternateName',
                      },
                      {
                        label: 'KeyVault.createDataKey',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/KeyVault.createDataKey',
                      },
                      {
                        label: 'KeyVault.createKey',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/KeyVault.createKey',
                      },
                      {
                        label: 'KeyVault.deleteKey',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/KeyVault.deleteKey',
                      },
                      {
                        label: 'KeyVault.getKey',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/KeyVault.getKey',
                      },
                      {
                        label: 'KeyVault.getKeys',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/KeyVault.getKeys',
                      },
                      {
                        label: 'KeyVault.getKeyByAltName',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/KeyVault.getKeyByAltName',
                      },
                      {
                        label: 'KeyVault.removeKeyAlternateName',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/KeyVault.removeKeyAlternateName',
                      },
                      {
                        label: 'KeyVault.removeKeyAltName',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/KeyVault.removeKeyAltName',
                      },
                      {
                        label: 'KeyVault.rewrapManyDataKey',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/method/KeyVault.rewrapManyDataKey',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Query Language',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/reference/mql',
                items: [
                  {
                    label: 'CRUD Commands',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/reference/mql/crud-commands',
                    items: [
                      {
                        label: 'aggregate',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/aggregate',
                      },
                      {
                        label: 'bulkWrite',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/bulkWrite',
                      },
                      {
                        label: 'count',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/count',
                      },
                      {
                        label: 'delete',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/delete',
                      },
                      {
                        label: 'distinct',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/distinct',
                      },
                      {
                        label: 'find',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/find',
                      },
                      {
                        label: 'findAndModify',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/findAndModify',
                      },
                      {
                        label: 'getMore',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/getMore',
                      },
                      {
                        label: 'insert',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/insert',
                      },
                      {
                        label: 'mapReduce',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/mapReduce',
                      },
                      {
                        label: 'update',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/command/update',
                      },
                    ],
                  },
                  {
                    label: 'Aggregation Stages',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/reference/mql/aggregation-stages',
                    items: [
                      {
                        label: '$addFields',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/addFields',
                      },
                      {
                        label: '$bucket',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/bucket',
                      },
                      {
                        label: '$bucketAuto',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/bucketAuto',
                      },
                      {
                        label: '$changeStream',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/changeStream',
                      },
                      {
                        label: '$changeStreamSplitLargeEvent',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/changeStreamSplitLargeEvent',
                      },
                      {
                        label: '$collStats',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/collStats',
                      },
                      {
                        label: '$count',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/count',
                      },
                      {
                        label: '$currentOp',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/currentOp',
                      },
                      {
                        label: '$densify',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/densify',
                      },
                      {
                        label: '$documents',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/documents',
                      },
                      {
                        label: '$facet',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/facet',
                      },
                      {
                        label: '$fill',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/fill',
                      },
                      {
                        label: '$geoNear',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/geoNear',
                      },
                      {
                        label: '$graphLookup',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/graphLookup',
                      },
                      {
                        label: '$group',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/group',
                      },
                      {
                        label: '$indexStats',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/indexStats',
                      },
                      {
                        label: '$limit',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/limit',
                      },
                      {
                        label: '$listClusterCatalog',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/listClusterCatalog',
                      },
                      {
                        label: '$listLocalSessions',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/listLocalSessions',
                      },
                      {
                        label: '$listSampledQueries',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/listSampledQueries',
                      },
                      {
                        label: '$listSearchIndexes',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/listSearchIndexes',
                      },
                      {
                        label: '$listSessions',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/listSessions',
                      },
                      {
                        label: '$lookup',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/lookup',
                      },
                      {
                        label: '$match',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/match',
                      },
                      {
                        label: '$merge',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/merge',
                      },
                      {
                        label: '$out',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/out',
                      },
                      {
                        label: '$planCacheStats',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/planCacheStats',
                      },
                      {
                        label: '$project',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/project',
                      },
                      {
                        label: '$querySettings',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/querySettings',
                      },
                      {
                        label: '$queryStats',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/v6.0/reference/operator/aggregation/queryStats',
                        items: [
                          {
                            label: 'Toggle Log Output',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/operator/aggregation/queryStats/toggle-logging',
                          },
                        ],
                      },
                      {
                        label: '$rankFusion',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/rankFusion',
                      },
                      {
                        label: '$redact',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/v6.0/reference/operator/aggregation/redact',
                        items: [
                          {
                            label: 'Use Field Level Redaction',
                            contentSite: 'docs',
                            url: '/docs/v6.0/tutorial/implement-field-level-redaction',
                          },
                        ],
                      },
                      {
                        label: '$replaceRoot',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/replaceRoot',
                      },
                      {
                        label: '$replaceWith',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/replaceWith',
                      },
                      {
                        label: '$sample',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/sample',
                      },
                      {
                        label: '$score',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/score',
                      },
                      {
                        label: '$scoreFusion',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/scoreFusion',
                      },
                      {
                        label: '$search',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/search',
                      },
                      {
                        label: '$searchMeta',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/searchMeta',
                      },
                      {
                        label: '$set',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/set',
                      },
                      {
                        label: '$setWindowFields',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/setWindowFields',
                      },
                      {
                        label: '$shardedDataDistribution',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/shardedDataDistribution',
                      },
                      {
                        label: '$skip',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/skip',
                      },
                      {
                        label: '$sort',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/sort',
                      },
                      {
                        label: '$sortByCount',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/sortByCount',
                      },
                      {
                        label: '$unionWith',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/unionWith',
                      },
                      {
                        label: '$unset',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/unset',
                      },
                      {
                        label: '$unwind',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/unwind',
                      },
                      {
                        label: '$vectorSearch',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/vectorSearch',
                      },
                    ],
                  },
                  {
                    label: 'Query Predicates',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/reference/mql/query-predicates',
                    items: [
                      {
                        label: 'Arrays',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/v6.0/reference/mql/query-predicates/arrays',
                        items: [
                          {
                            label: '$all',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/operator/query/all',
                          },
                          {
                            label: '$elemMatch',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/operator/query/elemMatch',
                          },
                          {
                            label: '$size',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/operator/query/size',
                          },
                        ],
                      },
                      {
                        label: 'Bitwise',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/v6.0/reference/mql/query-predicates/bitwise',
                        items: [
                          {
                            label: '$bitsAllClear',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/operator/query/bitsAllClear',
                          },
                          {
                            label: '$bitsAllSet',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/operator/query/bitsAllSet',
                          },
                          {
                            label: '$bitsAnyClear',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/operator/query/bitsAnyClear',
                          },
                          {
                            label: '$bitsAnySet',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/operator/query/bitsAnySet',
                          },
                        ],
                      },
                      {
                        label: 'Comparison',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/v6.0/reference/mql/query-predicates/comparison',
                        items: [
                          {
                            label: '$eq',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/operator/query/eq',
                          },
                          {
                            label: '$gt',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/operator/query/gt',
                          },
                          {
                            label: '$gte',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/operator/query/gte',
                          },
                          {
                            label: '$in',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/operator/query/in',
                          },
                          {
                            label: '$lt',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/operator/query/lt',
                          },
                          {
                            label: '$lte',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/operator/query/lte',
                          },
                          {
                            label: '$ne',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/operator/query/ne',
                          },
                          {
                            label: '$nin',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/operator/query/nin',
                          },
                        ],
                      },
                      {
                        label: 'Data Type',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/v6.0/reference/mql/query-predicates/data-type',
                        items: [
                          {
                            label: '$exists',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/operator/query/exists',
                          },
                          {
                            label: '$type',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/operator/query/type',
                          },
                        ],
                      },
                      {
                        label: 'Geospatial',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/v6.0/reference/mql/query-predicates/geospatial',
                        items: [
                          {
                            label: '$box',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/operator/query/box',
                          },
                          {
                            label: '$center',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/operator/query/center',
                          },
                          {
                            label: '$centerSphere',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/operator/query/centerSphere',
                          },
                          {
                            label: '$geoIntersects',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/operator/query/geoIntersects',
                          },
                          {
                            label: '$geometry',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/operator/query/geometry',
                          },
                          {
                            label: '$geoWithin',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/operator/query/geoWithin',
                          },
                          {
                            label: '$maxDistance',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/operator/query/maxDistance',
                          },
                          {
                            label: '$minDistance',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/operator/query/minDistance',
                          },
                          {
                            label: '$near',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/operator/query/near',
                          },
                          {
                            label: '$nearSphere',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/operator/query/nearSphere',
                          },
                          {
                            label: '$polygon',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/operator/query/polygon',
                          },
                        ],
                      },
                      {
                        label: 'Logical',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/v6.0/reference/mql/query-predicates/logical',
                        items: [
                          {
                            label: '$and',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/operator/query/and',
                          },
                          {
                            label: '$nor',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/operator/query/nor',
                          },
                          {
                            label: '$not',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/operator/query/not',
                          },
                          {
                            label: '$or',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/operator/query/or',
                          },
                        ],
                      },
                      {
                        label: 'Miscellaneous',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/v6.0/reference/mql/query-predicates/misc',
                        items: [
                          {
                            label: '$expr',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/operator/query/expr',
                          },
                          {
                            label: '$jsonSchema',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/operator/query/jsonSchema',
                          },
                          {
                            label: '$mod',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/operator/query/mod',
                          },
                          {
                            label: '$regex',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/operator/query/regex',
                          },
                          {
                            label: '$where',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/operator/query/where',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    label: 'Expressions',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/reference/mql/expressions',
                    items: [
                      {
                        label: '$abs',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/abs',
                      },
                      {
                        label: '$acos',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/acos',
                      },
                      {
                        label: '$acosh',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/acosh',
                      },
                      {
                        label: '$add',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/add',
                      },
                      {
                        label: '$allElementsTrue',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/allElementsTrue',
                      },
                      {
                        label: '$and',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/and',
                      },
                      {
                        label: '$anyElementTrue',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/anyElementTrue',
                      },
                      {
                        label: '$arrayElemAt',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/arrayElemAt',
                      },
                      {
                        label: '$arrayToObject',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/arrayToObject',
                      },
                      {
                        label: '$asin',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/asin',
                      },
                      {
                        label: '$asinh',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/asinh',
                      },
                      {
                        label: '$atan',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/atan',
                      },
                      {
                        label: '$atan2',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/atan2',
                      },
                      {
                        label: '$atanh',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/atanh',
                      },
                      {
                        label: '$binarySize',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/binarySize',
                      },
                      {
                        label: '$bitAnd',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/bitAnd',
                      },
                      {
                        label: '$bitNot',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/bitNot',
                      },
                      {
                        label: '$bitOr',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/bitOr',
                      },
                      {
                        label: '$bitXor',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/bitXor',
                      },
                      {
                        label: '$bsonSize',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/bsonSize',
                      },
                      {
                        label: '$ceil',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/ceil',
                      },
                      {
                        label: '$cmp',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/cmp',
                      },
                      {
                        label: '$concat',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/concat',
                      },
                      {
                        label: '$concatArrays',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/concatArrays',
                      },
                      {
                        label: '$cond',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/cond',
                      },
                      {
                        label: '$convert',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/convert',
                      },
                      {
                        label: '$cos',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/cos',
                      },
                      {
                        label: '$cosh',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/cosh',
                      },
                      {
                        label: '$covariancePop',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/covariancePop',
                      },
                      {
                        label: '$covarianceSamp',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/covarianceSamp',
                      },
                      {
                        label: '$dateAdd',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/dateAdd',
                      },
                      {
                        label: '$dateDiff',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/dateDiff',
                      },
                      {
                        label: '$dateFromParts',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/dateFromParts',
                      },
                      {
                        label: '$dateFromString',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/dateFromString',
                      },
                      {
                        label: '$dateSubtract',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/dateSubtract',
                      },
                      {
                        label: '$dateToParts',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/dateToParts',
                      },
                      {
                        label: '$dateToString',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/dateToString',
                      },
                      {
                        label: '$dateTrunc',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/dateTrunc',
                      },
                      {
                        label: '$dayOfMonth',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/dayOfMonth',
                      },
                      {
                        label: '$dayOfWeek',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/dayOfWeek',
                      },
                      {
                        label: '$dayOfYear',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/dayOfYear',
                      },
                      {
                        label: '$degreesToRadians',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/degreesToRadians',
                      },
                      {
                        label: '$denseRank',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/denseRank',
                      },
                      {
                        label: '$derivative',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/derivative',
                      },
                      {
                        label: '$divide',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/divide',
                      },
                      {
                        label: '$documentNumber',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/documentNumber',
                      },
                      {
                        label: '$encStrContains',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/encStrContains',
                      },
                      {
                        label: '$encStrEndsWith',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/encStrEndsWith',
                      },
                      {
                        label: '$encStrNormalizedEq',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/encStrNormalizedEq',
                      },
                      {
                        label: '$encStrStartsWith',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/encStrStartsWith',
                      },
                      {
                        label: '$eq',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/eq',
                      },
                      {
                        label: '$exp',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/exp',
                      },
                      {
                        label: '$expMovingAvg',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/expMovingAvg',
                      },
                      {
                        label: '$filter',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/filter',
                      },
                      {
                        label: '$floor',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/floor',
                      },
                      {
                        label: '$function',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/function',
                      },
                      {
                        label: '$getField',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/getField',
                      },
                      {
                        label: '$gt',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/gt',
                      },
                      {
                        label: '$gte',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/gte',
                      },
                      {
                        label: '$hour',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/hour',
                      },
                      {
                        label: '$ifNull',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/ifNull',
                      },
                      {
                        label: '$in',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/in',
                      },
                      {
                        label: '$indexOfArray',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/indexOfArray',
                      },
                      {
                        label: '$indexOfBytes',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/indexOfBytes',
                      },
                      {
                        label: '$indexOfCP',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/indexOfCP',
                      },
                      {
                        label: '$integral',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/integral',
                      },
                      {
                        label: '$isArray',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/isArray',
                      },
                      {
                        label: '$isNumber',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/isNumber',
                      },
                      {
                        label: '$isoDayOfWeek',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/isoDayOfWeek',
                      },
                      {
                        label: '$isoWeek',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/isoWeek',
                      },
                      {
                        label: '$isoWeekYear',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/isoWeekYear',
                      },
                      {
                        label: '$let',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/let',
                      },
                      {
                        label: '$linearFill',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/linearFill',
                      },
                      {
                        label: '$literal',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/literal',
                      },
                      {
                        label: '$ln',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/ln',
                      },
                      {
                        label: '$locf',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/locf',
                      },
                      {
                        label: '$log',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/log',
                      },
                      {
                        label: '$log10',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/log10',
                      },
                      {
                        label: '$lt',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/lt',
                      },
                      {
                        label: '$lte',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/lte',
                      },
                      {
                        label: '$ltrim',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/ltrim',
                      },
                      {
                        label: '$map',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/map',
                      },
                      {
                        label: '$maxN-array-element',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/maxN-array-element',
                      },
                      {
                        label: '$meta',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/meta',
                      },
                      {
                        label: '$minN-array-element',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/minN-array-element',
                      },
                      {
                        label: '$minMaxScaler',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/minMaxScaler',
                      },
                      {
                        label: '$millisecond',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/millisecond',
                      },
                      {
                        label: '$minute',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/minute',
                      },
                      {
                        label: '$mod',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/mod',
                      },
                      {
                        label: '$month',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/month',
                      },
                      {
                        label: '$multiply',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/multiply',
                      },
                      {
                        label: '$ne',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/ne',
                      },
                      {
                        label: '$not',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/not',
                      },
                      {
                        label: '$objectToArray',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/objectToArray',
                      },
                      {
                        label: '$or',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/or',
                      },
                      {
                        label: '$pow',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/pow',
                      },
                      {
                        label: '$radiansToDegrees',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/radiansToDegrees',
                      },
                      {
                        label: '$rand',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/rand',
                      },
                      {
                        label: '$range',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/range',
                      },
                      {
                        label: '$rank',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/rank',
                      },
                      {
                        label: '$reduce',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/reduce',
                      },
                      {
                        label: '$regexFind',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/regexFind',
                      },
                      {
                        label: '$regexFindAll',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/regexFindAll',
                      },
                      {
                        label: '$regexMatch',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/regexMatch',
                      },
                      {
                        label: '$replaceOne',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/replaceOne',
                      },
                      {
                        label: '$replaceAll',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/replaceAll',
                      },
                      {
                        label: '$reverseArray',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/reverseArray',
                      },
                      {
                        label: '$round',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/round',
                      },
                      {
                        label: '$rtrim',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/rtrim',
                      },
                      {
                        label: '$sampleRate',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/sampleRate',
                      },
                      {
                        label: '$second',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/second',
                      },
                      {
                        label: '$setDifference',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/setDifference',
                      },
                      {
                        label: '$setEquals',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/setEquals',
                      },
                      {
                        label: '$setField',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/setField',
                      },
                      {
                        label: '$setIntersection',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/setIntersection',
                      },
                      {
                        label: '$setIsSubset',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/setIsSubset',
                      },
                      {
                        label: '$setUnion',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/setUnion',
                      },
                      {
                        label: '$shift',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/shift',
                      },
                      {
                        label: '$sigmoid',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/sigmoid',
                      },
                      {
                        label: '$size',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/size',
                      },
                      {
                        label: '$sin',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/sin',
                      },
                      {
                        label: '$sinh',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/sinh',
                      },
                      {
                        label: '$slice',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/slice',
                      },
                      {
                        label: '$sortArray',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/sortArray',
                      },
                      {
                        label: '$split',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/split',
                      },
                      {
                        label: '$sqrt',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/sqrt',
                      },
                      {
                        label: '$strcasecmp',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/strcasecmp',
                      },
                      {
                        label: '$strLenBytes',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/strLenBytes',
                      },
                      {
                        label: '$strLenCP',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/strLenCP',
                      },
                      {
                        label: '$substr',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/substr',
                      },
                      {
                        label: '$substrBytes',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/substrBytes',
                      },
                      {
                        label: '$substrCP',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/substrCP',
                      },
                      {
                        label: '$subtract',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/subtract',
                      },
                      {
                        label: '$switch',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/switch',
                      },
                      {
                        label: '$tan',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/tan',
                      },
                      {
                        label: '$tanh',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/tanh',
                      },
                      {
                        label: '$toBool',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/toBool',
                      },
                      {
                        label: '$toDate',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/toDate',
                      },
                      {
                        label: '$toDecimal',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/toDecimal',
                      },
                      {
                        label: '$toDouble',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/toDouble',
                      },
                      {
                        label: '$toHashedIndexKey',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/toHashedIndexKey',
                      },
                      {
                        label: '$toInt',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/toInt',
                      },
                      {
                        label: '$toLong',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/toLong',
                      },
                      {
                        label: '$toObjectId',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/toObjectId',
                      },
                      {
                        label: '$toString',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/toString',
                      },
                      {
                        label: '$toLower',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/toLower',
                      },
                      {
                        label: '$toUpper',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/toUpper',
                      },
                      {
                        label: '$toUUID',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/toUUID',
                      },
                      {
                        label: '$tsIncrement',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/tsIncrement',
                      },
                      {
                        label: '$tsSecond',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/tsSecond',
                      },
                      {
                        label: '$trim',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/trim',
                      },
                      {
                        label: '$trunc',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/trunc',
                      },
                      {
                        label: '$type',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/type',
                      },
                      {
                        label: '$unsetField',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/unsetField',
                      },
                      {
                        label: '$week',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/week',
                      },
                      {
                        label: '$year',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/year',
                      },
                      {
                        label: '$zip',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/zip',
                      },
                    ],
                  },
                  {
                    label: 'Projection',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/reference/mql/projection',
                    items: [
                      {
                        label: '$',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/projection/positional',
                      },
                      {
                        label: '$elemMatch',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/projection/elemMatch',
                      },
                      {
                        label: '$slice',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/projection/slice',
                      },
                    ],
                  },
                  {
                    label: 'Accumulators',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/reference/mql/accumulators',
                    items: [
                      {
                        label: '$accumulator',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/accumulator',
                      },
                      {
                        label: '$addToSet',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/addToSet',
                      },
                      {
                        label: '$avg',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/avg',
                      },
                      {
                        label: '$bottom',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/bottom',
                      },
                      {
                        label: '$bottomN',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/bottomN',
                      },
                      {
                        label: '$count',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/count-accumulator',
                      },
                      {
                        label: '$first',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/first',
                      },
                      {
                        label: '$firstN',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/firstN',
                      },
                      {
                        label: '$last',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/last',
                      },
                      {
                        label: '$lastN',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/lastN',
                      },
                      {
                        label: '$max',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/max',
                      },
                      {
                        label: '$maxN',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/maxN',
                      },
                      {
                        label: '$median',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/median',
                      },
                      {
                        label: '$mergeObjects',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/mergeObjects',
                      },
                      {
                        label: '$min',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/min',
                      },
                      {
                        label: '$minN',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/minN',
                      },
                      {
                        label: '$percentile',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/percentile',
                      },
                      {
                        label: '$push',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/push',
                      },
                      {
                        label: '$stdDevPop',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/stdDevPop',
                      },
                      {
                        label: '$stdDevSamp',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/stdDevSamp',
                      },
                      {
                        label: '$sum',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/sum',
                      },
                      {
                        label: '$top',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/top',
                      },
                      {
                        label: '$topN',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/operator/aggregation/topN',
                      },
                    ],
                  },
                  {
                    label: 'Update',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/reference/mql/update',
                    items: [
                      {
                        label: 'Arrays',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/v6.0/reference/operator/update-array',
                        items: [
                          {
                            label: '$ (update)',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/operator/update/positional',
                          },
                          {
                            label: '$[]',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/operator/update/positional-all',
                          },
                          {
                            label: '$[<identifier>]',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/operator/update/positional-filtered',
                          },
                          {
                            label: '$addToSet',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/operator/update/addToSet',
                          },
                          {
                            label: '$pop',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/operator/update/pop',
                          },
                          {
                            label: '$pull',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/operator/update/pull',
                          },
                          {
                            label: '$push',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/operator/update/push',
                          },
                          {
                            label: '$pullAll',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/operator/update/pullAll',
                          },
                          {
                            label: '$each',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/operator/update/each',
                          },
                          {
                            label: '$position',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/operator/update/position',
                          },
                          {
                            label: '$slice',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/operator/update/slice',
                          },
                          {
                            label: '$sort',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/operator/update/sort',
                          },
                        ],
                      },
                      {
                        label: 'Bitwise',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/v6.0/reference/operator/update-bitwise',
                        items: [
                          {
                            label: '$bit',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/operator/update/bit',
                          },
                        ],
                      },
                      {
                        label: 'Fields',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/v6.0/reference/operator/update-field',
                        items: [
                          {
                            label: '$currentDate',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/operator/update/currentDate',
                          },
                          {
                            label: '$inc',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/operator/update/inc',
                          },
                          {
                            label: '$min',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/operator/update/min',
                          },
                          {
                            label: '$max',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/operator/update/max',
                          },
                          {
                            label: '$mul',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/operator/update/mul',
                          },
                          {
                            label: '$rename',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/operator/update/rename',
                          },
                          {
                            label: '$set',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/operator/update/set',
                          },
                          {
                            label: '$setOnInsert',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/operator/update/setOnInsert',
                          },
                          {
                            label: '$unset',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/operator/update/unset',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Server Sessions',
                contentSite: 'docs',
                url: '/docs/v6.0/reference/server-sessions',
              },
              {
                label: 'Slot-Based Query Execution Engine',
                contentSite: 'docs',
                url: '/docs/v6.0/reference/sbe',
              },
              {
                label: 'Stable API',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/reference/stable-api',
                items: [
                  {
                    label: 'Migrate to Later Version',
                    contentSite: 'docs',
                    url: '/docs/v6.0/reference/stable-api-reference',
                  },
                  {
                    label: 'Changelog',
                    contentSite: 'docs',
                    url: '/docs/v6.0/reference/stable-api-changelog',
                  },
                ],
              },
              {
                label: 'System Collections',
                contentSite: 'docs',
                url: '/docs/v6.0/reference/system-collections',
              },
              {
                label: 'Legacy mongo Shell',
                contentSite: 'docs',
                url: '/docs/v6.0/reference/mongo',
              },
              {
                label: 'BSON Types',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/reference/bson-types',
                items: [
                  {
                    label: 'Comparison and Sort Order',
                    contentSite: 'docs',
                    url: '/docs/v6.0/reference/bson-type-comparison-order',
                  },
                  {
                    label: 'Migrate Undefined Data and Queries',
                    contentSite: 'docs',
                    url: '/docs/v6.0/reference/bson-types/migrate-undefined',
                  },
                  {
                    label: 'Extended JSON (v2)',
                    contentSite: 'docs',
                    url: '/docs/v6.0/reference/mongodb-extended-json',
                  },
                  {
                    label: 'Extended JSON (v1)',
                    contentSite: 'docs',
                    url: '/docs/v6.0/reference/mongodb-extended-json-v1',
                  },
                ],
              },
            ],
          },
          {
            label: 'Support',
            contentSite: 'docs',
            collapsible: true,
            url: '/docs/v6.0/support',
            items: [
              {
                label: 'Create a Vulnerability Report',
                contentSite: 'docs',
                url: '/docs/v6.0/tutorial/create-a-vulnerability-report',
              },
            ],
          },
        ],
      },
      {
        label: 'Release Notes',
        contentSite: 'docs',
        group: true,
        items: [
          {
            label: 'Server Release Notes',
            contentSite: 'docs',
            collapsible: true,
            url: '/docs/v6.0/release-notes',
            items: [
              {
                label: '8.3 (Upcoming)',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/release-notes/8.3',
                items: [
                  {
                    label: 'Compatibility Changes',
                    contentSite: 'docs',
                    url: '/docs/v6.0/release-notes/8.3-compatibility',
                  },
                  {
                    label: 'Changelog',
                    contentSite: 'docs',
                    url: '/docs/v6.0/release-notes/8.3-changelog',
                  },
                ],
              },
              {
                label: '8.2 (Stable Release)',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/release-notes/8.2',
                items: [
                  {
                    label: 'Compatibility Changes',
                    contentSite: 'docs',
                    url: '/docs/v6.0/release-notes/8.2-compatibility',
                  },
                  {
                    label: 'Upgrade 8.0 to 8.2',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/release-notes/8.2-upgrade',
                    items: [
                      {
                        label: 'Standalone',
                        contentSite: 'docs',
                        url: '/docs/v6.0/release-notes/8.2-upgrade-standalone',
                      },
                      {
                        label: 'Replica Set',
                        contentSite: 'docs',
                        url: '/docs/v6.0/release-notes/8.2-upgrade-replica-set',
                      },
                      {
                        label: 'Sharded Cluster',
                        contentSite: 'docs',
                        url: '/docs/v6.0/release-notes/8.2-upgrade-sharded-cluster',
                      },
                    ],
                  },
                  {
                    label: 'Downgrade 8.2 to 8.0',
                    contentSite: 'docs',
                    url: '/docs/v6.0/release-notes/8.2-downgrade',
                  },
                  {
                    label: 'Changelog',
                    contentSite: 'docs',
                    url: '/docs/v6.0/release-notes/8.2-changelog',
                  },
                ],
              },
              {
                label: '8.0',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/release-notes/8.0',
                items: [
                  {
                    label: 'Compatibility Changes',
                    contentSite: 'docs',
                    url: '/docs/v6.0/release-notes/8.0-compatibility',
                  },
                  {
                    label: 'Upgrade 7.0 to 8.0',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/release-notes/8.0-upgrade',
                    items: [
                      {
                        label: 'Standalone',
                        contentSite: 'docs',
                        url: '/docs/v6.0/release-notes/8.0-upgrade-standalone',
                      },
                      {
                        label: 'Replica Set',
                        contentSite: 'docs',
                        url: '/docs/v6.0/release-notes/8.0-upgrade-replica-set',
                      },
                      {
                        label: 'Sharded Cluster',
                        contentSite: 'docs',
                        url: '/docs/v6.0/release-notes/8.0-upgrade-sharded-cluster',
                      },
                    ],
                  },
                  {
                    label: 'Downgrade 8.0 to 7.0',
                    contentSite: 'docs',
                    url: '/docs/v6.0/release-notes/8.0-downgrade',
                  },
                  {
                    label: 'Changelog',
                    contentSite: 'docs',
                    url: '/docs/v6.0/release-notes/8.0-changelog',
                  },
                ],
              },
              {
                label: '7.0',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/release-notes/7.0',
                items: [
                  {
                    label: 'Compatibility Changes',
                    contentSite: 'docs',
                    url: '/docs/v6.0/release-notes/7.0-compatibility',
                  },
                  {
                    label: 'Upgrade 6.0 to 7.0',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/release-notes/7.0-upgrade',
                    items: [
                      {
                        label: 'Standalone',
                        contentSite: 'docs',
                        url: '/docs/v6.0/release-notes/7.0-upgrade-standalone',
                      },
                      {
                        label: 'Replica Set',
                        contentSite: 'docs',
                        url: '/docs/v6.0/release-notes/7.0-upgrade-replica-set',
                      },
                      {
                        label: 'Sharded Cluster',
                        contentSite: 'docs',
                        url: '/docs/v6.0/release-notes/7.0-upgrade-sharded-cluster',
                      },
                    ],
                  },
                  {
                    label: 'Downgrade 7.0 to 6.0',
                    contentSite: 'docs',
                    url: '/docs/v6.0/release-notes/7.0-downgrade',
                  },
                  {
                    label: 'Changelog',
                    contentSite: 'docs',
                    url: '/docs/v6.0/release-notes/7.0-changelog',
                  },
                ],
              },
              {
                label: 'Versioning',
                contentSite: 'docs',
                url: '/docs/v6.0/reference/versioning',
              },
            ],
          },
        ],
      },
      {
        label: 'Self-Managed Deployments',
        contentSite: 'docs',
        group: true,
        items: [
          {
            label: 'Installation',
            contentSite: 'docs',
            collapsible: true,
            url: '/docs/v6.0/installation',
            items: [
              {
                label: 'Community Edition',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/administration/install-community',
                items: [
                  {
                    label: 'Install on Linux',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/administration/install-on-linux',
                    items: [
                      {
                        label: 'Install on Red Hat',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/install-mongodb-on-red-hat',
                      },
                      {
                        label: 'Install on Ubuntu',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/v6.0/tutorial/install-mongodb-on-ubuntu',
                        items: [
                          {
                            label: 'Troubleshoot Ubuntu Installation',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/installation-ubuntu-community-troubleshooting',
                          },
                        ],
                      },
                      {
                        label: 'Install on Debian',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/install-mongodb-on-debian',
                      },
                      {
                        label: 'Install on SUSE',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/install-mongodb-on-suse',
                      },
                      {
                        label: 'Install on Amazon',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/install-mongodb-on-amazon',
                      },
                    ],
                  },
                  {
                    label: 'Install on macOS',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/install-mongodb-on-os-x',
                  },
                  {
                    label: 'Install on Windows',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/install-mongodb-on-windows',
                  },
                  {
                    label: 'Install with Docker',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/install-mongodb-community-with-docker',
                  },
                  {
                    label: 'Connect to Search',
                    contentSite: 'docs',
                    url: '/docs/v6.0/core/search-in-community/connect-to-search',
                  },
                  {
                    label: 'Deploy Replica Set for Search',
                    contentSite: 'docs',
                    url: '/docs/v6.0/core/search-in-community/deploy-rs-keyfile-mongot',
                  },
                ],
              },
              {
                label: 'Enterprise',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/administration/install-enterprise',
                items: [
                  {
                    label: 'Install on Linux',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/administration/install-enterprise-linux',
                    items: [
                      {
                        label: 'Install on Red Hat',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/v6.0/tutorial/install-mongodb-enterprise-on-red-hat',
                        items: [
                          {
                            label: 'Install using .tgz Tarball',
                            contentSite: 'docs',
                            url: '/docs/v6.0/tutorial/install-mongodb-enterprise-on-red-hat-tarball',
                          },
                        ],
                      },
                      {
                        label: 'Install on Ubuntu',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/v6.0/tutorial/install-mongodb-enterprise-on-ubuntu',
                        items: [
                          {
                            label: 'Install using .tgz Tarball',
                            contentSite: 'docs',
                            url: '/docs/v6.0/tutorial/install-mongodb-enterprise-on-ubuntu-tarball',
                          },
                        ],
                      },
                      {
                        label: 'Install on Debian',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/v6.0/tutorial/install-mongodb-enterprise-on-debian',
                        items: [
                          {
                            label: 'Install using .tgz Tarball',
                            contentSite: 'docs',
                            url: '/docs/v6.0/tutorial/install-mongodb-enterprise-on-debian-tarball',
                          },
                        ],
                      },
                      {
                        label: 'Install on SUSE',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/v6.0/tutorial/install-mongodb-enterprise-on-suse',
                        items: [
                          {
                            label: 'Install using .tgz Tarball',
                            contentSite: 'docs',
                            url: '/docs/v6.0/tutorial/install-mongodb-enterprise-on-suse-tarball',
                          },
                        ],
                      },
                      {
                        label: 'Install on Amazon',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/v6.0/tutorial/install-mongodb-enterprise-on-amazon',
                        items: [
                          {
                            label: 'Install using .tgz Tarball',
                            contentSite: 'docs',
                            url: '/docs/v6.0/tutorial/install-mongodb-enterprise-on-amazon-tarball',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    label: 'Install on macOS',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/install-mongodb-enterprise-on-os-x',
                  },
                  {
                    label: 'Install on Windows',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/tutorial/install-mongodb-enterprise-on-windows',
                    items: [
                      {
                        label: 'Install using msiexec.exe',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/install-mongodb-enterprise-on-windows-unattended',
                      },
                      {
                        label: 'Install From Zip File',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/install-mongodb-enterprise-on-windows-zip',
                      },
                    ],
                  },
                  {
                    label: 'Install with Docker',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/install-mongodb-enterprise-with-docker',
                  },
                ],
              },
              {
                label: 'Upgrade Community to Enterprise',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/administration/upgrade-community-to-enterprise',
                items: [
                  {
                    label: 'Standalone',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/upgrade-to-enterprise-standalone',
                  },
                  {
                    label: 'Replica Set',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/upgrade-to-enterprise-replica-set',
                  },
                  {
                    label: 'Sharded Cluster',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/upgrade-to-enterprise-sharded-cluster',
                  },
                ],
              },
              {
                label: 'Verify Package Integrity',
                contentSite: 'docs',
                collapsible: true,
                items: [
                  {
                    label: 'Verify MongoDB Package Integrity',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/verify-mongodb-packages',
                  },
                  {
                    label: 'Verify mongot Package Integrity',
                    contentSite: 'docs',
                    url: '/docs/v6.0/core/search-in-community/verify-mongot-packages',
                  },
                ],
              },
              {
                label: 'MongoDB Package Components',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/reference/program',
                items: [
                  {
                    label: 'mongod',
                    contentSite: 'docs',
                    url: '/docs/v6.0/reference/program/mongod',
                  },
                  {
                    label: 'mongos',
                    contentSite: 'docs',
                    url: '/docs/v6.0/reference/program/mongos',
                  },
                  {
                    label: 'mongod.exe',
                    contentSite: 'docs',
                    url: '/docs/v6.0/reference/program/mongod.exe',
                  },
                  {
                    label: 'mongos.exe',
                    contentSite: 'docs',
                    url: '/docs/v6.0/reference/program/mongos.exe',
                  },
                  {
                    label: 'mongokerberos',
                    contentSite: 'docs',
                    url: '/docs/v6.0/reference/program/mongokerberos',
                  },
                  {
                    label: 'mongoldap',
                    contentSite: 'docs',
                    url: '/docs/v6.0/reference/program/mongoldap',
                  },
                  {
                    label: 'install_compass',
                    contentSite: 'docs',
                    url: '/docs/v6.0/reference/program/install_compass',
                  },
                ],
              },
            ],
          },
          {
            label: 'Clusters',
            contentSite: 'docs',
            collapsible: true,
            items: [
              {
                label: 'Replication',
                contentSite: 'docs',
                collapsible: true,
                items: [
                  {
                    label: 'Deployment Architectures',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/core/replica-set-architectures',
                    items: [
                      {
                        label: 'Three Members',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/replica-set-architecture-three-members',
                      },
                      {
                        label: 'Distributed Data Centers',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/replica-set-architecture-geographically-distributed',
                      },
                    ],
                  },
                  {
                    label: 'High Availability',
                    contentSite: 'docs',
                    collapsible: true,
                    items: [
                      {
                        label: 'Elections',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/replica-set-elections',
                      },
                      {
                        label: 'Failover Rollbacks',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/replica-set-rollbacks',
                      },
                    ],
                  },
                  {
                    label: 'Replica Set Deployment Tutorials',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/administration/replica-set-deployment',
                    items: [
                      {
                        label: 'Deploy a Replica Set',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/deploy-replica-set',
                      },
                      {
                        label: 'Deploy a Replica Set for Testing and Development',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/deploy-replica-set-for-testing',
                      },
                      {
                        label: 'Deploy a Geographically Redundant Replica Set',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/deploy-geographically-distributed-replica-set',
                      },
                      {
                        label: 'Add an Arbiter to a Replica Set',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/add-replica-set-arbiter',
                      },
                      {
                        label: 'Convert a Standalone mongod to a Replica Set',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/convert-standalone-to-replica-set',
                      },
                      {
                        label: 'Add Members to a Replica Set',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/expand-replica-set',
                      },
                      {
                        label: 'Remove Members from a Replica Set',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/remove-replica-set-member',
                      },
                      {
                        label: 'Replace a Replica Set Member',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/replace-replica-set-member',
                      },
                    ],
                  },
                  {
                    label: 'Member Configuration Tutorials',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/administration/replica-set-member-configuration',
                    items: [
                      {
                        label: 'Adjust Priority for Replica Set Member',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/adjust-replica-set-member-priority',
                      },
                      {
                        label: 'Prevent Secondary from Becoming Primary',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/configure-secondary-only-replica-set-member',
                      },
                      {
                        label: 'Configure a Hidden Replica Set Member',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/configure-a-hidden-replica-set-member',
                      },
                      {
                        label: 'Configure a Delayed Replica Set Member',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/configure-a-delayed-replica-set-member',
                      },
                      {
                        label: 'Configure Non-Voting Replica Set Member',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/configure-a-non-voting-replica-set-member',
                      },
                      {
                        label: 'Convert a Secondary to an Arbiter',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/convert-secondary-into-arbiter',
                      },
                    ],
                  },
                  {
                    label: 'Replica Set Maintenance Tutorials',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/administration/replica-set-maintenance',
                    items: [
                      {
                        label: 'Change the Size of the Oplog',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/change-oplog-size',
                      },
                      {
                        label: 'Perform Maintenance on Replica Set Members',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/perform-maintence-on-replica-set-members',
                      },
                      {
                        label: 'Force a Member to Become Primary',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/force-member-to-be-primary',
                      },
                      {
                        label: 'Resync a Member of a Replica Set',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/resync-replica-set-member',
                      },
                      {
                        label: 'Configure Replica Set Tag Sets',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/configure-replica-set-tag-sets',
                      },
                      {
                        label: 'Reconfigure a Replica Set with Unavailable Members',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/reconfigure-replica-set-with-unavailable-members',
                      },
                      {
                        label: 'Manage Chained Replication',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/manage-chained-replication',
                      },
                      {
                        label: 'Change Hostnames in a Replica Set',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/change-hostnames-in-a-replica-set',
                      },
                      {
                        label: "Configure a Secondary's Sync Target",
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/configure-replica-set-secondary-sync-target',
                      },
                      {
                        label: 'Rename a Replica Set',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/rename-unsharded-replica-set',
                      },
                      {
                        label: 'Modify PSA Replica Set Safely',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/modify-psa-replica-set-safely',
                      },
                      {
                        label: 'Mitigate Performance Issues with PSA Replica Set',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/mitigate-psa-performance-issues',
                      },
                    ],
                  },
                  {
                    label: 'View Configuration',
                    contentSite: 'docs',
                    url: '/docs/v6.0/reference/replica-configuration',
                  },
                  {
                    label: 'Replica Set Protocol Version',
                    contentSite: 'docs',
                    url: '/docs/v6.0/reference/replica-set-protocol-versions',
                  },
                  {
                    label: 'Troubleshoot',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/troubleshoot-replica-sets',
                  },
                ],
              },
              {
                label: 'Performance',
                contentSite: 'docs',
                collapsible: true,
                items: [
                  {
                    label: 'Manage Sharded Cluster Health with Health Managers',
                    contentSite: 'docs',
                    url: '/docs/v6.0/administration/health-managers',
                  },
                  {
                    label: 'Configure the Rate Limiter',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/configure-rate-limiter',
                  },
                  {
                    label: 'UNIX ulimit Settings',
                    contentSite: 'docs',
                    url: '/docs/v6.0/reference/ulimit',
                  },
                  {
                    label: 'TCMalloc Performance',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/administration/tcmalloc-performance',
                    items: [
                      {
                        label: 'Disable Transparent Huge Pages',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/disable-transparent-huge-pages',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Configuration and Maintenance',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/administration/self-managed-configuration-and-maintenance',
                items: [
                  {
                    label: 'Run-time Database Configuration',
                    contentSite: 'docs',
                    url: '/docs/v6.0/administration/configuration',
                  },
                  {
                    label: 'Upgrade to the Latest Patch Release of MongoDB',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/upgrade-revision',
                  },
                  {
                    label: 'Manage mongod Processes',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/manage-mongodb-processes',
                  },
                  {
                    label: 'Configuration File Options',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/reference/configuration-options',
                    items: [
                      {
                        label: 'Externally Sourced Configuration File Values',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/expansion-directives',
                      },
                      {
                        label: 'Convert Command-Line Options to YAML',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/convert-command-line-options-to-yaml',
                      },
                      {
                        label: 'Configuration File Settings and Command-Line Options Mapping',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/configuration-file-settings-command-line-options-mapping',
                      },
                    ],
                  },
                  {
                    label: 'MongoDB Server Parameters',
                    contentSite: 'docs',
                    url: '/docs/v6.0/reference/parameters',
                  },
                  {
                    label: 'MongoDB Cluster Parameters',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/reference/cluster-parameters',
                    items: [
                      {
                        label: 'auditConfig',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/cluster-parameters/auditConfig',
                      },
                      {
                        label: 'changeStreamOptions',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/cluster-parameters/changeStreamOptions',
                      },
                      {
                        label: 'defaultMaxTimeMS',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/cluster-parameters/defaultMaxTimeMS',
                      },
                      {
                        label: 'fleDisableSubstringPreviewParameterLimits',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/cluster-parameters/fleDisableSubstringPreviewParameterLimits',
                      },
                    ],
                  },
                  {
                    label: 'Workload Isolation',
                    contentSite: 'docs',
                    url: '/docs/v6.0/core/workload-isolation',
                  },
                ],
              },
            ],
          },
          {
            label: 'Scaling',
            contentSite: 'docs',
            collapsible: true,
            items: [
              {
                label: 'Sharding',
                contentSite: 'docs',
                collapsible: true,
                items: [
                  {
                    label: 'Deploy a Sharded Cluster',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/tutorial/deploy-shard-cluster',
                    items: [
                      {
                        label: 'Tiered Hardware for Varying SLA or SLO',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/sharding-tiered-hardware-for-varying-slas',
                      },
                    ],
                  },
                  {
                    label: 'Zones',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/core/zone-sharding',
                    items: [
                      {
                        label: 'Manage',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/v6.0/tutorial/manage-shard-zone',
                        items: [
                          {
                            label: 'Update Shard Zone',
                            contentSite: 'docs',
                            url: '/docs/v6.0/tutorial/manage-shard-zone/update-existing-shard-zone',
                          },
                        ],
                      },
                      {
                        label: 'Segment by Location',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/sharding-segmenting-data-by-location',
                      },
                      {
                        label: 'Segment by Application or Customer',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/sharding-segmenting-shards',
                      },
                      {
                        label: 'Distributed Local Writes for Insert-Only Workloads',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/sharding-high-availability-writes',
                      },
                      {
                        label: 'Distribute Collections',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/sharding-distribute-collections-with-zones',
                      },
                    ],
                  },
                  {
                    label: 'Sharding Administration',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/administration/sharded-cluster-administration',
                    items: [
                      {
                        label: 'Scaling Strategies',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/v6.0/core/sharding-scaling-strategies',
                        items: [
                          {
                            label: 'Start with Sharded Clusters',
                            contentSite: 'docs',
                            url: '/docs/v6.0/core/sharding-start-with-sharding',
                          },
                          {
                            label: 'Manage Unsharded Collections',
                            contentSite: 'docs',
                            url: '/docs/v6.0/core/sharding-manage-unsharded-collections',
                          },
                          {
                            label: 'Distribute Collection Data',
                            contentSite: 'docs',
                            url: '/docs/v6.0/core/sharding-distribute-collection-data',
                          },
                          {
                            label: 'Consolidate Collection Data',
                            contentSite: 'docs',
                            url: '/docs/v6.0/core/sharding-consolidate-collection-data',
                          },
                        ],
                      },
                      {
                        label: 'View Cluster Configuration',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/view-sharded-cluster-configuration',
                      },
                      {
                        label: 'Add Shards',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/add-shards-to-shard-cluster',
                      },
                      {
                        label: 'Add a Member to a Shard',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/add-member-to-shard',
                      },
                      {
                        label: 'Remove Shards',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/remove-shards-from-cluster',
                      },
                      {
                        label: 'Clear jumbo Flag',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/clear-jumbo-flag',
                      },
                      {
                        label: 'Config Shard',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/v6.0/core/config-shard',
                        items: [
                          {
                            label: 'Convert a Replica Set to a Sharded Cluster with an Embedded Config Server',
                            contentSite: 'docs',
                            url: '/docs/v6.0/tutorial/convert-replica-set-to-embedded-config-server',
                          },
                        ],
                      },
                      {
                        label: 'Start with a Config Shard',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/start-a-sharded-cluster-with-config-shard',
                      },
                      {
                        label: 'Reshard to the Same Shard Key',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/reshard-to-same-key',
                      },
                      {
                        label: 'Reshard a Collection back to the Same Shard Key',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/resharding-back-to-same-key',
                      },
                      {
                        label: 'Resharding for Adding and Removing Shards',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/resharding-for-adding-and-removing-shards',
                      },
                    ],
                  },
                  {
                    label: 'Replace a Config Server',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/replace-config-server',
                  },
                  {
                    label: 'Restart a Sharded Cluster',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/restart-sharded-cluster',
                  },
                  {
                    label: 'Migrate a Sharded Cluster to Different Hardware',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/migrate-sharded-cluster-to-new-hardware',
                  },
                  {
                    label: 'Back Up Cluster Metadata',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/backup-sharded-cluster-metadata',
                  },
                  {
                    label: 'Convert a Sharded Cluster to Replica Set',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/convert-sharded-cluster-to-replica-set',
                  },
                  {
                    label: 'Convert a Replica Set to a Sharded Cluster',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/convert-replica-set-to-replicated-shard-cluster',
                  },
                  {
                    label: 'Reference',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/reference/sharding',
                    items: [
                      {
                        label: 'Config Database',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/config-database',
                      },
                      {
                        label: 'Defragment Sharded Collections',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/v6.0/core/defragment-sharded-collections',
                        items: [
                          {
                            label: 'Start',
                            contentSite: 'docs',
                            url: '/docs/v6.0/core/defragment-sharded-collections/start-defragmenting-sharded-collection',
                          },
                          {
                            label: 'Monitor',
                            contentSite: 'docs',
                            url: '/docs/v6.0/core/defragment-sharded-collections/monitor-defragmentation-sharded-collection',
                          },
                          {
                            label: 'Stop',
                            contentSite: 'docs',
                            url: '/docs/v6.0/core/defragment-sharded-collections/stop-defragmenting-sharded-collection',
                          },
                        ],
                      },
                      {
                        label: 'Inconsistency Types',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/v6.0/reference/inconsistency-type',
                        items: [
                          {
                            label: 'CollectionAuxiliaryMetadataMismatch',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/inconsistency-type/CollectionAuxiliaryMetadataMismatch',
                          },
                          {
                            label: 'CollectionOptionsMismatch',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/inconsistency-type/CollectionOptionsMismatch',
                          },
                          {
                            label: 'CollectionUUIDMismatch',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/inconsistency-type/CollectionUUIDMismatch',
                          },
                          {
                            label: 'CorruptedChunkShardKey',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/inconsistency-type/CorruptedChunkShardKey',
                          },
                          {
                            label: 'CorruptedZoneShardKey',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/inconsistency-type/CorruptedZoneShardKey',
                          },
                          {
                            label: 'HiddenShardedCollection',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/inconsistency-type/HiddenShardedCollection',
                          },
                          {
                            label: 'InconsistentIndex',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/inconsistency-type/InconsistentIndex',
                          },
                          {
                            label: 'MisplacedCollection',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/inconsistency-type/MisplacedCollection',
                          },
                          {
                            label: 'MissingLocalCollection',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/inconsistency-type/MissingLocalCollection',
                          },
                          {
                            label: 'MissingRoutingTable',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/inconsistency-type/MissingRoutingTable',
                          },
                          {
                            label: 'MissingShardKeyIndex',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/inconsistency-type/MissingShardKeyIndex',
                          },
                          {
                            label: 'RangeDeletionMissingShardKeyIndex',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/inconsistency-type/RangeDeletionMissingShardKeyIndex',
                          },
                          {
                            label: 'RoutingTableMissingMaxKey',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/inconsistency-type/RoutingTableMissingMaxKey',
                          },
                          {
                            label: 'RoutingTableMissingMinKey',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/inconsistency-type/RoutingTableMissingMinKey',
                          },
                          {
                            label: 'RoutingTableRangeGap',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/inconsistency-type/RoutingTableRangeGap',
                          },
                          {
                            label: 'RoutingTableRangeOverlap',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/inconsistency-type/RoutingTableRangeOverlap',
                          },
                          {
                            label: 'ShardCatalogCacheCollectionMetadataMismatch',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/inconsistency-type/ShardCatalogCacheCollectionMetadataMismatch/',
                          },
                          {
                            label: 'ShardMissingCollectionRoutingInfo',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/inconsistency-type/ShardMissingCollectionRoutingInfo',
                          },
                          {
                            label: 'TrackedUnshardedCollectionHasInvalidKey',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/inconsistency-type/TrackedUnshardedCollectionHasInvalidKey',
                          },
                          {
                            label: 'TrackedUnshardedCollectionHasMultipleChunks',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/inconsistency-type/TrackedUnshardedCollectionHasMultipleChunks',
                          },
                          {
                            label: 'ZonesRangeOverlap',
                            contentSite: 'docs',
                            url: '/docs/v6.0/reference/inconsistency-type/ZonesRangeOverlap',
                          },
                        ],
                      },
                      {
                        label: 'Operational Restrictions',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/sharded-cluster-requirements',
                      },
                      {
                        label: 'Troubleshoot Sharded Clusters',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/troubleshoot-sharded-clusters',
                      },
                      {
                        label: 'Node Direct Commands',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/supported-shard-direct-commands',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'mongot Deployment Sizing',
                contentSite: 'docs',
                collapsible: true,
                items: [
                  {
                    label: 'Introduction',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/mongot-sizing/introduction',
                  },
                  {
                    label: 'Quickstart',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/mongot-sizing/quick-start',
                  },
                  {
                    label: 'Advanced Guidance',
                    contentSite: 'docs',
                    collapsible: true,
                    items: [
                      {
                        label: 'Architecture Patterns',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/mongot-sizing/advanced-guidance/architecture',
                      },
                      {
                        label: 'Resource Allocation',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/mongot-sizing/advanced-guidance/resource-allocation',
                      },
                      {
                        label: 'Hardware',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/mongot-sizing/advanced-guidance/hardware',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            label: 'Storage',
            contentSite: 'docs',
            collapsible: true,
            items: [
              {
                label: 'Storage Engines',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/core/storage-engines',
                items: [
                  {
                    label: 'WiredTiger Storage Engine',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/core/wiredtiger',
                    items: [
                      {
                        label: 'Change Standalone to WiredTiger',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/change-standalone-wiredtiger',
                      },
                      {
                        label: 'Change Replica Set to WiredTiger',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/change-replica-set-wiredtiger',
                      },
                      {
                        label: 'Change Sharded Cluster to WiredTiger',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/change-sharded-cluster-wiredtiger',
                      },
                    ],
                  },
                  {
                    label: 'In-Memory Storage Engine',
                    contentSite: 'docs',
                    url: '/docs/v6.0/core/inmemory',
                  },
                ],
              },
              {
                label: 'Encryption at Rest',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/core/security-encryption-at-rest',
                items: [
                  {
                    label: 'Configure',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/configure-encryption',
                  },
                  {
                    label: 'Rotate Keys',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/rotate-encryption-key',
                  },
                ],
              },
              {
                label: 'Journaling',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/core/journaling',
                items: [
                  {
                    label: 'Manage Journaling',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/manage-journaling',
                  },
                ],
              },
              {
                label: 'FAQ: MongoDB Storage',
                contentSite: 'docs',
                url: '/docs/v6.0/faq/storage',
              },
            ],
          },
          {
            label: 'Backup and Restore',
            contentSite: 'docs',
            collapsible: true,
            url: '/docs/v6.0/core/backups',
            items: [
              {
                label: 'Back Up and Restore with Filesystem Snapshots',
                contentSite: 'docs',
                url: '/docs/v6.0/tutorial/backup-with-filesystem-snapshots',
              },
              {
                label: 'Back Up and Restore with MongoDB Tools',
                contentSite: 'docs',
                url: '/docs/v6.0/tutorial/backup-and-restore-tools',
              },
              {
                label: 'Restore a Replica Set from MongoDB Backups',
                contentSite: 'docs',
                url: '/docs/v6.0/tutorial/restore-replica-set-from-backup',
              },
              {
                label: 'Backup and Restore Sharded Clusters',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/administration/backup-sharded-clusters',
                items: [
                  {
                    label: 'Back Up a Sharded Cluster with File System Snapshots',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/backup-sharded-cluster-with-filesystem-snapshots',
                  },
                  {
                    label: 'Back Up a Sharded Cluster with Database Dumps',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/backup-sharded-cluster-with-database-dumps',
                  },
                  {
                    label: 'Schedule Backup Window for Sharded Clusters',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/schedule-backup-window-for-sharded-clusters',
                  },
                  {
                    label: 'Restore a Sharded Cluster',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/restore-sharded-cluster',
                  },
                ],
              },
              {
                label: 'Recover a Standalone after an Unexpected Shutdown',
                contentSite: 'docs',
                url: '/docs/v6.0/tutorial/recover-data-following-unexpected-shutdown',
              },
            ],
          },
          {
            label: 'Monitor Clusters',
            contentSite: 'docs',
            collapsible: true,
            url: '/docs/v6.0/administration/monitoring',
            items: [
              {
                label: 'FAQ: MongoDB Diagnostics',
                contentSite: 'docs',
                url: '/docs/v6.0/faq/diagnostics',
              },
              {
                label: 'Management',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/administration/configuration-and-maintenance',
                items: [
                  {
                    label: 'Terminate Operations',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/terminate-running-operations',
                  },
                  {
                    label: 'Rotate Log Files',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/rotate-log-files',
                  },
                ],
              },
              {
                label: 'Full Time Diagnostic Data Capture',
                contentSite: 'docs',
                url: '/docs/v6.0/administration/full-time-diagnostic-data-capture',
              },
            ],
          },
          {
            label: 'Security',
            contentSite: 'docs',
            collapsible: true,
            url: '/docs/v6.0/core/self-managed-security',
            items: [
              {
                label: 'Security Checklist',
                contentSite: 'docs',
                url: '/docs/v6.0/administration/security-checklist',
              },
              {
                label: 'Enable Access Control',
                contentSite: 'docs',
                url: '/docs/v6.0/tutorial/enable-authentication',
              },
              {
                label: 'Users',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/core/security-users',
                items: [
                  {
                    label: 'Authentication',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/core/authentication',
                    items: [
                      {
                        label: 'Create',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/create-users',
                      },
                      {
                        label: 'Authenticate',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/authenticate-a-user',
                      },
                      {
                        label: 'List',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/list-users',
                      },
                      {
                        label: 'SCRAM',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/v6.0/core/security-scram',
                        items: [
                          {
                            label: 'Authenticate Clients',
                            contentSite: 'docs',
                            url: '/docs/v6.0/tutorial/configure-scram-client-authentication',
                          },
                        ],
                      },
                      {
                        label: 'x.509',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/v6.0/core/security-x.509',
                        items: [
                          {
                            label: 'Authenticate Clients',
                            contentSite: 'docs',
                            url: '/docs/v6.0/tutorial/configure-x509-client-authentication',
                          },
                        ],
                      },
                      {
                        label: 'Kerberos',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/v6.0/core/kerberos',
                        items: [
                          {
                            label: 'Configure on Linux',
                            contentSite: 'docs',
                            url: '/docs/v6.0/tutorial/control-access-to-mongodb-with-kerberos-authentication',
                          },
                          {
                            label: 'Configure on Windows',
                            contentSite: 'docs',
                            url: '/docs/v6.0/tutorial/control-access-to-mongodb-windows-with-kerberos-authentication',
                          },
                          {
                            label: 'Troubleshoot',
                            contentSite: 'docs',
                            url: '/docs/v6.0/tutorial/troubleshoot-kerberos',
                          },
                          {
                            label: 'Use Active Directory Authorization',
                            contentSite: 'docs',
                            url: '/docs/v6.0/tutorial/kerberos-auth-activedirectory-authz',
                          },
                        ],
                      },
                      {
                        label: 'LDAP Proxy',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/v6.0/core/security-ldap',
                        items: [
                          {
                            label: 'Use ActiveDirectory',
                            contentSite: 'docs',
                            url: '/docs/v6.0/tutorial/configure-ldap-sasl-activedirectory',
                          },
                          {
                            label: 'Use OpenLDAP',
                            contentSite: 'docs',
                            url: '/docs/v6.0/tutorial/configure-ldap-sasl-openldap',
                          },
                          {
                            label: 'Use Native LDAP',
                            contentSite: 'docs',
                            url: '/docs/v6.0/tutorial/authenticate-nativeldap-activedirectory',
                          },
                        ],
                      },
                      {
                        label: 'OIDC/OAuth 2.0',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/v6.0/core/oidc/security-oidc',
                        items: [
                          {
                            label: 'Workforce (Humans)',
                            contentSite: 'docs',
                            collapsible: true,
                            url: '/docs/v6.0/core/oidc/workforce',
                            items: [
                              {
                                label: 'Configure an External Identity Provider for Workforce Authentication',
                                contentSite: 'docs',
                                url: '/docs/v6.0/core/oidc/workforce/workforce-external-provider',
                              },
                              {
                                label: 'Configure MongoDB with Workforce Identity Federation',
                                contentSite: 'docs',
                                url: '/docs/v6.0/core/oidc/workforce/configure-oidc',
                              },
                              {
                                label: 'Authorize Users with Workforce Identity Federation',
                                contentSite: 'docs',
                                url: '/docs/v6.0/core/oidc/workforce/database-user-workforce',
                              },
                            ],
                          },
                          {
                            label: 'Workload (Applications)',
                            contentSite: 'docs',
                            collapsible: true,
                            url: '/docs/v6.0/core/oidc/workload',
                            items: [
                              {
                                label: 'Configure an External Identity Provider for Workload Authentication',
                                contentSite: 'docs',
                                url: '/docs/v6.0/core/oidc/workload/workload-external-provider',
                              },
                              {
                                label: 'Configure MongoDB with Workload Identity Federation',
                                contentSite: 'docs',
                                url: '/docs/v6.0/core/oidc/workload/configure-mongodb-workload',
                              },
                              {
                                label: 'Authorize Users with Workload Identity Federation',
                                contentSite: 'docs',
                                url: '/docs/v6.0/core/oidc/workload/database-user-workload',
                              },
                            ],
                          },
                        ],
                      },
                      {
                        label: 'Internal',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/v6.0/core/security-internal-authentication',
                        items: [
                          {
                            label: 'Deploy Replica Set',
                            contentSite: 'docs',
                            url: '/docs/v6.0/tutorial/deploy-replica-set-with-keyfile-access-control',
                          },
                          {
                            label: 'Update Replica Set',
                            contentSite: 'docs',
                            url: '/docs/v6.0/tutorial/enforce-keyfile-access-control-in-existing-replica-set',
                          },
                          {
                            label: 'Update Replica Set (No Downtime)',
                            contentSite: 'docs',
                            url: '/docs/v6.0/tutorial/enforce-keyfile-access-control-in-existing-replica-set-without-downtime',
                          },
                          {
                            label: 'Deploy Sharded Cluster',
                            contentSite: 'docs',
                            url: '/docs/v6.0/tutorial/deploy-sharded-cluster-with-keyfile-access-control',
                          },
                          {
                            label: 'Update Sharded Cluster',
                            contentSite: 'docs',
                            url: '/docs/v6.0/tutorial/enforce-keyfile-access-control-in-existing-sharded-cluster',
                          },
                          {
                            label: 'Update Sharded Cluster (No Downtime)',
                            contentSite: 'docs',
                            url: '/docs/v6.0/tutorial/enforce-keyfile-access-control-in-existing-sharded-cluster-no-downtime',
                          },
                          {
                            label: 'Rotate Replica Set Keys',
                            contentSite: 'docs',
                            url: '/docs/v6.0/tutorial/rotate-key-replica-set',
                          },
                          {
                            label: 'Rotate Sharded Cluster Keys',
                            contentSite: 'docs',
                            url: '/docs/v6.0/tutorial/rotate-key-sharded-cluster',
                          },
                          {
                            label: 'Use X.509',
                            contentSite: 'docs',
                            url: '/docs/v6.0/tutorial/configure-x509-member-authentication',
                          },
                          {
                            label: 'Upgrade to X.509 from Keyfile',
                            contentSite: 'docs',
                            url: '/docs/v6.0/tutorial/upgrade-keyfile-to-x509',
                          },
                          {
                            label: 'Rotate X.509 with New DN',
                            contentSite: 'docs',
                            url: '/docs/v6.0/tutorial/rotate-x509-membership-certificates',
                          },
                          {
                            label: 'Rotate X.509 with New clusterAuthX509 Attributes',
                            contentSite: 'docs',
                            url: '/docs/v6.0/tutorial/rotate-x509-member-cert',
                          },
                          {
                            label: 'Rotate X.509 to Use Extension Values',
                            contentSite: 'docs',
                            url: '/docs/v6.0/tutorial/rotate-x509-to-extensionValue',
                          },
                        ],
                      },
                      {
                        label: 'Localhost Exception',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/localhost-exception',
                      },
                    ],
                  },
                  {
                    label: 'Authorization',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/core/authorization',
                    items: [
                      {
                        label: 'User Defined Roles',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/security-user-defined-roles',
                      },
                      {
                        label: 'Manage Users & Roles',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/manage-users-and-roles',
                      },
                      {
                        label: 'Change Password & Custom Data',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/change-own-password-and-custom-data',
                      },
                      {
                        label: 'Collection-Level Access',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/collection-level-access-control',
                      },
                      {
                        label: 'LDAP Authorization',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/security-ldap-external',
                      },
                      {
                        label: 'LDAP Deprecation',
                        contentSite: 'docs',
                        url: '/docs/v6.0/core/LDAP-deprecation',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Network & Configuration Hardening',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/core/security-hardening',
                items: [
                  {
                    label: 'IP Binding',
                    contentSite: 'docs',
                    url: '/docs/v6.0/core/security-mongodb-configuration',
                  },
                  {
                    label: 'Use Linux iptables',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/configure-linux-iptables-firewall',
                  },
                  {
                    label: 'Use Windows netsh',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/configure-windows-netsh-firewall',
                  },
                  {
                    label: 'TLS/SSL',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/core/security-transport-encryption',
                    items: [
                      {
                        label: 'Configure mongod & mongos',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/configure-ssl',
                      },
                      {
                        label: 'Develop Locally with TLS',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/develop-mongodb-locally-with-tls',
                      },
                      {
                        label: 'Configure Clients',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/configure-ssl-clients',
                      },
                      {
                        label: 'Upgrade Cluster',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/upgrade-cluster-to-ssl',
                      },
                      {
                        label: 'Configure for FIPS',
                        contentSite: 'docs',
                        url: '/docs/v6.0/tutorial/configure-fips',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Auditing',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/core/auditing',
                items: [
                  {
                    label: 'Configure',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/configure-auditing',
                  },
                  {
                    label: 'Configure Filters',
                    contentSite: 'docs',
                    url: '/docs/v6.0/tutorial/configure-audit-filters',
                  },
                  {
                    label: 'Audit Messages',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/v6.0/reference/audit-message',
                    items: [
                      {
                        label: 'mongo Schema',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/audit-message/mongo',
                      },
                      {
                        label: 'OSCF Schema',
                        contentSite: 'docs',
                        url: '/docs/v6.0/reference/audit-message/ocsf',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Reference',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/reference/security',
                items: [
                  {
                    label: 'systems.roles Collection',
                    contentSite: 'docs',
                    url: '/docs/v6.0/reference/system-roles-collection',
                  },
                  {
                    label: 'systems.users Collection',
                    contentSite: 'docs',
                    url: '/docs/v6.0/reference/system-users-collection',
                  },
                  {
                    label: 'Resource Document',
                    contentSite: 'docs',
                    url: '/docs/v6.0/reference/resource-document',
                  },
                ],
              },
              {
                label: 'Appendix',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/v6.0/appendix/security',
                items: [
                  {
                    label: 'OpenSSL CA',
                    contentSite: 'docs',
                    url: '/docs/v6.0/appendix/security/appendixA-openssl-ca',
                  },
                  {
                    label: 'OpenSSL Server',
                    contentSite: 'docs',
                    url: '/docs/v6.0/appendix/security/appendixB-openssl-server',
                  },
                  {
                    label: 'OpenSSL Client',
                    contentSite: 'docs',
                    url: '/docs/v6.0/appendix/security/appendixC-openssl-client',
                  },
                ],
              },
            ],
          },
          {
            label: 'Operations Checklist',
            contentSite: 'docs',
            url: '/docs/v6.0/administration/production-checklist-operations',
          },
          {
            label: 'Production Notes',
            contentSite: 'docs',
            url: '/docs/v6.0/administration/production-notes',
          },
          {
            label: 'Exit Codes & Statuses',
            contentSite: 'docs',
            url: '/docs/v6.0/reference/exit-codes',
          },
          {
            label: 'Release Notes',
            contentSite: 'docs',
            url: 'https://www.mongodb.com/docs/manual/release-notes/',
          },
          {
            label: 'FAQ',
            contentSite: 'docs',
            collapsible: true,
            url: '/docs/v6.0/faq',
            items: [
              {
                label: 'Fundamentals',
                contentSite: 'docs',
                url: '/docs/v6.0/faq/fundamentals',
              },
              {
                label: 'Indexes',
                contentSite: 'docs',
                url: '/docs/v6.0/faq/indexes',
              },
              {
                label: 'Concurrency',
                contentSite: 'docs',
                url: '/docs/v6.0/faq/concurrency',
              },
              {
                label: 'Sharding',
                contentSite: 'docs',
                url: '/docs/v6.0/faq/sharding',
              },
              {
                label: 'Replication',
                contentSite: 'docs',
                url: '/docs/v6.0/faq/replica-sets',
              },
            ],
          },
        ],
      },
      {
        label: 'Infrastructure As Code',
        contentSite: 'docs',
        group: true,
        items: [
          {
            label: 'MongoDB Atlas Terraform Provider',
            isExternal: true,
            url: 'https://registry.terraform.io/providers/mongodb/mongodbatlas/latest/docs',
          },
          {
            label: 'MongoDB Atlas AWS CloudFormation Resources',
            isExternal: true,
            url: 'https://github.com/mongodb/mongodbatlas-cloudformation-resources?tab=readme-ov-file#readme',
          },
        ],
      },
    ],
  },
];
