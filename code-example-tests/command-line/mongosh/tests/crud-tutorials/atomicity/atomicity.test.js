const Expect = require("../../../utils/comparison/Expect");
const { execSync } = require("child_process");
const { describeWithSampleData } = require("../../../utils/sampleDataChecker");

describe("CRUD tutorials - atomicity examples", () => {
   const dbName = "sample_mflix";

   describeWithSampleData("atomicity examples", () => {
      let currentCleanup = null;

      afterEach(() => {
         if (currentCleanup) {
            currentCleanup();
            currentCleanup = null;
         }
      });

      const deleteTestDocument = () => {
         const mongoUri = process.env.CONNECTION_STRING;
         const command = `mongosh "${mongoUri}" --quiet --eval '
            db = db.getSiblingDB("${dbName}");
            db.movies.deleteOne({ _id: 1 });
         '`;
         try {
            execSync(command, { encoding: "utf8" });
         } catch (error) {
            console.error("Failed to clean up test document:", error.message);
         }
      };

      test("Should insert a document", async () => {
         currentCleanup = deleteTestDocument;

         await Expect
            .outputFromExampleFiles(["crud-tutorials/atomicity/insert-document.js"])
            .withDbName(dbName)
            .withIgnoredFields("insertedId")
            .shouldMatch("crud-tutorials/atomicity/insert-document-output.sh");
      });

      test("Should demonstrate filter-based update atomicity", async () => {
         currentCleanup = deleteTestDocument;

         await Expect
            .outputFromExampleFiles([
               "crud-tutorials/atomicity/insert-document.js",
               "crud-tutorials/atomicity/update-filter-atomicity.js",
            ])
            .withDbName(dbName)
            .shouldMatch("crud-tutorials/atomicity/update-filter-atomicity-output.sh");
      });

      test("Should demonstrate update overwrite risk", async () => {
         currentCleanup = deleteTestDocument;

         await Expect
            .outputFromExampleFiles([
               "crud-tutorials/atomicity/insert-document.js",
               "crud-tutorials/atomicity/update-overwrite-risk.js",
            ])
            .withDbName(dbName)
            .shouldMatch("crud-tutorials/atomicity/update-overwrite-risk-output.sh");
      });

      test("Should demonstrate atomic increment updates", async () => {
         currentCleanup = deleteTestDocument;

         await Expect
            .outputFromExampleFiles([
               "crud-tutorials/atomicity/insert-document.js",
               "crud-tutorials/atomicity/update-inc-atomicity.js",
            ])
            .withDbName(dbName)
            .shouldMatch("crud-tutorials/atomicity/update-inc-atomicity-output.sh");
      });
   }, dbName);
});
