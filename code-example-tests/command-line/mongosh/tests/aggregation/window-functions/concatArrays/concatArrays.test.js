const Expect = require("../../../../utils/comparison/Expect.js");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker.js");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("$concatArrays window function tests", () => {
  test("Should concatenate the genres arrays over a running window from the first movie through the current movie", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/window-functions/concatArrays/concatArrays-window-example.js"
      ])
      .withDbName(dbName)
      .withOrderedSort()
      .shouldMatch("aggregation/window-functions/concatArrays/concatArrays-window-example-output.sh");
  });
}, dbName);
