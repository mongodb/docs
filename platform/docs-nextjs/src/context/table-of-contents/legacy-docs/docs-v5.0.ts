import type { TocItem } from '@/components/unified-sidenav/types';

export const toc: TocItem[] = [
  {
    label: 'Legacy Docs',
    contentSite: 'docs',
    url: '/docs/v5.0/',
    items: [
      {
        label: 'MongoDB Manual',
        contentSite: 'docs',
        group: true,
        items: [
          {
            label: 'Introduction',
            contentSite: 'docs',
            url: '/docs/v5.0/introduction',
            collapsible: true,
            items: [
              {
                label: 'Get Started',
                contentSite: 'docs',
                url: '/docs/v5.0/tutorial/getting-started',
              },
              {
                label: 'Create an Atlas Free Tier Cluster',
                contentSite: 'docs',
                url: 'https://www.mongodb.com/docs/get-started/',
              },
              {
                label: 'MongoDB Shell (mongosh)',
                contentSite: 'docs',
                url: 'https://www.mongodb.com/docs/mongodb-shell/',
              },
              {
                label: 'Databases & Collections',
                contentSite: 'docs',
                url: '/docs/v5.0/core/databases-and-collections',
                collapsible: true,
                items: [
                  {
                    label: 'Views',
                    contentSite: 'docs',
                    url: '/docs/v5.0/core/views',
                  },
                  {
                    label: 'On-Demand Materialized Views',
                    contentSite: 'docs',
                    url: '/docs/v5.0/core/materialized-views',
                  },
                  {
                    label: 'Join Collections',
                    contentSite: 'docs',
                    url: '/docs/v5.0/core/views/join-collections-with-view',
                  },
                  {
                    label: 'Capped Collections',
                    contentSite: 'docs',
                    url: '/docs/v5.0/core/capped-collections',
                  },
                  {
                    label: 'Time Series Collections',
                    contentSite: 'docs',
                    url: '/docs/v5.0/core/timeseries-collections',
                    collapsible: true,
                    items: [
                      {
                        label: 'Time Series Collection Limitations',
                        contentSite: 'docs',
                        url: '/docs/v5.0/core/timeseries/timeseries-limitations',
                      },
                      {
                        label: 'Set up Automatic Removal for Time Series Collections (TTL)',
                        contentSite: 'docs',
                        url: '/docs/v5.0/core/timeseries/timeseries-automatic-removal',
                      },
                      {
                        label: 'Set Granularity for Time Series Data',
                        contentSite: 'docs',
                        url: '/docs/v5.0/core/timeseries/timeseries-granularity',
                      },
                      {
                        label: 'Add Secondary Indexes on metaField and timeField',
                        contentSite: 'docs',
                        url: '/docs/v5.0/core/timeseries/timeseries-secondary-index',
                      },
                      {
                        label: 'Migrate Data into a Time Series Collection',
                        contentSite: 'docs',
                        url: '/docs/v5.0/core/timeseries/timeseries-migrate-data-into-timeseries-collection',
                      },
                      {
                        label: 'Build Materialized Views on Top of Time Series Data',
                        contentSite: 'docs',
                        url: '/docs/v5.0/core/timeseries/timeseries-build-materialized-views',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Documents',
                contentSite: 'docs',
                url: '/docs/v5.0/core/document',
              },
              {
                label: 'Query API',
                contentSite: 'docs',
                url: '/docs/v5.0/query-api',
              },
              {
                label: 'BSON Types',
                contentSite: 'docs',
                url: '/docs/v5.0/reference/bson-types',
                collapsible: true,
                items: [
                  {
                    label: 'Comparison and Sort Order',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/bson-type-comparison-order',
                  },
                  {
                    label: 'Extended JSON (v2)',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/mongodb-extended-json',
                  },
                  {
                    label: 'Extended JSON (v1)',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/mongodb-extended-json-v1',
                  },
                ],
              },
            ],
          },
          {
            label: 'CRUD Operations',
            contentSite: 'docs',
            url: '/docs/v5.0/crud',
            collapsible: true,
            items: [
              {
                label: 'Insert',
                contentSite: 'docs',
                url: '/docs/v5.0/tutorial/insert-documents',
                collapsible: true,
                items: [
                  {
                    label: 'Methods',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/insert-methods',
                  },
                ],
              },
              {
                label: 'Query',
                contentSite: 'docs',
                url: '/docs/v5.0/tutorial/query-documents',
                collapsible: true,
                items: [
                  {
                    label: 'Embedded Documents',
                    contentSite: 'docs',
                    url: '/docs/v5.0/tutorial/query-embedded-documents',
                  },
                  {
                    label: 'Arrays',
                    contentSite: 'docs',
                    url: '/docs/v5.0/tutorial/query-arrays',
                  },
                  {
                    label: 'Arrays of Embedded Documents',
                    contentSite: 'docs',
                    url: '/docs/v5.0/tutorial/query-array-of-documents',
                  },
                  {
                    label: 'Project Results',
                    contentSite: 'docs',
                    url: '/docs/v5.0/tutorial/project-fields-from-query-results',
                  },
                  {
                    label: 'Null or Missing Fields',
                    contentSite: 'docs',
                    url: '/docs/v5.0/tutorial/query-for-null-fields',
                  },
                  {
                    label: 'Long-Running Snapshots',
                    contentSite: 'docs',
                    url: '/docs/v5.0/tutorial/long-running-queries',
                  },
                  {
                    label: 'Iterate a Cursor',
                    contentSite: 'docs',
                    url: '/docs/v5.0/tutorial/iterate-a-cursor',
                  },
                ],
              },
              {
                label: 'Update',
                contentSite: 'docs',
                url: '/docs/v5.0/tutorial/update-documents',
                collapsible: true,
                items: [
                  {
                    label: 'Aggregation Pipeline',
                    contentSite: 'docs',
                    url: '/docs/v5.0/tutorial/update-documents-with-aggregation-pipeline',
                  },
                  {
                    label: 'Methods',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/update-methods',
                  },
                ],
              },
              {
                label: 'Remove',
                contentSite: 'docs',
                url: '/docs/v5.0/tutorial/remove-documents',
                collapsible: true,
                items: [
                  {
                    label: 'Methods',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/delete-methods',
                  },
                ],
              },
              {
                label: 'Bulk Write',
                contentSite: 'docs',
                url: '/docs/v5.0/core/bulk-write-operations',
              },
              {
                label: 'Retryable Writes',
                contentSite: 'docs',
                url: '/docs/v5.0/core/retryable-writes',
              },
              {
                label: 'Retryable Reads',
                contentSite: 'docs',
                url: '/docs/v5.0/core/retryable-reads',
              },
              {
                label: 'SQL to MongoDB',
                contentSite: 'docs',
                url: '/docs/v5.0/reference/sql-comparison',
              },
              {
                label: 'Text Search',
                contentSite: 'docs',
                url: '/docs/v5.0/text-search',
                collapsible: true,
                items: [
                  {
                    label: 'Atlas Search',
                    contentSite: 'docs',
                    url: 'https://www.mongodb.com/docs/atlas/atlas-search/',
                  },
                  {
                    label: 'Atlas Vector Search',
                    contentSite: 'docs',
                    url: 'https://www.mongodb.com/docs/atlas/atlas-vector-search/vector-search-overview/',
                  },
                ],
              },
              {
                label: 'Geospatial Queries',
                contentSite: 'docs',
                url: '/docs/v5.0/geospatial-queries',
                collapsible: true,
                items: [
                  {
                    label: 'Find Restaurants',
                    contentSite: 'docs',
                    url: '/docs/v5.0/tutorial/geospatial-tutorial',
                  },
                  {
                    label: 'GeoJSON Objects',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/geojson',
                  },
                ],
              },
              {
                label: 'Read Concern',
                contentSite: 'docs',
                url: '/docs/v5.0/reference/read-concern',
                collapsible: true,
                items: [
                  {
                    label: '"local"',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/read-concern-local',
                  },
                  {
                    label: '"available"',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/read-concern-available',
                  },
                  {
                    label: '"majority"',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/read-concern-majority',
                  },
                  {
                    label: '"linearizable"',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/read-concern-linearizable',
                  },
                  {
                    label: '"snapshot"',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/read-concern-snapshot',
                  },
                ],
              },
              {
                label: 'Write Concern',
                contentSite: 'docs',
                url: '/docs/v5.0/reference/write-concern',
              },
              {
                label: 'CRUD Concepts',
                contentSite: 'docs',
                url: '/docs/v5.0/core/crud',
                collapsible: true,
                items: [
                  {
                    label: 'Analyze Performance',
                    contentSite: 'docs',
                    url: '/docs/v5.0/tutorial/analyze-query-plan',
                  },
                  {
                    label: 'Atomicity & Transactions',
                    contentSite: 'docs',
                    url: '/docs/v5.0/core/write-operations-atomicity',
                  },
                  {
                    label: 'Distributed Queries',
                    contentSite: 'docs',
                    url: '/docs/v5.0/core/distributed-queries',
                  },
                  {
                    label: 'Periods & Dollar Signs',
                    contentSite: 'docs',
                    url: '/docs/v5.0/core/dot-dollar-considerations',
                  },
                  {
                    label: 'Read Isolation, Consistency, & Recency',
                    contentSite: 'docs',
                    url: '/docs/v5.0/core/read-isolation-consistency-recency',
                    collapsible: true,
                    items: [
                      {
                        label: 'Causal Consistency',
                        contentSite: 'docs',
                        url: '/docs/v5.0/core/causal-consistency-read-write-concerns',
                      },
                    ],
                  },
                  {
                    label: 'Query Optimization',
                    contentSite: 'docs',
                    url: '/docs/v5.0/core/query-optimization',
                    collapsible: true,
                    items: [
                      {
                        label: 'Analyze Performance',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/evaluate-operation-performance',
                        collapsible: true,
                        items: [
                          {
                            label: 'Explain Results',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/explain-results',
                          },
                          {
                            label: 'Database Profiler',
                            contentSite: 'docs',
                            url: '/docs/v5.0/tutorial/manage-the-database-profiler',
                            collapsible: true,
                            items: [
                              {
                                label: 'Output',
                                contentSite: 'docs',
                                url: '/docs/v5.0/reference/database-profiler',
                              },
                            ],
                          },
                        ],
                      },
                      {
                        label: 'Optimize Performance',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/optimize-query-performance-with-indexes-and-projections',
                      },
                      {
                        label: 'Write Performance',
                        contentSite: 'docs',
                        url: '/docs/v5.0/core/write-performance',
                      },
                      {
                        label: 'Explain Results',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/explain-results',
                      },
                    ],
                  },
                  {
                    label: 'Query Plans',
                    contentSite: 'docs',
                    url: '/docs/v5.0/core/query-plans',
                  },
                  {
                    label: 'Tailable Cursors',
                    contentSite: 'docs',
                    url: '/docs/v5.0/core/tailable-cursors',
                  },
                ],
              },
            ],
          },
          {
            label: 'Aggregation Operations',
            contentSite: 'docs',
            url: '/docs/v5.0/aggregation',
            collapsible: true,
            items: [
              {
                label: 'Aggregation Pipeline',
                contentSite: 'docs',
                url: '/docs/v5.0/core/aggregation-pipeline',
                collapsible: true,
                items: [
                  {
                    label: 'Field Paths',
                    contentSite: 'docs',
                    url: '/docs/v5.0/core/field-paths',
                  },
                  {
                    label: 'Optimization',
                    contentSite: 'docs',
                    url: '/docs/v5.0/core/aggregation-pipeline-optimization',
                  },
                  {
                    label: 'Limits',
                    contentSite: 'docs',
                    url: '/docs/v5.0/core/aggregation-pipeline-limits',
                  },
                  {
                    label: 'Sharded Collections',
                    contentSite: 'docs',
                    url: '/docs/v5.0/core/aggregation-pipeline-sharded-collections',
                  },
                  {
                    label: 'Zip Code Example',
                    contentSite: 'docs',
                    url: '/docs/v5.0/tutorial/aggregation-zip-code-data-set',
                  },
                  {
                    label: 'User Preference Example',
                    contentSite: 'docs',
                    url: '/docs/v5.0/tutorial/aggregation-with-user-preference-data',
                  },
                ],
              },
              {
                label: 'Reference',
                contentSite: 'docs',
                url: '/docs/v5.0/reference/aggregation',
                collapsible: true,
                items: [
                  {
                    label: 'Quick Reference',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/aggregation-quick-reference',
                  },
                  {
                    label: 'Commands',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/operator/aggregation/interface',
                  },
                  {
                    label: 'Commands Comparison',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/aggregation-commands-comparison',
                  },
                  {
                    label: 'Variables',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/aggregation-variables',
                  },
                  {
                    label: 'SQL to Aggregation',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/sql-aggregation-comparison',
                  },
                  {
                    label: 'Practical MongoDB Aggregations (e-book)',
                    contentSite: 'docs',
                    url: 'https://www.practical-mongodb-aggregations.com',
                  },
                ],
              },
              {
                label: 'Map-Reduce',
                contentSite: 'docs',
                url: '/docs/v5.0/core/map-reduce',
                collapsible: true,
                items: [
                  {
                    label: 'Sharded Collections',
                    contentSite: 'docs',
                    url: '/docs/v5.0/core/map-reduce-sharded-collections',
                  },
                  {
                    label: 'Concurrency',
                    contentSite: 'docs',
                    url: '/docs/v5.0/core/map-reduce-concurrency',
                  },
                  {
                    label: 'Examples',
                    contentSite: 'docs',
                    url: '/docs/v5.0/tutorial/map-reduce-examples',
                  },
                  {
                    label: 'Perform with Increments',
                    contentSite: 'docs',
                    url: '/docs/v5.0/tutorial/perform-incremental-map-reduce',
                  },
                  {
                    label: 'Troubleshoot Map',
                    contentSite: 'docs',
                    url: '/docs/v5.0/tutorial/troubleshoot-map-function',
                  },
                  {
                    label: 'Troubleshoot Reduce',
                    contentSite: 'docs',
                    url: '/docs/v5.0/tutorial/troubleshoot-reduce-function',
                  },
                  {
                    label: 'Aggregation Pipeline',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/map-reduce-to-aggregation-pipeline',
                  },
                ],
              },
            ],
          },
          {
            label: 'Indexes',
            contentSite: 'docs',
            url: '/docs/v5.0/indexes',
            collapsible: true,
            items: [
              {
                label: 'Single Field',
                contentSite: 'docs',
                url: '/docs/v5.0/core/index-single',
              },
              {
                label: 'Compound',
                contentSite: 'docs',
                url: '/docs/v5.0/core/index-compound',
              },
              {
                label: 'Multikey',
                contentSite: 'docs',
                url: '/docs/v5.0/core/index-multikey',
                collapsible: true,
                items: [
                  {
                    label: 'Multikey Index Bounds',
                    contentSite: 'docs',
                    url: '/docs/v5.0/core/multikey-index-bounds',
                  },
                ],
              },
              {
                label: 'Wildcard',
                contentSite: 'docs',
                url: '/docs/v5.0/core/index-wildcard',
                collapsible: true,
                items: [
                  {
                    label: 'Wildcard Index Restrictions',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/index-wildcard-restrictions',
                  },
                ],
              },
              {
                label: '2dsphere',
                contentSite: 'docs',
                url: '/docs/v5.0/core/2dsphere',
                collapsible: true,
                items: [
                  {
                    label: 'Query a  Index',
                    contentSite: 'docs',
                    url: '/docs/v5.0/tutorial/query-a-2dsphere-index',
                  },
                ],
              },
              {
                label: '2d',
                contentSite: 'docs',
                url: '/docs/v5.0/core/2d',
                collapsible: true,
                items: [
                  {
                    label: 'Create a  Index',
                    contentSite: 'docs',
                    url: '/docs/v5.0/tutorial/build-a-2d-index',
                  },
                  {
                    label: 'Query a  Index',
                    contentSite: 'docs',
                    url: '/docs/v5.0/tutorial/query-a-2d-index',
                  },
                  {
                    label: ' Index Internals',
                    contentSite: 'docs',
                    url: '/docs/v5.0/core/geospatial-indexes',
                  },
                  {
                    label: 'Calculate Distance Using Spherical Geometry',
                    contentSite: 'docs',
                    url: '/docs/v5.0/tutorial/calculate-distances-using-spherical-geometry-with-2d-geospatial-indexes',
                  },
                ],
              },
              {
                label: 'geohaystack',
                contentSite: 'docs',
                url: '/docs/v5.0/core/geohaystack',
                collapsible: true,
                items: [
                  {
                    label: 'Create a Haystack Index',
                    contentSite: 'docs',
                    url: '/docs/v5.0/tutorial/build-a-geohaystack-index',
                  },
                  {
                    label: 'Query a Haystack Index',
                    contentSite: 'docs',
                    url: '/docs/v5.0/tutorial/query-a-geohaystack-index',
                  },
                ],
              },
              {
                label: 'Hashed',
                contentSite: 'docs',
                url: '/docs/v5.0/core/index-hashed',
              },
              {
                label: 'Properties',
                contentSite: 'docs',
                url: '/docs/v5.0/core/index-properties',
                collapsible: true,
                items: [
                  {
                    label: 'TTL Indexes',
                    contentSite: 'docs',
                    url: '/docs/v5.0/core/index-ttl',
                    collapsible: true,
                    items: [
                      {
                        label: 'Expire Data',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/expire-data',
                      },
                    ],
                  },
                  {
                    label: 'Unique Indexes',
                    contentSite: 'docs',
                    url: '/docs/v5.0/core/index-unique',
                  },
                  {
                    label: 'Partial Indexes',
                    contentSite: 'docs',
                    url: '/docs/v5.0/core/index-partial',
                  },
                  {
                    label: 'Case-Insensitive Indexes',
                    contentSite: 'docs',
                    url: '/docs/v5.0/core/index-case-insensitive',
                  },
                  {
                    label: 'Hidden Indexes',
                    contentSite: 'docs',
                    url: '/docs/v5.0/core/index-hidden',
                  },
                  {
                    label: 'Sparse Indexes',
                    contentSite: 'docs',
                    url: '/docs/v5.0/core/index-sparse',
                  },
                ],
              },
              {
                label: 'Builds',
                contentSite: 'docs',
                url: '/docs/v5.0/core/index-creation',
                collapsible: true,
                items: [
                  {
                    label: 'Create on Replica Sets',
                    contentSite: 'docs',
                    url: '/docs/v5.0/tutorial/build-indexes-on-replica-sets',
                  },
                  {
                    label: 'Create on Sharded Clusters',
                    contentSite: 'docs',
                    url: '/docs/v5.0/tutorial/build-indexes-on-sharded-clusters',
                  },
                ],
              },
              {
                label: 'Intersection',
                contentSite: 'docs',
                url: '/docs/v5.0/core/index-intersection',
              },
              {
                label: 'Manage',
                contentSite: 'docs',
                url: '/docs/v5.0/tutorial/manage-indexes',
              },
              {
                label: 'Measure Use',
                contentSite: 'docs',
                url: '/docs/v5.0/tutorial/measure-index-use',
              },
              {
                label: 'Strategies',
                contentSite: 'docs',
                url: '/docs/v5.0/applications/indexes',
                collapsible: true,
                items: [
                  {
                    label: 'Equality, Sort, Range Rule',
                    contentSite: 'docs',
                    url: '/docs/v5.0/tutorial/equality-sort-range-rule',
                  },
                  {
                    label: 'Support Queries',
                    contentSite: 'docs',
                    url: '/docs/v5.0/tutorial/create-indexes-to-support-queries',
                  },
                  {
                    label: 'Sort Query Results',
                    contentSite: 'docs',
                    url: '/docs/v5.0/tutorial/sort-results-with-indexes',
                  },
                  {
                    label: 'Ensure Query Selectivity',
                    contentSite: 'docs',
                    url: '/docs/v5.0/tutorial/create-queries-that-ensure-selectivity',
                  },
                ],
              },
              {
                label: 'Reference',
                contentSite: 'docs',
                url: '/docs/v5.0/reference/indexes',
              },
            ],
          },
          {
            label: 'Atlas Search',
            contentSite: 'docs',
            url: 'https://www.mongodb.com/docs/atlas/atlas-search/',
          },
          {
            label: 'Atlas Vector Search',
            contentSite: 'docs',
            url: 'https://www.mongodb.com/docs/atlas/atlas-vector-search/vector-search-overview/',
          },
          {
            label: 'Time Series',
            contentSite: 'docs',
            url: '/docs/v5.0/core/timeseries-collections',
          },
          {
            label: 'Change Streams',
            contentSite: 'docs',
            url: '/docs/v5.0/changeStreams',
            collapsible: true,
            items: [
              {
                label: 'Production Recommendations',
                contentSite: 'docs',
                url: '/docs/v5.0/administration/change-streams-production-recommendations',
              },
              {
                label: 'Change Events',
                contentSite: 'docs',
                url: '/docs/v5.0/reference/change-events',
                collapsible: true,
                items: [
                  {
                    label: 'delete',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/change-events/delete',
                  },
                  {
                    label: 'drop',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/change-events/drop',
                  },
                  {
                    label: 'dropDatabase',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/change-events/dropDatabase',
                  },
                  {
                    label: 'insert',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/change-events/insert',
                  },
                  {
                    label: 'invalidate',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/change-events/invalidate',
                  },
                  {
                    label: 'rename',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/change-events/rename',
                  },
                  {
                    label: 'replace',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/change-events/replace',
                  },
                  {
                    label: 'update',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/change-events/update',
                  },
                ],
              },
            ],
          },
          {
            label: 'Transactions',
            contentSite: 'docs',
            url: '/docs/v5.0/core/transactions',
            collapsible: true,
            items: [
              {
                label: 'Drivers API',
                contentSite: 'docs',
                url: '/docs/v5.0/core/transactions-in-applications',
              },
              {
                label: 'Operations',
                contentSite: 'docs',
                url: '/docs/v5.0/core/transactions-operations',
              },
              {
                label: 'Production Considerations',
                contentSite: 'docs',
                url: '/docs/v5.0/core/transactions-production-consideration',
              },
              {
                label: 'Sharded Clusters',
                contentSite: 'docs',
                url: '/docs/v5.0/core/transactions-sharded-clusters',
              },
            ],
          },
          {
            label: 'Data Modeling',
            contentSite: 'docs',
            url: '/docs/v5.0/data-modeling',
            collapsible: true,
            items: [
              {
                label: 'Introduction',
                contentSite: 'docs',
                url: '/docs/v5.0/core/data-modeling-introduction',
              },
              {
                label: 'Schema Validation',
                contentSite: 'docs',
                url: '/docs/v5.0/core/schema-validation',
              },
              {
                label: 'Data Models',
                contentSite: 'docs',
                url: '/docs/v5.0/core/data-models',
                collapsible: true,
                items: [
                  {
                    label: 'Data Model Design',
                    contentSite: 'docs',
                    url: '/docs/v5.0/core/data-model-design',
                  },
                  {
                    label: 'Operational Factors',
                    contentSite: 'docs',
                    url: '/docs/v5.0/core/data-model-operations',
                  },
                ],
              },
              {
                label: 'Examples and Patterns',
                contentSite: 'docs',
                url: '/docs/v5.0/applications/data-models',
                collapsible: true,
                items: [
                  {
                    label: 'Document Relationships',
                    contentSite: 'docs',
                    url: '/docs/v5.0/applications/data-models-relationships',
                    collapsible: true,
                    items: [
                      {
                        label: 'One-to-One Embedded Documents',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/model-embedded-one-to-one-relationships-between-documents',
                      },
                      {
                        label: 'One-to-Many Embedded Documents',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/model-embedded-one-to-many-relationships-between-documents',
                      },
                      {
                        label: 'One-to-Many References',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/model-referenced-one-to-many-relationships-between-documents',
                      },
                    ],
                  },
                  {
                    label: 'Tree Structures',
                    contentSite: 'docs',
                    url: '/docs/v5.0/applications/data-models-tree-structures',
                    collapsible: true,
                    items: [
                      {
                        label: 'Parent References',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/model-tree-structures-with-parent-references',
                      },
                      {
                        label: 'Child References',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/model-tree-structures-with-child-references',
                      },
                      {
                        label: 'Array of Ancestors',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/model-tree-structures-with-ancestors-array',
                      },
                      {
                        label: 'Materialized Paths',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/model-tree-structures-with-materialized-paths',
                      },
                      {
                        label: 'Nested Sets',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/model-tree-structures-with-nested-sets',
                      },
                    ],
                  },
                  {
                    label: 'Specific Application Contexts',
                    contentSite: 'docs',
                    url: '/docs/v5.0/applications/data-models-applications',
                    collapsible: true,
                    items: [
                      {
                        label: 'Atomic Operations',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/model-data-for-atomic-operations',
                      },
                      {
                        label: 'Computed Data',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/model-computed-data',
                      },
                      {
                        label: 'IOT Data',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/model-iot-data',
                      },
                      {
                        label: 'Keyword Search',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/model-data-for-keyword-search',
                      },
                      {
                        label: 'Monetary Data',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/model-monetary-data',
                      },
                      {
                        label: 'Schema Versioning',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/model-data-for-schema-versioning',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Reference',
                contentSite: 'docs',
                url: '/docs/v5.0/reference/data-models',
                collapsible: true,
                items: [
                  {
                    label: 'Database References',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/database-references',
                  },
                ],
              },
            ],
          },
          {
            label: 'Replication',
            contentSite: 'docs',
            url: '/docs/v5.0/replication',
            collapsible: true,
            items: [
              {
                label: 'Oplog',
                contentSite: 'docs',
                url: '/docs/v5.0/core/replica-set-oplog',
              },
              {
                label: 'Data Synchronization',
                contentSite: 'docs',
                url: '/docs/v5.0/core/replica-set-sync',
              },
              {
                label: 'Replica Set Members',
                contentSite: 'docs',
                url: '/docs/v5.0/core/replica-set-members',
                collapsible: true,
                items: [
                  {
                    label: 'Primary',
                    contentSite: 'docs',
                    url: '/docs/v5.0/core/replica-set-primary',
                  },
                  {
                    label: 'Secondary',
                    contentSite: 'docs',
                    url: '/docs/v5.0/core/replica-set-secondary',
                    collapsible: true,
                    items: [
                      {
                        label: 'Priority 0 Members',
                        contentSite: 'docs',
                        url: '/docs/v5.0/core/replica-set-priority-0-member',
                      },
                      {
                        label: 'Hidden Members',
                        contentSite: 'docs',
                        url: '/docs/v5.0/core/replica-set-hidden-member',
                      },
                      {
                        label: 'Delayed Members',
                        contentSite: 'docs',
                        url: '/docs/v5.0/core/replica-set-delayed-member',
                      },
                    ],
                  },
                  {
                    label: 'Arbiter',
                    contentSite: 'docs',
                    url: '/docs/v5.0/core/replica-set-arbiter',
                  },
                ],
              },
              {
                label: 'Deployment Architectures',
                contentSite: 'docs',
                url: '/docs/v5.0/core/replica-set-architectures',
                collapsible: true,
                items: [
                  {
                    label: 'Three Members',
                    contentSite: 'docs',
                    url: '/docs/v5.0/core/replica-set-architecture-three-members',
                  },
                  {
                    label: 'Distributed Data Centers',
                    contentSite: 'docs',
                    url: '/docs/v5.0/core/replica-set-architecture-geographically-distributed',
                  },
                ],
              },
              {
                label: 'High Availability',
                contentSite: 'docs',
                url: '/docs/v5.0/core/replica-set-high-availability',
                collapsible: true,
                items: [
                  {
                    label: 'Elections',
                    contentSite: 'docs',
                    url: '/docs/v5.0/core/replica-set-elections',
                  },
                  {
                    label: 'Failover Rollbacks',
                    contentSite: 'docs',
                    url: '/docs/v5.0/core/replica-set-rollbacks',
                  },
                ],
              },
              {
                label: 'Read & Write Semantics',
                contentSite: 'docs',
                url: '/docs/v5.0/applications/replication',
                collapsible: true,
                items: [
                  {
                    label: 'Write Concern',
                    contentSite: 'docs',
                    url: '/docs/v5.0/core/replica-set-write-concern',
                  },
                  {
                    label: 'Read Preference',
                    contentSite: 'docs',
                    url: '/docs/v5.0/core/read-preference',
                    collapsible: true,
                    items: [
                      {
                        label: 'Use Cases',
                        contentSite: 'docs',
                        url: '/docs/v5.0/core/read-preference-use-cases',
                      },
                      {
                        label: 'Tag Sets',
                        contentSite: 'docs',
                        url: '/docs/v5.0/core/read-preference-tags',
                      },
                      {
                        label: 'Configure Tag Sets',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/configure-replica-set-tag-sets',
                      },
                      {
                        label: 'maxStalenessSeconds',
                        contentSite: 'docs',
                        url: '/docs/v5.0/core/read-preference-staleness',
                      },
                      {
                        label: 'Hedged Reads',
                        contentSite: 'docs',
                        url: '/docs/v5.0/core/read-preference-hedge-option',
                      },
                    ],
                  },
                  {
                    label: 'Server Selection Algorithm',
                    contentSite: 'docs',
                    url: '/docs/v5.0/core/read-preference-mechanics',
                  },
                ],
              },
              {
                label: 'Troubleshoot',
                contentSite: 'docs',
                url: '/docs/v5.0/tutorial/troubleshoot-replica-sets',
              },
              {
                label: 'local Database',
                contentSite: 'docs',
                url: '/docs/v5.0/reference/local-database',
              },
            ],
          },
          {
            label: 'Sharding',
            contentSite: 'docs',
            url: '/docs/v5.0/sharding',
            collapsible: true,
            items: [
              {
                label: 'Sharded Cluster Components',
                contentSite: 'docs',
                url: '/docs/v5.0/core/sharded-cluster-components',
                collapsible: true,
                items: [
                  {
                    label: 'Shards',
                    contentSite: 'docs',
                    url: '/docs/v5.0/core/sharded-cluster-shards',
                  },
                  {
                    label: 'Config Servers (metadata)',
                    contentSite: 'docs',
                    url: '/docs/v5.0/core/sharded-cluster-config-servers',
                  },
                  {
                    label: 'Router (mongos)',
                    contentSite: 'docs',
                    url: '/docs/v5.0/core/sharded-cluster-query-router',
                  },
                ],
              },
              {
                label: 'Shard Keys',
                contentSite: 'docs',
                url: '/docs/v5.0/core/sharding-shard-key',
                collapsible: true,
                items: [
                  {
                    label: 'Shard a Collection',
                    contentSite: 'docs',
                    url: '/docs/v5.0/core/sharding-shard-a-collection',
                  },
                  {
                    label: 'Choose Shard Key',
                    contentSite: 'docs',
                    url: '/docs/v5.0/core/sharding-choose-a-shard-key',
                  },
                  {
                    label: 'Change Shard Key',
                    contentSite: 'docs',
                    url: '/docs/v5.0/core/sharding-change-a-shard-key',
                    collapsible: true,
                    items: [
                      {
                        label: 'Refine a Shard Key',
                        contentSite: 'docs',
                        url: '/docs/v5.0/core/sharding-refine-a-shard-key',
                      },
                      {
                        label: 'Reshard a Collection',
                        contentSite: 'docs',
                        url: '/docs/v5.0/core/sharding-reshard-a-collection',
                      },
                    ],
                  },
                  {
                    label: 'Change Shard Key Value',
                    contentSite: 'docs',
                    url: '/docs/v5.0/core/sharding-change-shard-key-value',
                  },
                  {
                    label: 'Set Missing Key Fields',
                    contentSite: 'docs',
                    url: '/docs/v5.0/core/sharding-set-missing-shard-key-fields',
                  },
                  {
                    label: 'Find a Shard Key',
                    contentSite: 'docs',
                    url: '/docs/v5.0/core/sharding-find-shard-key',
                  },
                  {
                    label: 'Troubleshoot',
                    contentSite: 'docs',
                    url: '/docs/v5.0/core/sharding-troubleshooting-shard-keys',
                  },
                ],
              },
              {
                label: 'Hashed Sharding',
                contentSite: 'docs',
                url: '/docs/v5.0/core/hashed-sharding',
              },
              {
                label: 'Ranged Sharding',
                contentSite: 'docs',
                url: '/docs/v5.0/core/ranged-sharding',
              },
              {
                label: 'Zones',
                contentSite: 'docs',
                url: '/docs/v5.0/core/zone-sharding',
                collapsible: true,
                items: [
                  {
                    label: 'Manage',
                    contentSite: 'docs',
                    url: '/docs/v5.0/tutorial/manage-shard-zone',
                  },
                  {
                    label: 'Segment by Location',
                    contentSite: 'docs',
                    url: '/docs/v5.0/tutorial/sharding-segmenting-data-by-location',
                  },
                  {
                    label: 'Segment by Application or Customer',
                    contentSite: 'docs',
                    url: '/docs/v5.0/tutorial/sharding-segmenting-shards',
                  },
                  {
                    label: 'Distributed Local Writes for Insert-Only Workloads',
                    contentSite: 'docs',
                    url: '/docs/v5.0/tutorial/sharding-high-availability-writes',
                  },
                  {
                    label: 'Distribute Collections',
                    contentSite: 'docs',
                    url: '/docs/v5.0/tutorial/sharding-distribute-collections-with-zones',
                  },
                ],
              },
              {
                label: 'Data Partitioning',
                contentSite: 'docs',
                url: '/docs/v5.0/core/sharding-data-partitioning',
                collapsible: true,
                items: [
                  {
                    label: 'Create Ranges',
                    contentSite: 'docs',
                    url: '/docs/v5.0/tutorial/create-chunks-in-sharded-cluster',
                  },
                  {
                    label: 'Split Chunks',
                    contentSite: 'docs',
                    url: '/docs/v5.0/tutorial/split-chunks-in-sharded-cluster',
                  },
                  {
                    label: 'Merge Chunks',
                    contentSite: 'docs',
                    url: '/docs/v5.0/tutorial/merge-chunks-in-sharded-cluster',
                  },
                  {
                    label: 'Modify Range Size',
                    contentSite: 'docs',
                    url: '/docs/v5.0/tutorial/modify-chunk-size-in-sharded-cluster',
                  },
                ],
              },
              {
                label: 'Balancer',
                contentSite: 'docs',
                url: '/docs/v5.0/core/sharding-balancer-administration',
                collapsible: true,
                items: [
                  {
                    label: 'Manage',
                    contentSite: 'docs',
                    url: '/docs/v5.0/tutorial/manage-sharded-cluster-balancer',
                  },
                  {
                    label: 'Migrate Ranges',
                    contentSite: 'docs',
                    url: '/docs/v5.0/tutorial/migrate-chunks-in-sharded-cluster',
                  },
                ],
              },
              {
                label: 'Administration',
                contentSite: 'docs',
                url: '/docs/v5.0/administration/sharded-cluster-administration',
                collapsible: true,
                items: [
                  {
                    label: 'View Cluster Configuration',
                    contentSite: 'docs',
                    url: '/docs/v5.0/tutorial/view-sharded-cluster-configuration',
                  },
                  {
                    label: 'Add Shards',
                    contentSite: 'docs',
                    url: '/docs/v5.0/tutorial/add-shards-to-shard-cluster',
                  },
                  {
                    label: 'Remove Shards',
                    contentSite: 'docs',
                    url: '/docs/v5.0/tutorial/remove-shards-from-cluster',
                  },
                  {
                    label: 'Clear jumbo Flag',
                    contentSite: 'docs',
                    url: '/docs/v5.0/tutorial/clear-jumbo-flag',
                  },
                  {
                    label: 'Drop Hashed Shard Key Index',
                    contentSite: 'docs',
                    url: '/docs/v5.0/tutorial/drop-a-hashed-shard-key-index',
                  },
                ],
              },
              {
                label: 'Reference',
                contentSite: 'docs',
                url: '/docs/v5.0/reference/sharding',
                collapsible: true,
                items: [
                  {
                    label: 'Operational Restrictions',
                    contentSite: 'docs',
                    url: '/docs/v5.0/core/sharded-cluster-requirements',
                  },
                  {
                    label: 'Troubleshoot Sharded Clusters',
                    contentSite: 'docs',
                    url: '/docs/v5.0/tutorial/troubleshoot-sharded-clusters',
                  },
                  {
                    label: 'Config Database',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/config-database',
                  },
                ],
              },
            ],
          },
          {
            label: 'Storage',
            contentSite: 'docs',
            url: '/docs/v5.0/storage',
            collapsible: true,
            items: [
              {
                label: 'WiredTiger',
                contentSite: 'docs',
                url: '/docs/v5.0/core/wiredtiger',
              },
              {
                label: 'Journaling',
                contentSite: 'docs',
                url: '/docs/v5.0/core/journaling',
              },
            ],
          },
          {
            label: 'Administration',
            contentSite: 'docs',
            url: '/docs/v5.0/administration',
            collapsible: true,
            items: [
              {
                label: 'Development Checklist',
                contentSite: 'docs',
                url: '/docs/v5.0/administration/production-checklist-development',
              },
              {
                label: 'Performance',
                contentSite: 'docs',
                url: '/docs/v5.0/administration/analyzing-mongodb-performance',
                collapsible: true,
                items: [
                  {
                    label: 'Connection Pool',
                    contentSite: 'docs',
                    url: '/docs/v5.0/administration/connection-pool-overview',
                    collapsible: true,
                    items: [
                      {
                        label: 'Tuning',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/connection-pool-performance-tuning',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Management',
                contentSite: 'docs',
                url: '/docs/v5.0/administration/configuration-and-maintenance',
                collapsible: true,
                items: [
                  {
                    label: 'Terminate Operations',
                    contentSite: 'docs',
                    url: '/docs/v5.0/tutorial/terminate-running-operations',
                  },
                  {
                    label: 'Rotate Log Files',
                    contentSite: 'docs',
                    url: '/docs/v5.0/tutorial/rotate-log-files',
                  },
                ],
              },
              {
                label: 'Data Center Awareness',
                contentSite: 'docs',
                url: '/docs/v5.0/data-center-awareness',
                collapsible: true,
                items: [
                  {
                    label: 'Workload Isolation',
                    contentSite: 'docs',
                    url: '/docs/v5.0/core/workload-isolation',
                  },
                  {
                    label: 'Zones',
                    contentSite: 'docs',
                    url: '/docs/v5.0/core/zone-sharding',
                  },
                  {
                    label: 'Manage Shard Zones',
                    contentSite: 'docs',
                    url: '/docs/v5.0/tutorial/manage-shard-zone',
                  },
                ],
              },
            ],
          },
          {
            label: 'Security',
            contentSite: 'docs',
            url: '/docs/v5.0/security',
            collapsible: true,
            items: [
              {
                label: 'SCRAM',
                contentSite: 'docs',
                url: '/docs/v5.0/core/security-scram',
                collapsible: true,
                items: [
                  {
                    label: 'Authenticate Clients',
                    contentSite: 'docs',
                    url: '/docs/v5.0/tutorial/configure-scram-client-authentication',
                  },
                ],
              },
              {
                label: 'x.509',
                contentSite: 'docs',
                url: '/docs/v5.0/core/security-x.509',
                collapsible: true,
                items: [
                  {
                    label: 'Authenticate Clients',
                    contentSite: 'docs',
                    url: '/docs/v5.0/tutorial/configure-x509-client-authentication',
                  },
                ],
              },
              {
                label: 'TLS/SSL',
                contentSite: 'docs',
                url: '/docs/v5.0/core/security-transport-encryption',
                collapsible: true,
                items: [
                  {
                    label: 'Configure mongod & mongos',
                    contentSite: 'docs',
                    url: '/docs/v5.0/tutorial/configure-ssl',
                  },
                  {
                    label: 'Configure Clients',
                    contentSite: 'docs',
                    url: '/docs/v5.0/tutorial/configure-ssl-clients',
                  },
                  {
                    label: 'Upgrade Cluster',
                    contentSite: 'docs',
                    url: '/docs/v5.0/tutorial/upgrade-cluster-to-ssl',
                  },
                  {
                    label: 'Configure for FIPS',
                    contentSite: 'docs',
                    url: '/docs/v5.0/tutorial/configure-fips',
                  },
                ],
              },
              {
                label: 'Encryption at Rest',
                contentSite: 'docs',
                url: '/docs/v5.0/core/security-encryption-at-rest',
                collapsible: true,
                items: [
                  {
                    label: 'Configure',
                    contentSite: 'docs',
                    url: '/docs/v5.0/tutorial/configure-encryption',
                  },
                  {
                    label: 'Rotate Keys',
                    contentSite: 'docs',
                    url: '/docs/v5.0/tutorial/rotate-encryption-key',
                  },
                ],
              },
              {
                label: 'Client-Side Field Level Encryption',
                contentSite: 'docs',
                url: '/docs/v5.0/core/security-client-side-encryption',
                collapsible: true,
                items: [
                  {
                    label: 'Automatic Client-Side Field Level Encryption',
                    contentSite: 'docs',
                    url: '/docs/v5.0/core/security-automatic-client-side-encryption',
                    collapsible: true,
                    items: [
                      {
                        label: 'Automatic Encryption Rules',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/security-client-side-automatic-json-schema',
                      },
                      {
                        label: 'Read/Write Support with Automatic Field Level Encryption',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/security-client-side-query-aggregation-support',
                      },
                      {
                        label: 'Automatic Encryption Shared Library',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/security-client-side-encryption-shared-library',
                      },
                      {
                        label: 'mongocryptd',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/security-client-side-encryption-appendix',
                      },
                    ],
                  },
                  {
                    label: 'Explicit (Manual) Client-Side Field Level Encryption',
                    contentSite: 'docs',
                    url: '/docs/v5.0/core/security-explicit-client-side-encryption',
                  },
                  {
                    label: 'Master Key and Data Encryption Key Management',
                    contentSite: 'docs',
                    url: '/docs/v5.0/core/security-client-side-encryption-key-management',
                    collapsible: true,
                    items: [
                      {
                        label: 'Manage Data Encryption Keys',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/manage-client-side-encryption-data-keys',
                      },
                    ],
                  },
                  {
                    label: 'Limitations',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/security-client-side-encryption-limitations',
                  },
                ],
              },
              {
                label: 'Use Field Level Redaction',
                contentSite: 'docs',
                url: '/docs/v5.0/tutorial/implement-field-level-redaction',
              },
              {
                label: 'Create a Vulnerability Report',
                contentSite: 'docs',
                url: '/docs/v5.0/tutorial/create-a-vulnerability-report',
              },
            ],
          },
          {
            label: 'Self-Managed Deployments',
            contentSite: 'docs',
            url: '/docs/v5.0/self-managed-deployments',
            collapsible: true,
            items: [
              {
                label: 'Install',
                contentSite: 'docs',
                url: '/docs/v5.0/installation',
                collapsible: true,
                items: [
                  {
                    label: 'Community Edition',
                    contentSite: 'docs',
                    url: '/docs/v5.0/administration/install-community',
                    collapsible: true,
                    items: [
                      {
                        label: 'Install on Linux',
                        contentSite: 'docs',
                        url: '/docs/v5.0/administration/install-on-linux',
                        collapsible: true,
                        items: [
                          {
                            label: 'Install on Red Hat',
                            contentSite: 'docs',
                            url: '/docs/v5.0/tutorial/install-mongodb-on-red-hat',
                            collapsible: true,
                            items: [
                              {
                                label: 'Install using .tgz Tarball',
                                contentSite: 'docs',
                                url: '/docs/v5.0/tutorial/install-mongodb-on-red-hat-tarball',
                              },
                            ],
                          },
                          {
                            label: 'Install on Ubuntu',
                            contentSite: 'docs',
                            url: '/docs/v5.0/tutorial/install-mongodb-on-ubuntu',
                            collapsible: true,
                            items: [
                              {
                                label: 'Install using .tgz Tarball',
                                contentSite: 'docs',
                                url: '/docs/v5.0/tutorial/install-mongodb-on-ubuntu-tarball',
                              },
                              {
                                label: 'Troubleshoot Ubuntu Installation',
                                contentSite: 'docs',
                                url: '/docs/v5.0/reference/installation-ubuntu-community-troubleshooting',
                              },
                            ],
                          },
                          {
                            label: 'Install on Debian',
                            contentSite: 'docs',
                            url: '/docs/v5.0/tutorial/install-mongodb-on-debian',
                            collapsible: true,
                            items: [
                              {
                                label: 'Install using .tgz Tarball',
                                contentSite: 'docs',
                                url: '/docs/v5.0/tutorial/install-mongodb-on-debian-tarball',
                              },
                            ],
                          },
                          {
                            label: 'Install on SUSE',
                            contentSite: 'docs',
                            url: '/docs/v5.0/tutorial/install-mongodb-on-suse',
                            collapsible: true,
                            items: [
                              {
                                label: 'Install using .tgz Tarball',
                                contentSite: 'docs',
                                url: '/docs/v5.0/tutorial/install-mongodb-on-suse-tarball',
                              },
                            ],
                          },
                          {
                            label: 'Install on Amazon',
                            contentSite: 'docs',
                            url: '/docs/v5.0/tutorial/install-mongodb-on-amazon',
                            collapsible: true,
                            items: [
                              {
                                label: 'Install using .tgz Tarball',
                                contentSite: 'docs',
                                url: '/docs/v5.0/tutorial/install-mongodb-on-amazon-tarball',
                              },
                            ],
                          },
                        ],
                      },
                      {
                        label: 'Install on macOS',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/install-mongodb-on-os-x',
                        collapsible: true,
                        items: [
                          {
                            label: 'Install using .tgz Tarball',
                            contentSite: 'docs',
                            url: '/docs/v5.0/tutorial/install-mongodb-on-os-x-tarball',
                          },
                        ],
                      },
                      {
                        label: 'Install on Windows',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/install-mongodb-on-windows',
                        collapsible: true,
                        items: [
                          {
                            label: 'Install using msiexec.exe',
                            contentSite: 'docs',
                            url: '/docs/v5.0/tutorial/install-mongodb-on-windows-unattended',
                          },
                        ],
                      },
                      {
                        label: 'Install with Docker',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/install-mongodb-community-with-docker',
                      },
                    ],
                  },
                  {
                    label: 'Enterprise',
                    contentSite: 'docs',
                    url: '/docs/v5.0/administration/install-enterprise',
                    collapsible: true,
                    items: [
                      {
                        label: 'Install on Linux',
                        contentSite: 'docs',
                        url: '/docs/v5.0/administration/install-enterprise-linux',
                        collapsible: true,
                        items: [
                          {
                            label: 'Install on Red Hat',
                            contentSite: 'docs',
                            url: '/docs/v5.0/tutorial/install-mongodb-enterprise-on-red-hat',
                            collapsible: true,
                            items: [
                              {
                                label: 'Install using .tgz Tarball',
                                contentSite: 'docs',
                                url: '/docs/v5.0/tutorial/install-mongodb-enterprise-on-red-hat-tarball',
                              },
                            ],
                          },
                          {
                            label: 'Install on Ubuntu',
                            contentSite: 'docs',
                            url: '/docs/v5.0/tutorial/install-mongodb-enterprise-on-ubuntu',
                            collapsible: true,
                            items: [
                              {
                                label: 'Install using .tgz Tarball',
                                contentSite: 'docs',
                                url: '/docs/v5.0/tutorial/install-mongodb-enterprise-on-ubuntu-tarball',
                              },
                            ],
                          },
                          {
                            label: 'Install on Debian',
                            contentSite: 'docs',
                            url: '/docs/v5.0/tutorial/install-mongodb-enterprise-on-debian',
                            collapsible: true,
                            items: [
                              {
                                label: 'Install using .tgz Tarball',
                                contentSite: 'docs',
                                url: '/docs/v5.0/tutorial/install-mongodb-enterprise-on-debian-tarball',
                              },
                            ],
                          },
                          {
                            label: 'Install on SUSE',
                            contentSite: 'docs',
                            url: '/docs/v5.0/tutorial/install-mongodb-enterprise-on-suse',
                            collapsible: true,
                            items: [
                              {
                                label: 'Install using .tgz Tarball',
                                contentSite: 'docs',
                                url: '/docs/v5.0/tutorial/install-mongodb-enterprise-on-suse-tarball',
                              },
                            ],
                          },
                          {
                            label: 'Install on Amazon',
                            contentSite: 'docs',
                            url: '/docs/v5.0/tutorial/install-mongodb-enterprise-on-amazon',
                            collapsible: true,
                            items: [
                              {
                                label: 'Install using .tgz Tarball',
                                contentSite: 'docs',
                                url: '/docs/v5.0/tutorial/install-mongodb-enterprise-on-amazon-tarball',
                              },
                            ],
                          },
                        ],
                      },
                      {
                        label: 'Install on macOS',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/install-mongodb-enterprise-on-os-x',
                      },
                      {
                        label: 'Install on Windows',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/install-mongodb-enterprise-on-windows',
                        collapsible: true,
                        items: [
                          {
                            label: 'Install using msiexec.exe',
                            contentSite: 'docs',
                            url: '/docs/v5.0/tutorial/install-mongodb-enterprise-on-windows-unattended',
                          },
                        ],
                      },
                      {
                        label: 'Install with Docker',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/install-mongodb-enterprise-with-docker',
                      },
                    ],
                  },
                  {
                    label: 'Upgrade Community to Enterprise',
                    contentSite: 'docs',
                    url: '/docs/v5.0/administration/upgrade-community-to-enterprise',
                    collapsible: true,
                    items: [
                      {
                        label: 'Standalone',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/upgrade-to-enterprise-standalone',
                      },
                      {
                        label: 'Replica Set',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/upgrade-to-enterprise-replica-set',
                      },
                      {
                        label: 'Sharded Cluster',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/upgrade-to-enterprise-sharded-cluster',
                      },
                    ],
                  },
                  {
                    label: 'Verify Package Integrity',
                    contentSite: 'docs',
                    url: '/docs/v5.0/tutorial/verify-mongodb-packages',
                  },
                  {
                    label: 'MongoDB Package Components',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/program',
                    collapsible: true,
                    items: [
                      {
                        label: 'mongod',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/program/mongod',
                      },
                      {
                        label: 'mongos',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/program/mongos',
                      },
                      {
                        label: 'Legacy mongo shell',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/program/mongo',
                      },
                      {
                        label: 'mongod.exe',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/program/mongod.exe',
                      },
                      {
                        label: 'mongos.exe',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/program/mongos.exe',
                      },
                      {
                        label: 'mongokerberos',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/program/mongokerberos',
                      },
                      {
                        label: 'mongoldap',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/program/mongoldap',
                      },
                      {
                        label: 'install_compass',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/program/install_compass',
                      },
                      {
                        label: 'Database Tools',
                        contentSite: 'docs',
                        url: 'https://www.mongodb.com/docs/database-tools/',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Deploy & Manage Replica Sets',
                contentSite: 'docs',
                url: '/docs/v5.0/administration/deploy-manage-self-managed-replica-sets',
                collapsible: true,
                items: [
                  {
                    label: 'Deploy',
                    contentSite: 'docs',
                    url: '/docs/v5.0/administration/replica-set-deployment',
                    collapsible: true,
                    items: [
                      {
                        label: 'Replica Set',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/deploy-replica-set',
                      },
                      {
                        label: 'Convert to Replica Set',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/convert-standalone-to-replica-set',
                      },
                      {
                        label: 'Add Members',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/expand-replica-set',
                      },
                      {
                        label: 'Add an Arbiter',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/add-replica-set-arbiter',
                      },
                      {
                        label: 'Remove Members',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/remove-replica-set-member',
                      },
                      {
                        label: 'Replace a Member',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/replace-replica-set-member',
                      },
                      {
                        label: 'Test & Development Replica Sets',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/deploy-replica-set-for-testing',
                      },
                      {
                        label: 'Geographically Redundant Replica Sets',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/deploy-geographically-distributed-replica-set',
                      },
                    ],
                  },
                  {
                    label: 'Configure',
                    contentSite: 'docs',
                    url: '/docs/v5.0/administration/replica-set-member-configuration',
                    collapsible: true,
                    items: [
                      {
                        label: 'Hidden Members',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/configure-a-hidden-replica-set-member',
                      },
                      {
                        label: 'Delayed Members',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/configure-a-delayed-replica-set-member',
                      },
                      {
                        label: 'Non-Voting Members',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/configure-a-non-voting-replica-set-member',
                      },
                      {
                        label: 'Adjust Member Priority',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/adjust-replica-set-member-priority',
                      },
                      {
                        label: 'Block Secondary Priority',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/configure-secondary-only-replica-set-member',
                      },
                      {
                        label: 'Convert Secondary to Arbiter',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/convert-secondary-into-arbiter',
                      },
                    ],
                  },
                  {
                    label: 'Maintain',
                    contentSite: 'docs',
                    url: '/docs/v5.0/administration/replica-set-maintenance',
                    collapsible: true,
                    items: [
                      {
                        label: 'Change Oplog Size',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/change-oplog-size',
                      },
                      {
                        label: 'Maintain Member',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/perform-maintence-on-replica-set-members',
                      },
                      {
                        label: 'Force a Primary',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/force-member-to-be-primary',
                      },
                      {
                        label: 'Resync a Member',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/resync-replica-set-member',
                      },
                      {
                        label: 'Configure Unavailable Members',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/reconfigure-replica-set-with-unavailable-members',
                      },
                      {
                        label: 'Self-Managed Chained Replication',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/manage-chained-replication',
                      },
                      {
                        label: 'Change Hostname',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/change-hostnames-in-a-replica-set',
                      },
                      {
                        label: 'Configure Sync Target',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/configure-replica-set-secondary-sync-target',
                      },
                      {
                        label: 'Rename',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/rename-unsharded-replica-set',
                      },
                      {
                        label: 'Modify PSA',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/modify-psa-replica-set-safely',
                      },
                      {
                        label: 'Mitigate Performance',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/mitigate-psa-performance-issues',
                      },
                    ],
                  },
                  {
                    label: 'Reference',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/replication',
                    collapsible: true,
                    items: [
                      {
                        label: 'Configuration',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/replica-configuration',
                      },
                      {
                        label: 'Protocol Version',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/replica-set-protocol-versions',
                      },
                      {
                        label: 'Member States',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/replica-states',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Deploy & Manage Sharded Clusters',
                contentSite: 'docs',
                url: '/docs/v5.0/administration/deploy-manage-self-managed-sharded-clusters',
                collapsible: true,
                items: [
                  {
                    label: 'Deploy',
                    contentSite: 'docs',
                    url: '/docs/v5.0/tutorial/deploy-shard-cluster',
                    collapsible: true,
                    items: [
                      {
                        label: 'Tiered Hardware for Varying SLA or SLO',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/sharding-tiered-hardware-for-varying-slas',
                      },
                    ],
                  },
                  {
                    label: 'Administration',
                    contentSite: 'docs',
                    url: '/docs/v5.0/administration/self-managed-sharded-cluster-admin',
                    collapsible: true,
                    items: [
                      {
                        label: 'Config Server Administration',
                        contentSite: 'docs',
                        url: '/docs/v5.0/administration/sharded-cluster-config-servers',
                        collapsible: true,
                        items: [
                          {
                            label: 'Replace a Self-Managed Config Server',
                            contentSite: 'docs',
                            url: '/docs/v5.0/tutorial/replace-config-server',
                          },
                        ],
                      },
                      {
                        label: 'Restart',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/restart-sharded-cluster',
                      },
                      {
                        label: 'Migrate',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/migrate-sharded-cluster-to-new-hardware',
                      },
                      {
                        label: 'Back Up Cluster Metadata',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/backup-sharded-cluster-metadata',
                      },
                      {
                        label: 'Convert Sharded Cluster to Replica Set',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/convert-sharded-cluster-to-replica-set',
                      },
                      {
                        label: 'Convert a Replica Set to a Sharded Cluster',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/convert-replica-set-to-replicated-shard-cluster',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Storage',
                contentSite: 'docs',
                url: '/docs/v5.0/core/self-managed-storage',
                collapsible: true,
                items: [
                  {
                    label: 'Storage Engines',
                    contentSite: 'docs',
                    url: '/docs/v5.0/core/storage-engines',
                    collapsible: true,
                    items: [
                      {
                        label: 'WiredTiger',
                        contentSite: 'docs',
                        url: '/docs/v5.0/core/self-managed-wiredtiger',
                        collapsible: true,
                        items: [
                          {
                            label: 'Convert Standalone',
                            contentSite: 'docs',
                            url: '/docs/v5.0/tutorial/change-standalone-wiredtiger',
                          },
                          {
                            label: 'Convert Replica Set',
                            contentSite: 'docs',
                            url: '/docs/v5.0/tutorial/change-replica-set-wiredtiger',
                          },
                          {
                            label: 'Convert Sharded Cluster',
                            contentSite: 'docs',
                            url: '/docs/v5.0/tutorial/change-sharded-cluster-wiredtiger',
                          },
                        ],
                      },
                      {
                        label: 'In-Memory',
                        contentSite: 'docs',
                        url: '/docs/v5.0/core/inmemory',
                      },
                    ],
                  },
                  {
                    label: 'Manage Journaling',
                    contentSite: 'docs',
                    url: '/docs/v5.0/tutorial/manage-journaling',
                  },
                  {
                    label: 'GridFS',
                    contentSite: 'docs',
                    url: '/docs/v5.0/core/gridfs',
                  },
                  {
                    label: 'FAQ',
                    contentSite: 'docs',
                    url: '/docs/v5.0/faq/storage',
                  },
                ],
              },
              {
                label: 'Administration',
                contentSite: 'docs',
                url: '/docs/v5.0/administration/self-managed-administration',
                collapsible: true,
                items: [
                  {
                    label: 'Production Notes',
                    contentSite: 'docs',
                    url: '/docs/v5.0/administration/production-notes',
                  },
                  {
                    label: 'Operations Checklist',
                    contentSite: 'docs',
                    url: '/docs/v5.0/administration/production-checklist-operations',
                  },
                  {
                    label: 'Performance',
                    contentSite: 'docs',
                    url: '/docs/v5.0/administration/self-managed-performance',
                    collapsible: true,
                    items: [
                      {
                        label: 'Disable Transparent Hugepages',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/transparent-huge-pages',
                      },
                      {
                        label: 'Health Managers',
                        contentSite: 'docs',
                        url: '/docs/v5.0/administration/health-managers',
                      },
                      {
                        label: 'UNIX ulimit',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/ulimit',
                      },
                      {
                        label: 'Full Time Diagnostic Data Capture',
                        contentSite: 'docs',
                        url: '/docs/v5.0/administration/full-time-diagnostic-data-capture',
                      },
                    ],
                  },
                  {
                    label: 'Configuration & Maintenance',
                    contentSite: 'docs',
                    url: '/docs/v5.0/administration/self-managed-configuration-and-maintenance',
                    collapsible: true,
                    items: [
                      {
                        label: 'Run-time Database Configuration',
                        contentSite: 'docs',
                        url: '/docs/v5.0/administration/configuration',
                      },
                      {
                        label: 'Upgrade to the Latest Patch Release',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/upgrade-revision',
                      },
                      {
                        label: 'Manage mongod Processes',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/manage-mongodb-processes',
                      },
                      {
                        label: 'Configuration File Options',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/configuration-options',
                        collapsible: true,
                        items: [
                          {
                            label: 'Externally Sourced Values',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/expansion-directives',
                          },
                          {
                            label: 'Convert Command-Line Options to YAML',
                            contentSite: 'docs',
                            url: '/docs/v5.0/tutorial/convert-command-line-options-to-yaml',
                          },
                          {
                            label: 'Configuration File Settings and Command-Line Options Mapping',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/configuration-file-settings-command-line-options-mapping',
                          },
                        ],
                      },
                      {
                        label: 'Server Parameters',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/parameters',
                      },
                    ],
                  },
                  {
                    label: 'Backup Methods',
                    contentSite: 'docs',
                    url: '/docs/v5.0/core/backups',
                    collapsible: true,
                    items: [
                      {
                        label: 'Use Snapshots',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/backup-with-filesystem-snapshots',
                      },
                      {
                        label: 'Use MongoDB Tools',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/backup-and-restore-tools',
                      },
                      {
                        label: 'Restore Replica Set',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/restore-replica-set-from-backup',
                      },
                      {
                        label: 'Restore Sharded Clusters',
                        contentSite: 'docs',
                        url: '/docs/v5.0/administration/backup-sharded-clusters',
                        collapsible: true,
                        items: [
                          {
                            label: 'Use Snapshots',
                            contentSite: 'docs',
                            url: '/docs/v5.0/tutorial/backup-sharded-cluster-with-filesystem-snapshots',
                          },
                          {
                            label: 'Use Database Dumps',
                            contentSite: 'docs',
                            url: '/docs/v5.0/tutorial/backup-sharded-cluster-with-database-dumps',
                          },
                          {
                            label: 'Schedule Backups',
                            contentSite: 'docs',
                            url: '/docs/v5.0/tutorial/schedule-backup-window-for-sharded-clusters',
                          },
                          {
                            label: 'Restore',
                            contentSite: 'docs',
                            url: '/docs/v5.0/tutorial/restore-sharded-cluster',
                          },
                        ],
                      },
                      {
                        label: 'Recover Standalone',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/recover-data-following-unexpected-shutdown',
                      },
                    ],
                  },
                  {
                    label: 'Monitoring',
                    contentSite: 'docs',
                    url: '/docs/v5.0/administration/monitoring',
                    collapsible: true,
                    items: [
                      {
                        label: 'FAQ: Diagnostics',
                        contentSite: 'docs',
                        url: '/docs/v5.0/faq/diagnostics',
                      },
                      {
                        label: 'Monitor MongoDB With SNMP on Linux',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/monitor-with-snmp',
                      },
                      {
                        label: 'Monitor MongoDB Windows with SNMP',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/monitor-with-snmp-on-windows',
                      },
                      {
                        label: 'Troubleshoot SNMP',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/troubleshoot-snmp',
                      },
                    ],
                  },
                  {
                    label: 'Exit Codes & Statuses',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/exit-codes',
                  },
                ],
              },
              {
                label: 'Security',
                contentSite: 'docs',
                url: '/docs/v5.0/core/self-managed-security',
                collapsible: true,
                items: [
                  {
                    label: 'Security Checklist',
                    contentSite: 'docs',
                    url: '/docs/v5.0/administration/security-checklist',
                  },
                  {
                    label: 'Enable Access Control',
                    contentSite: 'docs',
                    url: '/docs/v5.0/tutorial/enable-authentication',
                  },
                  {
                    label: 'Authentication',
                    contentSite: 'docs',
                    url: '/docs/v5.0/core/authentication',
                    collapsible: true,
                    items: [
                      {
                        label: 'Kerberos',
                        contentSite: 'docs',
                        url: '/docs/v5.0/core/kerberos',
                        collapsible: true,
                        items: [
                          {
                            label: 'Configure on Linux',
                            contentSite: 'docs',
                            url: '/docs/v5.0/tutorial/control-access-to-mongodb-with-kerberos-authentication',
                          },
                          {
                            label: 'Configure on Windows',
                            contentSite: 'docs',
                            url: '/docs/v5.0/tutorial/control-access-to-mongodb-windows-with-kerberos-authentication',
                          },
                          {
                            label: 'Troubleshoot',
                            contentSite: 'docs',
                            url: '/docs/v5.0/tutorial/troubleshoot-kerberos',
                          },
                          {
                            label: 'Use Active Directory Authorization',
                            contentSite: 'docs',
                            url: '/docs/v5.0/tutorial/kerberos-auth-activedirectory-authz',
                          },
                        ],
                      },
                      {
                        label: 'LDAP Proxy',
                        contentSite: 'docs',
                        url: '/docs/v5.0/core/security-ldap',
                        collapsible: true,
                        items: [
                          {
                            label: 'Use ActiveDirectory',
                            contentSite: 'docs',
                            url: '/docs/v5.0/tutorial/configure-ldap-sasl-activedirectory',
                          },
                          {
                            label: 'Use OpenLDAP',
                            contentSite: 'docs',
                            url: '/docs/v5.0/tutorial/configure-ldap-sasl-openldap',
                          },
                          {
                            label: 'Use Native LDAP',
                            contentSite: 'docs',
                            url: '/docs/v5.0/tutorial/authenticate-nativeldap-activedirectory',
                          },
                        ],
                      },
                      {
                        label: 'Internal',
                        contentSite: 'docs',
                        url: '/docs/v5.0/core/security-internal-authentication',
                        collapsible: true,
                        items: [
                          {
                            label: 'Deploy Replica Set',
                            contentSite: 'docs',
                            url: '/docs/v5.0/tutorial/deploy-replica-set-with-keyfile-access-control',
                          },
                          {
                            label: 'Update Replica Set',
                            contentSite: 'docs',
                            url: '/docs/v5.0/tutorial/enforce-keyfile-access-control-in-existing-replica-set',
                          },
                          {
                            label: 'Update Replica Set (No Downtime)',
                            contentSite: 'docs',
                            url: '/docs/v5.0/tutorial/enforce-keyfile-access-control-in-existing-replica-set-without-downtime',
                          },
                          {
                            label: 'Deploy Sharded Cluster',
                            contentSite: 'docs',
                            url: '/docs/v5.0/tutorial/deploy-sharded-cluster-with-keyfile-access-control',
                          },
                          {
                            label: 'Update Sharded Cluster',
                            contentSite: 'docs',
                            url: '/docs/v5.0/tutorial/enforce-keyfile-access-control-in-existing-sharded-cluster',
                          },
                          {
                            label: 'Update Sharded Cluster (No Downtime)',
                            contentSite: 'docs',
                            url: '/docs/v5.0/tutorial/enforce-keyfile-access-control-in-existing-sharded-cluster-no-downtime',
                          },
                          {
                            label: 'Rotate Replica Set Keys',
                            contentSite: 'docs',
                            url: '/docs/v5.0/tutorial/rotate-key-replica-set',
                          },
                          {
                            label: 'Rotate Sharded Cluster Keys',
                            contentSite: 'docs',
                            url: '/docs/v5.0/tutorial/rotate-key-sharded-cluster',
                          },
                          {
                            label: 'Use x.509',
                            contentSite: 'docs',
                            url: '/docs/v5.0/tutorial/configure-x509-member-authentication',
                          },
                          {
                            label: 'Upgrade to x.509 from Keyfile',
                            contentSite: 'docs',
                            url: '/docs/v5.0/tutorial/upgrade-keyfile-to-x509',
                          },
                          {
                            label: 'Update x.509 with New DN',
                            contentSite: 'docs',
                            url: '/docs/v5.0/tutorial/rotate-x509-membership-certificates',
                          },
                        ],
                      },
                      {
                        label: 'Localhost Exception',
                        contentSite: 'docs',
                        url: '/docs/v5.0/core/localhost-exception',
                      },
                      {
                        label: 'Users',
                        contentSite: 'docs',
                        url: '/docs/v5.0/core/security-users',
                        collapsible: true,
                        items: [
                          {
                            label: 'Create',
                            contentSite: 'docs',
                            url: '/docs/v5.0/tutorial/create-users',
                          },
                          {
                            label: 'Authenticate',
                            contentSite: 'docs',
                            url: '/docs/v5.0/tutorial/authenticate-a-user',
                          },
                          {
                            label: 'List',
                            contentSite: 'docs',
                            url: '/docs/v5.0/tutorial/list-users',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    label: 'Role-Base Access Control',
                    contentSite: 'docs',
                    url: '/docs/v5.0/core/authorization',
                    collapsible: true,
                    items: [
                      {
                        label: 'Built-In Roles',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/built-in-roles',
                      },
                      {
                        label: 'User Defined Roles',
                        contentSite: 'docs',
                        url: '/docs/v5.0/core/security-user-defined-roles',
                      },
                      {
                        label: 'Manage Users & Roles',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/manage-users-and-roles',
                      },
                      {
                        label: 'Change Password & Custom Data',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/change-own-password-and-custom-data',
                      },
                      {
                        label: 'Collection-Level Access',
                        contentSite: 'docs',
                        url: '/docs/v5.0/core/collection-level-access-control',
                      },
                      {
                        label: 'LDAP Authorization',
                        contentSite: 'docs',
                        url: '/docs/v5.0/core/security-ldap-external',
                      },
                    ],
                  },
                  {
                    label: 'Auditing',
                    contentSite: 'docs',
                    url: '/docs/v5.0/core/auditing',
                    collapsible: true,
                    items: [
                      {
                        label: 'Configure',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/configure-auditing',
                      },
                      {
                        label: 'Configure Filters',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/configure-audit-filters',
                      },
                      {
                        label: 'Audit Messages',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/audit-message',
                      },
                    ],
                  },
                  {
                    label: 'Network & Configuration Hardening',
                    contentSite: 'docs',
                    url: '/docs/v5.0/core/security-hardening',
                    collapsible: true,
                    items: [
                      {
                        label: 'IP Binding',
                        contentSite: 'docs',
                        url: '/docs/v5.0/core/security-mongodb-configuration',
                      },
                      {
                        label: 'Use Linux iptables',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/configure-linux-iptables-firewall',
                      },
                      {
                        label: 'Use Windows netsh',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/configure-windows-netsh-firewall',
                      },
                    ],
                  },
                  {
                    label: 'Reference',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/security',
                    collapsible: true,
                    items: [
                      {
                        label: 'systems.roles Collection',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/system-roles-collection',
                      },
                      {
                        label: 'systems.users Collection',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/system-users-collection',
                      },
                      {
                        label: 'Resource Document',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/resource-document',
                      },
                      {
                        label: 'Privilege Actions',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/privilege-actions',
                      },
                    ],
                  },
                  {
                    label: 'Appendix',
                    contentSite: 'docs',
                    url: '/docs/v5.0/appendix/security',
                    collapsible: true,
                    items: [
                      {
                        label: 'OpenSSL CA',
                        contentSite: 'docs',
                        url: '/docs/v5.0/appendix/security/appendixA-openssl-ca',
                      },
                      {
                        label: 'OpenSSL Server',
                        contentSite: 'docs',
                        url: '/docs/v5.0/appendix/security/appendixB-openssl-server',
                      },
                      {
                        label: 'OpenSSL Client',
                        contentSite: 'docs',
                        url: '/docs/v5.0/appendix/security/appendixC-openssl-client',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Text Search',
                contentSite: 'docs',
                url: '/docs/v5.0/core/text-search/on-prem',
                collapsible: true,
                items: [
                  {
                    label: 'Perform a Text Search',
                    contentSite: 'docs',
                    url: '/docs/v5.0/core/link-text-indexes',
                  },
                  {
                    label: 'Text Search Operators',
                    contentSite: 'docs',
                    url: '/docs/v5.0/core/text-search-operators',
                    collapsible: true,
                    items: [
                      {
                        label: '$text',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/query/text',
                      },
                    ],
                  },
                  {
                    label: 'Aggregation Pipeline',
                    contentSite: 'docs',
                    url: '/docs/v5.0/tutorial/text-search-in-aggregation',
                  },
                  {
                    label: 'Languages',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/text-search-languages',
                  },
                  {
                    label: 'Text Indexes',
                    contentSite: 'docs',
                    url: '/docs/v5.0/core/index-text',
                    collapsible: true,
                    items: [
                      {
                        label: 'Specify the Default Language for a Text Index on Self-Managed Deployments',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/specify-language-for-text-index',
                      },
                      {
                        label: 'Specify Name for  Index',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/avoid-text-index-name-limit',
                      },
                      {
                        label: 'Assign Weights to Text Search Results on Self-Managed Deployments',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/control-results-of-text-search',
                      },
                      {
                        label: 'Limit Number of Text Index Entries Scanned on Self-Managed Deployments',
                        contentSite: 'docs',
                        url: '/docs/v5.0/tutorial/limit-number-of-items-scanned-for-text-search',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            label: 'FAQ',
            contentSite: 'docs',
            url: '/docs/v5.0/faq',
            collapsible: true,
            items: [
              {
                label: 'Fundamentals',
                contentSite: 'docs',
                url: '/docs/v5.0/faq/fundamentals',
              },
              {
                label: 'Indexes',
                contentSite: 'docs',
                url: '/docs/v5.0/faq/indexes',
              },
              {
                label: 'Concurrency',
                contentSite: 'docs',
                url: '/docs/v5.0/faq/concurrency',
              },
              {
                label: 'Sharding',
                contentSite: 'docs',
                url: '/docs/v5.0/faq/sharding',
              },
              {
                label: 'Replication',
                contentSite: 'docs',
                url: '/docs/v5.0/faq/replica-sets',
              },
            ],
          },
          {
            label: 'Reference',
            contentSite: 'docs',
            url: '/docs/v5.0/reference',
            collapsible: true,
            items: [
              {
                label: 'Collation',
                contentSite: 'docs',
                url: '/docs/v5.0/reference/collation',
                collapsible: true,
                items: [
                  {
                    label: 'Locales & Default Parameters',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/collation-locales-defaults',
                  },
                ],
              },
              {
                label: 'Connection Strings',
                contentSite: 'docs',
                url: '/docs/v5.0/reference/connection-string',
                collapsible: true,
                items: [
                  {
                    label: 'Options',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/connection-string-options',
                  },
                  {
                    label: 'Examples',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/connection-string-examples',
                  },
                ],
              },
              {
                label: 'Database Commands',
                contentSite: 'docs',
                url: '/docs/v5.0/reference/command',
                collapsible: true,
                items: [
                  {
                    label: 'Aggregation',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/command/nav-aggregation',
                    collapsible: true,
                    items: [
                      {
                        label: 'aggregate',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/aggregate',
                      },
                      {
                        label: 'count',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/count',
                      },
                      {
                        label: 'distinct',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/distinct',
                      },
                      {
                        label: 'mapReduce',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/mapReduce',
                      },
                    ],
                  },
                  {
                    label: 'Geospatial',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/command/nav-geospatial',
                    collapsible: true,
                    items: [
                      {
                        label: 'geoSearch',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/geoSearch',
                      },
                    ],
                  },
                  {
                    label: 'Query & Write',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/command/nav-crud',
                    collapsible: true,
                    items: [
                      {
                        label: 'delete',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/delete',
                      },
                      {
                        label: 'find',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/find',
                      },
                      {
                        label: 'findAndModify',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/findAndModify',
                      },
                      {
                        label: 'getLastError',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/getLastError',
                      },
                      {
                        label: 'getMore',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/getMore',
                      },
                      {
                        label: 'insert',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/insert',
                      },
                      {
                        label: 'resetError',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/resetError',
                      },
                      {
                        label: 'update',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/update',
                      },
                    ],
                  },
                  {
                    label: 'Query Plan Cache',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/command/nav-plan-cache',
                    collapsible: true,
                    items: [
                      {
                        label: 'planCacheClear',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/planCacheClear',
                      },
                      {
                        label: 'planCacheClearFilters',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/planCacheClearFilters',
                      },
                      {
                        label: 'planCacheListFilters',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/planCacheListFilters',
                      },
                      {
                        label: 'planCacheSetFilter',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/planCacheSetFilter',
                      },
                    ],
                  },
                  {
                    label: 'Authentication',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/command/nav-authentication',
                    collapsible: true,
                    items: [
                      {
                        label: 'authenticate',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/authenticate',
                      },
                      {
                        label: 'getnonce',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/getnonce',
                      },
                      {
                        label: 'logout',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/logout',
                      },
                    ],
                  },
                  {
                    label: 'User Management',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/command/nav-user-management',
                    collapsible: true,
                    items: [
                      {
                        label: 'createUser',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/createUser',
                      },
                      {
                        label: 'dropAllUsersFromDatabase',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/dropAllUsersFromDatabase',
                      },
                      {
                        label: 'dropUser',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/dropUser',
                      },
                      {
                        label: 'grantRolesToUser',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/grantRolesToUser',
                      },
                      {
                        label: 'revokeRolesFromUser',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/revokeRolesFromUser',
                      },
                      {
                        label: 'updateUser',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/updateUser',
                      },
                      {
                        label: 'usersInfo',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/usersInfo',
                      },
                    ],
                  },
                  {
                    label: 'Role Management',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/command/nav-role-management',
                    collapsible: true,
                    items: [
                      {
                        label: 'createRole',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/createRole',
                      },
                      {
                        label: 'dropRole',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/dropRole',
                      },
                      {
                        label: 'dropAllRolesFromDatabase',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/dropAllRolesFromDatabase',
                      },
                      {
                        label: 'grantPrivilegesToRole',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/grantPrivilegesToRole',
                      },
                      {
                        label: 'grantRolesToRole',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/grantRolesToRole',
                      },
                      {
                        label: 'invalidateUserCache',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/invalidateUserCache',
                      },
                      {
                        label: 'revokePrivilegesFromRole',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/revokePrivilegesFromRole',
                      },
                      {
                        label: 'revokeRolesFromRole',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/revokeRolesFromRole',
                      },
                      {
                        label: 'rolesInfo',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/rolesInfo',
                      },
                      {
                        label: 'updateRole',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/updateRole',
                      },
                    ],
                  },
                  {
                    label: 'Replication',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/command/nav-replication',
                    collapsible: true,
                    items: [
                      {
                        label: 'appendOplogNote',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/appendOplogNote',
                      },
                      {
                        label: 'applyOps',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/applyOps',
                      },
                      {
                        label: 'hello',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/hello',
                      },
                      {
                        label: 'replSetAbortPrimaryCatchUp',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/replSetAbortPrimaryCatchUp',
                      },
                      {
                        label: 'replSetFreeze',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/replSetFreeze',
                      },
                      {
                        label: 'replSetGetConfig',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/replSetGetConfig',
                      },
                      {
                        label: 'replSetGetStatus',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/replSetGetStatus',
                      },
                      {
                        label: 'replSetInitiate',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/replSetInitiate',
                      },
                      {
                        label: 'replSetMaintenance',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/replSetMaintenance',
                      },
                      {
                        label: 'replSetReconfig',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/replSetReconfig',
                      },
                      {
                        label: 'replSetResizeOplog',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/replSetResizeOplog',
                      },
                      {
                        label: 'replSetStepDown',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/replSetStepDown',
                      },
                      {
                        label: 'replSetSyncFrom',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/replSetSyncFrom',
                      },
                    ],
                  },
                  {
                    label: 'Sharding',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/command/nav-sharding',
                    collapsible: true,
                    items: [
                      {
                        label: 'abortReshardCollection',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/abortReshardCollection',
                      },
                      {
                        label: 'addShard',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/addShard',
                      },
                      {
                        label: 'addShardToZone',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/addShardToZone',
                      },
                      {
                        label: 'balancerCollectionStatus',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/balancerCollectionStatus',
                      },
                      {
                        label: 'balancerStart',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/balancerStart',
                      },
                      {
                        label: 'balancerStatus',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/balancerStatus',
                      },
                      {
                        label: 'balancerStop',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/balancerStop',
                      },
                      {
                        label: 'clearJumboFlag',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/clearJumboFlag',
                      },
                      {
                        label: 'cleanupOrphaned',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/cleanupOrphaned',
                      },
                      {
                        label: 'cleanupReshardCollection',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/cleanupReshardCollection',
                      },
                      {
                        label: 'commitReshardCollection',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/commitReshardCollection',
                      },
                      {
                        label: 'enableSharding',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/enableSharding',
                      },
                      {
                        label: 'flushRouterConfig',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/flushRouterConfig',
                      },
                      {
                        label: 'getShard Map',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/getShardMap',
                      },
                      {
                        label: 'isdbgrid',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/isdbgrid',
                      },
                      {
                        label: 'listShards',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/listShards',
                      },
                      {
                        label: 'moveChunk',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/moveChunk',
                      },
                      {
                        label: 'movePrimary',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/movePrimary',
                      },
                      {
                        label: 'mergeChunks',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/mergeChunks',
                      },
                      {
                        label: 'refineCollectionShardKey',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/refineCollectionShardKey',
                      },
                      {
                        label: 'removeShard',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/removeShard',
                      },
                      {
                        label: 'removeShardFromZone',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/removeShardFromZone',
                      },
                      {
                        label: 'reshardCollection',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/reshardCollection',
                      },
                      {
                        label: 'setAllowMigrations',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/setAllowMigrations',
                      },
                      {
                        label: 'shardCollection',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/shardCollection',
                      },
                      {
                        label: 'shardingState',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/shardingState',
                      },
                      {
                        label: 'split',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/split',
                      },
                      {
                        label: 'unsetSharding',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/unsetSharding',
                      },
                      {
                        label: 'updateZoneKeyRange',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/updateZoneKeyRange',
                      },
                    ],
                  },
                  {
                    label: 'Sessions',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/command/nav-sessions',
                    collapsible: true,
                    items: [
                      {
                        label: 'abortTransaction',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/abortTransaction',
                      },
                      {
                        label: 'commitTransaction',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/commitTransaction',
                      },
                      {
                        label: 'endSessions',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/endSessions',
                      },
                      {
                        label: 'killAllSessions',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/killAllSessions',
                      },
                      {
                        label: 'killAllSessionsByPattern',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/killAllSessionsByPattern',
                      },
                      {
                        label: 'killSessions',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/killSessions',
                      },
                      {
                        label: 'refreshSessions',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/refreshSessions',
                      },
                      {
                        label: 'startSession',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/startSession',
                      },
                    ],
                  },
                  {
                    label: 'Administration',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/command/nav-administration',
                    collapsible: true,
                    items: [
                      {
                        label: 'cloneCollectionAsCapped',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/cloneCollectionAsCapped',
                      },
                      {
                        label: 'collMod',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/collMod',
                      },
                      {
                        label: 'compact',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/compact',
                      },
                      {
                        label: 'convertToCapped',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/convertToCapped',
                      },
                      {
                        label: 'create',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/create',
                      },
                      {
                        label: 'createIndexes',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/createIndexes',
                      },
                      {
                        label: 'currentOp',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/currentOp',
                      },
                      {
                        label: 'drop',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/drop',
                      },
                      {
                        label: 'dropDatabase',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/dropDatabase',
                      },
                      {
                        label: 'dropConnections',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/dropConnections',
                      },
                      {
                        label: 'dropIndexes',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/dropIndexes',
                      },
                      {
                        label: 'filemd5',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/filemd5',
                      },
                      {
                        label: 'fsync',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/fsync',
                      },
                      {
                        label: 'fsyncUnlock',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/fsyncUnlock',
                      },
                      {
                        label: 'getAuditConfig',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/getAuditConfig',
                      },
                      {
                        label: 'getDefaultRWConcern',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/getDefaultRWConcern',
                      },
                      {
                        label: 'getParameter',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/getParameter',
                      },
                      {
                        label: 'killCursors',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/killCursors',
                      },
                      {
                        label: 'killOp',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/killOp',
                      },
                      {
                        label: 'listCollections',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/listCollections',
                      },
                      {
                        label: 'listDatabases',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/listDatabases',
                      },
                      {
                        label: 'listIndexes',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/listIndexes',
                      },
                      {
                        label: 'logRotate',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/logRotate',
                      },
                      {
                        label: 'reIndex',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/reIndex',
                      },
                      {
                        label: 'renameCollection',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/renameCollection',
                      },
                      {
                        label: 'rotateCertificates',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/rotateCertificates',
                      },
                      {
                        label: 'setAuditConfig',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/setAuditConfig',
                      },
                      {
                        label: 'setFeatureCompatibilityVersion',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/setFeatureCompatibilityVersion',
                      },
                      {
                        label: 'setIndexCommitQuorum',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/setIndexCommitQuorum',
                      },
                      {
                        label: 'setParameter',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/setParameter',
                      },
                      {
                        label: 'setDefaultRWConcern',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/setDefaultRWConcern',
                      },
                      {
                        label: 'shutdown',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/shutdown',
                      },
                    ],
                  },
                  {
                    label: 'Diagnostics',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/command/nav-diagnostic',
                    collapsible: true,
                    items: [
                      {
                        label: 'availableQueryOptions',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/availableQueryOptions',
                      },
                      {
                        label: 'buildInfo',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/buildInfo',
                      },
                      {
                        label: 'collStats',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/collStats',
                      },
                      {
                        label: 'connPoolStats',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/connPoolStats',
                      },
                      {
                        label: 'connectionStatus',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/connectionStatus',
                      },
                      {
                        label: 'dataSize',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/dataSize',
                      },
                      {
                        label: 'dbHash',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/dbHash',
                      },
                      {
                        label: 'dbStats',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/dbStats',
                      },
                      {
                        label: 'explain',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/explain',
                      },
                      {
                        label: 'getCmdLineOpts',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/getCmdLineOpts',
                      },
                      {
                        label: 'getLog',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/getLog',
                      },
                      {
                        label: 'hostInfo',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/hostInfo',
                      },
                      {
                        label: 'listCommands',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/listCommands',
                      },
                      {
                        label: 'lockInfo',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/lockInfo',
                      },
                      {
                        label: 'ping',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/ping',
                      },
                      {
                        label: 'profile',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/profile',
                      },
                      {
                        label: 'serverStatus',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/serverStatus',
                      },
                      {
                        label: 'shardConnPoolStats',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/shardConnPoolStats',
                      },
                      {
                        label: 'top',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/top',
                      },
                      {
                        label: 'validate',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/validate',
                      },
                      {
                        label: 'validateDBMetadata',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/validateDBMetadata',
                      },
                      {
                        label: 'whatsmyuri',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/whatsmyuri',
                      },
                    ],
                  },
                  {
                    label: 'Auditing',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/command/nav-auditing',
                    collapsible: true,
                    items: [
                      {
                        label: 'logApplicationMessage',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/command/logApplicationMessage',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'DDL Operations',
                contentSite: 'docs',
                url: '/docs/v5.0/reference/ddl-operations',
              },
              {
                label: 'Default Port',
                contentSite: 'docs',
                url: '/docs/v5.0/reference/default-mongodb-port',
              },
              {
                label: 'Read & Write Concerns',
                contentSite: 'docs',
                url: '/docs/v5.0/reference/mongodb-defaults',
              },
              {
                label: 'Error Codes',
                contentSite: 'docs',
                url: '/docs/v5.0/reference/error-codes',
              },
              {
                label: 'Explain Results',
                contentSite: 'docs',
                url: '/docs/v5.0/reference/explain-results',
              },
              {
                label: 'Glossary',
                contentSite: 'docs',
                url: '/docs/v5.0/reference/glossary',
              },
              {
                label: 'Log Messages',
                contentSite: 'docs',
                url: '/docs/v5.0/reference/log-messages',
              },
              {
                label: 'Limits & Thresholds',
                contentSite: 'docs',
                url: '/docs/v5.0/reference/limits',
              },
              {
                label: 'MongoDB Database Tools',
                contentSite: 'docs',
                url: 'https://www.mongodb.com/docs/database-tools/',
              },
              {
                label: 'Wire Protocol',
                contentSite: 'docs',
                url: '/docs/v5.0/reference/mongodb-wire-protocol',
              },
              {
                label: 'mongosh Methods',
                contentSite: 'docs',
                url: '/docs/v5.0/reference/method',
                collapsible: true,
                items: [
                  {
                    label: 'Collections',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/method/js-collection',
                    collapsible: true,
                    items: [
                      {
                        label: 'db.collection.aggregate',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.collection.aggregate',
                      },
                      {
                        label: 'db.collection.bulkWrite',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.collection.bulkWrite',
                      },
                      {
                        label: 'db.collection.count',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.collection.count',
                      },
                      {
                        label: 'db.collection.countDocuments',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.collection.countDocuments',
                      },
                      {
                        label: 'db.collection.createIndex',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.collection.createIndex',
                      },
                      {
                        label: 'db.collection.createIndexes',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.collection.createIndexes',
                      },
                      {
                        label: 'db.collection.dataSize',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.collection.dataSize',
                      },
                      {
                        label: 'db.collection.deleteMany',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.collection.deleteMany',
                      },
                      {
                        label: 'db.collection.deleteOne',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.collection.deleteOne',
                      },
                      {
                        label: 'db.collection.distinct',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.collection.distinct',
                      },
                      {
                        label: 'db.collection.drop',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.collection.drop',
                      },
                      {
                        label: 'db.collection.dropIndex',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.collection.dropIndex',
                      },
                      {
                        label: 'db.collection.dropIndexes',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.collection.dropIndexes',
                      },
                      {
                        label: 'db.collection.ensureIndex',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.collection.ensureIndex',
                      },
                      {
                        label: 'db.collection.estimatedDocumentCount',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.collection.estimatedDocumentCount',
                      },
                      {
                        label: 'db.collection.explain',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.collection.explain',
                      },
                      {
                        label: 'db.collection.find',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.collection.find',
                      },
                      {
                        label: 'db.collection.findAndModify',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.collection.findAndModify',
                      },
                      {
                        label: 'db.collection.findOne',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.collection.findOne',
                      },
                      {
                        label: 'db.collection.findOneAndDelete',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.collection.findOneAndDelete',
                      },
                      {
                        label: 'db.collection.findOneAndReplace',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.collection.findOneAndReplace',
                      },
                      {
                        label: 'db.collection.findOneAndUpdate',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.collection.findOneAndUpdate',
                      },
                      {
                        label: 'db.collection.getIndexes',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.collection.getIndexes',
                      },
                      {
                        label: 'db.collection.getShardDistribution',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.collection.getShardDistribution',
                      },
                      {
                        label: 'db.collection.getShardVersion',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.collection.getShardVersion',
                      },
                      {
                        label: 'db.collection.hideIndex',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.collection.hideIndex',
                      },
                      {
                        label: 'db.collection.insert',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.collection.insert',
                      },
                      {
                        label: 'db.collection.insertMany',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.collection.insertMany',
                      },
                      {
                        label: 'db.collection.insertOne',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.collection.insertOne',
                      },
                      {
                        label: 'db.collection.isCapped',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.collection.isCapped',
                      },
                      {
                        label: 'db.collection.latencyStats',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.collection.latencyStats',
                      },
                      {
                        label: 'db.collection.mapReduce',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.collection.mapReduce',
                      },
                      {
                        label: 'db.collection.reIndex',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.collection.reIndex',
                      },
                      {
                        label: 'db.collection.remove',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.collection.remove',
                      },
                      {
                        label: 'db.collection.renameCollection',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.collection.renameCollection',
                      },
                      {
                        label: 'db.collection.replaceOne',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.collection.replaceOne',
                      },
                      {
                        label: 'db.collection.stats',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.collection.stats',
                      },
                      {
                        label: 'db.collection.storageSize',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.collection.storageSize',
                      },
                      {
                        label: 'db.collection.totalIndexSize',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.collection.totalIndexSize',
                      },
                      {
                        label: 'db.collection.totalSize',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.collection.totalSize',
                      },
                      {
                        label: 'db.collection.unhideIndex',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.collection.unhideIndex',
                      },
                      {
                        label: 'db.collection.update',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.collection.update',
                      },
                      {
                        label: 'db.collection.updateMany',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.collection.updateMany',
                      },
                      {
                        label: 'db.collection.updateOne',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.collection.updateOne',
                      },
                      {
                        label: 'db.collection.validate',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.collection.validate',
                      },
                      {
                        label: 'db.collection.watch',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.collection.watch',
                      },
                    ],
                  },
                  {
                    label: 'Cursors',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/method/js-cursor',
                    collapsible: true,
                    items: [
                      {
                        label: 'cursor.addOption',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/cursor.addOption',
                      },
                      {
                        label: 'cursor.allowDiskUse',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/cursor.allowDiskUse',
                      },
                      {
                        label: 'cursor.allowPartialResults',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/cursor.allowPartialResults',
                      },
                      {
                        label: 'cursor.batchSize',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/cursor.batchSize',
                      },
                      {
                        label: 'cursor.close',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/cursor.close',
                      },
                      {
                        label: 'cursor.isClosed',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/cursor.isClosed',
                      },
                      {
                        label: 'cursor.collation',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/cursor.collation',
                      },
                      {
                        label: 'cursor.comment',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/cursor.comment',
                      },
                      {
                        label: 'cursor.count',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/cursor.count',
                      },
                      {
                        label: 'cursor.explain',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/cursor.explain',
                      },
                      {
                        label: 'cursor.forEach',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/cursor.forEach',
                      },
                      {
                        label: 'cursor.hasNext',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/cursor.hasNext',
                      },
                      {
                        label: 'cursor.hint',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/cursor.hint',
                      },
                      {
                        label: 'cursor.isExhausted',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/cursor.isExhausted',
                      },
                      {
                        label: 'cursor.itcount',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/cursor.itcount',
                      },
                      {
                        label: 'cursor.limit',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/cursor.limit',
                      },
                      {
                        label: 'cursor.map',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/cursor.map',
                      },
                      {
                        label: 'cursor.max',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/cursor.max',
                      },
                      {
                        label: 'cursor.maxTimeMS',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/cursor.maxTimeMS',
                      },
                      {
                        label: 'cursor.min',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/cursor.min',
                      },
                      {
                        label: 'cursor.next',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/cursor.next',
                      },
                      {
                        label: 'cursor.noCursorTimeout',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/cursor.noCursorTimeout',
                      },
                      {
                        label: 'cursor.objsLeftInBatch',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/cursor.objsLeftInBatch',
                      },
                      {
                        label: 'cursor.pretty',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/cursor.pretty',
                      },
                      {
                        label: 'cursor.readConcern',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/cursor.readConcern',
                      },
                      {
                        label: 'cursor.readPref',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/cursor.readPref',
                      },
                      {
                        label: 'cursor.returnKey',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/cursor.returnKey',
                      },
                      {
                        label: 'cursor.showRecordId',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/cursor.showRecordId',
                      },
                      {
                        label: 'cursor.size',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/cursor.size',
                      },
                      {
                        label: 'cursor.skip',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/cursor.skip',
                      },
                      {
                        label: 'cursor.sort',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/cursor.sort',
                      },
                      {
                        label: 'cursor.tailable',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/cursor.tailable',
                      },
                      {
                        label: 'cursor.toArray',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/cursor.toArray',
                      },
                      {
                        label: 'cursor.tryNext',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/cursor.tryNext',
                      },
                    ],
                  },
                  {
                    label: 'Databases',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/method/js-database',
                    collapsible: true,
                    items: [
                      {
                        label: 'db.adminCommand',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.adminCommand',
                      },
                      {
                        label: 'db.aggregate',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.aggregate',
                      },
                      {
                        label: 'db.commandHelp',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.commandHelp',
                      },
                      {
                        label: 'db.createCollection',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.createCollection',
                      },
                      {
                        label: 'db.createView',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.createView',
                      },
                      {
                        label: 'db.currentOp',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.currentOp',
                      },
                      {
                        label: 'db.dropDatabase',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.dropDatabase',
                      },
                      {
                        label: 'db.fsyncLock',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.fsyncLock',
                      },
                      {
                        label: 'db.fsyncUnlock',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.fsyncUnlock',
                      },
                      {
                        label: 'db.getCollection',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.getCollection',
                      },
                      {
                        label: 'db.getCollectionInfos',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.getCollectionInfos',
                      },
                      {
                        label: 'db.getCollectionNames',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.getCollectionNames',
                      },
                      {
                        label: 'db.getLogComponents',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.getLogComponents',
                      },
                      {
                        label: 'db.getMongo',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.getMongo',
                      },
                      {
                        label: 'db.getName',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.getName',
                      },
                      {
                        label: 'db.getProfilingStatus',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.getProfilingStatus',
                      },
                      {
                        label: 'db.getReplicationInfo',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.getReplicationInfo',
                      },
                      {
                        label: 'db.getSiblingDB',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.getSiblingDB',
                      },
                      {
                        label: 'db.hello',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.hello',
                      },
                      {
                        label: 'db.help',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.help',
                      },
                      {
                        label: 'db.hostInfo',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.hostInfo',
                      },
                      {
                        label: 'db.killOp',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.killOp',
                      },
                      {
                        label: 'db.listCommands',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.listCommands',
                      },
                      {
                        label: 'db.logout',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.logout',
                      },
                      {
                        label: 'db.printCollectionStats',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.printCollectionStats',
                      },
                      {
                        label: 'db.printReplicationInfo',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.printReplicationInfo',
                      },
                      {
                        label: 'db.printSecondaryReplicationInfo',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.printSecondaryReplicationInfo',
                      },
                      {
                        label: 'db.printShardingStatus',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.printShardingStatus',
                      },
                      {
                        label: 'db.resetError',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.resetError',
                      },
                      {
                        label: 'db.rotateCertificates',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.rotateCertificates',
                      },
                      {
                        label: 'db.runCommand',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.runCommand',
                      },
                      {
                        label: 'db.serverBuildInfo',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.serverBuildInfo',
                      },
                      {
                        label: 'db.serverCmdLineOpts',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.serverCmdLineOpts',
                      },
                      {
                        label: 'db.serverStatus',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.serverStatus',
                      },
                      {
                        label: 'db.setLogLevel',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.setLogLevel',
                      },
                      {
                        label: 'db.setProfilingLevel',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.setProfilingLevel',
                      },
                      {
                        label: 'db.shutdownServer',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.shutdownServer',
                      },
                      {
                        label: 'db.stats',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.stats',
                      },
                      {
                        label: 'db.version',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.version',
                      },
                      {
                        label: 'db.watch',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.watch',
                      },
                    ],
                  },
                  {
                    label: 'Query Plan Caches',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/method/js-plan-cache',
                    collapsible: true,
                    items: [
                      {
                        label: 'db.collection.getPlanCache',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.collection.getPlanCache',
                      },
                      {
                        label: 'PlanCache.clear',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/PlanCache.clear',
                      },
                      {
                        label: 'PlanCache.clearPlansByQuery',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/PlanCache.clearPlansByQuery',
                      },
                      {
                        label: 'PlanCache.help',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/PlanCache.help',
                      },
                      {
                        label: 'PlanCache.list',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/PlanCache.list',
                      },
                    ],
                  },
                  {
                    label: 'Bulk Operations',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/method/js-bulk',
                    collapsible: true,
                    items: [
                      {
                        label: 'db.collection.initializeOrderedBulkOp',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.collection.initializeOrderedBulkOp',
                      },
                      {
                        label: 'db.collection.initializeUnorderedBulkOp',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.collection.initializeUnorderedBulkOp',
                      },
                      {
                        label: 'Bulk',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/Bulk',
                      },
                      {
                        label: 'Bulk.execute',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/Bulk.execute',
                      },
                      {
                        label: 'Bulk.find',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/Bulk.find',
                      },
                      {
                        label: 'Bulk.find.arrayFilters',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/Bulk.find.arrayFilters',
                      },
                      {
                        label: 'Bulk.find.collation',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/Bulk.find.collation',
                      },
                      {
                        label: 'Bulk.find.delete',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/Bulk.find.delete',
                      },
                      {
                        label: 'Bulk.find.deleteOne',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/Bulk.find.deleteOne',
                      },
                      {
                        label: 'Bulk.find.hint',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/Bulk.find.hint',
                      },
                      {
                        label: 'Bulk.find.remove',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/Bulk.find.remove',
                      },
                      {
                        label: 'Bulk.find.removeOne',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/Bulk.find.removeOne',
                      },
                      {
                        label: 'Bulk.find.replaceOne',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/Bulk.find.replaceOne',
                      },
                      {
                        label: 'Bulk.find.updateOne',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/Bulk.find.updateOne',
                      },
                      {
                        label: 'Bulk.find.update',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/Bulk.find.update',
                      },
                      {
                        label: 'Bulk.find.upsert',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/Bulk.find.upsert',
                      },
                      {
                        label: 'Bulk.getOperations',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/Bulk.getOperations',
                      },
                      {
                        label: 'Bulk.insert',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/Bulk.insert',
                      },
                      {
                        label: 'Bulk.tojson',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/Bulk.tojson',
                      },
                      {
                        label: 'Bulk.toString',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/Bulk.toString',
                      },
                    ],
                  },
                  {
                    label: 'User Management',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/method/js-user-management',
                    collapsible: true,
                    items: [
                      {
                        label: 'db.auth',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.auth',
                      },
                      {
                        label: 'db.changeUserPassword',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.changeUserPassword',
                      },
                      {
                        label: 'db.createUser',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.createUser',
                      },
                      {
                        label: 'db.dropUser',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.dropUser',
                      },
                      {
                        label: 'db.dropAllUsers',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.dropAllUsers',
                      },
                      {
                        label: 'db.getUser',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.getUser',
                      },
                      {
                        label: 'db.getUsers',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.getUsers',
                      },
                      {
                        label: 'db.grantRolesToUser',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.grantRolesToUser',
                      },
                      {
                        label: 'db.removeUser',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.removeUser',
                      },
                      {
                        label: 'db.revokeRolesFromUser',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.revokeRolesFromUser',
                      },
                      {
                        label: 'db.updateUser',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.updateUser',
                      },
                      {
                        label: 'passwordPrompt',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/passwordPrompt',
                      },
                    ],
                  },
                  {
                    label: 'Role Management',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/method/js-role-management',
                    collapsible: true,
                    items: [
                      {
                        label: 'db.createRole',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.createRole',
                      },
                      {
                        label: 'db.dropRole',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.dropRole',
                      },
                      {
                        label: 'db.dropAllRoles',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.dropAllRoles',
                      },
                      {
                        label: 'db.getRole',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.getRole',
                      },
                      {
                        label: 'db.getRoles',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.getRoles',
                      },
                      {
                        label: 'db.grantPrivilegesToRole',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.grantPrivilegesToRole',
                      },
                      {
                        label: 'db.revokePrivilegesFromRole',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.revokePrivilegesFromRole',
                      },
                      {
                        label: 'db.grantRolesToRole',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.grantRolesToRole',
                      },
                      {
                        label: 'db.revokeRolesFromRole',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.revokeRolesFromRole',
                      },
                      {
                        label: 'db.updateRole',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/db.updateRole',
                      },
                    ],
                  },
                  {
                    label: 'Replication',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/method/js-replication',
                    collapsible: true,
                    items: [
                      {
                        label: 'rs.add',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/rs.add',
                      },
                      {
                        label: 'rs.addArb',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/rs.addArb',
                      },
                      {
                        label: 'rs.conf',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/rs.conf',
                      },
                      {
                        label: 'rs.freeze',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/rs.freeze',
                      },
                      {
                        label: 'rs.help',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/rs.help',
                      },
                      {
                        label: 'rs.initiate',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/rs.initiate',
                      },
                      {
                        label: 'rs.printReplicationInfo',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/rs.printReplicationInfo',
                      },
                      {
                        label: 'rs.printSecondaryReplicationInfo',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/rs.printSecondaryReplicationInfo',
                      },
                      {
                        label: 'rs.reconfig',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/rs.reconfig',
                      },
                      {
                        label: 'rs.reconfigForPSASet',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/rs.reconfigForPSASet',
                      },
                      {
                        label: 'rs.remove',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/rs.remove',
                      },
                      {
                        label: 'rs.status',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/rs.status',
                      },
                      {
                        label: 'rs.stepDown',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/rs.stepDown',
                      },
                      {
                        label: 'rs.syncFrom',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/rs.syncFrom',
                      },
                    ],
                  },
                  {
                    label: 'Sharding',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/method/js-sharding',
                    collapsible: true,
                    items: [
                      {
                        label: 'convertShardKeyToHashed',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/convertShardKeyToHashed',
                      },
                      {
                        label: 'sh.abortReshardCollection',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/sh.abortReshardCollection',
                      },
                      {
                        label: 'sh.addShard',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/sh.addShard',
                      },
                      {
                        label: 'sh.addShardTag',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/sh.addShardTag',
                      },
                      {
                        label: 'sh.addShardToZone',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/sh.addShardToZone',
                      },
                      {
                        label: 'sh.addTagRange',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/sh.addTagRange',
                      },
                      {
                        label: 'sh.balancerCollectionStatus',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/sh.balancerCollectionStatus',
                      },
                      {
                        label: 'sh.commitReshardCollection',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/sh.commitReshardCollection',
                      },
                      {
                        label: 'sh.disableAutoSplit',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/sh.disableAutoSplit',
                      },
                      {
                        label: 'sh.disableBalancing',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/sh.disableBalancing',
                      },
                      {
                        label: 'sh.enableBalancing',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/sh.enableBalancing',
                      },
                      {
                        label: 'sh.enableAutoSplit',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/sh.enableAutoSplit',
                      },
                      {
                        label: 'sh.enableSharding',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/sh.enableSharding',
                      },
                      {
                        label: 'sh.getBalancerState',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/sh.getBalancerState',
                      },
                      {
                        label: 'sh.help',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/sh.help',
                      },
                      {
                        label: 'sh.isBalancerRunning',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/sh.isBalancerRunning',
                      },
                      {
                        label: 'sh.moveChunk',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/sh.moveChunk',
                      },
                      {
                        label: 'sh.removeRangeFromZone',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/sh.removeRangeFromZone',
                      },
                      {
                        label: 'sh.removeShardTag',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/sh.removeShardTag',
                      },
                      {
                        label: 'sh.removeShardFromZone',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/sh.removeShardFromZone',
                      },
                      {
                        label: 'sh.removeTagRange',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/sh.removeTagRange',
                      },
                      {
                        label: 'sh.reshardCollection',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/sh.reshardCollection',
                      },
                      {
                        label: 'sh.setBalancerState',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/sh.setBalancerState',
                      },
                      {
                        label: 'sh.shardCollection',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/sh.shardCollection',
                      },
                      {
                        label: 'sh.splitAt',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/sh.splitAt',
                      },
                      {
                        label: 'sh.splitFind',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/sh.splitFind',
                      },
                      {
                        label: 'sh.startBalancer',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/sh.startBalancer',
                      },
                      {
                        label: 'sh.status',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/sh.status',
                      },
                      {
                        label: 'sh.stopBalancer',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/sh.stopBalancer',
                      },
                      {
                        label: 'sh.updateZoneKeyRange',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/sh.updateZoneKeyRange',
                      },
                      {
                        label: 'sh.waitForBalancer',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/sh.waitForBalancer',
                      },
                      {
                        label: 'sh.waitForBalancerOff',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/sh.waitForBalancerOff',
                      },
                      {
                        label: 'sh.waitForPingChange',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/sh.waitForPingChange',
                      },
                    ],
                  },
                  {
                    label: 'Object Constructors',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/method/js-constructor',
                    collapsible: true,
                    items: [
                      {
                        label: 'BinData',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/BinData',
                      },
                      {
                        label: 'BulkWriteResult',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/BulkWriteResult',
                      },
                      {
                        label: 'Date',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/Date',
                      },
                      {
                        label: 'ObjectId',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/ObjectId',
                      },
                      {
                        label: 'ObjectId.getTimestamp',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/ObjectId.getTimestamp',
                      },
                      {
                        label: 'ObjectId.toString',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/ObjectId.toString',
                      },
                      {
                        label: 'UUID',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/UUID',
                      },
                      {
                        label: 'WriteResult',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/WriteResult',
                      },
                    ],
                  },
                  {
                    label: 'Connections',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/method/js-connection',
                    collapsible: true,
                    items: [
                      {
                        label: 'connect',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/connect',
                      },
                      {
                        label: 'Mongo',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/Mongo',
                      },
                      {
                        label: 'Mongo.getDB',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/Mongo.getDB',
                      },
                      {
                        label: 'Mongo.getDBNames',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/Mongo.getDBNames',
                      },
                      {
                        label: 'Mongo.getDBs',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/Mongo.getDBs',
                      },
                      {
                        label: 'Mongo.getReadPrefMode',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/Mongo.getReadPrefMode',
                      },
                      {
                        label: 'Mongo.getReadPrefTagSet',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/Mongo.getReadPrefTagSet',
                      },
                      {
                        label: 'Mongo.setCausalConsistency',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/Mongo.setCausalConsistency',
                      },
                      {
                        label: 'Mongo.setReadPref',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/Mongo.setReadPref',
                      },
                      {
                        label: 'Mongo.startSession',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/Mongo.startSession',
                      },
                      {
                        label: 'Mongo.watch',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/Mongo.watch',
                      },
                      {
                        label: 'Session',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/Session',
                        collapsible: true,
                        items: [
                          {
                            label: 'Session.abortTransaction()',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/method/Session.abortTransaction',
                          },
                          {
                            label: 'Session.commitTransaction()',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/method/Session.commitTransaction',
                          },
                          {
                            label: 'Session.startTransaction()',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/method/Session.startTransaction',
                          },
                          {
                            label: 'Session.withTransaction()',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/method/Session.withTransaction',
                          },
                        ],
                      },
                      {
                        label: 'SessionOptions',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/SessionOptions',
                      },
                    ],
                  },
                  {
                    label: 'Native Methods in ',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/method/js-native',
                  },
                  {
                    label: 'Client-Side Field Level Encryption',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/method/js-client-side-field-level-encryption',
                    collapsible: true,
                    items: [
                      {
                        label: 'ClientEncryption.encrypt',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/ClientEncryption.encrypt',
                      },
                      {
                        label: 'ClientEncryption.decrypt',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/ClientEncryption.decrypt',
                      },
                      {
                        label: 'getClientEncryption',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/getClientEncryption',
                      },
                      {
                        label: 'getKeyVault',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/getKeyVault',
                      },
                      {
                        label: 'KeyVault.addKeyAlternateName',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/KeyVault.addKeyAlternateName',
                      },
                      {
                        label: 'KeyVault.createKey',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/KeyVault.createKey',
                      },
                      {
                        label: 'KeyVault.deleteKey',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/KeyVault.deleteKey',
                      },
                      {
                        label: 'KeyVault.getKey',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/KeyVault.getKey',
                      },
                      {
                        label: 'KeyVault.getKeys',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/KeyVault.getKeys',
                      },
                      {
                        label: 'KeyVault.getKeyByAltName',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/KeyVault.getKeyByAltName',
                      },
                      {
                        label: 'KeyVault.removeKeyAlternateName',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/KeyVault.removeKeyAlternateName',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Operators',
                contentSite: 'docs',
                url: '/docs/v5.0/reference/operator',
                collapsible: true,
                items: [
                  {
                    label: 'Query & Projection',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/operator/query',
                    collapsible: true,
                    items: [
                      {
                        label: 'Comparison Query',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/query-comparison',
                        collapsible: true,
                        items: [
                          {
                            label: '$eq',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/operator/query/eq',
                          },
                          {
                            label: '$gt',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/operator/query/gt',
                          },
                          {
                            label: '$gte',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/operator/query/gte',
                          },
                          {
                            label: '$in',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/operator/query/in',
                          },
                          {
                            label: '$lt',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/operator/query/lt',
                          },
                          {
                            label: '$lte',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/operator/query/lte',
                          },
                          {
                            label: '$ne',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/operator/query/ne',
                          },
                          {
                            label: '$nin',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/operator/query/nin',
                          },
                        ],
                      },
                      {
                        label: 'Logical Query',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/query-logical',
                        collapsible: true,
                        items: [
                          {
                            label: '$and',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/operator/query/and',
                          },
                          {
                            label: '$not',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/operator/query/not',
                          },
                          {
                            label: '$nor',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/operator/query/nor',
                          },
                          {
                            label: '$or',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/operator/query/or',
                          },
                        ],
                      },
                      {
                        label: 'Element Query',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/query-element',
                        collapsible: true,
                        items: [
                          {
                            label: '$exists',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/operator/query/exists',
                          },
                          {
                            label: '$type',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/operator/query/type',
                          },
                        ],
                      },
                      {
                        label: 'Evaluation Query',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/query-evaluation',
                        collapsible: true,
                        items: [
                          {
                            label: '$expr',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/operator/query/expr',
                          },
                          {
                            label: '$jsonSchema',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/operator/query/jsonSchema',
                          },
                          {
                            label: '$mod',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/operator/query/mod',
                          },
                          {
                            label: '$regex',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/operator/query/regex',
                          },
                          {
                            label: '$where',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/operator/query/where',
                          },
                        ],
                      },
                      {
                        label: 'Geospatial Query',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/query-geospatial',
                        collapsible: true,
                        items: [
                          {
                            label: '$geoIntersects',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/operator/query/geoIntersects',
                          },
                          {
                            label: '$geoWithin',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/operator/query/geoWithin',
                          },
                          {
                            label: '$near',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/operator/query/near',
                          },
                          {
                            label: '$nearSphere',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/operator/query/nearSphere',
                          },
                          {
                            label: '$box',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/operator/query/box',
                          },
                          {
                            label: '$center',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/operator/query/center',
                          },
                          {
                            label: '$centerSphere',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/operator/query/centerSphere',
                          },
                          {
                            label: '$geometry',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/operator/query/geometry',
                          },
                          {
                            label: '$maxDistance',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/operator/query/maxDistance',
                          },
                          {
                            label: '$minDistance',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/operator/query/minDistance',
                          },
                          {
                            label: '$polygon',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/operator/query/polygon',
                          },
                        ],
                      },
                      {
                        label: 'Array Query',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/query-array',
                        collapsible: true,
                        items: [
                          {
                            label: '$all',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/operator/query/all',
                          },
                          {
                            label: '$elemMatch',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/operator/query/elemMatch',
                          },
                          {
                            label: '$size',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/operator/query/size',
                          },
                        ],
                      },
                      {
                        label: 'Bitwise Query',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/query-bitwise',
                        collapsible: true,
                        items: [
                          {
                            label: '$bitsAllClear',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/operator/query/bitsAllClear',
                          },
                          {
                            label: '$bitsAllSet',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/operator/query/bitsAllSet',
                          },
                          {
                            label: '$bitsAnyClear',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/operator/query/bitsAnyClear',
                          },
                          {
                            label: '$bitsAnySet',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/operator/query/bitsAnySet',
                          },
                        ],
                      },
                      {
                        label: 'Projection',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/projection',
                        collapsible: true,
                        items: [
                          {
                            label: '$',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/operator/projection/positional',
                          },
                          {
                            label: '$elemMatch',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/operator/projection/elemMatch',
                          },
                          {
                            label: '$slice',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/operator/projection/slice',
                          },
                        ],
                      },
                      {
                        label: 'Miscellaneous',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/query-miscellaneous',
                        collapsible: true,
                        items: [
                          {
                            label: '$comment',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/operator/query/comment',
                          },
                          {
                            label: '$rand',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/operator/query/rand',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    label: 'Update',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/operator/update',
                    collapsible: true,
                    items: [
                      {
                        label: 'Fields',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/update-field',
                        collapsible: true,
                        items: [
                          {
                            label: '$currentDate',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/operator/update/currentDate',
                          },
                          {
                            label: '$inc',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/operator/update/inc',
                          },
                          {
                            label: '$min',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/operator/update/min',
                          },
                          {
                            label: '$max',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/operator/update/max',
                          },
                          {
                            label: '$mul',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/operator/update/mul',
                          },
                          {
                            label: '$rename',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/operator/update/rename',
                          },
                          {
                            label: '$set',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/operator/update/set',
                          },
                          {
                            label: '$setOnInsert',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/operator/update/setOnInsert',
                          },
                          {
                            label: '$unset',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/operator/update/unset',
                          },
                        ],
                      },
                      {
                        label: 'Arrays',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/update-array',
                        collapsible: true,
                        items: [
                          {
                            label: '$ (update)',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/operator/update/positional',
                          },
                          {
                            label: '$[]',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/operator/update/positional-all',
                          },
                          {
                            label: '$[<identifier>]',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/operator/update/positional-filtered',
                          },
                          {
                            label: '$addToSet',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/operator/update/addToSet',
                          },
                          {
                            label: '$pop',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/operator/update/pop',
                          },
                          {
                            label: '$pull',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/operator/update/pull',
                          },
                          {
                            label: '$push',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/operator/update/push',
                          },
                          {
                            label: '$pullAll',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/operator/update/pullAll',
                          },
                          {
                            label: '$each',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/operator/update/each',
                          },
                          {
                            label: '$position',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/operator/update/position',
                          },
                          {
                            label: '$slice',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/operator/update/slice',
                          },
                          {
                            label: '$sort',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/operator/update/sort',
                          },
                        ],
                      },
                      {
                        label: 'Bitwise',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/update-bitwise',
                        collapsible: true,
                        items: [
                          {
                            label: '$bit',
                            contentSite: 'docs',
                            url: '/docs/v5.0/reference/operator/update/bit',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    label: 'Aggregation Pipeline Stages',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/operator/aggregation-pipeline',
                    collapsible: true,
                    items: [
                      {
                        label: '$addFields',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/addFields',
                      },
                      {
                        label: '$bucket',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/bucket',
                      },
                      {
                        label: '$bucketAuto',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/bucketAuto',
                      },
                      {
                        label: '$changeStream',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/changeStream',
                      },
                      {
                        label: '$collStats',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/collStats',
                      },
                      {
                        label: '$count',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/count',
                      },
                      {
                        label: '$currentOp',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/currentOp',
                      },
                      {
                        label: '$facet',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/facet',
                      },
                      {
                        label: '$geoNear',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/geoNear',
                      },
                      {
                        label: '$graphLookup',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/graphLookup',
                      },
                      {
                        label: '$group',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/group',
                      },
                      {
                        label: '$indexStats',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/indexStats',
                      },
                      {
                        label: '$limit',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/limit',
                      },
                      {
                        label: '$listLocalSessions',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/listLocalSessions',
                      },
                      {
                        label: '$listSessions',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/listSessions',
                      },
                      {
                        label: '$lookup',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/lookup',
                      },
                      {
                        label: '$match',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/match',
                      },
                      {
                        label: '$merge',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/merge',
                      },
                      {
                        label: '$out',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/out',
                      },
                      {
                        label: '$planCacheStats',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/planCacheStats',
                      },
                      {
                        label: '$project',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/project',
                      },
                      {
                        label: '$redact',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/redact',
                      },
                      {
                        label: '$replaceRoot',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/replaceRoot',
                      },
                      {
                        label: '$replaceWith',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/replaceWith',
                      },
                      {
                        label: '$sample',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/sample',
                      },
                      {
                        label: '$search',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/search',
                      },
                      {
                        label: '$set',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/set',
                      },
                      {
                        label: '$setWindowFields',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/setWindowFields',
                      },
                      {
                        label: '$skip',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/skip',
                      },
                      {
                        label: '$sort',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/sort',
                      },
                      {
                        label: '$sortByCount',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/sortByCount',
                      },
                      {
                        label: '$unionWith',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/unionWith',
                      },
                      {
                        label: '$unset',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/unset',
                      },
                      {
                        label: '$unwind',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/unwind',
                      },
                    ],
                  },
                  {
                    label: 'Aggregation Pipeline Operators',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/operator/aggregation',
                    collapsible: true,
                    items: [
                      {
                        label: '$abs',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/abs',
                      },
                      {
                        label: '$accumulator',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/accumulator',
                      },
                      {
                        label: '$acos',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/acos',
                      },
                      {
                        label: '$acosh',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/acosh',
                      },
                      {
                        label: '$add',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/add',
                      },
                      {
                        label: '$addToSet',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/addToSet',
                      },
                      {
                        label: '$allElementsTrue',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/allElementsTrue',
                      },
                      {
                        label: '$and',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/and',
                      },
                      {
                        label: '$anyElementTrue',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/anyElementTrue',
                      },
                      {
                        label: '$arrayElemAt',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/arrayElemAt',
                      },
                      {
                        label: '$arrayToObject',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/arrayToObject',
                      },
                      {
                        label: '$asin',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/asin',
                      },
                      {
                        label: '$asinh',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/asinh',
                      },
                      {
                        label: '$atan',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/atan',
                      },
                      {
                        label: '$atan2',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/atan2',
                      },
                      {
                        label: '$atanh',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/atanh',
                      },
                      {
                        label: '$avg',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/avg',
                      },
                      {
                        label: '$binarySize',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/binarySize',
                      },
                      {
                        label: '$bsonSize',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/bsonSize',
                      },
                      {
                        label: '$ceil',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/ceil',
                      },
                      {
                        label: '$cmp',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/cmp',
                      },
                      {
                        label: '$concat',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/concat',
                      },
                      {
                        label: '$concatArrays',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/concatArrays',
                      },
                      {
                        label: '$cond',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/cond',
                      },
                      {
                        label: '$convert',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/convert',
                      },
                      {
                        label: '$cos',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/cos',
                      },
                      {
                        label: '$cosh',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/cosh',
                      },
                      {
                        label: '$count-accumulator',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/count-accumulator',
                      },
                      {
                        label: '$covariancePop',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/covariancePop',
                      },
                      {
                        label: '$covarianceSamp',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/covarianceSamp',
                      },
                      {
                        label: '$dateAdd',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/dateAdd',
                      },
                      {
                        label: '$dateDiff',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/dateDiff',
                      },
                      {
                        label: '$dateFromParts',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/dateFromParts',
                      },
                      {
                        label: '$dateFromString',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/dateFromString',
                      },
                      {
                        label: '$dateSubtract',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/dateSubtract',
                      },
                      {
                        label: '$dateToParts',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/dateToParts',
                      },
                      {
                        label: '$dateToString',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/dateToString',
                      },
                      {
                        label: '$dateTrunc',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/dateTrunc',
                      },
                      {
                        label: '$dayOfMonth',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/dayOfMonth',
                      },
                      {
                        label: '$dayOfWeek',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/dayOfWeek',
                      },
                      {
                        label: '$dayOfYear',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/dayOfYear',
                      },
                      {
                        label: '$degreesToRadians',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/degreesToRadians',
                      },
                      {
                        label: '$denseRank',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/denseRank',
                      },
                      {
                        label: '$derivative',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/derivative',
                      },
                      {
                        label: '$divide',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/divide',
                      },
                      {
                        label: '$documentNumber',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/documentNumber',
                      },
                      {
                        label: '$eq',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/eq',
                      },
                      {
                        label: '$exp',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/exp',
                      },
                      {
                        label: '$expMovingAvg',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/expMovingAvg',
                      },
                      {
                        label: '$filter',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/filter',
                      },
                      {
                        label: '$first',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/first',
                      },
                      {
                        label: '$first (array operator)',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/first-array-element',
                      },
                      {
                        label: '$floor',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/floor',
                      },
                      {
                        label: '$function',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/function',
                      },
                      {
                        label: '$getField',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/getField',
                      },
                      {
                        label: '$gt',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/gt',
                      },
                      {
                        label: '$gte',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/gte',
                      },
                      {
                        label: '$hour',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/hour',
                      },
                      {
                        label: '$ifNull',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/ifNull',
                      },
                      {
                        label: '$in',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/in',
                      },
                      {
                        label: '$indexOfArray',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/indexOfArray',
                      },
                      {
                        label: '$indexOfBytes',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/indexOfBytes',
                      },
                      {
                        label: '$indexOfCP',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/indexOfCP',
                      },
                      {
                        label: '$integral',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/integral',
                      },
                      {
                        label: '$isArray',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/isArray',
                      },
                      {
                        label: '$isNumber',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/isNumber',
                      },
                      {
                        label: '$isoDayOfWeek',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/isoDayOfWeek',
                      },
                      {
                        label: '$isoWeek',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/isoWeek',
                      },
                      {
                        label: '$isoWeekYear',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/isoWeekYear',
                      },
                      {
                        label: '$last',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/last',
                      },
                      {
                        label: '$last (array operator)',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/last-array-element',
                      },
                      {
                        label: '$let',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/let',
                      },
                      {
                        label: '$literal',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/literal',
                      },
                      {
                        label: '$ln',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/ln',
                      },
                      {
                        label: '$log',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/log',
                      },
                      {
                        label: '$log10',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/log10',
                      },
                      {
                        label: '$lt',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/lt',
                      },
                      {
                        label: '$lte',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/lte',
                      },
                      {
                        label: '$ltrim',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/ltrim',
                      },
                      {
                        label: '$map',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/map',
                      },
                      {
                        label: '$max',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/max',
                      },
                      {
                        label: '$mergeObjects',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/mergeObjects',
                      },
                      {
                        label: '$meta',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/meta',
                      },
                      {
                        label: '$min',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/min',
                      },
                      {
                        label: '$millisecond',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/millisecond',
                      },
                      {
                        label: '$minute',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/minute',
                      },
                      {
                        label: '$mod',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/mod',
                      },
                      {
                        label: '$month',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/month',
                      },
                      {
                        label: '$multiply',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/multiply',
                      },
                      {
                        label: '$ne',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/ne',
                      },
                      {
                        label: '$not',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/not',
                      },
                      {
                        label: '$objectToArray',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/objectToArray',
                      },
                      {
                        label: '$or',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/or',
                      },
                      {
                        label: '$pow',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/pow',
                      },
                      {
                        label: '$push',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/push',
                      },
                      {
                        label: '$radiansToDegrees',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/radiansToDegrees',
                      },
                      {
                        label: '$rand',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/rand',
                      },
                      {
                        label: '$range',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/range',
                      },
                      {
                        label: '$rank',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/rank',
                      },
                      {
                        label: '$reduce',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/reduce',
                      },
                      {
                        label: '$regexFind',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/regexFind',
                      },
                      {
                        label: '$regexFindAll',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/regexFindAll',
                      },
                      {
                        label: '$regexMatch',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/regexMatch',
                      },
                      {
                        label: '$replaceOne',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/replaceOne',
                      },
                      {
                        label: '$replaceAll',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/replaceAll',
                      },
                      {
                        label: '$reverseArray',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/reverseArray',
                      },
                      {
                        label: '$round',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/round',
                      },
                      {
                        label: '$rtrim',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/rtrim',
                      },
                      {
                        label: '$sampleRate',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/sampleRate',
                      },
                      {
                        label: '$second',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/second',
                      },
                      {
                        label: '$setDifference',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/setDifference',
                      },
                      {
                        label: '$setEquals',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/setEquals',
                      },
                      {
                        label: '$setField',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/setField',
                      },
                      {
                        label: '$setIntersection',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/setIntersection',
                      },
                      {
                        label: '$setIsSubset',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/setIsSubset',
                      },
                      {
                        label: '$setUnion',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/setUnion',
                      },
                      {
                        label: '$shift',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/shift',
                      },
                      {
                        label: '$size',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/size',
                      },
                      {
                        label: '$sin',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/sin',
                      },
                      {
                        label: '$sinh',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/sinh',
                      },
                      {
                        label: '$slice',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/slice',
                      },
                      {
                        label: '$split',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/split',
                      },
                      {
                        label: '$sqrt',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/sqrt',
                      },
                      {
                        label: '$stdDevPop',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/stdDevPop',
                      },
                      {
                        label: '$stdDevSamp',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/stdDevSamp',
                      },
                      {
                        label: '$strcasecmp',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/strcasecmp',
                      },
                      {
                        label: '$strLenBytes',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/strLenBytes',
                      },
                      {
                        label: '$strLenCP',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/strLenCP',
                      },
                      {
                        label: '$substr',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/substr',
                      },
                      {
                        label: '$substrBytes',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/substrBytes',
                      },
                      {
                        label: '$substrCP',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/substrCP',
                      },
                      {
                        label: '$subtract',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/subtract',
                      },
                      {
                        label: '$sum',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/sum',
                      },
                      {
                        label: '$switch',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/switch',
                      },
                      {
                        label: '$tan',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/tan',
                      },
                      {
                        label: '$tanh',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/tanh',
                      },
                      {
                        label: '$toBool',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/toBool',
                      },
                      {
                        label: '$toDate',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/toDate',
                      },
                      {
                        label: '$toDecimal',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/toDecimal',
                      },
                      {
                        label: '$toDouble',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/toDouble',
                      },
                      {
                        label: '$toInt',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/toInt',
                      },
                      {
                        label: '$toLong',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/toLong',
                      },
                      {
                        label: '$toObjectId',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/toObjectId',
                      },
                      {
                        label: '$toString',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/toString',
                      },
                      {
                        label: '$toLower',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/toLower',
                      },
                      {
                        label: '$toUpper',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/toUpper',
                      },
                      {
                        label: '$trim',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/trim',
                      },
                      {
                        label: '$trunc',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/trunc',
                      },
                      {
                        label: '$type',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/type',
                      },
                      {
                        label: '$unsetField',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/unsetField',
                      },
                      {
                        label: '$week',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/week',
                      },
                      {
                        label: '$year',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/year',
                      },
                      {
                        label: '$zip',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/aggregation/zip',
                      },
                    ],
                  },
                  {
                    label: 'Query Modifiers',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/operator/query-modifier',
                    collapsible: true,
                    items: [
                      {
                        label: '$comment',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/meta/comment',
                      },
                      {
                        label: '$explain',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/meta/explain',
                      },
                      {
                        label: '$hint',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/meta/hint',
                      },
                      {
                        label: '$max',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/meta/max',
                      },
                      {
                        label: '$maxTimeMS',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/meta/maxTimeMS',
                      },
                      {
                        label: '$min',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/meta/min',
                      },
                      {
                        label: '$orderby',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/meta/orderby',
                      },
                      {
                        label: '$query',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/meta/query',
                      },
                      {
                        label: '$returnKey',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/meta/returnKey',
                      },
                      {
                        label: '$showDiskLoc',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/meta/showDiskLoc',
                      },
                      {
                        label: '$natural',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/operator/meta/natural',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Server Sessions',
                contentSite: 'docs',
                url: '/docs/v5.0/reference/server-sessions',
              },
              {
                label: 'Stable API',
                contentSite: 'docs',
                url: '/docs/v5.0/reference/stable-api',
                collapsible: true,
                items: [
                  {
                    label: 'Migrate to Later Version',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/stable-api-reference',
                  },
                  {
                    label: 'Changelog',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/stable-api-changelog',
                  },
                ],
              },
              {
                label: 'System Collections',
                contentSite: 'docs',
                url: '/docs/v5.0/reference/system-collections',
              },
              {
                label: 'Legacy mongo Shell',
                contentSite: 'docs',
                url: '/docs/v5.0/reference/mongo',
                collapsible: true,
                items: [
                  {
                    label: 'Configure the  Shell',
                    contentSite: 'docs',
                    url: '/docs/v5.0/tutorial/configure-mongo-shell',
                  },
                  {
                    label: 'Access the  Shell Help',
                    contentSite: 'docs',
                    url: '/docs/v5.0/tutorial/access-mongo-shell-help',
                  },
                  {
                    label: 'Write Scripts for the  Shell',
                    contentSite: 'docs',
                    url: '/docs/v5.0/tutorial/write-scripts-for-the-mongo-shell',
                  },
                  {
                    label: 'Data Types in the Legacy  Shell',
                    contentSite: 'docs',
                    url: '/docs/v5.0/core/shell-types',
                  },
                  {
                    label: 'Native Methods in the Legacy Shell',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/method/js-native-legacy',
                    collapsible: true,
                    items: [
                      {
                        label: 'cat()',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/cat',
                      },
                      {
                        label: 'cd()',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/cd',
                      },
                      {
                        label: 'copyDbpath()',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/copyDbpath',
                      },
                      {
                        label: 'getHostName()',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/getHostName',
                      },
                      {
                        label: 'getMemInfo()',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/getMemInfo',
                      },
                      {
                        label: 'hostname()',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/hostname',
                      },
                      {
                        label: 'isInteractive()',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/isInteractive',
                      },
                      {
                        label: 'listFiles()',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/listFiles',
                      },
                      {
                        label: 'load()',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/load',
                      },
                      {
                        label: 'ls()',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/ls',
                      },
                      {
                        label: 'md5sumFile()',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/md5sumFile',
                      },
                      {
                        label: 'mkdir()',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/mkdir',
                      },
                      {
                        label: 'pwd()',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/pwd',
                      },
                      {
                        label: 'quit()',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/quit',
                      },
                      {
                        label: 'removeFile()',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/removeFile',
                      },
                      {
                        label: 'resetDbpath()',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/resetDbpath',
                      },
                      {
                        label: 'sleep()',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/sleep',
                      },
                      {
                        label: 'setVerboseShell()',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/setVerboseShell',
                      },
                      {
                        label: 'version()',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/version',
                      },
                      {
                        label: '_isWindows()',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/isWindows',
                      },
                      {
                        label: '_rand()',
                        contentSite: 'docs',
                        url: '/docs/v5.0/reference/method/rand',
                      },
                    ],
                  },
                  {
                    label: ' Shell Quick Reference',
                    contentSite: 'docs',
                    url: '/docs/v5.0/reference/mongo-shell',
                  },
                ],
              },
            ],
          },
          {
            label: 'Release Notes',
            contentSite: 'docs',
            url: '/docs/v5.0/release-notes',
            collapsible: true,
            items: [
              {
                label: '5.0',
                contentSite: 'docs',
                url: '/docs/v5.0/release-notes/5.0',
                collapsible: true,
                items: [
                  {
                    label: 'Compatibility Changes',
                    contentSite: 'docs',
                    url: '/docs/v5.0/release-notes/5.0-compatibility',
                  },
                  {
                    label: 'Upgrade 4.4 to 5.0',
                    contentSite: 'docs',
                    url: '/docs/v5.0/release-notes/5.0-upgrade',
                    collapsible: true,
                    items: [
                      {
                        label: 'Standalone',
                        contentSite: 'docs',
                        url: '/docs/v5.0/release-notes/5.0-upgrade-standalone',
                      },
                      {
                        label: 'Replica Set',
                        contentSite: 'docs',
                        url: '/docs/v5.0/release-notes/5.0-upgrade-replica-set',
                      },
                      {
                        label: 'Sharded Cluster',
                        contentSite: 'docs',
                        url: '/docs/v5.0/release-notes/5.0-upgrade-sharded-cluster',
                      },
                    ],
                  },
                  {
                    label: 'Downgrade 5.0 to 4.4',
                    contentSite: 'docs',
                    url: '/docs/v5.0/release-notes/5.0-downgrade',
                    collapsible: true,
                    items: [
                      {
                        label: 'Standalone',
                        contentSite: 'docs',
                        url: '/docs/v5.0/release-notes/5.0-downgrade-standalone',
                      },
                      {
                        label: 'Replica Set',
                        contentSite: 'docs',
                        url: '/docs/v5.0/release-notes/5.0-downgrade-replica-set',
                      },
                      {
                        label: 'Sharded Cluster',
                        contentSite: 'docs',
                        url: '/docs/v5.0/release-notes/5.0-downgrade-sharded-cluster',
                      },
                    ],
                  },
                  {
                    label: 'Changelog',
                    contentSite: 'docs',
                    url: '/docs/v5.0/release-notes/5.0-changelog',
                  },
                ],
              },
              {
                label: 'Versioning',
                contentSite: 'docs',
                url: '/docs/v5.0/reference/versioning',
              },
            ],
          },
          {
            label: 'Technical Support',
            contentSite: 'docs',
            url: '/docs/v5.0/support',
          },
        ],
      },
    ],
  },
];
