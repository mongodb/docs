import AtlasK8sData from '../L2-data/atlas-k8s';
import type { TocItem } from '../types';

const tocData: TocItem[] = [
  {
    label: 'Overview',
    contentSite: 'cloud-docs',
    url: '/docs/atlas/',
  },
  {
    label: 'Atlas Users',
    contentSite: 'cloud-docs',
    url: '/docs/atlas/access/manage-org-users',
    collapsible: true,
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
        url: '/docs/atlas/management/organizations/organization-security',
        collapsible: true,
        items: [
          {
            label: 'Federated',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/security/federated-authentication',
            collapsible: true,
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
        url: '/docs/atlas/management/organizations/atlas-account',
        collapsible: true,
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
    url: '/docs/atlas/create-connect-deployments',
    collapsible: true,
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
        url: '/docs/atlas/manage-clusters',
        collapsible: true,
        items: [
          {
            label: 'Storage',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/customize-storage',
            collapsible: true,
            items: [
              {
                label: 'Encryption at Rest',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/security-kms-encryption',
                collapsible: true,
                items: [
                  {
                    label: 'AWS KMS',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/security-aws-kms',
                    collapsible: true,
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
                    url: '/docs/atlas/security-azure-kms',
                    collapsible: true,
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
            url: '/docs/atlas/scale-cluster',
            collapsible: true,
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
            url: '/docs/atlas/tutorial/test-resilience',
            collapsible: true,
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
        url: '/docs/atlas/manage-flex-clusters',
        collapsible: true,
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
        url: '/docs/atlas/global-clusters',
        collapsible: true,
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
    url: '/docs/atlas/backup-restore-cluster',
    collapsible: true,
    items: [
      {
        label: 'Backup',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/backup/cloud-backup/overview',
        collapsible: true,
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
            url: '/docs/atlas/backup/cloud-backup/scheduling',
            collapsible: true,
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
        url: '/docs/atlas/backup/cloud-backup/cloud-backup-encryption',
        collapsible: true,
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
        url: '/docs/atlas/backup/cloud-backup/restore-overview',
        collapsible: true,
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
        url: '/docs/atlas/online-archive/overview',
        collapsible: true,
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
    label: 'Load Sample Data',
    contentSite: 'cloud-docs',
    url: '/docs/atlas/sample-data',
    collapsible: true,
    items: [
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
    url: '/docs/atlas/import',
    collapsible: true,
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
        url: '/docs/atlas/live-migration',
        collapsible: true,
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
        contentSite: 'mongosync',
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
    url: '/docs/atlas/monitoring-alerts',
    collapsible: true,
    items: [
      {
        label: 'Analyze Slow Queries',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/analyze-slow-queries',
        collapsible: true,
        items: [
          {
            label: 'Performance Advisor',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/performance-advisor',
            collapsible: true,
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
        url: '/docs/atlas/alerts',
        collapsible: true,
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
            url: '/docs/atlas/alert-resolutions',
            collapsible: true,
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
        url: '/docs/atlas/monitor-cluster-metrics',
        collapsible: true,
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
        url: '/docs/atlas/tutorial/third-party-service-integrations',
        collapsible: true,
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
        label: 'Export Logs to AWS S3',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/export-logs-external-sinks',
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
    url: '/docs/atlas/billing/',
    collapsible: true,
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
    url: '/docs/atlas/atlas-ui',
    collapsible: true,
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
        url: '/docs/atlas/atlas-ui/collections',
        collapsible: true,
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
        url: '/docs/atlas/atlas-ui/documents',
        collapsible: true,
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
        url: '/docs/atlas/atlas-ui/query/filter',
        collapsible: true,
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
        ],
      },
      {
        label: 'Query with Natural Language',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/atlas-ui/query-with-natural-language',
        collapsible: true,
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
        url: '/docs/atlas/atlas-ui/create-agg-pipeline',
        collapsible: true,
        items: [
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
        url: '/docs/atlas/atlas-ui/data-modeling',
        collapsible: true,
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
        contentSite: 'cloud-docs',
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
    url: '/docs/atlas/production-notes',
    collapsible: true,
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
    url: '/docs/atlas/reference',
    collapsible: true,
    items: [
      {
        label: 'UI Shortcuts',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/reference/atlas-go-to',
      },
      {
        label: 'Cloud Providers',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/reference/cloud-providers',
        collapsible: true,
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
        url: '/docs/atlas/reference/limitations',
        collapsible: true,
        items: [
          {
            label: 'Service Limits',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/reference/atlas-limits',
          },
          {
            label: 'Atlas Flex Limits',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/reference/flex-limitations',
          },
          {
            label: 'M0 Limits',
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
        url: '/docs/atlas/faq',
        collapsible: true,
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
    url: '/docs/atlas/api',
    collapsible: true,
    items: [
      {
        label: 'Administration API',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/api/atlas-admin-api',
        collapsible: true,
        items: [
          {
            label: 'Get Started',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/configure-api-access',
            collapsible: true,
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
            url: '/docs/atlas/sdk',
            collapsible: true,
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
            url: '/docs/atlas/reference/more-api-resources',
            collapsible: true,
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
    label: 'Atlas Kubernetes Operator',
    contentSite: 'atlas-operator',
    url: '/docs/atlas/operator/:version/',
    items: AtlasK8sData,
    showSubNav: true,
  },
  {
    label: 'Release Notes',
    contentSite: 'cloud-docs',
    url: 'https://www.mongodb.com/docs/atlas/release-notes/',
  },
];

export default tocData;
