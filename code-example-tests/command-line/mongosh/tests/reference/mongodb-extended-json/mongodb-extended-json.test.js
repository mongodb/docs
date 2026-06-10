const Expect = require("../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../utils/sampleDataChecker");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("Extended JSON examples", () => {

  test("Should serialize a document to Extended JSON format", async () => {
    await Expect
      .outputFromExampleFiles([
        "reference/mongodb-extended-json/ejson-serialize.js"
      ])
      .withDbName(dbName)
      .shouldMatch("reference/mongodb-extended-json/ejson-serialize-output.sh");
  });

  test("Should deserialize an Extended JSON object back to BSON types", async () => {
    await Expect
      .outputFromExampleFiles([
        "reference/mongodb-extended-json/ejson-serialize.js",
        "reference/mongodb-extended-json/ejson-deserialize.js"
      ])
      .withDbName(dbName)
      .shouldMatch("reference/mongodb-extended-json/ejson-deserialize-output.sh");
  });

  test("Should stringify a document to an Extended JSON string", async () => {
    await Expect
      .outputFromExampleFiles([
        "reference/mongodb-extended-json/ejson-stringify.js"
      ])
      .withDbName(dbName)
      .shouldMatch("reference/mongodb-extended-json/ejson-stringify-output.sh");
  });

  test("Should parse an Extended JSON string back to an object", async () => {
    await Expect
      .outputFromExampleFiles([
        "reference/mongodb-extended-json/ejson-stringify.js",
        "reference/mongodb-extended-json/ejson-parse.js"
      ])
      .withDbName(dbName)
      .shouldMatch("reference/mongodb-extended-json/ejson-parse-output.sh");
  });

}, dbName);
