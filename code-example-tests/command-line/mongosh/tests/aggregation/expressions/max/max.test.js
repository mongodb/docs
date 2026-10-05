const { execSync } = require("child_process");
const Expect = require("../../../../utils/comparison/Expect.js");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker.js");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("$max expression tests", () => {
  test("Should return the highest rating across sources for each movie", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/expressions/max/highest-rating.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/expressions/max/highest-rating-output.sh");
  });
}, dbName);
