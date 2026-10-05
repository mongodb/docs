const { execSync } = require("child_process");
const Expect = require("../../../../utils/comparison/Expect.js");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker.js");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("$count accumulator tests", () => {
  test("Should count movies by genre", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/accumulators/count/count-movies-by-genre.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/accumulators/count/count-movies-by-genre-output.sh");
  });
}, dbName);
