const { execSync } = require("child_process");
const Expect = require("../../../../utils/comparison/Expect.js");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker.js");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("$firstN accumulator tests", () => {
  test("Should return the first three Horror movies", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/accumulators/firstN/find-first-three-horror.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/accumulators/firstN/find-first-three-horror-output.sh");
  });

  test("Should return the first three movies across multiple genres", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/accumulators/firstN/find-first-three-across-genres.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/accumulators/firstN/find-first-three-across-genres-output.sh");
  });

  test("Should compute n dynamically based on the group key", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/accumulators/firstN/compute-n-based-on-group-key.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/accumulators/firstN/compute-n-based-on-group-key-output.sh");
  });
}, dbName);
