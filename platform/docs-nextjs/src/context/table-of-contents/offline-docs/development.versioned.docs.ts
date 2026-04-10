import type { L1TocItem } from '../types';

export const toc: L1TocItem[] = [
  {
    label: 'Development',
    contentSite: 'landing',
    url: '/docs/development',
    items: [
      {
        label: 'Database Manual',
        contentSite: 'docs',
        group: true,
        versionDropdown: true,
        items: [
          {
            label: 'Overview',
            contentSite: 'docs',
            url: '/docs/:version/',
          },
          {
            label: 'Documents',
            contentSite: 'docs',
            url: '/docs/:version/core/document',
          },
          {
            label: 'Databases & Collections',
            contentSite: 'docs',
            collapsible: true,
            url: '/docs/:version/core/databases-and-collections',
            items: [
              {
                label: 'Views',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/:version/core/views',
                items: [
                  {
                    label: 'Create & Query',
                    contentSite: 'docs',
                    url: '/docs/:version/core/views/create-view',
                  },
                  {
                    label: 'Join Collections',
                    contentSite: 'docs',
                    url: '/docs/:version/core/views/join-collections-with-view',
                  },
                  {
                    label: 'Use Default Collation',
                    contentSite: 'docs',
                    url: '/docs/:version/core/views/specify-collation',
                  },
                  {
                    label: 'Modify or Remove',
                    contentSite: 'docs',
                    url: '/docs/:version/core/views/update-view',
                  },
                  {
                    label: 'Supported Operations',
                    contentSite: 'docs',
                    url: '/docs/:version/core/views/supported-operations',
                  },
                ],
              },
              {
                label: 'On-Demand Materialized Views',
                contentSite: 'docs',
                url: '/docs/:version/core/materialized-views',
              },
              {
                label: 'Capped Collections',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/:version/core/capped-collections',
                items: [
                  {
                    label: 'Create',
                    contentSite: 'docs',
                    url: '/docs/:version/core/capped-collections/create-capped-collection',
                  },
                  {
                    label: 'Query',
                    contentSite: 'docs',
                    url: '/docs/:version/core/capped-collections/query-capped-collection',
                  },
                  {
                    label: 'Verify',
                    contentSite: 'docs',
                    url: '/docs/:version/core/capped-collections/check-if-collection-is-capped',
                  },
                  {
                    label: 'Convert',
                    contentSite: 'docs',
                    url: '/docs/:version/core/capped-collections/convert-collection-to-capped',
                  },
                  {
                    label: 'Change Size',
                    contentSite: 'docs',
                    url: '/docs/:version/core/capped-collections/change-size-capped-collection',
                  },
                  {
                    label: 'Change Limits',
                    contentSite: 'docs',
                    url: '/docs/:version/core/capped-collections/change-max-docs-capped-collection',
                  },
                ],
              },
              {
                label: 'Clustered Collections',
                contentSite: 'docs',
                url: '/docs/:version/core/clustered-collections',
              },
            ],
          },
          {
            label: 'Client Libraries',
            isExternal: true,
            url: 'https://www.mongodb.com/docs/drivers/',
          },
          {
            label: 'Connect to Clusters',
            contentSite: 'cloud-docs',
            collapsible: true,
            items: [
              {
                label: 'Connection Strings',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/:version/reference/connection-string',
                items: [
                  {
                    label: 'Options',
                    contentSite: 'docs',
                    url: '/docs/:version/reference/connection-string-options',
                  },
                  {
                    label: 'Formats',
                    contentSite: 'docs',
                    url: '/docs/:version/reference/connection-string-formats',
                  },
                ],
              },
              {
                label: 'Atlas Cluster Connection',
                contentSite: 'cloud-docs',
                collapsible: true,
                url: '/docs/atlas/connect-to-database-deployment',
                items: [
                  {
                    label: 'Client Libraries',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/driver-connection',
                  },
                  {
                    label: 'Compass',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/compass-connection',
                  },
                  {
                    label: 'mongosh',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/mongo-shell-connection',
                  },
                  {
                    label: 'SQL Interface',
                    isExternal: true,
                    url: 'https://www.mongodb.com/docs/atlas/data-federation/query/connect-with-sql-overview/',
                  },
                  {
                    label: 'Command Line Tools',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/command-line-tools',
                  },
                  {
                    label: 'VS Code',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/mongodb-for-vscode',
                  },
                  {
                    label: 'Azure Service Connector',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/tutorial/azure-service-connector',
                  },
                ],
              },
              {
                label: 'Authentication',
                contentSite: 'cloud-docs',
                collapsible: true,
                url: '/docs/atlas/security/config-db-auth',
                items: [
                  {
                    label: 'AWS IAM',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/security/aws-iam-authentication',
                  },
                  {
                    label: 'LDAP',
                    contentSite: 'cloud-docs',
                    collapsible: true,
                    url: '/docs/atlas/security-ldaps',
                    items: [
                      {
                        label: 'Microsoft Entra ID DS',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/security-ldaps-azure',
                      },
                      {
                        label: 'Okta',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/security-ldaps-okta',
                      },
                      {
                        label: 'OneLogin',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/security-ldaps-onelogin',
                      },
                    ],
                  },
                  {
                    label: 'OIDC/OAuth2.0',
                    contentSite: 'cloud-docs',
                    collapsible: true,
                    url: '/docs/atlas/security-oidc',
                    items: [
                      {
                        label: 'Workforce (Humans)',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/workforce-oidc',
                      },
                      {
                        label: 'Workload (Applications)',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/workload-oidc',
                      },
                    ],
                  },
                  {
                    label: 'X.509',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/security-self-managed-x509',
                  },
                ],
              },
              {
                label: 'Atlas IP Access List',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/security/ip-access-list',
              },
              {
                label: 'Network Peering',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/security-vpc-peering',
              },
              {
                label: 'Cloud Provider Access',
                contentSite: 'cloud-docs',
                collapsible: true,
                url: '/docs/atlas/security/cloud-provider-access',
                items: [
                  {
                    label: 'Unified AWS',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/security/set-up-unified-aws-access',
                  },
                  {
                    label: 'Azure Service',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/security/set-up-azure-access',
                  },
                  {
                    label: 'GCP Service Account',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/security/set-up-gcp-access',
                  },
                ],
              },
              {
                label: 'Private Endpoints',
                contentSite: 'cloud-docs',
                collapsible: true,
                url: '/docs/atlas/security-configure-private-endpoints',
                items: [
                  {
                    label: 'Overview',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/security-private-endpoint',
                  },
                  {
                    label: 'Dedicated Clusters',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/security-cluster-private-endpoint',
                  },
                  {
                    label: 'Manage and Connect',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/security-manage-private-endpoint',
                  },
                  {
                    label: 'Troubleshoot',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/troubleshoot-private-endpoints',
                  },
                ],
              },
              {
                label: 'AWS Lambda',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/manage-connections-aws-lambda',
              },
              {
                label: 'Azure Functions',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/manage-connections-azure-functions',
              },
              {
                label: 'Google Cloud Functions',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/manage-connections-google-cloud',
              },
              {
                label: 'Troubleshoot Connection Issues',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/troubleshoot-connection',
              },
            ],
          },
          {
            label: 'Database Users',
            contentSite: 'docs',
            collapsible: true,
            url: '/docs/:version/reference/database-users',
            items: [
              {
                label: 'Configure Database Users in Atlas',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/security-add-mongodb-users',
              },
              {
                label: 'Authorization',
                contentSite: 'cloud-docs',
                collapsible: true,
                items: [
                  {
                    label: 'Built-In Roles',
                    contentSite: 'docs',
                    url: '/docs/:version/reference/built-in-roles',
                  },
                  {
                    label: 'Custom Database Roles',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/security-add-mongodb-roles',
                  },
                  {
                    label: 'Privilege Actions',
                    contentSite: 'docs',
                    url: '/docs/:version/reference/privilege-actions',
                  },
                  {
                    label: 'Non-Root User Permissions',
                    contentSite: 'docs',
                    url: '/docs/:version/reference/non-root-user-permissions',
                  },
                ],
              },
            ],
          },
          {
            label: 'CRUD Operations',
            contentSite: 'docs',
            collapsible: true,
            url: '/docs/:version/crud',
            items: [
              {
                label: 'Insert',
                contentSite: 'docs',
                url: '/docs/:version/tutorial/insert-documents',
              },
              {
                label: 'Query',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/:version/tutorial/query-documents',
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
                collapsible: true,
                url: '/docs/:version/tutorial/update-documents',
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
                collapsible: true,
                url: '/docs/:version/text-search',
                items: [
                  {
                    label: 'MongoDB Search',
                    isExternal: true,
                    url: 'https://www.mongodb.com/docs/atlas/atlas-search/',
                  },
                  {
                    label: 'MongoDB Vector Search',
                    isExternal: true,
                    url: 'https://www.mongodb.com/docs/atlas/atlas-vector-search/vector-search-overview/',
                  },
                  {
                    label: '$text Queries',
                    contentSite: 'docs',
                    collapsible: true,
                    items: [
                      {
                        label: 'Perform a $text Query',
                        contentSite: 'docs',
                        url: '/docs/:version/core/text-search/on-prem',
                      },
                      {
                        label: '$text Query Operators',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/:version/core/text-search-operators',
                        items: [
                          {
                            label: '$text',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/operator/query/text',
                          },
                        ],
                      },
                      {
                        label: '$text Queries in the Aggregation Pipeline',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/text-search-in-aggregation',
                      },
                      {
                        label: '$text Query Languages',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/text-search-languages',
                      },
                      {
                        label: 'Text Indexes',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/:version/core/indexes/index-types/index-text',
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
                            collapsible: true,
                            url: '/docs/:version/core/indexes/index-types/index-text/specify-text-index-language',
                            items: [
                              {
                                label: 'Create a Text Index for a Collection Containing Multiple Languages',
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
                            label: 'Assign Weights to $text Query Results',
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
                collapsible: true,
                url: '/docs/:version/geospatial-queries',
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
                collapsible: true,
                url: '/docs/:version/reference/read-concern',
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
                collapsible: true,
                url: '/docs/:version/reference/write-concern',
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
                collapsible: true,
                url: '/docs/:version/core/crud',
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
                    collapsible: true,
                    url: '/docs/:version/core/dot-dollar-considerations',
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
                    collapsible: true,
                    url: '/docs/:version/core/read-isolation-consistency-recency',
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
                    collapsible: true,
                    url: '/docs/:version/core/query-optimization',
                    items: [
                      {
                        label: 'Analyze Query Performance',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/:version/tutorial/evaluate-operation-performance',
                        items: [
                          {
                            label: 'Explain Results',
                            contentSite: 'docs',
                            collapsible: true,
                            url: '/docs/:version/reference/explain-results',
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
                            collapsible: true,
                            url: '/docs/:version/tutorial/manage-the-database-profiler',
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
                    collapsible: true,
                    url: '/docs/:version/core/cursors',
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
            ],
          },
          {
            label: 'Indexes',
            contentSite: 'docs',
            collapsible: true,
            url: '/docs/:version/indexes',
            items: [
              {
                label: 'Create',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/:version/core/indexes/create-index',
                items: [
                  {
                    label: 'Specify a Name',
                    contentSite: 'docs',
                    url: '/docs/:version/core/indexes/create-index/specify-index-name',
                  },
                ],
              },
              {
                label: 'Drop',
                contentSite: 'docs',
                url: '/docs/:version/core/indexes/drop-index',
              },
              {
                label: 'Types',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/:version/core/indexes/index-types',
                items: [
                  {
                    label: 'Single Field',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/core/indexes/index-types/index-single',
                    items: [
                      {
                        label: 'Create',
                        contentSite: 'docs',
                        url: '/docs/:version/core/indexes/index-types/index-single/create-single-field-index',
                      },
                      {
                        label: 'Embedded Documents',
                        contentSite: 'docs',
                        url: '/docs/:version/core/indexes/index-types/index-single/create-embedded-object-index',
                      },
                    ],
                  },
                  {
                    label: 'Compound',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/core/indexes/index-types/index-compound',
                    items: [
                      {
                        label: 'Create',
                        contentSite: 'docs',
                        url: '/docs/:version/core/indexes/index-types/index-compound/create-compound-index',
                      },
                      {
                        label: 'Sort Order',
                        contentSite: 'docs',
                        url: '/docs/:version/core/indexes/index-types/index-compound/sort-order',
                      },
                    ],
                  },
                  {
                    label: 'Multikey',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/core/indexes/index-types/index-multikey',
                    items: [
                      {
                        label: 'Create on Array Field',
                        contentSite: 'docs',
                        url: '/docs/:version/core/indexes/index-types/index-multikey/create-multikey-index-basic',
                      },
                      {
                        label: 'Embedded Array Field',
                        contentSite: 'docs',
                        url: '/docs/:version/core/indexes/index-types/index-multikey/create-multikey-index-embedded',
                      },
                      {
                        label: 'Bounds',
                        contentSite: 'docs',
                        url: '/docs/:version/core/indexes/index-types/index-multikey/multikey-index-bounds',
                      },
                    ],
                  },
                  {
                    label: 'Wildcard',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/core/indexes/index-types/index-wildcard',
                    items: [
                      {
                        label: 'Create',
                        contentSite: 'docs',
                        url: '/docs/:version/core/indexes/index-types/index-wildcard/create-wildcard-index-single-field',
                      },
                      {
                        label: 'Include or Exclude Fields',
                        contentSite: 'docs',
                        url: '/docs/:version/core/indexes/index-types/index-wildcard/create-wildcard-index-multiple-fields',
                      },
                      {
                        label: 'Use All Fields',
                        contentSite: 'docs',
                        url: '/docs/:version/core/indexes/index-types/index-wildcard/create-wildcard-index-all-fields',
                      },
                      {
                        label: 'Compound',
                        contentSite: 'docs',
                        url: '/docs/:version/core/indexes/index-types/index-wildcard/index-wildcard-compound',
                      },
                      {
                        label: 'Reference',
                        contentSite: 'docs',
                        collapsible: true,
                        items: [
                          {
                            label: 'Embedded Objects & Arrays',
                            contentSite: 'docs',
                            url: '/docs/:version/core/indexes/index-types/index-wildcard/reference/embedded-object-behavior',
                          },
                          {
                            label: 'Signature',
                            contentSite: 'docs',
                            url: '/docs/:version/core/indexes/index-types/index-wildcard/reference/wildcard-projection-signature',
                          },
                          {
                            label: 'Restrictions',
                            contentSite: 'docs',
                            url: '/docs/:version/core/indexes/index-types/index-wildcard/reference/restrictions',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    label: 'Geospatial',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/core/indexes/index-types/index-geospatial',
                    items: [
                      {
                        label: '2dsphere',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/:version/core/indexes/index-types/geospatial/2dsphere',
                        items: [
                          {
                            label: 'Create',
                            contentSite: 'docs',
                            url: '/docs/:version/core/indexes/index-types/geospatial/2dsphere/create',
                          },
                          {
                            label: 'Query',
                            contentSite: 'docs',
                            collapsible: true,
                            url: '/docs/:version/core/indexes/index-types/geospatial/2dsphere/query',
                            items: [
                              {
                                label: 'Polygons',
                                contentSite: 'docs',
                                url: '/docs/:version/core/indexes/index-types/geospatial/2dsphere/query/geojson-bound-by-polygon',
                              },
                              {
                                label: 'Spheres',
                                contentSite: 'docs',
                                url: '/docs/:version/core/indexes/index-types/geospatial/2dsphere/query/proximity-to-geojson',
                              },
                              {
                                label: 'Intersections',
                                contentSite: 'docs',
                                url: '/docs/:version/core/indexes/index-types/geospatial/2dsphere/query/intersections-of-geojson-objects',
                              },
                              {
                                label: 'Circle in a Sphere',
                                contentSite: 'docs',
                                url: '/docs/:version/core/indexes/index-types/geospatial/2dsphere/query/points-within-circle-on-sphere',
                              },
                            ],
                          },
                          {
                            label: 'Versions',
                            contentSite: 'docs',
                            url: '/docs/:version/core/indexes/index-types/geospatial/2dsphere/2dsphere-index-versions',
                          },
                        ],
                      },
                      {
                        label: '2d',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/:version/core/indexes/index-types/geospatial/2d',
                        items: [
                          {
                            label: 'Create',
                            contentSite: 'docs',
                            collapsible: true,
                            url: '/docs/:version/core/indexes/index-types/geospatial/2d/create',
                            items: [
                              {
                                label: 'Location Precision',
                                contentSite: 'docs',
                                url: '/docs/:version/core/indexes/index-types/geospatial/2d/create/define-location-precision',
                              },
                              {
                                label: 'Location Range',
                                contentSite: 'docs',
                                url: '/docs/:version/core/indexes/index-types/geospatial/2d/create/define-location-range',
                              },
                            ],
                          },
                          {
                            label: 'Query',
                            contentSite: 'docs',
                            collapsible: true,
                            url: '/docs/:version/core/indexes/index-types/geospatial/2d/query',
                            items: [
                              {
                                label: 'Point on a Surface',
                                contentSite: 'docs',
                                url: '/docs/:version/core/indexes/index-types/geospatial/2d/query/proximity-flat-surface',
                              },
                              {
                                label: 'Shape on a Surface',
                                contentSite: 'docs',
                                url: '/docs/:version/core/indexes/index-types/geospatial/2d/query/points-within-a-shape',
                              },
                            ],
                          },
                          {
                            label: 'Internals',
                            contentSite: 'docs',
                            url: '/docs/:version/core/indexes/index-types/geospatial/2d/internals',
                          },
                          {
                            label: 'Calculate to Radians',
                            contentSite: 'docs',
                            url: '/docs/:version/core/indexes/index-types/geospatial/2d/calculate-distances',
                          },
                        ],
                      },
                      {
                        label: 'Restrictions',
                        contentSite: 'docs',
                        url: '/docs/:version/core/indexes/index-types/geospatial/restrictions',
                      },
                    ],
                  },
                  {
                    label: 'Hashed',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/core/indexes/index-types/index-hashed',
                    items: [
                      {
                        label: 'Create',
                        contentSite: 'docs',
                        url: '/docs/:version/core/indexes/index-types/index-hashed/create',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Properties',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/:version/core/indexes/index-properties',
                items: [
                  {
                    label: 'Case-Insensitive',
                    contentSite: 'docs',
                    url: '/docs/:version/core/index-case-insensitive',
                  },
                  {
                    label: 'Hidden',
                    contentSite: 'docs',
                    url: '/docs/:version/core/index-hidden',
                  },
                  {
                    label: 'Partial',
                    contentSite: 'docs',
                    url: '/docs/:version/core/index-partial',
                  },
                  {
                    label: 'Sparse',
                    contentSite: 'docs',
                    url: '/docs/:version/core/index-sparse',
                  },
                  {
                    label: 'TTL',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/core/index-ttl',
                    items: [
                      {
                        label: 'Expire Data',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/expire-data',
                      },
                    ],
                  },
                  {
                    label: 'Unique',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/core/index-unique',
                    items: [
                      {
                        label: 'Single-Field Unique',
                        contentSite: 'docs',
                        url: '/docs/:version/core/index-unique/create',
                      },
                      {
                        label: 'Compound Unique',
                        contentSite: 'docs',
                        url: '/docs/:version/core/index-unique/create-compound',
                      },
                      {
                        label: 'Convert to Unique',
                        contentSite: 'docs',
                        url: '/docs/:version/core/index-unique/convert-to-unique',
                      },
                      {
                        label: 'Sharded Collections',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/shard-collection-with-unique-index',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Builds',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/:version/core/index-creation',
                items: [
                  {
                    label: 'Rolling Index Builds',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/core/rolling-index-builds',
                    items: [
                      {
                        label: 'Create on Replica Sets',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/build-indexes-on-replica-sets',
                      },
                      {
                        label: 'Create on Sharded Clusters',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/build-indexes-on-sharded-clusters',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Manage',
                contentSite: 'docs',
                url: '/docs/:version/tutorial/manage-indexes',
              },
              {
                label: 'Measure Use',
                contentSite: 'docs',
                url: '/docs/:version/tutorial/measure-index-use',
              },
              {
                label: 'Strategies',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/:version/applications/indexes',
                items: [
                  {
                    label: 'Equality, Sort, Range Guideline',
                    contentSite: 'docs',
                    url: '/docs/:version/tutorial/equality-sort-range-guideline',
                  },
                  {
                    label: 'Sort Query Results',
                    contentSite: 'docs',
                    url: '/docs/:version/tutorial/sort-results-with-indexes',
                  },
                  {
                    label: 'Ensure Query Selectivity',
                    contentSite: 'docs',
                    url: '/docs/:version/tutorial/create-queries-that-ensure-selectivity',
                  },
                  {
                    label: 'Unique Indexes and Schema Validation',
                    contentSite: 'docs',
                    url: '/docs/:version/tutorial/unique-indexes-schema-validation',
                  },
                ],
              },
              {
                label: 'Reference',
                contentSite: 'docs',
                url: '/docs/:version/reference/indexes',
              },
            ],
          },
          {
            label: 'Data Modeling',
            contentSite: 'docs',
            collapsible: true,
            url: '/docs/:version/data-modeling',
            items: [
              {
                label: 'Best Practices',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/:version/data-modeling/best-practices',
                items: [
                  {
                    label: 'Embedded Data',
                    contentSite: 'docs',
                    url: '/docs/:version/data-modeling/embedding',
                  },
                  {
                    label: 'Reference Data',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/data-modeling/referencing',
                    items: [
                      {
                        label: 'Database References',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/database-references',
                      },
                    ],
                  },
                  {
                    label: 'Duplicate Data',
                    contentSite: 'docs',
                    url: '/docs/:version/data-modeling/handle-duplicate-data',
                  },
                  {
                    label: 'Data Consistency',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/data-modeling/data-consistency',
                    items: [
                      {
                        label: 'Use Transactions',
                        contentSite: 'docs',
                        url: '/docs/:version/data-modeling/enforce-consistency/transactions',
                      },
                      {
                        label: 'Use Embedding',
                        contentSite: 'docs',
                        url: '/docs/:version/data-modeling/enforce-consistency/embed-data',
                      },
                    ],
                  },
                  {
                    label: 'Schema Validation',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/core/schema-validation',
                    items: [
                      {
                        label: 'Specify JSON Validation',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/:version/core/schema-validation/specify-json-schema',
                        items: [
                          {
                            label: 'Specify Field Values',
                            contentSite: 'docs',
                            url: '/docs/:version/core/schema-validation/specify-json-schema/specify-allowed-field-values',
                          },
                          {
                            label: 'Best Practices',
                            contentSite: 'docs',
                            url: '/docs/:version/core/schema-validation/specify-json-schema/json-schema-tips',
                          },
                        ],
                      },
                      {
                        label: 'Specify Query Operators',
                        contentSite: 'docs',
                        url: '/docs/:version/core/schema-validation/specify-query-expression-rules',
                      },
                      {
                        label: 'Specify Validation Level',
                        contentSite: 'docs',
                        url: '/docs/:version/core/schema-validation/specify-validation-level',
                      },
                      {
                        label: 'Handle Invalid Documents',
                        contentSite: 'docs',
                        url: '/docs/:version/core/schema-validation/handle-invalid-documents',
                      },
                      {
                        label: 'Bypass',
                        contentSite: 'docs',
                        url: '/docs/:version/core/schema-validation/bypass-document-validation',
                      },
                      {
                        label: 'View Existing Rules',
                        contentSite: 'docs',
                        url: '/docs/:version/core/schema-validation/view-existing-validation-rules',
                      },
                      {
                        label: 'Modify Rules',
                        contentSite: 'docs',
                        url: '/docs/:version/core/schema-validation/update-schema-validation',
                      },
                      {
                        label: 'Query and Modify',
                        contentSite: 'docs',
                        url: '/docs/:version/core/schema-validation/use-json-schema-query-conditions',
                      },
                      {
                        label: 'Specify Validation for Polymorphic Collections',
                        contentSite: 'docs',
                        url: '/docs/:version/core/schema-validation/specify-validation-polymorphic-collections',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Designing Your Schema',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/:version/data-modeling/schema-design-process',
                items: [
                  {
                    label: 'Identify Workload',
                    contentSite: 'docs',
                    url: '/docs/:version/data-modeling/schema-design-process/identify-workload',
                  },
                  {
                    label: 'Map Relationships',
                    contentSite: 'docs',
                    url: '/docs/:version/data-modeling/schema-design-process/map-relationships',
                  },
                  {
                    label: 'Apply Patterns',
                    contentSite: 'docs',
                    url: '/docs/:version/data-modeling/schema-design-process/apply-patterns',
                  },
                  {
                    label: 'Create Indexes',
                    contentSite: 'docs',
                    url: '/docs/:version/data-modeling/schema-design-process/create-indexes',
                    versions: {
                      excludes: ['v7.0'],
                    },
                  },
                  {
                    label: 'Create Indexes',
                    contentSite: 'docs',
                    url: '/docs/:version/tutorial/create-indexes-to-support-queries',
                    versions: {
                      includes: ['v7.0'],
                    },
                  },
                ],
              },
              {
                label: 'Schema Design Patterns',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/:version/data-modeling/design-patterns',
                items: [
                  {
                    label: 'Computed Values',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/data-modeling/design-patterns/handle-computed-values',
                    items: [
                      {
                        label: 'Computed Data',
                        contentSite: 'docs',
                        url: '/docs/:version/data-modeling/design-patterns/computed-values/computed-schema-pattern',
                      },
                      {
                        label: 'Approximation Pattern',
                        contentSite: 'docs',
                        url: '/docs/:version/data-modeling/design-patterns/computed-values/approximation-schema-pattern',
                      },
                    ],
                  },
                  {
                    label: 'Group Data',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/data-modeling/design-patterns/group-data',
                    items: [
                      {
                        label: 'Bucket Pattern',
                        contentSite: 'docs',
                        url: '/docs/:version/data-modeling/design-patterns/group-data/bucket-pattern',
                      },
                      {
                        label: 'Outlier Pattern',
                        contentSite: 'docs',
                        url: '/docs/:version/data-modeling/design-patterns/group-data/outlier-pattern',
                      },
                      {
                        label: 'Attribute Pattern',
                        contentSite: 'docs',
                        url: '/docs/:version/data-modeling/design-patterns/group-data/attribute-pattern',
                      },
                      {
                        label: 'Subset Pattern',
                        contentSite: 'docs',
                        url: '/docs/:version/data-modeling/design-patterns/group-data/subset-pattern',
                      },
                    ],
                  },
                  {
                    label: 'Polymorphic Data',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/data-modeling/design-patterns/polymorphic-data',
                    items: [
                      {
                        label: 'Polymorphic Pattern',
                        contentSite: 'docs',
                        url: '/docs/:version/data-modeling/design-patterns/polymorphic-data/polymorphic-schema-pattern',
                      },
                      {
                        label: 'Inheritance Pattern',
                        contentSite: 'docs',
                        url: '/docs/:version/data-modeling/design-patterns/polymorphic-data/inheritance-schema-pattern',
                      },
                    ],
                  },
                  {
                    label: 'Versioning',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/data-modeling/design-patterns/data-versioning',
                    items: [
                      {
                        label: 'Keep Document History',
                        contentSite: 'docs',
                        url: '/docs/:version/data-modeling/design-patterns/data-versioning/document-versioning',
                      },
                      {
                        label: 'Maintain Versions',
                        contentSite: 'docs',
                        url: '/docs/:version/data-modeling/design-patterns/data-versioning/schema-versioning',
                      },
                      {
                        label: 'Slowly Changing Dimensions',
                        contentSite: 'docs',
                        url: '/docs/:version/data-modeling/design-patterns/data-versioning/slowly-changing-dimensions',
                      },
                    ],
                  },
                  {
                    label: 'Archive Data',
                    contentSite: 'docs',
                    url: '/docs/:version/data-modeling/design-patterns/archive',
                  },
                  {
                    label: 'Single Collection',
                    contentSite: 'docs',
                    url: '/docs/:version/data-modeling/design-patterns/single-collection',
                  },
                ],
              },
              {
                label: 'Schema Design Anti-Patterns',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/:version/data-modeling/design-antipatterns',
                items: [
                  {
                    label: 'Avoid Unbounded Arrays',
                    contentSite: 'docs',
                    url: '/docs/:version/data-modeling/design-antipatterns/unbounded-arrays',
                  },
                  {
                    label: 'Reduce the Number of Collections',
                    contentSite: 'docs',
                    url: '/docs/:version/data-modeling/design-antipatterns/reduce-collections',
                  },
                  {
                    label: 'Remove Unnecessary Indexes',
                    contentSite: 'docs',
                    url: '/docs/:version/data-modeling/design-antipatterns/unnecessary-indexes',
                  },
                  {
                    label: 'Bloated Documents',
                    contentSite: 'docs',
                    url: '/docs/:version/data-modeling/design-antipatterns/bloated-documents',
                  },
                  {
                    label: 'Reduce $lookup Operations',
                    contentSite: 'docs',
                    url: '/docs/:version/data-modeling/design-antipatterns/reduce-lookup-operations',
                  },
                ],
              },
              {
                label: 'Model Relationships',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/:version/applications/data-models-relationships',
                items: [
                  {
                    label: 'One-to-One Embedded Documents',
                    contentSite: 'docs',
                    url: '/docs/:version/tutorial/model-embedded-one-to-one-relationships-between-documents',
                  },
                  {
                    label: 'One-to-Many Embedded Documents',
                    contentSite: 'docs',
                    url: '/docs/:version/tutorial/model-embedded-one-to-many-relationships-between-documents',
                  },
                  {
                    label: 'One-to-Many References',
                    contentSite: 'docs',
                    url: '/docs/:version/tutorial/model-referenced-one-to-many-relationships-between-documents',
                  },
                  {
                    label: 'Many-to-Many Embedded Documents',
                    contentSite: 'docs',
                    url: '/docs/:version/tutorial/model-embedded-many-to-many-relationships-between-documents',
                  },
                ],
              },
              {
                label: 'Model Tree Structures',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/:version/applications/data-models-tree-structures',
                items: [
                  {
                    label: 'Parent References',
                    contentSite: 'docs',
                    url: '/docs/:version/tutorial/model-tree-structures-with-parent-references',
                  },
                  {
                    label: 'Child References',
                    contentSite: 'docs',
                    url: '/docs/:version/tutorial/model-tree-structures-with-child-references',
                  },
                  {
                    label: 'Array of Ancestors',
                    contentSite: 'docs',
                    url: '/docs/:version/tutorial/model-tree-structures-with-ancestors-array',
                  },
                  {
                    label: 'Materialized Paths',
                    contentSite: 'docs',
                    url: '/docs/:version/tutorial/model-tree-structures-with-materialized-paths',
                  },
                  {
                    label: 'Nested Sets',
                    contentSite: 'docs',
                    url: '/docs/:version/tutorial/model-tree-structures-with-nested-sets',
                  },
                ],
              },
              {
                label: 'Example Application Models',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/:version/applications/data-models-applications',
                items: [
                  {
                    label: 'Atomic Operations',
                    contentSite: 'docs',
                    url: '/docs/:version/tutorial/model-data-for-atomic-operations',
                  },
                  {
                    label: 'IOT Data',
                    contentSite: 'docs',
                    url: '/docs/:version/tutorial/model-iot-data',
                  },
                  {
                    label: 'Keyword Search',
                    contentSite: 'docs',
                    url: '/docs/:version/tutorial/model-data-for-keyword-search',
                  },
                  {
                    label: 'Monetary Data',
                    contentSite: 'docs',
                    url: '/docs/:version/tutorial/model-monetary-data',
                  },
                ],
              },
            ],
          },
          {
            label: 'Aggregation Operations',
            contentSite: 'docs',
            collapsible: true,
            url: '/docs/:version/aggregation',
            items: [
              {
                label: 'Aggregation Pipeline',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/:version/core/aggregation-pipeline',
                items: [
                  {
                    label: 'Field Paths',
                    contentSite: 'docs',
                    url: '/docs/:version/core/field-paths',
                  },
                  {
                    label: 'Optimization',
                    contentSite: 'docs',
                    url: '/docs/:version/core/aggregation-pipeline-optimization',
                  },
                  {
                    label: 'Limits',
                    contentSite: 'docs',
                    url: '/docs/:version/core/aggregation-pipeline-limits',
                  },
                  {
                    label: 'Sharded Collections',
                    contentSite: 'docs',
                    url: '/docs/:version/core/aggregation-pipeline-sharded-collections',
                  },
                  {
                    label: 'Pipeline Tutorials',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/tutorial/aggregation-complete-examples',
                    items: [
                      {
                        label: 'Filter and Subset',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/aggregation-examples/filtered-subset',
                      },
                      {
                        label: 'Group and Total',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/aggregation-examples/group-and-total',
                      },
                      {
                        label: 'Unwind Arrays',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/aggregation-examples/unpack-arrays',
                      },
                      {
                        label: 'One-to-One Join',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/aggregation-examples/one-to-one-join',
                      },
                      {
                        label: 'Multi-Field Join',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/aggregation-examples/multi-field-join',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Reference',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/:version/reference/aggregation',
                items: [
                  {
                    label: 'Commands',
                    contentSite: 'docs',
                    url: '/docs/:version/reference/operator/aggregation/interface',
                  },
                  {
                    label: 'Commands Comparison',
                    contentSite: 'docs',
                    url: '/docs/:version/reference/aggregation-commands-comparison',
                  },
                  {
                    label: 'Variables',
                    contentSite: 'docs',
                    url: '/docs/:version/reference/aggregation-variables',
                  },
                  {
                    label: 'SQL to Aggregation',
                    contentSite: 'docs',
                    url: '/docs/:version/reference/sql-aggregation-comparison',
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
                url: '/docs/:version/core/map-reduce',
                items: [
                  {
                    label: 'Sharded Collections',
                    contentSite: 'docs',
                    url: '/docs/:version/core/map-reduce-sharded-collections',
                  },
                  {
                    label: 'Concurrency',
                    contentSite: 'docs',
                    url: '/docs/:version/core/map-reduce-concurrency',
                  },
                  {
                    label: 'Examples',
                    contentSite: 'docs',
                    url: '/docs/:version/tutorial/map-reduce-examples',
                  },
                  {
                    label: 'Perform with Increments',
                    contentSite: 'docs',
                    url: '/docs/:version/tutorial/perform-incremental-map-reduce',
                  },
                  {
                    label: 'Troubleshoot Map',
                    contentSite: 'docs',
                    url: '/docs/:version/tutorial/troubleshoot-map-function',
                  },
                  {
                    label: 'Troubleshoot Reduce',
                    contentSite: 'docs',
                    url: '/docs/:version/tutorial/troubleshoot-reduce-function',
                  },
                  {
                    label: 'Aggregation Pipeline',
                    contentSite: 'docs',
                    url: '/docs/:version/reference/map-reduce-to-aggregation-pipeline',
                  },
                ],
              },
            ],
          },
          {
            label: 'Search',
            contentSite: 'cloud-docs',
            collapsible: true,
            url: '/docs/atlas/atlas-search',
            items: [
              {
                label: 'Quick Start',
                contentSite: 'cloud-docs',
                collapsible: true,
                url: '/docs/atlas/atlas-search/tutorial',
                items: [
                  {
                    label: 'Autocomplete and Partial Matching',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-search/tutorial/partial-match',
                  },
                  {
                    label: 'Facets',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-search/tutorial/facet-tutorial',
                  },
                ],
              },
              {
                label: 'Queries & Indexes',
                contentSite: 'cloud-docs',
                collapsible: true,
                url: '/docs/atlas/atlas-search/searching',
                items: [
                  {
                    label: 'Manage Indexes',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-search/manage-indexes',
                  },
                  {
                    label: 'Index Reference',
                    contentSite: 'cloud-docs',
                    collapsible: true,
                    url: '/docs/atlas/atlas-search/index-definitions',
                    items: [
                      {
                        label: 'Analyzers',
                        contentSite: 'cloud-docs',
                        collapsible: true,
                        url: '/docs/atlas/atlas-search/analyzers',
                        items: [
                          {
                            label: 'Standard',
                            contentSite: 'cloud-docs',
                            url: '/docs/atlas/atlas-search/analyzers/standard',
                          },
                          {
                            label: 'Simple',
                            contentSite: 'cloud-docs',
                            url: '/docs/atlas/atlas-search/analyzers/simple',
                          },
                          {
                            label: 'Whitespace',
                            contentSite: 'cloud-docs',
                            url: '/docs/atlas/atlas-search/analyzers/whitespace',
                          },
                          {
                            label: 'Keyword',
                            contentSite: 'cloud-docs',
                            url: '/docs/atlas/atlas-search/analyzers/keyword',
                          },
                          {
                            label: 'Language',
                            contentSite: 'cloud-docs',
                            url: '/docs/atlas/atlas-search/analyzers/language',
                          },
                          {
                            label: 'Multi',
                            contentSite: 'cloud-docs',
                            url: '/docs/atlas/atlas-search/analyzers/multi',
                          },
                          {
                            label: 'Custom',
                            contentSite: 'cloud-docs',
                            collapsible: true,
                            url: '/docs/atlas/atlas-search/analyzers/custom',
                            items: [
                              {
                                label: 'Character Filters',
                                contentSite: 'cloud-docs',
                                url: '/docs/atlas/atlas-search/analyzers/character-filters',
                              },
                              {
                                label: 'Tokenizers',
                                contentSite: 'cloud-docs',
                                url: '/docs/atlas/atlas-search/analyzers/tokenizers',
                              },
                              {
                                label: 'Token Filters',
                                contentSite: 'cloud-docs',
                                url: '/docs/atlas/atlas-search/analyzers/token-filters',
                              },
                            ],
                          },
                        ],
                      },
                      {
                        label: 'Field Mappings',
                        contentSite: 'cloud-docs',
                        collapsible: true,
                        url: '/docs/atlas/atlas-search/define-field-mappings',
                        items: [
                          {
                            label: 'array',
                            contentSite: 'cloud-docs',
                            url: '/docs/atlas/atlas-search/field-types/array-type',
                          },
                          {
                            label: 'autocomplete',
                            contentSite: 'cloud-docs',
                            url: '/docs/atlas/atlas-search/field-types/autocomplete-type',
                          },
                          {
                            label: 'boolean',
                            contentSite: 'cloud-docs',
                            url: '/docs/atlas/atlas-search/field-types/boolean-type',
                          },
                          {
                            label: 'date',
                            contentSite: 'cloud-docs',
                            url: '/docs/atlas/atlas-search/field-types/date-type',
                          },
                          {
                            label: 'dateFacet',
                            contentSite: 'cloud-docs',
                            url: '/docs/atlas/atlas-search/field-types/date-facet-type',
                          },
                          {
                            label: 'document',
                            contentSite: 'cloud-docs',
                            url: '/docs/atlas/atlas-search/field-types/document-type',
                          },
                          {
                            label: 'embeddedDocuments',
                            contentSite: 'cloud-docs',
                            url: '/docs/atlas/atlas-search/field-types/embedded-documents-type',
                          },
                          {
                            label: 'geo',
                            contentSite: 'cloud-docs',
                            url: '/docs/atlas/atlas-search/field-types/geo-type',
                          },
                          {
                            label: 'knnVector',
                            contentSite: 'cloud-docs',
                            url: '/docs/atlas/atlas-search/field-types/knn-vector',
                          },
                          {
                            label: 'number',
                            contentSite: 'cloud-docs',
                            url: '/docs/atlas/atlas-search/field-types/number-type',
                          },
                          {
                            label: 'numberFacet',
                            contentSite: 'cloud-docs',
                            url: '/docs/atlas/atlas-search/field-types/number-facet-type',
                          },
                          {
                            label: 'objectId',
                            contentSite: 'cloud-docs',
                            url: '/docs/atlas/atlas-search/field-types/object-id-type',
                          },
                          {
                            label: 'string',
                            contentSite: 'cloud-docs',
                            url: '/docs/atlas/atlas-search/field-types/string-type',
                          },
                          {
                            label: 'stringFacet',
                            contentSite: 'cloud-docs',
                            url: '/docs/atlas/atlas-search/field-types/string-facet-type',
                          },
                          {
                            label: 'token',
                            contentSite: 'cloud-docs',
                            url: '/docs/atlas/atlas-search/field-types/token-type',
                          },
                          {
                            label: 'uuid',
                            contentSite: 'cloud-docs',
                            url: '/docs/atlas/atlas-search/field-types/uuid-type',
                          },
                          {
                            label: 'vector',
                            contentSite: 'cloud-docs',
                            url: '/docs/atlas/atlas-search/field-types/vector-type',
                          },
                        ],
                      },
                      {
                        label: 'Stored Source',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/atlas-search/stored-source-definition',
                      },
                      {
                        label: 'Synonym Mappings',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/atlas-search/synonyms',
                      },
                      {
                        label: 'Index Partitions',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/atlas-search/index-partition',
                      },
                    ],
                  },
                  {
                    label: 'Query Reference',
                    contentSite: 'cloud-docs',
                    collapsible: true,
                    url: '/docs/atlas/atlas-search/query-ref',
                    items: [
                      {
                        label: 'Pipeline Stages',
                        contentSite: 'cloud-docs',
                        collapsible: true,
                        url: '/docs/atlas/atlas-search/query-syntax',
                        items: [
                          {
                            label: 'Documents: $search',
                            contentSite: 'cloud-docs',
                            url: '/docs/atlas/atlas-search/aggregation-stages/search',
                          },
                          {
                            label: 'Metadata: $searchMeta',
                            contentSite: 'cloud-docs',
                            url: '/docs/atlas/atlas-search/aggregation-stages/searchMeta',
                          },
                        ],
                      },
                      {
                        label: 'Operators & Collectors',
                        contentSite: 'cloud-docs',
                        collapsible: true,
                        url: '/docs/atlas/atlas-search/operators-and-collectors',
                        items: [
                          {
                            label: 'autocomplete',
                            contentSite: 'cloud-docs',
                            url: '/docs/atlas/atlas-search/operators-collectors/autocomplete',
                          },
                          {
                            label: 'compound',
                            contentSite: 'cloud-docs',
                            url: '/docs/atlas/atlas-search/operators-collectors/compound',
                          },
                          {
                            label: 'embeddedDocument',
                            contentSite: 'cloud-docs',
                            url: '/docs/atlas/atlas-search/operators-collectors/embedded-document',
                          },
                          {
                            label: 'equals',
                            contentSite: 'cloud-docs',
                            url: '/docs/atlas/atlas-search/operators-collectors/equals',
                          },
                          {
                            label: 'exists',
                            contentSite: 'cloud-docs',
                            url: '/docs/atlas/atlas-search/operators-collectors/exists',
                          },
                          {
                            label: 'facet',
                            contentSite: 'cloud-docs',
                            url: '/docs/atlas/atlas-search/operators-collectors/facet',
                          },
                          {
                            label: 'geoShape',
                            contentSite: 'cloud-docs',
                            url: '/docs/atlas/atlas-search/operators-collectors/geoShape',
                          },
                          {
                            label: 'geoWithin',
                            contentSite: 'cloud-docs',
                            url: '/docs/atlas/atlas-search/operators-collectors/geoWithin',
                          },
                          {
                            label: 'hasAncestor',
                            contentSite: 'cloud-docs',
                            url: '/docs/atlas/atlas-search/operators-collectors/hasAncestor',
                          },
                          {
                            label: 'hasRoot',
                            contentSite: 'cloud-docs',
                            url: '/docs/atlas/atlas-search/operators-collectors/hasRoot',
                          },
                          {
                            label: 'in',
                            contentSite: 'cloud-docs',
                            url: '/docs/atlas/atlas-search/operators-collectors/in',
                          },
                          {
                            label: 'knnBeta (Deprecated)',
                            contentSite: 'cloud-docs',
                            url: '/docs/atlas/atlas-search/operators-collectors/knn-beta',
                          },
                          {
                            label: 'morelikethis',
                            contentSite: 'cloud-docs',
                            url: '/docs/atlas/atlas-search/operators-collectors/morelikethis',
                          },
                          {
                            label: 'near',
                            contentSite: 'cloud-docs',
                            url: '/docs/atlas/atlas-search/operators-collectors/near',
                          },
                          {
                            label: 'phrase',
                            contentSite: 'cloud-docs',
                            url: '/docs/atlas/atlas-search/operators-collectors/phrase',
                          },
                          {
                            label: 'queryString',
                            contentSite: 'cloud-docs',
                            url: '/docs/atlas/atlas-search/operators-collectors/queryString',
                          },
                          {
                            label: 'range',
                            contentSite: 'cloud-docs',
                            url: '/docs/atlas/atlas-search/operators-collectors/range',
                          },
                          {
                            label: 'regex',
                            contentSite: 'cloud-docs',
                            url: '/docs/atlas/atlas-search/operators-collectors/regex',
                          },
                          {
                            label: 'span (Deprecated)',
                            contentSite: 'cloud-docs',
                            url: '/docs/atlas/atlas-search/operators-collectors/span',
                          },
                          {
                            label: 'text',
                            contentSite: 'cloud-docs',
                            url: '/docs/atlas/atlas-search/operators-collectors/text',
                          },
                          {
                            label: 'vectorSearch',
                            contentSite: 'cloud-docs',
                            url: '/docs/atlas/atlas-search/operators-collectors/vectorSearch',
                          },
                          {
                            label: 'wildcard',
                            contentSite: 'cloud-docs',
                            url: '/docs/atlas/atlas-search/operators-collectors/wildcard',
                          },
                        ],
                      },
                      {
                        label: 'Query Path',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/atlas-search/path-construction',
                      },
                      {
                        label: 'Search Options',
                        contentSite: 'cloud-docs',
                        collapsible: true,
                        url: '/docs/atlas/atlas-search/search-options',
                        items: [
                          {
                            label: 'score',
                            contentSite: 'cloud-docs',
                            collapsible: true,
                            url: '/docs/atlas/atlas-search/scoring',
                            items: [
                              {
                                label: 'Score Options',
                                contentSite: 'cloud-docs',
                                url: '/docs/atlas/atlas-search/score/modify-score',
                              },
                              {
                                label: 'Score Details',
                                contentSite: 'cloud-docs',
                                url: '/docs/atlas/atlas-search/score/get-details',
                              },
                            ],
                          },
                          {
                            label: 'sort',
                            contentSite: 'cloud-docs',
                            url: '/docs/atlas/atlas-search/sort',
                          },
                          {
                            label: 'highlight',
                            contentSite: 'cloud-docs',
                            url: '/docs/atlas/atlas-search/highlighting',
                          },
                          {
                            label: 'count',
                            contentSite: 'cloud-docs',
                            url: '/docs/atlas/atlas-search/counting',
                          },
                          {
                            label: 'searchSequenceToken',
                            contentSite: 'cloud-docs',
                            url: '/docs/atlas/atlas-search/paginate-results',
                          },
                          {
                            label: 'returnScope',
                            contentSite: 'cloud-docs',
                            url: '/docs/atlas/atlas-search/return-scope',
                          },
                        ],
                      },
                      {
                        label: 'Performance Options',
                        contentSite: 'cloud-docs',
                        collapsible: true,
                        url: '/docs/atlas/atlas-search/performance-options',
                        items: [
                          {
                            label: 'concurrent',
                            contentSite: 'cloud-docs',
                            url: '/docs/atlas/atlas-search/concurrent-query',
                          },
                          {
                            label: 'returnStoredSource',
                            contentSite: 'cloud-docs',
                            url: '/docs/atlas/atlas-search/return-stored-source',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    label: 'Search Playground',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-search/playground',
                  },
                ],
              },
              {
                label: 'Improve Accuracy',
                contentSite: 'cloud-docs',
                collapsible: true,
                url: '/docs/atlas/atlas-search/accuracy',
                items: [
                  {
                    label: 'Customize Score',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-search/customize-score',
                  },
                  {
                    label: 'Hybrid Search',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-search/tutorial/hybrid-search',
                  },
                  {
                    label: 'Synonyms',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-search/tutorial/synonyms-tutorial',
                  },
                  {
                    label: 'Explain Plan & Statistics',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-search/explain',
                  },
                ],
              },
              {
                label: 'Improve Performance',
                contentSite: 'cloud-docs',
                collapsible: true,
                url: '/docs/atlas/atlas-search/performance',
                items: [
                  {
                    label: 'Indexes',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-search/performance/index-performance',
                  },
                  {
                    label: 'Queries',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-search/performance/query-performance',
                  },
                ],
              },
              {
                label: 'Review Deployment Options',
                contentSite: 'cloud-docs',
                collapsible: true,
                url: '/docs/atlas/atlas-search/about/deployment-options',
                items: [
                  {
                    label: 'Multi-Tenant Architecture',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-search/multi-tenant-architecture',
                  },
                ],
              },
              {
                label: 'Monitor Atlas Search',
                contentSite: 'cloud-docs',
                collapsible: true,
                url: '/docs/atlas/atlas-search/monitoring',
                items: [
                  {
                    label: 'Manage Alerts',
                    isExternal: true,
                    url: 'https://www.mongodb.com/docs/atlas/reference/alert-resolutions/atlas-search-alerts',
                  },
                  {
                    label: 'Review Metrics',
                    isExternal: true,
                    url: 'https://www.mongodb.com/docs/atlas/review-atlas-search-metrics',
                  },
                ],
              },
              {
                label: 'Design Search for Your Data Model',
                contentSite: 'cloud-docs',
                collapsible: true,
                url: '/docs/atlas/atlas-search/design-patterns',
                items: [
                  {
                    label: 'Search Non-Alphabetical Data as Strings',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-search/tutorial/string-operators-tutorial',
                  },
                  {
                    label: 'Embedded Documents',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-search/tutorial/embedded-documents-tutorial',
                  },
                  {
                    label: 'Multiple Collections',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-search/tutorial/cross-collection-tutorials',
                  },
                  {
                    label: 'Use Compatible Views',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-search/view-support',
                  },
                ],
              },
              {
                label: 'Compatibility & Limitations',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-search/about/feature-compatibility',
              },
              {
                label: 'Changelog',
                isExternal: true,
                url: 'https://www.mongodb.com/docs/atlas/atlas-search/changelog/',
              },
            ],
          },
          {
            label: 'Vector Search',
            contentSite: 'cloud-docs',
            collapsible: true,
            url: '/docs/atlas/atlas-vector-search/vector-search-overview',
            items: [
              {
                label: 'Quick Start',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-vector-search/tutorials/vector-search-quick-start',
              },
              {
                label: 'Compatibility & Limitations',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-vector-search/compatibility-limitations',
              },
              {
                label: 'Create Embeddings',
                contentSite: 'cloud-docs',
                collapsible: true,
                items: [
                  {
                    label: 'Automated',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-vector-search/crud-embeddings/create-embeddings-automatic',
                  },
                  {
                    label: 'Manual',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-vector-search/crud-embeddings/create-embeddings-manual',
                  },
                ],
              },
              {
                label: 'Queries & Indexes',
                contentSite: 'cloud-docs',
                collapsible: true,
                items: [
                  {
                    label: 'Index Reference',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-vector-search/vector-search-type',
                  },
                  {
                    label: 'Query Reference',
                    contentSite: 'cloud-docs',
                    collapsible: true,
                    url: '/docs/atlas/atlas-vector-search/vector-search-stage',
                    items: [
                      {
                        label: 'Explain Query Results',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/atlas-vector-search/explain',
                      },
                    ],
                  },
                  {
                    label: 'Use Compatible Views',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-vector-search/view-support',
                  },
                ],
              },
              {
                label: 'Use Cases & Design Patterns',
                contentSite: 'cloud-docs',
                collapsible: true,
                url: '/docs/atlas/atlas-vector-search/use-cases',
                items: [
                  {
                    label: 'Retrieval-Augmented Generation (RAG)',
                    contentSite: 'cloud-docs',
                    collapsible: true,
                    url: '/docs/atlas/atlas-vector-search/rag',
                    items: [
                      {
                        label: 'Playground Chatbot Demo Builder',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/atlas-vector-search/vector-search-playground/',
                      },
                    ],
                  },
                  {
                    label: 'AI Agents',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-vector-search/ai-agents',
                  },
                  {
                    label: 'Local RAG',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-vector-search/tutorials/local-rag',
                  },
                  {
                    label: 'Semantic Search for Text',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-vector-search/tutorials/vector-search-tutorial',
                  },
                ],
              },
              {
                label: 'Hybrid Search',
                contentSite: 'cloud-docs',
                collapsible: true,
                url: '/docs/atlas/atlas-vector-search/hybrid-search',
                items: [
                  {
                    label: 'Combined Vector Search and Full-Text Search',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-vector-search/hybrid-search/vector-search-with-full-text-search',
                  },
                  {
                    label: 'Combined Vector Search',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-vector-search/hybrid-search/vector-search-with-rankfusion',
                  },
                ],
              },
              {
                label: 'Review Deployment Options',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-vector-search/deployment-options',
              },
              {
                label: 'Vector Quantization',
                contentSite: 'cloud-docs',
                collapsible: true,
                url: '/docs/atlas/atlas-vector-search/vector-quantization',
                items: [
                  {
                    label: 'Automatic Quantization with Voyage AI',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-vector-search/tutorials/auto-quantize-with-voyage-ai',
                  },
                ],
              },
              {
                label: 'Improve Accuracy',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-vector-search/improve-accuracy',
              },
              {
                label: 'Performance Benchmark',
                contentSite: 'cloud-docs',
                collapsible: true,
                url: '/docs/atlas/atlas-vector-search/benchmark',
                items: [
                  {
                    label: 'Benchmark Overview',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-vector-search/benchmark/overview',
                  },
                  {
                    label: 'Benchmark Results',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-vector-search/benchmark/results',
                  },
                  {
                    label: 'Additional Recommendations',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-vector-search/benchmark/performance-recommendations',
                  },
                ],
              },
              {
                label: 'Multi-Tenant Architecture',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-vector-search/multi-tenant-architecture',
              },
              {
                label: 'AI Integrations',
                isExternal: true,
                url: 'https://www.mongodb.com/docs/atlas/ai-integrations/',
              },
              {
                label: 'Troubleshooting',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-vector-search/troubleshooting',
              },
              {
                label: 'Changelog',
                isExternal: true,
                url: 'https://www.mongodb.com/docs/atlas/atlas-vector-search/changelog/',
              },
            ],
          },
          {
            label: 'Time Series',
            contentSite: 'docs',
            collapsible: true,
            url: '/docs/:version/core/timeseries-collections',
            items: [
              {
                label: 'Quick Start',
                contentSite: 'docs',
                url: '/docs/:version/core/timeseries/timeseries-quick-start',
              },
              {
                label: 'Time Series Data',
                contentSite: 'docs',
                url: '/docs/:version/core/timeseries/timeseries-bucketing',
              },
              {
                label: 'Considerations',
                contentSite: 'docs',
                url: '/docs/:version/core/timeseries/timeseries-considerations',
              },
              {
                label: 'Create & Configure',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/:version/core/timeseries/timeseries-create-configure',
                items: [
                  {
                    label: 'Create & Query',
                    contentSite: 'docs',
                    url: '/docs/:version/core/timeseries/timeseries-procedures',
                  },
                  {
                    label: 'Set Granularity',
                    contentSite: 'docs',
                    url: '/docs/:version/core/timeseries/timeseries-granularity',
                  },
                  {
                    label: 'Migrate Data',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/core/timeseries/timeseries-migrate-data-into-timeseries-collection',
                    items: [
                      {
                        label: 'Use Aggregation',
                        contentSite: 'docs',
                        url: '/docs/:version/core/timeseries/timeseries-migrate-with-aggregation',
                      },
                      {
                        label: 'Use Tools',
                        contentSite: 'docs',
                        url: '/docs/:version/core/timeseries/timeseries-migrate-with-tools',
                      },
                    ],
                  },
                  {
                    label: 'Use Automatic Removal',
                    contentSite: 'docs',
                    url: '/docs/:version/core/timeseries/timeseries-automatic-removal',
                  },
                  {
                    label: 'Compression',
                    contentSite: 'docs',
                    url: '/docs/:version/core/timeseries/timeseries-compression',
                  },
                  {
                    label: 'Shard Collection',
                    contentSite: 'docs',
                    url: '/docs/:version/core/timeseries/timeseries-shard-collection',
                  },
                ],
              },
              {
                label: 'Query',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/:version/core/timeseries/timeseries-querying',
                items: [
                  {
                    label: 'Aggregations & Operators',
                    contentSite: 'docs',
                    url: '/docs/:version/core/timeseries/timeseries-aggregations-operators',
                  },
                  {
                    label: 'List Time Series Collections',
                    contentSite: 'docs',
                    url: '/docs/:version/core/timeseries/timeseries-check-type',
                  },
                  {
                    label: 'Build Materialized Views',
                    contentSite: 'docs',
                    url: '/docs/:version/core/timeseries/timeseries-build-materialized-views',
                  },
                ],
              },
              {
                label: 'Indexes',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/:version/core/timeseries/timeseries-index',
                items: [
                  {
                    label: 'Add Secondary Indexes',
                    contentSite: 'docs',
                    url: '/docs/:version/core/timeseries/timeseries-secondary-index',
                  },
                ],
              },
              {
                label: 'Best Practices',
                contentSite: 'docs',
                url: '/docs/:version/core/timeseries/timeseries-best-practices',
              },
              {
                label: 'Limitations',
                contentSite: 'docs',
                url: '/docs/:version/core/timeseries/timeseries-limitations',
              },
            ],
          },
          {
            label: 'Change Streams',
            contentSite: 'docs',
            collapsible: true,
            url: '/docs/:version/changeStreams',
            items: [
              {
                label: 'Production Recommendations',
                contentSite: 'docs',
                url: '/docs/:version/administration/change-streams-production-recommendations',
              },
              {
                label: 'Change Events',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/:version/reference/change-events',
                items: [
                  {
                    label: 'create',
                    contentSite: 'docs',
                    url: '/docs/:version/reference/change-events/create',
                  },
                  {
                    label: 'createIndexes',
                    contentSite: 'docs',
                    url: '/docs/:version/reference/change-events/createIndexes',
                  },
                  {
                    label: 'delete',
                    contentSite: 'docs',
                    url: '/docs/:version/reference/change-events/delete',
                  },
                  {
                    label: 'drop',
                    contentSite: 'docs',
                    url: '/docs/:version/reference/change-events/drop',
                  },
                  {
                    label: 'dropDatabase',
                    contentSite: 'docs',
                    url: '/docs/:version/reference/change-events/dropDatabase',
                  },
                  {
                    label: 'dropIndexes',
                    contentSite: 'docs',
                    url: '/docs/:version/reference/change-events/dropIndexes',
                  },
                  {
                    label: 'insert',
                    contentSite: 'docs',
                    url: '/docs/:version/reference/change-events/insert',
                  },
                  {
                    label: 'invalidate',
                    contentSite: 'docs',
                    url: '/docs/:version/reference/change-events/invalidate',
                  },
                  {
                    label: 'modify',
                    contentSite: 'docs',
                    url: '/docs/:version/reference/change-events/modify',
                  },
                  {
                    label: 'refineCollectionShardKey',
                    contentSite: 'docs',
                    url: '/docs/:version/reference/change-events/refineCollectionShardKey',
                  },
                  {
                    label: 'rename',
                    contentSite: 'docs',
                    url: '/docs/:version/reference/change-events/rename',
                  },
                  {
                    label: 'replace',
                    contentSite: 'docs',
                    url: '/docs/:version/reference/change-events/replace',
                  },
                  {
                    label: 'reshardCollection',
                    contentSite: 'docs',
                    url: '/docs/:version/reference/change-events/reshardCollection',
                  },
                  {
                    label: 'shardCollection',
                    contentSite: 'docs',
                    url: '/docs/:version/reference/change-events/shardCollection',
                  },
                  {
                    label: 'update',
                    contentSite: 'docs',
                    url: '/docs/:version/reference/change-events/update',
                  },
                ],
              },
            ],
          },
          {
            label: 'Transactions',
            contentSite: 'docs',
            collapsible: true,
            url: '/docs/:version/core/transactions',
            items: [
              {
                label: 'Drivers API',
                contentSite: 'docs',
                url: '/docs/:version/core/transactions-in-applications',
              },
              {
                label: 'Operations',
                contentSite: 'docs',
                url: '/docs/:version/core/transactions-operations',
              },
              {
                label: 'Production Considerations',
                contentSite: 'docs',
                url: '/docs/:version/core/transactions-production-consideration',
              },
              {
                label: 'Sharded Clusters',
                contentSite: 'docs',
                url: '/docs/:version/core/transactions-sharded-clusters',
              },
            ],
          },
          {
            label: 'Data Federation',
            contentSite: 'cloud-docs',
            collapsible: true,
            url: '/docs/atlas/data-federation',
            items: [
              {
                label: 'Overview',
                contentSite: 'cloud-docs',
                collapsible: true,
                url: '/docs/atlas/data-federation/adf-overview/overview',
                items: [
                  {
                    label: 'Key Concepts',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/data-federation/adf-overview/key-concepts',
                  },
                  {
                    label: 'Architecture',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/data-federation/adf-overview/architecture',
                  },
                  {
                    label: 'Query Performance Optimization',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/data-federation/adf-overview/query-performance-optimization',
                  },
                  {
                    label: 'Supported Sources and Providers',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/data-federation/adf-overview/supported-sources-and-providers',
                  },
                  {
                    label: 'Supported Regions',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/data-federation/adf-overview/regions',
                  },
                ],
              },
              {
                label: 'Get Started',
                contentSite: 'cloud-docs',
                collapsible: true,
                url: '/docs/atlas/data-federation/tutorial/getting-started',
                items: [
                  {
                    label: 'Deploy',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/data-federation/tutorial/deploy',
                  },
                  {
                    label: 'Configure a Connection',
                    contentSite: 'cloud-docs',
                    collapsible: true,
                    url: '/docs/atlas/data-federation/tutorial/configure-connection',
                    items: [
                      {
                        label: 'IP Access Lists',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/data-federation/tutorial/add-ip-address',
                      },
                      {
                        label: 'Database Users',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/data-federation/tutorial/create-mongodb-user',
                      },
                      {
                        label: 'X.509 Authentication',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/security-self-managed-x509',
                      },
                      {
                        label: 'AWS IAM',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/security/aws-iam-authentication',
                      },
                    ],
                  },
                  {
                    label: 'Connect',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/data-federation/tutorial/connect',
                  },
                  {
                    label: 'Run Queries',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/data-federation/tutorial/run-queries',
                  },
                ],
              },
              {
                label: 'Advanced Security Options ',
                contentSite: 'cloud-docs',
                collapsible: true,
                url: '/docs/atlas/data-federation/advanced-security-options',
                items: [
                  {
                    label: 'Private Endpoints',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/data-federation/tutorial/config-private-endpoint',
                  },
                  {
                    label: 'Authentication Methods',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/data-federation/tutorial/adf-authentication-methods',
                  },
                  {
                    label: 'Advanced User Configuration',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/data-federation/tutorial/advanced-security-options/advanced-db-user-config/',
                  },
                ],
              },
              {
                label: 'Define Data Stores',
                contentSite: 'cloud-docs',
                collapsible: true,
                url: '/docs/atlas/data-federation/config/config-data-stores',
                items: [
                  {
                    label: 'Deploy a Data Store',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/data-federation/deployment/deploy-adf',
                  },
                  {
                    label: 'Define a Configuration File',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/data-federation/config/adf-config-file-formats',
                  },
                  {
                    label: 'Use Partition Attributes',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/data-federation/supported-unsupported/supported-partition-attributes',
                  },
                  {
                    label: 'Supported Data Formats',
                    contentSite: 'cloud-docs',
                    collapsible: true,
                    url: '/docs/atlas/data-federation/supported-unsupported/supported-data-formats',
                    items: [
                      {
                        label: 'Parquet',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/data-federation/supported-unsupported/data-formats/parquet-data-files',
                      },
                      {
                        label: 'CSV and TSV',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/data-federation/supported-unsupported/data-formats/csv-tsv-data-files',
                      },
                    ],
                  },
                  {
                    label: 'Optimize Queries',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/data-federation/admin/optimize-query-performance',
                  },
                  {
                    label: 'Generate Collections',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/data-federation/config/adfa-generate-wildcard-collection',
                  },
                  {
                    label: 'File Path Synthax',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/data-federation/config/path-syntax-examples',
                  },
                  {
                    label: 'AWS S3 Encryption',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/data-federation/supported-unsupported/adf-encryption',
                  },
                  {
                    label: 'AWS S3 Limitations',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/data-federation/supported-unsupported/adf-limitations',
                  },
                ],
              },
              {
                label: 'Administration',
                contentSite: 'cloud-docs',
                collapsible: true,
                url: '/docs/atlas/data-federation/administration',
                items: [
                  {
                    label: 'Manage Configuration',
                    contentSite: 'cloud-docs',
                    collapsible: true,
                    url: '/docs/atlas/data-federation/admin/manage-federated-database',
                    items: [
                      {
                        label: 'Create Stores',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/data-federation/admin/cli/stores/create-store',
                      },
                      {
                        label: 'List Stores',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/data-federation/admin/cli/stores/list-stores',
                      },
                      {
                        label: 'Add Collections & Views',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/data-federation/admin/cli/collections/create-collections-views',
                      },
                      {
                        label: 'Rename Collections',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/data-federation/admin/cli/collections/rename-collection',
                      },
                      {
                        label: 'Drop Collections & Views',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/data-federation/admin/cli/collections/drop-collections-views',
                      },
                      {
                        label: 'Drop Databases',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/data-federation/admin/cli/database/drop-database',
                      },
                      {
                        label: 'Drop Stores',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/data-federation/admin/cli/stores/drop-store',
                      },
                    ],
                  },
                  {
                    label: 'Manage Namespaces',
                    contentSite: 'cloud-docs',
                    collapsible: true,
                    url: '/docs/atlas/data-federation/admin/manage-namespace-catalog-cli',
                    items: [
                      {
                        label: 'Update Namespaces',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/data-federation/admin/namespace/updatecatalog',
                      },
                    ],
                  },
                  {
                    label: 'Manage Private Endpoints',
                    contentSite: 'cloud-docs',
                    collapsible: true,
                    url: '/docs/atlas/data-federation/admin/manage-private-endpoint',
                    items: [
                      {
                        label: 'Set Up',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/data-federation/tutorial/config-private-endpoint',
                      },
                      {
                        label: 'View',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/data-federation/admin/view-private-endpoints',
                      },
                      {
                        label: 'Edit',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/data-federation/admin/edit-private-endpoint',
                      },
                      {
                        label: 'Delete',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/data-federation/admin/delete-private-endpoint',
                      },
                    ],
                  },
                  {
                    label: 'Update Region',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/data-federation/admin/update-region',
                  },
                  {
                    label: 'Manage Query Limits',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/data-federation/query/manage-query-limits',
                  },
                  {
                    label: 'Determine Query Status',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/data-federation/admin/determine-query-status',
                  },
                  {
                    label: 'Terminate Query',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/data-federation/admin/terminate-running-query',
                  },
                  {
                    label: 'Retrieve Query History',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/data-federation/query/view-query-history',
                  },
                  {
                    label: 'Download Query Logs',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/data-federation/query/download-query-logs',
                  },
                ],
              },
              {
                label: 'MQL',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/data-federation/query/query-federated-database',
              },
              {
                label: 'SQL',
                isExternal: true,
                url: 'https://www.mongodb.com/docs/sql-interface',
              },
              {
                label: 'Data Federation Tutorials',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/data-federation/tutorials',
              },
              {
                label: 'Features',
                contentSite: 'cloud-docs',
                collapsible: true,
                url: '/docs/atlas/data-federation/supported-unsupported',
                items: [
                  {
                    label: 'MongoDB Commands',
                    contentSite: 'cloud-docs',
                    collapsible: true,
                    url: '/docs/atlas/data-federation/supported-unsupported/mql-support',
                    items: [
                      {
                        label: 'Administration',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/data-federation/supported-unsupported/administration-commands',
                      },
                      {
                        label: 'Diagnostic',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/data-federation/supported-unsupported/diagnostic-commands',
                      },
                      {
                        label: 'Operations',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/data-federation/supported-unsupported/query-write-op-commands',
                      },
                      {
                        label: 'Role Management',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/data-federation/supported-unsupported/role-management-commands',
                      },
                      {
                        label: 'Storage Configuration',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/data-federation/supported-unsupported/storage-config-commands',
                      },
                    ],
                  },
                  {
                    label: 'Aggregation Pipelines',
                    contentSite: 'cloud-docs',
                    collapsible: true,
                    url: '/docs/atlas/data-federation/supported-unsupported/supported-aggregation',
                    items: [
                      {
                        label: '$collStats',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/data-federation/supported-unsupported/pipeline/collstats',
                      },
                      {
                        label: '$lookup',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/data-federation/supported-unsupported/pipeline/lookup-stage',
                      },
                      {
                        label: '$merge',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/data-federation/supported-unsupported/pipeline/merge',
                      },
                      {
                        label: '$out',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/data-federation/supported-unsupported/pipeline/out',
                      },
                      {
                        label: '$sql',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/data-federation/supported-unsupported/pipeline/sql',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Limitations',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/data-federation/supported-unsupported/limitations',
              },
            ],
          },
          {
            label: 'In-Use Encryption',
            contentSite: 'docs',
            collapsible: true,
            url: '/docs/:version/core/security-in-use-encryption',
            versions: {
              excludes: ['v7.0'],
            },
            items: [
              {
                label: 'Comparing Approaches',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/:version/core/queryable-encryption/about-qe-csfle',
                items: [
                  {
                    label: 'Compatibility',
                    contentSite: 'docs',
                    url: '/docs/:version/core/queryable-encryption/reference/compatibility',
                  },
                  {
                    label: 'Queryable Encryption Limitations',
                    contentSite: 'docs',
                    url: '/docs/:version/core/queryable-encryption/reference/limitations',
                  },
                  {
                    label: 'CSFLE Limitations',
                    contentSite: 'docs',
                    url: '/docs/:version/core/csfle/reference/limitations',
                  },
                ],
              },
              {
                label: 'Cryptographic Primitives',
                contentSite: 'docs',
                url: '/docs/:version/core/csfle/reference/cryptographic-primitives',
              },
              {
                label: 'Keys and Key Vaults',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/:version/core/queryable-encryption/fundamentals/keys-key-vaults',
                items: [
                  {
                    label: 'KMS Providers',
                    contentSite: 'docs',
                    url: '/docs/:version/core/queryable-encryption/fundamentals/kms-providers',
                  },
                ],
              },
              {
                label: 'Queryable Encryption',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/:version/core/queryable-encryption',
                items: [
                  {
                    label: 'Features',
                    contentSite: 'docs',
                    url: '/docs/:version/core/queryable-encryption/features',
                  },
                  {
                    label: 'Quick Start',
                    contentSite: 'docs',
                    url: '/docs/:version/core/queryable-encryption/quick-start',
                  },
                  {
                    label: 'Fundamentals',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/core/queryable-encryption/fundamentals',
                    items: [
                      {
                        label: 'Fields & Queries',
                        contentSite: 'docs',
                        url: '/docs/:version/core/queryable-encryption/fundamentals/encrypt-and-query',
                      },
                      {
                        label: 'Create a Schema',
                        contentSite: 'docs',
                        url: '/docs/:version/core/queryable-encryption/qe-create-encryption-schema',
                      },
                      {
                        label: 'Encrypt Collections at Creation',
                        contentSite: 'docs',
                        url: '/docs/:version/core/queryable-encryption/fundamentals/enable-qe',
                      },
                      {
                        label: 'Collections',
                        contentSite: 'docs',
                        url: '/docs/:version/core/queryable-encryption/fundamentals/manage-collections',
                      },
                      {
                        label: 'Explicit Encryption',
                        contentSite: 'docs',
                        url: '/docs/:version/core/queryable-encryption/fundamentals/manual-encryption',
                      },
                      {
                        label: 'Manage Keys',
                        contentSite: 'docs',
                        url: '/docs/:version/core/queryable-encryption/fundamentals/manage-keys',
                      },
                    ],
                  },
                  {
                    label: 'Tutorials',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/core/queryable-encryption/tutorials',
                    items: [
                      {
                        label: 'Enable',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/:version/core/queryable-encryption/overview-enable-qe',
                        items: [
                          {
                            label: 'Install a Driver',
                            contentSite: 'docs',
                            url: '/docs/:version/core/queryable-encryption/install',
                          },
                          {
                            label: 'Install and Configure a Query Analysis Component',
                            contentSite: 'docs',
                            url: '/docs/:version/core/queryable-encryption/install-library',
                          },
                          {
                            label: 'Create a Customer Master Key',
                            contentSite: 'docs',
                            url: '/docs/:version/core/queryable-encryption/qe-create-cmk',
                          },
                          {
                            label: 'Create an Application',
                            contentSite: 'docs',
                            url: '/docs/:version/core/queryable-encryption/qe-create-application',
                          },
                        ],
                      },
                      {
                        label: 'Create & Query',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/:version/core/queryable-encryption/overview-use-qe',
                        items: [
                          {
                            label: 'Create a Collection',
                            contentSite: 'docs',
                            url: '/docs/:version/core/queryable-encryption/qe-create-encrypted-collection',
                          },
                          {
                            label: 'Query',
                            contentSite: 'docs',
                            url: '/docs/:version/core/queryable-encryption/qe-retrieve-encrypted-document',
                          },
                        ],
                      },
                      {
                        label: 'Use Explicit Encryption',
                        contentSite: 'docs',
                        url: '/docs/:version/core/queryable-encryption/tutorials/explicit-encryption',
                      },
                    ],
                  },
                  {
                    label: 'Reference',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/core/queryable-encryption/reference',
                    items: [
                      {
                        label: 'Supported Operations',
                        contentSite: 'docs',
                        url: '/docs/:version/core/queryable-encryption/reference/supported-operations',
                      },
                      {
                        label: 'MongoClient Options',
                        contentSite: 'docs',
                        url: '/docs/:version/core/queryable-encryption/reference/qe-options-clients',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Client-Side Field Level Encryption',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/:version/core/csfle',
                items: [
                  {
                    label: 'Features',
                    contentSite: 'docs',
                    url: '/docs/:version/core/csfle/features',
                  },
                  {
                    label: 'Installation Requirements',
                    contentSite: 'docs',
                    url: '/docs/:version/core/csfle/install',
                  },
                  {
                    label: 'Quick Start',
                    contentSite: 'docs',
                    url: '/docs/:version/core/csfle/quick-start',
                  },
                  {
                    label: 'Fundamentals',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/core/csfle/fundamentals',
                    items: [
                      {
                        label: 'Automatic Encryption',
                        contentSite: 'docs',
                        url: '/docs/:version/core/csfle/fundamentals/automatic-encryption',
                      },
                      {
                        label: 'Explicit Encryption',
                        contentSite: 'docs',
                        url: '/docs/:version/core/csfle/fundamentals/manual-encryption',
                      },
                      {
                        label: 'Encryption Schemas',
                        contentSite: 'docs',
                        url: '/docs/:version/core/csfle/fundamentals/create-schema',
                      },
                      {
                        label: 'Keys and Key Vaults',
                        contentSite: 'docs',
                        url: '/docs/:version/core/queryable-encryption/fundamentals/keys-key-vaults/',
                      },
                      {
                        label: 'Encryption Key Management',
                        contentSite: 'docs',
                        url: '/docs/:version/core/csfle/fundamentals/manage-keys',
                      },
                      {
                        label: 'Fields and Encryption Types',
                        contentSite: 'docs',
                        url: '/docs/:version/core/csfle/fundamentals/encryption-algorithms',
                      },
                    ],
                  },
                  {
                    label: 'Tutorials',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/core/csfle/tutorials',
                    items: [
                      {
                        label: 'Use Automatic Client-Side Field Level Encryption with AWS',
                        contentSite: 'docs',
                        url: '/docs/:version/core/csfle/tutorials/aws/aws-automatic',
                      },
                      {
                        label: 'Use Automatic Client-Side Field Level Encryption with Azure',
                        contentSite: 'docs',
                        url: '/docs/:version/core/csfle/tutorials/azure/azure-automatic',
                      },
                      {
                        label: 'Use Automatic Client-Side Field Level Encryption with GCP',
                        contentSite: 'docs',
                        url: '/docs/:version/core/csfle/tutorials/gcp/gcp-automatic',
                      },
                      {
                        label: 'Use Automatic Client-Side Field Level Encryption with KMIP',
                        contentSite: 'docs',
                        url: '/docs/:version/core/csfle/tutorials/kmip/kmip-automatic',
                      },
                      {
                        label: 'Implement Right to Erasure',
                        contentSite: 'docs',
                        url: '/docs/:version/core/csfle/tutorials/right-to-erasure',
                        versions: {
                          excludes: ['v7.0'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'Reference',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/core/csfle/reference',
                    items: [
                      {
                        label: 'CSFLE Limitations',
                        contentSite: 'docs',
                        url: '/docs/:version/core/csfle/reference/limitations',
                      },
                      {
                        label: 'CSFLE Encryption Schemas',
                        contentSite: 'docs',
                        url: '/docs/:version/core/csfle/reference/encryption-schemas',
                      },
                      {
                        label: 'CSFLE Server-Side Schema Enforcement',
                        contentSite: 'docs',
                        url: '/docs/:version/core/csfle/reference/server-side-schema',
                      },
                      {
                        label: 'Supported Operations for Automatic Encryption',
                        contentSite: 'docs',
                        url: '/docs/:version/core/csfle/reference/supported-operations',
                      },
                      {
                        label: 'CSFLE-Specific MongoClient Options',
                        contentSite: 'docs',
                        url: '/docs/:version/core/csfle/reference/csfle-options-clients',
                      },
                      {
                        label: 'CSFLE Encryption Components',
                        contentSite: 'docs',
                        url: '/docs/:version/core/csfle/reference/encryption-components',
                      },
                      {
                        label: 'How CSFLE Decrypts Documents',
                        contentSite: 'docs',
                        url: '/docs/:version/core/csfle/reference/decryption',
                      },
                      {
                        label: 'Install and Configure a CSFLE Query Analysis Component',
                        contentSite: 'docs',
                        url: '/docs/:version/core/csfle/reference/install-library/',
                      },
                      {
                        label: 'Install libmongocrypt',
                        contentSite: 'docs',
                        url: '/docs/:version/core/csfle/reference/libmongocrypt',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            label: 'In-Use Encryption ',
            contentSite: 'docs',
            collapsible: true,
            url: '/docs/v7.0/core/security-in-use-encryption',
            versions: {
              includes: ['v7.0'],
            },
            items: [
              {
                label: 'Queryable Encryption',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/:version/core/queryable-encryption/',
                items: [
                  {
                    label: 'Features',
                    contentSite: 'docs',
                    url: '/docs/:version/core/queryable-encryption/features/',
                  },
                  {
                    label: 'Install a Driver',
                    contentSite: 'docs',
                    url: '/docs/:version/core/queryable-encryption/install/',
                  },
                  {
                    label: 'Quick Start',
                    contentSite: 'docs',
                    url: '/docs/:version/core/queryable-encryption/quick-start/',
                  },
                  {
                    label: 'Fundamentals',
                    contentSite: 'docs',
                    collapsible: true,
                    items: [
                      {
                        label: 'Fields & Queries',
                        contentSite: 'docs',
                        url: '/docs/:version/core/queryable-encryption/fundamentals/encrypt-and-query/',
                      },
                      {
                        label: 'Collections',
                        contentSite: 'docs',
                        url: '/docs/:version/core/queryable-encryption/fundamentals/manage-collections/',
                      },
                      {
                        label: 'Explicit Encryption',
                        contentSite: 'docs',
                        url: '/docs/:version/core/queryable-encryption/fundamentals/manual-encryption/',
                      },
                      {
                        label: 'Manage Keys',
                        contentSite: 'docs',
                        url: '/docs/:version/core/queryable-encryption/fundamentals/manage-keys/',
                      },
                      {
                        label: 'KMS Providers',
                        contentSite: 'docs',
                        url: '/docs/:version/core/queryable-encryption/fundamentals/kms-providers/',
                      },
                    ],
                  },
                  {
                    label: 'Tutorials',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/core/queryable-encryption/tutorials/',
                    items: [
                      {
                        label: 'Use AWS',
                        contentSite: 'docs',
                        url: '/docs/:version/core/queryable-encryption/tutorials/aws/aws-automatic/',
                      },
                      {
                        label: 'Use Azure',
                        contentSite: 'docs',
                        url: '/docs/:version/core/queryable-encryption/tutorials/azure/azure-automatic/',
                      },
                      {
                        label: 'Use GCP',
                        contentSite: 'docs',
                        url: '/docs/:version/core/queryable-encryption/tutorials/gcp/gcp-automatic/',
                      },
                      {
                        label: 'Use KMIP',
                        contentSite: 'docs',
                        url: '/docs/:version/core/queryable-encryption/tutorials/kmip/kmip-automatic/',
                      },
                      {
                        label: 'Use Explicit Encryption',
                        contentSite: 'docs',
                        url: '/docs/:version/core/queryable-encryption/tutorials/explicit-encryption/',
                      },
                    ],
                  },
                  {
                    label: 'Reference',
                    contentSite: 'docs',
                    collapsible: true,
                    items: [
                      {
                        label: 'Compatibility',
                        contentSite: 'docs',
                        url: '/docs/:version/core/queryable-encryption/reference/compatibility/',
                      },
                      {
                        label: 'Queryable Encryption Limitations',
                        contentSite: 'docs',
                        url: '/docs/:version/core/queryable-encryption/reference/limitations/',
                      },
                      {
                        label: 'Supported Operations',
                        contentSite: 'docs',
                        url: '/docs/:version/core/queryable-encryption/reference/supported-operations/',
                      },
                      {
                        label: 'MongoClient Options',
                        contentSite: 'docs',
                        url: '/docs/:version/core/queryable-encryption/reference/qe-options-clients/',
                      },
                      {
                        label: 'Shared Library',
                        contentSite: 'docs',
                        url: '/docs/:version/core/queryable-encryption/reference/shared-library/',
                      },
                      {
                        label: 'Use mongocryptd',
                        contentSite: 'docs',
                        url: '/docs/:version/core/queryable-encryption/reference/mongocryptd/',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Client-Side Field Level Encryption',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/:version/core/csfle/',
                items: [
                  {
                    label: 'Features',
                    contentSite: 'docs',
                    url: '/docs/:version/core/csfle/features/',
                  },
                  {
                    label: 'Installation',
                    contentSite: 'docs',
                    url: '/docs/:version/core/csfle/install/',
                  },
                  {
                    label: 'Quick Start',
                    contentSite: 'docs',
                    url: '/docs/:version/core/csfle/quick-start/',
                  },
                  {
                    label: 'Fundamentals',
                    contentSite: 'docs',
                    collapsible: true,
                    items: [
                      {
                        label: 'Automatic Encryption',
                        contentSite: 'docs',
                        url: '/docs/:version/core/csfle/fundamentals/automatic-encryption/',
                      },
                      {
                        label: 'Explicit Encryption',
                        contentSite: 'docs',
                        url: '/docs/:version/core/csfle/fundamentals/manual-encryption/',
                      },
                      {
                        label: 'Keys & Key Vaults',
                        contentSite: 'docs',
                        url: '/docs/:version/core/csfle/fundamentals/keys-key-vaults/',
                      },
                      {
                        label: 'Schemas',
                        contentSite: 'docs',
                        url: '/docs/:version/core/csfle/fundamentals/create-schema/',
                      },
                      {
                        label: 'Key Management',
                        contentSite: 'docs',
                        url: '/docs/:version/core/csfle/fundamentals/manage-keys/',
                      },
                      {
                        label: 'Fields & Encryption Types',
                        contentSite: 'docs',
                        url: '/docs/:version/core/csfle/fundamentals/encryption-algorithms/',
                      },
                    ],
                  },
                  {
                    label: 'Tutorials',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/core/queryable-encryption/tutorials/',
                    items: [
                      {
                        label: 'Use AWS',
                        contentSite: 'docs',
                        url: '/docs/:version/core/csfle/tutorials/aws/aws-automatic/',
                      },
                      {
                        label: 'Use Azure',
                        contentSite: 'docs',
                        url: '/docs/:version/core/csfle/tutorials/azure/azure-automatic/',
                      },
                      {
                        label: 'Use GCP',
                        contentSite: 'docs',
                        url: '/docs/:version/core/csfle/tutorials/gcp/gcp-automatic/',
                      },
                      {
                        label: 'Use KMIP',
                        contentSite: 'docs',
                        url: '/docs/:version/core/csfle/tutorials/kmip/kmip-automatic/',
                      },
                    ],
                  },
                  {
                    label: 'Reference',
                    contentSite: 'docs',
                    collapsible: true,
                    items: [
                      {
                        label: 'Compatibility',
                        contentSite: 'docs',
                        url: '/docs/:version/core/csfle/reference/compatibility/',
                      },
                      {
                        label: 'CSFLE Limitations',
                        contentSite: 'docs',
                        url: '/docs/:version/core/csfle/reference/limitations/',
                      },
                      {
                        label: 'Schemas',
                        contentSite: 'docs',
                        url: '/docs/:version/core/csfle/reference/encryption-schemas/',
                      },
                      {
                        label: 'Schema Enforcement',
                        contentSite: 'docs',
                        url: '/docs/:version/core/csfle/reference/server-side-schema/',
                      },
                      {
                        label: 'Supported Operations',
                        contentSite: 'docs',
                        url: '/docs/:version/core/csfle/reference/supported-operations/',
                      },
                      {
                        label: 'MongoClient Options',
                        contentSite: 'docs',
                        url: '/docs/:version/core/csfle/reference/csfle-options-clients/',
                      },
                      {
                        label: 'KMS Providers',
                        contentSite: 'docs',
                        url: '/docs/:version/core/csfle/reference/kms-providers/',
                      },
                      {
                        label: 'Components',
                        contentSite: 'docs',
                        url: '/docs/:version/core/csfle/reference/encryption-components/',
                      },
                      {
                        label: 'Decryption',
                        contentSite: 'docs',
                        url: '/docs/:version/core/csfle/reference/decryption/',
                      },
                      {
                        label: 'Cryptography',
                        contentSite: 'docs',
                        url: '/docs/:version/core/csfle/reference/cryptographic-primitives/',
                      },
                      {
                        label: 'Shared Library',
                        contentSite: 'docs',
                        url: '/docs/:version/core/csfle/reference/shared-library/',
                      },
                      {
                        label: 'Use mongocryptd',
                        contentSite: 'docs',
                        url: '/docs/:version/core/csfle/reference/mongocryptd/',
                      },
                      {
                        label: 'Use libmongocrypt',
                        contentSite: 'docs',
                        url: '/docs/:version/core/csfle/reference/libmongocrypt/',
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
            url: '/docs/:version/administration/production-checklist-development',
          },
          {
            label: 'Replication',
            contentSite: 'docs',
            collapsible: true,
            url: '/docs/:version/replication',
            items: [
              {
                label: 'Oplog',
                contentSite: 'docs',
                url: '/docs/:version/core/replica-set-oplog',
              },
              {
                label: 'Data Synchronization',
                contentSite: 'docs',
                url: '/docs/:version/core/replica-set-sync',
              },
              {
                label: 'Replica Set Members',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/:version/core/replica-set-members',
                items: [
                  {
                    label: 'Primary',
                    contentSite: 'docs',
                    url: '/docs/:version/core/replica-set-primary',
                  },
                  {
                    label: 'Secondary',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/core/replica-set-secondary',
                    items: [
                      {
                        label: 'Priority 0 Members',
                        contentSite: 'docs',
                        url: '/docs/:version/core/replica-set-priority-0-member',
                      },
                      {
                        label: 'Hidden Members',
                        contentSite: 'docs',
                        url: '/docs/:version/core/replica-set-hidden-member',
                      },
                      {
                        label: 'Delayed Members',
                        contentSite: 'docs',
                        url: '/docs/:version/core/replica-set-delayed-member',
                      },
                    ],
                  },
                  {
                    label: 'Arbiter',
                    contentSite: 'docs',
                    url: '/docs/:version/core/replica-set-arbiter',
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
                    url: '/docs/:version/core/replica-set-elections',
                  },
                  {
                    label: 'Failover Rollbacks',
                    contentSite: 'docs',
                    url: '/docs/:version/core/replica-set-rollbacks',
                  },
                ],
              },
              {
                label: 'Read & Write Semantics',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/:version/applications/replication',
                items: [
                  {
                    label: 'Write Concern',
                    contentSite: 'docs',
                    url: '/docs/:version/core/replica-set-write-concern',
                  },
                  {
                    label: 'Read Preference',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/core/read-preference',
                    items: [
                      {
                        label: 'Use Cases',
                        contentSite: 'docs',
                        url: '/docs/:version/core/read-preference-use-cases',
                      },
                      {
                        label: 'Tag Sets',
                        contentSite: 'docs',
                        url: '/docs/:version/core/read-preference-tags',
                      },
                      {
                        label: 'maxStalenessSeconds',
                        contentSite: 'docs',
                        url: '/docs/:version/core/read-preference-staleness',
                      },
                      {
                        label: 'Hedged Reads',
                        contentSite: 'docs',
                        url: '/docs/:version/core/read-preference-hedge-option/',
                      },
                    ],
                  },
                  {
                    label: 'Server Selection Algorithm',
                    contentSite: 'docs',
                    url: '/docs/:version/core/read-preference-mechanics',
                  },
                ],
              },
              {
                label: 'Replication Reference',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/:version/reference/replication',
                items: [
                  {
                    label: 'Member States',
                    contentSite: 'docs',
                    url: '/docs/:version/reference/replica-states',
                  },
                  {
                    label: 'local Database',
                    contentSite: 'docs',
                    url: '/docs/:version/reference/local-database',
                  },
                ],
              },
            ],
          },
          {
            label: 'Sharding',
            contentSite: 'docs',
            collapsible: true,
            url: '/docs/:version/sharding',
            items: [
              {
                label: 'Sharded Cluster Components',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/:version/core/sharded-cluster-components',
                items: [
                  {
                    label: 'Shards',
                    contentSite: 'docs',
                    url: '/docs/:version/core/sharded-cluster-shards',
                  },
                  {
                    label: 'Config Servers (metadata)',
                    contentSite: 'docs',
                    url: '/docs/:version/core/sharded-cluster-config-servers',
                  },
                  {
                    label: 'Router (mongos)',
                    contentSite: 'docs',
                    url: '/docs/:version/core/sharded-cluster-query-router',
                  },
                ],
              },
              {
                label: 'Shard Keys',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/:version/core/sharding-shard-key',
                items: [
                  {
                    label: 'Shard Key Indexes',
                    contentSite: 'docs',
                    url: '/docs/:version/core/sharding-shard-key-indexes',
                    versions: {
                      excludes: ['v7.0', 'v8.0', 'manual'],
                    },
                  },
                  {
                    label: 'Shard a Collection',
                    contentSite: 'docs',
                    url: '/docs/:version/core/sharding-shard-a-collection',
                    versions: {
                      excludes: ['upcoming'],
                    },
                  },
                  {
                    label: 'Choose Shard Key',
                    contentSite: 'docs',
                    url: '/docs/:version/core/sharding-choose-a-shard-key',
                  },
                  {
                    label: 'Change Shard Key',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/core/sharding-change-a-shard-key',
                    items: [
                      {
                        label: 'Refine a Shard Key',
                        contentSite: 'docs',
                        url: '/docs/:version/core/sharding-refine-a-shard-key',
                      },
                      {
                        label: 'Reshard a Collection',
                        contentSite: 'docs',
                        url: '/docs/:version/core/sharding-reshard-a-collection',
                      },
                    ],
                  },
                  {
                    label: 'Change Shard Key Value',
                    contentSite: 'docs',
                    url: '/docs/:version/core/sharding-change-shard-key-value',
                  },
                  {
                    label: 'Set Missing Key Fields',
                    contentSite: 'docs',
                    url: '/docs/:version/core/sharding-set-missing-shard-key-fields',
                  },
                  {
                    label: 'Display a Shard Key',
                    contentSite: 'docs',
                    url: '/docs/:version/core/sharding-find-shard-key',
                  },
                  {
                    label: 'Troubleshoot',
                    contentSite: 'docs',
                    url: '/docs/:version/core/sharding-troubleshooting-shard-keys',
                  },
                ],
              },
              {
                label: 'Hashed Sharding',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/:version/core/hashed-sharding',
                items: [
                  {
                    label: 'Drop Hashed Shard Key Index',
                    contentSite: 'docs',
                    url: '/docs/:version/tutorial/drop-a-hashed-shard-key-index',
                  },
                ],
              },
              {
                label: 'Ranged Sharding',
                contentSite: 'docs',
                url: '/docs/:version/core/ranged-sharding',
              },
              {
                label: 'Data Partitioning',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/:version/core/sharding-data-partitioning',
                items: [
                  {
                    label: 'Create Ranges',
                    contentSite: 'docs',
                    url: '/docs/:version/tutorial/create-chunks-in-sharded-cluster',
                  },
                  {
                    label: 'Split Chunks',
                    contentSite: 'docs',
                    url: '/docs/:version/tutorial/split-chunks-in-sharded-cluster',
                  },
                  {
                    label: 'Merge Chunks',
                    contentSite: 'docs',
                    url: '/docs/:version/tutorial/merge-chunks-in-sharded-cluster',
                  },
                  {
                    label: 'Modify Range Size',
                    contentSite: 'docs',
                    url: '/docs/:version/tutorial/modify-chunk-size-in-sharded-cluster',
                  },
                  {
                    label: 'Moveable Collections',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/core/moveable-collections',
                    items: [
                      {
                        label: 'Move a Collection',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/move-a-collection',
                      },
                      {
                        label: 'Multi-Tenant Architecture',
                        contentSite: 'docs',
                        url: '/docs/:version/core/moveable-collections/multi-tenant',
                      },
                      {
                        label: 'Stop Moving a Collection',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/stop-moving-a-collection',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Unsharded Collections',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/:version/core/unsharded-collections',
                items: [
                  {
                    label: 'Unshard a Collection',
                    contentSite: 'docs',
                    url: '/docs/:version/tutorial/unshard-collection',
                  },
                  {
                    label: 'Stop Unsharding a Collection',
                    contentSite: 'docs',
                    url: '/docs/:version/tutorial/stop-unsharding-collection',
                  },
                ],
              },
              {
                label: 'Balancer',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/:version/core/sharding-balancer-administration',
                items: [
                  {
                    label: 'Manage',
                    contentSite: 'docs',
                    url: '/docs/:version/tutorial/manage-sharded-cluster-balancer',
                  },
                  {
                    label: 'Migrate Ranges',
                    contentSite: 'docs',
                    url: '/docs/:version/tutorial/migrate-chunks-in-sharded-cluster',
                  },
                  {
                    label: 'The AutoMerger',
                    contentSite: 'docs',
                    url: '/docs/:version/core/automerger-concept',
                  },
                ],
              },
              {
                label: 'Long-Running Secondary Reads',
                contentSite: 'docs',
                url: '/docs/:version/core/long-running-secondary-reads/',
                versions: {
                  excludes: ['v7.0', 'v8.0', 'v8.1'],
                },
              },
            ],
          },
          {
            label: 'Performance',
            contentSite: 'docs',
            collapsible: true,
            url: '/docs/:version/administration/analyzing-mongodb-performance',
            items: [
              {
                label: 'Connection Pool',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/:version/administration/connection-pool-overview',
                items: [
                  {
                    label: 'Tuning',
                    contentSite: 'docs',
                    url: '/docs/:version/tutorial/connection-pool-performance-tuning',
                  },
                ],
              },
              {
                label: 'Performance Tuning',
                contentSite: 'docs',
                url: '/docs/:version/administration/performance-tuning',
              },
            ],
          },
          {
            label: 'Reference',
            contentSite: 'docs',
            collapsible: true,
            items: [
              {
                label: 'Collation',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/:version/reference/collation',
                items: [
                  {
                    label: 'Locales & Default Parameters',
                    contentSite: 'docs',
                    url: '/docs/:version/reference/collation-locales-defaults',
                  },
                ],
              },
              {
                label: 'Connection Strings',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/:version/reference/connection-string',
                items: [
                  {
                    label: 'Options',
                    contentSite: 'docs',
                    url: '/docs/:version/reference/connection-string-options',
                  },
                  {
                    label: 'Examples',
                    contentSite: 'docs',
                    url: '/docs/:version/reference/connection-string-examples',
                  },
                ],
              },
              {
                label: 'Database Commands',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/:version/reference/command',
                items: [
                  {
                    label: 'Query Plan Cache',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/reference/command/nav-plan-cache',
                    items: [
                      {
                        label: 'planCacheClear',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/planCacheClear',
                      },
                      {
                        label: 'planCacheClearFilters',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/planCacheClearFilters',
                      },
                      {
                        label: 'planCacheListFilters',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/planCacheListFilters',
                      },
                      {
                        label: 'planCacheSetFilter',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/planCacheSetFilter',
                      },
                    ],
                  },
                  {
                    label: 'Authentication',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/reference/command/nav-authentication',
                    items: [
                      {
                        label: 'authenticate',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/authenticate',
                      },
                      {
                        label: 'logout',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/logout',
                      },
                    ],
                  },
                  {
                    label: 'User Management',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/reference/command/nav-user-management',
                    items: [
                      {
                        label: 'createUser',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/createUser',
                      },
                      {
                        label: 'dropAllUsersFromDatabase',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/dropAllUsersFromDatabase',
                      },
                      {
                        label: 'dropUser',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/dropUser',
                      },
                      {
                        label: 'grantRolesToUser',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/grantRolesToUser',
                      },
                      {
                        label: 'revokeRolesFromUser',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/revokeRolesFromUser',
                      },
                      {
                        label: 'updateUser',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/updateUser',
                      },
                      {
                        label: 'usersInfo',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/usersInfo',
                      },
                    ],
                  },
                  {
                    label: 'Role Management',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/reference/command/nav-role-management',
                    items: [
                      {
                        label: 'createRole',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/createRole',
                      },
                      {
                        label: 'dropRole',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/dropRole',
                      },
                      {
                        label: 'dropAllRolesFromDatabase',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/dropAllRolesFromDatabase',
                      },
                      {
                        label: 'grantPrivilegesToRole',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/grantPrivilegesToRole',
                      },
                      {
                        label: 'grantRolesToRole',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/grantRolesToRole',
                      },
                      {
                        label: 'invalidateUserCache',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/invalidateUserCache',
                      },
                      {
                        label: 'revokePrivilegesFromRole',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/revokePrivilegesFromRole',
                      },
                      {
                        label: 'revokeRolesFromRole',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/revokeRolesFromRole',
                      },
                      {
                        label: 'rolesInfo',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/rolesInfo',
                      },
                      {
                        label: 'updateRole',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/updateRole',
                      },
                    ],
                  },
                  {
                    label: 'Replication',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/reference/command/nav-replication',
                    items: [
                      {
                        label: 'appendOplogNote',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/appendOplogNote',
                      },
                      {
                        label: 'applyOps',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/applyOps',
                      },
                      {
                        label: 'hello',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/hello',
                      },
                      {
                        label: 'replSetAbortPrimaryCatchUp',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/replSetAbortPrimaryCatchUp',
                      },
                      {
                        label: 'replSetFreeze',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/replSetFreeze',
                      },
                      {
                        label: 'replSetGetConfig',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/replSetGetConfig',
                      },
                      {
                        label: 'replSetGetStatus',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/replSetGetStatus',
                      },
                      {
                        label: 'replSetInitiate',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/replSetInitiate',
                      },
                      {
                        label: 'replSetMaintenance',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/replSetMaintenance',
                      },
                      {
                        label: 'replSetReconfig',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/replSetReconfig',
                      },
                      {
                        label: 'replSetResizeOplog',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/replSetResizeOplog',
                      },
                      {
                        label: 'replSetStepDown',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/replSetStepDown',
                      },
                      {
                        label: 'replSetSyncFrom',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/replSetSyncFrom',
                      },
                    ],
                  },
                  {
                    label: 'Sharding',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/reference/command/nav-sharding',
                    items: [
                      {
                        label: 'abortMoveCollection',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/abortMoveCollection',
                      },
                      {
                        label: 'abortReshardCollection',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/abortReshardCollection',
                      },
                      {
                        label: 'abortRewriteCollection',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/abortRewriteCollection',
                        versions: {
                          excludes: ['v7.0', 'v8.0', 'manual'],
                        },
                      },
                      {
                        label: 'abortUnshardCollection',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/abortUnshardCollection',
                      },
                      {
                        label: 'addShard',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/addShard',
                      },
                      {
                        label: 'addShardToZone',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/addShardToZone',
                      },
                      {
                        label: 'analyzeShardKey',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/analyzeShardKey',
                      },
                      {
                        label: 'balancerCollectionStatus',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/balancerCollectionStatus',
                      },
                      {
                        label: 'balancerStart',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/balancerStart',
                      },
                      {
                        label: 'balancerStatus',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/balancerStatus',
                      },
                      {
                        label: 'balancerStop',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/balancerStop',
                      },
                      {
                        label: 'checkMetadataConsistency',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/checkMetadataConsistency',
                      },
                      {
                        label: 'clearJumboFlag',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/clearJumboFlag',
                      },
                      {
                        label: 'cleanupOrphaned',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/cleanupOrphaned',
                      },
                      {
                        label: 'cleanupReshardCollection',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/cleanupReshardCollection',
                      },
                      {
                        label: 'commitReshardCollection',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/commitReshardCollection',
                      },
                      {
                        label: 'commitShardRemoval',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/commitShardRemoval',
                        versions: {
                          excludes: ['v7.0', 'v8.0', 'manual'],
                        },
                      },
                      {
                        label: 'commitTransitionToDedicatedConfigServer',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/commitTransitionToDedicatedConfigServer',
                        versions: {
                          excludes: ['v7.0', 'v8.0', 'manual'],
                        },
                      },
                      {
                        label: 'configureCollectionBalancing',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/configureCollectionBalancing',
                      },
                      {
                        label: 'configureQueryAnalyzer',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/configureQueryAnalyzer',
                      },
                      {
                        label: 'enableSharding',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/enableSharding',
                      },
                      {
                        label: 'flushRouterConfig',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/flushRouterConfig',
                      },
                      {
                        label: 'getShard Map',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/getShardMap',
                      },
                      {
                        label: 'getTransitionToDedicatedConfigServerStatus',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/getTransitionToDedicatedConfigServerStatus',
                        versions: {
                          excludes: ['v7.0', 'v8.0', 'manual'],
                        },
                      },
                      {
                        label: 'isdbgrid',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/isdbgrid',
                      },
                      {
                        label: 'listShards',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/listShards',
                      },
                      {
                        label: 'mergeAllChunksOnShard',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/mergeAllChunksOnShard',
                      },
                      {
                        label: 'moveChunk',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/moveChunk',
                      },
                      {
                        label: 'moveCollection',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/moveCollection',
                      },
                      {
                        label: 'movePrimary',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/movePrimary',
                      },
                      {
                        label: 'moveRange',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/moveRange',
                      },
                      {
                        label: 'mergeChunks',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/mergeChunks',
                      },
                      {
                        label: 'refineCollectionShardKey',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/refineCollectionShardKey',
                      },
                      {
                        label: 'removeShard',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/removeShard',
                      },
                      {
                        label: 'removeShardFromZone',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/removeShardFromZone',
                      },
                      {
                        label: 'reshardCollection',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/reshardCollection',
                      },
                      {
                        label: 'rewriteCollection',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/rewriteCollection',
                        versions: {
                          excludes: ['v7.0', 'v8.0', 'manual'],
                        },
                      },
                      {
                        label: 'setAllowMigrations',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/setAllowMigrations',
                      },
                      {
                        label: 'shardCollection',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/shardCollection',
                      },
                      {
                        label: 'shardDrainingStatus',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/shardDrainingStatus',
                        versions: {
                          excludes: ['v7.0', 'v8.0', 'manual'],
                        },
                      },
                      {
                        label: 'shardingState',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/shardingState',
                      },
                      {
                        label: 'split',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/split',
                      },
                      {
                        label: 'startShardDraining',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/startShardDraining',
                        versions: {
                          excludes: ['v7.0', 'v8.0', 'manual'],
                        },
                      },
                      {
                        label: 'startTransitionToDedicatedConfigServer',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/startTransitionToDedicatedConfigServer',
                        versions: {
                          excludes: ['v7.0', 'v8.0', 'manual'],
                        },
                      },
                      {
                        label: 'stopShardDraining',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/stopShardDraining',
                        versions: {
                          excludes: ['v7.0', 'v8.0', 'manual'],
                        },
                      },
                      {
                        label: 'stopTransitionToDedicatedConfigServer',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/stopTransitionToDedicatedConfigServer',
                        versions: {
                          excludes: ['v7.0', 'v8.0', 'manual'],
                        },
                      },
                      {
                        label: 'transitionFromDedicatedConfigServer',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/transitionFromDedicatedConfigServer',
                        versions: {
                          excludes: ['v7.0'],
                        },
                      },
                      {
                        label: 'transitionToDedicatedConfigServer',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/transitionToDedicatedConfigServer',
                        versions: {
                          excludes: ['v7.0'],
                        },
                      },
                      {
                        label: 'unsetSharding',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/unsetSharding',
                      },
                      {
                        label: 'unshardCollection',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/unshardCollection',
                      },
                      {
                        label: 'updateZoneKeyRange',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/updateZoneKeyRange',
                      },
                    ],
                  },
                  {
                    label: 'Sessions',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/reference/command/nav-sessions',
                    items: [
                      {
                        label: 'abortTransaction',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/abortTransaction',
                      },
                      {
                        label: 'commitTransaction',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/commitTransaction',
                      },
                      {
                        label: 'endSessions',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/endSessions',
                      },
                      {
                        label: 'killAllSessions',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/killAllSessions',
                      },
                      {
                        label: 'killAllSessionsByPattern',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/killAllSessionsByPattern',
                      },
                      {
                        label: 'killSessions',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/killSessions',
                      },
                      {
                        label: 'refreshSessions',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/refreshSessions',
                      },
                      {
                        label: 'startSession',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/startSession',
                      },
                    ],
                  },
                  {
                    label: 'Administration',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/reference/command/nav-administration',
                    items: [
                      {
                        label: 'autoCompact',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/autoCompact',
                      },
                      {
                        label: 'bulkWrite',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/bulkWrite',
                      },
                      {
                        label: 'cloneCollectionAsCapped',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/cloneCollectionAsCapped',
                      },
                      {
                        label: 'collMod',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/collMod',
                      },
                      {
                        label: 'compact',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/compact',
                      },
                      {
                        label: 'compactStructuredEncryptionData',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/compactStructuredEncryptionData',
                      },
                      {
                        label: 'convertToCapped',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/convertToCapped',
                      },
                      {
                        label: 'create',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/create',
                      },
                      {
                        label: 'createIndexes',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/createIndexes',
                      },
                      {
                        label: 'currentOp',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/currentOp',
                      },
                      {
                        label: 'drop',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/drop',
                      },
                      {
                        label: 'dropDatabase',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/dropDatabase',
                      },
                      {
                        label: 'dropConnections',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/dropConnections',
                      },
                      {
                        label: 'dropIndexes',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/dropIndexes',
                      },
                      {
                        label: 'filemd5',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/filemd5',
                      },
                      {
                        label: 'fsync',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/fsync',
                      },
                      {
                        label: 'fsyncUnlock',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/fsyncUnlock',
                      },
                      {
                        label: 'getAuditConfig',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/getAuditConfig',
                      },
                      {
                        label: 'getClusterParameter',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/getClusterParameter',
                      },
                      {
                        label: 'getDefaultRWConcern',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/getDefaultRWConcern',
                      },
                      {
                        label: 'getParameter',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/getParameter',
                      },
                      {
                        label: 'killCursors',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/killCursors',
                      },
                      {
                        label: 'killOp',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/killOp',
                      },
                      {
                        label: 'listCollections',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/listCollections',
                      },
                      {
                        label: 'listDatabases',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/listDatabases',
                      },
                      {
                        label: 'listIndexes',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/listIndexes',
                      },
                      {
                        label: 'logRotate',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/logRotate',
                      },
                      {
                        label: 'reIndex',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/reIndex',
                      },
                      {
                        label: 'removeQuerySettings',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/removeQuerySettings',
                      },
                      {
                        label: 'renameCollection',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/renameCollection',
                      },
                      {
                        label: 'rotateCertificates',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/rotateCertificates',
                      },
                      {
                        label: 'setAuditConfig',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/setAuditConfig',
                      },
                      {
                        label: 'setClusterParameter',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/setClusterParameter',
                      },
                      {
                        label: 'setFeatureCompatibilityVersion',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/setFeatureCompatibilityVersion',
                      },
                      {
                        label: 'setIndexCommitQuorum',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/setIndexCommitQuorum',
                      },
                      {
                        label: 'setParameter',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/setParameter',
                      },
                      {
                        label: 'setDefaultRWConcern',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/setDefaultRWConcern',
                      },
                      {
                        label: 'setQuerySettings',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/setQuerySettings',
                      },
                      {
                        label: 'setUserWriteBlockMode',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/setUserWriteBlockMode',
                      },
                      {
                        label: 'shutdown',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/shutdown',
                      },
                    ],
                  },
                  {
                    label: 'Diagnostics',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/reference/command/nav-diagnostic',
                    items: [
                      {
                        label: 'buildInfo',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/buildInfo',
                      },
                      {
                        label: 'collStats',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/collStats',
                      },
                      {
                        label: 'connPoolStats',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/connPoolStats',
                      },
                      {
                        label: 'connectionStatus',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/connectionStatus',
                      },
                      {
                        label: 'dataSize',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/dataSize',
                      },
                      {
                        label: 'dbHash',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/dbHash',
                      },
                      {
                        label: 'dbStats',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/dbStats',
                      },
                      {
                        label: 'explain',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/explain',
                      },
                      {
                        label: 'getCmdLineOpts',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/getCmdLineOpts',
                      },
                      {
                        label: 'getLog',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/getLog',
                      },
                      {
                        label: 'hostInfo',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/hostInfo',
                      },
                      {
                        label: 'listCommands',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/listCommands',
                      },
                      {
                        label: 'lockInfo',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/lockInfo',
                      },
                      {
                        label: 'ping',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/ping',
                      },
                      {
                        label: 'profile',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/profile',
                      },
                      {
                        label: 'serverStatus',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/serverStatus',
                      },
                      {
                        label: 'shardConnPoolStats',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/shardConnPoolStats',
                      },
                      {
                        label: 'top',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/top',
                      },
                      {
                        label: 'validate',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/validate',
                      },
                      {
                        label: 'validateDBMetadata',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/validateDBMetadata',
                      },
                      {
                        label: 'whatsmyuri',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/whatsmyuri',
                      },
                    ],
                  },
                  {
                    label: 'Auditing',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/reference/command/nav-auditing',
                    items: [
                      {
                        label: 'logApplicationMessage',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/logApplicationMessage',
                      },
                    ],
                  },
                  {
                    label: 'Atlas Search',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/reference/command/nav-atlas-search',
                    items: [
                      {
                        label: 'createSearchIndexes',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/createSearchIndexes',
                      },
                      {
                        label: 'dropSearchIndex',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/dropSearchIndex',
                      },
                      {
                        label: 'updateSearchIndex',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/updateSearchIndex',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'DDL Operations',
                contentSite: 'docs',
                url: '/docs/:version/reference/ddl-operations',
              },
              {
                label: 'Default Port',
                contentSite: 'docs',
                url: '/docs/:version/reference/default-mongodb-port',
              },
              {
                label: 'Read & Write Concerns',
                contentSite: 'docs',
                url: '/docs/:version/reference/mongodb-defaults',
              },
              {
                label: 'Error Codes',
                contentSite: 'docs',
                url: '/docs/:version/reference/error-codes',
              },
              {
                label: 'Glossary',
                contentSite: 'docs',
                url: '/docs/:version/reference/glossary',
              },
              {
                label: 'Log Messages',
                contentSite: 'docs',
                url: '/docs/:version/reference/log-messages',
              },
              {
                label: 'Limits & Thresholds',
                contentSite: 'docs',
                url: '/docs/:version/reference/limits',
              },
              {
                label: 'MongoDB Database Tools',
                isExternal: true,
                url: 'https://www.mongodb.com/docs/database-tools/',
              },
              {
                label: 'Wire Protocol',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/:version/reference/mongodb-wire-protocol',
                items: [
                  {
                    label: 'Legacy Opcodes',
                    contentSite: 'docs',
                    url: '/docs/:version/legacy-opcodes',
                  },
                ],
              },
              {
                label: 'mongosh Methods',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/:version/reference/method',
                items: [
                  {
                    label: 'Atlas Search Index',
                    contentSite: 'docs',
                    collapsible: true,
                    items: [
                      {
                        label: 'db.collection.createSearchIndex',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.collection.createSearchIndex',
                      },
                      {
                        label: 'db.collection.dropSearchIndex',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.collection.dropSearchIndex',
                      },
                      {
                        label: 'db.collection.getSearchIndexes',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.collection.getSearchIndexes',
                      },
                      {
                        label: 'db.collection.updateSearchIndex',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.collection.updateSearchIndex',
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
                        url: '/docs/:version/reference/method/sp.createStreamProcessor',
                      },
                      {
                        label: 'sp.listConnections',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/sp.listConnections',
                      },
                      {
                        label: 'sp.listStreamProcessors',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/sp.listStreamProcessors',
                      },
                      {
                        label: 'sp.listWorkspaceDefaults',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/sp.listWorkspaceDefaults',
                      },
                      {
                        label: 'sp.process',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/sp.process',
                      },
                      {
                        label: 'sp.processor.drop',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/sp.processor.drop',
                      },
                      {
                        label: 'sp.processor.sample',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/sp.processor.sample',
                      },
                      {
                        label: 'sp.processor.start',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/sp.processor.start',
                      },
                      {
                        label: 'sp.processor.stats',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/sp.processor.stats',
                      },
                      {
                        label: 'sp.processor.stop',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/sp.processor.stop',
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
                        url: '/docs/:version/reference/method/db.collection.aggregate',
                      },
                      {
                        label: 'db.collection.analyzeShardKey',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.collection.analyzeShardKey',
                      },
                      {
                        label: 'db.collection.bulkWrite',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.collection.bulkWrite',
                      },
                      {
                        label: 'db.collection.compactStructuredEncryptionData',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.collection.compactStructuredEncryptionData',
                      },
                      {
                        label: 'db.collection.configureQueryAnalyzer',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.collection.configureQueryAnalyzer',
                      },
                      {
                        label: 'db.collection.count',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.collection.count',
                      },
                      {
                        label: 'db.collection.countDocuments',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.collection.countDocuments',
                      },
                      {
                        label: 'db.collection.createIndex',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.collection.createIndex',
                      },
                      {
                        label: 'db.collection.createIndexes',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.collection.createIndexes',
                      },
                      {
                        label: 'db.collection.dataSize',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.collection.dataSize',
                      },
                      {
                        label: 'db.collection.deleteMany',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.collection.deleteMany',
                      },
                      {
                        label: 'db.collection.deleteOne',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.collection.deleteOne',
                      },
                      {
                        label: 'db.collection.distinct',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.collection.distinct',
                      },
                      {
                        label: 'db.collection.drop',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.collection.drop',
                      },
                      {
                        label: 'db.collection.dropIndex',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.collection.dropIndex',
                      },
                      {
                        label: 'db.collection.dropIndexes',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.collection.dropIndexes',
                      },
                      {
                        label: 'db.collection.estimatedDocumentCount',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.collection.estimatedDocumentCount',
                      },
                      {
                        label: 'db.collection.explain',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.collection.explain',
                      },
                      {
                        label: 'db.collection.find',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.collection.find',
                      },
                      {
                        label: 'db.collection.findAndModify',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.collection.findAndModify',
                      },
                      {
                        label: 'db.collection.findOne',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.collection.findOne',
                      },
                      {
                        label: 'db.collection.findOneAndDelete',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.collection.findOneAndDelete',
                      },
                      {
                        label: 'db.collection.findOneAndReplace',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.collection.findOneAndReplace',
                      },
                      {
                        label: 'db.collection.findOneAndUpdate',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.collection.findOneAndUpdate',
                      },
                      {
                        label: 'db.collection.getIndexes',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.collection.getIndexes',
                      },
                      {
                        label: 'db.collection.getShardDistribution',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.collection.getShardDistribution',
                      },
                      {
                        label: 'db.collection.getShardVersion',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.collection.getShardVersion',
                      },
                      {
                        label: 'db.collection.hideIndex',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.collection.hideIndex',
                      },
                      {
                        label: 'db.collection.insert',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.collection.insert',
                      },
                      {
                        label: 'db.collection.insertMany',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.collection.insertMany',
                      },
                      {
                        label: 'db.collection.insertOne',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.collection.insertOne',
                      },
                      {
                        label: 'db.collection.isCapped',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.collection.isCapped',
                      },
                      {
                        label: 'db.collection.latencyStats',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.collection.latencyStats',
                      },
                      {
                        label: 'db.collection.mapReduce',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.collection.mapReduce',
                      },
                      {
                        label: 'db.collection.reIndex',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.collection.reIndex',
                      },
                      {
                        label: 'db.collection.remove',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.collection.remove',
                      },
                      {
                        label: 'db.collection.renameCollection',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.collection.renameCollection',
                      },
                      {
                        label: 'db.collection.replaceOne',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.collection.replaceOne',
                      },
                      {
                        label: 'db.collection.stats',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.collection.stats',
                      },
                      {
                        label: 'db.collection.storageSize',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.collection.storageSize',
                      },
                      {
                        label: 'db.collection.totalIndexSize',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.collection.totalIndexSize',
                      },
                      {
                        label: 'db.collection.totalSize',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.collection.totalSize',
                      },
                      {
                        label: 'db.collection.unhideIndex',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.collection.unhideIndex',
                      },
                      {
                        label: 'db.collection.update',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.collection.update',
                      },
                      {
                        label: 'db.collection.updateMany',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.collection.updateMany',
                      },
                      {
                        label: 'db.collection.updateOne',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.collection.updateOne',
                      },
                      {
                        label: 'db.collection.validate',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.collection.validate',
                      },
                      {
                        label: 'db.collection.watch',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.collection.watch',
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
                        url: '/docs/:version/reference/method/cursor.addOption',
                      },
                      {
                        label: 'cursor.allowDiskUse',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/cursor.allowDiskUse',
                      },
                      {
                        label: 'cursor.batchSize',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/cursor.batchSize',
                      },
                      {
                        label: 'cursor.close',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/cursor.close',
                      },
                      {
                        label: 'cursor.isClosed',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/cursor.isClosed',
                      },
                      {
                        label: 'cursor.collation',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/cursor.collation',
                      },
                      {
                        label: 'cursor.comment',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/cursor.comment',
                      },
                      {
                        label: 'cursor.count',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/cursor.count',
                      },
                      {
                        label: 'cursor.disableBlockWarnings',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/cursor.disableBlockWarnings',
                      },
                      {
                        label: 'cursor.explain',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/cursor.explain',
                      },
                      {
                        label: 'cursor.forEach',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/cursor.forEach',
                      },
                      {
                        label: 'cursor.hasNext',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/cursor.hasNext',
                      },
                      {
                        label: 'cursor.hint',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/cursor.hint',
                      },
                      {
                        label: 'cursor.isExhausted',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/cursor.isExhausted',
                      },
                      {
                        label: 'cursor.itcount',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/cursor.itcount',
                      },
                      {
                        label: 'cursor.limit',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/cursor.limit',
                      },
                      {
                        label: 'cursor.map',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/cursor.map',
                      },
                      {
                        label: 'cursor.max',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/cursor.max',
                      },
                      {
                        label: 'cursor.maxAwaitTimeMS',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/cursor.maxAwaitTimeMS',
                      },
                      {
                        label: 'cursor.maxTimeMS',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/cursor.maxTimeMS',
                      },
                      {
                        label: 'cursor.min',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/cursor.min',
                      },
                      {
                        label: 'cursor.next',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/cursor.next',
                      },
                      {
                        label: 'cursor.noCursorTimeout',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/cursor.noCursorTimeout',
                      },
                      {
                        label: 'cursor.objsLeftInBatch',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/cursor.objsLeftInBatch',
                      },
                      {
                        label: 'cursor.pretty',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/cursor.pretty',
                      },
                      {
                        label: 'cursor.readConcern',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/cursor.readConcern',
                      },
                      {
                        label: 'cursor.readPref',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/cursor.readPref',
                      },
                      {
                        label: 'cursor.returnKey',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/cursor.returnKey',
                      },
                      {
                        label: 'cursor.showRecordId',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/cursor.showRecordId',
                      },
                      {
                        label: 'cursor.size',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/cursor.size',
                      },
                      {
                        label: 'cursor.skip',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/cursor.skip',
                      },
                      {
                        label: 'cursor.sort',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/cursor.sort',
                      },
                      {
                        label: 'cursor.tailable',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/cursor.tailable',
                      },
                      {
                        label: 'cursor.toArray',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/cursor.toArray',
                      },
                      {
                        label: 'cursor.tryNext',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/cursor.tryNext',
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
                        url: '/docs/:version/reference/method/db.adminCommand',
                      },
                      {
                        label: 'db.aggregate',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.aggregate',
                      },
                      {
                        label: 'db.commandHelp',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.commandHelp',
                      },
                      {
                        label: 'db.createCollection',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.createCollection',
                      },
                      {
                        label: 'db.createEncryptedCollection',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.createEncryptedCollection',
                      },
                      {
                        label: 'db.createView',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.createView',
                      },
                      {
                        label: 'db.currentOp',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.currentOp',
                      },
                      {
                        label: 'db.dropDatabase',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.dropDatabase',
                      },
                      {
                        label: 'db.fsyncLock',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.fsyncLock',
                      },
                      {
                        label: 'db.fsyncUnlock',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.fsyncUnlock',
                      },
                      {
                        label: 'db.getCollection',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.getCollection',
                      },
                      {
                        label: 'db.getCollectionInfos',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.getCollectionInfos',
                      },
                      {
                        label: 'db.getCollectionNames',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.getCollectionNames',
                      },
                      {
                        label: 'db.getLogComponents',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.getLogComponents',
                      },
                      {
                        label: 'db.getMongo',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.getMongo',
                      },
                      {
                        label: 'db.getName',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.getName',
                      },
                      {
                        label: 'db.getProfilingStatus',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.getProfilingStatus',
                      },
                      {
                        label: 'db.getReplicationInfo',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.getReplicationInfo',
                      },
                      {
                        label: 'db.getSiblingDB',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.getSiblingDB',
                      },
                      {
                        label: 'db.hello',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.hello',
                      },
                      {
                        label: 'db.help',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.help',
                      },
                      {
                        label: 'db.hostInfo',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.hostInfo',
                      },
                      {
                        label: 'db.killOp',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.killOp',
                      },
                      {
                        label: 'db.listCommands',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.listCommands',
                      },
                      {
                        label: 'db.logout',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.logout',
                      },
                      {
                        label: 'db.printCollectionStats',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.printCollectionStats',
                      },
                      {
                        label: 'db.printReplicationInfo',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.printReplicationInfo',
                      },
                      {
                        label: 'db.printSecondaryReplicationInfo',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.printSecondaryReplicationInfo',
                      },
                      {
                        label: 'db.printShardingStatus',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.printShardingStatus',
                      },
                      {
                        label: 'db.rotateCertificates',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.rotateCertificates',
                      },
                      {
                        label: 'db.runCommand',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.runCommand',
                      },
                      {
                        label: 'db.serverBuildInfo',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.serverBuildInfo',
                      },
                      {
                        label: 'db.serverCmdLineOpts',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.serverCmdLineOpts',
                      },
                      {
                        label: 'db.serverStatus',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.serverStatus',
                      },
                      {
                        label: 'db.setLogLevel',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.setLogLevel',
                      },
                      {
                        label: 'db.setProfilingLevel',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.setProfilingLevel',
                      },
                      {
                        label: 'db.shutdownServer',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.shutdownServer',
                      },
                      {
                        label: 'db.stats',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.stats',
                      },
                      {
                        label: 'db.version',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.version',
                      },
                      {
                        label: 'db.watch',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.watch',
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
                        url: '/docs/:version/reference/method/db.collection.getPlanCache',
                      },
                      {
                        label: 'PlanCache.clear',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/PlanCache.clear',
                      },
                      {
                        label: 'PlanCache.clearPlansByQuery',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/PlanCache.clearPlansByQuery',
                      },
                      {
                        label: 'PlanCache.help',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/PlanCache.help',
                      },
                      {
                        label: 'PlanCache.list',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/PlanCache.list',
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
                        url: '/docs/:version/reference/method/db.collection.initializeOrderedBulkOp',
                      },
                      {
                        label: 'db.collection.initializeUnorderedBulkOp',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.collection.initializeUnorderedBulkOp',
                      },
                      {
                        label: 'Mongo.bulkWrite',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/Mongo.bulkWrite',
                      },
                      {
                        label: 'Bulk',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/Bulk',
                      },
                      {
                        label: 'Bulk.execute',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/Bulk.execute',
                      },
                      {
                        label: 'Bulk.find',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/Bulk.find',
                      },
                      {
                        label: 'Bulk.find.arrayFilters',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/Bulk.find.arrayFilters',
                      },
                      {
                        label: 'Bulk.find.collation',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/Bulk.find.collation',
                      },
                      {
                        label: 'Bulk.find.delete',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/Bulk.find.delete',
                      },
                      {
                        label: 'Bulk.find.deleteOne',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/Bulk.find.deleteOne',
                      },
                      {
                        label: 'Bulk.find.hint',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/Bulk.find.hint',
                      },
                      {
                        label: 'Bulk.find.remove',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/Bulk.find.remove',
                      },
                      {
                        label: 'Bulk.find.removeOne',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/Bulk.find.removeOne',
                      },
                      {
                        label: 'Bulk.find.replaceOne',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/Bulk.find.replaceOne',
                      },
                      {
                        label: 'Bulk.find.updateOne',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/Bulk.find.updateOne',
                      },
                      {
                        label: 'Bulk.find.update',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/Bulk.find.update',
                      },
                      {
                        label: 'Bulk.find.upsert',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/Bulk.find.upsert',
                      },
                      {
                        label: 'Bulk.getOperations',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/Bulk.getOperations',
                      },
                      {
                        label: 'Bulk.insert',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/Bulk.insert',
                      },
                      {
                        label: 'Bulk.tojson',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/Bulk.tojson',
                      },
                      {
                        label: 'Bulk.toString',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/Bulk.toString',
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
                        url: '/docs/:version/reference/method/db.auth',
                      },
                      {
                        label: 'db.changeUserPassword',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.changeUserPassword',
                      },
                      {
                        label: 'db.createUser',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.createUser',
                      },
                      {
                        label: 'db.dropUser',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.dropUser',
                      },
                      {
                        label: 'db.dropAllUsers',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.dropAllUsers',
                      },
                      {
                        label: 'db.getUser',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.getUser',
                      },
                      {
                        label: 'db.getUsers',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.getUsers',
                      },
                      {
                        label: 'db.grantRolesToUser',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.grantRolesToUser',
                      },
                      {
                        label: 'db.removeUser',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.removeUser',
                      },
                      {
                        label: 'db.revokeRolesFromUser',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.revokeRolesFromUser',
                      },
                      {
                        label: 'db.updateUser',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.updateUser',
                      },
                      {
                        label: 'passwordPrompt',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/passwordPrompt',
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
                        url: '/docs/:version/reference/method/db.createRole',
                      },
                      {
                        label: 'db.dropRole',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.dropRole',
                      },
                      {
                        label: 'db.dropAllRoles',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.dropAllRoles',
                      },
                      {
                        label: 'db.getRole',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.getRole',
                      },
                      {
                        label: 'db.getRoles',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.getRoles',
                      },
                      {
                        label: 'db.grantPrivilegesToRole',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.grantPrivilegesToRole',
                      },
                      {
                        label: 'db.revokePrivilegesFromRole',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.revokePrivilegesFromRole',
                      },
                      {
                        label: 'db.grantRolesToRole',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.grantRolesToRole',
                      },
                      {
                        label: 'db.revokeRolesFromRole',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.revokeRolesFromRole',
                      },
                      {
                        label: 'db.updateRole',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.updateRole',
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
                        url: '/docs/:version/reference/method/rs.add',
                      },
                      {
                        label: 'rs.addArb',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/rs.addArb',
                      },
                      {
                        label: 'rs.conf',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/rs.conf',
                      },
                      {
                        label: 'rs.freeze',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/rs.freeze',
                      },
                      {
                        label: 'rs.help',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/rs.help',
                      },
                      {
                        label: 'rs.initiate',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/rs.initiate',
                      },
                      {
                        label: 'rs.printReplicationInfo',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/rs.printReplicationInfo',
                      },
                      {
                        label: 'rs.printSecondaryReplicationInfo',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/rs.printSecondaryReplicationInfo',
                      },
                      {
                        label: 'rs.reconfig',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/rs.reconfig',
                      },
                      {
                        label: 'rs.reconfigForPSASet',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/rs.reconfigForPSASet',
                      },
                      {
                        label: 'rs.remove',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/rs.remove',
                      },
                      {
                        label: 'rs.status',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/rs.status',
                      },
                      {
                        label: 'rs.stepDown',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/rs.stepDown',
                      },
                      {
                        label: 'rs.syncFrom',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/rs.syncFrom',
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
                        url: '/docs/:version/reference/method/convertShardKeyToHashed',
                      },
                      {
                        label: 'db.checkMetadataConsistency',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.checkMetadataConsistency',
                      },
                      {
                        label: 'db.collection.checkMetadataConsistency',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.collection.checkMetadataConsistency',
                      },
                      {
                        label: 'db.collection.getShardLocation',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/db.collection.getShardLocation',
                        versions: {
                          excludes: ['7.0', '8.0'],
                        },
                      },
                      {
                        label: 'sh.abortMoveCollection',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/sh.abortMoveCollection',
                      },
                      {
                        label: 'sh.abortReshardCollection',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/sh.abortReshardCollection',
                      },
                      {
                        label: 'sh.abortUnshardCollection',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/sh.abortUnshardCollection',
                      },
                      {
                        label: 'sh.addShard',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/sh.addShard',
                      },
                      {
                        label: 'sh.addShardTag',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/sh.addShardTag',
                      },
                      {
                        label: 'sh.addShardToZone',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/sh.addShardToZone',
                      },
                      {
                        label: 'sh.addTagRange',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/sh.addTagRange',
                      },
                      {
                        label: 'sh.balancerCollectionStatus',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/sh.balancerCollectionStatus',
                      },
                      {
                        label: 'sh.checkMetadataConsistency',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/sh.checkMetadataConsistency',
                      },
                      {
                        label: 'sh.commitReshardCollection',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/sh.commitReshardCollection',
                      },
                      {
                        label: 'sh.disableAutoMerger',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/sh.disableAutoMerger',
                      },
                      {
                        label: 'sh.disableAutoSplit',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/sh.disableAutoSplit',
                      },
                      {
                        label: 'sh.disableBalancing',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/sh.disableBalancing',
                      },
                      {
                        label: 'sh.disableMigrations',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/sh.disableMigrations',
                      },
                      {
                        label: 'sh.enableAutoMerger',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/sh.enableAutoMerger',
                      },
                      {
                        label: 'sh.enableBalancing',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/sh.enableBalancing',
                      },
                      {
                        label: 'sh.enableAutoSplit',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/sh.enableAutoSplit',
                      },
                      {
                        label: 'sh.enableMigrations',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/sh.enableMigrations',
                      },
                      {
                        label: 'sh.enableSharding',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/sh.enableSharding',
                      },
                      {
                        label: 'sh.getBalancerState',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/sh.getBalancerState',
                      },
                      {
                        label: 'sh.getShardedDataDistribution',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/sh.getShardedDataDistribution',
                      },
                      {
                        label: 'sh.help',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/sh.help',
                      },
                      {
                        label: 'sh.isBalancerRunning',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/sh.isBalancerRunning',
                      },
                      {
                        label: 'sh.isConfigShardEnabled',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/sh.isConfigShardEnabled',
                      },
                      {
                        label: 'sh.listShards',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/sh.listShards',
                      },
                      {
                        label: 'sh.moveChunk',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/sh.moveChunk',
                      },
                      {
                        label: 'sh.moveCollection',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/sh.moveCollection',
                      },
                      {
                        label: 'sh.moveRange',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/sh.moveRange',
                      },
                      {
                        label: 'sh.removeRangeFromZone',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/sh.removeRangeFromZone',
                      },
                      {
                        label: 'sh.removeShardTag',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/sh.removeShardTag',
                      },
                      {
                        label: 'sh.removeShardFromZone',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/sh.removeShardFromZone',
                      },
                      {
                        label: 'sh.removeTagRange',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/sh.removeTagRange',
                      },
                      {
                        label: 'sh.reshardCollection',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/sh.reshardCollection',
                      },
                      {
                        label: 'sh.setBalancerState',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/sh.setBalancerState',
                      },
                      {
                        label: 'sh.shardAndDistributeCollection',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/sh.shardAndDistributeCollection',
                      },
                      {
                        label: 'sh.shardCollection',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/sh.shardCollection',
                      },
                      {
                        label: 'sh.splitAt',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/sh.splitAt',
                      },
                      {
                        label: 'sh.splitFind',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/sh.splitFind',
                      },
                      {
                        label: 'sh.startAutoMerger',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/sh.startAutoMerger',
                      },
                      {
                        label: 'sh.startBalancer',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/sh.startBalancer',
                      },
                      {
                        label: 'sh.status',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/sh.status',
                      },
                      {
                        label: 'sh.stopAutoMerger',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/sh.stopAutoMerger',
                      },
                      {
                        label: 'sh.stopBalancer',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/sh.stopBalancer',
                      },
                      {
                        label: 'sh.unshardCollection',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/sh.unshardCollection',
                      },
                      {
                        label: 'sh.updateZoneKeyRange',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/sh.updateZoneKeyRange',
                      },
                      {
                        label: 'sh.waitForBalancer',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/sh.waitForBalancer',
                      },
                      {
                        label: 'sh.waitForBalancerOff',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/sh.waitForBalancerOff',
                      },
                      {
                        label: 'sh.waitForPingChange',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/sh.waitForPingChange',
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
                        url: '/docs/:version/reference/method/Binary.createFromBase64',
                      },
                      {
                        label: 'Binary.createFromHexString',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/Binary.createFromHexString',
                      },
                      {
                        label: 'BinData',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/BinData',
                      },
                      {
                        label: 'BSONRegExp',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/BSONRegExp',
                      },
                      {
                        label: 'BulkWriteResult',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/BulkWriteResult',
                      },
                      {
                        label: 'Date',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/Date',
                      },
                      {
                        label: 'HexData',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/HexData',
                      },
                      {
                        label: 'ObjectId',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/ObjectId',
                      },
                      {
                        label: 'ObjectId.createFromBase64',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/ObjectId.createFromBase64',
                      },
                      {
                        label: 'ObjectId.createFromHexString',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/ObjectId.createFromHexString',
                      },
                      {
                        label: 'ObjectId.getTimestamp',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/ObjectId.getTimestamp',
                      },
                      {
                        label: 'ObjectId.toString',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/ObjectId.toString',
                      },
                      {
                        label: 'UUID',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/UUID',
                      },
                      {
                        label: 'WriteResult',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/WriteResult',
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
                        url: '/docs/:version/reference/method/connect',
                      },
                      {
                        label: 'Mongo',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/Mongo',
                      },
                      {
                        label: 'Mongo.getDB',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/Mongo.getDB',
                      },
                      {
                        label: 'Mongo.getDBNames',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/Mongo.getDBNames',
                      },
                      {
                        label: 'Mongo.getDBs',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/Mongo.getDBs',
                      },
                      {
                        label: 'Mongo.getReadPrefMode',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/Mongo.getReadPrefMode',
                      },
                      {
                        label: 'Mongo.getReadPrefTagSet',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/Mongo.getReadPrefTagSet',
                      },
                      {
                        label: 'Mongo.getURI',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/Mongo.getURI',
                      },
                      {
                        label: 'Mongo.getWriteConcern',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/Mongo.getWriteConcern',
                      },
                      {
                        label: 'Mongo.setCausalConsistency',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/Mongo.setCausalConsistency',
                      },
                      {
                        label: 'Mongo.setReadPref',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/Mongo.setReadPref',
                      },
                      {
                        label: 'Mongo.startSession',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/Mongo.startSession',
                      },
                      {
                        label: 'Mongo.setWriteConcern',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/Mongo.setWriteConcern',
                      },
                      {
                        label: 'Mongo.watch',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/Mongo.watch',
                      },
                      {
                        label: 'Session',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/:version/reference/method/Session',
                        items: [
                          {
                            label: 'Session.abortTransaction()',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/method/Session.abortTransaction',
                          },
                          {
                            label: 'Session.commitTransaction()',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/method/Session.commitTransaction',
                          },
                          {
                            label: 'Session.startTransaction()',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/method/Session.startTransaction',
                          },
                          {
                            label: 'Session.withTransaction()',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/method/Session.withTransaction',
                          },
                        ],
                      },
                      {
                        label: 'SessionOptions',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/SessionOptions',
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
                        url: '/docs/:version/reference/method/ClientEncryption.createEncryptedCollection',
                      },
                      {
                        label: 'ClientEncryption.encrypt',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/ClientEncryption.encrypt',
                      },
                      {
                        label: 'ClientEncryption.encryptExpression',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/ClientEncryption.encryptExpression',
                      },
                      {
                        label: 'ClientEncryption.decrypt',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/ClientEncryption.decrypt',
                      },
                      {
                        label: 'getClientEncryption',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/getClientEncryption',
                      },
                      {
                        label: 'getKeyVault',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/getKeyVault',
                      },
                      {
                        label: 'KeyVault.addKeyName',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/KeyVault.addKeyName',
                      },
                      {
                        label: 'KeyVault.addKeyAlternateName',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/KeyVault.addKeyAlternateName',
                      },
                      {
                        label: 'KeyVault.createDataKey',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/KeyVault.createDataKey',
                      },
                      {
                        label: 'KeyVault.createKey',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/KeyVault.createKey',
                      },
                      {
                        label: 'KeyVault.deleteKey',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/KeyVault.deleteKey',
                      },
                      {
                        label: 'KeyVault.getKey',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/KeyVault.getKey',
                      },
                      {
                        label: 'KeyVault.getKeys',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/KeyVault.getKeys',
                      },
                      {
                        label: 'KeyVault.getKeyByAltName',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/KeyVault.getKeyByAltName',
                      },
                      {
                        label: 'KeyVault.removeKeyAlternateName',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/KeyVault.removeKeyAlternateName',
                      },
                      {
                        label: 'KeyVault.removeKeyAltName',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/KeyVault.removeKeyAltName',
                      },
                      {
                        label: 'KeyVault.rewrapManyDataKey',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/method/KeyVault.rewrapManyDataKey',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Query Language',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/:version/reference/mql',
                items: [
                  {
                    label: 'CRUD Commands',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/reference/mql/crud-commands',
                    items: [
                      {
                        label: 'aggregate',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/aggregate',
                      },
                      {
                        label: 'bulkWrite',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/bulkWrite',
                      },
                      {
                        label: 'count',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/count',
                      },
                      {
                        label: 'delete',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/delete',
                      },
                      {
                        label: 'distinct',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/distinct',
                      },
                      {
                        label: 'find',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/find',
                      },
                      {
                        label: 'findAndModify',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/findAndModify',
                      },
                      {
                        label: 'getMore',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/getMore',
                      },
                      {
                        label: 'insert',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/insert',
                      },
                      {
                        label: 'mapReduce',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/mapReduce',
                      },
                      {
                        label: 'update',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/command/update',
                      },
                    ],
                  },
                  {
                    label: 'Aggregation Stages',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/reference/mql/aggregation-stages',
                    items: [
                      {
                        label: '$addFields',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/addFields',
                      },
                      {
                        label: '$bucket',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/bucket',
                      },
                      {
                        label: '$bucketAuto',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/bucketAuto',
                      },
                      {
                        label: '$changeStream',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/changeStream',
                      },
                      {
                        label: '$changeStreamSplitLargeEvent',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/changeStreamSplitLargeEvent',
                      },
                      {
                        label: '$collStats',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/collStats',
                      },
                      {
                        label: '$count',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/count',
                      },
                      {
                        label: '$currentOp',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/currentOp',
                      },
                      {
                        label: '$densify',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/densify',
                      },
                      {
                        label: '$documents',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/documents',
                      },
                      {
                        label: '$facet',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/facet',
                      },
                      {
                        label: '$fill',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/fill',
                      },
                      {
                        label: '$geoNear',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/geoNear',
                      },
                      {
                        label: '$graphLookup',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/graphLookup',
                      },
                      {
                        label: '$group',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/group',
                      },
                      {
                        label: '$indexStats',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/indexStats',
                      },
                      {
                        label: '$limit',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/limit',
                      },
                      {
                        label: '$listClusterCatalog',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/listClusterCatalog',
                      },
                      {
                        label: '$listLocalSessions',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/listLocalSessions',
                      },
                      {
                        label: '$listSampledQueries',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/listSampledQueries',
                      },
                      {
                        label: '$listSearchIndexes',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/listSearchIndexes',
                      },
                      {
                        label: '$listSessions',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/listSessions',
                      },
                      {
                        label: '$lookup',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/lookup',
                      },
                      {
                        label: '$match',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/match',
                      },
                      {
                        label: '$merge',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/merge',
                      },
                      {
                        label: '$out',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/out',
                      },
                      {
                        label: '$planCacheStats',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/planCacheStats',
                      },
                      {
                        label: '$project',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/project',
                      },
                      {
                        label: '$querySettings',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/querySettings',
                      },
                      {
                        label: '$queryStats',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/:version/reference/operator/aggregation/queryStats',
                        items: [
                          {
                            label: 'Toggle Log Output',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/operator/aggregation/queryStats/toggle-logging',
                          },
                        ],
                      },
                      {
                        label: '$rankFusion',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/rankFusion',
                      },
                      {
                        label: '$redact',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/:version/reference/operator/aggregation/redact',
                        items: [
                          {
                            label: 'Use Field Level Redaction',
                            contentSite: 'docs',
                            url: '/docs/:version/tutorial/implement-field-level-redaction',
                          },
                        ],
                      },
                      {
                        label: '$replaceRoot',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/replaceRoot',
                      },
                      {
                        label: '$replaceWith',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/replaceWith',
                      },
                      {
                        label: '$sample',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/sample',
                      },
                      {
                        label: '$score',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/score',
                      },
                      {
                        label: '$scoreFusion',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/scoreFusion',
                      },
                      {
                        label: '$search',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/search',
                      },
                      {
                        label: '$searchMeta',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/searchMeta',
                      },
                      {
                        label: '$set',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/set',
                      },
                      {
                        label: '$setWindowFields',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/setWindowFields',
                      },
                      {
                        label: '$shardedDataDistribution',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/shardedDataDistribution',
                      },
                      {
                        label: '$skip',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/skip',
                      },
                      {
                        label: '$sort',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/sort',
                      },
                      {
                        label: '$sortByCount',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/sortByCount',
                      },
                      {
                        label: '$unionWith',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/unionWith',
                      },
                      {
                        label: '$unset',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/unset',
                      },
                      {
                        label: '$unwind',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/unwind',
                      },
                      {
                        label: '$vectorSearch',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/vectorSearch',
                      },
                    ],
                  },
                  {
                    label: 'Query Predicates',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/reference/mql/query-predicates',
                    items: [
                      {
                        label: 'Arrays',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/:version/reference/mql/query-predicates/arrays',
                        items: [
                          {
                            label: '$all',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/operator/query/all',
                          },
                          {
                            label: '$elemMatch',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/operator/query/elemMatch',
                          },
                          {
                            label: '$size',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/operator/query/size',
                          },
                        ],
                      },
                      {
                        label: 'Bitwise',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/:version/reference/mql/query-predicates/bitwise',
                        items: [
                          {
                            label: '$bitsAllClear',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/operator/query/bitsAllClear',
                          },
                          {
                            label: '$bitsAllSet',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/operator/query/bitsAllSet',
                          },
                          {
                            label: '$bitsAnyClear',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/operator/query/bitsAnyClear',
                          },
                          {
                            label: '$bitsAnySet',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/operator/query/bitsAnySet',
                          },
                        ],
                      },
                      {
                        label: 'Comparison',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/:version/reference/mql/query-predicates/comparison',
                        items: [
                          {
                            label: '$eq',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/operator/query/eq',
                          },
                          {
                            label: '$gt',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/operator/query/gt',
                          },
                          {
                            label: '$gte',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/operator/query/gte',
                          },
                          {
                            label: '$in',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/operator/query/in',
                          },
                          {
                            label: '$lt',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/operator/query/lt',
                          },
                          {
                            label: '$lte',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/operator/query/lte',
                          },
                          {
                            label: '$ne',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/operator/query/ne',
                          },
                          {
                            label: '$nin',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/operator/query/nin',
                          },
                        ],
                      },
                      {
                        label: 'Data Type',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/:version/reference/mql/query-predicates/data-type',
                        items: [
                          {
                            label: '$exists',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/operator/query/exists',
                          },
                          {
                            label: '$type',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/operator/query/type',
                          },
                        ],
                      },
                      {
                        label: 'Geospatial',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/:version/reference/mql/query-predicates/geospatial',
                        items: [
                          {
                            label: '$box',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/operator/query/box',
                          },
                          {
                            label: '$center',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/operator/query/center',
                          },
                          {
                            label: '$centerSphere',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/operator/query/centerSphere',
                          },
                          {
                            label: '$geoIntersects',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/operator/query/geoIntersects',
                          },
                          {
                            label: '$geometry',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/operator/query/geometry',
                          },
                          {
                            label: '$geoWithin',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/operator/query/geoWithin',
                          },
                          {
                            label: '$maxDistance',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/operator/query/maxDistance',
                          },
                          {
                            label: '$minDistance',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/operator/query/minDistance',
                          },
                          {
                            label: '$near',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/operator/query/near',
                          },
                          {
                            label: '$nearSphere',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/operator/query/nearSphere',
                          },
                          {
                            label: '$polygon',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/operator/query/polygon',
                          },
                        ],
                      },
                      {
                        label: 'Logical',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/:version/reference/mql/query-predicates/logical',
                        items: [
                          {
                            label: '$and',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/operator/query/and',
                          },
                          {
                            label: '$nor',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/operator/query/nor',
                          },
                          {
                            label: '$not',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/operator/query/not',
                          },
                          {
                            label: '$or',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/operator/query/or',
                          },
                        ],
                      },
                      {
                        label: 'Miscellaneous',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/:version/reference/mql/query-predicates/misc',
                        items: [
                          {
                            label: '$expr',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/operator/query/expr',
                          },
                          {
                            label: '$jsonSchema',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/operator/query/jsonSchema',
                          },
                          {
                            label: '$mod',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/operator/query/mod',
                          },
                          {
                            label: '$regex',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/operator/query/regex',
                          },
                          {
                            label: '$where',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/operator/query/where',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    label: 'Expressions',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/reference/mql/expressions',
                    items: [
                      {
                        label: '$abs',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/abs',
                      },
                      {
                        label: '$acos',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/acos',
                      },
                      {
                        label: '$acosh',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/acosh',
                      },
                      {
                        label: '$add',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/add',
                      },
                      {
                        label: '$allElementsTrue',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/allElementsTrue',
                      },
                      {
                        label: '$and',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/and',
                      },
                      {
                        label: '$anyElementTrue',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/anyElementTrue',
                      },
                      {
                        label: '$arrayElemAt',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/arrayElemAt',
                      },
                      {
                        label: '$arrayToObject',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/arrayToObject',
                      },
                      {
                        label: '$asin',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/asin',
                      },
                      {
                        label: '$asinh',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/asinh',
                      },
                      {
                        label: '$atan',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/atan',
                      },
                      {
                        label: '$atan2',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/atan2',
                      },
                      {
                        label: '$atanh',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/atanh',
                      },
                      {
                        label: '$binarySize',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/binarySize',
                      },
                      {
                        label: '$bitAnd',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/bitAnd',
                      },
                      {
                        label: '$bitNot',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/bitNot',
                      },
                      {
                        label: '$bitOr',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/bitOr',
                      },
                      {
                        label: '$bitXor',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/bitXor',
                      },
                      {
                        label: '$bsonSize',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/bsonSize',
                      },
                      {
                        label: '$ceil',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/ceil',
                      },
                      {
                        label: '$cmp',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/cmp',
                      },
                      {
                        label: '$concat',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/concat',
                      },
                      {
                        label: '$concatArrays',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/concatArrays',
                      },
                      {
                        label: '$cond',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/cond',
                      },
                      {
                        label: '$convert',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/convert',
                      },
                      {
                        label: '$cos',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/cos',
                      },
                      {
                        label: '$cosh',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/cosh',
                      },
                      {
                        label: '$covariancePop',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/covariancePop',
                      },
                      {
                        label: '$covarianceSamp',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/covarianceSamp',
                      },
                      {
                        label: '$createObjectId',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/createObjectId',
                        versions: {
                          excludes: ['v7.0', 'v8.0', 'manual'],
                        },
                      },
                      {
                        label: '$dateAdd',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/dateAdd',
                      },
                      {
                        label: '$dateDiff',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/dateDiff',
                      },
                      {
                        label: '$dateFromParts',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/dateFromParts',
                      },
                      {
                        label: '$dateFromString',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/dateFromString',
                      },
                      {
                        label: '$dateSubtract',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/dateSubtract',
                      },
                      {
                        label: '$dateToParts',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/dateToParts',
                      },
                      {
                        label: '$dateToString',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/dateToString',
                      },
                      {
                        label: '$dateTrunc',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/dateTrunc',
                      },
                      {
                        label: '$dayOfMonth',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/dayOfMonth',
                      },
                      {
                        label: '$dayOfWeek',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/dayOfWeek',
                      },
                      {
                        label: '$dayOfYear',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/dayOfYear',
                      },
                      {
                        label: '$degreesToRadians',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/degreesToRadians',
                      },
                      {
                        label: '$denseRank',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/denseRank',
                      },
                      {
                        label: '$derivative',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/derivative',
                      },
                      {
                        label: '$deserializeEJSON',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/deserializeEJSON',
                      },
                      {
                        label: '$divide',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/divide',
                      },
                      {
                        label: '$documentNumber',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/documentNumber',
                      },
                      {
                        label: '$encStrContains',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/encStrContains',
                        versions: {
                          excludes: ['v7.0', 'v8.0', 'v8.1'],
                        },
                      },
                      {
                        label: '$encStrEndsWith',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/encStrEndsWith',
                        versions: {
                          excludes: ['v7.0', 'v8.0', 'v8.1'],
                        },
                      },
                      {
                        label: '$encStrNormalizedEq',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/encStrNormalizedEq',
                        versions: {
                          excludes: ['v7.0', 'v8.0', 'v8.1'],
                        },
                      },
                      {
                        label: '$encStrStartsWith',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/encStrStartsWith',
                        versions: {
                          excludes: ['v7.0', 'v8.0', 'v8.1'],
                        },
                      },
                      {
                        label: '$eq',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/eq',
                      },
                      {
                        label: '$exp',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/exp',
                      },
                      {
                        label: '$expMovingAvg',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/expMovingAvg',
                      },
                      {
                        label: '$filter',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/filter',
                      },
                      {
                        label: '$floor',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/floor',
                      },
                      {
                        label: '$function',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/function',
                      },
                      {
                        label: '$getField',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/getField',
                      },
                      {
                        label: '$gt',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/gt',
                      },
                      {
                        label: '$gte',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/gte',
                      },
                      {
                        label: '$hour',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/hour',
                      },
                      {
                        label: '$ifNull',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/ifNull',
                      },
                      {
                        label: '$in',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/in',
                      },
                      {
                        label: '$indexOfArray',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/indexOfArray',
                      },
                      {
                        label: '$indexOfBytes',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/indexOfBytes',
                      },
                      {
                        label: '$indexOfCP',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/indexOfCP',
                      },
                      {
                        label: '$integral',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/integral',
                      },
                      {
                        label: '$isArray',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/isArray',
                      },
                      {
                        label: '$isNumber',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/isNumber',
                      },
                      {
                        label: '$isoDayOfWeek',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/isoDayOfWeek',
                      },
                      {
                        label: '$isoWeek',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/isoWeek',
                      },
                      {
                        label: '$isoWeekYear',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/isoWeekYear',
                      },
                      {
                        label: '$let',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/let',
                      },
                      {
                        label: '$linearFill',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/linearFill',
                      },
                      {
                        label: '$literal',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/literal',
                      },
                      {
                        label: '$ln',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/ln',
                      },
                      {
                        label: '$locf',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/locf',
                      },
                      {
                        label: '$log',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/log',
                      },
                      {
                        label: '$log10',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/log10',
                      },
                      {
                        label: '$lt',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/lt',
                      },
                      {
                        label: '$lte',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/lte',
                      },
                      {
                        label: '$ltrim',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/ltrim',
                      },
                      {
                        label: '$map',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/map',
                      },
                      {
                        label: '$maxN-array-element',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/maxN-array-element',
                      },
                      {
                        label: '$meta',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/meta',
                      },
                      {
                        label: '$minN-array-element',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/minN-array-element',
                      },
                      {
                        label: '$minMaxScaler',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/minMaxScaler',
                      },
                      {
                        label: '$millisecond',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/millisecond',
                      },
                      {
                        label: '$minute',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/minute',
                      },
                      {
                        label: '$mod',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/mod',
                      },
                      {
                        label: '$month',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/month',
                      },
                      {
                        label: '$multiply',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/multiply',
                      },
                      {
                        label: '$ne',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/ne',
                      },
                      {
                        label: '$not',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/not',
                      },
                      {
                        label: '$objectToArray',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/objectToArray',
                      },
                      {
                        label: '$or',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/or',
                      },
                      {
                        label: '$pow',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/pow',
                      },
                      {
                        label: '$radiansToDegrees',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/radiansToDegrees',
                      },
                      {
                        label: '$rand',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/rand',
                      },
                      {
                        label: '$range',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/range',
                      },
                      {
                        label: '$rank',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/rank',
                      },
                      {
                        label: '$reduce',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/reduce',
                      },
                      {
                        label: '$regexFind',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/regexFind',
                      },
                      {
                        label: '$regexFindAll',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/regexFindAll',
                      },
                      {
                        label: '$regexMatch',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/regexMatch',
                      },
                      {
                        label: '$replaceOne',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/replaceOne',
                      },
                      {
                        label: '$replaceAll',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/replaceAll',
                      },
                      {
                        label: '$reverseArray',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/reverseArray',
                      },
                      {
                        label: '$round',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/round',
                      },
                      {
                        label: '$rtrim',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/rtrim',
                      },
                      {
                        label: '$sampleRate',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/sampleRate',
                      },
                      {
                        label: '$second',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/second',
                      },
                      {
                        label: '$serializeEJSON',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/serializeEJSON',
                      },
                      {
                        label: '$setDifference',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/setDifference',
                      },
                      {
                        label: '$setEquals',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/setEquals',
                      },
                      {
                        label: '$setField',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/setField',
                      },
                      {
                        label: '$setIntersection',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/setIntersection',
                      },
                      {
                        label: '$setIsSubset',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/setIsSubset',
                      },
                      {
                        label: '$setUnion',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/setUnion',
                      },
                      {
                        label: '$shift',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/shift',
                      },
                      {
                        label: '$sigmoid',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/sigmoid',
                      },
                      {
                        label: '$size',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/size',
                      },
                      {
                        label: '$sin',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/sin',
                      },
                      {
                        label: '$sinh',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/sinh',
                      },
                      {
                        label: '$slice',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/slice',
                      },
                      {
                        label: '$sortArray',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/sortArray',
                      },
                      {
                        label: '$split',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/split',
                      },
                      {
                        label: '$sqrt',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/sqrt',
                      },
                      {
                        label: '$strcasecmp',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/strcasecmp',
                      },
                      {
                        label: '$strLenBytes',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/strLenBytes',
                      },
                      {
                        label: '$strLenCP',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/strLenCP',
                      },
                      {
                        label: '$substr',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/substr',
                      },
                      {
                        label: '$substrBytes',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/substrBytes',
                      },
                      {
                        label: '$substrCP',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/substrCP',
                      },
                      {
                        label: '$subtract',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/subtract',
                      },
                      {
                        label: '$subtype',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/subtype',
                        versions: {
                          excludes: ['v7.0', 'v8.0', 'manual'],
                        },
                      },
                      {
                        label: '$switch',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/switch',
                      },
                      {
                        label: '$tan',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/tan',
                      },
                      {
                        label: '$tanh',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/tanh',
                      },
                      {
                        label: '$toArray',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/toArray',
                        versions: {
                          excludes: ['v7.0', 'v8.0', 'manual'],
                        },
                      },
                      {
                        label: '$toBool',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/toBool',
                      },
                      {
                        label: '$toDate',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/toDate',
                      },
                      {
                        label: '$toDecimal',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/toDecimal',
                      },
                      {
                        label: '$toDouble',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/toDouble',
                      },
                      {
                        label: '$toHashedIndexKey',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/toHashedIndexKey',
                      },
                      {
                        label: '$toInt',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/toInt',
                      },
                      {
                        label: '$toLong',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/toLong',
                      },
                      {
                        label: '$toObject',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/toObject',
                        versions: {
                          excludes: ['v7.0', 'v8.0', 'manual'],
                        },
                      },
                      {
                        label: '$toObjectId',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/toObjectId',
                      },
                      {
                        label: '$top',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/top',
                      },
                      {
                        label: '$topN',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/topN',
                      },
                      {
                        label: '$toString',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/toString',
                      },
                      {
                        label: '$toLower',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/toLower',
                      },
                      {
                        label: '$toUpper',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/toUpper',
                      },
                      {
                        label: '$toUUID',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/toUUID',
                      },
                      {
                        label: '$tsIncrement',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/tsIncrement',
                      },
                      {
                        label: '$tsSecond',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/tsSecond',
                      },
                      {
                        label: '$trim',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/trim',
                      },
                      {
                        label: '$trunc',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/trunc',
                      },
                      {
                        label: '$type',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/type',
                      },
                      {
                        label: '$unsetField',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/unsetField',
                      },
                      {
                        label: '$week',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/week',
                      },
                      {
                        label: '$year',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/year',
                      },
                      {
                        label: '$zip',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/zip',
                      },
                    ],
                  },
                  {
                    label: 'Projection',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/reference/mql/projection',
                    items: [
                      {
                        label: '$',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/projection/positional',
                      },
                      {
                        label: '$elemMatch',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/projection/elemMatch',
                      },
                      {
                        label: '$slice',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/projection/slice',
                      },
                    ],
                  },
                  {
                    label: 'Accumulators',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/reference/mql/accumulators',
                    items: [
                      {
                        label: '$accumulator',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/accumulator',
                      },
                      {
                        label: '$addToSet',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/addToSet',
                      },
                      {
                        label: '$avg',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/avg',
                      },
                      {
                        label: '$bottom',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/bottom',
                      },
                      {
                        label: '$bottomN',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/bottomN',
                      },
                      {
                        label: '$count',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/count-accumulator',
                      },
                      {
                        label: '$first',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/first',
                      },
                      {
                        label: '$firstN',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/firstN',
                      },
                      {
                        label: '$last',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/last',
                      },
                      {
                        label: '$lastN',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/lastN',
                      },
                      {
                        label: '$max',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/max',
                      },
                      {
                        label: '$maxN',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/maxN',
                      },
                      {
                        label: '$median',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/median',
                      },
                      {
                        label: '$mergeObjects',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/mergeObjects',
                      },
                      {
                        label: '$min',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/min',
                      },
                      {
                        label: '$minN',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/minN',
                      },
                      {
                        label: '$percentile',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/percentile',
                      },
                      {
                        label: '$push',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/push',
                      },
                      {
                        label: '$stdDevPop',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/stdDevPop',
                      },
                      {
                        label: '$stdDevSamp',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/stdDevSamp',
                      },
                      {
                        label: '$sum',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/sum',
                      },
                      {
                        label: '$top',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/top',
                      },
                      {
                        label: '$topN',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/operator/aggregation/topN',
                      },
                    ],
                  },
                  {
                    label: 'Update',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/reference/mql/update',
                    items: [
                      {
                        label: 'Arrays',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/:version/reference/operator/update-array',
                        items: [
                          {
                            label: '$ (update)',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/operator/update/positional',
                          },
                          {
                            label: '$[]',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/operator/update/positional-all',
                          },
                          {
                            label: '$[<identifier>]',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/operator/update/positional-filtered',
                          },
                          {
                            label: '$addToSet',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/operator/update/addToSet',
                          },
                          {
                            label: '$pop',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/operator/update/pop',
                          },
                          {
                            label: '$pull',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/operator/update/pull',
                          },
                          {
                            label: '$push',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/operator/update/push',
                          },
                          {
                            label: '$pullAll',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/operator/update/pullAll',
                          },
                          {
                            label: '$each',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/operator/update/each',
                          },
                          {
                            label: '$position',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/operator/update/position',
                          },
                          {
                            label: '$slice',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/operator/update/slice',
                          },
                          {
                            label: '$sort',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/operator/update/sort',
                          },
                        ],
                      },
                      {
                        label: 'Bitwise',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/:version/reference/operator/update-bitwise',
                        items: [
                          {
                            label: '$bit',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/operator/update/bit',
                          },
                        ],
                      },
                      {
                        label: 'Fields',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/:version/reference/operator/update-field',
                        items: [
                          {
                            label: '$currentDate',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/operator/update/currentDate',
                          },
                          {
                            label: '$inc',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/operator/update/inc',
                          },
                          {
                            label: '$min',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/operator/update/min',
                          },
                          {
                            label: '$max',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/operator/update/max',
                          },
                          {
                            label: '$mul',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/operator/update/mul',
                          },
                          {
                            label: '$rename',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/operator/update/rename',
                          },
                          {
                            label: '$set',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/operator/update/set',
                          },
                          {
                            label: '$setOnInsert',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/operator/update/setOnInsert',
                          },
                          {
                            label: '$unset',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/operator/update/unset',
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
                url: '/docs/:version/reference/server-sessions',
              },
              {
                label: 'Slot-Based Query Execution Engine',
                contentSite: 'docs',
                url: '/docs/:version/reference/sbe',
              },
              {
                label: 'Stable API',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/:version/reference/stable-api',
                items: [
                  {
                    label: 'Migrate to Later Version',
                    contentSite: 'docs',
                    url: '/docs/:version/reference/stable-api-reference',
                  },
                  {
                    label: 'Changelog',
                    contentSite: 'docs',
                    url: '/docs/:version/reference/stable-api-changelog',
                  },
                ],
              },
              {
                label: 'System Collections',
                contentSite: 'docs',
                url: '/docs/:version/reference/system-collections',
              },
              {
                label: 'Legacy mongo Shell',
                contentSite: 'docs',
                url: '/docs/:version/reference/mongo',
              },
              {
                label: 'BSON Types',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/:version/reference/bson-types',
                items: [
                  {
                    label: 'Comparison and Sort Order',
                    contentSite: 'docs',
                    url: '/docs/:version/reference/bson-type-comparison-order',
                  },
                  {
                    label: 'Migrate Undefined Data and Queries',
                    contentSite: 'docs',
                    url: '/docs/:version/reference/bson-types/migrate-undefined',
                  },
                  {
                    label: 'Extended JSON (v2)',
                    contentSite: 'docs',
                    url: '/docs/:version/reference/mongodb-extended-json',
                  },
                  {
                    label: 'Extended JSON (v1)',
                    contentSite: 'docs',
                    url: '/docs/:version/reference/mongodb-extended-json-v1',
                  },
                ],
              },
            ],
          },
          {
            label: 'Support',
            contentSite: 'docs',
            collapsible: true,
            url: '/docs/:version/support',
            items: [
              {
                label: 'Atlas Support',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/support',
              },
              {
                label: 'Create a Vulnerability Report',
                contentSite: 'docs',
                url: '/docs/:version/tutorial/create-a-vulnerability-report',
              },
            ],
          },
        ],
      },
      {
        label: 'Build AI Applications',
        contentSite: 'docs',
        group: true,
        items: [
          {
            label: 'AI Models',
            isExternal: true,
            url: 'https://www.mongodb.com/docs/voyageai/',
          },
          {
            label: 'AI Integrations',
            contentSite: 'cloud-docs',
            collapsible: true,
            url: '/docs/atlas/ai-integrations',
            items: [
              {
                label: 'Frameworks',
                contentSite: 'cloud-docs',
                collapsible: true,
                items: [
                  {
                    label: 'LangChain',
                    contentSite: 'cloud-docs',
                    collapsible: true,
                    url: '/docs/atlas/ai-integrations/langchain',
                    items: [
                      {
                        label: 'Get Started',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/ai-integrations/langchain/get-started',
                      },
                      {
                        label: 'Memory and Semantic Caching',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/ai-integrations/langchain/memory-semantic-cache',
                      },
                      {
                        label: 'Hybrid Search',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/ai-integrations/langchain/hybrid-search',
                      },
                      {
                        label: 'Parent Document Retrieval',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/ai-integrations/langchain/parent-document-retrieval',
                      },
                      {
                        label: 'Self-Querying Retrieval',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/ai-integrations/langchain/self-query-retrieval',
                      },
                      {
                        label: 'Local RAG',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/ai-integrations/langchain/local-rag',
                      },
                      {
                        label: 'GraphRAG',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/ai-integrations/langchain/graph-rag',
                      },
                      {
                        label: 'Natural Language Queries',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/ai-integrations/langchain/natural-language-to-mql',
                      },
                      {
                        label: 'Evaluate RAG Applications',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/ai-integrations/langchain/evaluate-rag',
                      },
                    ],
                  },
                  {
                    label: 'LangChain JS/TS',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/ai-integrations/langchain-js',
                  },
                  {
                    label: 'LangChainGo',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/ai-integrations/langchaingo',
                  },
                  {
                    label: 'LangChain4j',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/ai-integrations/langchain4j',
                  },
                  {
                    label: 'LlamaIndex',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/ai-integrations/llamaindex',
                  },
                  {
                    label: 'Semantic Kernel',
                    contentSite: 'cloud-docs',
                    collapsible: true,
                    items: [
                      {
                        label: 'Python Integration',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/ai-integrations/semantic-kernel-python',
                      },
                      {
                        label: 'C# Integration',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/ai-integrations/semantic-kernel-csharp',
                      },
                    ],
                  },
                  {
                    label: 'Haystack',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/ai-integrations/haystack',
                  },
                  {
                    label: 'Spring AI',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/ai-integrations/spring-ai',
                  },
                ],
              },
              {
                label: 'Agent Frameworks',
                contentSite: 'cloud-docs',
                collapsible: true,
                items: [
                  {
                    label: 'LangGraph',
                    contentSite: 'cloud-docs',
                    collapsible: true,
                    url: '/docs/atlas/ai-integrations/langgraph',
                    items: [
                      {
                        label: 'Build an AI Agent',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/ai-integrations/langgraph/build-agents',
                      },
                    ],
                  },
                  {
                    label: 'LangGraph.js',
                    contentSite: 'cloud-docs',
                    collapsible: true,
                    url: '/docs/atlas/ai-integrations/langgraph-js',
                    items: [
                      {
                        label: 'Build an AI Agent',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/ai-integrations/langgraph-js/build-agents',
                      },
                    ],
                  },
                  {
                    label: 'CrewAI',
                    contentSite: 'cloud-docs',
                    collapsible: true,
                    url: '/docs/atlas/ai-integrations/crewai',
                    items: [
                      {
                        label: 'Build an AI Agent',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/ai-integrations/crewai/build-agents',
                      },
                    ],
                  },
                  {
                    label: 'Community-Maintained',
                    contentSite: 'cloud-docs',
                    collapsible: true,
                    items: [
                      {
                        label: 'Mastra',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/ai-integrations/mastra',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Platforms',
                contentSite: 'cloud-docs',
                collapsible: true,
                items: [
                  {
                    label: 'Amazon Bedrock',
                    contentSite: 'cloud-docs',
                    collapsible: true,
                    url: '/docs/atlas/ai-integrations/amazon-bedrock',
                    items: [
                      {
                        label: 'Hybrid Search',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/ai-integrations/amazon-bedrock/hybrid-search',
                      },
                      {
                        label: 'Troubleshooting',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/ai-integrations/amazon-bedrock/troubleshooting',
                      },
                    ],
                  },
                  {
                    label: 'Google Vertex AI',
                    contentSite: 'cloud-docs',
                    collapsible: true,
                    url: '/docs/atlas/ai-integrations/google-vertex-ai',
                    items: [
                      {
                        label: 'Vertex AI Extensions',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/ai-integrations/google-vertex-ai/extensions',
                      },
                      {
                        label: 'Vertex AI Agent Engine',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/ai-integrations/google-vertex-ai/agent-engine',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Tools',
                contentSite: 'cloud-docs',
                collapsible: true,
                items: [
                  {
                    label: 'MCP Server',
                    isExternal: true,
                    url: 'https://www.mongodb.com/docs/mcp-server/',
                  },
                  {
                    label: 'n8n',
                    contentSite: 'cloud-docs',
                    collapsible: true,
                    url: '/docs/atlas/ai-integrations/n8n',
                    items: [
                      {
                        label: 'Build an AI Agent',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/ai-integrations/n8n/build-ai-agent',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'API Resources',
                contentSite: 'cloud-docs',
                collapsible: true,
                items: [
                  {
                    label: 'LangChain Python API Reference',
                    isExternal: true,
                    url: 'https://langchain-mongodb.readthedocs.io/en/latest/langchain_mongodb/api_docs.html',
                  },
                  {
                    label: 'LangChain JS/TS API Reference',
                    isExternal: true,
                    url: 'https://api.js.langchain.com/modules/langchain_mongodb.html',
                  },
                  {
                    label: 'LangGraph API Reference',
                    isExternal: true,
                    url: 'https://langchain-mongodb.readthedocs.io/en/latest/langgraph_checkpoint_mongodb/api_docs.html',
                  },
                  {
                    label: 'LangGraph.js API Reference',
                    isExternal: true,
                    url: 'https://langchain-ai.github.io/langgraphjs/reference/classes/checkpoint_mongodb.MongoDBSaver.html',
                  },
                  {
                    label: 'LangChainGo API Reference',
                    isExternal: true,
                    url: 'https://pkg.go.dev/github.com/tmc/langchaingo',
                  },
                  {
                    label: 'LangChain4j API Reference',
                    isExternal: true,
                    url: 'https://docs.langchain4j.dev/apidocs/index.html',
                  },
                  {
                    label: 'LlamaIndex API Reference',
                    isExternal: true,
                    url: 'https://docs.llamaindex.ai/en/stable/api_reference/storage/vector_store/mongodb/',
                  },
                  {
                    label: 'Semantic Kernel C# API Reference',
                    isExternal: true,
                    url: 'https://learn.microsoft.com/en-us/dotnet/api/microsoft.semantickernel.connectors.mongodb',
                  },
                  {
                    label: 'Haystack API Reference',
                    isExternal: true,
                    url: 'https://docs.haystack.deepset.ai/reference/integrations-mongodb-atlas',
                  },
                  {
                    label: 'Spring AI API Reference',
                    isExternal: true,
                    url: 'https://docs.spring.io/spring-ai/docs/current/api/org/springframework/ai/vectorstore/package-summary.html',
                  },
                ],
              },
            ],
          },
          {
            label: 'AI Agents',
            isExternal: true,
            url: 'https://www.mongodb.com/docs/atlas/atlas-vector-search/ai-agents/',
          },
        ],
      },
      {
        label: 'Streaming Data',
        contentSite: 'cloud-docs',
        group: true,
        items: [
          {
            label: 'Atlas Stream Processing',
            contentSite: 'cloud-docs',
            collapsible: true,
            url: '/docs/atlas/atlas-stream-processing',
            items: [
              {
                label: 'Guides',
                contentSite: 'cloud-docs',
                collapsible: true,
                items: [
                  {
                    label: 'Get Started',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-stream-processing/quickstart',
                  },
                  {
                    label: 'Tier Sizing Guide',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-stream-processing/tier-guide',
                  },
                ],
              },
              {
                label: 'Architecture',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-stream-processing/architecture',
              },
              {
                label: 'Stream Processor Windows',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-stream-processing/windows',
              },
              {
                label: 'Manage Stream Processing',
                contentSite: 'cloud-docs',
                collapsible: true,
                items: [
                  {
                    label: 'Manage Stream Processing Workspaces',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-stream-processing/manage-processing-instance',
                  },
                  {
                    label: 'Manage Connections',
                    contentSite: 'cloud-docs',
                    collapsible: true,
                    url: '/docs/atlas/atlas-stream-processing/manage-connection-registry',
                    items: [
                      {
                        label: 'Add Public Connections',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/atlas-stream-processing/add-sp-connection',
                      },
                      {
                        label: 'Advanced Networking',
                        contentSite: 'cloud-docs',
                        collapsible: true,
                        items: [
                          {
                            label: 'Kafka Private Link Connections',
                            contentSite: 'cloud-docs',
                            url: '/docs/atlas/atlas-stream-processing/kafka-private-link-connection',
                          },
                          {
                            label: 'S3 Private Link Connections',
                            contentSite: 'cloud-docs',
                            url: '/docs/atlas/atlas-stream-processing/s3-private-link-connection',
                          },
                          {
                            label: 'Kinesis Private Link Connections',
                            contentSite: 'cloud-docs',
                            url: '/docs/atlas/atlas-stream-processing/kinesis-private-link-connection',
                          },
                          {
                            label: 'Google Cloud Private Link Connections',
                            contentSite: 'cloud-docs',
                            url: '/docs/atlas/atlas-stream-processing/gcp-private-link-connection',
                          },
                          {
                            label: 'Manage VPC Connections',
                            contentSite: 'cloud-docs',
                            url: '/docs/atlas/atlas-stream-processing/manage-vpc-peering-connections',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Develop Stream Processors',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-stream-processing/manage-stream-processor',
              },
              {
                label: 'Aggregation Pipelines',
                contentSite: 'cloud-docs',
                collapsible: true,
                items: [
                  {
                    label: 'Aggregation Operators',
                    contentSite: 'cloud-docs',
                    collapsible: true,
                    url: '/docs/atlas/atlas-stream-processing/stream-aggregation-operators',
                    items: [
                      {
                        label: '$convert',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/atlas-stream-processing/sp-agg-convert',
                      },
                      {
                        label: '$currentDate',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/atlas-stream-processing/sp-agg-currentdate',
                      },
                      {
                        label: '$meta',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/atlas-stream-processing/sp-agg-meta',
                      },
                      {
                        label: '$createUUID',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/atlas-stream-processing/sp-agg-createuuid',
                      },
                      {
                        label: '$function',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/atlas-stream-processing/sp-agg-function',
                      },
                    ],
                  },
                  {
                    label: 'Aggregation Stages',
                    contentSite: 'cloud-docs',
                    collapsible: true,
                    url: '/docs/atlas/atlas-stream-processing/stream-aggregation-stages',
                    items: [
                      {
                        label: '$source',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/atlas-stream-processing/sp-agg-source',
                      },
                      {
                        label: '$validate',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/atlas-stream-processing/sp-agg-validate',
                      },
                      {
                        label: '$https',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/atlas-stream-processing/sp-agg-https',
                      },
                      {
                        label: '$lookup',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/atlas-stream-processing/sp-agg-lookup',
                      },
                      {
                        label: '$cachedLookup',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/atlas-stream-processing/sp-agg-cachedlookup',
                      },
                      {
                        label: '$hoppingWindow',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/atlas-stream-processing/sp-agg-hopping',
                      },
                      {
                        label: '$tumblingWindow',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/atlas-stream-processing/sp-agg-tumbling',
                      },
                      {
                        label: '$sessionWindow',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/atlas-stream-processing/sp-agg-session',
                      },
                      {
                        label: '$setStreamMeta',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/atlas-stream-processing/sp-agg-setStreamMeta',
                      },
                      {
                        label: '$emit',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/atlas-stream-processing/sp-agg-emit',
                      },
                      {
                        label: '$merge',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/atlas-stream-processing/sp-agg-merge',
                      },
                      {
                        label: '$externalFunction',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/atlas-stream-processing/sp-agg-externalFunction',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Security',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-stream-processing/security',
              },
              {
                label: 'Monitoring',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-stream-processing/monitoring',
              },
              {
                label: 'Limitations',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-stream-processing/limitations',
              },
              {
                label: 'Changelog',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-stream-processing/changelog',
              },
            ],
          },
          {
            label: 'Atlas Triggers',
            contentSite: 'cloud-docs',
            collapsible: true,
            url: '/docs/atlas/atlas-ui/triggers',
            items: [
              {
                label: 'Database Triggers',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-ui/triggers/database-triggers',
              },
              {
                label: 'Scheduled Triggers',
                contentSite: 'cloud-docs',
                collapsible: true,
                url: '/docs/atlas/atlas-ui/triggers/scheduled-triggers',
                items: [
                  {
                    label: 'Tutorial: Automate Cluster Configurations',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-ui/triggers/scheduled-triggers-tutorial',
                  },
                ],
              },
              {
                label: 'Disable a Trigger',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-ui/triggers/disable',
              },
              {
                label: 'Send Trigger Events to AWS EventBridge',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-ui/triggers/aws-eventbridge',
              },
              {
                label: 'Functions',
                contentSite: 'cloud-docs',
                collapsible: true,
                url: '/docs/atlas/atlas-ui/triggers/functions',
                items: [
                  {
                    label: 'Context',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-ui/triggers/functions/context',
                  },
                  {
                    label: 'Global Modules',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-ui/triggers/functions/globals',
                  },
                  {
                    label: 'External Dependencies',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-ui/triggers/functions/dependencies',
                  },
                  {
                    label: 'Handle Errors',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-ui/triggers/functions/handle-errors',
                  },
                  {
                    label: 'JavaScript Support',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-ui/triggers/functions/javascript-support',
                  },
                  {
                    label: 'Read',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-ui/triggers/functions/read',
                  },
                  {
                    label: 'Write',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-ui/triggers/functions/write',
                  },
                  {
                    label: 'Aggregate',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-ui/triggers/functions/aggregate',
                  },
                  {
                    label: 'Define and Manage Secrets',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-ui/triggers/functions/secrets',
                  },
                  {
                    label: 'MongoDB API Reference',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-ui/triggers/functions/api',
                  },
                  {
                    label: 'Define and Access Values',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-ui/triggers/functions/values',
                  },
                  {
                    label: 'Security',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-ui/triggers/functions/security',
                  },
                ],
              },
              {
                label: 'Logs',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-ui/triggers/logs',
              },
              {
                label: 'Forward Logs',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-ui/triggers/forward-logs',
              },
              {
                label: 'Limitations',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-ui/triggers/limitations',
              },
              {
                label: 'Triggers Code Examples',
                isExternal: true,
                url: 'https://github.com/mongodb/atlas-app-services-examples/tree/main/triggers-examples',
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
            url: '/docs/:version/release-notes',
            items: [
              {
                label: '8.3 (Upcoming)',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/:version/release-notes/8.3',
                versions: {
                  excludes: ['v7.0', 'v8.0', 'manual'],
                },
                items: [
                  {
                    label: 'Compatibility Changes',
                    contentSite: 'docs',
                    url: '/docs/:version/release-notes/8.3-compatibility',
                  },
                  {
                    label: 'Upgrade 8.2 to 8.3',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/release-notes/8.3-upgrade',
                    items: [
                      {
                        label: 'Standalone',
                        contentSite: 'docs',
                        url: '/docs/:version/release-notes/8.3-upgrade-standalone',
                      },
                      {
                        label: 'Replica Set',
                        contentSite: 'docs',
                        url: '/docs/:version/release-notes/8.3-upgrade-replica-set',
                      },
                      {
                        label: 'Sharded Cluster',
                        contentSite: 'docs',
                        url: '/docs/:version/release-notes/8.3-upgrade-sharded-cluster',
                      },
                    ],
                  },
                  {
                    label: 'Downgrade 8.3 to 8.2',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/release-notes/8.3-downgrade',
                    items: [
                      {
                        label: 'Standalone',
                        contentSite: 'docs',
                        url: '/docs/:version/release-notes/8.3-downgrade-standalone',
                      },
                      {
                        label: 'Replica Set',
                        contentSite: 'docs',
                        url: '/docs/:version/release-notes/8.3-downgrade-replica-set',
                      },
                      {
                        label: 'Sharded Cluster',
                        contentSite: 'docs',
                        url: '/docs/:version/release-notes/8.3-downgrade-sharded-cluster',
                      },
                    ],
                  },
                  {
                    label: 'Changelog',
                    contentSite: 'docs',
                    url: '/docs/:version/release-notes/8.3-changelog',
                  },
                ],
              },
              {
                label: '8.2 (Stable Release)',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/:version/release-notes/8.2',
                versions: {
                  excludes: ['v7.0', 'v8.0'],
                },
                items: [
                  {
                    label: 'Compatibility Changes',
                    contentSite: 'docs',
                    url: '/docs/:version/release-notes/8.2-compatibility',
                  },
                  {
                    label: 'Upgrade 8.0 to 8.2',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/release-notes/8.2-upgrade',
                    items: [
                      {
                        label: 'Standalone',
                        contentSite: 'docs',
                        url: '/docs/:version/release-notes/8.2-upgrade-standalone',
                      },
                      {
                        label: 'Replica Set',
                        contentSite: 'docs',
                        url: '/docs/:version/release-notes/8.2-upgrade-replica-set',
                      },
                      {
                        label: 'Sharded Cluster',
                        contentSite: 'docs',
                        url: '/docs/:version/release-notes/8.2-upgrade-sharded-cluster',
                      },
                    ],
                  },
                  {
                    label: 'Downgrade 8.2 to 8.0',
                    contentSite: 'docs',
                    url: '/docs/:version/release-notes/8.2-downgrade',
                  },
                  {
                    label: 'Changelog',
                    contentSite: 'docs',
                    url: '/docs/:version/release-notes/8.2-changelog',
                  },
                ],
              },
              {
                label: '8.0',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/:version/release-notes/8.0',
                versions: {
                  excludes: ['v7.0'],
                },
                items: [
                  {
                    label: 'Compatibility Changes',
                    contentSite: 'docs',
                    url: '/docs/:version/release-notes/8.0-compatibility',
                  },
                  {
                    label: 'Upgrade 7.0 to 8.0',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/release-notes/8.0-upgrade',
                    items: [
                      {
                        label: 'Standalone',
                        contentSite: 'docs',
                        url: '/docs/:version/release-notes/8.0-upgrade-standalone',
                      },
                      {
                        label: 'Replica Set',
                        contentSite: 'docs',
                        url: '/docs/:version/release-notes/8.0-upgrade-replica-set',
                      },
                      {
                        label: 'Sharded Cluster',
                        contentSite: 'docs',
                        url: '/docs/:version/release-notes/8.0-upgrade-sharded-cluster',
                      },
                    ],
                  },
                  {
                    label: 'Downgrade 8.0 to 7.0',
                    contentSite: 'docs',
                    url: '/docs/:version/release-notes/8.0-downgrade',
                  },
                  {
                    label: 'Changelog',
                    contentSite: 'docs',
                    url: '/docs/:version/release-notes/8.0-changelog',
                  },
                ],
              },
              {
                label: '7.0',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/:version/release-notes/7.0',
                items: [
                  {
                    label: 'Compatibility Changes',
                    contentSite: 'docs',
                    url: '/docs/:version/release-notes/7.0-compatibility',
                  },
                  {
                    label: 'Upgrade 6.0 to 7.0',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/release-notes/7.0-upgrade',
                    items: [
                      {
                        label: 'Standalone',
                        contentSite: 'docs',
                        url: '/docs/:version/release-notes/7.0-upgrade-standalone',
                      },
                      {
                        label: 'Replica Set',
                        contentSite: 'docs',
                        url: '/docs/:version/release-notes/7.0-upgrade-replica-set',
                      },
                      {
                        label: 'Sharded Cluster',
                        contentSite: 'docs',
                        url: '/docs/:version/release-notes/7.0-upgrade-sharded-cluster',
                      },
                    ],
                  },
                  {
                    label: 'Downgrade 7.0 to 6.0',
                    contentSite: 'docs',
                    url: '/docs/:version/release-notes/7.0-downgrade',
                  },
                  {
                    label: 'Changelog',
                    contentSite: 'docs',
                    url: '/docs/:version/release-notes/7.0-changelog',
                  },
                ],
              },
              {
                label: 'Versioning',
                contentSite: 'docs',
                url: '/docs/:version/reference/versioning',
              },
            ],
          },
          {
            label: 'Atlas Release Notes',
            contentSite: 'cloud-docs',
            collapsible: true,
            url: '/docs/atlas/release-notes',
            items: [
              {
                label: 'Atlas',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/release-notes/changelog',
              },
              {
                label: 'Atlas Data Federation',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/release-notes/data-federation',
              },
              {
                label: 'Atlas Kubernetes Operator',
                contentSite: 'atlas-operator',
                url: '/docs/atlas/operator/stable/ak8so-changelog/',
              },
              {
                label: 'Atlas Stream Processing',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-stream-processing/changelog',
              },
              {
                label: 'MongoDB Charts',
                contentSite: 'charts',
                url: '/docs/charts/release-notes/',
              },
            ],
          },
          {
            label: 'Search Release Notes',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/atlas-search/changelog',
          },
          {
            label: 'Vector Search Release Notes',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/atlas-vector-search/changelog',
          },
        ],
      },
    ],
  },
];
