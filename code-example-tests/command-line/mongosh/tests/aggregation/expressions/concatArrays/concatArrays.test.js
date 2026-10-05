const Expect = require("../../../../utils/comparison/Expect.js");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker.js");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("$concatArrays expression tests", () => {
  test("Should concatenate the genres and writers arrays of The Godfather", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/expressions/concatArrays/concatArrays-expression-example.js"
      ])
      .withDbName(dbName)
      .withOrderedSort()
      .shouldMatch("aggregation/expressions/concatArrays/concatArrays-expression-example-output.sh");
  });
}, dbName);
