const { execSync } = require("child_process");
const path = require("path");
const makeTempFileForTesting = require("../../../utils/makeTempFileForTesting");
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

// ---- insertMany without _id ----
describeWithSampleData("db.collection.insertMany() - without _id", () => {
  backupAndRestore("movies_insertmany_noid_bak");

  test("Should insert multiple documents and return insertedIds", async () => {
    await Expect
      .outputFromExampleFiles([
        "mongosh-commands/db.collection.insertMany/insert-many-without-id.js"
      ])
      .withDbName("sample_mflix")
      .shouldMatch("mongosh-commands/db.collection.insertMany/insert-many-without-id-output.sh");
  });
}, "sample_mflix");

// ---- insertMany with _id ----
describeWithSampleData("db.collection.insertMany() - with _id", () => {
  backupAndRestore("movies_insertmany_withid_bak");

  test("Should insert multiple documents with specified _id values", async () => {
    await Expect
      .outputFromExampleFiles([
        "mongosh-commands/db.collection.insertMany/insert-many-with-id.js"
      ])
      .withDbName("sample_mflix")
      .shouldMatch("mongosh-commands/db.collection.insertMany/insert-many-with-id-output.sh");
  });
}, "sample_mflix");

// ---- insertMany unordered with duplicate _id values ----
// Uses makeTempFileForTesting with validateOutput: false to avoid printjson()
// wrapping, which is incompatible with try/catch statements.
describeWithSampleData("db.collection.insertMany() - unordered with duplicates", () => {
  backupAndRestore("movies_insertmany_unordered_bak");

  test("Should insert non-duplicate documents and throw on duplicate _id values when ordered: false", () => {
    const mongoUri = process.env.CONNECTION_STRING;

    const tempFilePath = makeTempFileForTesting({
      connectionString: mongoUri,
      dbName: "sample_mflix",
      filepath: "mongosh-commands/db.collection.insertMany/insert-many-unordered.js",
      validateOutput: false,
    });

    const stdout = execSync(
      `mongosh --nodb --file ${tempFilePath}`,
      { encoding: "utf8" }
    );

    expect(stdout).toContain("insertedCount: 5");
    expect(stdout).toContain("11000");
  });
}, "sample_mflix");
