const Expect = require("../../../../utils/comparison/Expect.js");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker.js");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("$topN accumulator tests", () => {
  test("Should return the top three Short movies", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/accumulators/topN/find-top-three-shorts.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/accumulators/topN/find-top-three-shorts-output.sh");
  });

  test("Should return the top three movies across genres", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/accumulators/topN/find-top-per-genre.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/accumulators/topN/find-top-per-genre-output.sh");
  });

  test("Should compute n dynamically based on the group key", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/accumulators/topN/compute-n-based-on-group-key.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/accumulators/topN/compute-n-based-on-group-key-output.sh");
  });
}, dbName);
