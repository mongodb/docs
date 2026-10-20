const Expect = require("../../../../utils/comparison/Expect.js");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker.js");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("$convert sample_mflix tests", () => {
  test("Should convert imdb.rating and metacritic to the target types", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/expressions/convert/type-conversion/type-conversion.js"
      ])
      .withDbName(dbName)
      .withOrderedSort()
      .shouldMatch("aggregation/expressions/convert/type-conversion/type-conversion-output.sh");
  });

  /*
    This test is skipped because the `base` option for $convert requires
    MongoDB 8.3, which is not yet available for atlas-cli testing.

    Once MongoDB 8.3 is available in atlas-cli, this test should be re-enabled
    to ensure that $convert can convert an integer to a string in base 16.
  */
  test.skip("Should convert imdb.id to a hexadecimal string", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/expressions/convert/base-conversion/base-conversion.js"
      ])
      .withDbName(dbName)
      .withOrderedSort()
      .shouldMatch("aggregation/expressions/convert/base-conversion/base-conversion-output.sh");
  });
}, dbName);
