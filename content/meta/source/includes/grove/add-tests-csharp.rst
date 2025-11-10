The Grove C# Driver test suite uses the `NUnit <https://nunit.org/>`__
testing framework to verify that our code examples compile, run, and produce
the expected output when executed.

We pair this with a comparison library and a set of utilities to help us
write tests for our code examples.

How to Create a Test File
-------------------------

.. procedure::

   .. step:: Find or create a test file.

      Test files are located in the ``code-example-tests/csharp/driver/Tests/``
      directory. From within that directory, the test suite is organized by
      category. For example, if you are testing a code example an aggregation
      pipeline, you will find or create test files in the ``Aggregate/Pipelines/``
      subdirectory. Test files can contain more than one test, so we group
      related tests for similar concepts together.

      Find the test file for your category or create a new one if necessary.
      The test file should be named ``<category>Test.cs``. For example, if
      you are testing a code example for the ``Aggregation/Pipelines/Filter``
      tutorial, the test file might named something like
      ``Aggregation/Pipelines/TutorialsTest.cs``. Within that file, you will
      have one or more test methods that test specific code examples.

   .. step:: Import the code example you want to test.

      Add a ``using`` statement at the top of your test file to import the
      code example you want to test, and any required setup code. For example,
      if you are testing the ``Aggregate/Pipelines/Filter`` tutorial, you would
      import the ``Examples.Aggregation.Pipelines.Filter`` namespace.

      Also add a ``using`` statement for the ``Utilities.Comparison`` namespace.

      .. code-block:: csharp

         using Examples.Aggregation.Pipelines.Filter;
         using Utilities.Comparison;

   .. step:: Add a test method to the file.

      Add these two annotations to each test method in the file:

      - ``[Test]``: This tells the framework that this is a test case

      - ``[Description]``: This explains the purpose of the test. The framework
        shows this string in the output when you run the tests.

      For example, the following code shows a partial test file that contains two
      test methods for the ``Aggregate/Pipelines/`` tutorial. Each includes a
      description of test:

      .. literalinclude:: ./add-test-methods-example.cs
         :language: csharp

   .. step:: Call the method you want to test.

      Within each test method, call the method in your example file that you
      want to test. Then, add an ``Expect.That()`` method to compare the actual output
      from your example with the expected output. The ``Expect.That()`` method
      takes in the actual output from your example and compares it to the expected
      output you provide in the ``ShouldMatch()`` method.

      .. literalinclude:: ./add-tests-csharp-example.cs
         :language: csharp


      .. tip:: One Expect call per Test Method

         If you find that your method contains multiple ``Expect`` statements,
         it is an indication that you should split the test into multiple test
         cases.

      The ``ShouldMatch()`` method either returns ``ComparisonSuccess`` object,
      which indicates that the actual output matched the expected output, or it
      throws a ``ComparisonException``. The ``ComparisonException`` object contains a
      ``ComparisonError`` object in its ``Details`` property. A ``ComparisonError``
      object contains details about the failure, including the reason for the
      failure and the location in the output where the failure occurred.

   .. step:: Add setup and tear down logic.

      You can add setup and tear down logic to your test file to execute
      code before or after each test case, or before and after all tests are run.
      This is useful for loading sample data or cleaning up after a write operation.
      For more information on the ``[SetUp]`` and ``[TearDown]`` attributes, refer to the
      `NUnit documentation <https://docs.nunit.org/articles/nunit/writing-tests/setup-teardown/index.html>`__.

      The following example shows how to add setup and tear down logic to a
      test file. In this case, we want to drop the database after *each* test
      to avoid cross-contaminating the tests.

      .. code-block:: csharp

         [SetUp]
         public void Setup()
         {
             var connectionString = DotNetEnv.Env.GetString("CONNECTION_STRING",
                 "Env variable not found. Verify you have a .env file with a valid connection string.");
             _client = new MongoClient(connectionString);
         }


         [TearDown]
         public void TearDown()
         {
             // Drop the database after each test completes
             _client.DropDatabase("agg_tutorials_db");
             _client.Dispose();
         }

      .. note::

         If you replace the ``[Setup]`` attribute with ``[OneTimeSetUp]`` and
         the ``[TearDown]`` attribute with ``[OneTimeTearDown]``, the setup and
         tear down methods will run only once, before and after all tests in the
         file run. This is useful if you want to load sample data once before
         all tests run, and drop the database once after all tests complete.

Compare Expected and Actual Output
----------------------------------

The ``Expect.That()`` function takes the following arguments:

- ``actualOutput``: The actual output from your example code.

The ``ShouldMatch()`` function takes the following arguments:

- ``expectedOutput``: The expected output from your example code. This can be a
  file path, or an in-memory object.

  - If you use a file path, the path should start with the ``Examples`` directory.
    For example, ``Examples/Aggregation/Pipelines/Filter/TutorialOutput.txt``.
  - If you use an in-memory object, the object must be of the same type as the
    actual output. For example, if the actual output is a list of documents,
    the expected output must also be a list of documents.

You can configure the comparison behavior using the following methods:

- ``WithOrderedSort()``: Compare arrays in exact order.
- ``WithUnorderedSort()``: Compare arrays in any order. This is the default
  behavior.
- ``WithIgnoredFields()``: Ignore specific field values during comparison.

For example, you might use the following options to compare the output of a
pipeline that uses the ``$sort`` stage, where the documents contain ``_id``
and ``createdAt`` fields whose values may change between test runs:

.. code-block:: csharp

   Expect.That(output)
       .WithUnorderedSort()
       .WithIgnoredFields("_id", "createdAt")
       .ShouldMatch("Examples/Aggregation/Pipelines/Filter/TutorialOutput.txt");

Work with MongoDB Sample Data
-----------------------------

If your example requires MongoDB sample data, you can use the
``[RequiresSampleData("...")]`` attribute to
mark the test as requiring sample data sets, and to specify which databases are
required. At or near the top of the method, you call
``SampleDataTestHelper.EnsureSampleDataOrSkip()``,
which will skip the test if the required sample data is not available.

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

The following code block shows how to use the ``[RequiresSampleData(...)]``
attribute and the ``SampleDataTestHelper.EnsureSampleDataOrSkip()`` method. It
shows requiring a single database, multiple databases, and specific collections
within a database.

.. code-block:: csharp

   using Utilities.SampleData;

   // This test requires the "sample_mflix" database.
   [Test]
   [RequiresSampleData("sample_mflix")]
   public async Task TestMovieAggregation()
   {
      // Check sample data availability (skips test if missing)
      SampleDataTestHelper.EnsureSampleDataOrSkip("sample_mflix");

      // Test code that uses sample_mflix database
   }

   // This test requires both the "sample_mflix" and "sample_restaurants" databases.
   [Test]
   [RequiresSampleData("sample_mflix", "sample_restaurants")]
   public async Task TestCrossDatabaseQuery()
   {
      SampleDataTestHelper.EnsureSampleDataOrSkip("sample_mflix", "sample_restaurants");

      // Test code using both databases
   }

   // This test requires specific collections within the "sample_mflix" database.
   [Test]
   [RequiresSampleData("sample_mflix")]
   public async Task TestMovieTheaterData()
   {
      var collections = new Dictionary<string, string[]>
      {
         ["sample_mflix"] = new[] { "movies", "theaters" }
      };

      SampleDataTestHelper.EnsureSampleDataOrSkip(new[] { "sample_mflix" }, collections);

      // Test code requiring both collections
   }

You can also use the ``[RequiresSampleData("...")]`` attribute at the
class level with the ``[TestFixture]`` attribute. This is useful if you have
multiple tests in the class that require the same sample data. In this example,
two tests in the ``MovieAnalysisTests`` class require the ``sample_mflix``
database:

.. code-block:: csharp

   [TestFixture]
   [RequiresSampleData("sample_mflix")]
   public class MovieAnalysisTests
   {
      [SetUp]
      public void SetUp()
      {
         // Check once per fixture
         SampleDataTestHelper.EnsureSampleDataOrSkip("sample_mflix");
      }

      [Test]
      public async Task TestMoviesByGenre() { /* ... */ }

      [Test]
      public async Task TestMovieRatings() { /* ... */ }
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

.. code-block:: csharp

   {
      ...

      // Create a new restaurant document
      Restaurant newRestaurant = new()
        {
            Name = "Mongo's Pizza",
            RestaurantId = "12345",
            Cuisine = "Pizza",
            Address = new()
            {
                Street = "Pizza St",
                ZipCode = "10003"
            }
        };

      // Insert the new document into the restaurants collection
      _restaurantsCollection.InsertOne(newRestaurant);

      ... Run your Expect statement ...

      // Remove the document we just added
      _restaurantsCollection.DeleteOne(r => r.RestaurantId == "12345");

      ...
   }

In this case, we don't drop the database because we don't want to remove the
all of the sample data. Instead, we only revert any changes we made in this test.

.. important::

   If your test makes multiple changes to the database, be sure to revert
   all of them.


Working with Your Own Data
--------------------------

If your example uses your own data, you can use the ``[SetUp]``
attribute to set up your MongoDB client and create any necessary databases before
you run each test. You then use the ``[TearDown]`` attribute to drop
the database after each test. The C# driver will automatically create a database
when you first write data to it, so you don't need to create the database explicitly.

The following example shows how to create your custom database before each test
and drop it after each test. Change the ``your-db-name`` string to match the name
of the database you're using in your example.

.. code-block:: csharp

   [SetUp]
   public void Setup()
   {
       var connectionString = DotNetEnv.Env.GetString("CONNECTION_STRING");
       _client = new MongoClient(connectionString);
       _database = _client.GetDatabase("your-db-name");
   }

   [Test]
   public void YourTestMethod() ...

   [TearDown]
    public void TearDown()
    {
        // Drop the database after the test completes
        _client.DropDatabase("your-db-name");
        _client.Dispose();
    }

Note that you can also do a one-time setup and tear down for all tests in the file.
Do this with caution, however, since the database will persist between tests. You must ensure
that your tests do not contaminate each other. To do a one-time setup and tear down, replace the
``[SetUp]`` attribute with ``[OneTimeSetUp]`` and the ``[TearDown]`` attribute with
``[OneTimeTearDown]`` within a class marked with the ``[SetupFixture]`` attribute,
as shown in the following code:

.. code-block:: csharp

   [SetUpFixture]
    public class TestsSetupClass
    {
        [OneTimeSetUp]
        public void GlobalSetup()
        {
            // create database here.
        }

        [OneTimeTearDown]
        public void GlobalTeardown()
        {
            // drop database here.
        }
    }