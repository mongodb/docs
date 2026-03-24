const Expect = require("../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../utils/sampleDataChecker");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("mongosh all test example", () => {
  test("Should return title, directors, and year for King of Jazz", async () => {
    await Expect
      .outputFromExampleFiles(["mongosh-commands/db.collection.find/all.js"])
      .withDbName(dbName)
      .shouldMatch("mongosh-commands/db.collection.find/all-output.sh");
  });
}, dbName);