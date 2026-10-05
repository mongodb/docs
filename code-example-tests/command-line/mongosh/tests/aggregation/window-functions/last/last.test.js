const { execSync } = require("child_process");
const Expect = require("../../../../utils/comparison/Expect.js");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker.js");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("$last window function tests", () => {
  test("Should return the lowest-rated movie title in each year partition", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/window-functions/last/lowest-rated-movie-per-year.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/window-functions/last/lowest-rated-movie-per-year-output.sh");
  });
}, dbName);
