const Expect = require("../../utils/comparison/Expect");
const { execSync } = require("child_process");
const { describeWithSampleData } = require("../../utils/sampleDataChecker");

// These examples run db.collection.explain() against various operations. The
// explain output is large and volatile, so each example asserts only that it
// returns a valid explain result. explain() never modifies data, even for
// write operations (remove, findAndModify).
describe("db.collection.explain() method reference", () => {
  const dbName = "sample_mflix";
  const base = "reference/explain-method";
  const succeeds = `${base}/succeeds-output.sh`;

  describeWithSampleData("explain method examples", () => {
    afterEach(() => {
      // Drop the index created for the hint example so the collection is left
      // in its original state. Wrapped in try/catch because the index only
      // exists for the modifiers test.
      const command = `mongosh "${process.env.CONNECTION_STRING}" --quiet --eval '
        db = db.getSiblingDB("${dbName}");
        try { db.movies.dropIndex({ rated: 1, year: -1 }); } catch (e) {}
      '`;
      execSync(command, { encoding: "utf8" });
    });

    test("explain().remove() returns a query plan", async () => {
      await Expect.outputFromExampleFiles([`${base}/remove.js`])
        .withDbName(dbName)
        .shouldMatch(succeeds);
    });

    test("explain().count() returns a query plan", async () => {
      await Expect.outputFromExampleFiles([`${base}/count-queryplanner.js`])
        .withDbName(dbName)
        .shouldMatch(succeeds);
    });

    test("explain('executionStats').find() returns a query plan", async () => {
      await Expect.outputFromExampleFiles([`${base}/find-executionstats.js`])
        .withDbName(dbName)
        .shouldMatch(succeeds);
    });

    test("explain('allPlansExecution').findAndModify() returns a query plan", async () => {
      await Expect.outputFromExampleFiles([`${base}/findandmodify-allplansexecution.js`])
        .withDbName(dbName)
        .shouldMatch(succeeds);
    });

    test("explain().find() with sort and hint returns a query plan", async () => {
      await Expect.outputFromExampleFiles([
        `${base}/hint-index-setup.js`,
        `${base}/find-with-modifiers.js`,
      ])
        .withDbName(dbName)
        .shouldMatch(succeeds);
    });

    test("explain().find().finish() returns the winning plan", async () => {
      await Expect.outputFromExampleFiles([`${base}/find-finish.js`])
        .withDbName(dbName)
        .shouldMatch(succeeds);
    });
  }, "sample_mflix");
});
