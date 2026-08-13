const Expect = require("../../utils/comparison/Expect");
const { execSync } = require("child_process");
const { describeWithSampleData } = require("../../utils/sampleDataChecker");

describe("Query Plans reference page", () => {
  const dbName = "sample_mflix";
  const base = "core/query-plans";

  describeWithSampleData("planCacheKey examples", () => {
    afterEach(() => {
      // Drop the indexes the example created so sample_mflix.movies is left
      // in its original state. Wrapped in try/catch because an index may not
      // exist if a test failed before creating it.
      const dropIndexes = [
        "{ year: 1 }",
        "{ year: 1, runtime: 1 }",
        '{ year: 1, "imdb.rating": 1 }',
      ]
        .map((key) => `try { db.movies.dropIndex(${key}); } catch (e) {}`)
        .join(" ");
      const command = `mongosh "${process.env.CONNECTION_STRING}" --quiet --eval '
        db = db.getSiblingDB("${dbName}");
        ${dropIndexes}
      '`;
      execSync(command, { encoding: "utf8" });
    });

    // Two same-shape queries produce different planCacheKey values because the
    // partial index supports one query but not the other. The exact hashes are
    // version-dependent, so the example asserts only that the keys differ.
    test("Same-shape queries have different planCacheKey values", async () => {
      await Expect.outputFromExampleFiles([
        `${base}/create-indexes.js`,
        `${base}/same-shape-query-1.js`,
        `${base}/same-shape-query-2.js`,
        `${base}/compare-plan-cache-keys.js`,
      ])
        .withDbName(dbName)
        .shouldMatch(`${base}/compare-plan-cache-keys-output.sh`);
    });

    // Each same-shape query is also verified on its own. The expected output
    // pins the stable plan shape and elides the version-dependent hashes with
    // the '...': '...' pattern.
    test("Query Operation 1 returns a query plan for the year range", async () => {
      await Expect.outputFromExampleFiles([
        `${base}/create-indexes.js`,
        `${base}/same-shape-query-1.js`,
      ])
        .withDbName(dbName)
        .shouldMatch(`${base}/same-shape-query-1-output.sh`);
    });

    test("Query Operation 2 returns a query plan for the year range", async () => {
      await Expect.outputFromExampleFiles([
        `${base}/create-indexes.js`,
        `${base}/same-shape-query-2.js`,
      ])
        .withDbName(dbName)
        .shouldMatch(`${base}/same-shape-query-2-output.sh`);
    });
  }, "sample_mflix");
});
