pluginManagement {
    repositories {
        google()
        gradlePluginPortal()
        mavenCentral()
    }
}

dependencyResolutionManagement {
    versionCatalogs {
        create("libs") {
            version("realm", "1.16.0")
            version("kotlinx-coroutines", "1.7.0")
            version("kotlinx-serialization", "1.5.0")
            library("realm-plugin", "io.realm.kotlin", "gradle-plugin").versionRef("realm")
            library("realm", "io.realm.kotlin", "library-base").versionRef("realm")
            library("realm-sync", "io.realm.kotlin", "library-sync").versionRef("realm")
            library("kotlinx-coroutines", "org.jetbrains.kotlinx", "kotlinx-coroutines-core").versionRef("kotlinx-coroutines")
            library("kotlinx-coroutines-android", "org.jetbrains.kotlinx", "kotlinx-coroutines-android").versionRef("kotlinx-coroutines")
            library("kotlinx-coroutines-test", "org.jetbrains.kotlinx", "kotlinx-coroutines-test").versionRef("kotlinx-coroutines")
            library("kotlinx-serialization", "org.jetbrains.kotlinx", "kotlinx-serialization-json").versionRef("kotlinx-serialization")
        }
    }
}

rootProject.name = "RealmKMMApp"
include(":androidRealmKMMApp")
include(":shared")
