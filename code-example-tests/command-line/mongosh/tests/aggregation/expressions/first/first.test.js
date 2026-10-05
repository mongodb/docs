const { execSync } = require("child_process");
const Expect = require("../../../../utils/comparison/Expect.js");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker.js");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("$first expression tests", () => {
  test("Should return the first cast member for specific movies", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/expressions/first/first-cast-member.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/expressions/first/first-cast-member-output.sh");
  });
}, dbName);
