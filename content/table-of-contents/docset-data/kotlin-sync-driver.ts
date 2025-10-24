import type { TocItem } from "../types";
import docsVersions from "../version-arrays/drivers/kotlin-sync-versions";

const outdatedVersions = docsVersions.before("v5.2", {inclusive: true});

const tocData: TocItem[] = [
  {
    label: "Kotlin Sync Driver",
    contentSite: "kotlin-sync",
    group: true,
    versionDropdown: true,
    items: [
      {
        label: "Overview",
        contentSite: "kotlin-sync",
        url: "/docs/languages/kotlin/kotlin-sync-driver/:version/",
      },
      {
        label: "Getting Started",
        contentSite: "kotlin-sync",
        url: "/docs/languages/kotlin/kotlin-sync-driver/:version/get-started",
        versions: { excludes: outdatedVersions },
      },
      {
        label: "Getting Started",
        contentSite: "kotlin-sync",
        url: "/docs/languages/kotlin/kotlin-sync-driver/:version/get-started",
        collapsible: true,
        versions: { includes: outdatedVersions },
        items: [
          {
            label: "Download & Install",
            contentSite: "kotlin-sync",
            url: "/docs/languages/kotlin/kotlin-sync-driver/:version/get-started/download-and-install",
          },
          {
            label: "Create a Deployment",
            contentSite: "kotlin-sync",
            url: "/docs/languages/kotlin/kotlin-sync-driver/:version/get-started/create-a-deployment",
          },
          {
            label: "Create a Connection String",
            contentSite: "kotlin-sync",
            url: "/docs/languages/kotlin/kotlin-sync-driver/:version/get-started/create-a-connection-string",
          },
          {
            label: "Run a Sample Query",
            contentSite: "kotlin-sync",
            url: "/docs/languages/kotlin/kotlin-sync-driver/:version/get-started/run-sample-query",
          },
          {
            label: "Next Steps",
            contentSite: "kotlin-sync",
            url: "/docs/languages/kotlin/kotlin-sync-driver/:version/get-started/next-steps",
          }
        ],
      },
      {
        label: "Connect",
        contentSite: "kotlin-sync",
        url: "/docs/languages/kotlin/kotlin-sync-driver/:version/connect",
        collapsible: true,
        items: [
          {
            label: "Create a MongoClient",
            contentSite: "kotlin-sync",
            url: "/docs/languages/kotlin/kotlin-sync-driver/:version/connect/mongoclient",
          },
          {
            label: "Choose a Connection Target",
            contentSite: "kotlin-sync",
            url: "/docs/languages/kotlin/kotlin-sync-driver/:version/connect/connection-targets",
          },
          {
            label: "Connection Options",
            contentSite: "kotlin-sync",
            url: "/docs/languages/kotlin/kotlin-sync-driver/:version/connect/connection-options",
            collapsible: true,
            items: [
              {
                label: "Network Compression",
                contentSite: "kotlin-sync",
                url: "/docs/languages/kotlin/kotlin-sync-driver/:version/connect/connection-options/network-compression",
              },
              {
                label: "Server Selection",
                contentSite: "kotlin-sync",
                url: "/docs/languages/kotlin/kotlin-sync-driver/:version/connect/connection-options/server-selection",
              },
              {
                label: "Stable API",
                contentSite: "kotlin-sync",
                url: "/docs/languages/kotlin/kotlin-sync-driver/:version/connect/connection-options/stable-api",
              },
              {
                label: "Limit Server Execution Time",
                contentSite: "kotlin-sync",
                url: "/docs/languages/kotlin/kotlin-sync-driver/:version/connect/connection-options/csot",
                versions: { excludes: ["v5.1"] },
              },
              {
                label: "Connection Pools",
                contentSite: "kotlin-sync",
                url: "/docs/languages/kotlin/kotlin-sync-driver/:version/connect/connection-options/connection-pools",
              },
            ]
          },
          {
            label: "AWS Lambda",
            contentSite: "kotlin-sync",
            url: "https://www.mongodb.com/docs/atlas/manage-connections-aws-lambda/",
          },
          {
            label: "Connection Troubleshooting",
            contentSite: "kotlin-sync",
            url: "/docs/languages/kotlin/kotlin-sync-driver/:version/connect/connection-troubleshooting",
          },
        ]
      },
      {
        label: "Databases & Collections",
        contentSite: "kotlin-sync",
        url: "/docs/languages/kotlin/kotlin-sync-driver/:version/databases-collections",
      },
      {
        label: "CRUD Operations",
        contentSite: "kotlin-sync",
        collapsible: true,
        items: [
          {
            label: "Insert Documents",
            contentSite: "kotlin-sync",
            url: "/docs/languages/kotlin/kotlin-sync-driver/:version/crud/insert",
          },
          {
            label: "Query Documents",
            contentSite: "kotlin-sync",
            collapsible: true,
            items: [
              {
                label: "Find Documents",
                contentSite: "kotlin-sync",
                url: "/docs/languages/kotlin/kotlin-sync-driver/:version/crud/query/find",
              },
              {
                label: "Specify Documents to Return",
                contentSite: "kotlin-sync",
                url: "/docs/languages/kotlin/kotlin-sync-driver/:version/crud/query/specify-documents-to-return",
              },
              {
                label: "Specify Fields to Return",
                contentSite: "kotlin-sync",
                url: "/docs/languages/kotlin/kotlin-sync-driver/:version/crud/query/project",
              },
              {
                label: "Specify a Query",
                contentSite: "kotlin-sync",
                url: "/docs/languages/kotlin/kotlin-sync-driver/:version/crud/query/specify-a-query",
              },
              {
                label: "Count Documents",
                contentSite: "kotlin-sync",
                url: "/docs/languages/kotlin/kotlin-sync-driver/:version/crud/query/count",
              },
              {
                label: "Distinct Field Values",
                contentSite: "kotlin-sync",
                url: "/docs/languages/kotlin/kotlin-sync-driver/:version/crud/query/distinct",
              },
              {
                label: "Access Data from a Cursor",
                contentSite: "kotlin-sync",
                url: "/docs/languages/kotlin/kotlin-sync-driver/:version/crud/query/cursors",
              },
            ]
          },
          {
            label: "Update Documents",
            contentSite: "kotlin-sync",
            url: "/docs/languages/kotlin/kotlin-sync-driver/:version/crud/update",
          },
          {
            label: "Replace Documents",
            contentSite: "kotlin-sync",
            url: "/docs/languages/kotlin/kotlin-sync-driver/:version/crud/replace",
          },
          {
            label: "Delete Documents",
            contentSite: "kotlin-sync",
            url: "/docs/languages/kotlin/kotlin-sync-driver/:version/crud/delete",
          },
          {
            label: "Bulk Write Operations",
            contentSite: "kotlin-sync",
            url: "/docs/languages/kotlin/kotlin-sync-driver/:version/crud/bulk-write",
          },
          {
            label: "Transactions",
            contentSite: "kotlin-sync",
            url: "/docs/languages/kotlin/kotlin-sync-driver/:version/crud/transactions",
          },
          {
            label: "Configure CRUD Operations",
            contentSite: "kotlin-sync",
            url: "/docs/languages/kotlin/kotlin-sync-driver/:version/crud/configure",
          },
        ]
      },
      {
        label: "Aggregation",
        contentSite: "kotlin-sync",
        url: "/docs/languages/kotlin/kotlin-sync-driver/:version/aggregation",
        collapsible: true,
        items: [
          {
            label: "Aggregation Expressions",
            contentSite: "kotlin-sync",
            url: "/docs/languages/kotlin/kotlin-sync-driver/:version/aggregation/agg-exp-ops",
          },
        ]
      },
      {
        label: "Builders",
        contentSite: "kotlin-sync",
        url: "/docs/languages/kotlin/kotlin-sync-driver/:version/builders",
        versions: { includes: outdatedVersions },
      },
      {
        label: "Builders",
        contentSite: "kotlin-sync",
        url: "/docs/languages/kotlin/kotlin-sync-driver/:version/builders",
        collapsible: true,
        versions: { excludes: outdatedVersions },
        items: [
          {
            label: "Builders & Data Classes",
            contentSite: "kotlin-sync",
            url: "/docs/languages/kotlin/kotlin-sync-driver/:version/builders/builders-data-classes",
          },
        ]
      },
      {
        label: "Data Formats",
        contentSite: "kotlin-sync",
        url: "/docs/languages/kotlin/kotlin-sync-driver/:version/data-formats",
        collapsible: true,
        items: [
          {
            label: "Custom Types",
            contentSite: "kotlin-sync",
            collapsible: true,
            items: [
              {
                label: "Serialization",
                contentSite: "kotlin-sync",
                url: "/docs/languages/kotlin/kotlin-sync-driver/:version/data-formats/serialization",
              },
              {
                label: "Type Codecs",
                contentSite: "kotlin-sync",
                url: "/docs/languages/kotlin/kotlin-sync-driver/:version/data-formats/codecs",
              },
            ]
          },
          {
            label: "Data Classes",
            contentSite: "kotlin-sync",
            url: "/docs/languages/kotlin/kotlin-sync-driver/:version/data-formats/data-format-data-class",
          },
          {
            label: "BSON",
            contentSite: "kotlin-sync",
            url: "/docs/languages/kotlin/kotlin-sync-driver/:version/data-formats/bson",
          },
          {
            label: "Time Series",
            contentSite: "kotlin-sync",
            url: "/docs/languages/kotlin/kotlin-sync-driver/:version/data-formats/time-series",
          },
          {
            label: "Extended JSON",
            contentSite: "kotlin-sync",
            url: "/docs/languages/kotlin/kotlin-sync-driver/:version/data-formats/extended-json",
          },
        ]
      },
      {
        label: "Indexes",
        contentSite: "kotlin-sync",
        url: "/docs/languages/kotlin/kotlin-sync-driver/:version/indexes",
        collapsible: true,
        versions: { excludes: ["v5.1"] },
        items: [
          {
            label: "MongoDB Search and Vector Search Indexes",
            contentSite: "kotlin-sync",
            url: "/docs/languages/kotlin/kotlin-sync-driver/:version/indexes/atlas-search-index",
          },
        ]
      },
      {
        label: "Indexes",
        contentSite: "kotlin-sync",
        url: "/docs/languages/kotlin/kotlin-sync-driver/:version/indexes",
        versions: { includes: ["v5.1"] },
      },
      {
        label: "Run a Database Command",
        contentSite: "kotlin-sync",
        url: "/docs/languages/kotlin/kotlin-sync-driver/:version/run-command",
      },
      {
        label: "MongoDB Search",
        contentSite: "kotlin-sync",
        url: "/docs/languages/kotlin/kotlin-sync-driver/:version/atlas-search",
        versions: { excludes: ["v5.1"] },
      },
      {
        label: "MongoDB Vector Search",
        contentSite: "kotlin-sync",
        url: "/docs/languages/kotlin/kotlin-sync-driver/:version/atlas-vector-search",
        versions: { excludes: ["v5.1"] },
      },
      {
        label: "Logging and Monitoring",
        contentSite: "kotlin-sync",
        collapsible: true,
        items: [
          {
            label: "Logging",
            contentSite: "kotlin-sync",
            url: "/docs/languages/kotlin/kotlin-sync-driver/:version/logging-and-monitoring/logging",
          },
          {
            label: "Monitoring",
            contentSite: "kotlin-sync",
            url: "/docs/languages/kotlin/kotlin-sync-driver/:version/logging-and-monitoring/monitoring",
          },
          {
            label: "Change Streams",
            contentSite: "kotlin-sync",
            url: "/docs/languages/kotlin/kotlin-sync-driver/:version/logging-and-monitoring/change-streams",
          },
        ]
      },
      {
        label: "Security",
        contentSite: "kotlin-sync",
        collapsible: true,
        items: [
          {
            label: "TLS",
            contentSite: "kotlin-sync",
            url: "/docs/languages/kotlin/kotlin-sync-driver/:version/security/tls",
          },
          {
            label: "Authentication",
            contentSite: "kotlin-sync",
            url: "/docs/languages/kotlin/kotlin-sync-driver/:version/security/authentication",
            collapsible: true,
            items: [
              {
                label: "SCRAM",
                contentSite: "kotlin-sync",
                url: "/docs/languages/kotlin/kotlin-sync-driver/:version/security/authentication/scram",
              },
              {
                label: "X.509",
                contentSite: "kotlin-sync",
                url: "/docs/languages/kotlin/kotlin-sync-driver/:version/security/authentication/x509",
              },
              {
                label: "AWS IAM",
                contentSite: "kotlin-sync",
                url: "/docs/languages/kotlin/kotlin-sync-driver/:version/security/authentication/aws-iam",
              },
              {
                label: "OIDC",
                contentSite: "kotlin-sync",
                url: "/docs/languages/kotlin/kotlin-sync-driver/:version/security/authentication/oidc",
              },
              {
                label: "LDAP (PLAIN)",
                contentSite: "kotlin-sync",
                url: "/docs/languages/kotlin/kotlin-sync-driver/:version/security/authentication/ldap",
              },
              {
                label: "Kerberos (GSSAPI)",
                contentSite: "kotlin-sync",
                url: "/docs/languages/kotlin/kotlin-sync-driver/:version/security/authentication/kerberos",
              },
            ]
          },
          {
            label: "In-Use Encryption",
            contentSite: "kotlin-sync",
            url: "/docs/languages/kotlin/kotlin-sync-driver/:version/security/encrypt-fields",
          },
          {
            label: "Validate Driver Artifact Signatures",
            contentSite: "kotlin-sync",
            url: "/docs/languages/kotlin/kotlin-sync-driver/:version/security/validate-signatures",
          },
        ]
      },
      {
        label: "Reference",
        contentSite: "kotlin-sync",
        collapsible: true,
        items: [
          {
            label: "Release Notes",
            contentSite: "kotlin-sync",
            url: "/docs/languages/kotlin/kotlin-sync-driver/:version/reference/whats-new",
          },

          {
            label: "Upgrade",
            contentSite: "kotlin-sync",
            url: "/docs/languages/kotlin/kotlin-sync-driver/:version/reference/upgrade",
          },
        ]
      },
      {
        label: "Compatibility",
        contentSite: "drivers",
        url: "https://www.mongodb.com/docs/drivers/compatibility/?interface=driver&language=kotlin",
      },
      {
        label: "API Documentation",
        contentSite: "kotlin-sync",
        url: "/docs/languages/kotlin/kotlin-sync-driver/:version/api",
        collapsible: true,
        items: [
          {
            label: "Kotlin Sync Driver",
            contentSite: "kotlin-sync",
            url: "https://mongodb.github.io/mongo-java-driver/5.6/apidocs/driver-kotlin-sync/index.html",
          },
          {
            label: "BSON kotlinx.serialization",
            contentSite: "kotlin-sync",
            url: "https://mongodb.github.io/mongo-java-driver/5.6/apidocs/bson-kotlinx/index.html",
          },
          {
            label: "Kotlin Driver Extensions",
            contentSite: "kotlin-sync",
            url: "https://mongodb.github.io/mongo-java-driver/5.6/apidocs/driver-kotlin-extensions/index.html",
            versions: { excludes: outdatedVersions },
          },
          {
            label: "Driver Core",
            contentSite: "kotlin-sync",
            url: "https://mongodb.github.io/mongo-java-driver/5.6/apidocs/driver-core/index.html",
          },
        ]
      },
      {
        label: "Issues & Help",
        contentSite: "kotlin-sync",
        url: "/docs/languages/kotlin/kotlin-sync-driver/:version/issues-and-help",
      },
      {
        label: "View the Source",
        contentSite: "kotlin-sync",
        url: "https://github.com/mongodb/mongo-java-driver/tree/master/driver-kotlin-sync",
      },
    ],
  },
];

export default tocData;
