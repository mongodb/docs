import type { TocItem } from "../types";

const tocData: TocItem[] = [{
  label: "VS Code Extension",
  contentSite: "mongodb-vscode",
  group: true,
  items: [
    {
      label: "Install",
      contentSite: "mongodb-vscode",
      url: "/docs/mongodb-vscode/install",
      collapsible: true,
      items: [
        {
          label: "Verify Plugin",
          contentSite: "mongodb-vscode",
          url: "/docs/mongodb-vscode/install/verify-plugin",
        },
      ]
    },
    {
      label: "Connect",
      contentSite: "mongodb-vscode",
      url: "/docs/mongodb-vscode/connect",
    },
    {
      label: "Manage Data",
      contentSite: "mongodb-vscode",
      url: "/docs/mongodb-vscode/databases-collections",
    },
    {
      label: "Explore with Playgrounds",
      contentSite: "mongodb-vscode",
      url: "/docs/mongodb-vscode/playgrounds",
      collapsible: true,
      items: [
        {
          label: "Create Databases & Collections",
          contentSite: "mongodb-vscode",
          url: "/docs/mongodb-vscode/playground-databases",
          collapsible: true,
          items: [
            {
              label: "Time Series Collections",
              contentSite: "mongodb-vscode",
              url: "/docs/mongodb-vscode/time-series-collections",
            },
          ]
        },
        {
          label: "Perform CRUD Operations",
          contentSite: "mongodb-vscode",
          url: "/docs/mongodb-vscode/crud-ops",
          collapsible: true,
          items: [
            {
              label: "Create",
              contentSite: "mongodb-vscode",
              url: "/docs/mongodb-vscode/create-document-playground",
            },
            {
              label: "Read",
              contentSite: "mongodb-vscode",
              url: "/docs/mongodb-vscode/read-document-playground",
            },
            {
              label: "Update",
              contentSite: "mongodb-vscode",
              url: "/docs/mongodb-vscode/update-document-playground",
            },
            {
              label: "Delete",
              contentSite: "mongodb-vscode",
              url: "/docs/mongodb-vscode/delete-document-playground",
            },
          ]
        },
        {
          label: "Run Aggregation Pipelines",
          contentSite: "mongodb-vscode",
          url: "/docs/mongodb-vscode/run-agg-pipelines",
        },
        {
          label: "Enable Autocomplete",
          contentSite: "mongodb-vscode",
          url: "/docs/mongodb-vscode/enable-autocomplete-for-string-literals",
        },
        {
          label: "Export to Language",
          contentSite: "mongodb-vscode",
          url: "/docs/mongodb-vscode/export-to-language",
        },
        {
          label: "Test Driver Queries",
          contentSite: "mongodb-vscode",
          url: "/docs/mongodb-vscode/copilot-export-test",
        },
        {
          label: "Use require()",
          contentSite: "mongodb-vscode",
          url: "/docs/mongodb-vscode/require-playgrounds",
          collapsible: true,
          items: [
            {
              label: "Include Node.js Modules",
              contentSite: "mongodb-vscode",
              url: "/docs/mongodb-vscode/require-playgrounds/require-modules",
            },
            {
              label: "Load Local Files",
              contentSite: "mongodb-vscode",
              url: "/docs/mongodb-vscode/require-playgrounds/require-local",
            },
          ]
        },
      ]
    },
    {
      label: "MongoDB MCP Server",
      contentSite: "mongodb-vscode",
      url: "/docs/mongodb-vscode/mcp-server",
    },
    {
      label: "MongoDB Extension for Github Copilot",
      contentSite: "mongodb-vscode",
      url: "/docs/mongodb-vscode/copilot",
      collapsible: true,
      items: [
        {
          label: "/query",
          contentSite: "mongodb-vscode",
          url: "/docs/mongodb-vscode/copilot-query",
        },
        {
          label: "/schema",
          contentSite: "mongodb-vscode",
          url: "/docs/mongodb-vscode/copilot-schema",
        },
        {
          label: "/docs",
          contentSite: "mongodb-vscode",
          url: "/docs/mongodb-vscode/copilot-docs",
        },
        {
          label: "AI & Data Usage",
          contentSite: "mongodb-vscode",
          url: "/docs/mongodb-vscode/ai-data-usage",
        },
      ]
    },
    {
      label: "Create an Atlas Cluster with Terraform",
      contentSite: "mongodb-vscode",
      url: "/docs/mongodb-vscode/create-cluster-terraform",
    },
    {
      label: "Reference",
      contentSite: "mongodb-vscode",
      collapsible: true,
      items: [
        {
          label: "Commands",
          contentSite: "mongodb-vscode",
          url: "/docs/mongodb-vscode/commands",
        },
        {
          label: "Settings",
          contentSite: "mongodb-vscode",
          url: "/docs/mongodb-vscode/settings",
        },
        {
            label: "Logs",
            contentSite: "mongodb-vscode",
            url: "/docs/mongodb-vscode/logs",
        }
      ]
    },
    {
      label: "Changelog",
      contentSite: "mongodb-vscode",
      url: "https://github.com/mongodb-js/vscode/releases",
    },
  ]
}
];

export default tocData;
