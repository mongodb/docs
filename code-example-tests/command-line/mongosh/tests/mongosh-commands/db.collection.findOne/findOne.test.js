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
