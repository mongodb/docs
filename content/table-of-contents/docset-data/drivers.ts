import type { TocItem } from "../types";

const tocData: TocItem[] = [
  {
    label: "Drivers",
    contentSite: "drivers",
    url: "/docs/drivers/",
    collapsible: true,
    items: [
      {
        label: "C Driver",
        contentSite: "c",
        url: "/docs/languages/c/c-driver/current/",
      },
      {
        label: "C++ Driver",
        contentSite: "cpp-driver",
        url: "/cpp/cpp-driver/current/",
      },
      {
        label: ".NET/C# Driver",
        contentSite: "drivers",
        url: "/docs/drivers/csharp-drivers",
        collapsible: true,
        items: [
          {
            label: ".NET/C# Driver",
            contentSite: "csharp",
            url: "/docs/drivers/csharp/current/",
          },
          {
            label: "Entity Framework Provider",
            contentSite: "entity-framework",
            url: "/docs/entity-framework/current/",
          },
        ],
      },
      {
        label: "Go Driver",
        contentSite: "drivers",
        url: "/docs/drivers/go/current/",
      },
      {
        label: "Java Drivers",
        contentSite: "drivers",
        url: "/docs/drivers/java-drivers",
        collapsible: true,
        items: [
          {
            label: "Java Sync Driver",
            contentSite: "java",
            url: "/docs/drivers/java/sync/current/",
          },
          {
            label: "Java Reactive Streams Driver",
            contentSite: "java-rs",
            url: "/docs/languages/java/reactive-streams-driver/current/",
          },
        ],
      },
      {
        label: "Kotlin Drivers",
        contentSite: "drivers",
        url: "/docs/drivers/kotlin-drivers",
        collapsible: true,
        items: [
          {
            label: "Kotlin Coroutine Driver",
            contentSite: "kotlin",
            url: "/docs/drivers/kotlin/coroutine/current/",
          },
          {
            label: "Kotlin Sync Driver",
            contentSite: "kotlin-sync",
            url: "/docs/languages/kotlin/kotlin-sync-driver/current/",
          },
        ],
      },
      {
        label: "Node.js Driver",
        contentSite: "node",
        url: "/docs/drivers/node/current/",
      },
      {
        label: "PHP Driver",
        contentSite: "php-library",
        url: "/docs/drivers/php-drivers",
        collapsible: true,
        items: [
          {
            label: "Laravel MongoDB",
            contentSite: "laravel",
            url: "/docs/drivers/php/laravel-mongodb/current",
          },
          {
            label: "Symfony Integration",
            contentSite: "drivers",
            url: "/docs/drivers/php-frameworks/symfony",
          },
          {
            label: "Drupal Integration",
            contentSite: "drivers",
            url: "/docs/drivers/php-frameworks/drupal",
          },
          {
            label: "Libraries, Frameworks, & Tools",
            contentSite: "drivers",
            url: "/docs/drivers/php-libraries",
          },
        ],
      },
      {
        label: "Python Drivers",
        contentSite: "drivers",
        url: "/docs/drivers/python-drivers",
        collapsible: true,
        items: [
          {
            label: "PyMongo",
            contentSite: "pymongo",
            url: "/docs/languages/python/pymongo-driver/current/",
          },
          {
            label: "pymongo-arrow",
            contentSite: "drivers",
            url: "/docs/languages/python/pymongo-arrow-driver/current/",
          },
          {
            label: "Motor (Async Driver)",
            contentSite: "drivers",
            url: "/docs/drivers/motor",
          },
        ],
      },
      {
        label: "Ruby Drivers",
        contentSite: "drivers",
        url: "/docs/drivers/ruby-drivers",
        collapsible: true,
        items: [
          {
            label: "Ruby Driver",
            contentSite: "ruby-driver",
            url: "/docs/ruby-driver/current/",
          },
          {
            label: "Ruby Mongoid ODM",
            contentSite: "mongoid",
            url: "/docs/mongoid/current/",
          },
        ],
      },
      {
        label: "Rust Driver",
        contentSite: "rust",
        url: "/docs/drivers/rust/current/",
      },
      {
        label: "Scala Driver",
        contentSite: "scala",
        url: "/docs/languages/scala/scala-driver/current/",
      },
      {
        label: "Swift Driver",
        contentSite: "drivers",
        url: "/docs/drivers/swift",
      },
      {
        label: "TypeScript",
        contentSite: "drivers",
        url: "/docs/drivers/typescript",
      },
      {
        label: "About Compatibility Tables",
        contentSite: "drivers",
        url: "/docs/drivers/about-compatibility",
      },
      {
        label: "Other Document Database Compatibility",
        contentSite: "drivers",
        url: "/docs/drivers/other-document-dbs",
        collapsible: true,
        items: [
          {
            label: "Amazon DocumentDB Compatibility",
            contentSite: "drivers",
            url: "/docs/drivers/documentdb-support",
          },
          {
            label: "Azure Cosmos DB Compatibility",
            contentSite: "drivers",
            url: "/docs/drivers/cosmosdb-support",
          },
          {
            label: "ORMs, ODMs, and Libraries",
            contentSite: "drivers",
            url: "/docs/drivers/odm",
          },
        ],
      },
    ],
  },
];

export default tocData;
