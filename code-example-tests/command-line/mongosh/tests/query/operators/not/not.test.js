const Expect = require("../../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("$not operator example tests", () => {

  test("Should find movies with runtime over 1000 minutes whose titles do not start with T", async () => {
    await Expect
      .outputFromExampleFiles([
        "query/operators/not/not-regex.js"
      ])
      .withDbName(dbName)
      .shouldMatch("query/operators/not/not-regex-output.sh");
  });

  test("Should find movies with runtime over 1000 minutes whose titles do not start with T by using $not with a $regex string expression", async () => {
    await Expect
      .outputFromExampleFiles([
        "query/operators/not/not-regex-string.js"
      ])
      .withDbName(dbName)
      .shouldMatch("query/operators/not/not-regex-string-output.sh");
  });

  test("Should find movies with runtime over 1000 minutes whose titles do not start with T by using $not with a $regex literal expression", async () => {
    await Expect
      .outputFromExampleFiles([
        "query/operators/not/not-regex-literal.js"
      ])
      .withDbName(dbName)
      .shouldMatch("query/operators/not/not-regex-literal-output.sh");
  });

}, dbName);
