const { execSync } = require("child_process");
const Expect = require("../../../../utils/comparison/Expect.js");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker.js");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("$max accumulator tests", () => {
  test("Should return max IMDb rating and runtime by rating", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/accumulators/max/max-by-rating.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/accumulators/max/max-by-rating-output.sh");
  });
}, dbName);
