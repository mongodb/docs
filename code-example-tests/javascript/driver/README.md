# JavaScript - Node.js Driver - Example Test Suite

This project contains the infrastructure to test and extract Node.js Driver code
examples for use across MongoDB documentation.

The structure of this Node.js project is as follows:

- `/examples`: This directory contains example code, marked up with Bluehawk,
  that will be outputted to the external `/content/code-examples/tested/javascript/driver`
  directory when we run the `snip` script.
- `/tests`: This directory contains the test infrastructure to actually
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

This test suite requires you to have `Node.js` v20.9.0 or newer installed. If you
do not yet have Node installed, refer to
[the Node.js installation page](https://nodejs.org/en/download/) for details.
We recommend using Node Version Manager (NVM) to manage your Node versions.

From the root of the `/javascript/driver` directory, run the following command
to install dependencies:

```sh
npm install
```

## To create a new code example

To create a new code example:

1. Create a code example file
2. Create an output file (optional)
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
related concepts - i.e. `aggregation/pipelines` or `crud/insert`. With the goal
of single-sourcing code examples across different docs projects, avoid matching
a specific docs project's page structure and instead group code examples by
related concept or topic for easy reuse.

Refer to the `examples/example-stub.js` file for an example you can copy/paste
to stub out your own example.

### Create an output file

If the output from the code example will be shown in the docs, create a file
to store the output alongside the example. For example:

- `aggregation/pipelines/filter/tutorial.js`
- `aggregation/pipelines/filter/tutorial-output.sh`

### Format the code example files

This project uses Prettier to enforce style formatting for the files in the
`examples` directory. A GitHub workflow checks formatting automatically when
you add or change any files in this directory. You can check and fix formatting
manually on your machine before making your PR in a few ways:

- Install dependencies and run the Prettier formatting tool from the command line
- Configure VS Code to automatically apply formatting rules when you save a file

#### Run Prettier from the command line

To check for formatting issues without automatically fixing them, run:

```sh
npx prettier --check examples/
```

To automatically fix any formatting issues, run:

```sh
npm run format
```

#### Configure VS Code to automatically apply formatting on save

Prettier works with popular editors such as VS Code through extensions. To
format automatically when you save a file in VS Code:

1. Install the Prettier plugin: [Prettier - Code Formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).
2. Open your settings and enable `"editor.formatOnSave"`:

   ```json
   "editor.formatOnSave": true
   ```

3. Set Prettier as the default formatter:

   ```json
   "[javascript]": {
     "editor.defaultFormatter": "esbenp.prettier-vscode"
   }
   ```

You can find similar extensions for other editors and IDEs like Sublime Text,
Atom, or IntelliJ.

## To add a test for a new code example

To add a test for a new code example:

1. Create a new test case (optionally, in a new test file)
2. Define logic to verify the output matches expectations
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

#### Add a test case to an existing file

Add an import to the top of the file, importing the new code example you created.
It should look similar to:

```javascript
import { yourExampleName } from '../examples/example-stub.js';
```

After the last `it` block in the file, create a new `it` block similar to:

```javascript
it('Should return the expected text string when executing the example', async () => {
  const actualReturn = await yourExampleName();
  const expectedReturn = 'some output to verify in a test';

  // Insert your logic to verify the output matches your expectations
});
```

The string following the `it` is the description of your test case; this is
what shows when a test fails. Make it a descriptive string so it's easier to
find the test case and fix a failure if it fails.

In the test case:

1. Call the function that runs your example
2. Capture the output to a variable
3. Verify that the output from running your example matches what you expect

Refer to the [Define logic to verify the output](#define-logic-to-verify-the-output)
section of this README for examples of different ways you can perform this
verification.

#### Create a new test file/describe block

If there is no test file that relates to your code example's topic, create a
new test file. The naming convention is `YOUR-EXAMPLE-TOPIC.test.js`.

You can nest these test files as deeply as needed to make them easy to find
and organize.

Inside the test file, create a new `describe` block, similar to:

```javascript
describe('Example tests: show output printed to the console and return a value', () => {
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
case. Refer to the "Add a test case to an existing file" section of this README
for details.

For an example you can copy/paste to stub out your own test case, refer to
`tests/example.test.js`.

### Define logic to verify the output

You can verify the output in a few different ways:

1. Return a simple string from your example function, and use a strict match
   to confirm it matches expectations.
2. Read expected output from a file, such as when we are showing the output
   in the docs, and compare it to what the code returns.

#### Verify a simple string match

Some code examples might return a simple string. For example:

```javascript
console.log(`Successfully created index named "${result}"`);
return `Successfully created index named "${result}"`; // :remove:
```

In the test file, you can call the function that executes your code example,
establish what the expected string should be, and perform a match to confirm
that the code executed correctly:

```javascript
const actualReturn = await yourExampleName();
const expectedReturn = 'some output to verify in a test';
expect(actualReturn).toStrictEqual(expectedReturn);
```

#### Verify output from a file

If you are showing the output in the docs, write the output to a file whose
filename matches the example - i.e. `tutorial-output.sh`. Then, read the
contents of the file in the test and verify that the output matches what the
test returns.

```javascript
const result = await runTutorial();
const outputFilepath =
  'aggregation/pipelines/filter/expected-outputs/tutorial.sh';

// Read the content of the expected output
const filepathString = '../examples/' + outputFilepath;
const outputFilePath = path.resolve(__dirname, filepathString);
const rawExpectedOutput = fs.readFileSync(outputFilePath, 'utf8');
```

By default, MongoDB does not guarantee the order of output. If you are not
performing a sort operation, use the logic below to verify unordered output.
If you are using a sort operation in your code, use the logic below to verify
ordered output.

##### Verify ordered output

If you expect the output to be in a specific order, as when you perform a sort
in your code example, expect an exact match:

```javascript
expect(rawExpectedOutput).toStrictEqual(result);
```

##### Verify unordered output

If you expect the output to be in a random order, as when you are not performing
a sort operation, use the provided helper function to confirm that every element
of the output is present in your output file.

Import the helper function at the top of the test file:

```javascript
import unorderedArrayOutputMatches from '../../../utils/outputMatchesExampleOutput.js';
```

And then use this function to verify the output:

```javascript
const arraysMatch = unorderedArrayOutputMatches(outputFilepath, result);
expect(arraysMatch).toBeTruthy();
```

The function returns `true` if all the elements are present, or `false` if
they're not.

## To run the tests locally

### Create an Atlas cluster

To run these tests locally, you need a local MongoDB deploy or an Atlas cluster.
Save the connection string for use in the next step. If needed, see
[here](https://www.mongodb.com/docs/atlas/cli/current/atlas-cli-deploy-local/)
for how to create a local deployment.

### Create a .env file

Create a file named `.env` at the root of the `/javascript/driver` directory.
Add your connection string as an environment value named `CONNECTION_STRING`:

```
CONNECTION_STRING="<your-connection-string>"
```

Replace the `<your-connection-string>` placeholder with the connection
string from the Atlas cluster or local deployment you created in the prior step.

### Run All Tests from the command line

From the `/javascript/driver` directory, run:

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

### Run Test Suites from the command line

You can run all the tests in a given test suite (file).

From the `/javascript/driver` directory, run:

```sh
npm test -- -t '<text string from the 'describe()' block you want to run>'
```

### Run Individual Tests from the command line

You can run a single test within a given test suite (file).

From the `/javascript/driver` directory, run:

```sh
npm test -- -t '<text string from the 'it()' block you want to run>'
```

## To run the tests in CI

A GitHub workflow runs these tests in CI automatically when you change any
files in the `examples` directory:

- `.github/workflows/node-driver-examples-test-in-docker.yml`

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
See an example in [example-stub.js](examples/example-stub.js).

### Run the snip script

This test suite uses [Bluehawk](https://github.com/mongodb-university/Bluehawk)
to generate code examples from the test files.

If you do not already have Bluehawk, install it with the following command:

```sh
npm install -g bluehawk
```

To generate updated example files, from the `/javascript/driver` directory,
run the snip command:

```sh
npm run snip
```

This command executes the `snip.js` script at the root of the
`/javascript/driver` directory to generate updated example files.

The updated example files output to `content/code-examples/tested/javascript/driver/`.
Subdirectory structure is also automatically transferred. For example, generating
updated example files from `code-example-tests/javascript/driver/aggregation/filter`
automatically outputs to `content/code-examples/tested/javascript/driver/aggregation/filter`.

This script will automatically create the specified output path if it does not
exist.
