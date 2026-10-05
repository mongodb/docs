const { execSync } = require("child_process");
const Expect = require("../../../../utils/comparison/Expect.js");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker.js");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("$min window function tests", () => {
  test("Should return the minimum IMDb rating from the start of each yearly partition to the current document", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/window-functions/min/minimum-rating-in-year.js"
      ])
      .withDbName(dbName)
      .withOrderedSort()
      .shouldMatch("aggregation/window-functions/min/minimum-rating-in-year-output.sh");
  });
}, dbName);
