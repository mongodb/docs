import type { TocItem } from "../types";

const tocData: TocItem[] = [
  {
    label: "Compass",
    contentSite: "compass",
    group: true,
    items: [
      {
        label: "Overview",
        contentSite: "compass",
        url: "/docs/compass/",
      },
      {
        label: "Download & Install",
        contentSite: "compass",
        url: "/docs/compass/install",
        collapsible: true,
        items: [
          {
            label: "Update",
            contentSite: "compass",
            url: "/docs/compass/upgrade",
          },
          {
            label: "Verify Package Integrity",
            contentSite: "compass",
            url: "/docs/compass/install/verify-signatures",
            collapsible: true,
            items: [
              {
                label: "Use Disk Image Verification",
                contentSite: "compass",
                url: "/docs/compass/install/verify-signatures/disk-images",
              },
              {
                label: "Use GPG",
                contentSite: "compass",
                url: "/docs/compass/install/verify-signatures/gpg",
              },
              {
                label: "Verify RPM Packages",
                contentSite: "compass",
                url: "/docs/compass/install/verify-signatures/rpm",
              },
              {
                label: "Verify Windows Packages",
                contentSite: "compass",
                url: "/docs/compass/install/verify-signatures/windows",
              },
            ],
          },
          {
            label: "Edition Capabilities",
            contentSite: "compass",
            url: "/docs/compass/editions",
          },
        ],
      },
      {
        label: "Connect",
        contentSite: "compass",
        url: "/docs/compass/connect",
        collapsible: true,
        items: [
          {
            label: "Connections Sidebar",
            contentSite: "compass",
            url: "/docs/compass/connect/connections",
          },
          {
            label: "Use the Command Line",
            contentSite: "compass",
            url: "/docs/compass/connect/connect-from-the-command-line",
          },
          {
            label: "Advanced Options",
            contentSite: "compass",
            url: "/docs/compass/connect/advanced-connection-options",
            collapsible: true,
            items: [
              {
                label: "General",
                contentSite: "compass",
                url: "/docs/compass/connect/advanced-connection-options/general-connection",
              },
              {
                label: "Authentication",
                contentSite: "compass",
                url: "/docs/compass/connect/advanced-connection-options/authentication-connection",
              },
              {
                label: "TLS/SSL",
                contentSite: "compass",
                url: "/docs/compass/connect/advanced-connection-options/tls-ssl-connection",
              },
              {
                label: "Proxy/SSH",
                contentSite: "compass",
                url: "/docs/compass/connect/advanced-connection-options/ssh-connection",
              },
              {
                label: "In-Use Encryption",
                contentSite: "compass",
                url: "/docs/compass/connect/advanced-connection-options/in-use-encryption",
              },
              {
                label: "Advanced",
                contentSite: "compass",
                url: "/docs/compass/connect/advanced-connection-options/advanced-connection",
              },
            ],
          },
          {
            label: "Favorite Connections",
            contentSite: "compass",
            url: "/docs/compass/connect/favorite-connections",
            collapsible: true,
            items: [
              {
                label: "Import & Export",
                contentSite: "compass",
                url: "/docs/compass/connect/favorite-connections/import-export",
                collapsible: true,
                items: [
                  {
                    label: "Import in Compass",
                    contentSite: "compass",
                    url: "/docs/compass/connect/favorite-connections/import-export-ui/import",
                  },
                  {
                    label: "Export in Compass",
                    contentSite: "compass",
                    url: "/docs/compass/connect/favorite-connections/import-export-ui/export",
                  },
                  {
                    label: "Import with the CLI",
                    contentSite: "compass",
                    url: "/docs/compass/connect/favorite-connections/import-export-cli/import",
                  },
                  {
                    label: "Export with the CLI",
                    contentSite: "compass",
                    url: "/docs/compass/connect/favorite-connections/import-export-cli/export",
                  },
                ],
              },
            ],
          },
          {
            label: "Required Access",
            contentSite: "compass",
            url: "/docs/compass/connect/required-access",
          },
          {
            label: "Disconnect",
            contentSite: "compass",
            url: "/docs/compass/connect/disconnect",
          },
        ],
      },
      {
        label: "Customize",
        contentSite: "compass",
        url: "/docs/compass/settings",
        collapsible: true,
        items: [
          {
            label: "Interface Settings",
            contentSite: "compass",
            url: "/docs/compass/settings/settings-reference",
          },
          {
            label: "Command Line Options",
            contentSite: "compass",
            url: "/docs/compass/settings/command-line-options",
          },
          {
            label: "Configuration File Settings",
            contentSite: "compass",
            url: "/docs/compass/settings/config-file",
          },
          {
            label: "Block Outgoing Connections",
            contentSite: "compass",
            url: "/docs/compass/settings/restrict-outgoing-connections",
          },
          {
            label: "Set Default Sort Order",
            contentSite: "compass",
            url: "/docs/compass/settings/set-default-sort",
          },
          {
            label: "Show Kerberos Password",
            contentSite: "compass",
            url: "/docs/compass/settings/show-kerberos-password",
          },
          {
            label: "Secure Connection Strings",
            contentSite: "compass",
            url: "/docs/compass/settings/protect-connection-strings",
          },
          {
            label: "Block Write Operations",
            contentSite: "compass",
            url: "/docs/compass/settings/read-only",
          },
          {
            label: "Specify Read Preference & Tags",
            contentSite: "compass",
            url: "/docs/compass/settings/specify-read-preference-tags",
          },
          {
            label: "Toggle Chrome DevTools",
            contentSite: "compass",
            url: "/docs/compass/settings/enable-dev-tools",
          },
          {
            label: "Configure Telemetry",
            contentSite: "compass",
            url: "/docs/compass/settings/telemetry",
          },
        ],
      },
      {
        label: "Home Screen",
        contentSite: "compass",
        url: "/docs/compass/instance",
      },
      {
        label: "Interact with Your Data",
        contentSite: "compass",
        url: "/docs/compass/manage-data",
        collapsible: true,
        items: [
          {
            label: "Manage Databases",
            contentSite: "compass",
            url: "/docs/compass/databases",
          },
          {
            label: "Manage Collections",
            contentSite: "compass",
            url: "/docs/compass/collections",
            collapsible: true,
            items: [
              {
                label: "Collections with Collation",
                contentSite: "compass",
                url: "/docs/compass/collections/collation-collection",
              },
              {
                label: "Clustered Collections",
                contentSite: "compass",
                url: "/docs/compass/collections/clustered-collection",
              },
              {
                label: "Encrypted Collections",
                contentSite: "compass",
                url: "/docs/compass/collections/encrypted-collection",
              },
              {
                label: "Time Series Collections",
                contentSite: "compass",
                url: "/docs/compass/collections/time-series-collection",
              },
            ],
          },
          {
            label: "Manage Views",
            contentSite: "compass",
            url: "/docs/compass/views",
          },
          {
            label: "Manage Documents",
            contentSite: "compass",
            url: "/docs/compass/documents",
            collapsible: true,
            items: [
              {
                label: "View",
                contentSite: "compass",
                url: "/docs/compass/documents/view",
              },
              {
                label: "Insert",
                contentSite: "compass",
                url: "/docs/compass/documents/insert",
              },
              {
                label: "Modify Single Document",
                contentSite: "compass",
                url: "/docs/compass/documents/modify",
              },
              {
                label: "Modify Multiple Documents",
                contentSite: "compass",
                url: "/docs/compass/documents/modify-multiple",
              },
              {
                label: "Clone",
                contentSite: "compass",
                url: "/docs/compass/documents/clone",
              },
              {
                label: "Delete Single Document",
                contentSite: "compass",
                url: "/docs/compass/documents/delete",
              },
              {
                label: "Delete Multiple Documents",
                contentSite: "compass",
                url: "/docs/compass/documents/delete-multiple",
              },
            ],
          },
          {
            label: "Query",
            contentSite: "compass",
            url: "/docs/compass/query/filter",
            collapsible: true,
            items: [
              {
                label: "Set Returned Fields",
                contentSite: "compass",
                url: "/docs/compass/query/project",
              },
              {
                label: "Sort Returned Documents",
                contentSite: "compass",
                url: "/docs/compass/query/sort",
              },
              {
                label: "Adjust Maximum Time",
                contentSite: "compass",
                url: "/docs/compass/query/maxtimems",
              },
              {
                label: "Specify Collation",
                contentSite: "compass",
                url: "/docs/compass/query/collation",
              },
              {
                label: "Skip Documents",
                contentSite: "compass",
                url: "/docs/compass/query/skip",
              },
              {
                label: "Limit Results",
                contentSite: "compass",
                url: "/docs/compass/query/limit",
              },
              {
                label: "View Query Performance",
                contentSite: "compass",
                url: "/docs/compass/query-plan",
              },
              {
                label: "Export to a Language",
                contentSite: "compass",
                url: "/docs/compass/export-query-to-language",
              },
              {
                label: "Run Atlas Search Queries",
                contentSite: "compass",
                url: "/docs/compass/query/atlas-search",
              },
              {
                label: "Manage Saved Queries",
                contentSite: "compass",
                url: "/docs/compass/query/queries",
                collapsible: true,
                items: [
                  {
                    label: "View Recent Queries",
                    contentSite: "compass",
                    url: "/docs/compass/query/recent",
                  },
                ],
              },
            ],
          },
          {
            label: "Query with Natural Language",
            contentSite: "compass",
            url: "/docs/compass/query-with-natural-language",
            collapsible: true,
            items: [
              {
                label: "Enable",
                contentSite: "compass",
                url: "/docs/compass/query-with-natural-language/enable-natural-language-querying",
              },
              {
                label: "Prompt Query",
                contentSite: "compass",
                url: "/docs/compass/query-with-natural-language/prompt-natural-language-query",
              },
              {
                label: "Prompt Aggregation",
                contentSite: "compass",
                url: "/docs/compass/query-with-natural-language/prompt-natural-language-aggregation",
              },
              {
                label: "AI & Data Usage",
                contentSite: "compass",
                url: "/docs/compass/query-with-natural-language/ai-and-data-usage-information",
              },
            ],
          },
          {
            label: "Manage Indexes",
            contentSite: "compass",
            url: "/docs/compass/indexes",
            collapsible: true,
            items: [
              {
                label: "Atlas Search Index",
                contentSite: "compass",
                url: "/docs/compass/indexes/create-search-index",
              },
              {
                label: "Atlas Vector Search Index",
                contentSite: "compass",
                url: "/docs/compass/indexes/create-vector-search-index",
              },
            ],
          },
          {
            label: "Analyze Data Schema",
            contentSite: "compass",
            url: "/docs/compass/schema",
            collapsible: true,
            items: [
              {
                label: "Export",
                contentSite: "compass",
                url: "/docs/compass/schema/export",
              },
            ],
          },
          {
            label: "View Performance",
            contentSite: "compass",
            url: "/docs/compass/performance",
            collapsible: true,
            items: [
              {
                label: "Performance Insights",
                contentSite: "compass",
                url: "/docs/compass/manage-data/performance-insights",
              },
            ],
          },
          {
            label: "Set Validation Rules",
            contentSite: "compass",
            url: "/docs/compass/validation",
            collapsible: true,
            items: [
              {
                label: "Generate Validation Rules",
                contentSite: "compass",
                url: "/docs/compass/generate-validation-rules",
              },
              {
                label: "Add Validation Rules",
                contentSite: "compass",
                url: "/docs/compass/add-validation-rules",
              },
              {
                label: "Edit Validation Rules",
                contentSite: "compass",
                url: "/docs/compass/edit-validation-rules",
              },
            ],
          },
          {
            label: "Sampling",
            contentSite: "compass",
            url: "/docs/compass/sampling",
          },
          {
            label: "Use In-Use Encryption",
            contentSite: "compass",
            url: "/docs/compass/in-use-encryption-tutorial",
          },
        ],
      },
      {
        label: "Import & Export Data",
        contentSite: "compass",
        url: "/docs/compass/import-export",
      },
      {
        label: "Embedded MongoDB Shell",
        contentSite: "compass",
        url: "/docs/compass/embedded-shell",
      },
      {
        label: "Create an Aggregation Pipeline",
        contentSite: "compass",
        url: "/docs/compass/create-agg-pipeline",
        collapsible: true,
        items: [
          {
            label: "Save a Pipeline",
            contentSite: "compass",
            url: "/docs/compass/agg-pipeline-builder/save-agg-pipeline",
          },
          {
            label: "Open a Pipeline",
            contentSite: "compass",
            url: "/docs/compass/agg-pipeline-builder/open-saved-pipeline",
          },
          {
            label: "View Explain Plans",
            contentSite: "compass",
            url: "/docs/compass/agg-pipeline-builder/view-pipeline-explain-plan",
          },
          {
            label: "Export to a Language",
            contentSite: "compass",
            url: "/docs/compass/agg-pipeline-builder/export-pipeline-to-language",
          },
          {
            label: "Create a View",
            contentSite: "compass",
            url: "/docs/compass/agg-pipeline-builder/create-a-view",
          },
          {
            label: "Count Results",
            contentSite: "compass",
            url: "/docs/compass/agg-pipeline-builder/count-pipeline-results",
          },
          {
            label: "Specify Collation",
            contentSite: "compass",
            url: "/docs/compass/agg-pipeline-builder/pipeline-custom-collation",
          },
          {
            label: "Set Max Time MS",
            contentSite: "compass",
            url: "/docs/compass/agg-pipeline-builder/maxtime-ms-pipeline",
          },
          {
            label: "Export Results",
            contentSite: "compass",
            url: "/docs/compass/agg-pipeline-builder/export-pipeline-results",
          },
          {
            label: "Builder Settings",
            contentSite: "compass",
            url: "/docs/compass/agg-pipeline-builder/aggregation-pipeline-builder-settings",
          },
        ],
      },
      {
        label: "Troubleshooting",
        contentSite: "compass",
        url: "/docs/compass/troubleshooting",
        collapsible: true,
        items: [
          {
            label: "Retrieve Logs",
            contentSite: "compass",
            url: "/docs/compass/troubleshooting/logs",
          },
          {
            label: "Connection Errors",
            contentSite: "compass",
            url: "/docs/compass/troubleshooting/connection-errors",
          },
        ],
      },
      {
        label: "Keyboard Shortcuts",
        contentSite: "compass",
        url: "/docs/compass/keyboard-shortcuts",
      },
      {
        label: "FAQ",
        contentSite: "compass",
        url: "/docs/compass/faq",
      },
      {
        label: "Learn More",
        contentSite: "compass",
        url: "/docs/compass/learn-more",
      },
      {
        label: "Release Notes",
        contentSite: "compass",
        url: "/docs/compass/release-notes",
      },
      {
        label: "Submit Feedback",
        contentSite: "compass",
        url: "/docs/compass/submit-feedback",
      },
    ],
  },
];

export default tocData;
