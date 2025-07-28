# Kotlin Driver Code Examples

This directory contains the tested code examples for the Kotlin Driver.

## Set up

1. Use IntelliJ for testing.
1. Create a MongoDB cluster running >=6.0.0.
1. Create a `.env` file.
1. Then add the connection URI to a `MONGODB_CONNECTION_URI` variable to the `.env` file.

## Adding Code Examples to the Docs

The tests use [Bluehawk](https://mongodb-university.github.io/Bluehawk/)
to extract the code examples from the source file.

You can generate all the code examples by running the `bluehawk.sh` script.

## Setting up the MongoDB Cluster

Currently, it does not matter if you are running a cluster in Atlas or locally.
(This might change to be Atlas-only, at least for certain tests, if there are code
examples added for Atlas-only features like Atlas Search.)

If you are using Atlas, create a cluster and connect to it in the standard way.
Most tests can run on an M0 (free/shared), but you **must** use a dedicated cluster (>=M10)
for the certain tests, such as those for document pre-images in collections.

You can use [mlaunch](https://rueckstiess.github.io/mtools/mlaunch.html)
to spin up a replica set cluster locally with the command:

```sh
mlaunch --replicaset --nodes 3
```

Stop the cluster with:

```sh
mlaunch stop
```

Restart it with:

```sh
mlaunch start
```

Refer to the mlaunch docs for install info and other commands.

## Running tests

All tests in the project are automatically run on PRs as a GitHub action.

To manually run tests, run the `test` task using the Gradle wrapper. 
Use the `--tests` flag to run specific test files or tests.

```
./gradlew :shared:test
```

```
./gradlew :shared:test --tests ClassName
```

```
./gradlew :shared:test --tests ClassName.individualTestName
```