import type { TocItem } from "../types";

const tocData: TocItem[] = [
  {
    label: "Atlas CLI",
    contentSite: "atlas-cli",
    collapsible: true,
    items: [
      {
        label: "Overview",
        contentSite: "atlas-cli",
        url: "/docs/atlas/cli/:version/",
      },
      {
        label: "Install or Update the Atlas CLI",
        contentSite: "atlas-cli",
        url: "/docs/atlas/cli/:version/install-atlas-cli",
        collapsible: true,
        items: [
          {
            label: "Check Compatibility",
            contentSite: "atlas-cli",
            url: "/docs/atlas/cli/:version/compatibility",
          },
        ],
      },
      {
        label: "Connect from the Atlas CLI",
        contentSite: "atlas-cli",
        url: "/docs/atlas/cli/:version/connect-atlas-cli",
        collapsible: true,
        items: [
          {
            label: "Save Connection Settings",
            contentSite: "atlas-cli",
            url: "/docs/atlas/cli/:version/atlas-cli-save-connection-settings",
          },
          {
            label: "Migrate to the Atlas CLI",
            contentSite: "atlas-cli",
            url: "/docs/atlas/cli/:version/migrate-to-atlas-cli",
          },
        ],
      },
      {
        label: "Commands",
        contentSite: "atlas-cli",
        url: "/docs/atlas/cli/:version/command/atlas",
        collapsible: true,
        items: [
          {
            label: "accessLists",
            contentSite: "atlas-cli",
            url: "/docs/atlas/cli/:version/command/atlas-accessLists",
            collapsible: true,
            items: [
              {
                label: "create",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-accessLists-create",
              },
              {
                label: "delete",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-accessLists-delete",
              },
              {
                label: "describe",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-accessLists-describe",
              },
              {
                label: "list",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-accessLists-list",
              },
            ],
          },
          {
            label: "accessLogs",
            contentSite: "atlas-cli",
            url: "/docs/atlas/cli/:version/command/atlas-accessLogs",
            collapsible: true,
            items: [
              {
                label: "list",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-accessLogs-list",
              },
            ],
          },
          {
            label: "alerts",
            contentSite: "atlas-cli",
            url: "/docs/atlas/cli/:version/command/atlas-alerts",
            collapsible: true,
            items: [
              {
                label: "acknowledge",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-alerts-acknowledge",
              },
              {
                label: "describe",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-alerts-describe",
              },
              {
                label: "list",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-alerts-list",
              },
              {
                label: "settings",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-alerts-settings",
                collapsible: true,
                items: [
                  {
                    label: "create",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-alerts-settings-create",
                  },
                  {
                    label: "delete",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-alerts-settings-delete",
                  },
                  {
                    label: "disable",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-alerts-settings-disable",
                  },
                  {
                    label: "enable",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-alerts-settings-enable",
                  },
                  {
                    label: "fields",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-alerts-settings-fields",
                    collapsible: true,
                    items: [
                      {
                        label: "type",
                        contentSite: "atlas-cli",
                        url: "/docs/atlas/cli/:version/command/atlas-alerts-settings-fields-type",
                      },
                    ],
                  },
                  {
                    label: "list",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-alerts-settings-list",
                  },
                  {
                    label: "update",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-alerts-settings-update",
                  },
                ],
              },
              {
                label: "unacknowledge",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-alerts-unacknowledge",
              },
            ],
          },
          {
            label: "auth",
            contentSite: "atlas-cli",
            url: "/docs/atlas/cli/:version/command/atlas-auth",
            collapsible: true,
            items: [
              {
                label: "login",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-auth-login",
              },
              {
                label: "logout",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-auth-logout",
              },
              {
                label: "register",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-auth-register",
              },
              {
                label: "whoami",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-auth-whoami",
              },
            ],
          },
          {
            label: "backups",
            contentSite: "atlas-cli",
            url: "/docs/atlas/cli/:version/command/atlas-backups",
            collapsible: true,
            items: [
              {
                label: "exports",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-backups-exports",
                collapsible: true,
                items: [
                  {
                    label: "buckets",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-backups-exports-buckets",
                    collapsible: true,
                    items: [
                      {
                        label: "create",
                        contentSite: "atlas-cli",
                        url: "/docs/atlas/cli/:version/command/atlas-backups-exports-buckets-create",
                      },
                      {
                        label: "delete",
                        contentSite: "atlas-cli",
                        url: "/docs/atlas/cli/:version/command/atlas-backups-exports-buckets-delete",
                      },
                      {
                        label: "describe",
                        contentSite: "atlas-cli",
                        url: "/docs/atlas/cli/:version/command/atlas-backups-exports-buckets-describe",
                      },
                      {
                        label: "list",
                        contentSite: "atlas-cli",
                        url: "/docs/atlas/cli/:version/command/atlas-backups-exports-buckets-list",
                      },
                    ],
                  },
                  {
                    label: "jobs",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-backups-exports-jobs",
                    collapsible: true,
                    items: [
                      {
                        label: "create",
                        contentSite: "atlas-cli",
                        url: "/docs/atlas/cli/:version/command/atlas-backups-exports-jobs-create",
                      },
                      {
                        label: "describe",
                        contentSite: "atlas-cli",
                        url: "/docs/atlas/cli/:version/command/atlas-backups-exports-jobs-describe",
                      },
                      {
                        label: "list",
                        contentSite: "atlas-cli",
                        url: "/docs/atlas/cli/:version/command/atlas-backups-exports-jobs-list",
                      },
                      {
                        label: "watch",
                        contentSite: "atlas-cli",
                        url: "/docs/atlas/cli/:version/command/atlas-backups-exports-jobs-watch",
                      },
                    ],
                  },
                ],
              },
              {
                label: "restores",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-backups-restores",
                collapsible: true,
                items: [
                  {
                    label: "describe",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-backups-restores-describe",
                  },
                  {
                    label: "list",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-backups-restores-list",
                  },
                  {
                    label: "start",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-backups-restores-start",
                  },
                  {
                    label: "watch",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-backups-restores-watch",
                  },
                ],
              },
              {
                label: "schedule",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-backups-schedule",
                collapsible: true,
                items: [
                  {
                    label: "delete",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-backups-schedule-delete",
                  },
                  {
                    label: "describe",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-backups-schedule-describe",
                  },
                  {
                    label: "update",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-backups-schedule-update",
                  },
                ],
              },
              {
                label: "snapshots",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-backups-snapshots",
                collapsible: true,
                items: [
                  {
                    label: "create",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-backups-snapshots-create",
                  },
                  {
                    label: "delete",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-backups-snapshots-delete",
                  },
                  {
                    label: "describe",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-backups-snapshots-describe",
                  },
                  {
                    label: "list",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-backups-snapshots-list",
                  },
                  {
                    label: "watch",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-backups-snapshots-watch",
                  },
                ],
              },
            ],
          },
          {
            label: "cloudProviders",
            contentSite: "atlas-cli",
            url: "/docs/atlas/cli/:version/command/atlas-cloudProviders",
            collapsible: true,
            items: [
              {
                label: "accessRoles",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-cloudProviders-accessRoles",
                collapsible: true,
                items: [
                  {
                    label: "aws",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-cloudProviders-accessRoles-aws",
                    collapsible: true,
                    items: [
                      {
                        label: "authorize",
                        contentSite: "atlas-cli",
                        url: "/docs/atlas/cli/:version/command/atlas-cloudProviders-accessRoles-aws-authorize",
                      },
                      {
                        label: "create",
                        contentSite: "atlas-cli",
                        url: "/docs/atlas/cli/:version/command/atlas-cloudProviders-accessRoles-aws-create",
                      },
                      {
                        label: "deauthorize",
                        contentSite: "atlas-cli",
                        url: "/docs/atlas/cli/:version/command/atlas-cloudProviders-accessRoles-aws-deauthorize",
                      },
                    ],
                  },
                  {
                    label: "list",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-cloudProviders-accessRoles-list",
                  },
                ],
              },
            ],
          },
          {
            label: "clusters",
            contentSite: "atlas-cli",
            url: "/docs/atlas/cli/:version/command/atlas-clusters",
            collapsible: true,
            items: [
              {
                label: "advancedSettings",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-clusters-advancedSettings",
                collapsible: true,
                items: [
                  {
                    label: "describe",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-clusters-advancedSettings-describe",
                  },
                  {
                    label: "update",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-clusters-advancedSettings-update",
                  },
                ],
              },
              {
                label: "availableRegions",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-clusters-availableRegions",
                collapsible: true,
                items: [
                  {
                    label: "list",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-clusters-availableRegions-list",
                  },
                ],
              },
              {
                label: "connectionStrings",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-clusters-connectionStrings",
                collapsible: true,
                items: [
                  {
                    label: "describe",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-clusters-connectionStrings-describe",
                  },
                ],
              },
              {
                label: "create",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-clusters-create",
              },
              {
                label: "delete",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-clusters-delete",
              },
              {
                label: "describe",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-clusters-describe",
              },
              {
                label: "failover",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-clusters-failover",
              },
              {
                label: "indexes",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-clusters-indexes",
                collapsible: true,
                items: [
                  {
                    label: "create",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-clusters-indexes-create",
                  },
                ],
              },
              {
                label: "list",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-clusters-list",
              },
              {
                label: "onlineArchives",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-clusters-onlineArchives",
                collapsible: true,
                items: [
                  {
                    label: "create",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-clusters-onlineArchives-create",
                  },
                  {
                    label: "delete",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-clusters-onlineArchives-delete",
                  },
                  {
                    label: "describe",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-clusters-onlineArchives-describe",
                  },
                  {
                    label: "list",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-clusters-onlineArchives-list",
                  },
                  {
                    label: "pause",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-clusters-onlineArchives-pause",
                  },
                  {
                    label: "start",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-clusters-onlineArchives-start",
                  },
                  {
                    label: "update",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-clusters-onlineArchives-update",
                  },
                  {
                    label: "watch",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-clusters-onlineArchives-watch",
                  },
                ],
              },
              {
                label: "pause",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-clusters-pause",
              },
              {
                label: "sampleData",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-clusters-sampleData",
                collapsible: true,
                items: [
                  {
                    label: "describe",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-clusters-sampleData-describe",
                  },
                  {
                    label: "load",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-clusters-sampleData-load",
                  },
                  {
                    label: "watch",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-clusters-sampleData-watch",
                  },
                ],
              },
              {
                label: "search",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-clusters-search",
                collapsible: true,
                items: [
                  {
                    label: "indexes",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-clusters-search-indexes",
                    collapsible: true,
                    items: [
                      {
                        label: "create",
                        contentSite: "atlas-cli",
                        url: "/docs/atlas/cli/:version/command/atlas-clusters-search-indexes-create",
                      },
                      {
                        label: "delete",
                        contentSite: "atlas-cli",
                        url: "/docs/atlas/cli/:version/command/atlas-clusters-search-indexes-delete",
                      },
                      {
                        label: "describe",
                        contentSite: "atlas-cli",
                        url: "/docs/atlas/cli/:version/command/atlas-clusters-search-indexes-describe",
                      },
                      {
                        label: "list",
                        contentSite: "atlas-cli",
                        url: "/docs/atlas/cli/:version/command/atlas-clusters-search-indexes-list",
                      },
                      {
                        label: "update",
                        contentSite: "atlas-cli",
                        url: "/docs/atlas/cli/:version/command/atlas-clusters-search-indexes-update",
                      },
                    ],
                  },
                ],
              },
              {
                label: "start",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-clusters-start",
              },
              {
                label: "update",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-clusters-update",
              },
              {
                label: "upgrade",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-clusters-upgrade",
              },
              {
                label: "watch",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-clusters-watch",
              },
            ],
          },
          {
            label: "completion",
            contentSite: "atlas-cli",
            url: "/docs/atlas/cli/:version/command/atlas-completion",
            collapsible: true,
            items: [
              {
                label: "bash",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-completion-bash",
              },
              {
                label: "fish",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-completion-fish",
              },
              {
                label: "powershell",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-completion-powershell",
              },
              {
                label: "zsh",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-completion-zsh",
              },
            ],
          },
          {
            label: "config",
            contentSite: "atlas-cli",
            url: "/docs/atlas/cli/:version/command/atlas-config",
            collapsible: true,
            items: [
              {
                label: "delete",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-config-delete",
              },
              {
                label: "describe",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-config-describe",
              },
              {
                label: "edit",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-config-edit",
              },
              {
                label: "init",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-config-init",
              },
              {
                label: "list",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-config-list",
              },
              {
                label: "rename",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-config-rename",
              },
              {
                label: "set",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-config-set",
              },
            ],
          },
          {
            label: "customDbRoles",
            contentSite: "atlas-cli",
            url: "/docs/atlas/cli/:version/command/atlas-customDbRoles",
            collapsible: true,
            items: [
              {
                label: "create",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-customDbRoles-create",
              },
              {
                label: "delete",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-customDbRoles-delete",
              },
              {
                label: "describe",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-customDbRoles-describe",
              },
              {
                label: "list",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-customDbRoles-list",
              },
              {
                label: "update",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-customDbRoles-update",
              },
            ],
          },
          {
            label: "customDns",
            contentSite: "atlas-cli",
            url: "/docs/atlas/cli/:version/command/atlas-customDns",
            collapsible: true,
            items: [
              {
                label: "aws",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-customDns-aws",
                collapsible: true,
                items: [
                  {
                    label: "describe",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-customDns-aws-describe",
                  },
                  {
                    label: "disable",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-customDns-aws-disable",
                  },
                  {
                    label: "enable",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-customDns-aws-enable",
                  },
                ],
              },
            ],
          },
          {
            label: "dataLakePipelines",
            contentSite: "atlas-cli",
            url: "/docs/atlas/cli/:version/command/atlas-dataLakePipelines",
            collapsible: true,
            items: [
              {
                label: "availableSchedules",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-dataLakePipelines-availableSchedules",
                collapsible: true,
                items: [
                  {
                    label: "list",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-dataLakePipelines-availableSchedules-list",
                  },
                ],
              },
              {
                label: "availableSnapshots",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-dataLakePipelines-availableSnapshots",
                collapsible: true,
                items: [
                  {
                    label: "list",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-dataLakePipelines-availableSnapshots-list",
                  },
                ],
              },
              {
                label: "create",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-dataLakePipelines-create",
              },
              {
                label: "datasets",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-dataLakePipelines-datasets",
                collapsible: true,
                items: [
                  {
                    label: "delete",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-dataLakePipelines-datasets-delete",
                  },
                ],
              },
              {
                label: "delete",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-dataLakePipelines-delete",
              },
              {
                label: "describe",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-dataLakePipelines-describe",
              },
              {
                label: "list",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-dataLakePipelines-list",
              },
              {
                label: "pause",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-dataLakePipelines-pause",
              },
              {
                label: "runs",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-dataLakePipelines-runs",
                collapsible: true,
                items: [
                  {
                    label: "describe",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-dataLakePipelines-runs-describe",
                  },
                  {
                    label: "list",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-dataLakePipelines-runs-list",
                  },
                  {
                    label: "watch",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-dataLakePipelines-runs-watch",
                  },
                ],
              },
              {
                label: "start",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-dataLakePipelines-start",
              },
              {
                label: "trigger",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-dataLakePipelines-trigger",
              },
              {
                label: "update",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-dataLakePipelines-update",
              },
              {
                label: "watch",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-dataLakePipelines-watch",
              },
            ],
          },
          {
            label: "dataLakes",
            contentSite: "atlas-cli",
            url: "/docs/atlas/cli/:version/command/atlas-dataLakes",
            collapsible: true,
            items: [
              {
                label: "create",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-dataLakes-create",
              },
              {
                label: "delete",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-dataLakes-delete",
              },
              {
                label: "describe",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-dataLakes-describe",
              },
              {
                label: "list",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-dataLakes-list",
              },
              {
                label: "update",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-dataLakes-update",
              },
            ],
          },
          {
            label: "dbusers",
            contentSite: "atlas-cli",
            url: "/docs/atlas/cli/:version/command/atlas-dbusers",
            collapsible: true,
            items: [
              {
                label: "certs",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-dbusers-certs",
                collapsible: true,
                items: [
                  {
                    label: "create",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-dbusers-certs-create",
                  },
                  {
                    label: "list",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-dbusers-certs-list",
                  },
                ],
              },
              {
                label: "create",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-dbusers-create",
              },
              {
                label: "delete",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-dbusers-delete",
              },
              {
                label: "describe",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-dbusers-describe",
              },
              {
                label: "list",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-dbusers-list",
              },
              {
                label: "update",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-dbusers-update",
              },
            ],
          },
          {
            label: "events",
            contentSite: "atlas-cli",
            url: "/docs/atlas/cli/:version/command/atlas-events",
            collapsible: true,
            items: [
              {
                label: "organizations",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-events-organizations",
                collapsible: true,
                items: [
                  {
                    label: "list",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-events-organizations-list",
                  },
                ],
              },
              {
                label: "projects",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-events-projects",
                collapsible: true,
                items: [
                  {
                    label: "list",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-events-projects-list",
                  },
                ],
              },
            ],
          },
          {
            label: "integrations",
            contentSite: "atlas-cli",
            url: "/docs/atlas/cli/:version/command/atlas-integrations",
            collapsible: true,
            items: [
              {
                label: "create",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-integrations-create",
                collapsible: true,
                items: [
                  {
                    label: "DATADOG",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-integrations-create-DATADOG",
                  },
                  {
                    label: "OPS_GENIE",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-integrations-create-OPS_GENIE",
                  },
                  {
                    label: "PAGER_DUTY",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-integrations-create-PAGER_DUTY",
                  },
                  {
                    label: "VICTOR_OPS",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-integrations-create-VICTOR_OPS",
                  },
                  {
                    label: "WEBHOOK",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-integrations-create-WEBHOOK",
                  },
                ],
              },
              {
                label: "delete",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-integrations-delete",
              },
              {
                label: "describe",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-integrations-describe",
              },
              {
                label: "list",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-integrations-list",
              },
            ],
          },
          {
            label: "kubernetes",
            contentSite: "atlas-cli",
            url: "/docs/atlas/cli/:version/command/atlas-kubernetes",
            collapsible: true,
            items: [
              {
                label: "config",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-kubernetes-config",
                collapsible: true,
                items: [
                  {
                    label: "apply",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-kubernetes-config-apply",
                  },
                  {
                    label: "generate",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-kubernetes-config-generate",
                  },
                ],
              },
              {
                label: "operator",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-kubernetes-operator",
                collapsible: true,
                items: [
                  {
                    label: "install",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-kubernetes-operator-install",
                  },
                ],
              },
            ],
          },
          {
            label: "liveMigrations",
            contentSite: "atlas-cli",
            url: "/docs/atlas/cli/:version/command/atlas-liveMigrations",
            collapsible: true,
            items: [
              {
                label: "create",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-liveMigrations-create",
              },
              {
                label: "cutover",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-liveMigrations-cutover",
              },
              {
                label: "describe",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-liveMigrations-describe",
              },
              {
                label: "link",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-liveMigrations-link",
                collapsible: true,
                items: [
                  {
                    label: "create",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-liveMigrations-link-create",
                  },
                  {
                    label: "delete",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-liveMigrations-link-delete",
                  },
                ],
              },
              {
                label: "validation",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-liveMigrations-validation",
                collapsible: true,
                items: [
                  {
                    label: "create",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-liveMigrations-validation-create",
                  },
                  {
                    label: "describe",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-liveMigrations-validation-describe",
                  },
                ],
              },
            ],
          },
          {
            label: "logs",
            contentSite: "atlas-cli",
            url: "/docs/atlas/cli/:version/command/atlas-logs",
            collapsible: true,
            items: [
              {
                label: "download",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-logs-download",
              },
            ],
          },
          {
            label: "maintenanceWindows",
            contentSite: "atlas-cli",
            url: "/docs/atlas/cli/:version/command/atlas-maintenanceWindows",
            collapsible: true,
            items: [
              {
                label: "clear",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-maintenanceWindows-clear",
              },
              {
                label: "defer",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-maintenanceWindows-defer",
              },
              {
                label: "describe",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-maintenanceWindows-describe",
              },
              {
                label: "update",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-maintenanceWindows-update",
              },
            ],
          },
          {
            label: "metrics",
            contentSite: "atlas-cli",
            url: "/docs/atlas/cli/:version/command/atlas-metrics",
            collapsible: true,
            items: [
              {
                label: "databases",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-metrics-databases",
                collapsible: true,
                items: [
                  {
                    label: "describe",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-metrics-databases-describe",
                  },
                  {
                    label: "list",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-metrics-databases-list",
                  },
                ],
              },
              {
                label: "disks",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-metrics-disks",
                collapsible: true,
                items: [
                  {
                    label: "describe",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-metrics-disks-describe",
                  },
                  {
                    label: "list",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-metrics-disks-list",
                  },
                ],
              },
              {
                label: "processes",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-metrics-processes",
              },
            ],
          },
          {
            label: "networking",
            contentSite: "atlas-cli",
            url: "/docs/atlas/cli/:version/command/atlas-networking",
            collapsible: true,
            items: [
              {
                label: "containers",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-networking-containers",
                collapsible: true,
                items: [
                  {
                    label: "delete",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-networking-containers-delete",
                  },
                  {
                    label: "list",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-networking-containers-list",
                  },
                ],
              },
              {
                label: "peering",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-networking-peering",
                collapsible: true,
                items: [
                  {
                    label: "create",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-networking-peering-create",
                    collapsible: true,
                    items: [
                      {
                        label: "aws",
                        contentSite: "atlas-cli",
                        url: "/docs/atlas/cli/:version/command/atlas-networking-peering-create-aws",
                      },
                      {
                        label: "azure",
                        contentSite: "atlas-cli",
                        url: "/docs/atlas/cli/:version/command/atlas-networking-peering-create-azure",
                      },
                      {
                        label: "gcp",
                        contentSite: "atlas-cli",
                        url: "/docs/atlas/cli/:version/command/atlas-networking-peering-create-gcp",
                      },
                    ],
                  },
                  {
                    label: "delete",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-networking-peering-delete",
                  },
                  {
                    label: "list",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-networking-peering-list",
                  },
                  {
                    label: "watch",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-networking-peering-watch",
                  },
                ],
              },
            ],
          },
          {
            label: "organizations",
            contentSite: "atlas-cli",
            url: "/docs/atlas/cli/:version/command/atlas-organizations",
            collapsible: true,
            items: [
              {
                label: "apiKeys",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-organizations-apiKeys",
                collapsible: true,
                items: [
                  {
                    label: "accessLists",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-organizations-apiKeys-accessLists",
                    collapsible: true,
                    items: [
                      {
                        label: "create",
                        contentSite: "atlas-cli",
                        url: "/docs/atlas/cli/:version/command/atlas-organizations-apiKeys-accessLists-create",
                      },
                      {
                        label: "delete",
                        contentSite: "atlas-cli",
                        url: "/docs/atlas/cli/:version/command/atlas-organizations-apiKeys-accessLists-delete",
                      },
                      {
                        label: "list",
                        contentSite: "atlas-cli",
                        url: "/docs/atlas/cli/:version/command/atlas-organizations-apiKeys-accessLists-list",
                      },
                    ],
                  },
                  {
                    label: "assign",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-organizations-apiKeys-assign",
                  },
                  {
                    label: "create",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-organizations-apiKeys-create",
                  },
                  {
                    label: "delete",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-organizations-apiKeys-delete",
                  },
                  {
                    label: "describe",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-organizations-apiKeys-describe",
                  },
                  {
                    label: "list",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-organizations-apiKeys-list",
                  },
                ],
              },
              {
                label: "create",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-organizations-create",
              },
              {
                label: "delete",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-organizations-delete",
              },
              {
                label: "describe",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-organizations-describe",
              },
              {
                label: "invitations",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-organizations-invitations",
                collapsible: true,
                items: [
                  {
                    label: "delete",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-organizations-invitations-delete",
                  },
                  {
                    label: "describe",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-organizations-invitations-describe",
                  },
                  {
                    label: "invite",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-organizations-invitations-invite",
                  },
                  {
                    label: "list",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-organizations-invitations-list",
                  },
                  {
                    label: "update",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-organizations-invitations-update",
                  },
                ],
              },
              {
                label: "list",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-organizations-list",
              },
              {
                label: "users",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-organizations-users",
                collapsible: true,
                items: [
                  {
                    label: "list",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-organizations-users-list",
                  },
                ],
              },
            ],
          },
          {
            label: "performanceAdvisor",
            contentSite: "atlas-cli",
            url: "/docs/atlas/cli/:version/command/atlas-performanceAdvisor",
            collapsible: true,
            items: [
              {
                label: "namespaces",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-performanceAdvisor-namespaces",
                collapsible: true,
                items: [
                  {
                    label: "list",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-performanceAdvisor-namespaces-list",
                  },
                ],
              },
              {
                label: "slowOperationThreshold",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-performanceAdvisor-slowOperationThreshold",
                collapsible: true,
                items: [
                  {
                    label: "disable",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-performanceAdvisor-slowOperationThreshold-disable",
                  },
                  {
                    label: "enable",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-performanceAdvisor-slowOperationThreshold-enable",
                  },
                ],
              },
              {
                label: "slowQueryLogs",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-performanceAdvisor-slowQueryLogs",
                collapsible: true,
                items: [
                  {
                    label: "list",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-performanceAdvisor-slowQueryLogs-list",
                  },
                ],
              },
              {
                label: "suggestedIndexes",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-performanceAdvisor-suggestedIndexes",
                collapsible: true,
                items: [
                  {
                    label: "list",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-performanceAdvisor-suggestedIndexes-list",
                  },
                ],
              },
            ],
          },
          {
            label: "privateEndpoints",
            contentSite: "atlas-cli",
            url: "/docs/atlas/cli/:version/command/atlas-privateEndpoints",
            collapsible: true,
            items: [
              {
                label: "aws",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-privateEndpoints-aws",
                collapsible: true,
                items: [
                  {
                    label: "create",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-privateEndpoints-aws-create",
                  },
                  {
                    label: "delete",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-privateEndpoints-aws-delete",
                  },
                  {
                    label: "describe",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-privateEndpoints-aws-describe",
                  },
                  {
                    label: "interfaces",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-privateEndpoints-aws-interfaces",
                    collapsible: true,
                    items: [
                      {
                        label: "create",
                        contentSite: "atlas-cli",
                        url: "/docs/atlas/cli/:version/command/atlas-privateEndpoints-aws-interfaces-create",
                      },
                      {
                        label: "delete",
                        contentSite: "atlas-cli",
                        url: "/docs/atlas/cli/:version/command/atlas-privateEndpoints-aws-interfaces-delete",
                      },
                      {
                        label: "describe",
                        contentSite: "atlas-cli",
                        url: "/docs/atlas/cli/:version/command/atlas-privateEndpoints-aws-interfaces-describe",
                      },
                    ],
                  },
                  {
                    label: "list",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-privateEndpoints-aws-list",
                  },
                  {
                    label: "watch",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-privateEndpoints-aws-watch",
                  },
                ],
              },
              {
                label: "azure",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-privateEndpoints-azure",
                collapsible: true,
                items: [
                  {
                    label: "create",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-privateEndpoints-azure-create",
                  },
                  {
                    label: "delete",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-privateEndpoints-azure-delete",
                  },
                  {
                    label: "describe",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-privateEndpoints-azure-describe",
                  },
                  {
                    label: "interfaces",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-privateEndpoints-azure-interfaces",
                    collapsible: true,
                    items: [
                      {
                        label: "create",
                        contentSite: "atlas-cli",
                        url: "/docs/atlas/cli/:version/command/atlas-privateEndpoints-azure-interfaces-create",
                      },
                      {
                        label: "delete",
                        contentSite: "atlas-cli",
                        url: "/docs/atlas/cli/:version/command/atlas-privateEndpoints-azure-interfaces-delete",
                      },
                      {
                        label: "describe",
                        contentSite: "atlas-cli",
                        url: "/docs/atlas/cli/:version/command/atlas-privateEndpoints-azure-interfaces-describe",
                      },
                    ],
                  },
                  {
                    label: "list",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-privateEndpoints-azure-list",
                  },
                  {
                    label: "watch",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-privateEndpoints-azure-watch",
                  },
                ],
              },
              {
                label: "dataLakes",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-privateEndpoints-dataLakes",
                collapsible: true,
                items: [
                  {
                    label: "aws",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-privateEndpoints-dataLakes-aws",
                    collapsible: true,
                    items: [
                      {
                        label: "create",
                        contentSite: "atlas-cli",
                        url: "/docs/atlas/cli/:version/command/atlas-privateEndpoints-dataLakes-aws-create",
                      },
                      {
                        label: "delete",
                        contentSite: "atlas-cli",
                        url: "/docs/atlas/cli/:version/command/atlas-privateEndpoints-dataLakes-aws-delete",
                      },
                      {
                        label: "describe",
                        contentSite: "atlas-cli",
                        url: "/docs/atlas/cli/:version/command/atlas-privateEndpoints-dataLakes-aws-describe",
                      },
                      {
                        label: "list",
                        contentSite: "atlas-cli",
                        url: "/docs/atlas/cli/:version/command/atlas-privateEndpoints-dataLakes-aws-list",
                      },
                    ],
                  },
                ],
              },
              {
                label: "gcp",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-privateEndpoints-gcp",
                collapsible: true,
                items: [
                  {
                    label: "create",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-privateEndpoints-gcp-create",
                  },
                  {
                    label: "delete",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-privateEndpoints-gcp-delete",
                  },
                  {
                    label: "describe",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-privateEndpoints-gcp-describe",
                  },
                  {
                    label: "interfaces",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-privateEndpoints-gcp-interfaces",
                    collapsible: true,
                    items: [
                      {
                        label: "create",
                        contentSite: "atlas-cli",
                        url: "/docs/atlas/cli/:version/command/atlas-privateEndpoints-gcp-interfaces-create",
                      },
                      {
                        label: "delete",
                        contentSite: "atlas-cli",
                        url: "/docs/atlas/cli/:version/command/atlas-privateEndpoints-gcp-interfaces-delete",
                      },
                      {
                        label: "describe",
                        contentSite: "atlas-cli",
                        url: "/docs/atlas/cli/:version/command/atlas-privateEndpoints-gcp-interfaces-describe",
                      },
                    ],
                  },
                  {
                    label: "list",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-privateEndpoints-gcp-list",
                  },
                  {
                    label: "watch",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-privateEndpoints-gcp-watch",
                  },
                ],
              },
              {
                label: "onlineArchive",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-privateEndpoints-onlineArchive",
                collapsible: true,
                items: [
                  {
                    label: "aws",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-privateEndpoints-onlineArchive-aws",
                    collapsible: true,
                    items: [
                      {
                        label: "create",
                        contentSite: "atlas-cli",
                        url: "/docs/atlas/cli/:version/command/atlas-privateEndpoints-onlineArchive-aws-create",
                      },
                      {
                        label: "delete",
                        contentSite: "atlas-cli",
                        url: "/docs/atlas/cli/:version/command/atlas-privateEndpoints-onlineArchive-aws-delete",
                      },
                      {
                        label: "describe",
                        contentSite: "atlas-cli",
                        url: "/docs/atlas/cli/:version/command/atlas-privateEndpoints-onlineArchive-aws-describe",
                      },
                      {
                        label: "list",
                        contentSite: "atlas-cli",
                        url: "/docs/atlas/cli/:version/command/atlas-privateEndpoints-onlineArchive-aws-list",
                      },
                    ],
                  },
                ],
              },
              {
                label: "regionalModes",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-privateEndpoints-regionalModes",
                collapsible: true,
                items: [
                  {
                    label: "describe",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-privateEndpoints-regionalModes-describe",
                  },
                  {
                    label: "disable",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-privateEndpoints-regionalModes-disable",
                  },
                  {
                    label: "enable",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-privateEndpoints-regionalModes-enable",
                  },
                ],
              },
            ],
          },
          {
            label: "processes",
            contentSite: "atlas-cli",
            url: "/docs/atlas/cli/:version/command/atlas-processes",
            collapsible: true,
            items: [
              {
                label: "describe",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-processes-describe",
              },
              {
                label: "list",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-processes-list",
              },
            ],
          },
          {
            label: "projects",
            contentSite: "atlas-cli",
            url: "/docs/atlas/cli/:version/command/atlas-projects",
            collapsible: true,
            items: [
              {
                label: "apiKeys",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-projects-apiKeys",
                collapsible: true,
                items: [
                  {
                    label: "assign",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-projects-apiKeys-assign",
                  },
                  {
                    label: "create",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-projects-apiKeys-create",
                  },
                  {
                    label: "delete",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-projects-apiKeys-delete",
                  },
                  {
                    label: "list",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-projects-apiKeys-list",
                  },
                ],
              },
              {
                label: "create",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-projects-create",
              },
              {
                label: "delete",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-projects-delete",
              },
              {
                label: "describe",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-projects-describe",
              },
              {
                label: "invitations",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-projects-invitations",
                collapsible: true,
                items: [
                  {
                    label: "delete",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-projects-invitations-delete",
                  },
                  {
                    label: "describe",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-projects-invitations-describe",
                  },
                  {
                    label: "invite",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-projects-invitations-invite",
                  },
                  {
                    label: "list",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-projects-invitations-list",
                  },
                  {
                    label: "update",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-projects-invitations-update",
                  },
                ],
              },
              {
                label: "list",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-projects-list",
              },
              {
                label: "settings",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-projects-settings",
                collapsible: true,
                items: [
                  {
                    label: "describe",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-projects-settings-describe",
                  },
                  {
                    label: "update",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-projects-settings-update",
                  },
                ],
              },
              {
                label: "teams",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-projects-teams",
                collapsible: true,
                items: [
                  {
                    label: "add",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-projects-teams-add",
                  },
                  {
                    label: "delete",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-projects-teams-delete",
                  },
                  {
                    label: "list",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-projects-teams-list",
                  },
                  {
                    label: "update",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-projects-teams-update",
                  },
                ],
              },
              {
                label: "users",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-projects-users",
                collapsible: true,
                items: [
                  {
                    label: "delete",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-projects-users-delete",
                  },
                  {
                    label: "list",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-projects-users-list",
                  },
                ],
              },
            ],
          },
          {
            label: "quickstart",
            contentSite: "atlas-cli",
            url: "/docs/atlas/cli/:version/command/atlas-quickstart",
          },
          {
            label: "security",
            contentSite: "atlas-cli",
            url: "/docs/atlas/cli/:version/command/atlas-security",
            collapsible: true,
            items: [
              {
                label: "customerCerts",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-security-customerCerts",
                collapsible: true,
                items: [
                  {
                    label: "create",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-security-customerCerts-create",
                  },
                  {
                    label: "describe",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-security-customerCerts-describe",
                  },
                  {
                    label: "disable",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-security-customerCerts-disable",
                  },
                ],
              },
              {
                label: "ldap",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-security-ldap",
                collapsible: true,
                items: [
                  {
                    label: "delete",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-security-ldap-delete",
                  },
                  {
                    label: "get",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-security-ldap-get",
                  },
                  {
                    label: "save",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-security-ldap-save",
                  },
                  {
                    label: "verify",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-security-ldap-verify",
                  },
                ],
              },
            ],
          },
          {
            label: "serverless",
            contentSite: "atlas-cli",
            url: "/docs/atlas/cli/:version/command/atlas-serverless",
            collapsible: true,
            items: [
              {
                label: "backups",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-serverless-backups",
                collapsible: true,
                items: [
                  {
                    label: "restores",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-serverless-backups-restores",
                    collapsible: true,
                    items: [
                      {
                        label: "create",
                        contentSite: "atlas-cli",
                        url: "/docs/atlas/cli/:version/command/atlas-serverless-backups-restores-create",
                      },
                      {
                        label: "describe",
                        contentSite: "atlas-cli",
                        url: "/docs/atlas/cli/:version/command/atlas-serverless-backups-restores-describe",
                      },
                      {
                        label: "list",
                        contentSite: "atlas-cli",
                        url: "/docs/atlas/cli/:version/command/atlas-serverless-backups-restores-list",
                      },
                      {
                        label: "watch",
                        contentSite: "atlas-cli",
                        url: "/docs/atlas/cli/:version/command/atlas-serverless-backups-restores-watch",
                      },
                    ],
                  },
                  {
                    label: "snapshots",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-serverless-backups-snapshots",
                    collapsible: true,
                    items: [
                      {
                        label: "describe",
                        contentSite: "atlas-cli",
                        url: "/docs/atlas/cli/:version/command/atlas-serverless-backups-snapshots-describe",
                      },
                      {
                        label: "list",
                        contentSite: "atlas-cli",
                        url: "/docs/atlas/cli/:version/command/atlas-serverless-backups-snapshots-list",
                      },
                      {
                        label: "watch",
                        contentSite: "atlas-cli",
                        url: "/docs/atlas/cli/:version/command/atlas-serverless-backups-snapshots-watch",
                      },
                    ],
                  },
                ],
              },
              {
                label: "create",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-serverless-create",
              },
              {
                label: "delete",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-serverless-delete",
              },
              {
                label: "describe",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-serverless-describe",
              },
              {
                label: "list",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-serverless-list",
              },
              {
                label: "update",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-serverless-update",
              },
              {
                label: "watch",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-serverless-watch",
              },
            ],
          },
          {
            label: "setup",
            contentSite: "atlas-cli",
            url: "/docs/atlas/cli/:version/command/atlas-setup",
          },
          {
            label: "teams",
            contentSite: "atlas-cli",
            url: "/docs/atlas/cli/:version/command/atlas-teams",
            collapsible: true,
            items: [
              {
                label: "create",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-teams-create",
              },
              {
                label: "delete",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-teams-delete",
              },
              {
                label: "describe",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-teams-describe",
              },
              {
                label: "list",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-teams-list",
              },
              {
                label: "users",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-teams-users",
                collapsible: true,
                items: [
                  {
                    label: "add",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-teams-users-add",
                  },
                  {
                    label: "delete",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-teams-users-delete",
                  },
                  {
                    label: "list",
                    contentSite: "atlas-cli",
                    url: "/docs/atlas/cli/:version/command/atlas-teams-users-list",
                  },
                ],
              },
            ],
          },
          {
            label: "users",
            contentSite: "atlas-cli",
            url: "/docs/atlas/cli/:version/command/atlas-users",
            collapsible: true,
            items: [
              {
                label: "describe",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-users-describe",
              },
              {
                label: "invite",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/command/atlas-users-invite",
              },
            ],
          },
        ],
      },
      {
        label: "Automate Processes",
        contentSite: "atlas-cli",
        url: "/docs/atlas/cli/:version/atlas-cli-automate",
        collapsible: true,
        items: [
          {
            label: "Environment Variables",
            contentSite: "atlas-cli",
            url: "/docs/atlas/cli/:version/atlas-cli-env-variables",
          },
          {
            label: "Customize Output",
            contentSite: "atlas-cli",
            url: "/docs/atlas/cli/:version/custom-output-cli",
          },
        ],
      },
      {
        label: "Configure Telemetry",
        contentSite: "atlas-cli",
        url: "/docs/atlas/cli/:version/telemetry",
      },
      {
        label: "Manage Atlas",
        contentSite: "atlas-cli",
        url: "/docs/atlas/cli/:version/atlas-cli-tutorials",
        collapsible: true,
        items: [
          {
            label: "Get Started with Atlas",
            contentSite: "atlas-cli",
            url: "/docs/atlas/cli/:version/atlas-cli-getting-started",
          },
          {
            label: "Create & Configure Clusters",
            contentSite: "atlas-cli",
            url: "/docs/atlas/cli/:version/atlas-cli-quickstart",
          },
          {
            label: "Cluster Configuration File",
            contentSite: "atlas-cli",
            url: "/docs/atlas/cli/:version/atlas-cli-create-cluster-from-config-file",
          },
          {
            label: "Test Automations",
            contentSite: "atlas-cli",
            url: "/docs/atlas/cli/:version/atlas-cli-ephemeral-cluster",
          },
        ],
      },
      {
        label: "Atlas CLI Reference",
        contentSite: "atlas-cli",
        url: "/docs/atlas/cli/:version/reference",
        collapsible: true,
        items: [
          {
            label: "JSON Configuration Files",
            contentSite: "atlas-cli",
            url: "/docs/atlas/cli/:version/reference/json",
            collapsible: true,
            items: [
              {
                label: "Cluster",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/reference/json/cluster-config-file",
              },
              {
                label: "Cloud Backup Schedule",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/reference/json/cloud-backup-schedule-config-file",
              },
              {
                label: "Atlas Search Index",
                contentSite: "atlas-cli",
                url: "/docs/atlas/cli/:version/reference/json/search-index-config-file",
              },
            ],
          },
        ],
      },
      {
        label: "Troubleshoot Errors",
        contentSite: "atlas-cli",
        url: "/docs/atlas/cli/:version/troubleshooting",
      },
      {
        label: "Changelog",
        contentSite: "atlas-cli",
        url: "/docs/atlas/cli/:version/atlas-cli-changelog",
      },
    ],
  },
];

export default tocData;
