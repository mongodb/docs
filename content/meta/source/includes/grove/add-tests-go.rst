The Grove Go Driver test suite uses Go's built-in testing framework to verify
that our code examples compile, run, and produce the expected output when
executed.

We pair this with a comparison library and a set of utilities to help us
write tests for our code examples.

How to Create a Test File
-------------------------

.. procedure::

   .. step:: Find or create a test file.

      Test files are located in the ``code-example-tests/go/driver/tests/``
      directory. From within that directory, the test suite is organized by
      category. For example, if you are testing a code example an aggregation
      pipeline, you will find or create test files in the ``aggregate/pipelines/``
      subdirectory. Test files can contain more than one test, so we group
      related tests for similar concepts together.

      Find the test file for your category or create a new one if necessary.
      The test file should be named ``<category>_test.go``. For example, if
      you are testing a code example for the ``aggregation/pipelines/join_one_to_one``
      tutorial, the test file might named something like
      ``aggregation/pipelines/tutorials_test.go``. Within that file, you will
      have one or more test methods that test specific code examples.

      Go's test framework automatically discovers test files and methods that
      match a specific naming convention. To be discovered, test files must be
      named ``*_test.go`` and test methods must be named ``Test*``.

   .. step:: Import the code example you want to test.

      Add an import statement at the top of your test file to import the
      code example you want to test, and any required setup code. For example,
      if you are testing the ``aggregate/pipelines/join_one_to_one`` tutorial,
      you would import the
      ``driver-examples/examples/aggregation/pipelines/join_one_to_one`` package.

      Also add imports for the comparison utility, testing tools, and any
      MongoDB imports needed to set up and clean up your tests. The following
      example imports these packages:

      - ``context``: For managing timeouts and cancellations for MongoDB
        operations.
      - ``driver-examples/examples/aggregation/pipelines/join_one_to_one``: For
        importing the code example you want to test.
      - ``driver-examples/utils``: For reading the connection string from the
        environment.
      - ``driver-examples/utils/compare``: For comparing the actual output from
        your example with the expected output.
      - ``testing``: For working with Go's built-in testing framework.
      - ``go.mongodb.org/mongo-driver/v2/mongo``: For working with MongoDB
        collections and databases.
      - ``go.mongodb.org/mongo-driver/v2/mongo/options``: For working with
        MongoDB options, such as setting the connection string URI to connect
        to the database.

      .. code-block:: go

         package pipelines

         import (
            "context"
            "driver-examples/examples/aggregation/pipelines/join_one_to_one"
            "driver-examples/utils"
            "driver-examples/utils/compare"
            "testing"

            "go.mongodb.org/mongo-driver/v2/mongo"
            "go.mongodb.org/mongo-driver/v2/mongo/options"
         )

   .. step:: Add a test method to the file.

      Add a test method to call the functions to perform the tests. In Go, to
      be discovered as a test, a method must start with the word ``Test`` and
      take a ``*testing.T`` parameter.

      To reuse test setup across tests, you can use Go's subtest feature.
      The following example shows a test method for the ``aggregate/pipelines/``
      tutorial that maps each test to a function that performs the test.
      Every test in this function shares the same setup and teardown logic.

      .. code-block:: go

         func TestAggregationPipelines(t *testing.T) {
            tests := []struct {
               name     string
               testFunc func(t *testing.T)
            }{
               // If adding a new test to this file, add a new line here
               // mapping the test name to the test function:
               {"FilterTutorial", testFilterTutorial},
               {"UnwindTutorial", testUnwindTutorial},
               {"JoinOneToOneTutorial", testJoinOneToOneTutorial},
            }

            for _, tt := range tests {
               t.Run(tt.name, func(t *testing.T) {
                  // Setup for each subtest (equivalent to beforeEach)
                  _, cleanup := setupTestDB(t)
                  defer cleanup() // Cleanup for each subtest (equivalent to afterEach)

                  // Run the actual test
                  tt.testFunc(t)
               })
            }
         }

      Then, you can define individual test functions for each test case. For
      example, the following function tests the ``join_one_to_one`` tutorial.
      The function name is camel-cased instead of pascal-cased because we are
      not exporting this function outside of the test file.

      .. code-block:: go

         func testJoinOneToOneTutorial(t *testing.T) {
            t.Helper() // Mark this as a helper function for better error reporting

            // Test logic here...
         }

   .. step:: Call the code example function that you want to test.

      Within each test function, call the function in your example file that you
      want to test. Then, add a ``compare.ExpectThat()`` call to compare the
      actual output from your example with the expected output. The
      ``ExpectThat()`` function takes in the ``*testing.T`` parameter and the
      actual output from your example and compares it to the expected
      output you provide in the ``ShouldMatch()`` method.

      .. code-block:: go
         :emphasize-lines: 5-7, 10

         func testJoinOneToOneTutorial(t *testing.T) {
            t.Helper() // Mark this as a helper function for better error reporting

            // Run your test logic
            join_one_to_one.LoadData()
            result := join_one_to_one.RunPipeline()
            expectedOutputFilepath := "examples/aggregation/pipelines/join_one_to_one/output.txt"

            // Compare the actual results with expected output using the comparison utility
            compare.ExpectThat(t, result).ShouldMatch(expectedOutputFilepath)
         }

      .. tip:: One Expect call per Test Method

         If you find that your test function contains multiple ``Expect``
         statements, it is an indication that you should split the test into
         multiple test cases.

      If the results don't match, the ``ShouldMatch()`` method throws an error
      and your test will fail. The error includes information about why the
      comparison failed, including the location in the output where the
      failure occurred.

      .. tip:: Some tests may not work with exact matching

         Some scenarios, such as Vector Search queries, do not have stable output.
         In these cases, you can use the ``ShouldResemble()`` method instead of
         ``ShouldMatch()``. For more details, refer to the
         :ref:`go-expect-similar-output` section on this page.

   .. step:: Add setup and tear down logic.

      You can add setup and tear down logic to your test file to execute
      code before or after each test case, or before and after all tests are run.
      This is useful for loading sample data or cleaning up after a write operation.

      The following example shows how to add setup and tear down logic to a
      test file. In this case, we want to drop the database after *each* test
      to avoid cross-contaminating the tests.

      .. code-block:: go

         // setupTestDB creates a MongoDB client and returns a cleanup function
         func setupTestDB(t *testing.T) (*mongo.Client, func()) {
            t.Helper() // Mark this as a helper function for better error reporting
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

            // Return cleanup function that will be called with defer
            cleanup := func() {
               // Drop the test database
               db := client.Database("agg_tutorials_db")
               if err := db.Drop(ctx); err != nil {
                  t.Logf("failed to drop database: %v", err)
               }

               // Close the client connection
               if err := client.Disconnect(ctx); err != nil {
                  t.Logf("failed to disconnect client: %v", err)
               }
            }

            return client, cleanup
         }

Compare Expected and Actual Output
----------------------------------

The ``ExpectThat()`` function takes the following arguments:

- ``testing.T``: The testing object for the current test.
- ``actualOutput``: The actual output from your example code.

To perform the comparison, use one of the following methods:

- ``ShouldMatch()``: Use for most cases. The actual output must match the expected output.
- ``ShouldResemble()``: Use for cases where the output may vary between test runs.

Expect Exact Matches
~~~~~~~~~~~~~~~~~~~~

For most cases, we expect the actual output to match the expected output. In
these cases, use the ``ShouldMatch()`` method.

The ``ShouldMatch()`` function takes the following arguments:

- ``expectedOutput``: The expected output from your example code. This can be a
  file path, or an in-memory object.

  - If you use a file path, the path should start with the ``examples`` directory.
    For example, ``examples/aggregation/pipelines/join_one_to_one/output.txt``.
  - If you use an in-memory object, the object must be of the same type as the
    actual output. For example, if the actual output is a slice of documents,
    the expected output must also be a slice of documents.

You can configure the comparison behavior using the following methods:

- ``WithOrderedSort()``: Compare arrays in exact order.
- ``WithUnorderedSort()``: Compare arrays in any order. This is the default
  behavior.
- ``WithIgnoredFields()``: Ignore specific field values during comparison.

For example, you might use the following options to compare the output of a
pipeline that uses the ``$sort`` stage, where the documents contain ``_id``
and ``createdAt`` fields whose values may change between test runs:

.. code-block:: go

   ExpectThat(output)
       .WithUnorderedSort()
       .WithIgnoredFields("_id", "createdAt")
       .ShouldMatch("examples/aggregation/pipelines/join_one_to_one/output.txt");

.. _go-expect-similar-output:

Expect Similar Output
~~~~~~~~~~~~~~~~~~~~~

Some scenarios, such as Vector Search queries, do not have stable output. In
these cases, you can use the ``ShouldResemble()`` method instead of
``ShouldMatch()``.

The ``ShouldResemble()`` method takes the following arguments:

- ``expectedOutput``: The expected output from your example code. This can be a
  file path, or an in-memory object.

  - If you use a file path, the path should start with the ``examples`` directory.
    For example, ``examples/aggregation/pipelines/join_one_to_one/output.txt``.
  - If you use an in-memory object, the object must be of the same type as the
    actual output. For example, if the actual output is an array of documents,
    the expected output must also be an array of documents.

The ``ShouldResemble()`` method requires you to define a ``Schema`` object to
use with the ``WithSchema()`` method. This object provides details
about the count and structure of the expected output. ``Schema`` has the
following properties:

- ``Count``: Required; the expected number of documents in the result set.
- ``RequiredFields``: Optional; an array of field names that must exist in every document.
- ``FieldValues``: Optional; a dictionary that maps field names to their expected values.

Schema-based comparison supports cases where the elements may have different
values between test runs, such as:

- Vector Search queries, where the order and score of the results may vary.
- Aggregation queries that include a ``$sample`` stage, where the results may vary.
- Geospatial queries where distance calculations may vary slightly.

The following example shows how to use the ``ShouldResemble()`` method to
compare the output of a Vector Search query.

.. code-block:: go

   result := vectorSearch.RunMovieQuery();
   compare.ExpectThat(t, result).
      ShouldResemble(expectedOutputFilepath).
      WithSchema(compare.Schema{
         Count:          5,
         RequiredFields: []string{"_id", "title", "plot", "year"},
         FieldValues:    map[string]interface{}{"year": 2012},
      })

In this example, the schema specifies that the result set should contain 5
documents. Each document must have the ``_id``, ``title``, ``plot``, and
``year`` fields. The ``year`` field must have the value ``2012``, but the other
fields may have different values between test runs.

The ``ShouldResemble()`` method is mutually exclusive with ``ShouldMatch()``.
Additionally, ``ShouldResemble()`` is not compatible with ``WithUnorderedSort()``,
``WithOrderedSort()``, or ``WithIgnoredFields()``.

Communicate Clearly about Results in Documentation
``````````````````````````````````````````````````

When using ``ShouldResemble()``, if you show the output in the documentation,
it is important to let readers know that the output is an example and the actual output
may differ. If a developer runs the example and gets different results, we
do not want the developer to think that the results are incorrect. Set clear
expectations that the results may differ, and consider including information
about why the results vary. For example, if you're showing the output of
a pipeline that includes a ``$sample`` stage, you may include a note similar to:

.. note:: Results of query may vary

   The sampling process selects a subset of the data, so the results may not be
   exactly the same every time you run the query. The documentation shows an
   example of the output, but your results may differ.

Work with MongoDB Sample Data
-----------------------------

If your example requires MongoDB sample data, you can use the
``RequiresSampleData`` utility to mark the test as requiring sample data sets,
and to specify which databases are required. After the ``t.Helper()`` method,
you call ``utils.RequiresSampleData(t, "sample_mflix")``,
which will skip the test if the required sample data is not available. The
sample data utility provides three ways to check for sample data:

- ``utils.RequiresSampleData(t, "sample_mflix")``: Check if a single database
  is available.
- ``utils.RequiresSampleDataWithCollections(t, requiredCollections)``: Check if
  specific collections are available within a database.
- ``utils.WithSampleDataTest(t, name, testFunc, requiredDatabases...)``: Use
  this function to wrap a test function in the subtest pattern.

This is a convenience function so writers don't necessarily need all of
the sample data sets loaded to run the test suite. This tool means that
writers won't see tests that require sample data as failures when they
don't have the sample data loaded; they see them as skipped tests, instead.

.. note::

    The GitHub workflows that run the tests in CI have the sample data
    loaded in their environment, so CI runs all tests that use sample data.

    If you are writing tests that involve the sample data sets, you should
    load the sample data and test locally to confirm your example works.
    This functionality is only provided so other writers don't need to load
    the sample data to run the test suite.

The following code block shows how to use the sample data utility
requiring a single database, multiple databases, and specific collections
within a database.

.. code-block:: go

   // This test requires a single database
   func testMovieQuery(t *testing.T) {
      t.Helper()

      // Skip test if sample_mflix database is not available
      utils.RequiresSampleData(t, "sample_mflix")

      // Your test implementation using sample data
      result := examples.QueryMoviesFromSampleData()
      expectedFile := "examples/movie-query-output.txt"

      compare.ExpectThat(t, result).ShouldMatch(expectedFile)
   }

   // This test requires specific collections within multiple databases
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

You can also use the sample data utility at the test suite level. If you do
this, you can include the name of the required sample database in the test
metadata, and omit the ``utils.RequiresSampleData`` call in each test.

.. code-block:: go
   :emphasize-lines: 7,8,12,16

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

.. _revert-state-csharp:

Revert State with MongoDB Sample Data
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

MongoDB sample data sets are large and take a long time to ``mongorestore``.
Instead of dropping the database after each test, you must manually revert
any changes you make in your example after the test runs. For example, if you
set a field value to a specific value, set it back to its original value after
the test runs. Or if you add a new document, remove it after the test runs.

The following example show a partial method that inserts a document into a collection,
and then later removes the document:

.. code-block:: go

   {
      ...

      // Create a new restaurant document
      doc := Restaurant
        {
            Name: "Mongo's Pizza",
            RestaurantId: "12345",
            Cuisine: "Pizza",
            Address: Address
            {
                Street: "Pizza St",
                ZipCode: "10003"
            }
        }

      // Insert the new document into the restaurants collection
      result, err := coll.InsertOne(ctx, doc)

      ... Run your Expect statement ...

      // Remove the document we just added
      filter := bson.D{{"restaurant_id", "12345"}}
      coll.DeleteOne(ctx, filter)
      ...
   }

In this case, we don't drop the database because we don't want to remove the
all of the sample data. Instead, we only revert any changes we made in this test.

.. important::

   If your test makes multiple changes to the database, be sure to revert
   all of them.

Working with Your Own Data
--------------------------

If your example uses your own data, you can use setup and teardown functions
to:

- Set up your MongoDB client and create any necessary databases before
  you run each test.
- Drop the database after each test.

The Go driver will automatically create a database when you first write data
to it, so you don't need to create the database explicitly unless you need
specific options.

The following example shows how to drop your custom database after each test.
Change the ``your-db-name`` string to match the name of the database you're
using in your example.

.. code-block:: go

   // setupTestDB creates a MongoDB client and returns a cleanup function
   func setupTestDB(t *testing.T) (*mongo.Client, func()) {
      t.Helper() // Mark this as a helper function for better error reporting
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

      // Return cleanup function that will be called with defer
      cleanup := func() {
         // Drop the test database
         db := client.Database("your-db-name")
         if err := db.Drop(ctx); err != nil {
            t.Logf("failed to drop database: %v", err)
         }

         // Close the client connection
         if err := client.Disconnect(ctx); err != nil {
            t.Logf("failed to disconnect client: %v", err)
         }
      }

      return client, cleanup
   }
