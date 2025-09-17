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
        collapsible: true,
        items: [
          {
            label: "Download & Install",
            contentSite: "ruby-driver",
            url: "/docs/ruby-driver/:version/get-started/download-and-install",
          },
          {
            label: "Create a Deployment",
            contentSite: "ruby-driver",
            url: "/docs/ruby-driver/:version/get-started/create-a-deployment",
          },
          {
            label: "Create a Connection String",
            contentSite: "ruby-driver",
            url: "/docs/ruby-driver/:version/get-started/create-a-connection-string",
          },
          {
            label: "Connect to MongoDB",
            contentSite: "ruby-driver",
            url: "/docs/ruby-driver/:version/get-started/connect-to-mongodb",
          },
          {
            label: "Next Steps",
            contentSite: "ruby-driver",
            url: "/docs/ruby-driver/:version/get-started/next-steps",
          },
        ],
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
            label: "Stable API",
            contentSite: "ruby-driver",
            url: "/docs/ruby-driver/:version/connect/stable-api",
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
          },
          {
            label: "Configure TLS",
            contentSite: "ruby-driver",
            url: "/docs/ruby-driver/:version/connect/tls",
          },
          {
            label: "Limit Server Execution Time",
            contentSite: "ruby-driver",
            url: "/docs/ruby-driver/:version/connect/csot",
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
            label: "Run a Command",
            contentSite: "ruby-driver",
            url: "/docs/ruby-driver/:version/databases-collections/run-command",
          },
        ],
      },
      {
        label: "Read Data",
        contentSite: "ruby-driver",
        url: "/docs/ruby-driver/:version/read",
        collapsible: true,
        items: [
          {
            label: "Retrieve Data",
            contentSite: "ruby-driver",
            url: "/docs/ruby-driver/:version/read/retrieve",
          },
          {
            label: "Specify a Query",
            contentSite: "ruby-driver",
            url: "/docs/ruby-driver/:version/read/specify-a-query",
          },
          {
            label: "Specify Documents to Return",
            contentSite: "ruby-driver",
            url: "/docs/ruby-driver/:version/read/specify-documents-to-return",
          },
          {
            label: "Specify Fields to Return",
            contentSite: "ruby-driver",
            url: "/docs/ruby-driver/:version/read/project",
          },
          {
            label: "Distinct Field Values",
            contentSite: "ruby-driver",
            url: "/docs/ruby-driver/:version/read/distinct",
          },
          {
            label: "Count Documents",
            contentSite: "ruby-driver",
            url: "/docs/ruby-driver/:version/read/count",
          },
          {
            label: "Cursors",
            contentSite: "ruby-driver",
            url: "/docs/ruby-driver/:version/read/cursors",
          },
          {
            label: "Monitor Changes",
            contentSite: "ruby-driver",
            url: "/docs/ruby-driver/:version/read/change-streams",
          },
          {
            label: "Collations",
            contentSite: "ruby-driver",
            url: "/docs/ruby-driver/:version/read/collations",
          },
        ],
      },
      {
        label: "Write Data",
        contentSite: "ruby-driver",
        url: "/docs/ruby-driver/:version/write",
        collapsible: true,
        items: [
          {
            label: "Insert Documents",
            contentSite: "ruby-driver",
            url: "/docs/ruby-driver/:version/write/insert",
          },
          {
            label: "Replace Documents",
            contentSite: "ruby-driver",
            url: "/docs/ruby-driver/:version/write/replace",
          },
          {
            label: "Update Documents",
            contentSite: "ruby-driver",
            url: "/docs/ruby-driver/:version/write/update",
          },
          {
            label: "Delete Documents",
            contentSite: "ruby-driver",
            url: "/docs/ruby-driver/:version/write/delete",
          },
          {
            label: "Bulk Write Operations",
            contentSite: "ruby-driver",
            url: "/docs/ruby-driver/:version/write/bulk-write",
          },
          {
            label: "Transactions",
            contentSite: "ruby-driver",
            url: "/docs/ruby-driver/:version/write/transactions",
          },
          {
            label: "Store Large Files by Using GridFS",
            contentSite: "ruby-driver",
            url: "/docs/ruby-driver/:version/write/gridfs",
          },
        ],
      },
      {
        label: "Operations on Replica Sets",
        contentSite: "ruby-driver",
        url: "/docs/ruby-driver/:version/read-write-pref",
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
            label: "Atlas Search",
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
        label: "Monitor Your Application",
        contentSite: "ruby-driver",
        collapsible: true,
        items: [
          {
            label: "Cluster Monitoring",
            contentSite: "ruby-driver",
            url: "/docs/ruby-driver/:version/monitoring/cluster-monitoring",
          },
        ],
      },
      {
        label: "Data Aggregation",
        contentSite: "ruby-driver",
        url: "/docs/ruby-driver/:version/aggregation",
      },
      {
        label: "Atlas Vector Search",
        contentSite: "ruby-driver",
        url: "/docs/ruby-driver/:version/vector-search",
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
            label: "In-Use Encryption",
            contentSite: "ruby-driver",
            url: "/docs/ruby-driver/:version/security/in-use-encryption",
          },
        ],
      },
      {
        label: "Data Formats",
        contentSite: "ruby-driver",
        collapsible: true,
        items: [
          {
            label: "Time Series Data",
            contentSite: "ruby-driver",
            url: "/docs/ruby-driver/:version/data-formats/time-series",
          },
          {
            label: "BSON",
            contentSite: "ruby-driver",
            url: "/docs/ruby-driver/:version/data-formats/bson",
          },
        ],
      },
      {
        label: "API Documentation",
        isExternal: true,
        url: "https://www.mongodb.com/docs/ruby-driver/current/api/",
      },
      {
        label: "Reference",
        contentSite: "ruby-driver",
        url: "/docs/ruby-driver/:version/reference",
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
            label: "Compatibility",
            contentSite: "ruby-driver",
            url: "/docs/ruby-driver/:version/reference/compatibility",
          },
          {
            label: "View the Source",
            isExternal: true,
            url: "https://github.com/mongodb/mongo-ruby-driver",
          },
        ],
      },
      {
        label: "Issues & Help",
        contentSite: "ruby-driver",
        url: "/docs/ruby-driver/:version/issues-and-help",
      },
      {
        label: "Common Errors",
        contentSite: "ruby-driver",
        url: "/docs/ruby-driver/:version/common-errors",
      },
    ],
  },
];

export default tocData;
