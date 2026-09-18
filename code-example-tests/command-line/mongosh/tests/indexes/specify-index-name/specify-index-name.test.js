const { execSync } = require("child_process");
const Expect = require("../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../utils/sampleDataChecker");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("mongosh sample_mflix specify index name tests", () => {

  // Drop the text index created by the tests after each test
  afterEach(() => {
    const mongoUri = process.env.CONNECTION_STRING;
    const command = `mongosh "${mongoUri}" --eval "db = db.getSiblingDB('${dbName}'); db.comments.dropIndex('CommentsTextIndex');"`;

    try {
      execSync(command, { encoding: "utf8" });
    } catch (error) {
      console.error(`Failed to drop 'CommentsTextIndex' on '${dbName}':`, error.message);
    }
  });

  test("Should create a text index with a custom name", async () => {
    await Expect
      .outputFromExampleFiles([
        "indexes/specify-index-name/create-index.js"
      ])
      .withDbName(dbName)
      .shouldMatch("indexes/specify-index-name/create-index-output.sh");
  });

  test("Should list the created index in getIndexes output", async () => {
    await Expect
      .outputFromExampleFiles([
        "indexes/specify-index-name/create-index.js",
        "indexes/specify-index-name/get-indexes.js"
      ])
      .withDbName(dbName)
      .shouldMatch("indexes/specify-index-name/get-indexes-output.sh");
  });

}, dbName);
