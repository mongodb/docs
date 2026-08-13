const Expect = require("../../utils/comparison/Expect");
const { execSync } = require("child_process");
const { describeWithSampleData } = require("../../utils/sampleDataChecker");

// The expected output files use the '...': '...' ellipsis pattern to elide
// volatile explain fields (timings, plan-cache hashes, server metadata) rather
// than an ignored-fields list. This keeps the files small enough to render on
// the docs page through an io-code-block, and keeps the fields the tutorial
// cites -- stage, keyPattern, nReturned, totalKeysExamined, totalDocsExamined
// -- explicitly asserted so the prose cannot drift from the data.
describe("Interpret Explain Plan Results tutorial", () => {
  const dbName = "sample_mflix";
  const base = "tutorial/analyze-query-plan";

  describeWithSampleData("analyze query plan examples", () => {
    afterEach(() => {
      // Drop any indexes the examples created so the sample collection is
      // left in its original state. Wrapped in try/catch because an index
      // may not exist if a test failed before creating it.
      const dropIndexes = ["year_1", "year_1_rated_1", "rated_1_year_1"]
        .map(
          (name) =>
            `try { db.movies.dropIndex("${name}"); } catch (e) {}`
        )
        .join(" ");
      const command = `mongosh "${process.env.CONNECTION_STRING}" --quiet --eval '
        db = db.getSiblingDB("${dbName}");
        ${dropIndexes}
      '`;
      execSync(command, { encoding: "utf8" });
    });

    // The tutorial states how many documents each query matches. These two
    // tests pin those counts so the prose cannot drift from the data.
    test("Range query matches the documented number of documents", async () => {
      await Expect.outputFromExampleFiles([`${base}/range-query.js`])
        .withDbName(dbName)
        .shouldMatch(`${base}/range-query-output.sh`);
    });

    test("Range and equality query matches the documented number of documents", async () => {
      await Expect.outputFromExampleFiles([`${base}/range-rated-query.js`])
        .withDbName(dbName)
        .shouldMatch(`${base}/range-rated-query-output.sh`);
    });

    test("Query with no index uses a COLLSCAN", async () => {
      await Expect.outputFromExampleFiles([`${base}/range-explain.js`])
        .withDbName(dbName)
        .shouldMatch(`${base}/range-explain-no-index-output.sh`);
    });

    test("Creating an index on year returns the index name", async () => {
      await Expect.outputFromExampleFiles([`${base}/create-year-index.js`])
        .withDbName(dbName)
        .shouldMatch(`${base}/create-year-index-output.sh`);
    });

    test("Query with a single-field index uses an IXSCAN", async () => {
      await Expect.outputFromExampleFiles([
        `${base}/create-year-index.js`,
        `${base}/range-explain.js`,
      ])
        .withDbName(dbName)
        .shouldMatch(`${base}/range-explain-index-output.sh`);
    });

    test("Compound index { year: 1, rated: 1 } scans the year range first", async () => {
      await Expect.outputFromExampleFiles([
        `${base}/create-compound-indexes.js`,
        `${base}/hint-year-rated.js`,
      ])
        .withDbName(dbName)
        .shouldMatch(`${base}/hint-year-rated-output.sh`);
    });

    test("Compound index { rated: 1, year: 1 } scans the equality field first", async () => {
      await Expect.outputFromExampleFiles([
        `${base}/create-compound-indexes.js`,
        `${base}/hint-rated-year.js`,
      ])
        .withDbName(dbName)
        .shouldMatch(`${base}/hint-rated-year-output.sh`);
    });
  }, "sample_mflix");
});
