const { execSync } = require("child_process");
const Expect = require("../../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("$addToSet accumulator tests", () => {

  test("Should return unique genres for each director", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/accumulators/addToSet/run-pipeline.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/accumulators/addToSet/output.sh");
  });
}, dbName);
