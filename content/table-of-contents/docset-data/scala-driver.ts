import type { TocItem } from "../types";
import docsVersions from "../version-arrays/drivers/scala-versions";

const outdatedVersions = docsVersions.before("v5.2", {inclusive: true});

const tocData: TocItem[] = [
  {
    label: "Scala Driver",
    contentSite: "scala",
    group: true,
    versionDropdown: true,
    items: [
      {
        label: "Overview",
        contentSite: "scala",
        url: "/docs/languages/scala/scala-driver/:version/",
      },
      {
        label: "Get Started",
        contentSite: "scala",
        url: "/docs/languages/scala/scala-driver/:version/get-started",
        versions: { excludes: outdatedVersions },
      },
      {
        label: "Connect",
        contentSite: "scala",
        url: "/docs/languages/scala/scala-driver/:version/connect",
        collapsible: true,
        versions: { excludes: outdatedVersions },
        items: [
          {
            label: "Create a Client",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/connect/mongoclient",
            versions: { excludes: outdatedVersions },
          },
          {
            label: "Stable API",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/connect/stable-api",
            versions: { excludes: outdatedVersions },
          },
          {
            label: "Choose a Connection Target",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/connect/connection-targets",
            versions: { excludes: outdatedVersions },
          },
          {
            label: "Limit Execution Time",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/connect/csot",
            versions: { excludes: outdatedVersions },
          },
          {
            label: "Configure TLS",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/connect/tls",
            versions: { excludes: outdatedVersions },
          },
          {
            label: "AWS Lambda",
            contentSite: "cloud-docs",
            url: "https://www.mongodb.com/docs/atlas/manage-connections-aws-lambda",
            versions: { excludes: outdatedVersions },
          },
        ],
      },
      {
        label: "Databases & Collections",
        contentSite: "scala",
        url: "/docs/languages/scala/scala-driver/:version/databases-collections",
        collapsible: true,
        versions: { excludes: outdatedVersions },
        items: [
          {
            label: "Run a Command",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/databases-collections/run-command",
            versions: { excludes: outdatedVersions },
          },
          {
            label: "Time Series",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/databases-collections/time-series",
            versions: { excludes: outdatedVersions },
          },
        ],
      },
      {
        label: "Read Data",
        contentSite: "scala",
        url: "/docs/languages/scala/scala-driver/:version/read",
        collapsible: true,
        versions: { excludes: outdatedVersions },
        items: [
          {
            label: "Retrieve Data",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/read/retrieve",
            versions: { excludes: outdatedVersions },
          },
          {
            label: "Specify a Query",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/read/specify-a-query",
            versions: { excludes: outdatedVersions },
          },
          {
            label: "Specify Documents to Return",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/read/specify-documents-to-return",
            versions: { excludes: outdatedVersions },
          },
          {
            label: "Specify Fields to Return",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/read/project",
            versions: { excludes: outdatedVersions },
          },
          {
            label: "Distinct Field Values",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/read/distinct",
            versions: { excludes: outdatedVersions },
          },
          {
            label: "Count Documents",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/read/count",
            versions: { excludes: outdatedVersions },
          },
          {
            label: "Monitor Changes",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/read/change-streams",
            versions: { excludes: outdatedVersions },
          },
        ],
      },
      {
        label: "Write Data",
        contentSite: "scala",
        url: "/docs/languages/scala/scala-driver/:version/write",
        collapsible: true,
        versions: { excludes: outdatedVersions },
        items: [
          {
            label: "Insert",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/write/insert",
            versions: { excludes: outdatedVersions },
          },
          {
            label: "Replace",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/write/replace",
            versions: { excludes: outdatedVersions },
          },
          {
            label: "Update",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/write/update",
            versions: { excludes: outdatedVersions },
          },
          {
            label: "Delete",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/write/delete",
            versions: { excludes: outdatedVersions },
          },
          {
            label: "Bulk Write Operations",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/write/bulk-write",
            versions: { excludes: outdatedVersions },
          },
          {
            label: "Transactions",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/write/transactions",
            versions: { excludes: outdatedVersions },
          },
          {
            label: "Store Large Files",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/write/gridfs",
            versions: { excludes: outdatedVersions },
          },
        ],
      },
      {
        label: "Operations on Replica Sets",
        contentSite: "scala",
        url: "/docs/languages/scala/scala-driver/:version/read-write-pref",
        versions: { excludes: outdatedVersions },
      },
      {
        label: "Indexes",
        contentSite: "scala",
        url: "/docs/languages/scala/scala-driver/:version/indexes",
        collapsible: true,
        versions: { excludes: outdatedVersions },
        items: [
          {
            label: "Single Field",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/indexes/single-field-index",
            versions: { excludes: outdatedVersions },
          },
          {
            label: "Compound",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/indexes/compound-index",
            versions: { excludes: outdatedVersions },
          },
          {
            label: "Multikey",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/indexes/multikey-index",
            versions: { excludes: outdatedVersions },
          },
          {
            label: "MongoDB Search",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/indexes/atlas-search-index",
            versions: { excludes: outdatedVersions },
          },
        ],
      },
      {
        label: "Monitor Your Application",
        contentSite: "scala",
        collapsible: true,
        versions: { excludes: outdatedVersions },
        items: [
          {
            label: "Cluster Monitoring",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/monitoring/cluster-monitoring",
            versions: { excludes: outdatedVersions },
          },
        ],
      },
      {
        label: "Data Aggregation",
        contentSite: "scala",
        url: "/docs/languages/scala/scala-driver/:version/aggregation",
        versions: { excludes: outdatedVersions },
      },
      {
        label: "Observables",
        contentSite: "scala",
        url: "/docs/languages/scala/scala-driver/:version/observables",
        versions: { excludes: outdatedVersions },
      },
      {
        label: "Security",
        contentSite: "scala",
        url: "/docs/languages/scala/scala-driver/:version/security",
        collapsible: true,
        versions: { excludes: outdatedVersions },
        items: [
          {
            label: "Authentication",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/security/auth",
            versions: { excludes: outdatedVersions },
          },
          {
            label: "In-Use Encryption",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/security/encrypt",
            versions: { excludes: outdatedVersions },
          },
        ],
      },
      {
        label: "Issues & Help",
        contentSite: "scala",
        url: "/docs/languages/scala/scala-driver/:version/issues-and-help",
        versions: { excludes: outdatedVersions },
      },
      {
        label: "What's New",
        contentSite: "scala",
        url: "/docs/languages/scala/scala-driver/:version/whats-new",
        versions: { excludes: outdatedVersions },
      },
      {
        label: "Upgrade",
        contentSite: "scala",
        url: "/docs/languages/scala/scala-driver/:version/upgrade",
        versions: { excludes: outdatedVersions },
      },
      {
        label: "Compatibility",
        contentSite: "drivers",
        url: "https://www.mongodb.com/docs/drivers/compatibility/?interface=driver&language=scala",
        versions: { excludes: outdatedVersions },
      },
      {
        label: "View the Source",
        isExternal: true,
        url: "https://github.com/mongodb/mongo-java-driver",
        versions: { excludes: outdatedVersions },
      },
      {
        label: "API Documentation",
        isExternal: true,
        url: "https://mongodb.github.io/mongo-java-driver/5.6/apidocs/driver-scala/index.html",
        versions: { excludes: outdatedVersions },
      },
      // Outdated ToC below
      {
        label: "Installation",
        contentSite: "scala",
        url: "/docs/languages/scala/scala-driver/:version/installation",
        versions: { includes: outdatedVersions },
      },
      {
        label: "Get Started",
        contentSite: "scala",
        url: "/docs/languages/scala/scala-driver/:version/get-started",
        collapsible: true,
        versions: { includes: outdatedVersions },
        items: [
          {
            label: "Primer",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/get-started/primer",
          },
          {
            label: "Quick Start",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/get-started/quickstart",
          },
          {
            label: "Example Quick Start",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/get-started/qs-case-class",
          },
        ]
      },
      {
        label: "What's New",
        contentSite: "scala",
        url: "/docs/languages/scala/scala-driver/:version/whats-new",
        versions: { includes: outdatedVersions },
      },
      {
        label: "Tutorials",
        contentSite: "scala",
        url: "/docs/languages/scala/scala-driver/:version/tutorials",
        collapsible: true,
        versions: { includes: outdatedVersions },
        items: [
          {
            label: "Connect to MongoDB",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/tutorials/connect",
            collapsible: true,
            items: [
              {
                label: "TLS/SSL",
                contentSite: "scala",
                url: "/docs/languages/scala/scala-driver/:version/tutorials/connect/tls",
              },
              {
                label: "Authentication",
                contentSite: "scala",
                url: "/docs/languages/scala/scala-driver/:version/tutorials/connect/authentication",
              },
              {
                label: "Compression",
                contentSite: "scala",
                url: "/docs/languages/scala/scala-driver/:version/tutorials/connect/compression",
              },
            ]
          },
          {
            label: "Databases & Collections",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/tutorials/db-coll",
          },
          {
            label: "Indexes",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/tutorials/indexes",
          },
          {
            label: "Read Operations",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/tutorials/read-ops",
          },
          {
            label: "In-Use Encryption",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/tutorials/encrypt",
          },
          {
            label: "Write Operations",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/tutorials/write-ops",
            collapsible: true,
            items: [
              {
                label: "Bulk Write",
                contentSite: "scala",
                url: "/docs/languages/scala/scala-driver/:version/tutorials/bulk-writes",
              },
            ]
          },
          {
            label: "Aggregation Framework",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/tutorials/aggregation",
          },
          {
            label: "Change Streams",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/tutorials/change-stream",
          },
          {
            label: "Query Text",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/tutorials/text-search",
          },
          {
            label: "Geospatial Search",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/tutorials/geospatial",
          },
          {
            label: "GridFS",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/tutorials/gridfs",
          },
          {
            label: "Run Database Commands",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/tutorials/command",
          },
        ]
      },
      {
        label: "Reference",
        contentSite: "scala",
        url: "/docs/languages/scala/scala-driver/:version/reference",
        collapsible: true,
        versions: { includes: outdatedVersions },
        items: [
          {
            label: "Logging",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/reference/logging",
          },
          {
            label: "Monitoring",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/reference/monitoring",
          },
          {
            label: "Observables",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/reference/observables",
          },
        ]
      },
      {
        label: "BSON Implementation",
        contentSite: "scala",
        url: "/docs/languages/scala/scala-driver/:version/bson",
        collapsible: true,
        versions: { includes: outdatedVersions },
        items: [
          {
            label: "Documents",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/bson/documents",
          },
          {
            label: "Case Class Codecs",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/bson/macros",
          },
          {
            label: "Extended JSON",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/bson/extended-json",
          },
        ]
      },
      {
        label: "Builders",
        contentSite: "scala",
        url: "/docs/languages/scala/scala-driver/:version/builders",
        collapsible: true,
        versions: { includes: outdatedVersions },
        items: [
          {
            label: "Filters",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/builders/filters",
          },
          {
            label: "Projection",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/builders/projections",
          },
          {
            label: "Sort",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/builders/sorts",
          },
          {
            label: "Aggregation",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/builders/aggregates",
          },
          {
            label: "Update",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/builders/updates",
          },
          {
            label: "Indexes",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/:version/builders/indexes",
          },
        ]
      },
      {
        label: "Validate Driver Signatures",
        contentSite: "scala",
        url: "/docs/languages/scala/scala-driver/:version/validate-signatures",
        versions: { includes: outdatedVersions },
      },
      {
        label: "Compatibility",
        contentSite: "drivers",
        url: "https://www.mongodb.com/docs/drivers/compatibility/?interface=driver&language=scala",
        versions: { includes: outdatedVersions },
      },
      {
        label: "Issues & Help",
        contentSite: "scala",
        url: "/docs/languages/scala/scala-driver/:version/issues-and-help",
        versions: { includes: outdatedVersions },
      },
      {
        label: "View the Source",
        contentSite: "scala",
        url: "https://github.com/mongodb/mongo-java-driver",
        versions: { includes: outdatedVersions },
      },
      {
        label: "API Documentation",
        contentSite: "scala",
        url: "https://mongodb.github.io/mongo-java-driver/5.2/apidocs/mongo-scala-driver/index.html",
        versions: { includes: outdatedVersions },
      },
    ],
  },
];

export default tocData;
