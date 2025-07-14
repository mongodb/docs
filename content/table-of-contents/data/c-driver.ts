import type { TocItem } from "../types";

const tocData: TocItem[] = [
  {
    label: "C Driver",
    contentSite: "c",
    url: "/docs/languages/c/c-driver/:version/",
    collapsible: true,
    items: [
      {
        label: "Asynchronous C Driver: Public Preview",
        contentSite: "c",
        url: "/docs/languages/c/c-driver/:version/async-c-driver",
      },
      {
        label: "Get Started",
        contentSite: "c",
        url: "/docs/languages/c/c-driver/:version/get-started",
      },
      {
        label: "Connect to MongoDB",
        contentSite: "c",
        url: "/docs/languages/c/c-driver/:version/connect",
        collapsible: true,
        items: [
          {
            label: "Create a MongoClient",
            contentSite: "c",
            url: "/docs/languages/c/c-driver/:version/connect/mongoclient",
          },
          {
            label: "Stable API",
            contentSite: "c",
            url: "/docs/languages/c/c-driver/:version/connect/stable-api",
          },
          {
            label: "Choose a Connection Target",
            contentSite: "c",
            url: "/docs/languages/c/c-driver/:version/connect/connection-targets",
          },
          {
            label: "Configure TLS",
            contentSite: "c",
            url: "/docs/languages/c/c-driver/:version/connect/tls",
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
        contentSite: "c",
        url: "/docs/languages/c/c-driver/:version/databases-collections",
        collapsible: true,
        items: [
          {
            label: "Time Series",
            contentSite: "c",
            url: "/docs/languages/c/c-driver/:version/databases-collections/time-series",
          },
          {
            label: "Run a Database Command",
            contentSite: "c",
            url: "/docs/languages/c/c-driver/:version/databases-collections/run-command",
          },
        ],
      },
      {
        label: "Write Data",
        contentSite: "c",
        url: "/docs/languages/c/c-driver/:version/write",
        collapsible: true,
        items: [
          {
            label: "Insert",
            contentSite: "c",
            url: "/docs/languages/c/c-driver/:version/write/insert",
          },
          {
            label: "Replace",
            contentSite: "c",
            url: "/docs/languages/c/c-driver/:version/write/replace",
          },
          {
            label: "Update",
            contentSite: "c",
            url: "/docs/languages/c/c-driver/:version/write/update",
          },
          {
            label: "Delete",
            contentSite: "c",
            url: "/docs/languages/c/c-driver/:version/write/delete",
          },
          {
            label: "Bulk Write Operations",
            contentSite: "c",
            url: "/docs/languages/c/c-driver/:version/write/bulk-write",
          },
          {
            label: "Transactions",
            contentSite: "c",
            url: "/docs/languages/c/c-driver/:version/write/transactions",
          },
          {
            label: "Store Large Files",
            contentSite: "c",
            url: "/docs/languages/c/c-driver/:version/write/gridfs",
          },
        ],
      },
      {
        label: "Read Data",
        contentSite: "c",
        url: "/docs/languages/c/c-driver/:version/read",
        collapsible: true,
        items: [
          {
            label: "Specify a Query",
            contentSite: "c",
            url: "/docs/languages/c/c-driver/:version/read/specify-a-query",
          },
          {
            label: "Retrieve Data",
            contentSite: "c",
            url: "/docs/languages/c/c-driver/:version/read/retrieve",
          },
          {
            label: "Specify Fields to Return",
            contentSite: "c",
            url: "/docs/languages/c/c-driver/:version/read/project",
          },
          {
            label: "Specify Documents to Return",
            contentSite: "c",
            url: "/docs/languages/c/c-driver/:version/read/specify-documents-to-return",
          },
          {
            label: "Count Documents",
            contentSite: "c",
            url: "/docs/languages/c/c-driver/:version/read/count",
          },
          {
            label: "Distinct Field Values",
            contentSite: "c",
            url: "/docs/languages/c/c-driver/:version/read/distinct",
          },
          {
            label: "Access Data from a Cursor",
            contentSite: "c",
            url: "/docs/languages/c/c-driver/:version/read/cursors",
          },
          {
            label: "Monitor Changes",
            contentSite: "c",
            url: "/docs/languages/c/c-driver/:version/read/change-streams",
          },
        ],
      },
      {
        label: "Indexes",
        contentSite: "c",
        url: "/docs/languages/c/c-driver/:version/indexes",
        collapsible: true,
        items: [
          {
            label: "Work with Indexes",
            contentSite: "c",
            url: "/docs/languages/c/c-driver/:version/work-with-indexes",
            collapsible: true,
            items: [
              {
                label: "Single Field Indexes",
                contentSite: "c",
                url: "/docs/languages/c/c-driver/:version/indexes/single-field-index",
              },
              {
                label: "Compound Indexes",
                contentSite: "c",
                url: "/docs/languages/c/c-driver/:version/indexes/compound-index",
              },
              {
                label: "Multikey Indexes",
                contentSite: "c",
                url: "/docs/languages/c/c-driver/:version/indexes/multikey-index",
              },
              {
                label: "Atlas Search",
                contentSite: "c",
                url: "/docs/languages/c/c-driver/:version/indexes/atlas-search-index",
              },
            ],
          },
        ],
      },
      {
        label: "Monitor Your Application",
        contentSite: "c",
        url: "/docs/languages/c/c-driver/:version/monitoring",
        collapsible: true,
        items: [
          {
            label: "Cluster Monitoring",
            contentSite: "c",
            url: "/docs/languages/c/c-driver/:version/monitoring/cluster-monitoring",
          },
        ],
      },
      {
        label: "Security",
        contentSite: "c",
        url: "/docs/languages/c/c-driver/:version/security",
        collapsible: true,
        items: [
          {
            label: "Authentication",
            contentSite: "c",
            url: "/docs/languages/c/c-driver/:version/security/authentication",
          },
          {
            label: "Enterprise Authentication",
            contentSite: "c",
            url: "/docs/languages/c/c-driver/:version/security/enterprise-authentication",
          },
        ],
      },
      {
        label: "Data Aggregation",
        contentSite: "c",
        url: "/docs/languages/c/c-driver/:version/aggregation",
      },
      {
        label: "Build the Driver",
        contentSite: "c",
        url: "/docs/languages/c/c-driver/:version/install-from-source",
      },
      {
        label: "Operations on Replica Sets",
        contentSite: "c",
        url: "/docs/languages/c/c-driver/:version/read-write-configuration",
      },
      {
        label: "What's New",
        contentSite: "c",
        url: "/docs/languages/c/c-driver/:version/whats-new",
      },
      {
        label: "Compatibility",
        contentSite: "c",
        url: "/docs/languages/c/c-driver/:version/compatibility",
      },
      {
        label: "Upgrade",
        contentSite: "c",
        url: "/docs/languages/c/c-driver/:version/upgrade",
      },
      {
        label: "libbson API Documentation",
        isExternal: true,
        url: "https://mongoc.org/libbson/current",
      },
      {
        label: "libmongoc API Documentation",
        isExternal: true,
        url: "https://mongoc.org/libmongoc/current",
      },
    ],
  },
];

export default tocData;
