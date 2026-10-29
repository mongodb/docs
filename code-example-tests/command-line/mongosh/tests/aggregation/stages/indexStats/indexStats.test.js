const { execSync } = require("child_process");
const Expect = require("../../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker");

jest.setTimeout(15000);

const dbName = "sample_mflix";
const textIndexName = "cast_text_fullplot_text_genres_text_title_text";
const createdIndexNames = ["year_1_title_1", "rated_1_year_1", "metacritic_1"];

// The example documents $indexStats output for the sample_mflix "movies"
// collection, which includes the canonical text index. Other suites create
// and drop indexes on "movies" (and one leaves stray indexes behind), so the
// collection's exact index set is not stable across a full suite run. Drop
// any index outside the documented set to keep the number of indexes
// $indexStats returns deterministic regardless of test order. The text index
// is intentionally kept in place: it IS the documented sample index.
beforeAll(() => {
  const normalizeIndexes = `mongosh "${process.env.CONNECTION_STRING}" --quiet --eval '
    db = db.getSiblingDB("${dbName}");
    const documented = ["${textIndexName}", ${createdIndexNames.map((name) => `"${name}"`).join(", ")}];
    db.movies.getIndexes()
      .filter((i) => i.name !== "_id_" && !documented.includes(i.name))
      .forEach((i) => db.movies.dropIndex(i.name));
    const exists = db.movies.getIndexes().some((i) => i.name === "${textIndexName}");
    if (!exists) {
      db.movies.createIndex(
        { cast: "text", fullplot: "text", genres: "text", title: "text" },
        { name: "${textIndexName}" }
      );
    }
  '`;
  execSync(normalizeIndexes, { encoding: "utf8" });
});

describeWithSampleData("mongosh tests for $indexStats aggregation stage", () => {

  afterEach(() => {
    // Drop the indexes the example creates so the next run starts clean.
    const dropCreatedIndexes = `mongosh "${process.env.CONNECTION_STRING}" --quiet --eval "db = db.getSiblingDB('${dbName}'); [${createdIndexNames.map((name) => `'${name}'`).join(", ")}].forEach((name) => { try { db.movies.dropIndex(name); } catch (e) {} });"`;
    try {
      execSync(dropCreatedIndexes, { encoding: "utf8" });
    } catch (error) {
      // Ignore — indexes may not exist if the example failed before creating them
    }
  });

  test("Should return usage statistics for each index", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/stages/indexStats/create-indexes.js",
        "aggregation/stages/indexStats/run-queries.js",
        "aggregation/stages/indexStats/index-stats.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/stages/indexStats/index-stats-output.sh");
  });

}, dbName);
