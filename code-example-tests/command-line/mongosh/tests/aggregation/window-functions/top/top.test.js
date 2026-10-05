const Expect = require("../../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("$top window function tests", () => {

  test("Should identify the highest-rated movie per year for each partition", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/window-functions/top/highest-rated-in-year.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/window-functions/top/highest-rated-in-year-output.sh");
  });

}, dbName);
