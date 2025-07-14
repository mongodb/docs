import type { TocItem } from "../types";

const tocData: TocItem[] = [
  {
    label: "cluster sync",
    contentSite: "cluster-sync",
    group: true,
    items: [
      {
        label: "MongoDB Cluster-to-Cluster Sync",
        contentSite: "cluster-sync",
        url: "/docs/cluster-to-cluster-sync/:version/",
        collapsible: true,
        items: [
          {
            label: "Quickstart",
            contentSite: "cluster-sync",
            url: "/docs/cluster-to-cluster-sync/:version/quickstart",
          },
          {
            label: "About mongosync",
            contentSite: "cluster-sync",
            url: "/docs/cluster-to-cluster-sync/:version/about-mongosync",
          },
          {
            label: "Install",
            contentSite: "cluster-sync",
            url: "/docs/cluster-to-cluster-sync/:version/installation",
            collapsible: true,
            items: [
              {
                label: "Linux",
                contentSite: "cluster-sync",
                url: "/docs/cluster-to-cluster-sync/:version/installation/install-on-linux",
              },
              {
                label: "macOS",
                contentSite: "cluster-sync",
                url: "/docs/cluster-to-cluster-sync/:version/installation/install-on-macos",
              },
            ],
          },
          {
            label: "Connect",
            contentSite: "cluster-sync",
            url: "/docs/cluster-to-cluster-sync/:version/connecting",
            collapsible: true,
            items: [
              {
                label: "Atlas Clusters",
                contentSite: "cluster-sync",
                url: "/docs/cluster-to-cluster-sync/:version/connecting/atlas-to-atlas",
              },
              {
                label: "Self-Managed Clusters",
                contentSite: "cluster-sync",
                url: "/docs/cluster-to-cluster-sync/:version/connecting/onprem-to-onprem",
              },
              {
                label: "Self-Managed Cluster to Atlas",
                contentSite: "cluster-sync",
                url: "/docs/cluster-to-cluster-sync/:version/connecting/onprem-to-atlas",
              },
            ],
          },
          {
            label: "Cluster Topologies",
            contentSite: "cluster-sync",
            url: "/docs/cluster-to-cluster-sync/:version/topologies",
            collapsible: true,
            items: [
              {
                label: "Replica Set to Sharded Cluster",
                contentSite: "cluster-sync",
                url: "/docs/cluster-to-cluster-sync/:version/topologies/rs-to-sharded",
              },
              {
                label: "Two Sharded Clusters",
                contentSite: "cluster-sync",
                url: "/docs/cluster-to-cluster-sync/:version/topologies/multiple-mongosyncs",
              },
            ],
          },
          {
            label: "Reference",
            contentSite: "cluster-sync",
            url: "/docs/cluster-to-cluster-sync/:version/reference",
            collapsible: true,
            items: [
              {
                label: "mongosync",
                contentSite: "cluster-sync",
                url: "/docs/cluster-to-cluster-sync/:version/reference/mongosync",
                collapsible: true,
                items: [
                  {
                    label: "Behavior",
                    contentSite: "cluster-sync",
                    url: "/docs/cluster-to-cluster-sync/:version/reference/mongosync/mongosync-behavior",
                  },
                ],
              },
              {
                label: "Configuration",
                contentSite: "cluster-sync",
                url: "/docs/cluster-to-cluster-sync/:version/reference/configuration",
              },
              {
                label: "mongosync API Endpoints",
                contentSite: "cluster-sync",
                url: "/docs/cluster-to-cluster-sync/:version/reference/api",
                collapsible: true,
                items: [
                  {
                    label: "",
                    contentSite: "cluster-sync",
                    url: "/docs/cluster-to-cluster-sync/:version/reference/api/start",
                  },
                  {
                    label: "",
                    contentSite: "cluster-sync",
                    url: "/docs/cluster-to-cluster-sync/:version/reference/api/progress",
                  },
                  {
                    label: "",
                    contentSite: "cluster-sync",
                    url: "/docs/cluster-to-cluster-sync/:version/reference/api/pause",
                  },
                  {
                    label: "",
                    contentSite: "cluster-sync",
                    url: "/docs/cluster-to-cluster-sync/:version/reference/api/resume",
                  },
                  {
                    label: "",
                    contentSite: "cluster-sync",
                    url: "/docs/cluster-to-cluster-sync/:version/reference/api/commit",
                  },
                  {
                    label: "",
                    contentSite: "cluster-sync",
                    url: "/docs/cluster-to-cluster-sync/:version/reference/api/reverse",
                  },
                ],
              },
              {
                label: "mongosync States",
                contentSite: "cluster-sync",
                url: "/docs/cluster-to-cluster-sync/:version/reference/mongosync-states",
              },
              {
                label: "Filtered Sync",
                contentSite: "cluster-sync",
                url: "/docs/cluster-to-cluster-sync/:version/reference/collection-level-filtering",
                collapsible: true,
                items: [
                  {
                    label: "Regular Expressions",
                    contentSite: "cluster-sync",
                    url: "/docs/cluster-to-cluster-sync/:version/reference/collection-level-filtering/filter-regex",
                  },
                ],
              },
              {
                label: "Authentication Using Workload Identity Federation",
                contentSite: "cluster-sync",
                url: "/docs/cluster-to-cluster-sync/:version/reference/authentication",
              },
              {
                label: "oplog Sizing",
                contentSite: "cluster-sync",
                url: "/docs/cluster-to-cluster-sync/:version/reference/oplog-sizing",
              },
              {
                label: "Finalize Cutover Process",
                contentSite: "cluster-sync",
                url: "/docs/cluster-to-cluster-sync/:version/reference/cutover-process",
                collapsible: true,
                items: [
                  {
                    label: "Migrate Persistent Query Settings",
                    contentSite: "cluster-sync",
                    url: "/docs/cluster-to-cluster-sync/:version/reference/c2c-migrate-pqs",
                  },
                ],
              },
              {
                label: "Reverse Sync Direction",
                contentSite: "cluster-sync",
                url: "/docs/cluster-to-cluster-sync/:version/reverse-sync",
              },
              {
                label: "Limitations",
                contentSite: "cluster-sync",
                url: "/docs/cluster-to-cluster-sync/:version/reference/limitations",
              },
              {
                label: "Logging",
                contentSite: "cluster-sync",
                url: "/docs/cluster-to-cluster-sync/:version/reference/logging",
              },
              {
                label: "User Permissions",
                contentSite: "cluster-sync",
                url: "/docs/cluster-to-cluster-sync/:version/reference/permissions",
              },
              {
                label: "Telemetry",
                contentSite: "cluster-sync",
                url: "/docs/cluster-to-cluster-sync/:version/reference/telemetry",
              },
              {
                label: "Data Transfer Verification",
                contentSite: "cluster-sync",
                url: "/docs/cluster-to-cluster-sync/:version/reference/verification",
                collapsible: true,
                items: [
                  {
                    label: "Use Embedded Verifier",
                    contentSite: "cluster-sync",
                    url: "/docs/cluster-to-cluster-sync/:version/reference/verification/embedded",
                  },
                  {
                    label: "Use Document Counts",
                    contentSite: "cluster-sync",
                    url: "/docs/cluster-to-cluster-sync/:version/reference/verification/count",
                  },
                  {
                    label: "Use Hash Comparison",
                    contentSite: "cluster-sync",
                    url: "/docs/cluster-to-cluster-sync/:version/reference/verification/hash",
                  },
                  {
                    label: "Use Migration Verifier",
                    contentSite: "cluster-sync",
                    url: "/docs/cluster-to-cluster-sync/:version/reference/verification/verifier",
                  },
                  {
                    label: "Verifying Data with Custom Scripts",
                    contentSite: "cluster-sync",
                    url: "/docs/cluster-to-cluster-sync/:version/reference/verification/custom-manual",
                  },
                ],
              },
              {
                label: "Versioning",
                contentSite: "cluster-sync",
                url: "/docs/cluster-to-cluster-sync/:version/reference/versioning",
              },
              {
                label: "Version Compatibility",
                contentSite: "cluster-sync",
                url: "/docs/cluster-to-cluster-sync/:version/reference/supported-server-version",
              },
            ],
          },
          {
            label: "Release Notes",
            contentSite: "cluster-sync",
            url: "/docs/cluster-to-cluster-sync/:version/release-notes",
            collapsible: true,
            items: [
              {
                label: "1.12",
                contentSite: "cluster-sync",
                url: "/docs/cluster-to-cluster-sync/:version/release-notes/1.12",
              },
              {
                label: "1.11",
                contentSite: "cluster-sync",
                url: "/docs/cluster-to-cluster-sync/:version/release-notes/1.11",
              },
              {
                label: "1.10",
                contentSite: "cluster-sync",
                url: "/docs/cluster-to-cluster-sync/:version/release-notes/1.10",
              },
              {
                label: "1.9",
                contentSite: "cluster-sync",
                url: "/docs/cluster-to-cluster-sync/:version/release-notes/1.9",
              },
              {
                label: "1.8",
                contentSite: "cluster-sync",
                url: "/docs/cluster-to-cluster-sync/:version/release-notes/1.8",
              },
              {
                label: "1.7",
                contentSite: "cluster-sync",
                url: "/docs/cluster-to-cluster-sync/:version/release-notes/1.7",
              },
              {
                label: "1.6",
                contentSite: "cluster-sync",
                url: "/docs/cluster-to-cluster-sync/:version/release-notes/1.6",
              },
              {
                label: "1.5",
                contentSite: "cluster-sync",
                url: "/docs/cluster-to-cluster-sync/:version/release-notes/1.5",
              },
              {
                label: "1.4",
                contentSite: "cluster-sync",
                url: "/docs/cluster-to-cluster-sync/:version/release-notes/1.4",
              },
              {
                label: "1.3",
                contentSite: "cluster-sync",
                url: "/docs/cluster-to-cluster-sync/:version/release-notes/1.3",
              },
              {
                label: "1.2",
                contentSite: "cluster-sync",
                url: "/docs/cluster-to-cluster-sync/:version/release-notes/1.2",
              },
              {
                label: "1.1",
                contentSite: "cluster-sync",
                url: "/docs/cluster-to-cluster-sync/:version/release-notes/1.1",
              },
              {
                label: "1.0",
                contentSite: "cluster-sync",
                url: "/docs/cluster-to-cluster-sync/:version/release-notes/1.0",
              },
              {
                label: "0.9",
                contentSite: "cluster-sync",
                url: "/docs/cluster-to-cluster-sync/:version/release-notes/0.9",
              },
            ],
          },
          {
            label: "FAQ",
            contentSite: "cluster-sync",
            url: "/docs/cluster-to-cluster-sync/:version/faq",
          },
        ],
      },
    ],
  },
];

export default tocData;
