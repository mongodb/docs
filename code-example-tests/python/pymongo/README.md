# PyMongo Example Test Suite

This project contains the infrastructure to test and extract PyMongo code examples
for use across MongoDB documentation.

The structure of this Python project is as follows:

- `/examples`: This directory contains example code, marked up for snipping,
  that will be outputted to the external `content/code-examples/tested/python/pymongo`
  directory at the root of the repo when we run the `snip` script.
- `/tests_package`: This directory contains the test infrastructure to actually
  run the tests by invoking the example code. (This directory can't be named
  simply `tests` as this is a protected namespace in Python.)

## Overview

1. [Setup environment](#create-andor-activate-a-python-virtual-environment)
2. [Create a new code example](#to-create-a-new-code-example)
3. [Add a test for a new code example](#to-add-a-test-for-a-new-code-example)
4. Run tests [locally](#to-run-the-tests-locally) or in [CI](#to-run-the-tests-in-ci)
5. [Snip code examples for inclusion in docs](#to-snip-code-examples-for-inclusion-in-docs)

## Create and/or activate a Python Virtual Environment

This test suite requires you to have `Python` installed.

We strongly recommend you use `venv` to manage Python dependencies specific to
this project. If curious, you can view the official documentation
[here](https://docs.python.org/3/library/venv.html).

### First-time virtual environment set up

In the root of the `/pymongo` directory, if you have Python 3.3 or later
installed, you can create a virtual environment with the following command:

```
python3 -m venv ./venv
```

### Every time you work with these examples

Whenever you work with the Python examples, you should start your session by
activating the virtual environment and end your session by deactivating it. This
ensures that the project has access to the relevant dependencies, and that the
dependencies remain scoped to this project.

### At the start of the session

When you want to work with Python examples in this project, run the
following command to activate the virtual environment:

```
source ./venv/bin/activate
```

Among other things, this creates a shell script called `deactivate` that you
can run when you're ready to exit the virtual environment.

### While working with examples

Run the test files in the terminal session where you have activated the `venv`
to ensure your project has access to the relevant dependencies. If you have
dependency issues, ensure you have correctly activated the `venv`.

### At the end of the session

When you want to exit the virtual environment, in the same terminal where you
activated the virtual environment, run the following command:

```
deactivate
```

If you have other terminal sessions already open when you activate the virtual
environment, these other sessions may not have access to the `deactivate`
script.

You must repeat the activation process any time you want to work with Python examples
in this project.

### Install the dependencies

Run the following command in your virtual environment to install the required
dependencies:

```
pip install -r requirements.txt
```

## To create a new code example

1. Create a code example file
2. Create an output file (optional)
3. Check formatting
4. Add a test - refer to the instructions below for testing
5. Run snip.js to move the tested code to a docs directory
6. Use the snipped code example in a literalinclude or io-code-block in your docs set

If you're not comfortable adding a test, create this as an untested code example
in your docs project's `source/code-examples` directory. Then, file a DOCSP
ticket with the component set to DevDocs to request the DevDocs team move the
file into this test project and add a test.

### Create a code example file

Create a new file in the `/examples` directory. Organize these examples to group
related concepts - i.e. `aggregation/pipelines` or `crud/insert`. With the goal
of single-sourcing code examples across different docs projects, avoid matching
a specific docs project's page structure and instead group code examples by
related concept or topic for easy reuse.

Refer to `examples/example_stub.py` for a template you can copy/paste
to start your own example.

### Create an output file (optional)

If the output from the code example will be shown in the docs, create a file
to store the output alongside the example. For example:

- `aggregation/pipelines/tutorial.py`
- `aggregation/pipelines/tutorial-output.sh`

### Check formatting with Black

This project uses [Black](https://github.com/psf/black) for Python code formatting.

For consistency, code example formatting is enforced automatically by a workflow that
runs Black on every change in the `/examples` directory. You can also fix formatting
locally by running Pylint from the command line.

```
black ./examples/
```

## To add a test for a new code example

To add a test for a new code example:

1. Create a new test function (optionally, in a new test file)
2. Define logic to verify the output matches expectations
3. Run the tests to confirm everything works

### Create a new test case

This test suite uses the [unittest](https://docs.python.org/3/library/unittest.html)
testing framework to verify that our code examples compile, run, and produce
the expected output when executed.

Each test file contains a class that groups together related tests. You can
execute many individual test cases, which are each contained within an test
function. Example:

```py
def test_filter_tutorial(self):
  # testing logic here
```

#### Add a test case to an existing file

Add an import to the top of the file, importing the new code example you created.
It should look similar to:

```py
import examples.topic.subtopic.your_example_file as your_example_file
```

After the last test function and before the `tearDownClass(cls)` function, create
a new test function similar to:

```py
def test_query_tutorial(self):
  print("----------description of the concept that this test function is testing----------")
  # add validation
  print("----------Test complete----------")
```

In the test case:

1. Call the function that runs your example
2. Capture the output to a variable
3. Verify that the output from running your example matches what you expect

Refer to the [Define logic to verify the output](#define-logic-to-verify-the-output)
section of this README for examples of different ways you can perform this verification.

#### Create a new test file

If there is no test file that relates to your code example's topic, create a
new test file. The naming convention is `test_your_example_topic.py`. For an
example you can copy/paste to stub out your own test case, refer to
`tests_package/test_example_stub.py`.

You can nest these test files as deeply as needed to make them easy to find
and organize. Within each new directory, you must create an empty `__init__.py`
file to make tests discoverable.

Inside the test file, create a new test function, similar to:

```py
def test_query_tutorial(self):
  print("----------description of the concept that this test function is testing----------")
  # add validation
  print("----------Test complete----------")
```

##### Set up and tear down test files and individual tests

You can define functions to run once per test file, or once before every test case
in a test file.

To set up once for the file, such as setting the `CONNECTION_STRING` variable
and connecting to the client, add a setUpClass function:

```py
@classmethod
  def setUpClass(cls):
    load_dotenv()
    TestTutorialApp.CONNECTION_STRING = os.getenv("CONNECTION_STRING")

    # fast fail
        if TestTutorialApp.CONNECTION_STRING is None:
            raise Exception("Could not retrieve CONNECTION_STRING - make sure you have created the .env file at the root of the PyMongo directory and the variable is correctly named as CONNECTION_STRING.")
        try:
            TestTutorialApp.client = MongoClient(TestTutorialApp.CONNECTION_STRING)
        except:
            raise Exception("CONNECTION_STRING invalid - make sure your connection string in your .env file matches the one for your MongoDB deployment.")
```

To set up for every test case, such as loading fresh test data, add a
setUp function:

```py
def setUp(self):
  # drop the db first to clear it, or drop it in cleanup
  TestTutorialApp.client.drop_database("some_db")
  db = TestTutorialApp.client["some_db"]
  coll = db["some_coll"]
  coll.insert_many(sample_data)
```

##### Make sure to update naming

If you copied `test_example_stub.py`, make sure to do the following updates:
- Update the import at the top of the file with your code example name instead of
   `examples.example_stub`
- Update the class name `class TestExampleStub()` to match the test file name
- In the `setUp()` function, replace the `"db_name"` string with the database name
   the example code uses. This ensures the right database is being
   dropped between tests.

#### Writing tests that use sample data

If your code examples require MongoDB sample data, import the sample data utility:

```python
from utils.sample_data import requires_sample_data
```

Use the `@requires_sample_data()` decorator to require one or more databases or
collections for test execution. Tests automatically skip when required sample
databases are not available.

```python
class TestMovieQueries(unittest.TestCase):

  @requires_sample_data("sample_mflix")
  def test_find_movies(self):
      # This test will be skipped if sample_mflix database is not available
      # Your test implementation here
      pass

  @requires_sample_data("sample_mflix", collections=["movies", "theaters"])
  def test_specific_collections(self):
      # This test requires specific collections to be present
      # Your test implementation here
      pass

  @requires_sample_data(["sample_mflix", "sample_restaurants"])
  def test_multiple_databases(self):
      # This test requires multiple sample databases
      # Your test implementation here
      pass
```

### Define logic to verify the output

You can verify the output in a few different ways:

1. Return a simple string from your example function, and use a strict match
   to confirm it matches expectations.
2. Read expected output from a file, such as when we are showing the output
   in the docs, and and compare it to what the code returns.

#### Verify a simple string match

Some code examples might return a simple string. For example:

```py
print(f"Successfully created index named {result}")
return f"Successfully created index named {result}" # :remove:
```

In the test file, you can call the function that executes your code example,
establish what the expected string should be, and perform a match to confirm
that the code executed correctly:

```py
expected_return = "Successfully created index named vector_index"
actual_return = example_stub.example(TestExampleStub.CONNECTION_STRING)
self.assertEqual(expected_return, actual_return)
```

#### Verify output from a file

If you are showing the output in the docs, write the output to a file whose
filename matches the example - i.e. `tutorial-output.sh`. Then, read the
contents of the file in the test and verify that the output matches what the
test returns.

First, import the API from the comparison library:

```py
from utils.comparison import Expect
```

Then, validate the actual output against the output we expect based on the
file:

```py
# Run the example
actual_output = example_stub.example(TestExampleStub.CONNECTION_STRING)

# Use the comparison library to validate that the output matches
output_filepath = 'examples/aggregation/pipelines/tutorial.sh'

# This reads the content of the file at the filepath and compares against actual output
Expect.that(actual_output).should_match(output_filepath)
```

##### Use options to specify comparison behaviors

Choose the appropriate options based on your output characteristics:

##### Verify ordered output

Default comparison is unordered. For output that must be in a specific order
(e.g., when using sort operations):

```py
Expect.that(actual_output).with_ordered_sort().should_match(output_filepath)
```

##### Handle variable field values

When your output contains fields that will have different values between test runs
(such as ObjectIds, timestamps, UUIDs, or other auto-generated values), ignore
specific fields during comparison:

```py
Expect.that(actual_output).with_ignored_fields("_id", "timestamp").should_match(output_filepath)
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
`{_id: ...}`
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

##### Complete `Expect` reference

The `Expect` class supports these methods:

- `that(actual: Any) -> Expect`: Create a new `Expect` instance for fluent API usage.
- `with_ignored_fields(*fields: str) -> Expect`: Configure comparison to ignore specific field names.
- `with_ordered_sort() -> Expect`: Configure comparison to require arrays in exact order.
- `with_unordered_sort() -> Expect`: Configure comparison to allow arrays in any order (default behavior).
- `should_match(expected: Any) -> None`: Perform the comparison and raise `AssertionError` if it fails.

## To run the tests locally

### Create a MongoDB deployment

To run these tests locally, you need a local MongoDB deploy or an Atlas cluster.
Save the connection string for use in the next step. If needed, see
[here](https://www.mongodb.com/docs/atlas/cli/current/atlas-cli-deploy-local/)
for how to create a local deployment.

### Load sample data

Some of the tests in this project use the MongoDB sample data. The test suite
automatically detects whether sample data is available and skips tests that
require missing datasets, providing clear feedback about what's available.

#### Automatic sample data detection

The test suite includes built-in sample data detection that:

- **Automatically skips tests** when required sample datasets are not available
- **Shows a status summary** at the start of test runs indicating available databases
- **Provides concise warnings** about which specific tests are being skipped
- **Caches detection results** to avoid repeated database queries during test runs
- **Works seamlessly** - no special commands or scripts needed

When you run tests, you'll see a status summary like:

```
📊 Sample Data Status: 3 database(s) available
   Found: sample_mflix, sample_restaurants, sample_analytics

⚠️  Skipping "Advanced Movie Analysis" - Missing: sample_training
```

#### Atlas

To learn how to load sample data in Atlas, refer to this docs page:

- [Atlas](https://www.mongodb.com/docs/atlas/sample-data/)

#### Local deployment

If you're running MongoDB locally in a docker container:

1. Install the MongoDB Database Tools.

   You must install the MongoDB Command Line Database Tools to access the
   `mongorestore` command, which you'll use to load the sample data. Refer to
   the Database Tools [Installation](https://www.mongodb.com/docs/database-tools/installation/)
   docs for details.

2. Download the sample database.

   Run the following command in your terminal to download the sample data:

   ```shell
   curl  https://atlas-education.s3.amazonaws.com/sampledata.archive -o sampledata.archive
   ```

3. Load the sample data.

   Run the following command in your terminal to load the data into your
   deployment, replacing `<port-number>` with the port where you're hosting the
   deployment:

   ```shell
   mongorestore --archive=sampledata.archive --port=<port-number>
   ```

### Create a .env file

Create a file named '.env' at the root of the '/python' directory within this
project. Add your Atlas or local deployment connection string as an environment
value named `CONNECTION_STRING`:

```
CONNECTION_STRING="<your-connection-string>"
```

Replace the `<your-connection-string>` placeholder with the connection
string from the deployment you created in the prior step.

### Run All Tests from the command line

From the root of the `/python/pymongo` directory, run:

```
python3 -m unittest discover tests_package
```

In this command, `tests_package` is the name of the directory that contains the tests.

### Run Individual Tests from the command line

```
python3 -m unittest tests_package/FILENAME -k TEST_METHOD_NAME
```

Make sure to include the full path to the file when replacing `FILENAME`.

For example:

```
python3 -m unittest tests_package/aggregation/pipelines/test_tutorial_app.py -k test_app_functionality
```

For more information about the unittest framework, such as information about
skipping tests, expected failures, or other advanced functionality, refer to the
[docs](https://docs.python.org/3/library/unittest.html).

If any bugs occur or a test fails, investigate the error messages or add
print debugging. If further assistance is needed, contact the DevDocs team.

## To run the tests in CI

A GitHub workflow runs these tests in CI automatically when you change any
files in the `examples` directory:

- `.github/workflows/pymongo-driver-examples-test-in-docker.yml`

GitHub reports the results as passing or failing checks on any PR that changes
an example. To get details about the specific test failure, expand the `run tests`
step in the GitHub workflow log.

If changing an example causes its test to fail, this should be considered
blocking to merge the example.

If changing an example causes an _unrelated_ test to fail, create a Jira ticket
to fix the unrelated test, but this should not block merging an example update.

## To snip code examples for inclusion in docs

### Add markup to the code example files (optional)

You can use this markup to replace content that you do not want to show verbatim
to users, rename variables, or remove test functionality from the outputted
code examples. You can find guides and reference documentation for this markup
tool [here](https://mongodb-university.github.io/Bluehawk/).

Inside your testable code example, add the comment `# :snippet-start: <SNIPPET-NAME>`
where you want to start the snip, and add `# :snippet-end:` to end the snip.
See an example in [example_stub.py](examples/example_stub.py).

### Run the snip script (required)

This test suite uses [Bluehawk](https://github.com/mongodb-university/Bluehawk)
to snip or copy code examples from the test files.

If you do not already have Bluehawk, install it with the following command:

```
npm install -g bluehawk
```

Run snip.js at the root of the `/python/pymongo` directory to copy the
tested example files out to the `content` directory:

```
node snip.js
```

The updated example files output to `content/code-examples/tested/python/pymongo/`.
Subdirectory structure is also automatically transferred. For example, generating
updated example files from `code-example-tests/python/pymongo/aggregation/pipelines`
automatically outputs to `content/code-examples/tested/python/pymongo/aggregation/pipelines`.

This script will automatically create the specified output path if it does not
exist.
