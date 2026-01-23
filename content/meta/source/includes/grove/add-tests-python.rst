The Grove PyMongo Driver test suite uses the
`unittest <https://docs.python.org/3/library/unittest.html>`__
testing framework to verify that our code examples compile, run, and produce
the expected output when executed.

We pair this with a comparison library and a set of utilities to help us
write tests for our code examples.

How to Create a Test File
-------------------------

.. procedure::

   .. step:: Find or create a test file.

      Test files are located in the ``code-example-tests/python/pymongo/tests_package/``
      directory. From within that directory, the test suite is organized by
      category. For example, if you are testing a code example an aggregation
      pipeline, you will find or create test files in the ``aggregate/pipelines/``
      subdirectory. Test files can contain more than one test, so we group
      related tests for similar concepts together.

      Find the test file for your category or create a new one if necessary.
      The test file should be named ``test_<category>.py``. For example, if
      you are testing a code example for the ``aggregation/pipelines/filter``
      tutorial, the test file might named something like
      ``aggregation/pipelines/test_tutorials.py``. Within that file, you will
      have one or more test methods that test specific code examples.

   .. step:: Import the code example you want to test.

      Add an ``import`` statement at the top of your test file to import the
      code example you want to test, and any required setup code. For example,
      if you are testing the ``aggregate/pipelines/filter`` tutorial, you would
      add an import for
      ``import examples.aggregation.pipelines.filter.filter_tutorial as filter_tutorial``.

      The import statement uses the following pattern:

      .. code-block:: python

         import examples.<dir_or_subdir>.<example_file> as <example_file>

      Also add the following test utility imports:

      .. code-block:: python

         import unittest                        # The unit test framework
         from utils.comparison import Expect    # The comparison library
         from dotenv import load_dotenv         # For loading the .env file
         from pymongo import MongoClient        # For connecting to MongoDB

   .. step:: Add a test class to the file.

      Add a class to the file that will contain your test methods. The class
      name should be descriptive and match the file name. For example, if your
      test file is named ``test_tutorials.py``, you might name your class
      ``TestTutorials``.

      .. code-block:: python
         :emphasize-lines: 8

         import unittest
         from utils.comparison import Expect
         from dotenv import load_dotenv
         from pymongo import MongoClient

         import examples.aggregation.pipelines.filter.filter_tutorial as filter_tutorial

         class TestTutorials(unittest.TestCase):
            # Your test methods go here

   .. step:: Add a test method to the file.

      Add a test method to call the functions to perform the tests. In this
      Python project, to be discovered as a test, a method must start with the
      word ``test_`` and take the ``self`` parameter.

      Add a docstring to your test method that describes what the test is
      testing. This will be displayed in the test output.

      .. code-block:: python
         :emphasize-lines: 9-10

         import unittest
         from utils.comparison import Expect
         from dotenv import load_dotenv
         from pymongo import MongoClient

         import examples.aggregation.pipelines.filter.filter_tutorial as filter_tutorial

         class TestTutorials(unittest.TestCase):
            def test_filter_pipeline(self):
               """Verifies running the filter pipeline returns the three matching documents."""
               # Your test code goes here

   .. step:: Call the method you want to test.

      Within each test method, call the method in your example file that you
      want to test.

      Then, add an ``Expect.that()`` method to compare the actual output
      from your example with the expected output. The ``Expect.that()`` method
      takes in the actual output from your example and compares it to the expected
      output you provide in the ``should_match()`` method.

      .. code-block:: python
         :emphasize-lines: 3-5

         def test_filter_pipeline(self):
            """Verifies running the filter pipeline returns the three matching documents."""
            result = filter_tutorial.example(TestTutorialApp.CONNECTION_STRING)
            output_filepath = "examples/aggregation/pipelines/filter/filter-tutorial-output.txt"
            Expect.that(result).should_match(output_filepath)

      .. tip:: One Expect call per Test Method

         If you find that your method contains multiple ``Expect`` statements,
         it is an indication that you should split the test into multiple test
         cases.

      The ``should_match()`` method either returns nothing, which indicates
      that the actual output matched the expected output, or it raises an
      ``AssertionError``. The ``AssertionError`` contains details about the
      failure, including the reason for the failure and the location in the
      output where the failure occurred.

      .. tip:: Some tests may not work with exact matching

         Some scenarios, such as Vector Search queries, do not have stable output.
         In these cases, you can use the ``should_resemble()`` method instead of
         ``should_match()``. For more details, refer to the
         :ref:`python-expect-similar-output` section on this page.

   .. step:: Add setup and tear down logic.

      Add setup and tear down logic to your test file to execute code before or
      after each test case, or before and after all tests are run. Use this to
      read your ``.env`` file, connect to MongoDB, and clean up after a write
      operation.

      The following example shows how to add setup and tear down logic to a
      test file. In this case, we want to drop the database after *each* test
      to avoid cross-contaminating the tests.

      .. code-block:: python

         class TestTimeseries(unittest.TestCase):
            CONNECTION_STRING = None
            client = None

            @classmethod
            def setUpClass(cls):
               # Read the connection string from the environment file.
               # Do this once before the entire test suite runs, and cache it.
               load_dotenv()
               TestTimeseries.CONNECTION_STRING = os.getenv("CONNECTION_STRING")

               if TestTimeseries.CONNECTION_STRING is None:
                     raise Exception(
                        "Could not retrieve CONNECTION_STRING - make sure you have created the .env file at the root of the PyMongo directory and the variable is correctly named as CONNECTION_STRING."
                     )
               try:
                     TestTimeseries.client = MongoClient(TestTimeseries.CONNECTION_STRING)
               except:
                     raise Exception(
                        "CONNECTION_STRING invalid - make sure your connection string in your .env file matches the one for your MongoDB deployment."
                     )

            # Drop the database after each test to ensure clean test state
            def tearDown(self):
               TestTimeseries.client.drop_database("timeseries")

            # Close the client connection after all tests have run.
            @classmethod
            def tearDownClass(cls):
               TestTimeseries.client.close()

Compare Expected and Actual Output
----------------------------------

The ``Expect.that()`` function takes the following arguments:

- ``actual_output``: The actual output from your example code.

To perform the comparison, use one of the following methods:

- ``should_match()``: Use for most cases. The actual output must match the expected output.
- ``should_resemble()``: Use for cases where the output may vary between test runs.

Expect Exact Matches
~~~~~~~~~~~~~~~~~~~~

For most cases, we expect the actual output to match the expected output. In
these cases, use the ``should_match()`` method.

The ``should_match()`` function takes the following arguments:

- ``expected_output``: The expected output from your example code. This can be a
  file path, or an in-memory object.

  - If you use a file path, the path should start with the ``examples`` directory.
    For example, ``examples/aggregation/pipelines/filter/tutorial-output.txt``.
  - If you use an in-memory object, the object must be of the same type as the
    actual output. For example, if the actual output is a list of documents,
    the expected output must also be a list of documents.

You can configure the comparison behavior using the following methods:

- ``with_ordered_sort()``: Compare arrays in exact order.
- ``with_unordered_sort()``: Compare arrays in any order. This is the default
  behavior.
- ``with_ignored_fields()``: Ignore specific field values during comparison.

For example, you might use the following options to compare the output of a
pipeline that uses the ``$sort`` stage, where the documents contain ``_id``
and ``createdAt`` fields whose values may change between test runs:

.. code-block:: python

   Expect.that(output)
       .with_unordered_sort()
       .with_ignored_fields("_id", "created_at")
       .should_match("examples/aggregation/pipelines/filter/tutorial-output.txt");

.. _python-expect-similar-output:

Expect Similar Output
~~~~~~~~~~~~~~~~~~~~~

Some scenarios, such as Vector Search queries, do not have stable output. In
these cases, you can use the ``should_resemble()`` method instead of
``should_match()``.

The ``should_resemble()`` method takes the following arguments:

- ``expected_output``: The expected output from your example code. This can be a
  file path, or an in-memory object.

  - If you use a file path, the path should start with the ``examples`` directory.
    For example, ``examples/aggregation/pipelines/filter/tutorial-output.txt``.
  - If you use an in-memory object, the object must be of the same type as the
    actual output. For example, if the actual output is an array of documents,
    the expected output must also be an array of documents.

The ``should_resemble()`` method requires you to define a schema
object to use with the ``with_schema()`` method. This object provides details
about the count and structure of the expected output. Your schema object should
have the following properties:

- ``count``: Required; the expected number of documents in the result set.
- ``required_fields``: Optional; an array of field names that must exist in every document.
- ``field_values``: Optional; a dictionary that maps field names to their expected values.

Schema-based comparison supports cases where the elements may have different
values between test runs, such as:

- Vector Search queries, where the order and score of the results may vary.
- Aggregation queries that include a ``$sample`` stage, where the results may vary.
- Geospatial queries where distance calculations may vary slightly.

The following example shows how to use the ``should_resemble()`` method to
compare the output of a Vector Search query.

.. code-block:: python

   Expect.that(actual_output).should_resemble(expected_output).with_schema({
      'count': 5,
      'required_fields': ['_id', 'title', 'plot', 'year'],
      'field_values': {'year': 2012}
   })

In this example, the schema specifies that the result set should contain 5
documents. Each document must have the ``_id``, ``title``, ``plot``, and
``year`` fields. The ``year`` field must have the value ``2012``, but the other
fields may have different values between test runs.

The ``should_resemble()`` method is mutually exclusive with ``should_match()``.
Additionally, ``should_resemble()`` is not compatible with ``with_unordered_sort()``,
``with_ordered_sort()``, or ``with_ignored_fields()``.

Communicate Clearly about Results in Documentation
``````````````````````````````````````````````````

When using ``should_resemble()``, if you show the output in the documentation,
it is important to let readers know that the output is an example and the actual
output may differ. If a developer runs the example and gets different results,
we do not want the developer to think that the results are incorrect. Set clear
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
``@requires_sample_data`` decorator to mark the test as requiring sample data
sets, and to specify which databases are required.

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

The following code block shows how to use the ``@requires_sample_data``
decorator. It shows requiring a single database, multiple databases, and
specific collections within a database.

.. code-block:: python

   import unittest
   from utils.sample_data import requires_sample_data

   class TestMovieQueries(unittest.TestCase):
      @requires_sample_data("sample_mflix")
      def test_find_movies(self):
         # This test will be skipped if sample_mflix database is not available
         # Your test implementation here

      @requires_sample_data("sample_mflix", collections=["movies", "theaters"])
      def test_specific_collections(self):
         # This test requires specific collections to be present
         # Your test implementation here

      @requires_sample_data(["sample_mflix", "sample_restaurants"])
      def test_multiple_databases(self):
         # This test requires multiple sample databases
         # Your test implementation here

.. _revert-state-python:

Revert State with MongoDB Sample Data
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

MongoDB sample data sets are large and take a long time to ``mongorestore``.
Instead of dropping the database after each test, you must manually revert
any changes you make in your example after the test runs. For example, if you
set a field value to a specific value, set it back to its original value after
the test runs. Or if you add a new document, remove it after the test runs.

The following example show a partial method that inserts a document into a collection,
and then later removes the document:

.. code-block:: python

   # Create a new restaurant document
   new_restaurant = {
       "name": "Mongo's Pizza",
       "restaurant_id": "12345",
       "cuisine": "Pizza",
       "address": {
           "street": "Pizza St",
           "zipcode": "10003"
       }
   }

   # Insert the new document into the restaurants collection
   restaurants_collection.insert_one(new_restaurant)

   # ... Run your Expect statement ...

   # Remove the document we just added
   restaurants_collection.delete_one({"restaurant_id": "12345"})

In this case, we don't drop the database because we don't want to remove the
all of the sample data. Instead, we only revert any changes we made in this test.

.. important::

   If your test makes multiple changes to the database, be sure to revert
   all of them.

Working with Your Own Data
--------------------------

If your example uses your own data, you can use the ``setUp()``
method to set up your MongoDB client and create any necessary databases before
you run each test. You then use the ``tearDown()`` method to drop
the database after each test. PyMongo will automatically create a database
when you first write data to it, so you don't need to create the database explicitly.

The following example shows how to create your custom database before each test
and drop it after each test. Change the ``your-db-name`` string to match the name
of the database you're using in your example.

.. code-block:: python

   import os
   import unittest
   from dotenv import load_dotenv
   from pymongo import MongoClient

   class TestYourExample(unittest.TestCase):
       def setUp(self):
           load_dotenv()
           connection_string = os.getenv("CONNECTION_STRING")
           self.client = MongoClient(connection_string)
           self.database = self.client["your-db-name"]

       def test_your_method(self):
           # Your test implementation here

       def tearDown(self):
           # Drop the database after the test completes
           self.client.drop_database("your-db-name")
           self.client.close()

Note that you can also do a one-time setup and tear down for all tests in the
file. Do this with caution, however, since the database will persist between
tests. You must ensure that your tests do not contaminate each other. To do a
one-time setup and tear down, use the ``setUpClass()`` and ``tearDownClass()``
class methods with the ``@classmethod`` decorator, as shown in the following
code:

.. code-block:: python

   import os
   import unittest
   from dotenv import load_dotenv
   from pymongo import MongoClient

   class TestYourExample(unittest.TestCase):
       client = None
       database = None

       @classmethod
       def setUpClass(cls):
           # Create database here - runs once before all tests
           load_dotenv()
           connection_string = os.getenv("CONNECTION_STRING")
           cls.client = MongoClient(connection_string)
           cls.database = cls.client["your-db-name"]

       def test_your_method(self):
           # Your test implementation here

       @classmethod
       def tearDownClass(cls):
           # Drop database here - runs once after all tests
           cls.client.drop_database("your-db-name")
           cls.client.close()
