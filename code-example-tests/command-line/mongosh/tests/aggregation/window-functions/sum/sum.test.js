const Expect = require("../../../../utils/comparison/Expect.js");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker.js");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("$sum window function tests", () => {
  test("Should return cumulative vote totals for Musical movies by year", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/window-functions/sum/sum-window-example.js"
      ])
      .withDbName(dbName)
      .withOrderedSort()
      .shouldMatch("aggregation/window-functions/sum/sum-window-example-output.sh");
  });
}, dbName);
