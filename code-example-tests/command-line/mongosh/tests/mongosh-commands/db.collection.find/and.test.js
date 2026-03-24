const Expect = require("../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../utils/sampleDataChecker");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("mongosh and test example", () => {
  test("Should return title, directors, and year for The Big Shave and Who's That Knocking at my Door", async () => {
    await Expect
      .outputFromExampleFiles(["mongosh-commands/db.collection.find/and.js"])
      .withDbName(dbName)
      .shouldMatch("mongosh-commands/db.collection.find/and-output.sh")
  });
}, dbName);