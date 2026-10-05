const Expect = require("../../../../utils/comparison/Expect.js");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker.js");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("$topN window function tests", () => {
  test("Should return the top three movies per year with yearly running windows", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/window-functions/topN/top-three-movies-per-year.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/window-functions/topN/top-three-movies-per-year-output.sh");
  });
}, dbName);
