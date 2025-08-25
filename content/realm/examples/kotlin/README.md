# Kotlin SDK Example App

A Kotlin Multiplatform (KMP) mobile application showcasing Realm Kotlin SDK (realm-kotlin) functionality.
Used to generate code snippets for the Kotlin SDK documentation.

## Test

To test, run the `jvmTest` task in the `shared` module using the Gradle wrapper.
This task runs a series of Kotlin SDK tests in the JVM environment, pulled from the tests of the
"shared" module. The "shared" module in KMM runs on ios, android, and jvm environments, but JVM
is the lightest, and thus the platform of choice for a speedy CI or test run.

```
./gradlew :shared:jvmTest
```

This will run all of the tests in the project. If you get a "BUILD SUCCESSFUL", they all passed. Anything else generally means a test failed.

If a test crashes the suite, or hangs infinitely, you might need to run specific test files or even specific tests. You can do this with Gradle's `--test` argument.

This example runs all of the tests in the "SyncTest" class:

```
./gradlew :shared:jvmTest --tests SyncTest
```

This example uses pattern matching to run all of the tests beginning with "upsert" in the "CRUDTest" class:

```
./gradlew :shared:jvmTest --tests CRUDTest.upsert*
```

You can also run individual tests:

```
./gradlew :shared:jvmTest --tests CRUDTest.upsertAnObjectTest
```

## Generate Bluehawk Snippets

```
bluehawk snip examples/kotlin/shared/src/ -o source/examples/generated/kotlin/
```
