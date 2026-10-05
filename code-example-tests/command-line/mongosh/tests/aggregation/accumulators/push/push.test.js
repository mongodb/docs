const Expect = require("../../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("$push accumulator tests", () => {

  test("Should return primary genres per director", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/accumulators/push/run-pipeline.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/accumulators/push/output.sh");
  });
}, dbName);
