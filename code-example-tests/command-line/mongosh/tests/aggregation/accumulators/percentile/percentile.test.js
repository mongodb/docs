const { execSync } = require("child_process");
const Expect = require("../../../../utils/comparison/Expect.js");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker.js");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("$percentile accumulator tests", () => {
  test("Should return the 50th and 90th percentile IMDB ratings by genre", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/accumulators/percentile/rating-percentiles-by-genre.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/accumulators/percentile/rating-percentiles-by-genre-output.sh");
  });
}, dbName);
