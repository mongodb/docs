const Expect = require("../../utils/comparison/Expect");
const { execSync } = require("child_process");
const { describeWithSampleData } = require("../../utils/sampleDataChecker");

jest.setTimeout(30000);

const dbName = "sample_mflix";

const cleanup = () => {
  const mongoUri = process.env.CONNECTION_STRING;
  const command = `mongosh "${mongoUri}" --quiet --eval '
    db = db.getSiblingDB("${dbName}");
    db.movies.deleteMany({ title: { $in: ["The Brutalist", "A Complete Unknown"] }, year: { $gte: 2023 } });
    db.users.deleteMany({ _id: 987 });
  '`;
  try {
    execSync(command, { encoding: "utf8" });
  } catch (error) {
    console.error("Failed to clean up map-relationships test data:", error.message);
  }
};

describe("data modeling map-relationships examples", () => {
  describeWithSampleData("insert examples", () => {
    let currentCleanup = null;

    beforeAll(() => {
      cleanup();
    });

    afterEach(() => {
      if (currentCleanup) {
        currentCleanup();
        currentCleanup = null;
      }
    });

    afterAll(() => {
      cleanup();
    });

    test("Should insert embedded movie document", async () => {
      currentCleanup = () => {
        const mongoUri = process.env.CONNECTION_STRING;
        const command = `mongosh "${mongoUri}" --quiet --eval '
          db = db.getSiblingDB("${dbName}");
          db.movies.deleteMany({ title: "The Brutalist", year: { $gte: 2023 } });
        '`;
        try {
          execSync(command, { encoding: "utf8" });
        } catch (error) {
          console.error("Failed to clean up embedded movie:", error.message);
        }
      };

      await Expect
        .outputFromExampleFiles([
          "data-modeling/map-relationships/embedded.js",
        ])
        .withDbName(dbName)
        .withIgnoredFields("insertedId")
        .shouldMatch("data-modeling/map-relationships/embedded-output.sh");
    });

    test("Should insert reference movie document", async () => {
      currentCleanup = () => {
        const mongoUri = process.env.CONNECTION_STRING;
        const command = `mongosh "${mongoUri}" --quiet --eval '
          db = db.getSiblingDB("${dbName}");
          db.movies.deleteMany({ title: "A Complete Unknown", year: { $gte: 2023 } });
        '`;
        try {
          execSync(command, { encoding: "utf8" });
        } catch (error) {
          console.error("Failed to clean up reference movie:", error.message);
        }
      };

      await Expect
        .outputFromExampleFiles([
          "data-modeling/map-relationships/reference-movies.js",
        ])
        .withDbName(dbName)
        .withIgnoredFields("insertedId")
        .shouldMatch("data-modeling/map-relationships/reference-movies-output.sh");
    });

    test("Should insert reference user document", async () => {
      currentCleanup = () => {
        const mongoUri = process.env.CONNECTION_STRING;
        const command = `mongosh "${mongoUri}" --quiet --eval '
          db = db.getSiblingDB("${dbName}");
          db.users.deleteMany({ _id: 987 });
        '`;
        try {
          execSync(command, { encoding: "utf8" });
        } catch (error) {
          console.error("Failed to clean up reference user:", error.message);
        }
      };

      await Expect
        .outputFromExampleFiles([
          "data-modeling/map-relationships/reference-users.js",
        ])
        .withDbName(dbName)
        .withIgnoredFields("insertedId")
        .shouldMatch("data-modeling/map-relationships/reference-users-output.sh");
    });
  }, dbName);
});
