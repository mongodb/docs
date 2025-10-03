import type { TocItem } from "../types";
import { atlasCliCommands } from './atlas-cli-commands';

const tocData: TocItem[] = [
{
  label: "Atlas CLI",
  contentSite: "atlas-cli",
  url: "/docs/atlas/cli/:version/",
  versionDropdown: true,
  group: true,
  items: [
    {
      label: "Overview",
      contentSite: "atlas-cli",
      url: "/docs/atlas/cli/:version/",
    },
    {
      label: "Install or Update",
      contentSite: "atlas-cli",
      url: "/docs/atlas/cli/:version/install-atlas-cli",
      collapsible: true,
      items: [
        {
          label: "Check Compatibility",
          contentSite: "atlas-cli",
          url: "/docs/atlas/cli/:version/compatibility",
        },
        {
          label: "Verify Packages",
          contentSite: "atlas-cli",
          url: "/docs/atlas/cli/:version/verify-packages",
        },
      ]
    },
    {
      label: "Connect",
      contentSite: "atlas-cli",
      url: "/docs/atlas/cli/:version/connect-atlas-cli",
      collapsible: true,
      items: [
        {
          label: "Save Connection Settings",
          contentSite: "atlas-cli",
          url: "/docs/atlas/cli/:version/atlas-cli-save-connection-settings",
        },
        {
          label: "Migrate to the Atlas CLI",
          contentSite: "atlas-cli",
          url: "/docs/atlas/cli/:version/migrate-to-atlas-cli",
        },
      ]
    },
    {
      label: "Manage the Atlas CLI",
      contentSite: "cloud-docs",
      url: "/docs/atlas/manage-atlas-cli",
    },
    {
      label: "Commands",
      contentSite: "atlas-cli",
      collapsible: true,
      items: atlasCliCommands
    },
    {
      label: "Automate",
      contentSite: "atlas-cli",
      url: "/docs/atlas/cli/:version/atlas-cli-automate",
      collapsible: true,
      items: [
        {
          label: "Environment Variables",
          contentSite: "atlas-cli",
          url: "/docs/atlas/cli/:version/atlas-cli-env-variables",
        },
        {
          label: "Customize Output",
          contentSite: "atlas-cli",
          url: "/docs/atlas/cli/:version/custom-output-cli",
        },
      ]
    },
    {
      label: "Configure Telemetry",
      contentSite: "atlas-cli",
      url: "/docs/atlas/cli/:version/telemetry",
    },
    {
      label: "Manage Atlas",
      contentSite: "atlas-cli",
      url: "/docs/atlas/cli/:version/atlas-cli-tutorials",
      collapsible: true,
      items: [
        {
          label: "Get Started",
          contentSite: "atlas-cli",
          url: "/docs/atlas/cli/:version/atlas-cli-getting-started/",
        },
        {
          label: "Create & Configure Clusters",
          contentSite: "atlas-cli",
          url: "/docs/atlas/cli/:version/atlas-cli-quickstart",
        },
        {
          label: "Cluster Configuration File",
          contentSite: "atlas-cli",
          url: "/docs/atlas/cli/:version/atlas-cli-create-cluster-from-config-file",
        },
        {
          label: "Configure Independent Shard Scaling",
          contentSite: "atlas-cli",
          url: "/docs/atlas/cli/:version/atlas-cli-independent-shard-scaling",
        },
        {
          label: "Local & Cloud Deployments",
          contentSite: "atlas-cli",
          url: "/docs/atlas/cli/:version/atlas-cli-local-cloud",
          collapsible: true,
          items: [
            {
              label: "Create a Local Deployment",
              contentSite: "atlas-cli",
              url: "/docs/atlas/cli/:version/atlas-cli-deploy-local",
            },
            {
              label: "Deploy with Docker",
              contentSite: "atlas-cli",
              url: "/docs/atlas/cli/:version/atlas-cli-deploy-docker",
            },
            {
              label: "Deploy from Private Registry",
              contentSite: "atlas-cli",
              url: "/docs/atlas/cli/:version/atlas-cli-deploy-pvt-registry",
            },
            {
              label: "Use Atlas Search",
              contentSite: "atlas-cli",
              url: "/docs/atlas/cli/:version/atlas-cli-deploy-fts",
            },
          ]
        },
        {
          label: "Test Automations",
          contentSite: "atlas-cli",
          url: "/docs/atlas/cli/:version/atlas-cli-ephemeral-cluster",
        },
        {
          label: "Run Commands with Docker",
          contentSite: "atlas-cli",
          url: "/docs/atlas/cli/:version/atlas-cli-docker",
        },
        {
          label: "Run Commands with the Admin API",
          contentSite: "atlas-cli",
          url: "/docs/atlas/cli/:version/atlas-cli-admin-api",
        },
      ]
    },
    {
      label: "Reference",
      contentSite: "atlas-cli",
      url: "/docs/atlas/cli/:version/reference",
      collapsible: true,
      items: [
        {
          label: "JSON Configuration Files",
          contentSite: "atlas-cli",
          url: "/docs/atlas/cli/:version/reference/json",
          collapsible: true,
          items: [
            {
              label: "Cluster",
              contentSite: "atlas-cli",
              url: "/docs/atlas/cli/:version/reference/json/cluster-config-file",
            },
            {
              label: "Cloud Backup Schedule",
              contentSite: "atlas-cli",
              url: "/docs/atlas/cli/:version/reference/json/cloud-backup-schedule-config-file",
            },
            {
              label: "Cloud Backup Compliance Policy",
              contentSite: "atlas-cli",
              url: "/docs/atlas/cli/:version/reference/json/cloud-backup-compliance-policy-config-file",
            },
            {
              label: "Atlas Data Federation",
              contentSite: "atlas-cli",
              url: "/docs/atlas/cli/:version/reference/json/data-federation-config-file",
            },
            {
              label: "Atlas Search Index",
              contentSite: "atlas-cli",
              url: "/docs/atlas/cli/:version/reference/json/search-index-config-file",
            },
            {
              label: "Search Nodes",
              contentSite: "atlas-cli",
              url: "/docs/atlas/cli/:version/reference/json/search-nodes-config-file",
            },
            {
              label: "Online Archive",
              contentSite: "atlas-cli",
              url: "/docs/atlas/cli/:version/reference/json/file-options-online-archive",
            },
            {
              label: "Alert",
              contentSite: "atlas-cli",
              url: "/docs/atlas/cli/:version/reference/json/alert-config-file",
            },
            {
              label: "Rolling Index",
              contentSite: "atlas-cli",
              url: "/docs/atlas/cli/:version/reference/json/rolling-index-config-file",
            },
            {
              label: "Project",
              contentSite: "atlas-cli",
              url: "/docs/atlas/cli/:version/reference/json/project-config-file",
            },
            {
              label: "Federated Authentication",
              contentSite: "atlas-cli",
              url: "/docs/atlas/cli/:version/reference/json/connected-org-config-file",
            },
          ]
        },
      ]
    },
    {
      label: "Troubleshoot",
      contentSite: "atlas-cli",
      url: "/docs/atlas/cli/:version/troubleshooting",
    },
    {
      label: "CLI Changelog",
      contentSite: "atlas-cli",
      url: "/docs/atlas/cli/:version/atlas-cli-changelog",
    },
    {
      label: "Plugin Changelogs",
      contentSite: "atlas-cli",
      url: "/docs/atlas/cli/:version/plugin-changelogs",
    },
  ]
},
];

export default tocData;
