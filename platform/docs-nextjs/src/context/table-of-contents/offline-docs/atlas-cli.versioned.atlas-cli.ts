import type { L1TocItem } from '../types';

export const toc: L1TocItem[] = [
  {
    label: 'Atlas CLI',
    contentSite: 'atlas-cli',
    url: '/docs/atlas/cli/:version/',
    items: [
      {
        label: 'Atlas CLI',
        contentSite: 'atlas-cli',
        group: true,
        versionDropdown: true,
        items: [
          {
            label: 'Overview',
            contentSite: 'atlas-cli',
            url: '/docs/atlas/cli/:version/',
          },
          {
            label: 'Install or Update',
            contentSite: 'atlas-cli',
            collapsible: true,
            url: '/docs/atlas/cli/:version/install-atlas-cli',
            items: [
              {
                label: 'Check Compatibility',
                contentSite: 'atlas-cli',
                url: '/docs/atlas/cli/:version/compatibility',
              },
              {
                label: 'Verify Packages',
                contentSite: 'atlas-cli',
                url: '/docs/atlas/cli/:version/verify-packages',
              },
            ],
          },
          {
            label: 'Connect',
            contentSite: 'atlas-cli',
            collapsible: true,
            url: '/docs/atlas/cli/:version/connect-atlas-cli',
            items: [
              {
                label: 'Save Connection Settings',
                contentSite: 'atlas-cli',
                url: '/docs/atlas/cli/:version/atlas-cli-save-connection-settings',
              },
              {
                label: 'Migrate to the Atlas CLI',
                contentSite: 'atlas-cli',
                url: '/docs/atlas/cli/:version/migrate-to-atlas-cli',
              },
            ],
          },
          {
            label: 'Manage the Atlas CLI',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/manage-atlas-cli',
          },
          {
            label: 'Commands',
            contentSite: 'atlas-cli',
            collapsible: true,
            items: [
              {
                label: 'atlas',
                contentSite: 'atlas-cli',
                collapsible: true,
                url: '/docs/atlas/cli/:version/command/atlas/',
                versions: {
                  includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                },
                items: [
                  {
                    label: 'accessLists',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-accessLists/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'create',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-accessLists-create/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'delete',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-accessLists-delete/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'describe',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-accessLists-describe/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'list',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-accessLists-list/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'accessLogs',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-accessLogs/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'list',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-accessLogs-list/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'alerts',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-alerts/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'acknowledge',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-alerts-acknowledge/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'describe',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-alerts-describe/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'list',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-alerts-list/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'settings',
                        contentSite: 'atlas-cli',
                        collapsible: true,
                        url: '/docs/atlas/cli/:version/command/atlas-alerts-settings/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                        items: [
                          {
                            label: 'create',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-alerts-settings-create/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'delete',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-alerts-settings-delete/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'describe',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-alerts-settings-describe/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'disable',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-alerts-settings-disable/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'enable',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-alerts-settings-enable/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'fields',
                            contentSite: 'atlas-cli',
                            collapsible: true,
                            url: '/docs/atlas/cli/:version/command/atlas-alerts-settings-fields/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                            items: [
                              {
                                label: 'type',
                                contentSite: 'atlas-cli',
                                url: '/docs/atlas/cli/:version/command/atlas-alerts-settings-fields-type/',
                                versions: {
                                  includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                                },
                              },
                            ],
                          },
                          {
                            label: 'list',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-alerts-settings-list/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'update',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-alerts-settings-update/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                        ],
                      },
                      {
                        label: 'unacknowledge',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-alerts-unacknowledge/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'auditing',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-auditing/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'describe',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-auditing-describe/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'update',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-auditing-update/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'auth',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-auth/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'login',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-auth-login/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'logout',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-auth-logout/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'register',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-auth-register/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'whoami',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-auth-whoami/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'backups',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-backups/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'compliancePolicy',
                        contentSite: 'atlas-cli',
                        collapsible: true,
                        url: '/docs/atlas/cli/:version/command/atlas-backups-compliancePolicy/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                        items: [
                          {
                            label: 'copyProtection',
                            contentSite: 'atlas-cli',
                            collapsible: true,
                            url: '/docs/atlas/cli/:version/command/atlas-backups-compliancePolicy-copyProtection/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                            items: [
                              {
                                label: 'disable',
                                contentSite: 'atlas-cli',
                                url: '/docs/atlas/cli/:version/command/atlas-backups-compliancePolicy-copyProtection-disable/',
                                versions: {
                                  includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                                },
                              },
                              {
                                label: 'enable',
                                contentSite: 'atlas-cli',
                                url: '/docs/atlas/cli/:version/command/atlas-backups-compliancePolicy-copyProtection-enable/',
                                versions: {
                                  includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                                },
                              },
                            ],
                          },
                          {
                            label: 'describe',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-backups-compliancePolicy-describe/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'enable',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-backups-compliancePolicy-enable/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'encryptionAtRest',
                            contentSite: 'atlas-cli',
                            collapsible: true,
                            url: '/docs/atlas/cli/:version/command/atlas-backups-compliancePolicy-encryptionAtRest/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                            items: [
                              {
                                label: 'disable',
                                contentSite: 'atlas-cli',
                                url: '/docs/atlas/cli/:version/command/atlas-backups-compliancePolicy-encryptionAtRest-disable/',
                                versions: {
                                  includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                                },
                              },
                              {
                                label: 'enable',
                                contentSite: 'atlas-cli',
                                url: '/docs/atlas/cli/:version/command/atlas-backups-compliancePolicy-encryptionAtRest-enable/',
                                versions: {
                                  includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                                },
                              },
                            ],
                          },
                          {
                            label: 'pointInTimeRestores',
                            contentSite: 'atlas-cli',
                            collapsible: true,
                            url: '/docs/atlas/cli/:version/command/atlas-backups-compliancePolicy-pointInTimeRestores/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                            items: [
                              {
                                label: 'enable',
                                contentSite: 'atlas-cli',
                                url: '/docs/atlas/cli/:version/command/atlas-backups-compliancePolicy-pointInTimeRestores-enable/',
                                versions: {
                                  includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                                },
                              },
                            ],
                          },
                          {
                            label: 'policies',
                            contentSite: 'atlas-cli',
                            collapsible: true,
                            url: '/docs/atlas/cli/:version/command/atlas-backups-compliancePolicy-policies/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                            items: [
                              {
                                label: 'describe',
                                contentSite: 'atlas-cli',
                                url: '/docs/atlas/cli/:version/command/atlas-backups-compliancePolicy-policies-describe/',
                                versions: {
                                  includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                                },
                              },
                              {
                                label: 'ondemand',
                                contentSite: 'atlas-cli',
                                collapsible: true,
                                url: '/docs/atlas/cli/:version/command/atlas-backups-compliancePolicy-policies-ondemand/',
                                versions: {
                                  includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                                },
                                items: [
                                  {
                                    label: 'create',
                                    contentSite: 'atlas-cli',
                                    url: '/docs/atlas/cli/:version/command/atlas-backups-compliancePolicy-policies-ondemand-create/',
                                    versions: {
                                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                                    },
                                  },
                                  {
                                    label: 'describe',
                                    contentSite: 'atlas-cli',
                                    url: '/docs/atlas/cli/:version/command/atlas-backups-compliancePolicy-policies-ondemand-describe/',
                                    versions: {
                                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                                    },
                                  },
                                  {
                                    label: 'update',
                                    contentSite: 'atlas-cli',
                                    url: '/docs/atlas/cli/:version/command/atlas-backups-compliancePolicy-policies-ondemand-update/',
                                    versions: {
                                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                                    },
                                  },
                                ],
                              },
                              {
                                label: 'scheduled',
                                contentSite: 'atlas-cli',
                                collapsible: true,
                                url: '/docs/atlas/cli/:version/command/atlas-backups-compliancePolicy-policies-scheduled/',
                                versions: {
                                  includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                                },
                                items: [
                                  {
                                    label: 'create',
                                    contentSite: 'atlas-cli',
                                    url: '/docs/atlas/cli/:version/command/atlas-backups-compliancePolicy-policies-scheduled-create/',
                                    versions: {
                                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                                    },
                                  },
                                  {
                                    label: 'describe',
                                    contentSite: 'atlas-cli',
                                    url: '/docs/atlas/cli/:version/command/atlas-backups-compliancePolicy-policies-scheduled-describe/',
                                    versions: {
                                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                                    },
                                  },
                                ],
                              },
                            ],
                          },
                          {
                            label: 'setup',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-backups-compliancePolicy-setup/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                        ],
                      },
                      {
                        label: 'exports',
                        contentSite: 'atlas-cli',
                        collapsible: true,
                        url: '/docs/atlas/cli/:version/command/atlas-backups-exports/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                        items: [
                          {
                            label: 'buckets',
                            contentSite: 'atlas-cli',
                            collapsible: true,
                            url: '/docs/atlas/cli/:version/command/atlas-backups-exports-buckets/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                            items: [
                              {
                                label: 'create',
                                contentSite: 'atlas-cli',
                                url: '/docs/atlas/cli/:version/command/atlas-backups-exports-buckets-create/',
                                versions: {
                                  includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                                },
                              },
                              {
                                label: 'delete',
                                contentSite: 'atlas-cli',
                                url: '/docs/atlas/cli/:version/command/atlas-backups-exports-buckets-delete/',
                                versions: {
                                  includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                                },
                              },
                              {
                                label: 'describe',
                                contentSite: 'atlas-cli',
                                url: '/docs/atlas/cli/:version/command/atlas-backups-exports-buckets-describe/',
                                versions: {
                                  includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                                },
                              },
                              {
                                label: 'list',
                                contentSite: 'atlas-cli',
                                url: '/docs/atlas/cli/:version/command/atlas-backups-exports-buckets-list/',
                                versions: {
                                  includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                                },
                              },
                            ],
                          },
                          {
                            label: 'jobs',
                            contentSite: 'atlas-cli',
                            collapsible: true,
                            url: '/docs/atlas/cli/:version/command/atlas-backups-exports-jobs/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                            items: [
                              {
                                label: 'create',
                                contentSite: 'atlas-cli',
                                url: '/docs/atlas/cli/:version/command/atlas-backups-exports-jobs-create/',
                                versions: {
                                  includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                                },
                              },
                              {
                                label: 'describe',
                                contentSite: 'atlas-cli',
                                url: '/docs/atlas/cli/:version/command/atlas-backups-exports-jobs-describe/',
                                versions: {
                                  includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                                },
                              },
                              {
                                label: 'list',
                                contentSite: 'atlas-cli',
                                url: '/docs/atlas/cli/:version/command/atlas-backups-exports-jobs-list/',
                                versions: {
                                  includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                                },
                              },
                              {
                                label: 'watch',
                                contentSite: 'atlas-cli',
                                url: '/docs/atlas/cli/:version/command/atlas-backups-exports-jobs-watch/',
                                versions: {
                                  includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                                },
                              },
                            ],
                          },
                        ],
                      },
                      {
                        label: 'restores',
                        contentSite: 'atlas-cli',
                        collapsible: true,
                        url: '/docs/atlas/cli/:version/command/atlas-backups-restores/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                        items: [
                          {
                            label: 'describe',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-backups-restores-describe/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'list',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-backups-restores-list/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'start',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-backups-restores-start/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'watch',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-backups-restores-watch/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                        ],
                      },
                      {
                        label: 'schedule',
                        contentSite: 'atlas-cli',
                        collapsible: true,
                        url: '/docs/atlas/cli/:version/command/atlas-backups-schedule/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                        items: [
                          {
                            label: 'delete',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-backups-schedule-delete/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'describe',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-backups-schedule-describe/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'update',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-backups-schedule-update/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                        ],
                      },
                      {
                        label: 'snapshots',
                        contentSite: 'atlas-cli',
                        collapsible: true,
                        url: '/docs/atlas/cli/:version/command/atlas-backups-snapshots/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                        items: [
                          {
                            label: 'create',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-backups-snapshots-create/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'delete',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-backups-snapshots-delete/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'describe',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-backups-snapshots-describe/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'download',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-backups-snapshots-download/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'list',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-backups-snapshots-list/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'watch',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-backups-snapshots-watch/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                        ],
                      },
                    ],
                  },
                  {
                    label: 'cloudProviders',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-cloudProviders/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'accessRoles',
                        contentSite: 'atlas-cli',
                        collapsible: true,
                        url: '/docs/atlas/cli/:version/command/atlas-cloudProviders-accessRoles/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                        items: [
                          {
                            label: 'aws',
                            contentSite: 'atlas-cli',
                            collapsible: true,
                            url: '/docs/atlas/cli/:version/command/atlas-cloudProviders-accessRoles-aws/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                            items: [
                              {
                                label: 'authorize',
                                contentSite: 'atlas-cli',
                                url: '/docs/atlas/cli/:version/command/atlas-cloudProviders-accessRoles-aws-authorize/',
                                versions: {
                                  includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                                },
                              },
                              {
                                label: 'create',
                                contentSite: 'atlas-cli',
                                url: '/docs/atlas/cli/:version/command/atlas-cloudProviders-accessRoles-aws-create/',
                                versions: {
                                  includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                                },
                              },
                              {
                                label: 'deauthorize',
                                contentSite: 'atlas-cli',
                                url: '/docs/atlas/cli/:version/command/atlas-cloudProviders-accessRoles-aws-deauthorize/',
                                versions: {
                                  includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                                },
                              },
                            ],
                          },
                          {
                            label: 'list',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-cloudProviders-accessRoles-list/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                        ],
                      },
                    ],
                  },
                  {
                    label: 'clusters',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-clusters/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'advancedSettings',
                        contentSite: 'atlas-cli',
                        collapsible: true,
                        url: '/docs/atlas/cli/:version/command/atlas-clusters-advancedSettings/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                        items: [
                          {
                            label: 'describe',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-clusters-advancedSettings-describe/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'update',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-clusters-advancedSettings-update/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                        ],
                      },
                      {
                        label: 'availableRegions',
                        contentSite: 'atlas-cli',
                        collapsible: true,
                        url: '/docs/atlas/cli/:version/command/atlas-clusters-availableRegions/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                        items: [
                          {
                            label: 'list',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-clusters-availableRegions-list/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                        ],
                      },
                      {
                        label: 'connect',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-clusters-connect/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.52'],
                        },
                      },
                      {
                        label: 'connectionStrings',
                        contentSite: 'atlas-cli',
                        collapsible: true,
                        url: '/docs/atlas/cli/:version/command/atlas-clusters-connectionStrings/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                        items: [
                          {
                            label: 'describe',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-clusters-connectionStrings-describe/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                        ],
                      },
                      {
                        label: 'create',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-clusters-create/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'delete',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-clusters-delete/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'describe',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-clusters-describe/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'failover',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-clusters-failover/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'indexes',
                        contentSite: 'atlas-cli',
                        collapsible: true,
                        url: '/docs/atlas/cli/:version/command/atlas-clusters-indexes/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                        items: [
                          {
                            label: 'create',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-clusters-indexes-create/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                        ],
                      },
                      {
                        label: 'list',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-clusters-list/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'onlineArchives',
                        contentSite: 'atlas-cli',
                        collapsible: true,
                        url: '/docs/atlas/cli/:version/command/atlas-clusters-onlineArchives/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                        items: [
                          {
                            label: 'create',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-clusters-onlineArchives-create/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'delete',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-clusters-onlineArchives-delete/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'describe',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-clusters-onlineArchives-describe/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'list',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-clusters-onlineArchives-list/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'pause',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-clusters-onlineArchives-pause/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'start',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-clusters-onlineArchives-start/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'update',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-clusters-onlineArchives-update/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'watch',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-clusters-onlineArchives-watch/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                        ],
                      },
                      {
                        label: 'pause',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-clusters-pause/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'sampleData',
                        contentSite: 'atlas-cli',
                        collapsible: true,
                        url: '/docs/atlas/cli/:version/command/atlas-clusters-sampleData/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                        items: [
                          {
                            label: 'describe',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-clusters-sampleData-describe/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'load',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-clusters-sampleData-load/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'watch',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-clusters-sampleData-watch/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                        ],
                      },
                      {
                        label: 'search',
                        contentSite: 'atlas-cli',
                        collapsible: true,
                        url: '/docs/atlas/cli/:version/command/atlas-clusters-search/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                        items: [
                          {
                            label: 'indexes',
                            contentSite: 'atlas-cli',
                            collapsible: true,
                            url: '/docs/atlas/cli/:version/command/atlas-clusters-search-indexes/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                            items: [
                              {
                                label: 'create',
                                contentSite: 'atlas-cli',
                                url: '/docs/atlas/cli/:version/command/atlas-clusters-search-indexes-create/',
                                versions: {
                                  includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                                },
                              },
                              {
                                label: 'delete',
                                contentSite: 'atlas-cli',
                                url: '/docs/atlas/cli/:version/command/atlas-clusters-search-indexes-delete/',
                                versions: {
                                  includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                                },
                              },
                              {
                                label: 'describe',
                                contentSite: 'atlas-cli',
                                url: '/docs/atlas/cli/:version/command/atlas-clusters-search-indexes-describe/',
                                versions: {
                                  includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                                },
                              },
                              {
                                label: 'list',
                                contentSite: 'atlas-cli',
                                url: '/docs/atlas/cli/:version/command/atlas-clusters-search-indexes-list/',
                                versions: {
                                  includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                                },
                              },
                              {
                                label: 'update',
                                contentSite: 'atlas-cli',
                                url: '/docs/atlas/cli/:version/command/atlas-clusters-search-indexes-update/',
                                versions: {
                                  includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                                },
                              },
                            ],
                          },
                          {
                            label: 'nodes',
                            contentSite: 'atlas-cli',
                            collapsible: true,
                            url: '/docs/atlas/cli/:version/command/atlas-clusters-search-nodes/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                            items: [
                              {
                                label: 'create',
                                contentSite: 'atlas-cli',
                                url: '/docs/atlas/cli/:version/command/atlas-clusters-search-nodes-create/',
                                versions: {
                                  includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                                },
                              },
                              {
                                label: 'delete',
                                contentSite: 'atlas-cli',
                                url: '/docs/atlas/cli/:version/command/atlas-clusters-search-nodes-delete/',
                                versions: {
                                  includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                                },
                              },
                              {
                                label: 'list',
                                contentSite: 'atlas-cli',
                                url: '/docs/atlas/cli/:version/command/atlas-clusters-search-nodes-list/',
                                versions: {
                                  includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                                },
                              },
                              {
                                label: 'update',
                                contentSite: 'atlas-cli',
                                url: '/docs/atlas/cli/:version/command/atlas-clusters-search-nodes-update/',
                                versions: {
                                  includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                                },
                              },
                            ],
                          },
                        ],
                      },
                      {
                        label: 'start',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-clusters-start/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'update',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-clusters-update/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'upgrade',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-clusters-upgrade/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'watch',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-clusters-watch/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'completion',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-completion/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'bash',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-completion-bash/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'fish',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-completion-fish/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'powershell',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-completion-powershell/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'zsh',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-completion-zsh/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'config',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-config/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'describe',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-config-describe/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'edit',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-config-edit/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'list',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-config-list/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'rename',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-config-rename/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'set',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-config-set/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'customDbRoles',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-customDbRoles/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'create',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-customDbRoles-create/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'delete',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-customDbRoles-delete/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'describe',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-customDbRoles-describe/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'list',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-customDbRoles-list/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'update',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-customDbRoles-update/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'customDns',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-customDns/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'aws',
                        contentSite: 'atlas-cli',
                        collapsible: true,
                        url: '/docs/atlas/cli/:version/command/atlas-customDns-aws/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                        items: [
                          {
                            label: 'describe',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-customDns-aws-describe/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'disable',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-customDns-aws-disable/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'enable',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-customDns-aws-enable/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                        ],
                      },
                    ],
                  },
                  {
                    label: 'dataFederation',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-dataFederation/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'create',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-dataFederation-create/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'delete',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-dataFederation-delete/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'describe',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-dataFederation-describe/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'list',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-dataFederation-list/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'logs',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-dataFederation-logs/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'privateEndpoints',
                        contentSite: 'atlas-cli',
                        collapsible: true,
                        url: '/docs/atlas/cli/:version/command/atlas-dataFederation-privateEndpoints/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                        items: [
                          {
                            label: 'create',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-dataFederation-privateEndpoints-create/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'delete',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-dataFederation-privateEndpoints-delete/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'describe',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-dataFederation-privateEndpoints-describe/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'list',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-dataFederation-privateEndpoints-list/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                        ],
                      },
                      {
                        label: 'queryLimits',
                        contentSite: 'atlas-cli',
                        collapsible: true,
                        url: '/docs/atlas/cli/:version/command/atlas-dataFederation-queryLimits/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                        items: [
                          {
                            label: 'create',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-dataFederation-queryLimits-create/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'delete',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-dataFederation-queryLimits-delete/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'describe',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-dataFederation-queryLimits-describe/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'list',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-dataFederation-queryLimits-list/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                        ],
                      },
                      {
                        label: 'update',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-dataFederation-update/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'dbusers',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-dbusers/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'certs',
                        contentSite: 'atlas-cli',
                        collapsible: true,
                        url: '/docs/atlas/cli/:version/command/atlas-dbusers-certs/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                        items: [
                          {
                            label: 'create',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-dbusers-certs-create/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'list',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-dbusers-certs-list/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                        ],
                      },
                      {
                        label: 'create',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-dbusers-create/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'delete',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-dbusers-delete/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'describe',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-dbusers-describe/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'list',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-dbusers-list/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'update',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-dbusers-update/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'deployments',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-deployments/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'connect',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-deployments-connect/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'delete',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-deployments-delete/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'list',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-deployments-list/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'logs',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-deployments-logs/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'pause',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-deployments-pause/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'search',
                        contentSite: 'atlas-cli',
                        collapsible: true,
                        url: '/docs/atlas/cli/:version/command/atlas-deployments-search/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                        items: [
                          {
                            label: 'indexes',
                            contentSite: 'atlas-cli',
                            collapsible: true,
                            url: '/docs/atlas/cli/:version/command/atlas-deployments-search-indexes/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                            items: [
                              {
                                label: 'create',
                                contentSite: 'atlas-cli',
                                url: '/docs/atlas/cli/:version/command/atlas-deployments-search-indexes-create/',
                                versions: {
                                  includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                                },
                              },
                              {
                                label: 'delete',
                                contentSite: 'atlas-cli',
                                url: '/docs/atlas/cli/:version/command/atlas-deployments-search-indexes-delete/',
                                versions: {
                                  includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                                },
                              },
                              {
                                label: 'describe',
                                contentSite: 'atlas-cli',
                                url: '/docs/atlas/cli/:version/command/atlas-deployments-search-indexes-describe/',
                                versions: {
                                  includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                                },
                              },
                              {
                                label: 'list',
                                contentSite: 'atlas-cli',
                                url: '/docs/atlas/cli/:version/command/atlas-deployments-search-indexes-list/',
                                versions: {
                                  includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                                },
                              },
                            ],
                          },
                        ],
                      },
                      {
                        label: 'setup',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-deployments-setup/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'start',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-deployments-start/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'events',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-events/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'organizations',
                        contentSite: 'atlas-cli',
                        collapsible: true,
                        url: '/docs/atlas/cli/:version/command/atlas-events-organizations/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                        items: [
                          {
                            label: 'list',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-events-organizations-list/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                        ],
                      },
                      {
                        label: 'projects',
                        contentSite: 'atlas-cli',
                        collapsible: true,
                        url: '/docs/atlas/cli/:version/command/atlas-events-projects/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                        items: [
                          {
                            label: 'list',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-events-projects-list/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                        ],
                      },
                    ],
                  },
                  {
                    label: 'federatedAuthentication',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-federatedAuthentication/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'federationSettings',
                        contentSite: 'atlas-cli',
                        collapsible: true,
                        url: '/docs/atlas/cli/:version/command/atlas-federatedAuthentication-federationSettings/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                        items: [
                          {
                            label: 'connectedOrgConfigs',
                            contentSite: 'atlas-cli',
                            collapsible: true,
                            url: '/docs/atlas/cli/:version/command/atlas-federatedAuthentication-federationSettings-connectedOrgConfigs/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                            items: [
                              {
                                label: 'connect',
                                contentSite: 'atlas-cli',
                                url: '/docs/atlas/cli/:version/command/atlas-federatedAuthentication-federationSettings-connectedOrgConfigs-connect/',
                                versions: {
                                  includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                                },
                              },
                              {
                                label: 'delete',
                                contentSite: 'atlas-cli',
                                url: '/docs/atlas/cli/:version/command/atlas-federatedAuthentication-federationSettings-connectedOrgConfigs-delete/',
                                versions: {
                                  includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                                },
                              },
                              {
                                label: 'describe',
                                contentSite: 'atlas-cli',
                                url: '/docs/atlas/cli/:version/command/atlas-federatedAuthentication-federationSettings-connectedOrgConfigs-describe/',
                                versions: {
                                  includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                                },
                              },
                              {
                                label: 'disconnect',
                                contentSite: 'atlas-cli',
                                url: '/docs/atlas/cli/:version/command/atlas-federatedAuthentication-federationSettings-connectedOrgConfigs-disconnect/',
                                versions: {
                                  includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                                },
                              },
                              {
                                label: 'list',
                                contentSite: 'atlas-cli',
                                url: '/docs/atlas/cli/:version/command/atlas-federatedAuthentication-federationSettings-connectedOrgConfigs-list/',
                                versions: {
                                  includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                                },
                              },
                              {
                                label: 'update',
                                contentSite: 'atlas-cli',
                                url: '/docs/atlas/cli/:version/command/atlas-federatedAuthentication-federationSettings-connectedOrgConfigs-update/',
                                versions: {
                                  includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                                },
                              },
                            ],
                          },
                          {
                            label: 'describe',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-federatedAuthentication-federationSettings-describe/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'identityProvider',
                            contentSite: 'atlas-cli',
                            collapsible: true,
                            url: '/docs/atlas/cli/:version/command/atlas-federatedAuthentication-federationSettings-identityProvider/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                            items: [
                              {
                                label: 'create',
                                contentSite: 'atlas-cli',
                                collapsible: true,
                                url: '/docs/atlas/cli/:version/command/atlas-federatedAuthentication-federationSettings-identityProvider-create/',
                                versions: {
                                  includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                                },
                                items: [
                                  {
                                    label: 'oidc',
                                    contentSite: 'atlas-cli',
                                    url: '/docs/atlas/cli/:version/command/atlas-federatedAuthentication-federationSettings-identityProvider-create-oidc/',
                                    versions: {
                                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                                    },
                                  },
                                ],
                              },
                              {
                                label: 'delete',
                                contentSite: 'atlas-cli',
                                url: '/docs/atlas/cli/:version/command/atlas-federatedAuthentication-federationSettings-identityProvider-delete/',
                                versions: {
                                  includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                                },
                              },
                              {
                                label: 'describe',
                                contentSite: 'atlas-cli',
                                url: '/docs/atlas/cli/:version/command/atlas-federatedAuthentication-federationSettings-identityProvider-describe/',
                                versions: {
                                  includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                                },
                              },
                              {
                                label: 'list',
                                contentSite: 'atlas-cli',
                                url: '/docs/atlas/cli/:version/command/atlas-federatedAuthentication-federationSettings-identityProvider-list/',
                                versions: {
                                  includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                                },
                              },
                              {
                                label: 'revokeJwk',
                                contentSite: 'atlas-cli',
                                url: '/docs/atlas/cli/:version/command/atlas-federatedAuthentication-federationSettings-identityProvider-revokeJwk/',
                                versions: {
                                  includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                                },
                              },
                              {
                                label: 'update',
                                contentSite: 'atlas-cli',
                                collapsible: true,
                                url: '/docs/atlas/cli/:version/command/atlas-federatedAuthentication-federationSettings-identityProvider-update/',
                                versions: {
                                  includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                                },
                                items: [
                                  {
                                    label: 'oidc',
                                    contentSite: 'atlas-cli',
                                    url: '/docs/atlas/cli/:version/command/atlas-federatedAuthentication-federationSettings-identityProvider-update-oidc/',
                                    versions: {
                                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                                    },
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    label: 'integrations',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-integrations/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'create',
                        contentSite: 'atlas-cli',
                        collapsible: true,
                        url: '/docs/atlas/cli/:version/command/atlas-integrations-create/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                        items: [
                          {
                            label: 'DATADOG',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-integrations-create-DATADOG/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'OPS_GENIE',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-integrations-create-OPS_GENIE/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'PAGER_DUTY',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-integrations-create-PAGER_DUTY/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'VICTOR_OPS',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-integrations-create-VICTOR_OPS/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'WEBHOOK',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-integrations-create-WEBHOOK/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                        ],
                      },
                      {
                        label: 'delete',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-integrations-delete/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'describe',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-integrations-describe/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'list',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-integrations-list/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'kubernetes',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-kubernetes/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.38', 'v1.39', 'v1.40', 'v1.41', 'v1.42', 'v1.43', 'v1.44', 'v1.45', 'v1.46', 'v1.47', 'v1.48', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'config',
                        contentSite: 'atlas-cli',
                        collapsible: true,
                        url: '/docs/atlas/cli/:version/command/atlas-kubernetes-config/',
                        items: [
                          {
                            label: 'apply',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-kubernetes-config-apply/',
                          },
                          {
                            label: 'generate',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-kubernetes-config-generate/',
                          },
                        ],
                      },
                      {
                        label: 'dry-run',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-kubernetes-dry-run/',
                      },
                      {
                        label: 'operator',
                        contentSite: 'atlas-cli',
                        collapsible: true,
                        url: '/docs/atlas/cli/:version/command/atlas-kubernetes-operator/',
                        items: [
                          {
                            label: 'install',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-kubernetes-operator-install/',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    label: 'liveMigrations',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-liveMigrations/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'create',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-liveMigrations-create/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'cutover',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-liveMigrations-cutover/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'describe',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-liveMigrations-describe/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'link',
                        contentSite: 'atlas-cli',
                        collapsible: true,
                        url: '/docs/atlas/cli/:version/command/atlas-liveMigrations-link/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                        items: [
                          {
                            label: 'create',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-liveMigrations-link-create/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'delete',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-liveMigrations-link-delete/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                        ],
                      },
                      {
                        label: 'validation',
                        contentSite: 'atlas-cli',
                        collapsible: true,
                        url: '/docs/atlas/cli/:version/command/atlas-liveMigrations-validation/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                        items: [
                          {
                            label: 'create',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-liveMigrations-validation-create/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'describe',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-liveMigrations-validation-describe/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                        ],
                      },
                    ],
                  },
                  {
                    label: 'local',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-local/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'connect',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-local-connect/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.52'],
                        },
                      },
                      {
                        label: 'delete',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-local-delete/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.52'],
                        },
                      },
                      {
                        label: 'list',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-local-list/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.52'],
                        },
                      },
                      {
                        label: 'logs',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-local-logs/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.52'],
                        },
                      },
                      {
                        label: 'search',
                        contentSite: 'atlas-cli',
                        collapsible: true,
                        url: '/docs/atlas/cli/:version/command/atlas-local-search/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.52'],
                        },
                        items: [
                          {
                            label: 'indexes',
                            contentSite: 'atlas-cli',
                            collapsible: true,
                            url: '/docs/atlas/cli/:version/command/atlas-local-search-indexes/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.52'],
                            },
                            items: [
                              {
                                label: 'create',
                                contentSite: 'atlas-cli',
                                url: '/docs/atlas/cli/:version/command/atlas-local-search-indexes-create/',
                                versions: {
                                  includes: ['current', 'upcoming', 'v1.52'],
                                },
                              },
                              {
                                label: 'delete',
                                contentSite: 'atlas-cli',
                                url: '/docs/atlas/cli/:version/command/atlas-local-search-indexes-delete/',
                                versions: {
                                  includes: ['current', 'upcoming', 'v1.52'],
                                },
                              },
                              {
                                label: 'describe',
                                contentSite: 'atlas-cli',
                                url: '/docs/atlas/cli/:version/command/atlas-local-search-indexes-describe/',
                                versions: {
                                  includes: ['current', 'upcoming', 'v1.52'],
                                },
                              },
                              {
                                label: 'list',
                                contentSite: 'atlas-cli',
                                url: '/docs/atlas/cli/:version/command/atlas-local-search-indexes-list/',
                                versions: {
                                  includes: ['current', 'upcoming', 'v1.52'],
                                },
                              },
                            ],
                          },
                        ],
                      },
                      {
                        label: 'setup',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-local-setup/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.52'],
                        },
                      },
                      {
                        label: 'start',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-local-start/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.52'],
                        },
                      },
                      {
                        label: 'stop',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-local-stop/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.52'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'local',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-local/',
                    versions: {
                      includes: ['current', 'upcoming'],
                    },
                    items: [
                      {
                        label: 'connect',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-local-connect/',
                      },
                      {
                        label: 'delete',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-local-delete/',
                      },
                      {
                        label: 'list',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-local-list/',
                      },
                      {
                        label: 'logs',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-local-logs/',
                      },
                      {
                        label: 'search',
                        contentSite: 'atlas-cli',
                        collapsible: true,
                        url: '/docs/atlas/cli/:version/command/atlas-local-search/',
                        items: [
                          {
                            label: 'indexes',
                            contentSite: 'atlas-cli',
                            collapsible: true,
                            url: '/docs/atlas/cli/:version/command/atlas-local-search-indexes/',
                            items: [
                              {
                                label: 'create',
                                contentSite: 'atlas-cli',
                                url: '/docs/atlas/cli/:version/command/atlas-local-search-indexes-create/',
                              },
                              {
                                label: 'delete',
                                contentSite: 'atlas-cli',
                                url: '/docs/atlas/cli/:version/command/atlas-local-search-indexes-delete/',
                              },
                              {
                                label: 'describe',
                                contentSite: 'atlas-cli',
                                url: '/docs/atlas/cli/:version/command/atlas-local-search-indexes-describe/',
                              },
                              {
                                label: 'list',
                                contentSite: 'atlas-cli',
                                url: '/docs/atlas/cli/:version/command/atlas-local-search-indexes-list/',
                              },
                            ],
                          },
                        ],
                      },
                      {
                        label: 'setup',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-local-setup/',
                      },
                      {
                        label: 'start',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-local-start/',
                      },
                      {
                        label: 'stop',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-local-stop/',
                      },
                    ],
                  },
                  {
                    label: 'logs',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-logs/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'download',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-logs-download/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'maintenanceWindows',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-maintenanceWindows/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'clear',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-maintenanceWindows-clear/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'defer',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-maintenanceWindows-defer/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'describe',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-maintenanceWindows-describe/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'update',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-maintenanceWindows-update/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'metrics',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-metrics/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'databases',
                        contentSite: 'atlas-cli',
                        collapsible: true,
                        url: '/docs/atlas/cli/:version/command/atlas-metrics-databases/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                        items: [
                          {
                            label: 'describe',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-metrics-databases-describe/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'list',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-metrics-databases-list/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                        ],
                      },
                      {
                        label: 'disks',
                        contentSite: 'atlas-cli',
                        collapsible: true,
                        url: '/docs/atlas/cli/:version/command/atlas-metrics-disks/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                        items: [
                          {
                            label: 'describe',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-metrics-disks-describe/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'list',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-metrics-disks-list/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                        ],
                      },
                      {
                        label: 'processes',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-metrics-processes/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'networking',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-networking/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'containers',
                        contentSite: 'atlas-cli',
                        collapsible: true,
                        url: '/docs/atlas/cli/:version/command/atlas-networking-containers/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                        items: [
                          {
                            label: 'delete',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-networking-containers-delete/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'list',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-networking-containers-list/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                        ],
                      },
                      {
                        label: 'peering',
                        contentSite: 'atlas-cli',
                        collapsible: true,
                        url: '/docs/atlas/cli/:version/command/atlas-networking-peering/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                        items: [
                          {
                            label: 'create',
                            contentSite: 'atlas-cli',
                            collapsible: true,
                            url: '/docs/atlas/cli/:version/command/atlas-networking-peering-create/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                            items: [
                              {
                                label: 'aws',
                                contentSite: 'atlas-cli',
                                url: '/docs/atlas/cli/:version/command/atlas-networking-peering-create-aws/',
                                versions: {
                                  includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                                },
                              },
                              {
                                label: 'azure',
                                contentSite: 'atlas-cli',
                                url: '/docs/atlas/cli/:version/command/atlas-networking-peering-create-azure/',
                                versions: {
                                  includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                                },
                              },
                              {
                                label: 'gcp',
                                contentSite: 'atlas-cli',
                                url: '/docs/atlas/cli/:version/command/atlas-networking-peering-create-gcp/',
                                versions: {
                                  includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                                },
                              },
                            ],
                          },
                          {
                            label: 'delete',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-networking-peering-delete/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'list',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-networking-peering-list/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'watch',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-networking-peering-watch/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                        ],
                      },
                    ],
                  },
                  {
                    label: 'organizations',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-organizations/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'apiKeys',
                        contentSite: 'atlas-cli',
                        collapsible: true,
                        url: '/docs/atlas/cli/:version/command/atlas-organizations-apiKeys/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                        items: [
                          {
                            label: 'accessLists',
                            contentSite: 'atlas-cli',
                            collapsible: true,
                            url: '/docs/atlas/cli/:version/command/atlas-organizations-apiKeys-accessLists/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                            items: [
                              {
                                label: 'create',
                                contentSite: 'atlas-cli',
                                url: '/docs/atlas/cli/:version/command/atlas-organizations-apiKeys-accessLists-create/',
                                versions: {
                                  includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                                },
                              },
                              {
                                label: 'delete',
                                contentSite: 'atlas-cli',
                                url: '/docs/atlas/cli/:version/command/atlas-organizations-apiKeys-accessLists-delete/',
                                versions: {
                                  includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                                },
                              },
                              {
                                label: 'list',
                                contentSite: 'atlas-cli',
                                url: '/docs/atlas/cli/:version/command/atlas-organizations-apiKeys-accessLists-list/',
                                versions: {
                                  includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                                },
                              },
                            ],
                          },
                          {
                            label: 'assign',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-organizations-apiKeys-assign/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'create',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-organizations-apiKeys-create/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'delete',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-organizations-apiKeys-delete/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'describe',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-organizations-apiKeys-describe/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'list',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-organizations-apiKeys-list/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                        ],
                      },
                      {
                        label: 'create',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-organizations-create/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'delete',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-organizations-delete/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'describe',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-organizations-describe/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'invitations',
                        contentSite: 'atlas-cli',
                        collapsible: true,
                        url: '/docs/atlas/cli/:version/command/atlas-organizations-invitations/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                        items: [
                          {
                            label: 'delete',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-organizations-invitations-delete/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'describe',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-organizations-invitations-describe/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'invite',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-organizations-invitations-invite/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'list',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-organizations-invitations-list/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'update',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-organizations-invitations-update/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                        ],
                      },
                      {
                        label: 'list',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-organizations-list/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'users',
                        contentSite: 'atlas-cli',
                        collapsible: true,
                        url: '/docs/atlas/cli/:version/command/atlas-organizations-users/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                        items: [
                          {
                            label: 'list',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-organizations-users-list/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                        ],
                      },
                    ],
                  },
                  {
                    label: 'performanceAdvisor',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-performanceAdvisor/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'namespaces',
                        contentSite: 'atlas-cli',
                        collapsible: true,
                        url: '/docs/atlas/cli/:version/command/atlas-performanceAdvisor-namespaces/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                        items: [
                          {
                            label: 'list',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-performanceAdvisor-namespaces-list/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                        ],
                      },
                      {
                        label: 'slowOperationThreshold',
                        contentSite: 'atlas-cli',
                        collapsible: true,
                        url: '/docs/atlas/cli/:version/command/atlas-performanceAdvisor-slowOperationThreshold/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                        items: [
                          {
                            label: 'disable',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-performanceAdvisor-slowOperationThreshold-disable/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'enable',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-performanceAdvisor-slowOperationThreshold-enable/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                        ],
                      },
                      {
                        label: 'slowQueryLogs',
                        contentSite: 'atlas-cli',
                        collapsible: true,
                        url: '/docs/atlas/cli/:version/command/atlas-performanceAdvisor-slowQueryLogs/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                        items: [
                          {
                            label: 'list',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-performanceAdvisor-slowQueryLogs-list/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                        ],
                      },
                      {
                        label: 'suggestedIndexes',
                        contentSite: 'atlas-cli',
                        collapsible: true,
                        url: '/docs/atlas/cli/:version/command/atlas-performanceAdvisor-suggestedIndexes/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                        items: [
                          {
                            label: 'list',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-performanceAdvisor-suggestedIndexes-list/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                        ],
                      },
                    ],
                  },
                  {
                    label: 'plugin',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-plugin/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'install',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-plugin-install/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'list',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-plugin-list/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'uninstall',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-plugin-uninstall/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'update',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-plugin-update/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'privateEndpoints',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-privateEndpoints/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'aws',
                        contentSite: 'atlas-cli',
                        collapsible: true,
                        url: '/docs/atlas/cli/:version/command/atlas-privateEndpoints-aws/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                        items: [
                          {
                            label: 'create',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-privateEndpoints-aws-create/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'delete',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-privateEndpoints-aws-delete/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'describe',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-privateEndpoints-aws-describe/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'interfaces',
                            contentSite: 'atlas-cli',
                            collapsible: true,
                            url: '/docs/atlas/cli/:version/command/atlas-privateEndpoints-aws-interfaces/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                            items: [
                              {
                                label: 'create',
                                contentSite: 'atlas-cli',
                                url: '/docs/atlas/cli/:version/command/atlas-privateEndpoints-aws-interfaces-create/',
                                versions: {
                                  includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                                },
                              },
                              {
                                label: 'delete',
                                contentSite: 'atlas-cli',
                                url: '/docs/atlas/cli/:version/command/atlas-privateEndpoints-aws-interfaces-delete/',
                                versions: {
                                  includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                                },
                              },
                              {
                                label: 'describe',
                                contentSite: 'atlas-cli',
                                url: '/docs/atlas/cli/:version/command/atlas-privateEndpoints-aws-interfaces-describe/',
                                versions: {
                                  includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                                },
                              },
                            ],
                          },
                          {
                            label: 'list',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-privateEndpoints-aws-list/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'watch',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-privateEndpoints-aws-watch/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                        ],
                      },
                      {
                        label: 'azure',
                        contentSite: 'atlas-cli',
                        collapsible: true,
                        url: '/docs/atlas/cli/:version/command/atlas-privateEndpoints-azure/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                        items: [
                          {
                            label: 'create',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-privateEndpoints-azure-create/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'delete',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-privateEndpoints-azure-delete/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'describe',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-privateEndpoints-azure-describe/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'interfaces',
                            contentSite: 'atlas-cli',
                            collapsible: true,
                            url: '/docs/atlas/cli/:version/command/atlas-privateEndpoints-azure-interfaces/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                            items: [
                              {
                                label: 'create',
                                contentSite: 'atlas-cli',
                                url: '/docs/atlas/cli/:version/command/atlas-privateEndpoints-azure-interfaces-create/',
                                versions: {
                                  includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                                },
                              },
                              {
                                label: 'delete',
                                contentSite: 'atlas-cli',
                                url: '/docs/atlas/cli/:version/command/atlas-privateEndpoints-azure-interfaces-delete/',
                                versions: {
                                  includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                                },
                              },
                              {
                                label: 'describe',
                                contentSite: 'atlas-cli',
                                url: '/docs/atlas/cli/:version/command/atlas-privateEndpoints-azure-interfaces-describe/',
                                versions: {
                                  includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                                },
                              },
                            ],
                          },
                          {
                            label: 'list',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-privateEndpoints-azure-list/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'watch',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-privateEndpoints-azure-watch/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                        ],
                      },
                      {
                        label: 'gcp',
                        contentSite: 'atlas-cli',
                        collapsible: true,
                        url: '/docs/atlas/cli/:version/command/atlas-privateEndpoints-gcp/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                        items: [
                          {
                            label: 'create',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-privateEndpoints-gcp-create/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'delete',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-privateEndpoints-gcp-delete/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'describe',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-privateEndpoints-gcp-describe/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'interfaces',
                            contentSite: 'atlas-cli',
                            collapsible: true,
                            url: '/docs/atlas/cli/:version/command/atlas-privateEndpoints-gcp-interfaces/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                            items: [
                              {
                                label: 'create',
                                contentSite: 'atlas-cli',
                                url: '/docs/atlas/cli/:version/command/atlas-privateEndpoints-gcp-interfaces-create/',
                                versions: {
                                  includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                                },
                              },
                              {
                                label: 'delete',
                                contentSite: 'atlas-cli',
                                url: '/docs/atlas/cli/:version/command/atlas-privateEndpoints-gcp-interfaces-delete/',
                                versions: {
                                  includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                                },
                              },
                              {
                                label: 'describe',
                                contentSite: 'atlas-cli',
                                url: '/docs/atlas/cli/:version/command/atlas-privateEndpoints-gcp-interfaces-describe/',
                                versions: {
                                  includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                                },
                              },
                            ],
                          },
                          {
                            label: 'list',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-privateEndpoints-gcp-list/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'watch',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-privateEndpoints-gcp-watch/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                        ],
                      },
                      {
                        label: 'regionalModes',
                        contentSite: 'atlas-cli',
                        collapsible: true,
                        url: '/docs/atlas/cli/:version/command/atlas-privateEndpoints-regionalModes/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                        items: [
                          {
                            label: 'describe',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-privateEndpoints-regionalModes-describe/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'disable',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-privateEndpoints-regionalModes-disable/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'enable',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-privateEndpoints-regionalModes-enable/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                        ],
                      },
                    ],
                  },
                  {
                    label: 'processes',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-processes/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'describe',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-processes-describe/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'list',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-processes-list/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'projects',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-projects/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'apiKeys',
                        contentSite: 'atlas-cli',
                        collapsible: true,
                        url: '/docs/atlas/cli/:version/command/atlas-projects-apiKeys/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                        items: [
                          {
                            label: 'assign',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-projects-apiKeys-assign/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'create',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-projects-apiKeys-create/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'delete',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-projects-apiKeys-delete/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'list',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-projects-apiKeys-list/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                        ],
                      },
                      {
                        label: 'create',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-projects-create/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'delete',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-projects-delete/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'describe',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-projects-describe/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'list',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-projects-list/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'settings',
                        contentSite: 'atlas-cli',
                        collapsible: true,
                        url: '/docs/atlas/cli/:version/command/atlas-projects-settings/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                        items: [
                          {
                            label: 'describe',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-projects-settings-describe/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'update',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-projects-settings-update/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                        ],
                      },
                      {
                        label: 'teams',
                        contentSite: 'atlas-cli',
                        collapsible: true,
                        url: '/docs/atlas/cli/:version/command/atlas-projects-teams/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                        items: [
                          {
                            label: 'add',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-projects-teams-add/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'delete',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-projects-teams-delete/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'list',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-projects-teams-list/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'update',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-projects-teams-update/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                        ],
                      },
                      {
                        label: 'update',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-projects-update/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'users',
                        contentSite: 'atlas-cli',
                        collapsible: true,
                        url: '/docs/atlas/cli/:version/command/atlas-projects-users/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                        items: [
                          {
                            label: 'delete',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-projects-users-delete/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'list',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-projects-users-list/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                        ],
                      },
                    ],
                  },
                  {
                    label: 'security',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-security/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'customerCerts',
                        contentSite: 'atlas-cli',
                        collapsible: true,
                        url: '/docs/atlas/cli/:version/command/atlas-security-customerCerts/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                        items: [
                          {
                            label: 'create',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-security-customerCerts-create/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'describe',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-security-customerCerts-describe/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'disable',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-security-customerCerts-disable/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                        ],
                      },
                      {
                        label: 'ldap',
                        contentSite: 'atlas-cli',
                        collapsible: true,
                        url: '/docs/atlas/cli/:version/command/atlas-security-ldap/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                        items: [
                          {
                            label: 'delete',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-security-ldap-delete/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'get',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-security-ldap-get/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'save',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-security-ldap-save/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'verify',
                            contentSite: 'atlas-cli',
                            collapsible: true,
                            url: '/docs/atlas/cli/:version/command/atlas-security-ldap-verify/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                            items: [
                              {
                                label: 'status',
                                contentSite: 'atlas-cli',
                                collapsible: true,
                                url: '/docs/atlas/cli/:version/command/atlas-security-ldap-verify-status/',
                                versions: {
                                  includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                                },
                                items: [
                                  {
                                    label: 'watch',
                                    contentSite: 'atlas-cli',
                                    url: '/docs/atlas/cli/:version/command/atlas-security-ldap-verify-status-watch/',
                                    versions: {
                                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                                    },
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    label: 'setup',
                    contentSite: 'atlas-cli',
                    url: '/docs/atlas/cli/:version/command/atlas-setup/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                  },
                  {
                    label: 'streams',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-streams/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'connections',
                        contentSite: 'atlas-cli',
                        collapsible: true,
                        url: '/docs/atlas/cli/:version/command/atlas-streams-connections/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                        items: [
                          {
                            label: 'create',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-streams-connections-create/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'delete',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-streams-connections-delete/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'describe',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-streams-connections-describe/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'list',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-streams-connections-list/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'update',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-streams-connections-update/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                        ],
                      },
                      {
                        label: 'instances',
                        contentSite: 'atlas-cli',
                        collapsible: true,
                        url: '/docs/atlas/cli/:version/command/atlas-streams-instances/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                        items: [
                          {
                            label: 'create',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-streams-instances-create/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'delete',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-streams-instances-delete/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'describe',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-streams-instances-describe/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'download',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-streams-instances-download/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'list',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-streams-instances-list/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'update',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-streams-instances-update/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                        ],
                      },
                      {
                        label: 'privateLinks',
                        contentSite: 'atlas-cli',
                        collapsible: true,
                        url: '/docs/atlas/cli/:version/command/atlas-streams-privateLinks/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                        items: [
                          {
                            label: 'create',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-streams-privateLinks-create/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'delete',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-streams-privateLinks-delete/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'describe',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-streams-privateLinks-describe/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'list',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-streams-privateLinks-list/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                        ],
                      },
                    ],
                  },
                  {
                    label: 'teams',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-teams/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'create',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-teams-create/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'delete',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-teams-delete/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'describe',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-teams-describe/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'list',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-teams-list/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'rename',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-teams-rename/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'users',
                        contentSite: 'atlas-cli',
                        collapsible: true,
                        url: '/docs/atlas/cli/:version/command/atlas-teams-users/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                        items: [
                          {
                            label: 'add',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-teams-users-add/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'delete',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-teams-users-delete/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                          {
                            label: 'list',
                            contentSite: 'atlas-cli',
                            url: '/docs/atlas/cli/:version/command/atlas-teams-users-list/',
                            versions: {
                              includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                            },
                          },
                        ],
                      },
                    ],
                  },
                  {
                    label: 'users',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-users/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'describe',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-users-describe/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'invite',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-users-invite/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                    ],
                  },
                ],
              },
              {
                label: 'atlas api',
                contentSite: 'atlas-cli',
                collapsible: true,
                url: '/docs/atlas/cli/:version/command/atlas-api/',
                items: [
                  {
                    label: 'accessTracking',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-api-accessTracking/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'getAccessHistoryCluster',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-accessTracking-getAccessHistoryCluster/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getAccessHistoryProcess',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-accessTracking-getAccessHistoryProcess/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'activityFeed',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-api-activityFeed/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'getGroupActivityFeed',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-activityFeed-getGroupActivityFeed/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.52'],
                        },
                      },
                      {
                        label: 'getOrgActivityFeed',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-activityFeed-getOrgActivityFeed/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.52'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'aiModelApiKeys',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-api-aiModelApiKeys/',
                    versions: {
                      includes: ['current', 'upcoming'],
                    },
                    items: [
                      {
                        label: 'createModelApiKey',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-aiModelApiKeys-createModelApiKey/',
                        versions: {
                          includes: ['current', 'upcoming'],
                        },
                      },
                      {
                        label: 'deleteModelApiKey',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-aiModelApiKeys-deleteModelApiKey/',
                        versions: {
                          includes: ['current', 'upcoming'],
                        },
                      },
                      {
                        label: 'getGroupModelKey',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-aiModelApiKeys-getGroupModelKey/',
                        versions: {
                          includes: ['current', 'upcoming'],
                        },
                      },
                      {
                        label: 'getOrgModelKey',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-aiModelApiKeys-getOrgModelKey/',
                        versions: {
                          includes: ['current', 'upcoming'],
                        },
                      },
                      {
                        label: 'listGroupModelKeys',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-aiModelApiKeys-listGroupModelKeys/',
                        versions: {
                          includes: ['current', 'upcoming'],
                        },
                      },
                      {
                        label: 'listOrgModelKeys',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-aiModelApiKeys-listOrgModelKeys/',
                        versions: {
                          includes: ['current', 'upcoming'],
                        },
                      },
                      {
                        label: 'updateModelApiKey',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-aiModelApiKeys-updateModelApiKey/',
                        versions: {
                          includes: ['current', 'upcoming'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'aiModelRateLimits',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-api-aiModelRateLimits/',
                    versions: {
                      includes: ['current', 'upcoming'],
                    },
                    items: [
                      {
                        label: 'getGroupModelLimit',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-aiModelRateLimits-getGroupModelLimit/',
                        versions: {
                          includes: ['current', 'upcoming'],
                        },
                      },
                      {
                        label: 'getOrgModelLimit',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-aiModelRateLimits-getOrgModelLimit/',
                        versions: {
                          includes: ['current', 'upcoming'],
                        },
                      },
                      {
                        label: 'listGroupModelLimits',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-aiModelRateLimits-listGroupModelLimits/',
                        versions: {
                          includes: ['current', 'upcoming'],
                        },
                      },
                      {
                        label: 'listOrgModelLimits',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-aiModelRateLimits-listOrgModelLimits/',
                        versions: {
                          includes: ['current', 'upcoming'],
                        },
                      },
                      {
                        label: 'resetModelRateLimits',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-aiModelRateLimits-resetModelRateLimits/',
                        versions: {
                          includes: ['current', 'upcoming'],
                        },
                      },
                      {
                        label: 'updateModelRateLimit',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-aiModelRateLimits-updateModelRateLimit/',
                        versions: {
                          includes: ['current', 'upcoming'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'aiModels',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-api-aiModels/',
                    versions: {
                      includes: ['v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'createModelApiKey',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-aiModels-createModelApiKey/',
                        versions: {
                          includes: ['v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'deleteModelApiKey',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-aiModels-deleteModelApiKey/',
                        versions: {
                          includes: ['v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getGroupModelKey',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-aiModels-getGroupModelKey/',
                        versions: {
                          includes: ['v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getGroupModelLimit',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-aiModels-getGroupModelLimit/',
                        versions: {
                          includes: ['v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getOrgModelKey',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-aiModels-getOrgModelKey/',
                        versions: {
                          includes: ['v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getOrgModelLimit',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-aiModels-getOrgModelLimit/',
                        versions: {
                          includes: ['v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listGroupModelKeys',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-aiModels-listGroupModelKeys/',
                        versions: {
                          includes: ['v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listGroupModelLimits',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-aiModels-listGroupModelLimits/',
                        versions: {
                          includes: ['v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listOrgModelKeys',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-aiModels-listOrgModelKeys/',
                        versions: {
                          includes: ['v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listOrgModelLimits',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-aiModels-listOrgModelLimits/',
                        versions: {
                          includes: ['v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'resetModelRateLimits',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-aiModels-resetModelRateLimits/',
                        versions: {
                          includes: ['v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'updateModelApiKey',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-aiModels-updateModelApiKey/',
                        versions: {
                          includes: ['v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'updateModelRateLimit',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-aiModels-updateModelRateLimit/',
                        versions: {
                          includes: ['v1.51', 'v1.52'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'alertConfigurations',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-api-alertConfigurations/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'createAlertConfig',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-alertConfigurations-createAlertConfig/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'deleteAlertConfig',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-alertConfigurations-deleteAlertConfig/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getAlertConfig',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-alertConfigurations-getAlertConfig/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getAlertConfigs',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-alertConfigurations-getAlertConfigs/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listAlertConfigs',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-alertConfigurations-listAlertConfigs/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listMatcherFieldNames',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-alertConfigurations-listMatcherFieldNames/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'toggleAlertConfig',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-alertConfigurations-toggleAlertConfig/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'updateAlertConfig',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-alertConfigurations-updateAlertConfig/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'alerts',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-api-alerts/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'acknowledgeAlert',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-alerts-acknowledgeAlert/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getAlert',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-alerts-getAlert/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getAlertConfigAlerts',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-alerts-getAlertConfigAlerts/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listAlerts',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-alerts-listAlerts/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'atlasSearch',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-api-atlasSearch/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'createClusterFtsIndex',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-atlasSearch-createClusterFtsIndex/',
                        versions: {
                          includes: ['v1.49', 'v1.50'],
                        },
                      },
                      {
                        label: 'createClusterSearchDeployment',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-atlasSearch-createClusterSearchDeployment/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'createClusterSearchIndex',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-atlasSearch-createClusterSearchIndex/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'deleteClusterFtsIndex',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-atlasSearch-deleteClusterFtsIndex/',
                        versions: {
                          includes: ['v1.49', 'v1.50'],
                        },
                      },
                      {
                        label: 'deleteClusterSearchDeployment',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-atlasSearch-deleteClusterSearchDeployment/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'deleteClusterSearchIndex',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-atlasSearch-deleteClusterSearchIndex/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'deleteIndexByName',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-atlasSearch-deleteIndexByName/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getClusterFtsIndex',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-atlasSearch-getClusterFtsIndex/',
                        versions: {
                          includes: ['v1.49', 'v1.50'],
                        },
                      },
                      {
                        label: 'getClusterSearchDeployment',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-atlasSearch-getClusterSearchDeployment/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getClusterSearchIndex',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-atlasSearch-getClusterSearchIndex/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getIndexByName',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-atlasSearch-getIndexByName/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listClusterFtsIndex',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-atlasSearch-listClusterFtsIndex/',
                        versions: {
                          includes: ['v1.49', 'v1.50'],
                        },
                      },
                      {
                        label: 'listClusterSearchIndexes',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-atlasSearch-listClusterSearchIndexes/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listSearchIndex',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-atlasSearch-listSearchIndex/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'updateClusterFtsIndex',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-atlasSearch-updateClusterFtsIndex/',
                        versions: {
                          includes: ['v1.49', 'v1.50'],
                        },
                      },
                      {
                        label: 'updateClusterSearchDeployment',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-atlasSearch-updateClusterSearchDeployment/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'updateClusterSearchIndex',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-atlasSearch-updateClusterSearchIndex/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'updateIndexByName',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-atlasSearch-updateIndexByName/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'auditing',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-api-auditing/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'getGroupAuditLog',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-auditing-getGroupAuditLog/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'updateAuditLog',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-auditing-updateAuditLog/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'awsClustersDns',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-api-awsClustersDns/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'getAwsCustomDns',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-awsClustersDns-getAwsCustomDns/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'toggleAwsCustomDns',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-awsClustersDns-toggleAwsCustomDns/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'cloudBackups',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-api-cloudBackups/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'cancelBackupRestoreJob',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-cloudBackups-cancelBackupRestoreJob/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'createBackupExport',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-cloudBackups-createBackupExport/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'createBackupPrivateEndpoint',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-cloudBackups-createBackupPrivateEndpoint/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'createBackupRestoreJob',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-cloudBackups-createBackupRestoreJob/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'createExportBucket',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-cloudBackups-createExportBucket/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'deleteBackupPrivateEndpoint',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-cloudBackups-deleteBackupPrivateEndpoint/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'deleteBackupShardedCluster',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-cloudBackups-deleteBackupShardedCluster/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'deleteClusterBackupSchedule',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-cloudBackups-deleteClusterBackupSchedule/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'deleteClusterBackupSnapshot',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-cloudBackups-deleteClusterBackupSnapshot/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'deleteExportBucket',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-cloudBackups-deleteExportBucket/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'disableCompliancePolicy',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-cloudBackups-disableCompliancePolicy/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getBackupExport',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-cloudBackups-getBackupExport/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getBackupPrivateEndpoint',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-cloudBackups-getBackupPrivateEndpoint/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getBackupRestoreJob',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-cloudBackups-getBackupRestoreJob/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getBackupSchedule',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-cloudBackups-getBackupSchedule/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getBackupShardedCluster',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-cloudBackups-getBackupShardedCluster/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getClusterBackupSnapshot',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-cloudBackups-getClusterBackupSnapshot/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getCompliancePolicy',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-cloudBackups-getCompliancePolicy/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getExportBucket',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-cloudBackups-getExportBucket/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listBackupExports',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-cloudBackups-listBackupExports/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listBackupPrivateEndpoints',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-cloudBackups-listBackupPrivateEndpoints/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listBackupRestoreJobs',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-cloudBackups-listBackupRestoreJobs/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listBackupShardedClusters',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-cloudBackups-listBackupShardedClusters/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listBackupSnapshots',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-cloudBackups-listBackupSnapshots/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listExportBuckets',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-cloudBackups-listExportBuckets/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'takeSnapshots',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-cloudBackups-takeSnapshots/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'updateBackupExportBucket',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-cloudBackups-updateBackupExportBucket/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'updateBackupSchedule',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-cloudBackups-updateBackupSchedule/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'updateBackupSnapshot',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-cloudBackups-updateBackupSnapshot/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'updateCompliancePolicy',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-cloudBackups-updateCompliancePolicy/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'cloudMigrationService',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-api-cloudMigrationService/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'createGroupLiveMigration',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-cloudMigrationService-createGroupLiveMigration/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'createLinkToken',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-cloudMigrationService-createLinkToken/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'cutoverMigration',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-cloudMigrationService-cutoverMigration/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'deleteLinkTokens',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-cloudMigrationService-deleteLinkTokens/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getGroupLiveMigration',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-cloudMigrationService-getGroupLiveMigration/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getMigrationValidateStatus',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-cloudMigrationService-getMigrationValidateStatus/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listAvailableProjects',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-cloudMigrationService-listAvailableProjects/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'validateLiveMigrations',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-cloudMigrationService-validateLiveMigrations/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'cloudProviderAccess',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-api-cloudProviderAccess/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'authorizeProviderAccessRole',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-cloudProviderAccess-authorizeProviderAccessRole/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'createCloudProviderAccess',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-cloudProviderAccess-createCloudProviderAccess/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'deauthorizeProviderAccessRole',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-cloudProviderAccess-deauthorizeProviderAccessRole/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getCloudProviderAccess',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-cloudProviderAccess-getCloudProviderAccess/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listCloudProviderAccess',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-cloudProviderAccess-listCloudProviderAccess/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'clusterOutageSimulation',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-api-clusterOutageSimulation/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'endOutageSimulation',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-clusterOutageSimulation-endOutageSimulation/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getOutageSimulation',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-clusterOutageSimulation-getOutageSimulation/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'startOutageSimulation',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-clusterOutageSimulation-startOutageSimulation/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'clusters',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-api-clusters/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'autoScalingConfiguration',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-clusters-autoScalingConfiguration/',
                        versions: {
                          includes: ['v1.49', 'v1.50'],
                        },
                      },
                      {
                        label: 'createCluster',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-clusters-createCluster/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'deleteCluster',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-clusters-deleteCluster/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getCluster',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-clusters-getCluster/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getClusterStatus',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-clusters-getClusterStatus/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getProcessArgs',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-clusters-getProcessArgs/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getSampleDatasetLoad',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-clusters-getSampleDatasetLoad/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'grantMongoEmployeeAccess',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-clusters-grantMongoEmployeeAccess/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listClusterDetails',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-clusters-listClusterDetails/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listClusterProviderRegions',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-clusters-listClusterProviderRegions/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listClusters',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-clusters-listClusters/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'pinFeatureCompatibilityVersion',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-clusters-pinFeatureCompatibilityVersion/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'requestSampleDatasetLoad',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-clusters-requestSampleDatasetLoad/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'restartPrimaries',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-clusters-restartPrimaries/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'revokeMongoEmployeeAccess',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-clusters-revokeMongoEmployeeAccess/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'unpinFeatureCompatibilityVersion',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-clusters-unpinFeatureCompatibilityVersion/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'updateCluster',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-clusters-updateCluster/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'updateProcessArgs',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-clusters-updateProcessArgs/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'upgradeTenantUpgrade',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-clusters-upgradeTenantUpgrade/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'collectionLevelMetrics',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-api-collectionLevelMetrics/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'getClusterNamespaces',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-collectionLevelMetrics-getClusterNamespaces/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getProcessNamespaces',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-collectionLevelMetrics-getProcessNamespaces/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listCollStatMeasurements',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-collectionLevelMetrics-listCollStatMeasurements/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listCollStatMetrics',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-collectionLevelMetrics-listCollStatMetrics/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listPinnedNamespaces',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-collectionLevelMetrics-listPinnedNamespaces/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listProcessMeasurements',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-collectionLevelMetrics-listProcessMeasurements/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'pinNamespaces',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-collectionLevelMetrics-pinNamespaces/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'unpinNamespaces',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-collectionLevelMetrics-unpinNamespaces/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'updatePinnedNamespaces',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-collectionLevelMetrics-updatePinnedNamespaces/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'customDatabaseRoles',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-api-customDatabaseRoles/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'createCustomDbRole',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-customDatabaseRoles-createCustomDbRole/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'deleteCustomDbRole',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-customDatabaseRoles-deleteCustomDbRole/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getCustomDbRole',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-customDatabaseRoles-getCustomDbRole/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listCustomDbRoles',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-customDatabaseRoles-listCustomDbRoles/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'updateCustomDbRole',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-customDatabaseRoles-updateCustomDbRole/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'databaseUsers',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-api-databaseUsers/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'createDatabaseUser',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-databaseUsers-createDatabaseUser/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'deleteDatabaseUser',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-databaseUsers-deleteDatabaseUser/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getDatabaseUser',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-databaseUsers-getDatabaseUser/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listDatabaseUsers',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-databaseUsers-listDatabaseUsers/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'updateDatabaseUser',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-databaseUsers-updateDatabaseUser/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'dataFederation',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-api-dataFederation/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'createDataFederation',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-dataFederation-createDataFederation/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'createPrivateEndpointId',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-dataFederation-createPrivateEndpointId/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'deleteDataFederation',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-dataFederation-deleteDataFederation/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'deleteDataFederationLimit',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-dataFederation-deleteDataFederationLimit/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'deletePrivateEndpointId',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-dataFederation-deletePrivateEndpointId/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'downloadFederationQueryLogs',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-dataFederation-downloadFederationQueryLogs/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getDataFederation',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-dataFederation-getDataFederation/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getDataFederationLimit',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-dataFederation-getDataFederationLimit/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getPrivateEndpointId',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-dataFederation-getPrivateEndpointId/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listDataFederation',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-dataFederation-listDataFederation/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listDataFederationLimits',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-dataFederation-listDataFederationLimits/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listPrivateEndpointIds',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-dataFederation-listPrivateEndpointIds/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'setDataFederationLimit',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-dataFederation-setDataFederationLimit/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'updateDataFederation',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-dataFederation-updateDataFederation/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'encryptionAtRestUsingCustomerKeyManagement',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-api-encryptionAtRestUsingCustomerKeyManagement/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'createRestPrivateEndpoint',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-encryptionAtRestUsingCustomerKeyManagement-createRestPrivateEndpoint/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getEncryptionAtRest',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-encryptionAtRestUsingCustomerKeyManagement-getEncryptionAtRest/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getRestPrivateEndpoint',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-encryptionAtRestUsingCustomerKeyManagement-getRestPrivateEndpoint/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listRestPrivateEndpoints',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-encryptionAtRestUsingCustomerKeyManagement-listRestPrivateEndpoints/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'requestPrivateEndpointDeletion',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-encryptionAtRestUsingCustomerKeyManagement-requestPrivateEndpointDeletion/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'updateEncryptionAtRest',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-encryptionAtRestUsingCustomerKeyManagement-updateEncryptionAtRest/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'events',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-api-events/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'getGroupEvent',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-events-getGroupEvent/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getOrgEvent',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-events-getOrgEvent/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listEventTypes',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-events-listEventTypes/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listGroupEvents',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-events-listGroupEvents/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listOrgEvents',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-events-listOrgEvents/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'federatedAuthentication',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-api-federatedAuthentication/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'createIdentityProvider',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-federatedAuthentication-createIdentityProvider/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'createRoleMapping',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-federatedAuthentication-createRoleMapping/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'deleteFederationSetting',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-federatedAuthentication-deleteFederationSetting/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'deleteIdentityProvider',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-federatedAuthentication-deleteIdentityProvider/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'deleteRoleMapping',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-federatedAuthentication-deleteRoleMapping/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getConnectedOrgConfig',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-federatedAuthentication-getConnectedOrgConfig/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getFederationSettings',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-federatedAuthentication-getFederationSettings/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getIdentityProvider',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-federatedAuthentication-getIdentityProvider/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getIdentityProviderMetadata',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-federatedAuthentication-getIdentityProviderMetadata/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getRoleMapping',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-federatedAuthentication-getRoleMapping/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listConnectedOrgConfigs',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-federatedAuthentication-listConnectedOrgConfigs/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listIdentityProviders',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-federatedAuthentication-listIdentityProviders/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listRoleMappings',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-federatedAuthentication-listRoleMappings/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'removeConnectedOrgConfig',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-federatedAuthentication-removeConnectedOrgConfig/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'revokeIdentityProviderJwks',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-federatedAuthentication-revokeIdentityProviderJwks/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'updateConnectedOrgConfig',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-federatedAuthentication-updateConnectedOrgConfig/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'updateIdentityProvider',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-federatedAuthentication-updateIdentityProvider/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'updateRoleMapping',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-federatedAuthentication-updateRoleMapping/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'flexClusters',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-api-flexClusters/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'createFlexCluster',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-flexClusters-createFlexCluster/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'deleteFlexCluster',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-flexClusters-deleteFlexCluster/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getFlexCluster',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-flexClusters-getFlexCluster/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listFlexClusters',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-flexClusters-listFlexClusters/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'tenantUpgrade',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-flexClusters-tenantUpgrade/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'updateFlexCluster',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-flexClusters-updateFlexCluster/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'flexRestoreJobs',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-api-flexRestoreJobs/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'createFlexRestoreJob',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-flexRestoreJobs-createFlexRestoreJob/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getFlexRestoreJob',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-flexRestoreJobs-getFlexRestoreJob/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listFlexRestoreJobs',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-flexRestoreJobs-listFlexRestoreJobs/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'flexSnapshots',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-api-flexSnapshots/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'downloadFlexBackup',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-flexSnapshots-downloadFlexBackup/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getFlexBackupSnapshot',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-flexSnapshots-getFlexBackupSnapshot/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listFlexBackupSnapshots',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-flexSnapshots-listFlexBackupSnapshots/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'globalClusters',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-api-globalClusters/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'createCustomZoneMapping',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-globalClusters-createCustomZoneMapping/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'createManagedNamespace',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-globalClusters-createManagedNamespace/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'deleteCustomZoneMapping',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-globalClusters-deleteCustomZoneMapping/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'deleteManagedNamespaces',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-globalClusters-deleteManagedNamespaces/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getClusterGlobalWrites',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-globalClusters-getClusterGlobalWrites/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'invoices',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-api-invoices/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'createCostExplorerProcess',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-invoices-createCostExplorerProcess/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getCostExplorerUsage',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-invoices-getCostExplorerUsage/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getInvoice',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-invoices-getInvoice/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getInvoiceCsv',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-invoices-getInvoiceCsv/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getSku',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-invoices-getSku/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.52'],
                        },
                      },
                      {
                        label: 'listInvoicePending',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-invoices-listInvoicePending/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listInvoices',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-invoices-listInvoices/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listSkus',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-invoices-listSkus/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.52'],
                        },
                      },
                      {
                        label: 'searchInvoiceLineItems',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-invoices-searchInvoiceLineItems/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'ldapConfiguration',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-api-ldapConfiguration/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'deleteLdapUserMapping',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-ldapConfiguration-deleteLdapUserMapping/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getUserSecurity',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-ldapConfiguration-getUserSecurity/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getUserSecurityVerify',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-ldapConfiguration-getUserSecurityVerify/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'updateUserSecurity',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-ldapConfiguration-updateUserSecurity/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'verifyUserSecurityLdap',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-ldapConfiguration-verifyUserSecurityLdap/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'legacyBackup',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-api-legacyBackup/',
                    versions: {
                      includes: ['v1.49', 'v1.50'],
                    },
                    items: [
                      {
                        label: 'createClusterRestoreJob',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-legacyBackup-createClusterRestoreJob/',
                        versions: {
                          includes: ['v1.49', 'v1.50'],
                        },
                      },
                      {
                        label: 'deleteClusterSnapshot',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-legacyBackup-deleteClusterSnapshot/',
                        versions: {
                          includes: ['v1.49', 'v1.50'],
                        },
                      },
                      {
                        label: 'getClusterBackupCheckpoint',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-legacyBackup-getClusterBackupCheckpoint/',
                        versions: {
                          includes: ['v1.49', 'v1.50'],
                        },
                      },
                      {
                        label: 'getClusterRestoreJob',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-legacyBackup-getClusterRestoreJob/',
                        versions: {
                          includes: ['v1.49', 'v1.50'],
                        },
                      },
                      {
                        label: 'getClusterSnapshot',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-legacyBackup-getClusterSnapshot/',
                        versions: {
                          includes: ['v1.49', 'v1.50'],
                        },
                      },
                      {
                        label: 'getClusterSnapshotSchedule',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-legacyBackup-getClusterSnapshotSchedule/',
                        versions: {
                          includes: ['v1.49', 'v1.50'],
                        },
                      },
                      {
                        label: 'listClusterBackupCheckpoints',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-legacyBackup-listClusterBackupCheckpoints/',
                        versions: {
                          includes: ['v1.49', 'v1.50'],
                        },
                      },
                      {
                        label: 'listClusterRestoreJobs',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-legacyBackup-listClusterRestoreJobs/',
                        versions: {
                          includes: ['v1.49', 'v1.50'],
                        },
                      },
                      {
                        label: 'listClusterSnapshots',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-legacyBackup-listClusterSnapshots/',
                        versions: {
                          includes: ['v1.49', 'v1.50'],
                        },
                      },
                      {
                        label: 'updateClusterSnapshot',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-legacyBackup-updateClusterSnapshot/',
                        versions: {
                          includes: ['v1.49', 'v1.50'],
                        },
                      },
                      {
                        label: 'updateClusterSnapshotSchedule',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-legacyBackup-updateClusterSnapshotSchedule/',
                        versions: {
                          includes: ['v1.49', 'v1.50'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'maintenanceWindows',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-api-maintenanceWindows/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'deferMaintenanceWindow',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-maintenanceWindows-deferMaintenanceWindow/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getMaintenanceWindow',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-maintenanceWindows-getMaintenanceWindow/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'resetMaintenanceWindow',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-maintenanceWindows-resetMaintenanceWindow/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'toggleMaintenanceAutoDefer',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-maintenanceWindows-toggleMaintenanceAutoDefer/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'updateMaintenanceWindow',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-maintenanceWindows-updateMaintenanceWindow/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'mongoDbCloudUsers',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-api-mongoDbCloudUsers/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'addGroupUserRole',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-mongoDbCloudUsers-addGroupUserRole/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'addGroupUsers',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-mongoDbCloudUsers-addGroupUsers/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'addOrgRole',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-mongoDbCloudUsers-addOrgRole/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'addOrgTeamUser',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-mongoDbCloudUsers-addOrgTeamUser/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'createOrgUser',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-mongoDbCloudUsers-createOrgUser/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'createUser',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-mongoDbCloudUsers-createUser/',
                        versions: {
                          includes: ['v1.49', 'v1.50'],
                        },
                      },
                      {
                        label: 'getGroupUser',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-mongoDbCloudUsers-getGroupUser/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getOrgUser',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-mongoDbCloudUsers-getOrgUser/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getUser',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-mongoDbCloudUsers-getUser/',
                        versions: {
                          includes: ['v1.49', 'v1.50'],
                        },
                      },
                      {
                        label: 'getUserByName',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-mongoDbCloudUsers-getUserByName/',
                        versions: {
                          includes: ['v1.49', 'v1.50'],
                        },
                      },
                      {
                        label: 'listGroupUsers',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-mongoDbCloudUsers-listGroupUsers/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listOrgUsers',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-mongoDbCloudUsers-listOrgUsers/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listTeamUsers',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-mongoDbCloudUsers-listTeamUsers/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'removeGroupUser',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-mongoDbCloudUsers-removeGroupUser/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'removeGroupUserRole',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-mongoDbCloudUsers-removeGroupUserRole/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'removeOrgRole',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-mongoDbCloudUsers-removeOrgRole/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'removeOrgTeamUser',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-mongoDbCloudUsers-removeOrgTeamUser/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'removeOrgUser',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-mongoDbCloudUsers-removeOrgUser/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'updateOrgUser',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-mongoDbCloudUsers-updateOrgUser/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'monitoringAndLogs',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-api-monitoringAndLogs/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'downloadClusterLog',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-monitoringAndLogs-downloadClusterLog/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getDatabase',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-monitoringAndLogs-getDatabase/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getDatabaseMeasurements',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-monitoringAndLogs-getDatabaseMeasurements/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getGroupProcess',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-monitoringAndLogs-getGroupProcess/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getIndexMeasurements',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-monitoringAndLogs-getIndexMeasurements/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getProcessDisk',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-monitoringAndLogs-getProcessDisk/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getProcessDiskMeasurements',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-monitoringAndLogs-getProcessDiskMeasurements/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getProcessMeasurements',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-monitoringAndLogs-getProcessMeasurements/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listDatabases',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-monitoringAndLogs-listDatabases/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listGroupProcesses',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-monitoringAndLogs-listGroupProcesses/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listHostFtsMetrics',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-monitoringAndLogs-listHostFtsMetrics/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listIndexMeasurements',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-monitoringAndLogs-listIndexMeasurements/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listMeasurements',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-monitoringAndLogs-listMeasurements/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listProcessDisks',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-monitoringAndLogs-listProcessDisks/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'networkPeering',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-api-networkPeering/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'createGroupContainer',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-networkPeering-createGroupContainer/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'createGroupPeer',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-networkPeering-createGroupPeer/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'deleteGroupContainer',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-networkPeering-deleteGroupContainer/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'deleteGroupPeer',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-networkPeering-deleteGroupPeer/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'disablePeering',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-networkPeering-disablePeering/',
                        versions: {
                          includes: ['v1.49', 'v1.50'],
                        },
                      },
                      {
                        label: 'getGroupContainer',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-networkPeering-getGroupContainer/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getGroupPeer',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-networkPeering-getGroupPeer/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listGroupContainerAll',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-networkPeering-listGroupContainerAll/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listGroupContainers',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-networkPeering-listGroupContainers/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listGroupPeers',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-networkPeering-listGroupPeers/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'updateGroupContainer',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-networkPeering-updateGroupContainer/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'updateGroupPeer',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-networkPeering-updateGroupPeer/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'verifyPrivateIpMode',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-networkPeering-verifyPrivateIpMode/',
                        versions: {
                          includes: ['v1.49', 'v1.50'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'onlineArchive',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-api-onlineArchive/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'createOnlineArchive',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-onlineArchive-createOnlineArchive/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'deleteOnlineArchive',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-onlineArchive-deleteOnlineArchive/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'downloadQueryLogs',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-onlineArchive-downloadQueryLogs/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getOnlineArchive',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-onlineArchive-getOnlineArchive/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listOnlineArchives',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-onlineArchive-listOnlineArchives/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'updateOnlineArchive',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-onlineArchive-updateOnlineArchive/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'organizations',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-api-organizations/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'createOrg',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-organizations-createOrg/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'createOrgInvite',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-organizations-createOrgInvite/',
                        versions: {
                          includes: ['v1.49', 'v1.50'],
                        },
                      },
                      {
                        label: 'deleteOrg',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-organizations-deleteOrg/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'deleteOrgInvite',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-organizations-deleteOrgInvite/',
                        versions: {
                          includes: ['v1.49', 'v1.50'],
                        },
                      },
                      {
                        label: 'getOrg',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-organizations-getOrg/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getOrgGroups',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-organizations-getOrgGroups/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getOrgInvite',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-organizations-getOrgInvite/',
                        versions: {
                          includes: ['v1.49', 'v1.50'],
                        },
                      },
                      {
                        label: 'getOrgSettings',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-organizations-getOrgSettings/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listOrgInvites',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-organizations-listOrgInvites/',
                        versions: {
                          includes: ['v1.49', 'v1.50'],
                        },
                      },
                      {
                        label: 'listOrgs',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-organizations-listOrgs/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'updateOrg',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-organizations-updateOrg/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'updateOrgInviteById',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-organizations-updateOrgInviteById/',
                        versions: {
                          includes: ['v1.49', 'v1.50'],
                        },
                      },
                      {
                        label: 'updateOrgInvites',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-organizations-updateOrgInvites/',
                        versions: {
                          includes: ['v1.49', 'v1.50'],
                        },
                      },
                      {
                        label: 'updateOrgSettings',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-organizations-updateOrgSettings/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'updateOrgUserRoles',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-organizations-updateOrgUserRoles/',
                        versions: {
                          includes: ['v1.49', 'v1.50'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'performanceAdvisor',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-api-performanceAdvisor/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'disableManagedSlowMs',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-performanceAdvisor-disableManagedSlowMs/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'enableManagedSlowMs',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-performanceAdvisor-enableManagedSlowMs/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getManagedSlowMs',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-performanceAdvisor-getManagedSlowMs/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listClusterSuggestedIndexes',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-performanceAdvisor-listClusterSuggestedIndexes/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listDropIndexSuggestions',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-performanceAdvisor-listDropIndexSuggestions/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listPerformanceAdvisorNamespaces',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-performanceAdvisor-listPerformanceAdvisorNamespaces/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listSchemaAdvice',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-performanceAdvisor-listSchemaAdvice/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listSlowQueryLogs',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-performanceAdvisor-listSlowQueryLogs/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listSuggestedIndexes',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-performanceAdvisor-listSuggestedIndexes/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'privateEndpointServices',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-api-privateEndpointServices/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'createPrivateEndpoint',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-privateEndpointServices-createPrivateEndpoint/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'createPrivateEndpointService',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-privateEndpointServices-createPrivateEndpointService/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'deletePrivateEndpoint',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-privateEndpointServices-deletePrivateEndpoint/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'deletePrivateEndpointService',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-privateEndpointServices-deletePrivateEndpointService/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getPrivateEndpoint',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-privateEndpointServices-getPrivateEndpoint/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getPrivateEndpointService',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-privateEndpointServices-getPrivateEndpointService/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getRegionalEndpointMode',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-privateEndpointServices-getRegionalEndpointMode/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listPrivateEndpointService',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-privateEndpointServices-listPrivateEndpointService/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'toggleRegionalEndpointMode',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-privateEndpointServices-toggleRegionalEndpointMode/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'programmaticApiKeys',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-api-programmaticApiKeys/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'addGroupApiKey',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-programmaticApiKeys-addGroupApiKey/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'createGroupApiKey',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-programmaticApiKeys-createGroupApiKey/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'createOrgAccessEntry',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-programmaticApiKeys-createOrgAccessEntry/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'createOrgApiKey',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-programmaticApiKeys-createOrgApiKey/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'deleteAccessEntry',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-programmaticApiKeys-deleteAccessEntry/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'deleteOrgApiKey',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-programmaticApiKeys-deleteOrgApiKey/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getOrgAccessEntry',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-programmaticApiKeys-getOrgAccessEntry/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getOrgApiKey',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-programmaticApiKeys-getOrgApiKey/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listGroupApiKeys',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-programmaticApiKeys-listGroupApiKeys/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listOrgAccessEntries',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-programmaticApiKeys-listOrgAccessEntries/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listOrgApiKeys',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-programmaticApiKeys-listOrgApiKeys/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'removeGroupApiKey',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-programmaticApiKeys-removeGroupApiKey/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'updateApiKeyRoles',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-programmaticApiKeys-updateApiKeyRoles/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'updateOrgApiKey',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-programmaticApiKeys-updateOrgApiKey/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'projectIpAccessList',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-api-projectIpAccessList/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'createAccessListEntry',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-projectIpAccessList-createAccessListEntry/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'deleteAccessListEntry',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-projectIpAccessList-deleteAccessListEntry/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getAccessListEntry',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-projectIpAccessList-getAccessListEntry/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getAccessListStatus',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-projectIpAccessList-getAccessListStatus/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listAccessListEntries',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-projectIpAccessList-listAccessListEntries/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'projects',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-api-projects/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'addGroupUser',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-projects-addGroupUser/',
                        versions: {
                          includes: ['v1.49', 'v1.50'],
                        },
                      },
                      {
                        label: 'createGroup',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-projects-createGroup/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'createGroupInvite',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-projects-createGroupInvite/',
                        versions: {
                          includes: ['v1.49', 'v1.50'],
                        },
                      },
                      {
                        label: 'deleteGroup',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-projects-deleteGroup/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'deleteGroupInvite',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-projects-deleteGroupInvite/',
                        versions: {
                          includes: ['v1.49', 'v1.50'],
                        },
                      },
                      {
                        label: 'deleteGroupLimit',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-projects-deleteGroupLimit/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getGroup',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-projects-getGroup/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getGroupByName',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-projects-getGroupByName/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getGroupInvite',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-projects-getGroupInvite/',
                        versions: {
                          includes: ['v1.49', 'v1.50'],
                        },
                      },
                      {
                        label: 'getGroupIpAddresses',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-projects-getGroupIpAddresses/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getGroupLimit',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-projects-getGroupLimit/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getGroupSettings',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-projects-getGroupSettings/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getMongoDbVersions',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-projects-getMongoDbVersions/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listGroupInvites',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-projects-listGroupInvites/',
                        versions: {
                          includes: ['v1.49', 'v1.50'],
                        },
                      },
                      {
                        label: 'listGroupLimits',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-projects-listGroupLimits/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listGroups',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-projects-listGroups/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'migrateGroup',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-projects-migrateGroup/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'setGroupLimit',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-projects-setGroupLimit/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'updateGroup',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-projects-updateGroup/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'updateGroupInvites',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-projects-updateGroupInvites/',
                        versions: {
                          includes: ['v1.49', 'v1.50'],
                        },
                      },
                      {
                        label: 'updateGroupSettings',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-projects-updateGroupSettings/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'updateGroupUserRoles',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-projects-updateGroupUserRoles/',
                        versions: {
                          includes: ['v1.49', 'v1.50'],
                        },
                      },
                      {
                        label: 'updateInviteById',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-projects-updateInviteById/',
                        versions: {
                          includes: ['v1.49', 'v1.50'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'pushBasedLogExport',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-api-pushBasedLogExport/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'createGroupLogIntegration',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-pushBasedLogExport-createGroupLogIntegration/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'createLogExport',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-pushBasedLogExport-createLogExport/',
                        versions: {
                          includes: ['v1.49', 'v1.50', 'v1.51'],
                        },
                      },
                      {
                        label: 'deleteGroupLogIntegration',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-pushBasedLogExport-deleteGroupLogIntegration/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'deleteLogExport',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-pushBasedLogExport-deleteLogExport/',
                        versions: {
                          includes: ['v1.49', 'v1.50', 'v1.51'],
                        },
                      },
                      {
                        label: 'getGroupLogIntegration',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-pushBasedLogExport-getGroupLogIntegration/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getLogExport',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-pushBasedLogExport-getLogExport/',
                        versions: {
                          includes: ['v1.49', 'v1.50', 'v1.51'],
                        },
                      },
                      {
                        label: 'listGroupLogIntegrations',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-pushBasedLogExport-listGroupLogIntegrations/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'updateGroupLogIntegration',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-pushBasedLogExport-updateGroupLogIntegration/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'updateLogExport',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-pushBasedLogExport-updateLogExport/',
                        versions: {
                          includes: ['v1.49', 'v1.50', 'v1.51'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'queryShapeInsights',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-api-queryShapeInsights/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'getClusterQueryShape',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-queryShapeInsights-getClusterQueryShape/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getQueryShapeDetails',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-queryShapeInsights-getQueryShapeDetails/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listClusterQueryShapes',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-queryShapeInsights-listClusterQueryShapes/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listQueryShapeSummaries',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-queryShapeInsights-listQueryShapeSummaries/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'updateClusterQueryShape',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-queryShapeInsights-updateClusterQueryShape/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.51', 'v1.52'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'rateLimiting',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-api-rateLimiting/',
                    versions: {
                      includes: ['current', 'upcoming'],
                    },
                    items: [
                      {
                        label: 'getRateLimit',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-rateLimiting-getRateLimit/',
                        versions: {
                          includes: ['current', 'upcoming'],
                        },
                      },
                      {
                        label: 'listRateLimits',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-rateLimiting-listRateLimits/',
                        versions: {
                          includes: ['current', 'upcoming'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'resourcePolicies',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-api-resourcePolicies/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'createOrgResourcePolicy',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-resourcePolicies-createOrgResourcePolicy/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'deleteOrgResourcePolicy',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-resourcePolicies-deleteOrgResourcePolicy/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getNonCompliantResources',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-resourcePolicies-getNonCompliantResources/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getOrgResourcePolicy',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-resourcePolicies-getOrgResourcePolicy/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listOrgResourcePolicies',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-resourcePolicies-listOrgResourcePolicies/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'updateOrgResourcePolicy',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-resourcePolicies-updateOrgResourcePolicy/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'validateResourcePolicies',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-resourcePolicies-validateResourcePolicies/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'rollingIndex',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-api-rollingIndex/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'createRollingIndex',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-rollingIndex-createRollingIndex/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'root',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-api-root/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'getSystemStatus',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-root-getSystemStatus/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listControlPlaneAddresses',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-root-listControlPlaneAddresses/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'serviceAccounts',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-api-serviceAccounts/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'createAccessList',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-serviceAccounts-createAccessList/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'createGroupSecret',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-serviceAccounts-createGroupSecret/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'createGroupServiceAccount',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-serviceAccounts-createGroupServiceAccount/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'createOrgAccessList',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-serviceAccounts-createOrgAccessList/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'createOrgSecret',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-serviceAccounts-createOrgSecret/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'createOrgServiceAccount',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-serviceAccounts-createOrgServiceAccount/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'deleteGroupAccessEntry',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-serviceAccounts-deleteGroupAccessEntry/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'deleteGroupSecret',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-serviceAccounts-deleteGroupSecret/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'deleteGroupServiceAccount',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-serviceAccounts-deleteGroupServiceAccount/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'deleteOrgAccessEntry',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-serviceAccounts-deleteOrgAccessEntry/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'deleteOrgSecret',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-serviceAccounts-deleteOrgSecret/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'deleteOrgServiceAccount',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-serviceAccounts-deleteOrgServiceAccount/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getGroupServiceAccount',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-serviceAccounts-getGroupServiceAccount/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getOrgServiceAccount',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-serviceAccounts-getOrgServiceAccount/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getServiceAccountGroups',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-serviceAccounts-getServiceAccountGroups/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'inviteGroupServiceAccount',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-serviceAccounts-inviteGroupServiceAccount/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listAccessList',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-serviceAccounts-listAccessList/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listGroupServiceAccounts',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-serviceAccounts-listGroupServiceAccounts/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listOrgAccessList',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-serviceAccounts-listOrgAccessList/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listOrgServiceAccounts',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-serviceAccounts-listOrgServiceAccounts/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'updateGroupServiceAccount',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-serviceAccounts-updateGroupServiceAccount/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'updateOrgServiceAccount',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-serviceAccounts-updateOrgServiceAccount/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'sharedTierRestoreJobs',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-api-sharedTierRestoreJobs/',
                    versions: {
                      includes: ['v1.49', 'v1.50'],
                    },
                    items: [
                      {
                        label: 'createBackupTenantRestore',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-sharedTierRestoreJobs-createBackupTenantRestore/',
                        versions: {
                          includes: ['v1.49', 'v1.50'],
                        },
                      },
                      {
                        label: 'getBackupTenantRestore',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-sharedTierRestoreJobs-getBackupTenantRestore/',
                        versions: {
                          includes: ['v1.49', 'v1.50'],
                        },
                      },
                      {
                        label: 'listBackupTenantRestores',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-sharedTierRestoreJobs-listBackupTenantRestores/',
                        versions: {
                          includes: ['v1.49', 'v1.50'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'sharedTierSnapshots',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-api-sharedTierSnapshots/',
                    versions: {
                      includes: ['v1.49', 'v1.50'],
                    },
                    items: [
                      {
                        label: 'downloadClusterBackupTenant',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-sharedTierSnapshots-downloadClusterBackupTenant/',
                        versions: {
                          includes: ['v1.49', 'v1.50'],
                        },
                      },
                      {
                        label: 'getBackupTenantSnapshot',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-sharedTierSnapshots-getBackupTenantSnapshot/',
                        versions: {
                          includes: ['v1.49', 'v1.50'],
                        },
                      },
                      {
                        label: 'listClusterBackupSnapshots',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-sharedTierSnapshots-listClusterBackupSnapshots/',
                        versions: {
                          includes: ['v1.49', 'v1.50'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'streams',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-api-streams/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'acceptVpcPeeringConnection',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-streams-acceptVpcPeeringConnection/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'createPrivateLinkConnection',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-streams-createPrivateLinkConnection/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'createStreamConnection',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-streams-createStreamConnection/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'createStreamProcessor',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-streams-createStreamProcessor/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'createStreamWorkspace',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-streams-createStreamWorkspace/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'deletePrivateLinkConnection',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-streams-deletePrivateLinkConnection/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'deleteStreamConnection',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-streams-deleteStreamConnection/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'deleteStreamProcessor',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-streams-deleteStreamProcessor/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'deleteStreamWorkspace',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-streams-deleteStreamWorkspace/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'deleteVpcPeeringConnection',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-streams-deleteVpcPeeringConnection/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'downloadAuditLogs',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-streams-downloadAuditLogs/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'downloadOperationalLogs',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-streams-downloadOperationalLogs/',
                        versions: {
                          includes: ['current', 'upcoming'],
                        },
                      },
                      {
                        label: 'getAccountDetails',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-streams-getAccountDetails/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getPrivateLinkConnection',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-streams-getPrivateLinkConnection/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getStreamConnection',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-streams-getStreamConnection/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getStreamProcessor',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-streams-getStreamProcessor/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getStreamProcessors',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-streams-getStreamProcessors/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getStreamWorkspace',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-streams-getStreamWorkspace/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listActivePeeringConnections',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-streams-listActivePeeringConnections/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listPrivateLinkConnections',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-streams-listPrivateLinkConnections/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listStreamConnections',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-streams-listStreamConnections/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listStreamWorkspaces',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-streams-listStreamWorkspaces/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listVpcPeeringConnections',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-streams-listVpcPeeringConnections/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'rejectVpcPeeringConnection',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-streams-rejectVpcPeeringConnection/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'startStreamProcessor',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-streams-startStreamProcessor/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'startStreamProcessorWith',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-streams-startStreamProcessorWith/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'stopStreamProcessor',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-streams-stopStreamProcessor/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'updateStreamConnection',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-streams-updateStreamConnection/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'updateStreamProcessor',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-streams-updateStreamProcessor/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'updateStreamWorkspace',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-streams-updateStreamWorkspace/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'withStreamSampleConnections',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-streams-withStreamSampleConnections/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'teams',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-api-teams/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'addGroupTeams',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-teams-addGroupTeams/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'addTeamUsers',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-teams-addTeamUsers/',
                        versions: {
                          includes: ['v1.49', 'v1.50'],
                        },
                      },
                      {
                        label: 'createOrgTeam',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-teams-createOrgTeam/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'deleteOrgTeam',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-teams-deleteOrgTeam/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getGroupTeam',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-teams-getGroupTeam/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getOrgTeam',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-teams-getOrgTeam/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getTeamByName',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-teams-getTeamByName/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listGroupTeams',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-teams-listGroupTeams/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listOrgTeams',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-teams-listOrgTeams/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'removeGroupTeam',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-teams-removeGroupTeam/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'removeUserFromTeam',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-teams-removeUserFromTeam/',
                        versions: {
                          includes: ['v1.49', 'v1.50'],
                        },
                      },
                      {
                        label: 'renameOrgTeam',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-teams-renameOrgTeam/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'updateGroupTeam',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-teams-updateGroupTeam/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'thirdPartyIntegrations',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-api-thirdPartyIntegrations/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'createGroupIntegration',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-thirdPartyIntegrations-createGroupIntegration/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'deleteGroupIntegration',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-thirdPartyIntegrations-deleteGroupIntegration/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'getGroupIntegration',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-thirdPartyIntegrations-getGroupIntegration/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listGroupIntegrations',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-thirdPartyIntegrations-listGroupIntegrations/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'updateGroupIntegration',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-thirdPartyIntegrations-updateGroupIntegration/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'x509Authentication',
                    contentSite: 'atlas-cli',
                    collapsible: true,
                    url: '/docs/atlas/cli/:version/command/atlas-api-x509Authentication/',
                    versions: {
                      includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                    },
                    items: [
                      {
                        label: 'createDatabaseUserCert',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-x509Authentication-createDatabaseUserCert/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'disableSecurityCustomerX509',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-x509Authentication-disableSecurityCustomerX509/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                      {
                        label: 'listDatabaseUserCerts',
                        contentSite: 'atlas-cli',
                        url: '/docs/atlas/cli/:version/command/atlas-api-x509Authentication-listDatabaseUserCerts/',
                        versions: {
                          includes: ['current', 'upcoming', 'v1.49', 'v1.50', 'v1.51', 'v1.52'],
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            label: 'Automate',
            contentSite: 'atlas-cli',
            collapsible: true,
            url: '/docs/atlas/cli/:version/atlas-cli-automate',
            items: [
              {
                label: 'Environment Variables',
                contentSite: 'atlas-cli',
                url: '/docs/atlas/cli/:version/atlas-cli-env-variables',
              },
              {
                label: 'Customize Output',
                contentSite: 'atlas-cli',
                url: '/docs/atlas/cli/:version/custom-output-cli',
              },
            ],
          },
          {
            label: 'Configure Telemetry',
            contentSite: 'atlas-cli',
            url: '/docs/atlas/cli/:version/telemetry',
          },
          {
            label: 'Manage Atlas',
            contentSite: 'atlas-cli',
            collapsible: true,
            url: '/docs/atlas/cli/:version/atlas-cli-tutorials',
            items: [
              {
                label: 'Get Started',
                contentSite: 'atlas-cli',
                url: '/docs/atlas/cli/:version/atlas-cli-getting-started/',
              },
              {
                label: 'Create & Configure Clusters',
                contentSite: 'atlas-cli',
                url: '/docs/atlas/cli/:version/atlas-cli-quickstart',
              },
              {
                label: 'Cluster Configuration File',
                contentSite: 'atlas-cli',
                url: '/docs/atlas/cli/:version/atlas-cli-create-cluster-from-config-file',
              },
              {
                label: 'Configure Independent Shard Scaling',
                contentSite: 'atlas-cli',
                url: '/docs/atlas/cli/:version/atlas-cli-independent-shard-scaling',
              },
              {
                label: 'Local & Cloud Deployments',
                contentSite: 'atlas-cli',
                collapsible: true,
                url: '/docs/atlas/cli/:version/atlas-cli-local-cloud',
                items: [
                  {
                    label: 'Create a Local Deployment',
                    contentSite: 'atlas-cli',
                    url: '/docs/atlas/cli/:version/atlas-cli-deploy-local',
                  },
                  {
                    label: 'Deploy with Docker',
                    contentSite: 'atlas-cli',
                    url: '/docs/atlas/cli/:version/atlas-cli-deploy-docker',
                  },
                  {
                    label: 'Docker Compose Example',
                    contentSite: 'atlas-cli',
                    url: '/docs/atlas/cli/:version/atlas-cli-docker-compose',
                  },
                  {
                    label: 'Deploy from Private Registry',
                    contentSite: 'atlas-cli',
                    url: '/docs/atlas/cli/:version/atlas-cli-deploy-pvt-registry',
                  },
                  {
                    label: 'Use Atlas Search',
                    contentSite: 'atlas-cli',
                    url: '/docs/atlas/cli/:version/atlas-cli-deploy-fts',
                  },
                ],
              },
              {
                label: 'Test Automations',
                contentSite: 'atlas-cli',
                url: '/docs/atlas/cli/:version/atlas-cli-ephemeral-cluster',
              },
              {
                label: 'Run Commands with Docker',
                contentSite: 'atlas-cli',
                url: '/docs/atlas/cli/:version/atlas-cli-docker',
              },
              {
                label: 'Run Commands with the Admin API',
                contentSite: 'atlas-cli',
                url: '/docs/atlas/cli/:version/atlas-cli-admin-api',
              },
              {
                label: 'Extend with Custom Plugins',
                contentSite: 'atlas-cli',
                url: '/docs/atlas/cli/:version/atlas-cli-extend-plugins',
              },
            ],
          },
          {
            label: 'Reference',
            contentSite: 'atlas-cli',
            collapsible: true,
            url: '/docs/atlas/cli/:version/reference',
            items: [
              {
                label: 'JSON Configuration Files',
                contentSite: 'atlas-cli',
                collapsible: true,
                url: '/docs/atlas/cli/:version/reference/json',
                items: [
                  {
                    label: 'Cluster',
                    contentSite: 'atlas-cli',
                    url: '/docs/atlas/cli/:version/reference/json/cluster-config-file',
                  },
                  {
                    label: 'Cloud Backup Schedule',
                    contentSite: 'atlas-cli',
                    url: '/docs/atlas/cli/:version/reference/json/cloud-backup-schedule-config-file',
                  },
                  {
                    label: 'Cloud Backup Compliance Policy',
                    contentSite: 'atlas-cli',
                    url: '/docs/atlas/cli/:version/reference/json/cloud-backup-compliance-policy-config-file',
                  },
                  {
                    label: 'Atlas Data Federation',
                    contentSite: 'atlas-cli',
                    url: '/docs/atlas/cli/:version/reference/json/data-federation-config-file',
                  },
                  {
                    label: 'Atlas Search Index',
                    contentSite: 'atlas-cli',
                    url: '/docs/atlas/cli/:version/reference/json/search-index-config-file',
                  },
                  {
                    label: 'Search Nodes',
                    contentSite: 'atlas-cli',
                    url: '/docs/atlas/cli/:version/reference/json/search-nodes-config-file',
                  },
                  {
                    label: 'Online Archive',
                    contentSite: 'atlas-cli',
                    url: '/docs/atlas/cli/:version/reference/json/file-options-online-archive',
                  },
                  {
                    label: 'Alert',
                    contentSite: 'atlas-cli',
                    url: '/docs/atlas/cli/:version/reference/json/alert-config-file',
                  },
                  {
                    label: 'Rolling Index',
                    contentSite: 'atlas-cli',
                    url: '/docs/atlas/cli/:version/reference/json/rolling-index-config-file',
                  },
                  {
                    label: 'Project',
                    contentSite: 'atlas-cli',
                    url: '/docs/atlas/cli/:version/reference/json/project-config-file',
                  },
                  {
                    label: 'Federated Authentication',
                    contentSite: 'atlas-cli',
                    url: '/docs/atlas/cli/:version/reference/json/connected-org-config-file',
                  },
                ],
              },
            ],
          },
          {
            label: 'Troubleshoot',
            contentSite: 'atlas-cli',
            url: '/docs/atlas/cli/:version/troubleshooting',
          },
          {
            label: 'CLI Changelog',
            contentSite: 'atlas-cli',
            url: '/docs/atlas/cli/:version/atlas-cli-changelog',
          },
          {
            label: 'Atlas Local Changelog',
            contentSite: 'atlas-cli',
            url: '/docs/atlas/cli/:version/atlas-local-changelog',
            versions: {
              includes: ['current', 'upcoming'],
            },
          },
          {
            label: 'Plugin Changelogs',
            contentSite: 'atlas-cli',
            url: '/docs/atlas/cli/:version/plugin-changelogs',
          },
        ],
      },
    ],
  },
];
