const { execSync } = require("child_process");
const Expect = require("../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../utils/sampleDataChecker");

jest.setTimeout(15000);

const dbName = "sample_mflix";
const textIndexName = "cast_text_fullplot_text_genres_text_title_text";

// The collStats example documents the sample_mflix "movies" text index, which
// other suites drop in their cleanup. Recreate it when missing so this test is
// order-independent. The index is intentionally left in place: it IS the
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

describeWithSampleData("collStats command tests", () => {

  test("Should return collStats for the sample_mflix.movies collection scaled to kilobytes", async () => {
    await Expect
      .outputFromExampleFiles([
        "database-commands/collStats/coll-stats-scale.js"
      ])
      .withDbName(dbName)
      .shouldResemble("database-commands/collStats/coll-stats-scale-output.sh")
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

  test("Should return zeroed collStats output for a non-existent collection", async () => {
    await Expect
      .outputFromExampleFiles([
        "database-commands/collStats/coll-stats-missing.js"
      ])
      .withDbName(dbName)
      .shouldMatch("database-commands/collStats/coll-stats-missing-output.sh");
  });

}, dbName);
