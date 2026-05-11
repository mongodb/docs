const Expect = require("../../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("$map expression operator example tests", () => {

  test("Should add 10 to each coordinate in an array", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/expressions/map/add-to-each-element.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/expressions/map/add-to-each-element-output.sh");
  });

  test("Should truncate each coordinate to an integer", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/expressions/map/truncate-each-element.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/expressions/map/truncate-each-element-output.sh");
  });

  test("Should compute genre scores using multiply and add", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/expressions/map/arithmetic-operators.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/expressions/map/arithmetic-operators-output.sh");
  });

  // arrayIndexAs requires MongoDB 8.3 or later
  test.skip("Should return ranked genres using arrayIndexAs", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/expressions/map/array-index-as.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/expressions/map/array-index-as-output.sh");
  });

  // $$IDX requires MongoDB 8.3 or later
  test.skip("Should return ranked genres using $$IDX", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/expressions/map/idx-variable.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/expressions/map/idx-variable-output.sh");
  });

}, dbName);
