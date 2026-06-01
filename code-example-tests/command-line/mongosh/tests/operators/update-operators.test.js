const Expect = require("../../utils/comparison/Expect");
const { execSync } = require("child_process");
const { describeWithSampleData } = require("../../utils/sampleDataChecker");

jest.setTimeout(15000);

const dbName = "sample_mflix";
const movieTitle = "The Dark Knight";

describeWithSampleData("mongosh update operator tests", () => {

   const mongoUri = process.env.CONNECTION_STRING;

   const runCleanup = (cleanupCommands, errorContext) => {
      const command = `mongosh "${mongoUri}" --quiet --eval '${cleanupCommands}'`;
      try {
         execSync(command, { encoding: "utf8" });
      } catch (error) {
         console.error(`Failed to clean up ${errorContext}:`, error.message);
      }
   };

   // Run all cleanups before and after the suite to ensure a clean state
   beforeAll(() => {
      runCleanup(
         `db = db.getSiblingDB("${dbName}"); db.movies.updateOne({ title: "${movieTitle}" }, { $unset: { label: "", status: "", "imdb.highlight": "" } });`,
         "pre-test cleanup"
      );
   });

   afterAll(() => {
      runCleanup(
         `db = db.getSiblingDB("${dbName}"); db.movies.updateOne({ title: "${movieTitle}" }, { $unset: { label: "", status: "", "imdb.highlight": "" } });`,
         "post-test cleanup"
      );
   });

   // $set tests

   test("Should set top-level fields on a movie ($set)", async () => {
      await Expect
         .outputFromExampleFiles(["operators/set/set-top-level-fields.js"])
         .withDbName(dbName)
         .shouldMatch("operators/set/set-top-level-fields-output.sh");

      runCleanup(
         `db = db.getSiblingDB("${dbName}"); db.movies.updateOne({ title: "${movieTitle}" }, { $unset: { label: "", status: "" } });`,
         "top-level fields"
      );
   });

   test("Should set embedded document fields using dot notation ($set)", async () => {
      await Expect
         .outputFromExampleFiles(["operators/set/set-embedded-fields.js"])
         .withDbName(dbName)
         .shouldMatch("operators/set/set-embedded-fields-output.sh");

      runCleanup(
         `db = db.getSiblingDB("${dbName}"); db.movies.updateOne({ title: "${movieTitle}" }, { $unset: { "imdb.highlight": "" } });`,
         "embedded fields"
      );
   });

   test("Should set array elements by index ($set)", async () => {
      let originalGenres = null;

      const saveOriginalGenres = () => {
         const fetchCmd = `db = db.getSiblingDB("${dbName}"); print(JSON.stringify(db.movies.findOne({ title: "${movieTitle}" }, { genres: 1 }).genres))`;
         const command = `mongosh "${mongoUri}" --quiet --eval '${fetchCmd}'`;
         try {
            const result = execSync(command, { encoding: "utf8" });
            originalGenres = JSON.parse(result.split(/\r?\n/).filter(Boolean).pop());
         } catch (error) {
            console.error("Failed to save original genres:", error.message);
         }
      };

      saveOriginalGenres();

      await Expect
         .outputFromExampleFiles(["operators/set/set-array-elements.js"])
         .withDbName(dbName)
         .shouldMatch("operators/set/set-array-elements-output.sh");

      const genresJson = JSON.stringify(originalGenres);
      runCleanup(
         `db = db.getSiblingDB("${dbName}"); db.movies.updateOne({ title: "${movieTitle}" }, { $set: { genres: ${genresJson} } });`,
         "genres array"
      );
   });

   // $unset test

   test("Should unset fields from a movie ($unset)", async () => {
      await Expect
         .outputFromExampleFiles(["operators/unset/unset-fields-setup.js", "operators/unset/unset-fields.js"])
         .withDbName(dbName)
         .shouldMatch("operators/unset/unset-fields-output.sh");
   });

   // $push tests

   test("Should append a value to an array ($push)", async () => {
      await Expect
         .outputFromExampleFiles(["operators/push/push-value.js"])
         .withDbName(dbName)
         .shouldMatch("operators/push/push-value-output.sh");

      runCleanup(
         `db = db.getSiblingDB("${dbName}"); db.movies.updateOne({ title: "${movieTitle}" }, { $pull: { genres: "Classic" } });`,
         "push-value genres"
      );
   });

   test("Should append multiple values to an array using $each ($push)", async () => {
      await Expect
         .outputFromExampleFiles(["operators/push/push-each.js"])
         .withDbName(dbName)
         .shouldMatch("operators/push/push-each-output.sh");

      runCleanup(
         `db = db.getSiblingDB("${dbName}"); db.movies.updateOne({ title: "${movieTitle}" }, { $pull: { genres: { $in: ["Modern Classic", "Award-Winning"] } } });`,
         "push-each genres"
      );
   });

   test("Should append a value to arrays in multiple documents ($push)", async () => {
      await Expect
         .outputFromExampleFiles(["operators/push/push-many.js"])
         .withDbName(dbName)
         .shouldMatch("operators/push/push-many-output.sh");

      runCleanup(
         `db = db.getSiblingDB("${dbName}"); db.movies.updateMany({ "imdb.rating": { $gt: 9 } }, { $pull: { genres: "Acclaimed" } });`,
         "push-many genres"
      );
   });

}, dbName);
