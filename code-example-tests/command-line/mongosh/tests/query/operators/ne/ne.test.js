const { execSync } = require("child_process");
const Expect = require("../../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("$ne operator example tests", () => {

  /**
   * Generic cleanup function to execute MongoDB commands.
   * @param {string} cleanupCommands - MongoDB commands to execute
   * @param {string} errorContext - Context string for error messages
   */
  const runCleanup = (cleanupCommands, errorContext) => {
    const mongoUri = process.env.CONNECTION_STRING;
    const command = `mongosh "${mongoUri}" --quiet --eval '${cleanupCommands}'`;
    try {
      execSync(command, { encoding: "utf8" });
    } catch (error) {
      console.error(`Failed to clean up ${errorContext}:`, error.message);
    }
  };

  test("Should find movies with runtime over 1000 minutes that are not rated G", async () => {
    await Expect
      .outputFromExampleFiles([
        "query/operators/ne/ne-find.js"
      ])
      .withDbName(dbName)
      .shouldMatch("query/operators/ne/ne-find-output.sh");
  });

  test("Should find movies with runtime over 1000 minutes whose genres array does not include Drama", async () => {
    await Expect
      .outputFromExampleFiles([
        "query/operators/ne/ne-find-array-scalar.js"
      ])
      .withDbName(dbName)
      .shouldMatch("query/operators/ne/ne-find-array-scalar-output.sh");
  });

  test("Should find movies with runtime over 1000 minutes whose genres array is not exactly equal to [ Drama ]", async () => {
    await Expect
      .outputFromExampleFiles([
        "query/operators/ne/ne-find-array-exact.js"
      ])
      .withDbName(dbName)
      .shouldMatch("query/operators/ne/ne-find-array-exact-output.sh");
  });

  test("Should update movies where IMDb rating is not equal to 9.3", async () => {
    runCleanup(
      `db = db.getSiblingDB("${dbName}"); db.movies.updateMany( { highestRated: false }, { $unset: { highestRated: "" } } )`,
      "pre-test cleanup for ne update"
    );

    await Expect
      .outputFromExampleFiles([
        "query/operators/ne/ne-update.js"
      ])
      .withDbName(dbName)
      .shouldMatch("query/operators/ne/ne-update-test-output.sh");

    runCleanup(
      `db = db.getSiblingDB("${dbName}"); db.movies.updateMany( { highestRated: false }, { $unset: { highestRated: "" } } )`,
      "removing highestRated field from ne update"
    );
  });

}, dbName);
