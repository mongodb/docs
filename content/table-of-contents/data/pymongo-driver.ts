import type { TocItem } from "../types";

const tocData: TocItem[] = [
  {
    label: "PyMongo Driver",
    contentSite: "pymongo",
    url: "/docs/languages/python/drivers/pymongo-driver/:version/",
    collapsible: true,
    items: [
      {
        label: "Get Started",
        contentSite: "pymongo",
        url: "/docs/languages/python/drivers/pymongo-driver/:version/get-started",
      },
      {
        label: "Connect",
        contentSite: "pymongo",
        url: "/docs/languages/python/drivers/pymongo-driver/:version/connect",
        collapsible: true,
        items: [
          {
            label: "Create a MongoClient",
            contentSite: "pymongo",
            url: "/docs/languages/python/drivers/pymongo-driver/:version/connect/mongoclient",
          },
          {
            label: "Choose a Connection Target",
            contentSite: "pymongo",
            url: "/docs/languages/python/drivers/pymongo-driver/:version/connect/connection-targets",
          },
          {
            label: "Specify Connection Options",
            contentSite: "pymongo",
            url: "/docs/languages/python/drivers/pymongo-driver/:version/connect/connection-options",
            collapsible: true,
            items: [
              {
                label: "Compress Network Traffic",
                contentSite: "pymongo",
                url: "/docs/languages/python/drivers/pymongo-driver/:version/connect/connection-options/network-compression",
              },
              {
                label: "Customize Server Selection",
                contentSite: "pymongo",
                url: "/docs/languages/python/drivers/pymongo-driver/:version/connect/connection-options/server-selection",
              },
              {
                label: "Stable API",
                contentSite: "pymongo",
                url: "/docs/languages/python/drivers/pymongo-driver/:version/connect/connection-options/stable-api",
              },
              {
                label: "Limit Server Execution Time",
                contentSite: "pymongo",
                url: "/docs/languages/python/drivers/pymongo-driver/:version/connect/connection-options/csot",
              },
              {
                label: "Connection Pools",
                contentSite: "pymongo",
                url: "/docs/languages/python/drivers/pymongo-driver/:version/connect/connection-options/connection-pools",
              },
            ],
          },
        ],
      },
      {
        label: "Databases & Collections",
        contentSite: "pymongo",
        url: "/docs/languages/python/drivers/pymongo-driver/:version/databases-collections",
      },
      {
        label: "CRUD Operations",
        contentSite: "pymongo",
        url: "/docs/languages/python/drivers/pymongo-driver/:version/crud",
        collapsible: true,
        items: [
          {
            label: "Insert Documents",
            contentSite: "pymongo",
            url: "/docs/languages/python/drivers/pymongo-driver/:version/crud/insert",
          },
          {
            label: "Query Documents",
            contentSite: "pymongo",
            url: "/docs/languages/python/drivers/pymongo-driver/:version/crud/query",
            collapsible: true,
            items: [
              {
                label: "Specify a Query",
                contentSite: "pymongo",
                url: "/docs/languages/python/drivers/pymongo-driver/:version/crud/query/specify-query",
              },
              {
                label: "Find Documents",
                contentSite: "pymongo",
                url: "/docs/languages/python/drivers/pymongo-driver/:version/crud/query/find",
              },
              {
                label: "Specify Documents to Return",
                contentSite: "pymongo",
                url: "/docs/languages/python/drivers/pymongo-driver/:version/crud/query/specify-documents-to-return",
              },
              {
                label: "Specify Fields to Return",
                contentSite: "pymongo",
                url: "/docs/languages/python/drivers/pymongo-driver/:version/crud/query/project",
              },
              {
                label: "Count Documents",
                contentSite: "pymongo",
                url: "/docs/languages/python/drivers/pymongo-driver/:version/crud/query/count",
              },
              {
                label: "Distinct Field Values",
                contentSite: "pymongo",
                url: "/docs/languages/python/drivers/pymongo-driver/:version/crud/query/distinct",
              },
              {
                label: "Access Data from a Cursor",
                contentSite: "pymongo",
                url: "/docs/languages/python/drivers/pymongo-driver/:version/crud/query/cursors",
              },
            ],
          },
          {
            label: "Update Documents",
            contentSite: "pymongo",
            url: "/docs/languages/python/drivers/pymongo-driver/:version/crud/update",
          },
          {
            label: "Replace Documents",
            contentSite: "pymongo",
            url: "/docs/languages/python/drivers/pymongo-driver/:version/crud/replace",
          },
          {
            label: "Delete Documents",
            contentSite: "pymongo",
            url: "/docs/languages/python/drivers/pymongo-driver/:version/crud/delete",
          },
          {
            label: "Bulk Write Operations",
            contentSite: "pymongo",
            url: "/docs/languages/python/drivers/pymongo-driver/:version/crud/bulk-write",
          },
          {
            label: "Transactions",
            contentSite: "pymongo",
            url: "/docs/languages/python/drivers/pymongo-driver/:version/crud/transactions",
          },
          {
            label: "Store Large Files",
            contentSite: "pymongo",
            url: "/docs/languages/python/drivers/pymongo-driver/:version/crud/gridfs",
          },
          {
            label: "Configure CRUD Operations",
            contentSite: "pymongo",
            url: "/docs/languages/python/drivers/pymongo-driver/:version/crud/configure",
          },
          {
            label: "Geospatial Queries",
            contentSite: "pymongo",
            url: "/docs/languages/python/drivers/pymongo-driver/:version/crud/geo",
          },
        ],
      },
      {
        label: "Aggregation",
        contentSite: "pymongo",
        url: "/docs/languages/python/drivers/pymongo-driver/:version/aggregation",
      },
      {
        label: "Data Formats",
        contentSite: "pymongo",
        url: "/docs/languages/python/drivers/pymongo-driver/:version/data-formats",
        collapsible: true,
        items: [
          {
            label: "BSON",
            contentSite: "pymongo",
            url: "/docs/languages/python/drivers/pymongo-driver/:version/data-formats/bson",
          },
          {
            label: "Extended JSON",
            contentSite: "pymongo",
            url: "/docs/languages/python/drivers/pymongo-driver/:version/data-formats/extended-json",
          },
          {
            label: "Custom Types",
            contentSite: "pymongo",
            url: "/docs/languages/python/drivers/pymongo-driver/:version/data-formats/custom-types",
            collapsible: true,
            items: [
              {
                label: "Serialization",
                contentSite: "pymongo",
                url: "/docs/languages/python/drivers/pymongo-driver/:version/data-formats/custom-types/serialization",
              },
              {
                label: "Type Codecs",
                contentSite: "pymongo",
                url: "/docs/languages/python/drivers/pymongo-driver/:version/data-formats/custom-types/type-codecs",
              },
            ],
          },
          {
            label: "Dates & Times",
            contentSite: "pymongo",
            url: "/docs/languages/python/drivers/pymongo-driver/:version/data-formats/dates-and-times",
          },
          {
            label: "UUIDs",
            contentSite: "pymongo",
            url: "/docs/languages/python/drivers/pymongo-driver/:version/data-formats/uuid",
          },
          {
            label: "Time Series Data",
            contentSite: "pymongo",
            url: "/docs/languages/python/drivers/pymongo-driver/:version/data-formats/time-series",
          },
        ],
      },
      {
        label: "Indexes",
        contentSite: "pymongo",
        url: "/docs/languages/python/drivers/pymongo-driver/:version/indexes",
      },
      {
        label: "Run a Database Command",
        contentSite: "pymongo",
        url: "/docs/languages/python/drivers/pymongo-driver/:version/run-command",
      },
      {
        label: "Atlas Search",
        contentSite: "pymongo",
        url: "/docs/languages/python/drivers/pymongo-driver/:version/atlas-search",
      },
      {
        label: "Atlas Vector Search",
        contentSite: "cloud-docs",
        url: "/docs/atlas/atlas-vector-search/vector-search-overview/",
      },
      {
        label: "Monitoring and Logging",
        contentSite: "pymongo",
        url: "/docs/languages/python/drivers/pymongo-driver/:version/monitoring-and-logging",
        collapsible: true,
        items: [
          {
            label: "Monitoring",
            contentSite: "pymongo",
            url: "/docs/languages/python/drivers/pymongo-driver/:version/monitoring-and-logging/monitoring",
          },
          {
            label: "Logging",
            contentSite: "pymongo",
            url: "/docs/languages/python/drivers/pymongo-driver/:version/monitoring-and-logging/logging",
          },
          {
            label: "Change Streams",
            contentSite: "pymongo",
            url: "/docs/languages/python/drivers/pymongo-driver/:version/monitoring-and-logging/change-streams",
          },
        ],
      },
      {
        label: "Security",
        contentSite: "pymongo",
        url: "/docs/languages/python/drivers/pymongo-driver/:version/security",
        collapsible: true,
        items: [
          {
            label: "Authentication",
            contentSite: "pymongo",
            url: "/docs/languages/python/drivers/pymongo-driver/:version/security/authentication",
            collapsible: true,
            items: [
              {
                label: "SCRAM",
                contentSite: "pymongo",
                url: "/docs/languages/python/drivers/pymongo-driver/:version/security/authentication/scram",
              },
              {
                label: "X.509",
                contentSite: "pymongo",
                url: "/docs/languages/python/drivers/pymongo-driver/:version/security/authentication/x509",
              },
              {
                label: "AWS IAM",
                contentSite: "pymongo",
                url: "/docs/languages/python/drivers/pymongo-driver/:version/security/authentication/aws-iam",
              },
              {
                label: "OIDC",
                contentSite: "pymongo",
                url: "/docs/languages/python/drivers/pymongo-driver/:version/security/authentication/oidc",
              },
              {
                label: "LDAP (PLAIN)",
                contentSite: "pymongo",
                url: "/docs/languages/python/drivers/pymongo-driver/:version/security/authentication/ldap",
              },
              {
                label: "Kerberos (GSSAPI)",
                contentSite: "pymongo",
                url: "/docs/languages/python/drivers/pymongo-driver/:version/security/authentication/kerberos",
              },
            ],
          },
          {
            label: "In-Use Encryption",
            contentSite: "pymongo",
            url: "/docs/languages/python/drivers/pymongo-driver/:version/security/in-use-encryption",
          },
          {
            label: "TLS",
            contentSite: "pymongo",
            url: "/docs/languages/python/drivers/pymongo-driver/:version/security/tls",
          },
        ],
      },
      {
        label: "Third-Party Integrations",
        contentSite: "pymongo",
        url: "/docs/languages/python/drivers/pymongo-driver/:version/integrations",
        collapsible: true,
        items: [
          {
            label: "Tutorial: Flask and Celery Integration",
            contentSite: "pymongo",
            url: "/docs/languages/python/drivers/pymongo-driver/:version/integrations/flask-celery-integration",
          },
        ],
      },
      {
        label: "Reference",
        contentSite: "pymongo",
        url: "/docs/languages/python/drivers/pymongo-driver/:version/reference",
        collapsible: true,
        items: [
          {
            label: "Release Notes",
            contentSite: "pymongo",
            url: "/docs/languages/python/drivers/pymongo-driver/:version/reference/release-notes",
          },
          {
            label: "Compatibility",
            contentSite: "pymongo",
            url: "/docs/languages/python/drivers/pymongo-driver/:version/reference/compatibility",
          },
          {
            label: "Upgrade Guides",
            contentSite: "pymongo",
            url: "/docs/languages/python/drivers/pymongo-driver/:version/reference/upgrade",
          },
          {
            label: "Migrate to PyMongo Async",
            contentSite: "pymongo",
            url: "/docs/languages/python/drivers/pymongo-driver/:version/reference/migration",
          },
          {
            label: "Previous Versions",
            contentSite: "pymongo",
            url: "/docs/languages/python/drivers/pymongo-driver/:version/reference/previous-versions",
          },
        ],
      },
      {
        label: "API Documentation",
        isExternal: true,
        url: "https://pymongo.readthedocs.io/en/4.13.2/api/",
      },
      {
        label: "Issues & Help",
        contentSite: "pymongo",
        url: "/docs/languages/python/drivers/pymongo-driver/:version/issues-and-help",
      },
    ],
  },
];

export default tocData;
