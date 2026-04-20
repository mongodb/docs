const Expect = require("../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../utils/sampleDataChecker");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("query for null or missing fields example tests", () => {

  test("Should return documents where metacritic is null or missing", async () => {
    await Expect
      .outputFromExampleFiles(["tutorial/query-for-null-fields/find-null-or-missing.js"])
      .withDbName(dbName)
      .shouldResemble("tutorial/query-for-null-fields/find-null-or-missing-output.sh")
      .withSchema({
        count: 5,
        requiredFields: ["_id", "title"],
      });
  });

  test("Should return documents where metacritic exists and is not null", async () => {
    await Expect
      .outputFromExampleFiles(["tutorial/query-for-null-fields/find-ne-null.js"])
      .withDbName(dbName)
      .shouldResemble("tutorial/query-for-null-fields/find-ne-null-output.sh")
      .withSchema({
        count: 5,
        requiredFields: ["_id", "title", "metacritic"],
      });
  });

  test("Should return documents where metacritic field has BSON null type", async () => {
    await Expect
      .outputFromExampleFiles(["tutorial/query-for-null-fields/find-null-type.js"])
      .withDbName(dbName)
      .shouldResemble("tutorial/query-for-null-fields/find-null-type-output.sh")
      .withSchema({
        count: 0,
        requiredFields: [],
      });
  });

  test("Should return documents where metacritic field does not exist", async () => {
    await Expect
      .outputFromExampleFiles(["tutorial/query-for-null-fields/find-missing-field.js"])
      .withDbName(dbName)
      .shouldResemble("tutorial/query-for-null-fields/find-missing-field-output.sh")
      .withSchema({
        count: 5,
        requiredFields: ["_id", "title"],
      });
  });

}, dbName);
