import { TocItem } from "../types";

const tocData: TocItem[] = [
  {
    label: "Data Federation Overview",
    contentSite: "cloud-docs",
    url: "/docs/atlas/data-federation/overview",
  },
  {
    label: "Get Started",
    contentSite: "cloud-docs",
    url: "/docs/atlas/data-federation/tutorial/getting-started",
    collapsible: true,
    items: [
      {
        label: "Deploy",
        contentSite: "cloud-docs",
        url: "/docs/atlas/data-federation/tutorial/deploy",
      },
      {
        label: "Configure a Connection",
        contentSite: "cloud-docs",
        url: "/docs/atlas/data-federation/tutorial/configure-connection",
        collapsible: true,
        items: [
          {
            label: "IP Access Lists",
            contentSite: "cloud-docs",
            url: "/docs/atlas/data-federation/tutorial/add-ip-address",
          },
          {
            label: "Database Users",
            contentSite: "cloud-docs",
            url: "/docs/atlas/data-federation/tutorial/create-mongodb-user",
          },
          {
            label: "X.509 Authentication",
            contentSite: "cloud-docs",
            url: "/docs/atlas/data-federation/tutorial/security-self-managed-x509",
          },
          {
            label: "AWS IAM",
            contentSite: "cloud-docs",
            url: "/docs/atlas/security/aws-iam-authentication",
          },
        ],
      },
      {
        label: "Connect",
        contentSite: "cloud-docs",
        url: "/docs/atlas/data-federation/tutorial/connect",
      },
      {
        label: "Run Queries",
        contentSite: "cloud-docs",
        url: "/docs/atlas/data-federation/tutorial/run-queries",
      },
    ],
  },
  {
    label: "Define Data Stores",
    contentSite: "cloud-docs",
    url: "/docs/atlas/data-federation/config/config-data-stores",
    collapsible: true,
    items: [
      {
        label: "AWS S3 Bucket",
        contentSite: "cloud-docs",
        url: "/docs/atlas/data-federation/config/config-aws-s3",
        collapsible: true,
        items: [
          {
            label: "Deploy",
            contentSite: "cloud-docs",
            url: "/docs/atlas/data-federation/deployment/deploy-s3",
          },
          {
            label: "Generate Collections",
            contentSite: "cloud-docs",
            url: "/docs/atlas/data-federation/config/aws-gen-wildcard-collections",
          },
          {
            label: "Define Path for S3 Data",
            contentSite: "cloud-docs",
            url: "/docs/atlas/data-federation/config/path-syntax-examples",
          },
          {
            label: "Optimize Queries",
            contentSite: "cloud-docs",
            url: "/docs/atlas/data-federation/admin/optimize-query-performance",
          },
          {
            label: "Configure S3 Encryption",
            contentSite: "cloud-docs",
            url: "/docs/atlas/data-federation/supported-unsupported/encryption",
          },
          {
            label: "Data Formats",
            contentSite: "cloud-docs",
            url: "/docs/atlas/data-federation/supported-unsupported/supported-data-formats",
            collapsible: true,
            items: [
              {
                label: "Parquet",
                contentSite: "cloud-docs",
                url: "/docs/atlas/data-federation/supported-unsupported/data-formats/parquet-data-files",
              },
              {
                label: "CSV and TSV",
                contentSite: "cloud-docs",
                url: "/docs/atlas/data-federation/supported-unsupported/data-formats/csv-tsv-data-files",
              },
            ],
          },
          {
            label: "Limitations",
            contentSite: "cloud-docs",
            url: "/docs/atlas/data-federation/supported-unsupported/aws-s3-limitations",
          },
        ],
      },
      {
        label: "Azure Blob Storage",
        contentSite: "cloud-docs",
        url: "/docs/atlas/data-federation/config/config-azure-blob",
        collapsible: true,
        items: [
          {
            label: "Deploy",
            contentSite: "cloud-docs",
            url: "/docs/atlas/data-federation/deployment/deploy-azure",
          },
        ],
      },
      {
        label: "Google Cloud Storage",
        contentSite: "cloud-docs",
        url: "/docs/atlas/data-federation/config/config-gcp-bucket",
        collapsible: true,
        items: [
          {
            label: "Deploy",
            contentSite: "cloud-docs",
            url: "/docs/atlas/data-federation/deployment/deploy-gcp",
          },
        ],
      },
      {
        label: "Atlas Cluster",
        contentSite: "cloud-docs",
        url: "/docs/atlas/data-federation/config/config-atlas-cluster",
        collapsible: true,
        items: [
          {
            label: "Deploy",
            contentSite: "cloud-docs",
            url: "/docs/atlas/data-federation/deployment/deploy-atlas",
          },
          {
            label: "Generate Collections",
            contentSite: "cloud-docs",
            url: "/docs/atlas/data-federation/config/atlas-gen-wildcard-collections",
          },
        ],
      },
      {
        label: "HTTP URL",
        contentSite: "cloud-docs",
        url: "/docs/atlas/data-federation/config/config-http-endpoint",
        collapsible: true,
        items: [
          {
            label: "Deploy",
            contentSite: "cloud-docs",
            url: "/docs/atlas/data-federation/deployment/deploy-http",
          },
        ],
      },
      {
        label: "Atlas Online Archive",
        contentSite: "cloud-docs",
        url: "/docs/atlas/data-federation/config/config-oa",
        collapsible: true,
        items: [
          {
            label: "Create from the UI",
            contentSite: "cloud-docs",
            url: "/docs/atlas/data-federation/deployment/deploy-oa",
          },
        ],
      },
      {
        label: "Use Partition Attributes",
        contentSite: "cloud-docs",
        url: "/docs/atlas/data-federation/supported-unsupported/supported-partition-attributes",
      },
    ],
  },
  {
    label: "Administration",
    contentSite: "cloud-docs",
    url: "/docs/atlas/data-federation/administration",
    collapsible: true,
    items: [
      {
        label: "Manage Configuration",
        contentSite: "cloud-docs",
        url: "/docs/atlas/data-federation/admin/manage-federated-database",
        collapsible: true,
        items: [
          {
            label: "Create Stores",
            contentSite: "cloud-docs",
            url: "/docs/atlas/data-federation/admin/cli/stores/create-store",
          },
          {
            label: "List Stores",
            contentSite: "cloud-docs",
            url: "/docs/atlas/data-federation/admin/cli/stores/list-stores",
          },
          {
            label: "Add Collections & Views",
            contentSite: "cloud-docs",
            url: "/docs/atlas/data-federation/admin/cli/collections/create-collections-views",
          },
          {
            label: "Rename Collections",
            contentSite: "cloud-docs",
            url: "/docs/atlas/data-federation/admin/cli/collections/rename-collection",
          },
          {
            label: "Drop Collections & Views",
            contentSite: "cloud-docs",
            url: "/docs/atlas/data-federation/admin/cli/collections/drop-collections-views",
          },
          {
            label: "Drop Databases",
            contentSite: "cloud-docs",
            url: "/docs/atlas/data-federation/admin/cli/database/drop-database",
          },
          {
            label: "Drop Stores",
            contentSite: "cloud-docs",
            url: "/docs/atlas/data-federation/admin/cli/stores/drop-store",
          },
        ],
      },
      {
        label: "Manage Namespaces",
        contentSite: "cloud-docs",
        url: "/docs/atlas/data-federation/admin/manage-namespace-catalog-cli",
        collapsible: true,
        items: [
          {
            label: "Update Namespaces",
            contentSite: "cloud-docs",
            url: "/docs/atlas/data-federation/admin/namespace/updatecatalog",
          },
        ],
      },
      {
        label: "Manage Private Endpoints",
        contentSite: "cloud-docs",
        url: "/docs/atlas/data-federation/admin/manage-private-endpoint",
        collapsible: true,
        items: [
          {
            label: "Set Up",
            contentSite: "cloud-docs",
            url: "/docs/atlas/data-federation/tutorial/config-private-endpoint",
          },
          {
            label: "View",
            contentSite: "cloud-docs",
            url: "/docs/atlas/data-federation/admin/view-private-endpoints",
          },
          {
            label: "Edit",
            contentSite: "cloud-docs",
            url: "/docs/atlas/data-federation/admin/edit-private-endpoint",
          },
          {
            label: "Delete",
            contentSite: "cloud-docs",
            url: "/docs/atlas/data-federation/admin/delete-private-endpoint",
          },
        ],
      },
      {
        label: "Update Region",
        contentSite: "cloud-docs",
        url: "/docs/atlas/data-federation/admin/update-region",
      },
      {
        label: "Manage Query Limits",
        contentSite: "cloud-docs",
        url: "/docs/atlas/data-federation/query/manage-query-limits",
      },
      {
        label: "Determine Query Status",
        contentSite: "cloud-docs",
        url: "/docs/atlas/data-federation/admin/determine-query-status",
      },
      {
        label: "Terminate Query",
        contentSite: "cloud-docs",
        url: "/docs/atlas/data-federation/admin/terminate-running-query",
      },
      {
        label: "Retrieve Query History",
        contentSite: "cloud-docs",
        url: "/docs/atlas/data-federation/query/view-query-history",
      },
      {
        label: "Download Query Logs",
        contentSite: "cloud-docs",
        url: "/docs/atlas/data-federation/query/download-query-logs",
      },
    ],
  },
  {
    label: "MQL",
    contentSite: "cloud-docs",
    url: "/docs/atlas/data-federation/query/query-federated-database",
  },
  {
    label: "SQL",
    contentSite: "cloud-docs",
    url: "/docs/atlas/data-federation/query/query-with-sql",
    collapsible: true,
    items: [
      {
        label: "Enable the Interface",
        contentSite: "cloud-docs",
        url: "/docs/atlas/data-federation/query/sql/getting-started",
        collapsible: true,
        items: [
          {
            label: "Quick Start",
            contentSite: "cloud-docs",
            url: "/docs/atlas/data-federation/query/sql/getting-started/get-started-quick",
          },
          {
            label: "Advanced Configuration",
            contentSite: "cloud-docs",
            url: "/docs/atlas/data-federation/query/sql/getting-started/get-started-advanced",
          },
        ],
      },
      {
        label: "Connect",
        contentSite: "cloud-docs",
        url: "/docs/atlas/data-federation/query/sql/connect",
        collapsible: true,
        items: [
          {
            label: "MongoDB Shell",
            contentSite: "cloud-docs",
            url: "/docs/atlas/data-federation/query/sql/shell/connect",
          },
          {
            label: "JDBC Driver",
            contentSite: "cloud-docs",
            url: "/docs/atlas/data-federation/query/sql/drivers/jdbc/connect",
          },
          {
            label: "ODBC",
            contentSite: "cloud-docs",
            url: "/docs/atlas/data-federation/query/sql/drivers/odbc/connect",
          },
          {
            label: "Tableau",
            contentSite: "cloud-docs",
            url: "/docs/atlas/data-federation/query/sql/tableau/connect",
          },
          {
            label: "Power BI",
            contentSite: "cloud-docs",
            url: "/docs/atlas/data-federation/query/sql/powerbi/connect",
          },
          {
            label: "Private Endpoint",
            contentSite: "cloud-docs",
            url: "/docs/atlas/data-federation/query/sql/private-endpoint/connect",
          },
        ],
      },
      {
        label: "Query",
        contentSite: "cloud-docs",
        url: "/docs/atlas/data-federation/query/sql/query-with-asql-statements",
      },
      {
        label: "Manage Schemas",
        contentSite: "cloud-docs",
        url: "/docs/atlas/data-federation/query/sql/schema-management",
        collapsible: true,
        items: [
          {
            label: "Create",
            contentSite: "cloud-docs",
            url: "/docs/atlas/data-federation/query/sql/schema/create",
          },
          {
            label: "View",
            contentSite: "cloud-docs",
            url: "/docs/atlas/data-federation/query/sql/schema/view",
          },
          {
            label: "Set",
            contentSite: "cloud-docs",
            url: "/docs/atlas/data-federation/query/sql/schema/set",
          },
          {
            label: "Schedule Updates",
            contentSite: "cloud-docs",
            url: "/docs/atlas/data-federation/query/sql/schema/schedule-updates",
          },
          {
            label: "Delete",
            contentSite: "cloud-docs",
            url: "/docs/atlas/data-federation/query/sql/schema/delete",
          },
        ],
      },
      {
        label: "SQL Tutorials",
        contentSite: "cloud-docs",
        url: "/docs/atlas/data-federation/query/sql/tutorials",
        collapsible: true,
        items: [
          {
            label: "Connect and Query",
            contentSite: "cloud-docs",
            url: "/docs/atlas/data-federation/query/sql/tutorials/connect-tutorial",
          },
        ],
      },
      {
        label: "Errors",
        contentSite: "cloud-docs",
        url: "/docs/atlas/data-federation/query/sql/errors",
      },
      {
        label: "Language Reference",
        contentSite: "cloud-docs",
        url: "/docs/atlas/data-federation/query/sql/language-reference",
      },
    ],
  },
  {
    label: "Data Federation Tutorials",
    contentSite: "cloud-docs",
    url: "/docs/atlas/data-federation/tutorials",
  },
  {
    label: "Features",
    contentSite: "cloud-docs",
    url: "/docs/atlas/data-federation/supported-unsupported",
    collapsible: true,
    items: [
      {
        label: "MongoDB Commands",
        contentSite: "cloud-docs",
        url: "/docs/atlas/data-federation/supported-unsupported/mql-support",
        collapsible: true,
        items: [
          {
            label: "Administration",
            contentSite: "cloud-docs",
            url: "/docs/atlas/data-federation/supported-unsupported/administration-commands",
          },
          {
            label: "Diagnostic",
            contentSite: "cloud-docs",
            url: "/docs/atlas/data-federation/supported-unsupported/diagnostic-commands",
          },
          {
            label: "Operations",
            contentSite: "cloud-docs",
            url: "/docs/atlas/data-federation/supported-unsupported/query-write-op-commands",
          },
          {
            label: "Role Management",
            contentSite: "cloud-docs",
            url: "/docs/atlas/data-federation/supported-unsupported/role-management-commands",
          },
          {
            label: "Storage Configuration",
            contentSite: "cloud-docs",
            url: "/docs/atlas/data-federation/supported-unsupported/storage-config-commands",
          },
        ],
      },
      {
        label: "Aggregation Pipelines",
        contentSite: "cloud-docs",
        url: "/docs/atlas/data-federation/supported-unsupported/supported-aggregation",
        collapsible: true,
        items: [
          {
            label: "$collStats",
            contentSite: "cloud-docs",
            url: "/docs/atlas/data-federation/supported-unsupported/pipeline/collstats",
          },
          {
            label: "$lookup",
            contentSite: "cloud-docs",
            url: "/docs/atlas/data-federation/supported-unsupported/pipeline/lookup-stage",
          },
          {
            label: "$merge",
            contentSite: "cloud-docs",
            url: "/docs/atlas/data-federation/supported-unsupported/pipeline/merge",
          },
          {
            label: "$out",
            contentSite: "cloud-docs",
            url: "/docs/atlas/data-federation/supported-unsupported/pipeline/out",
          },
          {
            label: "$sql",
            contentSite: "cloud-docs",
            url: "/docs/atlas/data-federation/supported-unsupported/pipeline/sql",
          },
        ],
      },
    ],
  },
  {
    label: "Limitations",
    contentSite: "cloud-docs",
    url: "/docs/atlas/data-federation/supported-unsupported/limitations",
  },
]

export default tocData;