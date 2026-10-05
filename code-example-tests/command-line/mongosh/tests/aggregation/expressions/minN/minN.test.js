const { execSync } = require("child_process");
const Expect = require("../../../../utils/comparison/Expect.js");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker.js");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("$minN expression tests", () => {
  test("Should return the two first alphabetical genres using $minN expression", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/expressions/minN/min-two-genres.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/expressions/minN/min-two-genres-output.sh");
  });
}, dbName);
