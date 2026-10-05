const { execSync } = require("child_process");
const Expect = require("../../../../utils/comparison/Expect.js");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker.js");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("$percentile window function tests", () => {
  test("Should return the 90th percentile IMDB rating for Action movies by year", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/window-functions/percentile/top-rating-percentile-by-year.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/window-functions/percentile/top-rating-percentile-by-year-output.sh");
  });
}, dbName);
