import type { TocItem } from '@/components/unified-sidenav/types';

export const toc: TocItem[] = [
  {
    label: 'Legacy Docs',
    contentSite: 'realm',
    url: '/docs/atlas/device-sdks/',
    items: [
      {
        label: 'Atlas Device SDKs',
        contentSite: 'realm',
        group: true,
        items: [
          {
            label: 'Device SDKs Deprecation',
            contentSite: 'realm',
            url: '/docs/atlas/device-sdks/deprecation',
          },
          {
            label: 'C++ SDK',
            contentSite: 'realm',
            url: '/docs/atlas/device-sdks/sdk/cpp',
            collapsible: true,
            items: [
              {
                label: 'Model Data',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/cpp/model-data',
                collapsible: true,
                items: [
                  {
                    label: 'Object Types and Schemas',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/cpp/model-data/object-models',
                  },
                  {
                    label: 'Supported Data Types',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/cpp/model-data/supported-types',
                  },
                  {
                    label: 'Relationships',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/cpp/model-data/relationships',
                  },
                ],
              },
              {
                label: 'Realm Files',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/cpp/realm-files',
                collapsible: true,
                items: [
                  {
                    label: 'Configure & Open a Realm',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/cpp/realm-files/configure-and-open-a-realm',
                  },
                  {
                    label: 'Reduce Realm File Size',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/cpp/realm-files/compact-realm',
                  },
                  {
                    label: 'Encrypt a Realm',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/cpp/realm-files/encrypt-a-realm',
                  },
                ],
              },
              {
                label: 'CRUD',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/cpp/crud',
                collapsible: true,
                items: [
                  {
                    label: 'Create',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/cpp/crud/create',
                  },
                  {
                    label: 'Read',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/cpp/crud/read',
                  },
                  {
                    label: 'Update',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/cpp/crud/update',
                  },
                  {
                    label: 'Delete',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/cpp/crud/delete',
                  },
                  {
                    label: 'Filter Data',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/cpp/crud/filter-data',
                  },
                  {
                    label: 'Threading',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/cpp/crud/threading',
                  },
                ],
              },
              {
                label: 'React to Changes',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/cpp/react-to-changes',
              },
              {
                label: 'Application Services',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/cpp/application-services',
                collapsible: true,
                items: [
                  {
                    label: 'Connect to an App Services App',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/cpp/app-services/connect-to-app',
                  },
                  {
                    label: 'Call a Function',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/cpp/app-services/call-a-function',
                  },
                ],
              },
              {
                label: 'Manage Users',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/cpp/manage-users',
                collapsible: true,
                items: [
                  {
                    label: 'Authenticate Users',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/cpp/users/authenticate-users',
                  },
                  {
                    label: 'Manage Email/Password Users',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/cpp/users/manage-email-password-users',
                  },
                  {
                    label: 'Custom User Data',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/cpp/users/custom-user-data',
                  },
                ],
              },
              {
                label: 'Sync Data',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/cpp/sync',
                collapsible: true,
                items: [
                  {
                    label: 'Manage Sync Subscriptions',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/cpp/sync/sync-subscriptions',
                  },
                  {
                    label: 'Write to a Synced Realm',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/cpp/sync/write-to-synced-realm',
                  },
                  {
                    label: 'Manage Sync Sessions',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/cpp/sync/manage-sync-session',
                  },
                  {
                    label: 'Handle Sync Errors',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/cpp/sync/handle-sync-errors',
                  },
                  {
                    label: 'Set the Sync Client Log Level',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/cpp/sync/log-level',
                  },
                  {
                    label: 'Stream Data to Atlas',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/cpp/sync/stream-data-to-atlas',
                  },
                ],
              },
              {
                label: 'Logging',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/cpp/logging',
              },
              {
                label: 'SDK Telemetry',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/cpp/telemetry',
              },
              {
                label: 'GitHub',
                contentSite: 'realm',
                url: 'https://github.com/realm/realm-cpp',
              },
              {
                label: 'API Reference (Doxygen)',
                contentSite: 'realm',
                url: 'https://www.mongodb.com/docs/realm-sdks/cpp/latest/',
              },
              {
                label: 'Example Projects',
                contentSite: 'realm',
                url: 'https://github.com/realm/realm-cpp/tree/main/examples',
              },
              {
                label: 'Release Notes',
                contentSite: 'realm',
                url: 'https://github.com/realm/realm-cpp/releases',
              },
            ],
          },
          {
            label: 'Flutter SDK',
            contentSite: 'realm',
            url: '/docs/atlas/device-sdks/sdk/flutter',
            collapsible: true,
            items: [
              {
                label: 'Realm Database',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/flutter/realm-database',
                collapsible: true,
                items: [
                  {
                    label: 'Model Data',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/flutter/realm-database/model-data',
                    collapsible: true,
                    items: [
                      {
                        label: 'Define a Realm Object Schema',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/flutter/realm-database/model-data/define-realm-object-schema',
                      },
                      {
                        label: 'Data Types',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/flutter/realm-database/model-data/data-types',
                      },
                      {
                        label: 'Relationships',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/flutter/realm-database/model-data/relationships',
                      },
                      {
                        label: 'Property Annotations',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/flutter/realm-database/model-data/property-annotations',
                      },
                      {
                        label: 'Update a Realm Object Schema',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/flutter/realm-database/model-data/update-realm-object-schema',
                      },
                      {
                        label: 'Geospatial Data',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/flutter/realm-database/model-data/geospatial',
                      },
                    ],
                  },
                  {
                    label: 'Configure & Open a Realm',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/flutter/realm-database/configure-and-open',
                  },
                  {
                    label: 'CRUD',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/flutter/crud',
                    collapsible: true,
                    items: [
                      {
                        label: 'Create',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/flutter/crud/create',
                      },
                      {
                        label: 'Read',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/flutter/crud/read',
                      },
                      {
                        label: 'Update',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/flutter/crud/update',
                      },
                      {
                        label: 'Delete',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/flutter/crud/delete',
                      },
                    ],
                  },
                  {
                    label: 'React to Changes',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/flutter/realm-database/react-to-changes',
                  },
                  {
                    label: 'Freeze Data',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/flutter/realm-database/freeze',
                  },
                  {
                    label: 'Serialization',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/flutter/realm-database/serialization',
                  },
                  {
                    label: 'Manage Realm Files',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/flutter/realm-database/realm-files',
                    collapsible: true,
                    items: [
                      {
                        label: 'Delete a Realm',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/flutter/realm-database/realm-files/delete',
                      },
                      {
                        label: 'Bundle a Realm',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/flutter/realm-database/realm-files/bundle',
                      },
                      {
                        label: 'Reduce Realm File Size',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/flutter/realm-database/realm-files/compact',
                      },
                      {
                        label: 'Encrypt a Realm',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/flutter/realm-database/realm-files/encrypt',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Atlas App Services',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/flutter/app-services',
                collapsible: true,
                items: [
                  {
                    label: 'Connect to App Services',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/flutter/app-services/connect-to-app',
                  },
                  {
                    label: 'Query Atlas GraphQL API',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/flutter/app-services/graphql-api',
                  },
                  {
                    label: 'Call an Atlas Function',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/flutter/app-services/call-function',
                  },
                ],
              },
              {
                label: 'Manage Users',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/flutter/users',
                collapsible: true,
                items: [
                  {
                    label: 'Authenticate Users',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/flutter/users/authenticate',
                  },
                  {
                    label: 'Email/Password Users',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/flutter/users/email-password-users',
                  },
                  {
                    label: 'Work with Multiple Users',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/flutter/users/multiple-users',
                  },
                  {
                    label: 'Link User Identities',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/flutter/users/link-user-identities',
                  },
                  {
                    label: 'Custom User Data',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/flutter/users/custom-user-data',
                  },
                  {
                    label: 'User Metadata',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/flutter/users/user-metadata',
                  },
                  {
                    label: 'Delete a User',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/flutter/users/delete-user',
                  },
                  {
                    label: 'Get an Access Token',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/flutter/users/access-token',
                  },
                ],
              },
              {
                label: 'Sync Device Data',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/flutter/sync',
                collapsible: true,
                items: [
                  {
                    label: 'Add Sync to an App',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/flutter/sync/add-sync-to-app',
                  },
                  {
                    label: 'Open Synced Realm',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/flutter/sync/open-synced-realm',
                  },
                  {
                    label: 'Manage Subscriptions',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/flutter/sync/manage-sync-subscriptions',
                  },
                  {
                    label: 'Write Data to a Synced Realm',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/flutter/sync/write-to-synced-realm',
                  },
                  {
                    label: 'Manage Sync Session',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/flutter/sync/manage-sync-session',
                  },
                  {
                    label: 'Sync Multiple Processes',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/flutter/sync/sync-multiple-processes',
                  },
                  {
                    label: 'Handle Sync Errors',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/flutter/sync/handle-sync-errors',
                  },
                  {
                    label: 'Set Sync Log Level',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/flutter/sync/log-level',
                  },
                  {
                    label: 'Stream Data to Atlas',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/flutter/sync/stream-data-to-atlas',
                  },
                ],
              },
              {
                label: 'Troubleshooting',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/flutter/troubleshooting',
              },
              {
                label: 'Test & Debug',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/flutter/test-and-debug',
              },
              {
                label: 'Logging',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/flutter/logging',
              },
              {
                label: 'SDK Telemetry',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/flutter/telemetry',
              },
              {
                label: 'API Reference',
                contentSite: 'realm',
                url: 'https://pub.dev/documentation/realm/latest/',
              },
              {
                label: 'Upgrade to SDK v2.0.0',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/flutter/upgrade-to-v2',
              },
              {
                label: 'Example Projects',
                contentSite: 'realm',
                url: 'https://github.com/realm/realm-dart-samples',
              },
              {
                label: 'Release Notes',
                contentSite: 'realm',
                url: 'https://github.com/realm/realm-dart/releases',
              },
            ],
          },
          {
            label: 'Java SDK',
            contentSite: 'realm',
            url: '/docs/atlas/device-sdks/sdk/java',
            collapsible: true,
            items: [
              {
                label: 'Realm Files',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/java/realm-files',
                collapsible: true,
                items: [
                  {
                    label: 'Open & Close a Realm',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/java/realm-files/open-and-close-a-realm',
                  },
                  {
                    label: 'Bundle a Realm',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/java/realm-files/bundle-a-realm',
                  },
                  {
                    label: 'Encrypt a Realm',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/java/realm-files/encryption',
                  },
                ],
              },
              {
                label: 'Model Data',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/java/model-data',
                collapsible: true,
                items: [
                  {
                    label: 'Define an Object Model',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/java/model-data/define-a-realm-object-model',
                  },
                  {
                    label: 'Relationships',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/java/model-data/relationships',
                  },
                  {
                    label: 'Change an Object Model',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/java/model-data/modify-an-object-schema',
                  },
                  {
                    label: 'Data Types',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/java/model-data/data-types',
                    collapsible: true,
                    items: [
                      {
                        label: 'Field Types',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/model-data/data-types/field-types',
                      },
                      {
                        label: 'Collections',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/model-data/data-types/collections',
                      },
                      {
                        label: 'Counters',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/model-data/data-types/counters',
                      },
                      {
                        label: 'Dictionaries',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/model-data/data-types/realmdictionary',
                      },
                      {
                        label: 'Sets',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/model-data/data-types/realmset',
                      },
                      {
                        label: 'Mixed',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/model-data/data-types/realmany',
                      },
                      {
                        label: 'Enums',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/model-data/data-types/enums',
                      },
                      {
                        label: 'Embedded Objects',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/model-data/data-types/embedded-objects',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'CRUD',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/java/crud',
                collapsible: true,
                items: [
                  {
                    label: 'Create',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/java/crud/create',
                  },
                  {
                    label: 'Read',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/java/crud/read',
                  },
                  {
                    label: 'Update',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/java/crud/update',
                  },
                  {
                    label: 'Delete',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/java/crud/delete',
                  },
                  {
                    label: 'Filter Data',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/java/crud/filter-data',
                  },
                  {
                    label: 'Threading',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/java/crud/threading',
                  },
                ],
              },
              {
                label: 'React to Changes',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/java/react-to-changes',
              },
              {
                label: 'Adapters',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/java/adapters',
              },
              {
                label: 'Asynchronous APIs',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/java/async-api',
              },
              {
                label: 'Atlas App Services',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/java/app-services',
                collapsible: true,
                items: [
                  {
                    label: 'Connect to an App Services App',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/java/app-services/connect-to-app-services-backend',
                  },
                  {
                    label: 'Call a Function',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/java/app-services/call-a-function',
                  },
                  {
                    label: 'Query MongoDB',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/java/app-services/mongodb-remote-access',
                  },
                ],
              },
              {
                label: 'Manage Users',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/java/manage-users',
                collapsible: true,
                items: [
                  {
                    label: 'Create and Delete Users',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/java/users/create-delete-users',
                  },
                  {
                    label: 'Authenticate Users',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/java/users/authenticate-users',
                  },
                  {
                    label: 'Custom User Data',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/java/users/custom-user-data',
                  },
                  {
                    label: 'Manage Email/Password Users',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/java/users/email-password-users',
                  },
                  {
                    label: 'Multi-User Applications',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/java/users/multi-user-applications',
                  },
                  {
                    label: 'Link User Identities',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/java/users/link-user-identities',
                  },
                  {
                    label: 'Create & Manage User API Keys',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/java/users/manage-user-api-keys',
                  },
                ],
              },
              {
                label: 'Sync Data',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/java/sync',
                collapsible: true,
                items: [
                  {
                    label: 'Configure & Open a Synced Realm',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/java/sync/configure-and-open-a-synced-realm',
                  },
                  {
                    label: 'Manage Flexible Sync Subscriptions',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/java/sync/flexible-sync',
                  },
                  {
                    label: 'Handle Sync Errors',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/java/sync/handle-sync-errors',
                  },
                  {
                    label: 'Client Reset',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/java/sync/reset-a-client-realm',
                  },
                  {
                    label: 'Manual Client Reset Data Recovery',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/java/sync/manual-client-reset-data-recovery',
                  },
                  {
                    label: 'Pause or Resume a Sync Session',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/java/sync/pause-resume-sync',
                  },
                  {
                    label: 'Check Upload & Download Progress',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/java/sync/sync-progress',
                  },
                  {
                    label: 'Check the Network Connection',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/java/sync/network-connection',
                  },
                  {
                    label: 'Background Sync',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/java/sync/background-sync',
                  },
                  {
                    label: 'Partition-Based Sync',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/java/sync/partition-based-sync',
                  },
                ],
              },
              {
                label: 'Test and Debug',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/java/test-and-debug',
                collapsible: true,
                items: [
                  {
                    label: 'Log Realm Events',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/java/test-and-debug/log-realm-events',
                  },
                  {
                    label: 'Debugging',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/java/test-and-debug/debugging',
                  },
                  {
                    label: 'Testing',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/java/test-and-debug/testing',
                  },
                  {
                    label: 'Troubleshooting',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/java/test-and-debug/troubleshooting',
                  },
                ],
              },
              {
                label: 'Troubleshooting',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/java/troubleshooting',
              },
              {
                label: 'SDK Telemetry',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/java/telemetry',
              },
              {
                label: 'API Reference',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/java/api',
                collapsible: true,
                items: [
                  {
                    label: 'io.realm',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/java/api/io/realm',
                    collapsible: true,
                    items: [
                      {
                        label: 'Case',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/Case',
                      },
                      {
                        label: 'CollectionUtils',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/CollectionUtils',
                      },
                      {
                        label: 'CompactOnLaunchCallback',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/CompactOnLaunchCallback',
                      },
                      {
                        label: 'DefaultCompactOnLaunchCallback',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/DefaultCompactOnLaunchCallback',
                      },
                      {
                        label: 'DynamicRealm',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/DynamicRealm',
                      },
                      {
                        label: 'DynamicRealm.Callback',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/DynamicRealm/Callback',
                      },
                      {
                        label: 'DynamicRealm.Transaction',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/DynamicRealm/Transaction',
                      },
                      {
                        label: 'DynamicRealm.Transaction.Callback',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/DynamicRealm/Transaction/Callback',
                      },
                      {
                        label: 'DynamicRealm.Transaction.OnError',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/DynamicRealm/Transaction/OnError',
                      },
                      {
                        label: 'DynamicRealm.Transaction.OnSuccess',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/DynamicRealm/Transaction/OnSuccess',
                      },
                      {
                        label: 'DynamicRealmObject',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/DynamicRealmObject',
                      },
                      {
                        label: 'FieldAttribute',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/FieldAttribute',
                      },
                      {
                        label: 'FrozenPendingRow',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/FrozenPendingRow',
                      },
                      {
                        label: 'ImportFlag',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/ImportFlag',
                      },
                      {
                        label: 'MapChangeListener',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/MapChangeListener',
                      },
                      {
                        label: 'MapChangeSet',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/MapChangeSet',
                      },
                      {
                        label: 'MutableRealmInteger',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/MutableRealmInteger',
                      },
                      {
                        label: 'ObjectChangeSet',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/ObjectChangeSet',
                      },
                      {
                        label: 'OrderedCollectionChangeSet',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/OrderedCollectionChangeSet',
                      },
                      {
                        label: 'OrderedCollectionChangeSet.Range',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/OrderedCollectionChangeSet/Range',
                      },
                      {
                        label: 'OrderedCollectionChangeSet.State',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/OrderedCollectionChangeSet/State',
                      },
                      {
                        label: 'OrderedRealmCollection',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/OrderedRealmCollection',
                      },
                      {
                        label: 'OrderedRealmCollectionChangeListener',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/OrderedRealmCollectionChangeListener',
                      },
                      {
                        label: 'OrderedRealmCollectionSnapshot',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/OrderedRealmCollectionSnapshot',
                      },
                      {
                        label: 'ProxyState',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/ProxyState',
                      },
                      {
                        label: 'Realm',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/Realm',
                      },
                      {
                        label: 'Realm.Callback',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/Realm/Callback',
                      },
                      {
                        label: 'Realm.Transaction',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/Realm/Transaction',
                      },
                      {
                        label: 'Realm.Transaction.Callback',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/Realm/Transaction/Callback',
                      },
                      {
                        label: 'Realm.Transaction.OnError',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/Realm/Transaction/OnError',
                      },
                      {
                        label: 'Realm.Transaction.OnSuccess',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/Realm/Transaction/OnSuccess',
                      },
                      {
                        label: 'RealmAny',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/RealmAny',
                      },
                      {
                        label: 'RealmAny.Type',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/RealmAny/Type',
                      },
                      {
                        label: 'RealmAnyNativeFunctionsImpl',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/RealmAnyNativeFunctionsImpl',
                      },
                      {
                        label: 'RealmAnyOperator',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/RealmAnyOperator',
                      },
                      {
                        label: 'RealmAsyncTask',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/RealmAsyncTask',
                      },
                      {
                        label: 'RealmChangeListener',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/RealmChangeListener',
                      },
                      {
                        label: 'RealmCollection',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/RealmCollection',
                      },
                      {
                        label: 'RealmConfiguration',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/RealmConfiguration',
                      },
                      {
                        label: 'RealmConfiguration.Builder',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/RealmConfiguration/Builder',
                      },
                      {
                        label: 'RealmDictionary',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/RealmDictionary',
                      },
                      {
                        label: 'RealmFieldType',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/RealmFieldType',
                      },
                      {
                        label: 'RealmList',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/RealmList',
                      },
                      {
                        label: 'RealmMap',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/RealmMap',
                      },
                      {
                        label: 'RealmMigration',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/RealmMigration',
                      },
                      {
                        label: 'RealmModel',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/RealmModel',
                      },
                      {
                        label: 'RealmObject',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/RealmObject',
                      },
                      {
                        label: 'RealmObjectChangeListener',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/RealmObjectChangeListener',
                      },
                      {
                        label: 'RealmObjectSchema',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/RealmObjectSchema',
                      },
                      {
                        label: 'RealmObjectSchema.Function',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/RealmObjectSchema/Function',
                      },
                      {
                        label: 'RealmQuery',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/RealmQuery',
                      },
                      {
                        label: 'RealmResults',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/RealmResults',
                      },
                      {
                        label: 'RealmSchema',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/RealmSchema',
                      },
                      {
                        label: 'RealmSet',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/RealmSet',
                      },
                      {
                        label: 'SetChangeListener',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/SetChangeListener',
                      },
                      {
                        label: 'SetChangeSet',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/SetChangeSet',
                      },
                      {
                        label: 'Sort',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/Sort',
                      },
                    ],
                  },
                  {
                    label: 'io.realm.annotations',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/annotations',
                    collapsible: true,
                    items: [
                      {
                        label: 'Beta',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/annotations/Beta',
                      },
                      {
                        label: 'Ignore',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/annotations/Ignore',
                      },
                      {
                        label: 'Index',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/annotations/Index',
                      },
                      {
                        label: 'LinkingObjects',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/annotations/LinkingObjects',
                      },
                      {
                        label: 'PrimaryKey',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/annotations/PrimaryKey',
                      },
                      {
                        label: 'RealmClass',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/annotations/RealmClass',
                      },
                      {
                        label: 'RealmField',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/annotations/RealmField',
                      },
                      {
                        label: 'RealmModule',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/annotations/RealmModule',
                      },
                      {
                        label: 'RealmNamingPolicy',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/annotations/RealmNamingPolicy',
                      },
                      {
                        label: 'Required',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/annotations/Required',
                      },
                    ],
                  },
                  {
                    label: 'io.realm.coroutines',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/coroutines',
                    collapsible: true,
                    items: [
                      {
                        label: 'FlowFactory',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/coroutines/FlowFactory',
                      },
                      {
                        label: 'RealmFlowFactory',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/coroutines/RealmFlowFactory',
                      },
                    ],
                  },
                  {
                    label: 'io.realm.exceptions',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/exceptions',
                    collapsible: true,
                    items: [
                      {
                        label: 'RealmFileException.Kind',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/exceptions/RealmFileException/Kind',
                      },
                      {
                        label: 'DownloadingRealmInterruptedException',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/exceptions/DownloadingRealmInterruptedException',
                      },
                      {
                        label: 'RealmException',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/exceptions/RealmException',
                      },
                      {
                        label: 'RealmFileException',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/exceptions/RealmFileException',
                      },
                      {
                        label: 'RealmMigrationNeededException',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/exceptions/RealmMigrationNeededException',
                      },
                      {
                        label: 'RealmPrimaryKeyConstraintException',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/exceptions/RealmPrimaryKeyConstraintException',
                      },
                      {
                        label: 'RealmError',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/exceptions/RealmError',
                      },
                    ],
                  },
                  {
                    label: 'io.realm.log',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/log',
                    collapsible: true,
                    items: [
                      {
                        label: 'LogLevel',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/log/LogLevel',
                      },
                      {
                        label: 'RealmLog',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/log/RealmLog',
                      },
                      {
                        label: 'RealmLogger',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/log/RealmLogger',
                      },
                    ],
                  },
                  {
                    label: 'io.realm.mongodb',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb',
                    collapsible: true,
                    items: [
                      {
                        label: 'App',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/App',
                      },
                      {
                        label: 'App.Callback',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/App/Callback',
                      },
                      {
                        label: 'App.Result',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/App/Result',
                      },
                      {
                        label: 'AppConfiguration',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/AppConfiguration',
                      },
                      {
                        label: 'AppConfiguration.Builder',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/AppConfiguration/Builder',
                      },
                      {
                        label: 'AuthenticationListener',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/AuthenticationListener',
                      },
                      {
                        label: 'Credentials',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/Credentials',
                      },
                      {
                        label: 'Credentials.Provider',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/Credentials/Provider',
                      },
                      {
                        label: 'ErrorCode',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/ErrorCode',
                      },
                      {
                        label: 'ErrorCode.Category',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/ErrorCode/Category',
                      },
                      {
                        label: 'ErrorCode.Type',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/ErrorCode/Type',
                      },
                      {
                        label: 'RealmEventStreamAsyncTask',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/RealmEventStreamAsyncTask',
                      },
                      {
                        label: 'RealmEventStreamTask',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/RealmEventStreamTask',
                      },
                      {
                        label: 'RealmResultTask',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/RealmResultTask',
                      },
                      {
                        label: 'User',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/User',
                      },
                      {
                        label: 'User.State',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/User/State',
                      },
                      {
                        label: 'UserIdentity',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/UserIdentity',
                      },
                      {
                        label: 'UserProfile',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/UserProfile',
                      },
                      {
                        label: 'AppException',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/AppException',
                      },
                    ],
                  },
                  {
                    label: 'io.realm.mongodb.auth',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/auth',
                    collapsible: true,
                    items: [
                      {
                        label: 'ApiKey',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/auth/ApiKey',
                      },
                      {
                        label: 'ApiKeyAuth',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/auth/ApiKeyAuth',
                      },
                      {
                        label: 'EmailPasswordAuth',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/auth/EmailPasswordAuth',
                      },
                      {
                        label: 'GoogleAuthType',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/auth/GoogleAuthType',
                      },
                    ],
                  },
                  {
                    label: 'io.realm.mongodb.functions',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/functions',
                    collapsible: true,
                    items: [
                      {
                        label: 'Functions',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/functions/Functions',
                      },
                    ],
                  },
                  {
                    label: 'io.realm.mongodb.log.obfuscator',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/log/obfuscator',
                    collapsible: true,
                    items: [
                      {
                        label: 'HttpLogObfuscator',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/log/obfuscator/HttpLogObfuscator',
                      },
                    ],
                  },
                  {
                    label: 'io.realm.mongodb.mongo',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/mongo',
                    collapsible: true,
                    items: [
                      {
                        label: 'MongoClient',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/mongo/MongoClient',
                      },
                      {
                        label: 'MongoCollection',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/mongo/MongoCollection',
                      },
                      {
                        label: 'MongoDatabase',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/mongo/MongoDatabase',
                      },
                      {
                        label: 'MongoNamespace',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/mongo/MongoNamespace',
                      },
                    ],
                  },
                  {
                    label: 'io.realm.mongodb.mongo.events',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/mongo/events',
                    collapsible: true,
                    items: [
                      {
                        label: 'BaseChangeEvent',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/mongo/events/BaseChangeEvent',
                      },
                      {
                        label: 'BaseChangeEvent.OperationType',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/mongo/events/BaseChangeEvent/OperationType',
                      },
                      {
                        label: 'UpdateDescription',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/mongo/events/UpdateDescription',
                      },
                    ],
                  },
                  {
                    label: 'io.realm.mongodb.mongo.iterable',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/mongo/iterable',
                    collapsible: true,
                    items: [
                      {
                        label: 'AggregateIterable',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/mongo/iterable/AggregateIterable',
                      },
                      {
                        label: 'FindIterable',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/mongo/iterable/FindIterable',
                      },
                      {
                        label: 'MongoCursor',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/mongo/iterable/MongoCursor',
                      },
                      {
                        label: 'MongoIterable',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/mongo/iterable/MongoIterable',
                      },
                    ],
                  },
                  {
                    label: 'io.realm.mongodb.mongo.options',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/mongo/options',
                    collapsible: true,
                    items: [
                      {
                        label: 'CountOptions',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/mongo/options/CountOptions',
                      },
                      {
                        label: 'FindOneAndModifyOptions',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/mongo/options/FindOneAndModifyOptions',
                      },
                      {
                        label: 'FindOptions',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/mongo/options/FindOptions',
                      },
                      {
                        label: 'InsertManyResult',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/mongo/options/InsertManyResult',
                      },
                      {
                        label: 'UpdateOptions',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/mongo/options/UpdateOptions',
                      },
                    ],
                  },
                  {
                    label: 'io.realm.mongodb.mongo.result',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/mongo/result',
                    collapsible: true,
                    items: [
                      {
                        label: 'DeleteResult',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/mongo/result/DeleteResult',
                      },
                      {
                        label: 'InsertOneResult',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/mongo/result/InsertOneResult',
                      },
                      {
                        label: 'UpdateResult',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/mongo/result/UpdateResult',
                      },
                    ],
                  },
                  {
                    label: 'io.realm.mongodb.push',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/push',
                    collapsible: true,
                    items: [
                      {
                        label: 'Push',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/push/Push',
                      },
                    ],
                  },
                  {
                    label: 'io.realm.mongodb.sync',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/sync',
                    collapsible: true,
                    items: [
                      {
                        label: 'ConnectionListener',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/sync/ConnectionListener',
                      },
                      {
                        label: 'ConnectionState',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/sync/ConnectionState',
                      },
                      {
                        label: 'DiscardUnsyncedChangesStrategy',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/sync/DiscardUnsyncedChangesStrategy',
                      },
                      {
                        label: 'ManuallyRecoverUnsyncedChangesStrategy',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/sync/ManuallyRecoverUnsyncedChangesStrategy',
                      },
                      {
                        label: 'MutableSubscriptionSet',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/sync/MutableSubscriptionSet',
                      },
                      {
                        label: 'Progress',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/sync/Progress',
                      },
                      {
                        label: 'ProgressListener',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/sync/ProgressListener',
                      },
                      {
                        label: 'ProgressMode',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/sync/ProgressMode',
                      },
                      {
                        label: 'Subscription',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/sync/Subscription',
                      },
                      {
                        label: 'SubscriptionSet',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/sync/SubscriptionSet',
                      },
                      {
                        label: 'SubscriptionSet.State',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/sync/SubscriptionSet/State',
                      },
                      {
                        label: 'SubscriptionSet.StateChangeCallback',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/sync/SubscriptionSet/StateChangeCallback',
                      },
                      {
                        label: 'SubscriptionSet.UpdateAsyncCallback',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/sync/SubscriptionSet/UpdateAsyncCallback',
                      },
                      {
                        label: 'SubscriptionSet.UpdateCallback',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/sync/SubscriptionSet/UpdateCallback',
                      },
                      {
                        label: 'Sync',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/sync/Sync',
                      },
                      {
                        label: 'Sync.Debug',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/sync/Sync/Debug',
                      },
                      {
                        label: 'SyncClientResetStrategy',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/sync/SyncClientResetStrategy',
                      },
                      {
                        label: 'SyncConfiguration',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/sync/SyncConfiguration',
                      },
                      {
                        label: 'SyncConfiguration.Builder',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/sync/SyncConfiguration/Builder',
                      },
                      {
                        label: 'SyncConfiguration.InitialFlexibleSyncSubscriptions',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/sync/SyncConfiguration/InitialFlexibleSyncSubscriptions',
                      },
                      {
                        label: 'SyncSession',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/sync/SyncSession',
                      },
                      {
                        label: 'SyncSession.ClientResetHandler',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/sync/SyncSession/ClientResetHandler',
                      },
                      {
                        label: 'SyncSession.ErrorHandler',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/sync/SyncSession/ErrorHandler',
                      },
                      {
                        label: 'SyncSession.State',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/sync/SyncSession/State',
                      },
                      {
                        label: 'ClientResetRequiredError',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/mongodb/sync/ClientResetRequiredError',
                      },
                    ],
                  },
                  {
                    label: 'io.realm.rx',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/rx',
                    collapsible: true,
                    items: [
                      {
                        label: 'CollectionChange',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/rx/CollectionChange',
                      },
                      {
                        label: 'ObjectChange',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/rx/ObjectChange',
                      },
                      {
                        label: 'RealmObservableFactory',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/rx/RealmObservableFactory',
                      },
                      {
                        label: 'RxObservableFactory',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/java/api/io/realm/rx/RxObservableFactory',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Kotlin Extensions API Reference',
                contentSite: 'realm',
                url: 'https://www.mongodb.com/docs/realm-sdks/java/latest/kotlin-extensions/',
              },
              {
                label: 'Release Notes',
                contentSite: 'realm',
                url: 'https://github.com/realm/realm-java/blob/releases/CHANGELOG.md',
              },
            ],
          },
          {
            label: 'Kotlin SDK',
            contentSite: 'realm',
            url: '/docs/atlas/device-sdks/sdk/kotlin',
            collapsible: true,
            items: [
              {
                label: 'Realm',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/kotlin/realm-database',
                collapsible: true,
                items: [
                  {
                    label: 'Frozen Architecture',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/kotlin/realm-database/frozen-arch',
                  },
                  {
                    label: 'Model Data',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/kotlin/realm-database/schemas',
                    collapsible: true,
                    items: [
                      {
                        label: 'Define an Object Model',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/kotlin/realm-database/schemas/define-realm-object-model',
                      },
                      {
                        label: 'Supported Data Types',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/kotlin/realm-database/schemas/supported-types',
                      },
                      {
                        label: 'Property Annotations',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/kotlin/realm-database/schemas/property-annotations',
                      },
                      {
                        label: 'Relationships',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/kotlin/realm-database/schemas/relationships',
                      },
                      {
                        label: 'Geospatial Data',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/kotlin/realm-database/schemas/geospatials',
                      },
                      {
                        label: 'Change an Object Model',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/kotlin/realm-database/schemas/change-an-object-model',
                      },
                      {
                        label: 'Model Data with Device Sync',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/kotlin/realm-database/schemas/model-data-device-sync',
                      },
                    ],
                  },
                  {
                    label: 'Configure & Open a Realm',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/kotlin/realm-database/open-and-close-a-realm',
                  },
                  {
                    label: 'Read & Write Data',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/kotlin/realm-database/crud',
                    collapsible: true,
                    items: [
                      {
                        label: 'Create',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/kotlin/realm-database/crud/create',
                      },
                      {
                        label: 'Read',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/kotlin/realm-database/crud/read',
                      },
                      {
                        label: 'Update',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/kotlin/realm-database/crud/update',
                      },
                      {
                        label: 'Delete',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/kotlin/realm-database/crud/delete',
                      },
                    ],
                  },
                  {
                    label: 'Manage Realm Files',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/kotlin/realm-database/realm-files',
                    collapsible: true,
                    items: [
                      {
                        label: 'Reduce Realm File Size',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/kotlin/realm-database/realm-files/compact-realm',
                      },
                      {
                        label: 'Delete a Realm',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/kotlin/realm-database/realm-files/delete-a-realm',
                      },
                      {
                        label: 'Encrypt a Realm',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/kotlin/realm-database/realm-files/encrypt-a-realm',
                      },
                      {
                        label: 'Bundle a Realm',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/kotlin/realm-database/realm-files/bundle-a-realm',
                      },
                    ],
                  },
                  {
                    label: 'React to Changes',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/kotlin/realm-database/react-to-changes',
                  },
                  {
                    label: 'Serialization',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/kotlin/realm-database/serialization',
                  },
                  {
                    label: 'Handle Realm Errors',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/kotlin/realm-database/errors',
                  },
                ],
              },
              {
                label: 'Connect to Atlas',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/kotlin/app-services',
                collapsible: true,
                items: [
                  {
                    label: 'Connect to App Services',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/kotlin/app-services/connect-to-app-services-backend',
                  },
                  {
                    label: 'Call an Atlas Function',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/kotlin/app-services/call-function',
                  },
                  {
                    label: 'Handle App Errors',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/kotlin/app-services/handle-app-errors',
                  },
                ],
              },
              {
                label: 'Manage Users',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/kotlin/users',
                collapsible: true,
                items: [
                  {
                    label: 'Create & Authenticate Users',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/kotlin/users/authenticate-users',
                  },
                  {
                    label: 'Manage Email/Password Users',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/kotlin/users/manage-email-password-users',
                  },
                  {
                    label: 'Link User Identities',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/kotlin/users/link-credentials',
                  },
                  {
                    label: 'Create & Manage User API Keys',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/kotlin/users/manage-user-api-keys',
                  },
                  {
                    label: 'Manage Multi-User Apps',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/kotlin/users/multi-user-applications',
                  },
                  {
                    label: 'Delete Users',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/kotlin/users/delete-users',
                  },
                  {
                    label: 'Manage Custom User Data',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/kotlin/users/custom-user-data',
                  },
                  {
                    label: 'Manage User Metadata',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/kotlin/users/user-metadata',
                  },
                ],
              },
              {
                label: 'Sync Device Data',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/kotlin/sync',
                collapsible: true,
                items: [
                  {
                    label: 'Add Sync to an App',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/kotlin/sync/add-sync-to-app',
                  },
                  {
                    label: 'Configure & Open a Synced Realm',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/kotlin/sync/open-a-synced-realm',
                  },
                  {
                    label: 'Manage Subscriptions',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/kotlin/sync/subscribe',
                  },
                  {
                    label: 'Write to a Synced Realm',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/kotlin/sync/write-to-synced-realm',
                  },
                  {
                    label: 'Manage Sync Session',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/kotlin/sync/manage-sync-session',
                  },
                  {
                    label: 'Handle Sync Errors',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/kotlin/sync/handle-sync-errors',
                  },
                  {
                    label: 'Set the Client Log Level',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/kotlin/sync/log-level',
                  },
                  {
                    label: 'Stream Data to Atlas',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/kotlin/sync/stream-data-to-atlas',
                  },
                  {
                    label: 'Sync Data in the Background',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/kotlin/sync/background-sync',
                  },
                  {
                    label: 'Partition-Based Sync',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/kotlin/sync/partition-based-sync',
                  },
                ],
              },
              {
                label: 'Logging',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/kotlin/logging',
              },
              {
                label: 'Troubleshooting',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/kotlin/troubleshooting',
              },
              {
                label: 'SDK Telemetry',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/kotlin/telemetry',
              },
              {
                label: 'API Reference',
                contentSite: 'realm',
                url: 'https://www.mongodb.com/docs/realm-sdks/kotlin/latest/',
              },
              {
                label: 'Release Notes',
                contentSite: 'realm',
                url: 'https://github.com/realm/realm-kotlin/blob/releases/CHANGELOG.md',
              },
              {
                label: 'Migrate from Java SDK to Kotlin SDK',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/kotlin/migrate-from-java-sdk-to-kotlin-sdk',
              },
            ],
          },
          {
            label: '.NET SDK',
            contentSite: 'realm',
            url: '/docs/atlas/device-sdks/sdk/dotnet',
            collapsible: true,
            items: [
              {
                label: 'Quick Start for Unity',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/dotnet/unity',
              },
              {
                label: 'Realm Files',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/dotnet/realm-files',
                collapsible: true,
                items: [
                  {
                    label: 'Configure & Open a Realm',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/dotnet/realm-files/realms',
                  },
                  {
                    label: 'Delete a Realm',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/dotnet/realm-files/delete-a-realm',
                  },
                  {
                    label: 'Bundle a Realm',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/dotnet/realm-files/bundle-a-realm',
                  },
                  {
                    label: 'Reduce Realm File Size',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/dotnet/realm-files/compact-realm',
                  },
                  {
                    label: 'Encrypt a Realm',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/dotnet/realm-files/encrypt-a-realm',
                  },
                ],
              },
              {
                label: 'Model Data',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/dotnet/model-data',
                collapsible: true,
                items: [
                  {
                    label: 'Define an Object Model',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/dotnet/model-data/define-object-model',
                  },
                  {
                    label: 'Object Types and Schemas',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/dotnet/model-data/object-models-and-schemas',
                  },
                  {
                    label: 'Supported Data Types',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/dotnet/model-data/data-types',
                    collapsible: true,
                    items: [
                      {
                        label: 'Field Types',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/dotnet/model-data/data-types/field-types',
                      },
                      {
                        label: 'Results Collections',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/dotnet/model-data/data-types/collections',
                      },
                      {
                        label: 'Lists',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/dotnet/model-data/data-types/lists',
                      },
                      {
                        label: 'Dictionaries',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/dotnet/model-data/data-types/dictionaries',
                      },
                      {
                        label: 'Sets',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/dotnet/model-data/data-types/sets',
                      },
                      {
                        label: 'RealmValue',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/dotnet/model-data/data-types/realm-value',
                      },
                      {
                        label: 'RealmInteger',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/dotnet/model-data/data-types/realm-integer',
                      },
                      {
                        label: 'Geospatial Data',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/dotnet/model-data/data-types/geospatials',
                      },
                      {
                        label: 'Embedded Objects',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/dotnet/model-data/data-types/embedded-objects',
                      },
                    ],
                  },
                  {
                    label: 'Manually Define a Schema',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/dotnet/model-data/manual-schema',
                  },
                  {
                    label: 'Relationships',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/dotnet/model-data/relationships',
                  },
                  {
                    label: 'Change an Object Model',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/dotnet/model-data/change-an-object-model',
                  },
                  {
                    label: 'Data Binding',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/dotnet/model-data/data-binding',
                  },
                ],
              },
              {
                label: 'CRUD',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/dotnet/crud',
                collapsible: true,
                items: [
                  {
                    label: 'Create',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/dotnet/crud/create',
                  },
                  {
                    label: 'Read',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/dotnet/crud/read',
                  },
                  {
                    label: 'Filter and Sort',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/dotnet/crud/filter',
                  },
                  {
                    label: 'Update',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/dotnet/crud/update',
                  },
                  {
                    label: 'Delete',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/dotnet/crud/delete',
                  },
                  {
                    label: 'Threading',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/dotnet/crud/threading',
                  },
                  {
                    label: 'Transactions',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/dotnet/crud/write-transactions',
                  },
                ],
              },
              {
                label: 'React to Changes',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/dotnet/react-to-changes',
              },
              {
                label: 'Application Services',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/dotnet/application-services',
                collapsible: true,
                items: [
                  {
                    label: 'Connect to an App Services App',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/dotnet/app-services/connect-to-app-services-backend',
                  },
                  {
                    label: 'Call a Function',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/dotnet/app-services/call-a-function',
                  },
                  {
                    label: 'Query MongoDB',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/dotnet/app-services/mongodb-remote-access',
                  },
                  {
                    label: 'Create & Manage User API Keys',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/dotnet/app-services/manage-user-api-keys',
                  },
                ],
              },
              {
                label: 'Manage Users',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/dotnet/work-with-users',
                collapsible: true,
                items: [
                  {
                    label: 'Create and Delete Users',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/dotnet/manage-users/create-and-delete-users',
                  },
                  {
                    label: 'Authenticate Users',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/dotnet/manage-users/authenticate',
                  },
                  {
                    label: 'Custom User Data',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/dotnet/manage-users/custom-user-data',
                  },
                  {
                    label: 'User Metadata',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/dotnet/manage-users/user-metadata',
                  },
                  {
                    label: 'Manage Email/Password Users',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/dotnet/manage-users/manage-email-password-users',
                  },
                  {
                    label: 'Multi-User Applications',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/dotnet/manage-users/multi-user-applications',
                  },
                  {
                    label: 'Link User Identities',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/dotnet/manage-users/link-user-identities',
                  },
                ],
              },
              {
                label: 'Sync Data',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/dotnet/sync',
                collapsible: true,
                items: [
                  {
                    label: 'Add Sync to an App',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/dotnet/sync/add-sync-to-app',
                  },
                  {
                    label: 'Configure & Open a Synced Realm',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/dotnet/sync/configure-and-open-a-synced-realm',
                  },
                  {
                    label: 'Write to a Synced Realm',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/dotnet/sync/write-to-synced-realm',
                  },
                  {
                    label: 'Manage Flexible Sync Subscriptions',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/dotnet/sync/flexible-sync',
                  },
                  {
                    label: 'Handle Sync Errors and Timeouts',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/dotnet/sync/handle-sync-errors',
                  },
                  {
                    label: 'Client Resets',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/dotnet/sync/client-reset',
                  },
                  {
                    label: 'Suspend or Resume a Sync Session',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/dotnet/sync/sync-session',
                  },
                  {
                    label: 'Check Upload & Download Progress',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/dotnet/sync/sync-progress',
                  },
                  {
                    label: 'Stream Data to Atlas',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/dotnet/sync/asymmetric-sync',
                  },
                  {
                    label: 'Partition-Based Sync',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/dotnet/sync/partition-based-sync',
                  },
                ],
              },
              {
                label: 'Use the SDK in a Console App',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/dotnet/async-console',
              },
              {
                label: 'Logging',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/dotnet/logging',
              },
              {
                label: 'Compatibility',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/dotnet/compatibility',
              },
              {
                label: 'Troubleshooting',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/dotnet/troubleshooting',
              },
              {
                label: 'SDK Telemetry',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/dotnet/telemetry',
              },
              {
                label: 'API Reference',
                contentSite: 'realm',
                url: 'https://www.mongodb.com/docs/realm-sdks/dotnet/latest',
              },
              {
                label: 'Release Notes',
                contentSite: 'realm',
                url: 'https://github.com/realm/realm-dotnet/releases',
              },
            ],
          },
          {
            label: 'Node.js SDK',
            contentSite: 'realm',
            url: '/docs/atlas/device-sdks/sdk/node',
            collapsible: true,
            items: [
              {
                label: 'Realm Files',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/node/realm-files',
                collapsible: true,
                items: [
                  {
                    label: 'Open & Close a Realm',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/node/realm-files/open-and-close-a-realm',
                  },
                  {
                    label: 'Reduce Realm File Size',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/node/realm-files/compact-realm',
                  },
                  {
                    label: 'Bundle a Realm',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/node/realm-files/bundle',
                  },
                  {
                    label: 'Encrypt a Realm',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/node/realm-files/encrypt',
                  },
                ],
              },
              {
                label: 'Model Data',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/node/model-data',
                collapsible: true,
                items: [
                  {
                    label: 'Define an Object Model',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/node/model-data/define-a-realm-object-model',
                  },
                  {
                    label: 'Relationships & Embedded Objects',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/node/model-data/relationships-and-embedded-objects',
                  },
                  {
                    label: 'Change an Object Model',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/node/model-data/modify-an-object-schema',
                  },
                  {
                    label: 'Data Types',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/node/model-data/data-types',
                    collapsible: true,
                    items: [
                      {
                        label: 'Field Types',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/node/model-data/data-types/field-types',
                      },
                      {
                        label: 'Collections',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/node/model-data/data-types/collections',
                      },
                      {
                        label: 'Counters',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/node/model-data/data-types/counters',
                      },
                      {
                        label: 'Dictionaries',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/node/model-data/data-types/dictionaries',
                      },
                      {
                        label: 'Sets',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/node/model-data/data-types/sets',
                      },
                      {
                        label: 'Mixed',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/node/model-data/data-types/mixed',
                      },
                      {
                        label: 'UUID',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/node/model-data/data-types/uuid',
                      },
                      {
                        label: 'Embedded Objects',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/node/model-data/data-types/embedded-objects',
                      },
                      {
                        label: 'Geospatial Data',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/node/model-data/data-types/geospatial',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'CRUD',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/node/crud',
                collapsible: true,
                items: [
                  {
                    label: 'Create',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/node/crud/create',
                  },
                  {
                    label: 'Read',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/node/crud/read',
                  },
                  {
                    label: 'Update',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/node/crud/update',
                  },
                  {
                    label: 'Delete',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/node/crud/delete',
                  },
                  {
                    label: 'Query Data',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/node/crud/query-data',
                  },
                ],
              },
              {
                label: 'React to Changes',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/node/react-to-changes',
              },
              {
                label: 'Atlas App Services',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/node/app-services',
                collapsible: true,
                items: [
                  {
                    label: 'Connect to an App Services App',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/node/app-services/connect-to-app-services-backend',
                  },
                  {
                    label: 'Call a Function',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/node/app-services/call-a-function',
                  },
                  {
                    label: 'Query MongoDB',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/node/app-services/query-mongodb',
                  },
                ],
              },
              {
                label: 'Manage Users',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/node/manage-users',
                collapsible: true,
                items: [
                  {
                    label: 'Create and Delete Users',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/node/users/create-delete-users',
                  },
                  {
                    label: 'Authenticate Users',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/node/users/authenticate-users',
                  },
                  {
                    label: 'Custom User Data',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/node/users/access-custom-user-data',
                  },
                  {
                    label: 'User Metadata',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/node/users/user-metadata',
                  },
                  {
                    label: 'Manage Email/Password Users',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/node/users/manage-email-password-users',
                  },
                  {
                    label: 'Multi-User Applications',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/node/users/multi-user-applications',
                  },
                  {
                    label: 'Link User Identities',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/node/users/link-identities',
                  },
                  {
                    label: 'Create & Manage User API Keys',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/node/users/manage-user-api-keys',
                  },
                ],
              },
              {
                label: 'Sync Data',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/node/sync',
                collapsible: true,
                items: [
                  {
                    label: 'Configure & Open a Synced Realm',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/node/sync/configure-and-open-a-synced-realm',
                  },
                  {
                    label: 'Manage Flexible Sync Subscriptions',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/node/sync/flexible-sync',
                  },
                  {
                    label: 'Manage a Sync Session',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/node/sync/manage-sync-session',
                  },
                  {
                    label: 'Handle Sync Errors',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/node/sync/handle-sync-errors',
                  },
                  {
                    label: 'Manual Client Reset Data Recovery',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/node/sync/client-reset-data-recovery',
                  },
                  {
                    label: 'Set the Client Log Level',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/node/sync/log-level',
                  },
                  {
                    label: 'Stream Data to Atlas',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/node/sync/stream-data-to-atlas',
                  },
                  {
                    label: 'Partition-Based Sync',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/node/sync/partition-based-sync',
                  },
                ],
              },
              {
                label: 'Logging',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/node/logging',
              },
              {
                label: 'SDK Telemetry',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/node/telemetry',
              },
              {
                label: 'API Reference',
                contentSite: 'realm',
                url: 'https://www.mongodb.com/docs/realm-sdks/js/latest/',
              },
              {
                label: 'Release Notes',
                contentSite: 'realm',
                url: 'https://github.com/realm/realm-js/releases',
              },
            ],
          },
          {
            label: 'React Native SDK',
            contentSite: 'realm',
            url: '/docs/atlas/device-sdks/sdk/react-native',
            collapsible: true,
            items: [
              {
                label: 'Realm Files',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/react-native/realm-files',
                collapsible: true,
                items: [
                  {
                    label: 'Configure a Realm',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/react-native/realm-files/configure-a-realm',
                  },
                  {
                    label: 'Bundle a Realm',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/react-native/realm-files/bundle',
                  },
                  {
                    label: 'Encrypt a Realm',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/react-native/realm-files/encrypt',
                  },
                  {
                    label: 'Reduce Realm File Size',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/react-native/realm-files/compact-realm',
                  },
                ],
              },
              {
                label: 'Model Data',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/react-native/model-data',
                collapsible: true,
                items: [
                  {
                    label: 'Define an Object Model',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/react-native/model-data/define-a-realm-object-model',
                  },
                  {
                    label: 'Relationships & Embedded Objects',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/react-native/model-data/relationships-and-embedded-objects',
                  },
                  {
                    label: 'Change an Object Model',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/react-native/model-data/change-an-object-model',
                  },
                  {
                    label: 'Data Types',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/react-native/model-data/data-types',
                    collapsible: true,
                    items: [
                      {
                        label: 'Property Types',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/react-native/model-data/data-types/property-types',
                      },
                      {
                        label: 'Collections',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/react-native/model-data/data-types/collections',
                      },
                      {
                        label: 'Dictionaries',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/react-native/model-data/data-types/dictionaries',
                      },
                      {
                        label: 'Sets',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/react-native/model-data/data-types/sets',
                      },
                      {
                        label: 'Mixed',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/react-native/model-data/data-types/mixed',
                      },
                      {
                        label: 'UUID',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/react-native/model-data/data-types/uuid',
                      },
                      {
                        label: 'Embedded Objects',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/react-native/model-data/data-types/embedded-objects',
                      },
                      {
                        label: 'Geospatial Data',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/react-native/model-data/data-types/geospatial',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'CRUD',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/react-native/crud',
                collapsible: true,
                items: [
                  {
                    label: 'Create',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/react-native/crud/create',
                  },
                  {
                    label: 'Read',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/react-native/crud/read',
                  },
                  {
                    label: 'Update',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/react-native/crud/update',
                  },
                  {
                    label: 'Delete',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/react-native/crud/delete',
                  },
                  {
                    label: 'Query Data',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/react-native/crud/query-data',
                  },
                ],
              },
              {
                label: 'React to Changes',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/react-native/react-to-changes',
              },
              {
                label: 'Atlas App Services',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/react-native/app-services',
                collapsible: true,
                items: [
                  {
                    label: 'Connect to an App Services App',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/react-native/app-services/connect-to-app-services-app',
                  },
                  {
                    label: 'Call a Function',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/react-native/app-services/call-a-function',
                  },
                  {
                    label: 'Query MongoDB',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/react-native/app-services/query-mongodb',
                  },
                ],
              },
              {
                label: 'Manage Users',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/react-native/manage-users',
                collapsible: true,
                items: [
                  {
                    label: 'Create and Delete Users',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/react-native/manage-users/create-and-delete-users',
                  },
                  {
                    label: 'Authenticate Users',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/react-native/manage-users/authenticate-users',
                  },
                  {
                    label: 'Custom User Data',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/react-native/manage-users/custom-user-data',
                  },
                  {
                    label: 'Manage Email/Password Users',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/react-native/manage-users/manage-email-password-users',
                  },
                  {
                    label: 'Multi-User Applications',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/react-native/manage-users/multi-user-applications',
                  },
                  {
                    label: 'Link User Identities',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/react-native/manage-users/link-user-identities',
                  },
                  {
                    label: 'Create & Manage User API Keys',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/react-native/manage-users/manage-user-api-keys',
                  },
                ],
              },
              {
                label: 'Sync Data',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/react-native/sync-data',
                collapsible: true,
                items: [
                  {
                    label: 'Configure a Synced Realm',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/react-native/sync-data/configure-a-synced-realm',
                  },
                  {
                    label: 'Manage Flexible Sync Subscriptions',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/react-native/sync-data/flexible-sync',
                  },
                  {
                    label: 'Manage Sync Session',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/react-native/sync-data/manage-sync-session',
                  },
                  {
                    label: 'Handle Sync Errors',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/react-native/sync-data/handle-sync-errors',
                  },
                  {
                    label: 'Manual Client Reset Data Recovery',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/react-native/sync-data/client-reset-data-recovery',
                  },
                  {
                    label: 'Partition-Based Sync',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/react-native/sync-data/partition-based-sync',
                  },
                  {
                    label: 'Set the Client Log Level',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/react-native/sync-data/log-level',
                  },
                  {
                    label: 'Stream Data to Atlas',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/react-native/sync-data/stream-data-to-atlas',
                  },
                ],
              },
              {
                label: 'Integration Guides',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/react-native/integrations',
                collapsible: true,
                items: [
                  {
                    label: 'Build using Mac Catalyst',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/react-native/integrations/mac-catalyst',
                  },
                ],
              },
              {
                label: 'Test & Debug',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/react-native/test-and-debug',
                collapsible: true,
                items: [
                  {
                    label: 'Testing',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/react-native/test-and-debug/testing',
                  },
                  {
                    label: 'Troubleshooting',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/react-native/test-and-debug/troubleshooting',
                  },
                ],
              },
              {
                label: 'Logging',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/react-native/logging',
              },
              {
                label: 'SDK Telemetry',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/react-native/telemetry',
              },
              {
                label: 'API Reference',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/react-native/api-reference',
                collapsible: true,
                items: [
                  {
                    label: 'JavaScript SDK Reference (@realm)',
                    contentSite: 'realm',
                    url: 'https://www.mongodb.com/docs/realm-sdks/js/latest/',
                  },
                  {
                    label: 'RealmProvider (@realm/react)',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/react-native/api-reference/realm-provider',
                  },
                  {
                    label: 'AppProvider (@realm/react)',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/react-native/api-reference/app-provider',
                  },
                  {
                    label: 'UserProvider (@realm/react)',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/react-native/api-reference/user-provider',
                  },
                ],
              },
              {
                label: 'Release Notes',
                contentSite: 'realm',
                url: 'https://github.com/realm/realm-js/releases',
              },
            ],
          },
          {
            label: 'Swift SDK',
            contentSite: 'realm',
            url: '/docs/atlas/device-sdks/sdk/swift',
            collapsible: true,
            items: [
              {
                label: 'Realm Files',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/swift/realm-files',
                collapsible: true,
                items: [
                  {
                    label: 'Configure & Open a Realm',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/swift/realm-files/configure-and-open-a-realm',
                  },
                  {
                    label: 'Delete a Realm',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/swift/realm-files/delete-a-realm',
                  },
                  {
                    label: 'Bundle a Realm',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/swift/realm-files/bundle-a-realm',
                  },
                  {
                    label: 'Reduce Realm File Size',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/swift/realm-files/compacting',
                  },
                  {
                    label: 'Encrypt a Realm',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/swift/realm-files/encrypt-a-realm',
                  },
                  {
                    label: 'Build for tvOS',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/swift/realm-files/tvos',
                  },
                ],
              },
              {
                label: 'Model Data',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/swift/model-data',
                collapsible: true,
                items: [
                  {
                    label: 'Define an Object Model',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/swift/model-data/object-models',
                  },
                  {
                    label: 'Relationships',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/swift/model-data/relationships',
                  },
                  {
                    label: 'Supported Types',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/swift/model-data/supported-types',
                  },
                  {
                    label: 'Change an Object Model',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/swift/model-data/change-an-object-model',
                  },
                  {
                    label: 'Model Data with Device Sync',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/swift/model-data/model-data-device-sync',
                  },
                ],
              },
              {
                label: 'CRUD',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/swift/crud',
                collapsible: true,
                items: [
                  {
                    label: 'Create',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/swift/crud/create',
                  },
                  {
                    label: 'Read',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/swift/crud/read',
                  },
                  {
                    label: 'Update',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/swift/crud/update',
                  },
                  {
                    label: 'Delete',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/swift/crud/delete',
                  },
                  {
                    label: 'Threading',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/swift/crud/threading',
                  },
                  {
                    label: 'Filter Data',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/swift/crud/filter-data',
                  },
                ],
              },
              {
                label: 'React to Changes',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/swift/react-to-changes',
              },
              {
                label: 'SwiftUI',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/swift/swiftui',
                collapsible: true,
                items: [
                  {
                    label: 'Quick Start',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/swift/swiftui-tutorial',
                  },
                  {
                    label: 'Model Data',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/swift/swiftui/model-data',
                    collapsible: true,
                    items: [
                      {
                        label: 'Realm Object Models',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/swift/swiftui/model-data/define-a-realm-object-model',
                      },
                      {
                        label: 'Change an Object Model',
                        contentSite: 'realm',
                        url: '/docs/atlas/device-sdks/sdk/swift/swiftui/model-data/change-an-object-model',
                      },
                    ],
                  },
                  {
                    label: 'Configure and Open a Realm',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/swift/swiftui/configure-and-open-realm',
                  },
                  {
                    label: 'React to Changes',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/swift/swiftui/react-to-changes',
                  },
                  {
                    label: 'Pass Realm Data Between Views',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/swift/swiftui/pass-realm-data-between-views',
                  },
                  {
                    label: 'Write Data',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/swift/swiftui/write',
                  },
                  {
                    label: 'Filter Data',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/swift/swiftui/filter-data',
                  },
                  {
                    label: 'Handle Sync Errors',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/swift/swiftui/handle-sync-errors',
                  },
                  {
                    label: 'Sync Data in the Background',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/swift/swiftui/background-sync',
                  },
                  {
                    label: 'Use Realm with SwiftUI Previews',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/swift/swiftui/swiftui-previews',
                  },
                ],
              },
              {
                label: 'Use Realm with Actors',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/swift/use-realm-with-actors',
              },
              {
                label: 'Swift Concurrency',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/swift/swift-concurrency',
              },
              {
                label: 'Test and Debug',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/swift/test-and-debug',
              },
              {
                label: 'Logging',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/swift/logging',
              },
              {
                label: 'Application Services',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/swift/application-services',
                collapsible: true,
                items: [
                  {
                    label: 'Connect to an App Services App',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/swift/app-services/connect-to-app-services-backend',
                  },
                  {
                    label: 'Call a Function',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/swift/app-services/call-a-function',
                  },
                  {
                    label: 'Query MongoDB',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/swift/app-services/mongodb-remote-access',
                  },
                ],
              },
              {
                label: 'Manage Users',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/swift/work-with-users',
                collapsible: true,
                items: [
                  {
                    label: 'Create and Delete Users',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/swift/users/create-and-delete-users',
                  },
                  {
                    label: 'Authenticate Users',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/swift/users/authenticate-users',
                  },
                  {
                    label: 'Custom User Data',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/swift/users/custom-user-data',
                  },
                  {
                    label: 'User Metadata',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/swift/users/user-metadata',
                  },
                  {
                    label: 'Manage Email/Password Users',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/swift/users/manage-email-password-users',
                  },
                  {
                    label: 'Multi-User Applications',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/swift/users/multi-user-applications',
                  },
                  {
                    label: 'Link User Identities',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/swift/users/link-user-identities',
                  },
                  {
                    label: 'Create & Manage User API Keys',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/swift/users/manage-user-api-keys',
                  },
                ],
              },
              {
                label: 'Sync Data',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/swift/sync',
                collapsible: true,
                items: [
                  {
                    label: 'Add Sync to an App',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/swift/sync/add-sync-to-app',
                  },
                  {
                    label: 'Configure & Open a Synced Realm',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/swift/sync/configure-and-open-a-synced-realm',
                  },
                  {
                    label: 'Manage Flexible Sync Subscriptions',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/swift/sync/flexible-sync',
                  },
                  {
                    label: 'Write to a Synced Realm',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/swift/sync/write-to-synced-realm',
                  },
                  {
                    label: 'Handle Sync Errors',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/swift/sync/handle-sync-errors',
                  },
                  {
                    label: 'Sync Data in the Background',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/swift/sync/background-sync',
                  },
                  {
                    label: 'Manage Sync Sessions',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/swift/sync/sync-session',
                  },
                  {
                    label: 'Set the Client Log Level',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/swift/sync/log-level',
                  },
                  {
                    label: 'Record Realm Events',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/swift/sync/event-library',
                  },
                  {
                    label: 'Stream Data to Atlas',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/swift/sync/stream-data-to-atlas',
                  },
                  {
                    label: 'Partition-Based Sync',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/sdk/swift/sync/partition-based-sync',
                  },
                ],
              },
              {
                label: 'Realm in Xcode Playgrounds',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/swift/xcode-playgrounds',
              },
              {
                label: 'SDK Telemetry',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/swift/telemetry',
              },
              {
                label: 'API Reference',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/sdk/swift/api-reference',
                collapsible: true,
                items: [
                  {
                    label: 'Swift API Reference',
                    contentSite: 'realm',
                    url: 'https://www.mongodb.com/docs/realm-sdks/swift/latest',
                  },
                  {
                    label: 'Objective-C API Reference',
                    contentSite: 'realm',
                    url: 'https://www.mongodb.com/docs/realm-sdks/objc/latest',
                  },
                ],
              },
              {
                label: 'Release Notes',
                contentSite: 'realm',
                url: 'https://github.com/realm/realm-swift/releases',
              },
            ],
          },
          {
            label: 'Web SDK',
            contentSite: 'realm',
            url: '/docs/atlas/device-sdks/web',
            collapsible: true,
            items: [
              {
                label: 'Atlas App Services',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/web/atlas-app-services',
                collapsible: true,
                items: [
                  {
                    label: 'Initialize the App Client',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/web/init-app-client',
                  },
                  {
                    label: 'Call a Function',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/web/call-a-function',
                  },
                ],
              },
              {
                label: 'User Management',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/web/users',
                collapsible: true,
                items: [
                  {
                    label: 'Create & Delete Users',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/web/create-delete-user',
                  },
                  {
                    label: 'Authenticate Users',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/web/authenticate',
                  },
                  {
                    label: 'Manage Email/Password Users',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/web/manage-email-password-users',
                  },
                  {
                    label: 'Work with Multiple Users',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/web/work-with-multiple-users',
                  },
                  {
                    label: 'Access Custom User Data',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/web/access-custom-user-data',
                  },
                  {
                    label: 'Link User Identities',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/web/link-identities',
                  },
                  {
                    label: 'Create & Manage User API Keys',
                    contentSite: 'realm',
                    url: '/docs/atlas/device-sdks/web/create-manage-api-keys',
                  },
                ],
              },
              {
                label: 'Query MongoDB',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/web/mongodb',
              },
              {
                label: 'Apollo GraphQL Client (React)',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/web/graphql-apollo-react',
              },
              {
                label: 'Next.js Integration Guide',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/web/nextjs',
              },
              {
                label: 'SDK Telemetry',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/web/telemetry',
              },
              {
                label: 'API Reference',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/web/api-reference',
              },
              {
                label: 'Release Notes',
                contentSite: 'realm',
                url: 'https://github.com/realm/realm-js/releases',
              },
            ],
          },
          {
            label: 'Realm Studio',
            contentSite: 'realm',
            url: '/docs/atlas/device-sdks/studio',
            collapsible: true,
            items: [
              {
                label: 'View Data with Device Sync',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/studio/view-atlas-data-sync',
              },
              {
                label: 'Open a Realm File',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/studio/open-realm-file',
              },
              {
                label: 'Explore a Realm File',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/studio/explore-realm-file',
              },
              {
                label: 'Modify a Realm File',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/studio/modify-objects',
              },
              {
                label: 'Modify Schema',
                contentSite: 'realm',
                url: '/docs/atlas/device-sdks/studio/modify-schema',
              },
            ],
          },
          {
            label: 'Realm Query Language',
            contentSite: 'realm',
            url: '/docs/atlas/device-sdks/realm-query-language',
          },
          {
            label: 'Example Projects',
            contentSite: 'realm',
            url: '/docs/atlas/device-sdks/example-projects',
          },
          {
            label: 'Get Help',
            contentSite: 'realm',
            url: '/docs/atlas/device-sdks/help',
          },
        ],
      },
    ],
  },
];
