const { execSync } = require("child_process");
const Expect = require("../../../../utils/comparison/Expect.js");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker.js");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("$lastN expression tests", () => {
  test("Should return the last three cast members using $lastN expression", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/expressions/lastN/last-three-cast-members.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/expressions/lastN/last-three-cast-members-output.sh");
  });
}, dbName);
