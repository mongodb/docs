import type { TocItem } from "../types";

const tocData: TocItem[] = [
  {
    label: "Ruby Driver",
    contentSite: "ruby-driver",
    group: true,
    versionDropdown: true,
    items: [
      {
        label: "Overview",
        contentSite: "ruby-driver",
        url: "/docs/ruby-driver/:version/",
      },
      {
        label: "Get Started",
        contentSite: "ruby-driver",
        url: "/docs/ruby-driver/:version/get-started",
      },
      {
        label: "Connect",
        contentSite: "ruby-driver",
        collapsible: true,
        items: [
          {
            label: "Create a Client",
            contentSite: "ruby-driver",
            url: "/docs/ruby-driver/:version/connect/mongoclient",
          },
          {
            label: "Choose a Connection Target",
            contentSite: "ruby-driver",
            url: "/docs/ruby-driver/:version/connect/connection-targets",
          },
          {
            label: "Connection Options",
            contentSite: "ruby-driver",
            url: "/docs/ruby-driver/:version/connect/connection-options",
            collapsible: true,
            items: [
              {
                label: "Compress Network Traffic",
                contentSite: "ruby-driver",
                url: "/docs/ruby-driver/:version/connect/network-compression",
              },
              {
                label: "Stable API",
                contentSite: "ruby-driver",
                url: "/docs/ruby-driver/:version/connect/stable-api",
              },
              {
                label: "Limit Server Execution Time",
                contentSite: "ruby-driver",
                url: "/docs/ruby-driver/:version/connect/csot",
              },
              {
                label: "Connection Pools",
                contentSite: "ruby-driver",
                url: "/docs/ruby-driver/:version/connect/connection-pools",
              },
              {
                label: "Server Selection",
                contentSite: "ruby-driver",
                url: "/docs/ruby-driver/:version/connect/server-selection",
              },
            ],
          },
          {
            label: "AWS Lambda",
            contentSite: "cloud-docs",
            url: "https://www.mongodb.com/docs/atlas/manage-connections-aws-lambda",
          },
        ],
      },
      {
        label: "Databases & Collections",
        contentSite: "ruby-driver",
        url: "/docs/ruby-driver/:version/databases-collection",
        collapsible: true,
        items: [
          {
            label: "Run a Database Command",
            contentSite: "ruby-driver",
            url: "/docs/ruby-driver/:version/databases-collections/run-command",
          },
        ],
      },
      {
        label: "CRUD Operations",
        contentSite: "ruby-driver",
        collapsible: true,
        items: [
          {
            label: "Insert Documents",
            contentSite: "ruby-driver",
            url: "/docs/ruby-driver/:version/crud/insert",
          },
          {
            label: "Query Documents",
            contentSite: "ruby-driver",
            url: "/docs/ruby-driver/:version/crud/query",
            collapsible: true,
            items: [
              {
                label: "Specify a Query",
                contentSite: "ruby-driver",
                url: "/docs/ruby-driver/:version/crud/query/specify-a-query",
              },
              {
                label: "Find Documents",
                contentSite: "ruby-driver",
                url: "/docs/ruby-driver/:version/crud/query/find",
              },
              {
                label: "Specify Documents to Return",
                contentSite: "ruby-driver",
                url: "/docs/ruby-driver/:version/crud/query/specify-documents-to-return",
              },
              {
                label: "Specify Fields to Return",
                contentSite: "ruby-driver",
                url: "/docs/ruby-driver/:version/crud/query/project",
              },
              {
                label: "Distinct Field Values",
                contentSite: "ruby-driver",
                url: "/docs/ruby-driver/:version/crud/query/distinct",
              },
              {
                label: "Count Documents",
                contentSite: "ruby-driver",
                url: "/docs/ruby-driver/:version/crud/query/count",
              },
              {
                label: "Access Data From a Cursor",
                contentSite: "ruby-driver",
                url: "/docs/ruby-driver/:version/crud/query/cursors",
              },
            ],
          },
          {
            label: "Update Documents",
            contentSite: "ruby-driver",
            url: "/docs/ruby-driver/:version/crud/update",
            collapsible: true,
            items: [ 
              {
                label: "Replace Documents",
                contentSite: "ruby-driver",
                url: "/docs/ruby-driver/:version/crud/replace",
              },
            ],
          },
          {
            label: "Delete Documents",
            contentSite: "ruby-driver",
            url: "/docs/ruby-driver/:version/crud/delete",
          },
          {
            label: "Bulk Write Operations",
            contentSite: "ruby-driver",
            url: "/docs/ruby-driver/:version/crud/bulk-write",
          },
          {
            label: "Transactions",
            contentSite: "ruby-driver",
            url: "/docs/ruby-driver/:version/crud/transactions",
          },
          {
            label: "Configure CRUD Operations",
            contentSite: "ruby-driver",
            url: "/docs/ruby-driver/:version/crud/configure-crud",
          },
          {
            label: "Store Large Files",
            contentSite: "ruby-driver",
            url: "/docs/ruby-driver/:version/crud/gridfs",
          },
          {
            label: "Collations",
            contentSite: "ruby-driver",
            url: "/docs/ruby-driver/:version/crud/collations",
          },
        ],
      },
      {
        label: "Aggregation",
        contentSite: "ruby-driver",
        url: "/docs/ruby-driver/:version/aggregation",
      },
      {
        label: "Data Formats",
        contentSite: "ruby-driver",
        collapsible: true,
        items: [
          {
            label: "BSON",
            contentSite: "ruby-driver",
            url: "/docs/ruby-driver/:version/data-formats/bson",
          },
          {
            label: "Extended JSON",
            contentSite: "ruby-driver",
            url: "/docs/ruby-driver/:version/data-formats/extended-json",
          },
          {
            label: "Time Series Data",
            contentSite: "ruby-driver",
            url: "/docs/ruby-driver/:version/data-formats/time-series",
          },
        ],
      },
      {
        label: "Indexes",
        contentSite: "ruby-driver",
        url: "/docs/ruby-driver/:version/indexes",
        collapsible: true,
        items: [
          {
            label: "Single Field",
            contentSite: "ruby-driver",
            url: "/docs/ruby-driver/:version/indexes/single-field-index",
          },
          {
            label: "Compound",
            contentSite: "ruby-driver",
            url: "/docs/ruby-driver/:version/indexes/compound-index",
          },
          {
            label: "Multikey",
            contentSite: "ruby-driver",
            url: "/docs/ruby-driver/:version/indexes/multikey-index",
          },
          {
            label: "MongoDB Search",
            contentSite: "ruby-driver",
            url: "/docs/ruby-driver/:version/indexes/atlas-search-index",
          },
          {
            label: "Text",
            contentSite: "ruby-driver",
            url: "/docs/ruby-driver/:version/indexes/text-index",
          },
          {
            label: "Geospatial",
            contentSite: "ruby-driver",
            url: "/docs/ruby-driver/:version/indexes/geospatial-index",
          },
        ],
      },
      {
        label: "MongoDB Search",
        contentSite: "ruby-driver",
        url: "/docs/ruby-driver/:version/atlas-search",
      },
      {
        label: "MongoDB Vector Search",
        contentSite: "ruby-driver",
        url: "/docs/ruby-driver/:version/vector-search",
      },
      {
        label: "Monitoring and Logging",
        contentSite: "ruby-driver",
        collapsible: true,
        items: [
          {
            label: "Monitoring",
            contentSite: "ruby-driver",
            url: "/docs/ruby-driver/:version/logging-and-monitoring/monitoring",
          },
          {
            label: "Logging",
            contentSite: "ruby-driver",
            url: "/docs/ruby-driver/:version/logging-and-monitoring/logging",
          },
          {
            label: "Change Streams",
            contentSite: "ruby-driver",
            url: "/docs/ruby-driver/:version/logging-and-monitoring/change-streams",
          },
        ],
      },
      {
        label: "Security",
        contentSite: "ruby-driver",
        collapsible: true,
        items: [
          {
            label: "Authentication",
            contentSite: "ruby-driver",
            url: "/docs/ruby-driver/:version/security/authentication",
            collapsible: true,
            items: [
              {
                label: "SCRAM",
                contentSite: "ruby-driver",
                url: "/docs/ruby-driver/:version/security/auth-mechanisms/scram",
              },
              {
                label: "X.509",
                contentSite: "ruby-driver",
                url: "/docs/ruby-driver/:version/security/auth-mechanisms/x509",
              },
              {
                label: "AWS IAM",
                contentSite: "ruby-driver",
                url: "/docs/ruby-driver/:version/security/auth-mechanisms/aws-iam",
              },
              {
                label: "LDAP (PLAIN)",
                contentSite: "ruby-driver",
                url: "/docs/ruby-driver/:version/security/auth-mechanisms/ldap",
              },
              {
                label: "Kerberos (GSSAPI)",
                contentSite: "ruby-driver",
                url: "/docs/ruby-driver/:version/security/auth-mechanisms/kerberos",
              },
            ],
          },
          {
                label: "TLS",
                contentSite: "ruby-driver",
                url: "/docs/ruby-driver/:version/security/tls",
          },
          {
            label: "In-Use Encryption",
            contentSite: "ruby-driver",
            url: "/docs/ruby-driver/:version/security/in-use-encryption",
          },
        ],
      },
      {
        label: "Reference",
        contentSite: "ruby-driver",
        collapsible: true,
        items: [
          {
            label: "Release Notes",
            contentSite: "ruby-driver",
            url: "/docs/ruby-driver/:version/reference/release-notes",
          },
          {
            label: "Upgrade Versions",
            contentSite: "ruby-driver",
            url: "/docs/ruby-driver/:version/reference/upgrade",
          },
          {
            label: "View the Source",
            isExternal: true,
            url: "https://github.com/mongodb/mongo-ruby-driver",
          },
        ],
      },
      {
        label: "Compatibility",
        contentSite: "drivers",
        url: "/docs/drivers/compatibility/?driver-language=ruby&ruby-driver-framework=ruby-driver",
      },
      {
        label: "API Documentation",
        isExternal: true,
        url: "https://www.mongodb.com/docs/ruby-driver/current/api/",
      },
      {
        label: "Issues & Help",
        contentSite: "ruby-driver",
        url: "/docs/ruby-driver/:version/issues-and-help",
      },
    ],
  },
];

export default tocData;
