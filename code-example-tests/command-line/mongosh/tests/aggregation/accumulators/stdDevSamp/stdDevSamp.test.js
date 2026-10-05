const Expect = require("../../../../utils/comparison/Expect.js");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker.js");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("$stdDevSamp accumulator tests", () => {
  test("Should return the directors with the most varied IMDb ratings among directors with at least 10 movies", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/accumulators/stdDevSamp/stdDevSamp-group-example.js"
      ])
      .withDbName(dbName)
      .withOrderedSort()
      .shouldMatch("aggregation/accumulators/stdDevSamp/stdDevSamp-group-example-output.sh");
  });
}, dbName);
