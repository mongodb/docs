const Expect = require("../../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("$lookup aggregation stage example tests", () => {

  test("Should join movies with comments on _id", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/stages/lookup/equality-join.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/stages/lookup/equality-join-output.sh");
  });

  test("Should join movies with users using a cast array field", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/stages/lookup/array-lookup.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/stages/lookup/array-lookup-output.sh");
  });

  test("Should merge comment fields into movie documents", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/stages/lookup/merge-objects.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/stages/lookup/merge-objects-output.sh");
  });

  test("Should return post-release comments using multiple join conditions", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/stages/lookup/multiple-join-conditions.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/stages/lookup/multiple-join-conditions-output.sh");
  });

  test("Should join users with long movies using an uncorrelated subquery", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/stages/lookup/uncorrelated-subquery.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/stages/lookup/uncorrelated-subquery-output.sh");
  });

  test("Should return post-release comments using concise correlated subquery", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/stages/lookup/concise-correlated-subquery.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/stages/lookup/concise-correlated-subquery-output.sh");
  });

  test("Should return post-release comments using verbose correlated subquery", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/stages/lookup/verbose-correlated-subquery.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/stages/lookup/verbose-correlated-subquery-output.sh");
  });

}, dbName);
