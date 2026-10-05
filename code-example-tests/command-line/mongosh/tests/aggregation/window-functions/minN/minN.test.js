const { execSync } = require("child_process");
const Expect = require("../../../../utils/comparison/Expect.js");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker.js");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("$minN window function tests", () => {
  test("Should return the two lowest IMDb ratings per year with expanding window", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/window-functions/minN/lowest-two-ratings-per-year.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/window-functions/minN/lowest-two-ratings-per-year-output.sh");
  });
}, dbName);
