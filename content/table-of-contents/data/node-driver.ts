import type { TocItem } from "../types";

const tocData: TocItem[] = [
  {
    label: "Node.js Driver",
    contentSite: "node",
    url: "/docs/drivers/node/:version/",
    collapsible: true,
    items: [
      {
        label: "Get Started",
        contentSite: "node",
        url: "/docs/drivers/node/:version/get-started",
      },
      {
        label: "Connect",
        contentSite: "node",
        url: "/docs/drivers/node/:version/connect",
        collapsible: true,
        items: [
          {
            label: "Create a MongoClient",
            contentSite: "node",
            url: "/docs/drivers/node/:version/connect/mongoclient",
          },
          {
            label: "Connection Options",
            contentSite: "node",
            url: "/docs/drivers/node/:version/connect/connection-options",
            collapsible: true,
            items: [
              {
                label: "Compress Network Traffic",
                contentSite: "node",
                url: "/docs/drivers/node/:version/connect/connection-options/network-compression",
              },
              {
                label: "Stable API",
                contentSite: "node",
                url: "/docs/drivers/node/:version/connect/connection-options/stable-api",
              },
              {
                label: "Limit Server Execution Time",
                contentSite: "node",
                url: "/docs/drivers/node/:version/connect/connection-options/csot",
              },
              {
                label: "Connection Pools",
                contentSite: "node",
                url: "/docs/drivers/node/:version/connect/connection-options/connection-pools",
              },
            ],
          },
          {
            label: "Choose a Connection Target",
            contentSite: "node",
            url: "/docs/drivers/node/:version/connect/connection-targets",
          },
          {
            label: "Connect with AWS Lambda",
            contentSite: "cloud-docs",
            url: "/docs/atlas/manage-connections-aws-lambda/",
          },
          {
            label: "Connection Troubleshooting",
            contentSite: "node",
            url: "/docs/drivers/node/:version/connect/connection-troubleshooting",
          },
        ],
      },
      {
        label: "Databases & Collections",
        contentSite: "node",
        url: "/docs/drivers/node/:version/databases-collections",
      },
      {
        label: "CRUD Operations",
        contentSite: "node",
        url: "/docs/drivers/node/:version/crud",
        collapsible: true,
        items: [
          {
            label: "Insert Documents",
            contentSite: "node",
            url: "/docs/drivers/node/:version/crud/insert",
          },
          {
            label: "Query Documents",
            contentSite: "node",
            url: "/docs/drivers/node/:version/crud/query",
            collapsible: true,
            items: [
              {
                label: "Find Documents",
                contentSite: "node",
                url: "/docs/drivers/node/:version/crud/query/retrieve",
              },
              {
                label: "Specify Documents to Return",
                contentSite: "node",
                url: "/docs/drivers/node/:version/crud/query/specify-documents-to-return",
              },
              {
                label: "Specify Fields to Return",
                contentSite: "node",
                url: "/docs/drivers/node/:version/crud/query/project",
              },
              {
                label: "Specify a Query",
                contentSite: "node",
                url: "/docs/drivers/node/:version/crud/query/query-document",
              },
              {
                label: "Count Documents",
                contentSite: "node",
                url: "/docs/drivers/node/:version/crud/query/count",
              },
              {
                label: "Distinct Field Values",
                contentSite: "node",
                url: "/docs/drivers/node/:version/crud/query/distinct",
              },
              {
                label: "Search Text",
                contentSite: "node",
                url: "/docs/drivers/node/:version/crud/query/text",
              },
              {
                label: "Access Data from a Cursor",
                contentSite: "node",
                url: "/docs/drivers/node/:version/crud/query/cursor",
              },
              {
                label: "Geospatial Queries",
                contentSite: "node",
                url: "/docs/drivers/node/:version/crud/query/geo",
              },
            ],
          },
          {
            label: "Update Documents",
            contentSite: "node",
            url: "/docs/drivers/node/:version/crud/update",
            collapsible: true,
            items: [
              {
                label: "Modify Documents",
                contentSite: "node",
                url: "/docs/drivers/node/:version/crud/update/modify",
              },
              {
                label: "Replace",
                contentSite: "node",
                url: "/docs/drivers/node/:version/crud/update/replace",
              },
              {
                label: "Update Arrays",
                contentSite: "node",
                url: "/docs/drivers/node/:version/crud/update/embedded-arrays",
              },
            ],
          },
          {
            label: "Delete Documents",
            contentSite: "node",
            url: "/docs/drivers/node/:version/crud/delete",
          },
          {
            label: "Bulk Write Operations",
            contentSite: "node",
            url: "/docs/drivers/node/:version/crud/bulk-write",
          },
          {
            label: "Compound Operations",
            contentSite: "node",
            url: "/docs/drivers/node/:version/crud/compound-operations",
          },
          {
            label: "Transactions",
            contentSite: "node",
            url: "/docs/drivers/node/:version/crud/transactions",
            collapsible: true,
            items: [
              {
                label: "Convenient Transaction API",
                contentSite: "node",
                url: "/docs/drivers/node/:version/crud/transactions/transaction-conv",
              },
              {
                label: "Core API",
                contentSite: "node",
                url: "/docs/drivers/node/:version/crud/transactions/transaction-core",
              },
            ],
          },
          {
            label: "Configure CRUD Operations",
            contentSite: "node",
            url: "/docs/drivers/node/:version/crud/configure",
          },
          {
            label: "Generate Custom _id Values",
            contentSite: "node",
            url: "/docs/drivers/node/:version/crud/pkFactory",
          },
          {
            label: "Store Large Files",
            contentSite: "node",
            url: "/docs/drivers/node/:version/crud/gridfs",
          },
        ],
      },
      {
        label: "Promises",
        contentSite: "node",
        url: "/docs/drivers/node/:version/promises",
      },
      {
        label: "Aggregation",
        contentSite: "node",
        url: "/docs/drivers/node/:version/aggregation",
        collapsible: true,
        items: [
          {
            label: "Pipeline Stages",
            contentSite: "node",
            url: "/docs/drivers/node/:version/aggregation/pipeline-stages",
          },
        ],
      },
      {
        label: "Data Formats",
        contentSite: "node",
        url: "/docs/drivers/node/:version/data-formats",
        collapsible: true,
        items: [
          {
            label: "BSON",
            contentSite: "node",
            url: "/docs/drivers/node/:version/data-formats/bson",
          },
          {
            label: "Extended JSON",
            contentSite: "node",
            url: "/docs/drivers/node/:version/data-formats/extended-json",
          },
          {
            label: "Time Series Data",
            contentSite: "node",
            url: "/docs/drivers/node/:version/data-formats/time-series",
          },
        ],
      },
      {
        label: "Indexes",
        contentSite: "node",
        url: "/docs/drivers/node/:version/indexes",
      },
      {
        label: "Run a Database Command",
        contentSite: "node",
        url: "/docs/drivers/node/:version/run-command",
      },
      {
        label: "Atlas Search",
        contentSite: "node",
        url: "/docs/drivers/node/:version/atlas-search",
      },
      {
        label: "Atlas Vector Search",
        contentSite: "node",
        url: "/docs/drivers/node/:version/atlas-vector-search",
      },
      {
        label: "Monitoring and Logging",
        contentSite: "node",
        url: "/docs/drivers/node/:version/monitoring-and-logging",
        collapsible: true,
        items: [
          {
            label: "Monitoring",
            contentSite: "node",
            url: "/docs/drivers/node/:version/monitoring-and-logging/monitoring",
          },
          {
            label: "Logging",
            contentSite: "node",
            url: "/docs/drivers/node/:version/monitoring-and-logging/logging",
          },
          {
            label: "Change Streams",
            contentSite: "node",
            url: "/docs/drivers/node/:version/monitoring-and-logging/change-streams",
          },
        ],
      },
      {
        label: "Security",
        contentSite: "node",
        url: "/docs/drivers/node/:version/security",
        collapsible: true,
        items: [
          {
            label: "Authentication",
            contentSite: "node",
            url: "/docs/drivers/node/:version/security/authentication",
            collapsible: true,
            items: [
              {
                label: "SCRAM",
                contentSite: "node",
                url: "/docs/drivers/node/:version/security/authentication/scram",
              },
              {
                label: "X.509",
                contentSite: "node",
                url: "/docs/drivers/node/:version/security/authentication/x509",
              },
              {
                label: "AWS IAM",
                contentSite: "node",
                url: "/docs/drivers/node/:version/security/authentication/aws-iam",
              },
              {
                label: "OIDC",
                contentSite: "node",
                url: "/docs/drivers/node/:version/security/authentication/oidc",
              },
              {
                label: "LDAP (PLAIN)",
                contentSite: "node",
                url: "/docs/drivers/node/:version/security/authentication/ldap",
              },
              {
                label: "Kerberos (GSSAPI)",
                contentSite: "node",
                url: "/docs/drivers/node/:version/security/authentication/kerberos",
              },
            ],
          },
          {
            label: "In-Use Encryption",
            contentSite: "node",
            url: "/docs/drivers/node/:version/security/encrypt-fields",
          },
          {
            label: "TLS Security Protocol",
            contentSite: "node",
            url: "/docs/drivers/node/:version/security/tls",
          },
          {
            label: "SOCKS Proxy",
            contentSite: "node",
            url: "/docs/drivers/node/:version/security/socks",
          },
        ],
      },
      {
        label: "Reference",
        contentSite: "node",
        url: "/docs/drivers/node/:version/reference",
        collapsible: true,
        items: [
          {
            label: "Release Notes",
            contentSite: "node",
            url: "/docs/drivers/node/:version/reference/release-notes",
          },
          {
            label: "Compatibility",
            contentSite: "node",
            url: "/docs/drivers/node/:version/reference/compatibility",
          },
          {
            label: "Upgrade Guides",
            contentSite: "node",
            url: "/docs/drivers/node/:version/reference/upgrade",
          },
          {
            label: "Quick Reference",
            contentSite: "node",
            url: "/docs/drivers/node/:version/reference/quick-reference",
          },
        ],
      },
      {
        label: "TypeScript",
        contentSite: "node",
        url: "/docs/drivers/node/:version/typescript",
      },
      {
        label: "API Documentation",
        isExternal: true,
        url: "https://mongodb.github.io/node-mongodb-native/6.17",
      },
      {
        label: "Issues & Help",
        contentSite: "node",
        url: "/docs/drivers/node/:version/issues-and-help",
      },
      {
        label: "View the Source",
        isExternal: true,
        url: "https://github.com/mongodb/node-mongodb-native/",
      },
    ],
  },
];

export default tocData;
