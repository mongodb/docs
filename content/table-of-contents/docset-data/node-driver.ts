import type { TocItem } from "../types";
import docsVersions from "../version-arrays/drivers/node-versions";

const outdatedVersions = docsVersions.before("v6.15", {inclusive: true});

const tocData: TocItem[] = [
  {
    label: "Node.js Driver",
    contentSite: "node",
    group: true,
    versionDropdown: true,
    items: [
      {
        label: "Overview",
        contentSite: "node",
        url: "/docs/drivers/node/:version"
      },
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
            versions: { excludes: outdatedVersions },
          },
          {
            label: "Connection Guide",
            contentSite: "node",
            url: "/docs/drivers/node/:version/connect/connection",
            versions: { includes: outdatedVersions },
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
                versions: { excludes: outdatedVersions },
              },
            ]
          },
          {
            label: "Choose a Connection Target",
            contentSite: "node",
            url: "/docs/drivers/node/:version/connect/connection-targets",
            versions: { excludes: outdatedVersions },
          },
          {
            label: "Connect with AWS Lambda",
            contentSite: "node",
            url: "https://www.mongodb.com/docs/atlas/manage-connections-aws-lambda/",
          },
          {
            label: "Connection Troubleshooting",
            contentSite: "node",
            url: "/docs/drivers/node/:version/connect/connection-troubleshooting",
          },
          {
            label: "Multiple Connections Tutorial",
            contentSite: "node",
            url: "/docs/drivers/node/:version/connect/multiple-connections",
            versions: { excludes: [...outdatedVersions, "v6.16"] },
          },
        ]
      },
      {
        label: "Databases & Collections",
        contentSite: "node",
        url: "/docs/drivers/node/:version/databases-collections",
        versions: { excludes: outdatedVersions },
      },
      {
        label: "CRUD Operations",
        contentSite: "node",
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
                versions: { excludes: outdatedVersions },
              },
              {
                label: "Sort Results",
                contentSite: "node",
                url: "/docs/drivers/node/:version/crud/query/sort",
                versions: { includes: outdatedVersions },
              },
              {
                label: "Skip Returned Results",
                contentSite: "node",
                url: "/docs/drivers/node/:version/crud/query/skip",
                versions: { includes: outdatedVersions },
              },
              {
                label: "Limit Returned Results",
                contentSite: "node",
                url: "/docs/drivers/node/:version/crud/query/limit",
                versions: { includes: outdatedVersions },
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
                versions: { excludes: outdatedVersions },
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
                label: "Query Text",
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
            ]
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
            ]
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
            ]
          },
          {
            label: "Configure CRUD Operations",
            contentSite: "node",
            url: "/docs/drivers/node/:version/crud/configure",
            versions: { excludes: outdatedVersions },
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
          {
            label: "Operations on Replica Sets",
            contentSite: "node",
            url: "/docs/drivers/node/:version/crud/read-write-pref",
            versions: { includes: outdatedVersions },
          },
          {
            label: "Collations",
            contentSite: "node",
            url: "/docs/drivers/node/:version/crud/collations",
            versions: { includes: outdatedVersions },
          },
        ]
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
        ]
      },
      {
        label: "Data Formats",
        contentSite: "node",
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
            versions: { excludes: outdatedVersions },
          },
          {
            label: "Time Series Data",
            contentSite: "node",
            url: "/docs/drivers/node/:version/data-formats/time-series",
          },
        ]
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
        label: "MongoDB Search",
        contentSite: "node",
        url: "/docs/drivers/node/:version/atlas-search",
      },
      {
        label: "MongoDB Search",
        contentSite: "node",
        url: "/docs/drivers/node/:version/atlas-vector-search",
      },
      {
        label: "Monitoring and Logging",
        contentSite: "node",
        collapsible: true,
        items: [
          {
            label: "Monitoring",
            contentSite: "node",
            url: "/docs/drivers/node/:version/monitoring-and-logging/monitoring",
            versions: { excludes: outdatedVersions },
          },
          {
            label: "Monitoring",
            contentSite: "node",
            collapsible: true,
            versions: { includes: outdatedVersions },
            items: [
              {
                label: "Cluster",
                contentSite: "node",
                url: "/docs/drivers/node/:version/monitoring-and-logging/monitoring/cluster-monitoring",
              },
              {
                label: "Command",
                contentSite: "node",
                url: "/docs/drivers/node/:version/monitoring-and-logging/monitoring/command-monitoring",
              },
              {
                label: "Connection Pool",
                contentSite: "node",
                url: "/docs/drivers/node/:version/monitoring-and-logging/monitoring/connection-monitoring",
              }
            ]
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
        ]
      },
      {
        label: "Security",
        contentSite: "node",
        collapsible: true,
        items: [
          {
            label: "Authentication",
            contentSite: "node",
            url: "/docs/drivers/node/:version/security/authentication",
            collapsible: true,
            versions: { excludes: outdatedVersions },
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
            ]
          },
          {
            label: "Authentication",
            contentSite: "node",
            url: "/docs/drivers/node/:version/security/authentication",
            collapsible: true,
            versions: { includes: outdatedVersions },
            items: [
              {
                label: "Authentication",
                contentSite: "node",
                url: "/docs/drivers/node/:version/security/authentication/mechanisms",
              },
              {
                label: "Enterprise Authentication",
                contentSite: "node",
                url: "/docs/drivers/node/:version/security/authentication/enterprise-mechanisms",
              },
            ]
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
        ]
      },
      {
        label: "Third-Party Integrations",
        contentSite: "node",
        collapsible: true,
        versions: { excludes: [...outdatedVersions, "v6.16"] },
        items: [
          {
            label: "Get Started with Mongoose",
            contentSite: "node",
            url: "/docs/drivers/node/:version/integrations/mongoose-get-started",
          },
          {
            label: "Integrate with Prisma",
            contentSite: "node",
            url: "/docs/drivers/node/:version/integrations/prisma",
          }
        ]
      },
      {
        label: "Usage Examples",
        contentSite: "node",
        url: "/docs/drivers/node/:version/usage-examples",
        versions: { includes: outdatedVersions },
        collapsible: true,
        items: [
          {
            label: "Find",
            contentSite: "node",
            url: "/docs/drivers/node/:version/usage-examples/find-operations",
            collapsible: true,
            items: [
              {
                label: "Find a Document",
                contentSite: "node",
                url: "/docs/drivers/node/:version/usage-examples/findOne",
              },
              {
                label: "Find Multiple Documents",
                contentSite: "node",
                url: "/docs/drivers/node/:version/usage-examples/find",
              },
            ]
          },
          {
            label: "Insert",
            contentSite: "node",
            url: "/docs/drivers/node/:version/usage-examples/insert-operations",
            collapsible: true,
            items: [
              {
                label: "Insert a Document",
                contentSite: "node",
                url: "/docs/drivers/node/:version/usage-examples/insertOne",
              },
              {
                label: "Insert Multiple Documents",
                contentSite: "node",
                url: "/docs/drivers/node/:version/usage-examples/insertMany",
              },
            ]
          },
          {
            label: "Update & Replace",
            contentSite: "node",
            url: "/docs/drivers/node/:version/usage-examples/update-and-replace-operations",
            collapsible: true,
            items: [
              {
                label: "Update a Document",
                contentSite: "node",
                url: "/docs/drivers/node/:version/usage-examples/updateOne",
              },
              {
                label: "Update Multiple Documents",
                contentSite: "node",
                url: "/docs/drivers/node/:version/usage-examples/updateMany",
              },
            ]
          },
          {
            label: "Delete",
            contentSite: "node",
            url: "/docs/drivers/node/:version/usage-examples/delete-operations",
            collapsible: true,
            items: [
              {
                label: "Delete a Document",
                contentSite: "node",
                url: "/docs/drivers/node/:version/usage-examples/deleteOne",
              },
              {
                label: "Delete Multiple Documents",
                contentSite: "node",
                url: "/docs/drivers/node/:version/usage-examples/deleteMany",
              },
            ]
          },
          {
            label: "Distinct Field Values",
            contentSite: "node",
            url: "/docs/drivers/node/:version/usage-examples/distinct",
          },
          {
            label: "Run a Command",
            contentSite: "node",
            url: "/docs/drivers/node/:version/usage-examples/command",
          },
          {
            label: "Bulk Operations",
            contentSite: "node",
            url: "/docs/drivers/node/:version/usage-examples/bulkWrite",
          },
          {
            label: "Perform a Transaction",
            contentSite: "node",
            url: "/docs/drivers/node/:version/usage-examples/transactions",
          },
        ]
      },
      {
        label: "Reference",
        contentSite: "node",
        collapsible: true,
        items: [
          {
            label: "Release Notes",
            contentSite: "node",
            url: "/docs/drivers/node/:version/reference/release-notes",
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
        ]
      },
      {
        label: "Compatibility",
        contentSite: "drivers",
        url: "https://www.mongodb.com/docs/drivers/compatibility/?interface=driver&language=nodejs",
      },
      {
        label: "TypeScript",
        contentSite: "node",
        url: "/docs/drivers/node/:version/typescript",
      },
      {
        label: "API Documentation",
        isExternal: true,
        url: "https://mongodb.github.io/node-mongodb-native/6.18",
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
