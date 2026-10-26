const Expect = require("../../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("mongosh tests for $sample aggregation stage", () => {

  test("Should return 3 random documents from the movies collection", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/stages/sample/sample-movies.js"
      ])
      .withDbName(dbName)
      .shouldResemble("aggregation/stages/sample/sample-movies-output.sh")
      .withSchema({
        count: 3,
        requiredFields: ["title", "year", "genres"],
      });
  });

}, dbName);
