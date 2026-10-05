const Expect = require("../../../../utils/comparison/Expect.js");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker.js");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("$setUnion expression tests", () => {
  test("Should combine the cast and directors arrays into a single set of contributors", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/expressions/setUnion/setUnion-expression-example.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/expressions/setUnion/setUnion-expression-example-output.sh");
  });
}, dbName);
