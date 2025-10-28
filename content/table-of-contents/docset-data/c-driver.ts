import type { TocItem } from "../types";

const outdatedVersions = ["v1.26", "v1.27", "v1.28"];
const tocData: TocItem[] = [
  {
    label: "C Driver",
    contentSite: "c",
    group: true,
    versionDropdown: true,
    items: [
      {
        label: "Overview",
        contentSite: "c",
        url: "/docs/languages/c/c-driver/:version/",
      },
      {
        label: "Asynchronous C Driver: Public Preview",
        contentSite: "c",
        url: "/docs/languages/c/c-driver/:version/async-c-driver",
        versions: { excludes: [...outdatedVersions, "v1.29"] },
      },
      {
        label: "Get Started",
        contentSite: "c",
        url: "/docs/languages/c/c-driver/:version/get-started",
        versions: { excludes: outdatedVersions },
      },
      {
        label: "Connect to MongoDB",
        contentSite: "c",
        url: "/docs/languages/c/c-driver/:version/connect",
        collapsible: true,
        versions: { excludes: outdatedVersions },
        items: [
          {
            label: "Create a MongoClient",
            contentSite: "c",
            url: "/docs/languages/c/c-driver/:version/connect/mongoclient",
            versions: { excludes: outdatedVersions },
          },
          {
            label: "Stable API",
            contentSite: "c",
            url: "/docs/languages/c/c-driver/:version/connect/stable-api",
            versions: { excludes: outdatedVersions },
          },
          {
            label: "Choose a Connection Target",
            contentSite: "c",
            url: "/docs/languages/c/c-driver/:version/connect/connection-targets",
            versions: { excludes: outdatedVersions },
          },
          {
            label: "Configure TLS",
            contentSite: "c",
            url: "/docs/languages/c/c-driver/:version/connect/tls",
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
        contentSite: "c",
        url: "/docs/languages/c/c-driver/:version/databases-collections",
        collapsible: true,
        versions: { excludes: outdatedVersions },
        items: [
          {
            label: "Time Series",
            contentSite: "c",
            url: "/docs/languages/c/c-driver/:version/databases-collections/time-series",
            versions: { excludes: outdatedVersions },
          },
          {
            label: "Run a Database Command",
            contentSite: "c",
            url: "/docs/languages/c/c-driver/:version/databases-collections/run-command",
            versions: { excludes: outdatedVersions },
          },
        ],
      },
      {
        label: "Write Data",
        contentSite: "c",
        url: "/docs/languages/c/c-driver/:version/write",
        collapsible: true,
        versions: { excludes: outdatedVersions },
        items: [
          {
            label: "Insert",
            contentSite: "c",
            url: "/docs/languages/c/c-driver/:version/write/insert",
            versions: { excludes: outdatedVersions },
          },
          {
            label: "Replace",
            contentSite: "c",
            url: "/docs/languages/c/c-driver/:version/write/replace",
            versions: { excludes: outdatedVersions },
          },
          {
            label: "Update",
            contentSite: "c",
            url: "/docs/languages/c/c-driver/:version/write/update",
            versions: { excludes: outdatedVersions },
          },
          {
            label: "Delete",
            contentSite: "c",
            url: "/docs/languages/c/c-driver/:version/write/delete",
            versions: { excludes: outdatedVersions },
          },
          {
            label: "Bulk Write Operations",
            contentSite: "c",
            url: "/docs/languages/c/c-driver/:version/write/bulk-write",
            versions: { excludes: outdatedVersions },
          },
          {
            label: "Transactions",
            contentSite: "c",
            url: "/docs/languages/c/c-driver/:version/write/transactions",
            versions: { excludes: outdatedVersions },
          },
          {
            label: "Store Large Files",
            contentSite: "c",
            url: "/docs/languages/c/c-driver/:version/write/gridfs",
            versions: { excludes: outdatedVersions },
          },
        ],
      },
      {
        label: "Read Data",
        contentSite: "c",
        url: "/docs/languages/c/c-driver/:version/read",
        collapsible: true,
        versions: { excludes: outdatedVersions },
        items: [
          {
            label: "Specify a Query",
            contentSite: "c",
            url: "/docs/languages/c/c-driver/:version/read/specify-a-query",
            versions: { excludes: outdatedVersions },
          },
          {
            label: "Retrieve Data",
            contentSite: "c",
            url: "/docs/languages/c/c-driver/:version/read/retrieve",
            versions: { excludes: outdatedVersions },
          },
          {
            label: "Specify Fields to Return",
            contentSite: "c",
            url: "/docs/languages/c/c-driver/:version/read/project",
            versions: { excludes: outdatedVersions },
          },
          {
            label: "Specify Documents to Return",
            contentSite: "c",
            url: "/docs/languages/c/c-driver/:version/read/specify-documents-to-return",
            versions: { excludes: outdatedVersions },
          },
          {
            label: "Count Documents",
            contentSite: "c",
            url: "/docs/languages/c/c-driver/:version/read/count",
            versions: { excludes: outdatedVersions },
          },
          {
            label: "Distinct Field Values",
            contentSite: "c",
            url: "/docs/languages/c/c-driver/:version/read/distinct",
            versions: { excludes: outdatedVersions },
          },
          {
            label: "Access Data from a Cursor",
            contentSite: "c",
            url: "/docs/languages/c/c-driver/:version/read/cursors",
            versions: { excludes: outdatedVersions },
          },
          {
            label: "Monitor Changes",
            contentSite: "c",
            url: "/docs/languages/c/c-driver/:version/read/change-streams",
            versions: { excludes: outdatedVersions },
          },
        ],
      },
      {
        label: "Indexes",
        contentSite: "c",
        url: "/docs/languages/c/c-driver/:version/indexes",
        collapsible: true,
        versions: { excludes: outdatedVersions },
        items: [
          {
            label: "Work with Indexes",
            contentSite: "c",
            url: "/docs/languages/c/c-driver/:version/work-with-indexes",
            collapsible: true,
            versions: { excludes: outdatedVersions },
            items: [
              {
                label: "Single Field Indexes",
                contentSite: "c",
                url: "/docs/languages/c/c-driver/:version/indexes/single-field-index",
                versions: { excludes: outdatedVersions },
              },
              {
                label: "Compound Indexes",
                contentSite: "c",
                url: "/docs/languages/c/c-driver/:version/indexes/compound-index",
                versions: { excludes: outdatedVersions },
              },
              {
                label: "Multikey Indexes",
                contentSite: "c",
                url: "/docs/languages/c/c-driver/:version/indexes/multikey-index",
                versions: { excludes: outdatedVersions },
              },
              {
                label: "MongoDB Search",
                contentSite: "c",
                url: "/docs/languages/c/c-driver/:version/indexes/atlas-search-index",
                versions: { excludes: outdatedVersions },
              },
            ],
          },
        ],
      },
      {
        label: "Monitor Your Application",
        contentSite: "c",
        collapsible: true,
        versions: { excludes: outdatedVersions },
        items: [
          {
            label: "Cluster Monitoring",
            contentSite: "c",
            url: "/docs/languages/c/c-driver/:version/monitoring/cluster-monitoring",
            versions: { excludes: outdatedVersions },
          },
        ],
      },
      {
        label: "Security",
        contentSite: "c",
        url: "/docs/languages/c/c-driver/:version/security",
        collapsible: true,
        versions: { excludes: outdatedVersions },
        items: [
          {
            label: "Authentication",
            contentSite: "c",
            url: "/docs/languages/c/c-driver/:version/security/authentication",
            versions: { excludes: outdatedVersions },
          },
          {
            label: "Enterprise Authentication",
            contentSite: "c",
            url: "/docs/languages/c/c-driver/:version/security/enterprise-authentication",
            versions: { excludes: outdatedVersions },
          },
        ],
      },
      {
        label: "Logging",
        contentSite: "c",
        url: "/docs/languages/c/c-driver/:version/logging",
        versions: { excludes: ["v2.0", "v1.30", "v1.29", ...outdatedVersions] },
      },
      {
        label: "Data Aggregation",
        contentSite: "c",
        url: "/docs/languages/c/c-driver/:version/aggregation",
        versions: { excludes: outdatedVersions },
      },
      {
        label: "Build the Driver",
        contentSite: "c",
        url: "/docs/languages/c/c-driver/:version/install-from-source",
        versions: { excludes: outdatedVersions },
      },
      {
        label: "Operations on Replica Sets",
        contentSite: "c",
        url: "/docs/languages/c/c-driver/:version/read-write-configuration",
        versions: { excludes: outdatedVersions },
      },
      {
        label: "What's New",
        contentSite: "c",
        url: "/docs/languages/c/c-driver/:version/whats-new",
        versions: { excludes: outdatedVersions },
      },
      {
        label: "Compatibility",
        contentSite: "drivers",
        url: "/docs/drivers/compatibility/?driver-language=c",
        versions: { excludes: outdatedVersions },
      },
      {
        label: "Upgrade",
        contentSite: "c",
        url: "/docs/languages/c/c-driver/:version/upgrade",
        versions: { excludes: outdatedVersions },
      },
      {
        label: "libbson API Documentation",
        isExternal: true,
        url: "https://mongoc.org/libbson/current",
        versions: { excludes: outdatedVersions },
      },
      {
        label: "libmongoc API Documentation",
        isExternal: true,
        url: "https://mongoc.org/libmongoc/current",
        versions: { excludes: outdatedVersions },
      },
      // Outdated ToC below, once v1.28 is EoL we can remove these items
      {
        label: "libbson",
        contentSite: "c",
        url: "/docs/languages/c/c-driver/:version/libbson",
        collapsible: true,
        versions: { includes: outdatedVersions },
        items: [
          {
            label: "Tutorials",
            contentSite: "c",
            url: "/docs/languages/c/c-driver/:version/libbson/tutorials",
            collapsible: true,
            items: [
              {
                label: "Use libbson with C",
                contentSite: "c",
                url: "/docs/languages/c/c-driver/:version/libbson/tutorials/include-and-link",
              },
              {
                label: "BSON Documents",
                contentSite: "c",
                url: "/docs/languages/c/c-driver/:version/libbson/tutorials/creating",
              },
              {
                label: "Handling Errors",
                contentSite: "c",
                url: "/docs/languages/c/c-driver/:version/libbson/tutorials/errors",
              },
              {
                label: "ObjectIDs",
                contentSite: "c",
                url: "/docs/languages/c/c-driver/:version/libbson/tutorials/oid",
              },
              {
                label: "Parsing BSON",
                contentSite: "c",
                url: "/docs/languages/c/c-driver/:version/libbson/tutorials/parsing",
              },
              {
                label: "UTF-8",
                contentSite: "c",
                url: "/docs/languages/c/c-driver/:version/libbson/tutorials/utf8",
              },
            ]
          },
          {
            label: "Guides",
            contentSite: "c",
            url: "/docs/languages/c/c-driver/:version/libbson/guides",
            collapsible: true,
            items: [
              {
                label: "Streaming BSON",
                contentSite: "c",
                url: "/docs/languages/c/c-driver/:version/libbson/guides/streaming-bson",
              },
              {
                label: "JSON",
                contentSite: "c",
                url: "/docs/languages/c/c-driver/:version/libbson/guides/json",
              },
              {
                label: "bson_t Lifetimes",
                contentSite: "c",
                url: "/docs/languages/c/c-driver/:version/libbson/guides/lifetimes",
              },
            ]
          },
          {
            label: "Cross Platform Notes",
            contentSite: "c",
            url: "/docs/languages/c/c-driver/:version/libbson/cross-platform-notes",
            collapsible: true,
            items: [
              {
                label: "Endianness",
                contentSite: "c",
                url: "/docs/languages/c/c-driver/:version/libbson/cross-platform-notes/endianness",
              },
              {
                label: "Threading",
                contentSite: "c",
                url: "/docs/languages/c/c-driver/:version/libbson/cross-platform-notes/threading",
              },
            ]
          },
          {
            label: "API Documentation",
            contentSite: "c",
            url: "https://mongoc.org/libbson/current/api.html",
          },
        ]
      },
      {
        label: "libmongoc",
        contentSite: "c",
        url: "/docs/languages/c/c-driver/:version/libmongoc",
        collapsible: true,
        versions: { includes: outdatedVersions },
        items: [
          {
            label: "Tutorials",
            contentSite: "c",
            url: "/docs/languages/c/c-driver/:version/libmongoc/tutorials",
            collapsible: true,
            items: [
              {
                label: "C Driver Libraries",
                contentSite: "c",
                url: "/docs/languages/c/c-driver/:version/libmongoc/tutorials/obtaining-libraries",
                collapsible: true,
                items: [
                  {
                    label: "Build from Source",
                    contentSite: "c",
                    url: "/docs/languages/c/c-driver/:version/libmongoc/tutorials/obtaining-libraries/from-source",
                  },
                  {
                    label: "Prebuilt Libraries",
                    contentSite: "c",
                    url: "/docs/languages/c/c-driver/:version/libmongoc/tutorials/obtaining-libraries/installing",
                  },
                  {
                    label: "Build the Documentation",
                    contentSite: "c",
                    url: "/docs/languages/c/c-driver/:version/libmongoc/tutorials/obtaining-libraries/docs",
                  },
                ]
              },
            ]
          },
          {
            label: "How-To Guides",
            contentSite: "c",
            url: "/docs/languages/c/c-driver/:version/libmongoc/howto",
            collapsible: true,
            items: [
              {
                label: "Install from Source",
                contentSite: "c",
                url: "/docs/languages/c/c-driver/:version/libmongoc/howto/source-install",
              },
            ]
          },
          {
            label: "Reference",
            contentSite: "c",
            url: "/docs/languages/c/c-driver/:version/libmongoc/ref",
            collapsible: true,
            items: [
              {
                label: "Package Installation",
                contentSite: "c",
                url: "/docs/languages/c/c-driver/:version/libmongoc/ref/packages",
              },
              {
                label: "Platform Support",
                contentSite: "c",
                url: "/docs/languages/c/c-driver/:version/libmongoc/ref/platforms",
              },
            ]
          },
          {
            label: "Tutorial",
            contentSite: "c",
            url: "/docs/languages/c/c-driver/:version/libmongoc/tutorial",
          },
          {
            label: "Authentication",
            contentSite: "c",
            url: "/docs/languages/c/c-driver/:version/libmongoc/authentication",
          },
          {
            label: "Basic Troubleshooting",
            contentSite: "c",
            url: "/docs/languages/c/c-driver/:version/libmongoc/basic-troubleshooting",
          },
          {
            label: "Guides",
            contentSite: "c",
            url: "/docs/languages/c/c-driver/:version/libmongoc/guides",
            collapsible: true,
            items: [
              {
                label: "Configure TLS",
                contentSite: "c",
                url: "/docs/languages/c/c-driver/:version/libmongoc/guides/configuring_tls",
              },
              {
                label: "Common Tasks",
                contentSite: "c",
                url: "/docs/languages/c/c-driver/:version/libmongoc/guides/mongoc-common-task-examples",
              },
              {
                label: "Advanced Connections",
                contentSite: "c",
                url: "/docs/languages/c/c-driver/:version/libmongoc/guides/advanced-connections",
              },
              {
                label: "Connection Pooling",
                contentSite: "c",
                url: "/docs/languages/c/c-driver/:version/libmongoc/guides/connection-pooling",
              },
              {
                label: "Data Compression",
                contentSite: "c",
                url: "/docs/languages/c/c-driver/:version/libmongoc/guides/data-compression",
              },
              {
                label: "Cursors",
                contentSite: "c",
                url: "/docs/languages/c/c-driver/:version/libmongoc/guides/cursors",
              },
              {
                label: "Bulk Write",
                contentSite: "c",
                url: "/docs/languages/c/c-driver/:version/libmongoc/guides/bulk",
              },
              {
                label: "Aggregation Frameworks",
                contentSite: "c",
                url: "/docs/languages/c/c-driver/:version/libmongoc/guides/aggregate",
              },
              {
                label: "distinct & mapReduce",
                contentSite: "c",
                url: "/docs/languages/c/c-driver/:version/libmongoc/guides/distinct-mapreduce",
              },
              {
                label: "Visual Studio Project",
                contentSite: "c",
                url: "/docs/languages/c/c-driver/:version/libmongoc/guides/visual-studio-guide",
              },
              {
                label: "Manage Indexes",
                contentSite: "c",
                url: "/docs/languages/c/c-driver/:version/libmongoc/guides/manage-collection-indexes",
              },
              {
                label: "Aids for Debugging",
                contentSite: "c",
                url: "/docs/languages/c/c-driver/:version/libmongoc/guides/debugging",
              },
              {
                label: "In-Use Encryption",
                contentSite: "c",
                url: "/docs/languages/c/c-driver/:version/libmongoc/guides/in-use-encryption",
                collapsible: true,
                items: [
                  {
                    label: "Client-Side Encryption",
                    contentSite: "c",
                    url: "/docs/languages/c/c-driver/:version/libmongoc/guides/client-side-field-level-encryption",
                  },
                  {
                    label: "Queryable Encryption",
                    contentSite: "c",
                    url: "/docs/languages/c/c-driver/:version/libmongoc/guides/queryable-encryption",
                  },
                ]
              },
            ]
          },
          {
            label: "API Documentation",
            contentSite: "c",
            url: "https://mongoc.org/libmongoc/current/api.html",
          },
          {
            label: "Application Performance Monitoring",
            contentSite: "c",
            url: "https://mongoc.org/libmongoc/current/application-performance-monitoring.html",
          },
        ]
      },
    ],
  },
];

export default tocData;
