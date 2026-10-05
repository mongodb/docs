const { execSync } = require("child_process");
const Expect = require("../../../../utils/comparison/Expect.js");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker.js");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("$lastN window function tests", () => {
  test("Should return the last three movies per year with yearly bottom-title lists", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/window-functions/lastN/last-three-movies-per-year.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/window-functions/lastN/last-three-movies-per-year-output.sh");
  });
}, dbName);
