import type { TocItem } from "../types";
import CDriverData from "../data/c-driver";
import CppDriverData from "../data/cpp-driver";
import CsharpDriverData from "../data/csharp-driver";
import EntityDriverData from "../data/entity-framework";
import GoDriverData from "../data/golang-drivers";
import JavaDriverData from "../data/java-driver";
import JavarsDriverData from "../data/java-rs";
import KotlinDriverData from "../data/kotlin-coroutine";
import KotlinSyncDriverData from "../data/kotlin-sync-driver";
import NodeDriverData from "../data/node-driver";
import PymongoDriverData from "../data/pymongo-driver";
import PymongoArrowDriverData from "../data/pymongo-arrow-driver";
import RubyDriverData from "../data/ruby-driver";
import MongoidDriverData from "../data/mongoid";
import RustDriverData from "../data/rust-driver";
import ScalaDriverData from "../data/scala-driver";

const tocData: TocItem[] = [
  {
    label: "Overview",
    contentSite: "drivers",
    url: "/docs/drivers/",
    collapsible: true,
    items: [
      {
        label: "Client Libraries",
        contentSite: "drivers",
        group: true,
        items: [
          {
            label: "C Driver",
            contentSite: "c",
            url: "/docs/languages/c/c-driver/current/",
            showSubNav: true,
            items: CDriverData,
          },
          {
            label: "C++ Driver",
            contentSite: "cpp-driver",
            url: "/cpp/cpp-driver/current/",
            showSubNav: true,
            items: CppDriverData,
          },
          {
            label: ".NET/C# Driver",
            contentSite: "csharp",
            url: "/docs/drivers/csharp/current/",
            showSubNav: true,
            items: CsharpDriverData,
          },
          {
            label: "Entity Framework Provider",
            contentSite: "entity-framework",
            url: "/docs/entity-framework/current/",
            showSubNav: true,
            items: EntityDriverData,
          },
          {
            label: "Go Driver",
            contentSite: "drivers",
            url: "/docs/drivers/go/current/",
            showSubNav: true,
            items: GoDriverData,
          },
          {
            label: "Java Sync Driver",
            contentSite: "java",
            url: "/docs/drivers/java/sync/current/",
            showSubNav: true,
            items: JavaDriverData,
          },
          {
            label: "Java Reactive Streams Driver",
            contentSite: "java-rs",
            url: "/docs/languages/java/reactive-streams-driver/current/",
            showSubNav: true,
            items: JavarsDriverData,
          },
          {
            label: "Kotlin Coroutine Driver",
            contentSite: "kotlin",
            url: "/docs/drivers/kotlin/coroutine/current/",
            showSubNav: true,
            items: KotlinDriverData,
          },
          {
            label: "Kotlin Sync Driver",
            contentSite: "kotlin-sync",
            url: "/docs/languages/kotlin/kotlin-sync-driver/current/",
            showSubNav: true,
            items: KotlinSyncDriverData,
          },
          {
            label: "Node.js Driver",
            contentSite: "node",
            url: "/docs/drivers/node/current/",
            showSubNav: true,
            items: NodeDriverData,
          },
          {
            label: "PyMongo",
            contentSite: "pymongo",
            url: "/docs/languages/python/pymongo-driver/current/",
            showSubNav: true,
            items: PymongoDriverData,
          },
          {
            label: "pymongo-arrow",
            contentSite: "drivers",
            url: "/docs/languages/python/pymongo-arrow-driver/current/",
            showSubNav: true,
            items: PymongoArrowDriverData,
          },
          {
            label: "Ruby Driver",
            contentSite: "ruby-driver",
            url: "/docs/ruby-driver/current/",
            showSubNav: true,
            items: RubyDriverData,
          },
          {
            label: "Ruby Mongoid ODM",
            contentSite: "mongoid",
            url: "/docs/mongoid/current/",
            showSubNav: true,
            items: MongoidDriverData,
          },
          {
            label: "Rust Driver",
            contentSite: "rust",
            url: "/docs/drivers/rust/current/",
            showSubNav: true,
            items: RustDriverData,
          },
          {
            label: "Scala Driver",
            contentSite: "scala",
            url: "/docs/languages/scala/scala-driver/current/",
            showSubNav: true,
            items: ScalaDriverData,
          },
        ],
      },
    ],
  },
];

export default tocData;
