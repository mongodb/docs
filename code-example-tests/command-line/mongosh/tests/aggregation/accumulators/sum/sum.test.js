const Expect = require("../../../../utils/comparison/Expect.js");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker.js");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("$sum accumulator tests", () => {
  test("Should return total IMDb votes grouped by content rating", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/accumulators/sum/sum-group-example.js"
      ])
      .withDbName(dbName)
      .withOrderedSort()
      .shouldMatch("aggregation/accumulators/sum/sum-group-example-output.sh");
  });
}, dbName);
