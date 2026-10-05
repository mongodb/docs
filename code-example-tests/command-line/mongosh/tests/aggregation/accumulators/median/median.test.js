const { execSync } = require("child_process");
const Expect = require("../../../../utils/comparison/Expect.js");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker.js");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("$median accumulator tests", () => {
  test("Should return the median IMDb rating of Action movies per year", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/accumulators/median/median-rating-by-year.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/accumulators/median/median-rating-by-year-output.sh");
  });
}, dbName);
