import type { TocItem } from "../types";

const tocData: TocItem[] = [
  {
    label: "Go Driver",
    contentSite: "golang",
    url: "/docs/drivers/go/:version/",
    collapsible: true,
    items: [
      {
        label: "Quick Start",
        contentSite: "golang",
        url: "/docs/drivers/go/:version/quick-start",
      },
      {
        label: "Quick Reference",
        contentSite: "golang",
        url: "/docs/drivers/go/:version/quick-reference",
      },
      {
        label: "What's New",
        contentSite: "golang",
        url: "/docs/drivers/go/:version/whats-new",
      },
      {
        label: "Usage Examples",
        contentSite: "golang",
        url: "/docs/drivers/go/:version/usage-examples",
        collapsible: true,
        items: [
          {
            label: "Find Operations",
            contentSite: "golang",
            url: "/docs/drivers/go/:version/usage-examples/find-operations",
            collapsible: true,
            items: [
              {
                label: "Find One",
                contentSite: "golang",
                url: "/docs/drivers/go/:version/usage-examples/findOne",
              },
              {
                label: "Find Many",
                contentSite: "golang",
                url: "/docs/drivers/go/:version/usage-examples/find",
              },
            ],
          },
          {
            label: "Write Operations",
            contentSite: "golang",
            url: "/docs/drivers/go/:version/usage-examples/write-operations",
            collapsible: true,
            items: [
              {
                label: "Insert One",
                contentSite: "golang",
                url: "/docs/drivers/go/:version/usage-examples/insertOne",
              },
              {
                label: "Insert Many",
                contentSite: "golang",
                url: "/docs/drivers/go/:version/usage-examples/insertMany",
              },
              {
                label: "Update One",
                contentSite: "golang",
                url: "/docs/drivers/go/:version/usage-examples/updateOne",
              },
              {
                label: "Update Many",
                contentSite: "golang",
                url: "/docs/drivers/go/:version/usage-examples/updateMany",
              },
              {
                label: "Replace One",
                contentSite: "golang",
                url: "/docs/drivers/go/:version/usage-examples/replaceOne",
              },
              {
                label: "Delete One",
                contentSite: "golang",
                url: "/docs/drivers/go/:version/usage-examples/deleteOne",
              },
              {
                label: "Delete Many",
                contentSite: "golang",
                url: "/docs/drivers/go/:version/usage-examples/deleteMany",
              },
            ],
          },
          {
            label: "Bulk Operations",
            contentSite: "golang",
            url: "/docs/drivers/go/:version/usage-examples/bulkWrite",
          },
          {
            label: "Open a Change Stream",
            contentSite: "golang",
            url: "/docs/drivers/go/:version/usage-examples/changestream",
          },
          {
            label: "Count Documents Method",
            contentSite: "golang",
            url: "/docs/drivers/go/:version/usage-examples/count",
          },
          {
            label: "Distinct Field Values",
            contentSite: "golang",
            url: "/docs/drivers/go/:version/usage-examples/distinct",
          },
          {
            label: "Run a Command",
            contentSite: "golang",
            url: "/docs/drivers/go/:version/usage-examples/command",
          },
          {
            label: "Use Struct Tags",
            contentSite: "golang",
            url: "/docs/drivers/go/:version/usage-examples/struct-tagging",
          },
        ],
      },
      {
        label: "Fundamentals",
        contentSite: "golang",
        url: "/docs/drivers/go/:version/fundamentals",
        collapsible: true,
        items: [
          {
            label: "Connections",
            contentSite: "golang",
            url: "/docs/drivers/go/:version/fundamentals/connections",
            collapsible: true,
            items: [
              {
                label: "Connection Guide",
                contentSite: "golang",
                url: "/docs/drivers/go/:version/fundamentals/connections/connection-guide",
              },
              {
                label: "Connection Options",
                contentSite: "golang",
                url: "/docs/drivers/go/:version/fundamentals/connections/connection-options",
              },
              {
                label: "Network Compression",
                contentSite: "golang",
                url: "/docs/drivers/go/:version/fundamentals/connections/network-compression",
              },
              {
                label: "Configure TLS",
                contentSite: "golang",
                url: "/docs/drivers/go/:version/fundamentals/connections/tls",
              },
              {
                label: "Connect with AWS Lambda",
                contentSite: "cloud-docs",
                url: "/docs/atlas/manage-connections-aws-lambda/",
              },
            ],
          },
          {
            label: "Stable API",
            contentSite: "golang",
            url: "/docs/drivers/go/:version/fundamentals/stable-api",
          },
          {
            label: "Context",
            contentSite: "golang",
            url: "/docs/drivers/go/:version/fundamentals/context",
          },
          {
            label: "Authentication",
            contentSite: "golang",
            url: "/docs/drivers/go/:version/fundamentals/auth",
          },
          {
            label: "Enterprise Authentication",
            contentSite: "golang",
            url: "/docs/drivers/go/:version/fundamentals/enterprise-auth",
          },
          {
            label: "BSON",
            contentSite: "golang",
            url: "/docs/drivers/go/:version/fundamentals/bson",
          },
          {
            label: "CRUD Operations",
            contentSite: "golang",
            url: "/docs/drivers/go/:version/fundamentals/crud",
            collapsible: true,
            items: [
              {
                label: "Read",
                contentSite: "golang",
                url: "/docs/drivers/go/:version/fundamentals/crud/read-operations",
                collapsible: true,
                items: [
                  {
                    label: "Query",
                    contentSite: "golang",
                    url: "/docs/drivers/go/:version/fundamentals/crud/read-operations/query-document",
                  },
                  {
                    label: "Retrieve Data",
                    contentSite: "golang",
                    url: "/docs/drivers/go/:version/fundamentals/crud/read-operations/retrieve",
                  },
                  {
                    label: "Count Documents",
                    contentSite: "golang",
                    url: "/docs/drivers/go/:version/fundamentals/crud/read-operations/count",
                  },
                  {
                    label: "Data Cursors",
                    contentSite: "golang",
                    url: "/docs/drivers/go/:version/fundamentals/crud/read-operations/cursor",
                  },
                  {
                    label: "Distinct Field Values",
                    contentSite: "golang",
                    url: "/docs/drivers/go/:version/fundamentals/crud/read-operations/distinct",
                  },
                  {
                    label: "Sort Results",
                    contentSite: "golang",
                    url: "/docs/drivers/go/:version/fundamentals/crud/read-operations/sort",
                  },
                  {
                    label: "Skip Results",
                    contentSite: "golang",
                    url: "/docs/drivers/go/:version/fundamentals/crud/read-operations/skip",
                  },
                  {
                    label: "Limit Results",
                    contentSite: "golang",
                    url: "/docs/drivers/go/:version/fundamentals/crud/read-operations/limit",
                  },
                  {
                    label: "Specify Fields to Return",
                    contentSite: "golang",
                    url: "/docs/drivers/go/:version/fundamentals/crud/read-operations/project",
                  },
                  {
                    label: "Search Text",
                    contentSite: "golang",
                    url: "/docs/drivers/go/:version/fundamentals/crud/read-operations/text",
                  },
                  {
                    label: "Monitor Data Changes",
                    contentSite: "golang",
                    url: "/docs/drivers/go/:version/fundamentals/crud/read-operations/changestream",
                  },
                ],
              },
              {
                label: "Write",
                contentSite: "golang",
                url: "/docs/drivers/go/:version/fundamentals/crud/write-operations",
                collapsible: true,
                items: [
                  {
                    label: "Insert",
                    contentSite: "golang",
                    url: "/docs/drivers/go/:version/fundamentals/crud/write-operations/insert",
                  },
                  {
                    label: "Delete",
                    contentSite: "golang",
                    url: "/docs/drivers/go/:version/fundamentals/crud/write-operations/delete",
                  },
                  {
                    label: "Modify",
                    contentSite: "golang",
                    url: "/docs/drivers/go/:version/fundamentals/crud/write-operations/modify",
                  },
                  {
                    label: "Update Arrays",
                    contentSite: "golang",
                    url: "/docs/drivers/go/:version/fundamentals/crud/write-operations/embedded-arrays",
                  },
                  {
                    label: "Upsert",
                    contentSite: "golang",
                    url: "/docs/drivers/go/:version/fundamentals/crud/write-operations/upsert",
                  },
                  {
                    label: "Bulk Operations",
                    contentSite: "golang",
                    url: "/docs/drivers/go/:version/fundamentals/crud/write-operations/bulk",
                  },
                ],
              },
              {
                label: "Compound Operations",
                contentSite: "golang",
                url: "/docs/drivers/go/:version/fundamentals/crud/compound-operations",
              },
              {
                label: "Modify CRUD Execution",
                contentSite: "golang",
                url: "/docs/drivers/go/:version/fundamentals/crud/write-read-pref",
              },
            ],
          },
          {
            label: "Atlas Vector Search",
            contentSite: "golang",
            url: "/docs/drivers/go/:version/fundamentals/atlas-vector-search",
          },
          {
            label: "Aggregation",
            contentSite: "golang",
            url: "/docs/drivers/go/:version/fundamentals/aggregation",
          },
          {
            label: "Indexes",
            contentSite: "golang",
            url: "/docs/drivers/go/:version/fundamentals/indexes",
          },
          {
            label: "Transactions",
            contentSite: "golang",
            url: "/docs/drivers/go/:version/fundamentals/transactions",
          },
          {
            label: "Logging",
            contentSite: "golang",
            url: "/docs/drivers/go/:version/fundamentals/logging",
          },
          {
            label: "Run a Command",
            contentSite: "golang",
            url: "/docs/drivers/go/:version/fundamentals/run-command",
          },
          {
            label: "Collations",
            contentSite: "golang",
            url: "/docs/drivers/go/:version/fundamentals/collations",
          },
          {
            label: "Monitoring",
            contentSite: "golang",
            url: "/docs/drivers/go/:version/fundamentals/monitoring",
            collapsible: true,
            items: [
              {
                label: "Cluster Monitoring",
                contentSite: "golang",
                url: "/docs/drivers/go/:version/fundamentals/monitoring/cluster-monitoring",
              },
              {
                label: "Command Monitoring",
                contentSite: "golang",
                url: "/docs/drivers/go/:version/fundamentals/monitoring/command-monitoring",
              },
              {
                label: "Connection Monitoring",
                contentSite: "golang",
                url: "/docs/drivers/go/:version/fundamentals/monitoring/connection-monitoring",
              },
            ],
          },
          {
            label: "GridFS",
            contentSite: "golang",
            url: "/docs/drivers/go/:version/fundamentals/gridfs",
          },
          {
            label: "Time Series Collections",
            contentSite: "golang",
            url: "/docs/drivers/go/:version/fundamentals/time-series",
          },
          {
            label: "In-Use Encryption",
            contentSite: "golang",
            url: "/docs/drivers/go/:version/fundamentals/encrypt-fields",
          },
          {
            label: "Geospatial Data",
            contentSite: "golang",
            url: "/docs/drivers/go/:version/fundamentals/geo",
          },
        ],
      },
      {
        label: "API Documentation",
        isExternal: true,
        url: "https://pkg.go.dev/go.mongodb.org/mongo-driver/v2/mongo",
      },
      {
        label: "FAQ",
        contentSite: "golang",
        url: "/docs/drivers/go/:version/faq",
      },
      {
        label: "Connection Troubleshooting",
        contentSite: "golang",
        url: "/docs/drivers/go/:version/connection-troubleshooting",
      },
      {
        label: "Issues & Help",
        contentSite: "golang",
        url: "/docs/drivers/go/:version/issues-and-help",
      },
      {
        label: "Compatibility",
        contentSite: "golang",
        url: "/docs/drivers/go/:version/compatibility",
      },
      {
        label: "View the Source",
        isExternal: true,
        url: "https://github.com/mongodb/mongo-go-driver",
      },
    ],
  },
];

export default tocData;
