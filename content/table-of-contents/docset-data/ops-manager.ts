import type { TocItem } from '../types';

const tocData: TocItem[] = [
  {
    label: 'Ops Manager',
    contentSite: 'ops-manager',
    url: '/docs/ops-manager/:version/',
    group: true,
    versionDropdown: true,
    items: [
      {
        label: 'Overview',
        contentSite: 'ops-manager',
        url: '/docs/ops-manager/:version/application',
        collapsible: true,
        items: [
          {
            label: 'Architecture',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/core/system-overview',
          },
          {
            label: 'Example Deployments',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/core/deployments',
          },
          {
            label: 'Install a Simple Test',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/install-simple-test-deployment',
          },
        ],
      },
      {
        label: 'Install',
        contentSite: 'ops-manager',
        url: '/docs/ops-manager/:version/installation',
        collapsible: true,
        items: [
          {
            label: 'Checklist',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/core/installation-checklist',
          },
          {
            label: 'Hardware & Software Requirements',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/core/requirements',
          },
          {
            label: 'Install Backing Databases',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/prepare-backing-mongodb-instances',
          },
          {
            label: 'Installation Methods',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/nav/install-application',
            collapsible: true,
            items: [
              {
                label: 'RPM Package',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/install-on-prem-with-rpm-packages',
              },
              {
                label: 'DEB Package',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/install-on-prem-with-deb-packages',
              },
              {
                label: 'Archive with Linux',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/install-on-prem-from-archive',
              },
            ],
          },
          {
            label: 'Configure',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/reference/config/ui-settings',
          },
          {
            label: 'Advanced Options',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/nav/advanced-deployments',
            collapsible: true,
            items: [
              {
                label: 'Configure for Limited Internet Access',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/configure-local-mode',
                collapsible: true,
                items: [
                  {
                    label: 'Resolve Pre-flight Check Failure',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/tutorial/resolve-pre-flight-check',
                  },
                ],
              },
              {
                label: 'Enable Database Monitoring',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/enable-appdb-monitoring',
              },
              {
                label: 'Deploy a Highly Available Application',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/configure-application-high-availability',
              },
              {
                label: 'Deploy Highly Available Backups',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/configure-backup-high-availability',
              },
              {
                label: 'Monitor Large Deployments',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/monitoring-large-deployments',
              },
              {
                label: 'Assign Snapshot Stores',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/assign-snapshot-stores-to-data-center',
              },
              {
                label: 'Pass Outgoing Traffic through HTTP Proxy',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/use-with-http-proxy',
              },
            ],
          },
          {
            label: 'Upgrade',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/upgrade-ops-manager',
          },
          {
            label: 'Verify Package Integrity',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/verify-ops-manager-packages',
          },
        ],
      },
      {
        label: 'Create Deployments',
        contentSite: 'ops-manager',
        url: '/docs/ops-manager/:version/tutorial/nav/manage-hosts',
        collapsible: true,
        items: [
          {
            label: 'Getting Started',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/getting-started-with-deployments',
          },
          {
            label: 'Prerequisites',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/provisioning-prep',
          },
          {
            label: 'Provision Servers',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/nav/add-servers',
            collapsible: true,
            items: [
              {
                label: 'Use Automation',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/add-servers-automation',
              },
              {
                label: 'Use MongoDB Agent',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/provision-migration-host',
              },
            ],
          },
          {
            label: 'Add Existing Processes',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/add-existing-mongodb-processes',
          },
          {
            label: 'Add Monitored Processes',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/add-monitored-deployment-to-automation',
          },
          {
            label: 'Deploy Replica Set',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/deploy-replica-set',
          },
          {
            label: 'Deploy Sharded Cluster',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/deploy-sharded-cluster',
          },
          {
            label: 'Deploy Standalone Instance',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/deploy-standalone',
          },
          {
            label: 'Install Kubernetes Operator',
            contentSite: 'mck',
            url: 'https://www.mongodb.com/docs/kubernetes/current/tutorial/install-k8s-operator',
          },
          {
            label: 'Deploy with Kubernetes',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/nav/manage-hosts-kubernetes',
            collapsible: true,
            items: [
              {
                label: 'Configure',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/nav/k8s-config-for-mdb-resource',
              },
              {
                label: 'Deploy Replica Set',
                contentSite: 'mck',
                url: 'https://www.mongodb.com/docs/kubernetes/current/tutorial/deploy-replica-set/',
              },
              {
                label: 'Deploy Sharded Cluster',
                contentSite: 'mck',
                url: 'https://www.mongodb.com/docs/kubernetes/current/tutorial/deploy-sharded-cluster/',
              },
              {
                label: 'Deploy Standalone',
                contentSite: 'mck',
                url: 'https://www.mongodb.com/docs/kubernetes/current/tutorial/deploy-standalone/',
              },
            ],
          },
          {
            label: 'Deploy BI Connector Instance',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/deploy-bi-connector',
          },
          {
            label: 'Connect to a Process',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/connect-to-mongodb',
          },
          {
            label: 'Interact With Your Data',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/data-explorer',
            collapsible: true,
            items: [
              {
                label: 'Databases & Collections',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/data-explorer/databases-collections',
              },
              {
                label: 'Documents',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/data-explorer/documents',
              },
              {
                label: 'Indexes',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/data-explorer/indexes',
              },
              {
                label: 'Aggregation Pipelines',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/data-explorer/cloud-agg-pipeline',
              },
            ],
          },
        ],
      },
      {
        label: 'Manage',
        contentSite: 'ops-manager',
        url: '/docs/ops-manager/:version/tutorial/nav/monitor-and-manage',
        collapsible: true,
        items: [
          {
            label: 'View All Clusters',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/view-all-clusters',
          },
          {
            label: 'Prepare for Maintenance',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/prepare-for-maintenance',
          },
          {
            label: 'Edit Deployment',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/edit-deployment',
          },
          {
            label: 'Manage BI Connector',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/manage-bi-connector',
          },
          {
            label: 'Use Suggested Indexes',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/suggest-indexes',
          },
          {
            label: 'Edit Replica Set',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/edit-replica-set',
          },
          {
            label: 'Convert Standalone to Replica Set',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/convert-standalone-to-replica-set',
          },
          {
            label: 'Convert Replica Set to Sharded Cluster',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/convert-replica-set-to-sharded-cluster',
          },
          {
            label: 'Migrate Replica Set Member',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/migrate-member-to-new-hardware',
          },
          {
            label: 'Convert Config Servers to Replica Set',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/convert-config-servers-to-replica-set',
          },
          {
            label: 'Add Shard',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/add-shard-using-automation',
          },
          {
            label: 'Remove Shard',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/remove-shard-using-automation',
            versions: { excludes: ['v6.0'] },
          },
          {
            label: 'Stop Managing and/or Monitoring',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/unmanage-deployment',
          },
          {
            label: 'MongoDB Processes',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/nav/mongodb-processes',
            collapsible: true,
            items: [
              {
                label: 'Shut Down',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/shut-down-deployment',
              },
              {
                label: 'Restart',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/restart-processes',
              },
              {
                label: 'Trigger Initial Sync',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/trigger-resync',
              },
              {
                label: 'Suspend Management',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/suspend-automation',
              },
              {
                label: 'Remove from Monitoring',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/remove-process-from-monitoring',
              },
            ],
          },
          {
            label: 'MongoDB Versions',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/nav/mongodb-versions',
            collapsible: true,
            items: [
              {
                label: 'Change Version',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/change-mongodb-version',
              },
              {
                label: 'Add Custom Build',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/configure-available-mongodb-version',
              },
            ],
          },
          {
            label: 'Host Mappings',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/nav/host-mappings',
          },
        ],
      },
      {
        label: 'Migrate',
        contentSite: 'ops-manager',
        url: '/docs/ops-manager/:version/migration',
        collapsible: true,
        items: [
          {
            label: 'Ops Manager to Atlas',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/migrate-to-atlas',
          },
          {
            label: 'Community Deployment to Atlas',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/migrate-community-to-atlas',
          },
          {
            label: 'Deployment to New Project',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/migrate-deployment-to-new-project',
          },
        ],
      },
      {
        label: 'Monitor',
        contentSite: 'ops-manager',
        url: '/docs/ops-manager/:version/tutorial/nav/alerts-and-monitoring',
        collapsible: true,
        items: [
          {
            label: 'Analyze Slow Queries',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/analyze-slow-queries',
            collapsible: true,
            items: [
              {
                label: 'Monitor & Improve',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/performance-advisor',
                collapsible: true,
                items: [
                  {
                    label: 'Configure Slow Query Threshold',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/performance-advisor/slow-query-threshold',
                  },
                  {
                    label: 'Review Index Ranking',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/performance-advisor/index-ranking',
                  },
                  {
                    label: 'Review Index Recommendations',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/performance-advisor/drop-indexes',
                  },
                ],
              },
              {
                label: 'Profile Databases',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/profile-database',
              },
            ],
          },
          {
            label: 'Improve Schema',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/performance-advisor/schema-advisor',
            collapsible: true,
            items: [
              {
                label: 'Reduce $lookup',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/schema-advisor/reduce-lookup-operations',
              },
              {
                label: 'Avoid Unbounded Arrays',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/schema-advisor/avoid-unbounded-arrays',
              },
              {
                label: 'Reduce Indexes',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/schema-advisor/too-many-indexes',
              },
              {
                label: 'Reduce Large Document Size',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/schema-advisor/reduce-document-size',
              },
              {
                label: 'Reduce Collections',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/schema-advisor/too-many-collections',
              },
            ],
          },
          {
            label: 'Configure & Resolve Alerts',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/nav/alerts',
            collapsible: true,
            items: [
              {
                label: 'Review Conditions',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/reference/alerts',
              },
              {
                label: 'Configure Settings',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/manage-alert-configurations',
                collapsible: true,
                items: [
                  {
                    label: 'Global Alerts',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/tutorial/manage-global-alerts',
                  },
                  {
                    label: 'System Alerts',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/core/system-alerts',
                  },
                ],
              },
              {
                label: 'Resolve',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/nav/alert-resolutions',
                collapsible: true,
                items: [
                  {
                    label: 'Manage',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/tutorial/manage-alerts-and-events',
                  },
                  {
                    label: 'Down Host',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/alerts/host-down',
                  },
                  {
                    label: 'Replication Lag',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/alerts/replication-lag',
                  },
                  {
                    label: 'Lost Primary',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/alerts/no-primary',
                  },
                  {
                    label: 'Inconsistent Backup',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/alerts/inconsistent-backup',
                  },
                  {
                    label: 'Backup Oplog Issues',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/alerts/backup-oplog-is-behind',
                  },
                  {
                    label: 'Query Issues',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/alerts/query-targeting',
                  },
                  {
                    label: 'CPU Usage Issues',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/alerts/system-cpu-usage',
                  },
                  {
                    label: 'IOPS Issues',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/alerts/disk-io-utilization',
                  },
                ],
              },
            ],
          },
          {
            label: 'View Deployment Metrics',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/view-diagnostics',
            collapsible: true,
            items: [
              {
                label: 'Replica Set',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/view-replica-set-metrics',
              },
              {
                label: 'Sharded Clusters',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/view-sharded-cluster-metrics',
              },
              {
                label: 'MongoDB Processes',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/view-mongodb-process-metrics',
              },
              {
                label: 'Real Time Metrics',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/view-real-time-metrics',
              },
              {
                label: 'Review Available Metrics',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/review-available-metrics',
              },
            ],
          },
          {
            label: 'Third-Party Integrations',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/third-party-service-integrations',
            collapsible: true,
            items: [
              {
                label: 'Microsoft Teams',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/mms-integrate-with-microsoft-teams',
              },
              {
                label: 'PagerDuty',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/pagerduty-integration',
              },
              {
                label: 'Prometheus',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/prometheus-integration',
              },
              {
                label: 'Slack',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/slack-integration',
              },
            ],
          },
          {
            label: 'Manage Logs',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/view-logs',
          },
          {
            label: 'Download Diagnostics',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/retrieve-debug-diagnostics',
          },
        ],
      },
      {
        label: 'Backup & Restore',
        contentSite: 'ops-manager',
        url: '/docs/ops-manager/:version/tutorial/nav/backup-use',
        collapsible: true,
        items: [
          {
            label: 'Back Up',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/nav/backup-deployments',
            collapsible: true,
            items: [
              {
                label: 'Overview',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/core/backup-overview',
              },
              {
                label: 'Preparations',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/core/backup-preparations',
              },
              {
                label: 'Tutorial',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/enable-backup',
              },
            ],
          },
          {
            label: 'Manage Backups',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/nav/backup-use-operations',
            collapsible: true,
            items: [
              {
                label: 'Edit Settings',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/edit-backup',
              },
              {
                label: 'Stop, Restart, or Terminate',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/stop-restart-terminate-backup',
              },
              {
                label: 'View Snapshots',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/view-snapshots',
              },
              {
                label: 'Edit Snapshot Expiration',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/set-snapshot-expiry',
              },
              {
                label: 'Delete Snapshot',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/delete-backup-snapshots',
              },
              {
                label: 'Resync',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/resync-backup',
              },
              {
                label: 'Disable',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/disable-backup',
              },
              {
                label: 'Take On-Demand Snapshots',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/take-on-demand-snapshots',
                versions: { includes: ['upcoming'] },
              },
            ],
          },
          {
            label: 'Restore',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/nav/backup-restore-deployments',
            collapsible: true,
            items: [
              {
                label: 'Overview',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/nav/restore-overview',
                collapsible: true,
                items: [
                  {
                    label: 'Restore a Completed Snapshot',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/tutorial/restore-full-snapshot-http',
                  },
                  {
                    label: 'Restore from a Specific Point-in-Time',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/tutorial/restore-pit-snapshot-http',
                  },
                ],
              },
              {
                label: 'Sharded Cluster',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/restore-sharded-cluster',
              },
              {
                label: 'Replica Set',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/restore-replica-set',
              },
              {
                label: 'Query Backup Snapshot',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/query-backup',
              },
              {
                label: 'Single Database or Collection',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/restore-single-database',
              },
            ],
          },
          {
            label: 'Third-Party Platforms',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/core/third-party-backup',
            versions: { includes: ['current', 'upcoming'] },
          },
        ],
      },
      {
        label: 'Security',
        contentSite: 'ops-manager',
        url: '/docs/ops-manager/:version/tutorial/nav/security',
        collapsible: true,
        items: [
          {
            label: 'Overview',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/core/security',
          },
          {
            label: 'Configure Firewall',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/reference/firewall-configuration',
          },
          {
            label: 'Manage Hostname & Ports',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/manage-ports',
          },
          {
            label: 'Encrypt User Credentials',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/encrypt-user-credentials',
          },
          {
            label: 'Configure TLS',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/configure-ssl-connection-to-web-interface',
          },
          {
            label: 'Secure Application Database',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/configure-ssl-connection-to-backing-mongodb',
          },
          {
            label: 'Secure Connections',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/enable-ssl-for-a-deployment',
          },
          {
            label: 'Configure LDAP',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/configure-for-ldap-authentication',
          },
          {
            label: 'Configure SAML',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/configure-for-saml-authentication',
          },
          {
            label: 'Secure with Authentication',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/nav/security-enable-authentication',
            collapsible: true,
            items: [
              {
                label: 'Overview',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/edit-host-authentication-credentials',
              },
              {
                label: 'Use Username/Password Authentication',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/enable-mongodbcr-authentication-for-group',
              },
              {
                label: 'LDAP',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/enable-ldap-authentication-for-group',
              },
              {
                label: 'Kerberos',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/enable-kerberos-authentication-for-group',
              },
              {
                label: 'OIDC',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/enable-oidc-authentication-for-group',
                collapsible: true,
                items: [
                  {
                    label: 'Workforce (Humans)',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/tutorial/workforce-oidc',
                    versions: { excludes: ['v6.0'] },
                  },
                  {
                    label: 'Workload (Applications)',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/tutorial/workload-oidc',
                    versions: { excludes: ['v6.0'] },
                  },
                ],
              },
              {
                label: 'X.509',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/enable-x509-authentication-for-group',
              },
              {
                label: 'Manage Users & Roles',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/nav/access-control-mongodb',
                collapsible: true,
                items: [
                  {
                    label: 'Users',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/tutorial/manage-mongodb-users',
                  },
                  {
                    label: 'Custom Roles',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/tutorial/manage-mongodb-roles',
                  },
                ],
              },
              {
                label: 'Add CA Certificate',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/add-ca-cert-to-om',
                versions: { excludes: ['v6.0'] },
              },
              {
                label: 'Clear Settings',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/clear-security-settings',
              },
              {
                label: 'Rotate Keyfile',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/rotate-keyfile',
              },
              {
                label: 'Rotate Password',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/rotate-automation-password',
              },
            ],
          },
          {
            label: 'Use Two-Factor Authentication',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/manage-two-factor-authentication',
          },
          {
            label: 'Encrypt Snapshots',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/encrypt-snapshots',
          },
          {
            label: 'Rotate Master KMIP Keys',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/rotate-master-kmip-keys',
          },
          {
            label: 'Configure & Deploy Auditing',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/configure-auditing',
          },
        ],
      },
      {
        label: 'MongoDB Agent',
        contentSite: 'ops-manager',
        url: '/docs/ops-manager/:version/tutorial/nav/mongodb-agent',
        collapsible: true,
        items: [
          {
            label: 'Prerequisites',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/install-mongodb-agent-prereq',
          },
          {
            label: 'Install',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/nav/install-mongodb-agent',
            collapsible: true,
            items: [
              {
                label: 'Manage Deployments',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/install-mongodb-agent-to-manage',
              },
              {
                label: 'Monitor or Backup Deployments',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/install-mongodb-agent-to-monitor',
              },
            ],
          },
          {
            label: 'Update',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/nav/update-mongodb-agent',
            collapsible: true,
            items: [
              {
                label: 'All legacy Agents',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/update-mongodb-agent-from-all-agents',
              },
              {
                label: 'legacy Monitoring Agents',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/update-mongodb-agent-from-monitoring-agent',
              },
              {
                label: 'legacy Backup & Monitoring Agents',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/update-mongodb-agent-from-backup-and-monitoring-agents',
              },
              {
                label: 'Managed & Unmanaged Agents',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/update-mongodb-agent-from-automation-agent',
              },
            ],
          },
          {
            label: 'Restart',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/nav/start-or-stop-mongodb-agent',
          },
          {
            label: 'Manage Functions',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/mongodb-agent-functions',
          },
          {
            label: 'Settings',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/reference/mongodb-agent-settings',
          },
          {
            label: 'Required Acccess',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/reference/required-access-mongodb-agent',
          },
          {
            label: 'Configure Access Control',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/nav/configure-mongodb-agent',
            collapsible: true,
            items: [
              {
                label: 'SCRAM-SHA',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/configure-mongodb-agent-for-scram',
              },
              {
                label: 'LDAP',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/configure-mongodb-agent-for-ldap',
              },
              {
                label: 'Kerberos',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/configure-mongodb-agent-for-kerberos',
              },
              {
                label: 'X.509',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/configure-mongodb-agent-for-x509',
              },
            ],
          },
          {
            label: 'Configure TLS',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/configure-mongodb-agent-for-tls',
          },
          {
            label: 'Manage Config Files & Passwords',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/reference/mongodb-agent-external-configuration',
          },
          {
            label: 'Remove Legacy Agents',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/uninstall-legacy-agents',
          },
          {
            label: 'View Agent Status',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/view-agent-status',
          },
          {
            label: 'Manage API Keys',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/manage-agent-api-key',
          },
          {
            label: 'Enable Fatal Log Rotation',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/update-fatal-log-rotation',
          },
        ],
      },
      {
        label: 'Organizations & Projects',
        contentSite: 'ops-manager',
        url: '/docs/ops-manager/:version/organizations-projects',
        collapsible: true,
        items: [
          {
            label: 'Manage Organizations',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/manage-organizations',
          },
          {
            label: 'Connect to Atlas for Live Migration',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/connect-to-atlas-live-migration',
          },
          {
            label: 'Manage Projects',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/manage-projects',
          },
          {
            label: 'Edit Project Settings',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/manage-project-settings',
          },
          {
            label: ' Access',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/manage-users',
            collapsible: true,
            items: [
              {
                label: 'Programmatic Access to ',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/manage-programmatic-access',
              },
            ],
          },
          {
            label: ' Roles',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/reference/user-roles',
          },
          {
            label: 'Invitations to Organizations and Projects',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/invitations',
          },
        ],
      },
      {
        label: 'Account Management',
        contentSite: 'ops-manager',
        url: '/docs/ops-manager/:version/tutorial/nav/account-management',
        collapsible: true,
        items: [
          {
            label: 'Edit Personal Settings',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/edit-your-user-account',
          },
          {
            label: 'Use Two-Factor Authentication',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/core/two-factor-authentication',
          },
        ],
      },
      {
        label: 'Administration',
        contentSite: 'ops-manager',
        url: '/docs/ops-manager/:version/administration',
        collapsible: true,
        items: [
          {
            label: 'Administration Console',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/admin-console',
            collapsible: true,
            items: [
              {
                label: 'General',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/admin/admin-tab-general',
                collapsible: true,
                items: [
                  {
                    label: 'Overview',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/admin/general/overview-page',
                  },
                  {
                    label: 'Config',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/admin/general/ops-manager-config-page',
                  },
                  {
                    label: 'Users',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/admin/general/users-page',
                  },
                  {
                    label: 'API Keys',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/admin/general/api-keys-page',
                  },
                  {
                    label: 'Global Access List',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/admin/general/global-access-list-page',
                  },
                  {
                    label: 'Projects',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/admin/general/projects-page',
                  },
                  {
                    label: 'Logs',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/admin/general/logs-page',
                  },
                  {
                    label: 'Version Manifest',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/admin/general/version-manifest-page',
                  },
                  {
                    label: 'Messages',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/admin/general/messages-page',
                  },
                  {
                    label: 'MongoDB Usage',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/admin/general/mongodb-usage-page',
                  },
                  {
                    label: 'Audits',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/admin/general/audits-page',
                  },
                ],
              },
              {
                label: 'Backup',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/admin/admin-tab-backup',
                collapsible: true,
                items: [
                  {
                    label: 'Jobs',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/admin/backup/jobs-page',
                  },
                  {
                    label: 'Job Timeline',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/admin/backup/job-timeline-page',
                  },
                  {
                    label: 'Logs',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/admin/backup/logs-page',
                  },
                  {
                    label: 'Restores',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/admin/backup/restores-page',
                  },
                  {
                    label: 'Resource Usage',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/admin/backup/resource-usage-page',
                  },
                  {
                    label: 'Grooms',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/admin/backup/grooms-page',
                  },
                  {
                    label: 'Groom Priority',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/admin/backup/groom-priority-page',
                  },
                  {
                    label: 'Daemons',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/admin/backup/daemons-page',
                  },
                  {
                    label: 'Snapshot Storage',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/admin/backup/snapshot-storage-page',
                  },
                  {
                    label: 'Oplog Stores',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/admin/backup/oplog-stores-page',
                  },
                  {
                    label: 'Deployment Regions',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/admin/backup/deployment-regions-page',
                    versions: { excludes: ['v6.0'] },
                  },
                ],
              },
              {
                label: 'Alerts',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/admin/admin-tab-alerts',
              },
              {
                label: 'Control Panel',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/admin/admin-tab-control-panel',
                collapsible: true,
                items: [
                  {
                    label: 'Email History',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/admin/controlpanel/email-history-page',
                  },
                  {
                    label: 'SMS History',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/admin/controlpanel/sms-history-page',
                  },
                  {
                    label: 'Send Test Message',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/admin/controlpanel/send-test-message-page',
                  },
                ],
              },
            ],
          },
          {
            label: 'Add Message to Interface',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/add-message-to-interface',
          },
          {
            label: 'Start & Stop Application',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/start-and-stop-application',
          },
          {
            label: 'Start & Stop Backup Daemon',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/start-and-stop-backup-daemon',
          },
          {
            label: 'Manage Snapshot Storage',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/nav/backup-storage',
            collapsible: true,
            items: [
              {
                label: 'Blockstore',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/manage-blockstore-storage',
              },
              {
                label: 'S3 Compatible',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/manage-s3-blockstore-storage',
              },
              {
                label: 'File System',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/manage-filestore-storage',
              },
              {
                label: 'Oplog Storage',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/manage-oplog-storage',
              },
              {
                label: 'Manage S3 Oplog Storage',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/manage-s3-oplog-storage',
              },
              {
                label: 'Configure Block Size',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/configure-block-size',
              },
              {
                label: 'Move Job from Lost Backup Daemon',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/move-jobs-to-new-backup-daemon',
              },
            ],
          },
          {
            label: 'Manage Application Logs',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/manage-ops-manager-logs',
          },
          {
            label: 'Manually Update Manifest',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/update-version-manifest',
          },
        ],
      },
      {
        label: 'API',
        contentSite: 'ops-manager',
        url: '/docs/ops-manager/:version/api',
        collapsible: true,
        items: [
          {
            label: 'Principles',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/core/api',
          },
          {
            label: 'Resources',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/reference/api',
            collapsible: true,
            items: [
              {
                label: 'Root',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/reference/api/root',
              },
              {
                label: 'Deployments',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/reference/api/nav/deployments',
                collapsible: true,
                items: [
                  {
                    label: 'Hosts',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/hosts',
                    collapsible: true,
                    items: [
                      {
                        label: 'Get All',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/hosts/get-all-hosts-in-group',
                      },
                      {
                        label: 'Get by ID',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/hosts/get-one-host-by-id',
                      },
                      {
                        label: 'Get by Hostname & Port',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/hosts/get-one-host-by-hostname-port',
                      },
                      {
                        label: 'Begin Monitoring',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/hosts/create-one-host',
                      },
                      {
                        label: 'Update Configuration',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/hosts/update-one-host',
                      },
                      {
                        label: 'Stop Monitoring',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/hosts/delete-one-host',
                      },
                    ],
                  },
                  {
                    label: 'Disks',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/disks',
                    collapsible: true,
                    items: [
                      {
                        label: 'Get All',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/disks-get-all',
                      },
                      {
                        label: 'Get One',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/disk-get-one',
                      },
                    ],
                  },
                  {
                    label: 'Databases',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/databases',
                    collapsible: true,
                    items: [
                      {
                        label: 'Get All',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/databases-get-all-on-host',
                      },
                      {
                        label: 'Get by Name',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/database-get-by-name',
                      },
                    ],
                  },
                  {
                    label: 'Clusters',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/clusters',
                    collapsible: true,
                    items: [
                      {
                        label: 'Get All from All Projects',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/clusters/clusters-get-all-key',
                      },
                      {
                        label: 'Get All from One Project',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/clusters/clusters-get-all',
                      },
                      {
                        label: 'Get One',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/clusters/clusters-get-one',
                      },
                      {
                        label: 'Update',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/clusters/clusters-update-one',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Agents',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/reference/api/agents',
                collapsible: true,
                items: [
                  {
                    label: 'Get All',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/agents-get-all',
                  },
                  {
                    label: 'Get by Type',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/agents-get-by-type',
                  },
                  {
                    label: 'Retrieve All Versions',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/agents/get-agent-versions-global',
                  },
                  {
                    label: 'Retrieve for One Project',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/agents/get-agent-versions-per-project',
                  },
                  {
                    label: 'Create API Key',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/agentapikeys/create-one-agent-api-key',
                  },
                  {
                    label: 'Get All API Keys',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/agentapikeys/get-all-agent-api-keys-for-project',
                  },
                  {
                    label: 'Remove API Key',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/agentapikeys/delete-one-agent-api-key',
                  },
                ],
              },
              {
                label: 'Measurements & Alerts',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/reference/api/nav/measurements-and-alerts',
                collapsible: true,
                items: [
                  {
                    label: 'Measurements',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/measurements',
                    collapsible: true,
                    items: [
                      {
                        label: 'Host',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/measures/get-host-process-system-measurements',
                      },
                      {
                        label: 'Disk Partition',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/measures/get-disk-measurements',
                      },
                      {
                        label: 'Database',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/measures/get-database-measurements',
                      },
                      {
                        label: 'Types',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/measures/measurement-types',
                      },
                      {
                        label: 'Get Types',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/measures/get-measurement-types',
                      },
                    ],
                  },
                  {
                    label: 'Alerts',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/alerts',
                    collapsible: true,
                    items: [
                      {
                        label: 'Get All',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/alerts-get-all-alerts',
                      },
                      {
                        label: 'Get One',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/alerts-get-alert',
                      },
                      {
                        label: 'Acknowledge One',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/alerts-acknowledge-alert',
                      },
                    ],
                  },
                  {
                    label: 'Alert Configurations',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/alert-configurations',
                    collapsible: true,
                    items: [
                      {
                        label: 'Get Matchers Field Names',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/alert-configurations-get-matchers-field-names',
                      },
                      {
                        label: 'Get All for a Project',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/alert-configurations-get-all-configs',
                      },
                      {
                        label: 'Create',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/alert-configurations-create-config',
                      },
                      {
                        label: 'Get One',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/alert-configurations-get-config',
                      },
                      {
                        label: 'Update',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/alert-configurations-update-config',
                      },
                      {
                        label: 'Enable/Disable',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/alert-configurations-enable-disable-config',
                      },
                      {
                        label: 'Delete',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/alert-configurations-delete-config',
                      },
                      {
                        label: 'Get Open Alerts',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/alert-configurations-get-open-alerts',
                      },
                    ],
                  },
                  {
                    label: 'Events',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/events',
                    collapsible: true,
                    items: [
                      {
                        label: 'Get All (Organization)',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/events/get-all-events-for-org',
                      },
                      {
                        label: 'Get One (Organization)',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/events/get-one-event-for-org',
                      },
                      {
                        label: 'Get All (Project)',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/events/get-all-events-for-project',
                      },
                      {
                        label: 'Get One (Project)',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/events/get-one-event-for-project',
                      },
                    ],
                  },
                  {
                    label: 'Global Alerts',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/global-alerts',
                    collapsible: true,
                    items: [
                      {
                        label: 'Get All',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/global-alerts-get-all',
                      },
                      {
                        label: 'Get One',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/global-alerts-get-one',
                      },
                      {
                        label: 'Acknowledge One',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/global-alerts-ack-one',
                      },
                    ],
                  },
                  {
                    label: 'Global Alert Configurations',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/global-alert-configurations',
                    collapsible: true,
                    items: [
                      {
                        label: 'Get All',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/global-alert-configurations-get-all',
                      },
                      {
                        label: 'Get All Open Alerts',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/global-alert-configuration-get-all-open-alerts-triggered',
                      },
                      {
                        label: 'Get One',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/global-alert-configurations-get-one',
                      },
                      {
                        label: 'Create',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/global-alert-configurations-create-one',
                      },
                      {
                        label: 'Update',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/global-alert-configurations-update-one',
                      },
                      {
                        label: 'Enable or Disable',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/global-alert-configurations-toggle-one',
                      },
                      {
                        label: 'Delete',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/global-alert-configurations-delete-one',
                      },
                    ],
                  },
                  {
                    label: 'Global Events',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/global-events',
                    collapsible: true,
                    items: [
                      {
                        label: 'Get All',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/events/get-all-events-global',
                      },
                      {
                        label: 'Get One',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/events/get-one-event-global',
                      },
                    ],
                  },
                  {
                    label: 'Maintenance Windows',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/maintenance-windows',
                    collapsible: true,
                    items: [
                      {
                        label: 'Get All',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/maintenance-windows-get-all',
                      },
                      {
                        label: 'Get One',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/maintenance-windows-get-one',
                      },
                      {
                        label: 'Create',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/maintenance-windows-create-one',
                      },
                      {
                        label: 'Update',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/maintenance-windows-update-one',
                      },
                      {
                        label: 'Delete',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/maintenance-windows-delete-one',
                      },
                    ],
                  },
                  {
                    label: 'Performance Advisor',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/performance-advisor',
                    collapsible: true,
                    items: [
                      {
                        label: 'Get Namespaces',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/performance-advisor/pa-namespaces-get-all',
                      },
                      {
                        label: 'Get Slow Query Logs',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/performance-advisor/get-slow-queries',
                      },
                      {
                        label: 'Get Suggested Indexes',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/performance-advisor/get-suggested-indexes',
                      },
                    ],
                  },
                  {
                    label: 'Integration Settings',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/third-party-integration-settings',
                    collapsible: true,
                    items: [
                      {
                        label: 'Get All Configurations',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/third-party-integration-settings-get-all',
                      },
                      {
                        label: 'Get One Configuration',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/third-party-integration-settings-get-one',
                      },
                      {
                        label: 'Create',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/third-party-integration-settings-create',
                      },
                      {
                        label: 'Update',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/third-party-integration-settings-update',
                      },
                      {
                        label: 'Delete',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/third-party-integration-settings-delete',
                      },
                      {
                        label: 'Return Latest Prometheus Targets',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/third-party-integration-settings-discovery',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Projects & Users',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/reference/api/nav/groups-and-users',
                collapsible: true,
                items: [
                  {
                    label: 'Projects',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/groups',
                    collapsible: true,
                    items: [
                      {
                        label: 'Get All',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/groups/get-all-groups-for-current-user',
                      },
                      {
                        label: 'Get by ID',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/groups/get-one-group-by-id',
                      },
                      {
                        label: 'Get by Name',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/groups/get-one-group-by-name',
                      },
                      {
                        label: 'Get by Agent API Key',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/groups/get-one-group-by-agent-api-key',
                      },
                      {
                        label: 'Create',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/groups/create-one-group',
                      },
                      {
                        label: 'Update',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/groups/change-one-group-name',
                      },
                      {
                        label: 'Delete',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/groups/delete-one-group',
                      },
                      {
                        label: 'Get All Users',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/groups/get-all-users-in-one-group',
                      },
                      {
                        label: 'Add Existing Users',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/groups/add-users-to-one-group',
                      },
                      {
                        label: 'Remove User',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/groups/remove-one-user-from-one-group',
                      },
                      {
                        label: 'Create Invitation',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/invitations/projects/create-one-invitation',
                      },
                      {
                        label: 'Delete Invitation',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/invitations/projects/delete-one-invitation',
                      },
                      {
                        label: 'Get All Invitations',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/invitations/projects/get-all-invitations',
                      },
                      {
                        label: 'Get One Invitation',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/invitations/projects/get-one-invitation',
                      },
                      {
                        label: 'Update Invitation by Invitation ID',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/invitations/projects/update-one-invitation-by-id',
                      },
                      {
                        label: 'Update Invitation',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/invitations/projects/update-one-invitation',
                      },
                      {
                        label: 'Get All Teams',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/groups/project-get-teams',
                      },
                      {
                        label: 'Add Teams',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/groups/project-add-team',
                      },
                      {
                        label: 'Remove Team',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/teams/teams-remove-from-project',
                      },
                      {
                        label: 'Get by Specific Tags for the Current User',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/groups/get-all-groups-with-specific-tags-for-current-user',
                      },
                    ],
                  },
                  {
                    label: 'Users',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/users',
                    collapsible: true,
                    items: [
                      {
                        label: 'Get by ID',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/user-get-by-id',
                      },
                      {
                        label: 'Get by Name',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/user-get-by-name',
                      },
                      {
                        label: 'Create',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/user-create',
                      },
                      {
                        label: 'Update Roles',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/user-update',
                      },
                      {
                        label: 'Create First User',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/user-create-first',
                      },
                      {
                        label: 'Delete',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/users/delete-one-user',
                      },
                    ],
                  },
                  {
                    label: 'Access List',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/access-list',
                    collapsible: true,
                    items: [
                      {
                        label: 'Get for Current User',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/access-list-get-for-current-user',
                      },
                      {
                        label: 'Get for IP Address',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/access-list-get-for-ip-address',
                      },
                      {
                        label: 'Add Entries',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/access-list-add-entries',
                      },
                      {
                        label: 'Delete Entry',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/access-list-delete-entry',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Programmatic API Keys',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/reference/api/nav/prog-api-keys',
                collapsible: true,
                items: [
                  {
                    label: 'Organization API Keys',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/org-api-keys',
                    collapsible: true,
                    items: [
                      {
                        label: 'Get All',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/api-keys/org/get-all-org-api-keys',
                      },
                      {
                        label: 'Get One',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/api-keys/org/get-one-org-api-key',
                      },
                      {
                        label: 'Create',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/api-keys/org/create-one-org-api-key',
                      },
                      {
                        label: 'Update',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/api-keys/org/update-one-org-api-key',
                      },
                      {
                        label: 'Delete',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/api-keys/org/delete-one-api-key',
                      },
                    ],
                  },
                  {
                    label: 'Organization Access Lists',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/org-api-key-access-lists',
                    collapsible: true,
                    items: [
                      {
                        label: 'Get All Entries',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/api-keys/org/get-all-org-api-key-access-list',
                      },
                      {
                        label: 'Get One Entry',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/api-keys/org/get-one-org-api-key-access-list',
                      },
                      {
                        label: 'Create Entries',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/api-keys/org/create-org-api-key-access-list',
                      },
                      {
                        label: 'Delete Entry',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/api-keys/org/delete-one-org-api-key-access-list',
                      },
                    ],
                  },
                  {
                    label: 'API Keys on Projects',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/project-api-keys',
                    collapsible: true,
                    items: [
                      {
                        label: 'Get All',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/api-keys/project/get-all-apiKeys-in-one-project',
                      },
                      {
                        label: 'Create & Assign',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/api-keys/project/create-one-apiKey-in-one-project',
                      },
                      {
                        label: 'Assign',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/api-keys/project/assign-one-org-apiKey-to-one-project',
                      },
                      {
                        label: 'Modify Roles',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/api-keys/project/update-one-apiKey-in-one-project',
                      },
                      {
                        label: 'Unassign',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/api-keys/project/delete-one-apiKey-in-one-project',
                      },
                    ],
                  },
                  {
                    label: 'Global API Keys',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/global-api-keys',
                    collapsible: true,
                    items: [
                      {
                        label: 'Get All',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/api-keys/global/get-all-global-api-keys',
                      },
                      {
                        label: 'Get All Roles',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/api-keys/global/get-all-global-api-key-roles',
                      },
                      {
                        label: 'Get One',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/api-keys/global/get-one-global-api-key',
                      },
                      {
                        label: 'Create',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/api-keys/global/create-one-global-api-key',
                      },
                      {
                        label: 'Update',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/api-keys/global/update-one-global-api-key',
                      },
                      {
                        label: 'Delete',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/api-keys/global/delete-one-global-api-key',
                      },
                    ],
                  },
                  {
                    label: 'Global Access List',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/global-api-key-access-lists',
                    collapsible: true,
                    items: [
                      {
                        label: 'Get All Entries',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/api-keys/global/get-all-global-access-list',
                      },
                      {
                        label: 'Get One Entry',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/api-keys/global/get-one-global-access-list',
                      },
                      {
                        label: 'Create Entry',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/api-keys/global/create-one-global-access-list',
                      },
                      {
                        label: 'Update Entry',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/api-keys/global/update-one-global-access-list',
                      },
                      {
                        label: 'Delete Entry',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/api-keys/global/delete-one-global-access-list',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Organizations & Teams',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/reference/api/nav/organizations-and-teams',
                collapsible: true,
                items: [
                  {
                    label: 'Organizations',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/organizations',
                    collapsible: true,
                    items: [
                      {
                        label: 'Get All Organizations',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/organizations/organization-get-all',
                      },
                      {
                        label: 'Get One Organization',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/organizations/organization-get-one',
                      },
                      {
                        label: 'Get All Projects',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/organizations/organization-get-all-projects',
                      },
                      {
                        label: 'Get All Users',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/organizations/organization-get-all-users',
                      },
                      {
                        label: 'Create Organization',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/organizations/organization-create-one',
                      },
                      {
                        label: 'Rename Organization',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/organizations/organization-rename',
                      },
                      {
                        label: 'Delete Organization',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/organizations/organization-delete-one',
                      },
                      {
                        label: 'Invite User',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/invitations/organizations/create-one-invitation',
                      },
                      {
                        label: 'Delete Invitation',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/invitations/organizations/delete-one-invitation',
                      },
                      {
                        label: 'Get All Invitations',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/invitations/organizations/get-all-invitations',
                      },
                      {
                        label: 'Get One Invitation',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/invitations/organizations/get-one-invitation',
                      },
                      {
                        label: 'Update by Invitation ID',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/invitations/organizations/update-one-invitation-by-id',
                      },
                      {
                        label: 'Update Invitation',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/invitations/organizations/update-one-invitation',
                      },
                    ],
                  },
                  {
                    label: 'Teams',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/teams',
                    collapsible: true,
                    items: [
                      {
                        label: 'Get All',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/teams/teams-get-all',
                      },
                      {
                        label: 'Get One by ID',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/teams/teams-get-one-by-id',
                      },
                      {
                        label: 'Get One by Name',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/teams/teams-get-one-by-name',
                      },
                      {
                        label: 'Get All Team Users',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/teams/teams-get-all-users',
                      },
                      {
                        label: 'Create',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/teams/teams-create-one',
                      },
                      {
                        label: 'Rename',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/teams/teams-rename-one',
                      },
                      {
                        label: 'Update Roles',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/teams/teams-update-roles',
                      },
                      {
                        label: 'Add Users',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/teams/teams-add-user',
                      },
                      {
                        label: 'Remove User',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/teams/teams-remove-user',
                      },
                      {
                        label: 'Delete',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/teams/teams-delete-one',
                      },
                      {
                        label: 'Remove',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/teams/teams-remove-from-project',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Backup & Restore',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/reference/api/nav/backup-and-restore',
                collapsible: true,
                items: [
                  {
                    label: 'Backup Configurations',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/backup-configurations',
                    collapsible: true,
                    items: [
                      {
                        label: ' Get All',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/backup/get-all-backup-configs-for-group',
                      },
                      {
                        label: ' Get One',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/backup/get-one-backup-config-by-cluster-id',
                      },
                      {
                        label: ' Update',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/backup/update-backup-config',
                      },
                    ],
                  },
                  {
                    label: 'Deployment Regions',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/backup-deployments',
                    collapsible: true,
                    items: [
                      {
                        label: 'Get All',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/backup/get-all-deployment-regions',
                        versions: { excludes: ['v6.0'] },
                      },
                      {
                        label: 'Get One',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/backup/get-one-deployment-region-by-id',
                        versions: { excludes: ['v6.0'] },
                      },
                      {
                        label: 'Create',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/backup/create-one-deployment-region',
                        versions: { excludes: ['v6.0'] },
                      },
                      {
                        label: 'Create by ID',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/backup/create-one-deployment-region-by-id',
                        versions: { excludes: ['v6.0'] },
                      },
                      {
                        label: 'Assign',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/backup/assign-deployment-region',
                        versions: { excludes: ['v6.0'] },
                      },
                      {
                        label: 'Delete',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/backup/delete-one-deployment-region-by-id',
                        versions: { excludes: ['v6.0'] },
                      },
                    ],
                  },
                  {
                    label: 'Snapshot Schedule',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/snapshot-schedule',
                    collapsible: true,
                    items: [
                      {
                        label: 'Get Schedule',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/backup/get-snapshot-schedule',
                      },
                      {
                        label: 'Update',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/backup/update-one-snapshot-schedule-by-cluster-id',
                      },
                    ],
                  },
                  {
                    label: 'Snapshots',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/snapshots',
                    collapsible: true,
                    items: [
                      {
                        label: 'Get All (Cluster)',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/snapshots/get-all-snapshots-for-one-cluster',
                      },
                      {
                        label: 'Get One (Cluster)',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/snapshots/get-one-snapshot-for-one-cluster',
                      },
                      {
                        label: 'Change Expiry',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/snapshots/change-expiry-for-one-snapshot',
                      },
                      {
                        label: 'Remove One',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/snapshots/remove-one-snapshot-from-one-cluster',
                      },
                      {
                        label: 'Create One On-Demand (Cluster)',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/snapshots/take-an-on-demand-snapshot',
                        versions: { excludes: ['v6.0'] },
                      },
                      {
                        label: 'Get All (Config Server)',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/snapshots/get-all-snapshots-for-config-server',
                      },
                      {
                        label: 'Get One (Config Server)',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/snapshots/get-one-snapshot-for-config-server',
                      },
                    ],
                  },
                  {
                    label: 'Checkpoints',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/checkpoints',
                    versions: { includes: ['v7.0'] },
                  },
                  {
                    label: 'Restore Jobs',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/restore-jobs',
                    collapsible: true,
                    items: [
                      {
                        label: 'Get All (Cluster)',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/restorejobs/get-all-restore-jobs-for-one-cluster',
                      },
                      {
                        label: 'Get One (Cluster)',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/restorejobs/get-one-single-restore-job-for-one-cluster',
                      },
                      {
                        label: 'Create (Cluster)',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/restorejobs/create-one-restore-job-for-one-cluster',
                      },
                      {
                        label: 'Get All (Config Server)',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/restorejobs/get-all-restore-jobs-for-one-sccc-config-server',
                      },
                      {
                        label: 'Get One (Config Server)',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/restorejobs/get-one-single-restore-job-for-one-sccc-config-server',
                      },
                      {
                        label: 'Create (Config Server)',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/restorejobs/create-one-restore-job-for-one-sccc-config-server',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Automation',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/reference/api/nav/automation',
                collapsible: true,
                items: [
                  {
                    label: 'Configuration',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/automation-config',
                    collapsible: true,
                    items: [
                      {
                        label: 'Get the Automation Configuration',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/automation-config/get-automation-config',
                      },
                      {
                        label: 'Update the Automation Configuration',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/automation-config/update-automation-config',
                      },
                      {
                        label: 'Automation Configuration Parameters',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/automation-config/automation-config-parameters',
                      },
                      {
                        label: 'Example Automation Configuration',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/automation-config/automation-config-example',
                      },
                      {
                        label: 'Update Agent Versions',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/automation-config/update-agent-versions',
                      },
                      {
                        label: 'Get Backup Configuration Settings',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/automation-config/get-backup-log-attributes',
                      },
                      {
                        label: 'Update Backup Configuration Settings',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/automation-config/update-backup-log-attributes',
                      },
                      {
                        label: 'Get Monitoring Configuration Settings',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/automation-config/get-monitoring-log-attributes',
                      },
                      {
                        label: 'Update Monitoring Configuration Settings',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/automation-config/update-monitoring-log-attributes',
                      },
                      {
                        label: 'Get the Audit Log Rotate Configuration',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/automation-config/get-audit-log-rotate-config',
                        versions: { includes: ['current', 'upcoming'] },
                      },
                      {
                        label: 'Update the Audit Log Rotate Config',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/automation-config/update-audit-log-rotate-config',
                        versions: { includes: ['current', 'upcoming'] },
                      },
                      {
                        label: 'Get the System Log Rotate Configuration',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/automation-config/get-system-log-rotate-config',
                        versions: { includes: ['current', 'upcoming'] },
                      },
                      {
                        label: 'Update the System Log Rotate Config',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/automation-config/update-system-log-rotate-config',
                        versions: { includes: ['current', 'upcoming'] },
                      },
                    ],
                  },
                  {
                    label: 'Get Status',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/automation-status',
                  },
                  {
                    label: 'Get Status of Last 50 Plans',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/automation-status-full',
                  },
                ],
              },
              {
                label: 'Version Manifest',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/reference/api/version-manifest',
                collapsible: true,
                items: [
                  {
                    label: 'Retrieve',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/version-manifest/get-om-version-manifest',
                  },
                  {
                    label: 'Update',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/version-manifest/update-version-manifest',
                  },
                ],
              },
              {
                label: 'Log Collection Jobs',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/reference/api/log-collection',
                collapsible: true,
                items: [
                  {
                    label: 'Get All Jobs',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/log-collections/log-collections-get-all',
                  },
                  {
                    label: 'Get Job',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/log-collections/log-collections-get-one',
                  },
                  {
                    label: 'Download Logs',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/log-collections/log-collections-download-job',
                  },
                  {
                    label: 'Create',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/log-collections/log-collections-submit',
                  },
                  {
                    label: 'Extend',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/log-collections/log-collections-update-one',
                  },
                  {
                    label: 'Retry',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/log-collections/log-collections-retry',
                  },
                  {
                    label: 'Delete',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/log-collections/log-collections-delete-one',
                  },
                ],
              },
              {
                label: 'Server Usage',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/reference/api/usage',
                collapsible: true,
                items: [
                  {
                    label: 'Get Diagnostic Archive',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/diagnostics/get-project-diagnostic-archive',
                  },
                  {
                    label: 'Get Global Usage Report Archive',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/usage/create-one-report',
                  },
                  {
                    label: 'List Host Assignments',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/usage/list-all-host-assignments',
                  },
                  {
                    label: 'List Host Assignments in One Project',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/usage/list-all-host-assignments-in-one-project',
                  },
                  {
                    label: 'Get Default Server Type',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/usage/get-default-server-type-for-one-project',
                  },
                  {
                    label: 'Update Default Server Type',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/usage/update-default-server-type-for-one-project',
                  },
                  {
                    label: 'Update Server Type',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/usage/update-server-type-for-one-host',
                  },
                  {
                    label: 'List Host Assignments in One Organization',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/usage/list-all-host-assignments-in-one-organization',
                  },
                  {
                    label: 'Get Server Type in One Organization',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/usage/get-default-server-type-for-one-organization',
                  },
                  {
                    label: 'Update Server Type for One Organization',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/usage/update-default-server-type-for-one-organization',
                  },
                  {
                    label: 'Generate Usage Snapshot',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/usage/generate-daily-usage-snapshot',
                  },
                  {
                    label: 'Retrieve All Physical Hosts',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/usage/get-all-physical-hosts',
                  },
                  {
                    label: 'Retreive One Physical Host',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/usage/get-one-physical-host-by-host-id',
                  },
                  {
                    label: 'Create Physical Host',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/usage/create-one-physical-host',
                  },
                  {
                    label: 'Update Physical Host',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/usage/update-one-physical-host',
                  },
                  {
                    label: 'Remove Physical Host',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/usage/remove-one-physical-host',
                  },
                ],
              },
              {
                label: 'Diagnostic Archives',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/reference/api/diagnostic-archives',
                collapsible: true,
                items: [
                  {
                    label: 'Get Diagnostic Archive',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/diagnostics/get-project-diagnostic-archive',
                  },
                ],
              },
              {
                label: 'Feature Control Policies',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/reference/api/feature-control-policies',
                collapsible: true,
                items: [
                  {
                    label: 'Retrieve for One Project',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/controlled-features/get-controlled-features-for-one-project',
                  },
                  {
                    label: 'Update',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/controlled-features/update-controlled-features-for-one-project',
                  },
                  {
                    label: 'Retrieve All',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/controlled-features/get-all-feature-control-policies',
                  },
                ],
              },
              {
                label: 'Backup Administration',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/reference/api/nav/administration-backup',
                collapsible: true,
                items: [
                  {
                    label: 'Blockstore',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/admin/backup/blockstore-config',
                    collapsible: true,
                    items: [
                      {
                        label: 'Get by ID',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/admin/backup/snapshot/mongoConfigs/get-one-blockstore-configuration-by-id',
                      },
                      {
                        label: 'Get All',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/admin/backup/snapshot/mongoConfigs/get-all-blockstore-configurations',
                      },
                      {
                        label: 'Create',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/admin/backup/snapshot/mongoConfigs/create-one-blockstore-configuration',
                      },
                      {
                        label: 'Update',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/admin/backup/snapshot/mongoConfigs/update-one-blockstore-configuration',
                      },
                      {
                        label: 'Delete',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/admin/backup/snapshot/mongoConfigs/delete-one-blockstore-configuration',
                      },
                    ],
                  },
                  {
                    label: 'File System Store',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/admin/backup/file-system-store-config',
                    collapsible: true,
                    items: [
                      {
                        label: 'Get by ID',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/admin/backup/snapshot/fileSystemConfigs/get-one-file-system-store-configuration-by-id',
                      },
                      {
                        label: 'Get All',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/admin/backup/snapshot/fileSystemConfigs/get-all-file-system-store-configurations',
                      },
                      {
                        label: 'Create',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/admin/backup/snapshot/fileSystemConfigs/create-one-file-system-store-configuration',
                      },
                      {
                        label: 'Update',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/admin/backup/snapshot/fileSystemConfigs/update-one-file-system-store-configuration',
                      },
                      {
                        label: 'Delete',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/admin/backup/snapshot/fileSystemConfigs/delete-one-file-system-store-configuration',
                      },
                    ],
                  },
                  {
                    label: 'S3-Compatible Blockstore',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/admin/backup/s3-blockstore-config',
                    collapsible: true,
                    items: [
                      {
                        label: 'Get by ID',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/admin/backup/snapshot/s3Configs/get-one-s3-blockstore-configuration-by-id',
                      },
                      {
                        label: 'Get All',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/admin/backup/snapshot/s3Configs/get-all-s3-blockstore-configurations',
                      },
                      {
                        label: 'Create',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/admin/backup/snapshot/s3Configs/create-one-s3-blockstore-configuration',
                      },
                      {
                        label: 'Update',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/admin/backup/snapshot/s3Configs/update-one-s3-blockstore-configuration',
                      },
                      {
                        label: 'Delete',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/admin/backup/snapshot/s3Configs/delete-one-s3-blockstore-configuration',
                      },
                    ],
                  },
                  {
                    label: 'Oplog Store',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/admin/backup/oplog-store-config',
                    collapsible: true,
                    items: [
                      {
                        label: 'Get by ID',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/admin/backup/oplog/mongoConfigs/get-one-oplog-configuration-by-id',
                      },
                      {
                        label: 'Get All',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/admin/backup/oplog/mongoConfigs/get-all-oplog-configurations',
                      },
                      {
                        label: 'Create',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/admin/backup/oplog/mongoConfigs/create-one-oplog-configuration',
                      },
                      {
                        label: 'Update',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/admin/backup/oplog/mongoConfigs/update-one-oplog-configuration',
                      },
                      {
                        label: 'Delete',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/admin/backup/oplog/mongoConfigs/delete-one-oplog-configuration',
                      },
                    ],
                  },
                  {
                    label: 'S3 Oplog',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/admin/backup/s3-oplog-store-config',
                    collapsible: true,
                    items: [
                      {
                        label: 'Get by ID',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/admin/backup/oplog/s3Configs/get-one-s3-oplog-configuration-by-id',
                      },
                      {
                        label: 'Get All',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/admin/backup/oplog/s3Configs/get-all-s3-oplog-configurations',
                      },
                      {
                        label: 'Create',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/admin/backup/oplog/s3Configs/create-one-s3-oplog-configuration',
                      },
                      {
                        label: 'Update',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/admin/backup/oplog/s3Configs/update-one-s3-oplog-configuration',
                      },
                      {
                        label: 'Delete',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/admin/backup/oplog/s3Configs/delete-one-s3-oplog-configuration',
                      },
                    ],
                  },
                  {
                    label: 'Sync Store',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/admin/backup/sync-store-config',
                    collapsible: true,
                    items: [
                      {
                        label: 'Get by ID',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/admin/backup/sync/mongoConfigs/get-one-sync-store-configuration-by-id',
                      },
                      {
                        label: 'Get All',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/admin/backup/sync/mongoConfigs/get-all-sync-store-configurations',
                      },
                      {
                        label: 'Create',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/admin/backup/sync/mongoConfigs/create-one-sync-store-configuration',
                      },
                      {
                        label: 'Update',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/admin/backup/sync/mongoConfigs/update-one-sync-store-configuration',
                      },
                      {
                        label: 'Delete',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/admin/backup/sync/mongoConfigs/delete-one-sync-store-configuration',
                      },
                    ],
                  },
                  {
                    label: 'Backup Daemon',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/admin/backup/backup-daemon-config',
                    collapsible: true,
                    items: [
                      {
                        label: 'Get by ID',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/admin/backup/daemonConfigs/get-one-backup-daemon-configuration-by-host',
                      },
                      {
                        label: 'Get All',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/admin/backup/daemonConfigs/get-all-backup-daemon-configurations',
                      },
                      {
                        label: 'Create',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/admin/backup/daemonConfigs/create-one-backup-daemon-configuration',
                      },
                      {
                        label: 'Update',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/admin/backup/daemonConfigs/update-one-backup-daemon-configuration',
                      },
                      {
                        label: 'Delete',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/admin/backup/daemonConfigs/delete-one-backup-daemon-configuration',
                      },
                    ],
                  },
                  {
                    label: 'Project Backup Job',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/admin/backup/backup-group-config',
                    collapsible: true,
                    items: [
                      {
                        label: 'Get by ID',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/admin/backup/groups/get-one-backup-group-configuration-by-id',
                      },
                      {
                        label: 'Get All',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/admin/backup/groups/get-all-backup-group-configurations',
                      },
                      {
                        label: 'Update',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/admin/backup/groups/update-one-backup-group-configuration',
                      },
                    ],
                  },
                  {
                    label: 'Backup Encryption Keys',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/encryption-keys',
                    collapsible: true,
                    items: [
                      {
                        label: 'Retrieve KMIP Master Key ID',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/kmip-keys/get-master-key',
                      },
                      {
                        label: 'Rotate KMIP Master Key ID',
                        contentSite: 'ops-manager',
                        url: '/docs/ops-manager/:version/reference/api/kmip-keys/rotate-master-key',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Migrate to MongoDB Atlas',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/reference/api/cloud-migration',
                collapsible: true,
                items: [
                  {
                    label: 'Connect with Atlas Organization',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/cloud-migration/link-the-organization-with-atlas',
                  },
                  {
                    label: 'Remove Connection',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/cloud-migration/remove-the-link-between-organizations',
                  },
                  {
                    label: 'Return Connection Status',
                    contentSite: 'ops-manager',
                    url: '/docs/ops-manager/:version/reference/api/cloud-migration/return-the-status-of-the-organization-link',
                  },
                ],
              },
            ],
          },
          {
            label: 'Error Codes',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/reference/api-error-codes',
          },
          {
            label: 'Configure Access',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/configure-public-api-access',
            collapsible: true,
            items: [
              {
                label: 'Programmatic Access',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/manage-programmatic-api-keys',
              },
            ],
          },
          {
            label: 'Tutorials',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/tutorial/nav/api-tutorials',
            collapsible: true,
            items: [
              {
                label: 'Deploy Cluster',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/create-cluster-with-api',
              },
              {
                label: 'Update Automation',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/update-automation-configuration',
              },
              {
                label: 'Rotate Key File',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/rotate-key-with-api',
              },
              {
                label: 'Rotate Automation Password',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/rotate-automation-password-with-api',
              },
              {
                label: 'Update MongoDB Version',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/update-mongodb-version-of-deployment-via-api',
              },
              {
                label: 'Automate Backup Restoration',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/automate-backup-restoration-with-api',
              },
              {
                label: 'Upload Latest Version Manifest',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/update-om-with-latest-version-manifest-with-api',
              },
              {
                label: 'Stop Monitoring',
                contentSite: 'ops-manager',
                url: '/docs/ops-manager/:version/tutorial/remove-monitored-process-api',
              },
            ],
          },
        ],
      },
      {
        label: 'Troubleshooting',
        contentSite: 'ops-manager',
        url: '/docs/ops-manager/:version/troubleshooting',
        collapsible: true,
        items: [
          {
            label: 'Getting Started',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/reference/troubleshooting/getting-started',
          },
          {
            label: 'Authentication',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/reference/troubleshooting/authentication',
          },
          {
            label: 'Automation',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/reference/troubleshooting/automation',
          },
          {
            label: 'Monitoring',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/reference/troubleshooting/monitoring',
          },
          {
            label: 'Upgrades',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/reference/troubleshooting/upgrades',
          },
          {
            label: 'Hosts',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/reference/troubleshooting/system',
          },
          {
            label: 'Backup',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/reference/troubleshooting/backup',
          },
          {
            label: 'Kubernetes Operator',
            contentSite: 'mck',
            url: 'https://www.mongodb.com/docs/kubernetes/current/reference/troubleshooting',
          },
        ],
      },
      {
        label: 'FAQ',
        contentSite: 'ops-manager',
        url: '/docs/ops-manager/:version/faq',
        collapsible: true,
        items: [
          {
            label: 'Administration',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/reference/faq/faq-administration',
          },
          {
            label: 'Automation',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/reference/faq/faq-automation',
          },
          {
            label: 'Backup & Restore',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/reference/faq/faq-backup',
          },
          {
            label: 'Monitoring & Alerts',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/reference/faq/faq-monitoring',
          },
          {
            label: 'MongoDB Agent',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/reference/faq/faq-mongodb-agent',
          },
          {
            label: 'Security',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/reference/faq/faq-security',
          },
        ],
      },
      {
        label: 'Reference',
        contentSite: 'ops-manager',
        url: '/docs/ops-manager/:version/reference',
        collapsible: true,
        items: [
          {
            label: 'MongoDB Compatibility',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/reference/mongodb-compatibility',
          },
          {
            label: 'Supported Browsers',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/reference/supported-browsers',
          },
          {
            label: 'Glossary',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/reference/glossary',
          },
          {
            label: 'Configuration Settings',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/reference/configuration',
          },
          {
            label: 'Advanced Options',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/reference/deployment-advanced-options',
          },
          {
            label: 'Automation Configuration',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/reference/cluster-configuration',
          },
          {
            label: 'MongoDB Settings & Automation',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/reference/cluster-configuration-process-options',
          },
          {
            label: 'Database Commands',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/reference/monitoring',
          },
          {
            label: 'Alert Event Types',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/reference/alert-types',
          },
          {
            label: 'Audit Events',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/reference/audit-events',
          },
          {
            label: 'Kubernetes Operator Object Specification',
            contentSite: 'mck',
            url: 'https://www.mongodb.com/docs/kubernetes/current/reference/k8s-operator-specification',
          },
          {
            label: 'Kubernetes Operator Known Issues',
            contentSite: 'mck',
            url: 'https://www.mongodb.com/docs/kubernetes/current/reference/known-issues-k8s-beta',
          },
          {
            label: 'Build a Resilient Application',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/reference/resilient-application',
          },
        ],
      },
      {
        label: 'Release Notes',
        contentSite: 'ops-manager',
        url: '/docs/ops-manager/:version/release-notes',
        collapsible: true,
        items: [
          {
            label: 'Ops Manager Server',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/release-notes/application',
          },
          {
            label: 'MongoDB Agent',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/release-notes/mongodb-agent',
          },
          {
            label: 'Automation Agent',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/release-notes/automation-agent',
          },
          {
            label: 'Monitoring Agent',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/release-notes/monitoring-agent',
          },
          {
            label: 'Backup Agent',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/release-notes/backup-agent',
          },
          {
            label: 'Kubernetes Operator',
            contentSite: 'mck',
            url: 'https://www.mongodb.com/docs/kubernetes/current/release-notes/',
          },
        ],
      },
      {
        label: 'Licensing',
        contentSite: 'ops-manager',
        url: '/docs/ops-manager/:version/reference/legal/live-migration-atlas-licensing',
        collapsible: true,
        items: [
          {
            label: 'Migration Agreement',
            contentSite: 'ops-manager',
            url: '/docs/ops-manager/:version/reference/legal/live-migration-atlas-license',
          },
        ],
      },
      {
        label: 'Third-Party Licenses',
        contentSite: 'ops-manager',
        url: '/docs/ops-manager/:version/reference/third-party-licenses',
      },
    ],
  },
];

export default tocData;
