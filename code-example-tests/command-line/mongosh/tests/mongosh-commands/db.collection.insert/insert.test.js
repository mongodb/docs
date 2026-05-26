const { execSync } = require("child_process");
const Expect = require("../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../utils/sampleDataChecker");

jest.setTimeout(10000);

// Backs up the entire sample_mflix.movies collection to a staging collection,
// then atomically restores it after the test using $out (preserving scan order).
function backupAndRestore(backupName) {
  const mongoUri = process.env.CONNECTION_STRING;

  beforeEach(() => {
    execSync(
      `mongosh "${mongoUri}" --eval "db = db.getSiblingDB('sample_mflix'); db.movies.aggregate([{ \\$out: '${backupName}' }]);"`,
      { encoding: "utf8" }
    );
  });

  afterEach(() => {
    try {
      execSync(
        `mongosh "${mongoUri}" --eval "db = db.getSiblingDB('sample_mflix'); db.${backupName}.aggregate([{ \\$out: 'movies' }]); db.${backupName}.drop();"`,
        { encoding: "utf8" }
      );
    } catch (e) {
      console.error(`Failed to restore from ${backupName}:`, e.message);
    }
  });
}

// ---- insert without _id ----
describeWithSampleData("db.collection.insert() - without _id", () => {
  backupAndRestore("movies_insert_noid_bak");

  test("Should insert a document and return insertedId", async () => {
    await Expect
      .outputFromExampleFiles([
        "mongosh-commands/db.collection.insert/insert-without-id.js"
      ])
      .withDbName("sample_mflix")
      .shouldMatch("mongosh-commands/db.collection.insert/insert-without-id-output.sh");
  });
}, "sample_mflix");

// ---- insert with _id ----
describeWithSampleData("db.collection.insert() - with _id", () => {
  backupAndRestore("movies_insert_withid_bak");

  test("Should insert a document with a specified _id", async () => {
    await Expect
      .outputFromExampleFiles([
        "mongosh-commands/db.collection.insert/insert-with-id.js"
      ])
      .withDbName("sample_mflix")
      .shouldMatch("mongosh-commands/db.collection.insert/insert-with-id-output.sh");
  });
}, "sample_mflix");

// ---- insert multiple documents ----
describeWithSampleData("db.collection.insert() - multiple documents", () => {
  backupAndRestore("movies_insert_multiple_bak");

  test("Should insert multiple documents and return insertedIds", async () => {
    await Expect
      .outputFromExampleFiles([
        "mongosh-commands/db.collection.insert/insert-multiple.js"
      ])
      .withDbName("sample_mflix")
      .shouldMatch("mongosh-commands/db.collection.insert/insert-multiple-output.sh");
  });
}, "sample_mflix");
