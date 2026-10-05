const Expect = require("../../../../utils/comparison/Expect.js");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker.js");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("$stdDevSamp window function tests", () => {
  test("Should return the running sample standard deviation of IMDb ratings for Musical movies in each year", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/window-functions/stdDevSamp/stdDevSamp-window-example.js"
      ])
      .withDbName(dbName)
      .withOrderedSort()
      .shouldMatch("aggregation/window-functions/stdDevSamp/stdDevSamp-window-example-output.sh");
  });
}, dbName);
