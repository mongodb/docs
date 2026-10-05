const Expect = require("../../../../utils/comparison/Expect.js");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker.js");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("$maxN window function tests", () => {
  test("Should return the top three rated movies per year with yearly top-rating lists", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/window-functions/maxN/top-three-per-year.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/window-functions/maxN/top-three-per-year-output.sh");
  });
}, dbName);
