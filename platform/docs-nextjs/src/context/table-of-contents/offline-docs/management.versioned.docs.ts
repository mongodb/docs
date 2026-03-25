import type { L1TocItem } from '../types';

export const toc: L1TocItem[] = [
  {
    label: 'Management',
    contentSite: 'landing',
    url: '/docs/management',
    items: [
      {
        label: 'MongoDB Atlas',
        contentSite: 'cloud-docs',
        group: true,
        items: [
          {
            label: 'Overview',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/',
          },
          {
            label: 'Atlas Users',
            contentSite: 'cloud-docs',
            collapsible: true,
            url: '/docs/atlas/access/manage-org-users',
            items: [
              {
                label: 'Atlas User Roles',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/reference/user-roles',
              },
              {
                label: 'Atlas Resource Policies',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-resource-policies',
              },
            ],
          },
          {
            label: 'Organizations',
            contentSite: 'cloud-docs',
            collapsible: true,
            items: [
              {
                label: 'Manage Organizations (Org CRUD)',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/access/orgs-create-view-edit-delete',
              },
              {
                label: 'Organization Security',
                contentSite: 'cloud-docs',
                collapsible: true,
                url: '/docs/atlas/management/organizations/organization-security',
                items: [
                  {
                    label: 'Federated',
                    contentSite: 'cloud-docs',
                    collapsible: true,
                    url: '/docs/atlas/security/federated-authentication',
                    items: [
                      {
                        label: 'Identity Providers',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/security/manage-federated-auth',
                      },
                      {
                        label: 'Domains',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/security/manage-domain-mapping',
                      },
                      {
                        label: 'Organizations',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/security/manage-org-mapping',
                      },
                      {
                        label: 'Roles',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/security/manage-role-mapping',
                      },
                      {
                        label: 'Microsoft Entra ID',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/security/federated-auth-azure-ad',
                      },
                      {
                        label: 'Google Workspace',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/security/federated-auth-google-ws',
                      },
                      {
                        label: 'Okta',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/security/federated-auth-okta',
                      },
                      {
                        label: 'PingOne',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/security/federated-auth-ping-one',
                      },
                      {
                        label: 'Advanced Options',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/security/federation-advanced-options',
                      },
                    ],
                  },
                  {
                    label: 'Multi-Factor',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/security-multi-factor-authentication',
                  },
                  {
                    label: 'Support Access',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/security-restrict-support-access',
                  },
                  {
                    label: 'Atlas CLI Authentication',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-ui-authentication',
                  },
                ],
              },
              {
                label: 'IP Access (UI and Admin API)',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/tutorial/manage-organizations/#require-ip-access-list-for-the-atlas-administration-api',
              },
              {
                label: 'Invitations',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/invitations',
              },
              {
                label: 'Teams',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/access/manage-teams-in-orgs',
              },
              {
                label: 'Activity Feed',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/tutorial/activity-feed',
              },
              {
                label: 'Settings',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/tutorial/manage-organization-settings',
              },
              {
                label: 'Account',
                contentSite: 'cloud-docs',
                collapsible: true,
                url: '/docs/atlas/management/organizations/atlas-account',
                items: [
                  {
                    label: 'Create an Account',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/tutorial/create-atlas-account/',
                  },
                  {
                    label: 'Manage Your Account',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/security/manage-your-mongodb-atlas-account',
                  },
                  {
                    label: 'Personalize the UI',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/personalization',
                  },
                ],
              },
            ],
          },
          {
            label: 'Projects',
            contentSite: 'cloud-docs',
            collapsible: true,
            items: [
              {
                label: 'Manage Projects (Project CRUD)',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/tutorial/manage-projects',
              },
              {
                label: 'Manage Project Users',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/access/manage-project-access',
              },
              {
                label: 'Configure Project Landing Page',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/project-overview',
              },
              {
                label: 'Settings',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/tutorial/manage-project-settings',
              },
              {
                label: 'User-Defined Tags',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/project-tags',
              },
            ],
          },
          {
            label: 'Clusters',
            contentSite: 'cloud-docs',
            collapsible: true,
            url: '/docs/atlas/create-connect-deployments',
            items: [
              {
                label: 'Cluster Types',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/create-database-deployment',
              },
              {
                label: 'Create a Cluster',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/tutorial/create-new-cluster',
              },
              {
                label: 'AI Cluster Assistant',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/ai-cluster-assistant',
              },
              {
                label: 'Create a Global Cluster',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/tutorial/create-global-cluster',
              },
              {
                label: 'Cloud Providers and Regions',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/cloud-providers-regions',
              },
              {
                label: 'Manage Clusters',
                contentSite: 'cloud-docs',
                collapsible: true,
                url: '/docs/atlas/manage-clusters',
                items: [
                  {
                    label: 'Storage',
                    contentSite: 'cloud-docs',
                    collapsible: true,
                    url: '/docs/atlas/customize-storage',
                    items: [
                      {
                        label: 'Encryption at Rest',
                        contentSite: 'cloud-docs',
                        collapsible: true,
                        url: '/docs/atlas/security-kms-encryption',
                        items: [
                          {
                            label: 'AWS KMS',
                            contentSite: 'cloud-docs',
                            collapsible: true,
                            url: '/docs/atlas/security-aws-kms',
                            items: [
                              {
                                label: 'Configure Access Over Public Network',
                                contentSite: 'cloud-docs',
                                url: '/docs/atlas/security/aws-kms-over-public-network',
                              },
                              {
                                label: 'Configure Access Over Private Endpoints',
                                contentSite: 'cloud-docs',
                                url: '/docs/atlas/security/aws-kms-over-private-endpoint',
                              },
                            ],
                          },
                          {
                            label: 'Azure Key Vault',
                            contentSite: 'cloud-docs',
                            collapsible: true,
                            url: '/docs/atlas/security-azure-kms',
                            items: [
                              {
                                label: 'Configure Access Over Public Network',
                                contentSite: 'cloud-docs',
                                url: '/docs/atlas/security/azure-kms-over-public-network',
                              },
                              {
                                label: 'Configure Access Over Private Endpoints',
                                contentSite: 'cloud-docs',
                                url: '/docs/atlas/security/azure-kms-over-private-endpoint',
                              },
                              {
                                label: 'Configure Secretless Access',
                                contentSite: 'cloud-docs',
                                url: '/docs/atlas/security/azure-kms-secretless',
                              },
                            ],
                          },
                          {
                            label: 'Google Cloud KMS',
                            contentSite: 'cloud-docs',
                            url: '/docs/atlas/security-gcp-kms',
                          },
                        ],
                      },
                      {
                        label: 'GridFS',
                        contentSite: 'docs',
                        url: '/docs/:version/core/gridfs',
                      },
                    ],
                  },
                  {
                    label: 'Cluster Sharding',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/cluster-sharding',
                  },
                  {
                    label: 'Auto-Scaling',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/cluster-autoscaling',
                  },
                  {
                    label: 'Write-Blocking',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/cluster-blocking-writes/',
                  },
                  {
                    label: 'Additional Settings',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/cluster-additional-settings',
                  },
                  {
                    label: 'Modify a Cluster',
                    contentSite: 'cloud-docs',
                    collapsible: true,
                    url: '/docs/atlas/scale-cluster',
                    items: [
                      {
                        label: 'Recover from an Outage',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/reconfigure-replica-set-during-regional-outage',
                      },
                    ],
                  },
                  {
                    label: 'Upgrade Major MongoDB Version',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/tutorial/major-version-change',
                  },
                  {
                    label: 'Downgrade Major MongoDB Version',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/tutorial/major-version-downgrade',
                  },
                  {
                    label: 'Maintenance Windows',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/tutorial/cluster-maintenance-window',
                  },
                  {
                    label: 'Stop, Start, or Delete',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/pause-terminate-cluster',
                  },
                  {
                    label: 'Restore a Free Tier Cluster',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/backup/restore-free-tier-cluster',
                  },
                  {
                    label: 'HA and Workload Isolation',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/cluster-config/multi-cloud-distribution',
                  },
                  {
                    label: 'Pre-Defined Tags',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/reference/replica-set-tags',
                  },
                  {
                    label: 'User-Defined Tags',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/database-deployment-tags',
                  },
                  {
                    label: 'Test Resilience',
                    contentSite: 'cloud-docs',
                    collapsible: true,
                    url: '/docs/atlas/tutorial/test-resilience',
                    items: [
                      {
                        label: 'Test Primary Failover',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/tutorial/test-resilience/test-primary-failover',
                      },
                      {
                        label: 'Simulate Regional Outage',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/tutorial/test-resilience/simulate-regional-outage',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Flex Clusters',
                contentSite: 'cloud-docs',
                collapsible: true,
                url: '/docs/atlas/manage-flex-clusters',
                items: [
                  {
                    label: 'Terminate',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/terminate-flex-clusters',
                  },
                ],
              },
              {
                label: 'Global Clusters',
                contentSite: 'cloud-docs',
                collapsible: true,
                url: '/docs/atlas/global-clusters',
                items: [
                  {
                    label: 'Shard a Global Collection',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/shard-global-collection',
                  },
                  {
                    label: 'Move a Cluster',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/tutorial/move-cluster',
                  },
                ],
              },
            ],
          },
          {
            label: 'Backup, Restore, and Archive',
            contentSite: 'cloud-docs',
            collapsible: true,
            url: '/docs/atlas/backup-restore-cluster',
            items: [
              {
                label: 'Backup',
                contentSite: 'cloud-docs',
                collapsible: true,
                url: '/docs/atlas/backup/cloud-backup/overview',
                items: [
                  {
                    label: 'Dedicated Cluster',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/backup/cloud-backup/dedicated-cluster-backup',
                  },
                  {
                    label: 'Flex Cluster',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/backup/cloud-backup/flex-cluster-backup',
                  },
                  {
                    label: 'Options',
                    contentSite: 'cloud-docs',
                    collapsible: true,
                    url: '/docs/atlas/backup/cloud-backup/scheduling',
                    items: [
                      {
                        label: 'Backup Policies',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/backup/cloud-backup/configure-backup-policy',
                      },
                      {
                        label: 'Snapshots',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/backup/cloud-backup/snapshot-management',
                      },
                      {
                        label: 'Copy to Region',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/backup/cloud-backup/snapshot-distribution',
                      },
                    ],
                  },
                  {
                    label: 'Compliance Policies',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/backup/cloud-backup/backup-compliance-policy',
                  },
                ],
              },
              {
                label: 'Encryption',
                contentSite: 'cloud-docs',
                collapsible: true,
                url: '/docs/atlas/backup/cloud-backup/cloud-backup-encryption',
                items: [
                  {
                    label: 'Access Encrypted Snapshots',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/tutorial/access-encrypted-snapshot',
                  },
                  {
                    label: 'Restore Using Encryption at Rest',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/backup/cloud-backup/restore-from-ear',
                  },
                ],
              },
              {
                label: 'Export Snapshots',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/backup/cloud-backup/export',
              },
              {
                label: 'Restore Sources',
                contentSite: 'cloud-docs',
                collapsible: true,
                url: '/docs/atlas/backup/cloud-backup/restore-overview',
                items: [
                  {
                    label: 'Restore from Snapshot',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/backup/cloud-backup/restore-from-snapshot',
                  },
                  {
                    label: 'Restore from Continuous Cloud Backup',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/backup/cloud-backup/restore-from-continuous',
                  },
                  {
                    label: 'Restore from Local Download',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/backup/cloud-backup/restore-from-local-file',
                  },
                  {
                    label: 'Restore from Cloud Manager Snapshot',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/backup/cloud-backup/restore-from-cloud-manager',
                  },
                ],
              },
              {
                label: 'Import Archives',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/backup/cloud-backup/import-archive',
              },
              {
                label: 'Online Archive',
                contentSite: 'cloud-docs',
                collapsible: true,
                url: '/docs/atlas/online-archive/overview',
                items: [
                  {
                    label: 'Configure Online Archive',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/online-archive/configure-online-archive',
                  },
                  {
                    label: 'Set Up a Private Endpoint',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/online-archive/config-private-endpoint',
                  },
                  {
                    label: 'Connect to Online Archive',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/online-archive/connect-to-online-archive',
                  },
                  {
                    label: 'Manage Online Archives',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/online-archive/manage-online-archive',
                  },
                  {
                    label: 'Manage Private Endpoints',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/online-archive/view-private-endpoints',
                  },
                  {
                    label: 'Pause and Resume',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/online-archive/pause-resume-online-archive',
                  },
                  {
                    label: 'Back Up and Restore',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/online-archive/config-backup-online-archive',
                  },
                  {
                    label: 'Granular Restore',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/online-archive/restore-archived-data-with-merge',
                  },
                  {
                    label: 'Download Query Logs',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/online-archive/download-query-logs',
                  },
                ],
              },
            ],
          },
          {
            label: 'Sample Data',
            contentSite: 'cloud-docs',
            collapsible: true,
            url: '/docs/atlas/sample-data',
            items: [
              {
                label: 'Load Sample Data',
                contentSite: 'cloud-docs',
                collapsible: true,
                items: [
                  {
                    label: 'Atlas',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/sample-data/load-sample-data/',
                  },
                  {
                    label: 'Self-Managed Deployments',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/sample-data/load-sample-data-local/',
                  },
                ],
              },
              {
                label: 'Sample Airbnb',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/sample-data/sample-airbnb/',
              },
              {
                label: 'Sample Analytics',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/sample-data/sample-analytics/',
              },
              {
                label: 'Sample Geospatial',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/sample-data/sample-geospatial/',
              },
              {
                label: 'Sample Guides',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/sample-data/sample-guides/',
              },
              {
                label: 'Sample Mflix',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/sample-data/sample-mflix/',
              },
              {
                label: 'Sample Restaurants',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/sample-data/sample-restaurants/',
              },
              {
                label: 'Sample Supplies',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/sample-data/sample-supplies/',
              },
              {
                label: 'Sample Training',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/sample-data/sample-training/',
              },
              {
                label: 'Sample Weather',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/sample-data/sample-weather/',
              },
              {
                label: 'Synthetic Data',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/synthetic-data/',
              },
            ],
          },
          {
            label: 'Migrate or Import Data',
            contentSite: 'cloud-docs',
            collapsible: true,
            url: '/docs/atlas/import',
            items: [
              {
                label: 'Monitor Migrations',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/import/monitor-migrations',
              },
              {
                label: 'Verify Migrations',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/import/live-migration-verification',
              },
              {
                label: 'Live Migrate a Cluster',
                contentSite: 'cloud-docs',
                collapsible: true,
                url: '/docs/atlas/live-migration',
                items: [
                  {
                    label: 'Pull into Atlas',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/import/c2c-pull-live-migration',
                  },
                  {
                    label: 'Push from Cloud Manager',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/import/c2c-push-live-migration',
                  },
                  {
                    label: 'Sharding Example',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/import/live-migration-example',
                  },
                ],
              },
              {
                label: 'Standalone Mongosync',
                isExternal: true,
                url: 'https://www.mongodb.com/docs/mongosync/current/reference/mongosync-binary/#mongosync',
              },
              {
                label: 'Compare Migration Methods',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/import/live-migration-comparison-modes',
              },
              {
                label: 'Troubleshoot Live Migration',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/import/live-migration-troubleshooting',
              },
            ],
          },
          {
            label: 'Monitor Clusters',
            contentSite: 'cloud-docs',
            collapsible: true,
            url: '/docs/atlas/monitoring-alerts',
            items: [
              {
                label: 'Analyze Slow Queries',
                contentSite: 'cloud-docs',
                collapsible: true,
                url: '/docs/atlas/analyze-slow-queries',
                items: [
                  {
                    label: 'Performance Advisor',
                    contentSite: 'cloud-docs',
                    collapsible: true,
                    url: '/docs/atlas/performance-advisor',
                    items: [
                      {
                        label: 'Index Ranking',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/performance-advisor/index-ranking',
                      },
                      {
                        label: 'Drop Index Suggestions',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/performance-advisor/drop-indexes',
                      },
                      {
                        label: 'Enable or Disable',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/performance-advisor/enable-disable',
                      },
                      {
                        label: 'Access with MCP Server',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/performance-advisor/access-with-mcp',
                      },
                    ],
                  },
                  {
                    label: 'Query Shape Insights',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/query-shape-insights',
                  },
                  {
                    label: 'Query Latency',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/namespace-insights',
                  },
                  {
                    label: 'Query Performance',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/tutorial/query-profiler',
                  },
                  {
                    label: 'Real-Time Performance',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/real-time-performance-panel',
                  },
                  {
                    label: 'Search Performance',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/performance-advisor/recommend-search-text',
                  },
                ],
              },
              {
                label: 'Configure and Resolve Alerts',
                contentSite: 'cloud-docs',
                collapsible: true,
                url: '/docs/atlas/alerts',
                items: [
                  {
                    label: 'Alert Basics',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/alert-basics',
                  },
                  {
                    label: 'Review Alert Conditions',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/reference/alert-conditions',
                  },
                  {
                    label: 'Configure Alert Settings',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/configure-alerts',
                  },
                  {
                    label: 'Resolve Alerts',
                    contentSite: 'cloud-docs',
                    collapsible: true,
                    url: '/docs/atlas/alert-resolutions',
                    items: [
                      {
                        label: 'Auto-scaling',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/reference/alert-resolutions/atlas-autoscaling-alerts',
                      },
                      {
                        label: 'Atlas Search',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/reference/alert-resolutions/atlas-search-alerts',
                      },
                      {
                        label: 'Connection',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/reference/alert-resolutions/connection-alerts',
                      },
                      {
                        label: 'IOPS',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/reference/alert-resolutions/disk-io-utilization',
                      },
                      {
                        label: 'Storage',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/reference/alert-resolutions/disk-space-used',
                      },
                      {
                        label: 'Query',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/reference/alert-resolutions/query-targeting',
                      },
                      {
                        label: 'Lost Primary',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/reference/alert-resolutions/no-primary',
                      },
                      {
                        label: 'Oplog',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/reference/alert-resolutions/replication-oplog',
                      },
                      {
                        label: 'CPU Usage',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/reference/alert-resolutions/system-cpu-usage',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Review Metrics',
                contentSite: 'cloud-docs',
                collapsible: true,
                url: '/docs/atlas/monitor-cluster-metrics',
                items: [
                  {
                    label: 'Project Overview',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/review-all-cluster-metrics',
                  },
                  {
                    label: 'Flex Clusters',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/review-flex-metrics',
                  },
                  {
                    label: 'Replica Sets',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/review-replica-set-metrics',
                  },
                  {
                    label: 'Sharded Clusters',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/review-sharded-cluster-metrics',
                  },
                  {
                    label: 'Processes',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/review-mongodb-process-metrics',
                  },
                  {
                    label: 'Real-Time Metrics',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/review-real-time-metrics',
                  },
                  {
                    label: 'Atlas Search',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/review-atlas-search-metrics',
                  },
                  {
                    label: 'Available Metrics',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/review-available-metrics',
                  },
                ],
              },
              {
                label: 'Third-Party Services',
                contentSite: 'cloud-docs',
                collapsible: true,
                url: '/docs/atlas/tutorial/third-party-service-integrations',
                items: [
                  {
                    label: 'Datadog',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/tutorial/datadog-integration',
                  },
                  {
                    label: 'Microsoft Teams',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/tutorial/integrate-msft-teams',
                  },
                  {
                    label: 'PagerDuty',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/tutorial/pagerduty-integration',
                  },
                  {
                    label: 'Prometheus',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/tutorial/prometheus-integration',
                  },
                ],
              },
              {
                label: 'Auditing',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/database-auditing',
              },
              {
                label: 'Access History',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/access-tracking',
              },
              {
                label: 'Review and Download Logs',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/mongodb-logs',
              },
              {
                label: 'Export Logs',
                contentSite: 'cloud-docs',
                collapsible: true,
                items: [
                  {
                    label: 'Export Logs to AWS S3',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/export-logs-external-sinks',
                  },
                  {
                    label: 'Export Logs to Azure Blob Storage',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/export-logs-azure',
                  },
                  {
                    label: 'Export Logs to Datadog',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/export-logs-datadog',
                  },
                  {
                    label: 'Export Logs to Google Cloud Storage',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/export-logs-gcs',
                  },
                  {
                    label: 'Export Logs to OpenTelemetry',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/export-logs-otel',
                  },
                  {
                    label: 'Export Logs to Splunk',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/export-logs-splunk',
                  },
                ],
              },
              {
                label: 'Push MongoDB Logs to AWS S3',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/push-logs',
              },
            ],
          },
          {
            label: 'Manage Billing',
            contentSite: 'cloud-docs',
            collapsible: true,
            url: '/docs/atlas/billing/',
            items: [
              {
                label: 'Invoices',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/billing/invoices',
              },
              {
                label: 'Invoice Breakdown',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/billing/invoice-breakdown',
              },
              {
                label: 'Subscriptions',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/billing/subscriptions',
              },
              {
                label: 'Billing Breakdown and Optimization',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/billing/billing-breakdown-optimization',
              },
              {
                label: 'Cluster Configuration',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/billing/cluster-configuration-costs',
              },
              {
                label: 'Atlas Flex Costs',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/billing/atlas-flex-costs',
              },
              {
                label: 'Data Federation',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/billing/data-federation',
              },
              {
                label: 'Data Transfer',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/billing/data-transfer-costs',
              },
              {
                label: 'AI Models',
                contentSite: 'voyageai',
                url: '/docs/voyageai/management/billing',
              },
              {
                label: 'Stream Processing',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/billing/stream-processing-costs',
              },
              {
                label: 'Online Archive',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/billing/online-archive',
              },
              {
                label: 'Search Nodes',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/billing/search-node',
              },
              {
                label: 'AWS Marketplace',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/billing/aws-self-serve-marketplace',
              },
              {
                label: 'Azure Marketplace',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/billing/azure-self-serve-marketplace',
              },
              {
                label: 'GCP Marketplace',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/billing/gcp-self-serve-marketplace',
              },
              {
                label: 'Additional Services',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/billing/additional-services',
              },
              {
                label: 'International Usage & Taxes',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/billing/international-usage',
              },
            ],
          },
          {
            label: 'Explore Your Data',
            contentSite: 'cloud-docs',
            collapsible: true,
            url: '/docs/atlas/atlas-ui',
            items: [
              {
                label: 'AI & Data Usage',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/ai-and-data-usage-information',
              },
              {
                label: 'Databases',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-ui/databases',
              },
              {
                label: 'Collections',
                contentSite: 'cloud-docs',
                collapsible: true,
                url: '/docs/atlas/atlas-ui/collections',
                items: [
                  {
                    label: 'Collections with Collation',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-ui/collections/collation-collection',
                  },
                  {
                    label: 'Clustered Collections',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-ui/collections/clustered-collection',
                  },
                  {
                    label: 'Time Series Collections',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-ui/collections/time-series-collection',
                  },
                ],
              },
              {
                label: 'Views',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-ui/views',
              },
              {
                label: 'Documents',
                contentSite: 'cloud-docs',
                collapsible: true,
                url: '/docs/atlas/atlas-ui/documents',
                items: [
                  {
                    label: 'Modify Multiple',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-ui/documents/modify-multiple',
                  },
                  {
                    label: 'Delete Multiple',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-ui/documents/delete-multiple',
                  },
                ],
              },
              {
                label: 'Query',
                contentSite: 'cloud-docs',
                collapsible: true,
                url: '/docs/atlas/atlas-ui/query/filter',
                items: [
                  {
                    label: 'Set Returned Fields',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-ui/query/project',
                  },
                  {
                    label: 'Sort Returned Documents',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-ui/query/sort',
                  },
                  {
                    label: 'Adjust Maximum Time',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-ui/query/maxtimems',
                  },
                  {
                    label: 'Specify Collation',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-ui/query/collation',
                  },
                  {
                    label: 'Skip Documents',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-ui/query/skip',
                  },
                  {
                    label: 'Limit Results',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-ui/query/limit',
                  },
                  {
                    label: 'View Query Performance',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-ui/query-plan',
                  },
                  {
                    label: 'Export to a Language',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-ui/export-query-to-language',
                  },
                  {
                    label: 'Manage Saved Queries',
                    contentSite: 'cloud-docs',
                    collapsible: true,
                    url: '/docs/atlas/atlas-ui/query/saved-queries',
                    items: [
                      {
                        label: 'View Recent Queries',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/atlas-ui/query/recent',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Query with Natural Language',
                contentSite: 'cloud-docs',
                collapsible: true,
                url: '/docs/atlas/atlas-ui/query-with-natural-language',
                items: [
                  {
                    label: 'Enable',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-ui/query-with-natural-language/enable-natural-language-querying',
                  },
                  {
                    label: 'Prompt Query',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-ui/query-with-natural-language/prompt-natural-language-query',
                  },
                  {
                    label: 'Prompt Aggregation',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-ui/query-with-natural-language/prompt-natural-language-aggregation',
                  },
                  {
                    label: 'Intelligent Assistant in Data Explorer',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-ui/query-with-natural-language/data-explorer-ai-assistant',
                  },
                ],
              },
              {
                label: 'Indexes',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-ui/indexes',
              },
              {
                label: 'Aggregation Pipelines',
                contentSite: 'cloud-docs',
                collapsible: true,
                url: '/docs/atlas/atlas-ui/create-agg-pipeline',
                items: [
                  {
                    label: 'Save a Pipeline',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-ui/agg-pipeline-builder/save-agg-pipeline',
                  },
                  {
                    label: 'Open a Pipeline',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-ui/agg-pipeline-builder/open-saved-pipeline',
                  },
                  {
                    label: 'View Explain Plans',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-ui/agg-pipeline-builder/view-pipeline-explain-plan',
                  },
                  {
                    label: 'Export to a Language',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-ui/agg-pipeline-builder/export-pipeline-to-language',
                  },
                  {
                    label: 'Create a View',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-ui/agg-pipeline-builder/create-a-view',
                  },
                  {
                    label: 'Count Results',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-ui/agg-pipeline-builder/count-pipeline-results',
                  },
                  {
                    label: 'Specify Collation',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-ui/agg-pipeline-builder/pipeline-custom-collation',
                  },
                  {
                    label: 'Set Max Time MS',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-ui/agg-pipeline-builder/maxtime-ms-pipeline',
                  },
                  {
                    label: 'Builder Settings',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-ui/agg-pipeline-builder/aggregation-pipeline-builder-settings',
                  },
                ],
              },
              {
                label: 'Visualize Your Data Model',
                contentSite: 'cloud-docs',
                collapsible: true,
                url: '/docs/atlas/atlas-ui/data-modeling',
                items: [
                  {
                    label: 'Generate Diagram',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-ui/data-modeling/generate-diagram',
                  },
                  {
                    label: 'Modify Collections',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-ui/data-modeling/modify-collections',
                  },
                  {
                    label: 'Modify Fields',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-ui/data-modeling/modify-fields',
                  },
                  {
                    label: 'Manage Relationships',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-ui/data-modeling/relationships',
                  },
                  {
                    label: 'Export Diagram',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-ui/data-modeling/export-diagram',
                  },
                  {
                    label: 'Import Diagram',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-ui/data-modeling/import-diagram',
                  },
                ],
              },
              {
                label: 'Data Schema',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-ui/schema',
              },
              {
                label: 'Performance Insights',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-ui/performance-insights',
              },
              {
                label: 'Validation Rules',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-ui/validation',
              },
              {
                label: 'Sampling',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-ui/sampling',
              },
              {
                label: 'Triggers',
                isExternal: true,
                url: 'https://www.mongodb.com/docs/atlas/atlas-ui/triggers',
              },
              {
                label: 'Troubleshoot',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-ui/troubleshoot',
              },
            ],
          },
          {
            label: 'Production Notes',
            contentSite: 'cloud-docs',
            collapsible: true,
            url: '/docs/atlas/production-notes',
            items: [
              {
                label: 'Cluster Sizing and Tiers',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/sizing-tier-selection',
              },
              {
                label: 'Build a Resilient Application',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/resilient-application',
              },
              {
                label: 'Recover a Point in Time',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/recover-pit-continuous-cloud-backup',
              },
              {
                label: 'Multi-Tenant Architecture',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/build-multi-tenant-arch',
              },
            ],
          },
          {
            label: 'Reference',
            contentSite: 'cloud-docs',
            collapsible: true,
            url: '/docs/atlas/reference',
            items: [
              {
                label: 'UI Shortcuts',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/reference/atlas-go-to',
              },
              {
                label: 'Cloud Providers',
                contentSite: 'cloud-docs',
                collapsible: true,
                url: '/docs/atlas/reference/cloud-providers',
                items: [
                  {
                    label: 'Amazon Web Services',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/reference/amazon-aws',
                  },
                  {
                    label: 'Google Cloud Platform',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/reference/google-gcp',
                  },
                  {
                    label: 'Microsoft Azure',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/reference/microsoft-azure',
                  },
                ],
              },
              {
                label: 'Limits',
                contentSite: 'cloud-docs',
                collapsible: true,
                url: '/docs/atlas/reference/limitations',
                items: [
                  {
                    label: 'Service Limits',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/reference/atlas-limits',
                  },
                  {
                    label: 'Flex Cluster Limits',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/reference/flex-limitations',
                  },
                  {
                    label: 'Free Cluster Limits',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/reference/free-shared-limitations',
                  },
                  {
                    label: 'Unsupported Commands',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/unsupported-commands',
                  },
                  {
                    label: 'Supported Commands',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/free-tier-commands',
                  },
                ],
              },
              {
                label: 'Oplog Access',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/reference/atlas-oplog',
              },
              {
                label: 'Event Types',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/reference/atlas-alert-event-types',
              },
              {
                label: 'Host Metrics',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/reference/alert-host-metrics',
              },
              {
                label: 'Resource Tags',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/tags',
              },
              {
                label: 'Supported Browsers',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/reference/supported-browsers',
              },
              {
                label: 'Internal Databases',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/reference/internal-database',
              },
              {
                label: 'Data Usage for AI Cluster Assistant',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/reference/data-usage-cluster-ai-assistant',
              },
              {
                label: 'Frequently Asked Questions',
                contentSite: 'cloud-docs',
                collapsible: true,
                url: '/docs/atlas/faq',
                items: [
                  {
                    label: 'FAQ: Accounts',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/reference/faq/accounts',
                  },
                  {
                    label: 'FAQ: Applications',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/reference/faq/applications',
                  },
                  {
                    label: 'FAQ: Atlas Search',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-search/faq',
                  },
                  {
                    label: 'FAQ: Backup',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/reference/faq/backup',
                  },
                  {
                    label: 'FAQ: Billing',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/reference/faq/billing',
                  },
                  {
                    label: 'FAQ: Connection Strings',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/reference/faq/connection-changes',
                  },
                  {
                    label: 'FAQ: Databases',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/reference/faq/database',
                  },
                  {
                    label: 'FAQ: Deployment',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/reference/faq/deployment',
                  },
                  {
                    label: 'FAQ: Monitoring and Alerts',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/reference/faq/monitoring-alerts',
                  },
                  {
                    label: 'FAQ: Navigation Improvements',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/reference/faq/nav-improvements',
                  },
                  {
                    label: 'FAQ: Networking',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/reference/faq/networking',
                  },
                  {
                    label: 'FAQ: Security',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/reference/faq/security',
                  },
                  {
                    label: 'FAQ: Storage',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/reference/faq/storage',
                  },
                  {
                    label: 'FAQ: Support',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/reference/faq/support',
                  },
                ],
              },
            ],
          },
          {
            label: 'APIs',
            contentSite: 'cloud-docs',
            collapsible: true,
            url: '/docs/atlas/api',
            items: [
              {
                label: 'Administration API',
                contentSite: 'cloud-docs',
                collapsible: true,
                url: '/docs/atlas/api/atlas-admin-api',
                items: [
                  {
                    label: 'Get Started',
                    contentSite: 'cloud-docs',
                    collapsible: true,
                    url: '/docs/atlas/configure-api-access',
                    items: [
                      {
                        label: 'Organization Access',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/configure-api-access-org',
                      },
                      {
                        label: 'Multiple Organizations',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/configure-api-access-mult-org',
                      },
                      {
                        label: 'Project Access',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/configure-api-access-project',
                      },
                    ],
                  },
                  {
                    label: 'Admin API Overview',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/api/atlas-admin-api-ref',
                  },
                  {
                    label: 'API Authentication Methods',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/api/api-authentication',
                  },
                  {
                    label: 'Rotate Service Account Secrets',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/tutorial/rotate-service-account-secrets',
                  },
                  {
                    label: 'API Rate Limits',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/api/api-rate-limit',
                  },
                  {
                    label: 'Versioning Overview',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/api/versioned-api-overview',
                  },
                  {
                    label: 'Migrate to New API Version',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/api/migrate-to-new-version',
                  },
                  {
                    label: 'API Upgrades',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/api/api-upgrades',
                  },
                  {
                    label: 'v2.0 API Specification',
                    isExternal: true,
                    url: 'https://www.mongodb.com/docs/api/doc/atlas-admin-api-v2/',
                  },
                  {
                    label: 'V1.0 API Specification',
                    isExternal: true,
                    url: 'https://www.mongodb.com/docs/api/doc/atlas-admin-api-v1/',
                  },
                  {
                    label: 'Versioned API Changelog',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/reference/api-resources-spec/changelog',
                  },
                  {
                    label: 'API Error Codes',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/reference/api-errors',
                  },
                  {
                    label: 'Atlas Go SDK',
                    contentSite: 'cloud-docs',
                    collapsible: true,
                    url: '/docs/atlas/sdk',
                    items: [
                      {
                        label: 'Authentication',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/sdk/go/authentication',
                      },
                      {
                        label: 'Fundamentals',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/sdk/go/concepts',
                      },
                      {
                        label: 'Error Handling',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/sdk/go/error_handling',
                      },
                      {
                        label: 'Migration',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/sdk/go/migration',
                      },
                      {
                        label: 'Best Practices',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/sdk/go/best_practices',
                      },
                      {
                        label: 'Reference',
                        isExternal: true,
                        url: 'https://github.com/mongodb/atlas-sdk-go/blob/main/docs/doc_last_reference.md',
                      },
                    ],
                  },
                  {
                    label: 'More API Resources',
                    contentSite: 'cloud-docs',
                    collapsible: true,
                    url: '/docs/atlas/reference/more-api-resources',
                    items: [
                      {
                        label: 'Return the Latest Targets for Prometheus',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/reference/third-party-integration-settings-discovery',
                      },
                      {
                        label: 'Custom Role Actions',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/reference/custom-role-actions',
                      },
                      {
                        label: 'Generate Service Account Token',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/api/service-accounts/generate-oauth2-token',
                      },
                      {
                        label: 'Revoke Service Account Token',
                        contentSite: 'cloud-docs',
                        url: '/docs/atlas/api/service-accounts/revoke-oauth2-token',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Embedding and Reranking API',
                contentSite: 'voyageai',
                url: '/docs/voyageai/api-reference/overview/',
              },
              {
                label: 'MongoDB Cloud Status API',
                isExternal: true,
                url: 'https://www.mongodb.com/docs/api/doc/cloud-status/',
              },
            ],
          },
          {
            label: 'Release Notes',
            isExternal: true,
            url: 'https://www.mongodb.com/docs/atlas/release-notes/',
          },
        ],
      },
      {
        label: 'Self-Managed Deployments',
        contentSite: 'docs',
        group: true,
        versionDropdown: true,
        items: [
          {
            label: 'Installation',
            contentSite: 'docs',
            collapsible: true,
            url: '/docs/:version/installation',
            items: [
              {
                label: 'Community Edition',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/:version/administration/install-community',
                items: [
                  {
                    label: 'Install on Linux',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/administration/install-on-linux',
                    versions: {
                      excludes: ['manual', 'upcoming'],
                    },
                    items: [
                      {
                        label: 'Install on Red Hat',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/install-mongodb-on-red-hat',
                      },
                      {
                        label: 'Install on Ubuntu',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/:version/tutorial/install-mongodb-on-ubuntu',
                        items: [
                          {
                            label: 'Troubleshoot Ubuntu Installation',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/installation-ubuntu-community-troubleshooting',
                          },
                        ],
                      },
                      {
                        label: 'Install on Debian',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/install-mongodb-on-debian',
                      },
                      {
                        label: 'Install on SUSE',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/install-mongodb-on-suse',
                      },
                      {
                        label: 'Install on Amazon',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/install-mongodb-on-amazon',
                      },
                    ],
                  },
                  {
                    label: 'Install on macOS',
                    contentSite: 'docs',
                    url: '/docs/:version/tutorial/install-mongodb-on-os-x',
                    versions: {
                      excludes: ['manual', 'upcoming'],
                    },
                  },
                  {
                    label: 'Install on Windows',
                    contentSite: 'docs',
                    url: '/docs/:version/tutorial/install-mongodb-on-windows',
                    versions: {
                      excludes: ['manual', 'upcoming'],
                    },
                  },
                  {
                    label: 'Install with Docker',
                    contentSite: 'docs',
                    url: '/docs/:version/tutorial/install-mongodb-community-with-docker',
                    versions: {
                      excludes: ['manual', 'upcoming'],
                    },
                  },
                  {
                    label: 'Troubleshoot Ubuntu Installation',
                    contentSite: 'docs',
                    url: '/docs/:version/reference/installation-ubuntu-community-troubleshooting',
                    versions: {
                      includes: ['manual', 'upcoming'],
                    },
                  },
                  {
                    label: 'Connect to Search',
                    contentSite: 'docs',
                    url: '/docs/:version/core/search-in-community/connect-to-search',
                    versions: {
                      excludes: ['v7.0', 'v8.0'],
                    },
                  },
                  {
                    label: 'Deploy Replica Set for Search',
                    contentSite: 'docs',
                    url: '/docs/:version/core/search-in-community/deploy-rs-keyfile-mongot',
                    versions: {
                      excludes: ['v7.0', 'v8.0'],
                    },
                  },
                ],
              },
              {
                label: 'Enterprise',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/:version/administration/install-enterprise',
                items: [
                  {
                    label: 'Install on Linux',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/administration/install-enterprise-linux',
                    items: [
                      {
                        label: 'Install on Red Hat',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/:version/tutorial/install-mongodb-enterprise-on-red-hat',
                        items: [
                          {
                            label: 'Install using .tgz Tarball',
                            contentSite: 'docs',
                            url: '/docs/:version/tutorial/install-mongodb-enterprise-on-red-hat-tarball',
                          },
                        ],
                      },
                      {
                        label: 'Install on Ubuntu',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/:version/tutorial/install-mongodb-enterprise-on-ubuntu',
                        items: [
                          {
                            label: 'Install using .tgz Tarball',
                            contentSite: 'docs',
                            url: '/docs/:version/tutorial/install-mongodb-enterprise-on-ubuntu-tarball',
                          },
                        ],
                      },
                      {
                        label: 'Install on Debian',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/:version/tutorial/install-mongodb-enterprise-on-debian',
                        items: [
                          {
                            label: 'Install using .tgz Tarball',
                            contentSite: 'docs',
                            url: '/docs/:version/tutorial/install-mongodb-enterprise-on-debian-tarball',
                          },
                        ],
                      },
                      {
                        label: 'Install on SUSE',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/:version/tutorial/install-mongodb-enterprise-on-suse',
                        items: [
                          {
                            label: 'Install using .tgz Tarball',
                            contentSite: 'docs',
                            url: '/docs/:version/tutorial/install-mongodb-enterprise-on-suse-tarball',
                          },
                        ],
                      },
                      {
                        label: 'Install on Amazon',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/:version/tutorial/install-mongodb-enterprise-on-amazon',
                        items: [
                          {
                            label: 'Install using .tgz Tarball',
                            contentSite: 'docs',
                            url: '/docs/:version/tutorial/install-mongodb-enterprise-on-amazon-tarball',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    label: 'Install on macOS',
                    contentSite: 'docs',
                    url: '/docs/:version/tutorial/install-mongodb-enterprise-on-os-x',
                  },
                  {
                    label: 'Install on Windows',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/tutorial/install-mongodb-enterprise-on-windows',
                    items: [
                      {
                        label: 'Install using msiexec.exe',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/install-mongodb-enterprise-on-windows-unattended',
                      },
                      {
                        label: 'Install From Zip File',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/install-mongodb-enterprise-on-windows-zip',
                      },
                    ],
                  },
                  {
                    label: 'Install with Docker',
                    contentSite: 'docs',
                    url: '/docs/:version/tutorial/install-mongodb-enterprise-with-docker',
                  },
                ],
              },
              {
                label: 'Upgrade Community to Enterprise',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/:version/administration/upgrade-community-to-enterprise',
                items: [
                  {
                    label: 'Standalone',
                    contentSite: 'docs',
                    url: '/docs/:version/tutorial/upgrade-to-enterprise-standalone',
                  },
                  {
                    label: 'Replica Set',
                    contentSite: 'docs',
                    url: '/docs/:version/tutorial/upgrade-to-enterprise-replica-set',
                  },
                  {
                    label: 'Sharded Cluster',
                    contentSite: 'docs',
                    url: '/docs/:version/tutorial/upgrade-to-enterprise-sharded-cluster',
                  },
                ],
              },
              {
                label: 'Verify Package Integrity',
                contentSite: 'docs',
                collapsible: true,
                versions: {
                  excludes: ['v7.0', 'v8.0'],
                },
                items: [
                  {
                    label: 'Verify MongoDB Package Integrity',
                    contentSite: 'docs',
                    url: '/docs/:version/tutorial/verify-mongodb-packages',
                  },
                  {
                    label: 'Verify mongot Package Integrity',
                    contentSite: 'docs',
                    url: '/docs/:version/core/search-in-community/verify-mongot-packages',
                  },
                ],
              },
              {
                label: 'MongoDB Package Components',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/:version/reference/program',
                items: [
                  {
                    label: 'mongod',
                    contentSite: 'docs',
                    url: '/docs/:version/reference/program/mongod',
                  },
                  {
                    label: 'mongos',
                    contentSite: 'docs',
                    url: '/docs/:version/reference/program/mongos',
                  },
                  {
                    label: 'mongod.exe',
                    contentSite: 'docs',
                    url: '/docs/:version/reference/program/mongod.exe',
                  },
                  {
                    label: 'mongos.exe',
                    contentSite: 'docs',
                    url: '/docs/:version/reference/program/mongos.exe',
                  },
                  {
                    label: 'mongokerberos',
                    contentSite: 'docs',
                    url: '/docs/:version/reference/program/mongokerberos',
                  },
                  {
                    label: 'mongoldap',
                    contentSite: 'docs',
                    url: '/docs/:version/reference/program/mongoldap',
                  },
                  {
                    label: 'install_compass',
                    contentSite: 'docs',
                    url: '/docs/:version/reference/program/install_compass',
                  },
                  {
                    label: 'Database Tools',
                    isExternal: true,
                    url: 'https://www.mongodb.com/docs/database-tools/',
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
                    url: '/docs/:version/core/replica-set-architectures',
                    items: [
                      {
                        label: 'Three Members',
                        contentSite: 'docs',
                        url: '/docs/:version/core/replica-set-architecture-three-members',
                      },
                      {
                        label: 'Distributed Data Centers',
                        contentSite: 'docs',
                        url: '/docs/:version/core/replica-set-architecture-geographically-distributed',
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
                    label: 'Replica Set Deployment Tutorials',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/administration/replica-set-deployment',
                    items: [
                      {
                        label: 'Deploy a Replica Set',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/deploy-replica-set',
                      },
                      {
                        label: 'Deploy a Replica Set for Testing and Development',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/deploy-replica-set-for-testing',
                      },
                      {
                        label: 'Deploy a Geographically Redundant Replica Set',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/deploy-geographically-distributed-replica-set',
                      },
                      {
                        label: 'Add an Arbiter to a Replica Set',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/add-replica-set-arbiter',
                      },
                      {
                        label: 'Convert a Standalone mongod to a Replica Set',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/convert-standalone-to-replica-set',
                      },
                      {
                        label: 'Add Members to a Replica Set',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/expand-replica-set',
                      },
                      {
                        label: 'Remove Members from a Replica Set',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/remove-replica-set-member',
                      },
                      {
                        label: 'Replace a Replica Set Member',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/replace-replica-set-member',
                      },
                    ],
                  },
                  {
                    label: 'Member Configuration Tutorials',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/administration/replica-set-member-configuration',
                    items: [
                      {
                        label: 'Adjust Priority for Replica Set Member',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/adjust-replica-set-member-priority',
                      },
                      {
                        label: 'Prevent Secondary from Becoming Primary',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/configure-secondary-only-replica-set-member',
                      },
                      {
                        label: 'Configure a Hidden Replica Set Member',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/configure-a-hidden-replica-set-member',
                      },
                      {
                        label: 'Configure a Delayed Replica Set Member',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/configure-a-delayed-replica-set-member',
                      },
                      {
                        label: 'Configure Non-Voting Replica Set Member',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/configure-a-non-voting-replica-set-member',
                      },
                      {
                        label: 'Convert a Secondary to an Arbiter',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/convert-secondary-into-arbiter',
                      },
                    ],
                  },
                  {
                    label: 'Replica Set Maintenance Tutorials',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/administration/replica-set-maintenance',
                    items: [
                      {
                        label: 'Change the Size of the Oplog',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/change-oplog-size',
                      },
                      {
                        label: 'Perform Maintenance on Replica Set Members',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/perform-maintence-on-replica-set-members',
                      },
                      {
                        label: 'Force a Member to Become Primary',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/force-member-to-be-primary',
                      },
                      {
                        label: 'Resync a Member of a Replica Set',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/resync-replica-set-member',
                      },
                      {
                        label: 'Configure Replica Set Tag Sets',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/configure-replica-set-tag-sets',
                      },
                      {
                        label: 'Reconfigure a Replica Set with Unavailable Members',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/reconfigure-replica-set-with-unavailable-members',
                      },
                      {
                        label: 'Manage Chained Replication',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/manage-chained-replication',
                      },
                      {
                        label: 'Change Hostnames in a Replica Set',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/change-hostnames-in-a-replica-set',
                      },
                      {
                        label: 'Configure a Secondary\'s Sync Target',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/configure-replica-set-secondary-sync-target',
                      },
                      {
                        label: 'Rename a Replica Set',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/rename-unsharded-replica-set',
                      },
                      {
                        label: 'Modify PSA Replica Set Safely',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/modify-psa-replica-set-safely',
                      },
                      {
                        label: 'Mitigate Performance Issues with PSA Replica Set',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/mitigate-psa-performance-issues',
                      },
                    ],
                  },
                  {
                    label: 'View Configuration',
                    contentSite: 'docs',
                    url: '/docs/:version/reference/replica-configuration',
                  },
                  {
                    label: 'Replica Set Protocol Version',
                    contentSite: 'docs',
                    url: '/docs/:version/reference/replica-set-protocol-versions',
                  },
                  {
                    label: 'Troubleshoot',
                    contentSite: 'docs',
                    url: '/docs/:version/tutorial/troubleshoot-replica-sets',
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
                    url: '/docs/:version/administration/health-managers',
                  },
                  {
                    label: 'Configure the Rate Limiter',
                    contentSite: 'docs',
                    url: '/docs/:version/tutorial/configure-rate-limiter',
                    versions: {
                      excludes: ['v7.0'],
                    },
                  },
                  {
                    label: 'UNIX ulimit Settings',
                    contentSite: 'docs',
                    url: '/docs/:version/reference/ulimit',
                  },
                  {
                    label: 'TCMalloc Performance',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/administration/tcmalloc-performance',
                    items: [
                      {
                        label: 'Disable Transparent Huge Pages',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/disable-transparent-huge-pages',
                        versions: {
                          excludes: ['v7.0'],
                        },
                      },
                      {
                        label: 'Disable Transparent Huge Pages',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/transparent-huge-pages',
                        versions: {
                          includes: ['v7.0'],
                        },
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Configuration and Maintenance',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/:version/administration/self-managed-configuration-and-maintenance',
                items: [
                  {
                    label: 'Run-time Database Configuration',
                    contentSite: 'docs',
                    url: '/docs/:version/administration/configuration',
                  },
                  {
                    label: 'Upgrade to the Latest Patch Release of MongoDB',
                    contentSite: 'docs',
                    url: '/docs/:version/tutorial/upgrade-revision',
                  },
                  {
                    label: 'Manage mongod Processes',
                    contentSite: 'docs',
                    url: '/docs/:version/tutorial/manage-mongodb-processes',
                  },
                  {
                    label: 'Configuration File Options',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/reference/configuration-options',
                    items: [
                      {
                        label: 'Externally Sourced Configuration File Values',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/expansion-directives',
                      },
                      {
                        label: 'Convert Command-Line Options to YAML',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/convert-command-line-options-to-yaml',
                      },
                      {
                        label: 'Configuration File Settings and Command-Line Options Mapping',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/configuration-file-settings-command-line-options-mapping',
                      },
                    ],
                  },
                  {
                    label: 'MongoDB Server Parameters',
                    contentSite: 'docs',
                    url: '/docs/:version/reference/parameters',
                  },
                  {
                    label: 'MongoDB Cluster Parameters',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/reference/cluster-parameters',
                    items: [
                      {
                        label: 'auditConfig',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/cluster-parameters/auditConfig',
                      },
                      {
                        label: 'changeStreamOptions',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/cluster-parameters/changeStreamOptions',
                      },
                      {
                        label: 'defaultMaxTimeMS',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/cluster-parameters/defaultMaxTimeMS',
                      },
                      {
                        label: 'fleDisableSubstringPreviewParameterLimits',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/cluster-parameters/fleDisableSubstringPreviewParameterLimits',
                        versions: {
                          excludes: ['v7.0', 'v8.0'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'Workload Isolation',
                    contentSite: 'docs',
                    url: '/docs/:version/core/workload-isolation',
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
                    url: '/docs/:version/tutorial/deploy-shard-cluster',
                    items: [
                      {
                        label: 'Tiered Hardware for Varying SLA or SLO',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/sharding-tiered-hardware-for-varying-slas',
                      },
                    ],
                  },
                  {
                    label: 'Zones',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/core/zone-sharding',
                    items: [
                      {
                        label: 'Manage',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/:version/tutorial/manage-shard-zone',
                        items: [
                          {
                            label: 'Update Shard Zone',
                            contentSite: 'docs',
                            url: '/docs/:version/tutorial/manage-shard-zone/update-existing-shard-zone',
                          },
                        ],
                      },
                      {
                        label: 'Segment by Location',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/sharding-segmenting-data-by-location',
                      },
                      {
                        label: 'Segment by Application or Customer',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/sharding-segmenting-shards',
                      },
                      {
                        label: 'Distributed Local Writes for Insert-Only Workloads',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/sharding-high-availability-writes',
                      },
                      {
                        label: 'Distribute Collections',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/sharding-distribute-collections-with-zones',
                      },
                    ],
                  },
                  {
                    label: 'Sharding Administration',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/administration/sharded-cluster-administration',
                    items: [
                      {
                        label: 'Scaling Strategies',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/:version/core/sharding-scaling-strategies',
                        items: [
                          {
                            label: 'Start with Sharded Clusters',
                            contentSite: 'docs',
                            url: '/docs/:version/core/sharding-start-with-sharding',
                          },
                          {
                            label: 'Manage Unsharded Collections',
                            contentSite: 'docs',
                            url: '/docs/:version/core/sharding-manage-unsharded-collections',
                          },
                          {
                            label: 'Distribute Collection Data',
                            contentSite: 'docs',
                            url: '/docs/:version/core/sharding-distribute-collection-data',
                          },
                          {
                            label: 'Consolidate Collection Data',
                            contentSite: 'docs',
                            url: '/docs/:version/core/sharding-consolidate-collection-data',
                          },
                        ],
                      },
                      {
                        label: 'View Cluster Configuration',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/view-sharded-cluster-configuration',
                      },
                      {
                        label: 'Add Shards',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/add-shards-to-shard-cluster',
                      },
                      {
                        label: 'Add a Member to a Shard',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/add-member-to-shard',
                      },
                      {
                        label: 'Remove Shards',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/remove-shards-from-cluster',
                      },
                      {
                        label: 'Embedded to Dedicated Config Server',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/embedded-to-dedicated',
                        versions: {
                          excludes: ['v7.0', 'v8.0', 'manual'],
                        },
                      },
                      {
                        label: 'Clear jumbo Flag',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/clear-jumbo-flag',
                      },
                      {
                        label: 'Config Shard',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/:version/core/config-shard',
                        items: [
                          {
                            label: 'Convert a Replica Set to a Sharded Cluster with an Embedded Config Server',
                            contentSite: 'docs',
                            url: '/docs/:version/tutorial/convert-replica-set-to-embedded-config-server',
                          },
                        ],
                      },
                      {
                        label: 'Start with a Config Shard',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/start-a-sharded-cluster-with-config-shard',
                      },
                      {
                        label: 'Reshard to the Same Shard Key',
                        contentSite: 'docs',
                        url: '/docs/:version/core/reshard-to-same-key',
                      },
                      {
                        label: 'Reshard a Collection back to the Same Shard Key',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/resharding-back-to-same-key',
                      },
                      {
                        label: 'Resharding for Adding and Removing Shards',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/resharding-for-adding-and-removing-shards',
                      },
                    ],
                  },
                  {
                    label: 'Replace a Config Server',
                    contentSite: 'docs',
                    url: '/docs/:version/tutorial/replace-config-server',
                  },
                  {
                    label: 'Restart a Sharded Cluster',
                    contentSite: 'docs',
                    url: '/docs/:version/tutorial/restart-sharded-cluster',
                  },
                  {
                    label: 'Migrate a Sharded Cluster to Different Hardware',
                    contentSite: 'docs',
                    url: '/docs/:version/tutorial/migrate-sharded-cluster-to-new-hardware',
                  },
                  {
                    label: 'Back Up Cluster Metadata',
                    contentSite: 'docs',
                    url: '/docs/:version/tutorial/backup-sharded-cluster-metadata',
                  },
                  {
                    label: 'Convert a Sharded Cluster to Replica Set',
                    contentSite: 'docs',
                    url: '/docs/:version/tutorial/convert-sharded-cluster-to-replica-set',
                  },
                  {
                    label: 'Convert a Replica Set to a Sharded Cluster',
                    contentSite: 'docs',
                    url: '/docs/:version/tutorial/convert-replica-set-to-replicated-shard-cluster',
                  },
                  {
                    label: 'Reference',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/reference/sharding',
                    items: [
                      {
                        label: 'Config Database',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/config-database',
                      },
                      {
                        label: 'Defragment Sharded Collections',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/:version/core/defragment-sharded-collections',
                        items: [
                          {
                            label: 'Start',
                            contentSite: 'docs',
                            url: '/docs/:version/core/defragment-sharded-collections/start-defragmenting-sharded-collection',
                          },
                          {
                            label: 'Monitor',
                            contentSite: 'docs',
                            url: '/docs/:version/core/defragment-sharded-collections/monitor-defragmentation-sharded-collection',
                          },
                          {
                            label: 'Stop',
                            contentSite: 'docs',
                            url: '/docs/:version/core/defragment-sharded-collections/stop-defragmenting-sharded-collection',
                          },
                        ],
                      },
                      {
                        label: 'Inconsistency Types',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/:version/reference/inconsistency-type',
                        items: [
                          {
                            label: 'CollectionAuxiliaryMetadataMismatch',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/inconsistency-type/CollectionAuxiliaryMetadataMismatch',
                          },
                          {
                            label: 'CollectionOptionsMismatch',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/inconsistency-type/CollectionOptionsMismatch',
                          },
                          {
                            label: 'CollectionUUIDMismatch',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/inconsistency-type/CollectionUUIDMismatch',
                          },
                          {
                            label: 'CorruptedChunkShardKey',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/inconsistency-type/CorruptedChunkShardKey',
                          },
                          {
                            label: 'CorruptedZoneShardKey',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/inconsistency-type/CorruptedZoneShardKey',
                          },
                          {
                            label: 'HiddenShardedCollection',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/inconsistency-type/HiddenShardedCollection',
                          },
                          {
                            label: 'InconsistentIndex',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/inconsistency-type/InconsistentIndex',
                          },
                          {
                            label: 'MisplacedCollection',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/inconsistency-type/MisplacedCollection',
                          },
                          {
                            label: 'MissingLocalCollection',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/inconsistency-type/MissingLocalCollection',
                          },
                          {
                            label: 'MissingRoutingTable',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/inconsistency-type/MissingRoutingTable',
                          },
                          {
                            label: 'MissingShardKeyIndex',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/inconsistency-type/MissingShardKeyIndex',
                          },
                          {
                            label: 'RangeDeletionMissingShardKeyIndex',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/inconsistency-type/RangeDeletionMissingShardKeyIndex',
                          },
                          {
                            label: 'RoutingTableMissingMaxKey',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/inconsistency-type/RoutingTableMissingMaxKey',
                          },
                          {
                            label: 'RoutingTableMissingMinKey',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/inconsistency-type/RoutingTableMissingMinKey',
                          },
                          {
                            label: 'RoutingTableRangeGap',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/inconsistency-type/RoutingTableRangeGap',
                          },
                          {
                            label: 'RoutingTableRangeOverlap',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/inconsistency-type/RoutingTableRangeOverlap',
                          },
                          {
                            label: 'ShardCatalogCacheCollectionMetadataMismatch',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/inconsistency-type/ShardCatalogCacheCollectionMetadataMismatch/',
                            versions: {
                              excludes: ['v7.0', 'v8.0'],
                            },
                          },
                          {
                            label: 'ShardMissingCollectionRoutingInfo',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/inconsistency-type/ShardMissingCollectionRoutingInfo',
                            versions: {
                              includes: ['v8.0'],
                            },
                          },
                          {
                            label: 'ShardThinksCollectionIsUnsharded',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/inconsistency-type/ShardThinksCollectionIsUnsharded',
                            versions: {
                              includes: ['v7.0'],
                            },
                          },
                          {
                            label: 'TrackedUnshardedCollectionHasInvalidKey',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/inconsistency-type/TrackedUnshardedCollectionHasInvalidKey',
                          },
                          {
                            label: 'TrackedUnshardedCollectionHasMultipleChunks',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/inconsistency-type/TrackedUnshardedCollectionHasMultipleChunks',
                          },
                          {
                            label: 'ZonesRangeOverlap',
                            contentSite: 'docs',
                            url: '/docs/:version/reference/inconsistency-type/ZonesRangeOverlap',
                          },
                        ],
                      },
                      {
                        label: 'Operational Restrictions',
                        contentSite: 'docs',
                        url: '/docs/:version/core/sharded-cluster-requirements',
                      },
                      {
                        label: 'Troubleshoot Sharded Clusters',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/troubleshoot-sharded-clusters',
                      },
                      {
                        label: 'Node Direct Commands',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/supported-shard-direct-commands',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'mongot Deployment Sizing',
                contentSite: 'docs',
                collapsible: true,
                versions: {
                  excludes: ['v7.0', 'v8.0'],
                },
                items: [
                  {
                    label: 'Introduction',
                    contentSite: 'docs',
                    url: '/docs/:version/tutorial/mongot-sizing/introduction',
                  },
                  {
                    label: 'Quickstart',
                    contentSite: 'docs',
                    url: '/docs/:version/tutorial/mongot-sizing/quick-start',
                  },
                  {
                    label: 'Advanced Guidance',
                    contentSite: 'docs',
                    collapsible: true,
                    items: [
                      {
                        label: 'Architecture Patterns',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/mongot-sizing/advanced-guidance/architecture',
                      },
                      {
                        label: 'Resource Allocation',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/mongot-sizing/advanced-guidance/resource-allocation',
                      },
                      {
                        label: 'Hardware',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/mongot-sizing/advanced-guidance/hardware',
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
                url: '/docs/:version/core/storage-engines',
                items: [
                  {
                    label: 'WiredTiger Storage Engine',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/core/wiredtiger',
                    items: [
                      {
                        label: 'Change Standalone to WiredTiger',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/change-standalone-wiredtiger',
                      },
                      {
                        label: 'Change Replica Set to WiredTiger',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/change-replica-set-wiredtiger',
                      },
                      {
                        label: 'Change Sharded Cluster to WiredTiger',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/change-sharded-cluster-wiredtiger',
                      },
                    ],
                  },
                  {
                    label: 'In-Memory Storage Engine',
                    contentSite: 'docs',
                    url: '/docs/:version/core/inmemory',
                  },
                ],
              },
              {
                label: 'Encryption at Rest',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/:version/core/security-encryption-at-rest',
                items: [
                  {
                    label: 'Configure',
                    contentSite: 'docs',
                    url: '/docs/:version/tutorial/configure-encryption',
                  },
                  {
                    label: 'Rotate Keys',
                    contentSite: 'docs',
                    url: '/docs/:version/tutorial/rotate-encryption-key',
                  },
                ],
              },
              {
                label: 'Journaling',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/:version/core/journaling',
                items: [
                  {
                    label: 'Manage Journaling',
                    contentSite: 'docs',
                    url: '/docs/:version/tutorial/manage-journaling',
                  },
                ],
              },
              {
                label: 'FAQ: MongoDB Storage',
                contentSite: 'docs',
                url: '/docs/:version/faq/storage',
              },
            ],
          },
          {
            label: 'Backup and Restore',
            contentSite: 'docs',
            collapsible: true,
            url: '/docs/:version/core/backups',
            items: [
              {
                label: 'Back Up and Restore with Filesystem Snapshots',
                contentSite: 'docs',
                url: '/docs/:version/tutorial/backup-with-filesystem-snapshots',
              },
              {
                label: 'Back Up and Restore with MongoDB Tools',
                contentSite: 'docs',
                url: '/docs/:version/tutorial/backup-and-restore-tools',
              },
              {
                label: 'Restore a Replica Set from MongoDB Backups',
                contentSite: 'docs',
                url: '/docs/:version/tutorial/restore-replica-set-from-backup',
              },
              {
                label: 'Backup and Restore Sharded Clusters',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/:version/administration/backup-sharded-clusters',
                items: [
                  {
                    label: 'Back Up a Sharded Cluster with File System Snapshots',
                    contentSite: 'docs',
                    url: '/docs/:version/tutorial/backup-sharded-cluster-with-filesystem-snapshots',
                  },
                  {
                    label: 'Back Up a Sharded Cluster with Database Dumps',
                    contentSite: 'docs',
                    url: '/docs/:version/tutorial/backup-sharded-cluster-with-database-dumps',
                  },
                  {
                    label: 'Schedule Backup Window for Sharded Clusters',
                    contentSite: 'docs',
                    url: '/docs/:version/tutorial/schedule-backup-window-for-sharded-clusters',
                  },
                  {
                    label: 'Restore a Sharded Cluster',
                    contentSite: 'docs',
                    url: '/docs/:version/tutorial/restore-sharded-cluster',
                  },
                ],
              },
              {
                label: 'Recover a Standalone after an Unexpected Shutdown',
                contentSite: 'docs',
                url: '/docs/:version/tutorial/recover-data-following-unexpected-shutdown',
              },
            ],
          },
          {
            label: 'Monitor Clusters',
            contentSite: 'docs',
            collapsible: true,
            url: '/docs/:version/administration/monitoring',
            items: [
              {
                label: 'FAQ: MongoDB Diagnostics',
                contentSite: 'docs',
                url: '/docs/:version/faq/diagnostics',
              },
              {
                label: 'Management',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/:version/administration/configuration-and-maintenance',
                items: [
                  {
                    label: 'Terminate Operations',
                    contentSite: 'docs',
                    url: '/docs/:version/tutorial/terminate-running-operations',
                  },
                  {
                    label: 'Rotate Log Files',
                    contentSite: 'docs',
                    url: '/docs/:version/tutorial/rotate-log-files',
                  },
                ],
              },
              {
                label: 'Full Time Diagnostic Data Capture',
                contentSite: 'docs',
                url: '/docs/:version/administration/full-time-diagnostic-data-capture',
              },
            ],
          },
          {
            label: 'Security',
            contentSite: 'docs',
            collapsible: true,
            url: '/docs/:version/core/self-managed-security',
            items: [
              {
                label: 'Security Checklist',
                contentSite: 'docs',
                url: '/docs/:version/administration/security-checklist',
              },
              {
                label: 'Enable Access Control',
                contentSite: 'docs',
                url: '/docs/:version/tutorial/enable-authentication',
              },
              {
                label: 'Users',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/:version/core/security-users',
                items: [
                  {
                    label: 'Authentication',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/core/authentication',
                    items: [
                      {
                        label: 'Create',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/create-users',
                      },
                      {
                        label: 'Authenticate',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/authenticate-a-user',
                      },
                      {
                        label: 'List',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/list-users',
                      },
                      {
                        label: 'SCRAM',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/:version/core/security-scram',
                        items: [
                          {
                            label: 'Authenticate Clients',
                            contentSite: 'docs',
                            url: '/docs/:version/tutorial/configure-scram-client-authentication',
                          },
                        ],
                      },
                      {
                        label: 'x.509',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/:version/core/security-x.509',
                        items: [
                          {
                            label: 'Authenticate Clients',
                            contentSite: 'docs',
                            url: '/docs/:version/tutorial/configure-x509-client-authentication',
                          },
                        ],
                      },
                      {
                        label: 'Kerberos',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/:version/core/kerberos',
                        items: [
                          {
                            label: 'Configure on Linux',
                            contentSite: 'docs',
                            url: '/docs/:version/tutorial/control-access-to-mongodb-with-kerberos-authentication',
                          },
                          {
                            label: 'Configure on Windows',
                            contentSite: 'docs',
                            url: '/docs/:version/tutorial/control-access-to-mongodb-windows-with-kerberos-authentication',
                          },
                          {
                            label: 'Troubleshoot',
                            contentSite: 'docs',
                            url: '/docs/:version/tutorial/troubleshoot-kerberos',
                          },
                          {
                            label: 'Use Active Directory Authorization',
                            contentSite: 'docs',
                            url: '/docs/:version/tutorial/kerberos-auth-activedirectory-authz',
                          },
                        ],
                      },
                      {
                        label: 'LDAP Proxy',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/:version/core/security-ldap',
                        items: [
                          {
                            label: 'Use ActiveDirectory',
                            contentSite: 'docs',
                            url: '/docs/:version/tutorial/configure-ldap-sasl-activedirectory',
                          },
                          {
                            label: 'Use OpenLDAP',
                            contentSite: 'docs',
                            url: '/docs/:version/tutorial/configure-ldap-sasl-openldap',
                          },
                          {
                            label: 'Use Native LDAP',
                            contentSite: 'docs',
                            url: '/docs/:version/tutorial/authenticate-nativeldap-activedirectory',
                          },
                        ],
                      },
                      {
                        label: 'OIDC/OAuth 2.0',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/:version/core/oidc/security-oidc',
                        items: [
                          {
                            label: 'Workforce (Humans)',
                            contentSite: 'docs',
                            collapsible: true,
                            url: '/docs/:version/core/oidc/workforce',
                            items: [
                              {
                                label: 'Configure an External Identity Provider for Workforce Authentication',
                                contentSite: 'docs',
                                url: '/docs/:version/core/oidc/workforce/workforce-external-provider',
                              },
                              {
                                label: 'Configure MongoDB with Workforce Identity Federation',
                                contentSite: 'docs',
                                url: '/docs/:version/core/oidc/workforce/configure-oidc',
                              },
                              {
                                label: 'Authorize Users with Workforce Identity Federation',
                                contentSite: 'docs',
                                url: '/docs/:version/core/oidc/workforce/database-user-workforce',
                              },
                            ],
                          },
                          {
                            label: 'Workload (Applications)',
                            contentSite: 'docs',
                            collapsible: true,
                            url: '/docs/:version/core/oidc/workload',
                            items: [
                              {
                                label: 'Configure an External Identity Provider for Workload Authentication',
                                contentSite: 'docs',
                                url: '/docs/:version/core/oidc/workload/workload-external-provider',
                              },
                              {
                                label: 'Configure MongoDB with Workload Identity Federation',
                                contentSite: 'docs',
                                url: '/docs/:version/core/oidc/workload/configure-mongodb-workload',
                              },
                              {
                                label: 'Authorize Users with Workload Identity Federation',
                                contentSite: 'docs',
                                url: '/docs/:version/core/oidc/workload/database-user-workload',
                              },
                            ],
                          },
                        ],
                      },
                      {
                        label: 'Internal',
                        contentSite: 'docs',
                        collapsible: true,
                        url: '/docs/:version/core/security-internal-authentication',
                        items: [
                          {
                            label: 'Deploy Replica Set',
                            contentSite: 'docs',
                            url: '/docs/:version/tutorial/deploy-replica-set-with-keyfile-access-control',
                          },
                          {
                            label: 'Update Replica Set',
                            contentSite: 'docs',
                            url: '/docs/:version/tutorial/enforce-keyfile-access-control-in-existing-replica-set',
                          },
                          {
                            label: 'Update Replica Set (No Downtime)',
                            contentSite: 'docs',
                            url: '/docs/:version/tutorial/enforce-keyfile-access-control-in-existing-replica-set-without-downtime',
                          },
                          {
                            label: 'Deploy Sharded Cluster',
                            contentSite: 'docs',
                            url: '/docs/:version/tutorial/deploy-sharded-cluster-with-keyfile-access-control',
                          },
                          {
                            label: 'Update Sharded Cluster',
                            contentSite: 'docs',
                            url: '/docs/:version/tutorial/enforce-keyfile-access-control-in-existing-sharded-cluster',
                          },
                          {
                            label: 'Update Sharded Cluster (No Downtime)',
                            contentSite: 'docs',
                            url: '/docs/:version/tutorial/enforce-keyfile-access-control-in-existing-sharded-cluster-no-downtime',
                          },
                          {
                            label: 'Rotate Replica Set Keys',
                            contentSite: 'docs',
                            url: '/docs/:version/tutorial/rotate-key-replica-set',
                          },
                          {
                            label: 'Rotate Sharded Cluster Keys',
                            contentSite: 'docs',
                            url: '/docs/:version/tutorial/rotate-key-sharded-cluster',
                          },
                          {
                            label: 'Use X.509',
                            contentSite: 'docs',
                            url: '/docs/:version/tutorial/configure-x509-member-authentication',
                          },
                          {
                            label: 'Upgrade to X.509 from Keyfile',
                            contentSite: 'docs',
                            url: '/docs/:version/tutorial/upgrade-keyfile-to-x509',
                          },
                          {
                            label: 'Rotate X.509 with New DN',
                            contentSite: 'docs',
                            url: '/docs/:version/tutorial/rotate-x509-membership-certificates',
                          },
                          {
                            label: 'Rotate X.509 with New clusterAuthX509 Attributes',
                            contentSite: 'docs',
                            url: '/docs/:version/tutorial/rotate-x509-member-cert',
                          },
                          {
                            label: 'Rotate X.509 to Use Extension Values',
                            contentSite: 'docs',
                            url: '/docs/:version/tutorial/rotate-x509-to-extensionValue',
                          },
                        ],
                      },
                      {
                        label: 'Localhost Exception',
                        contentSite: 'docs',
                        url: '/docs/:version/core/localhost-exception',
                      },
                    ],
                  },
                  {
                    label: 'Authorization',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/core/authorization',
                    items: [
                      {
                        label: 'User Defined Roles',
                        contentSite: 'docs',
                        url: '/docs/:version/core/security-user-defined-roles',
                      },
                      {
                        label: 'Manage Users & Roles',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/manage-users-and-roles',
                      },
                      {
                        label: 'Change Password & Custom Data',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/change-own-password-and-custom-data',
                      },
                      {
                        label: 'Collection-Level Access',
                        contentSite: 'docs',
                        url: '/docs/:version/core/collection-level-access-control',
                      },
                      {
                        label: 'LDAP Authorization',
                        contentSite: 'docs',
                        url: '/docs/:version/core/security-ldap-external',
                      },
                      {
                        label: 'LDAP Deprecation',
                        contentSite: 'docs',
                        url: '/docs/:version/core/LDAP-deprecation',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Network & Configuration Hardening',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/:version/core/security-hardening',
                items: [
                  {
                    label: 'IP Binding',
                    contentSite: 'docs',
                    url: '/docs/:version/core/security-mongodb-configuration',
                  },
                  {
                    label: 'Use Linux iptables',
                    contentSite: 'docs',
                    url: '/docs/:version/tutorial/configure-linux-iptables-firewall',
                  },
                  {
                    label: 'Use Windows netsh',
                    contentSite: 'docs',
                    url: '/docs/:version/tutorial/configure-windows-netsh-firewall',
                  },
                  {
                    label: 'TLS/SSL',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/core/security-transport-encryption',
                    items: [
                      {
                        label: 'Configure mongod & mongos',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/configure-ssl',
                      },
                      {
                        label: 'Develop Locally with TLS',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/develop-mongodb-locally-with-tls',
                      },
                      {
                        label: 'Configure Clients',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/configure-ssl-clients',
                      },
                      {
                        label: 'Upgrade Cluster',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/upgrade-cluster-to-ssl',
                      },
                      {
                        label: 'Configure for FIPS',
                        contentSite: 'docs',
                        url: '/docs/:version/tutorial/configure-fips',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Auditing',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/:version/core/auditing',
                items: [
                  {
                    label: 'Configure',
                    contentSite: 'docs',
                    url: '/docs/:version/tutorial/configure-auditing',
                  },
                  {
                    label: 'Configure Filters',
                    contentSite: 'docs',
                    url: '/docs/:version/tutorial/configure-audit-filters',
                  },
                  {
                    label: 'Audit Messages',
                    contentSite: 'docs',
                    collapsible: true,
                    url: '/docs/:version/reference/audit-message',
                    items: [
                      {
                        label: 'mongo Schema',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/audit-message/mongo',
                      },
                      {
                        label: 'OSCF Schema',
                        contentSite: 'docs',
                        url: '/docs/:version/reference/audit-message/ocsf',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Reference',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/:version/reference/security',
                items: [
                  {
                    label: 'systems.roles Collection',
                    contentSite: 'docs',
                    url: '/docs/:version/reference/system-roles-collection',
                  },
                  {
                    label: 'systems.users Collection',
                    contentSite: 'docs',
                    url: '/docs/:version/reference/system-users-collection',
                  },
                  {
                    label: 'Resource Document',
                    contentSite: 'docs',
                    url: '/docs/:version/reference/resource-document',
                  },
                ],
              },
              {
                label: 'Appendix',
                contentSite: 'docs',
                collapsible: true,
                url: '/docs/:version/appendix/security',
                items: [
                  {
                    label: 'OpenSSL CA',
                    contentSite: 'docs',
                    url: '/docs/:version/appendix/security/appendixA-openssl-ca',
                  },
                  {
                    label: 'OpenSSL Server',
                    contentSite: 'docs',
                    url: '/docs/:version/appendix/security/appendixB-openssl-server',
                  },
                  {
                    label: 'OpenSSL Client',
                    contentSite: 'docs',
                    url: '/docs/:version/appendix/security/appendixC-openssl-client',
                  },
                ],
              },
            ],
          },
          {
            label: 'Operations Checklist',
            contentSite: 'docs',
            url: '/docs/:version/administration/production-checklist-operations',
          },
          {
            label: 'Production Notes',
            contentSite: 'docs',
            url: '/docs/:version/administration/production-notes',
          },
          {
            label: 'Exit Codes & Statuses',
            contentSite: 'docs',
            url: '/docs/:version/reference/exit-codes',
          },
          {
            label: 'Release Notes',
            isExternal: true,
            url: 'https://www.mongodb.com/docs/manual/release-notes/',
          },
          {
            label: 'FAQ',
            contentSite: 'docs',
            collapsible: true,
            url: '/docs/:version/faq',
            items: [
              {
                label: 'Fundamentals',
                contentSite: 'docs',
                url: '/docs/:version/faq/fundamentals',
              },
              {
                label: 'Indexes',
                contentSite: 'docs',
                url: '/docs/:version/faq/indexes',
              },
              {
                label: 'Concurrency',
                contentSite: 'docs',
                url: '/docs/:version/faq/concurrency',
              },
              {
                label: 'Sharding',
                contentSite: 'docs',
                url: '/docs/:version/faq/sharding',
              },
              {
                label: 'Replication',
                contentSite: 'docs',
                url: '/docs/:version/faq/replica-sets',
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
            label: 'Overview',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/infrastructure',
          },
          {
            label: 'MongoDB Atlas Terraform Provider',
            isExternal: true,
            url: 'https://registry.terraform.io/providers/mongodb/mongodbatlas/latest/docs',
          },
          {
            label: 'Get Started with Terraform',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/terraform',
          },
          {
            label: 'Terraform Modules',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/terraform-modules-landing-zone',
          },
          {
            label: 'MongoDB Atlas AWS CloudFormation Resources',
            isExternal: true,
            url: 'https://github.com/mongodb/mongodbatlas-cloudformation-resources?tab=readme-ov-file#readme',
          },
          {
            label: 'GraphQL APIs on AWS',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/graphql-api',
          },
          {
            label: 'Migrate to Flex Clusters',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/flex-migration',
          },
        ],
      },
    ],
  },
];
