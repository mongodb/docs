import type { TocItem } from "../types";

const tocData: TocItem[] = [
  {
    label: "Kotlin Sync Driver",
    contentSite: "kotlin-sync",
    url: "/docs/languages/kotlin/kotlin-sync-driver/:version/",
    collapsible: true,
    items: [
      {
        label: "Get Started",
        contentSite: "kotlin-sync",
        url: "/docs/languages/kotlin/kotlin-sync-driver/:version/get-started",
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
          },
          {
            label: "Limit Execution Time",
            contentSite: "kotlin-sync",
            url: "/docs/languages/kotlin/kotlin-sync-driver/:version/connect/csot",
          },
          {
            label: "Enable TLS",
            contentSite: "kotlin-sync",
            url: "/docs/languages/kotlin/kotlin-sync-driver/:version/connect/tls",
          },
          {
            label: "Stable API",
            contentSite: "kotlin-sync",
            url: "/docs/languages/kotlin/kotlin-sync-driver/:version/connect/stable-api",
          },
          {
            label: "AWS Lambda",
            contentSite: "cloud-docs",
            url: "/docs/atlas/manage-connections-aws-lambda/",
          },
        ],
      },
      {
        label: "Write Data",
        contentSite: "kotlin-sync",
        url: "/docs/languages/kotlin/kotlin-sync-driver/:version/write-operations",
        collapsible: true,
        items: [
          {
            label: "Insert",
            contentSite: "kotlin-sync",
            url: "/docs/languages/kotlin/kotlin-sync-driver/:version/write/insert",
          },
          {
            label: "Update",
            contentSite: "kotlin-sync",
            url: "/docs/languages/kotlin/kotlin-sync-driver/:version/write/update",
          },
          {
            label: "Replace",
            contentSite: "kotlin-sync",
            url: "/docs/languages/kotlin/kotlin-sync-driver/:version/write/replace",
          },
          {
            label: "Delete",
            contentSite: "kotlin-sync",
            url: "/docs/languages/kotlin/kotlin-sync-driver/:version/write/delete",
          },
          {
            label: "Bulk Write",
            contentSite: "kotlin-sync",
            url: "/docs/languages/kotlin/kotlin-sync-driver/:version/write/bulk-write",
          },
          {
            label: "Transactions",
            contentSite: "kotlin-sync",
            url: "/docs/languages/kotlin/kotlin-sync-driver/:version/write/transactions",
          },
        ],
      },
      {
        label: "Read Data",
        contentSite: "kotlin-sync",
        url: "/docs/languages/kotlin/kotlin-sync-driver/:version/read",
        collapsible: true,
        items: [
          {
            label: "Specify a Query",
            contentSite: "kotlin-sync",
            url: "/docs/languages/kotlin/kotlin-sync-driver/:version/read/specify-a-query",
          },
          {
            label: "Retrieve Data",
            contentSite: "kotlin-sync",
            url: "/docs/languages/kotlin/kotlin-sync-driver/:version/read/retrieve",
          },
          {
            label: "Specify Fields to Return",
            contentSite: "kotlin-sync",
            url: "/docs/languages/kotlin/kotlin-sync-driver/:version/read/project",
          },
          {
            label: "Specify Documents to Return",
            contentSite: "kotlin-sync",
            url: "/docs/languages/kotlin/kotlin-sync-driver/:version/read/specify-documents-to-return",
          },
          {
            label: "Count Documents",
            contentSite: "kotlin-sync",
            url: "/docs/languages/kotlin/kotlin-sync-driver/:version/read/count",
          },
          {
            label: "Distinct Field Values",
            contentSite: "kotlin-sync",
            url: "/docs/languages/kotlin/kotlin-sync-driver/:version/read/distinct",
          },
          {
            label: "Data Cursors",
            contentSite: "kotlin-sync",
            url: "/docs/languages/kotlin/kotlin-sync-driver/:version/read/cursors",
          },
          {
            label: "Monitor Data Changes",
            contentSite: "kotlin-sync",
            url: "/docs/languages/kotlin/kotlin-sync-driver/:version/read/change-streams",
          },
        ],
      },
      {
        label: "Indexes",
        contentSite: "kotlin-sync",
        url: "/docs/languages/kotlin/kotlin-sync-driver/:version/indexes",
        collapsible: true,
        items: [
          {
            label: "Work with Indexes",
            contentSite: "kotlin-sync",
            url: "/docs/languages/kotlin/kotlin-sync-driver/:version/work-with-indexes",
            collapsible: true,
            items: [
              {
                label: "Single Field",
                contentSite: "kotlin-sync",
                url: "/docs/languages/kotlin/kotlin-sync-driver/:version/indexes/single-field-index",
              },
              {
                label: "Compound",
                contentSite: "kotlin-sync",
                url: "/docs/languages/kotlin/kotlin-sync-driver/:version/indexes/compound-index",
              },
              {
                label: "Atlas Search & Vector Search",
                contentSite: "kotlin-sync",
                url: "/docs/languages/kotlin/kotlin-sync-driver/:version/indexes/atlas-search-index",
              },
            ],
          },
        ],
      },
      {
        label: "Data Aggregation",
        contentSite: "kotlin-sync",
        url: "/docs/languages/kotlin/kotlin-sync-driver/:version/aggregation",
      },
      {
        label: "Aggregation Operations",
        contentSite: "kotlin-sync",
        url: "/docs/languages/kotlin/kotlin-sync-driver/:version/agg-exp-ops",
      },
      {
        label: "Specialized Data Formats",
        contentSite: "kotlin-sync",
        url: "/docs/languages/kotlin/kotlin-sync-driver/:version/data-formats",
        collapsible: true,
        items: [
          {
            label: "Data Classes",
            contentSite: "kotlin-sync",
            url: "/docs/languages/kotlin/kotlin-sync-driver/:version/data-formats/data-format-data-class",
          },
          {
            label: "Kotlin Serialization",
            contentSite: "kotlin-sync",
            url: "/docs/languages/kotlin/kotlin-sync-driver/:version/data-formats/serialization",
          },
          {
            label: "Codecs",
            contentSite: "kotlin-sync",
            url: "/docs/languages/kotlin/kotlin-sync-driver/:version/data-formats/codecs",
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
        ],
      },
      {
        label: "Builders",
        contentSite: "kotlin-sync",
        url: "/docs/languages/kotlin/kotlin-sync-driver/:version/builders",
        collapsible: true,
        items: [
          {
            label: "Builders & Data Classes",
            contentSite: "kotlin-sync",
            url: "/docs/languages/kotlin/kotlin-sync-driver/:version/builders/builders-data-classes",
          },
        ],
      },
      {
        label: "Run a Command",
        contentSite: "kotlin-sync",
        url: "/docs/languages/kotlin/kotlin-sync-driver/:version/run-command",
      },
      {
        label: "Monitoring",
        contentSite: "kotlin-sync",
        url: "/docs/languages/kotlin/kotlin-sync-driver/:version/monitoring",
      },
      {
        label: "Security",
        contentSite: "kotlin-sync",
        url: "/docs/languages/kotlin/kotlin-sync-driver/:version/security",
        collapsible: true,
        items: [
          {
            label: "Authentication",
            contentSite: "kotlin-sync",
            url: "/docs/languages/kotlin/kotlin-sync-driver/:version/security/authentication",
          },
          {
            label: "Enterprise Authentication",
            contentSite: "kotlin-sync",
            url: "/docs/languages/kotlin/kotlin-sync-driver/:version/security/enterprise-auth",
          },
          {
            label: "In-Use Encryption",
            contentSite: "kotlin-sync",
            url: "/docs/languages/kotlin/kotlin-sync-driver/:version/security/encrypt-fields",
          },
        ],
      },
      {
        label: "Compatibility",
        contentSite: "kotlin-sync",
        url: "/docs/languages/kotlin/kotlin-sync-driver/:version/compatibility",
      },
      {
        label: "Validate Driver Signatures",
        contentSite: "kotlin-sync",
        url: "/docs/languages/kotlin/kotlin-sync-driver/:version/validate-signatures",
      },
      {
        label: "What's New",
        contentSite: "kotlin-sync",
        url: "/docs/languages/kotlin/kotlin-sync-driver/:version/whats-new",
      },
      {
        label: "Issues & Help",
        contentSite: "kotlin-sync",
        url: "/docs/languages/kotlin/kotlin-sync-driver/:version/issues-and-help",
      },
      {
        label: "View the Source",
        isExternal: true,
        url: "https://github.com/mongodb/mongo-java-driver/tree/master/driver-kotlin-sync",
      },
      {
        label: "API Documentation",
        contentSite: "kotlin-sync",
        url: "/docs/languages/kotlin/kotlin-sync-driver/:version/api",
        collapsible: true,
        items: [
          {
            label: "Kotlin Sync Driver",
            isExternal: true,
            url: "https://mongodb.github.io/mongo-java-driver/5.5/apidocs/driver-kotlin-sync/index.html",
          },
          {
            label: "BSON kotlinx.serialization",
            isExternal: true,
            url: "https://mongodb.github.io/mongo-java-driver/5.5/apidocs/bson-kotlinx/index.html",
          },
          {
            label: "Kotlin Driver Extensions",
            isExternal: true,
            url: "https://mongodb.github.io/mongo-java-driver/5.5/apidocs/driver-kotlin-extensions/index.html",
          },
          {
            label: "Driver Core",
            isExternal: true,
            url: "https://mongodb.github.io/mongo-java-driver/5.5/apidocs/driver-core/index.html",
          },
        ],
      },
    ],
  },
];

export default tocData;
