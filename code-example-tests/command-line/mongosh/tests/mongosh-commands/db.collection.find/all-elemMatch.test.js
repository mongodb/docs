const Expect = require("../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../utils/sampleDataChecker");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("mongosh all test example", () => {
  const dbName = "sample_mflix";

  test("Should return title, writers, and year for 3 movies", async () => {
    await Expect
      .outputFromExampleFiles(["mongosh-commands/db.collection.find/all-elemMatch.js"])
      .withDbName(dbName)
      .shouldResemble("mongosh-commands/db.collection.find/all-elemMatch-output.sh")
      .withSchema({
         count: 3,
         required_fields: ["title", "writers", "year"],
      });
  });
}, dbName);
