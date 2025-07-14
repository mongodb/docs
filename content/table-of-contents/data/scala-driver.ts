import type { TocItem } from "../types";

const tocData: TocItem[] = [
  {
    label: "Scala Driver",
    contentSite: "scala",
    url: "/docs/languages/scala/scala-driver/:version/",
    collapsible: true,
    items: [
      {
        label: "Get Started",
        contentSite: "scala",
        url: "/docs/languages/scala/scala-driver/:version/get-started",
      },
      {
        label: "Connect",
        contentSite: "scala",
        url: "/docs/languages/scala/scala-driver/:version/connect",
        collapsible: true,
        items: [
          {
            label: "Create a Client",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/connect/mongoclient",
          },
          {
            label: "Stable API",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/connect/stable-api",
          },
          {
            label: "Choose a Connection Target",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/connect/connection-targets",
          },
          {
            label: "Limit Execution Time",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/connect/csot",
          },
          {
            label: "Configure TLS",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/connect/tls",
          },
          {
            label: "AWS Lambda",
            contentSite: "cloud-docs",
            url: "/docs/atlas/manage-connections-aws-lambda/",
          },
        ],
      },
      {
        label: "Databases & Collections",
        contentSite: "scala",
        url: "/docs/languages/scala/scala-driver/:version/databases-collections",
        collapsible: true,
        items: [
          {
            label: "Run a Command",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/databases-collections/run-command",
          },
          {
            label: "Time Series",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/databases-collections/time-series",
          },
        ],
      },
      {
        label: "Read Data",
        contentSite: "scala",
        url: "/docs/languages/scala/scala-driver/:version/read",
        collapsible: true,
        items: [
          {
            label: "Retrieve Data",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/read/retrieve",
          },
          {
            label: "Specify a Query",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/read/specify-a-query",
          },
          {
            label: "Specify Documents to Return",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/read/specify-documents-to-return",
          },
          {
            label: "Specify Fields to Return",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/read/project",
          },
          {
            label: "Distinct Field Values",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/read/distinct",
          },
          {
            label: "Count Documents",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/read/count",
          },
          {
            label: "Monitor Changes",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/read/change-streams",
          },
        ],
      },
      {
        label: "Write Data",
        contentSite: "scala",
        url: "/docs/languages/scala/scala-driver/:version/write",
        collapsible: true,
        items: [
          {
            label: "Insert",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/write/insert",
          },
          {
            label: "Replace",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/write/replace",
          },
          {
            label: "Update",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/write/update",
          },
          {
            label: "Delete",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/write/delete",
          },
          {
            label: "Bulk Write Operations",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/write/bulk-write",
          },
          {
            label: "Transactions",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/write/transactions",
          },
          {
            label: "Store Large Files",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/write/gridfs",
          },
        ],
      },
      {
        label: "Operations on Replica Sets",
        contentSite: "scala",
        url: "/docs/languages/scala/scala-driver/:version/read-write-pref",
      },
      {
        label: "Indexes",
        contentSite: "scala",
        url: "/docs/languages/scala/scala-driver/:version/indexes",
        collapsible: true,
        items: [
          {
            label: "Single Field",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/indexes/single-field-index",
          },
          {
            label: "Compound",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/indexes/compound-index",
          },
          {
            label: "Multikey",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/indexes/multikey-index",
          },
          {
            label: "Atlas Search",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/indexes/atlas-search-index",
          },
        ],
      },
      {
        label: "Monitor Your Application",
        contentSite: "scala",
        url: "/docs/languages/scala/scala-driver/:version/monitoring",
        collapsible: true,
        items: [
          {
            label: "Cluster Monitoring",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/monitoring/cluster-monitoring",
          },
        ],
      },
      {
        label: "Data Aggregation",
        contentSite: "scala",
        url: "/docs/languages/scala/scala-driver/:version/aggregation",
      },
      {
        label: "Observables",
        contentSite: "scala",
        url: "/docs/languages/scala/scala-driver/:version/observables",
      },
      {
        label: "Security",
        contentSite: "scala",
        url: "/docs/languages/scala/scala-driver/:version/security",
        collapsible: true,
        items: [
          {
            label: "Authentication",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/security/auth",
          },
          {
            label: "In-Use Encryption",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/security/encrypt",
          },
        ],
      },
      {
        label: "Issues & Help",
        contentSite: "scala",
        url: "/docs/languages/scala/scala-driver/:version/issues-and-help",
      },
      {
        label: "What's New",
        contentSite: "scala",
        url: "/docs/languages/scala/scala-driver/:version/whats-new",
      },
      {
        label: "Upgrade",
        contentSite: "scala",
        url: "/docs/languages/scala/scala-driver/:version/upgrade",
      },
      {
        label: "Compatibility",
        contentSite: "scala",
        url: "/docs/languages/scala/scala-driver/:version/compatibility",
      },
      {
        label: "View the Source",
        isExternal: true,
        url: "https://github.com/mongodb/mongo-java-driver",
      },
      {
        label: "API Documentation",
        isExternal: true,
        url: "https://mongodb.github.io/mongo-java-driver/5.5/apidocs/driver-scala/index.html",
      },
      {
        label: "Previous Versions",
        isExternal: true,
        url: "https://mongodb.github.io/mongo-java-driver/",
      },
    ],
  },
];

export default tocData;
