# Java - Java Sync Driver - Example Test Suite

This project contains the infrastructure to test and extract MongoDB Java Sync Driver code
examples for use across MongoDB documentation.

The structure of this Java project is as follows:

- `/src/main/java`: This directory contains example code and output to validate.
- `/src/test/java`: This directory contains the test infrastructure to actually
  run the tests by invoking the example code.

## Overview

1. [Set up environment](#set-up-environment)
2. [Create a new code example](#to-create-a-new-code-example)
3. [Add a test for a new code example](#to-add-a-test-for-a-new-code-example)
4. Run tests [locally](#to-run-the-tests-locally) (optional) or in [CI](#to-run-the-tests-in-ci)
5. [Snip code examples](#to-snip-code-examples-for-inclusion-in-docs) for inclusion in docs

Refer to the README at the root of the `code-example-tests` directory for information
about how to use the tested code examples in your documentation project after you complete the
`snip` step.

## Set up environment

### Install prerequisites

This test suite was written with Java JDK Zulu v17 installed. If you
do not yet have Java installed, install it. There are many ways to install Java,
which is out of the scope of this README.

Separately, you can install `Maven` if you want to run the test suite from the
command line. For details about installing Maven, refer to
[Installing Apache Maven](https://maven.apache.org/install.html). You don't
need to install Maven if you plan to run the tests from within the IDE, or don't plan to run the tests at all.

### Install project dependencies

You can install project dependencies through your IDE, or using `Maven` from the command line.

#### Install Project Dependencies in the IDE

Open the `pom.xml` file in the root of the `/java` directory in your IDE. The
first time you load it, or when you change any dependencies, a `Sync` button
appears. Press this button to download dependencies.

#### Install Project Dependencies from the Command Line

If you install `Maven`, you can install project dependencies from the command
line. From the root of the `/java` directory, run the following command to
install dependencies:

```
mvn install
```

## To create a new code example

To create a new code example:

1. Create a code example file
2. Create an output file (optional)
3. Format the code example files
4. Add a corresponding test - refer to the instructions below for testing
5. Run the `snip.js` script to move the tested code to a docs directory
6. Use the code example in a `literalinclude` or `io-code-block` in your docs set

If you're not comfortable adding a test, create this as an untested code example
in your docs project's `source/code-examples` directory. Then, file a DOCSP ticket
with the component set to `DevDocs` to request the DevDocs team move the file
into this test project and add a test.

### Create a code example file

Create a new file in the `src/main/java/` directory. Organize these examples to group
related concepts - i.e. `aggregation.pipelines` or `crud.insert`. With the goal
of single-sourcing code examples across different docs projects, avoid matching
a specific docs project's page structure and instead group code examples by
related concept or topic for easy reuse.

Refer to the `main.java.example/ExampleStub.java` file for an example you can copy/paste
to stub out your own example.

### Create an output file

If the output from the code example will be shown in the docs, create a file
to store the output alongside the example. For example:

- `aggregation.pipelines.filter.Tutorial.java`
- `aggregation.pipelines.filter.TutorialOutput.txt`

### Format the code example files

This project uses the [Spotless](https://github.com/diffplug/spotless) code formatting
tool to enforce style formatting for code in the `driver-sync/src` directory. A GitHub
workflow checks formatting automatically when you add or change any files in this directory.
You can check and fix formatting manually on your machine before making your PR by
running the following command from the root of the `driver-sync/` directory:

```shell
mvn spotless:apply
```

Alternately, you can configure your IDE to automatically format files on save.

## To add a test for a new code example

To add a test for a new code example:

1. Create a new test case (optionally, in a new test file)
2. Define logic to verify the output matches expectations
3. Run the tests to confirm everything works

### Create a new test case

This test suite uses the [JUnit](https://docs.junit.org/current/user-guide/)
testing framework to verify that our code examples compile, run, and produce
the expected output when executed.

Each test file contains a class that groups together related test cases. Within
the test class, you can execute many individual test cases, which are each
annotated with a `@Test` and `@DisplayName` attribute.

You may choose to add a new `@Test` block to a group of related tests; for
example, if you have a `crud.insert` test file, you might add tests for many
insert operation examples. If there is no test file and class related to
your code example, create a new file.

#### Add a test case to an existing file

After the last `@Test` block in the file, create a new `@Test` block similar
to:

```java
@Test
@DisplayName("Test that filter aggregation pipeline matches output")
void TestFilter() {
  var example = new aggregation.pipelines.filter.Tutorial();
  example.loadSampleData();
  var output = example.runTutorial();

  // Read the expected output file
  Path outputFilePath = Path.of("src/main/java/aggregation/pipelines/filter/TutorialOutput.txt");
  List<Document> expected = TestUtils.loadDocumentsFromFile(outputFilePath);

  assertEquals(expected, output, "The output from the Filter Tutorial class does not match the expected contents!");
}
```

In the `@Displayname` annotation, give it a descriptive name that can help you and others understand the intent of the
test, and easily find and debug any issues if the test should fail.

In the test case:

1. Call the function that runs your example
2. Capture the output to a variable
3. Verify that the output from running your example matches what you expect

Refer to the [Define logic to verify the output](#define-logic-to-verify-the-output)
section of this README for examples of different ways you can perform this
verification.

#### Create a new test file block

If there is no test file that relates to your code example's topic, create a
new test file. The naming convention is `YourExampleFilenameTests.java`.

You can nest these test files as deeply as needed to make them easy to find
and organize.

Inside the test file, create a new class, similar to:

```java
package test.aggregation.pipelines;

public class TutorialTests {
 
}
```

The `package` should match the directory structure where the file is located, and the class name should match the filename.

##### Set up and tear down tests

Inside each test class, you can add a `setUp()` and `tearDown()` function
to execute some code before or after every test case, such as loading fresh
sample data or dropping the database after performing a write operation to
avoid cross-contaminating the tests.

Then, add a function annotated with the `@Test` attribute to add an individual test
case. Refer to the "Add a test case to an existing file" section of this README
for details.

Give it a descriptive `@Displayname` annotation. 

For an example you can copy/paste to stub out your own test case, refer to
`test/java/test/example/ExampleStubTest.java`.

### Define logic to verify the output

You can verify the output in a few different ways:

1. Return a simple string from your example function, and use a strict match
   to confirm it matches expectations.
2. Read expected output from a file, such as when we are showing the output
   in the docs, and compare it to what the code returns.

#### Verify a simple string match

Some code examples might return a simple string. For example:

```java
System.out.printf("Successfully created index named %s", result);
return String.format("Successfully created index named %s", result); // :remove:
```

In the test file, you can call the function that executes your code example,
establish what the expected string should be, and perform a match to confirm
that the code executed correctly:

```java
var result = example.RunApp();
String expectedReturn = 'some output to verify in a test';
assertEquals(expectedReturn, result, "The output from the Tutorial class does not match the expected result!");
```

#### Verify output from a file

If you are showing the output in the docs, write the output to a file whose
filename matches the example - i.e. `TutorialOutput.txt`. Then, read the
contents of the file in the test and verify that the output matches what the
test returns.

```java
var example = new aggregation.pipelines.filter.Tutorial();
example.loadSampleData();
var output = example.runTutorial();

// Read the expected output file
Path outputFilePath = Path.of("src/main/java/aggregation/pipelines/filter/TutorialOutput.txt");
List<Document> expected = TestUtils.loadDocumentsFromFile(outputFilePath);

assertEquals(expected, output, "The output from the Tutorial class does not match the expected contents!");
```

## To run the tests locally

### Create a cluster

To run these tests locally, you need a local MongoDB deploy or an Atlas cluster.
Save the connection string for use in the next step. If needed, see
[here](https://www.mongodb.com/docs/atlas/cli/current/atlas-cli-deploy-local/)
for how to create a local deployment.

### Create environment variables

Create environment variables to use when running the tests. Depending on
how you run the tests, you may do this in a few ways:

- Set them in your system through the terminal
- Add them in the IDE

The test suite requires the following environment variable:

- `CONNECTION_STRING` - your Atlas or local connection string

#### Add them to your process through the terminal

You can manually set these environment values through the terminal using the
`export` command:

```console
export CONNECTION_STRING="<your-connection-string>"
```

This is how we set the environment variables in CI. This sets the environment
variables system-wide.

#### Add them in the IDE

You can set the environment variables in a run configuration in your IDE.
Refer to your IDE's instructions for how to do this.

### Run the tests

#### Run All Tests from the command line

If you have `Maven` installed, you can run tests from the command line. From
the `/driver-sync` directory, run:

```
mvn test
```

#### Run a Test Class from the command line

You can run all the tests in a given test class (file).

From the root of the `/driver-sync` directory, run:

```
mvn -Dtest=YourTestClassName test
```

For example:

```
mvn -Dtest=TutorialTests test
```

#### Run Individual Tests from the command line

You can run a single test within a given test suite (file).

From the root of the `/driver-sync` directory, run:

```
mvn -Dtest=YourTestClassName#YourTestMethodName test
```

For example:

```
mvn -Dtest=TutorialTests#TestFilter test
```

## To run the tests in CI

A GitHub workflow runs these tests in CI automatically when you change any
files in the `examples` directory:

- `.github/workflows/java-driver-sync-examples-test-in-docker.yml`

GitHub reports the results as passing or failing checks on any PR that changes
an example.

If changing an example causes its test to fail, this should be considered
blocking to merge the example.

If changing an example causes an _unrelated_ test to fail, create a Jira ticket
to fix the unrelated test, but this should not block merging an example update.

## To snip code examples for inclusion in docs

### Add markup to the code example files (optional)

You can use markup to replace content that we do not want to show verbatim to users,
remove test functionality from the outputted code examples, or rename awkward variables.
You can find guides and reference documentation for this markup syntax [here](https://mongodb-university.github.io/Bluehawk/).

Inside your testable code example, add the comment `// :snippet-start: <SNIPPET-NAME>`
where you want to start the snippet, and add `// :snippet-end:` to end the snippet.
See an example in [ExampleStub.java](src/main/java/example/ExampleStub.java).

### Run the snip script

This test suite uses [Bluehawk](https://github.com/mongodb-university/Bluehawk)
to generate code examples from the test files.

If you do not already have Bluehawk, install it with the following command:

```sh
npm install -g bluehawk
```

To generate updated example files, from the `/driver-sync` directory,
run the snip script:

```sh
node snip.js
```

The updated example files output to `content/code-examples/tested/java/driver-sync/`.
Subdirectory structure is also automatically transferred. For example, generating
updated example files from `code-example-tests/java/driver-sync/src/main/java/aggregation/pipelines/filter`
automatically outputs to `content/code-examples/tested/java/driver-sync/aggregation/pipelines/filter`.

This script will automatically create the specified output path if it does not
exist.
