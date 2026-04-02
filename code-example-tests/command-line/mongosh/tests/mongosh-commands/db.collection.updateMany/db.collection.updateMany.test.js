const Expect = require("../../../utils/comparison/Expect");
const { execSync } = require("child_process");
const { describeWithSampleData } = require("../../../utils/sampleDataChecker");

describe("db.collection.updateMany() tests", () => {
   const dbName = "sample_mflix";

   describeWithSampleData("db.collection.updateMany examples", () => {

      // Track cleanup function for current test - ensures cleanup runs even if test fails
      let currentCleanup = null;

      afterEach(() => {
         if (currentCleanup) {
            currentCleanup();
            currentCleanup = null;
         }
      });

      // Clean up any leftover fields from other test files before running this suite
      beforeAll(() => {
         const mongoUri = process.env.CONNECTION_STRING;
         const cleanupCommands = `db = db.getSiblingDB("${dbName}"); db.movies.updateMany({}, { $unset: { ratings: "", ratingDetails: "", combinedRatings: "", ratingsUpdated: "", combinedScore: "", scoreUpdated: "", ratingGrade: "", popular: "", genreNormalized: "", familyFriendly: "", ratingBoosted: "", featured: "", trending: "", upcomingRelease: "" } }); db.movies.updateOne({ title: "The Godfather" }, { $set: { num_mflix_comments: 131 } }); db.movies.deleteMany({ upcomingRelease: { $exists: true } });`;
         const command = `mongosh "${mongoUri}" --quiet --eval '${cleanupCommands}'`;

         try {
            execSync(command, { encoding: "utf8" });
         } catch (error) {
            console.error(`Failed to clean up before tests:`, error.message);
         }
      });

      // Clean up all leftover fields after this suite to not affect other test files
      afterAll(() => {
         const mongoUri = process.env.CONNECTION_STRING;
         const cleanupCommands = `db = db.getSiblingDB("${dbName}"); db.movies.updateMany({}, { $unset: { ratings: "", ratingDetails: "", combinedRatings: "", ratingsUpdated: "", combinedScore: "", scoreUpdated: "", ratingGrade: "", popular: "", genreNormalized: "", familyFriendly: "", ratingBoosted: "", featured: "", trending: "", upcomingRelease: "" } }); db.movies.updateOne({ title: "The Godfather" }, { $set: { num_mflix_comments: 131 } }); db.movies.deleteMany({ upcomingRelease: { $exists: true } });`;
         const command = `mongosh "${mongoUri}" --quiet --eval '${cleanupCommands}'`;

         try {
            execSync(command, { encoding: "utf8" });
         } catch (error) {
            console.error(`Failed to clean up after tests:`, error.message);
         }
      });

      /**
       * Cleanup function for update-multiple.js
       * Removes popular field
       */
      const cleanupUpdateMultiple = () => {
         const mongoUri = process.env.CONNECTION_STRING;
         const cleanupCommands = `db = db.getSiblingDB("${dbName}"); db.movies.updateMany({}, { $unset: { popular: "" } });`;
         const command = `mongosh "${mongoUri}" --quiet --eval '${cleanupCommands}'`;

         try {
            execSync(command, { encoding: "utf8" });
         } catch (error) {
            console.error(`Failed to clean up update-multiple:`, error.message);
         }
      };

      /**
       * Cleanup function for aggregation-pipeline-1.js
       * Restores imdb.rating and tomatoes.viewer.rating from combinedRatings, removes combinedRatings and ratingsUpdated
       */
      const cleanupAggregationPipeline1 = () => {
         const mongoUri = process.env.CONNECTION_STRING;
         const cleanupCommands = `db = db.getSiblingDB("${dbName}"); db.movies.updateMany({ combinedRatings: { $exists: true } }, [{ $set: { "imdb.rating": { $arrayElemAt: ["$combinedRatings", 0] }, "tomatoes.viewer.rating": { $arrayElemAt: ["$combinedRatings", 1] } } }, { $unset: ["combinedRatings", "ratingsUpdated"] }]);`;
         const command = `mongosh "${mongoUri}" --quiet --eval '${cleanupCommands}'`;

         try {
            execSync(command, { encoding: "utf8" });
         } catch (error) {
            console.error(`Failed to clean up aggregation-pipeline-1:`, error.message);
         }
      };

      /**
       * Cleanup function for aggregation-pipeline-2.js
       * Removes combinedScore, scoreUpdated, and ratingGrade fields
       */
      const cleanupAggregationPipeline2 = () => {
         const mongoUri = process.env.CONNECTION_STRING;
         const cleanupCommands = `db = db.getSiblingDB("${dbName}"); db.movies.updateMany({}, { $unset: { combinedScore: "", scoreUpdated: "", ratingGrade: "" } });`;
         const command = `mongosh "${mongoUri}" --quiet --eval '${cleanupCommands}'`;

         try {
            execSync(command, { encoding: "utf8" });
         } catch (error) {
            console.error(`Failed to clean up aggregation-pipeline-2:`, error.message);
         }
      };

      /**
       * Cleanup function for array-filters-1.js
       * Removes ratings array from movies
       */
      const cleanupArrayFilters1 = () => {
         const mongoUri = process.env.CONNECTION_STRING;
         const cleanupCommands = `db = db.getSiblingDB("${dbName}"); db.movies.updateMany({}, { $unset: { ratings: "" } });`;
         const command = `mongosh "${mongoUri}" --quiet --eval '${cleanupCommands}'`;

         try {
            execSync(command, { encoding: "utf8" });
         } catch (error) {
            console.error(`Failed to clean up array-filters-1:`, error.message);
         }
      };

      /**
       * Cleanup function for array-filters-2.js
       * Removes ratingDetails array from movies
       */
      const cleanupArrayFilters2 = () => {
         const mongoUri = process.env.CONNECTION_STRING;
         const cleanupCommands = `db = db.getSiblingDB("${dbName}"); db.movies.updateMany({}, { $unset: { ratingDetails: "" } });`;
         const command = `mongosh "${mongoUri}" --quiet --eval '${cleanupCommands}'`;

         try {
            execSync(command, { encoding: "utf8" });
         } catch (error) {
            console.error(`Failed to clean up array-filters-2:`, error.message);
         }
      };

      /**
       * Cleanup function for collation.js
       * Removes genreNormalized field
       */
      const cleanupCollation = () => {
         const mongoUri = process.env.CONNECTION_STRING;
         const cleanupCommands = `db = db.getSiblingDB("${dbName}"); db.movies.updateMany({}, { $unset: { genreNormalized: "" } });`;
         const command = `mongosh "${mongoUri}" --quiet --eval '${cleanupCommands}'`;

         try {
            execSync(command, { encoding: "utf8" });
         } catch (error) {
            console.error(`Failed to clean up collation:`, error.message);
         }
      };

      /**
       * Cleanup function for hint.js
       * Removes familyFriendly field and drops the index
       */
      const cleanupHint = () => {
         const mongoUri = process.env.CONNECTION_STRING;
         const cleanupCommands = `db = db.getSiblingDB("${dbName}"); db.movies.updateMany({}, { $unset: { familyFriendly: "" } }); try { db.movies.dropIndex({ rated: 1 }); } catch(e) {}`;
         const command = `mongosh "${mongoUri}" --quiet --eval '${cleanupCommands}'`;

         try {
            execSync(command, { encoding: "utf8" });
         } catch (error) {
            console.error(`Failed to clean up hint:`, error.message);
         }
      };

      /**
       * Cleanup function for upsert.js
       * Deletes the upserted document. The upsert creates a document with only
       * the equality filter fields (directors) and $set fields (upcomingRelease)
       * since the $gt condition on year is not equality and is excluded.
       */
      const cleanupUpsert = () => {
         const mongoUri = process.env.CONNECTION_STRING;
         const cleanupCommands = `db = db.getSiblingDB("${dbName}"); db.movies.deleteMany({ upcomingRelease: { $exists: true } });`;
         const command = `mongosh "${mongoUri}" --quiet --eval '${cleanupCommands}'`;

         try {
            execSync(command, { encoding: "utf8" });
         } catch (error) {
            console.error(`Failed to clean up upsert:`, error.message);
         }
      };

      /**
       * Cleanup function for write-concern.js
       * Removes trending field and resets num_mflix_comments to original value
       */
      const cleanupWriteConcern = () => {
         const mongoUri = process.env.CONNECTION_STRING;
         const cleanupCommands = `db = db.getSiblingDB("${dbName}"); db.movies.updateOne({ title: "The Godfather" }, { $unset: { trending: "" }, $set: { num_mflix_comments: 131 } });`;
         const command = `mongosh "${mongoUri}" --quiet --eval '${cleanupCommands}'`;

         try {
            execSync(command, { encoding: "utf8" });
         } catch (error) {
            console.error(`Failed to clean up write-concern:`, error.message);
         }
      };

      /**
       * Cleanup function for idempotent.js
       * Decrements imdb.rating back and removes ratingBoosted field
       */
      const cleanupIdempotent = () => {
         const mongoUri = process.env.CONNECTION_STRING;
         const cleanupCommands = `db = db.getSiblingDB("${dbName}"); db.movies.updateMany({ ratingBoosted: true }, { $inc: { "imdb.rating": -0.5 }, $unset: { ratingBoosted: "" } });`;
         const command = `mongosh "${mongoUri}" --quiet --eval '${cleanupCommands}'`;

         try {
            execSync(command, { encoding: "utf8" });
         } catch (error) {
            console.error(`Failed to clean up idempotent:`, error.message);
         }
      };

      test("Should update multiple documents", async () => {
         currentCleanup = cleanupUpdateMultiple; // Runs cleanup function after test even if test fails
         const exampleFiles = [
            "mongosh-commands/db.collection.updateMany/update-multiple.js"
         ];
         const outputFile = "mongosh-commands/db.collection.updateMany/update-multiple-output.sh";

         await Expect
            .outputFromExampleFiles(exampleFiles)
            .withDbName(dbName)
            .shouldMatch(outputFile);
      });

      test("Should update with aggregation pipeline - combine and remove fields", async () => {
         currentCleanup = cleanupAggregationPipeline1; // Runs cleanup function after test even if test fails
         const exampleFiles = [
            "mongosh-commands/db.collection.updateMany/aggregation-pipeline-1.js"
         ];
         const outputFile = "mongosh-commands/db.collection.updateMany/aggregation-pipeline-1-output.sh";

         await Expect
            .outputFromExampleFiles(exampleFiles)
            .withDbName(dbName)
            .shouldMatch(outputFile);
      });

      test("Should update with aggregation pipeline - calculate and grade", async () => {
         currentCleanup = cleanupAggregationPipeline2; // Runs cleanup function after test even if test fails
         const exampleFiles = [
            "mongosh-commands/db.collection.updateMany/aggregation-pipeline-2.js"
         ];
         const outputFile = "mongosh-commands/db.collection.updateMany/aggregation-pipeline-2-output.sh";

         await Expect
            .outputFromExampleFiles(exampleFiles)
            .withDbName(dbName)
            .shouldMatch(outputFile);
      });

      test("Should update with array filters - setup and filter", async () => {
         currentCleanup = cleanupArrayFilters1; // Runs cleanup function after test even if test fails
         const exampleFiles = [
            "mongosh-commands/db.collection.updateMany/array-filters-setup.js",
            "mongosh-commands/db.collection.updateMany/array-filters-1.js"
         ];
         const outputFile = "mongosh-commands/db.collection.updateMany/array-filters-1-output.sh";

         await Expect
            .outputFromExampleFiles(exampleFiles)
            .withDbName(dbName)
            .shouldMatch(outputFile);
      });

      test("Should update with array filters - nested fields", async () => {
         currentCleanup = cleanupArrayFilters2; // Runs cleanup function after test even if test fails
         const exampleFiles = [
            "mongosh-commands/db.collection.updateMany/array-filters-2-setup.js",
            "mongosh-commands/db.collection.updateMany/array-filters-2.js"
         ];
         const outputFile = "mongosh-commands/db.collection.updateMany/array-filters-2-output.sh";

         await Expect
            .outputFromExampleFiles(exampleFiles)
            .withDbName(dbName)
            .shouldMatch(outputFile);
      });

      test("Should update with collation", async () => {
         currentCleanup = cleanupCollation; // Runs cleanup function after test even if test fails
         const exampleFiles = [
            "mongosh-commands/db.collection.updateMany/collation.js"
         ];
         const outputFile = "mongosh-commands/db.collection.updateMany/collation-output.sh";

         await Expect
            .outputFromExampleFiles(exampleFiles)
            .withDbName(dbName)
            .shouldMatch(outputFile);
      });

      test("Should update with hint", async () => {
         currentCleanup = cleanupHint; // Runs cleanup function after test even if test fails
         const exampleFiles = [
            "mongosh-commands/db.collection.updateMany/hint-setup.js",
            "mongosh-commands/db.collection.updateMany/hint.js"
         ];
         const outputFile = "mongosh-commands/db.collection.updateMany/hint-output.sh";

         await Expect
            .outputFromExampleFiles(exampleFiles)
            .withDbName(dbName)
            .shouldMatch(outputFile);
      });

      test("Should verify index usage with indexStats", async () => {
         currentCleanup = cleanupHint; // Runs cleanup function after test even if test fails
         const exampleFiles = [
            "mongosh-commands/db.collection.updateMany/hint-setup.js",
            "mongosh-commands/db.collection.updateMany/hint.js",
            "mongosh-commands/db.collection.updateMany/hint-indexstats.js"
         ];
         const outputFile = "mongosh-commands/db.collection.updateMany/hint-indexstats-output.sh";

         await Expect
            .outputFromExampleFiles(exampleFiles)
            .withDbName(dbName)
            .withIgnoredFields("host", "accesses")
            .shouldMatch(outputFile);
      });

      test("Should upsert a document", async () => {
         currentCleanup = cleanupUpsert; // Runs cleanup function after test even if test fails
         const exampleFiles = [
            "mongosh-commands/db.collection.updateMany/upsert.js"
         ];
         const outputFile = "mongosh-commands/db.collection.updateMany/upsert-output.sh";

         await Expect
            .outputFromExampleFiles(exampleFiles)
            .withDbName(dbName)
            .withIgnoredFields("insertedId")
            .shouldMatch(outputFile);
      });

      test("Should handle idempotent updates", async () => {
         currentCleanup = cleanupIdempotent; // Runs cleanup function after test even if test fails
         const exampleFiles = [
            "mongosh-commands/db.collection.updateMany/idempotent.js"
         ];
         const outputFile = "mongosh-commands/db.collection.updateMany/idempotent-output.sh";

         await Expect
            .outputFromExampleFiles(exampleFiles)
            .withDbName(dbName)
            .shouldMatch(outputFile);
      });

      test("Should update with write concern", async () => {
         currentCleanup = cleanupWriteConcern; // Runs cleanup function after test even if test fails
         const exampleFiles = [
            "mongosh-commands/db.collection.updateMany/write-concern.js"
         ];
         const outputFile = "mongosh-commands/db.collection.updateMany/write-concern-output.sh";

         await Expect
            .outputFromExampleFiles(exampleFiles)
            .withDbName(dbName)
            .shouldMatch(outputFile);
      });

   }, dbName);
});
