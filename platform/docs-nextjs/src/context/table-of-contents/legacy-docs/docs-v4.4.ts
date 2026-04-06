import type { TocItem } from '@/components/unified-sidenav/types';

export const toc: TocItem[] = [
  {
    label: 'Legacy Docs',
    contentSite: 'docs',
    url: '/docs/v4.4/',
    items: [
      {
        label: 'MongoDB Manual',
        contentSite: 'docs',
        group: true,
        items: [
          {
            label: 'Introduction',
            contentSite: 'docs',
            url: '/docs/v4.4/introduction',
            collapsible: true,
            items: [
              {
                label: 'Getting Started',
                contentSite: 'docs',
                url: '/docs/v4.4/tutorial/getting-started',
              },
              {
                label: 'Create an Atlas Free Tier Cluster',
                contentSite: 'docs',
                url: 'https://www.mongodb.com/docs/get-started/',
              },
              {
                label: 'Databases and Collections',
                contentSite: 'docs',
                url: '/docs/v4.4/core/databases-and-collections',
                collapsible: true,
                items: [
                  {
                    label: 'Views',
                    contentSite: 'docs',
                    url: '/docs/v4.4/core/views',
                  },
                  {
                    label: 'On-Demand Materialized Views',
                    contentSite: 'docs',
                    url: '/docs/v4.4/core/materialized-views',
                  },
                  {
                    label: 'Use a View to Join Two Collections',
                    contentSite: 'docs',
                    url: '/docs/v4.4/core/views/join-collections-with-view',
                  },
                  {
                    label: 'Capped Collections',
                    contentSite: 'docs',
                    url: '/docs/v4.4/core/capped-collections',
                  },
                ],
              },
              {
                label: 'Documents',
                contentSite: 'docs',
                url: '/docs/v4.4/core/document',
              },
              {
                label: 'BSON Types',
                contentSite: 'docs',
                url: '/docs/v4.4/reference/bson-types',
                collapsible: true,
                items: [
                  {
                    label: 'Comparison/Sort Order',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/bson-type-comparison-order',
                  },
                  {
                    label: 'MongoDB Extended JSON (v2)',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/mongodb-extended-json',
                  },
                  {
                    label: 'MongoDB Extended JSON (v1)',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/mongodb-extended-json-v1',
                  },
                ],
              },
            ],
          },
          {
            label: 'Installation',
            contentSite: 'docs',
            url: '/docs/v4.4/installation',
            collapsible: true,
            items: [
              {
                label: 'Install MongoDB Community Edition',
                contentSite: 'docs',
                url: '/docs/v4.4/administration/install-community',
                collapsible: true,
                items: [
                  {
                    label: 'Install on Linux',
                    contentSite: 'docs',
                    url: '/docs/v4.4/administration/install-on-linux',
                    collapsible: true,
                    items: [
                      {
                        label: 'Install on Red Hat',
                        contentSite: 'docs',
                        url: '/docs/v4.4/tutorial/install-mongodb-on-red-hat',
                        collapsible: true,
                        items: [
                          {
                            label: 'Install using .tgz Tarball',
                            contentSite: 'docs',
                            url: '/docs/v4.4/tutorial/install-mongodb-on-red-hat-tarball',
                          },
                        ],
                      },
                      {
                        label: 'Install on Ubuntu',
                        contentSite: 'docs',
                        url: '/docs/v4.4/tutorial/install-mongodb-on-ubuntu',
                        collapsible: true,
                        items: [
                          {
                            label: 'Install using .tgz Tarball',
                            contentSite: 'docs',
                            url: '/docs/v4.4/tutorial/install-mongodb-on-ubuntu-tarball',
                          },
                          {
                            label: 'Troubleshoot Ubuntu Installation',
                            contentSite: 'docs',
                            url: '/docs/v4.4/reference/installation-ubuntu-community-troubleshooting',
                          },
                        ],
                      },
                      {
                        label: 'Install on Debian',
                        contentSite: 'docs',
                        url: '/docs/v4.4/tutorial/install-mongodb-on-debian',
                        collapsible: true,
                        items: [
                          {
                            label: 'Install using .tgz Tarball',
                            contentSite: 'docs',
                            url: '/docs/v4.4/tutorial/install-mongodb-on-debian-tarball',
                          },
                        ],
                      },
                      {
                        label: 'Install on SUSE',
                        contentSite: 'docs',
                        url: '/docs/v4.4/tutorial/install-mongodb-on-suse',
                        collapsible: true,
                        items: [
                          {
                            label: 'Install using .tgz Tarball',
                            contentSite: 'docs',
                            url: '/docs/v4.4/tutorial/install-mongodb-on-suse-tarball',
                          },
                        ],
                      },
                      {
                        label: 'Install on Amazon',
                        contentSite: 'docs',
                        url: '/docs/v4.4/tutorial/install-mongodb-on-amazon',
                        collapsible: true,
                        items: [
                          {
                            label: 'Install using .tgz Tarball',
                            contentSite: 'docs',
                            url: '/docs/v4.4/tutorial/install-mongodb-on-amazon-tarball',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    label: 'Install on macOS',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/install-mongodb-on-os-x',
                    collapsible: true,
                    items: [
                      {
                        label: 'Install using .tgz Tarball',
                        contentSite: 'docs',
                        url: '/docs/v4.4/tutorial/install-mongodb-on-os-x-tarball',
                      },
                    ],
                  },
                  {
                    label: 'Install on Windows',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/install-mongodb-on-windows',
                    collapsible: true,
                    items: [
                      {
                        label: 'Install using msiexec.exe',
                        contentSite: 'docs',
                        url: '/docs/v4.4/tutorial/install-mongodb-on-windows-unattended',
                      },
                    ],
                  },
                  {
                    label: 'Install with Docker',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/install-mongodb-community-with-docker',
                  },
                ],
              },
              {
                label: 'Install MongoDB Enterprise',
                contentSite: 'docs',
                url: '/docs/v4.4/administration/install-enterprise',
                collapsible: true,
                items: [
                  {
                    label: 'Install on Linux',
                    contentSite: 'docs',
                    url: '/docs/v4.4/administration/install-enterprise-linux',
                    collapsible: true,
                    items: [
                      {
                        label: 'Install on Red Hat',
                        contentSite: 'docs',
                        url: '/docs/v4.4/tutorial/install-mongodb-enterprise-on-red-hat',
                        collapsible: true,
                        items: [
                          {
                            label: 'Install using .tgz Tarball',
                            contentSite: 'docs',
                            url: '/docs/v4.4/tutorial/install-mongodb-enterprise-on-red-hat-tarball',
                          },
                        ],
                      },
                      {
                        label: 'Install on Ubuntu',
                        contentSite: 'docs',
                        url: '/docs/v4.4/tutorial/install-mongodb-enterprise-on-ubuntu',
                        collapsible: true,
                        items: [
                          {
                            label: 'Install using .tgz Tarball',
                            contentSite: 'docs',
                            url: '/docs/v4.4/tutorial/install-mongodb-enterprise-on-ubuntu-tarball',
                          },
                        ],
                      },
                      {
                        label: 'Install on Debian',
                        contentSite: 'docs',
                        url: '/docs/v4.4/tutorial/install-mongodb-enterprise-on-debian',
                        collapsible: true,
                        items: [
                          {
                            label: 'Install using .tgz Tarball',
                            contentSite: 'docs',
                            url: '/docs/v4.4/tutorial/install-mongodb-enterprise-on-debian-tarball',
                          },
                        ],
                      },
                      {
                        label: 'Install on SUSE',
                        contentSite: 'docs',
                        url: '/docs/v4.4/tutorial/install-mongodb-enterprise-on-suse',
                        collapsible: true,
                        items: [
                          {
                            label: 'Install using .tgz Tarball',
                            contentSite: 'docs',
                            url: '/docs/v4.4/tutorial/install-mongodb-enterprise-on-suse-tarball',
                          },
                        ],
                      },
                      {
                        label: 'Install on Amazon',
                        contentSite: 'docs',
                        url: '/docs/v4.4/tutorial/install-mongodb-enterprise-on-amazon',
                        collapsible: true,
                        items: [
                          {
                            label: 'Install using .tgz Tarball',
                            contentSite: 'docs',
                            url: '/docs/v4.4/tutorial/install-mongodb-enterprise-on-amazon-tarball',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    label: 'Install on macOS',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/install-mongodb-enterprise-on-os-x',
                  },
                  {
                    label: 'Install on Windows',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/install-mongodb-enterprise-on-windows',
                    collapsible: true,
                    items: [
                      {
                        label: 'Install using msiexec.exe',
                        contentSite: 'docs',
                        url: '/docs/v4.4/tutorial/install-mongodb-enterprise-on-windows-unattended',
                      },
                    ],
                  },
                  {
                    label: 'Install with Docker',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/install-mongodb-enterprise-with-docker',
                  },
                ],
              },
              {
                label: 'Upgrade MongoDB Community to MongoDB Enterprise',
                contentSite: 'docs',
                url: '/docs/v4.4/administration/upgrade-community-to-enterprise',
                collapsible: true,
                items: [
                  {
                    label: 'Upgrade to MongoDB Enterprise (Standalone)',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/upgrade-to-enterprise-standalone',
                  },
                  {
                    label: 'Upgrade to MongoDB Enterprise (Replica Set)',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/upgrade-to-enterprise-replica-set',
                  },
                  {
                    label: 'Upgrade to MongoDB Enterprise (Sharded Cluster)',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/upgrade-to-enterprise-sharded-cluster',
                  },
                ],
              },
              {
                label: 'Verify Integrity of MongoDB Packages',
                contentSite: 'docs',
                url: '/docs/v4.4/tutorial/verify-mongodb-packages',
              },
            ],
          },
          {
            label: 'The  Shell',
            contentSite: 'docs',
            url: '/docs/v4.4/mongo',
            collapsible: true,
            items: [
              {
                label: 'Configure the  Shell',
                contentSite: 'docs',
                url: '/docs/v4.4/tutorial/configure-mongo-shell',
              },
              {
                label: 'Access the  Shell Help',
                contentSite: 'docs',
                url: '/docs/v4.4/tutorial/access-mongo-shell-help',
              },
              {
                label: 'Write Scripts for the  Shell',
                contentSite: 'docs',
                url: '/docs/v4.4/tutorial/write-scripts-for-the-mongo-shell',
              },
              {
                label: 'Data Types in the  Shell',
                contentSite: 'docs',
                url: '/docs/v4.4/core/shell-types',
              },
              {
                label: ' Shell Quick Reference',
                contentSite: 'docs',
                url: '/docs/v4.4/reference/mongo-shell',
              },
            ],
          },
          {
            label: 'MongoDB CRUD Operations',
            contentSite: 'docs',
            url: '/docs/v4.4/crud',
            collapsible: true,
            items: [
              {
                label: 'Insert Documents',
                contentSite: 'docs',
                url: '/docs/v4.4/tutorial/insert-documents',
                collapsible: true,
                items: [
                  {
                    label: 'Insert Methods',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/insert-methods',
                  },
                ],
              },
              {
                label: 'Query Documents',
                contentSite: 'docs',
                url: '/docs/v4.4/tutorial/query-documents',
                collapsible: true,
                items: [
                  {
                    label: 'Query on Embedded/Nested Documents',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/query-embedded-documents',
                  },
                  {
                    label: 'Query an Array',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/query-arrays',
                  },
                  {
                    label: 'Query an Array of Embedded Documents',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/query-array-of-documents',
                  },
                  {
                    label: 'Project Fields to Return from Query',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/project-fields-from-query-results',
                  },
                  {
                    label: 'Query for Null or Missing Fields',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/query-for-null-fields',
                  },
                  {
                    label: 'Iterate a Cursor in the  Shell',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/iterate-a-cursor',
                  },
                ],
              },
              {
                label: 'Update Documents',
                contentSite: 'docs',
                url: '/docs/v4.4/tutorial/update-documents',
                collapsible: true,
                items: [
                  {
                    label: 'Updates with Aggregation Pipeline',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/update-documents-with-aggregation-pipeline',
                  },
                  {
                    label: 'Update Methods',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/update-methods',
                  },
                ],
              },
              {
                label: 'Delete Documents',
                contentSite: 'docs',
                url: '/docs/v4.4/tutorial/remove-documents',
                collapsible: true,
                items: [
                  {
                    label: 'Delete Methods',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/delete-methods',
                  },
                ],
              },
              {
                label: 'Bulk Write Operations',
                contentSite: 'docs',
                url: '/docs/v4.4/core/bulk-write-operations',
              },
              {
                label: 'Retryable Writes',
                contentSite: 'docs',
                url: '/docs/v4.4/core/retryable-writes',
              },
              {
                label: 'Retryable Reads',
                contentSite: 'docs',
                url: '/docs/v4.4/core/retryable-reads',
              },
              {
                label: 'SQL to MongoDB Mapping Chart',
                contentSite: 'docs',
                url: '/docs/v4.4/reference/sql-comparison',
              },
              {
                label: 'Text Search',
                contentSite: 'docs',
                url: '/docs/v4.4/text-search',
                collapsible: true,
                items: [
                  {
                    label: 'MongoDB Atlas Search',
                    contentSite: 'docs',
                    url: 'https://www.mongodb.com/docs/atlas/atlas-search/',
                  },
                  {
                    label: 'Text Search on Self-Managed Deployments',
                    contentSite: 'docs',
                    url: '/docs/v4.4/core/text-search/on-prem',
                    collapsible: true,
                    items: [
                      {
                        label: 'Perform a Text Search (Self-Managed Deployments)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/core/link-text-indexes',
                      },
                      {
                        label: 'Text Search Operators (Self-Managed Deployments)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/core/text-search-operators',
                      },
                      {
                        label: 'Text Search in the Aggregation Pipeline',
                        contentSite: 'docs',
                        url: '/docs/v4.4/tutorial/text-search-in-aggregation',
                      },
                      {
                        label: 'Text Search Languages',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/text-search-languages',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Geospatial Queries',
                contentSite: 'docs',
                url: '/docs/v4.4/geospatial-queries',
                collapsible: true,
                items: [
                  {
                    label: 'Find Restaurants with Geospatial Queries',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/geospatial-tutorial',
                  },
                  {
                    label: 'GeoJSON Objects',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/geojson',
                  },
                ],
              },
              {
                label: 'Read Isolation (Read Concern)',
                contentSite: 'docs',
                url: '/docs/v4.4/reference/read-concern',
                collapsible: true,
                items: [
                  {
                    label: 'Read Concern ',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/read-concern-local',
                  },
                  {
                    label: 'Read Concern ',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/read-concern-available',
                  },
                  {
                    label: 'Read Concern "majority"',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/read-concern-majority',
                  },
                  {
                    label: 'Read Concern ',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/read-concern-linearizable',
                  },
                  {
                    label: 'Read Concern ',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/read-concern-snapshot',
                  },
                ],
              },
              {
                label: 'Write Acknowledgement (Write Concern)',
                contentSite: 'docs',
                url: '/docs/v4.4/reference/write-concern',
              },
              {
                label: 'MongoDB CRUD Concepts',
                contentSite: 'docs',
                url: '/docs/v4.4/core/crud',
                collapsible: true,
                items: [
                  {
                    label: 'Atomicity and Transactions',
                    contentSite: 'docs',
                    url: '/docs/v4.4/core/write-operations-atomicity',
                  },
                  {
                    label: 'Read Isolation, Consistency, and Recency',
                    contentSite: 'docs',
                    url: '/docs/v4.4/core/read-isolation-consistency-recency',
                    collapsible: true,
                    items: [
                      {
                        label: 'Causal Consistency and Read and Write Concerns',
                        contentSite: 'docs',
                        url: '/docs/v4.4/core/causal-consistency-read-write-concerns',
                      },
                    ],
                  },
                  {
                    label: 'Distributed Queries',
                    contentSite: 'docs',
                    url: '/docs/v4.4/core/distributed-queries',
                  },
                  {
                    label: 'Linearizable Reads via ',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/perform-findAndModify-linearizable-reads',
                  },
                  {
                    label: 'Query Plans',
                    contentSite: 'docs',
                    url: '/docs/v4.4/core/query-plans',
                  },
                  {
                    label: 'Query Optimization',
                    contentSite: 'docs',
                    url: '/docs/v4.4/core/query-optimization',
                    collapsible: true,
                    items: [
                      {
                        label: 'Evaluate Performance of Current Operations',
                        contentSite: 'docs',
                        url: '/docs/v4.4/tutorial/evaluate-operation-performance',
                      },
                      {
                        label: 'Optimize Query Performance',
                        contentSite: 'docs',
                        url: '/docs/v4.4/tutorial/optimize-query-performance-with-indexes-and-projections',
                      },
                      {
                        label: 'Write Operation Performance',
                        contentSite: 'docs',
                        url: '/docs/v4.4/core/write-performance',
                      },
                      {
                        label: 'Explain Results',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/explain-results',
                      },
                    ],
                  },
                  {
                    label: 'Analyze Query Performance',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/analyze-query-plan',
                  },
                  {
                    label: 'Tailable Cursors',
                    contentSite: 'docs',
                    url: '/docs/v4.4/core/tailable-cursors',
                  },
                ],
              },
            ],
          },
          {
            label: 'Aggregation',
            contentSite: 'docs',
            url: '/docs/v4.4/aggregation',
            collapsible: true,
            items: [
              {
                label: 'Aggregation Pipeline',
                contentSite: 'docs',
                url: '/docs/v4.4/core/aggregation-pipeline',
                collapsible: true,
                items: [
                  {
                    label: 'Aggregation Pipeline Optimization',
                    contentSite: 'docs',
                    url: '/docs/v4.4/core/aggregation-pipeline-optimization',
                  },
                  {
                    label: 'Aggregation Pipeline Limits',
                    contentSite: 'docs',
                    url: '/docs/v4.4/core/aggregation-pipeline-limits',
                  },
                  {
                    label: 'Aggregation Pipeline and Sharded Collections',
                    contentSite: 'docs',
                    url: '/docs/v4.4/core/aggregation-pipeline-sharded-collections',
                  },
                  {
                    label: 'Example with ZIP Code Data',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/aggregation-zip-code-data-set',
                  },
                  {
                    label: 'Example with User Preference Data',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/aggregation-with-user-preference-data',
                  },
                ],
              },
              {
                label: 'Map-Reduce',
                contentSite: 'docs',
                url: '/docs/v4.4/core/map-reduce',
                collapsible: true,
                items: [
                  {
                    label: 'Map-Reduce and Sharded Collections',
                    contentSite: 'docs',
                    url: '/docs/v4.4/core/map-reduce-sharded-collections',
                  },
                  {
                    label: 'Map-Reduce Concurrency',
                    contentSite: 'docs',
                    url: '/docs/v4.4/core/map-reduce-concurrency',
                  },
                  {
                    label: 'Map-Reduce Examples',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/map-reduce-examples',
                  },
                  {
                    label: 'Perform Incremental Map-Reduce',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/perform-incremental-map-reduce',
                  },
                  {
                    label: 'Troubleshoot the Map Function',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/troubleshoot-map-function',
                  },
                  {
                    label: 'Troubleshoot the Reduce Function',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/troubleshoot-reduce-function',
                  },
                  {
                    label: 'Map-Reduce to Aggregation Pipeline',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/map-reduce-to-aggregation-pipeline',
                  },
                ],
              },
              {
                label: 'Aggregation Reference',
                contentSite: 'docs',
                url: '/docs/v4.4/reference/aggregation',
                collapsible: true,
                items: [
                  {
                    label: 'Aggregation Pipeline Quick Reference',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/aggregation-quick-reference',
                  },
                  {
                    label: 'Aggregation Commands',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/operator/aggregation/interface',
                  },
                  {
                    label: 'Aggregation Commands Comparison',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/aggregation-commands-comparison',
                  },
                  {
                    label: 'Variables in Aggregation Expressions',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/aggregation-variables',
                  },
                  {
                    label: 'SQL to Aggregation Mapping Chart',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/sql-aggregation-comparison',
                  },
                  {
                    label: 'Practical MongoDB Aggregations (e-book)',
                    contentSite: 'docs',
                    url: 'https://www.practical-mongodb-aggregations.com',
                  },
                ],
              },
            ],
          },
          {
            label: 'Indexes',
            contentSite: 'docs',
            url: '/docs/v4.4/indexes',
            collapsible: true,
            items: [
              {
                label: 'Single Field Indexes',
                contentSite: 'docs',
                url: '/docs/v4.4/core/index-single',
              },
              {
                label: 'Compound Indexes',
                contentSite: 'docs',
                url: '/docs/v4.4/core/index-compound',
              },
              {
                label: 'Multikey Indexes',
                contentSite: 'docs',
                url: '/docs/v4.4/core/index-multikey',
                collapsible: true,
                items: [
                  {
                    label: 'Multikey Index Bounds',
                    contentSite: 'docs',
                    url: '/docs/v4.4/core/multikey-index-bounds',
                  },
                ],
              },
              {
                label: 'Text Indexes',
                contentSite: 'docs',
                url: '/docs/v4.4/core/index-text',
                collapsible: true,
                items: [
                  {
                    label: 'Specify a Language for Text Index',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/specify-language-for-text-index',
                  },
                  {
                    label: 'Specify Name for  Index',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/avoid-text-index-name-limit',
                  },
                  {
                    label: 'Control Search Results with Weights',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/control-results-of-text-search',
                  },
                  {
                    label: 'Limit the Number of Entries Scanned',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/limit-number-of-items-scanned-for-text-search',
                  },
                ],
              },
              {
                label: 'Wildcard Indexes',
                contentSite: 'docs',
                url: '/docs/v4.4/core/index-wildcard',
                collapsible: true,
                items: [
                  {
                    label: 'Wildcard Index Restrictions',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/index-wildcard-restrictions',
                  },
                ],
              },
              {
                label: ' Indexes',
                contentSite: 'docs',
                url: '/docs/v4.4/core/2dsphere',
                collapsible: true,
                items: [
                  {
                    label: 'Query a  Index',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/query-a-2dsphere-index',
                  },
                ],
              },
              {
                label: ' Indexes',
                contentSite: 'docs',
                url: '/docs/v4.4/core/2d',
                collapsible: true,
                items: [
                  {
                    label: 'Create a  Index',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/build-a-2d-index',
                  },
                  {
                    label: 'Query a  Index',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/query-a-2d-index',
                  },
                  {
                    label: ' Index Internals',
                    contentSite: 'docs',
                    url: '/docs/v4.4/core/geospatial-indexes',
                  },
                  {
                    label: 'Calculate Distance Using Spherical Geometry',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/calculate-distances-using-spherical-geometry-with-2d-geospatial-indexes',
                  },
                ],
              },
              {
                label: ' Indexes',
                contentSite: 'docs',
                url: '/docs/v4.4/core/geohaystack',
                collapsible: true,
                items: [
                  {
                    label: 'Create a Haystack Index',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/build-a-geohaystack-index',
                  },
                  {
                    label: 'Query a Haystack Index',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/query-a-geohaystack-index',
                  },
                ],
              },
              {
                label: 'Hashed Indexes',
                contentSite: 'docs',
                url: '/docs/v4.4/core/index-hashed',
              },
              {
                label: 'Index Properties',
                contentSite: 'docs',
                url: '/docs/v4.4/core/index-properties',
                collapsible: true,
                items: [
                  {
                    label: 'TTL Indexes',
                    contentSite: 'docs',
                    url: '/docs/v4.4/core/index-ttl',
                    collapsible: true,
                    items: [
                      {
                        label: 'Expire Data from Collections by Setting TTL',
                        contentSite: 'docs',
                        url: '/docs/v4.4/tutorial/expire-data',
                      },
                    ],
                  },
                  {
                    label: 'Unique Indexes',
                    contentSite: 'docs',
                    url: '/docs/v4.4/core/index-unique',
                  },
                  {
                    label: 'Partial Indexes',
                    contentSite: 'docs',
                    url: '/docs/v4.4/core/index-partial',
                  },
                  {
                    label: 'Case-Insensitive Indexes',
                    contentSite: 'docs',
                    url: '/docs/v4.4/core/index-case-insensitive',
                  },
                  {
                    label: 'Hidden Indexes',
                    contentSite: 'docs',
                    url: '/docs/v4.4/core/index-hidden',
                  },
                  {
                    label: 'Sparse Indexes',
                    contentSite: 'docs',
                    url: '/docs/v4.4/core/index-sparse',
                  },
                ],
              },
              {
                label: 'Index Builds on Populated Collections',
                contentSite: 'docs',
                url: '/docs/v4.4/core/index-creation',
                collapsible: true,
                items: [
                  {
                    label: 'Rolling Index Builds on Replica Sets',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/build-indexes-on-replica-sets',
                  },
                  {
                    label: 'Rolling Index Builds on Sharded Clusters',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/build-indexes-on-sharded-clusters',
                  },
                ],
              },
              {
                label: 'Index Intersection',
                contentSite: 'docs',
                url: '/docs/v4.4/core/index-intersection',
              },
              {
                label: 'Manage Indexes',
                contentSite: 'docs',
                url: '/docs/v4.4/tutorial/manage-indexes',
              },
              {
                label: 'Measure Index Use',
                contentSite: 'docs',
                url: '/docs/v4.4/tutorial/measure-index-use',
              },
              {
                label: 'Indexing Strategies',
                contentSite: 'docs',
                url: '/docs/v4.4/applications/indexes',
                collapsible: true,
                items: [
                  {
                    label: 'The ESR (Equality, Sort, Range) Rule',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/equality-sort-range-rule',
                  },
                  {
                    label: 'Create Indexes to Support Your Queries',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/create-indexes-to-support-queries',
                  },
                  {
                    label: 'Use Indexes to Sort Query Results',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/sort-results-with-indexes',
                  },
                  {
                    label: 'Ensure Indexes Fit in RAM',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/ensure-indexes-fit-ram',
                  },
                  {
                    label: 'Create Queries that Ensure Selectivity',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/create-queries-that-ensure-selectivity',
                  },
                ],
              },
              {
                label: 'Indexing Reference',
                contentSite: 'docs',
                url: '/docs/v4.4/reference/indexes',
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
            label: 'Change Streams',
            contentSite: 'docs',
            url: '/docs/v4.4/changeStreams',
            collapsible: true,
            items: [
              {
                label: 'Change Streams Production Recommendations',
                contentSite: 'docs',
                url: '/docs/v4.4/administration/change-streams-production-recommendations',
              },
              {
                label: 'Change Events',
                contentSite: 'docs',
                url: '/docs/v4.4/reference/change-events',
                collapsible: true,
                items: [
                  {
                    label: 'delete',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/change-events/delete',
                  },
                  {
                    label: 'drop',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/change-events/drop',
                  },
                  {
                    label: 'dropDatabase',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/change-events/dropDatabase',
                  },
                  {
                    label: 'insert',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/change-events/insert',
                  },
                  {
                    label: 'invalidate',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/change-events/invalidate',
                  },
                  {
                    label: 'rename',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/change-events/rename',
                  },
                  {
                    label: 'replace',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/change-events/replace',
                  },
                  {
                    label: 'update',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/change-events/update',
                  },
                ],
              },
            ],
          },
          {
            label: 'Transactions',
            contentSite: 'docs',
            url: '/docs/v4.4/core/transactions',
            collapsible: true,
            items: [
              {
                label: 'Drivers API',
                contentSite: 'docs',
                url: '/docs/v4.4/core/transactions-in-applications',
              },
              {
                label: 'Production Considerations',
                contentSite: 'docs',
                url: '/docs/v4.4/core/transactions-production-consideration',
              },
              {
                label: 'Production Considerations (Sharded Clusters)',
                contentSite: 'docs',
                url: '/docs/v4.4/core/transactions-sharded-clusters',
              },
              {
                label: 'Transactions and Operations',
                contentSite: 'docs',
                url: '/docs/v4.4/core/transactions-operations',
              },
            ],
          },
          {
            label: 'Data Models',
            contentSite: 'docs',
            url: '/docs/v4.4/data-modeling',
            collapsible: true,
            items: [
              {
                label: 'Data Modeling Introduction',
                contentSite: 'docs',
                url: '/docs/v4.4/core/data-modeling-introduction',
              },
              {
                label: 'Schema Validation',
                contentSite: 'docs',
                url: '/docs/v4.4/core/schema-validation',
              },
              {
                label: 'Data Modeling Concepts',
                contentSite: 'docs',
                url: '/docs/v4.4/core/data-models',
                collapsible: true,
                items: [
                  {
                    label: 'Data Model Design',
                    contentSite: 'docs',
                    url: '/docs/v4.4/core/data-model-design',
                  },
                  {
                    label: 'Operational Factors and Data Models',
                    contentSite: 'docs',
                    url: '/docs/v4.4/core/data-model-operations',
                  },
                ],
              },
              {
                label: 'Data Model Examples and Patterns',
                contentSite: 'docs',
                url: '/docs/v4.4/applications/data-models',
                collapsible: true,
                items: [
                  {
                    label: 'Model Relationships Between Documents',
                    contentSite: 'docs',
                    url: '/docs/v4.4/applications/data-models-relationships',
                    collapsible: true,
                    items: [
                      {
                        label: 'Model One-to-One Relationships with Embedded Documents',
                        contentSite: 'docs',
                        url: '/docs/v4.4/tutorial/model-embedded-one-to-one-relationships-between-documents',
                      },
                      {
                        label: 'Model One-to-Many Relationships with Embedded Documents',
                        contentSite: 'docs',
                        url: '/docs/v4.4/tutorial/model-embedded-one-to-many-relationships-between-documents',
                      },
                      {
                        label: 'Model One-to-Many Relationships with Document References',
                        contentSite: 'docs',
                        url: '/docs/v4.4/tutorial/model-referenced-one-to-many-relationships-between-documents',
                      },
                    ],
                  },
                  {
                    label: 'Model Tree Structures',
                    contentSite: 'docs',
                    url: '/docs/v4.4/applications/data-models-tree-structures',
                    collapsible: true,
                    items: [
                      {
                        label: 'Model Tree Structures with Parent References',
                        contentSite: 'docs',
                        url: '/docs/v4.4/tutorial/model-tree-structures-with-parent-references',
                      },
                      {
                        label: 'Model Tree Structures with Child References',
                        contentSite: 'docs',
                        url: '/docs/v4.4/tutorial/model-tree-structures-with-child-references',
                      },
                      {
                        label: 'Model Tree Structures with an Array of Ancestors',
                        contentSite: 'docs',
                        url: '/docs/v4.4/tutorial/model-tree-structures-with-ancestors-array',
                      },
                      {
                        label: 'Model Tree Structures with Materialized Paths',
                        contentSite: 'docs',
                        url: '/docs/v4.4/tutorial/model-tree-structures-with-materialized-paths',
                      },
                      {
                        label: 'Model Tree Structures with Nested Sets',
                        contentSite: 'docs',
                        url: '/docs/v4.4/tutorial/model-tree-structures-with-nested-sets',
                      },
                    ],
                  },
                  {
                    label: 'Model Specific Application Contexts',
                    contentSite: 'docs',
                    url: '/docs/v4.4/applications/data-models-applications',
                    collapsible: true,
                    items: [
                      {
                        label: 'Model Data for Atomic Operations',
                        contentSite: 'docs',
                        url: '/docs/v4.4/tutorial/model-data-for-atomic-operations',
                      },
                      {
                        label: 'Model Data to Support Keyword Search',
                        contentSite: 'docs',
                        url: '/docs/v4.4/tutorial/model-data-for-keyword-search',
                      },
                      {
                        label: 'Model Data for Schema Versioning',
                        contentSite: 'docs',
                        url: '/docs/v4.4/tutorial/model-data-for-schema-versioning',
                      },
                      {
                        label: 'Model Monetary Data',
                        contentSite: 'docs',
                        url: '/docs/v4.4/tutorial/model-monetary-data',
                      },
                      {
                        label: 'Model Time Data',
                        contentSite: 'docs',
                        url: '/docs/v4.4/tutorial/model-time-data',
                      },
                      {
                        label: 'Model Computed Data',
                        contentSite: 'docs',
                        url: '/docs/v4.4/tutorial/model-computed-data',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Data Model Reference',
                contentSite: 'docs',
                url: '/docs/v4.4/reference/data-models',
                collapsible: true,
                items: [
                  {
                    label: 'Database References',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/database-references',
                  },
                ],
              },
            ],
          },
          {
            label: 'Replication',
            contentSite: 'docs',
            url: '/docs/v4.4/replication',
            collapsible: true,
            items: [
              {
                label: 'Replica Set Members',
                contentSite: 'docs',
                url: '/docs/v4.4/core/replica-set-members',
                collapsible: true,
                items: [
                  {
                    label: 'Replica Set Primary',
                    contentSite: 'docs',
                    url: '/docs/v4.4/core/replica-set-primary',
                  },
                  {
                    label: 'Replica Set Secondary Members',
                    contentSite: 'docs',
                    url: '/docs/v4.4/core/replica-set-secondary',
                    collapsible: true,
                    items: [
                      {
                        label: 'Priority 0 Replica Set Members',
                        contentSite: 'docs',
                        url: '/docs/v4.4/core/replica-set-priority-0-member',
                      },
                      {
                        label: 'Hidden Replica Set Members',
                        contentSite: 'docs',
                        url: '/docs/v4.4/core/replica-set-hidden-member',
                      },
                      {
                        label: 'Delayed Replica Set Members',
                        contentSite: 'docs',
                        url: '/docs/v4.4/core/replica-set-delayed-member',
                      },
                    ],
                  },
                  {
                    label: 'Replica Set Arbiter',
                    contentSite: 'docs',
                    url: '/docs/v4.4/core/replica-set-arbiter',
                  },
                ],
              },
              {
                label: 'Replica Set Oplog',
                contentSite: 'docs',
                url: '/docs/v4.4/core/replica-set-oplog',
              },
              {
                label: 'Replica Set Data Synchronization',
                contentSite: 'docs',
                url: '/docs/v4.4/core/replica-set-sync',
              },
              {
                label: 'Replica Set Deployment Architectures',
                contentSite: 'docs',
                url: '/docs/v4.4/core/replica-set-architectures',
                collapsible: true,
                items: [
                  {
                    label: 'Three Member Replica Sets',
                    contentSite: 'docs',
                    url: '/docs/v4.4/core/replica-set-architecture-three-members',
                  },
                  {
                    label: 'Replica Sets Distributed Across Two or More Data Centers',
                    contentSite: 'docs',
                    url: '/docs/v4.4/core/replica-set-architecture-geographically-distributed',
                  },
                ],
              },
              {
                label: 'Replica Set High Availability',
                contentSite: 'docs',
                url: '/docs/v4.4/core/replica-set-high-availability',
                collapsible: true,
                items: [
                  {
                    label: 'Replica Set Elections',
                    contentSite: 'docs',
                    url: '/docs/v4.4/core/replica-set-elections',
                  },
                  {
                    label: 'Rollbacks During Replica Set Failover',
                    contentSite: 'docs',
                    url: '/docs/v4.4/core/replica-set-rollbacks',
                  },
                ],
              },
              {
                label: 'Replica Set Read and Write Semantics',
                contentSite: 'docs',
                url: '/docs/v4.4/applications/replication',
                collapsible: true,
                items: [
                  {
                    label: 'Write Concern for Replica Sets',
                    contentSite: 'docs',
                    url: '/docs/v4.4/core/replica-set-write-concern',
                  },
                  {
                    label: 'Read Preference',
                    contentSite: 'docs',
                    url: '/docs/v4.4/core/read-preference',
                    collapsible: true,
                    items: [
                      {
                        label: 'Tag Sets',
                        contentSite: 'docs',
                        url: '/docs/v4.4/core/read-preference-tags',
                      },
                      {
                        label: 'maxStalenessSeconds',
                        contentSite: 'docs',
                        url: '/docs/v4.4/core/read-preference-staleness',
                      },
                      {
                        label: 'Hedged Read Option',
                        contentSite: 'docs',
                        url: '/docs/v4.4/core/read-preference-hedge-option',
                      },
                      {
                        label: 'Read Preference Use Cases',
                        contentSite: 'docs',
                        url: '/docs/v4.4/core/read-preference-use-cases',
                      },
                    ],
                  },
                  {
                    label: 'Server Selection Algorithm',
                    contentSite: 'docs',
                    url: '/docs/v4.4/core/read-preference-mechanics',
                  },
                ],
              },
              {
                label: 'Replica Set Deployment Tutorials',
                contentSite: 'docs',
                url: '/docs/v4.4/administration/replica-set-deployment',
                collapsible: true,
                items: [
                  {
                    label: 'Deploy a Replica Set',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/deploy-replica-set',
                  },
                  {
                    label: 'Deploy a Replica Set for Testing and Development',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/deploy-replica-set-for-testing',
                  },
                  {
                    label: 'Deploy a Geographically Redundant Replica Set',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/deploy-geographically-distributed-replica-set',
                  },
                  {
                    label: 'Add an Arbiter to Replica Set',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/add-replica-set-arbiter',
                  },
                  {
                    label: 'Convert a Standalone to a Replica Set',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/convert-standalone-to-replica-set',
                  },
                  {
                    label: 'Add Members to a Replica Set',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/expand-replica-set',
                  },
                  {
                    label: 'Remove Members from Replica Set',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/remove-replica-set-member',
                  },
                  {
                    label: 'Replace a Replica Set Member',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/replace-replica-set-member',
                  },
                ],
              },
              {
                label: 'Member Configuration Tutorials',
                contentSite: 'docs',
                url: '/docs/v4.4/administration/replica-set-member-configuration',
                collapsible: true,
                items: [
                  {
                    label: 'Adjust Priority for Replica Set Member',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/adjust-replica-set-member-priority',
                  },
                  {
                    label: 'Prevent Secondary from Becoming Primary',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/configure-secondary-only-replica-set-member',
                  },
                  {
                    label: 'Configure a Hidden Replica Set Member',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/configure-a-hidden-replica-set-member',
                  },
                  {
                    label: 'Configure a Delayed Replica Set Member',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/configure-a-delayed-replica-set-member',
                  },
                  {
                    label: 'Configure Non-Voting Replica Set Member',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/configure-a-non-voting-replica-set-member',
                  },
                  {
                    label: 'Convert a Secondary to an Arbiter',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/convert-secondary-into-arbiter',
                  },
                ],
              },
              {
                label: 'Replica Set Maintenance Tutorials',
                contentSite: 'docs',
                url: '/docs/v4.4/administration/replica-set-maintenance',
                collapsible: true,
                items: [
                  {
                    label: 'Change the Size of the Oplog',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/change-oplog-size',
                  },
                  {
                    label: 'Perform Maintenance on Replica Set Members',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/perform-maintence-on-replica-set-members',
                  },
                  {
                    label: 'Force a Member to Become Primary',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/force-member-to-be-primary',
                  },
                  {
                    label: 'Resync a Member of a Replica Set',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/resync-replica-set-member',
                  },
                  {
                    label: 'Configure Replica Set Tag Sets',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/configure-replica-set-tag-sets',
                  },
                  {
                    label: 'Reconfigure a Replica Set with Unavailable Members',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/reconfigure-replica-set-with-unavailable-members',
                  },
                  {
                    label: 'Manage Chained Replication',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/manage-chained-replication',
                  },
                  {
                    label: 'Change Hostnames in a Replica Set',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/change-hostnames-in-a-replica-set',
                  },
                  {
                    label: "Configure a Secondary's Sync Target",
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/configure-replica-set-secondary-sync-target',
                  },
                  {
                    label: 'Rename a Replica Set',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/rename-unsharded-replica-set',
                  },
                ],
              },
              {
                label: 'Replication Reference',
                contentSite: 'docs',
                url: '/docs/v4.4/reference/replication',
                collapsible: true,
                items: [
                  {
                    label: 'Replica Set Configuration',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/replica-configuration',
                  },
                  {
                    label: 'Replica Set Protocol Version',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/replica-set-protocol-versions',
                  },
                  {
                    label: 'Troubleshoot Replica Sets',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/troubleshoot-replica-sets',
                  },
                  {
                    label: 'The  Database',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/local-database',
                  },
                  {
                    label: 'Replica Set Member States',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/replica-states',
                  },
                ],
              },
            ],
          },
          {
            label: 'Sharding',
            contentSite: 'docs',
            url: '/docs/v4.4/sharding',
            collapsible: true,
            items: [
              {
                label: 'Sharded Cluster Components',
                contentSite: 'docs',
                url: '/docs/v4.4/core/sharded-cluster-components',
                collapsible: true,
                items: [
                  {
                    label: 'Shards',
                    contentSite: 'docs',
                    url: '/docs/v4.4/core/sharded-cluster-shards',
                  },
                  {
                    label: 'Config Servers (metadata)',
                    contentSite: 'docs',
                    url: '/docs/v4.4/core/sharded-cluster-config-servers',
                  },
                  {
                    label: 'Router (mongos)',
                    contentSite: 'docs',
                    url: '/docs/v4.4/core/sharded-cluster-query-router',
                  },
                ],
              },
              {
                label: 'Shard Keys',
                contentSite: 'docs',
                url: '/docs/v4.4/core/sharding-shard-key',
              },
              {
                label: 'Hashed Sharding',
                contentSite: 'docs',
                url: '/docs/v4.4/core/hashed-sharding',
              },
              {
                label: 'Ranged Sharding',
                contentSite: 'docs',
                url: '/docs/v4.4/core/ranged-sharding',
              },
              {
                label: 'Deploy a Sharded Cluster',
                contentSite: 'docs',
                url: '/docs/v4.4/tutorial/deploy-shard-cluster',
              },
              {
                label: 'Zones',
                contentSite: 'docs',
                url: '/docs/v4.4/core/zone-sharding',
                collapsible: true,
                items: [
                  {
                    label: 'Manage Shard Zones',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/manage-shard-zone',
                  },
                  {
                    label: 'Segmenting Data by Location',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/sharding-segmenting-data-by-location',
                  },
                  {
                    label: 'Tiered Hardware for Varying SLA or SLO',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/sharding-tiered-hardware-for-varying-slas',
                  },
                  {
                    label: 'Segmenting Data by Application or Customer',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/sharding-segmenting-shards',
                  },
                  {
                    label: 'Distributed Local Writes for Insert Only Workloads',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/sharding-high-availability-writes',
                  },
                ],
              },
              {
                label: 'Data Partitioning with Chunks',
                contentSite: 'docs',
                url: '/docs/v4.4/core/sharding-data-partitioning',
                collapsible: true,
                items: [
                  {
                    label: 'Create Chunks in a Sharded Cluster',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/create-chunks-in-sharded-cluster',
                  },
                  {
                    label: 'Split Chunks in a Sharded Cluster',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/split-chunks-in-sharded-cluster',
                  },
                  {
                    label: 'Merge Chunks in a Sharded Cluster',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/merge-chunks-in-sharded-cluster',
                  },
                  {
                    label: 'Modify Chunk Size in a Sharded Cluster',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/modify-chunk-size-in-sharded-cluster',
                  },
                ],
              },
              {
                label: 'Balancer',
                contentSite: 'docs',
                url: '/docs/v4.4/core/sharding-balancer-administration',
                collapsible: true,
                items: [
                  {
                    label: 'Manage Sharded Cluster Balancer',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/manage-sharded-cluster-balancer',
                  },
                  {
                    label: 'Migrate Chunks in a Sharded Cluster',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/migrate-chunks-in-sharded-cluster',
                  },
                ],
              },
              {
                label: 'Administration',
                contentSite: 'docs',
                url: '/docs/v4.4/administration/sharded-cluster-administration',
                collapsible: true,
                items: [
                  {
                    label: 'Config Server Administration',
                    contentSite: 'docs',
                    url: '/docs/v4.4/administration/sharded-cluster-config-servers',
                    collapsible: true,
                    items: [
                      {
                        label: 'Replace a Config Server',
                        contentSite: 'docs',
                        url: '/docs/v4.4/tutorial/replace-config-server',
                      },
                    ],
                  },
                  {
                    label: 'View Cluster Configuration',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/view-sharded-cluster-configuration',
                  },
                  {
                    label: 'Restart a Sharded Cluster',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/restart-sharded-cluster',
                  },
                  {
                    label: 'Migrate a Sharded Cluster to Different Hardware',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/migrate-sharded-cluster-to-new-hardware',
                  },
                  {
                    label: 'Add Shards to a Cluster',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/add-shards-to-shard-cluster',
                  },
                  {
                    label: 'Remove Shards from an Existing Sharded Cluster',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/remove-shards-from-cluster',
                  },
                  {
                    label: 'Clear  Flag',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/clear-jumbo-flag',
                  },
                  {
                    label: 'Back Up Cluster Metadata',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/backup-sharded-cluster-metadata',
                  },
                  {
                    label: 'Convert Sharded Cluster to Replica Set',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/convert-sharded-cluster-to-replica-set',
                  },
                  {
                    label: 'Convert a Replica Set to a Sharded Cluster',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/convert-replica-set-to-replicated-shard-cluster',
                  },
                ],
              },
              {
                label: 'Sharding Reference',
                contentSite: 'docs',
                url: '/docs/v4.4/reference/sharding',
                collapsible: true,
                items: [
                  {
                    label: 'Operational Restrictions',
                    contentSite: 'docs',
                    url: '/docs/v4.4/core/sharded-cluster-requirements',
                  },
                  {
                    label: 'Troubleshoot Sharded Clusters',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/troubleshoot-sharded-clusters',
                  },
                  {
                    label: 'Config Database',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/config-database',
                  },
                ],
              },
            ],
          },
          {
            label: 'Storage',
            contentSite: 'docs',
            url: '/docs/v4.4/storage',
            collapsible: true,
            items: [
              {
                label: 'Storage Engines',
                contentSite: 'docs',
                url: '/docs/v4.4/core/storage-engines',
                collapsible: true,
                items: [
                  {
                    label: 'WiredTiger Storage Engine',
                    contentSite: 'docs',
                    url: '/docs/v4.4/core/wiredtiger',
                    collapsible: true,
                    items: [
                      {
                        label: 'Change Standalone to WiredTiger',
                        contentSite: 'docs',
                        url: '/docs/v4.4/tutorial/change-standalone-wiredtiger',
                      },
                      {
                        label: 'Change Replica Set to WiredTiger',
                        contentSite: 'docs',
                        url: '/docs/v4.4/tutorial/change-replica-set-wiredtiger',
                      },
                      {
                        label: 'Change Sharded Cluster to WiredTiger',
                        contentSite: 'docs',
                        url: '/docs/v4.4/tutorial/change-sharded-cluster-wiredtiger',
                      },
                    ],
                  },
                  {
                    label: 'In-Memory Storage Engine',
                    contentSite: 'docs',
                    url: '/docs/v4.4/core/inmemory',
                  },
                ],
              },
              {
                label: 'Journaling',
                contentSite: 'docs',
                url: '/docs/v4.4/core/journaling',
                collapsible: true,
                items: [
                  {
                    label: 'Manage Journaling',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/manage-journaling',
                  },
                ],
              },
              {
                label: 'GridFS',
                contentSite: 'docs',
                url: '/docs/v4.4/core/gridfs',
              },
              {
                label: 'FAQ: MongoDB Storage',
                contentSite: 'docs',
                url: '/docs/v4.4/faq/storage',
              },
            ],
          },
          {
            label: 'Administration',
            contentSite: 'docs',
            url: '/docs/v4.4/administration',
            collapsible: true,
            items: [
              {
                label: 'Production Notes',
                contentSite: 'docs',
                url: '/docs/v4.4/administration/production-notes',
              },
              {
                label: 'Operations Checklist',
                contentSite: 'docs',
                url: '/docs/v4.4/administration/production-checklist-operations',
              },
              {
                label: 'Development Checklist',
                contentSite: 'docs',
                url: '/docs/v4.4/administration/production-checklist-development',
              },
              {
                label: 'Performance',
                contentSite: 'docs',
                url: '/docs/v4.4/administration/analyzing-mongodb-performance',
                collapsible: true,
                items: [
                  {
                    label: 'Connection Pool Overview',
                    contentSite: 'docs',
                    url: '/docs/v4.4/administration/connection-pool-overview',
                    collapsible: true,
                    items: [
                      {
                        label: 'Tuning Your Connection Pool Settings',
                        contentSite: 'docs',
                        url: '/docs/v4.4/tutorial/connection-pool-performance-tuning',
                      },
                    ],
                  },
                  {
                    label: 'Database Profiler',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/manage-the-database-profiler',
                    collapsible: true,
                    items: [
                      {
                        label: 'Database Profiler Output',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/database-profiler',
                      },
                    ],
                  },
                  {
                    label: 'Disable Transparent Huge Pages (THP)',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/transparent-huge-pages',
                  },
                  {
                    label: 'UNIX  Settings',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/ulimit',
                  },
                ],
              },
              {
                label: 'Configuration and Maintenance',
                contentSite: 'docs',
                url: '/docs/v4.4/administration/configuration-and-maintenance',
                collapsible: true,
                items: [
                  {
                    label: 'Run-time Database Configuration',
                    contentSite: 'docs',
                    url: '/docs/v4.4/administration/configuration',
                  },
                  {
                    label: 'Upgrade to the Latest Revision of MongoDB',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/upgrade-revision',
                  },
                  {
                    label: 'Manage  Processes',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/manage-mongodb-processes',
                  },
                  {
                    label: 'Terminate Running Operations',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/terminate-running-operations',
                  },
                  {
                    label: 'Rotate Log Files',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/rotate-log-files',
                  },
                ],
              },
              {
                label: 'Data Center Awareness',
                contentSite: 'docs',
                url: '/docs/v4.4/data-center-awareness',
                collapsible: true,
                items: [
                  {
                    label: 'Workload Isolation in MongoDB Deployments',
                    contentSite: 'docs',
                    url: '/docs/v4.4/core/workload-isolation',
                  },
                  {
                    label: 'Zones',
                    contentSite: 'docs',
                    url: '/docs/v4.4/core/zone-sharding',
                  },
                  {
                    label: 'Manage Shard Zones',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/manage-shard-zone',
                  },
                ],
              },
              {
                label: 'MongoDB Backup Methods',
                contentSite: 'docs',
                url: '/docs/v4.4/core/backups',
                collapsible: true,
                items: [
                  {
                    label: 'Back Up and Restore with Filesystem Snapshots',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/backup-with-filesystem-snapshots',
                  },
                  {
                    label: 'Back Up and Restore with MongoDB Tools',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/backup-and-restore-tools',
                  },
                  {
                    label: 'Restore a Replica Set from MongoDB Backups',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/restore-replica-set-from-backup',
                  },
                  {
                    label: 'Backup and Restore Sharded Clusters',
                    contentSite: 'docs',
                    url: '/docs/v4.4/administration/backup-sharded-clusters',
                    collapsible: true,
                    items: [
                      {
                        label: 'Back Up a Sharded Cluster with File System Snapshots',
                        contentSite: 'docs',
                        url: '/docs/v4.4/tutorial/backup-sharded-cluster-with-filesystem-snapshots',
                      },
                      {
                        label: 'Back Up a Sharded Cluster with Database Dumps',
                        contentSite: 'docs',
                        url: '/docs/v4.4/tutorial/backup-sharded-cluster-with-database-dumps',
                      },
                      {
                        label: 'Schedule Backup Window for Sharded Clusters',
                        contentSite: 'docs',
                        url: '/docs/v4.4/tutorial/schedule-backup-window-for-sharded-clusters',
                      },
                      {
                        label: 'Restore a Sharded Cluster',
                        contentSite: 'docs',
                        url: '/docs/v4.4/tutorial/restore-sharded-cluster',
                      },
                    ],
                  },
                  {
                    label: 'Recover a Standalone after an Unexpected Shutdown',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/recover-data-following-unexpected-shutdown',
                  },
                ],
              },
              {
                label: 'Monitoring for MongoDB',
                contentSite: 'docs',
                url: '/docs/v4.4/administration/monitoring',
                collapsible: true,
                items: [
                  {
                    label: 'Monitor MongoDB With SNMP on Linux',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/monitor-with-snmp',
                  },
                  {
                    label: 'Monitor MongoDB Windows with SNMP',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/monitor-with-snmp-on-windows',
                  },
                  {
                    label: 'Troubleshoot SNMP',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/troubleshoot-snmp',
                  },
                ],
              },
            ],
          },
          {
            label: 'Security',
            contentSite: 'docs',
            url: '/docs/v4.4/security',
            collapsible: true,
            items: [
              {
                label: 'Security Checklist',
                contentSite: 'docs',
                url: '/docs/v4.4/administration/security-checklist',
              },
              {
                label: 'Enable Access Control',
                contentSite: 'docs',
                url: '/docs/v4.4/tutorial/enable-authentication',
              },
              {
                label: 'Authentication',
                contentSite: 'docs',
                url: '/docs/v4.4/core/authentication',
                collapsible: true,
                items: [
                  {
                    label: 'Users',
                    contentSite: 'docs',
                    url: '/docs/v4.4/core/security-users',
                    collapsible: true,
                    items: [
                      {
                        label: 'Add Users',
                        contentSite: 'docs',
                        url: '/docs/v4.4/tutorial/create-users',
                      },
                    ],
                  },
                  {
                    label: 'Authentication Mechanisms',
                    contentSite: 'docs',
                    url: '/docs/v4.4/core/authentication-mechanisms',
                    collapsible: true,
                    items: [
                      {
                        label: 'SCRAM',
                        contentSite: 'docs',
                        url: '/docs/v4.4/core/security-scram',
                      },
                      {
                        label: 'x.509',
                        contentSite: 'docs',
                        url: '/docs/v4.4/core/security-x.509',
                        collapsible: true,
                        items: [
                          {
                            label: 'Use x.509 Certificates to Authenticate Clients',
                            contentSite: 'docs',
                            url: '/docs/v4.4/tutorial/configure-x509-client-authentication',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    label: 'Enterprise Authentication Mechanisms',
                    contentSite: 'docs',
                    url: '/docs/v4.4/core/authentication-mechanisms-enterprise',
                    collapsible: true,
                    items: [
                      {
                        label: 'Kerberos Authentication',
                        contentSite: 'docs',
                        url: '/docs/v4.4/core/kerberos',
                        collapsible: true,
                        items: [
                          {
                            label: 'Configure MongoDB with Kerberos Authentication on Linux',
                            contentSite: 'docs',
                            url: '/docs/v4.4/tutorial/control-access-to-mongodb-with-kerberos-authentication',
                          },
                          {
                            label: 'Configure MongoDB with Kerberos Authentication on Windows',
                            contentSite: 'docs',
                            url: '/docs/v4.4/tutorial/control-access-to-mongodb-windows-with-kerberos-authentication',
                          },
                          {
                            label: 'Troubleshoot Kerberos Authentication',
                            contentSite: 'docs',
                            url: '/docs/v4.4/tutorial/troubleshoot-kerberos',
                          },
                          {
                            label: 'Configure MongoDB with Kerberos Authentication and Active Directory Authorization',
                            contentSite: 'docs',
                            url: '/docs/v4.4/tutorial/kerberos-auth-activedirectory-authz',
                          },
                        ],
                      },
                      {
                        label: 'LDAP Proxy Authentication',
                        contentSite: 'docs',
                        url: '/docs/v4.4/core/security-ldap',
                        collapsible: true,
                        items: [
                          {
                            label: 'Authenticate Using SASL and LDAP with ActiveDirectory',
                            contentSite: 'docs',
                            url: '/docs/v4.4/tutorial/configure-ldap-sasl-activedirectory',
                          },
                          {
                            label: 'Authenticate Using SASL and LDAP with OpenLDAP',
                            contentSite: 'docs',
                            url: '/docs/v4.4/tutorial/configure-ldap-sasl-openldap',
                          },
                          {
                            label: 'Authenticate and Authorize Users Using Active Directory via Native LDAP',
                            contentSite: 'docs',
                            url: '/docs/v4.4/tutorial/authenticate-nativeldap-activedirectory',
                          },
                        ],
                      },
                      {
                        label: 'LDAP Authorization',
                        contentSite: 'docs',
                        url: '/docs/v4.4/core/security-ldap-external',
                      },
                    ],
                  },
                  {
                    label: 'Internal/Membership Authentication',
                    contentSite: 'docs',
                    url: '/docs/v4.4/core/security-internal-authentication',
                    collapsible: true,
                    items: [
                      {
                        label: 'Deploy Replica Set With Keyfile Authentication',
                        contentSite: 'docs',
                        url: '/docs/v4.4/tutorial/deploy-replica-set-with-keyfile-access-control',
                      },
                      {
                        label: 'Update Replica Set to Keyfile Authentication',
                        contentSite: 'docs',
                        url: '/docs/v4.4/tutorial/enforce-keyfile-access-control-in-existing-replica-set',
                      },
                      {
                        label: 'Update Replica Set to Keyfile Authentication (No Downtime)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/tutorial/enforce-keyfile-access-control-in-existing-replica-set-without-downtime',
                      },
                      {
                        label: 'Rotate Keys for Replica Sets',
                        contentSite: 'docs',
                        url: '/docs/v4.4/tutorial/rotate-key-replica-set',
                      },
                      {
                        label: 'Deploy Sharded Cluster with Keyfile Authentication',
                        contentSite: 'docs',
                        url: '/docs/v4.4/tutorial/deploy-sharded-cluster-with-keyfile-access-control',
                      },
                      {
                        label: 'Update Sharded Cluster to Keyfile Authentication',
                        contentSite: 'docs',
                        url: '/docs/v4.4/tutorial/enforce-keyfile-access-control-in-existing-sharded-cluster',
                      },
                      {
                        label: 'Update Sharded Cluster to Keyfile Authentication (No Downtime)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/tutorial/enforce-keyfile-access-control-in-existing-sharded-cluster-no-downtime',
                      },
                      {
                        label: 'Rotate Keys for Sharded Clusters',
                        contentSite: 'docs',
                        url: '/docs/v4.4/tutorial/rotate-key-sharded-cluster',
                      },
                      {
                        label: 'Use x.509 Certificate for Membership Authentication',
                        contentSite: 'docs',
                        url: '/docs/v4.4/tutorial/configure-x509-member-authentication',
                      },
                      {
                        label: 'Upgrade from Keyfile Authentication to x.509 Authentication',
                        contentSite: 'docs',
                        url: '/docs/v4.4/tutorial/upgrade-keyfile-to-x509',
                      },
                      {
                        label: 'Rolling Update of x.509 Cluster Certificates that Contain New DN',
                        contentSite: 'docs',
                        url: '/docs/v4.4/tutorial/rotate-x509-membership-certificates',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Role-Based Access Control',
                contentSite: 'docs',
                url: '/docs/v4.4/core/authorization',
                collapsible: true,
                items: [
                  {
                    label: 'Built-In Roles',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/built-in-roles',
                  },
                  {
                    label: 'User-Defined Roles',
                    contentSite: 'docs',
                    url: '/docs/v4.4/core/security-user-defined-roles',
                  },
                  {
                    label: 'Manage Users and Roles',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/manage-users-and-roles',
                  },
                  {
                    label: 'Change Your Password and Custom Data',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/change-own-password-and-custom-data',
                  },
                  {
                    label: 'Collection-Level Access Control',
                    contentSite: 'docs',
                    url: '/docs/v4.4/core/collection-level-access-control',
                  },
                ],
              },
              {
                label: 'TLS/SSL (Transport Encryption)',
                contentSite: 'docs',
                url: '/docs/v4.4/core/security-transport-encryption',
                collapsible: true,
                items: [
                  {
                    label: 'Configure  and  for TLS/SSL',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/configure-ssl',
                  },
                  {
                    label: 'TLS/SSL Configuration for Clients',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/configure-ssl-clients',
                  },
                  {
                    label: 'Upgrade a Cluster to Use TLS/SSL',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/upgrade-cluster-to-ssl',
                  },
                  {
                    label: 'Configure MongoDB for FIPS',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/configure-fips',
                  },
                ],
              },
              {
                label: 'Encryption at Rest',
                contentSite: 'docs',
                url: '/docs/v4.4/core/security-encryption-at-rest',
                collapsible: true,
                items: [
                  {
                    label: 'Configure Encryption',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/configure-encryption',
                  },
                  {
                    label: 'Rotate Encryption Keys',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/rotate-encryption-key',
                  },
                ],
              },
              {
                label: 'Client-Side Field Level Encryption',
                contentSite: 'docs',
                url: '/docs/v4.4/core/security-client-side-encryption',
                collapsible: true,
                items: [
                  {
                    label: 'Automatic Client-Side Field Level Encryption',
                    contentSite: 'docs',
                    url: '/docs/v4.4/core/security-automatic-client-side-encryption',
                    collapsible: true,
                    items: [
                      {
                        label: 'Automatic Encryption Rules',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/security-client-side-automatic-json-schema',
                      },
                      {
                        label: 'Read/Write Support with Automatic Field Level Encryption',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/security-client-side-query-aggregation-support',
                      },
                      {
                        label: 'Appendix',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/security-client-side-encryption-appendix',
                      },
                    ],
                  },
                  {
                    label: 'Explicit (Manual) Client-Side Field Level Encryption',
                    contentSite: 'docs',
                    url: '/docs/v4.4/core/security-explicit-client-side-encryption',
                  },
                  {
                    label: 'Master Key and Data Encryption Key Management',
                    contentSite: 'docs',
                    url: '/docs/v4.4/core/security-client-side-encryption-key-management',
                    collapsible: true,
                    items: [
                      {
                        label: 'Manage Data Encryption Keys',
                        contentSite: 'docs',
                        url: '/docs/v4.4/tutorial/manage-client-side-encryption-data-keys',
                      },
                    ],
                  },
                  {
                    label: 'Limitations',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/security-client-side-encryption-limitations',
                  },
                ],
              },
              {
                label: 'Auditing',
                contentSite: 'docs',
                url: '/docs/v4.4/core/auditing',
                collapsible: true,
                items: [
                  {
                    label: 'Configure Auditing',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/configure-auditing',
                  },
                  {
                    label: 'Configure Audit Filters',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/configure-audit-filters',
                  },
                  {
                    label: 'System Event Audit Messages',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/audit-message',
                  },
                ],
              },
              {
                label: 'Network and Configuration Hardening',
                contentSite: 'docs',
                url: '/docs/v4.4/core/security-hardening',
                collapsible: true,
                items: [
                  {
                    label: 'IP Binding',
                    contentSite: 'docs',
                    url: '/docs/v4.4/core/security-mongodb-configuration',
                  },
                  {
                    label: 'Configure Linux  Firewall for MongoDB',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/configure-linux-iptables-firewall',
                  },
                  {
                    label: 'Configure Windows  Firewall for MongoDB',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/configure-windows-netsh-firewall',
                  },
                ],
              },
              {
                label: 'Implement Field Level Redaction',
                contentSite: 'docs',
                url: '/docs/v4.4/tutorial/implement-field-level-redaction',
              },
              {
                label: 'Security Reference',
                contentSite: 'docs',
                url: '/docs/v4.4/reference/security',
                collapsible: true,
                items: [
                  {
                    label: ' Collection',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/system-roles-collection',
                  },
                  {
                    label: ' Collection',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/system-users-collection',
                  },
                  {
                    label: 'Resource Document',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/resource-document',
                  },
                  {
                    label: 'Privilege Actions',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/privilege-actions',
                  },
                ],
              },
              {
                label: 'Create a Vulnerability Report',
                contentSite: 'docs',
                url: '/docs/v4.4/tutorial/create-a-vulnerability-report',
              },
              {
                label: 'Appendix',
                contentSite: 'docs',
                url: '/docs/v4.4/appendix/security',
                collapsible: true,
                items: [
                  {
                    label: 'Appendix A - OpenSSL CA Certificate for Testing',
                    contentSite: 'docs',
                    url: '/docs/v4.4/appendix/security/appendixA-openssl-ca',
                  },
                  {
                    label: 'Appendix B - OpenSSL Server Certificates for Testing',
                    contentSite: 'docs',
                    url: '/docs/v4.4/appendix/security/appendixB-openssl-server',
                  },
                  {
                    label: 'Appendix C - OpenSSL Client Certificates for Testing',
                    contentSite: 'docs',
                    url: '/docs/v4.4/appendix/security/appendixC-openssl-client',
                  },
                ],
              },
            ],
          },
          {
            label: 'Frequently Asked Questions',
            contentSite: 'docs',
            url: '/docs/v4.4/faq',
            collapsible: true,
            items: [
              {
                label: 'FAQ: MongoDB Fundamentals',
                contentSite: 'docs',
                url: '/docs/v4.4/faq/fundamentals',
              },
              {
                label: 'FAQ: Indexes',
                contentSite: 'docs',
                url: '/docs/v4.4/faq/indexes',
              },
              {
                label: 'FAQ: Concurrency',
                contentSite: 'docs',
                url: '/docs/v4.4/faq/concurrency',
              },
              {
                label: 'FAQ: Sharding with MongoDB',
                contentSite: 'docs',
                url: '/docs/v4.4/faq/sharding',
              },
              {
                label: 'FAQ: Replication and Replica Sets',
                contentSite: 'docs',
                url: '/docs/v4.4/faq/replica-sets',
              },
              {
                label: 'FAQ: MongoDB Storage',
                contentSite: 'docs',
                url: '/docs/v4.4/faq/storage',
              },
              {
                label: 'FAQ: MongoDB Diagnostics',
                contentSite: 'docs',
                url: '/docs/v4.4/faq/diagnostics',
              },
            ],
          },
          {
            label: 'Reference',
            contentSite: 'docs',
            url: '/docs/v4.4/reference',
            collapsible: true,
            items: [
              {
                label: 'Operators',
                contentSite: 'docs',
                url: '/docs/v4.4/reference/operator',
                collapsible: true,
                items: [
                  {
                    label: 'Query and Projection Operators',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/operator/query',
                    collapsible: true,
                    items: [
                      {
                        label: 'Comparison Query Operators',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/query-comparison',
                        collapsible: true,
                        items: [
                          {
                            label: '$eq',
                            contentSite: 'docs',
                            url: '/docs/v4.4/reference/operator/query/eq',
                          },
                          {
                            label: '$gt',
                            contentSite: 'docs',
                            url: '/docs/v4.4/reference/operator/query/gt',
                          },
                          {
                            label: '$gte',
                            contentSite: 'docs',
                            url: '/docs/v4.4/reference/operator/query/gte',
                          },
                          {
                            label: '$in',
                            contentSite: 'docs',
                            url: '/docs/v4.4/reference/operator/query/in',
                          },
                          {
                            label: '$lt',
                            contentSite: 'docs',
                            url: '/docs/v4.4/reference/operator/query/lt',
                          },
                          {
                            label: '$lte',
                            contentSite: 'docs',
                            url: '/docs/v4.4/reference/operator/query/lte',
                          },
                          {
                            label: '$ne',
                            contentSite: 'docs',
                            url: '/docs/v4.4/reference/operator/query/ne',
                          },
                          {
                            label: '$nin',
                            contentSite: 'docs',
                            url: '/docs/v4.4/reference/operator/query/nin',
                          },
                        ],
                      },
                      {
                        label: 'Logical Query Operators',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/query-logical',
                        collapsible: true,
                        items: [
                          {
                            label: '$and',
                            contentSite: 'docs',
                            url: '/docs/v4.4/reference/operator/query/and',
                          },
                          {
                            label: '$not',
                            contentSite: 'docs',
                            url: '/docs/v4.4/reference/operator/query/not',
                          },
                          {
                            label: '$nor',
                            contentSite: 'docs',
                            url: '/docs/v4.4/reference/operator/query/nor',
                          },
                          {
                            label: '$or',
                            contentSite: 'docs',
                            url: '/docs/v4.4/reference/operator/query/or',
                          },
                        ],
                      },
                      {
                        label: 'Element Query Operators',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/query-element',
                        collapsible: true,
                        items: [
                          {
                            label: '$exists',
                            contentSite: 'docs',
                            url: '/docs/v4.4/reference/operator/query/exists',
                          },
                          {
                            label: '$type',
                            contentSite: 'docs',
                            url: '/docs/v4.4/reference/operator/query/type',
                          },
                        ],
                      },
                      {
                        label: 'Evaluation Query Operators',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/query-evaluation',
                        collapsible: true,
                        items: [
                          {
                            label: '$expr',
                            contentSite: 'docs',
                            url: '/docs/v4.4/reference/operator/query/expr',
                          },
                          {
                            label: '$jsonSchema',
                            contentSite: 'docs',
                            url: '/docs/v4.4/reference/operator/query/jsonSchema',
                          },
                          {
                            label: '$mod',
                            contentSite: 'docs',
                            url: '/docs/v4.4/reference/operator/query/mod',
                          },
                          {
                            label: '$regex',
                            contentSite: 'docs',
                            url: '/docs/v4.4/reference/operator/query/regex',
                          },
                          {
                            label: '$text',
                            contentSite: 'docs',
                            url: '/docs/v4.4/reference/operator/query/text',
                          },
                          {
                            label: '$where',
                            contentSite: 'docs',
                            url: '/docs/v4.4/reference/operator/query/where',
                          },
                        ],
                      },
                      {
                        label: 'Geospatial Query Operators',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/query-geospatial',
                        collapsible: true,
                        items: [
                          {
                            label: '$geoIntersects',
                            contentSite: 'docs',
                            url: '/docs/v4.4/reference/operator/query/geoIntersects',
                          },
                          {
                            label: '$geoWithin',
                            contentSite: 'docs',
                            url: '/docs/v4.4/reference/operator/query/geoWithin',
                          },
                          {
                            label: '$near',
                            contentSite: 'docs',
                            url: '/docs/v4.4/reference/operator/query/near',
                          },
                          {
                            label: '$nearSphere',
                            contentSite: 'docs',
                            url: '/docs/v4.4/reference/operator/query/nearSphere',
                          },
                          {
                            label: '$box',
                            contentSite: 'docs',
                            url: '/docs/v4.4/reference/operator/query/box',
                          },
                          {
                            label: '$center',
                            contentSite: 'docs',
                            url: '/docs/v4.4/reference/operator/query/center',
                          },
                          {
                            label: '$centerSphere',
                            contentSite: 'docs',
                            url: '/docs/v4.4/reference/operator/query/centerSphere',
                          },
                          {
                            label: '$geometry',
                            contentSite: 'docs',
                            url: '/docs/v4.4/reference/operator/query/geometry',
                          },
                          {
                            label: '$maxDistance',
                            contentSite: 'docs',
                            url: '/docs/v4.4/reference/operator/query/maxDistance',
                          },
                          {
                            label: '$minDistance',
                            contentSite: 'docs',
                            url: '/docs/v4.4/reference/operator/query/minDistance',
                          },
                          {
                            label: '$polygon',
                            contentSite: 'docs',
                            url: '/docs/v4.4/reference/operator/query/polygon',
                          },
                        ],
                      },
                      {
                        label: 'Array Query Operators',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/query-array',
                        collapsible: true,
                        items: [
                          {
                            label: '$all',
                            contentSite: 'docs',
                            url: '/docs/v4.4/reference/operator/query/all',
                          },
                          {
                            label: '$elemMatch (query)',
                            contentSite: 'docs',
                            url: '/docs/v4.4/reference/operator/query/elemMatch',
                          },
                          {
                            label: '$size',
                            contentSite: 'docs',
                            url: '/docs/v4.4/reference/operator/query/size',
                          },
                        ],
                      },
                      {
                        label: 'Bitwise Query Operators',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/query-bitwise',
                        collapsible: true,
                        items: [
                          {
                            label: '$bitsAllClear',
                            contentSite: 'docs',
                            url: '/docs/v4.4/reference/operator/query/bitsAllClear',
                          },
                          {
                            label: '$bitsAllSet',
                            contentSite: 'docs',
                            url: '/docs/v4.4/reference/operator/query/bitsAllSet',
                          },
                          {
                            label: '$bitsAnyClear',
                            contentSite: 'docs',
                            url: '/docs/v4.4/reference/operator/query/bitsAnyClear',
                          },
                          {
                            label: '$bitsAnySet',
                            contentSite: 'docs',
                            url: '/docs/v4.4/reference/operator/query/bitsAnySet',
                          },
                        ],
                      },
                      {
                        label: 'Projection Operators',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/projection',
                        collapsible: true,
                        items: [
                          {
                            label: '$ (projection)',
                            contentSite: 'docs',
                            url: '/docs/v4.4/reference/operator/projection/positional',
                          },
                          {
                            label: '$elemMatch (projection)',
                            contentSite: 'docs',
                            url: '/docs/v4.4/reference/operator/projection/elemMatch',
                          },
                          {
                            label: '$slice (projection)',
                            contentSite: 'docs',
                            url: '/docs/v4.4/reference/operator/projection/slice',
                          },
                        ],
                      },
                      {
                        label: 'Miscellaneous Query Operators',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/query-miscellaneous',
                        collapsible: true,
                        items: [
                          {
                            label: '$comment',
                            contentSite: 'docs',
                            url: '/docs/v4.4/reference/operator/query/comment',
                          },
                          {
                            label: '$rand',
                            contentSite: 'docs',
                            url: '/docs/v4.4/reference/operator/query/rand',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    label: 'Update Operators',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/operator/update',
                    collapsible: true,
                    items: [
                      {
                        label: 'Field Update Operators',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/update-field',
                        collapsible: true,
                        items: [
                          {
                            label: '$currentDate',
                            contentSite: 'docs',
                            url: '/docs/v4.4/reference/operator/update/currentDate',
                          },
                          {
                            label: '$inc',
                            contentSite: 'docs',
                            url: '/docs/v4.4/reference/operator/update/inc',
                          },
                          {
                            label: '$min',
                            contentSite: 'docs',
                            url: '/docs/v4.4/reference/operator/update/min',
                          },
                          {
                            label: '$max',
                            contentSite: 'docs',
                            url: '/docs/v4.4/reference/operator/update/max',
                          },
                          {
                            label: '$mul',
                            contentSite: 'docs',
                            url: '/docs/v4.4/reference/operator/update/mul',
                          },
                          {
                            label: '$rename',
                            contentSite: 'docs',
                            url: '/docs/v4.4/reference/operator/update/rename',
                          },
                          {
                            label: '$set',
                            contentSite: 'docs',
                            url: '/docs/v4.4/reference/operator/update/set',
                          },
                          {
                            label: '$setOnInsert',
                            contentSite: 'docs',
                            url: '/docs/v4.4/reference/operator/update/setOnInsert',
                          },
                          {
                            label: '$unset',
                            contentSite: 'docs',
                            url: '/docs/v4.4/reference/operator/update/unset',
                          },
                        ],
                      },
                      {
                        label: 'Array Update Operators',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/update-array',
                        collapsible: true,
                        items: [
                          {
                            label: '$ (update)',
                            contentSite: 'docs',
                            url: '/docs/v4.4/reference/operator/update/positional',
                          },
                          {
                            label: '$[]',
                            contentSite: 'docs',
                            url: '/docs/v4.4/reference/operator/update/positional-all',
                          },
                          {
                            label: '$[<identifier>]',
                            contentSite: 'docs',
                            url: '/docs/v4.4/reference/operator/update/positional-filtered',
                          },
                          {
                            label: '$addToSet',
                            contentSite: 'docs',
                            url: '/docs/v4.4/reference/operator/update/addToSet',
                          },
                          {
                            label: '$pop',
                            contentSite: 'docs',
                            url: '/docs/v4.4/reference/operator/update/pop',
                          },
                          {
                            label: '$pull',
                            contentSite: 'docs',
                            url: '/docs/v4.4/reference/operator/update/pull',
                          },
                          {
                            label: '$push',
                            contentSite: 'docs',
                            url: '/docs/v4.4/reference/operator/update/push',
                          },
                          {
                            label: '$pullAll',
                            contentSite: 'docs',
                            url: '/docs/v4.4/reference/operator/update/pullAll',
                          },
                          {
                            label: '$each',
                            contentSite: 'docs',
                            url: '/docs/v4.4/reference/operator/update/each',
                          },
                          {
                            label: '$position',
                            contentSite: 'docs',
                            url: '/docs/v4.4/reference/operator/update/position',
                          },
                          {
                            label: '$slice',
                            contentSite: 'docs',
                            url: '/docs/v4.4/reference/operator/update/slice',
                          },
                          {
                            label: '$sort',
                            contentSite: 'docs',
                            url: '/docs/v4.4/reference/operator/update/sort',
                          },
                        ],
                      },
                      {
                        label: 'Bitwise Update Operator',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/update-bitwise',
                        collapsible: true,
                        items: [
                          {
                            label: '$bit',
                            contentSite: 'docs',
                            url: '/docs/v4.4/reference/operator/update/bit',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    label: 'Aggregation Pipeline Stages',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/operator/aggregation-pipeline',
                    collapsible: true,
                    items: [
                      {
                        label: '$addFields (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/addFields',
                      },
                      {
                        label: '$bucket (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/bucket',
                      },
                      {
                        label: '$bucketAuto (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/bucketAuto',
                      },
                      {
                        label: '$changeStream (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/changeStream',
                      },
                      {
                        label: '$collStats (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/collStats',
                      },
                      {
                        label: '$count (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/count',
                      },
                      {
                        label: '$currentOp (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/currentOp',
                      },
                      {
                        label: '$facet (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/facet',
                      },
                      {
                        label: '$geoNear (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/geoNear',
                      },
                      {
                        label: '$graphLookup (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/graphLookup',
                      },
                      {
                        label: '$group (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/group',
                      },
                      {
                        label: '$indexStats (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/indexStats',
                      },
                      {
                        label: '$limit (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/limit',
                      },
                      {
                        label: '$listLocalSessions',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/listLocalSessions',
                      },
                      {
                        label: '$listSessions',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/listSessions',
                      },
                      {
                        label: '$lookup (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/lookup',
                      },
                      {
                        label: '$match (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/match',
                      },
                      {
                        label: '$merge (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/merge',
                      },
                      {
                        label: '$out (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/out',
                      },
                      {
                        label: '$planCacheStats',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/planCacheStats',
                      },
                      {
                        label: '$project (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/project',
                      },
                      {
                        label: '$redact (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/redact',
                      },
                      {
                        label: '$replaceRoot (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/replaceRoot',
                      },
                      {
                        label: '$replaceWith (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/replaceWith',
                      },
                      {
                        label: '$sample (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/sample',
                      },
                      {
                        label: '$search (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/search',
                      },
                      {
                        label: '$set (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/set',
                      },
                      {
                        label: '$skip (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/skip',
                      },
                      {
                        label: '$sort (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/sort',
                      },
                      {
                        label: '$sortByCount (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/sortByCount',
                      },
                      {
                        label: '$unionWith (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/unionWith',
                      },
                      {
                        label: '$unset (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/unset',
                      },
                      {
                        label: '$unwind (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/unwind',
                      },
                    ],
                  },
                  {
                    label: 'Aggregation Pipeline Operators',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/operator/aggregation',
                    collapsible: true,
                    items: [
                      {
                        label: '$abs (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/abs',
                      },
                      {
                        label: '$accumulator (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/accumulator',
                      },
                      {
                        label: '$acos (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/acos',
                      },
                      {
                        label: '$acosh (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/acosh',
                      },
                      {
                        label: '$add (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/add',
                      },
                      {
                        label: '$addToSet (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/addToSet',
                      },
                      {
                        label: '$allElementsTrue (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/allElementsTrue',
                      },
                      {
                        label: '$and (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/and',
                      },
                      {
                        label: '$anyElementTrue (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/anyElementTrue',
                      },
                      {
                        label: '$arrayElemAt (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/arrayElemAt',
                      },
                      {
                        label: '$arrayToObject (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/arrayToObject',
                      },
                      {
                        label: '$asin (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/asin',
                      },
                      {
                        label: '$asinh (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/asinh',
                      },
                      {
                        label: '$atan (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/atan',
                      },
                      {
                        label: '$atan2 (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/atan2',
                      },
                      {
                        label: '$atanh (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/atanh',
                      },
                      {
                        label: '$avg (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/avg',
                      },
                      {
                        label: '$binarySize (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/binarySize',
                      },
                      {
                        label: '$bsonSize (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/bsonSize',
                      },
                      {
                        label: '$ceil (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/ceil',
                      },
                      {
                        label: '$cmp (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/cmp',
                      },
                      {
                        label: '$concat (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/concat',
                      },
                      {
                        label: '$concatArrays (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/concatArrays',
                      },
                      {
                        label: '$cond (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/cond',
                      },
                      {
                        label: '$convert (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/convert',
                      },
                      {
                        label: '$cos (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/cos',
                      },
                      {
                        label: '$cosh (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/cosh',
                      },
                      {
                        label: '$dateFromParts (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/dateFromParts',
                      },
                      {
                        label: '$dateToParts (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/dateToParts',
                      },
                      {
                        label: '$dateFromString (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/dateFromString',
                      },
                      {
                        label: '$dateToString (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/dateToString',
                      },
                      {
                        label: '$dayOfMonth (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/dayOfMonth',
                      },
                      {
                        label: '$dayOfWeek (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/dayOfWeek',
                      },
                      {
                        label: '$dayOfYear (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/dayOfYear',
                      },
                      {
                        label: '$degreesToRadians (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/degreesToRadians',
                      },
                      {
                        label: '$divide (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/divide',
                      },
                      {
                        label: '$eq (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/eq',
                      },
                      {
                        label: '$exp (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/exp',
                      },
                      {
                        label: '$filter (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/filter',
                      },
                      {
                        label: '$first (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/first',
                      },
                      {
                        label: '$first (array operator)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/first-array-element',
                      },
                      {
                        label: '$floor (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/floor',
                      },
                      {
                        label: '$function (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/function',
                      },
                      {
                        label: '$gt (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/gt',
                      },
                      {
                        label: '$gte (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/gte',
                      },
                      {
                        label: '$hour (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/hour',
                      },
                      {
                        label: '$ifNull (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/ifNull',
                      },
                      {
                        label: '$in (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/in',
                      },
                      {
                        label: '$indexOfArray (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/indexOfArray',
                      },
                      {
                        label: '$indexOfBytes (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/indexOfBytes',
                      },
                      {
                        label: '$indexOfCP (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/indexOfCP',
                      },
                      {
                        label: '$isArray (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/isArray',
                      },
                      {
                        label: '$isNumber (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/isNumber',
                      },
                      {
                        label: '$isoDayOfWeek (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/isoDayOfWeek',
                      },
                      {
                        label: '$isoWeek (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/isoWeek',
                      },
                      {
                        label: '$isoWeekYear (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/isoWeekYear',
                      },
                      {
                        label: '$last (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/last',
                      },
                      {
                        label: '$last (array operator)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/last-array-element',
                      },
                      {
                        label: '$let (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/let',
                      },
                      {
                        label: '$literal (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/literal',
                      },
                      {
                        label: '$ln (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/ln',
                      },
                      {
                        label: '$log (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/log',
                      },
                      {
                        label: '$log10 (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/log10',
                      },
                      {
                        label: '$lt (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/lt',
                      },
                      {
                        label: '$lte (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/lte',
                      },
                      {
                        label: '$ltrim (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/ltrim',
                      },
                      {
                        label: '$map (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/map',
                      },
                      {
                        label: '$max (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/max',
                      },
                      {
                        label: '$mergeObjects (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/mergeObjects',
                      },
                      {
                        label: '$meta',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/meta',
                      },
                      {
                        label: '$min (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/min',
                      },
                      {
                        label: '$millisecond (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/millisecond',
                      },
                      {
                        label: '$minute (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/minute',
                      },
                      {
                        label: '$mod (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/mod',
                      },
                      {
                        label: '$month (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/month',
                      },
                      {
                        label: '$multiply (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/multiply',
                      },
                      {
                        label: '$ne (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/ne',
                      },
                      {
                        label: '$not (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/not',
                      },
                      {
                        label: '$objectToArray (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/objectToArray',
                      },
                      {
                        label: '$or (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/or',
                      },
                      {
                        label: '$pow (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/pow',
                      },
                      {
                        label: '$push (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/push',
                      },
                      {
                        label: '$radiansToDegrees (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/radiansToDegrees',
                      },
                      {
                        label: '$rand (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/rand',
                      },
                      {
                        label: '$range (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/range',
                      },
                      {
                        label: '$reduce (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/reduce',
                      },
                      {
                        label: '$regexFind (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/regexFind',
                      },
                      {
                        label: '$regexFindAll (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/regexFindAll',
                      },
                      {
                        label: '$regexMatch (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/regexMatch',
                      },
                      {
                        label: '$replaceOne (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/replaceOne',
                      },
                      {
                        label: '$replaceAll (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/replaceAll',
                      },
                      {
                        label: '$reverseArray (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/reverseArray',
                      },
                      {
                        label: '$round (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/round',
                      },
                      {
                        label: '$rtrim (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/rtrim',
                      },
                      {
                        label: '$sampleRate (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/sampleRate',
                      },
                      {
                        label: '$second (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/second',
                      },
                      {
                        label: '$setDifference (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/setDifference',
                      },
                      {
                        label: '$setEquals (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/setEquals',
                      },
                      {
                        label: '$setIntersection (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/setIntersection',
                      },
                      {
                        label: '$setIsSubset (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/setIsSubset',
                      },
                      {
                        label: '$setUnion (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/setUnion',
                      },
                      {
                        label: '$size (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/size',
                      },
                      {
                        label: '$sin (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/sin',
                      },
                      {
                        label: '$sinh (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/sinh',
                      },
                      {
                        label: '$slice (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/slice',
                      },
                      {
                        label: '$split (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/split',
                      },
                      {
                        label: '$sqrt (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/sqrt',
                      },
                      {
                        label: '$stdDevPop (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/stdDevPop',
                      },
                      {
                        label: '$stdDevSamp (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/stdDevSamp',
                      },
                      {
                        label: '$strcasecmp (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/strcasecmp',
                      },
                      {
                        label: '$strLenBytes (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/strLenBytes',
                      },
                      {
                        label: '$strLenCP (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/strLenCP',
                      },
                      {
                        label: '$substr (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/substr',
                      },
                      {
                        label: '$substrBytes (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/substrBytes',
                      },
                      {
                        label: '$substrCP (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/substrCP',
                      },
                      {
                        label: '$subtract (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/subtract',
                      },
                      {
                        label: '$sum (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/sum',
                      },
                      {
                        label: '$switch (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/switch',
                      },
                      {
                        label: '$tan (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/tan',
                      },
                      {
                        label: '$tanh (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/tanh',
                      },
                      {
                        label: '$toBool (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/toBool',
                      },
                      {
                        label: '$toDate (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/toDate',
                      },
                      {
                        label: '$toDecimal (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/toDecimal',
                      },
                      {
                        label: '$toDouble(aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/toDouble',
                      },
                      {
                        label: '$toInt (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/toInt',
                      },
                      {
                        label: '$toLong (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/toLong',
                      },
                      {
                        label: '$toObjectId (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/toObjectId',
                      },
                      {
                        label: '$toString (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/toString',
                      },
                      {
                        label: '$toLower (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/toLower',
                      },
                      {
                        label: '$toUpper (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/toUpper',
                      },
                      {
                        label: '$trim (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/trim',
                      },
                      {
                        label: '$trunc (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/trunc',
                      },
                      {
                        label: '$type (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/type',
                      },
                      {
                        label: '$week (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/week',
                      },
                      {
                        label: '$year (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/year',
                      },
                      {
                        label: '$zip (aggregation)',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/aggregation/zip',
                      },
                    ],
                  },
                  {
                    label: 'Query Modifiers',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/operator/query-modifier',
                    collapsible: true,
                    items: [
                      {
                        label: '$comment',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/meta/comment',
                      },
                      {
                        label: '$explain',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/meta/explain',
                      },
                      {
                        label: '$hint',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/meta/hint',
                      },
                      {
                        label: '$max',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/meta/max',
                      },
                      {
                        label: '$maxTimeMS',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/meta/maxTimeMS',
                      },
                      {
                        label: '$min',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/meta/min',
                      },
                      {
                        label: '$orderby',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/meta/orderby',
                      },
                      {
                        label: '$query',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/meta/query',
                      },
                      {
                        label: '$returnKey',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/meta/returnKey',
                      },
                      {
                        label: '$showDiskLoc',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/meta/showDiskLoc',
                      },
                      {
                        label: '$natural',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/operator/meta/natural',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Database Commands',
                contentSite: 'docs',
                url: '/docs/v4.4/reference/command',
                collapsible: true,
                items: [
                  {
                    label: 'Aggregation Commands',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/command/nav-aggregation',
                    collapsible: true,
                    items: [
                      {
                        label: 'aggregate',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/aggregate',
                      },
                      {
                        label: 'count',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/count',
                      },
                      {
                        label: 'distinct',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/distinct',
                      },
                      {
                        label: 'mapReduce',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/mapReduce',
                      },
                    ],
                  },
                  {
                    label: 'Geospatial Commands',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/command/nav-geospatial',
                    collapsible: true,
                    items: [
                      {
                        label: 'geoSearch',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/geoSearch',
                      },
                    ],
                  },
                  {
                    label: 'Query and Write Operation Commands',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/command/nav-crud',
                    collapsible: true,
                    items: [
                      {
                        label: 'delete',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/delete',
                      },
                      {
                        label: 'find',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/find',
                      },
                      {
                        label: 'findAndModify',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/findAndModify',
                      },
                      {
                        label: 'getLastError',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/getLastError',
                      },
                      {
                        label: 'getMore',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/getMore',
                      },
                      {
                        label: 'insert',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/insert',
                      },
                      {
                        label: 'resetError',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/resetError',
                      },
                      {
                        label: 'update',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/update',
                      },
                    ],
                  },
                  {
                    label: 'Query Plan Cache Commands',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/command/nav-plan-cache',
                    collapsible: true,
                    items: [
                      {
                        label: 'planCacheClear',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/planCacheClear',
                      },
                      {
                        label: 'planCacheClearFilters',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/planCacheClearFilters',
                      },
                      {
                        label: 'planCacheListFilters',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/planCacheListFilters',
                      },
                      {
                        label: 'planCacheSetFilter',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/planCacheSetFilter',
                      },
                    ],
                  },
                  {
                    label: 'Authentication Commands',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/command/nav-authentication',
                    collapsible: true,
                    items: [
                      {
                        label: 'authenticate',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/authenticate',
                      },
                      {
                        label: 'getnonce',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/getnonce',
                      },
                      {
                        label: 'logout',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/logout',
                      },
                    ],
                  },
                  {
                    label: 'User Management Commands',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/command/nav-user-management',
                    collapsible: true,
                    items: [
                      {
                        label: 'createUser',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/createUser',
                      },
                      {
                        label: 'dropAllUsersFromDatabase',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/dropAllUsersFromDatabase',
                      },
                      {
                        label: 'dropUser',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/dropUser',
                      },
                      {
                        label: 'grantRolesToUser',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/grantRolesToUser',
                      },
                      {
                        label: 'revokeRolesFromUser',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/revokeRolesFromUser',
                      },
                      {
                        label: 'updateUser',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/updateUser',
                      },
                      {
                        label: 'usersInfo',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/usersInfo',
                      },
                    ],
                  },
                  {
                    label: 'Role Management Commands',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/command/nav-role-management',
                    collapsible: true,
                    items: [
                      {
                        label: 'createRole',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/createRole',
                      },
                      {
                        label: 'dropRole',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/dropRole',
                      },
                      {
                        label: 'dropAllRolesFromDatabase',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/dropAllRolesFromDatabase',
                      },
                      {
                        label: 'grantPrivilegesToRole',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/grantPrivilegesToRole',
                      },
                      {
                        label: 'grantRolesToRole',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/grantRolesToRole',
                      },
                      {
                        label: 'invalidateUserCache',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/invalidateUserCache',
                      },
                      {
                        label: 'revokePrivilegesFromRole',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/revokePrivilegesFromRole',
                      },
                      {
                        label: 'revokeRolesFromRole',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/revokeRolesFromRole',
                      },
                      {
                        label: 'rolesInfo',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/rolesInfo',
                      },
                      {
                        label: 'updateRole',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/updateRole',
                      },
                    ],
                  },
                  {
                    label: 'Replication Commands',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/command/nav-replication',
                    collapsible: true,
                    items: [
                      {
                        label: 'appendOplogNote',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/appendOplogNote',
                      },
                      {
                        label: 'applyOps',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/applyOps',
                      },
                      {
                        label: 'hello',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/hello',
                      },
                      {
                        label: 'isMaster',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/isMaster',
                      },
                      {
                        label: 'replSetAbortPrimaryCatchUp',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/replSetAbortPrimaryCatchUp',
                      },
                      {
                        label: 'replSetFreeze',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/replSetFreeze',
                      },
                      {
                        label: 'replSetGetConfig',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/replSetGetConfig',
                      },
                      {
                        label: 'replSetGetStatus',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/replSetGetStatus',
                      },
                      {
                        label: 'replSetInitiate',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/replSetInitiate',
                      },
                      {
                        label: 'replSetMaintenance',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/replSetMaintenance',
                      },
                      {
                        label: 'replSetReconfig',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/replSetReconfig',
                      },
                      {
                        label: 'replSetResizeOplog',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/replSetResizeOplog',
                      },
                      {
                        label: 'replSetStepDown',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/replSetStepDown',
                      },
                      {
                        label: 'replSetSyncFrom',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/replSetSyncFrom',
                      },
                    ],
                  },
                  {
                    label: 'Sharding Commands',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/command/nav-sharding',
                    collapsible: true,
                    items: [
                      {
                        label: 'addShard',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/addShard',
                      },
                      {
                        label: 'addShardToZone',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/addShardToZone',
                      },
                      {
                        label: 'balancerCollectionStatus',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/balancerCollectionStatus',
                      },
                      {
                        label: 'balancerStart',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/balancerStart',
                      },
                      {
                        label: 'balancerStatus',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/balancerStatus',
                      },
                      {
                        label: 'balancerStop',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/balancerStop',
                      },
                      {
                        label: 'checkShardingIndex',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/checkShardingIndex',
                      },
                      {
                        label: 'clearJumboFlag',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/clearJumboFlag',
                      },
                      {
                        label: 'cleanupOrphaned',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/cleanupOrphaned',
                      },
                      {
                        label: 'enableSharding',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/enableSharding',
                      },
                      {
                        label: 'flushRouterConfig',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/flushRouterConfig',
                      },
                      {
                        label: 'getShardMap',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/getShardMap',
                      },
                      {
                        label: 'getShardVersion',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/getShardVersion',
                      },
                      {
                        label: 'isdbgrid',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/isdbgrid',
                      },
                      {
                        label: 'listShards',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/listShards',
                      },
                      {
                        label: 'moveChunk',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/moveChunk',
                      },
                      {
                        label: 'movePrimary',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/movePrimary',
                      },
                      {
                        label: 'mergeChunks',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/mergeChunks',
                      },
                      {
                        label: 'refineCollectionShardKey',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/refineCollectionShardKey',
                      },
                      {
                        label: 'removeShard',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/removeShard',
                      },
                      {
                        label: 'removeShardFromZone',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/removeShardFromZone',
                      },
                      {
                        label: 'setAllowMigrations',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/setAllowMigrations',
                      },
                      {
                        label: 'setShardVersion',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/setShardVersion',
                      },
                      {
                        label: 'shardCollection',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/shardCollection',
                      },
                      {
                        label: 'shardingState',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/shardingState',
                      },
                      {
                        label: 'split',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/split',
                      },
                      {
                        label: 'splitVector',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/splitVector',
                      },
                      {
                        label: 'unsetSharding',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/unsetSharding',
                      },
                      {
                        label: 'updateZoneKeyRange',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/updateZoneKeyRange',
                      },
                    ],
                  },
                  {
                    label: 'Sessions Commands',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/command/nav-sessions',
                    collapsible: true,
                    items: [
                      {
                        label: 'abortTransaction',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/abortTransaction',
                      },
                      {
                        label: 'commitTransaction',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/commitTransaction',
                      },
                      {
                        label: 'endSessions',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/endSessions',
                      },
                      {
                        label: 'killAllSessions',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/killAllSessions',
                      },
                      {
                        label: 'killAllSessionsByPattern',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/killAllSessionsByPattern',
                      },
                      {
                        label: 'killSessions',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/killSessions',
                      },
                      {
                        label: 'refreshSessions',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/refreshSessions',
                      },
                      {
                        label: 'startSession',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/startSession',
                      },
                    ],
                  },
                  {
                    label: 'Administration Commands',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/command/nav-administration',
                    collapsible: true,
                    items: [
                      {
                        label: 'cloneCollectionAsCapped',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/cloneCollectionAsCapped',
                      },
                      {
                        label: 'collMod',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/collMod',
                      },
                      {
                        label: 'compact',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/compact',
                      },
                      {
                        label: 'convertToCapped',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/convertToCapped',
                      },
                      {
                        label: 'create',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/create',
                      },
                      {
                        label: 'createIndexes',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/createIndexes',
                      },
                      {
                        label: 'currentOp',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/currentOp',
                      },
                      {
                        label: 'drop',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/drop',
                      },
                      {
                        label: 'dropDatabase',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/dropDatabase',
                      },
                      {
                        label: 'dropConnections',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/dropConnections',
                      },
                      {
                        label: 'dropIndexes',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/dropIndexes',
                      },
                      {
                        label: 'filemd5',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/filemd5',
                      },
                      {
                        label: 'fsync',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/fsync',
                      },
                      {
                        label: 'fsyncUnlock',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/fsyncUnlock',
                      },
                      {
                        label: 'getDefaultRWConcern',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/getDefaultRWConcern',
                      },
                      {
                        label: 'getParameter',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/getParameter',
                      },
                      {
                        label: 'killCursors',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/killCursors',
                      },
                      {
                        label: 'killOp',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/killOp',
                      },
                      {
                        label: 'listCollections',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/listCollections',
                      },
                      {
                        label: 'listDatabases',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/listDatabases',
                      },
                      {
                        label: 'listIndexes',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/listIndexes',
                      },
                      {
                        label: 'logRotate',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/logRotate',
                      },
                      {
                        label: 'reIndex',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/reIndex',
                      },
                      {
                        label: 'renameCollection',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/renameCollection',
                      },
                      {
                        label: 'setFeatureCompatibilityVersion',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/setFeatureCompatibilityVersion',
                      },
                      {
                        label: 'setIndexCommitQuorum',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/setIndexCommitQuorum',
                      },
                      {
                        label: 'setParameter',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/setParameter',
                      },
                      {
                        label: 'setDefaultRWConcern',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/setDefaultRWConcern',
                      },
                      {
                        label: 'shutdown',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/shutdown',
                      },
                    ],
                  },
                  {
                    label: 'Diagnostic Commands',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/command/nav-diagnostic',
                    collapsible: true,
                    items: [
                      {
                        label: 'availableQueryOptions',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/availableQueryOptions',
                      },
                      {
                        label: 'buildInfo',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/buildInfo',
                      },
                      {
                        label: 'collStats',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/collStats',
                      },
                      {
                        label: 'connPoolStats',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/connPoolStats',
                      },
                      {
                        label: 'connectionStatus',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/connectionStatus',
                      },
                      {
                        label: 'dataSize',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/dataSize',
                      },
                      {
                        label: 'dbHash',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/dbHash',
                      },
                      {
                        label: 'dbStats',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/dbStats',
                      },
                      {
                        label: 'driverOIDTest',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/driverOIDTest',
                      },
                      {
                        label: 'explain',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/explain',
                      },
                      {
                        label: 'features',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/features',
                      },
                      {
                        label: 'getCmdLineOpts',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/getCmdLineOpts',
                      },
                      {
                        label: 'getLog',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/getLog',
                      },
                      {
                        label: 'hostInfo',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/hostInfo',
                      },
                      {
                        label: 'isSelf',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/isSelf',
                      },
                      {
                        label: 'listCommands',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/listCommands',
                      },
                      {
                        label: 'lockInfo',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/lockInfo',
                      },
                      {
                        label: 'netstat',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/netstat',
                      },
                      {
                        label: 'ping',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/ping',
                      },
                      {
                        label: 'profile',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/profile',
                      },
                      {
                        label: 'serverStatus',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/serverStatus',
                      },
                      {
                        label: 'shardConnPoolStats',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/shardConnPoolStats',
                      },
                      {
                        label: 'top',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/top',
                      },
                      {
                        label: 'validate',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/validate',
                      },
                      {
                        label: 'whatsmyuri',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/whatsmyuri',
                      },
                    ],
                  },
                  {
                    label: 'System Events Auditing Commands',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/command/nav-auditing',
                    collapsible: true,
                    items: [
                      {
                        label: 'logApplicationMessage',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/command/logApplicationMessage',
                      },
                    ],
                  },
                ],
              },
              {
                label: ' Shell Methods',
                contentSite: 'docs',
                url: '/docs/v4.4/reference/method',
                collapsible: true,
                items: [
                  {
                    label: 'Collection Methods',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/method/js-collection',
                    collapsible: true,
                    items: [
                      {
                        label: 'db.collection.aggregate()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.collection.aggregate',
                      },
                      {
                        label: 'db.collection.bulkWrite()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.collection.bulkWrite',
                      },
                      {
                        label: 'db.collection.copyTo()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.collection.copyTo',
                      },
                      {
                        label: 'db.collection.count()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.collection.count',
                      },
                      {
                        label: 'db.collection.countDocuments()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.collection.countDocuments',
                      },
                      {
                        label: 'db.collection.estimatedDocumentCount()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.collection.estimatedDocumentCount',
                      },
                      {
                        label: 'db.collection.createIndex()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.collection.createIndex',
                      },
                      {
                        label: 'db.collection.createIndexes()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.collection.createIndexes',
                      },
                      {
                        label: 'db.collection.dataSize()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.collection.dataSize',
                      },
                      {
                        label: 'db.collection.deleteOne()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.collection.deleteOne',
                      },
                      {
                        label: 'db.collection.deleteMany()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.collection.deleteMany',
                      },
                      {
                        label: 'db.collection.distinct()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.collection.distinct',
                      },
                      {
                        label: 'db.collection.drop()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.collection.drop',
                      },
                      {
                        label: 'db.collection.dropIndex()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.collection.dropIndex',
                      },
                      {
                        label: 'db.collection.dropIndexes()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.collection.dropIndexes',
                      },
                      {
                        label: 'db.collection.ensureIndex()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.collection.ensureIndex',
                      },
                      {
                        label: 'db.collection.explain()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.collection.explain',
                      },
                      {
                        label: 'db.collection.find()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.collection.find',
                      },
                      {
                        label: 'db.collection.findAndModify()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.collection.findAndModify',
                      },
                      {
                        label: 'db.collection.findOne()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.collection.findOne',
                      },
                      {
                        label: 'db.collection.findOneAndDelete()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.collection.findOneAndDelete',
                      },
                      {
                        label: 'db.collection.findOneAndReplace()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.collection.findOneAndReplace',
                      },
                      {
                        label: 'db.collection.findOneAndUpdate()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.collection.findOneAndUpdate',
                      },
                      {
                        label: 'db.collection.getIndexes()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.collection.getIndexes',
                      },
                      {
                        label: 'db.collection.getShardDistribution()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.collection.getShardDistribution',
                      },
                      {
                        label: 'db.collection.getShardVersion()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.collection.getShardVersion',
                      },
                      {
                        label: 'db.collection.hideIndex()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.collection.hideIndex',
                      },
                      {
                        label: 'db.collection.insert()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.collection.insert',
                      },
                      {
                        label: 'db.collection.insertOne()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.collection.insertOne',
                      },
                      {
                        label: 'db.collection.insertMany()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.collection.insertMany',
                      },
                      {
                        label: 'db.collection.isCapped()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.collection.isCapped',
                      },
                      {
                        label: 'db.collection.latencyStats()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.collection.latencyStats',
                      },
                      {
                        label: 'db.collection.mapReduce()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.collection.mapReduce',
                      },
                      {
                        label: 'db.collection.reIndex()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.collection.reIndex',
                      },
                      {
                        label: 'db.collection.remove()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.collection.remove',
                      },
                      {
                        label: 'db.collection.renameCollection()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.collection.renameCollection',
                      },
                      {
                        label: 'db.collection.replaceOne()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.collection.replaceOne',
                      },
                      {
                        label: 'db.collection.save()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.collection.save',
                      },
                      {
                        label: 'db.collection.stats()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.collection.stats',
                      },
                      {
                        label: 'db.collection.storageSize()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.collection.storageSize',
                      },
                      {
                        label: 'db.collection.totalIndexSize()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.collection.totalIndexSize',
                      },
                      {
                        label: 'db.collection.totalSize()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.collection.totalSize',
                      },
                      {
                        label: 'db.collection.unhideIndex()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.collection.unhideIndex',
                      },
                      {
                        label: 'db.collection.update()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.collection.update',
                      },
                      {
                        label: 'db.collection.updateOne()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.collection.updateOne',
                      },
                      {
                        label: 'db.collection.updateMany()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.collection.updateMany',
                      },
                      {
                        label: 'db.collection.watch()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.collection.watch',
                      },
                      {
                        label: 'db.collection.validate()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.collection.validate',
                      },
                    ],
                  },
                  {
                    label: 'Cursor Methods',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/method/js-cursor',
                    collapsible: true,
                    items: [
                      {
                        label: 'cursor.addOption()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/cursor.addOption',
                      },
                      {
                        label: 'cursor.allowDiskUse()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/cursor.allowDiskUse',
                      },
                      {
                        label: 'cursor.allowPartialResults()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/cursor.allowPartialResults',
                      },
                      {
                        label: 'cursor.batchSize()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/cursor.batchSize',
                      },
                      {
                        label: 'cursor.close()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/cursor.close',
                      },
                      {
                        label: 'cursor.isClosed()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/cursor.isClosed',
                      },
                      {
                        label: 'cursor.collation()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/cursor.collation',
                      },
                      {
                        label: 'cursor.comment()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/cursor.comment',
                      },
                      {
                        label: 'cursor.count()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/cursor.count',
                      },
                      {
                        label: 'cursor.explain()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/cursor.explain',
                      },
                      {
                        label: 'cursor.forEach()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/cursor.forEach',
                      },
                      {
                        label: 'cursor.hasNext()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/cursor.hasNext',
                      },
                      {
                        label: 'cursor.hint()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/cursor.hint',
                      },
                      {
                        label: 'cursor.isExhausted()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/cursor.isExhausted',
                      },
                      {
                        label: 'cursor.itcount()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/cursor.itcount',
                      },
                      {
                        label: 'cursor.limit()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/cursor.limit',
                      },
                      {
                        label: 'cursor.map()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/cursor.map',
                      },
                      {
                        label: 'cursor.max()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/cursor.max',
                      },
                      {
                        label: 'cursor.maxTimeMS()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/cursor.maxTimeMS',
                      },
                      {
                        label: 'cursor.min()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/cursor.min',
                      },
                      {
                        label: 'cursor.next()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/cursor.next',
                      },
                      {
                        label: 'cursor.noCursorTimeout()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/cursor.noCursorTimeout',
                      },
                      {
                        label: 'cursor.objsLeftInBatch()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/cursor.objsLeftInBatch',
                      },
                      {
                        label: 'cursor.pretty()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/cursor.pretty',
                      },
                      {
                        label: 'cursor.readConcern()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/cursor.readConcern',
                      },
                      {
                        label: 'cursor.readPref()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/cursor.readPref',
                      },
                      {
                        label: 'cursor.returnKey()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/cursor.returnKey',
                      },
                      {
                        label: 'cursor.showRecordId()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/cursor.showRecordId',
                      },
                      {
                        label: 'cursor.size()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/cursor.size',
                      },
                      {
                        label: 'cursor.skip()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/cursor.skip',
                      },
                      {
                        label: 'cursor.sort()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/cursor.sort',
                      },
                      {
                        label: 'cursor.tailable()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/cursor.tailable',
                      },
                      {
                        label: 'cursor.toArray()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/cursor.toArray',
                      },
                      {
                        label: 'cursor.tryNext()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/cursor.tryNext',
                      },
                    ],
                  },
                  {
                    label: 'Database Methods',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/method/js-database',
                    collapsible: true,
                    items: [
                      {
                        label: 'db.adminCommand()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.adminCommand',
                      },
                      {
                        label: 'db.aggregate()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.aggregate',
                      },
                      {
                        label: 'db.commandHelp()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.commandHelp',
                      },
                      {
                        label: 'db.createCollection()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.createCollection',
                      },
                      {
                        label: 'db.createView()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.createView',
                      },
                      {
                        label: 'db.currentOp()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.currentOp',
                      },
                      {
                        label: 'db.dropDatabase()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.dropDatabase',
                      },
                      {
                        label: 'db.eval()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.eval',
                      },
                      {
                        label: 'db.fsyncLock()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.fsyncLock',
                      },
                      {
                        label: 'db.fsyncUnlock()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.fsyncUnlock',
                      },
                      {
                        label: 'db.getCollection()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.getCollection',
                      },
                      {
                        label: 'db.getCollectionInfos()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.getCollectionInfos',
                      },
                      {
                        label: 'db.getCollectionNames()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.getCollectionNames',
                      },
                      {
                        label: 'db.getLastError()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.getLastError',
                      },
                      {
                        label: 'db.getLastErrorObj()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.getLastErrorObj',
                      },
                      {
                        label: 'db.getLogComponents()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.getLogComponents',
                      },
                      {
                        label: 'db.getMongo()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.getMongo',
                      },
                      {
                        label: 'db.getName()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.getName',
                      },
                      {
                        label: 'db.getProfilingLevel()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.getProfilingLevel',
                      },
                      {
                        label: 'db.getProfilingStatus()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.getProfilingStatus',
                      },
                      {
                        label: 'db.getReplicationInfo()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.getReplicationInfo',
                      },
                      {
                        label: 'db.getSiblingDB()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.getSiblingDB',
                      },
                      {
                        label: 'db.hello()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.hello',
                      },
                      {
                        label: 'db.help()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.help',
                      },
                      {
                        label: 'db.hostInfo()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.hostInfo',
                      },
                      {
                        label: 'db.isMaster()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.isMaster',
                      },
                      {
                        label: 'db.killOp()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.killOp',
                      },
                      {
                        label: 'db.listCommands()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.listCommands',
                      },
                      {
                        label: 'db.logout()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.logout',
                      },
                      {
                        label: 'db.printCollectionStats()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.printCollectionStats',
                      },
                      {
                        label: 'db.printReplicationInfo()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.printReplicationInfo',
                      },
                      {
                        label: 'db.printSecondaryReplicationInfo()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.printSecondaryReplicationInfo',
                      },
                      {
                        label: 'db.printShardingStatus()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.printShardingStatus',
                      },
                      {
                        label: 'db.printSlaveReplicationInfo()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.printSlaveReplicationInfo',
                      },
                      {
                        label: 'db.resetError()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.resetError',
                      },
                      {
                        label: 'db.runCommand()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.runCommand',
                      },
                      {
                        label: 'db.serverBuildInfo()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.serverBuildInfo',
                      },
                      {
                        label: 'db.serverCmdLineOpts()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.serverCmdLineOpts',
                      },
                      {
                        label: 'db.serverStatus()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.serverStatus',
                      },
                      {
                        label: 'db.setLogLevel()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.setLogLevel',
                      },
                      {
                        label: 'db.setProfilingLevel()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.setProfilingLevel',
                      },
                      {
                        label: 'db.shutdownServer()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.shutdownServer',
                      },
                      {
                        label: 'db.stats()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.stats',
                      },
                      {
                        label: 'db.version()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.version',
                      },
                      {
                        label: 'db.watch()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.watch',
                      },
                    ],
                  },
                  {
                    label: 'Query Plan Cache Methods',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/method/js-plan-cache',
                    collapsible: true,
                    items: [
                      {
                        label: 'db.collection.getPlanCache()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.collection.getPlanCache',
                      },
                      {
                        label: 'PlanCache.clear()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/PlanCache.clear',
                      },
                      {
                        label: 'PlanCache.clearPlansByQuery()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/PlanCache.clearPlansByQuery',
                      },
                      {
                        label: 'PlanCache.help()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/PlanCache.help',
                      },
                      {
                        label: 'PlanCache.list()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/PlanCache.list',
                      },
                    ],
                  },
                  {
                    label: 'Bulk Operation Methods',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/method/js-bulk',
                    collapsible: true,
                    items: [
                      {
                        label: 'db.collection.initializeOrderedBulkOp()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.collection.initializeOrderedBulkOp',
                      },
                      {
                        label: 'db.collection.initializeUnorderedBulkOp()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.collection.initializeUnorderedBulkOp',
                      },
                      {
                        label: 'Bulk()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/Bulk',
                      },
                      {
                        label: 'Bulk.execute()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/Bulk.execute',
                      },
                      {
                        label: 'Bulk.find()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/Bulk.find',
                      },
                      {
                        label: 'Bulk.find.arrayFilters()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/Bulk.find.arrayFilters',
                      },
                      {
                        label: 'Bulk.find.collation()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/Bulk.find.collation',
                      },
                      {
                        label: 'Bulk.find.hint()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/Bulk.find.hint',
                      },
                      {
                        label: 'Bulk.find.remove()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/Bulk.find.remove',
                      },
                      {
                        label: 'Bulk.find.removeOne()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/Bulk.find.removeOne',
                      },
                      {
                        label: 'Bulk.find.replaceOne()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/Bulk.find.replaceOne',
                      },
                      {
                        label: 'Bulk.find.updateOne()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/Bulk.find.updateOne',
                      },
                      {
                        label: 'Bulk.find.update()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/Bulk.find.update',
                      },
                      {
                        label: 'Bulk.find.upsert()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/Bulk.find.upsert',
                      },
                      {
                        label: 'Bulk.getOperations()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/Bulk.getOperations',
                      },
                      {
                        label: 'Bulk.insert()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/Bulk.insert',
                      },
                      {
                        label: 'Bulk.tojson()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/Bulk.tojson',
                      },
                      {
                        label: 'Bulk.toString()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/Bulk.toString',
                      },
                    ],
                  },
                  {
                    label: 'User Management Methods',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/method/js-user-management',
                    collapsible: true,
                    items: [
                      {
                        label: 'db.auth()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.auth',
                      },
                      {
                        label: 'db.changeUserPassword()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.changeUserPassword',
                      },
                      {
                        label: 'db.createUser()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.createUser',
                      },
                      {
                        label: 'db.dropUser()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.dropUser',
                      },
                      {
                        label: 'db.dropAllUsers()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.dropAllUsers',
                      },
                      {
                        label: 'db.getUser()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.getUser',
                      },
                      {
                        label: 'db.getUsers()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.getUsers',
                      },
                      {
                        label: 'db.grantRolesToUser()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.grantRolesToUser',
                      },
                      {
                        label: 'db.removeUser()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.removeUser',
                      },
                      {
                        label: 'db.revokeRolesFromUser()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.revokeRolesFromUser',
                      },
                      {
                        label: 'db.updateUser()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.updateUser',
                      },
                      {
                        label: 'passwordPrompt()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/passwordPrompt',
                      },
                    ],
                  },
                  {
                    label: 'Role Management Methods',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/method/js-role-management',
                    collapsible: true,
                    items: [
                      {
                        label: 'db.createRole()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.createRole',
                      },
                      {
                        label: 'db.dropRole()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.dropRole',
                      },
                      {
                        label: 'db.dropAllRoles()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.dropAllRoles',
                      },
                      {
                        label: 'db.getRole()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.getRole',
                      },
                      {
                        label: 'db.getRoles()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.getRoles',
                      },
                      {
                        label: 'db.grantPrivilegesToRole()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.grantPrivilegesToRole',
                      },
                      {
                        label: 'db.revokePrivilegesFromRole()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.revokePrivilegesFromRole',
                      },
                      {
                        label: 'db.grantRolesToRole()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.grantRolesToRole',
                      },
                      {
                        label: 'db.revokeRolesFromRole()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.revokeRolesFromRole',
                      },
                      {
                        label: 'db.updateRole()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/db.updateRole',
                      },
                    ],
                  },
                  {
                    label: 'Replication Methods',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/method/js-replication',
                    collapsible: true,
                    items: [
                      {
                        label: 'rs.add()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/rs.add',
                      },
                      {
                        label: 'rs.addArb()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/rs.addArb',
                      },
                      {
                        label: 'rs.conf()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/rs.conf',
                      },
                      {
                        label: 'rs.freeze()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/rs.freeze',
                      },
                      {
                        label: 'rs.help()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/rs.help',
                      },
                      {
                        label: 'rs.initiate()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/rs.initiate',
                      },
                      {
                        label: 'rs.printReplicationInfo()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/rs.printReplicationInfo',
                      },
                      {
                        label: 'rs.printSecondaryReplicationInfo()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/rs.printSecondaryReplicationInfo',
                      },
                      {
                        label: 'rs.printSlaveReplicationInfo()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/rs.printSlaveReplicationInfo',
                      },
                      {
                        label: 'rs.reconfig()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/rs.reconfig',
                      },
                      {
                        label: 'rs.reconfigForPSASet()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/rs.reconfigForPSASet',
                      },
                      {
                        label: 'rs.remove()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/rs.remove',
                      },
                      {
                        label: 'rs.secondaryOk()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/rs.secondaryOk',
                      },
                      {
                        label: 'rs.status()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/rs.status',
                      },
                      {
                        label: 'rs.stepDown()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/rs.stepDown',
                      },
                      {
                        label: 'rs.syncFrom()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/rs.syncFrom',
                      },
                    ],
                  },
                  {
                    label: 'Sharding Methods',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/method/js-sharding',
                    collapsible: true,
                    items: [
                      {
                        label: 'convertShardKeyToHashed',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/convertShardKeyToHashed',
                      },
                      {
                        label: 'sh.addShard()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/sh.addShard',
                      },
                      {
                        label: 'sh.addShardTag()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/sh.addShardTag',
                      },
                      {
                        label: 'sh.addShardToZone()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/sh.addShardToZone',
                      },
                      {
                        label: 'sh.addTagRange()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/sh.addTagRange',
                      },
                      {
                        label: 'sh.balancerCollectionStatus()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/sh.balancerCollectionStatus',
                      },
                      {
                        label: 'sh.disableBalancing()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/sh.disableBalancing',
                      },
                      {
                        label: 'sh.enableBalancing()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/sh.enableBalancing',
                      },
                      {
                        label: 'sh.disableAutoSplit',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/sh.disableAutoSplit',
                      },
                      {
                        label: 'sh.enableAutoSplit',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/sh.enableAutoSplit',
                      },
                      {
                        label: 'sh.enableSharding()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/sh.enableSharding',
                      },
                      {
                        label: 'sh.getBalancerState()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/sh.getBalancerState',
                      },
                      {
                        label: 'sh.help()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/sh.help',
                      },
                      {
                        label: 'sh.isBalancerRunning()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/sh.isBalancerRunning',
                      },
                      {
                        label: 'sh.moveChunk()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/sh.moveChunk',
                      },
                      {
                        label: 'sh.removeRangeFromZone()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/sh.removeRangeFromZone',
                      },
                      {
                        label: 'sh.removeShardTag()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/sh.removeShardTag',
                      },
                      {
                        label: 'sh.removeShardFromZone()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/sh.removeShardFromZone',
                      },
                      {
                        label: 'sh.removeTagRange()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/sh.removeTagRange',
                      },
                      {
                        label: 'sh.setBalancerState()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/sh.setBalancerState',
                      },
                      {
                        label: 'sh.shardCollection()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/sh.shardCollection',
                      },
                      {
                        label: 'sh.splitAt()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/sh.splitAt',
                      },
                      {
                        label: 'sh.splitFind()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/sh.splitFind',
                      },
                      {
                        label: 'sh.startBalancer()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/sh.startBalancer',
                      },
                      {
                        label: 'sh.status()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/sh.status',
                      },
                      {
                        label: 'sh.stopBalancer()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/sh.stopBalancer',
                      },
                      {
                        label: 'sh.waitForBalancer()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/sh.waitForBalancer',
                      },
                      {
                        label: 'sh.waitForBalancerOff()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/sh.waitForBalancerOff',
                      },
                      {
                        label: 'sh.waitForPingChange()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/sh.waitForPingChange',
                      },
                      {
                        label: 'sh.updateZoneKeyRange()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/sh.updateZoneKeyRange',
                      },
                    ],
                  },
                  {
                    label: 'Object Constructors and Methods',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/method/js-constructor',
                    collapsible: true,
                    items: [
                      {
                        label: 'BinData()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/BinData',
                      },
                      {
                        label: 'BulkWriteResult()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/BulkWriteResult',
                      },
                      {
                        label: 'Date()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/Date',
                      },
                      {
                        label: 'ObjectId()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/ObjectId',
                      },
                      {
                        label: 'ObjectId.getTimestamp()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/ObjectId.getTimestamp',
                      },
                      {
                        label: 'ObjectId.toString()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/ObjectId.toString',
                      },
                      {
                        label: 'ObjectId.valueOf()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/ObjectId.valueOf',
                      },
                      {
                        label: 'UUID()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/UUID',
                      },
                      {
                        label: 'WriteResult()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/WriteResult',
                      },
                      {
                        label: 'WriteResult.hasWriteError()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/WriteResult.hasWriteError',
                      },
                      {
                        label: 'WriteResult.hasWriteConcernError()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/WriteResult.hasWriteConcernError',
                      },
                    ],
                  },
                  {
                    label: 'Connection Methods',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/method/js-connection',
                    collapsible: true,
                    items: [
                      {
                        label: 'connect()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/connect',
                      },
                      {
                        label: 'Mongo()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/Mongo',
                      },
                      {
                        label: 'Mongo.getDB()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/Mongo.getDB',
                      },
                      {
                        label: 'Mongo.getReadPrefMode()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/Mongo.getReadPrefMode',
                      },
                      {
                        label: 'Mongo.getReadPrefTagSet()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/Mongo.getReadPrefTagSet',
                      },
                      {
                        label: 'Mongo.getSecondaryOk()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/Mongo.getSecondaryOk',
                      },
                      {
                        label: 'Mongo.isCausalConsistency()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/Mongo.isCausalConsistency',
                      },
                      {
                        label: 'Mongo.setCausalConsistency()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/Mongo.setCausalConsistency',
                      },
                      {
                        label: 'Mongo.setReadPref()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/Mongo.setReadPref',
                      },
                      {
                        label: 'Mongo.setSecondaryOk()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/Mongo.setSecondaryOk',
                      },
                      {
                        label: 'Mongo.startSession()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/Mongo.startSession',
                      },
                      {
                        label: 'Mongo.watch()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/Mongo.watch',
                      },
                      {
                        label: 'Session',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/Session',
                        collapsible: true,
                        items: [
                          {
                            label: 'Session.abortTransaction()',
                            contentSite: 'docs',
                            url: '/docs/v4.4/reference/method/Session.abortTransaction',
                          },
                          {
                            label: 'Session.commitTransaction()',
                            contentSite: 'docs',
                            url: '/docs/v4.4/reference/method/Session.commitTransaction',
                          },
                          {
                            label: 'Session.startTransaction()',
                            contentSite: 'docs',
                            url: '/docs/v4.4/reference/method/Session.startTransaction',
                          },
                        ],
                      },
                      {
                        label: 'SessionOptions',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/SessionOptions',
                      },
                    ],
                  },
                  {
                    label: 'Native Methods',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/method/js-native',
                    collapsible: true,
                    items: [
                      {
                        label: 'cat()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/cat',
                      },
                      {
                        label: 'cd()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/cd',
                      },
                      {
                        label: 'copyDbpath()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/copyDbpath',
                      },
                      {
                        label: 'getHostName()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/getHostName',
                      },
                      {
                        label: 'getMemInfo()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/getMemInfo',
                      },
                      {
                        label: 'hostname()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/hostname',
                      },
                      {
                        label: 'isInteractive()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/isInteractive',
                      },
                      {
                        label: 'listFiles()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/listFiles',
                      },
                      {
                        label: 'load()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/load',
                      },
                      {
                        label: 'ls()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/ls',
                      },
                      {
                        label: 'md5sumFile()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/md5sumFile',
                      },
                      {
                        label: 'mkdir()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/mkdir',
                      },
                      {
                        label: 'pwd()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/pwd',
                      },
                      {
                        label: 'quit()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/quit',
                      },
                      {
                        label: 'removeFile()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/removeFile',
                      },
                      {
                        label: 'resetDbpath()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/resetDbpath',
                      },
                      {
                        label: 'sleep()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/sleep',
                      },
                      {
                        label: 'setVerboseShell()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/setVerboseShell',
                      },
                      {
                        label: 'version()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/version',
                      },
                      {
                        label: '_isWindows()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/isWindows',
                      },
                      {
                        label: '_rand()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/rand',
                      },
                    ],
                  },
                  {
                    label: 'Client-Side Field Level Encryption Methods',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/method/js-client-side-field-level-encryption',
                    collapsible: true,
                    items: [
                      {
                        label: 'getKeyVault()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/getKeyVault',
                      },
                      {
                        label: 'KeyVault.createKey()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/KeyVault.createKey',
                      },
                      {
                        label: 'KeyVault.deleteKey()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/KeyVault.deleteKey',
                      },
                      {
                        label: 'KeyVault.getKey()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/KeyVault.getKey',
                      },
                      {
                        label: 'KeyVault.getKeys()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/KeyVault.getKeys',
                      },
                      {
                        label: 'KeyVault.addKeyAlternateName()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/KeyVault.addKeyAlternateName',
                      },
                      {
                        label: 'KeyVault.removeKeyAlternateName()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/KeyVault.removeKeyAlternateName',
                      },
                      {
                        label: 'KeyVault.getKeyByAltName()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/KeyVault.getKeyByAltName',
                      },
                      {
                        label: 'getClientEncryption()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/getClientEncryption',
                      },
                      {
                        label: 'ClientEncryption.encrypt()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/ClientEncryption.encrypt',
                      },
                      {
                        label: 'ClientEncryption.decrypt()',
                        contentSite: 'docs',
                        url: '/docs/v4.4/reference/method/ClientEncryption.decrypt',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'MongoDB Package Components',
                contentSite: 'docs',
                url: '/docs/v4.4/reference/program',
                collapsible: true,
                items: [
                  {
                    label: '',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/program/mongod',
                  },
                  {
                    label: '',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/program/mongos',
                  },
                  {
                    label: '',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/program/mongo',
                  },
                  {
                    label: '',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/program/mongod.exe',
                  },
                  {
                    label: '',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/program/mongos.exe',
                  },
                  {
                    label: '',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/program/mongodump',
                  },
                  {
                    label: '',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/program/mongorestore',
                  },
                  {
                    label: '',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/program/bsondump',
                  },
                  {
                    label: '',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/program/mongoimport',
                  },
                  {
                    label: '',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/program/mongoexport',
                  },
                  {
                    label: '',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/program/mongostat',
                  },
                  {
                    label: '',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/program/mongotop',
                  },
                  {
                    label: '',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/program/mongoldap',
                  },
                  {
                    label: '',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/program/mongokerberos',
                  },
                  {
                    label: '',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/program/mongofiles',
                  },
                  {
                    label: '',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/program/install_compass',
                  },
                ],
              },
              {
                label: 'Configuration File Options',
                contentSite: 'docs',
                url: '/docs/v4.4/reference/configuration-options',
                collapsible: true,
                items: [
                  {
                    label: 'Externally Sourced Configuration File Values',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/expansion-directives',
                  },
                  {
                    label: 'Convert Command-Line Options to YAML',
                    contentSite: 'docs',
                    url: '/docs/v4.4/tutorial/convert-command-line-options-to-yaml',
                  },
                  {
                    label: 'Configuration File Settings and Command-Line Options Mapping',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/configuration-file-settings-command-line-options-mapping',
                  },
                ],
              },
              {
                label: 'MongoDB Server Parameters',
                contentSite: 'docs',
                url: '/docs/v4.4/reference/parameters',
              },
              {
                label: 'MongoDB Limits and Thresholds',
                contentSite: 'docs',
                url: '/docs/v4.4/reference/limits',
              },
              {
                label: 'Explain Results',
                contentSite: 'docs',
                url: '/docs/v4.4/reference/explain-results',
              },
              {
                label: 'System Collections',
                contentSite: 'docs',
                url: '/docs/v4.4/reference/system-collections',
              },
              {
                label: 'Connection Strings',
                contentSite: 'docs',
                url: '/docs/v4.4/reference/connection-string',
              },
              {
                label: 'Collation',
                contentSite: 'docs',
                url: '/docs/v4.4/reference/collation',
                collapsible: true,
                items: [
                  {
                    label: 'Collation Locales and Default Parameters',
                    contentSite: 'docs',
                    url: '/docs/v4.4/reference/collation-locales-defaults',
                  },
                ],
              },
              {
                label: 'MongoDB Wire Protocol',
                contentSite: 'docs',
                url: '/docs/v4.4/reference/mongodb-wire-protocol',
              },
              {
                label: 'Log Messages',
                contentSite: 'docs',
                url: '/docs/v4.4/reference/log-messages',
              },
              {
                label: 'Error Codes',
                contentSite: 'docs',
                url: '/docs/v4.4/reference/error-codes',
              },
              {
                label: 'Exit Codes and Statuses',
                contentSite: 'docs',
                url: '/docs/v4.4/reference/exit-codes',
              },
              {
                label: 'Glossary',
                contentSite: 'docs',
                url: '/docs/v4.4/reference/glossary',
              },
              {
                label: 'Default MongoDB Port',
                contentSite: 'docs',
                url: '/docs/v4.4/reference/default-mongodb-port',
              },
              {
                label: 'Default MongoDB Read Concerns/Write Concerns',
                contentSite: 'docs',
                url: '/docs/v4.4/reference/mongodb-defaults',
              },
              {
                label: 'Server Sessions',
                contentSite: 'docs',
                url: '/docs/v4.4/reference/server-sessions',
              },
            ],
          },
          {
            label: 'Release Notes',
            contentSite: 'docs',
            url: '/docs/v4.4/release-notes',
            collapsible: true,
            items: [
              {
                label: 'Release Notes for MongoDB 4.4',
                contentSite: 'docs',
                url: '/docs/v4.4/release-notes/4.4',
                collapsible: true,
                items: [
                  {
                    label: 'Compatibility Changes in MongoDB 4.4',
                    contentSite: 'docs',
                    url: '/docs/v4.4/release-notes/4.4-compatibility',
                  },
                  {
                    label: 'Upgrade a Standalone to 4.4',
                    contentSite: 'docs',
                    url: '/docs/v4.4/release-notes/4.4-upgrade-standalone',
                  },
                  {
                    label: 'Upgrade a Replica Set to 4.4',
                    contentSite: 'docs',
                    url: '/docs/v4.4/release-notes/4.4-upgrade-replica-set',
                  },
                  {
                    label: 'Upgrade a Sharded Cluster to 4.4',
                    contentSite: 'docs',
                    url: '/docs/v4.4/release-notes/4.4-upgrade-sharded-cluster',
                  },
                  {
                    label: 'Downgrade  to ',
                    contentSite: 'docs',
                    url: '/docs/v4.4/release-notes/4.4-downgrade',
                    collapsible: true,
                    items: [
                      {
                        label: 'Downgrade  Standalone to ',
                        contentSite: 'docs',
                        url: '/docs/v4.4/release-notes/4.4-downgrade-standalone',
                      },
                      {
                        label: 'Downgrade  Replica Set to ',
                        contentSite: 'docs',
                        url: '/docs/v4.4/release-notes/4.4-downgrade-replica-set',
                      },
                      {
                        label: 'Downgrade  Sharded Cluster to ',
                        contentSite: 'docs',
                        url: '/docs/v4.4/release-notes/4.4-downgrade-sharded-cluster',
                      },
                    ],
                  },
                  {
                    label: '4.4 Changelog',
                    contentSite: 'docs',
                    url: '/docs/v4.4/release-notes/4.4-changelog',
                  },
                ],
              },
              {
                label: 'MongoDB Versioning',
                contentSite: 'docs',
                url: '/docs/v4.4/reference/versioning',
              },
            ],
          },
          {
            label: 'Technical Support',
            contentSite: 'docs',
            url: '/docs/v4.4/support',
          },
        ],
      },
    ],
  },
];
