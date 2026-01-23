The Grove Java Driver test suites use the `JUnit <https://docs.junit.org/current/user-guide/>`__
testing framework to verify that our code examples compile, run, and produce
the expected output when executed.

We pair this with a comparison library and a set of utilities to help us
write tests for our code examples.

How to Create a Test File
-------------------------

.. procedure::

   .. step:: Find or create a test file.

      Test files are located in the ``code-example-tests/java/driver-sync/src/test/java/``
      or ``code-example-tests/java/driver-reactive/src/test/java/``
      directory.

      From within that directory, the test suite is organized by
      category. For example, if you are testing a code example an aggregation
      pipeline, you will find or create test files in the ``aggregate/pipelines/``
      subdirectory. Test files can contain more than one test, so we group
      related tests for similar concepts together.

      Find the test file for your category or create a new one if necessary.
      The test file should be named ``<category>Tests.java``. For example, if
      you are testing a code example for the ``aggregation/pipelines/filter``
      tutorial, the test file might named something like
      ``aggregation/pipelines/TutorialTests.java``. Within that file, you will
      have one or more test methods that test specific code examples.

   .. step:: Import the code example you want to test.

      Add a ``package`` statement at the top of your test file to import the
      code example you want to test, and any required setup code. For example,
      if you are testing the ``aggregate/pipelines/filter`` tutorial, you would
      import the ``aggregation.pipelines`` namespace.

      Add an ``import`` statement for the ``mongodb.comparison.Expect`` utility.

      .. code-block:: java

         package aggregation.pipelines;
         import mongodb.comparison.Expect;

   .. step:: Add a test class to the file.

      Add a ``public`` class to the file that will contain your test methods.
      The class name should match your file name.

      .. code-block:: java
         :caption: TutorialTests.java
         :emphasize-lines: 4,6

         package aggregation.pipelines;
         import mongodb.comparison.Expect;

         public class TutorialTests {
            // Your test methods go here
         }

   .. step:: Add a test method to the file.

      Add these two annotations to each test method in the file:

      - ``@Test``: This tells the framework that this is a test case

      - ``@Description``: This explains the purpose of the test. The framework
        shows this string in the output when you run the tests.

      For example, the following code shows a partial test file that contains two
      test methods for the ``aggregate/pipelines/`` tutorial. Each includes a
      description of the test:

      .. code-block:: java

         package aggregation.pipelines;
         import mongodb.comparison.Expect;

         public class TutorialTests {
            @Test
            @DisplayName("Test that filter aggregation pipeline matches output")
            void TestFilter() {
               // Your test code goes here
            }

            @Test
            @DisplayName("Test that group aggregation pipeline matches output")
            void TestGroup() {
               // Your test code goes here
            }
         }

   .. step:: Call the method you want to test.

      Within each test method:

      **a. Create an instance of the class you want to test.**
      **b. Load any required sample data.**
      **c. Call the method you want to test.**
      **d. Compare the actual output to the expected output.**

      .. code-block:: java
         :emphasize-lines: 4-6, 8-10

         @Test
         @DisplayName("Test that filter aggregation pipeline matches output")
         void TestFilter() {
            var example = new aggregation.pipelines.filter.Tutorial(); // Step A
            example.loadSampleData(); // Step B
            var output = example.runTutorial(); // Step C

            // Step D
            Expect.that(output)
                .shouldMatch("src/main/java/aggregation/pipelines/filter/TutorialOutput.txt");
         }

      .. tip:: One Expect call per Test Method

         If you find that your method contains multiple ``Expect`` statements,
         it is an indication that you should split the test into multiple test
         cases.

      The ``shouldMatch()`` method either returns ``ComparisonResult`` object,
      which indicates that the actual output matched the expected output, or it
      throws an ``AssertionError``. The ``AssertionError`` contains a
      message with details about the failure, including the reason for the
      failure and the location in the output where the failure occurred.

      .. tip:: Some tests may not work with exact matching

         Some scenarios, such as Vector Search queries, do not have stable output.
         In these cases, you can use the ``shouldResemble()`` method instead of
         ``shouldMatch()``. For more details, refer to the
         :ref:`java-expect-similar-output` section on this page.

   .. step:: Add setup and tear down logic.

      You can add setup and tear down logic to your test file to execute
      code before or after each test case, or before and after all tests are run.
      This is useful for loading sample data or cleaning up after a write operation.
      For more information on the ``@BeforeEach`` and ``@AfterEach`` annotations,
      refer to the
      `JUnit documentation <https://docs.junit.org/current/user-guide/>`__.

      The following example shows how to add setup and tear down logic to a
      test file. In this case, we want to drop the database after *each* test
      to avoid cross-contaminating the tests.

      .. code-block:: java

         private final String uri = System.getenv("CONNECTION_STRING");
         private MongoClient mongoClient;
         private MongoDatabase database;

         @BeforeEach
         void setUp() {
            mongoClient = MongoClients.create(uri);
            database = mongoClient.getDatabase("agg_tutorials_db");
         }

         @AfterEach
         void tearDown() {
            database.drop();
            mongoClient.close();
         }

      .. note::

         If you replace the ``@BeforeEach`` annotation with ``@BeforeAll`` and
         the ``@AfterEach`` annotation with ``@AfterAll``, the setup and
         tear down methods will run only once, before and after all tests in the
         file run. This is useful if you want to load sample data once before
         all tests run, and drop the database once after all tests complete.

Compare Expected and Actual Output
----------------------------------

The ``Expect.that()`` function takes the following arguments:

- ``actualOutput``: The actual output from your example code.

To perform the comparison, use one of the following methods:

- ``shouldMatch()``: Use for most cases. The actual output must match the expected output.
- ``shouldResemble()``: Use for cases where the output may vary between test runs.

Expect Exact Matches
~~~~~~~~~~~~~~~~~~~~

For most cases, we expect the actual output to match the expected output. In
these cases, use the ``shouldMatch()`` method.

The ``shouldMatch()`` function takes the following arguments:

- ``expectedOutput``: The expected output from your example code. This can be a
  file path, or an in-memory object.

  - If you use a file path, the path is relative to the ``driver-sync`` or
    ``driver-reactive`` directory. For example,
    ``src/main/java/aggregation/pipelines/filter/TutorialOutput.txt``.
  - If you use an in-memory object, the object must be of the same type as the
    actual output. For example, if the actual output is a list of documents,
    the expected output must also be a list of documents.

You can configure the comparison behavior using the following methods:

- ``withOrderedSort()``: Compare arrays in exact order.
- ``withUnorderedSort()``: Compare arrays in any order. This is the default
  behavior.
- ``withIgnoredFields()``: Ignore specific field values during comparison.

For example, you might use the following options to compare the output of a
pipeline that uses the ``$sort`` stage, where the documents contain ``_id``
and ``createdAt`` fields whose values may change between test runs:

.. code-block:: java

   Expect.that(output)
       .withUnorderedSort()
       .withIgnoredFields("_id", "createdAt")
       .shouldMatch("src/main/java/aggregation/pipelines/filter/TutorialOutput.txt");

.. _java-expect-similar-output:

Expect Similar Output
~~~~~~~~~~~~~~~~~~~~~

Some scenarios, such as Vector Search queries, do not have stable output. In
these cases, you can use the ``shouldResemble()`` method instead of
``shouldMatch()``.

The ``shouldResemble()`` method takes the following arguments:

- ``expectedOutput``: The expected output from your example code. This can be a
  file path, or an in-memory object.

  - If you use a file path, the path is relative to the ``driver-sync`` or
    ``driver-reactive`` directory. For example,
    ``src/main/java/aggregation/pipelines/filter/TutorialOutput.txt``.
  - If you use an in-memory object, the object must be of the same type as the
    actual output. For example, if the actual output is an array of documents,
    the expected output must also be an array of documents.

The ``shouldResemble()`` method requires a ``Schema`` object to
use with the ``withSchema()`` method. This object provides details
about the count and structure of the expected output. You can use the builder
pattern to create a ``Schema`` with the following methods:

- ``withCount(Integer count)``: Required; the expected number of documents in the result set.
- ``withRequiredFields(String... fields)``: Optional; an array of field names that must exist in every document.
- ``withFieldValues(Map<String, Object> fieldValues)``: Optional; a dictionary that maps field names to their expected values.

Schema-based comparison supports cases where the elements may have different
values between test runs, such as:

- Vector Search queries, where the order and score of the results may vary.
- Aggregation queries that include a ``$sample`` stage, where the results may vary.
- Geospatial queries where distance calculations may vary slightly.

The following example shows how to use the ``shouldResemble()`` method to
compare the output of a Vector Search query.

.. code-block:: java

   var result = vectorSearch.RunQuery();
   Expect.that(result).shouldResemble(expected).withSchema(
      Schema.builder()
         .withCount(5)
         .withRequiredFields("_id", "title", "plot", "year")
         .withFieldValues(Map.of("year", 2012))
         .build()
   );

In this example, the schema specifies that the result set should contain 5
documents. Each document must have the ``_id``, ``title``, ``plot``, and
``year`` fields. The ``year`` field must have the value ``2012``, but the other
fields may have different values between test runs.

The ``shouldResemble()`` method is mutually exclusive with ``shouldMatch()``.
Additionally, ``shouldResemble()`` is not compatible with ``withUnorderedSort()``,
``withOrderedSort()``, or ``withIgnoredFields()``.

Communicate Clearly about Results in Documentation
``````````````````````````````````````````````````

When using ``shouldResemble()``, if you show the output in the documentation,
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
``@RequiresSampleData("sample_mflix")`` annotation to
mark the test as requiring sample data sets, and to specify which databases are
required. If the required sample data is not available, the test suite
skips the test.

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

The following code block shows how to use the ``@RequiresSampleData("sample_mflix")``
annotation. It shows requiring a single database, multiple databases, and
specific collections within a database.

.. code-block:: java

   import sampledatautil.RequiresSampleData;
   import org.junit.jupiter.api.Test;

   public class MovieAnalysisTest {

      // Test requiring a single database
      @Test
      @RequiresSampleData("sample_mflix")
      public void testMovieQueries() {
         // This test will only run if sample_mflix database is available
         // Test code here...
      }

      // Test requiring multiple databases
      @Test
      @RequiresSampleData({"sample_mflix", "sample_restaurants"})
      public void testCrossDatabaseAnalysis() {
         // This test will only run if both databases are available
         // Test code here...
      }

      // Test requiring specific collections
      @Test
      @RequiresSampleData(value = "sample_mflix", collections = {"movies", "theaters"})
      public void testSpecificCollections() {
         // This test will only run if sample_mflix has movies and theaters collections
         // Test code here...
      }
   }

.. _revert-state-java:

Revert State with MongoDB Sample Data
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

MongoDB sample data sets are large and take a long time to ``mongorestore``.
Instead of dropping the database after each test, you must manually revert
any changes you make in your example after the test runs. For example, if you
set a field value to a specific value, set it back to its original value after
the test runs. Or if you add a new document, remove it after the test runs.

The following example show a partial method that inserts a document into a collection,
and then later removes the document:

.. code-block:: java

   {
      ...

      // Create a new restaurant document
      Restaurant newRestaurant = new Restaurant()
          .withName("Mongo's Pizza")
          .withRestaurantId("12345")
          .withCuisine("Pizza")
          .withAddress(new Address()
              .withStreet("Pizza St")
              .withZipCode("10003"));

      // Insert the new document into the restaurants collection
      restaurantsCollection.InsertOne(newRestaurant);

      ... Run your Expect statement ...

      // Remove the document we just added
      Bson filter = Filters.eq("restaurant_id", "12345");
      restaurantsCollection.deleteOne(filter);

      ...
   }

In this case, we don't drop the database because we don't want to remove the
all of the sample data. Instead, we only revert any changes we made in this test.

.. important::

   If your test makes multiple changes to the database, be sure to revert
   all of them.

Working with Your Own Data
--------------------------

If your example uses your own data, you can use the ``@BeforeEach``
annotation to set up your MongoDB client and create any necessary databases before
you run each test. You then use the ``@AfterEach`` annotation to drop
the database after each test. The Java driver will automatically create a database
when you first write data to it, so you don't need to create the database explicitly.

The following example shows how to create your custom database before each test
and drop it after each test. Change the ``your-db-name`` string to match the name
of the database you're using in your example.

.. code-block:: java

   private final String uri = System.getenv("CONNECTION_STRING");
   private MongoClient mongoClient;
   private MongoDatabase database;

   @BeforeEach
   void setUp() {
       mongoClient = MongoClients.create(uri);
       database = mongoClient.getDatabase("your-db-name");
   }

   @Test
   @DisplayName("Test that agg tutorial template app code runs and returns a specific document")
   void TestAggTutorial() {
       // Your test code goes here
   }

   @AfterEach
   void tearDown() {
       database.drop();
       mongoClient.close();
   }

Note that you can also do a one-time setup and tear down for all tests in the
file. Do this with caution, however, since the database will persist between
tests. You must ensure that your tests do not contaminate each other. To do a
one-time setup and tear down, replace the ``@BeforeEach`` annotation with
``@BeforeAll`` and the ``@AfterEach`` annotation with ``@AfterAll`` within a
class, as shown in the following code:

.. code-block:: java

   private final String uri = System.getenv("CONNECTION_STRING");
   private MongoClient mongoClient;
   private MongoDatabase database;

   @BeforeAll
   void setUp() {
       // Create database here
   }

   @AfterAll
   void tearDown() {
       // Drop database here
   }
