const Expect = require("../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../utils/sampleDataChecker");

const dbName = "sample_mflix";

describeWithSampleData("db.collection.findOne examples", () => {

   test("Should return one document with empty query", async () => {
      const exampleFiles = [
         "mongosh-commands/db.collection.findOne/empty-specification.js"
      ];
      const outputFile = "mongosh-commands/db.collection.findOne/empty-specification-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .shouldMatch(outputFile);
   });

   test("Should return one document with query specification", async () => {
      const exampleFiles = [
         "mongosh-commands/db.collection.findOne/query-specification.js"
      ];
      const outputFile = "mongosh-commands/db.collection.findOne/query-specification-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .shouldMatch(outputFile);
   });

   test("Should return specified fields", async () => {
      const exampleFiles = [
         "mongosh-commands/db.collection.findOne/specify-return-fields.js"
      ];
      const outputFile = "mongosh-commands/db.collection.findOne/specify-return-fields-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .shouldMatch(outputFile);
   });

   test("Should exclude specified fields", async () => {
      const exampleFiles = [
         "mongosh-commands/db.collection.findOne/exclude-return-fields.js"
      ];
      const outputFile = "mongosh-commands/db.collection.findOne/exclude-return-fields-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .shouldMatch(outputFile);
   });

   test("Should return one document with sort option", async () => {
      const exampleFiles = [
         "mongosh-commands/db.collection.findOne/use-option.js"
      ];
      const outputFile = "mongosh-commands/db.collection.findOne/use-option-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .shouldMatch(outputFile);
   });

   test("Should return one document using let option", async () => {
      const exampleFiles = [
         "mongosh-commands/db.collection.findOne/use-let.js"
      ];
      const outputFile = "mongosh-commands/db.collection.findOne/use-let-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .shouldMatch(outputFile);
   });

   /*
      This test is skipped because result-document.js is a multi-statement
      example (var declarations + an if block with print()) and the test
      harness wraps the whole file in printjson(...), producing invalid
      JavaScript:
          printjson(var myDocument = db.movies.findOne(); ...)

      To re-enable this test, either rewrite the example as a single
      expression (e.g., db.movies.findOne().title) and update the expected
      output to the JSON-stringified form, or extend the harness to skip
      the printjson() wrap when the example already has its own print()
      calls.
   */
   test.skip("Should access fields from findOne result document", async () => {
      const exampleFiles = [
         "mongosh-commands/db.collection.findOne/result-document.js"
      ];
      const outputFile = "mongosh-commands/db.collection.findOne/result-document-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .shouldMatch(outputFile);
   });
}, dbName);
