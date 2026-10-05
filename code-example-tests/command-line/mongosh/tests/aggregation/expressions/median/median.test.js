const { execSync } = require("child_process");
const Expect = require("../../../../utils/comparison/Expect.js");

jest.setTimeout(10000);

describe("$median expression tests", () => {
  const dbName = "median-expression-test";

  afterEach(() => {
    const mongoUri = process.env.CONNECTION_STRING;
    const command = `mongosh "${mongoUri}" --eval "db = db.getSiblingDB('${dbName}'); db.dropDatabase();"`;

    try {
      execSync(command, { encoding: "utf8" });
    } catch (error) {
      console.error(`Failed to drop database '${dbName}':`, error.message);
    }
  });

  test("Should return the median test score per student", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/expressions/median/load-data.js",
        "aggregation/expressions/median/median-test-scores.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/expressions/median/median-test-scores-output.sh");
  });
});
