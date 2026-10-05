const Expect = require("../../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describe("$top accumulator - null and missing values", () => {
  test("Should handle null and missing values", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/accumulators/top/null-missing-values.js"
      ])
      .withDbName("test")
      .shouldMatch("aggregation/accumulators/top/null-missing-values-output.sh");
  });
});

describe("$top accumulator - BSON sort ordering", () => {
  test("Should sort mixed BSON types correctly", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/accumulators/top/bson-sort-ordering.js"
      ])
      .withDbName("test")
      .shouldMatch("aggregation/accumulators/top/bson-sort-ordering-output.sh");
  });
});

describeWithSampleData("$top accumulator tests", () => {

  test("Should find the top-rated movie in the Comedy genre", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/accumulators/top/find-top-rating-genre.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/accumulators/top/find-top-rating-genre-output.sh");
  });

  test("Should find the top-rated movie for each MPAA rating", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/accumulators/top/find-top-rating-rated.js"
      ])
      .withDbName(dbName)
      .withOrderedSort()
      .shouldMatch("aggregation/accumulators/top/find-top-rating-rated-output.sh");
  });

}, dbName);
