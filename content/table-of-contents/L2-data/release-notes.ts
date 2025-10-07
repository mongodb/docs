import type { TocItem } from "../types";
import manualVersions from "../version-arrays/server-docs/manual";


const tocData: TocItem[] = [
    {
    label: "Server Release Notes",
    contentSite: "docs",
    url: "/docs/:version/release-notes",
    collapsible: true,
    items: [
      {
        label: "8.3 (Upcoming)",
        contentSite: "docs",
        url: "/docs/:version/release-notes/8.3",
        collapsible: true,
        versions: { excludes: manualVersions.before("v8.3")},
        items: [
          {
            label: "Compatibility Changes",
            contentSite: "docs",
            url: "/docs/:version/release-notes/8.3-compatibility",
          },
          {
            label: "Changelog",
            contentSite: "docs",
            url: "/docs/:version/release-notes/8.3-changelog",
          },
        ]
      },
      {
        label: "8.2 (Stable Release)",
        contentSite: "docs",
        url: "/docs/:version/release-notes/8.2",
        collapsible: true,
        versions: { excludes: manualVersions.before("v8.2")},
        items: [
          {
            label: "Compatibility Changes",
            contentSite: "docs",
            url: "/docs/:version/release-notes/8.2-compatibility",
          },
          {
            label: "Upgrade 8.0 to 8.2",
            contentSite: "docs",
            url: "/docs/:version/release-notes/8.2-upgrade",
            collapsible: true,
            items: [
              {
                label: "Standalone",
                contentSite: "docs",
                url: "/docs/:version/release-notes/8.2-upgrade-standalone",
              },
              {
                label: "Replica Set",
                contentSite: "docs",
                url: "/docs/:version/release-notes/8.2-upgrade-replica-set",
              },
              {
                label: "Sharded Cluster",
                contentSite: "docs",
                url: "/docs/:version/release-notes/8.2-upgrade-sharded-cluster",
              },
            ],
          },
          {
            label: "Downgrade 8.2 to 8.0",
            contentSite: "docs",
            url: "/docs/:version/release-notes/8.2-downgrade",
          },
          {
            label: "Changelog",
            contentSite: "docs",
            url: "/docs/:version/release-notes/8.2-changelog",
          },
        ]
      },
      {
        label: "8.0",
        contentSite: "docs",
        url: "/docs/:version/release-notes/8.0",
        collapsible: true,
        versions: { excludes: manualVersions.before("v8.0")},
        items: [
          {
            label: "Compatibility Changes",
            contentSite: "docs",
            url: "/docs/:version/release-notes/8.0-compatibility",
          },
          {
            label: "Upgrade 7.0 to 8.0",
            contentSite: "docs",
            url: "/docs/:version/release-notes/8.0-upgrade",
            collapsible: true,
            items: [
              {
                label: "Standalone",
                contentSite: "docs",
                url: "/docs/:version/release-notes/8.0-upgrade-standalone",
              },
              {
                label: "Replica Set",
                contentSite: "docs",
                url: "/docs/:version/release-notes/8.0-upgrade-replica-set",
              },
              {
                label: "Sharded Cluster",
                contentSite: "docs",
                url: "/docs/:version/release-notes/8.0-upgrade-sharded-cluster",
              },
            ],
          },
          {
            label: "Downgrade 8.0 to 7.0",
            contentSite: "docs",
            url: "/docs/:version/release-notes/8.0-downgrade",
          },
          {
            label: "Changelog",
            contentSite: "docs",
            url: "/docs/:version/release-notes/8.0-changelog",
          },
        ],
      },
      {
        label: "7.0",
        contentSite: "docs",
        url: "/docs/:version/release-notes/7.0",
        collapsible: true,
        items: [
          {
            label: "Compatibility Changes",
            contentSite: "docs",
            url: "/docs/:version/release-notes/7.0-compatibility",
          },
          {
            label: "Upgrade 6.0 to 7.0",
            contentSite: "docs",
            url: "/docs/:version/release-notes/7.0-upgrade",
            collapsible: true,
            items: [
              {
                label: "Standalone",
                contentSite: "docs",
                url: "/docs/:version/release-notes/7.0-upgrade-standalone",
              },
              {
                label: "Replica Set",
                contentSite: "docs",
                url: "/docs/:version/release-notes/7.0-upgrade-replica-set",
              },
              {
                label: "Sharded Cluster",
                contentSite: "docs",
                url: "/docs/:version/release-notes/7.0-upgrade-sharded-cluster",
              },
            ],
          },
          {
            label: "Downgrade 7.0 to 6.0",
            contentSite: "docs",
            url: "/docs/:version/release-notes/7.0-downgrade",
          },
          {
            label: "Changelog",
            contentSite: "docs",
            url: "/docs/:version/release-notes/7.0-changelog",
          },
        ],
      },
      {
        label: "Versioning",
        contentSite: "docs",
        url: "/docs/:version/reference/versioning",
      },
    ],
  },  
  {
    label: "Atlas Release Notes",
    contentSite: "cloud-docs",
    url: "/docs/atlas/release-notes",
    collapsible: true,
    items: [
      {
        label: "Atlas",
        contentSite: "cloud-docs",
        url: "/docs/atlas/release-notes/changelog",
      },
      {
        label: "Atlas Data Federation",
        contentSite: "cloud-docs",
        url: "/docs/atlas/release-notes/data-federation",
      },
      {
        label: "Atlas Kubernetes Operator",
        contentSite: "atlas-operator",
        url: "/docs/atlas/operator/stable/ak8so-changelog/",
      },
      {
        label: "Atlas SQL",
        contentSite: "cloud-docs",
        url: "/docs/atlas/release-notes/sql",
      },
      {
        label: "Atlas Stream Processing",
        contentSite: "cloud-docs",
        url: "/docs/atlas/atlas-stream-processing/changelog",
      },
      {
        label: "MongoDB Charts",
        contentSite: "charts",
        url: "/docs/charts/release-notes/",
      },
    ],
  },
  {
    label: "Search Release Notes",
    contentSite: "cloud-docs",
    url: "/docs/atlas/atlas-search/changelog",
    collapsible: false,
  },
  {
    label: "Vector Search Release Notes",
    contentSite: "cloud-docs",
    url: "/docs/atlas/atlas-vector-search/changelog",
    collapsible: false,
  },
]

export default tocData;
