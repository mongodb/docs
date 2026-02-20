# MongoDB Shell Code Example Test Suite

This project contains the infrastructure to test and extract MongoDB Shell code
examples for use across MongoDB documentation.

The structure of this project is as follows:

- `/examples`: This directory contains example code and output to validate.
- `/tests`: This directory contains the test infrastructure to actually run
  the tests by invoking the example code.
- `utils/`: Helper utilities for test execution and output comparison.

Each test runs a mongosh script (from `examples/`) against a test database
and compares the output to an expected result file. The test harness uses the
`Expect` API, which provides a fluent interface for comparing actual output
against expected output files with helpful error messages for technical writers.

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

This test suite requires you to have `Node.js` v24.2.0 or newer installed. If you
do not yet have Node installed, refer to
[the Node.js installation page](https://nodejs.org/en/download/) for details.
We recommend using Node Version Manager (NVM) to manage your Node versions.

From the root of the `/command-line/mongosh` directory, run the following command
to install dependencies:

```sh
npm install
```

Optionally, to run the tests, you must have `mongosh` installed. Refer to
[Install mongosh](https://www.mongodb.com/docs/mongodb-shell/install/) for
details.

## To create a new code example

To create a new code example:

1. Create a code example file
2. Create an output file
3. Format the code example files
4. Add a corresponding test - refer to the instructions below for testing
5. Run the snip command to move the tested code to a docs directory
6. Use the code example in a `literalinclude` or `io-code-block` in your docs set

If you're not comfortable adding a test, create this as an untested code example
in your docs project's `source/code-examples` directory. Then, file a DOCSP ticket
with the component set to `DevDocs` to request the DevDocs team move the file
into this test project and add a test.

### Create one or more code example files

Create new files in the `/examples` directory. Organize these examples to group
related concepts - e.g. `aggregation/pipelines` or `crud/insert`. With the goal
of single-sourcing code examples across different docs projects, avoid matching
a specific docs project's page structure and instead group code examples by
related concept or topic for easy reuse.

For pages that demonstrate multi-step mongosh operations, such as loading
data and running an aggregation pipeline, group related examples into a directory
together.

### Create an output file

Create a file to store the output alongside the example. For example:

- `aggregation/pipelines/filter/run-pipeline.js`
- `aggregation/pipelines/filter/output.sh`

Verifying code with an output file is the only method provided by this MongoDB
Shell test framework to validate the code runs successfully. You must include
an output file for the test even if you do not intend to show it in the docs.

### Format the code example files

This project intentionally omits auto-formatting for code example files. The
existing rule set we've used in other JavaScript projects modifies code examples
such that they cause tests to fail in this test execution syntax.

## To add a test for a new code example

To add a test for a new code example:

1. Create a new test case (optionally, in a new test file)
2. Use the `Expect` API to run your example files and verify the output
3. Run the tests to confirm everything works

### Create a new test case

This test suite uses the [Jest](https://jestjs.io/docs/getting-started)
testing framework to verify that our code examples compile, run, and produce
the expected output when executed.

Each test file starts with a `describe` block that groups together related
test cases. Within the `describe` block, you can execute many individual test
cases, which are each contained within an `it` block.

You may choose to add a new `it` block to a group of related tests; for example,
if you have a `crud/insert` test file, you might add tests for many insert
operation examples. If there is no test file and `describe` block related to
your code example, create a new file.

#### Create a new test file/describe block

If there is no test file that relates to your code example's topic, create a
new test file. The naming convention is `YOUR-EXAMPLE-TOPIC.test.js`.

You can nest these test files as deeply as needed to make them easy to find
and organize.

At the top of the file, import the `Expect` API and set a timeout value for your tests:

```javascript
const Expect = require("../../../utils/comparison/Expect");

jest.setTimeout(10000);
```

> **Note**: the path to `Expect` is relative, so you may need a different number
> of `../` to get from the test file to the `utils/comparison` directory.

Inside the test file, create a new `describe` block, similar to:

```javascript
describe("mongosh aggregation pipeline tutorial tests", () => {
  // Add test cases and setup/teardown code as needed
});
```

The string following the `describe` is the description of the concept that this
test file is testing. It should broadly fit the group of individual test cases
within the file.

##### Set up and tear down tests

Inside each test file, you can add a `beforeEach` and `afterEach` block
to execute some code before or after every test case, such as loading fresh
sample data or dropping the database after performing a write operation to
avoid cross-contaminating the tests. You can only define one `beforeEach`
and `afterEach` block per test file, so ensure the logic in these blocks is
reusable for all test cases.

Then, inside the `describe` block add an `it` block to add an individual test
case.

#### Add a test case

After the last `it` block in the file, create a new `it` block similar to:

```javascript
it("Should return filtered output with three specified person records", async () => {
  // Insert your test code
});
```

The string following the `it` is the description of your test case; this is
what shows when a test fails. Make it a descriptive string so it's easier to
find the test case and fix a failure if it fails.

Note that the test function is `async` - this is required when using the `Expect` API.

### Use the Expect API to verify output

The `Expect` API provides a fluent interface for running mongosh code examples
and comparing their output to expected result files. It handles all the complexity
of creating temporary files, executing mongosh, and comparing outputs.

#### Basic usage

In your test case:

1. Specify the file paths for your example files. These file paths should:
   - Be relative to the `examples` directory
   - Omit the `examples` directory
   - Be added in the order that they need to execute (e.g., `load-data.js` before `run-pipeline.js`)

2. Specify the expected output file path (relative to `examples` directory)

3. Use the `Expect` API to run the files and verify the output:

```javascript
it("Should return filtered output", async () => {
  await Expect.outputFromExampleFiles([
      "aggregation/pipelines/filter/load-data.js",
      "aggregation/pipelines/filter/run-pipeline.js"
    ])
    .withDbName("agg-pipeline")
    .shouldMatch("aggregation/pipelines/filter/output.sh");
});
```

The `Expect` API uses method chaining to configure how the test runs and how
the comparison is performed. Choose the appropriate methods based on your
output characteristics.


#### Comparison options

The `Expect` API supports several options to control how output is compared:

##### Verify unordered output (default behavior)

For output that can be in any order (most common case for MongoDB queries):

```javascript
// Unordered comparison is the default
await Expect.outputFromExampleFiles(["query.js"])
  .withDbName("test-db")
  .shouldMatch("output.sh");

// Or be explicit with withUnorderedSort()
await Expect.outputFromExampleFiles(["query.js"])
  .withDbName("test-db")
  .withUnorderedSort()
  .shouldMatch("output.sh");
```

##### Verify ordered output

For output that must be in a specific order (e.g., when using sort operations):

```javascript
await Expect.outputFromExampleFiles(["sorted-query.js"])
  .withDbName("test-db")
  .withOrderedSort()
  .shouldMatch("sorted-output.sh");
```

##### Handle variable field values

When your output contains fields that will have different values between test runs
(such as ObjectIds, timestamps, UUIDs, or other auto-generated values), ignore
specific fields during comparison:

```javascript
await Expect.outputFromExampleFiles(["insert.js"])
  .withDbName("test-db")
  .withIgnoredFields("_id", "timestamp", "userId")
  .shouldMatch("insert-output.sh");
```

This ensures the comparison only validates that the field names are present,
without checking if the values match exactly. This is particularly useful for:

- **Database IDs**: `_id`, `userId`, `documentId`
- **Timestamps**: `createdAt`, `updatedAt`, `timestamp`
- **UUIDs and tokens**: `uuid`, `sessionId`, `apiKey`
- **Auto-generated values**: Any field with dynamic content

##### Handle flexible content in output files

For output files that truncate the actual output to show only what's relevant
to our readers, use ellipsis patterns (`...`) in your output files to enable
flexible content matching. Our tooling automatically detects and handles these
patterns.

###### Shorten string values

You can use an ellipsis at the end of a string value to shorten it in the
example output. This will match any number of characters in the actual return
after the `...`.

In the expected output file, add an ellipsis to the end of a string value:

```txt
{
  plot: 'A young man is accidentally sent 30 years into the past...',
}
```

This matches the actual output of:

```txt
{
  plot: 'A young man is accidentally sent 30 years into the past in a time-traveling DeLorean invented by his close friend, the maverick scientist Doc Brown.',
}
```

###### Omit unimportant values for keys

If it's not important to show the value or type for a given key at all,
replace the value with an ellipsis in the expected output file.

```txt
{_id: ...}
```

Matches any value for the key `_id` in the actual output.

###### Omit any number of keys and values entirely

If actual output contains many keys and values that are not necessary to show
to illustrate an example, add an ellipsis as a standalone line in your
expected output file:

```txt
{
  full_name: 'Carmen Sandiego',
  ...
}
```

Matches actual output that contains any number of additional keys and values
beyond the `full_name` field.

You can also interject standalone `...` lines between properties, similar to:

```txt
{
  full_name: 'Carmen Sandiego',
  ...
  address: 'Somewhere in the world...'
}
```

##### Validate output structure (schema validation)

When you need to validate that output conforms to an expected structure without
exact matching, use `shouldResemble()` with `withSchema()`. This is useful when:

- You only care that documents have certain fields, not their exact values
- You want to verify document count without matching content exactly
- You need to check that specific fields have specific values while ignoring others

```javascript
await Expect.outputFromExampleFiles(["query.js"])
  .withDbName("test-db")
  .shouldResemble("output.sh")                  // Expect output to have this structure
  .withSchema({
    count: 3,                                   // Expect exactly 3 documents
    requiredFields: ["_id", "title", "year"],   // These fields must exist
    fieldValues: { year: 2012 }                 // This field have this value
  });
```

Schema options:

| Option | Required | Description |
|--------|----------|-------------|
| `count` | Yes | Exact number of documents expected |
| `requiredFields` | No | Array of field names that must be present |
| `fieldValues` | No | Object of field names with required values |

**Note**: `withIgnoredFields()` cannot be used with `shouldResemble()`. The
schema-based comparison validates document structure and count, so ignoring
fields is not applicable. Use `shouldMatch()` if you need to ignore specific
field values.

##### Complete API reference

The `Expect` API supports these methods:

```javascript
// With shouldMatch() - exact comparison with ellipsis support
await Expect.outputFromExampleFiles(["file.js"])  // Required - file(s) to execute
  // or .outputFromExampleFiles(["file1.js", "file2.js"])  // Multiple files
  .withDbName("database-name")                    // Required - specify database name
  .withUnorderedSort()                            // Default - arrays compared without order
  .withOrderedSort()                              // Arrays compared in strict order
  .withIgnoredFields("field1", "field2")          // Ignore specified fields (shouldMatch only)
  .shouldMatch("expected-output.sh");

// With shouldResemble() - schema-based validation
await Expect.outputFromExampleFiles(["file.js"])
  .withDbName("database-name")
  .shouldResemble("expected-output.sh")           // Schema-based validation
  .withSchema({ count: 3, requiredFields: [...], fieldValues: {...} });
```

**Important**: `withIgnoredFields()`, `withOrderedSort()`, and `withUnorderedSort()`
can only be used with `shouldMatch()`, not with `shouldResemble()`. Schema validation
checks document structure independently - it doesn't compare documents between
expected and actual outputs.

You can chain multiple methods together:

```javascript
await Expect.outputFromExampleFiles(["load-data.js", "run-query.js"])
  .withDbName("test-db")
  .withOrderedSort()
  .withIgnoredFields("_id", "timestamp")
  .shouldMatch("expected-output.sh");
```

##### Advanced: Direct comparison mode

For advanced usage when you already have captured output (not executing files):

```javascript
// Compare already-captured output directly
Expect.that(actualOutput)
  .withIgnoredFields("_id")
  .shouldMatch("expected-output.sh");

// Or use schema validation
Expect.that(actualOutput)
  .shouldResemble("expected-output.sh")
  .withSchema({ count: 2, requiredFields: ["name"] });
```


## To run the tests locally

### Create a .env file

Create a file named `.env` at the root of the `/mongosh` directory.
Add the following values to your .env file.

#### Option 1: Local MongoDB deployment

For a local MongoDB instance, provide both the connection string and port:

```
CONNECTION_STRING="mongodb://localhost:63201"
CONNECTION_PORT="63201"
TZ=UTC
```

#### Option 2: MongoDB Atlas cluster

For an Atlas cluster, provide only the SRV connection string (no port needed):

```
CONNECTION_STRING="mongodb+srv://username:password@cluster.mongodb.net/?appName=YourApp"
TZ=UTC
```

> **Note**: When using Atlas, the `CONNECTION_PORT` variable is not needed and
> is ignored. The test suite automatically detects SRV connection strings
> (`mongodb+srv://`) and handles them appropriately.

To find your Atlas connection string:
1. Go to your Atlas cluster
2. Click "Connect" > "Drivers"
3. Copy the connection string and replace `<password>` with your database user password

**Important**: Ensure your Atlas cluster has the [sample datasets](https://www.mongodb.com/docs/atlas/sample-data/)
loaded if you want to run tests that depend on sample data.

#### Environment variable reference

| Variable | Required | Description |
|----------|----------|-------------|
| `CONNECTION_STRING` | Yes | MongoDB connection URI (`mongodb://` or `mongodb+srv://`) |
| `CONNECTION_PORT` | No | Port for local MongoDB (ignored for Atlas/SRV connections) |
| `TZ` | Yes | Timezone setting (must be `UTC` for consistent test results) |

The `TZ` variable sets the Node.js environment to use the UTC time zone. This
is required to enforce time zone consistency between dates across different
local environments and CI when running the test suite.

### Run All Tests from the command line

From the `/mongosh` directory, run:

```sh
npm test
```

This invokes the following command from the `package.json` `test` key:

```
export $(xargs < .env) && jest --run-in-band --detectOpenHandles --testMatch='**/tests/**/*.test.js'
```

In the above command:

- `jest` is the command to run the test suite
- `--runInBand` is a flag that specifies only running one test at a time
  to avoid collisions when creating/editing/dropping indexes. Otherwise, Jest
  defaults to running tests in parallel.
- `--detectOpenHandles` is a flag that tells Jest to track resource handles or async
  operations that remain open after the tests are complete. These can cause the test suite
  to hang, and this flag tells Jest to report info about these instances.
- `--testMatch='**/tests/**/*.test.js'` is a flag that specifies the pattern to match only the code example test files.

#### Run Test Suites from the command line

You can run all the tests in a given test suite (file).

From the `/mongosh` directory, run:

```sh
npm test -- -t '<text string from the 'describe()' block you want to run>'
```

#### Run Individual Tests from the command line

You can run a single test within a given test suite (file).

From the `/mongosh` directory, run:

```sh
npm test -- -t '<text string from the 'it()' block you want to run>'
```

## To run the tests in CI

A GitHub workflow runs these tests in CI automatically when you change any
files in the `examples` directory:

- `.github/workflows/mongosh-examples-test-in-docker.yml`

GitHub reports the results as passing or failing checks on any PR that changes
an example.

If changing an example causes its test to fail, this should be considered
blocking to merge the example.

If changing an example causes an _unrelated_ test to fail, create a Jira ticket
to fix the unrelated test, but this should not block merging an example update.

## To snip code examples for inclusion in docs

### Run the snip script

This test suite uses [Bluehawk](https://github.com/mongodb-university/Bluehawk)
to generate code examples from the test files.

If you do not already have Bluehawk, install it with the following command:

```sh
npm install -g bluehawk
```

To generate updated example files, from the `/command-line/mongosh` directory,
run the snip command:

```sh
npm run snip
```

This command executes the `snip.js` script at the root of the
`/command-line/mongosh` directory to generate updated example files.

The updated example files output to `content/code-examples/tested/command-line/mongosh`.
Subdirectory structure is also automatically transferred. For example, generating
updated example files from `code-example-tests/command-line/mongosh/aggregation/filter`
automatically outputs to `content/code-examples/tested/command-line/mongosh/aggregation/filter`.

This script will automatically create the specified output path if it does not
exist.
