const { execSync } = require("child_process");
const Expect = require("../../../utils/comparison/Expect");

describe("sparse index examples", () => {
   const dbName = "sample_mflix";

   /**
    * Idempotent cleanup function that removes all indexes and documents created by tests.
    * Safe to call even if indexes/documents don't exist.
    */
   const cleanupAllState = () => {
      const mongoUri = process.env.CONNECTION_STRING;
      // Use try/catch for each operation to make cleanup idempotent
      const cleanupCommands = `
         db = db.getSiblingDB('${dbName}');
         try { db.movies.dropIndex('plot_1'); } catch(e) {}
         try { db.movies.dropIndex('rated_1'); } catch(e) {}
         try { db.users.dropIndex('password_1'); } catch(e) {}
         try { db.users.dropIndex('unique_index'); } catch(e) {}
         try { db.users.dropIndex('unique_sparse_index'); } catch(e) {}
         try { db.users.dropIndex('sparse_index'); } catch(e) {}
         try { db.users.dropIndex('basic_index'); } catch(e) {}
         try { db.users.deleteMany({ email: { \\$in: ['jon@gameofthron.es', 'sansa@gameofthron.es', 'bran@gameofthron.es'] } }); } catch(e) {}
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

   test("Should return confirmation of a created sparse index (create-1)", async () => {
      const exampleFiles = [
         "indexes/sparse/create-1.js"
      ]
      const outputFile = "indexes/sparse/create-1-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .shouldMatch(outputFile);
   });

   test("Should return confirmation of a created sparse index (create-2)", async () => {
      const exampleFiles = [
         "indexes/sparse/create-2.js"
      ]
      const outputFile = "indexes/sparse/create-2-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .shouldMatch(outputFile);
   });

   test("Should return confirmation of query-1", async () => {
      const exampleFiles = [
         "indexes/sparse/query-1.js"
      ]
      const outputFile = "indexes/sparse/query-1-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .withIgnoredFields("_id", "name", "email", "password")  // Only verify structure
         .shouldMatch(outputFile);
   });

   test("Should return confirmation of a created sparse and unique index (create-4)", async () => {
      const exampleFiles = [
         "indexes/sparse/create-4.js"
      ]
      const outputFile = "indexes/sparse/create-4-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .shouldMatch(outputFile);
   });

   test("Should return confirmation of document insertion", async () => {
      const exampleFiles = [
         "indexes/sparse/insert.js"
      ]
      const outputFile = "indexes/sparse/insert-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .withIgnoredFields("insertedIds") 
         .shouldMatch(outputFile);
   });

   test("Should return confirmation of a created unique index (create-5)", async () => {
      const exampleFiles = [
         "indexes/sparse/create-5.js"
      ]
      const outputFile = "indexes/sparse/create-5-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .shouldMatch(outputFile);
   });

   test("Should return confirmation of a created sparse and unique index (create-6)", async () => {
      const exampleFiles = [
         "indexes/sparse/create-6.js"
      ]
      const outputFile = "indexes/sparse/create-6-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .shouldMatch(outputFile);
   });

   test("Should return confirmation of a created sparse index (create-7)", async () => {
      const exampleFiles = [
         "indexes/sparse/create-7.js"
      ]
      const outputFile = "indexes/sparse/create-7-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .shouldMatch(outputFile);
   });

   test("Should return confirmation of a created basic index (create-8)", async () => {
      const exampleFiles = [
         "indexes/sparse/create-8.js"
      ]
      const outputFile = "indexes/sparse/create-8-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .shouldMatch(outputFile);
   });

   test("Should return confirmation of a created sparse index (create-9)", async () => {
      const exampleFiles = [
         "indexes/sparse/create-9.js"
      ]
      const outputFile = "indexes/sparse/create-9-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .shouldMatch(outputFile);
   });

   test("Should return confirmation of query-4", async () => {
      const exampleFiles = [
         "indexes/sparse/create-9.js",
         "indexes/sparse/query-4.js"
      ]
      const outputFile = "indexes/sparse/query-4-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .shouldMatch(outputFile);
   });

   test("Should return confirmation of query-5", async () => {
      const exampleFiles = [
         "indexes/sparse/query-5.js"
      ]
      const outputFile = "indexes/sparse/query-5-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .shouldMatch(outputFile);
   });

});
