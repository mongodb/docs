const Expect = require("../../../../utils/comparison/Expect.js");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker.js");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("$setUnion accumulator tests", () => {
  test("Should return the distinct genres each director has worked in", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/accumulators/setUnion/setUnion-group-example.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/accumulators/setUnion/setUnion-group-example-output.sh");
  });
}, dbName);
