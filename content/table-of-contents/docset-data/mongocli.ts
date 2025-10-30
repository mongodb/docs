import type { TocItem } from '../types';

const tocData: TocItem[] = [
  {
    label: 'MongoCLI',
    contentSite: 'mongocli',
    group: true,
    versionDropdown: true,
    items: [
      {
        label: 'Overview',
        contentSite: 'mongocli',
        url: '/docs/mongocli/:version/',
      },
      {
        label: 'Compatibility',
        contentSite: 'mongocli',
        url: '/docs/mongocli/:version/install/compatibility',
      },
      {
        label: 'Install or Update',
        contentSite: 'mongocli',
        url: '/docs/mongocli/:version/install',
        collapsible: true,
        items: [
          {
            label: 'Verify Packages',
            contentSite: 'mongocli',
            url: '/docs/mongocli/:version/verify-packages',
          },
        ],
      },
      {
        label: 'Configure',
        contentSite: 'mongocli',
        url: '/docs/mongocli/:version/configure',
        collapsible: true,
        items: [
          {
            label: 'Configuration File',
            contentSite: 'mongocli',
            url: '/docs/mongocli/:version/configure/configuration-file',
          },
          {
            label: 'Environment Variables',
            contentSite: 'mongocli',
            url: '/docs/mongocli/:version/configure/environment-variables',
          },
          {
            label: 'Enable Autocomplete',
            contentSite: 'mongocli',
            url: '/docs/mongocli/:version/configure/autocomplete',
          },
          {
            label: 'Customize Output',
            contentSite: 'mongocli',
            url: '/docs/mongocli/:version/configure/custom-output',
          },
        ],
      },
      {
        label: 'Quick Start',
        contentSite: 'mongocli',
        url: '/docs/mongocli/:version/quick-start',
        collapsible: true,
        items: [
          {
            label: 'Use Cloud Manager',
            contentSite: 'mongocli',
            url: '/docs/mongocli/:version/quick-start/cloudmgr',
          },
          {
            label: 'Use Ops Manager',
            contentSite: 'mongocli',
            url: '/docs/mongocli/:version/quick-start/opsmgr',
          },
        ],
      },
      {
        label: 'Commands',
        contentSite: 'mongocli',
        url: '/docs/mongocli/:version/command/mongocli',
        collapsible: true,
        items: [
          {
            label: 'auth',
            contentSite: 'mongocli',
            url: '/docs/mongocli/:version/command/mongocli-auth',
            collapsible: true,
            items: [
              {
                label: 'login',
                contentSite: 'mongocli',
                url: '/docs/mongocli/:version/command/mongocli-auth-login',
              },
              {
                label: 'logout',
                contentSite: 'mongocli',
                url: '/docs/mongocli/:version/command/mongocli-auth-logout',
              },
              {
                label: 'whoami',
                contentSite: 'mongocli',
                url: '/docs/mongocli/:version/command/mongocli-auth-whoami',
              },
            ],
          },
          {
            label: 'cloud-manager',
            contentSite: 'mongocli',
            url: '/docs/mongocli/:version/command/mongocli-cloud-manager',
            collapsible: true,
            items: [
              {
                label: 'agents',
                contentSite: 'mongocli',
                url: '/docs/mongocli/:version/command/mongocli-cloud-manager-agents',
                collapsible: true,
                items: [
                  {
                    label: 'apiKeys',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-cloud-manager-agents-apiKeys',
                    collapsible: true,
                    items: [
                      {
                        label: 'create',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-cloud-manager-agents-apiKeys-create',
                      },
                      {
                        label: 'delete',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-cloud-manager-agents-apiKeys-delete',
                      },
                      {
                        label: 'list',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-cloud-manager-agents-apiKeys-list',
                      },
                    ],
                  },
                  {
                    label: 'list',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-cloud-manager-agents-list',
                  },
                  {
                    label: 'upgrade',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-cloud-manager-agents-upgrade',
                  },
                  {
                    label: 'versions',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-cloud-manager-agents-versions',
                    collapsible: true,
                    items: [
                      {
                        label: 'list',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-cloud-manager-agents-versions-list',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'alerts',
                contentSite: 'mongocli',
                url: '/docs/mongocli/:version/command/mongocli-cloud-manager-alerts',
                collapsible: true,
                items: [
                  {
                    label: 'acknowledge',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-cloud-manager-alerts-acknowledge',
                  },
                  {
                    label: 'describe',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-cloud-manager-alerts-describe',
                  },
                  {
                    label: 'global',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-cloud-manager-alerts-global',
                    collapsible: true,
                    items: [
                      {
                        label: 'list',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-cloud-manager-alerts-global-list',
                      },
                    ],
                  },
                  {
                    label: 'list',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-cloud-manager-alerts-list',
                  },
                  {
                    label: 'settings',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-cloud-manager-alerts-settings',
                    collapsible: true,
                    items: [
                      {
                        label: 'create',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-cloud-manager-alerts-settings-create',
                      },
                      {
                        label: 'delete',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-cloud-manager-alerts-settings-delete',
                      },
                      {
                        label: 'disable',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-cloud-manager-alerts-settings-disable',
                      },
                      {
                        label: 'enable',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-cloud-manager-alerts-settings-enable',
                      },
                      {
                        label: 'fields',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-cloud-manager-alerts-settings-fields',
                        collapsible: true,
                        items: [
                          {
                            label: 'type',
                            contentSite: 'mongocli',
                            url: '/docs/mongocli/:version/command/mongocli-cloud-manager-alerts-settings-fields-type',
                          },
                        ],
                      },
                      {
                        label: 'list',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-cloud-manager-alerts-settings-list',
                      },
                      {
                        label: 'update',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-cloud-manager-alerts-settings-update',
                      },
                    ],
                  },
                  {
                    label: 'unacknowledge',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-cloud-manager-alerts-unacknowledge',
                  },
                ],
              },
              {
                label: 'automation',
                contentSite: 'mongocli',
                url: '/docs/mongocli/:version/command/mongocli-cloud-manager-automation',
                collapsible: true,
                items: [
                  {
                    label: 'describe',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-cloud-manager-automation-describe',
                  },
                  {
                    label: 'status',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-cloud-manager-automation-status',
                  },
                  {
                    label: 'update',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-cloud-manager-automation-update',
                  },
                  {
                    label: 'watch',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-cloud-manager-automation-watch',
                  },
                ],
              },
              {
                label: 'backups',
                contentSite: 'mongocli',
                url: '/docs/mongocli/:version/command/mongocli-cloud-manager-backups',
                collapsible: true,
                items: [
                  {
                    label: 'checkpoints',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-cloud-manager-backups-checkpoints',
                    collapsible: true,
                    items: [
                      {
                        label: 'list',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-cloud-manager-backups-checkpoints-list',
                      },
                    ],
                  },
                  {
                    label: 'config',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-cloud-manager-backups-config',
                    collapsible: true,
                    items: [
                      {
                        label: 'describe',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-cloud-manager-backups-config-describe',
                      },
                      {
                        label: 'list',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-cloud-manager-backups-config-list',
                      },
                      {
                        label: 'update',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-cloud-manager-backups-config-update',
                      },
                    ],
                  },
                  {
                    label: 'disable',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-cloud-manager-backups-disable',
                  },
                  {
                    label: 'enable',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-cloud-manager-backups-enable',
                  },
                  {
                    label: 'restores',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-cloud-manager-backups-restores',
                    collapsible: true,
                    items: [
                      {
                        label: 'list',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-cloud-manager-backups-restores-list',
                      },
                      {
                        label: 'start',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-cloud-manager-backups-restores-start',
                      },
                    ],
                  },
                  {
                    label: 'snapshots',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-cloud-manager-backups-snapshots',
                    collapsible: true,
                    items: [
                      {
                        label: 'list',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-cloud-manager-backups-snapshots-list',
                      },
                      {
                        label: 'schedule',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-cloud-manager-backups-snapshots-schedule',
                        collapsible: true,
                        items: [
                          {
                            label: 'describe',
                            contentSite: 'mongocli',
                            url: '/docs/mongocli/:version/command/mongocli-cloud-manager-backups-snapshots-schedule-describe',
                          },
                          {
                            label: 'update',
                            contentSite: 'mongocli',
                            url: '/docs/mongocli/:version/command/mongocli-cloud-manager-backups-snapshots-schedule-update',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                label: 'clusters',
                contentSite: 'mongocli',
                url: '/docs/mongocli/:version/command/mongocli-cloud-manager-clusters',
                collapsible: true,
                items: [
                  {
                    label: 'apply',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-cloud-manager-clusters-apply',
                  },
                  {
                    label: 'create',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-cloud-manager-clusters-create',
                  },
                  {
                    label: 'delete',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-cloud-manager-clusters-delete',
                  },
                  {
                    label: 'describe',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-cloud-manager-clusters-describe',
                  },
                  {
                    label: 'indexes',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-cloud-manager-clusters-indexes',
                    collapsible: true,
                    items: [
                      {
                        label: 'create',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-cloud-manager-clusters-indexes-create',
                      },
                    ],
                  },
                  {
                    label: 'list',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-cloud-manager-clusters-list',
                  },
                  {
                    label: 'reclaimFreeSpace',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-cloud-manager-clusters-reclaimFreeSpace',
                  },
                  {
                    label: 'restart',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-cloud-manager-clusters-restart',
                  },
                  {
                    label: 'resync',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-cloud-manager-clusters-resync',
                  },
                  {
                    label: 'shutdown',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-cloud-manager-clusters-shutdown',
                  },
                  {
                    label: 'startup',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-cloud-manager-clusters-startup',
                  },
                  {
                    label: 'unmanage',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-cloud-manager-clusters-unmanage',
                  },
                  {
                    label: 'update',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-cloud-manager-clusters-update',
                  },
                ],
              },
              {
                label: 'dbusers',
                contentSite: 'mongocli',
                url: '/docs/mongocli/:version/command/mongocli-cloud-manager-dbusers',
                collapsible: true,
                items: [
                  {
                    label: 'create',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-cloud-manager-dbusers-create',
                  },
                  {
                    label: 'delete',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-cloud-manager-dbusers-delete',
                  },
                  {
                    label: 'list',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-cloud-manager-dbusers-list',
                  },
                ],
              },
              {
                label: 'events',
                contentSite: 'mongocli',
                url: '/docs/mongocli/:version/command/mongocli-cloud-manager-events',
                collapsible: true,
                items: [
                  {
                    label: 'organizations',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-cloud-manager-events-organizations',
                    collapsible: true,
                    items: [
                      {
                        label: 'list',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-cloud-manager-events-organizations-list',
                      },
                    ],
                  },
                  {
                    label: 'projects',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-cloud-manager-events-projects',
                    collapsible: true,
                    items: [
                      {
                        label: 'list',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-cloud-manager-events-projects-list',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'featurePolicies',
                contentSite: 'mongocli',
                url: '/docs/mongocli/:version/command/mongocli-cloud-manager-featurePolicies',
                collapsible: true,
                items: [
                  {
                    label: 'list',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-cloud-manager-featurePolicies-list',
                  },
                  {
                    label: 'update',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-cloud-manager-featurePolicies-update',
                  },
                ],
              },
              {
                label: 'liveMigrations',
                contentSite: 'mongocli',
                url: '/docs/mongocli/:version/command/mongocli-cloud-manager-liveMigrations',
                collapsible: true,
                items: [
                  {
                    label: 'link',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-cloud-manager-liveMigrations-link',
                    collapsible: true,
                    items: [
                      {
                        label: 'create',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-cloud-manager-liveMigrations-link-create',
                      },
                      {
                        label: 'delete',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-cloud-manager-liveMigrations-link-delete',
                      },
                      {
                        label: 'describe',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-cloud-manager-liveMigrations-link-describe',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'logs',
                contentSite: 'mongocli',
                url: '/docs/mongocli/:version/command/mongocli-cloud-manager-logs',
                collapsible: true,
                items: [
                  {
                    label: 'decrypt',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-cloud-manager-logs-decrypt',
                  },
                  {
                    label: 'jobs',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-cloud-manager-logs-jobs',
                    collapsible: true,
                    items: [
                      {
                        label: 'collect',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-cloud-manager-logs-jobs-collect',
                      },
                      {
                        label: 'delete',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-cloud-manager-logs-jobs-delete',
                      },
                      {
                        label: 'download',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-cloud-manager-logs-jobs-download',
                      },
                      {
                        label: 'list',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-cloud-manager-logs-jobs-list',
                      },
                    ],
                  },
                  {
                    label: 'keyProviders',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-cloud-manager-logs-keyProviders',
                    collapsible: true,
                    items: [
                      {
                        label: 'list',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-cloud-manager-logs-keyProviders-list',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'maintenanceWindows',
                contentSite: 'mongocli',
                url: '/docs/mongocli/:version/command/mongocli-cloud-manager-maintenanceWindows',
                collapsible: true,
                items: [
                  {
                    label: 'create',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-cloud-manager-maintenanceWindows-create',
                  },
                  {
                    label: 'delete',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-cloud-manager-maintenanceWindows-delete',
                  },
                  {
                    label: 'describe',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-cloud-manager-maintenanceWindows-describe',
                  },
                  {
                    label: 'list',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-cloud-manager-maintenanceWindows-list',
                  },
                  {
                    label: 'update',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-cloud-manager-maintenanceWindows-update',
                  },
                ],
              },
              {
                label: 'metrics',
                contentSite: 'mongocli',
                url: '/docs/mongocli/:version/command/mongocli-cloud-manager-metrics',
                collapsible: true,
                items: [
                  {
                    label: 'databases',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-cloud-manager-metrics-databases',
                    collapsible: true,
                    items: [
                      {
                        label: 'describe',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-cloud-manager-metrics-databases-describe',
                      },
                      {
                        label: 'list',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-cloud-manager-metrics-databases-list',
                      },
                    ],
                  },
                  {
                    label: 'disks',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-cloud-manager-metrics-disks',
                    collapsible: true,
                    items: [
                      {
                        label: 'describe',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-cloud-manager-metrics-disks-describe',
                      },
                      {
                        label: 'list',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-cloud-manager-metrics-disks-list',
                      },
                    ],
                  },
                  {
                    label: 'process',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-cloud-manager-metrics-process',
                  },
                ],
              },
              {
                label: 'monitoring',
                contentSite: 'mongocli',
                url: '/docs/mongocli/:version/command/mongocli-cloud-manager-monitoring',
                collapsible: true,
                items: [
                  {
                    label: 'disable',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-cloud-manager-monitoring-disable',
                  },
                  {
                    label: 'enable',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-cloud-manager-monitoring-enable',
                  },
                  {
                    label: 'stop',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-cloud-manager-monitoring-stop',
                  },
                ],
              },
              {
                label: 'performanceAdvisor',
                contentSite: 'mongocli',
                url: '/docs/mongocli/:version/command/mongocli-cloud-manager-performanceAdvisor',
                collapsible: true,
                items: [
                  {
                    label: 'namespaces',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-cloud-manager-performanceAdvisor-namespaces',
                    collapsible: true,
                    items: [
                      {
                        label: 'list',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-cloud-manager-performanceAdvisor-namespaces-list',
                      },
                    ],
                  },
                  {
                    label: 'slowQueryLogs',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-cloud-manager-performanceAdvisor-slowQueryLogs',
                    collapsible: true,
                    items: [
                      {
                        label: 'list',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-cloud-manager-performanceAdvisor-slowQueryLogs-list',
                      },
                    ],
                  },
                  {
                    label: 'suggestedIndexes',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-cloud-manager-performanceAdvisor-suggestedIndexes',
                    collapsible: true,
                    items: [
                      {
                        label: 'list',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-cloud-manager-performanceAdvisor-suggestedIndexes-list',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'processes',
                contentSite: 'mongocli',
                url: '/docs/mongocli/:version/command/mongocli-cloud-manager-processes',
                collapsible: true,
                items: [
                  {
                    label: 'describe',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-cloud-manager-processes-describe',
                  },
                  {
                    label: 'list',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-cloud-manager-processes-list',
                  },
                ],
              },
              {
                label: 'security',
                contentSite: 'mongocli',
                url: '/docs/mongocli/:version/command/mongocli-cloud-manager-security',
                collapsible: true,
                items: [
                  {
                    label: 'enable',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-cloud-manager-security-enable',
                  },
                ],
              },
              {
                label: 'servers',
                contentSite: 'mongocli',
                url: '/docs/mongocli/:version/command/mongocli-cloud-manager-servers',
                collapsible: true,
                items: [
                  {
                    label: 'list',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-cloud-manager-servers-list',
                  },
                ],
              },
            ],
          },
          {
            label: 'completion',
            contentSite: 'mongocli',
            url: '/docs/mongocli/:version/command/mongocli-completion',
            collapsible: true,
            items: [
              {
                label: 'bash',
                contentSite: 'mongocli',
                url: '/docs/mongocli/:version/command/mongocli-completion-bash',
              },
              {
                label: 'fish',
                contentSite: 'mongocli',
                url: '/docs/mongocli/:version/command/mongocli-completion-fish',
              },
              {
                label: 'powershell',
                contentSite: 'mongocli',
                url: '/docs/mongocli/:version/command/mongocli-completion-powershell',
              },
              {
                label: 'zsh',
                contentSite: 'mongocli',
                url: '/docs/mongocli/:version/command/mongocli-completion-zsh',
              },
            ],
          },
          {
            label: 'config',
            contentSite: 'mongocli',
            url: '/docs/mongocli/:version/command/mongocli-config',
            collapsible: true,
            items: [
              {
                label: 'delete',
                contentSite: 'mongocli',
                url: '/docs/mongocli/:version/command/mongocli-config-delete',
              },
              {
                label: 'describe',
                contentSite: 'mongocli',
                url: '/docs/mongocli/:version/command/mongocli-config-describe',
              },
              {
                label: 'edit',
                contentSite: 'mongocli',
                url: '/docs/mongocli/:version/command/mongocli-config-edit',
              },
              {
                label: 'list',
                contentSite: 'mongocli',
                url: '/docs/mongocli/:version/command/mongocli-config-list',
              },
              {
                label: 'rename',
                contentSite: 'mongocli',
                url: '/docs/mongocli/:version/command/mongocli-config-rename',
              },
              {
                label: 'set',
                contentSite: 'mongocli',
                url: '/docs/mongocli/:version/command/mongocli-config-set',
              },
            ],
          },
          {
            label: 'iam',
            contentSite: 'mongocli',
            url: '/docs/mongocli/:version/command/mongocli-iam',
            collapsible: true,
            items: [
              {
                label: 'globalAccessLists',
                contentSite: 'mongocli',
                url: '/docs/mongocli/:version/command/mongocli-iam-globalAccessLists',
                collapsible: true,
                items: [
                  {
                    label: 'create',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-iam-globalAccessLists-create',
                  },
                  {
                    label: 'delete',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-iam-globalAccessLists-delete',
                  },
                  {
                    label: 'describe',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-iam-globalAccessLists-describe',
                  },
                  {
                    label: 'list',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-iam-globalAccessLists-list',
                  },
                ],
              },
              {
                label: 'globalApiKeys',
                contentSite: 'mongocli',
                url: '/docs/mongocli/:version/command/mongocli-iam-globalApiKeys',
                collapsible: true,
                items: [
                  {
                    label: 'create',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-iam-globalApiKeys-create',
                  },
                  {
                    label: 'delete',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-iam-globalApiKeys-delete',
                  },
                  {
                    label: 'describe',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-iam-globalApiKeys-describe',
                  },
                  {
                    label: 'list',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-iam-globalApiKeys-list',
                  },
                  {
                    label: 'update',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-iam-globalApiKeys-update',
                  },
                ],
              },
              {
                label: 'organizations',
                contentSite: 'mongocli',
                url: '/docs/mongocli/:version/command/mongocli-iam-organizations',
                collapsible: true,
                items: [
                  {
                    label: 'apiKeys',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-iam-organizations-apiKeys',
                    collapsible: true,
                    items: [
                      {
                        label: 'accessLists',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-iam-organizations-apiKeys-accessLists',
                        collapsible: true,
                        items: [
                          {
                            label: 'create',
                            contentSite: 'mongocli',
                            url: '/docs/mongocli/:version/command/mongocli-iam-organizations-apiKeys-accessLists-create',
                          },
                          {
                            label: 'delete',
                            contentSite: 'mongocli',
                            url: '/docs/mongocli/:version/command/mongocli-iam-organizations-apiKeys-accessLists-delete',
                          },
                          {
                            label: 'list',
                            contentSite: 'mongocli',
                            url: '/docs/mongocli/:version/command/mongocli-iam-organizations-apiKeys-accessLists-list',
                          },
                        ],
                      },
                      {
                        label: 'assign',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-iam-organizations-apiKeys-assign',
                      },
                      {
                        label: 'create',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-iam-organizations-apiKeys-create',
                      },
                      {
                        label: 'delete',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-iam-organizations-apiKeys-delete',
                      },
                      {
                        label: 'describe',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-iam-organizations-apiKeys-describe',
                      },
                      {
                        label: 'list',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-iam-organizations-apiKeys-list',
                      },
                    ],
                  },
                  {
                    label: 'create',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-iam-organizations-create',
                  },
                  {
                    label: 'delete',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-iam-organizations-delete',
                  },
                  {
                    label: 'describe',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-iam-organizations-describe',
                  },
                  {
                    label: 'invitations',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-iam-organizations-invitations',
                    collapsible: true,
                    items: [
                      {
                        label: 'delete',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-iam-organizations-invitations-delete',
                      },
                      {
                        label: 'describe',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-iam-organizations-invitations-describe',
                      },
                      {
                        label: 'invite',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-iam-organizations-invitations-invite',
                      },
                      {
                        label: 'list',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-iam-organizations-invitations-list',
                      },
                      {
                        label: 'update',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-iam-organizations-invitations-update',
                      },
                    ],
                  },
                  {
                    label: 'list',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-iam-organizations-list',
                  },
                  {
                    label: 'users',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-iam-organizations-users',
                    collapsible: true,
                    items: [
                      {
                        label: 'list',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-iam-organizations-users-list',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'projects',
                contentSite: 'mongocli',
                url: '/docs/mongocli/:version/command/mongocli-iam-projects',
                collapsible: true,
                items: [
                  {
                    label: 'apiKeys',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-iam-projects-apiKeys',
                    collapsible: true,
                    items: [
                      {
                        label: 'assign',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-iam-projects-apiKeys-assign',
                      },
                      {
                        label: 'create',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-iam-projects-apiKeys-create',
                      },
                      {
                        label: 'delete',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-iam-projects-apiKeys-delete',
                      },
                      {
                        label: 'list',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-iam-projects-apiKeys-list',
                      },
                    ],
                  },
                  {
                    label: 'create',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-iam-projects-create',
                  },
                  {
                    label: 'delete',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-iam-projects-delete',
                  },
                  {
                    label: 'describe',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-iam-projects-describe',
                  },
                  {
                    label: 'invitations',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-iam-projects-invitations',
                    collapsible: true,
                    items: [
                      {
                        label: 'delete',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-iam-projects-invitations-delete',
                      },
                      {
                        label: 'describe',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-iam-projects-invitations-describe',
                      },
                      {
                        label: 'invite',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-iam-projects-invitations-invite',
                      },
                      {
                        label: 'list',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-iam-projects-invitations-list',
                      },
                      {
                        label: 'update',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-iam-projects-invitations-update',
                      },
                    ],
                  },
                  {
                    label: 'list',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-iam-projects-list',
                  },
                  {
                    label: 'teams',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-iam-projects-teams',
                    collapsible: true,
                    items: [
                      {
                        label: 'add',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-iam-projects-teams-add',
                      },
                      {
                        label: 'delete',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-iam-projects-teams-delete',
                      },
                      {
                        label: 'list',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-iam-projects-teams-list',
                      },
                      {
                        label: 'update',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-iam-projects-teams-update',
                      },
                    ],
                  },
                  {
                    label: 'users',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-iam-projects-users',
                    collapsible: true,
                    items: [
                      {
                        label: 'delete',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-iam-projects-users-delete',
                      },
                      {
                        label: 'list',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-iam-projects-users-list',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'teams',
                contentSite: 'mongocli',
                url: '/docs/mongocli/:version/command/mongocli-iam-teams',
                collapsible: true,
                items: [
                  {
                    label: 'create',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-iam-teams-create',
                  },
                  {
                    label: 'delete',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-iam-teams-delete',
                  },
                  {
                    label: 'describe',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-iam-teams-describe',
                  },
                  {
                    label: 'list',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-iam-teams-list',
                  },
                  {
                    label: 'users',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-iam-teams-users',
                    collapsible: true,
                    items: [
                      {
                        label: 'add',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-iam-teams-users-add',
                      },
                      {
                        label: 'delete',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-iam-teams-users-delete',
                      },
                      {
                        label: 'list',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-iam-teams-users-list',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'users',
                contentSite: 'mongocli',
                url: '/docs/mongocli/:version/command/mongocli-iam-users',
                collapsible: true,
                items: [
                  {
                    label: 'delete',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-iam-users-delete',
                  },
                  {
                    label: 'describe',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-iam-users-describe',
                  },
                  {
                    label: 'invite',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-iam-users-invite',
                  },
                ],
              },
            ],
          },
          {
            label: 'ops-manager',
            contentSite: 'mongocli',
            url: '/docs/mongocli/:version/command/mongocli-ops-manager',
            collapsible: true,
            items: [
              {
                label: 'admin',
                contentSite: 'mongocli',
                url: '/docs/mongocli/:version/command/mongocli-ops-manager-admin',
                collapsible: true,
                items: [
                  {
                    label: 'backups',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-admin-backups',
                    collapsible: true,
                    items: [
                      {
                        label: 'blockstores',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-ops-manager-admin-backups-blockstores',
                        collapsible: true,
                        items: [
                          {
                            label: 'create',
                            contentSite: 'mongocli',
                            url: '/docs/mongocli/:version/command/mongocli-ops-manager-admin-backups-blockstores-create',
                          },
                          {
                            label: 'delete',
                            contentSite: 'mongocli',
                            url: '/docs/mongocli/:version/command/mongocli-ops-manager-admin-backups-blockstores-delete',
                          },
                          {
                            label: 'describe',
                            contentSite: 'mongocli',
                            url: '/docs/mongocli/:version/command/mongocli-ops-manager-admin-backups-blockstores-describe',
                          },
                          {
                            label: 'list',
                            contentSite: 'mongocli',
                            url: '/docs/mongocli/:version/command/mongocli-ops-manager-admin-backups-blockstores-list',
                          },
                          {
                            label: 'update',
                            contentSite: 'mongocli',
                            url: '/docs/mongocli/:version/command/mongocli-ops-manager-admin-backups-blockstores-update',
                          },
                        ],
                      },
                      {
                        label: 'fileSystems',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-ops-manager-admin-backups-fileSystems',
                        collapsible: true,
                        items: [
                          {
                            label: 'create',
                            contentSite: 'mongocli',
                            url: '/docs/mongocli/:version/command/mongocli-ops-manager-admin-backups-fileSystems-create',
                          },
                          {
                            label: 'delete',
                            contentSite: 'mongocli',
                            url: '/docs/mongocli/:version/command/mongocli-ops-manager-admin-backups-fileSystems-delete',
                          },
                          {
                            label: 'describe',
                            contentSite: 'mongocli',
                            url: '/docs/mongocli/:version/command/mongocli-ops-manager-admin-backups-fileSystems-describe',
                          },
                          {
                            label: 'list',
                            contentSite: 'mongocli',
                            url: '/docs/mongocli/:version/command/mongocli-ops-manager-admin-backups-fileSystems-list',
                          },
                          {
                            label: 'update',
                            contentSite: 'mongocli',
                            url: '/docs/mongocli/:version/command/mongocli-ops-manager-admin-backups-fileSystems-update',
                          },
                        ],
                      },
                      {
                        label: 'oplog',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-ops-manager-admin-backups-oplog',
                        collapsible: true,
                        items: [
                          {
                            label: 'create',
                            contentSite: 'mongocli',
                            url: '/docs/mongocli/:version/command/mongocli-ops-manager-admin-backups-oplog-create',
                          },
                          {
                            label: 'delete',
                            contentSite: 'mongocli',
                            url: '/docs/mongocli/:version/command/mongocli-ops-manager-admin-backups-oplog-delete',
                          },
                          {
                            label: 'describe',
                            contentSite: 'mongocli',
                            url: '/docs/mongocli/:version/command/mongocli-ops-manager-admin-backups-oplog-describe',
                          },
                          {
                            label: 'list',
                            contentSite: 'mongocli',
                            url: '/docs/mongocli/:version/command/mongocli-ops-manager-admin-backups-oplog-list',
                          },
                          {
                            label: 'update',
                            contentSite: 'mongocli',
                            url: '/docs/mongocli/:version/command/mongocli-ops-manager-admin-backups-oplog-update',
                          },
                        ],
                      },
                      {
                        label: 's3',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-ops-manager-admin-backups-s3',
                        collapsible: true,
                        items: [
                          {
                            label: 'create',
                            contentSite: 'mongocli',
                            url: '/docs/mongocli/:version/command/mongocli-ops-manager-admin-backups-s3-create',
                          },
                          {
                            label: 'delete',
                            contentSite: 'mongocli',
                            url: '/docs/mongocli/:version/command/mongocli-ops-manager-admin-backups-s3-delete',
                          },
                          {
                            label: 'describe',
                            contentSite: 'mongocli',
                            url: '/docs/mongocli/:version/command/mongocli-ops-manager-admin-backups-s3-describe',
                          },
                          {
                            label: 'list',
                            contentSite: 'mongocli',
                            url: '/docs/mongocli/:version/command/mongocli-ops-manager-admin-backups-s3-list',
                          },
                          {
                            label: 'update',
                            contentSite: 'mongocli',
                            url: '/docs/mongocli/:version/command/mongocli-ops-manager-admin-backups-s3-update',
                          },
                        ],
                      },
                      {
                        label: 'sync',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-ops-manager-admin-backups-sync',
                        collapsible: true,
                        items: [
                          {
                            label: 'create',
                            contentSite: 'mongocli',
                            url: '/docs/mongocli/:version/command/mongocli-ops-manager-admin-backups-sync-create',
                          },
                          {
                            label: 'delete',
                            contentSite: 'mongocli',
                            url: '/docs/mongocli/:version/command/mongocli-ops-manager-admin-backups-sync-delete',
                          },
                          {
                            label: 'describe',
                            contentSite: 'mongocli',
                            url: '/docs/mongocli/:version/command/mongocli-ops-manager-admin-backups-sync-describe',
                          },
                          {
                            label: 'list',
                            contentSite: 'mongocli',
                            url: '/docs/mongocli/:version/command/mongocli-ops-manager-admin-backups-sync-list',
                          },
                          {
                            label: 'update',
                            contentSite: 'mongocli',
                            url: '/docs/mongocli/:version/command/mongocli-ops-manager-admin-backups-sync-update',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                label: 'agents',
                contentSite: 'mongocli',
                url: '/docs/mongocli/:version/command/mongocli-ops-manager-agents',
                collapsible: true,
                items: [
                  {
                    label: 'apiKeys',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-agents-apiKeys',
                    collapsible: true,
                    items: [
                      {
                        label: 'create',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-ops-manager-agents-apiKeys-create',
                      },
                      {
                        label: 'delete',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-ops-manager-agents-apiKeys-delete',
                      },
                      {
                        label: 'list',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-ops-manager-agents-apiKeys-list',
                      },
                    ],
                  },
                  {
                    label: 'list',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-agents-list',
                  },
                  {
                    label: 'upgrade',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-agents-upgrade',
                  },
                  {
                    label: 'versions',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-agents-versions',
                    collapsible: true,
                    items: [
                      {
                        label: 'list',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-ops-manager-agents-versions-list',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'alerts',
                contentSite: 'mongocli',
                url: '/docs/mongocli/:version/command/mongocli-ops-manager-alerts',
                collapsible: true,
                items: [
                  {
                    label: 'acknowledge',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-alerts-acknowledge',
                  },
                  {
                    label: 'describe',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-alerts-describe',
                  },
                  {
                    label: 'global',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-alerts-global',
                    collapsible: true,
                    items: [
                      {
                        label: 'list',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-ops-manager-alerts-global-list',
                      },
                    ],
                  },
                  {
                    label: 'list',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-alerts-list',
                  },
                  {
                    label: 'settings',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-alerts-settings',
                    collapsible: true,
                    items: [
                      {
                        label: 'create',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-ops-manager-alerts-settings-create',
                      },
                      {
                        label: 'delete',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-ops-manager-alerts-settings-delete',
                      },
                      {
                        label: 'disable',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-ops-manager-alerts-settings-disable',
                      },
                      {
                        label: 'enable',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-ops-manager-alerts-settings-enable',
                      },
                      {
                        label: 'fields',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-ops-manager-alerts-settings-fields',
                        collapsible: true,
                        items: [
                          {
                            label: 'type',
                            contentSite: 'mongocli',
                            url: '/docs/mongocli/:version/command/mongocli-ops-manager-alerts-settings-fields-type',
                          },
                        ],
                      },
                      {
                        label: 'list',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-ops-manager-alerts-settings-list',
                      },
                      {
                        label: 'update',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-ops-manager-alerts-settings-update',
                      },
                    ],
                  },
                  {
                    label: 'unacknowledge',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-alerts-unacknowledge',
                  },
                ],
              },
              {
                label: 'automation',
                contentSite: 'mongocli',
                url: '/docs/mongocli/:version/command/mongocli-ops-manager-automation',
                collapsible: true,
                items: [
                  {
                    label: 'describe',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-automation-describe',
                  },
                  {
                    label: 'status',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-automation-status',
                  },
                  {
                    label: 'update',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-automation-update',
                  },
                  {
                    label: 'watch',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-automation-watch',
                  },
                ],
              },
              {
                label: 'backups',
                contentSite: 'mongocli',
                url: '/docs/mongocli/:version/command/mongocli-ops-manager-backups',
                collapsible: true,
                items: [
                  {
                    label: 'checkpoints',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-backups-checkpoints',
                    collapsible: true,
                    items: [
                      {
                        label: 'list',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-ops-manager-backups-checkpoints-list',
                      },
                    ],
                  },
                  {
                    label: 'config',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-backups-config',
                    collapsible: true,
                    items: [
                      {
                        label: 'describe',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-ops-manager-backups-config-describe',
                      },
                      {
                        label: 'list',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-ops-manager-backups-config-list',
                      },
                      {
                        label: 'update',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-ops-manager-backups-config-update',
                      },
                    ],
                  },
                  {
                    label: 'disable',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-backups-disable',
                  },
                  {
                    label: 'enable',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-backups-enable',
                  },
                  {
                    label: 'restores',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-backups-restores',
                    collapsible: true,
                    items: [
                      {
                        label: 'list',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-ops-manager-backups-restores-list',
                      },
                      {
                        label: 'start',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-ops-manager-backups-restores-start',
                      },
                    ],
                  },
                  {
                    label: 'snapshots',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-backups-snapshots',
                    collapsible: true,
                    items: [
                      {
                        label: 'list',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-ops-manager-backups-snapshots-list',
                      },
                      {
                        label: 'schedule',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-ops-manager-backups-snapshots-schedule',
                        collapsible: true,
                        items: [
                          {
                            label: 'describe',
                            contentSite: 'mongocli',
                            url: '/docs/mongocli/:version/command/mongocli-ops-manager-backups-snapshots-schedule-describe',
                          },
                          {
                            label: 'update',
                            contentSite: 'mongocli',
                            url: '/docs/mongocli/:version/command/mongocli-ops-manager-backups-snapshots-schedule-update',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                label: 'clusters',
                contentSite: 'mongocli',
                url: '/docs/mongocli/:version/command/mongocli-ops-manager-clusters',
                collapsible: true,
                items: [
                  {
                    label: 'apply',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-clusters-apply',
                  },
                  {
                    label: 'create',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-clusters-create',
                  },
                  {
                    label: 'delete',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-clusters-delete',
                  },
                  {
                    label: 'describe',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-clusters-describe',
                  },
                  {
                    label: 'indexes',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-clusters-indexes',
                    collapsible: true,
                    items: [
                      {
                        label: 'create',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-ops-manager-clusters-indexes-create',
                      },
                    ],
                  },
                  {
                    label: 'list',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-clusters-list',
                  },
                  {
                    label: 'reclaimFreeSpace',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-clusters-reclaimFreeSpace',
                  },
                  {
                    label: 'restart',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-clusters-restart',
                  },
                  {
                    label: 'resync',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-clusters-resync',
                  },
                  {
                    label: 'shutdown',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-clusters-shutdown',
                  },
                  {
                    label: 'startup',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-clusters-startup',
                  },
                  {
                    label: 'unmanage',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-clusters-unmanage',
                  },
                  {
                    label: 'update',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-clusters-update',
                  },
                ],
              },
              {
                label: 'dbusers',
                contentSite: 'mongocli',
                url: '/docs/mongocli/:version/command/mongocli-ops-manager-dbusers',
                collapsible: true,
                items: [
                  {
                    label: 'create',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-dbusers-create',
                  },
                  {
                    label: 'delete',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-dbusers-delete',
                  },
                  {
                    label: 'list',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-dbusers-list',
                  },
                ],
              },
              {
                label: 'diagnoseArchives',
                contentSite: 'mongocli',
                url: '/docs/mongocli/:version/command/mongocli-ops-manager-diagnoseArchives',
                collapsible: true,
                items: [
                  {
                    label: 'download',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-diagnoseArchives-download',
                  },
                ],
              },
              {
                label: 'events',
                contentSite: 'mongocli',
                url: '/docs/mongocli/:version/command/mongocli-ops-manager-events',
                collapsible: true,
                items: [
                  {
                    label: 'organizations',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-events-organizations',
                    collapsible: true,
                    items: [
                      {
                        label: 'list',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-ops-manager-events-organizations-list',
                      },
                    ],
                  },
                  {
                    label: 'projects',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-events-projects',
                    collapsible: true,
                    items: [
                      {
                        label: 'list',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-ops-manager-events-projects-list',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'featurePolicies',
                contentSite: 'mongocli',
                url: '/docs/mongocli/:version/command/mongocli-ops-manager-featurePolicies',
                collapsible: true,
                items: [
                  {
                    label: 'list',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-featurePolicies-list',
                  },
                  {
                    label: 'update',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-featurePolicies-update',
                  },
                ],
              },
              {
                label: 'liveMigrations',
                contentSite: 'mongocli',
                url: '/docs/mongocli/:version/command/mongocli-ops-manager-liveMigrations',
                collapsible: true,
                items: [
                  {
                    label: 'link',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-liveMigrations-link',
                    collapsible: true,
                    items: [
                      {
                        label: 'create',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-ops-manager-liveMigrations-link-create',
                      },
                      {
                        label: 'delete',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-ops-manager-liveMigrations-link-delete',
                      },
                      {
                        label: 'describe',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-ops-manager-liveMigrations-link-describe',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'logs',
                contentSite: 'mongocli',
                url: '/docs/mongocli/:version/command/mongocli-ops-manager-logs',
                collapsible: true,
                items: [
                  {
                    label: 'decrypt',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-logs-decrypt',
                  },
                  {
                    label: 'jobs',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-logs-jobs',
                    collapsible: true,
                    items: [
                      {
                        label: 'collect',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-ops-manager-logs-jobs-collect',
                      },
                      {
                        label: 'delete',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-ops-manager-logs-jobs-delete',
                      },
                      {
                        label: 'download',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-ops-manager-logs-jobs-download',
                      },
                      {
                        label: 'list',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-ops-manager-logs-jobs-list',
                      },
                    ],
                  },
                  {
                    label: 'keyProviders',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-logs-keyProviders',
                    collapsible: true,
                    items: [
                      {
                        label: 'list',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-ops-manager-logs-keyProviders-list',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'maintenanceWindows',
                contentSite: 'mongocli',
                url: '/docs/mongocli/:version/command/mongocli-ops-manager-maintenanceWindows',
                collapsible: true,
                items: [
                  {
                    label: 'create',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-maintenanceWindows-create',
                  },
                  {
                    label: 'delete',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-maintenanceWindows-delete',
                  },
                  {
                    label: 'describe',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-maintenanceWindows-describe',
                  },
                  {
                    label: 'list',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-maintenanceWindows-list',
                  },
                  {
                    label: 'update',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-maintenanceWindows-update',
                  },
                ],
              },
              {
                label: 'metrics',
                contentSite: 'mongocli',
                url: '/docs/mongocli/:version/command/mongocli-ops-manager-metrics',
                collapsible: true,
                items: [
                  {
                    label: 'databases',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-metrics-databases',
                    collapsible: true,
                    items: [
                      {
                        label: 'describe',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-ops-manager-metrics-databases-describe',
                      },
                      {
                        label: 'list',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-ops-manager-metrics-databases-list',
                      },
                    ],
                  },
                  {
                    label: 'disks',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-metrics-disks',
                    collapsible: true,
                    items: [
                      {
                        label: 'describe',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-ops-manager-metrics-disks-describe',
                      },
                      {
                        label: 'list',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-ops-manager-metrics-disks-list',
                      },
                    ],
                  },
                  {
                    label: 'process',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-metrics-process',
                  },
                ],
              },
              {
                label: 'monitoring',
                contentSite: 'mongocli',
                url: '/docs/mongocli/:version/command/mongocli-ops-manager-monitoring',
                collapsible: true,
                items: [
                  {
                    label: 'disable',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-monitoring-disable',
                  },
                  {
                    label: 'enable',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-monitoring-enable',
                  },
                  {
                    label: 'stop',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-monitoring-stop',
                  },
                ],
              },
              {
                label: 'owner',
                contentSite: 'mongocli',
                url: '/docs/mongocli/:version/command/mongocli-ops-manager-owner',
                collapsible: true,
                items: [
                  {
                    label: 'create',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-owner-create',
                  },
                ],
              },
              {
                label: 'performanceAdvisor',
                contentSite: 'mongocli',
                url: '/docs/mongocli/:version/command/mongocli-ops-manager-performanceAdvisor',
                collapsible: true,
                items: [
                  {
                    label: 'namespaces',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-performanceAdvisor-namespaces',
                    collapsible: true,
                    items: [
                      {
                        label: 'list',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-ops-manager-performanceAdvisor-namespaces-list',
                      },
                    ],
                  },
                  {
                    label: 'slowQueryLogs',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-performanceAdvisor-slowQueryLogs',
                    collapsible: true,
                    items: [
                      {
                        label: 'list',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-ops-manager-performanceAdvisor-slowQueryLogs-list',
                      },
                    ],
                  },
                  {
                    label: 'suggestedIndexes',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-performanceAdvisor-suggestedIndexes',
                    collapsible: true,
                    items: [
                      {
                        label: 'list',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-ops-manager-performanceAdvisor-suggestedIndexes-list',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'processes',
                contentSite: 'mongocli',
                url: '/docs/mongocli/:version/command/mongocli-ops-manager-processes',
                collapsible: true,
                items: [
                  {
                    label: 'describe',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-processes-describe',
                  },
                  {
                    label: 'list',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-processes-list',
                  },
                ],
              },
              {
                label: 'security',
                contentSite: 'mongocli',
                url: '/docs/mongocli/:version/command/mongocli-ops-manager-security',
                collapsible: true,
                items: [
                  {
                    label: 'enable',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-security-enable',
                  },
                ],
              },
              {
                label: 'serverUsage',
                contentSite: 'mongocli',
                url: '/docs/mongocli/:version/command/mongocli-ops-manager-serverUsage',
                collapsible: true,
                items: [
                  {
                    label: 'capture',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-serverUsage-capture',
                  },
                  {
                    label: 'download',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-serverUsage-download',
                  },
                  {
                    label: 'organizations',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-serverUsage-organizations',
                    collapsible: true,
                    items: [
                      {
                        label: 'hosts',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-ops-manager-serverUsage-organizations-hosts',
                        collapsible: true,
                        items: [
                          {
                            label: 'list',
                            contentSite: 'mongocli',
                            url: '/docs/mongocli/:version/command/mongocli-ops-manager-serverUsage-organizations-hosts-list',
                          },
                        ],
                      },
                      {
                        label: 'serverType',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-ops-manager-serverUsage-organizations-serverType',
                        collapsible: true,
                        items: [
                          {
                            label: 'describe',
                            contentSite: 'mongocli',
                            url: '/docs/mongocli/:version/command/mongocli-ops-manager-serverUsage-organizations-serverType-describe',
                          },
                          {
                            label: 'set',
                            contentSite: 'mongocli',
                            url: '/docs/mongocli/:version/command/mongocli-ops-manager-serverUsage-organizations-serverType-set',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    label: 'projects',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-serverUsage-projects',
                    collapsible: true,
                    items: [
                      {
                        label: 'hosts',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-ops-manager-serverUsage-projects-hosts',
                        collapsible: true,
                        items: [
                          {
                            label: 'list',
                            contentSite: 'mongocli',
                            url: '/docs/mongocli/:version/command/mongocli-ops-manager-serverUsage-projects-hosts-list',
                          },
                        ],
                      },
                      {
                        label: 'serverType',
                        contentSite: 'mongocli',
                        url: '/docs/mongocli/:version/command/mongocli-ops-manager-serverUsage-projects-serverType',
                        collapsible: true,
                        items: [
                          {
                            label: 'describe',
                            contentSite: 'mongocli',
                            url: '/docs/mongocli/:version/command/mongocli-ops-manager-serverUsage-projects-serverType-describe',
                          },
                          {
                            label: 'set',
                            contentSite: 'mongocli',
                            url: '/docs/mongocli/:version/command/mongocli-ops-manager-serverUsage-projects-serverType-set',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                label: 'servers',
                contentSite: 'mongocli',
                url: '/docs/mongocli/:version/command/mongocli-ops-manager-servers',
                collapsible: true,
                items: [
                  {
                    label: 'list',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-servers-list',
                  },
                ],
              },
              {
                label: 'softwareComponents',
                contentSite: 'mongocli',
                url: '/docs/mongocli/:version/command/mongocli-ops-manager-softwareComponents',
                collapsible: true,
                items: [
                  {
                    label: 'list',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-softwareComponents-list',
                  },
                ],
              },
              {
                label: 'versionManifest',
                contentSite: 'mongocli',
                url: '/docs/mongocli/:version/command/mongocli-ops-manager-versionManifest',
                collapsible: true,
                items: [
                  {
                    label: 'update',
                    contentSite: 'mongocli',
                    url: '/docs/mongocli/:version/command/mongocli-ops-manager-versionManifest-update',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        label: 'Reference',
        contentSite: 'mongocli',
        url: '/docs/mongocli/:version/reference',
        collapsible: true,
        items: [
          {
            label: 'Cluster Configuration File',
            contentSite: 'mongocli',
            url: '/docs/mongocli/:version/reference/mms-cluster-settings-file',
          },
        ],
      },
      {
        label: 'Troubleshooting',
        contentSite: 'mongocli',
        url: '/docs/mongocli/:version/troubleshooting',
      },
      {
        label: 'Release Notes',
        contentSite: 'mongocli',
        url: '/docs/mongocli/:version/release-notes',
      },
      {
        label: 'Third-Party Licenses',
        contentSite: 'mongocli',
        url: '/docs/mongocli/:version/third-party-licenses',
      },
    ],
  },
];

export default tocData;
