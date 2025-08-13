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
following utilities:

- `makeTempFileForTesting.js`: Generates a temporary script that connects to
  the test database and wraps the example code for output capture.
- `unorderedOutputArrayMatches.js`: Compares actual and expected outputs,
  handling unordered arrays and MongoDB-specific types.

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

### Create a code example file

Create a new file in the `/examples` directory. Organize these examples to group
related concepts - e.g. `aggregation/pipelines` or `crud/insert`. With the goal
of single-sourcing code examples across different docs projects, avoid matching
a specific docs project's page structure and instead group code examples by
related concept or topic for easy reuse.

### Create an output file

If the output from the code example will be shown in the docs, create a file
to store the output alongside the example. For example:

- `aggregation/pipelines/filter/run-pipeline.js`
- `aggregation/pipelines/filter/output.sh`

Verifying code with an output file is the only method provided by this MongoDB
Shell test framework to validate the code runs successfully. If your operation
is a prerequisite for another operation, such as inserting documents to then
run another operation on those documents, you can omit the output file. That
code will be tested implicitly by the second operation.

Otherwise, you must include an output file for the test even if you do not
intend to show it in the docs.

### Format the code example files

This project intentionally omits auto-formatting for code example files. The
existing rule set we've used in other JavaScript projects modifies code examples
such that they cause tests to fail in this test execution syntax.

## To add a test for a new code example

To add a test for a new code example:

1. Create a new test case (optionally, in a new test file)
2. Set up the code to run the example files you've added
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

At the top of the file, add the required imports to run the test suite, and
set a timeout value for your tests:

```javascript
const { exec, execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const makeTempFileForTesting = require("../../../utils/makeTempFileForTesting");
const unorderedOutputArrayMatches = require("../../../utils/unorderedOutputArrayMatches");

jest.setTimeout(10000);
```

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

In the test case:

1. Specify the file path for your example file. This file path should:
   - Be relative to the `examples` directory
   - Omit the `examples` directory

   For example, a file path in `mongosh/examples/aggregation/pipelines/filter`
   might resemble:

   ```javascript
   const pipelineFilePath = "aggregation/pipelines/filter/run-pipeline.js";
   ```

2. Create a `details` object to provide the information needed to run the file
   as executable code, similar to:

   ```javascript
   const details = {
     connectionString: mongoUri,
     dbName: dbName,
     filepath: loadDataFilePath,
     validateOutput: false,
   };
   ```

   Establish variables at the top of the test file for connection string and
   db name, for reuse in the `beforeEach` and `afterEach` blocks to perform setup
   and teardown.

   The filepath should be the relative filepath you established previously.

   `validateOutput` is `true` if you have an output file you want to run the
   code against, or `false` if you are performing a prerequisite operation to
   set up or prepare for additional operations.

   If you intend to validate the output, you'll also need to add an output
   filepath to your test, similar to:

   ```javascript
   const expectedOutputFilePath = "aggregation/pipelines/filter/output.sh";
   ```

3. Call the `makeTempFileForTesting` function, and store the resulting temp
   filepath as a const to use when you execute the test. This creates an
   intermediary temporary file that wraps your example in the infrastructure
   needed to actually execute it.

   It takes the `details` object you created in the prior step.

   ```javascript
   const tempPath = makeTempFileForTesting(details);
   ```

4. Call `exec` with the following details to execute the code
   example:

   ```javascript
   exec(
     `mongosh --file ${tempPath} --port ${port}`,
     (error, stdout, stderr) => {
       expect(error).toBeNull(); // Ensure no error occurred
       if (stderr !== "") {
         console.error("Standard Error:", stderr);
       }

       // Validate the output
       const result = outputMatchesExampleOutput(
         expectedOutputFilePath,
         stdout,
       );
       expect(result).toBe(true);
       done();
     },
   );
   ```

   This runs your code example in `mongosh` as a script using a filepath.
   We pass `stdout` - the output from executing the command - to the
   `outputMatchesExampleOutput` function, along with the filepath for the
   expected output. If it matches, the `result` is true, and if it doesn't
   match, the result is `false`.

## To run the tests locally

### Create a .env file

Create a file named `.env` at the root of the `/mongosh` directory.
Add the following values to your .env file, substituting the port where your
local deployment is running:

```
CONNECTION_STRING="mongodb://localhost:63201"
CONNECTION_PORT="63201"
```

### Run All Tests from the command line

From the `/mongosh` directory, run:

```sh
npm test
```

This invokes the following command from the `package.json` `test` key:

```
export $(xargs < .env) && jest --run-in-band --detectOpenHandles
```

In the above command:

- `jest` is the command to run the test suite
- `--runInBand` is a flag that specifies only running one test at a time
  to avoid collisions when creating/editing/dropping indexes. Otherwise, Jest
  defaults to running tests in parallel.
- `--detectOpenHandles` is a flag that tells Jest to track resource handles or async
  operations that remain open after the tests are complete. These can cause the test suite
  to hang, and this flag tells Jest to report info about these instances.

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
