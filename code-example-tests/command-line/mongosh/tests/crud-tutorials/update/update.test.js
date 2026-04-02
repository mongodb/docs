const Expect = require("../../../utils/comparison/Expect");
const { execSync } = require("child_process");
const { describeWithSampleData } = require("../../../utils/sampleDataChecker");

describe("CRUD tutorials - update examples", () => {
   const dbName = "sample_mflix";

   describeWithSampleData("update examples", () => {

      // Track cleanup function for current test - ensures cleanup runs even if test fails
      let currentCleanup = null;

      afterEach(() => {
         if (currentCleanup) {
            currentCleanup();
            currentCleanup = null;
         }
      });

      /**
       * Cleanup function to restore The Godfather to original state
       * Original values from sample_mflix:
       * - rated: "R"
       * - tomatoes.viewer.rating: 4.4 (NOT 4.6)
       * - num_mflix_comments: 131
       * - lastupdated: "2015-09-02 00:08:23.680000000" (DOES exist in original)
       * - original plot, full document structure
       */
      const cleanupGodfather = () => {
         const mongoUri = process.env.CONNECTION_STRING;
         const cleanupCommands = `db = db.getSiblingDB("${dbName}"); db.movies.updateOne({ title: "The Godfather" }, { $set: { rated: "R", "tomatoes.viewer.rating": 4.4, num_mflix_comments: 131, lastupdated: "2015-09-02 00:08:23.680000000" }, $unset: { vintage: "", popular: "", featured: "" } });`;
         const command = `mongosh "${mongoUri}" --quiet --eval '${cleanupCommands}'`;

         try {
            execSync(command, { encoding: "utf8" });
         } catch (error) {
            console.error(`Failed to clean up The Godfather:`, error.message);
         }
      };

      /**
       * Cleanup function to restore movies with many comments to original state
       * Removes popular and lastupdated fields added by the test, except for movies
       * that originally have lastupdated in sample_mflix (like The Godfather and The Shawshank Redemption)
       * The Godfather is handled separately by cleanupGodfather
       */
      const cleanupPopularMovies = () => {
         const mongoUri = process.env.CONNECTION_STRING;
         // Restore original lastupdated values for movies that have them in sample_mflix
         const restoreOriginalLastupdated = `
            db.movies.updateOne({ _id: ObjectId("573a1399f29313caabceeb20") }, { $set: { lastupdated: "2015-09-13 00:42:00.373000000" }, $unset: { popular: "" } });
            db.movies.updateOne({ _id: ObjectId("573a139ff29313caabd015b9") }, { $set: { lastupdated: "2015-08-30 03:49:02.943000000" }, $unset: { popular: "" } });
         `;
         // Remove lastupdated from all other movies with > 100 comments (except The Godfather)
         const cleanupCommands = `db = db.getSiblingDB("${dbName}"); ${restoreOriginalLastupdated} db.movies.updateMany({ num_mflix_comments: { $gt: 100 }, title: { $ne: "The Godfather" }, _id: { $nin: [ObjectId("573a1399f29313caabceeb20"), ObjectId("573a139ff29313caabd015b9")] } }, { $unset: { popular: "", lastupdated: "" } });`;
         const command = `mongosh "${mongoUri}" --quiet --eval '${cleanupCommands}'`;

         try {
            execSync(command, { encoding: "utf8" });
         } catch (error) {
            console.error(`Failed to clean up popular movies:`, error.message);
         }
      };

      /**
       * Cleanup function to fully restore The Godfather after replaceOne
       * Saves the original document before the test and restores it after
       */
      let godfatherOriginal = null;
      const saveGodfatherOriginal = () => {
         const mongoUri = process.env.CONNECTION_STRING;
         const fetchCmd = `db = db.getSiblingDB(\"${dbName}\"); print(JSON.stringify(db.movies.findOne({ title: \"The Godfather\" })))`;
         const command = `mongosh \"${mongoUri}\" --quiet --eval '${fetchCmd}'`;
         try {
            const result = execSync(command, { encoding: "utf8" });
            godfatherOriginal = JSON.parse(result.split(/\r?\n/).filter(Boolean).pop());
         } catch (error) {
            console.error(`Failed to save original The Godfather:`, error.message);
         }
      };

      const cleanupGodfatherReplace = () => {
         if (!godfatherOriginal) {
            console.error("No backup of The Godfather found for restore.");
            return;
         }
         const mongoUri = process.env.CONNECTION_STRING;
         // Remove _id to avoid immutable field error
         const { _id, ...docNoId } = godfatherOriginal;
         // Build $set for all fields, $unset for any fields not present in the original
         const unsetFields = [
            "lastupdated", "plot", "vintage", "popular", "featured", "rated", "tomatoes", "num_mflix_comments"
         ].filter(f => !(f in docNoId)).reduce((acc, f) => { acc[f] = ""; return acc; }, {});
         const unsetClause = Object.keys(unsetFields).length ? `, $unset: ${JSON.stringify(unsetFields)}` : "";

         // Escape double quotes, backslashes, and dollar signs for shell
         const setFields = JSON.stringify(docNoId).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
         const unsetClauseEscaped = unsetClause.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\$/g, '\\$');
         const restoreCmd = `db = db.getSiblingDB(\\"${dbName}\\"); db.movies.updateOne({ title: \\"The Godfather\\" }, { \\$set: ${setFields}${unsetClauseEscaped} });`;
         const command = `mongosh "${mongoUri}" --quiet --eval "${restoreCmd}"`;
         try {
            execSync(command, { encoding: "utf8" });
         } catch (error) {
            console.error(`Failed to fully restore The Godfather after replace:`, error.message);
         }
      };

      /**
       * Clean up any leftover fields before running tests
       */
      beforeAll(() => {
         cleanupGodfather();
         cleanupPopularMovies();
      });

      /**
       * Clean up after all tests
       */
      afterAll(() => {
         cleanupGodfather();
         cleanupPopularMovies();
      });

      test("Should update one document (updateOne)", async () => {
         currentCleanup = cleanupGodfather; // runs after the test even if test fails
         const exampleFiles = [
            "crud-tutorials/update/update-one-godfather.js"
         ];
         const outputFile = "crud-tutorials/update/update-one-godfather-output.sh";

         await Expect
            .outputFromExampleFiles(exampleFiles)
            .withDbName(dbName)
            .withIgnoredFields("lastupdated")
            .shouldMatch(outputFile);
      });

      test("Should update many documents (updateMany)", async () => {
         currentCleanup = cleanupPopularMovies; // runs after the test even if test fails
         const exampleFiles = [
            "crud-tutorials/update/update-many-popular-movies.js"
         ];
         const outputFile = "crud-tutorials/update/update-many-popular-movies-output.sh";

         await Expect
            .outputFromExampleFiles(exampleFiles)
            .withDbName(dbName)
            .withIgnoredFields("lastupdated")
            .shouldMatch(outputFile);
      });

      test("Should replace one document (replaceOne)", async () => {
         saveGodfatherOriginal();
         currentCleanup = cleanupGodfatherReplace; // runs after the test even if test fails
         const exampleFiles = [
            "crud-tutorials/update/replace-one-godfather.js"
         ];
         const outputFile = "crud-tutorials/update/replace-one-godfather-output.sh";

         await Expect
            .outputFromExampleFiles(exampleFiles)
            .withDbName(dbName)
            .shouldMatch(outputFile);
      });

   }, dbName);
});
