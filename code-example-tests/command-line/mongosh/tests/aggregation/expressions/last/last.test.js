const { execSync } = require("child_process");
const Expect = require("../../../../utils/comparison/Expect.js");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker.js");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("$last expression tests", () => {
  test("Should return the last cast member for specific movies", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/expressions/last/last-cast-member.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/expressions/last/last-cast-member-output.sh");
  });
}, dbName);
