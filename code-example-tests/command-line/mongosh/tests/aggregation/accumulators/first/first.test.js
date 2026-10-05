const { execSync } = require("child_process");
const Expect = require("../../../../utils/comparison/Expect.js");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker.js");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("$first accumulator tests", () => {
  test("Should return the earliest movie title and year for each genre", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/accumulators/first/find-first-movie-per-genre.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/accumulators/first/find-first-movie-per-genre-output.sh");
  });
}, dbName);

const missingValuesDb = "first-missing-values";

describe("$first accumulator - missing values", () => {
  afterEach(() => {
    const mongoUri = process.env.CONNECTION_STRING;
    const command = `mongosh "${mongoUri}" --eval "db = db.getSiblingDB('${missingValuesDb}'); db.dropDatabase();"`;
    try {
      execSync(command, { encoding: "utf8" });
    } catch (error) {
      console.error("Failed to drop database:", error.message);
    }
  });

  test("Should return first values, treating missing and null fields as null", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/accumulators/first/missing-values.js"
      ])
      .withDbName(missingValuesDb)
      .shouldMatch("aggregation/accumulators/first/missing-values-output.sh");
  });
});
