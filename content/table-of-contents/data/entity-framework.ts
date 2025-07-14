import type { TocItem } from "../types";

const tocData: TocItem[] = [
  {
    label: "EF Core Provider",
    contentSite: "entity-framework",
    url: "/docs/entity-framework/",
    collapsible: true,
    items: [
      {
        label: "Quick Start",
        contentSite: "entity-framework",
        url: "/docs/entity-framework/quick-start",
      },
      {
        label: "Quick Reference",
        contentSite: "entity-framework",
        url: "/docs/entity-framework/quick-reference",
      },
      {
        label: "Fundamentals",
        contentSite: "entity-framework",
        url: "/docs/entity-framework/fundamentals",
        collapsible: true,
        items: [
          {
            label: "Configuration",
            contentSite: "entity-framework",
            url: "/docs/entity-framework/fundamentals/configure",
          },
          {
            label: "Query Data",
            contentSite: "entity-framework",
            url: "/docs/entity-framework/fundamentals/query-data",
          },
          {
            label: "Write Data",
            contentSite: "entity-framework",
            url: "/docs/entity-framework/fundamentals/write-data",
          },
          {
            label: "Optimistic Concurrency",
            contentSite: "entity-framework",
            url: "/docs/entity-framework/fundamentals/optimistic-concurrency",
          },
          {
            label: "Indexes",
            contentSite: "entity-framework",
            url: "/docs/entity-framework/fundamentals/indexes",
          },
        ],
      },
      {
        label: "Limitations",
        contentSite: "entity-framework",
        url: "/docs/entity-framework/limitations",
      },
      {
        label: "Issues & Help",
        contentSite: "entity-framework",
        url: "/docs/entity-framework/issues-and-help",
      },
      {
        label: "FAQ",
        contentSite: "entity-framework",
        url: "/docs/entity-framework/faq",
      },
      {
        label: "What's New",
        contentSite: "entity-framework",
        url: "/docs/entity-framework/whats-new",
      },
      {
        label: "Upgrade",
        contentSite: "entity-framework",
        url: "/docs/entity-framework/upgrade",
      },
      {
        label: "API Documentation",
        isExternal: true,
        url: "https://mongodb.github.io/mongo-efcore-provider/9.0.0/api",
      },
    ],
  },
];

export default tocData;
