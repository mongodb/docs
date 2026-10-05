const Expect = require("../../../../utils/comparison/Expect.js");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker.js");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("$sum expression tests", () => {
  test("Should return total award count for three specific movies", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/expressions/sum/sum-expression-example.js"
      ])
      .withDbName(dbName)
      .withOrderedSort()
      .shouldMatch("aggregation/expressions/sum/sum-expression-example-output.sh");
  });
}, dbName);
