const { execSync } = require("child_process");
const Expect = require("../../../../utils/comparison/Expect.js");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker.js");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("$maxN accumulator tests", () => {
  test("Should return the three highest rated movies from 1999", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/accumulators/maxN/find-top-three-1999.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/accumulators/maxN/find-top-three-1999-output.sh");
  });

  test("Should return the three highest rated movies across multiple years", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/accumulators/maxN/find-top-three-across-years.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/accumulators/maxN/find-top-three-across-years-output.sh");
  });

  test("Should compute n dynamically based on the group key", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/accumulators/maxN/compute-n-based-on-group-key.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/accumulators/maxN/compute-n-based-on-group-key-output.sh");
  });
}, dbName);
