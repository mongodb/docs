const { execSync } = require("child_process");
const Expect = require("../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../utils/sampleDataChecker");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("mongosh query operators tests", () => {

  /**
    * Generic cleanup function to execute MongoDB commands
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

  test("Should find movies where runtime is greater than 1000 minutes", async () => {
    await Expect
      .outputFromExampleFiles([
        "operators/gt/gt-find/gt-find.js"
      ])
      .withDbName(dbName)
      .shouldMatch("operators/gt/gt-find/output.sh");
  });

   test("Should update movies where IMDb rating is greater than 9.5", async () => {
    await Expect
      .outputFromExampleFiles([
        "operators/gt/gt-update/gt-update.js"
      ])
      .withDbName(dbName)
      .shouldMatch("operators/gt/gt-update/output.sh");

      runCleanup(
        `db = db.getSiblingDB("${dbName}"); db.movies.updateMany( { highestRated: true }, { $unset: { highestRated: "" } } )`,
        "removing highestRated field"
      );
  });

  test("Should find movies where runtime is greater than or equal to 720 minutes", async () => {
    await Expect
      .outputFromExampleFiles([
        "operators/gte/gte-find/gte-find.js"
      ])
      .withDbName(dbName)
      .shouldMatch("operators/gte/gte-find/output.sh");
  });

  test("Should update movies where IMDb rating is greater than or equal to 9.5", async () => {
    await Expect
      .outputFromExampleFiles([
        "operators/gte/gte-update/gte-update.js"
      ])
      .withDbName(dbName)
      .shouldMatch("operators/gte/gte-update/output.sh");

      runCleanup(
        `db = db.getSiblingDB("${dbName}"); db.movies.updateMany( { highestRated: true }, { $unset: { highestRated: "" } } )`,
        "removing highestRated field"
      );
  });

  test("Should find movies where rated is in G or TV-G", async () => {
    await Expect
      .outputFromExampleFiles([
        "operators/in/in-find/in-find.js"
      ])
      .withDbName(dbName)
      .shouldMatch("operators/in/in-find/output.sh");
  });

   test("Should update movies where rated is G or TV-G", async () => {
    await Expect
      .outputFromExampleFiles([
        "operators/in/in-update/in-update.js"
      ])
      .withDbName(dbName)
      .shouldMatch("operators/in/in-update/output.sh");

      runCleanup(
        `db = db.getSiblingDB("${dbName}"); db.movies.updateMany( { familyFriendly: true }, { $unset: { familyFriendly: "" } } )`,
        "removing familyFriendly field"
      );
  });

  test("Should find movies where plot begins with Alien or contains sci-fi", async () => {
    await Expect
      .outputFromExampleFiles([
        "operators/in/in-regex/in-regex.js"
      ])
      .withDbName(dbName)
      .shouldMatch("operators/in/in-regex/output.sh");
  });

}, dbName);
