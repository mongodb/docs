import type { TocItem } from '@/components/unified-sidenav/types';

export const toc: TocItem[] = [
  {
    label: 'Legacy Docs',
    contentSite: 'atlas-app-services',
    url: '/docs/atlas/app-services/',
    items: [
      {
        label: 'Atlas App Services',
        contentSite: 'atlas-app-services',
        group: true,
        items: [
          {
            label: 'Introduction',
            contentSite: 'atlas-app-services',
            url: '/docs/atlas/app-services/introduction',
          },
          {
            label: 'Service Deprecation',
            contentSite: 'atlas-app-services',
            url: '/docs/atlas/app-services/deprecation',
          },
          {
            label: 'Functions',
            contentSite: 'atlas-app-services',
            url: '/docs/atlas/app-services/functions',
            collapsible: true,
            items: [
              {
                label: 'Query MongoDB Atlas',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/functions/mongodb',
                collapsible: true,
                items: [
                  {
                    label: 'Read',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/functions/mongodb/read',
                  },
                  {
                    label: 'Write',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/functions/mongodb/write',
                  },
                  {
                    label: 'Aggregate',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/functions/mongodb/aggregate',
                  },
                  {
                    label: 'MongoDB API Reference',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/functions/mongodb/api',
                  },
                ],
              },
              {
                label: 'Context',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/functions/context',
              },
              {
                label: 'Global Modules',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/functions/globals',
              },
              {
                label: 'External Dependencies',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/functions/dependencies',
              },
              {
                label: 'Test Functions',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/functions/test',
              },
              {
                label: 'Handle Errors',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/functions/handle-errors',
              },
              {
                label: 'JavaScript Support',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/functions/javascript-support',
              },
            ],
          },
          {
            label: 'Triggers',
            contentSite: 'atlas-app-services',
            url: '/docs/atlas/app-services/triggers',
          },
          {
            label: 'Develop & Deploy Apps',
            contentSite: 'atlas-app-services',
            url: '/docs/atlas/app-services/apps',
            collapsible: true,
            items: [
              {
                label: 'Get App Metadata',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/apps/metadata',
              },
              {
                label: 'Update an App',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/apps/update',
              },
              {
                label: 'Copy an App',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/apps/copy',
              },
              {
                label: 'Delete an App',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/apps/delete',
              },
              {
                label: 'Roll Back a Deployment',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/apps/rollback',
              },
              {
                label: 'Export an App',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/apps/export',
              },
              {
                label: 'Configure an App Environment',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/apps/environment',
              },
              {
                label: 'Set Up a CI/CD Pipeline',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/apps/cicd',
              },
              {
                label: 'Change Deployment Models',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/apps/change-deployment-models',
              },
              {
                label: 'Deployment Models & Regions',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/apps/deployment-models-and-regions',
              },
            ],
          },
          {
            label: 'Authenticate & Manage Users',
            contentSite: 'atlas-app-services',
            url: '/docs/atlas/app-services/users',
            collapsible: true,
            items: [
              {
                label: 'Create a User',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/users/create',
              },
              {
                label: 'Define User Metadata',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/users/custom-metadata',
              },
              {
                label: 'Read User Metadata',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/users/read-metadata',
              },
              {
                label: 'Manage User Accounts',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/users/manage',
              },
              {
                label: 'Manage User Sessions',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/users/sessions',
              },
              {
                label: 'Authentication Providers',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/authentication',
                collapsible: true,
                items: [
                  {
                    label: 'Anonymous',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/authentication/anonymous',
                  },
                  {
                    label: 'API Key',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/authentication/api-key',
                  },
                  {
                    label: 'Email/Password',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/authentication/email-password',
                  },
                  {
                    label: 'Facebook',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/authentication/facebook',
                  },
                  {
                    label: 'Google',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/authentication/google',
                  },
                  {
                    label: 'Apple ID',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/authentication/apple',
                  },
                  {
                    label: 'Custom Function',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/authentication/custom-function',
                  },
                  {
                    label: 'Custom JWT',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/authentication/custom-jwt',
                  },
                  {
                    label: 'Firebase (Custom JWT)',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/authentication/firebase-jwt',
                  },
                  {
                    label: 'Okta (Custom JWT)',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/authentication/okta-jwt',
                  },
                ],
              },
            ],
          },
          {
            label: 'Connect to MongoDB Data Sources',
            contentSite: 'atlas-app-services',
            url: '/docs/atlas/app-services/mongodb',
            collapsible: true,
            items: [
              {
                label: 'CRUD & Aggregation APIs',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/mongodb/crud-and-aggregation-apis',
              },
              {
                label: 'Query Atlas from Client Apps',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/mongodb/data-access',
              },
              {
                label: 'Read Preference',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/mongodb/read-preference',
              },
              {
                label: 'Wire Protocol',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/mongodb/wire-protocol',
              },
              {
                label: 'Document Preimages',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/mongodb/preimages',
              },
              {
                label: 'Internal Database Usage',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/mongodb/internal-database-usage',
              },
            ],
          },
          {
            label: 'Define a Data Model',
            contentSite: 'atlas-app-services',
            url: '/docs/atlas/app-services/data-model',
            collapsible: true,
            items: [
              {
                label: 'Schemas',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/schemas',
                collapsible: true,
                items: [
                  {
                    label: 'Define & Enforce a Schema',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/schemas/enforce-a-schema',
                  },
                  {
                    label: 'Remove a Schema',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/schemas/remove-a-schema',
                  },
                  {
                    label: 'Schema Data Types',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/schemas/types',
                  },
                ],
              },
              {
                label: 'Relationships',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/schemas/relationships',
              },
              {
                label: 'Values & Secrets',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/values-and-secrets',
                collapsible: true,
                items: [
                  {
                    label: 'Define a Value',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/values-and-secrets/define-a-value',
                  },
                  {
                    label: 'Define and Manage Secrets',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/values-and-secrets/define-and-manage-secrets',
                  },
                  {
                    label: 'Access a Value',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/values-and-secrets/access-a-value',
                  },
                ],
              },
            ],
          },
          {
            label: 'Define Data Access Permissions',
            contentSite: 'atlas-app-services',
            url: '/docs/atlas/app-services/rules',
            collapsible: true,
            items: [
              {
                label: 'Role-based Permissions',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/rules/roles',
              },
              {
                label: 'Rule Expressions',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/rules/expressions',
              },
              {
                label: 'Filter Incoming Queries',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/rules/filters',
              },
              {
                label: 'Device Sync-Compatible Permissions',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/rules/sync-compatibility',
              },
              {
                label: 'Configure Advanced Rules',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/mongodb/configure-advanced-rules',
              },
              {
                label: 'Data Access Role Examples',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/rules/examples',
              },
            ],
          },
          {
            label: 'Secure Your App',
            contentSite: 'atlas-app-services',
            url: '/docs/atlas/app-services/security',
            collapsible: true,
            items: [
              {
                label: 'Configure Network Security',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/security/network',
              },
              {
                label: 'Manage Developer Access',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/security/developer-access',
              },
              {
                label: 'Use a VPC Private Endpoint',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/security/private-endpoints',
              },
            ],
          },
          {
            label: 'Monitor App Activity',
            contentSite: 'atlas-app-services',
            url: '/docs/atlas/app-services/activity',
            collapsible: true,
            items: [
              {
                label: 'View Application Logs',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/activity/view-logs',
              },
              {
                label: 'Forward Logs to a Service',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/activity/forward-logs',
              },
              {
                label: 'Activity Feed & Alerts',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/activity/alerts',
              },
              {
                label: 'Log Types',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/logs',
                collapsible: true,
                items: [
                  {
                    label: 'Authentication Logs',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/logs/authentication',
                  },
                  {
                    label: 'Change Stream Logs',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/logs/changestream',
                  },
                  {
                    label: 'Device Sync Logs',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/logs/sync',
                  },
                  {
                    label: 'Endpoint Logs',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/logs/endpoint',
                  },
                  {
                    label: 'Function Logs',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/logs/function',
                  },
                  {
                    label: 'Schema Logs',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/logs/schema',
                  },
                  {
                    label: 'Service Logs',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/logs/service',
                  },
                  {
                    label: 'Trigger Logs',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/logs/trigger',
                  },
                  {
                    label: 'Trigger Error Handler Logs',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/logs/error-handler',
                  },
                  {
                    label: 'View Logs with CLI',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/logs/cli',
                  },
                ],
              },
            ],
          },
          {
            label: 'Device Sync',
            contentSite: 'atlas-app-services',
            url: '/docs/atlas/app-services/sync',
            collapsible: true,
            items: [
              {
                label: 'Device Sync Deprecation',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/sync/device-sync-deprecation',
                collapsible: true,
                items: [
                  {
                    label: 'Migrate to AWS AppSync',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/sync/migration/awsappsync',
                  },
                  {
                    label: 'Tutorial: Migrate an RN App to PowerSync',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/sync/migration/reactnativetutorial',
                  },
                ],
              },
              {
                label: "App Builder's Resources",
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/sync/app-builder',
                collapsible: true,
                items: [
                  {
                    label: 'Example Projects',
                    contentSite: 'atlas-app-services',
                    url: 'https://www.mongodb.com/docs/realm/example-projects/',
                  },
                  {
                    label: 'Device Sync Permissions Guide',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/sync/app-builder/device-sync-permissions-guide',
                  },
                  {
                    label: 'Sync Atlas Data with Client',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/sync/app-builder/sync-data-in-atlas-with-client',
                  },
                  {
                    label: 'Sync Client Data with Atlas',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/sync/app-builder/sync-data-in-client-with-atlas',
                  },
                  {
                    label: 'Stream Data from Client to Atlas',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/sync/app-builder/stream-data-from-client-to-atlas',
                  },
                  {
                    label: 'Event Library',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/sync/app-builder/event-library',
                  },
                ],
              },
              {
                label: 'Define and Update Your Data Model',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/sync/configure-your-data-model',
                collapsible: true,
                items: [
                  {
                    label: 'Sync Data Model Overview',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/sync/data-model/sync-schema-overview',
                  },
                  {
                    label: 'Create a Data Model',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/sync/data-model/create-a-schema',
                  },
                  {
                    label: 'Generate SDK Object Models',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/sync/data-model/generate-sdk-object-models',
                  },
                  {
                    label: 'Update a Data Model',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/sync/data-model/update-schema',
                  },
                  {
                    label: 'Make Breaking Schema Changes',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/sync/data-model/migrate-schema-partner-collection',
                  },
                  {
                    label: 'Data Model Mapping',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/sync/data-model/data-model-map',
                  },
                ],
              },
              {
                label: 'Configure Sync',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/sync/configure-device-sync',
                collapsible: true,
                items: [
                  {
                    label: 'Enable Atlas Device Sync',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/sync/configure/enable-sync',
                  },
                  {
                    label: 'Sync Settings',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/sync/configure/sync-settings',
                  },
                  {
                    label: 'Pause or Terminate Sync',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/sync/configure/pause-or-terminate-sync',
                  },
                ],
              },
              {
                label: 'Handle Errors',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/sync/error-handling',
                collapsible: true,
                items: [
                  {
                    label: 'Client Reset',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/sync/error-handling/client-resets',
                  },
                  {
                    label: 'Sync Errors',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/sync/error-handling/errors',
                  },
                ],
              },
              {
                label: 'Go to Production with Sync',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/sync/go-to-production',
                collapsible: true,
                items: [
                  {
                    label: 'Production Checklist',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/sync/go-to-production/production-checklist',
                  },
                  {
                    label: 'Production Load Testing',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/sync/go-to-production/production-load-testing',
                  },
                  {
                    label: 'Optimize Sync Storage in Atlas',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/sync/go-to-production/optimize-sync-atlas-usage',
                  },
                  {
                    label: 'Compact an Atlas Volume',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/sync/go-to-production/compact-disk',
                  },
                ],
              },
              {
                label: 'Migrate a Local-Only App to a Sync-Enabled App',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/sync/app-builder/local-to-sync',
              },
              {
                label: 'Technical Details',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/sync/details',
                collapsible: true,
                items: [
                  {
                    label: 'Conflict Resolution',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/sync/details/conflict-resolution',
                  },
                  {
                    label: 'Atlas Device Sync Protocol',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/sync/details/protocol',
                  },
                ],
              },
              {
                label: 'Migrate Sync Modes',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/sync/migrate-sync-modes',
              },
            ],
          },
          {
            label: 'Data API',
            contentSite: 'atlas-app-services',
            url: '/docs/atlas/app-services/data-api',
            collapsible: true,
            items: [
              {
                label: 'Data API and HTTPS Endpoints Deprecation',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/data-api/data-api-deprecation',
                collapsible: true,
                items: [
                  {
                    label: 'Guide: Implement an Express.js Alternative to the Atlas Data API',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/data-api/migration/data-api-tutorial',
                  },
                ],
              },
              {
                label: 'Data API Endpoints',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/data-api/generated-endpoints',
              },
              {
                label: 'Custom HTTPS Endpoints',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/data-api/custom-endpoints',
              },
              {
                label: 'Authenticate Data API Requests',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/data-api/authenticate',
              },
              {
                label: 'Data Formats',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/data-api/data-formats',
              },
              {
                label: 'Data API OpenAPI Reference',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/data-api/openapi',
              },
            ],
          },
          {
            label: 'Reference',
            contentSite: 'atlas-app-services',
            url: '/docs/atlas/app-services/reference',
            collapsible: true,
            items: [
              {
                label: 'App Configuration Files',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/reference/config',
                collapsible: true,
                items: [
                  {
                    label: 'App Services App',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/reference/config/app',
                  },
                  {
                    label: 'Users & Authentication Providers',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/reference/config/auth',
                  },
                  {
                    label: 'MongoDB Data Sources',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/reference/config/data_sources',
                  },
                  {
                    label: 'Environment Values',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/reference/config/environments',
                  },
                  {
                    label: 'Functions',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/reference/config/functions',
                  },
                  {
                    label: 'GraphQL',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/reference/config/graphql',
                  },
                  {
                    label: 'Static Hosting',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/reference/config/hosting',
                  },
                  {
                    label: 'HTTPS Endpoints',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/reference/config/https_endpoints',
                  },
                  {
                    label: 'Log Forwarders',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/reference/config/log_forwarders',
                  },
                  {
                    label: 'Atlas Device Sync',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/reference/config/sync',
                  },
                  {
                    label: 'Triggers',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/reference/config/triggers',
                  },
                  {
                    label: 'Values',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/reference/config/values',
                  },
                  {
                    label: 'Create Template Configurations with Expansions',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/reference/config/template-expansions',
                  },
                  {
                    label: 'v20210101',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/reference/config/v20210101',
                  },
                  {
                    label: 'v20180301',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/reference/config/legacy',
                  },
                ],
              },
              {
                label: 'App Metrics',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/reference/metrics',
              },
              {
                label: 'App Services Admin API',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/admin/api/v3',
              },
              {
                label: '|cli|',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/cli',
                collapsible: true,
                items: [
                  {
                    label: 'accessList',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/cli/appservices-accessList',
                    collapsible: true,
                    items: [
                      {
                        label: 'create',
                        contentSite: 'atlas-app-services',
                        url: '/docs/atlas/app-services/cli/appservices-accessList-create',
                      },
                      {
                        label: 'delete',
                        contentSite: 'atlas-app-services',
                        url: '/docs/atlas/app-services/cli/appservices-accessList-delete',
                      },
                      {
                        label: 'list',
                        contentSite: 'atlas-app-services',
                        url: '/docs/atlas/app-services/cli/appservices-accessList-list',
                      },
                      {
                        label: 'update',
                        contentSite: 'atlas-app-services',
                        url: '/docs/atlas/app-services/cli/appservices-accessList-update',
                      },
                    ],
                  },
                  {
                    label: 'apps',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/cli/appservices-apps',
                    collapsible: true,
                    items: [
                      {
                        label: 'create',
                        contentSite: 'atlas-app-services',
                        url: '/docs/atlas/app-services/cli/appservices-apps-create',
                      },
                      {
                        label: 'delete',
                        contentSite: 'atlas-app-services',
                        url: '/docs/atlas/app-services/cli/appservices-apps-delete',
                      },
                      {
                        label: 'describe',
                        contentSite: 'atlas-app-services',
                        url: '/docs/atlas/app-services/cli/appservices-apps-describe',
                      },
                      {
                        label: 'diff',
                        contentSite: 'atlas-app-services',
                        url: '/docs/atlas/app-services/cli/appservices-apps-diff',
                      },
                      {
                        label: 'init',
                        contentSite: 'atlas-app-services',
                        url: '/docs/atlas/app-services/cli/appservices-apps-init',
                      },
                      {
                        label: 'list',
                        contentSite: 'atlas-app-services',
                        url: '/docs/atlas/app-services/cli/appservices-apps-list',
                      },
                    ],
                  },
                  {
                    label: 'deploy',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/cli/appservices-deploy',
                    collapsible: true,
                    items: [
                      {
                        label: 'configure',
                        contentSite: 'atlas-app-services',
                        url: '/docs/atlas/app-services/cli/appservices-deploy-configure',
                      },
                      {
                        label: 'describe',
                        contentSite: 'atlas-app-services',
                        url: '/docs/atlas/app-services/cli/appservices-deploy-describe',
                      },
                      {
                        label: 'disable',
                        contentSite: 'atlas-app-services',
                        url: '/docs/atlas/app-services/cli/appservices-deploy-disable',
                      },
                      {
                        label: 'enable',
                        contentSite: 'atlas-app-services',
                        url: '/docs/atlas/app-services/cli/appservices-deploy-enable',
                      },
                    ],
                  },
                  {
                    label: 'function',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/cli/appservices-function',
                    collapsible: true,
                    items: [
                      {
                        label: 'list',
                        contentSite: 'atlas-app-services',
                        url: '/docs/atlas/app-services/cli/appservices-function-list',
                      },
                      {
                        label: 'run',
                        contentSite: 'atlas-app-services',
                        url: '/docs/atlas/app-services/cli/appservices-function-run',
                      },
                    ],
                  },
                  {
                    label: 'login',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/cli/appservices-login',
                  },
                  {
                    label: 'logout',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/cli/appservices-logout',
                  },
                  {
                    label: 'logs',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/cli/appservices-logs',
                    collapsible: true,
                    items: [
                      {
                        label: 'list',
                        contentSite: 'atlas-app-services',
                        url: '/docs/atlas/app-services/cli/appservices-logs-list',
                      },
                    ],
                  },
                  {
                    label: 'pull',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/cli/appservices-pull',
                  },
                  {
                    label: 'push',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/cli/appservices-push',
                  },
                  {
                    label: 'schema',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/cli/appservices-schema',
                    collapsible: true,
                    items: [
                      {
                        label: 'datamodels',
                        contentSite: 'atlas-app-services',
                        url: '/docs/atlas/app-services/cli/appservices-schema-datamodels',
                      },
                      {
                        label: 'generate',
                        contentSite: 'atlas-app-services',
                        url: '/docs/atlas/app-services/cli/appservices-schema-generate',
                      },
                      {
                        label: 'validate',
                        contentSite: 'atlas-app-services',
                        url: '/docs/atlas/app-services/cli/appservices-schema-validate',
                      },
                    ],
                  },
                  {
                    label: 'secrets',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/cli/appservices-secrets',
                    collapsible: true,
                    items: [
                      {
                        label: 'create',
                        contentSite: 'atlas-app-services',
                        url: '/docs/atlas/app-services/cli/appservices-secrets-create',
                      },
                      {
                        label: 'delete',
                        contentSite: 'atlas-app-services',
                        url: '/docs/atlas/app-services/cli/appservices-secrets-delete',
                      },
                      {
                        label: 'list',
                        contentSite: 'atlas-app-services',
                        url: '/docs/atlas/app-services/cli/appservices-secrets-list',
                      },
                      {
                        label: 'update',
                        contentSite: 'atlas-app-services',
                        url: '/docs/atlas/app-services/cli/appservices-secrets-update',
                      },
                    ],
                  },
                  {
                    label: 'users',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/cli/appservices-users',
                    collapsible: true,
                    items: [
                      {
                        label: 'count',
                        contentSite: 'atlas-app-services',
                        url: '/docs/atlas/app-services/cli/appservices-users-count',
                      },
                      {
                        label: 'create',
                        contentSite: 'atlas-app-services',
                        url: '/docs/atlas/app-services/cli/appservices-users-create',
                      },
                      {
                        label: 'delete',
                        contentSite: 'atlas-app-services',
                        url: '/docs/atlas/app-services/cli/appservices-users-delete',
                      },
                      {
                        label: 'disable',
                        contentSite: 'atlas-app-services',
                        url: '/docs/atlas/app-services/cli/appservices-users-disable',
                      },
                      {
                        label: 'enable',
                        contentSite: 'atlas-app-services',
                        url: '/docs/atlas/app-services/cli/appservices-users-enable',
                      },
                      {
                        label: 'list',
                        contentSite: 'atlas-app-services',
                        url: '/docs/atlas/app-services/cli/appservices-users-list',
                      },
                      {
                        label: 'revoke',
                        contentSite: 'atlas-app-services',
                        url: '/docs/atlas/app-services/cli/appservices-users-revoke',
                      },
                    ],
                  },
                  {
                    label: 'whoami',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/cli/appservices-whoami',
                  },
                ],
              },
              {
                label: 'Billing',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/billing',
              },
              {
                label: 'Service Limitations',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/reference/service-limitations',
              },
              {
                label: 'Template Apps',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/reference/template-apps',
              },
              {
                label: 'Third-Party Licenses',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/reference/third-party-licenses',
              },
              {
                label: 'Upgrade a Shared Tier Cluster',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/reference/upgrade-shared-cluster',
              },
              {
                label: 'GraphQL API',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/graphql',
                collapsible: true,
                items: [
                  {
                    label: 'Expose Data in a Collection',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/graphql/expose-data',
                  },
                  {
                    label: 'Authenticate GraphQL Requests',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/graphql/authenticate',
                  },
                  {
                    label: 'GraphQL Types, Resolvers, and Operators',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/graphql/types-and-resolvers',
                  },
                  {
                    label: 'Define a Custom Resolver',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/graphql/custom-resolvers',
                  },
                  {
                    label: 'Connect with Apollo Client (React)',
                    contentSite: 'atlas-app-services',
                    url: 'https://www.mongodb.com/docs/realm/web/graphql-apollo-react/',
                  },
                  {
                    label: 'Run GraphQL Operations from a CLI',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/graphql/cli',
                  },
                  {
                    label: 'Migrate to Hasura',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/graphql/migrate-hasura',
                  },
                  {
                    label: 'Migrate to Apollo',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/graphql/migrate-apollo',
                  },
                  {
                    label: 'Migrate to WunderGraph',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/graphql/migrate-wundergraph',
                  },
                  {
                    label: 'Migrate to Render',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/graphql/migrate-render',
                  },
                ],
              },
              {
                label: 'Host Files',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/hosting',
                collapsible: true,
                items: [
                  {
                    label: 'Enable Hosting',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/hosting/enable-hosting',
                  },
                  {
                    label: 'Configure File Metadata',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/hosting/configure-file-metadata',
                  },
                  {
                    label: 'File Metadata Attributes',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/hosting/file-metadata-attributes',
                  },
                  {
                    label: 'Flush the CDN Cache',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/hosting/flush-the-cdn-cache',
                  },
                  {
                    label: 'Host a Single-Page Application',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/hosting/host-a-single-page-application',
                  },
                  {
                    label: 'Upload Content to Atlas App Services',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/hosting/upload-content-to-app-services',
                  },
                  {
                    label: 'Use a Custom 404 Page',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/hosting/use-a-custom-404-page',
                  },
                  {
                    label: 'Use a Custom Domain Name',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/hosting/use-a-custom-domain-name',
                  },
                  {
                    label: 'Migrate to Netlify',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/hosting/migrate-netlify',
                  },
                  {
                    label: 'Migrate to Vercel',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/hosting/migrate-vercel',
                  },
                  {
                    label: 'Migrate to Render',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/hosting/migrate-render',
                  },
                  {
                    label: 'Migrate to S3 Bucket',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/hosting/migrate-blob',
                  },
                ],
              },
              {
                label: 'Realm CLI',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/realm-cli',
                collapsible: true,
                items: [
                  {
                    label: 'realm-cli v1',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/realm-cli/v1',
                  },
                  {
                    label: 'realm-cli v2',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/realm-cli/v2',
                    collapsible: true,
                    items: [
                      {
                        label: 'accessList',
                        contentSite: 'atlas-app-services',
                        url: '/docs/atlas/app-services/realm-cli/v2/realm-cli-accessList',
                        collapsible: true,
                        items: [
                          {
                            label: 'create',
                            contentSite: 'atlas-app-services',
                            url: '/docs/atlas/app-services/realm-cli/v2/realm-cli-accessList-create',
                          },
                          {
                            label: 'delete',
                            contentSite: 'atlas-app-services',
                            url: '/docs/atlas/app-services/realm-cli/v2/realm-cli-accessList-delete',
                          },
                          {
                            label: 'list',
                            contentSite: 'atlas-app-services',
                            url: '/docs/atlas/app-services/realm-cli/v2/realm-cli-accessList-list',
                          },
                          {
                            label: 'update',
                            contentSite: 'atlas-app-services',
                            url: '/docs/atlas/app-services/realm-cli/v2/realm-cli-accessList-update',
                          },
                        ],
                      },
                      {
                        label: 'apps',
                        contentSite: 'atlas-app-services',
                        url: '/docs/atlas/app-services/realm-cli/v2/realm-cli-apps',
                        collapsible: true,
                        items: [
                          {
                            label: 'create',
                            contentSite: 'atlas-app-services',
                            url: '/docs/atlas/app-services/realm-cli/v2/realm-cli-apps-create',
                          },
                          {
                            label: 'delete',
                            contentSite: 'atlas-app-services',
                            url: '/docs/atlas/app-services/realm-cli/v2/realm-cli-apps-delete',
                          },
                          {
                            label: 'describe',
                            contentSite: 'atlas-app-services',
                            url: '/docs/atlas/app-services/realm-cli/v2/realm-cli-apps-describe',
                          },
                          {
                            label: 'diff',
                            contentSite: 'atlas-app-services',
                            url: '/docs/atlas/app-services/realm-cli/v2/realm-cli-apps-diff',
                          },
                          {
                            label: 'init',
                            contentSite: 'atlas-app-services',
                            url: '/docs/atlas/app-services/realm-cli/v2/realm-cli-apps-init',
                          },
                          {
                            label: 'list',
                            contentSite: 'atlas-app-services',
                            url: '/docs/atlas/app-services/realm-cli/v2/realm-cli-apps-list',
                          },
                        ],
                      },
                      {
                        label: 'function',
                        contentSite: 'atlas-app-services',
                        url: '/docs/atlas/app-services/realm-cli/v2/realm-cli-function',
                        collapsible: true,
                        items: [
                          {
                            label: 'run',
                            contentSite: 'atlas-app-services',
                            url: '/docs/atlas/app-services/realm-cli/v2/realm-cli-function-run',
                          },
                        ],
                      },
                      {
                        label: 'login',
                        contentSite: 'atlas-app-services',
                        url: '/docs/atlas/app-services/realm-cli/v2/realm-cli-login',
                      },
                      {
                        label: 'logout',
                        contentSite: 'atlas-app-services',
                        url: '/docs/atlas/app-services/realm-cli/v2/realm-cli-logout',
                      },
                      {
                        label: 'logs',
                        contentSite: 'atlas-app-services',
                        url: '/docs/atlas/app-services/realm-cli/v2/realm-cli-logs',
                        collapsible: true,
                        items: [
                          {
                            label: 'list',
                            contentSite: 'atlas-app-services',
                            url: '/docs/atlas/app-services/realm-cli/v2/realm-cli-logs-list',
                          },
                        ],
                      },
                      {
                        label: 'pull',
                        contentSite: 'atlas-app-services',
                        url: '/docs/atlas/app-services/realm-cli/v2/realm-cli-pull',
                      },
                      {
                        label: 'push',
                        contentSite: 'atlas-app-services',
                        url: '/docs/atlas/app-services/realm-cli/v2/realm-cli-push',
                      },
                      {
                        label: 'schema',
                        contentSite: 'atlas-app-services',
                        url: '/docs/atlas/app-services/realm-cli/v2/realm-cli-schema',
                        collapsible: true,
                        items: [
                          {
                            label: 'datamodels',
                            contentSite: 'atlas-app-services',
                            url: '/docs/atlas/app-services/realm-cli/v2/realm-cli-schema-datamodels',
                          },
                        ],
                      },
                      {
                        label: 'secrets',
                        contentSite: 'atlas-app-services',
                        url: '/docs/atlas/app-services/realm-cli/v2/realm-cli-secrets',
                        collapsible: true,
                        items: [
                          {
                            label: 'create',
                            contentSite: 'atlas-app-services',
                            url: '/docs/atlas/app-services/realm-cli/v2/realm-cli-secrets-create',
                          },
                          {
                            label: 'delete',
                            contentSite: 'atlas-app-services',
                            url: '/docs/atlas/app-services/realm-cli/v2/realm-cli-secrets-delete',
                          },
                          {
                            label: 'list',
                            contentSite: 'atlas-app-services',
                            url: '/docs/atlas/app-services/realm-cli/v2/realm-cli-secrets-list',
                          },
                          {
                            label: 'update',
                            contentSite: 'atlas-app-services',
                            url: '/docs/atlas/app-services/realm-cli/v2/realm-cli-secrets-update',
                          },
                        ],
                      },
                      {
                        label: 'users',
                        contentSite: 'atlas-app-services',
                        url: '/docs/atlas/app-services/realm-cli/v2/realm-cli-users',
                        collapsible: true,
                        items: [
                          {
                            label: 'create',
                            contentSite: 'atlas-app-services',
                            url: '/docs/atlas/app-services/realm-cli/v2/realm-cli-users-create',
                          },
                          {
                            label: 'delete',
                            contentSite: 'atlas-app-services',
                            url: '/docs/atlas/app-services/realm-cli/v2/realm-cli-users-delete',
                          },
                          {
                            label: 'disable',
                            contentSite: 'atlas-app-services',
                            url: '/docs/atlas/app-services/realm-cli/v2/realm-cli-users-disable',
                          },
                          {
                            label: 'enable',
                            contentSite: 'atlas-app-services',
                            url: '/docs/atlas/app-services/realm-cli/v2/realm-cli-users-enable',
                          },
                          {
                            label: 'list',
                            contentSite: 'atlas-app-services',
                            url: '/docs/atlas/app-services/realm-cli/v2/realm-cli-users-list',
                          },
                          {
                            label: 'revoke',
                            contentSite: 'atlas-app-services',
                            url: '/docs/atlas/app-services/realm-cli/v2/realm-cli-users-revoke',
                          },
                        ],
                      },
                      {
                        label: 'whoami',
                        contentSite: 'atlas-app-services',
                        url: '/docs/atlas/app-services/realm-cli/v2/realm-cli-whoami',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Partition-Based Sync Mode',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/reference/partition-based-sync',
              },
              {
                label: 'Push Notifications',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/reference/push-notifications',
              },
              {
                label: 'Third-Party Services',
                contentSite: 'atlas-app-services',
                url: '/docs/atlas/app-services/reference/services',
                collapsible: true,
                items: [
                  {
                    label: 'Replace Services with npm Modules',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/services/replace-with-npm-modules',
                  },
                  {
                    label: 'Convert Webhooks to HTTPS Endpoints',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/services/convert-webhooks-to-endpoints',
                  },
                  {
                    label: 'Call a Service Action',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/services/call-a-service-action',
                  },
                  {
                    label: 'Webhook Requests & Responses',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/services/webhook-requests-and-responses',
                  },
                  {
                    label: 'Configure Third-Party Services',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/services/configure/services',
                  },
                  {
                    label: 'Configure Service Webhooks',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/services/configure/service-webhooks',
                  },
                  {
                    label: 'Configure Service Rules',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/services/configure/service-rules',
                  },
                  {
                    label: 'HTTP',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/services/http',
                    collapsible: true,
                    items: [
                      {
                        label: 'http.get()',
                        contentSite: 'atlas-app-services',
                        url: '/docs/atlas/app-services/services/http-actions/http.get',
                      },
                      {
                        label: 'http.post()',
                        contentSite: 'atlas-app-services',
                        url: '/docs/atlas/app-services/services/http-actions/http.post',
                      },
                      {
                        label: 'http.put()',
                        contentSite: 'atlas-app-services',
                        url: '/docs/atlas/app-services/services/http-actions/http.put',
                      },
                      {
                        label: 'http.patch()',
                        contentSite: 'atlas-app-services',
                        url: '/docs/atlas/app-services/services/http-actions/http.patch',
                      },
                      {
                        label: 'http.delete()',
                        contentSite: 'atlas-app-services',
                        url: '/docs/atlas/app-services/services/http-actions/http.delete',
                      },
                      {
                        label: 'http.head()',
                        contentSite: 'atlas-app-services',
                        url: '/docs/atlas/app-services/services/http-actions/http.head',
                      },
                    ],
                  },
                  {
                    label: 'Twilio',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/services/twilio',
                    collapsible: true,
                    items: [
                      {
                        label: 'Twilio.send()',
                        contentSite: 'atlas-app-services',
                        url: '/docs/atlas/app-services/services/twilio-actions/send',
                      },
                    ],
                  },
                  {
                    label: 'AWS',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/services/aws',
                  },
                  {
                    label: 'GitHub',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/services/github',
                  },
                  {
                    label: 'AWS S3 Service Snippets',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/services/snippets/s3',
                  },
                  {
                    label: 'GitHub Service Snippets',
                    contentSite: 'atlas-app-services',
                    url: '/docs/atlas/app-services/services/snippets/github',
                  },
                ],
              },
            ],
          },
          {
            label: 'Release Notes',
            contentSite: 'atlas-app-services',
            url: '/docs/atlas/app-services/release-notes/backend',
          },
          {
            label: 'Atlas Device SDK',
            contentSite: 'atlas-app-services',
            url: 'https://mongodb.com/docs/atlas/device-sdks/',
          },
          {
            label: 'Get Help',
            contentSite: 'atlas-app-services',
            url: '/docs/atlas/app-services/help',
          },
        ],
      },
    ],
  },
];
