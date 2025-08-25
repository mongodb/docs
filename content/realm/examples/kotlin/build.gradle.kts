buildscript {
    repositories {
        gradlePluginPortal()
        google()
        mavenCentral()
        maven("https://oss.sonatype.org/content/repositories/snapshots")
    }
    dependencies {
        // version catalogs do not fully work in buildscript.dependencies, see:
        // https://github.com/gradle/gradle/issues/16958 and https://github.com/gradle/gradle/issues/19813
        val libs = project.extensions.getByType<VersionCatalogsExtension>().named("libs")
        classpath(libs.findLibrary("realm-plugin").get())
        classpath("org.jetbrains.kotlin:kotlin-gradle-plugin:1.8.21")
        classpath("com.android.tools.build:gradle:8.0.2")
    }
}

allprojects {
    repositories {
        google()
        mavenCentral()
        maven("https://oss.sonatype.org/content/repositories/snapshots")
    }
}

tasks.register("clean", Delete::class) {
    delete(rootProject)
}
