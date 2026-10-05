const { execSync } = require("child_process");
const Expect = require("../../../../utils/comparison/Expect.js");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker.js");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("$max window function tests", () => {
  test("Should return max IMDb rating per year", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/window-functions/max/running-max-rating-per-year.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/window-functions/max/running-max-rating-per-year-output.sh");
  });
}, dbName);
