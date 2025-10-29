import type { TocItem } from "../types";

const tocData: TocItem[] = [
  {
    label: "Laravel MongoDB",
    contentSite: "laravel",
    group: true,
    versionDropdown: true,
    items: [
      {
        label: "Overview",
        contentSite: "laravel",
        url: "/docs/drivers/php/laravel-mongodb/:version/",
      },
      {
        label: "Quick Start",
        contentSite: "laravel",
        url: "/docs/drivers/php/laravel-mongodb/:version/quick-start",
        collapsible: true,
        items: [
          {
            label: "Download & Install",
            contentSite: "laravel",
            url: "/docs/drivers/php/laravel-mongodb/:version/quick-start/download-and-install",
          },
          {
            label: "Create a Deployment",
            contentSite: "laravel",
            url: "/docs/drivers/php/laravel-mongodb/:version/quick-start/create-a-deployment",
          },
          {
            label: "Create a Connection String",
            contentSite: "laravel",
            url: "/docs/drivers/php/laravel-mongodb/:version/quick-start/create-a-connection-string",
          },
          {
            label: "Configure Your Connection",
            contentSite: "laravel",
            url: "/docs/drivers/php/laravel-mongodb/:version/quick-start/configure-mongodb",
          },
          {
            label: "View Data",
            contentSite: "laravel",
            url: "/docs/drivers/php/laravel-mongodb/:version/quick-start/view-data",
          },
          {
            label: "Write Data",
            contentSite: "laravel",
            url: "/docs/drivers/php/laravel-mongodb/:version/quick-start/write-data",
          },
          {
            label: "Next Steps",
            contentSite: "laravel",
            url: "/docs/drivers/php/laravel-mongodb/:version/quick-start/next-steps",
          },
          {
            label: "Tutorial: Build a Back End",
            contentSite: "laravel",
            url: "/docs/drivers/php/laravel-mongodb/:version/quick-start/backend-service-tutorial",
            versions: { excludes: ["v4.x"] },
          },
        ],
      },
      {
        label: "Usage Examples",
        contentSite: "laravel",
        url: "/docs/drivers/php/laravel-mongodb/:version/usage-examples",
        collapsible: true,
        items: [
          {
            label: "Find a Document",
            contentSite: "laravel",
            url: "/docs/drivers/php/laravel-mongodb/:version/usage-examples/findOne",
          },
          {
            label: "Find Multiple Documents",
            contentSite: "laravel",
            url: "/docs/drivers/php/laravel-mongodb/:version/usage-examples/find",
          },
          {
            label: "Insert a Document",
            contentSite: "laravel",
            url: "/docs/drivers/php/laravel-mongodb/:version/usage-examples/insertOne",
          },
          {
            label: "Insert Multiple Documents",
            contentSite: "laravel",
            url: "/docs/drivers/php/laravel-mongodb/:version/usage-examples/insertMany",
          },
          {
            label: "Update a Document",
            contentSite: "laravel",
            url: "/docs/drivers/php/laravel-mongodb/:version/usage-examples/updateOne",
          },
          {
            label: "Update Multiple Documents",
            contentSite: "laravel",
            url: "/docs/drivers/php/laravel-mongodb/:version/usage-examples/updateMany",
          },
          {
            label: "Delete a Document",
            contentSite: "laravel",
            url: "/docs/drivers/php/laravel-mongodb/:version/usage-examples/deleteOne",
          },
          {
            label: "Delete Multiple Documents",
            contentSite: "laravel",
            url: "/docs/drivers/php/laravel-mongodb/:version/usage-examples/deleteMany",
          },
          {
            label: "Count Documents",
            contentSite: "laravel",
            url: "/docs/drivers/php/laravel-mongodb/:version/usage-examples/count",
          },
          {
            label: "Distinct Field Values",
            contentSite: "laravel",
            url: "/docs/drivers/php/laravel-mongodb/:version/usage-examples/distinct",
          },
          {
            label: "Run a Command",
            contentSite: "laravel",
            url: "/docs/drivers/php/laravel-mongodb/:version/usage-examples/runCommand",
          },
        ],
      },
      {
        label: "Release Notes",
        isExternal: true,
        url: "https://github.com/mongodb/laravel-mongodb/releases/",
      },
      {
        label: "Fundamentals",
        contentSite: "laravel",
        collapsible: true,
        items: [
          {
            label: "Connections",
            contentSite: "laravel",
            collapsible: true,
            items: [
              {
                label: "Connection Guide",
                contentSite: "laravel",
                url: "/docs/drivers/php/laravel-mongodb/:version/fundamentals/connection/connect-to-mongodb",
              },
              {
                label: "Connection Options",
                contentSite: "laravel",
                url: "/docs/drivers/php/laravel-mongodb/:version/fundamentals/connection/connection-options",
              },
              {
                label: "Configure TLS",
                contentSite: "laravel",
                url: "/docs/drivers/php/laravel-mongodb/:version/fundamentals/connection/tls",
              },
            ],
          },
          {
            label: "Read Operations",
            contentSite: "laravel",
            url: "/docs/drivers/php/laravel-mongodb/:version/fundamentals/read-operations",
            collapsible: true,
            items: [
              {
                label: "Retrieve Data",
                contentSite: "laravel",
                url: "/docs/drivers/php/laravel-mongodb/:version/fundamentals/read-operations/retrieve",
              },
              {
                label: "Query Text",
                contentSite: "laravel",
                url: "/docs/drivers/php/laravel-mongodb/:version/fundamentals/read-operations/search-text",
              },
              {
                label: "Modify Query Results",
                contentSite: "laravel",
                url: "/docs/drivers/php/laravel-mongodb/:version/fundamentals/read-operations/modify-results",
              },
              {
                label: "Read Preference",
                contentSite: "laravel",
                url: "/docs/drivers/php/laravel-mongodb/:version/fundamentals/read-operations/read-pref",
              },
              {
                label: "Query Logging",
                contentSite: "laravel",
                url: "/docs/drivers/php/laravel-mongodb/:version/fundamentals/read-operations/query-logging",
                versions: { excludes: ["v4.x"] },
              },
            ],
          },
          {
            label: "Write Operations",
            contentSite: "laravel",
            url: "/docs/drivers/php/laravel-mongodb/:version/fundamentals/write-operations",
            collapsible: true,
            items: [
              {
                label: "Insert",
                contentSite: "laravel",
                url: "/docs/drivers/php/laravel-mongodb/:version/fundamentals/write-operations/insert",
              },
              {
                label: "Modify",
                contentSite: "laravel",
                url: "/docs/drivers/php/laravel-mongodb/:version/fundamentals/write-operations/modify",
              },
              {
                label: "Delete",
                contentSite: "laravel",
                url: "/docs/drivers/php/laravel-mongodb/:version/fundamentals/write-operations/delete",
              },
            ],
          },
          {
            label: "Aggregation Builder",
            contentSite: "laravel",
            url: "/docs/drivers/php/laravel-mongodb/:version/fundamentals/aggregation-builder",
          },
          {
            label: "MongoDB Search",
            contentSite: "laravel",
            url: "/docs/drivers/php/laravel-mongodb/:version/fundamentals/atlas-search",
            versions: { excludes: ["v4.x"] },
          },
          {
            label: "MongoDB Vector Search",
            contentSite: "laravel",
            url: "/docs/drivers/php/laravel-mongodb/:version/fundamentals/vector-search",
            versions: { excludes: ["v4.x"] },
          },
        ],
      },
      {
        label: "Eloquent Models",
        contentSite: "laravel",
        url: "/docs/drivers/php/laravel-mongodb/:version/eloquent-models",
        collapsible: true,
        items: [
          {
            label: "Eloquent Model Class",
            contentSite: "laravel",
            url: "/docs/drivers/php/laravel-mongodb/:version/eloquent-models/model-class",
          },
          {
            label: "Relationships",
            contentSite: "laravel",
            url: "/docs/drivers/php/laravel-mongodb/:version/eloquent-models/relationships",
          },
          {
            label: "Schema Builder",
            contentSite: "laravel",
            url: "/docs/drivers/php/laravel-mongodb/:version/eloquent-models/schema-builder",
          },
        ],
      },
      {
        label: "Query Builder",
        contentSite: "laravel",
        url: "/docs/drivers/php/laravel-mongodb/:version/query-builder",
      },
      {
        label: "Databases & Collections",
        contentSite: "laravel",
        url: "/docs/drivers/php/laravel-mongodb/:version/database-collection",
        collapsible: true,
        items: [
          {
            label: "Time Series",
            contentSite: "laravel",
            url: "/docs/drivers/php/laravel-mongodb/:version/database-collection/time-series",
          },
        ],
      },
      {
        label: "User Authentication",
        contentSite: "laravel",
        url: "/docs/drivers/php/laravel-mongodb/:version/user-authentication",
      },
      {
        label: "Cache & Locks",
        contentSite: "laravel",
        url: "/docs/drivers/php/laravel-mongodb/:version/cache",
      },
      {
        label: "Scout Integration",
        contentSite: "laravel",
        url: "/docs/drivers/php/laravel-mongodb/:version/scout",
        versions: { excludes: ["v4.x"] },
      },
      {
        label: "HTTP Sessions",
        contentSite: "laravel",
        url: "/docs/drivers/php/laravel-mongodb/:version/sessions",
        versions: { excludes: ["v4.x"] },
      },
      {
        label: "Queues",
        contentSite: "laravel",
        url: "/docs/drivers/php/laravel-mongodb/:version/queues",
      },
      {
        label: "Transactions",
        contentSite: "laravel",
        url: "/docs/drivers/php/laravel-mongodb/:version/transactions",
      },
      {
        label: "GridFS Filesystems",
        contentSite: "laravel",
        url: "/docs/drivers/php/laravel-mongodb/:version/filesystems",
      },
      {
        label: "Issues & Help",
        contentSite: "laravel",
        url: "/docs/drivers/php/laravel-mongodb/:version/issues-and-help",
      },
      {
        label: "Feature Compatibility",
        contentSite: "laravel",
        url: "/docs/drivers/php/laravel-mongodb/:version/feature-compatibility",
      },
      {
        label: "Compatibility",
        contentSite: "drivers",
        url: "/docs/drivers/compatibility/?driver-language=php&php-driver-framework=laravel",
      },
      {
        label: "Upgrade",
        contentSite: "laravel",
        url: "/docs/drivers/php/laravel-mongodb/:version/upgrade",
      },
    ],
  },
];

export default tocData;
