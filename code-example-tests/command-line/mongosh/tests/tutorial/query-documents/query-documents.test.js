const Expect = require("../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../utils/sampleDataChecker");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("query documents example tests", () => {

  test("Should return all documents in a collection", async () => {
    await Expect
      .outputFromExampleFiles(["tutorial/query-documents/find-all.js"])
      .withDbName(dbName)
      .shouldResemble("tutorial/query-documents/find-all-output.sh")
      .withSchema({
        count: 5,
        requiredFields: ["_id", "title"],
      });
  });

  test("Should return documents matching an equality condition", async () => {
    await Expect
      .outputFromExampleFiles(["tutorial/query-documents/find-equality.js"])
      .withDbName(dbName)
      .shouldResemble("tutorial/query-documents/find-equality-output.sh")
      .withSchema({
        count: 5,
        requiredFields: ["_id", "title", "rated"],
        fieldValues: { rated: "PG-13" },
      });
  });

  test("Should return documents using the $in query operator", async () => {
    await Expect
      .outputFromExampleFiles(["tutorial/query-documents/find-in-operator.js"])
      .withDbName(dbName)
      .shouldResemble("tutorial/query-documents/find-in-operator-output.sh")
      .withSchema({
        count: 5,
        requiredFields: ["_id", "title", "rated"],
      });
  });

  test("Should return documents matching AND conditions", async () => {
    await Expect
      .outputFromExampleFiles(["tutorial/query-documents/find-and.js"])
      .withDbName(dbName)
      .shouldResemble("tutorial/query-documents/find-and-output.sh")
      .withSchema({
        count: 5,
        requiredFields: ["_id", "title", "rated", "runtime"],
        fieldValues: { rated: "G" },
      });
  });

  test("Should return documents matching OR conditions", async () => {
    await Expect
      .outputFromExampleFiles(["tutorial/query-documents/find-or.js"])
      .withDbName(dbName)
      .shouldResemble("tutorial/query-documents/find-or-output.sh")
      .withSchema({
        count: 5,
        requiredFields: ["_id", "title"],
      });
  });

  test("Should return documents matching AND and OR conditions", async () => {
    await Expect
      .outputFromExampleFiles(["tutorial/query-documents/find-and-or.js"])
      .withDbName(dbName)
      .shouldResemble("tutorial/query-documents/find-and-or-output.sh")
      .withSchema({
        count: 5,
        requiredFields: ["_id", "title", "rated"],
        fieldValues: { rated: "G" },
      });
  });

}, dbName);
