import type { TocItem } from '../types';

const tocData: TocItem[] = [
  {
    label: 'Overview',
    contentSite: 'cloud-docs',
    url: "/docs/atlas/data-federation/adf-overview/overview",
    collapsible: true,
    items: [
      {
        label: "Key Concepts",
        contentSite: "cloud-docs",
        url: "/docs/atlas/data-federation/adf-overview/key-concepts",
      },
      {
        label: "Architecture",
        contentSite: "cloud-docs",
        url: "/docs/atlas/data-federation/adf-overview/architecture",
      },
      {
        label: "Query Performance Optimization",
        contentSite: "cloud-docs",
        url: "/docs/atlas/data-federation/adf-overview/query-performance-optimization",
      },
      {
        label: "Supported Sources and Providers",
        contentSite: "cloud-docs",
        url: "/docs/atlas/data-federation/adf-overview/supported-sources-and-providers",
      },
      {
        label: "Supported Regions",
        contentSite: "cloud-docs",
        url: "/docs/atlas/data-federation/adf-overview/regions",
      },
    ],
  },
  {
    label: 'Get Started',
    contentSite: 'cloud-docs',
    url: '/docs/atlas/data-federation/tutorial/getting-started',
    collapsible: true,
    items: [
      {
        label: 'Deploy',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/data-federation/tutorial/deploy',
      },
      {
        label: 'Configure a Connection',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/data-federation/tutorial/configure-connection',
        collapsible: true,
        items: [
          {
            label: 'IP Access Lists',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/data-federation/tutorial/add-ip-address',
          },
          {
            label: 'Database Users',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/data-federation/tutorial/create-mongodb-user',
          },
          {
            label: 'X.509 Authentication',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/data-federation/tutorial/advanced-security-options/x509-authentication',
          },
          {
            label: 'AWS IAM',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/security/aws-iam-authentication',
          },
        ],
      },
      {
        label: 'Connect',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/data-federation/tutorial/connect',
      },
      {
        label: 'Run Queries',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/data-federation/tutorial/run-queries',
      },
    ],
  },
  { 
    label: "Advanced Security Options ",
    contentSite: "cloud-docs",
    url: "/docs/atlas/data-federation/advanced-security-options",
    collapsible: true,
    items: [
      {
        label: "Private Endpoints",
        contentSite: "cloud-docs",
        url: "docs/atlas/data-federation/tutorial/config-private-endpoint",
      },
      {
        label: "Authentication Methods",
        contentSite: "cloud-docs",
        url: "/docs/atlas/data-federation/tutorial/adf-authentication-methods",
      },
      {
        label: "Advanced User Configuration",
        contentSite: "cloud-docs",
        url: "/docs/atlas/data-federation/tutorial/advanced-security-options/advanced-db-user-config/",
      },
    ]
  },
  {
    label: 'Define Data Stores',
    contentSite: 'cloud-docs',
    url: '/docs/atlas/data-federation/config/config-data-stores',
    collapsible: true,
    items: [
      {
        label: "Deploy a Data Store",
        contentSite: "cloud-docs",
        url: "/docs/atlas/data-federation/deployment/deploy-adf",
      },
      {
        label: "Define a Configuration File",
        contentSite: "cloud-docs",
        url: "/docs/atlas/data-federation/config/adf-config-file-formats",
      },
      {
        label: 'Use Partition Attributes',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/data-federation/supported-unsupported/supported-partition-attributes',
      },
      {
        label: 'Supported Data Formats',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/data-federation/supported-unsupported/supported-data-formats',
        collapsible: true,
        items: [
            {
              label: 'Parquet',
              contentSite: 'cloud-docs',
              url: '/docs/atlas/data-federation/supported-unsupported/data-formats/parquet-data-files',
            },
            {
              label: 'CSV and TSV',
              contentSite: 'cloud-docs',
              url: '/docs/atlas/data-federation/supported-unsupported/data-formats/csv-tsv-data-files',
            },
            ],
          },
      {
        label: 'Optimize Queries',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/data-federation/admin/optimize-query-performance',
      },
      {
        label: 'Generate Collections',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/data-federation/config/adfa-generate-wildcard-collection',
      },
      {
        label: "File Path Synthax",
        contentSite: "cloud-docs",
        url: "/docs/atlas/data-federation/config/path-syntax-examples",
      },
      {
        label: "AWS S3 Encryption",
        contentSite: "cloud-docs",
        url: "/docs/atlas/data-federation/supported-unsupported/adf-encryption",
      },
      {
        label: "AWS S3 Limitations",
        contentSite: "cloud-docs",
        url: "/docs/atlas/data-federation/supported-unsupported/adf-limitations",
      },
    ],
  },
  {
    label: 'Administration',
    contentSite: 'cloud-docs',
    url: '/docs/atlas/data-federation/administration',
    collapsible: true,
    items: [
      {
        label: 'Manage Configuration',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/data-federation/admin/manage-federated-database',
        collapsible: true,
        items: [
          {
            label: 'Create Stores',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/data-federation/admin/cli/stores/create-store',
          },
          {
            label: 'List Stores',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/data-federation/admin/cli/stores/list-stores',
          },
          {
            label: 'Add Collections & Views',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/data-federation/admin/cli/collections/create-collections-views',
          },
          {
            label: 'Rename Collections',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/data-federation/admin/cli/collections/rename-collection',
          },
          {
            label: 'Drop Collections & Views',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/data-federation/admin/cli/collections/drop-collections-views',
          },
          {
            label: 'Drop Databases',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/data-federation/admin/cli/database/drop-database',
          },
          {
            label: 'Drop Stores',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/data-federation/admin/cli/stores/drop-store',
          },
        ],
      },
      {
        label: 'Manage Namespaces',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/data-federation/admin/manage-namespace-catalog-cli',
        collapsible: true,
        items: [
          {
            label: 'Update Namespaces',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/data-federation/admin/namespace/updatecatalog',
          },
        ],
      },
      {
        label: 'Manage Private Endpoints',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/data-federation/admin/manage-private-endpoint',
        collapsible: true,
        items: [
          {
            label: 'Set Up',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/data-federation/tutorial/config-private-endpoint',
          },
          {
            label: 'View',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/data-federation/admin/view-private-endpoints',
          },
          {
            label: 'Edit',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/data-federation/admin/edit-private-endpoint',
          },
          {
            label: 'Delete',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/data-federation/admin/delete-private-endpoint',
          },
        ],
      },
      {
        label: 'Update Region',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/data-federation/admin/update-region',
      },
      {
        label: 'Manage Query Limits',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/data-federation/query/manage-query-limits',
      },
      {
        label: 'Determine Query Status',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/data-federation/admin/determine-query-status',
      },
      {
        label: 'Terminate Query',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/data-federation/admin/terminate-running-query',
      },
      {
        label: 'Retrieve Query History',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/data-federation/query/view-query-history',
      },
      {
        label: 'Download Query Logs',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/data-federation/query/download-query-logs',
      },
    ],
  },
  {
    label: 'MQL',
    contentSite: 'cloud-docs',
    url: '/docs/atlas/data-federation/query/query-federated-database',
  },
  {
    label: 'SQL',
    contentSite: 'cloud-docs',
    url: 'https://www.mongodb.com/docs/atlas/data-federation/query/connect-with-sql-overview/',
  },
  {
    label: 'Data Federation Tutorials',
    contentSite: 'cloud-docs',
    url: '/docs/atlas/data-federation/tutorials',
  },
  {
    label: 'Features',
    contentSite: 'cloud-docs',
    url: '/docs/atlas/data-federation/supported-unsupported',
    collapsible: true,
    items: [
      {
        label: 'MongoDB Commands',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/data-federation/supported-unsupported/mql-support',
        collapsible: true,
        items: [
          {
            label: 'Administration',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/data-federation/supported-unsupported/administration-commands',
          },
          {
            label: 'Diagnostic',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/data-federation/supported-unsupported/diagnostic-commands',
          },
          {
            label: 'Operations',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/data-federation/supported-unsupported/query-write-op-commands',
          },
          {
            label: 'Role Management',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/data-federation/supported-unsupported/role-management-commands',
          },
          {
            label: 'Storage Configuration',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/data-federation/supported-unsupported/storage-config-commands',
          },
        ],
      },
      {
        label: 'Aggregation Pipelines',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/data-federation/supported-unsupported/supported-aggregation',
        collapsible: true,
        items: [
          {
            label: '$collStats',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/data-federation/supported-unsupported/pipeline/collstats',
          },
          {
            label: '$lookup',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/data-federation/supported-unsupported/pipeline/lookup-stage',
          },
          {
            label: '$merge',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/data-federation/supported-unsupported/pipeline/merge',
          },
          {
            label: '$out',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/data-federation/supported-unsupported/pipeline/out',
          },
          {
            label: '$sql',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/data-federation/supported-unsupported/pipeline/sql',
          },
        ],
      },
    ],
  },
  {
    label: 'Limitations',
    contentSite: 'cloud-docs',
    url: '/docs/atlas/data-federation/supported-unsupported/limitations',
  },
];

export default tocData;
