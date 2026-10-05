const { execSync } = require("child_process");
const Expect = require("../../../../utils/comparison/Expect.js");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker.js");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("$firstN accumulator tests", () => {
  test("Should return the first three cast members using $firstN expression", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/expressions/firstN/first-three-cast-members.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/expressions/firstN/first-three-cast-members-output.sh");
  });
}, dbName);
