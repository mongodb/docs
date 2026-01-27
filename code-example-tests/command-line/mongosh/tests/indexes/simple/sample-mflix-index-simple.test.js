const { execSync } = require("child_process");
const Expect = require("../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../utils/sampleDataChecker");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("mongosh sample_mflix simple index tests", () => {

  // Drop all indexes on the sample_mflix.movies collection after running the tests
  afterEach(() => {
    const mongoUri = process.env.CONNECTION_STRING;
    const command = `mongosh "${mongoUri}" --eval "db = db.getSiblingDB('${dbName}'); db.movies.dropIndexes();"`;

    try {
      execSync(command, { encoding: "utf8" });
    } catch (error) {
      console.error(`Failed to drop indexes on '${dbName}':`, error.message);
    }
  });

  test("Should create simple index on movies collection", async () => {
    await Expect
      .outputFromExampleFiles([
        "indexes/simple/create-simple-index/create-index.js"
      ])
      .withDbName(dbName)
      .shouldMatch("indexes/simple/create-simple-index/output.sh");
  });

  test("Should find document using simple index", async () => {
    await Expect
      .outputFromExampleFiles([
        "indexes/simple/create-simple-index/create-index.js",
        "indexes/simple/find-simple-index/find.js"
      ])
      .withDbName(dbName)
      .shouldMatch("indexes/simple/find-simple-index/output.sh");
  });

}, dbName);
