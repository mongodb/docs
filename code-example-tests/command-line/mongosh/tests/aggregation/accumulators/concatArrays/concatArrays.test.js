const Expect = require("../../../../utils/comparison/Expect.js");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker.js");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("$concatArrays accumulator tests", () => {
  test("Should concatenate the genres arrays of all movies in each year group for 1928 and 1929", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/accumulators/concatArrays/concatArrays-group-example.js"
      ])
      .withDbName(dbName)
      .withOrderedSort()
      .shouldMatch("aggregation/accumulators/concatArrays/concatArrays-group-example-output.sh");
  });
}, dbName);
