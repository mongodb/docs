const { execSync } = require("child_process");
const Expect = require("../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../utils/sampleDataChecker");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("mongosh sample_mflix multikey index tutorial tests", () => {

  // Drop the genres index created by the tests after each test
  afterEach(() => {
    const mongoUri = process.env.CONNECTION_STRING;
    const command = `mongosh "${mongoUri}" --eval "db = db.getSiblingDB('${dbName}'); db.movies.dropIndex({ genres: 1 });"`;

    try {
      execSync(command, { encoding: "utf8" });
    } catch (error) {
      console.error(`Failed to drop genres index on '${dbName}':`, error.message);
    }
  });

  test("Should create an ascending multikey index on the genres field", async () => {
    await Expect
      .outputFromExampleFiles([
        "indexes/multikey/array-field.js"
      ])
      .withDbName(dbName)
      .shouldMatch("indexes/multikey/array-field-output.sh");
  });

  test("Should find early short films on the genres multikey index", async () => {
    await Expect
      .outputFromExampleFiles([
        "indexes/multikey/array-field.js",
        "indexes/multikey/query-early-shorts.js"
      ])
      .withDbName(dbName)
      .shouldMatch("indexes/multikey/query-early-shorts-output.sh");
  });

}, dbName);
