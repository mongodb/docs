const { execSync } = require("child_process");
const Expect = require("../../../../utils/comparison/Expect.js");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker.js");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("$count window function tests", () => {
  test("Should show a running count of high-rated movies by genre", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/window-functions/count/running-count-high-rated-movies-by-genre.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/window-functions/count/running-count-high-rated-movies-by-genre-output.sh");
  });
}, dbName);
