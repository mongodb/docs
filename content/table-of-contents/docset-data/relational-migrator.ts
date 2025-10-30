import type { TocItem } from '../types';

const tocData: TocItem[] = [
  {
    label: 'Relational Migrator',
    contentSite: 'docs-relational-migrator',
    url: '/docs/relational-migrator/',
    group: true,
    items: [
      {
        label: 'Overview',
        contentSite: 'docs-relational-migrator',
        url: '/docs/relational-migrator/getting-started',
        collapsible: true,
        items: [
          {
            label: 'UI Overview',
            contentSite: 'docs-relational-migrator',
            url: '/docs/relational-migrator/getting-started/overview',
          },
          {
            label: 'Create & Manage Projects',
            contentSite: 'docs-relational-migrator',
            url: '/docs/relational-migrator/projects',
            collapsible: true,
            items: [
              {
                label: 'Create with Live Database',
                contentSite: 'docs-relational-migrator',
                url: '/docs/relational-migrator/projects/create-project-live-connection',
              },
              {
                label: 'Manage Projects',
                contentSite: 'docs-relational-migrator',
                url: '/docs/relational-migrator/projects/manage-projects',
              },
              {
                label: 'Project Settings',
                contentSite: 'docs-relational-migrator',
                url: '/docs/relational-migrator/projects/configure-settings',
              },
            ],
          },
        ],
      },
      {
        label: 'Installation',
        contentSite: 'docs-relational-migrator',
        url: '/docs/relational-migrator/installation',
        collapsible: true,
        items: [
          {
            label: 'System Requirements',
            contentSite: 'docs-relational-migrator',
            url: '/docs/relational-migrator/installation/system-requirements',
          },
          {
            label: 'Development Installation',
            contentSite: 'docs-relational-migrator',
            url: '/docs/relational-migrator/installation/install-on-a-local-machine',
            collapsible: true,
            items: [
              {
                label: 'Windows',
                contentSite: 'docs-relational-migrator',
                url: '/docs/relational-migrator/installation/install-on-a-local-machine/install-windows',
              },
              {
                label: 'MacOS',
                contentSite: 'docs-relational-migrator',
                url: '/docs/relational-migrator/installation/install-on-a-local-machine/install-mac',
              },
              {
                label: 'Linux',
                contentSite: 'docs-relational-migrator',
                url: '/docs/relational-migrator/installation/install-on-a-local-machine/linux',
                collapsible: true,
                items: [
                  {
                    label: 'Ubuntu',
                    contentSite: 'docs-relational-migrator',
                    url: '/docs/relational-migrator/installation/install-on-a-local-machine/install-ubuntu',
                  },
                  {
                    label: 'RHEL',
                    contentSite: 'docs-relational-migrator',
                    url: '/docs/relational-migrator/installation/install-on-a-local-machine/install-rhel',
                  },
                ],
              },
              {
                label: 'Docker Image',
                contentSite: 'docs-relational-migrator',
                url: '/docs/relational-migrator/installation/install-with-docker',
              },
            ],
          },
          {
            label: 'Production Installation',
            contentSite: 'docs-relational-migrator',
            url: '/docs/relational-migrator/installation/install-on-an-unattended-server',
            collapsible: true,
            items: [
              {
                label: 'Windows Server',
                contentSite: 'docs-relational-migrator',
                url: '/docs/relational-migrator/installation/install-on-an-unattended-server/windows-server-installation',
              },
              {
                label: 'RHEL/CentOS Linux',
                contentSite: 'docs-relational-migrator',
                url: '/docs/relational-migrator/installation/install-on-an-unattended-server/rhel-centos-server-installation',
              },
              {
                label: 'Debian Linux',
                contentSite: 'docs-relational-migrator',
                url: '/docs/relational-migrator/installation/install-on-an-unattended-server/debian-server-installation',
              },
            ],
          },
          {
            label: 'Application Settings',
            contentSite: 'docs-relational-migrator',
            url: '/docs/relational-migrator/installation/application-settings',
          },
        ],
      },
      {
        label: 'Connect to Databases',
        contentSite: 'docs-relational-migrator',
        url: '/docs/relational-migrator/database-connections',
        collapsible: true,
        items: [
          {
            label: 'MySQL',
            contentSite: 'docs-relational-migrator',
            url: '/docs/relational-migrator/database-connections/mysql',
            collapsible: true,
            items: [
              {
                label: 'Configure MySQL',
                contentSite: 'docs-relational-migrator',
                url: '/docs/relational-migrator/jobs/prerequisites/my-sql',
              },
            ],
          },
          {
            label: 'Oracle',
            contentSite: 'docs-relational-migrator',
            url: '/docs/relational-migrator/database-connections/oracle',
            collapsible: true,
            items: [
              {
                label: 'Configure Oracle',
                contentSite: 'docs-relational-migrator',
                url: '/docs/relational-migrator/jobs/prerequisites/oracle',
              },
            ],
          },
          {
            label: 'PostgreSQL',
            contentSite: 'docs-relational-migrator',
            url: '/docs/relational-migrator/database-connections/postgres',
            collapsible: true,
            items: [
              {
                label: 'Configure PostgreSQL',
                contentSite: 'docs-relational-migrator',
                url: '/docs/relational-migrator/jobs/prerequisites/postgres',
              },
            ],
          },
          {
            label: 'SQL Server',
            contentSite: 'docs-relational-migrator',
            url: '/docs/relational-migrator/database-connections/sql-server',
            collapsible: true,
            items: [
              {
                label: 'Configure SQL Server',
                contentSite: 'docs-relational-migrator',
                url: '/docs/relational-migrator/jobs/prerequisites/sql-server',
              },
            ],
          },
          {
            label: 'Sybase',
            contentSite: 'docs-relational-migrator',
            url: '/docs/relational-migrator/database-connections/sybase',
            collapsible: true,
            items: [
              {
                label: 'Configure Sybase',
                contentSite: 'docs-relational-migrator',
                url: '/docs/relational-migrator/jobs/prerequisites/sybase',
              },
            ],
          },
          {
            label: 'DB2',
            contentSite: 'docs-relational-migrator',
            url: '/docs/relational-migrator/database-connections/db2',
            collapsible: true,
            items: [
              {
                label: 'Configure DB2',
                contentSite: 'docs-relational-migrator',
                url: '/docs/relational-migrator/jobs/prerequisites/db2',
              },
            ],
          },
          {
            label: 'MongoDB',
            contentSite: 'docs-relational-migrator',
            url: '/docs/relational-migrator/database-connections/mongodb',
            collapsible: true,
            items: [
              {
                label: 'Create MongoDB User',
                contentSite: 'docs-relational-migrator',
                url: '/docs/relational-migrator/jobs/prerequisites/create-mongodb-user',
              },
            ],
          },
          {
            label: 'Use Without DB Connection',
            contentSite: 'docs-relational-migrator',
            url: '/docs/relational-migrator/database-connections/migrator-without-live-connection',
            collapsible: true,
            items: [
              {
                label: 'Load a DDL File',
                contentSite: 'docs-relational-migrator',
                url: '/docs/relational-migrator/database-connections/create-project-loading-schema-files',
              },
              {
                label: 'Use Sample Schema',
                contentSite: 'docs-relational-migrator',
                url: '/docs/relational-migrator/database-connections/create-project-sample-schema',
              },
            ],
          },
          {
            label: 'Manage Connections',
            contentSite: 'docs-relational-migrator',
            url: '/docs/relational-migrator/database-connections/manage-database-connections',
          },
        ],
      },
      {
        label: 'Pre-Migration Analysis',
        contentSite: 'docs-relational-migrator',
        url: '/docs/relational-migrator/app-analysis',
        collapsible: true,
        items: [
          {
            label: 'Run Pre-Migration Analysis',
            contentSite: 'docs-relational-migrator',
            url: '/docs/relational-migrator/app-analysis/run-analysis',
          },
          {
            label: 'Analysis Report',
            contentSite: 'docs-relational-migrator',
            url: '/docs/relational-migrator/app-analysis/analysis-report',
          },
          {
            label: 'Risk Reference',
            contentSite: 'docs-relational-migrator',
            url: '/docs/relational-migrator/app-analysis/risk-reference',
          },
        ],
      },
      {
        label: 'Data Modeling',
        contentSite: 'docs-relational-migrator',
        url: '/docs/relational-migrator/mapping-rules/introduction',
        collapsible: true,
        items: [
          {
            label: 'Manage the Relational Model',
            contentSite: 'docs-relational-migrator',
            url: '/docs/relational-migrator/projects/manage-relational-connection',
          },
          {
            label: 'Schema Mapping',
            contentSite: 'docs-relational-migrator',
            url: '/docs/relational-migrator/mapping-rules/schema-mapping',
          },
          {
            label: 'Create Rules',
            contentSite: 'docs-relational-migrator',
            url: '/docs/relational-migrator/mapping-rules/create-rules',
          },
          {
            label: 'Use Suggested Mappings',
            contentSite: 'docs-relational-migrator',
            url: '/docs/relational-migrator/mapping-rules/new-rules-suggested-mappings',
          },
          {
            label: 'Table Filters',
            contentSite: 'docs-relational-migrator',
            url: '/docs/relational-migrator/table-filters',
            collapsible: true,
            items: [
              {
                label: 'Apply',
                contentSite: 'docs-relational-migrator',
                url: '/docs/relational-migrator/table-filters/apply-table-filters',
              },
              {
                label: 'Edit',
                contentSite: 'docs-relational-migrator',
                url: '/docs/relational-migrator/table-filters/edit-table-filters',
              },
              {
                label: 'Delete',
                contentSite: 'docs-relational-migrator',
                url: '/docs/relational-migrator/table-filters/delete-table-filters',
              },
            ],
          },
          {
            label: 'Rule Options',
            contentSite: 'docs-relational-migrator',
            url: '/docs/relational-migrator/mapping-rules/mapping-rule-options/introduction',
            collapsible: true,
            items: [
              {
                label: 'New Documents',
                contentSite: 'docs-relational-migrator',
                url: '/docs/relational-migrator/mapping-rules/mapping-rule-options/new-documents',
              },
              {
                label: 'Embedded Array',
                contentSite: 'docs-relational-migrator',
                url: '/docs/relational-migrator/mapping-rules/mapping-rule-options/embedded-array',
              },
              {
                label: 'Embedded Documents',
                contentSite: 'docs-relational-migrator',
                url: '/docs/relational-migrator/mapping-rules/mapping-rule-options/embedded-documents',
              },
              {
                label: 'Mapping Rule Filters',
                contentSite: 'docs-relational-migrator',
                url: '/docs/relational-migrator/mapping-rules/mapping-rule-options/mapping-rule-filters',
              },
              {
                label: 'Rename Collection',
                contentSite: 'docs-relational-migrator',
                url: '/docs/relational-migrator/mapping-rules/mapping-rule-options/rename-collection',
              },
            ],
          },
          {
            label: 'Custom Fields',
            contentSite: 'docs-relational-migrator',
            url: '/docs/relational-migrator/mapping-rules/fields/field-customizations',
            collapsible: true,
            items: [
              {
                label: 'Data Type Conversion',
                contentSite: 'docs-relational-migrator',
                url: '/docs/relational-migrator/mapping-rules/fields/data-type-conversion-guide',
              },
              {
                label: 'Calculated Fields',
                contentSite: 'docs-relational-migrator',
                url: '/docs/relational-migrator/mapping-rules/fields/calculated-fields',
                collapsible: true,
                items: [
                  {
                    label: 'Add',
                    contentSite: 'docs-relational-migrator',
                    url: '/docs/relational-migrator/mapping-rules/fields/calculated-fields/add-calculated-fields',
                  },
                  {
                    label: 'View',
                    contentSite: 'docs-relational-migrator',
                    url: '/docs/relational-migrator/mapping-rules/fields/calculated-fields/view-calculated-fields',
                  },
                  {
                    label: 'Edit',
                    contentSite: 'docs-relational-migrator',
                    url: '/docs/relational-migrator/mapping-rules/fields/calculated-fields/edit-calculated-fields',
                  },
                  {
                    label: 'Delete',
                    contentSite: 'docs-relational-migrator',
                    url: '/docs/relational-migrator/mapping-rules/fields/calculated-fields/delete-calculated-fields',
                  },
                ],
              },
              {
                label: 'Customize ID Fields',
                contentSite: 'docs-relational-migrator',
                url: '/docs/relational-migrator/mapping-rules/fields/calculated-fields/customized-id-fields',
              },
            ],
          },
          {
            label: 'Manage Rules',
            contentSite: 'docs-relational-migrator',
            url: '/docs/relational-migrator/mapping-rules/manage-rules',
            collapsible: true,
            items: [
              {
                label: 'View Rules',
                contentSite: 'docs-relational-migrator',
                url: '/docs/relational-migrator/mapping-rules/view-rules',
              },
              {
                label: 'Edit Rules',
                contentSite: 'docs-relational-migrator',
                url: '/docs/relational-migrator/mapping-rules/edit-rules',
              },
              {
                label: 'Delete Rules',
                contentSite: 'docs-relational-migrator',
                url: '/docs/relational-migrator/mapping-rules/delete-rules',
              },
            ],
          },
          {
            label: 'Synthetic Foreign Keys',
            contentSite: 'docs-relational-migrator',
            url: '/docs/relational-migrator/mapping-rules/synthetic-foreign-key/synthetic-foreign-keys',
            collapsible: true,
            items: [
              {
                label: 'Add a Key',
                contentSite: 'docs-relational-migrator',
                url: '/docs/relational-migrator/mapping-rules/synthetic-foreign-key/add-foreign-key',
              },
            ],
          },
          {
            label: 'Diagrams & Entities',
            contentSite: 'docs-relational-migrator',
            url: '/docs/relational-migrator/diagrams',
            collapsible: true,
            items: [
              {
                label: 'Interpret Diagrams',
                contentSite: 'docs-relational-migrator',
                url: '/docs/relational-migrator/diagrams/understand-diagrams',
              },
              {
                label: 'Manage Diagrams',
                contentSite: 'docs-relational-migrator',
                url: '/docs/relational-migrator/diagrams/manage-diagrams',
                collapsible: true,
                items: [
                  {
                    label: 'Create',
                    contentSite: 'docs-relational-migrator',
                    url: '/docs/relational-migrator/diagrams/manage-diagrams/create-diagrams',
                  },
                  {
                    label: 'Clone',
                    contentSite: 'docs-relational-migrator',
                    url: '/docs/relational-migrator/diagrams/manage-diagrams/clone-diagrams',
                  },
                  {
                    label: 'Rename',
                    contentSite: 'docs-relational-migrator',
                    url: '/docs/relational-migrator/diagrams/manage-diagrams/rename-diagrams',
                  },
                  {
                    label: 'Delete',
                    contentSite: 'docs-relational-migrator',
                    url: '/docs/relational-migrator/diagrams/manage-diagrams/delete-diagrams',
                  },
                ],
              },
              {
                label: 'Navigate Diagrams',
                contentSite: 'docs-relational-migrator',
                url: '/docs/relational-migrator/diagrams/navigate-diagrams',
                collapsible: true,
                items: [
                  {
                    label: 'Apply a Layout',
                    contentSite: 'docs-relational-migrator',
                    url: '/docs/relational-migrator/diagrams/navigate-diagrams/apply-layout',
                  },
                ],
              },
              {
                label: 'Manage Entities',
                contentSite: 'docs-relational-migrator',
                url: '/docs/relational-migrator/diagrams/navigate-diagrams/working-with-entities',
                collapsible: true,
                items: [
                  {
                    label: 'Select',
                    contentSite: 'docs-relational-migrator',
                    url: '/docs/relational-migrator/diagrams/navigate-diagrams/working-with-entities/select-entities',
                  },
                  {
                    label: 'Move',
                    contentSite: 'docs-relational-migrator',
                    url: '/docs/relational-migrator/diagrams/navigate-diagrams/working-with-entities/move-entities',
                  },
                  {
                    label: 'Copy',
                    contentSite: 'docs-relational-migrator',
                    url: '/docs/relational-migrator/diagrams/navigate-diagrams/working-with-entities/copy-entities',
                  },
                  {
                    label: 'Toggle Visibility',
                    contentSite: 'docs-relational-migrator',
                    url: '/docs/relational-migrator/diagrams/navigate-diagrams/working-with-entities/hide-entities',
                  },
                  {
                    label: 'Delete',
                    contentSite: 'docs-relational-migrator',
                    url: '/docs/relational-migrator/diagrams/navigate-diagrams/working-with-entities/delete-entities',
                  },
                ],
              },
            ],
          },
          {
            label: 'Example: Insurance Data Models',
            contentSite: 'docs-relational-migrator',
            url: '/docs/relational-migrator/mapping-rules/example-insurance-data',
            collapsible: true,
            items: [
              {
                label: 'Connect to Relational Migrator',
                contentSite: 'docs-relational-migrator',
                url: '/docs/relational-migrator/mapping-rules/example-insurance-data/connect',
              },
              {
                label: 'Refactor the Party Domain',
                contentSite: 'docs-relational-migrator',
                url: '/docs/relational-migrator/mapping-rules/example-insurance-data/refactor-party-domain/',
              },
              {
                label: 'Refactor the Policy Domain',
                contentSite: 'docs-relational-migrator',
                url: '/docs/relational-migrator/mapping-rules/example-insurance-data/refactor-policy-domain/',
              },
              {
                label: 'Refactor the Claim Domain',
                contentSite: 'docs-relational-migrator',
                url: '/docs/relational-migrator/mapping-rules/example-insurance-data/refactor-claim-domain/',
              },
              {
                label: 'Refactor the Litigation Domain',
                contentSite: 'docs-relational-migrator',
                url: '/docs/relational-migrator/mapping-rules/example-insurance-data/refactor-litigation-domain/',
              },
              {
                label: 'Migrate Your Data',
                contentSite: 'docs-relational-migrator',
                url: '/docs/relational-migrator/mapping-rules/example-insurance-data/migrate-data/',
              },
            ],
          },
        ],
      },
      {
        label: 'Data Migration',
        contentSite: 'docs-relational-migrator',
        url: '/docs/relational-migrator/jobs/sync-jobs',
        collapsible: true,
        items: [
          {
            label: 'Create Job',
            contentSite: 'docs-relational-migrator',
            url: '/docs/relational-migrator/jobs/creating-jobs',
          },
          {
            label: 'Monitor',
            contentSite: 'docs-relational-migrator',
            url: '/docs/relational-migrator/jobs/monitoring-jobs',
          },
          {
            label: 'Stop',
            contentSite: 'docs-relational-migrator',
            url: '/docs/relational-migrator/jobs/stopping-jobs',
          },
          {
            label: 'Data Verification',
            contentSite: 'docs-relational-migrator',
            url: '/docs/relational-migrator/jobs/data-verification',
            collapsible: true,
            items: [
              {
                label: 'Enable & Debug',
                contentSite: 'docs-relational-migrator',
                url: '/docs/relational-migrator/jobs/data-verification/use-data-verification',
              },
            ],
          },
        ],
      },
      {
        label: 'Code Generation',
        contentSite: 'docs-relational-migrator',
        url: '/docs/relational-migrator/code-generation',
        collapsible: true,
        items: [
          {
            label: 'Generate App Code',
            contentSite: 'docs-relational-migrator',
            url: '/docs/relational-migrator/code-generation/generate-app-code',
            collapsible: true,
            items: [
              {
                label: 'Download All Code Files',
                contentSite: 'docs-relational-migrator',
                url: '/docs/relational-migrator/code-generation/generate-app-code/download-all-code-files',
              },
              {
                label: 'Download Single Code Files',
                contentSite: 'docs-relational-migrator',
                url: '/docs/relational-migrator/code-generation/generate-app-code/download-single-code-files',
              },
            ],
          },
        ],
      },
      {
        label: 'API & Developer Reference',
        contentSite: 'docs-relational-migrator',
        url: '/docs/relational-migrator/api-developer-reference',
        collapsible: true,
        items: [
          {
            label: 'REST API Documentation',
            contentSite: 'docs-relational-migrator',
            url: '/docs/relational-migrator/api-docs',
            collapsible: true,
            items: [
              {
                label: 'Endpoints',
                contentSite: 'docs-relational-migrator',
                url: '/docs/relational-migrator/api-docs/rest-api-spec',
              },
            ],
          },
          {
            label: 'File Locations',
            contentSite: 'docs-relational-migrator',
            url: '/docs/relational-migrator/installation/file-location',
          },
        ],
      },
      {
        label: 'Release Notes',
        contentSite: 'docs-relational-migrator',
        url: '/docs/relational-migrator/release-notes',
      },
    ],
  },
];

export default tocData;
