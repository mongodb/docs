const { execSync } = require("child_process");
const Expect = require("../../../../utils/comparison/Expect.js");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker.js");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("$min accumulator tests", () => {
  test("Should return the minimum IMDb rating for each audience rating category", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/accumulators/min/min-group-example.js"
      ])
      .withDbName(dbName)
      .withOrderedSort()
      .shouldMatch("aggregation/accumulators/min/min-group-example-output.sh");
  });
}, dbName);
