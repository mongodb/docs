const { execSync } = require("child_process");
const Expect = require("../../../../utils/comparison/Expect.js");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker.js");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("$last accumulator tests", () => {
  test("Should return the most recent movie title and year for each genre", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/accumulators/last/find-last-movie-per-genre.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/accumulators/last/find-last-movie-per-genre-output.sh");
  });
}, dbName);
