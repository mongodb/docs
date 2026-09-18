const { execSync } = require("child_process");
const Expect = require("../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../utils/sampleDataChecker");

jest.setTimeout(15000);

const dbName = "sample_mflix";
const textIndexName = "cast_text_fullplot_text_genres_text_title_text";

// Other suites create and drop indexes on "movies" (and one leaves stray
// indexes behind), so the collection's exact index set is not stable across a
// full suite run; the schemas below assert only values that are invariant. The
// one stable shape — a filtered indexDetails containing exactly the text index —
// is verified directly in the filter tests, outside the schema comparison.

// The stats examples document the sample_mflix "movies" text index, which
// other suites drop in their cleanup. Recreate it when missing so these tests
// are order-independent. The index is intentionally left in place: it IS the
// canonical sample index, so recreating it restores the documented sample state
// for every later suite rather than removing it again.
beforeAll(() => {
  const checkAndCreate = `mongosh "${process.env.CONNECTION_STRING}" --quiet --eval '
    db = db.getSiblingDB("${dbName}");
    const exists = db.movies.getIndexes().some((i) => i.name === "${textIndexName}");
    if (!exists) {
      db.movies.createIndex(
        { cast: "text", fullplot: "text", genres: "text", title: "text" },
        { name: "${textIndexName}" }
      );
    }
  '`;
  execSync(checkAndCreate, { encoding: "utf8" });
});

describeWithSampleData("db.collection.stats() tests", () => {

  test("Should return basic stats for the sample_mflix.movies collection", async () => {
    await Expect
      .outputFromExampleFiles([
        "mongosh-commands/db.collection.stats/stats-basic.js"
      ])
      .withDbName(dbName)
      .shouldResemble("mongosh-commands/db.collection.stats/stats-basic-output.sh")
      .withSchema({
        count: 1,
        requiredFields: [
          "ns", "size", "count", "avgObjSize",
          "storageSize", "capped", "nindexes",
          "totalIndexSize", "totalSize", "indexSizes",
          "scaleFactor", "ok"
        ],
        fieldValues: {
          ns: "sample_mflix.movies",
          count: 21349,
          capped: false,
          scaleFactor: 1,
          ok: 1
        }
      });
  });

  test("Should return stats scaled to kilobytes for the sample_mflix.movies collection", async () => {
    await Expect
      .outputFromExampleFiles([
        "mongosh-commands/db.collection.stats/stats-scale.js"
      ])
      .withDbName(dbName)
      .shouldResemble("mongosh-commands/db.collection.stats/stats-scale-output.sh")
      .withSchema({
        count: 1,
        requiredFields: [
          "ns", "size", "count", "avgObjSize",
          "storageSize", "capped", "nindexes",
          "totalIndexSize", "totalSize", "indexSizes",
          "scaleFactor", "ok"
        ],
        fieldValues: {
          ns: "sample_mflix.movies",
          count: 21349,
          capped: false,
          scaleFactor: 1024,
          ok: 1
        }
      });
  });

  test("Should return stats with index details for the sample_mflix.movies collection", async () => {
    await Expect
      .outputFromExampleFiles([
        "mongosh-commands/db.collection.stats/stats-index-details.js"
      ])
      .withDbName(dbName)
      .shouldResemble("mongosh-commands/db.collection.stats/stats-index-details-output.sh")
      .withSchema({
        count: 1,
        requiredFields: [
          "ns", "count", "nindexes", "indexDetails",
          "indexSizes", "ok"
        ],
        fieldValues: {
          ns: "sample_mflix.movies",
          count: 21349,
          ok: 1
        }
      });
  });

  test("Should filter indexDetails to one index using indexDetailsKey", async () => {
    await Expect
      .outputFromExampleFiles([
        "mongosh-commands/db.collection.stats/stats-index-details-key.js"
      ])
      .withDbName(dbName)
      .shouldResemble("mongosh-commands/db.collection.stats/stats-index-details-key-output.sh")
      .withSchema({
        count: 1,
        requiredFields: [
          "ns", "count", "nindexes", "indexDetails", "ok"
        ],
        fieldValues: {
          ns: "sample_mflix.movies",
          count: 21349,
          ok: 1
        }
      });

    // The filter must return exactly the text index, regardless of what other
    // indexes the shared collection carries.
    const filterKeys = execSync(
      `mongosh "${process.env.CONNECTION_STRING}" --quiet --eval '
        db = db.getSiblingDB("${dbName}");
        print(
          Object.keys(db.movies.stats( {
            indexDetails: true,
            indexDetailsKey: { _fts: "text", _ftsx: 1 }
          } ).indexDetails).join(",")
        );
      '`,
      { encoding: "utf8" }
    );
    Expect.that(filterKeys.trim()).shouldMatch(textIndexName);
  });

  test("Should filter indexDetails to one index using indexDetailsName", async () => {
    await Expect
      .outputFromExampleFiles([
        "mongosh-commands/db.collection.stats/stats-index-details-name.js"
      ])
      .withDbName(dbName)
      .shouldResemble("mongosh-commands/db.collection.stats/stats-index-details-name-output.sh")
      .withSchema({
        count: 1,
        requiredFields: [
          "ns", "count", "nindexes", "indexDetails", "ok"
        ],
        fieldValues: {
          ns: "sample_mflix.movies",
          count: 21349,
          ok: 1
        }
      });

    // The filter must return exactly the text index, regardless of what other
    // indexes the shared collection carries.
    const filterKeys = execSync(
      `mongosh "${process.env.CONNECTION_STRING}" --quiet --eval '
        db = db.getSiblingDB("${dbName}");
        print(
          Object.keys(db.movies.stats( {
            indexDetails: true,
            indexDetailsName: "${textIndexName}"
          } ).indexDetails).join(",")
        );
      '`,
      { encoding: "utf8" }
    );
    Expect.that(filterKeys.trim()).shouldMatch(textIndexName);
  });

}, dbName);
