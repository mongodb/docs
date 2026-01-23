The Grove Node.js Driver test suite uses the `Jest <https://jestjs.io/docs/getting-started>`__
testing framework to verify that our code examples compile, run, and produce
the expected output when executed.

We pair this with a comparison library and a set of utilities to help us
write tests for our code examples.

How to Create a Test File
-------------------------

.. procedure::

   .. step:: Find or create a test file.

      The test suite is organized by category. Find the test file for your
      category or create a new one if necessary. Test files can contain more
      than one test, so we group related tests for similar concepts together.

      The test file should be named ``<category>.test.js``. For example, if
      you are testing a code example for the ``aggregate/pipelines/filter``
      tutorial, the test file might named something like
      ``aggregation/pipelines/tutorials.test.js``.

   .. step:: Import the code example you want to test.

      Import the code example you want to test, and any required setup code.
      For example, if you are testing the ``aggregate/pipelines/filter``
      tutorial, you would import the ``tutorial-setup.js`` and
      ``tutorial.js`` file:

      .. code-block:: javascript

         import { loadFilterSampleData } from '../../../examples/aggregation/pipelines/filter/tutorial-setup.js';
         import { runFilterTutorial } from '../../../examples/aggregation/pipelines/filter/tutorial.js';

      The Node.js Driver test project uses ESM import syntax with named imports.
      Include the name of your example function when you import it from the file.

      The import path is relative from the test file to the root of the
      ``code-example-tests/javascript/driver`` directory. You'll need to adjust
      the path based on the location of your test file. Your IDE can help you
      autocomplete the path based on the test file.

      In this example, the tutorials test file is three levels deep -
      ``tests/aggregation/pipelines/`` - so you need to move up three levels to
      reach the root directory. Then, down through ``examples/`` to the file
      that contains the example you want to test.

   .. step:: Add a test case to the file.

      Each test file starts with a ``describe`` block that groups together
      related test cases. Within the ``describe`` block, you can execute many
      individual test cases, which are each contained within an ``it`` block.

      For example, the following test file contains two test cases for the
      ``aggregate/pipelines/`` tutorial:

      .. literalinclude:: add-tests-javascript-example.js
         :language: javascript

      The string in the ``describe`` block is the description of the concept
      that this test file is testing. It should broadly fit the group of
      individual test cases within the file.

      For example, the ``aggregate/pipelines/`` tutorial contains several
      different pipelines. The ``describe`` block for the test file might be
      named ``Aggregation pipeline tutorials``.

      The string in the ``it`` block is the description of the specific test
      case. It should be descriptive enough to help you and others understand
      the intent of the test, and easily find and debug any issues if the test
      should fail.

      For example, the test case for the ``aggregate/pipelines/filter``
      tutorial might be named ``Should return filtered output that includes
      the three specified person records``.

   .. step:: Call your example function and verify the output.

      In the ``it`` block, call your example function and verify the output.

      If your example returns a simple string, you can use a strict match to
      confirm it matches expectations. In the following example, we call the
      ``run`` function that we defined in the example file. It returns a string
      that we can match against an expected value:

      .. code-block:: javascript

         it('Should return a basic document when executing the template app', async () => {
           const result = await run();
           Expect.that(result[0]['name'])
             .shouldMatch('sample2');
         });

      If your example returns a complex object or array, you can use the
      ``Expect`` comparison library to verify the output
      matches what is expected. In the following example, we:

      - Call the ``loadFilterSampleData`` function to load the sample data
        required for the tutorial.
      - Call the ``runFilterTutorial`` function to execute the tutorial function.
      - Specify the file path where the test framework can read the expected output.
      - Call the ``Expect.that()`` function to compare the actual output to the
        expected output, and verify the comparison was successful.

      .. code-block:: javascript

         it('Should return filtered output that includes the three specified person records', async () => {
           await loadFilterSampleData();
           const result = await runFilterTutorial();
           const outputFilepath = 'aggregation/pipelines/filter/tutorial-output.sh';
           Expect.that(result)
             .withUnorderedSort()
             .shouldMatch(outputFilepath);
         });

      In the example above, we specify that the comparison should be unordered,
      since the order of the elements in the array does not matter. If we were
      testing a pipeline that used the ``$sort`` stage, we would specify that
      the comparison should be ordered, since the order of the elements in the
      array does matter.

      The ``shouldMatch()`` method either returns nothing, which indicates
      that the actual output matched the expected output, or it throws an error.
      The error message contains details about the failure, including the reason
      for the failure and the location in the output where the failure occurred.

      .. tip:: Some tests may not work with exact matching

         Some scenarios, such as Vector Search queries, do not have stable output.
         In these cases, you can use the ``shouldResemble()`` method instead of
         ``shouldMatch()``. For more details, refer to the
         :ref:`js-expect-similar-output` section on this page.

   .. step:: Add setup and tear down logic.

      You can add setup and tear down logic to your test file to execute
      code before or after every test case. This is useful for loading sample
      data or cleaning up after a write operation.

      The following example shows how to add setup and tear down logic to a
      test file. In this case, we want to drop the database after each test
      to avoid cross-contaminating the tests.

      .. code-block:: javascript

         describe('Aggregation pipeline filter tutorial tests', () => {
           afterEach(async () => {
             const uri = process.env.CONNECTION_STRING;
             const client = new MongoClient(uri);
             const db = client.db('agg_tutorials_db');

             await db.dropDatabase();
             await client.close();
           });

           it('Should return filtered output that includes the three specified person records', async () => {
             await loadFilterSampleData();
             const result = await runFilterTutorial();
             const outputFilepath = 'aggregation/pipelines/filter/tutorial-output.sh';
             Expect.that(result)
               .withUnorderedSort()
               .shouldMatch(outputFilepath);
           });
         });

      When we run this test, the ``afterEach`` block runs after the test
      case completes, dropping the database and closing the client connection.

      If we have multiple test cases in our file that share the same setup logic,
      we could add the setup logic to a ``beforeEach`` block. This block runs
      before each test case. An example might resemble:

      .. code-block:: javascript
         :emphasize-lines: 2-4

         describe('Aggregation pipeline filter tutorial tests', () => {
           beforeEach(async () => {
             await loadSampleData();
           });

           afterEach(async () => {
             const uri = process.env.CONNECTION_STRING;
             const client = new MongoClient(uri);
             const db = client.db('agg_tutorials_db');

             await db.dropDatabase();
             await client.close();
           });

           it('Should return filtered output that includes the three specified person records', async () => {
             const result = await runFilterTutorial();
             const outputFilepath = 'aggregation/pipelines/filter/tutorial-output.sh';
             Expect.that(result)
               .withUnorderedSort()
               .shouldMatch(outputFilepath);
           });
         });

      With this change, we move the ``loadSampleData`` call into the
      ``beforeEach`` block. This ensures that the sample data is loaded before
      each test case runs. If each test case uses different sample data, we
      load it in the test case itself.

Working with MongoDB Sample Data in a Test File
-----------------------------------------------

If your example requires MongoDB sample data, you can use the
``describeWithSampleData`` and ``itWithSampleData`` functions to
mark the test as using sample data sets. This automatically skips the
test if the required sample data is not available.

This is a convenience function so writers don't necessarily need all of
the sample data sets loaded to run the test suite. This tool means that
writers won't see tests that require sample data as failures when they
don't have the sample data loaded - they see them as skipped tests, instead.

.. note::

    The GitHub workflows that run the tests in CI have the sample data
    loaded in their environment, so CI runs all tests that use sample data.

    If you are writing tests that involve the sample data sets, you should
    load the sample data and test locally to confirm your example works.
    This functionality is only provided so other writers don't need to load
    the sample data to run the test suite.

To use the sample data checking utility, import the utility at the top
of your test file:

.. code-block:: javascript

    import { describeWithSampleData, itWithSampleData } from '../utils/sampleDataChecker.js';

The following example shows how to use the ``describeWithSampleData``
function to mark a test as using the ``sample_mflix`` sample data set:

.. code-block:: javascript
    :emphasize-lines: 2, 7

    // Entire test file requires sample data
    describeWithSampleData('Movie Tests', () => {
      it('should find movies', async () => {
        const result = await runMovieQuery();
        expect(result.length).toBeGreaterThan(0);
      });
    }, 'sample_mflix');

In this case, the test file only runs if the ``sample_mflix``
sample data set is available. Otherwise, it skips all tests in the
file.

You can also use the ``itWithSampleData`` function to mark individual
test cases as using sample data. The following example shows how to use
the ``itWithSampleData`` function to mark a test as using the
``sample_mflix`` sample data set:

.. code-block:: javascript
    :emphasize-lines: 3, 6

    // Partial test suite requires sample data
    describe('Movie Tests', () => {
      itWithSampleData('should find movies', async () => {
        const result = await runMovieQuery();
        expect(result.length).toBeGreaterThan(0);
      }, 'sample_mflix');
    });

In this case, other test cases in the file can run without the sample
data. It only skips the test that requires the sample data.

Compare Expected and Actual Output
----------------------------------

The ``Expect.that()`` function takes the following arguments:

- ``actualOutput`` or ``result``: The actual output from your example code.

To perform the comparison, use one of the following methods:

- ``shouldMatch()``: Use for most cases. The actual output must match the expected output.
- ``shouldResemble()``: Use for cases where the output may vary between test runs.

Expect Exact Matches
~~~~~~~~~~~~~~~~~~~~

For most cases, we expect the actual output to match the expected output. In
these cases, use the ``shouldMatch()`` method.

The ``shouldMatch()`` method takes the following arguments:

- ``expectedOutput``: The expected output from your example code. This can be a
  file path, or an in-memory object.

  - If you use a file path, the path should start with the ``examples`` directory.
    For example, ``examples/aggregation/pipelines/filter/tutorial-output.sh``.
  - If you use an in-memory object, the object must be of the same type as the
    actual output. For example, if the actual output is an array of documents,
    the expected output must also be an array of documents.

You can configure the comparison behavior using the following methods:

- ``withUnorderedSort()``: Compare arrays in any order. MongoDB does not
  guarantee ordering unless you specify it, so unordered comparison is the default.
- ``withOrderedSort()``: Compare arrays in exact order. You might
  specify ``withOrderedSort()`` when your example uses the ``$sort`` stage,
  and elements should only appear in a specific order.
- ``withIgnoredFields()``: An array of field names to ignore when
  comparing objects. This is useful when the output contains fields
  that have different values between test runs, such as ObjectIds,
  timestamps, UUIDs, or other auto-generated values.

For example, you might use the following options to compare the output of a
pipeline that uses the ``$sort`` stage, where the documents contain ``_id``
and ``createdAt`` fields whose values may change between test runs:

.. code-block:: javascript

   Expect.that(result)
     .withOrderedSort()
     .withIgnoredFields('_id', 'createdAt')
     .shouldMatch(outputFilepath);

The ``shouldMatch()`` method is mutually exclusive with ``shouldResemble()``.

.. _js-expect-similar-output:

Expect Similar Output
~~~~~~~~~~~~~~~~~~~~~

Some scenarios, such as Vector Search queries, do not have stable output. In
these cases, you can use the ``shouldResemble()`` method instead of
``shouldMatch()``.

The ``shouldResemble()`` method takes the following arguments:

- ``expectedOutput``: The expected output from your example code. This can be a
  file path, or an in-memory object.

  - If you use a file path, the path should start with the ``examples`` directory.
    For example, ``examples/aggregation/pipelines/filter/tutorial-output.sh``.
  - If you use an in-memory object, the object must be of the same type as the
    actual output. For example, if the actual output is an array of documents,
    the expected output must also be an array of documents.

The ``shouldResemble()`` method requires you to define a schema for the output
using the ``withSchema()`` method. The schema provides details about the count
and structure of the expected output. The schema has the following properties:

- ``count``: Required; the expected number of documents in the result set.
- ``requiredFields``: Optional; an array of field names that must exist in every document.
- ``fieldValues``: Optional; an object that maps field names to their expected values.

Schema-based comparison supports cases where the elements may have different
values between test runs, such as:

- Vector Search queries, where the order and score of the results may vary.
- Aggregation queries that include a ``$sample`` stage, where the results may vary.
- Geospatial queries where distance calculations may vary slightly.

The following example shows how to use the ``shouldResemble()`` method to
compare the output of a Vector Search query.

.. code-block:: javascript

   const result = await runVectorSearchQuery();
   Expect.that(result)
     .shouldResemble(outputFilepath)
     .withSchema({
       count: 5,
       requiredFields: ['_id', 'title', 'plot', 'year'],
       fieldValues: {
         year: '2012',
       },
     });

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

Avoid Carrying Over Test State
------------------------------

When you write your tests, avoid introducing any state that carries over
between tests. A common cause of test failures is when a test assumes that the
database is in a certain state, but another test has modified that state.

Load Fresh Sample Data Before Each Test
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If you're working with sample data, you can use the ``beforeEach`` block to
load the sample data before each test. This ensures that each test runs with
fresh sample data in a known state. Note: this only applies to sample data that
is the same for all the test cases in the file. If you have multiple test cases
that use different sample data, load the sample data in the test case itself
instead of using the ``beforeEach`` block.

The following example shows how to load sample data before each test. Change the
``loadYourSampleData`` function to match the function you're using to load your
sample data.

.. code-block:: javascript

   beforeEach(async () => {
     await loadYourSampleData();
   });

Clean Up After Each Test
~~~~~~~~~~~~~~~~~~~~~~~~

As a best practice, create a fresh database for each test. You can use the
``afterEach`` block to drop the database after each test. This ensures that
each test runs with a clean database.

.. tip:: Don't drop the database when using MongoDB sample data sets.

   If you're using a MongoDB sample data set, you don't want to drop the
   database after each test, since that would drop the sample data. Refer to
   the next section for more information.

The following example shows how to drop the database after each test. Change
the ``your-db-name`` string to match the name of the database you're using in
your example.

.. code-block:: javascript
   :emphasize-lines: 4

   afterEach(async () => {
     const uri = process.env.CONNECTION_STRING;
     const client = new MongoClient(uri);
     const db = client.db('your-db-name');

     await db.dropDatabase();
     await client.close();
   });

Revert State with MongoDB Sample Data
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If you're working with a MongoDB sample data set, you don't want to drop the
database after each test, since that would drop the sample data. In this case,
you must manually revert any changes you make in your example after the
test runs. For example, if you set a field value to a specific value, set it
back to its original value after the test runs. Or if you add a new document,
remove it after the test runs.

The following example shows how you might revert a change to a field value:

.. code-block:: javascript

   it('Should update the year of The Martian to 2020', async () => {
     const result = await runUpdateTutorial();
     const outputFilepath = 'crud/update/tutorial-output.sh';

     Expect.that(result)
       .withUnorderedSort()
       .shouldMatch(outputFilepath);

     // Revert the change to the year field. First, you must set up the client
     // in the test file itself to make the change.
     const uri = process.env.CONNECTION_STRING;
     const client = new MongoClient(uri);
     const db = client.db('sample_mflix');

     // Revert any changes to the sample data. This example assumes you changed
     // the year of 'The Martian' to '2020', and resets the year back to '2015'.
     await db.collection('movies').updateOne(
       { title: 'The Martian' },
       { $set: { year: 2015 } }
     );
     await client.close();
   });

In this case, we don't drop the database because we don't want to remove the
sample data. Instead, we revert any changes we made to the sample data.
