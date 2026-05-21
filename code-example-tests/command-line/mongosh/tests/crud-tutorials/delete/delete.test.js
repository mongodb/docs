const Expect = require("../../../utils/comparison/Expect");
const { execSync } = require("child_process");
const { describeWithSampleData } = require("../../../utils/sampleDataChecker");

describe("CRUD tutorials - delete examples", () => {
   const dbName = "sample_mflix";

   const runMongosh = (evalScript) => {
      const mongoUri = process.env.CONNECTION_STRING;
      const command = `mongosh "${mongoUri}" --quiet --eval '${evalScript}'`;
      try {
         execSync(command, { encoding: "utf8" });
      } catch (error) {
         console.error("Mongosh command failed:", error.message);
      }
   };

   describeWithSampleData("delete examples", () => {
      let currentCleanup = null;

      beforeAll(() => {
         runMongosh(`
            db = db.getSiblingDB("${dbName}");
            db.movies.deleteMany({ title: "Dune: Part Two", year: 2024 });
            db.movies.deleteMany({ year: 2023 });
         `);
      });

      afterEach(() => {
         if (currentCleanup) {
            currentCleanup();
            currentCleanup = null;
         }
      });

      afterAll(() => {
         runMongosh(`
            db = db.getSiblingDB("${dbName}");
            db.movies.deleteMany({ title: "Dune: Part Two", year: 2024 });
            db.movies.deleteMany({ year: 2023 });
         `);
      });

      test("Should delete one document (deleteOne)", async () => {
         runMongosh(`
            db = db.getSiblingDB("${dbName}");
            db.movies.insertOne({
               title: "Dune: Part Two",
               year: 2024,
               type: "movie"
            });
         `);

         currentCleanup = () =>
            runMongosh(`
               db = db.getSiblingDB("${dbName}");
               db.movies.deleteMany({ title: "Dune: Part Two", year: 2024 });
            `);

         await Expect
            .outputFromExampleFiles([
               "crud-tutorials/delete/delete-one-movie.js",
            ])
            .withDbName(dbName)
            .shouldMatch("crud-tutorials/delete/delete-one-movie-output.sh");
      });

      test("Should delete many documents (deleteMany)", async () => {
         runMongosh(`
            db = db.getSiblingDB("${dbName}");
            db.movies.insertMany([
               {
                  title: "Oppenheimer",
                  genres: ["Biography", "Drama", "History"],
                  runtime: 180,
                  rated: "R",
                  year: 2023,
                  directors: ["Christopher Nolan"],
                  cast: ["Cillian Murphy", "Emily Blunt", "Matt Damon"],
                  type: "movie"
               },
               {
                  title: "Barbie",
                  genres: ["Adventure", "Comedy", "Fantasy"],
                  runtime: 114,
                  rated: "PG-13",
                  year: 2023,
                  directors: ["Greta Gerwig"],
                  cast: ["Margot Robbie", "Ryan Gosling"],
                  type: "movie"
               },
               {
                  title: "Poor Things",
                  genres: ["Comedy", "Drama", "Romance"],
                  runtime: 141,
                  rated: "R",
                  year: 2023,
                  directors: ["Yorgos Lanthimos"],
                  cast: ["Emma Stone", "Mark Ruffalo", "Willem Dafoe"],
                  type: "movie"
               }
            ]);
         `);

         currentCleanup = () =>
            runMongosh(`
               db = db.getSiblingDB("${dbName}");
               db.movies.deleteMany({ year: 2023 });
            `);

         await Expect
            .outputFromExampleFiles([
               "crud-tutorials/delete/delete-many-movies.js",
            ])
            .withDbName(dbName)
            .shouldMatch(
               "crud-tutorials/delete/delete-many-movies-output.sh"
            );
      });
   }, dbName);
});
