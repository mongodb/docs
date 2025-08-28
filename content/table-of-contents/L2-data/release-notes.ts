import type { TocItem } from "../types";


const tocData: TocItem[] = [
    {
    label: "Server Release Notes",
    contentSite: "docs",
    url: "/docs/:version/release-notes",
    collapsible: true,
    items: [
      {
        label: "8.2 (Upcoming)",
        contentSite: "docs",
        url: "/docs/:version/release-notes/8.2",
        collapsible: true,
        items: [
          {
            label: "Compatibility Changes",
            contentSite: "docs",
            url: "/docs/:version/release-notes/8.2-compatibility",
          },
          {
            label: "Changelog",
            contentSite: "docs",
            url: "/docs/:version/release-notes/8.2-changelog",
          },
        ]
      },
      {
        label: "8.1 (Rapid Release)",
        contentSite: "docs",
        url: "/docs/:version/release-notes/8.1",
        collapsible: true,
        items: [
          {
            label: "Compatibility Changes",
            contentSite: "docs",
            url: "/docs/:version/release-notes/8.1-compatibility",
          },
          {
            label: "Changelog",
            contentSite: "docs",
            url: "/docs/:version/release-notes/8.1-changelog",
          },
        ],
      },
      {
        label: "8.0 (Stable Release)",
        contentSite: "docs",
        url: "/docs/:version/release-notes/8.0",
        collapsible: true,
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
        label: "6.0",
        contentSite: "docs",
        url: "/docs/:version/release-notes/6.0",
        collapsible: true,
        items: [
          {
            label: "Compatibility Changes",
            contentSite: "docs",
            url: "/docs/:version/release-notes/6.0-compatibility",
          },
          {
            label: "Upgrade 5.0 to 6.0",
            contentSite: "docs",
            url: "/docs/:version/release-notes/6.0-upgrade",
            collapsible: true,
            items: [
              {
                label: "Standalone",
                contentSite: "docs",
                url: "/docs/:version/release-notes/6.0-upgrade-standalone",
              },
              {
                label: "Replica Set",
                contentSite: "docs",
                url: "/docs/:version/release-notes/6.0-upgrade-replica-set",
              },
              {
                label: "Sharded Cluster",
                contentSite: "docs",
                url: "/docs/:version/release-notes/6.0-upgrade-sharded-cluster",
              },
            ],
          },
          {
            label: "Downgrade 6.0 to 5.0",
            contentSite: "docs",
            url: "/docs/:version/release-notes/6.0-downgrade",
            collapsible: true,
            items: [
              {
                label: "Standalone",
                contentSite: "docs",
                url: "/docs/:version/release-notes/6.0-downgrade-standalone",
              },
              {
                label: "Replica Set",
                contentSite: "docs",
                url: "/docs/:version/release-notes/6.0-downgrade-replica-set",
              },
              {
                label: "Sharded Cluster",
                contentSite: "docs",
                url: "/docs/:version/release-notes/6.0-downgrade-sharded-cluster",
              },
            ],
          },
          {
            label: "Changelog",
            contentSite: "docs",
            url: "/docs/:version/release-notes/6.0-changelog",
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
        label: "Atlas Search",
        contentSite: "cloud-docs",
        url: "/docs/atlas/atlas-search/changelog",
      },
      {
        label: "Atlas Vector Search",
        contentSite: "cloud-docs",
        url: "/docs/atlas/atlas-vector-search/changelog",
      },
      {
        label: "MongoDB Charts",
        contentSite: "charts",
        url: "/docs/charts/release-notes/",
      },
    ],
  },
]

export default tocData;
