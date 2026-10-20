const Expect = require("../../../../utils/comparison/Expect.js");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker.js");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("$accumulator operator tests", () => {
  test("Should compute the average IMDb rating for each content rating", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/accumulators/accumulator/implement-avg.js"
      ])
      .withDbName(dbName)
      .shouldResemble("aggregation/accumulators/accumulator/implement-avg-output.sh")
      .withSchema({
        count: 4,
        requiredFields: ["_id", "avgRating"]
      });
  });

  test("Should compute the same averages with the $avg equivalent pipeline", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/accumulators/accumulator/avg-equivalent.js"
      ])
      .withDbName(dbName)
      .withOrderedSort()
      .shouldMatch("aggregation/accumulators/accumulator/avg-equivalent-output.sh");
  });

  test("Should vary the initial state based on the group key", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/accumulators/accumulator/vary-initial-state.js"
      ])
      .withDbName(dbName)
      .shouldResemble("aggregation/accumulators/accumulator/vary-initial-state-output.sh")
      .withSchema({
        count: 4,
        requiredFields: ["_id", "movies"]
      });
  });
}, dbName);
