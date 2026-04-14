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

// ---- Delete by year ----
describeWithSampleData("db.collection.deleteOne() - delete by year", () => {
  backupAndRestore("movies_deleteone_year_bak");

  test("Should delete the first document matching year filter", async () => {
    await Expect
      .outputFromExampleFiles([
        "mongosh-commands/db.collection.deleteOne/delete-by-year.js"
      ])
      .withDbName("sample_mflix")
      .shouldMatch("mongosh-commands/db.collection.deleteOne/delete-by-year-output.sh");
  });
}, "sample_mflix");

// ---- Delete with let variable and maxTimeMS ----
describeWithSampleData("db.collection.deleteOne() - delete with let variable and maxTimeMS", () => {
  backupAndRestore("movies_deleteone_let_bak");

  test("Should delete one document using let variable", async () => {
    await Expect
      .outputFromExampleFiles([
        "mongosh-commands/db.collection.deleteOne/delete-with-let.js"
      ])
      .withDbName("sample_mflix")
      .shouldMatch("mongosh-commands/db.collection.deleteOne/delete-with-let-output.sh");
  });
}, "sample_mflix");

// ---- Write concern ----
describeWithSampleData("db.collection.deleteOne() - write concern", () => {
  backupAndRestore("movies_deleteone_writeconcern_bak");

  test("Should delete one document with write concern", async () => {
    await Expect
      .outputFromExampleFiles([
        "mongosh-commands/db.collection.deleteOne/write-concern.js"
      ])
      .withDbName("sample_mflix")
      .shouldMatch("mongosh-commands/db.collection.deleteOne/write-concern-output.sh");
  });
}, "sample_mflix");

// ---- Specify collation ----
describeWithSampleData("db.collection.deleteOne() - collation", () => {
  backupAndRestore("movies_deleteone_collation_bak");

  test("Should delete one document using English case-insensitive collation", async () => {
    await Expect
      .outputFromExampleFiles([
        "mongosh-commands/db.collection.deleteOne/collation-delete.js"
      ])
      .withDbName("sample_mflix")
      .shouldMatch("mongosh-commands/db.collection.deleteOne/collation-delete-output.sh");
  });
}, "sample_mflix");

// ---- Specify hint ----
describeWithSampleData("db.collection.deleteOne() - delete with hint", () => {
  backupAndRestore("movies_deleteone_hint_bak");

  test("Should delete one document using index hint", async () => {
    await Expect
      .outputFromExampleFiles([
        "mongosh-commands/db.collection.deleteOne/hint-create-index.js",
        "mongosh-commands/db.collection.deleteOne/hint-delete.js"
      ])
      .withDbName("sample_mflix")
      .shouldMatch("mongosh-commands/db.collection.deleteOne/hint-delete-output.sh");
  });
}, "sample_mflix");

// ---- Index stats ----
describeWithSampleData("db.collection.deleteOne() - index stats", () => {
  backupAndRestore("movies_deleteone_indexstats_bak");

  test("Should return index statistics after creating indexes", async () => {
    await Expect
      .outputFromExampleFiles([
        "mongosh-commands/db.collection.deleteOne/hint-create-index.js",
        "mongosh-commands/db.collection.deleteOne/index-stats.js"
      ])
      .withDbName("sample_mflix")
      .shouldMatch("mongosh-commands/db.collection.deleteOne/index-stats-output.sh");
  });
}, "sample_mflix");
