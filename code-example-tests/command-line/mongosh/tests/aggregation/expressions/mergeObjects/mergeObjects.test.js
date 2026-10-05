const Expect = require("../../../../utils/comparison/Expect.js");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker.js");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("$mergeObjects expression tests", () => {
  test("Should merge imdb and tomatoes.critic sub-documents, with critic rating taking precedence", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/expressions/mergeObjects/merge-critic-ratings.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/expressions/mergeObjects/merge-critic-ratings-output.sh");
  });
}, dbName);
