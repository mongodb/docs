const Expect = require("../../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker");

jest.setTimeout(10000); // Do not increase this. If tests time out, the backupAndRestore or example is too slow — diagnose the root cause.

const dbName = "sample_mflix";

describeWithSampleData("$dateToString expression example tests", () => {

  test("Should convert the comments date field to formatted strings", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/expressions/dateToString/convert-date-to-string.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/expressions/dateToString/convert-date-to-string-output.sh");
  });

}, dbName);
