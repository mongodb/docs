const { execSync } = require("child_process");
const Expect = require("../../../utils/comparison/Expect");


describe("multikey index examples", () => {
   const dbName = "sample_mflix";

   /**
    * Cleanup function to revert index creation from compound-multikey.js
    */
   const cleanupCompoundMultikey = () => {
      const mongoUri = process.env.CONNECTION_STRING;

      const cleanupCommands = `db = db.getSiblingDB('${dbName}'); db.movies.dropIndex({ genres: 1, title: 1 });`;

      const command = `mongosh "${mongoUri}" --eval "${cleanupCommands}"`;

      try {
         execSync(command, { encoding: "utf8" });
      } catch (error) {
         console.error(`Failed to clean up compound multikey index:`, error.message);
      }
   };

   /**
    * Cleanup function to revert index creation from array-field.js
    */
   const cleanupArrayField = () => {
      const mongoUri = process.env.CONNECTION_STRING;

      const cleanupCommands = `db = db.getSiblingDB('${dbName}'); db.movies.dropIndex({ genres: 1 });`;

      const command = `mongosh "${mongoUri}" --eval "${cleanupCommands}"`;

      try {
         execSync(command, { encoding: "utf8" });
      } catch (error) {
         console.error(`Failed to clean up array field index:`, error.message);
      }
   };

   test("Should return confirmation of a created compound multikey index", async () => {
      const exampleFiles = [
         "indexes/multikey/compound-multikey.js"
      ]
      const outputFile = "indexes/multikey/compound-multikey-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .shouldMatch(outputFile);
   });


   test("Should return confirmation of a created compound multikey index on an array field", async () => {
      const exampleFiles = [
         "indexes/multikey/array-field.js"
      ]
      const outputFile = "indexes/multikey/array-field-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .shouldMatch(outputFile);
   });

   test("Should return confirmation of query-1", async () => {
      const exampleFiles = [
         "indexes/multikey/query-1.js"
      ]
      const outputFile = "indexes/multikey/query-1-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .shouldMatch(outputFile);
   });

   test("Should return confirmation of query-2", async () => {
      const exampleFiles = [
         "indexes/multikey/query-2.js"
      ]
      const outputFile = "indexes/multikey/query-2-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .shouldMatch(outputFile);
   });

   test("Should return confirmation of query-3", async () => {
      const exampleFiles = [
         "indexes/multikey/query-3.js"
      ]
      const outputFile = "indexes/multikey/query-3-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .shouldMatch(outputFile);
   });

   test("Should return confirmation of query-4", async () => {
      const exampleFiles = [
         "indexes/multikey/query-4.js"
      ]
      const outputFile = "indexes/multikey/query-4-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .withIgnoredFields("_id", "plot", "runtime", "rated", "cast", "title", "fullplot", "languages", "released", "directors", "writers", "awards", "lastupdated", "year", "imdb", "countries", "type", "tomatoes", "num_mflix_comments", "poster")
         .shouldMatch(outputFile);
   });

});

