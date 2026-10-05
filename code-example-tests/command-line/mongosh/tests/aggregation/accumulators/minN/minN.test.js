const { execSync } = require("child_process");
const Expect = require("../../../../utils/comparison/Expect.js");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker.js");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("$minN accumulator tests", () => {
  test("Should return the three lowest-rated Horror movies", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/accumulators/minN/find-minimum-three-single-genre.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/accumulators/minN/find-minimum-three-single-genre-output.sh");
  });

  test("Should return the three lowest-rated movies across multiple genres", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/accumulators/minN/find-minimum-three-across-genres.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/accumulators/minN/find-minimum-three-across-genres-output.sh");
  });

  test("Should compute n dynamically based on the group key", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/accumulators/minN/compute-n-based-on-group-key.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/accumulators/minN/compute-n-based-on-group-key-output.sh");
  });
}, dbName);
