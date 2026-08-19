const Expect = require("../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../utils/sampleDataChecker");

// These examples run the `explain` database command in each verbosity mode.
// The example output is a large, volatile explain document, so each example
// asserts only that the command returns a valid explain result (has a
// `queryPlanner`). Explain never modifies data, even for write operations.
describe("explain database command reference", () => {
  const dbName = "sample_mflix";
  const base = "reference/explain-command";
  const succeeds = `${base}/succeeds-output.sh`;

  describeWithSampleData("explain command examples", () => {
    test("queryPlanner mode returns a query plan", async () => {
      await Expect.outputFromExampleFiles([`${base}/count-queryplanner.js`])
        .withDbName(dbName)
        .shouldMatch(succeeds);
    });

    test("executionStats mode returns a query plan", async () => {
      await Expect.outputFromExampleFiles([`${base}/count-executionstats.js`])
        .withDbName(dbName)
        .shouldMatch(succeeds);
    });

    test("allPlansExecution mode returns a query plan for an update", async () => {
      await Expect.outputFromExampleFiles([`${base}/update-allplansexecution.js`])
        .withDbName(dbName)
        .shouldMatch(succeeds);
    });
  }, "sample_mflix");
});
