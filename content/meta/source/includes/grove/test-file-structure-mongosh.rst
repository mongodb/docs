Mongosh tests use `Jest <https://jestjs.io/>`__ but with
a different ``Expect`` API. Examples run as subprocesses
rather than function calls:

.. code-block:: javascript

   // Import the mongosh-specific Expect utility
   const Expect =
     require("../../utils/comparison/Expect");

   describe("Movie queries", () => {
     test("finds movies by year", async () => {
       // Run + Assert: execute the example file
       // and compare stdout to expected output
       await Expect
         .outputFromExampleFiles([
           "topic/find-by-year.js"
         ])
         // Specify the target database
         .withDbName("sample_mflix")
         // Skip dynamic fields
         .withIgnoredFields("_id")
         // Compare to expected output file
         .shouldMatch(
           "topic/find-by-year-output.sh"
         );
     });
   });

Key differences from driver suites:

- Use ``Expect.outputFromExampleFiles()`` instead of
  ``Expect.that()``. This runs example files through
  ``mongosh --file`` and captures stdout.
- Requires ``.withDbName()`` to specify the database.
- Uses CommonJS ``require`` instead of ES module
  ``import``.
