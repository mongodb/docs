const { execSync } = require("child_process");
const Expect = require("../../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("$bottom accumulator tests", () => {

  test("Should find the bottom-rated movie in the Comedy genre", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/accumulators/bottom/find-bottom-rating-genre.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/accumulators/bottom/find-bottom-rating-genre-output.sh");
  });

  test("Should find the bottom-rated movie for each year (2010-2012)", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/accumulators/bottom/find-bottom-rating-years.js"
      ])
      .withDbName(dbName)
      .withOrderedSort()
      .shouldMatch("aggregation/accumulators/bottom/find-bottom-rating-years-output.sh");
  });

}, dbName);
