const { execSync } = require("child_process");
const Expect = require("../../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("$bottom window function tests", () => {

  test("Should compute lowest-rated movie in year for each partition", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/window-functions/bottom/lowest-rated-in-year.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/window-functions/bottom/lowest-rated-in-year-output.sh");
  });

}, dbName);
