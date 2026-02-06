const { execSync } = require("child_process");
const Expect = require("../../../utils/comparison/Expect");

describe("db.collection.update examples", () => {
   const dbName = "sample_mflix";

   /**
    * Generic cleanup function to execute MongoDB commands
    * @param {string} cleanupCommands - MongoDB commands to execute
    * @param {string} errorContext - Context string for error messages
    */
   const runCleanup = (cleanupCommands, errorContext) => {
      const mongoUri = process.env.CONNECTION_STRING;
      const command = `mongosh "${mongoUri}" --quiet --eval '${cleanupCommands}'`;

      try {
         execSync(command, { encoding: "utf8" });
      } catch (error) {
         console.error(`Failed to clean up ${errorContext}:`, error.message);
      }
   };

   test("Should update multiple documents", async () => {
      const exampleFiles = [
         "mongosh-commands/db.collection.update/update-multiple.js"
      ];
      const outputFile = "mongosh-commands/db.collection.update/update-multiple-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .shouldMatch(outputFile);

      runCleanup(`db = db.getSiblingDB("${dbName}"); db.movies.updateMany({ title: { $in: ["The Godfather", "The Matrix"] } }, { $unset: { test_field: "", test_upsert_field: "" } });`, 'update-multiple');
   });

   test("Should update with array filters matching pattern", async () => {
      const exampleFiles = [
         "mongosh-commands/db.collection.update/arrayfilters-match.js"
      ];
      const outputFile = "mongosh-commands/db.collection.update/arrayfilters-match-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .shouldMatch(outputFile);

      runCleanup(`db = db.getSiblingDB("${dbName}"); db.movies.updateMany({ languages: "EN" }, { $set: { "languages.$[element]": "English" } }, { arrayFilters: [ { "element": "EN" } ] });`, 'arrayfilters-match');
   });

   test("Should remove fields from document", async () => {
      const exampleFiles = [
         "mongosh-commands/db.collection.update/remove-fields.js"
      ];
      const outputFile = "mongosh-commands/db.collection.update/remove-fields-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .shouldMatch(outputFile);

      runCleanup(`db = db.getSiblingDB("${dbName}"); db.movies.updateOne({ title: "The Godfather" }, { $set: { metacritic: 100 } });`, 'remove-fields');
   });

   test("Should upsert with $set", async () => {
      const exampleFiles = [
         "mongosh-commands/db.collection.update/upsert-with-set.js"
      ];
      const outputFile = "mongosh-commands/db.collection.update/upsert-with-set-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .withIgnoredFields("insertedId", "_id")
         .shouldMatch(outputFile);

      runCleanup(`db = db.getSiblingDB("${dbName}"); db.movies.deleteMany({ title: { $in: ["Test Movie 67890", "Test Movie ABC123", "Test Movie XYZ999", "Test Movie 12345", "Test Movie Unique789"] } });`, 'upsert');
   });

   test("Should upsert with no match", async () => {
      const exampleFiles = [
         "mongosh-commands/db.collection.update/upsert-no-match.js"
      ];
      const outputFile = "mongosh-commands/db.collection.update/upsert-no-match-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .withIgnoredFields("insertedId", "_id")
         .shouldMatch(outputFile);

      runCleanup(`db = db.getSiblingDB("${dbName}"); db.movies.deleteMany({ title: { $in: ["Test Movie 67890", "Test Movie ABC123", "Test Movie XYZ999", "Test Movie 12345", "Test Movie Unique789"] } });`, 'upsert');
   });

   test("Should upsert with replacement document", async () => {
      const exampleFiles = [
         "mongosh-commands/db.collection.update/upsert-with-replacement.js"
      ];
      const outputFile = "mongosh-commands/db.collection.update/upsert-with-replacement-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .withIgnoredFields("insertedId", "_id")
         .shouldMatch(outputFile);

      runCleanup(`db = db.getSiblingDB("${dbName}"); db.movies.deleteMany({ title: { $in: ["Test Movie 67890", "Test Movie ABC123", "Test Movie XYZ999", "Test Movie 12345", "Test Movie Unique789"] } });`, 'upsert');
   });

   test("Should upsert with multi option", async () => {
      const exampleFiles = [
         "mongosh-commands/db.collection.update/upsert-with-multi.js"
      ];
      const outputFile = "mongosh-commands/db.collection.update/upsert-with-multi-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .withIgnoredFields("insertedId", "_id")
         .shouldMatch(outputFile);

      runCleanup(`db = db.getSiblingDB("${dbName}"); db.movies.updateMany({ title: { $in: ["The Godfather", "The Matrix"] } }, { $unset: { test_field: "", test_upsert_field: "" } });`, 'update-multiple');
   });

   test("Should upsert with aggregation pipeline", async () => {
      const exampleFiles = [
         "mongosh-commands/db.collection.update/upsert-with-aggregation.js"
      ];
      const outputFile = "mongosh-commands/db.collection.update/upsert-with-aggregation-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .withIgnoredFields("insertedId", "_id")
         .shouldMatch(outputFile);

      runCleanup(`db = db.getSiblingDB("${dbName}"); db.movies.deleteMany({ title: { $in: ["Test Movie 67890", "Test Movie ABC123", "Test Movie XYZ999", "Test Movie 12345", "Test Movie Unique789"] } });`, 'upsert');
   });

   test("Should update existing array", async () => {
      const exampleFiles = [
         "mongosh-commands/db.collection.update/existing-array.js"
      ];
      const outputFile = "mongosh-commands/db.collection.update/existing-array-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .shouldMatch(outputFile);

      runCleanup(`db = db.getSiblingDB("${dbName}"); db.movies.updateOne({ $or: [{ title: "The Matrix" }, { title: "The Matrix Reloaded", year: 1999 }] }, { $pull: { genres: "Thriller" } });`, 'existing-array');
   });

   test("Should update with pattern matching", async () => {
      const exampleFiles = [
         "mongosh-commands/db.collection.update/pattern-matching.js"
      ];
      const outputFile = "mongosh-commands/db.collection.update/pattern-matching-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .shouldMatch(outputFile);

      runCleanup(`db = db.getSiblingDB("${dbName}"); db.movies.updateOne({ title: "The Godfather" }, { $set: { writers: ["Mario Puzo (screenplay)", "Francis Ford Coppola (screenplay)", "Mario Puzo (novel)"] } });`, 'pattern-matching');
   });

   test("Should update with operator expressions", async () => {
      const exampleFiles = [
         "mongosh-commands/db.collection.update/update-operator-expressions.js"
      ];
      const outputFile = "mongosh-commands/db.collection.update/update-operator-expressions-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .shouldMatch(outputFile);

      runCleanup(`db = db.getSiblingDB("${dbName}"); db.movies.updateOne({ title: "The Godfather" }, { $set: { "tomatoes.viewer.numReviews": 725773, "tomatoes.viewer.meter": 98 } });`, 'update-operator-expressions');
   });

   test("Should update with let option", async () => {
      const exampleFiles = [
         "mongosh-commands/db.collection.update/let.js"
      ];
      const outputFile = "mongosh-commands/db.collection.update/let-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .shouldMatch(outputFile);

      runCleanup(`db = db.getSiblingDB("${dbName}"); db.movies.updateOne({ title: "The Matrix" }, { $unset: { sequel: "" } });`, 'let');
   });

   test("Should update with conditional logic", async () => {
      const exampleFiles = [
         "mongosh-commands/db.collection.update/conditional-updates.js"
      ];
      const outputFile = "mongosh-commands/db.collection.update/conditional-updates-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .shouldMatch(outputFile);

      runCleanup(`db = db.getSiblingDB("${dbName}"); db.movies.updateMany({ year: 2015 }, { $unset: { combinedScore: "", grade: "", lastUpdate: "" } });`, 'conditional-updates');
   });

   test("Should update with collation", async () => {
      const exampleFiles = [
         "mongosh-commands/db.collection.update/collation.js"
      ];
      const outputFile = "mongosh-commands/db.collection.update/collation-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .withIgnoredFields("_id")
         .shouldMatch(outputFile);

      runCleanup(`db = db.getSiblingDB("${dbName}"); db.movies.updateMany({ title: /^night/i }, { $unset: { updated: "" } });`, 'collation');
   });

   test("Should modify document with aggregation pipeline using field references", async () => {
      const exampleFiles = [
         "mongosh-commands/db.collection.update/modify-with-field.js"
      ];
      const outputFile = "mongosh-commands/db.collection.update/modify-with-field-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .withIgnoredFields("_id")
         .shouldMatch(outputFile);

      runCleanup(`db = db.getSiblingDB("${dbName}"); db.movies.updateOne({ title: "The Godfather" }, { $unset: { displayTitle: "", lastModified: "" } });`, 'modify-with-field');
   });

   test.skip("Should update with write concern", async () => {
      // Skipped: write concern w > 1 requires a replicated host
      const exampleFiles = [
         "mongosh-commands/db.collection.update/write-concern.js"
      ];
      const outputFile = "mongosh-commands/db.collection.update/write-concern-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .withIgnoredFields("_id")
         .shouldMatch(outputFile);

      runCleanup(`db = db.getSiblingDB("${dbName}"); db.movies.updateMany({ num_mflix_comments: { $lte: 10 } }, { $unset: { featured: "" } });`, 'write-concern');
   });

   test("Should update with hint", async () => {
      runCleanup(`db = db.getSiblingDB("${dbName}"); try { db.movies.dropIndex({ year: 1 }); } catch(e) {} try { db.movies.dropIndex({ num_mflix_comments: 1 }); } catch(e) {}`, 'indexes');
      const exampleFiles = [
         "mongosh-commands/db.collection.update/create-index.js",
         "mongosh-commands/db.collection.update/hint.js"
      ];
      const outputFile = "mongosh-commands/db.collection.update/hint-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .shouldMatch(outputFile);

      runCleanup(`db = db.getSiblingDB("${dbName}"); db.movies.updateMany({ year: { $gte: 2010, $lte: 2015 } }, { $unset: { decade: "" } });`, 'hint');
      runCleanup(`db = db.getSiblingDB("${dbName}"); try { db.movies.dropIndex({ year: 1 }); } catch(e) {} try { db.movies.dropIndex({ num_mflix_comments: 1 }); } catch(e) {}`, 'indexes');
   });

   test("Should explain update operation", async () => {
      runCleanup(`db = db.getSiblingDB("${dbName}"); try { db.movies.dropIndex({ year: 1 }); } catch(e) {} try { db.movies.dropIndex({ num_mflix_comments: 1 }); } catch(e) {}`, 'indexes');
      const exampleFiles = [
         "mongosh-commands/db.collection.update/create-index.js",
         "mongosh-commands/db.collection.update/explain.js"
      ];
      const outputFile = "mongosh-commands/db.collection.update/explain-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .shouldMatch(outputFile);

      runCleanup(`db = db.getSiblingDB("${dbName}"); try { db.movies.dropIndex({ year: 1 }); } catch(e) {} try { db.movies.dropIndex({ num_mflix_comments: 1 }); } catch(e) {}`, 'indexes');
   });

});
