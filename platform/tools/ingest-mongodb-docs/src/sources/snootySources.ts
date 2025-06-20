import { RenderLinks } from "./snooty/snootyAstToMd";
import { LocallySpecifiedSnootyProjectConfig } from "./snooty/SnootyDataSource";
import { prepareSnootySources } from "./snooty/SnootyProjectsInfo";

export const snootyProjectConfig: LocallySpecifiedSnootyProjectConfig[] = [
  {
    type: "snooty",
    name: "cloud-docs",
    tags: ["atlas", "docs"],
    productName: "MongoDB Atlas",
  },
  {
    type: "snooty",
    name: "cloudgov",
    tags: ["atlas", "docs", "government"],
    productName: "MongoDB Atlas for Government",
  },
  {
    // MongoDB Manual
    type: "snooty",
    name: "docs",
    tags: ["docs", "manual"],
    productName: "MongoDB Server",
  },
  {
    type: "snooty",
    name: "atlas-cli",
    tags: ["atlas", "docs", "cli", "atlas-cli"],
    productName: "Atlas CLI",
  },
  {
    type: "snooty",
    name: "bi-connector",
    tags: ["bi-connector", "docs"],
    productName: "MongoDB Connector for BI",
  },
  {
    type: "snooty",
    name: "charts",
    tags: ["charts", "docs", "atlas"],
    productName: "Atlas Charts",
  },
  {
    type: "snooty",
    name: "cluster-sync",
    tags: ["cluster-sync", "docs"],
    productName: "Cluster-to-Cluster Sync",
  },
  {
    type: "snooty",
    name: "database-tools",
    tags: ["database-tools", "docs", "cli"],
    productName: "MongoDB Database Tools",
  },
  {
    type: "snooty",
    name: "compass",
    tags: ["compass", "docs", "gui"],
    productName: "MongoDB Compass",
  },
  {
    type: "snooty",
    name: "csharp",
    tags: ["docs", "driver", "csharp"],
    productName: "C# Driver",
  },
  {
    type: "snooty",
    name: "entity-framework",
    tags: ["docs", "driver", "csharp", "entity-framework"],
    productName: "MongoDB Entity Framework Provider",
  },
  {
    type: "snooty",
    name: "drivers",
    tags: ["docs", "driver"],
    productName: "MongoDB Drivers",
  },
  {
    type: "snooty",
    name: "golang",
    tags: ["docs", "driver", "golang"],
    productName: "Go Driver",
  },
  {
    type: "snooty",
    name: "java",
    tags: ["docs", "driver", "java", "java-sync"],
    productName: "Java Driver",
  },
  {
    type: "snooty",
    name: "docs-k8s-operator",
    tags: ["docs", "kubernetes-operator", "kubernetes", "k8s"],
    productName: "MongoDB Kubernetes Operator",
  },
  {
    type: "snooty",
    name: "atlas-operator",
    tags: ["docs", "atlas", "kubernetes-operator", "kubernetes", "k8s"],
    productName: "MongoDB Atlas Kubernetes Operator",
  },
  {
    type: "snooty",
    name: "kafka-connector",
    tags: ["docs", "kafka-connector", "kafka"],
    productName: "MongoDB Kafka Connector",
  },
  {
    type: "snooty",
    name: "kotlin",
    tags: ["docs", "driver", "kotlin", "kotlin-coroutines"],
    productName: "Kotlin Coroutine Driver",
  },
  {
    type: "snooty",
    name: "kotlin-sync",
    tags: ["docs", "driver", "kotlin", "kotlin-sync"],
    productName: "Kotlin Sync Driver",
  },
  {
    type: "snooty",
    name: "landing",
    tags: ["docs"],
  },
  {
    type: "snooty",
    name: "mongocli",
    tags: ["docs", "cli", "mongocli"],
    productName: "MongoDB CLI",
  },
  {
    type: "snooty",
    name: "mongodb-shell",
    tags: ["docs", "cli", "mongodb-shell"],
    productName: "MongoDB Shell",
  },
  {
    type: "snooty",
    name: "mongodb-vscode",
    tags: ["docs", "mongodb-vscode", "vscode", "gui"],
    productName: "MongoDB for VS Code",
  },
  {
    type: "snooty",
    name: "mongoid",
    tags: ["docs", "driver", "mongoid", "ruby"],
    productName: "Mongoid ODM",
  },
  {
    type: "snooty",
    name: "node",
    tags: ["docs", "driver", "node", "javascript"],
    productName: "Node.js Driver",
  },
  {
    type: "snooty",
    name: "php-library",
    tags: ["docs", "driver", "php", "php-library"],
    productName: "PHP Library",
  },
  {
    type: "snooty",
    name: "laravel",
    tags: ["docs", "driver", "php", "laravel"],
    productName: "Laravel MongoDB",
  },
  {
    type: "snooty",
    name: "docs-relational-migrator",
    tags: ["docs", "relational-migrator"],
    productName: "MongoDB Relational Migrator",
  },
  {
    type: "snooty",
    name: "ruby-driver",
    tags: ["docs", "driver", "ruby"],
    productName: "Ruby Driver",
  },
  {
    type: "snooty",
    name: "spark-connector",
    tags: ["docs", "spark-connector", "spark", "apache-spark"],
    productName: "MongoDB Spark Connector",
  },
  {
    type: "snooty",
    name: "visual-studio-extension",
    tags: ["docs", "visual-studio-extension", "visual-studio", "gui"],
    productName: "MongoDB Visual Studio Extension",
  },
  {
    type: "snooty",
    name: "rust",
    tags: ["docs", "driver", "rust"],
    productName: "Rust Driver",
  },
  {
    type: "snooty",
    name: "cpp-driver",
    tags: ["docs", "driver", "cpp", "cxx", "c++"],
    productName: "C++ Driver",
  },
  {
    type: "snooty",
    name: "c",
    tags: ["docs", "driver", "c", "libmongoc"],
    productName: "C Driver",
  },
  {
    type: "snooty",
    name: "scala",
    tags: ["docs", "driver", "scala"],
    productName: "Scala Driver",
  },
  {
    type: "snooty",
    name: "java-rs",
    tags: ["docs", "driver", "java", "java-reactive-streams"],
    productName: "Java Reactive Streams Driver",
  },
  {
    type: "snooty",
    name: "pymongo",
    tags: ["docs", "driver", "python", "pymongo"],
    productName: "PyMongo",
  },
  {
    type: "snooty",
    name: "pymongo-arrow",
    tags: ["docs", "driver", "python", "pymongo-arrow"],
    productName: "PyMongo Arrow",
  },
  {
    type: "snooty",
    name: "django",
    tags: ["docs", "django", "python", "backend"],
    productName: "Django MongoDB Backend",
  },
  {
    type: "snooty",
    name: "ops-manager",
    tags: ["docs", "ops-manager"],
    productName: "MongoDB Ops Manager",
  },
  {
    type: "snooty",
    name: "cloud-manager",
    tags: ["docs", "cloud-manager"],
    productName: "MongoDB Cloud Manager",
  },
  {
    type: "snooty",
    name: "intellij",
    tags: ["docs", "intellij", "plugin"],
    productName: "MongoDB IntelliJ Plugin",
  },
  {
    type: "snooty",
    name: "atlas-architecture",
    tags: ["docs", "atlas", "architecture"],
    productName: "MongoDB Atlas Architecture Center",
  },
];

export const snootyDataApiBaseUrl = "https://snooty-data-api.mongodb.com/prod/";

export const makeSnootyDataSources = (
  snootyDataApiBaseUrl: string,
  projects: LocallySpecifiedSnootyProjectConfig[],
  links?: Omit<RenderLinks, "baseUrl">
) =>
  prepareSnootySources({
    projects,
    snootyDataApiBaseUrl,
    links,
  });
