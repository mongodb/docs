val kotlin_mongodb_version: String by project

plugins {
    kotlin("jvm") version "1.8.0"
    id("com.google.osdetector") version "1.7.3"
    application
    kotlin("plugin.serialization") version "1.8.21"
}

group = "org.mongodb.docs.kotlin"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
    maven("https://oss.sonatype.org/content/repositories/snapshots")
}

dependencies {
    implementation("org.mongodb:mongodb-driver-kotlin-coroutine:$kotlin_mongodb_version")
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.7.1")
    testImplementation("org.jetbrains.kotlin:kotlin-test:1.8.10")
    implementation("org.slf4j:slf4j-api:2.0.5")
    implementation("ch.qos.logback:logback-classic:1.4.7")
    implementation("io.github.cdimascio:dotenv-kotlin:6.4.1")
    implementation("io.netty:netty-all:4.1.91.Final")
    implementation("io.netty:netty-tcnative-boringssl-static:2.0.59.Final:${osdetector.classifier}")
    implementation("org.xerial.snappy:snappy-java:1.1.10.0")
    implementation("com.github.luben:zstd-jni:1.5.5-4")
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-core:1.5.1")
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.5.0")
    implementation("org.mongodb:bson-kotlinx:5.1.2")
    implementation("org.jetbrains.kotlinx:kotlinx-datetime:0.4.0")
}

tasks.test {
    useJUnitPlatform()
}

kotlin {
    jvmToolchain(11)
}

application {
    mainClass.set("MainKt")
}
