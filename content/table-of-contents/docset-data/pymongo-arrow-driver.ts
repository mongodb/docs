import type { TocItem } from "../types";

const tocData: TocItem[] = [
  {
    label: "PyMongoArrow",
    contentSite: "pymongo-arrow",
    group: true,
    versionDropdown: true,
    items: [
      {
        label: "Overview",
        contentSite: "pymongo-arrow",
        url: "/docs/languages/python/pymongo-arrow-driver/:version/",
      },
      {
        label: "Previous Versions",
        contentSite: "pymongo-arrow",
        url: "/docs/languages/python/pymongo-arrow-driver/:version/previous-versions",
      },
      {
        label: "Install & Upgrade",
        contentSite: "pymongo-arrow",
        url: "/docs/languages/python/pymongo-arrow-driver/:version/installation",
      },
      {
        label: "Quick Start",
        contentSite: "pymongo-arrow",
        url: "/docs/languages/python/pymongo-arrow-driver/:version/quick-start",
      },
      {
        label: "What's New",
        contentSite: "pymongo-arrow",
        url: "/docs/languages/python/pymongo-arrow-driver/:version/whats-new",
      },
      {
        label: "Compare to PyMongo",
        contentSite: "pymongo-arrow",
        url: "/docs/languages/python/pymongo-arrow-driver/:version/comparison",
      },
      {
        label: "Data Types",
        contentSite: "pymongo-arrow",
        url: "/docs/languages/python/pymongo-arrow-driver/:version/data-types",
      },
      {
        label: "Schema Examples",
        contentSite: "pymongo-arrow",
        url: "/docs/languages/python/pymongo-arrow-driver/:version/schemas",
      },
      {
        label: "Compatibility",
        contentSite: "drivers",
        url: "https://www.mongodb.com/docs/drivers/compatibility/?all-languages=python&python-driver-framework=arrow",
      },
      {
        label: "API Documentation",
        isExternal: true,
        url: "https://mongo-arrow.readthedocs.io/en/1.8.0/api/index.html",
      },
      {
        label: "FAQ",
        contentSite: "pymongo-arrow",
        url: "/docs/languages/python/pymongo-arrow-driver/:version/faq",
      },
    ],
  },
];

export default tocData;
