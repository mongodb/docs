const Expect = require("../../../../utils/comparison/Expect.js");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker.js");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("$bottomN accumulator tests", () => {
  test("Should return the bottom three Short movies", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/accumulators/bottomN/find-bottom-three-shorts.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/accumulators/bottomN/find-bottom-three-shorts-output.sh");
  });

  test("Should return the bottom three movies across genres", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/accumulators/bottomN/find-bottom-per-genre.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/accumulators/bottomN/find-bottom-per-genre-output.sh");
  });

  test("Should compute n dynamically based on the group key", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/accumulators/bottomN/compute-n-based-on-group-key.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/accumulators/bottomN/compute-n-based-on-group-key-output.sh");
  });
}, dbName);
