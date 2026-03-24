const Expect = require("../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../utils/sampleDataChecker");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("mongosh in test example", () => {
  test("Should return title, genres, and year for 8 movies", async () => {
    await Expect
      .outputFromExampleFiles(["mongosh-commands/db.collection.find/in.js"])
      .withDbName(dbName)
      .shouldResemble("mongosh-commands/db.collection.find/in-output.sh")
      .withSchema({
        count: 8,
        requiredFields: ["title", "genres", "year"],
      });
  });
}, dbName);