const { execSync } = require("child_process");
const Expect = require("../../../utils/comparison/Expect");

describe("unique index examples", () => {
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
         try { db.users.dropIndex('email_1'); } catch(e) {}
         try { db.users.dropIndex('name_1_email_1_password_1'); } catch(e) {}
         try { db.users.dropIndex('email_1_name_1'); } catch(e) {}
         try { db.users.dropIndex('basic_index'); } catch(e) {}
         try { db.users.dropIndex('unique_index'); } catch(e) {}
         try { db.users.deleteMany({ email: { \\$in: ['catelyn@gameofthron.es', 'sean_bean@gameofthron.es'] } }); } catch(e) {}
         try { db.users.deleteOne({ _id: ObjectId('59b99db4cfa9a34dcd7885b9') }); } catch(e) {}
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

   test("Should return confirmation of a created unique index (create-1)", async () => {
      const exampleFiles = [
         "indexes/unique/create-1.js"
      ]
      const outputFile = "indexes/unique/create-1-output.js";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .shouldMatch(outputFile);
   });

   test("Should return confirmation of a created unique compound index (create-2)", async () => {
      const exampleFiles = [
         "indexes/unique/create-2.js"
      ]
      const outputFile = "indexes/unique/create-2-output.js";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .shouldMatch(outputFile);
   });

   test("Should return confirmation of a created unique compound index (create-3)", async () => {
      const exampleFiles = [
         "indexes/unique/create-3.js"
      ]
      const outputFile = "indexes/unique/create-3-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .shouldMatch(outputFile);
   });

   test("Should return confirmation of document insertion (insert-1)", async () => {
      const exampleFiles = [
         "indexes/unique/insert-1.js"
      ]
      const outputFile = "indexes/unique/insert-1-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .withIgnoredFields("insertedIds") 
         .shouldMatch(outputFile);
   });

   test("Should return confirmation of document insertion (insert-2)", async () => {
      const exampleFiles = [
         "indexes/unique/insert-2.js"
      ]
      const outputFile = "indexes/unique/insert-2-output.js";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .withIgnoredFields("insertedId") 
         .shouldMatch(outputFile);
   });

   test("Should return confirmation of a created unique index (create-4)", async () => {
      const exampleFiles = [
         "indexes/unique/create-4.js"
      ]
      const outputFile = "indexes/unique/create-4-output.js";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .shouldMatch(outputFile);
   });

   test("Should return confirmation of a created basic index (create-5)", async () => {
      const exampleFiles = [
         "indexes/unique/create-5.js"
      ]
      const outputFile = "indexes/unique/create-5-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .shouldMatch(outputFile);
   });

   test("Should return confirmation of a created unique index (create-6)", async () => {
      const exampleFiles = [
         "indexes/unique/create-6.js"
      ]
      const outputFile = "indexes/unique/create-6-output.js";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .shouldMatch(outputFile);
   });

});
