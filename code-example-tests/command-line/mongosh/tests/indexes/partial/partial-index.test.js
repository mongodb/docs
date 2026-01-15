const { execSync } = require("child_process");
const Expect = require("../../../utils/comparison/Expect");

describe("partial index examples", () => {
   const dbName = "sample_mflix";

   /**
    * Cleanup function to revert index creation from create-1.js
    */
   /**
    * Idempotent cleanup function that removes all indexes and documents created by tests.
    * Safe to call even if indexes/documents don't exist.
    */
   const cleanupAllState = () => {
      const mongoUri = process.env.CONNECTION_STRING;

      // Use try/catch for each operation to make cleanup idempotent
      const cleanupCommands = `
         db = db.getSiblingDB('${dbName}');
         try { db.movies.dropIndex({ title: 1 }); } catch(e) {}
         try { db.movies.dropIndex({ title: 1, genres: 1 }); } catch(e) {}
         try { db.users.dropIndex('name_1'); } catch(e) {}
         try { db.users.dropIndex('name_partial_unique_idx'); } catch(e) {}
         try { db.users.deleteMany({ email: { \\$in: ['jon1@example.com', 'sansa@example.com', 'jon2@example.com'] } }); } catch(e) {}
      `;

      const command = `mongosh "${mongoUri}" --eval "${cleanupCommands}"`;

      try {
         execSync(command, { encoding: "utf8" });
      } catch (error) {
         // Silently ignore cleanup errors - state may not exist
      }
   };

   // Ensure clean state before each test
   beforeEach(() => {
      cleanupAllState();
   });

   // Clean up after each test
   afterEach(() => {
      cleanupAllState();
   });

   test("Should return confirmation of a created partial index (create-1)", async () => {
      const exampleFiles = [
         "indexes/partial/create-1.js"
      ]
      const outputFile = "indexes/partial/create-1-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .shouldMatch(outputFile);
   });

   test("Should return confirmation of a created partial index (create-2)", async () => {
      const exampleFiles = [
         "indexes/partial/create-2.js"
      ]
      const outputFile = "indexes/partial/create-2-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .shouldMatch(outputFile);
   });

   test("Should return confirmation of query-1", async () => {
      const exampleFiles = [
         "indexes/partial/query-1.js"
      ]
      const outputFile = "indexes/partial/query-1-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .shouldMatch(outputFile);
   });

   test("Should return confirmation of query-2", async () => {
      const exampleFiles = [
         "indexes/partial/query-2.js"
      ]
      const outputFile = "indexes/partial/query-2-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .withIgnoredFields("_id") 
         .shouldMatch(outputFile);
   });

   test("Should return confirmation of query-3", async () => {
      const exampleFiles = [
         "indexes/partial/query-3.js"
      ]
      const outputFile = "indexes/partial/query-3-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .withIgnoredFields("_id") 
         .shouldMatch(outputFile);
   });

   test("Should return confirmation of a created partial index (create-3)", async () => {
      const exampleFiles = [
         "indexes/partial/create-3.js"
      ]
      const outputFile = "indexes/partial/create-3-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .shouldMatch(outputFile);
   });

   test("Should return confirmation of query-4", async () => {
      const exampleFiles = [
         "indexes/partial/query-4.js"
      ]
      const outputFile = "indexes/partial/query-4-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .withIgnoredFields("_id") 
         .shouldMatch(outputFile);
   });

   test("Should return confirmation of query-5", async () => {
      const exampleFiles = [
         "indexes/partial/query-5.js"
      ]
      const outputFile = "indexes/partial/query-5-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .shouldMatch(outputFile);
   });

   test("Should return confirmation of a created partial index (create-4)", async () => {
      const exampleFiles = [
         "indexes/partial/create-4.js"
      ]
      const outputFile = "indexes/partial/create-4-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .shouldMatch(outputFile);
   });

   test("Should return confirmation of a created partial index (create-5)", async () => {
      const exampleFiles = [
         "indexes/partial/create-5.js"
      ]
      const outputFile = "indexes/partial/create-5-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .shouldMatch(outputFile);
   });

   test("Should return confirmation of query-6", async () => {
      const exampleFiles = [
         "indexes/partial/query-6.js"
      ]
      const outputFile = "indexes/partial/query-6-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .shouldMatch(outputFile);
   });

   test("Should return confirmation of query-7", async () => {
      const exampleFiles = [
         "indexes/partial/query-7.js"
      ]
      const outputFile = "indexes/partial/query-7-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .shouldMatch(outputFile);
   });

   test("Should return confirmation of a created partial index (create-6)", async () => {
      const exampleFiles = [
         "indexes/partial/create-6.js"
      ]
      const outputFile = "indexes/partial/create-6-output.js";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .shouldMatch(outputFile);
   });

   test("Should return confirmation of document insertion", async () => {
      const exampleFiles = [
         "indexes/partial/insert.js"
      ]
      const outputFile = "indexes/partial/insert-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .withIgnoredFields("insertedIds") 
         .shouldMatch(outputFile);
   });

});
