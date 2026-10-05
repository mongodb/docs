const { execSync } = require("child_process");
const Expect = require("../../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("$addToSet window function tests", () => {

  test("Should show how unique genres accumulate across movies", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/window-functions/addToSet/run-pipeline.js"
      ])
      .withDbName(dbName)
      .withUnorderedSort()
      .shouldMatch("aggregation/window-functions/addToSet/output.sh");
  });
}, dbName);
