How to Create a Test File
-------------------------

.. procedure::

   .. step:: Find or create a test file.

      Test files are located in the
      ``code-example-tests/command-line/mongosh/tests`` directory.

      From within that directory, the test suite is organized by
      category. For example, if you are testing a code example an aggregation
      pipeline, you will find or create test files in the ``aggregate/pipelines/``
      subdirectory. Test files can contain more than one test, so we group
      related tests for similar concepts together.

      Find the test file for your category or create a new one if necessary.
      The test file should be named ``<category>.test.js``. For example, if
      you are testing a code example for the ``aggregate/pipelines/filter``
      tutorial, the test file might named something like
      ``aggregation/pipelines/tutorials.test.js``. Within that file, you will
      have one or more test methods that test specific code examples.

   .. step:: Import the utilities to run the tests.

      At the top of your test file, add an ``require`` statement for the
      ``comparison/Expect`` utility. Also, import ``execSync`` from the
      ``child_process`` module to execute the temporary file in ``mongosh``.

      .. code-block:: javascript

         const { execSync } = require("child_process");
         const Expect = require("../../../utils/comparison/Expect");

      The path to the ``Expect`` utility may vary depending on the location
      of your test file. The import path is relative from the test file to the
      root of the ``code-example-tests/command-line/mongosh`` directory.
      You'll need to adjust the path based on the location of your test file.
      Your IDE can help you autocomplete the path based on the test file.

      In this example, the tutorials test file is three levels deep -
      ``tests/aggregation/pipelines/`` - so you need to move up three levels to
      reach the root directory.

      .. tip::

         Unlike the JavaScript Driver test suite, you do not need to import
         the example files you want to test. Instead, you provide the paths to
         the example files to the test suite, which assembles them into a
         temporary file and executes it in ``mongosh``.

   .. step:: Add a test case to the file.

      Each test file starts with a ``describe`` block that groups together
      related test cases. Within the ``describe`` block, you can execute many
      individual test cases, which are each contained within an ``test`` block.

      For example, the following test file contains two test cases for the
      ``aggregate/pipelines/`` tutorial:

      .. code-block:: javascript
         :caption: tests/aggregation/pipelines/tutorials.test.js

         const { execSync } = require("child_process");
         const Expect = require("../../../utils/comparison/Expect");

         describe("Aggregation pipeline tutorials", () => {
            const dbName = "agg-pipeline";

            test("Should return filtered output that includes the three specified person records", async () => {
               // Your test code goes here
            });

            test("Should return grouped output that includes the three specified customer order records", async () => {
               // Your test code goes here
            });
         });

      The string in the ``describe`` block is the description of the concept
      that this test file is testing. It should broadly fit the group of
      individual test cases within the file.

      For example, the ``aggregate/pipelines/`` tutorial contains several
      different pipelines. The ``describe`` block for the test file might be
      named ``Aggregation pipeline tutorials``.

      The string in the ``test`` block is the description of the specific test
      case. It should be descriptive enough to help you and others understand
      the intent of the test, and easily find and debug any issues if the test
      should fail.

      For example, the test case for the ``aggregate/pipelines/filter``
      tutorial might be named ``Should return filtered output that includes
      the three specified person records``.

   .. step:: Use the test utility to test the example files.

      Within each test case, call the test utility to test the example files.
      The following example:

      - Specifies the example files to test, in sequence. First, ``load-data.js``,
        then ``run-pipeline.js``
      - Specifies the output file that contains the expected output
      - Specifies the database name to use for the test
      - Uses the test utility to test the example files

      .. code-block:: javascript
         :caption: tests/aggregation/pipelines/tutorials.test.js
         :emphasize-lines: 8-12, 14-17

         const { execSync } = require("child_process");
         const Expect = require("../../../utils/comparison/Expect");

         describe("Aggregation pipeline tutorials", () => {
            const dbName = "agg-pipeline";

            test("Should return filtered output that includes the three specified person records", async () => {
               const exampleFiles = [
                  "aggregation/pipelines/filter/load-data.js",
                  "aggregation/pipelines/filter/run-pipeline.js"
               ];
               const outputFile = "aggregation/pipelines/filter/output.sh";

               await Expect
                  .outputFromExampleFiles(exampleFiles)
                  .withDbName(dbName)
                  .shouldMatch(outputFile);
            });
         });

      The ``exampleFiles`` array contains the paths to the example files that
      you want to test. The paths are relative to the ``examples/`` directory.

      The ``outputFile`` variable contains the path to the output file that
      contains the expected output. The path is relative to the ``examples/``
      directory.

      The ``dbName`` variable contains the name of the database to use for the
      test.

      .. tip:: One Expect call per Test Method

         If you find that your method contains multiple ``Expect`` statements,
         it is an indication that you should split the test into multiple test
         cases.

      If the output does not match the expected output, the ``Expect`` utility
      throws an error. The error message contains details about the failure,
      including the reason for the failure and the location in the output
      where the failure occurred.

   .. step:: Add setup and tear down logic.

      You can add setup and tear down logic to your test file to execute
      code before or after every test case. This is useful for loading sample
      data or cleaning up after a write operation.

      The following example shows how to add tear down logic to a test file.
      In this case, we want to drop the database after each test to avoid
      cross-contaminating the tests.

      .. code-block:: javascript
         :caption: tests/aggregation/pipelines/tutorials.test.js
         :emphasize-lines: 8-17

         const { execSync } = require("child_process");
         const Expect = require("../../../utils/comparison/Expect");

         describe("Aggregation pipeline tutorials", () => {
            const dbName = "agg-pipeline";

            // Drop the database after running each test
            afterEach(() => {
               const mongoUri = process.env.CONNECTION_STRING;
               const command = `mongosh "${mongoUri}" --eval "db = db.getSiblingDB('${dbName}'); db.dropDatabase();"`;

               try {
                  execSync(command, { encoding: "utf8" });
               } catch (error) {
                  console.error(`Failed to drop database '${dbName}':`, error.message);
               }
            });
         });

      This tear down block uses ``mongosh`` installed on your system to:

      - Connect to the MongoDB instance specified by the ``CONNECTION_STRING``
        environment variable
      - Get a reference to the database specified by the ``dbName`` variable
      - Drop the database

Compare Expected and Actual Output
----------------------------------

The ``Expect.outputFromExampleFiles()`` method takes the following arguments:

- ``exampleFiles``: An array of paths to the example files that you want to
  test. The paths are relative to the ``examples/`` directory. Specify the
  files in the order they should be executed. Only the last file in the
  list will be wrapped in a ``printjson()`` call for output capture.

You can chain additional methods to the ``Expect.outputFromExampleFiles()``
method to configure the test. The following methods are available:

- ``withDbName()``: REQUIRED: Specifies the name of the database to use
  for the test.
- ``withOrderedSort()``: Specifies that the output should be compared as an
  ordered array. Use this option if your example uses the ``$sort`` stage.
- ``withUnorderedSort()``: Specifies that the output should be compared as an
  unordered array. This is the default behavior.
- ``withIgnoredFields()``: Specifies fields that should be ignored during
  comparison. Use this option if your example contains fields whose values
  may change between test runs, such as ``_id`` or ``createdAt`` fields.
- ``shouldMatch()``: REQUIRED: Specifies the path to the output file that
  contains the expected output. The path is relative to the ``examples/``
  directory.

.. code-block:: javascript

   Expect.outputFromExampleFiles(exampleFiles)
      .withDbName(dbName)
      .withOrderedSort()
      .withIgnoredFields("_id", "createdAt")
      .shouldMatch(outputFile);

How Grove Handles MongoDB Shell Commands
----------------------------------------

The Grove MongoDB Shell test suites use the `Jest <https://jestjs.io/docs/getting-started>`__
testing framework to verify that our code examples run and produce
the expected output when executed. We use the MongoDB Shell functionality
to
`execute a JavaScript file as a script <https://www.mongodb.com/docs/mongodb-shell/write-scripts/>`__
to execute our code examples.

We chain sequential examples together to create a single script, which we output
to a temporary file. The temporary file contains the following:

- A connection to the test database
- The example code, wrapped in a ``printjson()`` call for output capture

Grove creates the temporary file at runtime, and deletes it after the test runs.

We pair this with a comparison library and a set of utilities to help us
write tests for our code examples.

.. example::

   For an aggregation pipeline example, you may have the following two files:

   .. code-block:: javascript
      :caption: load-data.js

      db.persons.insertMany( [
         {
            person_id: "6392529400",
            firstname: "Elise",
            lastname: "Smith",
            dateofbirth: new Date("1972-01-13T09:32:07Z"),
            vocation: "ENGINEER",
            address: {
               number: 5625,
               street: "Tipa Circle",
               city: "Wojzinmoj",
            }
         },
         {
            person_id: "1723338115",
            firstname: "Olive",
            lastname: "Ranieri",
            dateofbirth: new Date("1985-05-12T23:14:30Z"),
            gender: "FEMALE",
            vocation: "ENGINEER",
            address: {
               number: 9303,
               street: "Mele Circle",
               city: "Tobihbo",
            }
         }
      ] )

   .. code-block:: javascript
      :caption: run-pipeline.js

      db.persons.aggregate( [
         // Stage 1: Match documents of people who are engineers
         { $match: { "vocation": "ENGINEER" } },

         // Stage 2: Sort documents from youngest to oldest
         { $sort: { "dateofbirth": -1 } },

         // Stage 3: Limit the results to 3 documents
         { $limit: 3 },

         // Stage 4: Remove unneeded fields
         { $unset: [ "_id", "address"] }
      ] )

   Grove creates a temporary file that chains the two files together, and wraps
   the aggregation pipeline in a ``printjson()`` call for output capture. This
   temporary file resembles:

   .. code-block:: javascript

      // Connect to the test database
      const conn = new Mongo("mongodb://localhost:27017");
      const db = conn.getDB("test");

      // Load the data - contents of `load-data.js`
      db.persons.insertMany( [
         {
            person_id: "6392529400",
            firstname: "Elise",
            lastname: "Smith",
            dateofbirth: new Date("1972-01-13T09:32:07Z"),
            vocation: "ENGINEER",
            address: {
               number: 5625,
               street: "Tipa Circle",
               city: "Wojzinmoj",
            }
         },
         {
            person_id: "1723338115",
            firstname: "Olive",
            lastname: "Ranieri",
            dateofbirth: new Date("1985-05-12T23:14:30Z"),
            gender: "FEMALE",
            vocation: "ENGINEER",
            address: {
               number: 9303,
               street: "Mele Circle",
               city: "Tobihbo",
            }
         }
      ] );

      // Run the aggregation pipeline - contents of `run-pipeline.js`,
      // wrapped in printjson() so we can capture the output of this operation
      printjson( db.persons.aggregate( [
         // Stage 1: Match documents of people who are engineers
         { $match: { "vocation": "ENGINEER" } },

         // Stage 2: Sort documents from youngest to oldest
         { $sort: { "dateofbirth": -1 } },

         // Stage 3: Limit the results to 3 documents
         { $limit: 3 },

         // Stage 4: Remove unneeded fields
         { $unset: [ "_id", "address"] }
      ] ) );

   The first example file is required for the second example file to produce
   the expected output, but does not itself produce output that we want to
   evaluate. The second example file produces the output that we want to
   evaluate - the documents that match the aggregation pipeline. So the Grove
   test utility only wraps the second example file in a ``printjson()`` call.

   When you run the test, Grove executes the temporary file in ``mongosh`` and
   captures the output. It then compares the captured output to the expected
   output from the ``output.sh`` file.
