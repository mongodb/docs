const { execSync } = require("child_process");
const Expect = require("../../../utils/comparison/Expect");

describe("update command examples", () => {
   const dbName = "sample_mflix";

   /**
    * Comprehensive cleanup to restore all modified documents to original state
    */
   const cleanupAll = () => {
      const mongoUri = process.env.CONNECTION_STRING;
      const cleanupCommands = [
         'db = db.getSiblingDB("sample_mflix");',
         'db.movies.updateOne({ title: "The Great Train Robbery" }, { $set: { languages: ["English"], num_mflix_comments: 0 }, $unset: { age: "", era: "" } });',
         'db.movies.updateOne({ title: "The Godfather" }, { $set: { year: 1972, num_mflix_comments: 131, cast: ["Marlon Brando", "Al Pacino", "James Caan", "Richard S. Castellano"] }, $unset: { franchise: "", classic_status: "", featured: "" } });',
         'db.users.updateOne({ name: "Robert Baratheon" }, { $unset: { full_info: "", status: "" } });',
         'db.movies.updateOne({ title: "The Matrix", year: 1999 }, { $set: { genres: ["Action", "Sci-Fi"], awards: { wins: 37, nominations: 40, text: "Won 4 Oscars. Another 33 wins & 40 nominations." } } });',
         'db.movies.updateOne({ title: "Inception", year: 2010 }, { $set: { num_mflix_comments: 1 }, $unset: { featured: "" } });',
         'db.movies.deleteOne({ title: "The Future Chronicles", year: 2025 });',
         'try { db.movies.dropIndex({ year: 1 }); } catch(e) {}',
         'try { db.movies.dropIndex({ num_mflix_comments: 1 }); } catch(e) {}'
      ].join(' ');

      const command = `mongosh "${mongoUri}" --quiet --eval '${cleanupCommands}'`;
      
      try {
         execSync(command, { encoding: "utf8" });
      } catch (error) {
         console.error(`Failed to clean up:`, error.message);
      }
   };

   /**
    * Cleanup function to restore English language entries
    */
   const cleanupArrayFilters = () => {
      const mongoUri = process.env.CONNECTION_STRING;
      const cleanupCommands = 'db = db.getSiblingDB("sample_mflix"); db.movies.updateMany({ languages: "EN" }, { $set: { "languages.$[element]": "English" } }, { arrayFilters: [ { "element": "EN" } ] });';
      const command = `mongosh "${mongoUri}" --quiet --eval '${cleanupCommands}'`;

      try {
         execSync(command, { encoding: "utf8" });
      } catch (error) {
         console.error(`Failed to clean up array filters:`, error.message);
      }
   };

   /**
    * Cleanup function for bulk-update.js operations
    */
   const cleanupBulkUpdate = () => {
      const mongoUri = process.env.CONNECTION_STRING;
      const cleanupCommands = [
         'db = db.getSiblingDB("sample_mflix");',
         // Restore featured field for 2015 Horror movies
         'db.movies.updateMany({ year: 2015, genres: "Horror", "imdb.rating": { $gte: 7 } }, { $unset: { featured: "" } });',
         // Restore category for 2012 Drama/Romance movies
         'db.movies.updateMany({ year: 2012, genres: { $all: ["Drama", "Romance"] }, runtime: { $lt: 90 } }, { $unset: { category: "" } });',
         // Remove upserted movie from 2026
         'db.movies.deleteOne({ title: "A New Movie", year: 2026 });'
      ].join(' ');

      const command = `mongosh "${mongoUri}" --quiet --eval '${cleanupCommands}'`;

      try {
         execSync(command, { encoding: "utf8" });
      } catch (error) {
         console.error(`Failed to clean up bulk update:`, error.message);
      }
   };

   /**
    * Cleanup function to restore movies from 1924 to original state
    */
   const cleanupSpecificFields = () => {
      const mongoUri = process.env.CONNECTION_STRING;
      const cleanupCommands = 'db = db.getSiblingDB("sample_mflix"); db.movies.updateMany({ year: 1924 }, { $inc: { num_mflix_comments: -1 }, $unset: { classic: "", era: "" } });';
      const command = `mongosh "${mongoUri}" --quiet --eval '${cleanupCommands}'`;

      try {
         execSync(command, { encoding: "utf8" });
      } catch (error) {
         console.error(`Failed to clean up specific fields:`, error.message);
      }
   };

   afterEach(async () => {
      await cleanupAll();
   });

   test("Should update a single document (update-1)", async () => {
      const exampleFiles = [
         "database-commands/update/update-1.js"
      ];
      const outputFile = "database-commands/update/update-1-output.js";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .shouldMatch(outputFile);
   });

   test("Should update with array filters (array-filters)", async () => {
      const exampleFiles = [
         "database-commands/update/array-filters.js"
      ];
      const outputFile = "database-commands/update/array-filters-output.js";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .shouldMatch(outputFile);
      cleanupArrayFilters();
   });

   test("Should perform bulk update operations (bulk-update)", async () => {
      const exampleFiles = [
         "database-commands/update/bulk-update.js"
      ];
      const outputFile = "database-commands/update/bulk-update-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .withIgnoredFields("_id", "upserted")
         .shouldMatch(outputFile);
      cleanupBulkUpdate();
   });

   test("Should update with let option (let-option)", async () => {
      const exampleFiles = [
         "database-commands/update/let-option.js"
      ];
      const outputFile = "database-commands/update/let-option-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .shouldMatch(outputFile);
   });

   test("Should update with c option (let-option-2)", async () => {
      const exampleFiles = [
         "database-commands/update/let-option-2.js"
      ];
      const outputFile = "database-commands/update/let-option-2.output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .shouldMatch(outputFile);
   });

   test("Should update with sort (update-sort)", async () => {
      const exampleFiles = [
         "database-commands/update/update-sort.js"
      ];
      const outputFile = "database-commands/update/update-sort-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .shouldMatch(outputFile);
   });

   test("Should update specific array elements (update-specific-elements)", async () => {
      const exampleFiles = [
         "database-commands/update/update-specific-elements.js"
      ];
      const outputFile = "database-commands/update/update-specific-elements-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .shouldMatch(outputFile);
   });

   test("Should update specific fields (update-specific-fields)", async () => {
      const exampleFiles = [
         "database-commands/update/update-specific-fields.js"
      ];
      const outputFile = "database-commands/update/update-specific-fields-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .shouldMatch(outputFile);
      cleanupSpecificFields();
   });

   test("Should update with aggregation pipeline (update-with-aggregation-1)", async () => {
      const exampleFiles = [
         "database-commands/update/update-with-aggregation-1.js"
      ];
      const outputFile = "database-commands/update/update-with-aggregation-1.-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .shouldMatch(outputFile);
   });

   test("Should update with complex aggregation pipeline (update-with-aggregation-2)", async () => {
      const exampleFiles = [
         "database-commands/update/update-with-aggregation-2.js"
      ];
      const outputFile = "database-commands/update/update-with-aggregation-2-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .shouldMatch(outputFile);
   });

   test("Should update with hint (update-with-hint)", async () => {
      // Create index first, then run the operation
      const exampleFiles = [
         "database-commands/update/create-index.js",
         "database-commands/update/update-with-hint.js"
      ];
      const outputFile = "database-commands/update/update-with-hint-output.js";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .shouldMatch(outputFile);
   });

   test("Should explain update operation (explain)", async () => {
      // First create the indexes that explain will use
      const exampleFiles = [
         "database-commands/update/create-index.js",
         "database-commands/update/explain.js"
      ];
      const outputFile = "database-commands/update/explain-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .withIgnoredFields("queryPlanner.planCacheKey")
         .shouldMatch(outputFile);
   });

   test("Should create indexes (create-index)", async () => {
      const exampleFiles = [
         "database-commands/update/create-index.js"
      ];
      const outputFile = "database-commands/update/create-index-output.js";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .shouldMatch(outputFile);
   });

   test("Should update with collation (specify-collation)", async () => {
      const exampleFiles = [
         "database-commands/update/specify-collation.js"
      ];
      const outputFile = "database-commands/update/specify-collation-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .shouldMatch(outputFile);
   });

});
