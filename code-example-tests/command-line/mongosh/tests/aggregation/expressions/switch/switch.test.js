const Expect = require("../../../../utils/comparison/Expect.js");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker.js");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("mongosh tests for $switch aggregation expression", () => {
  test("Should assign a summary based on the movie rating", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/expressions/switch/switch-summary.js"
      ])
      .withDbName(dbName)
      .withOrderedSort()
      .shouldMatch("aggregation/expressions/switch/switch-summary-output.sh");
  });
}, dbName);
