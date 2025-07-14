import type { TocItem } from "../types";

const tocData: TocItem[] = [
  {
    label: "MongoDB for IntelliJ Plugin",
    contentSite: "intellij",
    url: "/docs/mongodb-intellij/",
    collapsible: true,
    items: [
      {
        label: "Install",
        contentSite: "intellij",
        url: "/docs/mongodb-intellij/install",
      },
      {
        label: "Connect",
        contentSite: "intellij",
        url: "/docs/mongodb-intellij/connect",
      },
      {
        label: "Autocomplete",
        contentSite: "intellij",
        url: "/docs/mongodb-intellij/autocomplete",
      },
      {
        label: "Database Reference Validation",
        contentSite: "intellij",
        url: "/docs/mongodb-intellij/db-reference-validation",
      },
      {
        label: "Type Validation",
        contentSite: "intellij",
        url: "/docs/mongodb-intellij/type-validation",
      },
      {
        label: "Missing Index Warning",
        contentSite: "intellij",
        url: "/docs/mongodb-intellij/index-warning",
      },
      {
        label: "Run Java Queries",
        contentSite: "intellij",
        url: "/docs/mongodb-intellij/run-java-queries",
      },
      {
        label: "Release Notes",
        isExternal: true,
        url: "https://github.com/mongodb-js/intellij/blob/main/CHANGELOG.md",
      },
      {
        label: "Submit Feedback",
        contentSite: "intellij",
        url: "/docs/mongodb-intellij/submit-feedback",
        collapsible: true,
        items: [
          {
            label: "Logs",
            contentSite: "intellij",
            url: "/docs/mongodb-intellij/logs",
          },
        ],
      },
    ],
  },
];

export default tocData;
