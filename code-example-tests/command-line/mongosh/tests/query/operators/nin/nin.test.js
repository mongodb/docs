const { execSync } = require("child_process");
const Expect = require("../../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("$nin operator example tests", () => {

  const runCleanup = (cleanupCommands, errorContext) => {
    const mongoUri = process.env.CONNECTION_STRING;
    const command = `mongosh "${mongoUri}" --quiet --eval '${cleanupCommands}'`;
    try {
      execSync(command, { encoding: "utf8" });
    } catch (error) {
      console.error(`Failed to clean up ${errorContext}:`, error.message);
    }
  };

  test("Should find movies with runtime over 1000 minutes that are not rated G or PG", async () => {
    await Expect
      .outputFromExampleFiles([
        "query/operators/nin/nin-find.js"
      ])
      .withDbName(dbName)
      .shouldMatch("query/operators/nin/nin-find-output.sh");
  });

  test("Should update movies whose genres array does not contain Drama", async () => {
    runCleanup(
      `db = db.getSiblingDB("${dbName}"); db.movies.updateMany( { exclude: true }, { $unset: { exclude: "" } } )`,
      "pre-test cleanup for nin update"
    );

    await Expect
      .outputFromExampleFiles([
        "query/operators/nin/nin-update.js"
      ])
      .withDbName(dbName)
      .shouldMatch("query/operators/nin/nin-update-test-output.sh");

    runCleanup(
      `db = db.getSiblingDB("${dbName}"); db.movies.updateMany( { exclude: true }, { $unset: { exclude: "" } } )`,
      "removing exclude field from nin update"
    );
  });

}, dbName);
