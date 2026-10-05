const { execSync } = require("child_process");
const Expect = require("../../../../utils/comparison/Expect.js");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker.js");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("$median window function tests", () => {
  test("Should return the local median IMDb rating within a range window", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/window-functions/median/local-median-rating.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/window-functions/median/local-median-rating-output.sh");
  });
}, dbName);
