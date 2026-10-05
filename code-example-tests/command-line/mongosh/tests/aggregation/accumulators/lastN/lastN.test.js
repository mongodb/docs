const { execSync } = require("child_process");
const Expect = require("../../../../utils/comparison/Expect.js");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker.js");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("$lastN accumulator tests", () => {
  test("Should return the last three Horror movies", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/accumulators/lastN/find-last-three-horror.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/accumulators/lastN/find-last-three-horror-output.sh");
  });

  test("Should return the last three movies across multiple genres", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/accumulators/lastN/find-last-three-across-genres.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/accumulators/lastN/find-last-three-across-genres-output.sh");
  });

  test("Should compute n dynamically based on the group key", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/accumulators/lastN/compute-n-based-on-group-key.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/accumulators/lastN/compute-n-based-on-group-key-output.sh");
  });
}, dbName);
