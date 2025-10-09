import type { TocItem } from "../types";

const outdatedVersions = ["v3.10"];

const tocData: TocItem[] = [
  {
    label: "C++ Driver",
    contentSite: "cpp-driver",
    group: true,
    versionDropdown: true,
    items: [
      {
        label: "Overview",
        contentSite: "cpp-driver",
        url: "/docs/languages/cpp/cpp-driver/:version/",
      },
      {
        label: "Get Started",
        contentSite: "cpp-driver",
        url: "/docs/languages/cpp/cpp-driver/:version/get-started",
        versions: { excludes: outdatedVersions },
      },
      {
        label: "Connect to MongoDB",
        contentSite: "cpp-driver",
        url: "/docs/languages/cpp/cpp-driver/:version/connect",
        collapsible: true,
        versions: { excludes: outdatedVersions },
        items: [
          {
            label: "Create a Driver Instance",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/connect/instance",
            versions: { excludes: outdatedVersions },
          },
          {
            label: "Create a MongoDB Client",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/connect/client",
            versions: { excludes: outdatedVersions },
          },
          {
            label: "Choose a Connection Target",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/connect/connection-targets",
            versions: { excludes: outdatedVersions },
          },
          {
            label: "Specify Connection Options",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/connect/connection-options",
            versions: { excludes: outdatedVersions },
          },
          {
            label: "Configure TLS",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/connect/tls",
            versions: { excludes: outdatedVersions },
          },
          {
            label: "Compress Network Traffic",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/connect/network-compression",
            versions: { excludes: outdatedVersions },
          },
          {
            label: "Stable API",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/connect/stable-api",
            versions: { excludes: outdatedVersions },
          },
          {
            label: "Connection Pools",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/connect/connection-pools",
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
        label: "Read Data",
        contentSite: "cpp-driver",
        url: "/docs/languages/cpp/cpp-driver/:version/read",
        collapsible: true,
        versions: { excludes: outdatedVersions },
        items: [
          {
            label: "Retrieve Data",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/read/retrieve",
            versions: { excludes: outdatedVersions },
          },
          {
            label: "Specify a Query",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/read/specify-a-query",
            versions: { excludes: outdatedVersions },
          },
          {
            label: "Specify Documents to Return",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/read/specify-documents-to-return",
            versions: { excludes: outdatedVersions },
          },
          {
            label: "Specify Fields to Return",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/read/project",
            versions: { excludes: outdatedVersions },
          },
          {
            label: "Distinct Field Values",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/read/distinct",
            versions: { excludes: outdatedVersions },
          },
          {
            label: "Count Documents",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/read/count",
            versions: { excludes: outdatedVersions },
          },
          {
            label: "Cursors",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/read/cursor",
            versions: { excludes: outdatedVersions },
          },
          {
            label: "Monitor Changes",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/read/change-streams",
            versions: { excludes: outdatedVersions },
          },
        ],
      },
      {
        label: "Write Data",
        contentSite: "cpp-driver",
        url: "/docs/languages/cpp/cpp-driver/:version/write",
        collapsible: true,
        versions: { excludes: outdatedVersions },
        items: [
          {
            label: "Insert",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/write/insert",
            versions: { excludes: outdatedVersions },
          },
          {
            label: "Update",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/write/update",
            versions: { excludes: outdatedVersions },
          },
          {
            label: "Replace",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/write/replace",
            versions: { excludes: outdatedVersions },
          },
          {
            label: "Delete",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/write/delete",
            versions: { excludes: outdatedVersions },
          },
          {
            label: "Bulk Write",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/write/bulk-write",
            versions: { excludes: outdatedVersions },
          },
          {
            label: "GridFS",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/write/gridfs",
            versions: { excludes: outdatedVersions },
          },
          {
            label: "Transactions",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/write/transactions",
            versions: { excludes: outdatedVersions },
          },
        ],
      },
      {
        label: "Databases & Collections",
        contentSite: "cpp-driver",
        url: "/docs/languages/cpp/cpp-driver/:version/databases-collections",
        versions: { excludes: outdatedVersions },
      },
      {
        label: "Indexes",
        contentSite: "cpp-driver",
        url: "/docs/languages/cpp/cpp-driver/:version/indexes",
        collapsible: true,
        versions: { excludes: outdatedVersions },
        items: [
          {
            label: "Single Field Indexes",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/indexes/single-field-index",
            versions: { excludes: outdatedVersions },
          },
          {
            label: "Compound Indexes",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/indexes/compound-index",
            versions: { excludes: outdatedVersions },
          },
          {
            label: "MongoDB Search Indexes",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/indexes/atlas-search-index",
            versions: { excludes: outdatedVersions },
          },
        ],
      },
      {
        label: "Aggregation",
        contentSite: "cpp-driver",
        url: "/docs/languages/cpp/cpp-driver/:version/aggregation",
        versions: { excludes: outdatedVersions },
      },
      {
        label: "Run a Command",
        contentSite: "cpp-driver",
        url: "/docs/languages/cpp/cpp-driver/:version/run-command",
        versions: { excludes: outdatedVersions },
      },
      {
        label: "Security",
        contentSite: "cpp-driver",
        url: "/docs/languages/cpp/cpp-driver/:version/security",
        collapsible: true,
        versions: { excludes: outdatedVersions },
        items: [
          {
            label: "Authentication",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/security/authentication",
            versions: { excludes: outdatedVersions },
          },
          {
            label: "Enterprise Authentication",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/security/enterprise-authentication",
            versions: { excludes: outdatedVersions },
          },
          {
            label: "In-Use Encryption",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/security/in-use-encryption",
            versions: { excludes: outdatedVersions },
          },
        ],
      },
      {
        label: "Specialized Data Formats",
        contentSite: "cpp-driver",
        collapsible: true,
        versions: { excludes: outdatedVersions },
        items: [
          {
            label: "Time Series Data",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/data-formats/time-series",
            versions: { excludes: outdatedVersions },
          },
          {
            label: "BSON",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/data-formats/working-with-bson",
            versions: { excludes: outdatedVersions },
          },
        ],
      },
      {
        label: "Advanced Configuration & Installation",
        contentSite: "cpp-driver",
        url: "/docs/languages/cpp/cpp-driver/:version/advanced-installation",
        versions: { excludes: outdatedVersions },
      },
      {
        label: "Include & Link the Driver",
        contentSite: "cpp-driver",
        url: "/docs/languages/cpp/cpp-driver/:version/include-link",
        versions: { excludes: ["v4.0", "v3.11", ...outdatedVersions] },
      },
      {
        label: "Thread & Fork Safety",
        contentSite: "cpp-driver",
        url: "/docs/languages/cpp/cpp-driver/:version/thread-safety",
        versions: { excludes: outdatedVersions },
      },
      {
        label: "API & ABI Versioning",
        contentSite: "cpp-driver",
        url: "/docs/languages/cpp/cpp-driver/:version/api-abi-versioning",
        collapsible: true,
        versions: { excludes: outdatedVersions },
        items: [
          {
            label: "API Versioning",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/api-abi-versioning/api-versioning",
            versions: { excludes: outdatedVersions },
          },
          {
            label: "ABI Versioning",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/api-abi-versioning/abi-versioning",
            versions: { excludes: outdatedVersions },
          },
        ],
      },
      {
        label: "What's New",
        contentSite: "cpp-driver",
        url: "/docs/languages/cpp/cpp-driver/:version/whats-new",
        versions: { excludes: outdatedVersions },
      },
      {
        label: "Upgrade",
        contentSite: "cpp-driver",
        url: "/docs/languages/cpp/cpp-driver/:version/upgrade",
        versions: { excludes: outdatedVersions },
      },
      {
        label: "Testing",
        contentSite: "cpp-driver",
        url: "/docs/languages/cpp/cpp-driver/:version/testing",
        versions: { excludes: outdatedVersions },
      },
      {
        label: "Compatibility",
        contentSite: "drivers",
        url: "https://www.mongodb.com/docs/drivers/compatibility/?interface=driver&language=cpp",
        versions: { excludes: outdatedVersions },
      },
      {
        label: "Issues & Help",
        contentSite: "cpp-driver",
        url: "/docs/languages/cpp/cpp-driver/:version/issues-and-help",
        versions: { excludes: outdatedVersions },
      },
      {
        label: "API Documentation",
        isExternal: true,
        url: "https://mongocxx.org/api/mongocxx-4.1.1",
        versions: { excludes: outdatedVersions },
      },
      {
        label: "Driver Source",
        isExternal: true,
        url: "https://github.com/mongodb/mongo-cxx-driver",
        versions: { excludes: outdatedVersions },
      },
      // Outdated ToC below
      {
        label: "C++17 Polyfill",
        contentSite: "cpp-driver",
        url: "/docs/languages/cpp/cpp-driver/:version/polyfill-selection",
        versions: { includes: outdatedVersions },
      },
      {
        label: "Installation",
        contentSite: "cpp-driver",
        url: "/docs/languages/cpp/cpp-driver/:version/installation",
        collapsible: true,
        versions: { includes: outdatedVersions },
        items: [
          {
            label: "Windows",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/installation/windows",
          },
          {
            label: "MacOS",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/installation/macos",
          },
          {
            label: "Linux",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/installation/linux",
          },
          {
            label: "Advanced",
            contentSite: "cpp-driver",
            url: "/docs/languages/cpp/cpp-driver/:version/installation/advanced",
          },
        ]
      },
      {
        label: "Configuration",
        contentSite: "cpp-driver",
        url: "/docs/languages/cpp/cpp-driver/:version/configuration",
        versions: { includes: outdatedVersions },
      },
      {
        label: "Client-Side Encryption",
        contentSite: "cpp-driver",
        url: "/docs/languages/cpp/cpp-driver/:version/client-side-encryption",
        versions: { includes: outdatedVersions },
      },
      {
        label: "Tutorial",
        contentSite: "cpp-driver",
        url: "/docs/languages/cpp/cpp-driver/:version/tutorial",
        versions: { includes: outdatedVersions },
      },
      {
        label: "Thread Safety",
        contentSite: "cpp-driver",
        url: "/docs/languages/cpp/cpp-driver/:version/thread-safety",
        versions: { includes: outdatedVersions },
      },
      {
        label: "Connection Pools",
        contentSite: "cpp-driver",
        url: "/docs/languages/cpp/cpp-driver/:version/connection-pools",
        versions: { includes: outdatedVersions },
      },
      {
        label: "BSON",
        contentSite: "cpp-driver",
        url: "/docs/languages/cpp/cpp-driver/:version/working-with-bson",
        versions: { includes: outdatedVersions },
      },
      {
        label: "API & ABI Versioning",
        contentSite: "cpp-driver",
        url: "/docs/languages/cpp/cpp-driver/:version/api-abi-versioning",
        collapsible: true,
        versions: { includes: outdatedVersions },
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
        ]
      },
      {
        label: "Reporting Bugs",
        contentSite: "cpp-driver",
        url: "/docs/languages/cpp/cpp-driver/:version/reporting-bugs",
        versions: { includes: outdatedVersions },
      },
      {
        label: "Testing",
        contentSite: "cpp-driver",
        url: "/docs/languages/cpp/cpp-driver/:version/testing",
        versions: { includes: outdatedVersions },
      },
      {
        label: "Contributing",
        contentSite: "cpp-driver",
        url: "/docs/languages/cpp/cpp-driver/:version/contributing",
        versions: { includes: outdatedVersions },
      },
      {
        label: "Getting Help",
        contentSite: "cpp-driver",
        url: "/docs/languages/cpp/cpp-driver/:version/getting-help",
        versions: { includes: outdatedVersions },
      },
      {
        label: "API Documentation",
        contentSite: "cpp-driver",
        url: "https://mongocxx.org/api/current/",
        versions: { includes: outdatedVersions },
      },
      {
        label: "Driver Source",
        contentSite: "cpp-driver",
        url: "https://github.com/mongodb/mongo-cxx-driver",
        versions: { includes: outdatedVersions },
      },
   ],
  },
];

export default tocData;