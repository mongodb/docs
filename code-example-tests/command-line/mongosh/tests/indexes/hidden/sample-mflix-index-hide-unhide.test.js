const { execSync } = require("child_process");
const Expect = require("../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../utils/sampleDataChecker");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("mongosh sample_mflix index hide tests", () => {

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

  test("Should hide index", async () => {
    await Expect
      .outputFromExampleFiles([
        "indexes/hidden/hide/create.js",
        "indexes/hidden/hide/hide.js"
      ])
      .withDbName(dbName)
      .shouldMatch("indexes/hidden/hide/output.sh");
  });

  test("Should unhide index", async () => {
    await Expect
      .outputFromExampleFiles([
        "indexes/hidden/hide/create.js",
        "indexes/hidden/hide/hide.js",
        "indexes/hidden/unhide/unhide.js"
      ])
      .withDbName(dbName)
      .shouldMatch("indexes/hidden/unhide/output.sh");
  });
 

}, dbName);
