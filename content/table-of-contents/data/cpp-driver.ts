import type { TocItem } from "../types";

const tocData: TocItem[] = [
  {
    label: "C++ Driver",
    contentSite: "cpp-driver",
    url: "/docs/languages/cpp/cpp-driver/:version/",
    collapsible: true,
    items: [
      {
        label: "Get Started",
        contentSite: "cpp-driver",
        url: "/docs/languages/cpp/cpp-driver/:version/get-started",
      },
      {
        label: "Connect to MongoDB",
        contentSite: "cpp-driver",
        url: "/docs/languages/cpp/cpp-driver/:version/connect",
        collapsible: true,
        items: [
          {
            label: "Create a Driver Instance",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/connect/instance",
          },
          {
            label: "Create a MongoDB Client",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/connect/client",
          },
          {
            label: "Choose a Connection Target",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/connect/connection-targets",
          },
          {
            label: "Specify Connection Options",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/connect/connection-options",
          },
          {
            label: "Configure TLS",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/connect/tls",
          },
          {
            label: "Compress Network Traffic",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/connect/network-compression",
          },
          {
            label: "Stable API",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/connect/stable-api",
          },
          {
            label: "Connection Pools",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/connect/connection-pools",
          },
          {
            label: "AWS Lambda",
            contentSite: "cloud-docs",
            url: "/docs/atlas/manage-connections-aws-lambda/",
          },
        ],
      },
      {
        label: "Read Data",
        contentSite: "cpp-driver",
        url: "/docs/languages/cpp/cpp-driver/:version/read",
        collapsible: true,
        items: [
          {
            label: "Retrieve Data",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/read/retrieve",
          },
          {
            label: "Specify a Query",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/read/specify-a-query",
          },
          {
            label: "Specify Documents to Return",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/read/specify-documents-to-return",
          },
          {
            label: "Specify Fields to Return",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/read/project",
          },
          {
            label: "Distinct Field Values",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/read/distinct",
          },
          {
            label: "Count Documents",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/read/count",
          },
          {
            label: "Cursors",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/read/cursor",
          },
          {
            label: "Monitor Changes",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/read/change-streams",
          },
        ],
      },
      {
        label: "Write Data",
        contentSite: "cpp-driver",
        url: "/docs/languages/cpp/cpp-driver/:version/write",
        collapsible: true,
        items: [
          {
            label: "Insert",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/write/insert",
          },
          {
            label: "Update",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/write/update",
          },
          {
            label: "Replace",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/write/replace",
          },
          {
            label: "Delete",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/write/delete",
          },
          {
            label: "Bulk Write",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/write/bulk-write",
          },
          {
            label: "GridFS",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/write/gridfs",
          },
          {
            label: "Transactions",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/write/transactions",
          },
        ],
      },
      {
        label: "Databases & Collections",
        contentSite: "cpp-driver",
        url: "/docs/languages/cpp/cpp-driver/:version/databases-collections",
      },
      {
        label: "Indexes",
        contentSite: "cpp-driver",
        url: "/docs/languages/cpp/cpp-driver/:version/indexes",
        collapsible: true,
        items: [
          {
            label: "Work with Indexes",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/indexes/work-with-indexes",
          },
          {
            label: "Single Field Indexes",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/indexes/single-field-index",
          },
          {
            label: "Compound Indexes",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/indexes/compound-index",
          },
          {
            label: "Atlas Search Indexes",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/indexes/atlas-search-index",
          },
        ],
      },
      {
        label: "Aggregation",
        contentSite: "cpp-driver",
        url: "/docs/languages/cpp/cpp-driver/:version/aggregation",
      },
      {
        label: "Run a Command",
        contentSite: "cpp-driver",
        url: "/docs/languages/cpp/cpp-driver/:version/run-command",
      },
      {
        label: "Security",
        contentSite: "cpp-driver",
        url: "/docs/languages/cpp/cpp-driver/:version/security",
        collapsible: true,
        items: [
          {
            label: "Authentication",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/security/authentication",
          },
          {
            label: "Enterprise Authentication",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/security/enterprise-authentication",
          },
          {
            label: "In-Use Encryption",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/security/in-use-encryption",
          },
        ],
      },
      {
        label: "Specialized Data Formats",
        contentSite: "cpp-driver",
        url: "/docs/languages/cpp/cpp-driver/:version/data-formats",
        collapsible: true,
        items: [
          {
            label: "Time Series Data",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/data-formats/time-series",
          },
          {
            label: "BSON",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/data-formats/working-with-bson",
          },
        ],
      },
      {
        label: "Advanced Configuration & Installation",
        contentSite: "cpp-driver",
        url: "/docs/languages/cpp/cpp-driver/:version/advanced-installation",
      },
      {
        label: "Include & Link the Driver",
        contentSite: "cpp-driver",
        url: "/docs/languages/cpp/cpp-driver/:version/include-link",
      },
      {
        label: "Thread & Fork Safety",
        contentSite: "cpp-driver",
        url: "/docs/languages/cpp/cpp-driver/:version/thread-safety",
      },
      {
        label: "API & ABI Versioning",
        contentSite: "cpp-driver",
        url: "/docs/languages/cpp/cpp-driver/:version/api-abi-versioning",
        collapsible: true,
        items: [
          {
            label: "API Versioning",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/api-abi-versioning/api-versioning",
          },
          {
            label: "ABI Versioning",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/api-abi-versioning/abi-versioning",
          },
        ],
      },
      {
        label: "What's New",
        contentSite: "cpp-driver",
        url: "/docs/languages/cpp/cpp-driver/:version/whats-new",
      },
      {
        label: "Upgrade",
        contentSite: "cpp-driver",
        url: "/docs/languages/cpp/cpp-driver/:version/upgrade",
      },
      {
        label: "Testing",
        contentSite: "cpp-driver",
        url: "/docs/languages/cpp/cpp-driver/:version/testing",
      },
      {
        label: "Compatibility",
        contentSite: "cpp-driver",
        url: "/docs/languages/cpp/cpp-driver/:version/compatibility",
      },
      {
        label: "Issues & Help",
        contentSite: "cpp-driver",
        url: "/docs/languages/cpp/cpp-driver/:version/issues-and-help",
      },
      {
        label: "API Documentation",
        isExternal: true,
        url: "https://mongocxx.org/api/mongocxx-4.1.1",
      },
      {
        label: "Driver Source",
        isExternal: true,
        url: "https://github.com/mongodb/mongo-cxx-driver",
      },
    ],
  },
];

export default tocData;
