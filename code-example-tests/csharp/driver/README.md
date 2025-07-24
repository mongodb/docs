# C# - .NET/C# Driver - Example Test Suite

This project contains the infrastructure to test and extract C#/.NET Driver code
examples for use across MongoDB documentation.

The structure of this C# project is as follows:

- `driver.sln`: This solution contains the following projects:
  - `Examples`: This project contains example code and output to validate.
  - `Tests`: This project contains the test infrastructure to actually run
    the tests by invoking the example code.

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

This test suite requires you to have `.NET` v9.0 or newer installed. If you
do not yet have .NET installed, refer to
[the .NET installation page](https://learn.microsoft.com/en-us/dotnet/core/install/)
for details.

From the root of the `/csharp/driver` directory, run the following command
to install dependencies:

```sh
dotnet restore
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

Create a new file in the `/Examples` directory. Organize these examples to group
related concepts - i.e. `Aggregation/Pipelines` or `Crud/Insert`. With the goal
of single-sourcing code examples across different docs projects, avoid matching
a specific docs project's page structure and instead group code examples by
related concept or topic for easy reuse.

Refer to the `Examples/ExampleStub.cs` file for an example you can copy/paste
to stub out your own example.

### Create an output file

If the output from the code example will be shown in the docs, create a file
to store the output alongside the example. For example:

- `Aggregation/Pipelines/Filter/Tutorial.cs`
- `Aggregation/Pipelines/Filter/TutorialOutput.txt`

### Format the code example files

This project uses a .NET `.editorconfig` file to enforce style formatting for
code in the `driver/` directory. A GitHub workflow checks formatting
automatically when you add or change any files in this directory. You can check
and fix formatting manually on your machine before making your PR by running the
following command from the root of the `drivers/` directory:

```shell
dotnet format
```

Alternately, you can configure VS Code to automatically format files on save.

## To add a test for a new code example

To add a test for a new code example:

1. Create a new test case (optionally, in a new test file)
2. Define logic to verify the output matches expectations
3. Run the tests to confirm everything works

### Create a new test case

This test suite uses the [NUnit](https://docs.nunit.org/articles/nunit/intro.html)
testing framework to verify that our code examples compile, run, and produce
the expected output when executed.

Each test file contains a class that groups together related test cases. Within
the test class, you can execute many individual test cases, which are each
annotated with a `[Test]` attribute.

You may choose to add a new `[Test]` block to a group of related tests; for
example, if you have a `Crud/Insert` test file, you might add tests for many
insert operation examples. If there is no test file and class related to
your code example, create a new file.

#### Add a test case to an existing file

Add an import to the top of the file, importing the new code example you created.
It should look similar to:

```csharp
using Examples.Aggregation.Pipelines.Filter;
```

After the last `[Test]` block in the file, create a new `[Test]` block similar
to:

```csharp
[Test]
public void TestAppProducesExpectedResult()
{
    var results = _example.RunApp();

    // Insert your logic to verify the output matches your expectations - for example:
    var expectedOutputCount = 1;
    var expectedOutputName = "Alice";
    Assert.That(results.Count, Is.EqualTo(expectedOutputCount), $"Result count {results.Count} does not match output example length {expectedOutputCount}.");
    Assert.That(results[0].GetValue("name").AsString, Is.EqualTo(expectedOutputName), $"Result name '{results[0]}' does not match expected output name '{expectedOutputName}'.");
}
```

In the test case:

1. Call the function that runs your example
2. Capture the output to a variable
3. Verify that the output from running your example matches what you expect

Refer to the [Define logic to verify the output](#define-logic-to-verify-the-output)
section of this README for examples of different ways you can perform this
verification.

#### Create a new test file block

If there is no test file that relates to your code example's topic, create a
new test file. The naming convention is `YourExampleFilenameTest.cs`.

You can nest these test files as deeply as needed to make them easy to find
and organize.

Inside the test file, create a new class, similar to:

```csharp
namespace Tests;

public class ExampleStubTest
{

}
```

##### Set up and tear down tests

Inside each test class, you can add a `Setup()` and `TearDown()` function
to execute some code before or after every test case, such as loading fresh
sample data or dropping the database after performing a write operation to
avoid cross-contaminating the tests.

Then, function annotated with the `[Test]` attribute to add an individual test
case. Refer to the "Add a test case to an existing file" section of this README
for details.

For an example you can copy/paste to stub out your own test case, refer to
`Tests/ExampleStubTest.cs`.

### Define logic to verify the output

You can verify the output in a few different ways:

1. Return a simple string from your example function, and use a strict match
   to confirm it matches expectations.
2. Read expected output from a file, such as when we are showing the output
   in the docs, and compare it to what the code returns.

#### Verify a simple string match

Some code examples might return a simple string. For example:

```csharp
Console.WriteLine($"Successfully created index named {result}");
return $"Successfully created index named {result}"; // :remove:
```

In the test file, you can call the function that executes your code example,
establish what the expected string should be, and perform a match to confirm
that the code executed correctly:

```csharp
var result = example.RunApp();
const expectedReturn = 'some output to verify in a test';
Assert.That(result, Is.EqualTo(expectedReturn), $"Result '{result}' does not match expected output '{expectedReturn}'.");
```

#### Verify output from a file

If you are showing the output in the docs, write the output to a file whose
filename matches the example - i.e. `TutorialOutput.txt`. Then, read the
contents of the file in the test and verify that the output matches what the
test returns.

```csharp
var results = _example.PerformAggregation();

// Read the contents of the file
var solutionRoot = DotNetEnv.Env.GetString("SOLUTION_ROOT", "Env variable not found. Verify you have a .env file with a valid connection string.");
var outputLocation = "Examples/Aggregation/Pipelines/Filter/TutorialOutput.txt";
var fullPath = Path.Combine(solutionRoot, outputLocation);
var fileData = TestUtils.ReadBsonDocumentsFromFile(fullPath);

//
Assert.That(results.Count, Is.EqualTo(fileData.Length), $"Result count {results.Count} does not match output example length {fileData.Length}.");
for (var i = 0; i < fileData.Length; i++)
{
    Assert.That(fileData[i], Is.EqualTo(results[i]), $"Mismatch at index {i}: expected {fileData[i]}, got {results[i]}.");
}
```

## To run the tests locally

### Create an Atlas cluster

To run these tests locally, you need a local MongoDB deploy or an Atlas cluster.
Save the connection string for use in the next step. If needed, see
[here](https://www.mongodb.com/docs/atlas/cli/current/atlas-cli-deploy-local/)
for how to create a local deployment.

### Create a .env file

Create a file named `.env` at the root of the `/driver` directory.
Add the following values to your .env file, similar to the following example:

```
CONNECTION_STRING="mongodb://localhost:27017"
SOLUTION_ROOT="/Users/your-username/workspace/docs-mongodb-internal/code-example-tests/csharp/driver/"
```

- `CONNECTION_STRING`: replace the port with the port where your local deployment is running.
- `SOLUTION_ROOT`: insert the path to the `driver` directory on your filesystem.

### Run All Tests from the command line

From the `/drivers` directory, run:

```
dotnet test
```

### Run Individual Tests from the command line

You can run a single test within a given test suite (file).

From the `/drivers` directory, run:

```
dotnet test --filter "FullyQualifiedName=YourNamespace.YourTestClass.YourTestMethod"
```
## To run the tests in CI

A GitHub workflow runs these tests in CI automatically when you change any
files in the `examples` directory:

- `.github/workflows/csharp-driver-examples-test-in-docker.yml`

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
See an example in [ExampleStub.cs](Examples/ExampleStub.cs).

### Run the snip script

This test suite uses [Bluehawk](https://github.com/mongodb-university/Bluehawk)
to generate code examples from the test files.

If you do not already have Bluehawk, install it with the following command:

```sh
npm install -g bluehawk
```

To generate updated example files, from the `/csharp/driver` directory,
run the snip script:

```sh
node snip.js
```

The updated example files output to `content/code-examples/tested/csharp/driver/`.
Subdirectory structure is also automatically transferred. For example, generating
updated example files from `code-example-tests/csharp/driver/Aggregation/Filter`
automatically outputs to `content/code-examples/tested/csharp/driver/Aggregation/Filter`.

This script will automatically create the specified output path if it does not
exist.
