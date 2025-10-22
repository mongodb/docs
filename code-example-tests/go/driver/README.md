# Go Driver - Example Test Suite

This project contains the infrastructure to test and extract Go Driver code
examples for use across MongoDB documentation.

The structure of this Go project is as follows:

- `/examples`: This directory contains example code, marked up with Bluehawk,
  that will be outputted to the external `/content/code-examples/tested/go/driver`
  directory when we run the `snip` script.
- `/tests`: This directory contains the test infrastructure to actually
  run the tests by invoking the example code.
- `/utils`: This directory contains utilities to compare actual output with
  an expected output file, gracefully handle sample data in testing, and
  simplify environment file access.

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

This test suite requires you to have `Go` v1.24.5 or newer installed. If you
do not yet have Go installed, refer to
[the Go installation page](https://golang.org/doc/install) for details.
We recommend using a Go version manager like [g](https://github.com/stefanmaric/g)
to manage your Go versions.

From the root of the `/go/driver` directory, run the following command
to install dependencies:

```sh
go mod download
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

Example files should be Go source files (`.go`) that implement functions which:

- Connect to MongoDB using environment variables
- Execute the desired operations
- Return results for comparison with expected output

### Create an output file

If the output from the code example will be shown in the docs, create a file
to store the output alongside the example. For example:

- `aggregation/pipelines/filter/run-pipeline.go`
- `aggregation/pipelines/filter/output.txt`

### Format the code example files

This project uses Go's built-in formatting tools to enforce style formatting
for the files in the `examples` directory. You can check and fix formatting
manually on your machine before making your PR:

#### Run Go formatting from the command line

To automatically fix any formatting issues, run:

```sh
go fmt ./...
```

#### Configure VS Code to automatically apply formatting on save

Go formatting works with popular editors such as VS Code through extensions. To
format automatically when you save a file in VS Code:

1. Install the Go plugin: [Go for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=golang.Go).
2. Open your settings and enable `"editor.formatOnSave"`:

   ```json
   "editor.formatOnSave": true
   ```

3. Set Go as the default formatter:

   ```json
   "[go]": {
     "editor.defaultFormatter": "golang.Go"
   }
   ```

You can find similar extensions for other editors and IDEs like Sublime Text,
Atom, or IntelliJ.

## To add a test for a new code example

This section provides step-by-step instructions for adding tests to verify that
your Go code examples work correctly.

### Step 1: Determine where to add your test

**If you're adding to an existing category**:

- Find the existing test file in `/tests/` that matches your example category
- Skip to [Step 3: Add your test to an existing file](#step-3-add-your-test-to-an-existing-file)

**If you're creating a new test category**:

- Continue to Step 2 to create a new test file

### Step 2: Create a new test file (for new categories)

Create a new test file following this pattern:

**File location**: `/tests/your-category/your-subcategory/your-topic_test.go`

**Example**: If you're testing text search examples, create:
`/tests/search/text/tutorials_test.go`

Copy this template and customize it:

```go
package your_subcategory_name  // e.g., "text" for text search

import (
	"context"
	"testing"

	"driver-examples/utils"
	"driver-examples/utils/compare"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

// setupTestDB creates a MongoDB client and returns cleanup function
func setupTestDB(t *testing.T) (*mongo.Client, func()) {
	t.Helper()
	ctx := context.Background()

	// Get connection string using utility
	uri := utils.GetConnectionString()
	if uri == "" {
		t.Fatal("set your 'CONNECTION_STRING' environment variable")
	}

	clientOptions := options.Client().ApplyURI(uri)
	client, err := mongo.Connect(clientOptions)
	if err != nil {
		t.Fatalf("failed to connect to the server: %v", err)
	}

	// Return cleanup function - customize the database name as needed
	cleanup := func() {
		db := client.Database("your_test_db_name") // Change this!
		if err := db.Drop(ctx); err != nil {
			t.Logf("failed to drop database: %v", err)
		}

		if err := client.Disconnect(ctx); err != nil {
			t.Logf("failed to disconnect client: %v", err)
		}
	}

	return client, cleanup
}

// Main test function - customize the name and description
func TestYourFeatureName(t *testing.T) {  // e.g., TestTextSearch
	tests := []struct {
		name     string
		testFunc func(t *testing.T)
	}{
		// Add your test cases here - see Step 3
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			_, cleanup := setupTestDB(t)
			defer cleanup()
			tt.testFunc(t)
		})
	}
}

// Individual test functions go here - see Step 3 for examples
```

**Important customizations for your template:**
1. **Package name**: Change `your_subcategory_name` to match your directory (e.g., `text`, `pipelines`, `insert`)
2. **Database name**: Change `your_test_db_name` to something specific to your tests (e.g., `text_search_db`, `crud_test_db`)
3. **Test function name**: Change `TestYourFeatureName` to describe what you're testing (e.g., `TestTextSearch`, `TestCRUDOperations`)

### Step 3: Add your test to an existing file

Whether you created a new file or found an existing one, follow these steps:

#### 3.1: Add the import for your example package

At the top of the file, add an import for your example code:

```go
import (
    // ... existing imports ...
    "driver-examples/examples/your/example/path"  // Add this line
    "driver-examples/utils/compare"           // For comparison functions
)
```

**Real example**: If your example is at `examples/search/text/basic-search.go`:
```go
import (
    // ... existing imports ...
    "driver-examples/examples/search/text"
    "driver-examples/utils/compare"
)
```

#### 3.2: Add your test case to the tests slice

Find the `tests := []struct{...}` section and add your test:

```go
tests := []struct {
    name     string
    testFunc func(t *testing.T)
}{
    {"ExistingTest", testExistingFunction},
    {"YourNewTest", testYourNewFunction},  // Add this line
}
```

For example:

```go
{"BasicTextSearch", testBasicTextSearch},
{"CreateIndex", testCreateIndex},
{"FindDocuments", testFindDocuments},
```

#### 3.3: Create your individual test function

Add this function at the bottom of the file:

```go
func testYourFunctionName(t *testing.T) {
    t.Helper()

    // Step 1: Call your example function
    result := yourpackage.YourExampleFunction()

    // Step 2: Specify the expected output file path
    expectedOutputFilepath := "examples/your/path/to/output.txt"

    // Step 3: Compare results
    compare.ExpectThat(t, result).ShouldMatch(expectedOutputFilepath)
}
```

### Step 4: Complete examples

Here are two complete examples to show the patterns:

#### Example A: Adding to existing tests for a topic area

**Scenario**: You created `examples/aggregation/pipelines/sort/run-pipeline.go` and want to test it.

**Action**: Edit `tests/aggregation/pipelines/tutorials_test.go`:

```go
// 1. Add import (if not already present)
import (
    "driver-examples/examples/aggregation/pipelines/sort"  // Add this
    "driver-examples/utils/compare"                     // For comparison functions
)

// 2. Add to tests slice
tests := []struct {
    name     string
    testFunc func(t *testing.T)
}{
    {"FilterTutorial", testFilterTutorial},
    {"SortTutorial", testSortTutorial},     // Add this line
}

// 3. Add test function at bottom of file
func testSortTutorial(t *testing.T) {
    t.Helper()

    sort.LoadData()  // If your example has a LoadData function
    result := sort.RunPipeline()
    expectedOutputFilepath := "examples/aggregation/pipelines/sort/output.txt"

    compare.ExpectThat(t, result).ShouldMatch(expectedOutputFilepath)
}
```

#### Example B: Creating new topic area tests

**Scenario**: You created `examples/crud/insert/insert-one.go` and need a new test file.

**Action**: Create `tests/crud/insert/tutorials_test.go`:

```go
package insert

import (
    "context"
    "testing"

    "driver-examples/examples/crud/insert"  // Your example package
    "driver-examples/utils"
    "driver-examples/utils/compare"      // For comparison functions
    "go.mongodb.org/mongo-driver/v2/mongo"
    "go.mongodb.org/mongo-driver/v2/mongo/options"
)

func setupTestDB(t *testing.T) (*mongo.Client, func()) {
    t.Helper()
    ctx := context.Background()

    uri := utils.GetConnectionString()
    if uri == "" {
        t.Fatal("set your 'CONNECTION_STRING' environment variable")
    }

    clientOptions := options.Client().ApplyURI(uri)
    client, err := mongo.Connect(clientOptions)
    if err != nil {
        t.Fatalf("failed to connect to the server: %v", err)
    }

    cleanup := func() {
        db := client.Database("crud_test_db")  // Specific to CRUD tests
        if err := db.Drop(ctx); err != nil {
            t.Logf("failed to drop database: %v", err)
        }

        if err := client.Disconnect(ctx); err != nil {
            t.Logf("failed to disconnect client: %v", err)
        }
    }

    return client, cleanup
}

func TestCRUDInsertOperations(t *testing.T) {
    tests := []struct {
        name     string
        testFunc func(t *testing.T)
    }{
        {"InsertOne", testInsertOne},
        // You can add more insert tests here later:
        // {"InsertMany", testInsertMany},
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            _, cleanup := setupTestDB(t)
            defer cleanup()
            tt.testFunc(t)
        })
    }
}

func testInsertOne(t *testing.T) {
    t.Helper()

    result := insert.InsertOneExample()  // Your function name
    expectedOutputFilepath := "examples/crud/insert/insert-one-output.txt"

    compare.ExpectThat(t, result).ShouldMatch(expectedOutputFilepath)
}
```

### Step 5: Test your new tests

Refer to the [run tests](#to-run-the-tests-locally) section below for information
about how to run your new tests. If you're not set up to run the tests locally,
a GitHub workflow will run them automatically on your PR.

### Common troubleshooting

**Import errors**: Make sure your import path matches your directory structure exactly
- ✅ Good: `"drivers-examples/examples/crud/insert"` for `/examples/crud/insert/`
- ❌ Bad: `"crud/insert"` (missing the `drivers-examples/examples` prefix)

**Path errors in output files**: File paths are relative to the Go module root
- ✅ Good: `"drivers-examples/examples/crud/insert/output.txt"`
- ❌ Bad: `"./output.txt"` or `"../output.txt"`

**Test naming**: Go test functions must start with `Test` and test helper functions should be lowercase
- ✅ Good: `TestCRUDOperations` (main test), `testInsertOne` (helper function)
- ❌ Bad: `testCRUDOperations` (won't run as main test)

**File naming**: Go test functions must be in filenames that end with `_test.go`
- ✅ Good: `crud/insert_test.go` for examples in `examples/crud/insert`
- ❌ Bad: `crud/insert-test.go` (uses hyphen `-` instead of underscore `_`)

### Quick reference template

For a quick start, copy and adapt this minimal test:

```go
func testYourExample(t *testing.T) {
    t.Helper()

    result := yourpackage.YourFunction()
    expectedFile := "examples/your/path/output.txt"

    compare.ExpectThat(t, result).ShouldMatch(expectedFile)
}
```

Add this to your tests slice, run the test, and you're done!

#### Writing tests that use sample data

If your code examples require MongoDB sample data (such as the sample_mflix, sample_restaurants, or other standard sample databases), the test suite provides utilities to handle this gracefully:

##### Basic sample data checking

For tests that require a specific sample database:

```go
func testMovieQuery(t *testing.T) {
    t.Helper()

    // Skip test if sample_mflix database is not available
    utils.RequiresSampleData(t, "sample_mflix")

    // Your test implementation using sample data
    result := examples.QueryMoviesFromSampleData()
    expectedFile := "examples/movie-query-output.txt"

    compare.ExpectThat(t, result).ShouldMatch(expectedFile)
}
```

##### Specific collection requirements

For tests that need specific collections from sample databases:

```go
func testRestaurantAndTheaterQuery(t *testing.T) {
    t.Helper()

    // Check for specific collections, skip if not available
    requiredCollections := map[string][]string{
        "sample_mflix": {"movies", "theaters"},
        "sample_restaurants": {"restaurants"},
    }
    utils.RequiresSampleDataWithCollections(t, requiredCollections)

    result := examples.QueryRestaurantsNearTheaters()
    expectedFile := "examples/restaurant-theater-query-output.txt"

    compare.ExpectThat(t, result).ShouldMatch(expectedFile)
}
```

##### Alternative: Using the subtest helper

For organizing tests with sample data requirements:

```go
func TestSampleDataExamples(t *testing.T) {
    tests := []struct {
        name           string
        testFunc       func(t *testing.T)
        sampleDatabase string
    }{
        {"MovieQuery", testMovieQuery, "sample_mflix"},
        {"RestaurantQuery", testRestaurantQuery, "sample_restaurants"},
    }

    for _, tt := range tests {
        utils.WithSampleDataTest(t, tt.name, func(t *testing.T) {
            _, cleanup := setupTestDB(t)
            defer cleanup()
            tt.testFunc(t)
        }, tt.sampleDatabase)
    }
}
```

Common sample databases include:
- `sample_mflix`: Movies and theaters data
- `sample_restaurants`: Restaurant location data
- `sample_supplies`: Supply chain data
- `sample_training`: Training and educational data
- `sample_weatherdata`: Weather information data
- `sample_airbnb`: Airbnb listing data

### Define logic to verify the output

You can verify the output using the `compare.ExpectThat` function
from the `driver-examples/utils/compare` package that compares actual code execution results with expected output from
a file.

#### Import the comparison package

Add the comparison import to your test file:

```go
import (
    // ... other imports ...
    "driver-examples/utils/compare"
)
```

#### Verify output from a file

If you are showing the output in the docs, write the output to a file whose
filename matches the example - i.e. `output.txt`. Then, use the
`compare.ExpectThat` function to verify that the output matches what the test returns.

The basic usage is:

```go
result := yourPackage.YourFunction()
expectedOutputFilepath := "examples/your/package/output.txt"

compare.ExpectThat(t, result).ShouldMatch(expectedOutputFilepath)
```

The `ExpectThat` function automatically detects content types and works with:
- Slices of BSON.D documents
- Slices of struct types
- Individual values
- File paths

For tests that use MongoDB sample data, see the [sample data section](#writing-tests-that-use-sample-data)
for information about graceful handling when datasets aren't available.

##### Verify unordered output (default behavior)

For output that can be in any order (most common case):

```go
compare.ExpectThat(t, result).ShouldMatch(expectedOutputFilepath)
```

Or explicitly specify unordered comparison:

```go
compare.ExpectThat(t, result).
    WithUnorderedSort().
    ShouldMatch(expectedOutputFilepath)
```

##### Verify ordered output

For output that must be in a specific order (e.g., when using sort operations):

```go
compare.ExpectThat(t, result).
    WithOrderedSort().
    ShouldMatch(expectedOutputFilepath)
```

##### Handle variable field values

When your output contains fields that will have different values between test runs
(such as ObjectIds, timestamps, UUIDs, or other auto-generated values), ignore
specific fields during comparison:

```go
compare.ExpectThat(t, result).
    WithIgnoredFields("_id", "timestamp", "userId", "uuid", "sessionId").
    ShouldMatch(expectedOutputFilepath)
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
  "plot": "A young man is accidentally sent 30 years into the past..."
}
```

This matches the actual output of:

```txt
{
  "plot": "A young man is accidentally sent 30 years into the past in a time-traveling DeLorean invented by his close friend, the maverick scientist Doc Brown."
}
```

###### Omit unimportant values for keys

If it's not important to show the value or type for a given key at all,
replace the value with an ellipsis in the expected output file.

```txt
{"_id": "..."}
```

Matches any value for the key `_id` in the actual output.

###### Omit any number of keys and values entirely

If actual output contains many keys and values that are not necessary to show
to illustrate an example, add an ellipsis as a standalone line in your
expected output file:

```txt
{
  "full_name": "Carmen Sandiego"
}
...
```

Matches actual output that contains any number of additional keys and values
beyond the `full_name` field.

##### Complete options reference

The `ExpectThat` API supports these methods:

- **`WithUnorderedSort()`** - Explicitly specify unordered comparison (default
  behavior). Use when you are not sorting the result of a CRUD or
  aggregation pipeline, to match MongoDB default unsorted behavior.
- **`WithOrderedSort()`** - Require elements to be in the same order. Use when
  you are testing a CRUD or aggregation pipeline example where the order
  matters, such as when adding an explicit sort operator or stage.
- **`WithIgnoredFields(fields ...string)`** - Ignore specific field values
  during comparison. Use for dynamic values that may change between test runs,
  such as timestamps or ObjectId values.

These can be chained together:

```go
compare.ExpectThat(t, result).
    WithOrderedSort().
    WithIgnoredFields("_id", "timestamp").
    ShouldMatch(expectedOutputFilepath)
```

## To run the tests locally

### Create an Atlas cluster

To run these tests locally, you need a local MongoDB deploy or an Atlas cluster.
Save the connection string for use in the next step. If needed, see
[here](https://www.mongodb.com/docs/atlas/cli/current/atlas-cli-deploy-local/)
for how to create a local deployment.

### Load sample data

Some of the tests in this project use the MongoDB sample data. Tests that
require missing sample datasets will be handled gracefully by the comparison
utility.

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

Create a file named `.env` at the root of the `/go/driver` directory.
Add the following environment variables:

```
CONNECTION_STRING="<your-connection-string>"
```

Replace the `<your-connection-string>` placeholder with the connection
string from the Atlas cluster or local deployment you created in the prior step.

### Run All Tests from the command line

From the `/go/driver/tests` directory, run:

```sh
go test -v -p 1 ./...
```

This command runs all tests in the current module and its subdirectories.

### Run Test Packages from the command line

You can run all the tests in a given package.

From the `/go/driver/tests` directory, run:

```sh
go test -v -p 1 ./aggregation/pipelines
```

### Run Individual Tests from the command line

You can run a single test function within a given package.

From the `/go/driver/tests` directory, run:

```sh
go test -v ./... -run TestExampleOperations/YourExampleName
```

## To run the tests in CI

A GitHub workflow runs these tests in CI automatically when you change any
files in the `examples` directory:

- `.github/workflows/go-driver-examples-test-in-docker.yml`

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
You can find guides and reference documentation for this markup syntax
[here](https://mongodb-university.github.io/Bluehawk/).

Inside your testable code example, add the comment `// :snippet-start: <SNIPPET-NAME>`
where you want to start the snippet, and add `// :snippet-end:` to end the snippet.
See examples in the existing code files in the `/examples` directory.

### Run the snip script

This test suite uses [Bluehawk](https://github.com/mongodb-university/Bluehawk)
to generate code examples from the test files.

If you do not already have Bluehawk, install it with the following command:

```sh
npm install -g bluehawk
```

To generate updated example files, from the `/go/driver` directory,
run the snip command:

```sh
node snip.js
```

This command generates updated example files from the `examples` directory.

The updated example files output to `content/code-examples/tested/go/driver/`.
Subdirectory structure is also automatically transferred. For example, generating
updated example files from `code-example-tests/go/driver/examples/aggregation/filter`
automatically outputs to `content/code-examples/tested/go/driver/aggregation/filter`.

This script will automatically create the specified output path if it does not
exist.
