import type { TocItem } from '../types';
import manualVersions from '../version-arrays/server-docs/manual';

const tocData: TocItem[] = [
  {
    label: 'Installation',
    contentSite: 'docs',
    url: '/docs/:version/installation',
    collapsible: true,
    items: [
      {
        label: 'Community Edition',
        contentSite: 'docs',
        url: '/docs/:version/administration/install-community',
        collapsible: true,
        items: [
          {
            label: 'Install on Linux',
            contentSite: 'docs',
            url: '/docs/:version/administration/install-on-linux',
            collapsible: true,
            versions: { excludes: manualVersions.after('v8.0') },
            items: [
              {
                label: 'Install on Red Hat',
                contentSite: 'docs',
                url: '/docs/:version/tutorial/install-mongodb-on-red-hat',
              },
              {
                label: 'Install on Ubuntu',
                contentSite: 'docs',
                url: '/docs/:version/tutorial/install-mongodb-on-ubuntu',
                collapsible: true,
                items: [
                  {
                    // NOTE: this page appears twice this file because it
                    // appears in different places on the TOC pending version
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
            versions: { excludes: manualVersions.after('v8.0') },
          },
          {
            label: 'Install on Windows',
            contentSite: 'docs',
            url: '/docs/:version/tutorial/install-mongodb-on-windows',
            versions: { excludes: manualVersions.after('v8.0') },
          },
          {
            label: 'Install with Docker',
            contentSite: 'docs',
            url: '/docs/:version/tutorial/install-mongodb-community-with-docker',
            versions: { excludes: manualVersions.after('v8.0') },
          },
          {
            label: 'Troubleshoot Ubuntu Installation',
            contentSite: 'docs',
            url: '/docs/:version/reference/installation-ubuntu-community-troubleshooting',
            versions: { includes: manualVersions.after('v8.0') },
          },
          {
            label: 'Connect to Search',
            contentSite: 'docs',
            versions: { excludes: manualVersions.before('v8.2') },
            url: '/docs/:version/core/search-in-community/connect-to-search',
          },
          {
            label: 'Deploy Replica Set for Search',
            contentSite: 'docs',
            versions: { excludes: manualVersions.before('v8.2') },
            url: '/docs/:version/core/search-in-community/deploy-rs-keyfile-mongot',
          },
        ],
      },
      {
        label: 'Enterprise',
        contentSite: 'docs',
        url: '/docs/:version/administration/install-enterprise',
        collapsible: true,
        items: [
          {
            label: 'Install on Linux',
            contentSite: 'docs',
            url: '/docs/:version/administration/install-enterprise-linux',
            collapsible: true,
            items: [
              {
                label: 'Install on Red Hat',
                contentSite: 'docs',
                url: '/docs/:version/tutorial/install-mongodb-enterprise-on-red-hat',
                collapsible: true,
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
                url: '/docs/:version/tutorial/install-mongodb-enterprise-on-ubuntu',
                collapsible: true,
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
                url: '/docs/:version/tutorial/install-mongodb-enterprise-on-debian',
                collapsible: true,
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
                url: '/docs/:version/tutorial/install-mongodb-enterprise-on-suse',
                collapsible: true,
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
                url: '/docs/:version/tutorial/install-mongodb-enterprise-on-amazon',
                collapsible: true,
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
            url: '/docs/:version/tutorial/install-mongodb-enterprise-on-windows',
            collapsible: true,
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
        url: '/docs/:version/administration/upgrade-community-to-enterprise',
        collapsible: true,
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
        versions: { excludes: manualVersions.before('v8.2') },
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
        url: '/docs/:version/reference/program',
        collapsible: true,
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
            contentSite: 'database-tools',
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
            url: '/docs/:version/core/replica-set-architectures',
            collapsible: true,
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
            url: '/docs/:version/administration/replica-set-deployment',
            collapsible: true,
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
            url: '/docs/:version/administration/replica-set-member-configuration',
            collapsible: true,
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
            url: '/docs/:version/administration/replica-set-maintenance',
            collapsible: true,
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
                label: "Configure a Secondary's Sync Target",
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
            versions: { excludes: ['v7.0'] },
          },
          {
            label: 'UNIX ulimit Settings',
            contentSite: 'docs',
            url: '/docs/:version/reference/ulimit',
          },
          {
            label: 'TCMalloc Performance',
            contentSite: 'docs',
            url: '/docs/:version/administration/tcmalloc-performance',
            collapsible: true,
            items: [
              {
                label: 'Disable Transparent Huge Pages',
                contentSite: 'docs',
                url: '/docs/:version/tutorial/disable-transparent-huge-pages',
                versions: { excludes: manualVersions.before('v8.0') },
              },
              {
                label: 'Disable Transparent Huge Pages',
                contentSite: 'docs',
                url: '/docs/:version/tutorial/transparent-huge-pages',
                versions: { includes: manualVersions.before('v8.0') },
              },
            ],
          },
        ],
      },
      {
        label: 'Configuration and Maintenance',
        contentSite: 'docs',
        url: '/docs/:version/administration/self-managed-configuration-and-maintenance',
        collapsible: true,
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
            url: '/docs/:version/reference/configuration-options',
            collapsible: true,
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
                label:
                  'Configuration File Settings and Command-Line Options Mapping',
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
            url: '/docs/:version/reference/cluster-parameters',
            collapsible: true,
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
                versions: { excludes: manualVersions.before('v8.2') },
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
            url: '/docs/:version/tutorial/deploy-shard-cluster',
            collapsible: true,
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
            url: '/docs/:version/core/zone-sharding',
            collapsible: true,
            items: [
              {
                label: 'Manage',
                contentSite: 'docs',
                url: '/docs/:version/tutorial/manage-shard-zone',
                collapsible: true,
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
            url: '/docs/:version/administration/sharded-cluster-administration',
            collapsible: true,
            items: [
              {
                label: 'Scaling Strategies',
                contentSite: 'docs',
                url: '/docs/:version/core/sharding-scaling-strategies',
                collapsible: true,
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
                label: 'Clear jumbo Flag',
                contentSite: 'docs',
                url: '/docs/:version/tutorial/clear-jumbo-flag',
              },
              {
                label: 'Config Shard',
                contentSite: 'docs',
                url: '/docs/:version/core/config-shard',
                collapsible: true,
                items: [
                  {
                    label:
                      'Convert a Replica Set to a Sharded Cluster with an Embedded Config Server',
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
            url: '/docs/:version/reference/sharding',
            collapsible: true,
            items: [
              {
                label: 'Config Database',
                contentSite: 'docs',
                url: '/docs/:version/reference/config-database',
              },
              {
                label: 'Defragment Sharded Collections',
                contentSite: 'docs',
                url: '/docs/:version/core/defragment-sharded-collections',
                collapsible: true,
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
                url: '/docs/:version/reference/inconsistency-type',
                collapsible: true,
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
                    versions: { excludes: manualVersions.before('v8.2') },
                  },
                  {
                    label: 'ShardMissingCollectionRoutingInfo',
                    contentSite: 'docs',
                    url: '/docs/:version/reference/inconsistency-type/ShardMissingCollectionRoutingInfo',
                    versions: { excludes: ['v7.0'] },
                  },
                  {
                    label: 'ShardThinksCollectionIsUnsharded',
                    contentSite: 'docs',
                    url: '/docs/:version/reference/inconsistency-type/ShardThinksCollectionIsUnsharded',
                    versions: { includes: ['v7.0'] },
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
        versions: { excludes: manualVersions.before('v8.2') },
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
        url: '/docs/:version/core/storage-engines',
        collapsible: true,
        items: [
          {
            label: 'WiredTiger Storage Engine',
            contentSite: 'docs',
            url: '/docs/:version/core/wiredtiger',
            collapsible: true,
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
        url: '/docs/:version/core/security-encryption-at-rest',
        collapsible: true,
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
        url: '/docs/:version/core/journaling',
        collapsible: true,
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
    url: '/docs/:version/core/backups',
    collapsible: true,
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
        url: '/docs/:version/administration/backup-sharded-clusters',
        collapsible: true,
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
    url: '/docs/:version/administration/monitoring',
    collapsible: true,
    items: [
      {
        label: 'FAQ: MongoDB Diagnostics',
        contentSite: 'docs',
        url: '/docs/:version/faq/diagnostics',
      },
      {
        label: 'Management',
        contentSite: 'docs',
        url: '/docs/:version/administration/configuration-and-maintenance',
        collapsible: true,
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
    url: '/docs/:version/core/self-managed-security',
    collapsible: true,
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
        url: '/docs/:version/core/security-users',
        collapsible: true,
        items: [
          {
            label: 'Authentication',
            contentSite: 'docs',
            url: '/docs/:version/core/authentication',
            collapsible: true,
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
                url: '/docs/:version/core/security-scram',
                collapsible: true,
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
                url: '/docs/:version/core/security-x.509',
                collapsible: true,
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
                url: '/docs/:version/core/kerberos',
                collapsible: true,
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
                url: '/docs/:version/core/security-ldap',
                collapsible: true,
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
                url: '/docs/:version/core/oidc/security-oidc',
                collapsible: true,
                items: [
                  {
                    label: 'Workforce (Humans)',
                    contentSite: 'docs',
                    url: '/docs/:version/core/oidc/workforce',
                    collapsible: true,
                    items: [
                      {
                        label:
                          'Configure an External Identity Provider for Workforce Authentication',
                        contentSite: 'docs',
                        url: '/docs/:version/core/oidc/workforce/workforce-external-provider',
                      },
                      {
                        label:
                          'Configure MongoDB with Workforce Identity Federation',
                        contentSite: 'docs',
                        url: '/docs/:version/core/oidc/workforce/configure-oidc',
                      },
                      {
                        label:
                          'Authorize Users with Workforce Identity Federation',
                        contentSite: 'docs',
                        url: '/docs/:version/core/oidc/workforce/database-user-workforce',
                      },
                    ],
                  },
                  {
                    label: 'Workload (Applications)',
                    contentSite: 'docs',
                    url: '/docs/:version/core/oidc/workload',
                    collapsible: true,
                    items: [
                      {
                        label:
                          'Configure an External Identity Provider for Workload Authentication',
                        contentSite: 'docs',
                        url: '/docs/:version/core/oidc/workload/workload-external-provider',
                      },
                      {
                        label:
                          'Configure MongoDB with Workload Identity Federation',
                        contentSite: 'docs',
                        url: '/docs/:version/core/oidc/workload/configure-mongodb-workload',
                      },
                      {
                        label:
                          'Authorize Users with Workload Identity Federation',
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
                url: '/docs/:version/core/security-internal-authentication',
                collapsible: true,
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
            url: '/docs/:version/core/authorization',
            collapsible: true,
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
        url: '/docs/:version/core/security-hardening',
        collapsible: true,
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
            url: '/docs/:version/core/security-transport-encryption',
            collapsible: true,
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
        url: '/docs/:version/core/auditing',
        collapsible: true,
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
            url: '/docs/:version/reference/audit-message',
            collapsible: true,
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
        url: '/docs/:version/reference/security',
        collapsible: true,
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
        url: '/docs/:version/appendix/security',
        collapsible: true,
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
    contentSite: 'docs',
    url: 'https://www.mongodb.com/docs/manual/release-notes/',
  },
  {
    label: 'FAQ',
    contentSite: 'docs',
    url: '/docs/:version/faq',
    collapsible: true,
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
];

export default tocData;
