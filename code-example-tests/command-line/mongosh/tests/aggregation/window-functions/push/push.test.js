const Expect = require("../../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("$push window function tests", () => {

  test("Should show how genres accumulate across movies including duplicates", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/window-functions/push/run-pipeline.js"
      ])
      .withDbName(dbName)
      .withUnorderedSort()
      .shouldMatch("aggregation/window-functions/push/output.sh");
  });
}, dbName);
