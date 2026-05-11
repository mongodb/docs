const Expect = require("../../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("$match aggregation stage example tests", () => {

  test("Should return movies matching rated TV-PG and runtime > 1000", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/stages/match/equality-match.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/stages/match/equality-match-output.sh");
  });

  test("Should count movies with runtime > 1000 or year < 1910", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/stages/match/count.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/stages/match/count-output.sh");
  });

}, dbName);

describe("$match aggregation stage example tests (inline data)", () => {

  test("Should filter documents using $elemMatch on scores array", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/stages/match/elem-match.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/stages/match/elem-match-output.sh");
  });

});
