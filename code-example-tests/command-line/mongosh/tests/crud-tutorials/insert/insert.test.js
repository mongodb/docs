const Expect = require("../../../utils/comparison/Expect");
const { execSync } = require("child_process");
const { describeWithSampleData } = require("../../../utils/sampleDataChecker");

describe("CRUD tutorials - insert examples", () => {
   const dbName = "sample_mflix";

   const cleanupInsertedMovies = (titles) => {
      const mongoUri = process.env.CONNECTION_STRING;
      const titleList = titles.map((t) => `"${t}"`).join(", ");
      const command = `mongosh "${mongoUri}" --quiet --eval '
         db = db.getSiblingDB("${dbName}");
         db.movies.deleteMany({ title: { $in: [${titleList}] }, year: { $gte: 2023 } });
      '`;
      try {
         execSync(command, { encoding: "utf8" });
      } catch (error) {
         console.error("Failed to clean up inserted movies:", error.message);
      }
   };

   describeWithSampleData("insert examples", () => {
      let currentCleanup = null;

      beforeAll(() => {
         cleanupInsertedMovies([
            "The Substance",
            "Oppenheimer",
            "Barbie",
            "Poor Things",
         ]);
      });

      afterEach(() => {
         if (currentCleanup) {
            currentCleanup();
            currentCleanup = null;
         }
      });

      afterAll(() => {
         cleanupInsertedMovies([
            "The Substance",
            "Oppenheimer",
            "Barbie",
            "Poor Things",
         ]);
      });

      test("Should insert one document (insertOne)", async () => {
         currentCleanup = () =>
            cleanupInsertedMovies(["The Substance"]);

         await Expect
            .outputFromExampleFiles([
               "crud-tutorials/insert/insert-one-movie.js",
            ])
            .withDbName(dbName)
            .withIgnoredFields("insertedId")
            .shouldMatch("crud-tutorials/insert/insert-one-movie-output.sh");
      });

      test("Should insert many documents (insertMany)", async () => {
         currentCleanup = () =>
            cleanupInsertedMovies(["Oppenheimer", "Barbie", "Poor Things"]);

         await Expect
            .outputFromExampleFiles([
               "crud-tutorials/insert/insert-many-movies.js",
            ])
            .withDbName(dbName)
            .withIgnoredFields("insertedIds")
            .shouldMatch(
               "crud-tutorials/insert/insert-many-movies-output.sh"
            );
      });
   }, dbName);
});
