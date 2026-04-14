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
describeWithSampleData("db.collection.deleteMany() - delete by year", () => {
  backupAndRestore("movies_deletemany_year_bak");

  test("Should delete all documents matching year filter", async () => {
    await Expect
      .outputFromExampleFiles([
        "mongosh-commands/db.collection.deleteMany/delete-by-year.js"
      ])
      .withDbName("sample_mflix")
      .shouldMatch("mongosh-commands/db.collection.deleteMany/delete-by-year-output.sh");
  });
}, "sample_mflix");

// ---- Delete by rated and year ----
describeWithSampleData("db.collection.deleteMany() - delete by rated and year", () => {
  backupAndRestore("movies_deletemany_rated_year_bak");

  test("Should delete documents matching compound filter", async () => {
    await Expect
      .outputFromExampleFiles([
        "mongosh-commands/db.collection.deleteMany/delete-by-rated-year.js"
      ])
      .withDbName("sample_mflix")
      .shouldMatch("mongosh-commands/db.collection.deleteMany/delete-by-rated-year-output.sh");
  });
}, "sample_mflix");

// ---- Delete with let variable and maxTimeMS ----
describeWithSampleData("db.collection.deleteMany() - delete with let variable and maxTimeMS", () => {
  backupAndRestore("movies_deletemany_let_bak");

  test("Should delete documents using let variable", async () => {
    await Expect
      .outputFromExampleFiles([
        "mongosh-commands/db.collection.deleteMany/delete-with-let.js"
      ])
      .withDbName("sample_mflix")
      .shouldMatch("mongosh-commands/db.collection.deleteMany/delete-with-let-output.sh");
  });
}, "sample_mflix");

// ---- Write concern ----
describeWithSampleData("db.collection.deleteMany() - write concern", () => {
  backupAndRestore("movies_deletemany_writeconcern_bak");

  test("Should delete documents with write concern", async () => {
    await Expect
      .outputFromExampleFiles([
        "mongosh-commands/db.collection.deleteMany/write-concern.js"
      ])
      .withDbName("sample_mflix")
      .shouldMatch("mongosh-commands/db.collection.deleteMany/write-concern-output.sh");
  });
}, "sample_mflix");

// ---- Specify collation ----
describeWithSampleData("db.collection.deleteMany() - collation", () => {
  backupAndRestore("movies_deletemany_collation_bak");

  test("Should delete documents using English case-insensitive collation", async () => {
    await Expect
      .outputFromExampleFiles([
        "mongosh-commands/db.collection.deleteMany/collation-delete.js"
      ])
      .withDbName("sample_mflix")
      .shouldMatch("mongosh-commands/db.collection.deleteMany/collation-delete-output.sh");
  });
}, "sample_mflix");

// ---- Specify hint ----
describeWithSampleData("db.collection.deleteMany() - delete with hint", () => {
  backupAndRestore("movies_deletemany_hint_bak");

  test("Should delete documents using index hint", async () => {
    await Expect
      .outputFromExampleFiles([
        "mongosh-commands/db.collection.deleteMany/hint-create-index.js",
        "mongosh-commands/db.collection.deleteMany/hint-delete.js"
      ])
      .withDbName("sample_mflix")
      .shouldMatch("mongosh-commands/db.collection.deleteMany/hint-delete-output.sh");
  });
}, "sample_mflix");

// ---- Index stats ----
describeWithSampleData("db.collection.deleteMany() - index stats", () => {
  backupAndRestore("movies_deletemany_indexstats_bak");

  test("Should return index statistics after creating indexes", async () => {
    await Expect
      .outputFromExampleFiles([
        "mongosh-commands/db.collection.deleteMany/hint-create-index.js",
        "mongosh-commands/db.collection.deleteMany/index-stats.js"
      ])
      .withDbName("sample_mflix")
      .shouldMatch("mongosh-commands/db.collection.deleteMany/index-stats-output.sh");
  });
}, "sample_mflix");