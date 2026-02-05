const { execSync } = require("child_process");
const Expect = require("../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../utils/sampleDataChecker");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("mongosh sample_mflix index collation tests", () => {

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

  test("Should create index with collation", async () => {
    await Expect
      .outputFromExampleFiles([
        "indexes/collation/create-collation-index/create-index.js"
      ])
      .withDbName(dbName)
      .shouldMatch("indexes/collation/create-collation-index/output.sh");
  });

  test("Should find docs using index with collation", async () => {
    await Expect
      .outputFromExampleFiles([
        "indexes/collation/create-collation-index/create-index.js",
        "indexes/collation/find-collation-index/find.js"
      ])
      .withDbName(dbName)
      .shouldMatch("indexes/collation/find-collation-index/output.sh");
  });

  test("Should find docs without using index with collation", async () => {
    await Expect
      .outputFromExampleFiles([
        "indexes/collation/find-no-collation-index/find.js"
      ])
      .withDbName(dbName)
      .shouldMatch("indexes/collation/find-no-collation-index/output.sh");
  });

  test("Should create compound index with collation", async () => {
    await Expect
      .outputFromExampleFiles([
        "indexes/collation/create-collation-compound-index/create-index.js"
      ])
      .withDbName(dbName)
      .shouldMatch("indexes/collation/create-collation-compound-index/output.sh");
  });

  test("Should find docs using compound index with collation (year key)", async () => {
    await Expect
      .outputFromExampleFiles([
        "indexes/collation/create-collation-compound-index/create-index.js",
        "indexes/collation/find-compound-collation-index-year/find.js"
      ])
      .withDbName(dbName)
      .shouldMatch("indexes/collation/find-compound-collation-index-year/output.sh");
  });

  test("Should find docs using compound index with collation (year, metacritic keys, sort by title)", async () => {
    await Expect
      .outputFromExampleFiles([
        "indexes/collation/create-collation-compound-index/create-index.js",
        "indexes/collation/find-compound-collation-index-year-title/find.js"
      ])
      .withDbName(dbName)
      .shouldMatch("indexes/collation/find-compound-collation-index-year-title/output.sh");
  });

  test("Should find docs using partial index on year and simple collation", async () => {
    await Expect
      .outputFromExampleFiles([
        "indexes/collation/create-collation-compound-index/create-index.js",
        "indexes/collation/find-compound-index-year-partial/find.js"
      ])
      .withDbName(dbName)
      .shouldMatch("indexes/collation/find-compound-index-year-partial/output.sh");
  });

  test("Should create a simple index on movies with fr collation, strength: 2", async () => {
    await Expect
      .outputFromExampleFiles([
        "indexes/collation/create-simple-index-collation-strength/create-index.js",
      ])
      .withDbName(dbName)
      .shouldMatch("indexes/collation/create-simple-index-collation-strength/output.sh");
  });

  test("Should create a compound index on movies with fr collation, strength: 2", async () => {
    await Expect
      .outputFromExampleFiles([
        "indexes/collation/create-compound-index-collation-strength/create-index.js",
      ])
      .withDbName(dbName)
      .shouldMatch("indexes/collation/create-compound-index-collation-strength/output.sh");
  });

}, dbName);
