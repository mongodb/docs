const Expect = require("../../../../utils/comparison/Expect.js");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker.js");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("$maxN expression tests", () => {
  test("Should return the two alphabetically largest cast members using $maxN expression", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/expressions/maxN/top-two-cast-members.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/expressions/maxN/top-two-cast-members-output.sh");
  });
}, dbName);
