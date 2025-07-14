import type { TocItem } from "../types";

const tocData: TocItem[] = [
  {
    label: "C#/.NET Driver",
    contentSite: "csharp",
    url: "/docs/drivers/csharp/:version/",
    collapsible: true,
    items: [
      {
        label: "Previous Versions",
        contentSite: "csharp",
        url: "/docs/drivers/csharp/:version/previous-versions",
      },
      {
        label: "Quick Start",
        contentSite: "csharp",
        url: "/docs/drivers/csharp/:version/quick-start",
      },
      {
        label: "Quick Reference",
        contentSite: "csharp",
        url: "/docs/drivers/csharp/:version/quick-reference",
      },
      {
        label: "What's New",
        contentSite: "csharp",
        url: "/docs/drivers/csharp/:version/whats-new",
      },
      {
        label: "Usage Examples",
        contentSite: "csharp",
        url: "/docs/drivers/csharp/:version/usage-examples",
        collapsible: true,
        items: [
          {
            label: "Find a Document",
            contentSite: "csharp",
            url: "/docs/drivers/csharp/:version/usage-examples/findOne",
          },
          {
            label: "Find Multiple Documents",
            contentSite: "csharp",
            url: "/docs/drivers/csharp/:version/usage-examples/findMany",
          },
          {
            label: "Insert a Document",
            contentSite: "csharp",
            url: "/docs/drivers/csharp/:version/usage-examples/insertOne",
          },
          {
            label: "Insert Multiple Documents",
            contentSite: "csharp",
            url: "/docs/drivers/csharp/:version/usage-examples/insertMany",
          },
          {
            label: "Update a Document",
            contentSite: "csharp",
            url: "/docs/drivers/csharp/:version/usage-examples/updateOne",
          },
          {
            label: "Update Many Documents",
            contentSite: "csharp",
            url: "/docs/drivers/csharp/:version/usage-examples/updateMany",
          },
          {
            label: "Replace a Document",
            contentSite: "csharp",
            url: "/docs/drivers/csharp/:version/usage-examples/replaceOne",
          },
          {
            label: "Delete a Document",
            contentSite: "csharp",
            url: "/docs/drivers/csharp/:version/usage-examples/deleteOne",
          },
          {
            label: "Delete Many Documents",
            contentSite: "csharp",
            url: "/docs/drivers/csharp/:version/usage-examples/deleteMany",
          },
        ],
      },
      {
        label: "Fundamentals",
        contentSite: "csharp",
        url: "/docs/drivers/csharp/:version/fundamentals",
        collapsible: true,
        items: [
          {
            label: "Connection",
            contentSite: "csharp",
            url: "/docs/drivers/csharp/:version/fundamentals/connection",
            collapsible: true,
            items: [
              {
                label: "Connection Guide",
                contentSite: "csharp",
                url: "/docs/drivers/csharp/:version/fundamentals/connection/connect",
              },
              {
                label: "Connection Options",
                contentSite: "csharp",
                url: "/docs/drivers/csharp/:version/fundamentals/connection/connection-options",
              },
              {
                label: "Configure TLS",
                contentSite: "csharp",
                url: "/docs/drivers/csharp/:version/fundamentals/connection/tls",
              },
              {
                label: "Network Compression",
                contentSite: "csharp",
                url: "/docs/drivers/csharp/:version/fundamentals/connection/network-compression",
              },
              {
                label: "Connect with AWS Lambda",
                contentSite: "cloud-docs",
                url: "/docs/atlas/manage-connections-aws-lambda/",
              },
            ],
          },
          {
            label: "Databases & Collections",
            contentSite: "csharp",
            url: "/docs/drivers/csharp/:version/fundamentals/database-collection",
            collapsible: true,
            items: [
              {
                label: "Run a Database Command",
                contentSite: "csharp",
                url: "/docs/drivers/csharp/:version/fundamentals/databases-collections/run-command",
              },
            ],
          },
          {
            label: "CRUD Operations",
            contentSite: "csharp",
            url: "/docs/drivers/csharp/:version/fundamentals/crud",
            collapsible: true,
            items: [
              {
                label: "Write",
                contentSite: "csharp",
                url: "/docs/drivers/csharp/:version/fundamentals/crud/write-operations",
                collapsible: true,
                items: [
                  {
                    label: "Insert",
                    contentSite: "csharp",
                    url: "/docs/drivers/csharp/:version/fundamentals/crud/write-operations/insert",
                  },
                  {
                    label: "Update One",
                    contentSite: "csharp",
                    url: "/docs/drivers/csharp/:version/fundamentals/crud/write-operations/update-one",
                    collapsible: true,
                    items: [
                      {
                        label: "Fields",
                        contentSite: "csharp",
                        url: "/docs/drivers/csharp/:version/fundamentals/crud/write-operations/update-one/fields",
                      },
                      {
                        label: "Arrays",
                        contentSite: "csharp",
                        url: "/docs/drivers/csharp/:version/fundamentals/crud/write-operations/update-one/arrays",
                      },
                    ],
                  },
                  {
                    label: "Update Many",
                    contentSite: "csharp",
                    url: "/docs/drivers/csharp/:version/fundamentals/crud/write-operations/update-many",
                    collapsible: true,
                    items: [
                      {
                        label: "Fields",
                        contentSite: "csharp",
                        url: "/docs/drivers/csharp/:version/fundamentals/crud/write-operations/update-many/fields",
                      },
                      {
                        label: "Arrays",
                        contentSite: "csharp",
                        url: "/docs/drivers/csharp/:version/fundamentals/crud/write-operations/update-many/arrays",
                      },
                    ],
                  },
                  {
                    label: "Replace",
                    contentSite: "csharp",
                    url: "/docs/drivers/csharp/:version/fundamentals/crud/write-operations/replace",
                  },
                  {
                    label: "Delete",
                    contentSite: "csharp",
                    url: "/docs/drivers/csharp/:version/fundamentals/crud/write-operations/delete",
                  },
                  {
                    label: "Bulk Write",
                    contentSite: "csharp",
                    url: "/docs/drivers/csharp/:version/fundamentals/crud/write-operations/bulk-write",
                  },
                ],
              },
              {
                label: "Read",
                contentSite: "csharp",
                url: "/docs/drivers/csharp/:version/fundamentals/crud/read-operations",
                collapsible: true,
                items: [
                  {
                    label: "Retrieve Data",
                    contentSite: "csharp",
                    url: "/docs/drivers/csharp/:version/fundamentals/crud/read-operations/retrieve",
                  },
                  {
                    label: "Specify Fields to Return",
                    contentSite: "csharp",
                    url: "/docs/drivers/csharp/:version/fundamentals/crud/read-operations/project",
                  },
                  {
                    label: "Count Documents",
                    contentSite: "csharp",
                    url: "/docs/drivers/csharp/:version/fundamentals/crud/read-operations/count",
                  },
                  {
                    label: "List Distinct Values",
                    contentSite: "csharp",
                    url: "/docs/drivers/csharp/:version/fundamentals/crud/read-operations/distinct",
                  },
                  {
                    label: "Monitor Data Changes",
                    contentSite: "csharp",
                    url: "/docs/drivers/csharp/:version/fundamentals/crud/read-operations/change-streams",
                  },
                  {
                    label: "Specify Query Results",
                    contentSite: "csharp",
                    url: "/docs/drivers/csharp/:version/fundamentals/crud/read-operations/specify-documents-to-return",
                  },
                ],
              },
              {
                label: "Tutorial: Create a RESTful API",
                contentSite: "csharp",
                url: "/docs/drivers/csharp/:version/fundamentals/crud/restful-api-tutorial",
              },
            ],
          },
          {
            label: "Operations with Builders",
            contentSite: "csharp",
            url: "/docs/drivers/csharp/:version/fundamentals/builders",
          },
          {
            label: "Atlas Search",
            contentSite: "csharp",
            url: "/docs/drivers/csharp/:version/fundamentals/atlas-search",
          },
          {
            label: "Atlas Vector Search",
            contentSite: "csharp",
            url: "/docs/drivers/csharp/:version/fundamentals/atlas-vector-search",
          },
          {
            label: "Stable API",
            contentSite: "csharp",
            url: "/docs/drivers/csharp/:version/fundamentals/stable-api",
          },
          {
            label: "Authentication",
            contentSite: "csharp",
            url: "/docs/drivers/csharp/:version/fundamentals/authentication",
            collapsible: true,
            items: [
              {
                label: "SCRAM",
                contentSite: "csharp",
                url: "/docs/drivers/csharp/:version/fundamentals/authentication/scram",
              },
              {
                label: "X.509",
                contentSite: "csharp",
                url: "/docs/drivers/csharp/:version/fundamentals/authentication/x509",
              },
              {
                label: "AWS IAM",
                contentSite: "csharp",
                url: "/docs/drivers/csharp/:version/fundamentals/authentication/aws-iam",
              },
              {
                label: "OIDC",
                contentSite: "csharp",
                url: "/docs/drivers/csharp/:version/fundamentals/authentication/oidc",
              },
              {
                label: "LDAP (PLAIN)",
                contentSite: "csharp",
                url: "/docs/drivers/csharp/:version/fundamentals/authentication/ldap",
              },
              {
                label: "Kerberos (GSSAPI)",
                contentSite: "csharp",
                url: "/docs/drivers/csharp/:version/fundamentals/authentication/kerberos",
              },
            ],
          },
          {
            label: "Aggregation",
            contentSite: "csharp",
            url: "/docs/drivers/csharp/:version/fundamentals/aggregation",
          },
          {
            label: "LINQ",
            contentSite: "csharp",
            url: "/docs/drivers/csharp/:version/fundamentals/linq",
          },
          {
            label: "BSON Operations",
            contentSite: "csharp",
            url: "/docs/drivers/csharp/:version/fundamentals/bson",
          },
          {
            label: "Query",
            contentSite: "csharp",
            url: "/docs/drivers/csharp/:version/fundamentals/specify-query",
          },
          {
            label: "Serialization",
            contentSite: "csharp",
            url: "/docs/drivers/csharp/:version/fundamentals/serialization",
            collapsible: true,
            items: [
              {
                label: "Class Mapping",
                contentSite: "csharp",
                url: "/docs/drivers/csharp/:version/fundamentals/serialization/class-mapping",
              },
              {
                label: "POCOs",
                contentSite: "csharp",
                url: "/docs/drivers/csharp/:version/fundamentals/serialization/poco",
              },
              {
                label: "Polymorphic Objects",
                contentSite: "csharp",
                url: "/docs/drivers/csharp/:version/fundamentals/serialization/polymorphic-objects",
              },
              {
                label: "GUIDs",
                contentSite: "csharp",
                url: "/docs/drivers/csharp/:version/fundamentals/serialization/guid-serialization",
              },
            ],
          },
          {
            label: "Transactions",
            contentSite: "csharp",
            url: "/docs/drivers/csharp/:version/fundamentals/transactions",
          },
          {
            label: "Indexes",
            contentSite: "csharp",
            url: "/docs/drivers/csharp/:version/fundamentals/indexes",
            collapsible: true,
            items: [
              {
                label: "Atlas Search & Vector Search Indexes",
                contentSite: "csharp",
                url: "/docs/drivers/csharp/:version/fundamentals/indexes/search-indexes",
              },
            ],
          },
          {
            label: "Logging",
            contentSite: "csharp",
            url: "/docs/drivers/csharp/:version/fundamentals/logging",
          },
          {
            label: "Time Series Collections",
            contentSite: "csharp",
            url: "/docs/drivers/csharp/:version/fundamentals/time-series",
          },
          {
            label: "In-Use Encryption",
            contentSite: "csharp",
            url: "/docs/drivers/csharp/:version/fundamentals/encrypt-fields",
          },
          {
            label: "Search Geospatially",
            contentSite: "csharp",
            url: "/docs/drivers/csharp/:version/fundamentals/geo",
          },
          {
            label: "Store Large Files",
            contentSite: "csharp",
            url: "/docs/drivers/csharp/:version/fundamentals/gridfs",
          },
          {
            label: "Replica Set Operations",
            contentSite: "csharp",
            url: "/docs/drivers/csharp/:version/fundamentals/read-write-configuration",
          },
          {
            label: "OData",
            contentSite: "csharp",
            url: "/docs/drivers/csharp/:version/fundamentals/odata",
          },
          {
            label: "Monitoring",
            contentSite: "csharp",
            url: "/docs/drivers/csharp/:version/fundamentals/monitoring",
          },
        ],
      },
      {
        label: "API Documentation",
        isExternal: true,
        url: "https://mongodb.github.io/mongo-csharp-driver/3.4.0/api/index.html",
      },
      {
        label: "FAQ",
        contentSite: "csharp",
        url: "/docs/drivers/csharp/:version/faq",
      },
      {
        label: "Connection Troubleshooting",
        contentSite: "csharp",
        url: "/docs/drivers/csharp/:version/connection-troubleshooting",
      },
      {
        label: "Issues & Help",
        contentSite: "csharp",
        url: "/docs/drivers/csharp/:version/issues-and-help",
      },
      {
        label: "Compatibility",
        contentSite: "csharp",
        url: "/docs/drivers/csharp/:version/compatibility",
      },
      {
        label: "Upgrade",
        contentSite: "csharp",
        url: "/docs/drivers/csharp/:version/upgrade",
        collapsible: true,
        items: [
          {
            label: "Version 2.x",
            contentSite: "csharp",
            url: "/docs/drivers/csharp/:version/upgrade/v2",
          },
          {
            label: "Version 3.0",
            contentSite: "csharp",
            url: "/docs/drivers/csharp/:version/upgrade/v3",
          },
        ],
      },
      {
        label: "Entity Framework Provider",
        contentSite: "entity-framework",
        url: "/docs/entity-framework/current/",
      },
      {
        label: "C# Analyzer",
        contentSite: "mongodb-analyzer",
        url: "/docs/mongodb-analyzer/",
      },
    ],
  },
];

export default tocData;
